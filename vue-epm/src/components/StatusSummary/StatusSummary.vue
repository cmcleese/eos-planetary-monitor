<script setup lang="ts">
import { computed } from 'vue';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheckIcon } from 'lucide-vue-next';

import StatTile from '@/components/StatusSummary/StatTile.vue';
import { STATUS } from '@/constants/statuses';
import { useDashboardData } from '@/components/StatusSummary/useDashboardData';

const { dashboardState } = useDashboardData();

const systemsList = computed(() => [
  {
    label: 'Satellites',
    value: dashboardState.satelliteCount,
    status: STATUS.INFO,
  },
  {
    label: 'Space Status',
    value: 'Nominal',
    status: STATUS.NORMAL,
  },
  {
    label: 'ISS Status',
    value: dashboardState.issEnvironment.label,
    status: dashboardState.issEnvironment.status,
  },
  {
    label: 'Space Weather',
    value: dashboardState.spaceWeather.label,
    status: dashboardState.spaceWeather.status,
  },
  {
    label: 'Observatories',
    value: '3 ACTIVE',
    status: STATUS.WARNING,
  },
]);
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
          v-for="system in systemsList"
          :key="system.label"
          :label="system.label"
          :value="system.value"
          :type="system.status"
        />
      </div>
    </CardContent>
  </Card>
</template>

<style lang="scss">
@layer utilities {
  .stat-tile {
    @apply flex h-16 flex-col justify-between rounded-md border border-white bg-white/[0.03] p-2 text-red-900;

    .label {
      @apply text-[9px] font-medium tracking-tighter text-white/40 uppercase;
    }

    .value {
      @apply text-[11px] font-bold tracking-tight uppercase;
    }
  }
}
</style>
