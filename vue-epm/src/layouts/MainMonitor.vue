<script setup lang="ts">
import { provide } from 'vue';

import { SidebarInset } from '@/components/ui/sidebar';
import AppHeader from '@/components/Navigation/AppHeader.vue';
import AppSidebar from '@/components/Navigation/AppSidebar.vue';
import CesiumViewer from '@/components/Map/CesiumMap/CesiumViewer.vue';

import { useCesium } from '@/components/Map/CesiumMap/useCesium';
import { planetaryEngineKey } from '@/components/Map/CesiumMap/keys';

// Provide
const cesiumViewer = useCesium();
provide(planetaryEngineKey, cesiumViewer);
</script>

<template>
  <div class="flex h-screen w-screen overflow-hidden bg-black">
    <AppSidebar />

    <!-- Main Content -->
    <SidebarInset class="flex flex-1 overflow-hidden">
      <div class="absolute z-10 rounded-br-md bg-black/40">
        <AppHeader minimal />
      </div>
      <main class="h-full w-full"><CesiumViewer /></main>
    </SidebarInset>
  </div>
</template>

<style lang="scss" scoped>
//@import '@/styles/layouts/monitor-grid.scss';
</style>
