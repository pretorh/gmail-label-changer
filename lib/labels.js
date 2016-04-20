var google = require('googleapis');
var Q = require('q');

module.exports = Q.denodeify(getLabels);
module.exports.resolveByName = resolveByName;

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

function resolveByName(name) {
    return function(labels) {
        return findByNameSync(labels, name);
    };
}

function findByNameSync(labels, name) {
    for (var i = 0; i < labels.length; ++i) {
        if (labels[i].name.toUpperCase() === name.toUpperCase())
            return labels[i];
    }
    throw new Error('Label not found');
}
