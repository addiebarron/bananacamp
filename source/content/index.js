/* RUNS ON DOCUMENT READY */

import { spotifyScrape, parseSpotifyURL } from './spotify';
import { bandcampSearch } from './bandcamp';

// establish a port for communicating with the background script
let port = browser.runtime.connect({ name: 'url-change-port' });

// run our code each time the SPA url changes
port.onMessage.addListener(onURLChange);
// run once on page load
onURLChange({ url: window.location.href });

// to be run when the page URL changes
function onURLChange(message) {
  const newURL = message.url;
  const { type } = parseSpotifyURL(newURL);
  // can't use async here, for webextension reasons
  // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage#Parameters
  spotifyScrape(type).then(processScrapedData).catch(console.error);
}

async function processScrapedData(spData) {
  const bcResults = await bandcampSearch(spData.artist);
  let canonical;
  bcResults
    .filter((result) => result.type == spData.type)
    .forEach((result) => {
      if (
        result.type == 'artist' &&
        result.name.toLowerCase() == spData.artist.toLowerCase()
      ) {
        canonical = result;
      } else if (
        result.type == 'album' &&
        result.name.toLowerCase() == spData.album.toLowerCase() &&
        result.artist.toLowerCase() == spData.artist.toLowerCase()
      ) {
        canonical = result;
      }
    });
  if (canonical) {
    console.log(`This ${canonical.type} is on Bandcamp: ${canonical.url}`);
  } else {
    console.log(`Couldn't find this ${spData.type} on Bandcamp.`);
  }
}

// scrape a spotify web page for artist and album names

// import SpotifyWebApi from 'spotify-web-api-js';

// const spotify = new SpotifyWebApi();

// const spotifyEndpointByType = {
//   album: spotify.getAlbum,
//   track: spotify.getTrack,
//   artist: spotify.getArtist,
// };

// (async () => {
//   const { type, id } = parseSpotifyURL(window.location.href);
//   if (type && id) {
//     const spotifyRequest = spotifyEndpointByType[type];
//     try {
//       const response = await spotifyRequest(id);
//       processResponse(response);
//     } catch (error) {
//       console.error(error, error.stack);
//     }
//   } else {
//     console.log('Not on an album, artist, or track page');
//   }
// })();

// function processResponse(obj) {
//   // placeholder
//   console.log('Processing response: ' + obj);
// }
