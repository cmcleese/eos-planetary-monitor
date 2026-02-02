<script setup lang="ts">
import { provide } from 'vue';

import AppHeader from '@/components/layouts/AppHeader.vue';
import LeftPanel from '@/components/layouts/LeftPanel.vue';
import CesiumViewer from '@/components/layouts/CesiumMap/CesiumViewer.vue';

import { useCesium } from '@/composables/useCesium';

// Provide
const cesiumController = useCesium();
provide('planetaryEngine', cesiumController);

</script>

<template>
  <div class="monitor-grid">
    <header class="header"> <AppHeader /> </header>
    <nav class="left-panel"> <LeftPanel /> </nav>
    <!-- <main class="globe"> <CesiumViewer /> </main> -->
  </div>
</template>

<style lang="scss" scoped>
  @import "@/styles/layouts/monitor-grid.scss";
</style>
