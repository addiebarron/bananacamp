# bananacamp

> <span style="font-size: 20px">"Spotify is the banana of the music industry. It just gives off a fume"</span>

_— Joanna Newsom_

This browser extension adds an extra element into the Spotify Web UI which links to the artist's Bandcamp page, if one is found. Only artist and album pages are affected. The extension is available for Firefox and Chrome.

![Artist page](media/artist.png)

---

## Development

Use `npm run dev` to open a Firefox instance with the extension running as a temporary add-on.

Use `npm run dev:chrome` to do the same in a Chrome instance.

The extension and any running scripts (not the browser or current page) will auto-reload when changes are detected. Uses `web-ext run` and `webpack --watch` under the hood.

Please feel free to fork and make pull requests.

### To do

- Differentiate between errors and no-results conditions

### Wishlist

- Browser action popup on pages with successfully loaded artists
- Options page
- Cache previously visited artists.
- Option to manually associate BC accounts with Spotify artists, for cases where the BC/Spotfy names are different, there are multiple artists with the same name, or the artist name uses special characters. Store these associations in a remote DB & query there before searching BC?
- When Bandcamp search improves, or a public API is released: search by album specifically.

---

_This repository was templated from [browser-extension-template](https://github.com/notlmn/browser-extension-template)._

_Developed with feedback and support from [Jean Cochrane](https://github.com/jeancochrane) and [Cullan Bonilla](https://github.com/strewburry)._
