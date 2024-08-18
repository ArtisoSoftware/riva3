import country_allcompare from "../../src/assets/country_allcompare.json";
export function countryName(iso) {
  return country_allcompare.filter((x) => x.iso == iso);
}
