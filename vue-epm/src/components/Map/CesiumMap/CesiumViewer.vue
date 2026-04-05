<script setup lang="ts">
import { onMounted, onBeforeUnmount, useTemplateRef } from 'vue';
import { usePlanetaryEngine } from '@/components/Map/CesiumMap/keys';
import LayerController from '@/components/Map/MapLayers/LayerController.vue';

const props = withDefaults(
  defineProps<{
    mapEnabled?: boolean;
  }>(),
  {
    mapEnabled: true,
  }
);

const mapContainer = useTemplateRef('mapContainer');
const cesiumInstance = usePlanetaryEngine();

onMounted(async () => {
  if (mapContainer.value && props.mapEnabled) {
    await cesiumInstance.initialize(mapContainer.value);
    console.log('EOS Planetary cesiumInstance: Online');
  }
});

onBeforeUnmount(() => {
  if (cesiumInstance.viewer.value) {
    cesiumInstance.viewer.value.destroy();
  }
});
</script>

<template>
  <div
    ref="mapContainer"
    class="relative h-full w-full bg-black/10"
  >
    <!-- Headless components that interact with the globe -->
    <LayerController />
    <!-- Any HTML overlays for the globe specifically -->
    <slot></slot>
    <div
      v-if="!props.mapEnabled"
      class="absolute inset-0 flex items-center justify-center"
    >
      Map is disabled
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
