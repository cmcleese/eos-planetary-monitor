<script setup lang="ts">
import { onMounted, onBeforeUnmount, useTemplateRef } from 'vue';
import { useCesium } from '@/composables/useCesium';

const props = withDefaults(
  defineProps<{
    mapEnabled?: boolean;
  }>(),
  {
    mapEnabled: true,
  }
);

const mapContainer = useTemplateRef('mapContainer');
const { initialize, viewer } = useCesium();

onMounted(async () => {
  if (mapContainer.value && props.mapEnabled) {
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
  <div ref="mapContainer" class="relative h-full w-full bg-black/10">
    <!-- Any HTML overlays for the globe specifically -->
    <slot></slot>
    <div v-if="!props.mapEnabled" class="absolute inset-0 flex items-center justify-center">
      Map is disabled
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
