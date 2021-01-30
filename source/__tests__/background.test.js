import { fetchBCData } from '@/background';
import bandcamp from 'bandcamp-search-scraper';

// mock fetch
global.fetch = jest.fn(() => Promise.resolve());

describe('Bandcamp search scraper call', () => {
  const testParams = [
    'Sufjan Stevens',
    'falkjflieusabl',
    '6f7s^$agfC5$8X_Q&Zu7',
  ];
  it.each(testParams)('should query bandcamp for search term "%s"', (query) => {
    const bcSearchSpy = jest.spyOn(bandcamp, 'search');
    fetchBCData(query);
    expect(bcSearchSpy).toHaveBeenCalledWith({ query, page: 1 });
  });
});
