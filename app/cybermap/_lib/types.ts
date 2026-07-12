export type CountryDetails = {
  'M49 Code': number;
  'ISO-alpha2 Code': string;
  'ISO-alpha3 Code': string;
  'Least Developed Countries (LDC)'?: string;
  'Land Locked Developing Countries (LLDC)'?: string;
  'Small Island Developing States (SIDS)'?: string;
};

export type CountryData = {
  [continent: string]: {
    [region: string]: Array<{
      [countryName: string]: CountryDetails;
    }>;
  };
};

export type WorldData = {
  World: CountryData;
};
