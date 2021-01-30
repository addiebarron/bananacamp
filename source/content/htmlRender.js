import browser from 'webextension-polyfill';

import $ from 'jquery';
import selectors from './selectors';

export default class {
  constructor(type) {
    this.type = type;
    const bcLogo = browser.runtime.getURL('media/bc-logo@64.png');
    this.$bananacamp = $(
      `<div class="bananacamp"><img src="${bcLogo}"/></div>`
    );
  }

  addLoader() {
    this.$bananacamp.append(`<span class="loader">Searching Bandcamp</span>`);
  }

  removeLoader() {
    this.$bananacamp.find('.loader').remove();
  }

  renderInitialState() {
    $('.bananacamp').remove(); // clear any stragglers;
    this.$bananacamp.appendTo(selectors[this.type].msgElement);
    this.addLoader();
  }

  renderFinalState(result) {
    this.removeLoader();
    if (result) {
      this.$bananacamp
        .addClass('success')
        .append(
          `<a target="_blank" href="${result.url}">Support this artist on Bandcamp</a>`
        );
    } else {
      this.$bananacamp
        .addClass('failure')
        .append(`<span>Couldn't find this artist on Bandcamp</span>`);
    }
  }
}
