// src/composables/useLayerManager.ts
import { reactive, computed } from 'vue';

// Shared state
const state = reactive({
  // Initialize with IDs you want ON by default
  enabledLayerIds: new Set<string>([]),
});

export function useLayerManager() {
  const toggleLayer = (id: string) => {
    if (state.enabledLayerIds.has(id)) {
      state.enabledLayerIds.delete(id);
    } else {
      state.enabledLayerIds.add(id);
    }
  };

  const isLayerActive = (id: string) => state.enabledLayerIds.has(id);

  return {
    enabledLayerIds: computed(() => Array.from(state.enabledLayerIds)),
    isLayerActive,
    toggleLayer,
  };
}
