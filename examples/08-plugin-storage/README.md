# Example 08: Plugin storage

A small notes plugin that keeps its data in **Windy plugin storage**: a per-user key/value store for plugins. Notes saved on one device show up on every device where the same user is logged in to Windy.

## Run the example

1. Build and serve the example:

    ```bash
    npm install
    npm run example08
    ```

    The plugin is served at <https://localhost:9999/example08/plugin.js>. If the browser blocks it, open that URL once and accept the self-signed certificate.

2. Open <https://www.windy.com/developer-mode>, log in, and load `https://localhost:9999/example08/plugin.js`.

3. Write a note and save it. Reload the page and open the plugin again: the note is still there. Log in with the same account on another device or browser: you see the same note. Log in with a different account: you do not.

`npm run example08` keeps running and rebuilds on every change. Run it only once: a second copy fails with "port 9999 is in use".

## How it works

- Every request goes through `@windy/http` with `withCredentials: true`. Windy then sends the logged-in user's token, and the server takes the user from that token. A plugin can never read or write another user's data.
- Data is stored under a **namespace** that belongs to your plugin. Each user has their own copy of it.
- Values are strings. To store objects, use `JSON.stringify` / `JSON.parse`.
- Every stored value has a **version**. Sending it back on update or delete protects against overwriting a change made on another device.

See [plugin.svelte](plugin.svelte) for the complete code: list, read, create, update and delete.

## API

Base path (relative, the Windy client adds the server): `/plugins/v1/storage/<namespace>`

| Method   | Path           | Body / query                                         | Response                                                             |
| -------- | -------------- | ---------------------------------------------------- | -------------------------------------------------------------------- |
| `GET`    | `/keys`        | query: `prefix`, `limit`, `pageToken` (all optional) | `200` `{ items: [{ key, version, updated, size }], nextPageToken? }` |
| `GET`    | `/items/<key>` |                                                      | `200` `{ value, version, updated }`                                  |
| `PUT`    | `/items/<key>` | body: `{ value: string, ifVersion?: string }`        | `200` `{ version }`                                                  |
| `DELETE` | `/items/<key>` | query: `ifVersion` (optional)                        | `204` (no body)                                                      |

Fields:

- `version`: a string; changes on every write. Treat it as opaque, compare it only for equality.
- `updated`: time of the last write, in milliseconds since 1970 (UTC), like `Date.now()`.
- `size`: size of the value in bytes.

### Namespace

`<authorUserId>:<pluginName>`, for example `12345:windy-plugin-my-plugin`.

- `authorUserId`: **your** numeric Windy user ID (the plugin author's, not the user's). Plugin names are not unique until a plugin is published, so the author ID keeps two authors' unpublished plugins apart.
- `pluginName`: your plugin's `name` from `pluginConfig.ts`: lowercase letters, digits and `-`, starting with a letter or digit, at most 100 characters.
- The example uses `0:windy-plugin-storage-example`.

### Keys

- 1 to 128 characters from `A-Z a-z 0-9 . _ : -`. No `/`, no spaces. `.` and `..` alone are not allowed.
- Use a prefix to group keys, for example `note-1730900000000`, `settings`, `route:home`.

### Listing keys

- `prefix`: return only keys starting with it (0 to 128 characters, same characters as keys).
- `limit`: 1 to 1000 keys per page, default 100.
- `pageToken`: pass the `nextPageToken` from the previous response to get the next page. The last page has no `nextPageToken`.
- Keys come back in alphabetical order. The list contains no values: read each key with `GET /items/<key>`.

### Safe updates with `ifVersion`

| `ifVersion`        | `PUT`                                                  | `DELETE`                                  |
| ------------------ | ------------------------------------------------------ | ----------------------------------------- |
| not sent           | create or overwrite                                    | delete if it exists                       |
| `"0"`              | create only; `409` if the key already exists           | –                                         |
| a version you read | write only if nobody changed it since; otherwise `409` | delete only if unchanged; otherwise `409` |

On `409`, reload the item, merge or show the newer value, and try again with the new version. The example shows "This note was changed on another device" and reloads.

## Limits

| What                              | Limit                         | When exceeded                      |
| --------------------------------- | ----------------------------- | ---------------------------------- |
| Value size                        | 64 KB (65,536 bytes of UTF-8) | `413`                              |
| Key length                        | 128 characters                | `400`                              |
| Reads (`GET`)                     | 300 per user per minute       | `429` with `Retry-After` (seconds) |
| Writes (`PUT`, `DELETE` together) | 60 per user per minute        | `429` with `Retry-After` (seconds) |

There is no limit on the number of keys. The rate limits are counted per server instance, so in practice you may get a little more than this.

## Errors

| Status | Meaning                                                                               | What to do                                            |
| ------ | ------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `400`  | invalid namespace, key, prefix, limit, `ifVersion` or body (`value` must be a string) | fix the request; `message` says which field           |
| `401`  | user not logged in, or invalid token                                                  | ask the user to log in (`login()` from `@windy/user`) |
| `404`  | key does not exist (`GET`, `DELETE`)                                                  | treat as "no value"                                   |
| `409`  | `ifVersion` did not match                                                             | reload and retry, see above                           |
| `413`  | value larger than 64 KB                                                               | store less, or split it across keys                   |
| `429`  | too many requests                                                                     | wait `Retry-After` seconds                            |
| `503`  | storage temporarily unavailable                                                       | retry later                                           |

Error bodies look like `{ "statusCode": 409, "message": "Version conflict" }`.

## Good to know

- Requests need a logged-in user; check `isLoggedInPromise()` from `@windy/user` first, as the example does.
- Pass `cache: false` on reads, so the Windy client's HTTP cache does not return an old value right after a write.
