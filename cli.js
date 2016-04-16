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

result.done(console.log, console.error);
