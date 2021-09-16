import { processData } from "./dataAPI.js";

// creatElement();
const result = document.getElementById("searchForm");
result.addEventListener("submit", (event) => {
  event.preventDefault();
  findAndPrint(result.search.value);
});

async function findAndPrint(country) {
  // console.log(result);
  const ulConfirmed = document.getElementById("confirmed");
  const ulContryRegion = document.getElementById("countryRegion");
  const ulDeaths = document.getElementById("deaths");
  const ulProvinceStae = document.getElementById("provinceState");
  const colContainers = [ulConfirmed, ulContryRegion, ulDeaths, ulProvinceStae];

  const results = await getDataByCountry(country);
  showResult(results, colContainers);
}

async function getDataByCountry(value) {
  const processedData = await processData();
  const filteredList = processedData.filter(filterByCountryOrProvince(value));
  return filteredList;
}

function showResult(results, colContainers) {
  results.forEach(printRowData(colContainers));
}

function printRowData(colContainers = []) {
  return (resultObj) => {
    const { confirmed, countryRegion, deaths, provinceState } = resultObj;
    const rowData = [confirmed, countryRegion, deaths, provinceState];
    rowData.forEach(printResultToScreen(colContainers));
  };
}

function printResultToScreen(colContainers) {
  return (listElement, i) => {
    const newItem = document.createElement("li");
    newItem.append(listElement);
    colContainers[i].append(newItem);
  };
}

function filterByCountryOrProvince(value) {
  const filterCB = (str) =>
    String(str).toLowerCase() === String(value).toLowerCase();

  return ({ countryRegion, provinceState }) =>
    filterCB(countryRegion) || filterCB(provinceState);
}
