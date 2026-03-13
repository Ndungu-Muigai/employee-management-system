// helpers/countries.js
import { countries as countryData } from "countries-list";

export const getCountryName = code => countryData[code]?.name || code
