// import optionsStorage from './options-storage';

// optionsStorage.syncForm('#search-form');

import bandcamp from 'bandcamp-scraper';

const optionsForm = document.querySelector('#search-form');
const textInput = document.querySelector('#search-input input');
const resultsPre = document.querySelector('#results-pre');

let query = textInput.value;

const bc_params = {
	query,
	page: 1,
};

function do_search (bc_params) {
	return new Promise( (resolve, reject) => {
		try {
			bandcamp.search(bc_params, (error, results) => {
				if (error) reject(error)
				resolve(results)
			});
		} catch (err) {
			console.log(err);
			reject(err);
		}		
	});
}

async function onFormSubmit (e) {
	e.preventDefault();

	let result;
	resultsPre.classList.add('loading');
	notify('fetching results...');

	try {
		result = await do_search(bc_params);
		resultsPre.classList.remove('loading');
		notify(result);
	} catch (err) {
		notify(err);
	}
}

function notify (result) {	
	if (result instanceof Error) {
		console.error(result)
		resultsPre.classList.add('error');
		resultsPre.innerText = result.name + ': ' + result.message;
	} else {
		console.log(result);
		resultsPre.classList.remove('error');
		resultsPre.innerText = result;
	}
}

optionsForm.addEventListener('submit', onFormSubmit);