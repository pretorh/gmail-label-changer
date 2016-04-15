var GmailLabelChanger = require('./');

var args = process.argv.splice(2);

if (args.length != 2) {
    console.error('need 2 arguments: <from label name> <to label name>');
    process.exit(1);
}

var content = fs.readFileSync('./client_secret.json');
var secret = JSON.parse(content);
var glc = new GmailLabelChanger(secret);
