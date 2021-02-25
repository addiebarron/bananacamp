// construct some nasty selectors

const sharedParents = [
  '.os-content',
  '.main-view-container__scroll-node-child',
  'section',
  'div:first-of-type',
];
export default {
  verifiedArtist: {
    artist: sharedParents
      .concat(['div', 'div', 'span:nth-child(2)', 'h1'])
      .join('>'),
    msgElement: sharedParents
      .concat(['div', 'div', 'span:nth-child(3)'])
      .join('>'),
  },
  artist: {
    artist: sharedParents
      .concat(['div:first-child', 'div:last-child', 'span:first-child', 'h1'])
      .join('>'),
    msgElement: sharedParents
      .concat(['div:first-child', 'div:last-child', 'span:last-child'])
      .join('>'),
  },
  album: {
    artist: sharedParents
      .concat(['div:nth-of-type(5)', 'div', 'div:first-child', 'a'])
      .join('>'),
    msgElement: sharedParents
      .concat(['div:last-child', 'div:last-child'])
      .join('>'),
  },
};
