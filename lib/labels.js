var google = require('googleapis');
var Q = require('q');

module.exports = Q.denodeify(getLabels);

function getLabels(auth, callback) {
    var gmail = google.gmail('v1');
    gmail.users.labels.list({
        auth: auth,
        userId: 'me',
    }, function(err, response) {
        if (err)
            return callback(err);

        callback(null, response.labels);
    });
}
