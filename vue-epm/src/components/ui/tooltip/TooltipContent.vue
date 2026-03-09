<script setup lang="ts">
import type { TooltipContentEmits, TooltipContentProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { TooltipArrow, TooltipContent, TooltipPortal, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@/lib/utils';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<TooltipContentProps & { class?: HTMLAttributes['class'] }>(),
  {
    sideOffset: 4,
  }
);

const emits = defineEmits<TooltipContentEmits>();

const delegatedProps = reactiveOmit(props, 'class');
const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <TooltipPortal>
    <TooltipContent
      data-slot="tooltip-content"
      v-bind="{ ...forwarded, ...$attrs }"
      :class="
        cn(
          'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 border-orbit-cyan/40 z-50 rounded-md border bg-slate-900 px-3 py-1.5 text-xs text-zinc-50 shadow-md',
          props.class
        )
      "
    >
      <slot />

      <TooltipArrow as-child :width="12" :height="6" class="relative -top-[0.5px] z-10">
        <svg viewBox="0 0 12 6" class="z-50 overflow-visible">
          <!-- Background fill with no border -->
          <polygon points="0,0 6,6 12,0" class="fill-slate-900" />
          <!-- Two angled lines, ignoring the top connecting line -->
          <polyline
            points="0,0 6,6 12,0"
            class="stroke-orbit-cyan/40 fill-none stroke-[1px]"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </TooltipArrow>
    </TooltipContent>
  </TooltipPortal>
</template>
