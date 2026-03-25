import React from 'react';
import { WifiIcon, CpuIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { STATUS_STYLE, type StatusKey } from '@/constants/statuses';

export interface StatTileProps {
  name: string;
  value?: string | number | Record<string, string | number>;
  tooltipText?: string;
  /** status key like 'normal' | 'warning' | 'critical' | 'info' */
  type?: StatusKey;
  component?: React.ReactNode | null;
  loading?: boolean;
  isLive?: boolean;
  /** optional text override shown instead of the mapped text */
  statusText?: string;
  /** optional color class override */
  color?: string;
  children?: React.ReactNode;
}

export const StatTile: React.FC<StatTileProps> = ({
  name,
  value,
  tooltipText,
  type = 'info',
  component = null,
  loading = false,
  isLive = false,
  statusText,
  color,
  children,
}) => {
  const displayColor = color ?? STATUS_STYLE[type];

  const sourceInfo = {
    Icon: isLive ? WifiIcon : CpuIcon,
    text: isLive ? 'Live Telemetry' : 'Simulated Data',
    className: isLive ? 'text-orbit-cyan' : 'text-white/20',
  };

  return (
    <div className="group relative flex h-full min-h-18 flex-col justify-between rounded-sm bg-black/30 p-2 shadow-[0_0_5px_0_rgb(8_47_73/0.3)]">
      {/* Status Icon */}
      <div className="absolute top-1.5 right-1.5 z-20">
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="cursor-help">
                <sourceInfo.Icon
                  className={`size-3.5 opacity-60 transition-opacity hover:opacity-100 ${sourceInfo.className} ${isLive ? 'animate-pulse opacity-90' : ''}`}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              sideOffset={8}
              className="max-w-48 font-mono text-[11px] leading-tight text-white/90 shadow-2xl"
            >
              {sourceInfo.text}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* LABEL */}
      <span className="text-[11px] font-medium tracking-tighter text-white/40 uppercase">
        {name}
      </span>

      {/* VALUE AREA */}
      <div className="text-[12px] font-bold tracking-tight uppercase">
        {loading ? (
          <div className="flex items-center space-y-0">
            <Skeleton className="h-4 w-3/4 bg-white/10" />
          </div>
        ) : (
          <>
            {/* Custom Component Display */}
            {component || children ? (
              component || children
            ) : (
              <div className={displayColor}>{value as React.ReactNode}</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default StatTile;
