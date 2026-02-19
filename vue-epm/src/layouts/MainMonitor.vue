<script setup lang="ts">
import { provide } from 'vue';

import { SidebarInset } from '@/components/ui/sidebar';
import AppHeader from '@/components/layouts/AppHeader.vue';
import AppSidebar from '@/components/layouts/AppSidebar.vue';
import CesiumViewer from '@/components/Map/CesiumMap/CesiumViewer.vue';

import { useCesium } from '@/components/Map/CesiumMap/useCesium';

// Provide
const cesiumViewer = useCesium();
provide('planetaryEngine', cesiumViewer);
</script>

<template>
  <div class="flex h-screen w-screen overflow-hidden bg-black">
    <!-- App Header -->
    <AppSidebar />

    <!-- Sidebar -->

    <!-- Main Content -->
    <SidebarInset class="flex flex-1 overflow-hidden">
      <div class="absolute z-10 rounded-br-md bg-black/40">
        <AppHeader minimal />
      </div>
      <main class="h-full w-full"><CesiumViewer :mapEnabled="true" /></main>
    </SidebarInset>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/layouts/monitor-grid.scss';
</style>
