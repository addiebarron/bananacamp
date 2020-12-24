import bandcamp from 'bandcamp-search-scraper';

export async function bandcampSearch(query) {
  const params = {
    query,
    page: 1,
  };

  const result = await bandcamp.search(params);

  return result;
}
