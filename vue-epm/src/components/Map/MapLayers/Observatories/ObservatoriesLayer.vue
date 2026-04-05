<script setup lang="ts">
import { onMounted, onUnmounted, markRaw, ref } from 'vue';
import { Cartesian3, Color, Cartesian2, CustomDataSource } from 'cesium';
import { usePlanetaryEngine } from '@/components/Map/CesiumMap/keys';

const engine = usePlanetaryEngine();
const { viewer } = engine;

// Ground station shape
interface GroundStation {
  name: string;
  lat: number;
  lon: number;
}

const groundStationDataSource = ref<CustomDataSource | null>(null);

const groundStations: GroundStation[] = [
  { name: 'Canberra Complex', lat: -35.4014, lon: 148.9817 },
  { name: 'Madrid Complex', lat: 40.4314, lon: -4.248 },
  { name: 'Goldstone Complex', lat: 35.4267, lon: -116.8903 },
];

const addGroundStations = (stations: GroundStation[]) => {
  if (!viewer.value) return;

  // Create a dedicated data source to group observatory entities so we can remove them easily
  if (!groundStationDataSource.value) {
    const ds = new CustomDataSource('ground-stations');
    groundStationDataSource.value = markRaw(ds);
    viewer.value.dataSources.add(ds);
  }

  const ds = groundStationDataSource.value!;

  stations.forEach((station) => {
    ds.entities.add({
      name: station.name,
      position: Cartesian3.fromDegrees(station.lon, station.lat),
      point: { pixelSize: 8, color: Color.GOLD, outlineWidth: 2 },
      label: {
        text: station.name,
        font: '13px monospace',
        pixelOffset: new Cartesian2(0, 20),
      },
    });
  });
};

async function fetchGroundStationData() {
  try {
    //const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
    //const data = await response.json();

    addGroundStations(groundStations);
  } catch (error) {
    console.error('Ground Station Tracking Error:', error);
  }
}

onMounted(() => {
  fetchGroundStationData();
});

// 2. CLEANUP: When the v-if becomes false, Vue calls this before destroying the component
onUnmounted(() => {
  console.log('Cleaning up Ground Station Layer...');
  // Remove the data source (and all its entities) from the viewer
  if (viewer.value && groundStationDataSource.value) {
    viewer.value.dataSources.remove(groundStationDataSource.value, true);
    groundStationDataSource.value = null;
  }
});
</script>

<template></template>
