import { useEffect, useRef } from 'react';
import { Cartesian2, Cartesian3, Color, CustomDataSource } from 'cesium';

import { useCesium } from '@/components/Map/CesiumMap/CesiumContext';

interface GroundStation {
  name: string;
  lat: number;
  lon: number;
}

const GROUND_STATIONS: GroundStation[] = [
  { name: 'Canberra Complex', lat: -35.4014, lon: 148.9817 },
  { name: 'Madrid Complex', lat: 40.4314, lon: -4.248 },
  { name: 'Goldstone Complex', lat: 35.4267, lon: -116.8903 },
];

export default function ObservatoriesLayer() {
  const { viewer } = useCesium();
  const groundStationDataSourceRef = useRef<CustomDataSource | null>(null);

  useEffect(() => {
    if (!viewer) return;

    const addGroundStations = (stations: GroundStation[]) => {
      if (!groundStationDataSourceRef.current) {
        const ds = new CustomDataSource('ground-stations');
        groundStationDataSourceRef.current = ds;
        viewer.dataSources.add(ds);
      }

      const ds = groundStationDataSourceRef.current;

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
        addGroundStations(GROUND_STATIONS);
      } catch (error) {
        console.error('Ground Station Tracking Error:', error);
      }
    }

    void fetchGroundStationData();

    return () => {
      console.log('Cleaning up Ground Station Layer...');
      if (viewer && groundStationDataSourceRef.current) {
        viewer.dataSources.remove(groundStationDataSourceRef.current, true);
        groundStationDataSourceRef.current = null;
      }
    };
  }, [viewer]);

  return null;
}
