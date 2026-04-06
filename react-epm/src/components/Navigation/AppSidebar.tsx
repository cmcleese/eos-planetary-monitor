import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
} from '@/components/ui/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import AppHeader from '@/components/Navigation/AppHeader';
import StatusSummary from '@/components/StatusSummary/StatusSummary';
import LayersList from '@/components/GeoLayersList/LayersList';

export default function AppSidebar() {
  return (
    <Sidebar
      side="left"
      collapsible="offcanvas"
      className="bg-sidebar border-r border-white/5"
    >
      <SidebarHeader className="gap-0 p-4">
        <AppHeader />
      </SidebarHeader>

      <ScrollArea className="min-h-0 w-full flex-1">
        <SidebarContent className="space-y-2 px-4">
          <SidebarGroup className="flex flex-col gap-4 p-0">
            <StatusSummary />
            <LayersList />
          </SidebarGroup>

          <div className="flex-1">{/* Space for Active Objects (Next Step) */}</div>
        </SidebarContent>
      </ScrollArea>

      <SidebarFooter className="border-t border-white/5 p-4">
        <div className="font-mono text-[10px] text-white/80 uppercase">System Status: Nominal</div>
      </SidebarFooter>
    </Sidebar>
  );
}
