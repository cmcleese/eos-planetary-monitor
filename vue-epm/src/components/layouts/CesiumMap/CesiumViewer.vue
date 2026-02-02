<script setup lang="ts">
import { onMounted, onBeforeUnmount, useTemplateRef } from 'vue';
import { useCesium } from '@/composables/useCesium';

const mapContainer = useTemplateRef('mapContainer');
const { initialize, viewer } = useCesium();

onMounted(async () => {
  if (mapContainer.value) {
    await initialize(mapContainer.value);
    console.log('EOS Planetary Engine: Online');
  }
});

onBeforeUnmount(() => {
  if (viewer.value) {
    viewer.value.destroy();
  }
});
</script>

<template>
  <div ref="mapContainer" class="cesium-viewport">
    <!-- Any HTML overlays for the globe specifically -->
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.cesium-viewport {
  width: 100%;
  height: 100%;
  background: black;
  position: relative;
}
</style>