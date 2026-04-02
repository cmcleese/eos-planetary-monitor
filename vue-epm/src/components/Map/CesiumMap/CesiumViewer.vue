<script setup lang="ts">
import { onMounted, onBeforeUnmount, useTemplateRef, inject } from 'vue';
import type { useCesium } from '@/components/Map/CesiumMap/useCesium';
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
const engine = inject<ReturnType<typeof useCesium>>('planetaryEngine');

onMounted(async () => {
  if (mapContainer.value && props.mapEnabled) {
    await engine?.initialize(mapContainer.value);
    console.log('EOS Planetary Engine: Online');
  }
});

onBeforeUnmount(() => {
  if (engine?.viewer.value) {
    engine.viewer.value.destroy();
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
