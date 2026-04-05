import { useCesium } from '@/components/Map/CesiumMap/CesiumContext';
import { useLayerManager } from '@/components/Map/MapLayers/useLayerManager';
import { useLayers } from '@/components/Map/MapLayers/useLayers';

/**
 * Mounts map layer components when the Cesium viewer is ready and each layer is enabled.
 */
export default function LayerController() {
  const { mapReady } = useCesium();
  const { isLayerActive } = useLayerManager();
  const { layers } = useLayers();

  if (!mapReady) {
    return null;
  }

  return (
    <>
      {layers.map((layer) => {
        const Layer = layer.component;
        return isLayerActive(layer.id) && Layer ? <Layer key={layer.id} /> : null;
      })}
    </>
  );
}
