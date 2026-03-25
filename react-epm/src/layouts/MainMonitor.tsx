import { SidebarInset } from '@/components/ui/sidebar';
import AppHeader from '@/components/Navigation/AppHeader';
import AppSidebar from '@/components/Navigation/AppSidebar';
//import CesiumViewer from '@/components/Map/CesiumMap/CesiumViewer';
//import { useCesium } from '@/components/Map/CesiumMap/useCesium';

// Assuming you'll create a context for the planetary engine
// import { PlanetaryEngineContext } from '@/context/PlanetaryEngineContext';

export default function MainMonitor() {
  //const cesiumViewer = useCesium();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-black">
      <AppSidebar />
      {/* Main Content */}
      <SidebarInset className="flex flex-1 overflow-hidden">
        <div className="absolute z-10 rounded-br-md bg-black/40">
          <AppHeader minimal />
        </div>

        <main className="h-full w-full">{/* <CesiumViewer mapEnabled={true} /> */}</main>
      </SidebarInset>
    </div>
  );
}
