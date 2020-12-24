// SPOTIFY UTILITY FUNCTIONS

// parse a spotify URL
export function parseSpotifyURL(url) {
  if (typeof url != 'string') {
    throw Error('parseSpotifyURL was passed a non-string argument.');
  } else {
    const regex = /https?:\/\/open\.spotify\.com\/(?<type>\w+)\/(?<id>[A-Za-z0-9]{22})/;
    const match = url.match(regex);
    return match?.groups;
  }
  // returns an object with "type" (album, track, etc) and "id" (spotify id) properties
}

// scrape the current spotify SPA view
export function spotifyScrape(type) {
  // construct some nasty selectors
  const upperSection = [
    '.os-content',
    '.main-view-container__scroll-node-child',
    'section',
    'div:first-of-type',
  ];
  const selectors = {
    verifiedArtist: {
      artist: upperSection
        .concat(['div', 'div', 'span:nth-child(2)', 'h1'])
        .join('>'),
    },
    artist: {
      artist: upperSection
        .concat([
          'div:first-of-type',
          'div:last-of-type',
          'span:first-of-type',
          'h1',
        ])
        .join('>'),
    },
    album: {
      album: upperSection
        .concat(['div:nth-of-type(5)', 'span', 'h1'])
        .join('>'),
      artist: upperSection
        .concat(['div:nth-of-type(5)', 'div', 'a[href^="/artist"]'])
        .join('>'),
    },
  };

  // scrape the page!
  return new Promise((resolve, reject) => {
    const data = {};
    const attemptLimit = 100;
    const attemptPeriod = 50;

    // try to scrape the page every 50ms with a 100-attempt limit.
    // this allows some time for the page content to load after a url change.
    // scraping single page apps is a fucking nightmare
    let attempts = 0;
    const tryScraping = () => {
      switch (type) {
        case 'album':
          data.album = document.querySelector(selectors.album.album)?.innerText;
          data.artist = document.querySelector(
            selectors.album.artist
          )?.innerText;
          if (data.album && data.artist) {
            data.complete = true;
          }
          break;
        case 'artist':
          data.artist =
            document.querySelector(selectors.artist.artist)?.innerText ||
            document.querySelector(selectors.verifiedArtist.artist)?.innerText;
          if (data.artist) data.complete = true;
          break;
      }

      if (!data.complete && attempts < attemptLimit) {
        attempts++;
        setTimeout(tryScraping, attemptPeriod);
      } else {
        if (data.complete) {
          delete data.complete;
          data.type = type;
          resolve(data);
        } else {
          reject('Could not scrape page.');
        }
      }
    };

    tryScraping();
  });
  // resolves to an object with an "artist" and optional "album" property
}

//import getClientCredentials from 'get-spotify-client-credentials';
//import { clientId, clientSecret } from './auth';

// export function spotifyEndpointByType(type) {
//   return spotify[
//     {
//       album: 'getAlbum',
//       track: 'getTrack',
//       artist: 'getArtist',
//     }[type]
//   ];
// }

// custom request function using fetch
// async function request(opts, callback) {
//   try {
//     const { url, ...requestOpts } = opts;
//     const response = await fetch(url, requestOpts);
//     callback(null, response, response.json());
//   } catch (err) {
//     callback(err);
//   }
// }

// const credsRequestOpts = {
//   clientId,
//   clientSecret,
//   request,
// };

// // get access token from spotify
// async function getCredentials(opts) {
//   return new Promise((resolve, reject) => {
//     getClientCredentials(opts, (error, token) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(token);
//       }
//     });
//   });
// }

// // export an access-token-empowered request generator
// export async function generateSpotifyResolver() {
//   try {
//     spotifyResolverOpts.bearerToken = await getCredentials(credsRequestOpts);
//   } catch (error) {
//     console.log('Error getting access token:', error, error.stack);
//   }
//   return generateResolver(spotifyResolverOpts);
// }
