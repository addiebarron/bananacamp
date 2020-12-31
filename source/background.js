/* Runs in the background across all tabs */

import browser from 'webextension-polyfill';
import bandcamp from 'bandcamp-search-scraper';

// bypass CORS by performing bandcamp fetch request for content script
browser.runtime.onMessage.addListener(fetchBCData);

// can't be async, see content/index.js. returns a Promise as advised here:
// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage#Sending_an_asynchronous_response_using_a_Promise
function fetchBCData(message) {
  return new Promise(async (resolve) => {
    if (message.bcParams) {
      let bcResults;
      try {
        bcResults = await bandcamp.search(message.bcParams);
      } catch (err) {
        console.error(err);
        bcResults = [];
      }
      resolve({ bcResults });
    }
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
    console.log('url changed');
    const message = {
      url: newURL,
    };
    ports[tabId].postMessage(message);
  }
}
