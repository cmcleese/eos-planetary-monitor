<script setup lang="ts">
import { computed } from 'vue';

import { STATUS_STYLE, type StatusKey } from '@/constants/statuses';

interface Props {
  label: string;
  value: string | number;
  /** status key like 'normal' | 'warning' | 'critical' | 'info' */
  type?: StatusKey;
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
      props.label
    }}</span>
    <div class="text-[12px] font-bold tracking-tight uppercase">
      <div :class="displayColor">{{ props.value }}</div>
    </div>
  </div>
</template>

<style lang="scss"></style>
