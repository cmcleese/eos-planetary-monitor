import MainMonitor from '@/layouts/MainMonitor';
import { SidebarProvider } from '@/components/ui/sidebar';
import { CesiumProvider } from '@/components/Map/CesiumMap/CesiumContext';

function App() {
  return (
    <SidebarProvider>
      <CesiumProvider>
        <MainMonitor />
      </CesiumProvider>
    </SidebarProvider>
  );
}

export default App;
