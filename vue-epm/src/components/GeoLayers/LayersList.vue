<script setup lang="ts">
import { LayersIcon } from 'lucide-vue-next';

import LayerListItem from '@/components/GeoLayers/LayerListItem.vue';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLayers } from '@/components/Map/MapLayers/useLayers';

// List of Layers
const { layers } = useLayers();
</script>

<template>
  <Card class="@container border-white/5 bg-neutral-900 backdrop-blur-md">
    <CardHeader class="flex flex-row items-center space-y-0 pb-2">
      <LayersIcon class="h-5 w-5 text-white/20" />
      <CardTitle class="text-xs font-bold tracking-widest text-white/40 uppercase">
        Geo Layers
      </CardTitle>
    </CardHeader>

    <CardContent>
      <div class="pr-4">
        <LayerListItem
          v-for="layer in layers"
          :id="layer.id"
          :key="layer.id"
          :name="layer.name"
          :type="layer.type"
        />
      </div>
    </CardContent>
  </Card>
</template>
