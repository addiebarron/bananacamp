import browser from 'webextension-polyfill';
import 'arrive';

import selectors from './selectors';

// get artist name from the current spotify SPA view
export function getSpotifyInfo() {
  let type = window.location.pathname.split('/')[1];

  // verified artist page uses different selectors
  const verified = document.querySelector(selectors.verifiedSVG);
  type = (type == 'artist' && verified) ? 'verifiedArtist' : type;

  console.log(type);

  return new Promise((resolve, reject) => {
    document.unbindArrive(); // jic
    document.arrive(selectors[type].artist, { onceOnly: true, existing: true },
      (el) => {
        const artist = el.innerText;
        if (artist) {
          resolve({ artist, type })
        } else {
          reject('No element found. Spotify may have updated their UI. Submit an issue at https://github.com/addiebarron/bananacamp/issues');
        }
      }
    );
  });
}

// get canonical result from Bandcamp search
export async function getBCInfo(query) {
  let results;
  try {
    // ask background script to fetch for us
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
      result.name.toLowerCase() == query.toLowerCase()
  );
  // returns a bandcamp search result object or null
}
