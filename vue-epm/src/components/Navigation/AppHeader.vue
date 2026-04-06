<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

import logoSvg from '/logo.svg';
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
    <div :class="cn('flex items-center gap-2', minimal && 'monitor:hidden')">
      <img :src="logoSvg" alt="EOS Logo" class="h-8 w-8 shrink-0" />
      <h1 class="pr-3 text-lg font-bold tracking-tight text-white/70 uppercase">
        EOS // PLANETARY_MONITOR
      </h1>
    </div>
    <SidebarTrigger :class="cn('', minimal && open && 'monitor:hidden')" />
  </header>
  <p
    v-if="!isMobile && !minimal"
    class="text-xs font-medium text-white/30"
  >
    Space Situational Awareness
  </p>
</template>
