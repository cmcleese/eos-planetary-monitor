<script setup lang="ts">
import { inject } from 'vue';

import { useLayerManager } from '@/components/Map/MapLayers/useLayerManager';
import type { useCesium } from '@/components/Map/CesiumMap/useCesium';
import { useSatellites } from '@/components/Map/MapLayers/useSatellites';

const engine = inject<ReturnType<typeof useCesium>>('planetaryEngine');

const { isLayerActive } = useLayerManager();
const { satellites } = useSatellites();
</script>

<template>
  <template v-if="engine?.mapReady.value">
    <!-- Loop through our registry -->
    <template v-for="sat in satellites" :key="sat.id">
      <!-- 
        Mount the component ONLY if:
        1. It's active in the manager
        2. The component actually exists (not null)
      -->
      <component :is="sat.component" v-if="isLayerActive(sat.id) && sat.component" />
    </template>
  </template>
</template>
