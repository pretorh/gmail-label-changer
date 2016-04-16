var gmail = require('../');
var SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

var labels = gmail.auth('client_secret.json', SCOPES, 'credentials.json')
.then(gmail.labels);

if (process.argv[2] !== undefined) {
    labels = labels
    .then(gmail.labels.resolveByName(process.argv[2]));
}

labels.then(console.log).catch(console.error);
