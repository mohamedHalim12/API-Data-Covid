(async () => {
  // return await processData();
})();

export async function processData() {
  const datalink = await getData("https://covid19.mathdro.id/api");
  const { confirmed } = datalink;
  const data = await getData(confirmed.detail);
  // console.log(data);
  const filterData = ({ provinceState, countryRegion, confirmed, deaths }) => ({
    provinceState,
    countryRegion,
    confirmed,
    deaths,
  });
  const sortData = ({ countryRegion: a }, { countryRegion: b }) => {
    if (a > b) return 1;
    else return -1;
  };
  const datafinal = data.map(filterData).sort(sortData);
  console.log(datafinal);
  return datafinal;
}

async function getData(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Erreur not found");
    }
    const dataGlobale = await res.json();
    // console.log(dataGlobale);
    return dataGlobale;
  } catch (err) {
    console.error(err.message);
  }
}
