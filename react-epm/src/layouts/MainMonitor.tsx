import { SidebarInset } from '@/components/ui/sidebar';
import AppHeader from '@/components/Navigation/AppHeader';
import AppSidebar from '@/components/Navigation/AppSidebar';
import CesiumViewer from '@/components/Map/CesiumMap/CesiumViewer';

export default function MainMonitor() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-black">
      <AppSidebar />
      {/* Main Content */}
      <SidebarInset className="flex flex-1 overflow-hidden">
        <div className="absolute z-10 rounded-br-md bg-black/40">
          <AppHeader minimal />
        </div>

        <main className="h-full w-full">
          <CesiumViewer />
        </main>
      </SidebarInset>
    </div>
  );
}
