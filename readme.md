# bc-nudge (working title)

Templated from [browser-extension-template](https://github.com/notlmn/browser-extension-template). Under development by [Jean](https://github.com/jeancochrane) and [Addie](https://github.com/addiebarron) :)

## Development

Use `npm run dev` to open a Firefox instance with the extension running as a temporary add-on. Runs `web-ext run` under the hood. The page will reload on any file changes; alternatively, press "R" in the terminal to manually reload.

> ⚠️   `web-ext run` requires a couple of fields to be valid & consistent in the manifest.json, including `name`, `homepage_url`, and `applications.gecko.id`, so we shouldn't edit those yet.
