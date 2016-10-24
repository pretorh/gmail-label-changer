var google = require('googleapis');
var Q = require('q');

module.exports.send = Q.denodeify(send);
module.exports.sendRaw = send;

function send(message, callback) {
    var gmail = google.gmail('v1');
    var raw = buildRawEmailMessage(message.to, message.from, message.subject, message.text);

    gmail.users.messages.send({
        auth: message.auth,
        userId: 'me',
        resource: {
            raw: raw
        },
    }, function(err, response) {
        if (err)
            return callback(err);

        callback(null, response);
    });
}

// mod from https://stackoverflow.com/a/34563593/1016377
function buildRawEmailMessage(to, from, subject, message) {
    var str = ['Content-Type: text/plain; charset="UTF-8"\n',
        'MIME-Version: 1.0\n',
        'Content-Transfer-Encoding: 7bit\n',
        'to: ', to, '\n',
        'from: ', from, '\n',
        'subject: ', subject, '\n',
        '\n',
        message
    ].join('');

    return new Buffer(str)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}
