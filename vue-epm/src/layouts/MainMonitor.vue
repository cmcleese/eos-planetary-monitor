<script setup lang="ts">
import AppHeader from '@/components/layouts/AppHeader.vue';
import SidebarNav from '@/components/layouts/SidebarNav.vue';
import InfoPanel from '@/components/layouts/InfoPanel.vue';
import AppFooter from '@/components/layouts/AppFooter.vue';

</script>

<template>
  <div class="monitor-grid">
    <header class="header"> <AppHeader /> </header>
    <nav class="nav"> <SidebarNav /> </nav>
    <main class="globe"> <div id="cesiumContainer"></div> </main>
    <aside class="infoPanel"> <InfoPanel /> </aside>
    <footer class="footer"> <AppFooter /> </footer>
  </div>
</template>

<style lang="scss" scoped>
  @import "@/styles/layouts/monitor-grid.scss";
</style>
