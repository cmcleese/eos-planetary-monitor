// src/constants/space-weather.ts
export const GEO_STORM_LEVELS: Record<
  number,
  { label: string; status: 'normal' | 'warning' | 'critical' }
> = {
  0: { label: 'QUIET', status: 'normal' },
  1: { label: 'QUIET', status: 'normal' },
  2: { label: 'QUIET', status: 'normal' },
  3: { label: 'UNSETTLED', status: 'normal' },
  4: { label: 'ACTIVE', status: 'warning' },
  5: { label: 'G1 - MINOR', status: 'warning' },
  6: { label: 'G2 - MODERATE', status: 'warning' },
  7: { label: 'G3 - STRONG', status: 'critical' },
  8: { label: 'G4 - SEVERE', status: 'critical' },
  9: { label: 'G5 - EXTREME', status: 'critical' },
};
