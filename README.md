# gmail-utils
Node library and some CLIs for accessing Gmail using `googleapis` and `q` for promisses.

## Setup

1. Get a client secret from Google Console, and save the file as `client_secret.json` in the root of the project.
2. Run `node cli.js auth`
  1. Open the url returned in the error and authorize the app
  2. copy the code returned from the page
3. run `node cli.js save-auth "<CODE>"`
4. Optionally run `node cli.js auth` to validate that auth is working

## CLIs

### `cli/change-labels.js`

Arguments:
`source-label source-label2 ... source-label-n destination-label`

Moves all threads in form the sources labels into the the destination label (techically: for all threads in any of the source labels, remove all the source labels from it and add the desination label)

### `cli.js`

Arguments:

- save-auth
  - Argument: token returned when authorizing the app
  - Finalize authentication and save the token to `credentials.json`
- labels
  - List all labels
  - Optional argument: display only the selected label's details
- threads
  - Query all threads using the argument (similar to searching on Gmail in browser)
- threads-on-label
  - List all threads on a matching label (1st argument)
  - If 2nd argument is `ids` then only list the thread ids
- send
  - send an email. arguments:
    - from
    - to
    - subject
    - text
