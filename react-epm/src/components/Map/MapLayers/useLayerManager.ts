import { create } from 'zustand';
import { LAYER_CONFIGS } from './layers.config';

interface LayerState {
  enabledLayerIds: Set<string>;
  toggleLayer: (id: string) => void;
}

/**
 * Global Store for managing map layer visibility.
 * This shares the 'enabledLayerIds' set across any component that asks for it.
 */
const useLayerStore = create<LayerState>((set) => ({
  enabledLayerIds: new Set<string>(LAYER_CONFIGS.filter((s) => s.initialActive).map((s) => s.id)),

  toggleLayer: (id) =>
    set((state) => {
      const next = new Set(state.enabledLayerIds);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return { enabledLayerIds: next };
    }),
}));

export function useLayerManager() {
  const enabledLayerIds = useLayerStore((state) => state.enabledLayerIds);
  const toggleLayer = useLayerStore((state) => state.toggleLayer);

  const isLayerActive = (id: string) => enabledLayerIds.has(id);

  return { isLayerActive, toggleLayer };
}
