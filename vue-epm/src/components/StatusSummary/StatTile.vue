<script setup lang="ts">
import { computed, type Component } from 'vue';
import { Skeleton } from '@/components/ui/skeleton';
import { WifiIcon, InfoIcon } from '@lucide/vue';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { STATUS_STYLE, type StatusKey } from '@/constants/statuses';
import { cn } from '@/lib/utils';

interface Props {
  name: string;
  value?: string | number | Record<string, string | number>;
  tooltipText?: string;
  /** status key like 'normal' | 'warning' | 'critical' | 'info' */
  type?: StatusKey;
  component?: Component | null;
  loading?: boolean;
  isLive?: boolean;
  /** optional text override shown instead of the mapped text */
  statusText?: string;
  /** optional color class override */
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  value: undefined,
  tooltip: undefined,
  type: 'info',
  component: null,
  loading: false,
  isLive: false,
  statusText: undefined,
  color: undefined,
});

const displayColor = computed(() => props.color ?? STATUS_STYLE[props.type]);

// Tooltip helper
const sourceInfo = computed(() => ({
  icon: props.isLive ? WifiIcon : InfoIcon,
  text: props.isLive ? 'Live Telemetry' : 'Simulated Data',
  class: props.isLive ? 'text-orbit-cyan' : 'text-white/70',
}));
</script>

<template>
  <div
    class="group relative flex h-full min-h-18 flex-col justify-between rounded-sm bg-black/30 p-2 shadow-[0_0_5px_0_rgb(8_47_73/0.3)]"
  >
    <!-- Status Icon -->
    <div class="absolute top-1.5 right-1.5 z-20">
      <TooltipProvider :delay-duration="100">
        <Tooltip>
          <TooltipTrigger as-child>
            <component
              :is="sourceInfo.icon"
              :class="
                cn(
                  'size-3.5 opacity-75 transition-opacity hover:opacity-100',
                  sourceInfo.class,
                  props.isLive && 'animate-pulse opacity-90'
                )
              "
            />
          </TooltipTrigger>
          <TooltipContent
            side="top"
            :side-offset="8"
            class="max-w-48 font-mono text-[11px] leading-tight text-white/90 shadow-2xl"
          >
            {{ sourceInfo.text }}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>

    <!-- LABEL -->
    <span class="text-[11px] font-medium tracking-tighter text-white/40 uppercase">{{
      props.name
    }}</span>

    <!-- VALUE AREA -->
    <div class="text-[12px] font-bold tracking-tight uppercase">
      <!-- 1. LOADING STATE -->
      <div
        v-if="props.loading"
        class="flex items-center space-y-0"
      >
        <!-- We make the skeleton match our Sci-Fi theme colors -->
        <Skeleton class="h-4 w-3/4 bg-white/10" />
      </div>

      <!-- 2. DATA LOADED STATE -->
      <template v-else>
        <!-- Custom Component Display -->
        <slot v-if="props.component"></slot>

        <!-- Default Text Display -->
        <div
          v-else
          :class="displayColor"
        >
          {{ props.value }}
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss"></style>
