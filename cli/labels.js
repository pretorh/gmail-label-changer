var gmail = require('../');
var SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

var labels = gmail.auth('client_secret.json', SCOPES, 'credentials.json')
.then(gmail.labels);

labels.then(console.log).catch(console.error);
