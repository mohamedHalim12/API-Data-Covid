import { processData } from './dataAPI.js';
import useLoadSpinner from '../utils/load-spinner.js';
import { newElement } from '../utils/utils.js';

const loadSpinner = useLoadSpinner();
export function getloadSpinner() {
  return loadSpinner;
}

export async function printCovidData(typedValue = 'all') {
  loadSpinner.hide();
  try {
    loadSpinner.show();
    await findAndPrintData(typedValue);
    loadSpinner.hide();
  } catch (e) {
    console.log('Found Errors', e.message);
  }
}

async function findAndPrintData(countryOrProvince = 'all') {
  const allColumns = getAllTableColumns() || [];
  const clearColumn = (element) => element.replaceChildren([]);
  allColumns.forEach(clearColumn);
  const results = (await getDataByCountryProvince(countryOrProvince)) || [];
  showResult(results, allColumns);
}

function getAllTableColumns() {
  const ulContryRegion = document.getElementById('countryRegion');
  const ulProvinceState = document.getElementById('provinceState');
  const ulConfirmed = document.getElementById('confirmed');
  const ulDeaths = document.getElementById('deaths');

  return [ulContryRegion, ulProvinceState, ulConfirmed, ulDeaths];
}

async function getDataByCountryProvince(value = 'all') {
  const processedData = (await processData()) || [];
  if (value === 'all') return processedData;
  const filteredList = processedData.filter(filterByCountryOrProvince(value));
  console.log('Filtered Data', filteredList);
  return filteredList;
}

function filterByCountryOrProvince(value) {
  const filterCB = (str) =>
    String(str).toLowerCase() === String(value).toLowerCase();
  return ({ countryRegion: c, provinceState: r }) => filterCB(c) || filterCB(r);
}

function showResult(resultsData = [], colContainers = []) {
  const printRowData = (resultObj = {}) => {
    const { countryRegion, provinceState, confirmed, deaths } = resultObj;
    const rowData = [countryRegion, provinceState, confirmed, deaths];
    rowData.forEach(appendDataToColumns(colContainers));
  };

  resultsData.forEach(printRowData);
}

function appendDataToColumns(allColumns = []) {
  return (resData = '', i = 0) => {
    const resItem = newElement('li', { class: 'data-result-item' }, [resData]);
    allColumns[i].append(resItem);
  };
}
