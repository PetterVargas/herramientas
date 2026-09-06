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

export type CyberProfileEntry = {
  name: string;
  description?: string;
  url?: string;
};

export type CountryCyberProfile = {
  interestGroups: CyberProfileEntry[];
  authorities: CyberProfileEntry[];
  cybersecurityRegulations: CyberProfileEntry[];
  dataProtectionRegulations: CyberProfileEntry[];
  /** Empresas y canales de contacto para solicitudes judiciales. Solo poblado donde hay datos verificados. */
  judicialRequestContacts?: CyberProfileEntry[];
};
