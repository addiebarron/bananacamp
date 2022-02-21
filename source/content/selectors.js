// Construct some nasty selectors

const artist = {
  artist: [
    'section[data-testid="artist-page"]',
    'div',
    'div:first-of-type',
    'div:last-of-type',
    'span:first-child',
    'h1',
  ].join('>'),
  msgElement: [
    'section[data-testid="artist-page"]',
    'div',
    'div:first-of-type',
    'div:last-of-type',
    'span:last-child',
  ].join('>'),
}

const verifiedArtist = {
  artist: [
    'section[data-testid="artist-page"]',
    'div',
    'div:first-of-type',
    'div:nth-child(2)',
    'span:nth-child(2)',
    'h1',
  ].join('>'),
  msgElement: [
    'section[data-testid="artist-page"]',
    'div',
    'div:first-of-type',
    'div:nth-child(2)',
    'span:nth-child(3)',
  ].join('>'),
}

// not currently used
const album = {
  album: [
    'section[data-testid="album-page"]',
    'div:first-child',
    'div:nth-child(5)',
    'span:first-of-type',
    'h1',
  ].join('>'),
  artist: [
    'section[data-testid="album-page"]',
    'div:first-child',
    'div:nth-child(5)',
    'div:last-child',
    'div:first-child',
    'span:nth-child(2)',
    'a',
  ],
  msgElement: [
    'section[data-testid="album-page"]',
    'div:first-child',
    'div:nth-child(5)',
    'div:last-child',
  ].join('>'),
}

let verifiedSVG = [
  'section[data-testid="artist-page"]',
  'div',
  'div:first-of-type',
  'div:nth-child(2)',
  'span:first-child',
  'svg'
].join('>')

export default {
  artist,
  verifiedArtist,
  // album,
  verifiedSVG,
};