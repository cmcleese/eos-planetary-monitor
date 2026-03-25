<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { ShieldCheckIcon } from '@lucide/vue';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import StatTile from '@/components/StatusSummary/StatTile.vue';
import { useDashboardData, type DashboardTile } from '@/components/StatusSummary/useDashboardData';

const { dashboardState, fetchAllData } = useDashboardData();

// Filter out the isLoading property
const dataObjectsOnly = computed(() => {
  return Object.values(dashboardState).filter((val): val is DashboardTile => {
    return typeof val === 'object' && val !== null && 'name' in val;
  });
});

onMounted(() => {
  fetchAllData();
});
</script>

<template>
  <!-- Main Outer Card -->
  <Card class="@container border-white/5 bg-neutral-900 backdrop-blur-md">
    <CardHeader class="flex flex-row items-center space-y-0 pb-2">
      <ShieldCheckIcon class="h-5 w-5 text-white/20" />
      <CardTitle class="text-xs font-bold tracking-widest text-white/40 uppercase">
        Status Summary
      </CardTitle>
    </CardHeader>

    <CardContent>
      <!-- The 3x2 Grid -->
      <div class="grid auto-rows-fr grid-cols-1 gap-2 @[300px]:grid-cols-2 @[400px]:grid-cols-3">
        <StatTile
          v-for="system in dataObjectsOnly"
          :key="system.name"
          :name="system.name"
          :value="system.value"
          :type="system.status"
          :component="system.component"
          :loading="dashboardState.isLoading"
          :isLive="system.isLive"
        >
          <component :is="system.component" v-if="system.component" :value="system.value" />
        </StatTile>
      </div>
    </CardContent>
  </Card>
</template>

<style lang="scss" scoped></style>
