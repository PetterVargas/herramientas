'use client';

import { useEffect, useState } from 'react';

import type { CountryDetails, WorldData } from './types';

export const useCountryData = () => {
  const [worldData, setWorldData] = useState<WorldData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCountryData = async () => {
      try {
        const response = await fetch(
          '/herramientas/cybermap/standard_country_or_area_codes_for_statistical_use_m49.json',
        );

        if (!response.ok) {
          throw new Error(`Error loading country data: ${response.statusText}`);
        }

        const data = (await response.json()) as WorldData;
        setWorldData(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Unknown error loading country data',
        );
        console.error('Error loading country data:', err);
      } finally {
        setLoading(false);
      }
    };

    void loadCountryData();
  }, []);

  const findCountryByCode = (
    isoCode: string,
  ): [string, CountryDetails] | null => {
    if (!worldData) {
      return null;
    }

    for (const continent in worldData.World) {
      const continentData = worldData.World[continent];
      if (!continentData) continue;

      for (const region in continentData) {
        const regionData = continentData[region];
        if (!regionData) continue;

        for (const countryObj of regionData) {
          for (const countryName in countryObj) {
            const details = countryObj[countryName];

            if (!details) continue;

            if (
              details['ISO-alpha2 Code'].toLowerCase() === isoCode.toLowerCase()
            ) {
              return [countryName, details];
            }
          }
        }
      }
    }

    return null;
  };

  return { worldData, loading, error, findCountryByCode };
};
