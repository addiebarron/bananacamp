import browser from 'webextension-polyfill';

const version = browser.runtime.getManifest().version;

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('version').innerText = version;
});
