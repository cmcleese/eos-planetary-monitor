<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import {
  Cartesian3,
  Color,
  PolylineGlowMaterialProperty,
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
  CustomDataSource,
} from 'cesium';

import { usePlanetaryEngine } from '@/components/Map/CesiumMap/keys';
import issModelUrl from '@/assets/models/ISS-A-Low.glb?url';

const engine = usePlanetaryEngine();
const { viewer } = engine;

const ISS_ID = 'ZARYA-25544';
const MAX_SAMPLES = 100; // 100 samples * 5s = ~8.3 minutes of history
const DISTANCE_DISPLAY_CONDITION = 10000000.0; // 10,000km
const oldestDateTime = JulianDate.fromIso8601('1970-01-01T00:00:00Z');

// Position property with interpolation configured upfront
const positionProperty = new SampledPositionProperty();
positionProperty.setInterpolationOptions({
  interpolationDegree: 2,
  interpolationAlgorithm: LagrangePolynomialApproximation,
});
// Hold at boundary to prevent extrapolation artefacts
positionProperty.forwardExtrapolationType = ExtrapolationType.HOLD;
positionProperty.backwardExtrapolationType = ExtrapolationType.HOLD;

// Dedicated layer DataSource — enables layer-level visibility toggling and clean atomic removal
let dataSource: CustomDataSource | null = null;

let interval: number | null = null;

// --- Helpers ---

const pruneSamples = (prop: SampledPositionProperty) => {
  // @ts-expect-error accessing Cesium internals — not part of the public API
  const times = prop._property._times;

  if (times && times.length > MAX_SAMPLES) {
    const oldestSampleTime = times[0];
    prop.removeSamples(
      new TimeInterval({
        start: oldestDateTime,
        stop: oldestSampleTime,
        isStartIncluded: true,
        isStopIncluded: true,
      })
    );
  }
};

// Dynamic label pixel offset: compact above the point when zoomed out,
// offset to the side when zoomed in to clear the 3D model.
const dynamicLabelOffset = new CallbackProperty((time, result) => {
  const camera = viewer.value!.camera;
  const entityPos = positionProperty.getValue(time);

  if (!entityPos) return result;

  const distance = Cartesian3.distance(camera.position, entityPos);

  return distance > DISTANCE_DISPLAY_CONDITION
    ? Cartesian3.fromElements(0, -20, 0, result) // zoomed out: above teal dot
    : Cartesian3.fromElements(-20, -40, 0, result); // zoomed in:  clear of 3D model
}, false);

// --- Core logic ---

const trackISS = (lat: number, lon: number, alt: number) => {
  if (!viewer.value || !dataSource) return;

  const position = Cartesian3.fromDegrees(lon, lat, alt * 1000);
  const currentTime = JulianDate.now();

  // Display 10s behind real-time so interpolation has at least one future sample
  viewer.value.clock.currentTime = JulianDate.addSeconds(currentTime, -10, new JulianDate());
  viewer.value.clock.shouldAnimate = true;
  viewer.value.clock.multiplier = 1;

  positionProperty.addSample(currentTime, position);
  pruneSamples(positionProperty);

  // Only create the entity on the first successful fetch
  if (!dataSource.entities.getById(ISS_ID)) {
    dataSource.entities.add({
      id: ISS_ID,
      name: 'International Space Station',
      position: positionProperty,
      orientation: new VelocityOrientationProperty(positionProperty),
      point: {
        pixelSize: 10,
        color: Color.fromCssColorString('#2dd4bf'),
        outlineColor: Color.WHITE,
        outlineWidth: 2,
        // Teal dot visible only when zoomed out beyond 10,000km
        distanceDisplayCondition: new DistanceDisplayCondition(
          DISTANCE_DISPLAY_CONDITION,
          Number.MAX_VALUE
        ),
      },
      label: {
        text: 'ISS',
        font: '13px monospace',
        fillColor: Color.fromCssColorString('#2dd4bf'),
        outlineColor: Color.BLACK,
        outlineWidth: 2,
        verticalOrigin: VerticalOrigin.BOTTOM,
        pixelOffset: dynamicLabelOffset,
      },
      path: {
        resolution: 1,
        material: new PolylineGlowMaterialProperty({
          glowPower: 0.1,
          color: Color.fromCssColorString('#2dd4bf'),
        }),
        width: 5,
        leadTime: 0,
        trailTime: 2400, // 40-minute trail
      },
      model: {
        uri: issModelUrl,
        shadows: ShadowMode.DISABLED,
        runAnimations: false,
        color: Color.WHITE,
        colorBlendMode: ColorBlendMode.MIX,
        colorBlendAmount: 0.3,
        scale: 2.0,
        minimumPixelSize: 128,
        maximumScale: 50000,
        // 3D model visible only when zoomed in within 10,000km
        distanceDisplayCondition: new DistanceDisplayCondition(0.0, DISTANCE_DISPLAY_CONDITION),
      },
    });
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

// --- Lifecycle ---

onMounted(() => {
  if (!viewer.value) return;

  // Create and register the layer DataSource once
  dataSource = new CustomDataSource('iss-layer');
  viewer.value.dataSources.add(dataSource);

  void fetchISSPosition();
  interval = window.setInterval(fetchISSPosition, 5000);
});

onUnmounted(() => {
  console.log('Cleaning up ISS Layer...');

  if (interval) {
    clearInterval(interval);
    interval = null;
  }

  if (viewer.value && dataSource) {
    // Passing `true` destroys the DataSource and all its entities in one call
    viewer.value.dataSources.remove(dataSource, true);
    dataSource = null;
  }

  // Clear accumulated position samples so a remount starts fresh
  positionProperty.removeSamples(
    new TimeInterval({ start: oldestDateTime, stop: JulianDate.now() })
  );
});
</script>

<template></template>
