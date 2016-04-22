# gmail-utils
Node library and some CLIs for accessing Gmail using `googleapis` and `q` for promisses.

## Setup

1. Get a client secret from Google Console, and save the file as `client_secret.json` in the root of the project.
2. Run `node cli.js auth`
  1. Open the url returned in the error and authorize the app
  2. copy the code returned from the page
3. run `node cli.js save-auth "<CODE>"`
4. Optionally run `node cli.js auth` to validate that auth is working
