import type { CountryCyberProfile } from '../types';

import { africaCyberProfiles } from './africa';
import { americasCyberProfiles } from './americas';
import { asiaCyberProfiles } from './asia';
import { europeCyberProfiles } from './europe';
import { oceaniaCyberProfiles } from './oceania';

/**
 * Perfiles de ciberseguridad por país, indexados por código ISO-alpha2.
 * Cubre los ~195 estados soberanos; los territorios/dependencias sin
 * autoridad o normativa propia no tienen entrada.
 */
export const cyberProfiles: Record<string, CountryCyberProfile> = {
  ...africaCyberProfiles,
  ...americasCyberProfiles,
  ...asiaCyberProfiles,
  ...europeCyberProfiles,
  ...oceaniaCyberProfiles,
};

export function getCyberProfile(
  isoAlpha2Code: string,
): CountryCyberProfile | undefined {
  return cyberProfiles[isoAlpha2Code.toUpperCase()];
}
