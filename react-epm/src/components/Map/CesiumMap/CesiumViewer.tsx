import { useEffect, useRef, ReactNode } from 'react';
import LayerController from '@/components/Map/MapLayers/LayerController';
import { useCesium } from './CesiumContext';

interface CesiumViewerProps {
  mapEnabled?: boolean;
  children?: ReactNode;
}

export default function CesiumViewer({ mapEnabled = true, children }: CesiumViewerProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const { initialize, viewer, mapReady } = useCesium();

  useEffect(() => {
    async function init() {
      if (mapContainer.current && mapEnabled && !mapReady) {
        await initialize(mapContainer.current);
        console.log('EOS Planetary cesiumInstance: Online');
      }
    }
    init();

    return () => {
      if (viewer && !viewer.isDestroyed()) {
        viewer.destroy();
      }
    };
  }, [mapEnabled, mapReady, initialize, viewer]);

  return (
    <div
      ref={mapContainer}
      className="relative h-full w-full bg-black/10"
      id="cesium-container"
    >
      {/* Headless components that interact with the globe */}
      <LayerController />

      {/* Any HTML overlays for the globe specifically */}
      {children}

      {!mapEnabled && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 text-white/50 backdrop-blur-sm">
          <span className="text-sm font-medium tracking-widest uppercase">Map is disabled</span>
        </div>
      )}
    </div>
  );
}
