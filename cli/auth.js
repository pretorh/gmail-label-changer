var auth = require('../lib/auth');
var fs = require('fs');

var content = fs.readFileSync('./client_secret.json');
var secret = JSON.parse(content);

if (process.argv[2] === 'auth') {
    auth(secret, [process.argv[3]], 'credentials.json', done);
} else if (process.argv[2] === 'save') {
    auth.finalizeAuth(secret, process.argv[3], 'credentials.json', done);
} else {
    console.error('unknown command', process.argv[2]);
}

function done(err) {
    if (err) {
        console.error(err);
    } else {
        console.log('auth successfull!');
    }
}
