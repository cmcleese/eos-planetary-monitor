<script setup lang="ts">
import { onMounted, onUnmounted, markRaw, ref } from 'vue';
import {
  Cartesian3,
  Color,
  PolylineGlowMaterialProperty,
  Entity,
  ShadowMode,
  DistanceDisplayCondition,
  ColorBlendMode,
  VerticalOrigin,
  SampledPositionProperty,
  JulianDate,
  LagrangePolynomialApproximation,
  TimeInterval,
  VelocityOrientationProperty,
  ExtrapolationType,
  CallbackProperty,
} from 'cesium';

import { usePlanetaryEngine } from '@/components/Map/CesiumMap/keys';
import issModelUrl from '@/assets/models/ISS-A-Low.glb?url';
//import issModelUrl from '@/assets/models/ISS-B-High.glb?url';

const engine = usePlanetaryEngine();
const { viewer } = engine;

const issEntity = ref<Entity | null>(null);
const ISS_ID = 'ZARYA-25544';

// Position history management (optional, for smoother interpolation)
const MAX_SAMPLES = 100; // 100 samples * 5s = ~ 8.3 minutes of history
const DISTANCE_DISPLAY_CONDITION = 10000000.0; // 10,000km (matches your model condition)
let positionProperty = new SampledPositionProperty();
const oldestDateTime = JulianDate.fromIso8601('1970-01-01T00:00:00Z');

// Setup interpolation
positionProperty.setInterpolationOptions({
  interpolationDegree: 2,
  interpolationAlgorithm: LagrangePolynomialApproximation,
});
// Hold the position before the first sample and after the last sample to prevent extrapolation issues
positionProperty.forwardExtrapolationType = ExtrapolationType.HOLD;
positionProperty.backwardExtrapolationType = ExtrapolationType.HOLD;

const pruneSamples = (prop: SampledPositionProperty) => {
  // @ts-expect-error required for Cesium internals, but not part of the public API
  const times = prop._property._times;

  if (times && times.length > MAX_SAMPLES) {
    const oldestSampleTime = times[0];

    const intervalToDelete = new TimeInterval({
      start: oldestDateTime,
      stop: oldestSampleTime,
      isStartIncluded: true,
      isStopIncluded: true,
    });

    prop.removeSamples(intervalToDelete);
  }
};

// Dynamic label offset based on camera distance
const dynamicLabelOffset = new CallbackProperty((time, result) => {
  const camera = viewer.value!.camera;
  const entityPos = positionProperty.getValue(time);

  if (!entityPos) return result;

  // Calculate distance between camera and ISS
  const distance = Cartesian3.distance(camera.position, entityPos);

  if (distance > DISTANCE_DISPLAY_CONDITION) {
    // ZOOMED OUT: Center the label above the Teal Point
    return Cartesian3.fromElements(0, -20, 0, result);
  } else {
    // ZOOMED IN: Use your specific offset for the 3D Model
    return Cartesian3.fromElements(-20, -40, 0, result);
  }
}, false);

const trackISS = (lat: number, lon: number, alt: number) => {
  if (!viewer.value) return;

  const position = Cartesian3.fromDegrees(lon, lat, alt * 1000);
  const currentTime = JulianDate.now();
  const displayTime = JulianDate.addSeconds(currentTime, -10, new JulianDate());

  // Sync the viewer clock to the current time for proper interpolation
  viewer.value.clock.currentTime = displayTime;
  viewer.value.clock.shouldAnimate = true;
  viewer.value.clock.multiplier = 1;

  // 1. Add the new sample
  positionProperty.addSample(currentTime, position);

  // 2. Prune the old points to prevent memory leaks
  pruneSamples(positionProperty);

  // 3. Create or update the ISS entity
  if (!issEntity.value) {
    // Create the ISS entity if it doesn't exist
    issEntity.value = markRaw(
      viewer.value.entities.add({
        id: ISS_ID,
        name: 'International Space Station',
        position: positionProperty,
        // Automatically orient the model in the direction of motion
        orientation: new VelocityOrientationProperty(positionProperty),
        point: {
          pixelSize: 10,
          color: Color.fromCssColorString('#2dd4bf'),
          outlineColor: Color.WHITE,
          outlineWidth: 2,
          // Shows from 10,000km away up to infinity
          distanceDisplayCondition: new DistanceDisplayCondition(
            DISTANCE_DISPLAY_CONDITION,
            Number.MAX_VALUE
          ),
        },
        label: {
          text: 'ISS',
          font: '13px  monospace',
          fillColor: Color.fromCssColorString('#2dd4bf'),
          outlineColor: Color.BLACK,
          outlineWidth: 2,
          verticalOrigin: VerticalOrigin.BOTTOM,
          pixelOffset: dynamicLabelOffset,
          // label shows only within 5000km
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
          trailTime: 2400, // 40 mins
        },
        model: {
          uri: issModelUrl,
          shadows: ShadowMode.DISABLED,
          runAnimations: false,
          color: Color.WHITE,
          colorBlendMode: ColorBlendMode.MIX,
          colorBlendAmount: 0.3,
          scale: 2.0, // Base size multiplier
          minimumPixelSize: 128, // High number keeps it visible from orbit
          maximumScale: 50000, // High limit allows it to "grow" as you zoom in
          // This ensures the model only shows when you are close
          distanceDisplayCondition: new DistanceDisplayCondition(0.0, DISTANCE_DISPLAY_CONDITION),
        },
      })
    );
    // Focuses the camera on the ISS when it first appears
    //viewer.value.trackedEntity = issEntity.value;
  }
};

async function fetchISSPosition() {
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
    // Clear samples
    const intervalAll = new TimeInterval({ start: oldestDateTime, stop: JulianDate.now() });
    positionProperty.removeSamples(intervalAll);
  }
});
</script>

<template></template>
