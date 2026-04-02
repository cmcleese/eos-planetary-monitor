import React from 'react';
import ISSLayer from './ISS/ISSLayer';
import ObservatoriesLayer from './Observatories/ObservatoriesLayer';
import { LAYER_CONFIGS, type LayerConfig } from './layers.config';

export interface IMapLayer extends LayerConfig {
  component: React.ComponentType | null;
}

/**
 * Registry of IDs and their corresponding map layer components.
 * This works just like your Vue version, but without needing 'markRaw'.
 */
const COMPONENT_REGISTRY: Record<string, React.ComponentType> = {
  'ZARYA-25544': ISSLayer,
  'GROUND-STATIONS': ObservatoriesLayer,
};

export function useLayers() {
  /**
   * Return the list of layers with their associated components.
   * Components use these to dynamically render active layers on the map.
   */
  const layers: IMapLayer[] = LAYER_CONFIGS.map((config) => ({
    ...config,
    component: COMPONENT_REGISTRY[config.id] || null,
  }));

  return { layers };
}
