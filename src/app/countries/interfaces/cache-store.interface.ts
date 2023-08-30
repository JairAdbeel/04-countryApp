import { Country } from "./country";
import { Region } from "./region.type";

export interface CacheStore {
  byCapital: TermCountries;
  byCountry: TermCountries;
  byRegion:  TermCountriesByRegion;
}

export interface TermCountries {
  term:      string;
  countries: Country[];
}

export interface TermCountriesByRegion {
  term?:     Region;
  countries: Country[];
}
