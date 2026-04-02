import { Radio } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';

import { useLayerManager } from '@/components/Map/MapLayers/useLayerManager';
import type { LayerConfig } from '@/components/Map/MapLayers/layers.config';

export interface LayerListItemProps {
  layer: LayerConfig;
}

export function LayerListItem({ layer }: LayerListItemProps) {
  const { isLayerActive, toggleLayer } = useLayerManager();

  // Link the Switch directly to our Global Manager
  const isEnabled = {
    get: () => isLayerActive(layer.id),
    set: () => toggleLayer(layer.id),
  };

  return (
    <Item
      variant="outline"
      className="group/layerItem hover:border-orbit-cyan/40 hover:bg-orbit-cyan/3 mb-2 border-white/5 bg-white/2 transition-all"
    >
      <ItemMedia>
        <div className="bg-orbit-cyan/10 text-orbit-cyan flex h-9 w-9 items-center justify-center rounded-full group-hover/layerItem:shadow-[0_0_15px_rgba(45,212,191,0.2)]">
          <Radio className="h-4 w-4" />
        </div>
      </ItemMedia>

      <ItemContent>
        <ItemTitle className="text-[13px] font-bold tracking-tight text-white/90 uppercase">
          {layer.name}
        </ItemTitle>
        <ItemDescription className="font-mono text-[10px] text-white/30">
          {layer.id} <span className="mx-1 text-white/10">|</span> {layer.type}
        </ItemDescription>
      </ItemContent>

      <ItemActions className="">
        <Switch
          id={layer.id}
          checked={isEnabled.get()}
          onCheckedChange={isEnabled.set}
          disabled={layer.disabled}
          className="data-[state=checked]:bg-orbit-cyan"
        />
        <Badge
          variant="outline"
          className={cn(
            'h-4 w-12 justify-center px-1 font-mono text-[9px] uppercase transition-all duration-500',
            isEnabled.get()
              ? 'border-orbit-cyan text-orbit-cyan bg-orbit-cyan/10 shadow-[0_0_8px_rgba(45,212,191,0.2)]'
              : 'border-white/20 text-white/30'
          )}
        >
          {isEnabled.get() ? 'Online' : 'Offline'}
        </Badge>
      </ItemActions>
    </Item>
  );
}
