var gmail = require('../');
var Q = require('q');
var SCOPES = [
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/gmail.modify',
];

var args = process.argv.splice(2);

var cli = {};
cli.dest = args.splice(-1)[0];
cli.source = args;

var auth;

var authorize = gmail
    .auth('client_secret.json', SCOPES, 'credentials.json')
    .tap(function(a) {
        auth = a;
    });

var labels = authorize.then(gmail.labels);
var resolveSource = labels.then(gmail.labels.resolveByName(cli.source));
var resolveDest = labels.then(gmail.labels.resolveByName(cli.dest));
var resolveThreads = resolveSource
    .then(function(label) {
        return gmail.threads.onLabel(auth, label.id);
    })
    .then(gmail.threads.mapIds);

result = Q.all([resolveSource, resolveDest, resolveThreads])
    .spread(bulkChangeLabels)
    .done(console.log);

function bulkChangeLabels(source, dest, threadIds) {
    var add = [ dest.id ];
    var remove = [ source.id ];
    var jobs = threadIds.map(function(id) {
        return gmail.threads.changeLabels(auth, id, add, remove)
            .get(0)
            .get('id');
    });
    return Q.all(jobs);
}
