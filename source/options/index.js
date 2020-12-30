import bandcamp from 'bandcamp-search-scraper';

const optionsForm = document.querySelector('#search-form');
const textInput = document.querySelector('#search-input input');
const resultsPre = document.querySelector('#results-pre');

async function onFormSubmit(e) {
  e.preventDefault();

  const params = {
    query: textInput.value,
    page: 1,
  };

  resultsPre.classList.add('loading');
  notify('fetching results...');
  try {
    const result = await bandcamp.search(params);
    const displayData = result
      .map((item) => `${item.type}:\t${item.url}`)
      .join('\n');
    notify(displayData);
  } catch (err) {
    notify(err);
  }
  resultsPre.classList.remove('loading');
}

function notify(result) {
  if (result instanceof Error) {
    console.error(result);
    resultsPre.classList.add('error');
    resultsPre.innerText = result.name + ': ' + result.message;
  } else {
    console.log(result);
    resultsPre.classList.remove('error');
    resultsPre.innerText = result;
  }
}

optionsForm.addEventListener('submit', onFormSubmit);
