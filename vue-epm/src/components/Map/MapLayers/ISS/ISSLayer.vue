<script setup lang="ts">
import { onMounted, onUnmounted, inject, markRaw, ref } from 'vue';
import { Cartesian3, Color, PolylineGlowMaterialProperty, Entity } from 'cesium';

import type { useCesium } from '@/components/Map/CesiumMap/useCesium';
import { useLayerManager } from '@/components/Map/MapLayers/useLayerManager';

const { viewer } = inject<ReturnType<typeof useCesium>>('planetaryEngine')!;
const { isLayerActive } = useLayerManager();

const issEntity = ref<Entity | null>(null);

const ISS_ID = 'ZARYA-25544';
const trackISS = (lat: number, lon: number, alt: number) => {
  if (!viewer.value) return;

  const position = Cartesian3.fromDegrees(lon, lat, alt * 1000); // alt is in km, Cesium needs meters

  if (!issEntity.value) {
    // Create the ISS entity if it doesn't exist
    issEntity.value = markRaw(
      viewer.value.entities.add({
        id: ISS_ID,
        name: 'International Space Station',
        position: position,
        point: {
          pixelSize: 10,
          color: Color.fromCssColorString('#2dd4bf'), // Your orbit-cyan
          outlineColor: Color.WHITE,
          outlineWidth: 2,
        },
        label: {
          text: 'ISS',
          font: '12px monospace',
          fillColor: Color.fromCssColorString('#2dd4bf'),
          outlineColor: Color.BLACK,
          outlineWidth: 2,
          pixelOffset: new Cartesian3(0, -20, 0),
        },
        // Add a glowing trail
        path: {
          resolution: 1,
          material: new PolylineGlowMaterialProperty({
            glowPower: 0.1,
            color: Color.fromCssColorString('#2dd4bf'),
          }),
          width: 5,
          leadTime: 0,
          trailTime: 1000,
        },
      })
    );
  } else {
    // Update position
    issEntity.value.position = position as any;
  }
};

async function fetchISSPosition() {
  // Don't fetch if layer inactive
  if (!isLayerActive(ISS_ID)) return;
  try {
    const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
    const data = await response.json();
    trackISS(data.latitude, data.longitude, data.altitude);
  } catch (error) {
    console.error('ISS Tracking Error:', error);
  }
}

let interval: number | null = null;

// Watch the layer state to handle cleanup/re-init
// 1. SETUP: When the v-if becomes true, this runs
onMounted(() => {
  fetchISSPosition();
  interval = window.setInterval(fetchISSPosition, 5000);
});

// 2. CLEANUP: When the v-if becomes false, Vue calls this before destroying the component
onUnmounted(() => {
  console.log('Cleaning up ISS Layer...');

  // Stop the network requests
  if (interval) {
    clearInterval(interval);
    interval = null;
  }

  // Remove the entity from the Cesium Map
  if (viewer.value) {
    viewer.value.entities.removeById(ISS_ID);
    issEntity.value = null;
  }
});
</script>

<template></template>
