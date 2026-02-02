<script setup lang="ts">
import { Menu } from 'lucide-vue-next';
import StatusSummary from '@/components/dashboard/StatusSummary.vue';
</script>

<template>
  <aside class="flex flex-col h-full bg-orbit-bg p-6 space-y-6 ">
    
    <!-- Top Identity Section -->
    <section class="flex items-center justify-between">
      <div>
        <h1 class="text-xl font-bold tracking-tight text-white/90">ORBITAL PULSE</h1>
        <p class="text-[10px] text-white/30 font-medium">Space Situational Awareness</p>
      </div>
      <Menu class="h-5 w-5 text-white/50 cursor-pointer hover:text-white" />
    </section>

    <!-- Status Summary Section -->
    <StatusSummary />

    <!-- Space for Active Objects (Next Step) -->
    <div class="flex-1">
        <!-- We will put your Satellite List here next -->
    </div>

  </aside>
</template>