<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

import { cn } from '@/lib/utils';
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';

const props = defineProps<{
  class?: HTMLAttributes['class'];
  minimal?: boolean;
}>();

const { open, isMobile } = useSidebar();
</script>

<template>
  <header :class="cn('flex justify-between gap-2', minimal && 'flex-row-reverse', props.class)">
    <h1
      :class="
        cn(
          'pr-3 text-lg font-bold tracking-tight text-white/70 uppercase',
          minimal && 'monitor:hidden'
        )
      "
    >
      EOS // PLANETARY_MONITOR
    </h1>
    <SidebarTrigger :class="cn('', minimal && open && 'monitor:hidden')" />
  </header>
  <p v-if="!isMobile && !minimal" :class="'text-xs font-medium text-white/30'">
    Space Situational Awareness
  </p>
</template>
