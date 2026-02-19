<script setup lang="ts">
import { computed } from 'vue';
import { Radio } from 'lucide-vue-next';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';

import { useLayerManager } from '@/components/Map/MapLayers/useLayerManager';

const props = defineProps<{
  name: string;
  id: string;
  type: string;
}>();

const { isLayerActive, toggleLayer } = useLayerManager();

// Link the Switch directly to our Global Manager
const isEnabled = computed({
  get: () => isLayerActive(props.id),
  set: () => toggleLayer(props.id),
});
</script>

<template>
  <!-- 
    We use 'variant="outline"' as a base, 
    then use Tailwind to make it look scifi.
  -->
  <Item
    variant="outline"
    class="group hover:border-orbit-cyan/40 hover:bg-orbit-cyan/3 mb-2 border-white/5 bg-white/2 transition-all"
  >
    <ItemMedia>
      <!-- Scifi Icon with Glow -->
      <div
        class="bg-orbit-cyan/10 text-orbit-cyan flex h-9 w-9 items-center justify-center rounded-full group-hover:shadow-[0_0_15px_rgba(45,212,191,0.2)]"
      >
        <Radio class="h-4 w-4" />
      </div>
    </ItemMedia>

    <ItemContent>
      <ItemTitle class="text-[13px] font-bold tracking-tight text-white/90 uppercase">
        {{ name }}
      </ItemTitle>
      <ItemDescription class="font-mono text-[10px] text-white/30">
        {{ id }} <span class="mx-1 text-white/10">|</span> {{ type }}
      </ItemDescription>
    </ItemContent>

    <ItemActions class="">
      <Switch :id="id" v-model="isEnabled" class="data-[state=checked]:bg-orbit-cyan" />
      <Badge
        variant="outline"
        :class="[
          'h-4 w-12 justify-center px-1 font-mono text-[9px] uppercase transition-all duration-500',
          isEnabled
            ? 'border-orbit-cyan text-orbit-cyan bg-orbit-cyan/10 shadow-[0_0_8px_rgba(45,212,191,0.2)]'
            : 'border-white/20 text-white/30',
        ]"
      >
        {{ isEnabled ? 'Online' : 'Offline' }}
      </Badge>
    </ItemActions>
  </Item>
</template>
