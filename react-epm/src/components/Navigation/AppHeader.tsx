import { cn } from '@/lib/utils';
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';

interface AppHeaderProps {
  className?: string;
  minimal?: boolean;
}

export default function AppHeader({ className, minimal }: AppHeaderProps) {
  const { open, isMobile } = useSidebar();

  return (
    <>
      <header
        className={cn('flex justify-between gap-2', minimal && 'flex-row-reverse', className)}
      >
        <h1
          className={cn(
            'pr-3 text-lg font-bold tracking-tight text-white/70 uppercase',
            minimal && 'monitor:hidden'
          )}
        >
          EOS // PLANETARY_MONITOR
        </h1>
        <SidebarTrigger className={cn('', minimal && open && 'monitor:hidden')} />
      </header>
      {!isMobile && !minimal && (
        <p className="text-xs font-medium text-white/30">Space Situational Awareness</p>
      )}
    </>
  );
}
