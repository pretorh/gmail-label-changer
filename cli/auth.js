var auth = require('../lib/auth');

var result;
if (process.argv[2] === 'auth') {
    result = auth('client_secret.json', [process.argv[3]], 'credentials.json');
} else if (process.argv[2] === 'save') {
    result = auth.finalizeAuth('client_secret.json', process.argv[3], 'credentials.json');
} else {
    console.error('unknown command', process.argv[2]);
}

result
.then(function() {
    console.log('auth successfull!');
})
.catch(console.error)
.done();
