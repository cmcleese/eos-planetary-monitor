import { ref, markRaw } from 'vue';
import {
  Viewer,
  Ion,
  createWorldTerrainAsync,
  Cartesian3,
  Color,
  GeoJsonDataSource,
  //type Entity,
} from 'cesium';
import { CESIUM_ION_TOKEN } from '@/constants/constants';

// Use your actual token
Ion.defaultAccessToken = CESIUM_ION_TOKEN;

export function useCesium() {
  const viewer = ref<Viewer | null>(null);

  const initialize = async (container: HTMLElement) => {
    const instance = new Viewer(container, {
      terrainProvider: await createWorldTerrainAsync(),
      animation: false,
      timeline: false,
      baseLayerPicker: false,
      geocoder: false,
      infoBox: false,
      selectionIndicator: false,
      navigationHelpButton: false,
    });

    // Performance: markRaw is essential in Vue
    viewer.value = markRaw(instance);

    // Remove the "Credits" logo to clean up the UI (Optional/check license)
    //(instance.cesiumWidget.creditContainer as HTMLElement).style.display = 'none';
    return instance;
  };

  const flyToCoordinates = (lat: number, lon: number, height: number = 1000000) => {
    if (!viewer.value) return;

    viewer.value.camera.flyTo({
      destination: Cartesian3.fromDegrees(lon, lat, height),
      duration: 3,
    });
  };

  const loadGeoJson = async (url: string, name: string) => {
    if (!viewer.value) return;

    try {
      const dataSource = await GeoJsonDataSource.load(url, {
        stroke: Color.fromCssColorString('#d4af37'),
        fill: Color.fromCssColorString('#d4af37').withAlpha(0.2),
        strokeWidth: 2,
      });

      dataSource.name = name;
      viewer.value.dataSources.add(dataSource);
      return dataSource;
    } catch (error) {
      console.error('Failed to load GeoJSON:', error);
    }
  };

  return {
    viewer,
    initialize,
    flyToCoordinates,
    loadGeoJson,
  };
}
