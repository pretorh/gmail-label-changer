var googleAuth = require('google-auth-library');
var fs = require('fs');
var Q = require('q');

module.exports = Q.denodeify(auth);
module.exports.finalizeAuth = Q.denodeify(finalizeAuth);

function auth(secretFile, scopes, authCacheFile, callback) {
    var content = fs.readFileSync(secretFile);
    var secret = JSON.parse(content);

    var oauth2Client = buildOauth2Client(secret);

    fs.readFile(authCacheFile, function(err, token) {
        if (err) {
            var url = buildUrlToAuthorize(oauth2Client, scopes, authCacheFile, callback);
            return callback({
                message: 'failed to read auth cache file ' + authCacheFile,
                read_error: err,
                recreate_auth_token_url: url,
                detail: 'failed to read auth token cache file. visit the recreate_auth_token_url url, authorize the app, and call finalizeAuth with the token given on the site',
            });
        }

        oauth2Client.credentials = JSON.parse(token);
        callback(null, oauth2Client);
    });
}

function finalizeAuth(secret, authToken, authCacheFile, callback) {
    var oauth2Client = buildOauth2Client(secret);
    oauth2Client.getToken(authToken, function(err, token) {
        if (err)
            return callback(err);

        fs.writeFile(authCacheFile, JSON.stringify(token), callback);
    });
}

function buildUrlToAuthorize(oauth2Client, scopes, callback) {
    return oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes
    });
}

function buildOauth2Client(secret) {
    var auth = new googleAuth();
    return new auth.OAuth2(secret.installed.client_id,
        secret.installed.client_secret,
        secret.installed.redirect_uris[0]);
}
