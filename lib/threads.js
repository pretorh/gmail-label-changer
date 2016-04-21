var google = require('googleapis');
var Q = require('q');

module.exports = Q.denodeify(getThreads);
module.exports.onLabel = Q.denodeify(onLabel);
module.exports.mapIds = mapIds;
module.exports.changeLabels = Q.denodeify(changeLabels);

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

            if (response.threads)
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

function onLabel(auth, labelId, callback) {
    getThreads(auth, { labelIds: labelId }, callback);
}

function mapIds(threads) {
    return threads.map(function(thread) {
        return thread.id;
    });
}

function changeLabels(auth, threadId, add, remove, callback) {
    var gmail = google.gmail('v1');
    gmail.users.threads.modify({
        auth: auth,
        userId: 'me',
        id: threadId,
        resource: {
            addLabelIds: add,
            removeLabelIds: remove,
        },
    }, callback);
}
