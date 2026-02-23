import { markRaw, type Component } from 'vue';
import ISSLayer from '@/components/Map/MapLayers/ISS/ISSLayer.vue';
import { SATELLITE_CONFIGS, type SatelliteLayerConfig } from '@/constants/satellites';

export interface SatelliteLayer extends SatelliteLayerConfig {
  component: Component | null;
}

export function useSatellites() {
  const satellites: SatelliteLayer[] = SATELLITE_CONFIGS.map((config) => ({
    ...config,
    // Attach the component only here
    component: config.id === 'ZARYA-25544' ? markRaw(ISSLayer) : null,
  }));

  return { satellites };
}
