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
        return label.map(function(l) {
            return gmail.threads.onLabel(auth, l.id);
        });
    })
    .then(Q.all)
    .then(function(arrayOfArrays) {
        return arrayOfArrays.reduce(function(array, pre) {
            return pre.concat(array);
        }, []);
    })
    .then(gmail.threads.mapIds);

result = Q.all([resolveSource, resolveDest, resolveThreads])
    .spread(bulkChangeLabels)
    .done(console.log);

function bulkChangeLabels(sources, dest, threadIds) {
    var add = [ dest.id ];
    var remove = sources.map(function(s) { return s.id; });
    var jobs = threadIds.map(function(id) {
        return gmail.threads.changeLabels(auth, id, add, remove)
            .get(0)
            .get('id');
    });
    return Q.all(jobs);
}
