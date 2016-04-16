var gmail = require('./');
var SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

var command = process.argv[2];
var argument = process.argv[3];

var result;
if (command === 'save-auth') {
    result = gmail.auth.finalizeAuth('client_secret.json', argument, 'credentials.json');
} else {
    result = gmail.auth('client_secret.json', SCOPES, 'credentials.json');
}

if (command === undefined || command === 'save-auth') {
    result = result.then(gmail.auth.mapExpirationDetailsSync);
} else if (command === 'labels') {
    result = result.then(gmail.labels);
    if (argument) {
        result = result.then(gmail.labels.resolveByName(argument));
    }
} else if (command === 'threads') {
    result = result.then(function(auth) {
        return gmail.threads(auth, { q: argument });
    });
}

result.done(console.log, console.error);
