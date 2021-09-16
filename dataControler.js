import { processData } from "./dataAPI.js";
creatListElement();
// console.log("hello");
async function creatListElement() {
  // console.log(processData());

  const ulConfirmed = document.getElementById("confirmed");
  const ulContryRegion = document.getElementById("countryRegion");
  const ulDeaths = document.getElementById("deaths");
  const ulProvinceStae = document.getElementById("provinceState");
  const ulLists = [ulConfirmed, ulContryRegion, ulDeaths, ulProvinceStae];
  const processedData = await processData();
  processedData.forEach((list) => {
    const { confirmed, countryRegion, deaths, provinceState } = list;

    [confirmed, countryRegion, deaths, provinceState].forEach(
      (listElement, i) => {
        const newItem = document.createElement("li");
        newItem.append(listElement);
        ulLists[i].append(newItem);
      },
    );
  });
}
