import { getloadSpinner, printCovidData } from './lib/research.js';

export const searchForm = document.getElementById('searchForm');
getloadSpinner()?.hide();
searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  await printCovidData(searchForm.search.value || 'all');
});
