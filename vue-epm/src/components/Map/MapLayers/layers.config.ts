// src/components/Map/MapLayers/satellites.config.ts
export interface LayerConfig {
  id: string;
  name: string;
  type: string;
  initialActive: boolean;
}

export const LAYER_CONFIGS: LayerConfig[] = [
  { id: 'ZARYA-25544', name: 'International Space Station', type: 'Station', initialActive: true },
  { id: '44065', name: 'Starlink-346', type: 'Comm', initialActive: false },
  { id: '43010', name: 'NOAA-20', type: 'Weather', initialActive: false },
  { id: '47020', name: 'GOES-18', type: 'Weather', initialActive: false },
  { id: 'GROUND-STATIONS', name: 'Ground Stations', type: 'Observatory', initialActive: true },
];
