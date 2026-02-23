import { reactive } from 'vue';
import { LAYER_CONFIGS } from '@/components/Map/MapLayers/layers.config';

const state = reactive({
  // Use the raw data constant, which has NO dependencies on components
  enabledLayerIds: new Set<string>(LAYER_CONFIGS.filter((s) => s.initialActive).map((s) => s.id)),
});

export function useLayerManager() {
  const toggleLayer = (id: string) => {
    if (state.enabledLayerIds.has(id)) state.enabledLayerIds.delete(id);
    else state.enabledLayerIds.add(id);
  };
  const isLayerActive = (id: string) => state.enabledLayerIds.has(id);

  return { isLayerActive, toggleLayer };
}
