import React, { createContext, useContext, useState, useCallback, useRef, ReactNode } from 'react';
import { Viewer, Cartesian3, Color, createWorldTerrainAsync, GeoJsonDataSource, Ion } from 'cesium';
import { CESIUM_ION_TOKEN } from '@/constants/constants';

// Set Ion token
Ion.defaultAccessToken = CESIUM_ION_TOKEN;

interface CesiumContextType {
  viewer: Viewer | null;
  mapReady: boolean;
  initialize: (container: HTMLElement) => Promise<Viewer>;
  flyToCoordinates: (lat: number, lon: number, height?: number) => void;
  loadGeoJson: (url: string, name: string) => Promise<GeoJsonDataSource | undefined>;
}

const CesiumContext = createContext<CesiumContextType | undefined>(undefined);

export const CesiumProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mapReady, setMapReady] = useState(false);
  // useRef keeps the viewer without React trying to track/re-render based on its mass
  const viewerRef = useRef<Viewer | null>(null);

  const initialize = useCallback(async (container: HTMLElement) => {
    // Safety check: don't initialize twice (especially in React 18 Strict Mode)
    if (viewerRef.current) return viewerRef.current;

    const instance = new Viewer(container, {
      terrainProvider: await createWorldTerrainAsync(),
      animation: true,
      timeline: true,
      baseLayerPicker: false,
      geocoder: false,
      infoBox: true,
      selectionIndicator: false,
      navigationHelpButton: false,
    });

    viewerRef.current = instance;
    setMapReady(true);
    return instance;
  }, []);

  const flyToCoordinates = useCallback((lat: number, lon: number, height: number = 1000000) => {
    if (!viewerRef.current) return;

    viewerRef.current.camera.flyTo({
      destination: Cartesian3.fromDegrees(lon, lat, height),
      duration: 3,
    });
  }, []);

  const loadGeoJson = useCallback(async (url: string, name: string) => {
    if (!viewerRef.current) return;

    try {
      const dataSource = await GeoJsonDataSource.load(url, {
        stroke: Color.fromCssColorString('#d4af37'),
        fill: Color.fromCssColorString('#d4af37').withAlpha(0.2),
        strokeWidth: 2,
      });

      dataSource.name = name;
      viewerRef.current.dataSources.add(dataSource);
      return dataSource;
    } catch (error) {
      console.error('Failed to load GeoJSON:', error);
    }
  }, []);

  const value = {
    // We expose the ref.current here so consumers can access it
    viewer: viewerRef.current,
    mapReady,
    initialize,
    flyToCoordinates,
    loadGeoJson,
  };

  return <CesiumContext.Provider value={value}>{children}</CesiumContext.Provider>;
};

export const useCesium = () => {
  const context = useContext(CesiumContext);
  if (context === undefined) {
    throw new Error('useCesium must be used within a CesiumProvider');
  }
  return context;
};
