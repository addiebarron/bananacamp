import { promises as fs } from 'fs';
import { resolve } from 'path';
import { runScraper } from '@/content';
import * as utilModule from '@/content/util';

describe('HTML injection', () => {
  let i = 0;

  const testCases = [
    ['artist', 'Mother Moses', 'https://mothermoses.bandcamp.com'],
    // ['album', 'Sadurn', 'https://sadurn.bandcamp.com'],
    ['verifiedArtist', 'Carole King', null],
  ];

  it.each(testCases)(
    'should inject successfully on %s pages',
    async (type, artist, url) => {
      i++;

      const getSpotifyInfoSpy = jest.spyOn(utilModule, 'getSpotifyInfo');
      getSpotifyInfoSpy.mockReturnValue({ artist, type });

      const getBCInfoSpy = jest.spyOn(utilModule, 'getBCInfo');
      getBCInfoSpy.mockReturnValue({ url });

      const testHTML = await fs.readFile(
        resolve(__dirname, `./testpages/${type}.html`)
      );
      document.body.innerHTML = testHTML;

      await runScraper();

      expect(getSpotifyInfoSpy).toHaveBeenCalledTimes(i);
      expect(getBCInfoSpy).toHaveBeenCalledTimes(i);
      expect(document.body.innerHTML).toMatchSnapshot();
    }
  );
});
