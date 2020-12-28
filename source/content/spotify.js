// Possibly-useful methods and variables related to the Spotify API

import SpotifyWebApi from 'spotify-web-api-js';
import getClientCredentials from 'get-spotify-client-credentials';
import { clientId, clientSecret } from './auth';

const spotify = new SpotifyWebApi();

const spotifyEndpointByType = {
  album: spotify.getAlbum,
  track: spotify.getTrack,
  artist: spotify.getArtist,
};

(async () => {
  const { type, id } = parseSpotifyURL(window.location.href);
  if (type && id) {
    const spotifyRequest = spotifyEndpointByType[type];
    try {
      const response = await spotifyRequest(id);
      processResponse(response);
    } catch (error) {
      console.error(error, error.stack);
    }
  } else {
    console.log('Not on an album, artist, or track page');
  }
})();

function processResponse(obj) {
  // placeholder
  console.log('Processing response: ' + obj);
}

// parse a spotify URL
export function parseSpotifyURL(url) {
  if (typeof url != 'string') {
    throw Error('parseSpotifyURL was passed a non-string argument.');
  } else {
    const regex = /https?:\/\/open\.spotify\.com\/(?<type>\w+)\/(?<id>[A-Za-z0-9]{22})/;
    const match = url.match(regex);
    return match?.groups;
  }
  // returns an object with "type" (artist, album, etc) and "id" (spotify id) properties (or null)
}

export function spotifyEndpointByType(type) {
  return spotify[
    {
      album: 'getAlbum',
      track: 'getTrack',
      artist: 'getArtist',
    }[type]
  ];
}

// custom request function using fetch
async function request(opts, callback) {
  try {
    const { url, ...requestOpts } = opts;
    const response = await fetch(url, requestOpts);
    callback(null, response, response.json());
  } catch (err) {
    callback(err);
  }
}

const credsRequestOpts = {
  clientId,
  clientSecret,
  request,
};

// get access token from spotify
async function getCredentials(opts) {
  return new Promise((resolve, reject) => {
    getClientCredentials(opts, (error, token) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });
  });
}

// export an access-token-empowered request generator
export async function generateSpotifyResolver() {
  try {
    spotifyResolverOpts.bearerToken = await getCredentials(credsRequestOpts);
  } catch (error) {
    console.log('Error getting access token:', error, error.stack);
  }
  return generateResolver(spotifyResolverOpts);
}
