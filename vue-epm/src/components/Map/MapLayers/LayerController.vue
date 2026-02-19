<script setup lang="ts">
import { inject } from 'vue';

import { useLayerManager } from '@/components/Map/MapLayers/useLayerManager';
import ISSLayer from '@/components/Map/MapLayers/ISS/ISSLayer.vue';
import type { useCesium } from '@/components/Map/CesiumMap/useCesium';

const engine = inject<ReturnType<typeof useCesium>>('planetaryEngine');

const { isLayerActive } = useLayerManager();

// Map layer IDs
const LAYER_MAP = {
  ISS: 'ZARYA-25544',
  // STARLINK: '44065', // Future component
};
</script>

<template>
  <!-- 
    The "Bridge": If the ID is active in the manager, 
    we mount the ISSLayer component. 
    Vue will call onMounted in ISSLayer, which adds the entity to Cesium!
  -->
  <template v-if="engine?.mapReady">
    <ISSLayer v-if="isLayerActive(LAYER_MAP.ISS)" />
  </template>

  <!-- Future layers go here -->
  <!-- <StarlinkLayer v-if="isLayerActive(LAYER_MAP.STARLINK)" /> -->
</template>
