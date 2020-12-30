/* Runs in the background across all tabs */

let port;

// port for communicating with content/index.js
browser.runtime.onConnect.addListener((p) => {
  port = p;
  console.log('connected on port ' + port.name);
  // listen for changes to tab URLs
  browser.tabs.onUpdated.addListener(onURLChange);
});

function onURLChange(tabId, changeInfo) {
  const newURL = changeInfo.url;
  if (newURL && /open\.spotify\.com/.test(newURL)) {
    // when the url changes, notify the content script
    const message = {
      greeting: 'hi! the URL has changed.',
      url: newURL,
    };
    port.postMessage(message);
    console.log(`Sent message to tab ${tabId} on port ${port.name}`);
    console.log(message);
  }
}
