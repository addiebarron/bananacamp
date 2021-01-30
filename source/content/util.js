import browser from 'webextension-polyfill';
import 'arrive';

import selectors from './selectors';

// get artist name from the current spotify SPA view
export function spotifyScrape() {
  return new Promise((resolve) => {
    document.unbindArrive();
    for (let [type, selector] of Object.entries(selectors)) {
      document.arrive(
        selector.artist,
        { onceOnly: true, existing: true },
        (el) => {
          if (el.innerText) {
            document.unbindArrive();
            resolve({
              artist: el.innerText,
              type: type,
            });
          }
        }
      );
    }
  });
  // resolves to an object with "artist" and "type" (page type) props
}

// get canonical result from Bandcamp search
export async function getBCResult(query) {
  // ask background script to fetch for us (CORS workaround)
  let results;
  try {
    const response = await browser.runtime.sendMessage({ query });
    results = response.results;
  } catch (err) {
    console.log(err, err.stack);
    results = [];
  }
  // find the best result
  return results.find(
    (result) =>
      result.type == 'artist' &&
      result.name.toLowerCase() == artist.toLowerCase()
  );
  // returns a bandcamp search result object or null
}
