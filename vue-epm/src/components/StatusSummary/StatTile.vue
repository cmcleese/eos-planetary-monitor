<script setup lang="ts">
import { computed, type Component } from 'vue';
import { Skeleton } from '@/components/ui/skeleton';

import { STATUS_STYLE, type StatusKey } from '@/constants/statuses';

interface Props {
  name: string;
  value?: string | number | Record<string, string | number>;
  tooltip?: string;
  /** status key like 'normal' | 'warning' | 'critical' | 'info' */
  type?: StatusKey;
  component?: Component | null;
  loading?: boolean;
  useSlot?: boolean;
  /** optional text override shown instead of the mapped text */
  statusText?: string;
  /** optional color class override */
  color?: string;
}

const props = defineProps<Props>();

const displayColor = computed(() => props.color ?? STATUS_STYLE[props.type ?? 'info']);
</script>

<template>
  <div
    class="flex h-full min-h-16 flex-col justify-between rounded-sm bg-black/30 p-2 shadow-[0_0_5px_0_rgb(8_47_73/0.3)]"
  >
    <span class="text-[11px] font-medium tracking-tighter text-white/40 uppercase">{{
      props.name
    }}</span>
    <div class="text-[12px] font-bold tracking-tight uppercase">
      <!-- 1. LOADING STATE -->
      <div v-if="props.loading" class="flex items-center space-y-0">
        <!-- We make the skeleton match our Sci-Fi theme colors -->
        <Skeleton class="h-4 w-3/4 bg-white/10" />
      </div>

      <!-- 2. DATA LOADED STATE -->
      <template v-else>
        <!-- Custom Component Display -->
        <slot v-if="props.component"></slot>

        <!-- Default Text Display -->
        <div v-else :class="displayColor">
          {{ props.value }}
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss"></style>
