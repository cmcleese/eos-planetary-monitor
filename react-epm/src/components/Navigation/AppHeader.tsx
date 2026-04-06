import { cn } from '@/lib/utils';
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import logoSvg from '@/assets/logo.svg';

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
        <div
          className={cn(
            'flex items-center gap-2',
            minimal && 'monitor:hidden'
          )}
        >
          <img src={logoSvg} alt="EOS Logo" className="h-8 w-8 shrink-0" />
          <h1 className="pr-3 text-lg font-bold tracking-tight text-white/70 uppercase">
            EOS // PLANETARY_MONITOR
          </h1>
        </div>
        <SidebarTrigger className={cn('', minimal && open && 'monitor:hidden')} />
      </header>
      {!isMobile && !minimal && (
        <p className="text-xs font-medium text-white/30">Space Situational Awareness</p>
      )}
    </>
  );
}
