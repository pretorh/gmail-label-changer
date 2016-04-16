var auth = require('../lib/auth');
var fs = require('fs');

var content = fs.readFileSync('./client_secret.json');
var secret = JSON.parse(content);

var result;

if (process.argv[2] === 'auth') {
    result = auth(secret, [process.argv[3]], 'credentials.json');
} else if (process.argv[2] === 'save') {
    result = auth.finalizeAuth(secret, process.argv[3], 'credentials.json');
} else {
    console.error('unknown command', process.argv[2]);
}

result
.then(function() {
    console.log('auth successfull!');
})
.catch(console.error)
.done();
