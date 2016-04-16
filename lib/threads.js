var google = require('googleapis');
var Q = require('q');

module.exports = Q.denodeify(getThreads);

function getThreads(auth, options, callback) {
    if (callback === undefined) {
        callback = options;
        options = {};
    }
    options.auth = auth;
    options.userId = options.userId || 'me';

    var gmail = google.gmail('v1');
    var result = [];

    function getNextPage() {
        gmail.users.threads.list(options, function(err, response) {
            if (err)
                return callback(err);

            result = result.concat(response.threads);

            if (response.nextPageToken) {
                options.pageToken = response.nextPageToken;
                getNextPage();
            } else {
                callback(null, result);
            }
        });
    }

    getNextPage();
}
