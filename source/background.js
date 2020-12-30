/* Runs in the background across all tabs */

// port for communicating with content/index.js
let port;

// connect to port
browser.runtime.onConnect.addListener((p) => {
  port = p;
  console.log('listening on port ' + port.name);
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
    port.postMessage(message);
  }
}
