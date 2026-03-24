import MainMonitor from '@/layouts/MainMonitor';
import { SidebarProvider } from '@/components/ui/sidebar';

function App() {
  return (
    <SidebarProvider>
      <MainMonitor />
    </SidebarProvider>
  );
}

export default App;
