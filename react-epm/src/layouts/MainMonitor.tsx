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
    // Matching class: flex h-screen w-screen overflow-hidden bg-black
    <div className="flex h-screen w-screen overflow-hidden bg-black">
      <AppSidebar />

      {/* Matching class: flex flex-1 overflow-hidden */}
      <SidebarInset className="flex flex-1 overflow-hidden">
        {/* Matching class: absolute z-10 rounded-br-md bg-black/40 */}
        <div className="absolute z-10 rounded-br-md bg-black/40">
          <AppHeader minimal />
        </div>

        <main className="h-full w-full">{/* <CesiumViewer mapEnabled={true} /> */}</main>
      </SidebarInset>
    </div>
  );
}
