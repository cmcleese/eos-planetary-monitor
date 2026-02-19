<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
} from '@/components/ui/sidebar';
import StatusSummary from '@/components/dashboard/StatusSummary.vue';
import AppHeader from '@/components/layouts/AppHeader.vue';
import LayersList from '@/components/dashboard/LayersList.vue';
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue';
</script>

<template>
  <!-- 'collapsible="icon"' makes it narrow instead of fully hiding (optional) -->
  <Sidebar side="left" collapsible="offcanvas" class="bg-sidebar border-r border-white/5">
    <SidebarHeader class="gap-0 px-6 py-4">
      <AppHeader />
    </SidebarHeader>
    <ScrollArea class="min-h-0 w-full flex-1">
      <SidebarContent class="space-y-2 px-4">
        <!-- Status Summary Section -->
        <SidebarGroup class="flex flex-col gap-4">
          <StatusSummary />
          <LayersList />
        </SidebarGroup>

        <!-- Space for Active Objects (Next Step) -->
        <div class="flex-1">
          <!-- We will put your Satellite List here next -->
        </div>
      </SidebarContent>
    </ScrollArea>
    <SidebarFooter class="border-t border-white/5 p-4">
      <div class="font-mono text-[9px] text-white/20 uppercase">System Status: Nominal</div>
    </SidebarFooter>
  </Sidebar>
</template>
