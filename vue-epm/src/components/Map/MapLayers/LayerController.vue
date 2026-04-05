<script setup lang="ts">
import { useLayerManager } from '@/components/Map/MapLayers/useLayerManager';
import { useLayers } from '@/components/Map/MapLayers/useLayers';
import { usePlanetaryEngine } from '@/components/Map/CesiumMap/keys';

const engine = usePlanetaryEngine();

const { isLayerActive } = useLayerManager();
const { layers } = useLayers();
</script>

<template>
  <template v-if="engine.mapReady.value">
    <!-- Loop through map layers -->
    <template
      v-for="layer in layers"
      :key="layer.id"
    >
      <component
        :is="layer.component"
        v-if="isLayerActive(layer.id) && layer.component"
      />
    </template>
  </template>
</template>
