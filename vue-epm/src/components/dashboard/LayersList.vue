<script setup lang="ts">
import { LayersIcon } from 'lucide-vue-next';

import LayerListItem from '@/components/dashboard/LayerListItem.vue';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSatellites } from '@/components/Map/MapLayers/useSatellites';

// List of Satellites
const { satellites } = useSatellites();
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
          v-for="sat in satellites"
          :id="sat.id"
          :key="sat.id"
          :name="sat.name"
          :type="sat.type"
        />
      </div>
    </CardContent>
  </Card>
</template>
