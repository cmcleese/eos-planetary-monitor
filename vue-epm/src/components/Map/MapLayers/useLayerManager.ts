import { reactive } from 'vue';
import { SATELLITE_CONFIGS } from '@/constants/satellites';

const state = reactive({
  // Use the raw data constant, which has NO dependencies on components
  enabledLayerIds: new Set<string>(
    SATELLITE_CONFIGS.filter((s) => s.initialActive).map((s) => s.id)
  ),
});

export function useLayerManager() {
  const toggleLayer = (id: string) => {
    if (state.enabledLayerIds.has(id)) state.enabledLayerIds.delete(id);
    else state.enabledLayerIds.add(id);
  };
  const isLayerActive = (id: string) => state.enabledLayerIds.has(id);

  return { isLayerActive, toggleLayer };
}
