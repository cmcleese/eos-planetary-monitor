<script setup lang="ts">
import MainMonitor from '@/layouts/MainMonitor.vue';
import { SidebarProvider } from '@/components/ui/sidebar';
</script>

<template>
  <SidebarProvider>
    <MainMonitor />
  </SidebarProvider>
</template>
