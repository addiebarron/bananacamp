/* Runs on open.spotify.web URLs */

import browser from 'webextension-polyfill';

import HTMLRender from './htmlRender';
import { getSpotifyInfo, getBCInfo } from './util';

// establish a port for communicating with the background script
let port = browser.runtime.connect({ name: 'url-change-port' });

// run our code each time the SPA url changes
port.onMessage.addListener(onURLChange);
// run once on page load
onURLChange({ url: window.location.href });

// to be run when the page URL changes. can't be async, for webextension reasons:
// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage#Parameters
function onURLChange(message) {
  // run our code only on an album/artist page
  if (/\/(album|artist)\//.test(message.url)) {
    runScraper().catch(console.error);
  }
}

// main function
export async function runScraper() {
  let artist, type;
  try {
    ({ artist, type } = await getSpotifyInfo());
  } catch (e) {
    console.error(e);
    return;
  }
  // generate renderer functions
  const renderer = new HTMLRender(type);
  // add loader
  renderer.renderInitialState();
  // scrape bandcamp search
  const result = await getBCInfo(artist);
  // remove loader, show results
  renderer.renderFinalState(result);
}
