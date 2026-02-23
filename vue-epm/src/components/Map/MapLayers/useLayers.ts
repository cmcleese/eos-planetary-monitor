import { markRaw, type Component } from 'vue';

import ISSLayer from '@/components/Map/MapLayers/ISS/ISSLayer.vue';
import ObservatoriesLayer from '@/components/Map/MapLayers/Observatories/ObservatoriesLayer.vue';
import { LAYER_CONFIGS, type LayerConfig } from '@/components/Map/MapLayers/layers.config';

export interface IMapLayer extends LayerConfig {
  component: Component | null;
}

const COMPONENT_REGISTRY: Record<string, Component> = {
  'ZARYA-25544': markRaw(ISSLayer),
  'GROUND-STATIONS': markRaw(ObservatoriesLayer),
};

export function useLayers() {
  const layers: IMapLayer[] = LAYER_CONFIGS.map((config) => ({
    ...config,
    component: COMPONENT_REGISTRY[config.id] || null,
  }));

  return { layers };
}
