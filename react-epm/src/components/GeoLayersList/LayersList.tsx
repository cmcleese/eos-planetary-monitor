import { LayersIcon } from 'lucide-react';

import { LayerListItem } from '@/components/GeoLayersList/LayerListItem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLayers } from '@/components/Map/MapLayers/useLayers';

export default function LayersList() {
  const { layers } = useLayers();

  return (
    <Card className="@container border-white/5 bg-neutral-900 backdrop-blur-md">
      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
        <LayersIcon className="h-5 w-5 text-white/20" />
        <CardTitle className="text-xs font-bold tracking-widest text-white/40 uppercase">
          Geo Layers
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="pr-4">
          {layers.map((layer) => (
            <LayerListItem
              key={layer.id}
              layer={layer}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
