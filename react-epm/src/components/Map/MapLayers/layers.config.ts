// src/components/Map/MapLayers/layers.config.ts
export interface LayerConfig {
  id: string;
  name: string;
  type: string;
  initialActive: boolean;
  disabled: boolean;
}

export const LAYER_CONFIGS: LayerConfig[] = [
  {
    id: 'ZARYA-25544',
    name: 'International Space Station',
    type: 'Station',
    initialActive: true,
    disabled: false,
  },
  {
    id: 'GROUND-STATIONS',
    name: 'Ground Stations',
    type: 'Observatory',
    initialActive: true,
    disabled: false,
  },
  { id: '44065', name: 'Starlink-346', type: 'Comm', initialActive: false, disabled: true },
  { id: '43010', name: 'NOAA-20', type: 'Weather', initialActive: false, disabled: true },
  { id: '47020', name: 'GOES-18', type: 'Weather', initialActive: false, disabled: true },
];
