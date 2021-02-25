/* Runs in the background across all tabs */

import browser from 'webextension-polyfill';
import bandcamp from 'bandcamp-search-scraper';

// on installation
browser.runtime.onInstalled.addListener((details) => {
  if (details.reason == 'install') {
    browser.tabs.create({
      url: 'https://addieis.online/project/bananacamp?install',
      active: true,
    });
  }
  return false;
});

// bypass CORS by performing bandcamp fetch request for content script
browser.runtime.onMessage.addListener((message) => {
  console.log('fetching data for: ', message.query);
  return fetchBCData(message.query);
});

// can't be async, see content/index.js. returns a Promise as advised here:
// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage#Sending_an_asynchronous_response_using_a_Promise
export function fetchBCData(query) {
  return new Promise(async (resolve) => {
    let results;
    try {
      results = await bandcamp.search({ query, page: 1 });
    } catch (err) {
      results = [];
    }
    resolve({ results });
  });
}

// ports for sending notifications to tab
let ports = [];

// connect to port
browser.runtime.onConnect.addListener((p) => {
  ports[p.sender.tab.id] = p;

  // listen for changes to tab URLs
  browser.tabs.onUpdated.addListener(onURLChange);
});

// tell content scripts when their URL changes
function onURLChange(tabId, changeInfo) {
  const newURL = changeInfo.url;
  if (newURL && /open\.spotify\.com/.test(newURL)) {
    console.log('url changed:', newURL);
    const message = {
      url: newURL,
    };
    ports[tabId].postMessage(message);
  }
}
