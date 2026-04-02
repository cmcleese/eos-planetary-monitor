<script setup lang="ts">
import { inject } from 'vue';

import { useLayerManager } from '@/components/Map/MapLayers/useLayerManager';
import type { useCesium } from '@/components/Map/CesiumMap/useCesium';
import { useLayers } from '@/components/Map/MapLayers/useLayers';

const engine = inject<ReturnType<typeof useCesium>>('planetaryEngine');

const { isLayerActive } = useLayerManager();
const { layers } = useLayers();
</script>

<template>
  <template v-if="engine?.mapReady.value">
    <!-- Loop through our registry -->
    <template
      v-for="layer in layers"
      :key="layer.id"
    >
      <!-- 
        Mount the component ONLY if:
        1. It's active in the manager
        2. The component actually exists (not null)
      -->
      <component
        :is="layer.component"
        v-if="isLayerActive(layer.id) && layer.component"
      />
    </template>
  </template>
</template>
