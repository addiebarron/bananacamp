# bc-nudge (working title)

Templated from [browser-extension-template](https://github.com/notlmn/browser-extension-template). Under development by [Jean](https://github.com/jeancochrane) and [Addie](https://github.com/addiebarron) :)

## Development

Use `npm run dev` to open a Firefox instance with the extension running as a temporary add-on.

Use `npm run dev:chrome` to do the same in a Chrome instance.

The extension and any running scripts (not the browser or current page) will auto-reload when changes are detected. Uses `web-ext run` and `webpack --watch` under the hood.

## Functionality

The extension adds an extra element into the Spotify Web UI which links to the artist's Bandcamp page, if one is found. Only artist and album pages are affected.

![Artist page](media/artist.png)

## TODO

- Differentiate between errors and no-results conditions?
- ✅  *Content scripts cannot make fetch requests in Chrome. Move bandcamp-search-scraper calls to background.js*

## Wishlist

- Cache previously visited artists.
- Option to manually associate BC accounts with Spotify artists, for cases where the BC/Spotfy names are different, there are multiple artists with the same name, or the artist name uses special characters. Store these associations in a remote DB & query there before searching BC?
- When Bandcamp search improves, or a public API is released: search by album specifically.
