<!-- src/components/StatusSummary/RsgDisplay.vue -->
<script setup lang="ts">
import { computed } from 'vue';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface Props {
  // Accepts the object { r, s, g } or undefined
  value?: Record<string, string | number> | string;
}
const props = defineProps<Props>();

// Internal helper (not called in template)
const getScaleColor = (val: number) => {
  if (val === 0) return 'text-white/20 border-white/10';
  if (val <= 2) return 'text-green-400 border-green-400/50';
  if (val <= 3) return 'text-yellow-400 border-yellow-400/50';
  if (val === 4) return 'text-orange-500 border-orange-500/50';
  return 'text-red-500 border-red-500/50';
};

// 2. COMPUTED VIEW MODEL: Processes data once per update
const displayItems = computed(() => {
  if (typeof props.value === 'string') {
    // If it's a string, we can just show it as a single item
    return [
      {
        label: 'Status',
        displayVal: props.value,
        colorClasses: 'text-white/20 border-white/10',
        tooltip: undefined,
      },
    ];
  }
  // Default values if data hasn't arrived yet
  const source =
    props.value && typeof props.value === 'object' ? props.value : { r: 0, s: 0, g: 0 };

  const keys = [
    {
      id: 'r',
      label: 'R',
      tooltip: 'Radio Blackouts: X-ray emissions causing communication interference.',
    },
    {
      id: 's',
      label: 'S',
      tooltip: 'Solar Radiation: High-energy protons affecting satellites and astronauts.',
    },
    {
      id: 'g',
      label: 'G',
      tooltip: 'Geomagnetic Storms: Solar wind shocks affecting power grids and navigation.',
    },
  ];

  return keys.map((k) => {
    const num = Number(source[k.id]) || 0;
    return {
      ...k,
      displayVal: num > 0 ? num : 'none',
      colorClasses: getScaleColor(num),
    };
  });
});
</script>

<template>
  <TooltipProvider :delay-duration="200">
    <div class="mt-1 flex gap-1.5">
      <div
        v-for="item in displayItems"
        :key="item.label"
        class="flex-1"
      >
        <Tooltip>
          <TooltipTrigger as-child>
            <div
              class="flex cursor-help flex-col items-center rounded-sm border p-1 transition-all"
              :class="item.colorClasses"
            >
              <span class="mb-1 text-[11px] leading-none">{{ item.label }}</span>
              <span class="font-mono text-[11px] leading-none">{{ item.displayVal }}</span>
            </div>
          </TooltipTrigger>

          <TooltipContent
            v-if="item.tooltip"
            side="top"
            :side-offset="8"
            class="max-w-48 text-[11px] leading-tight font-medium text-white/90 shadow-2xl"
          >
            {{ item.tooltip }}
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  </TooltipProvider>
</template>
