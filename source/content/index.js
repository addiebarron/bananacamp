/* Runs on open.spotify.web URLs */

import browser from 'webextension-polyfill';
import $ from 'jquery';
import 'arrive';
import { selectors } from './selectors';

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
async function runScraper() {
  const { artist, type } = await spotifyScrape();

  // render initial state
  $('.bc-nudge').remove(); // clear any stragglers;
  const bcLogo = browser.runtime.getURL('media/bc-logo@64.png');
  const $bcNudge = $(
    `<div class="bc-nudge"><img src="${bcLogo}"/></div>`
  ).appendTo(selectors[type].msgElement);

  // add loader
  $bcNudge.append(`<span class="loader">Searching Bandcamp</span>`);

  // scrape bandcamp search
  const bcResult = await getBCResult(artist);

  // remove loader
  $bcNudge.find('.loader').remove();

  // render final state
  if (bcResult) {
    $bcNudge
      .addClass('success')
      .append(
        `<a target="_blank" href="${bcResult.url}">Support this artist on Bandcamp</a>`
      );
  } else {
    $bcNudge
      .addClass('failure')
      .append(`<span>Couldn't find this artist on Bandcamp</span>`);
  }
}

// get the artist's bandcamp URL
async function getBCResult(artist) {
  const bcParams = {
    query: artist,
    page: 1,
  };
  // ask background script to fetch for us (CORS workaround)
  let bcResults;
  try {
    const response = await browser.runtime.sendMessage({ bcParams });
    bcResults = response.bcResults;
  } catch (err) {
    console.log(err, err.stack);
    bcResults = [];
  }
  // find the best result
  return bcResults.find(
    (result) =>
      result.type == 'artist' &&
      result.name.toLowerCase() == artist.toLowerCase()
  );
  // returns a bandcamp search result object or null
}

// get artist name from the current spotify SPA view
function spotifyScrape() {
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
