import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useMemo } from 'react';

interface RsgDisplayProps {
  // Value can be the RSG object { r, s, g } or a string fallback
  value?: Record<string, string | number> | string;
}

// 1. Move it OUTSIDE the component (top of file)
const getScaleColor = (val: number) => {
  if (val === 0) return 'text-white/20 border-white/10';
  if (val <= 2) return 'text-green-400 border-green-400/50';
  if (val <= 3) return 'text-yellow-400 border-yellow-400/50';
  if (val === 4) return 'text-orange-500 border-orange-500/50';
  return 'text-red-500 border-red-500/50';
};

const keys = [
  {
    id: 'r',
    label: 'R',
    tooltip: 'Radio Blackouts: X-ray emissions causing communication interference.',
  },
  {
    id: 's',
    label: 'S',
    tooltip: 'Solar Radiation: High-energy protons affecting satellites and astronauts.',
  },
  {
    id: 'g',
    label: 'G',
    tooltip: 'Geomagnetic Storms: Solar wind shocks affecting power grids and navigation.',
  },
];

export default function RsgDisplay({ value }: RsgDisplayProps) {
  /**
   * TODO: Port logic from Vue (RsgDisplay.vue)
   * 1. Define getScaleColor helper
   * 2. Process data based on `value` prop
   * 3. Map displayItems
   */

  // Updated displayItems - processes data once per update
  const displayItems = useMemo(() => {
    if (typeof value === 'string') {
      // If it's a string, we can just show it as a single item
      return [
        {
          label: 'Status',
          displayVal: value,
          colorClasses: 'text-white/20 border-white/10',
          tooltip: undefined,
        },
      ];
    }
    // Default values if data hasn't arrived yet
    const source = value && typeof value === 'object' ? value : { r: 0, s: 0, g: 0 };

    return keys.map((k) => {
      const num = Number(source[k.id]) || 0;
      return {
        ...k,
        displayVal: num > 0 ? num : 'none',
        colorClasses: getScaleColor(num),
      };
    });
  }, [value]);

  return (
    <TooltipProvider delayDuration={200}>
      <div className="mt-1 flex gap-1.5">
        {displayItems.map((item) => (
          <div
            key={item.label}
            className="flex-1"
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className={`flex cursor-help flex-col items-center rounded-sm border p-1 transition-all ${item.colorClasses}`}
                >
                  <span className="mb-1 text-[11px] leading-none">{item.label}</span>
                  <span className="font-mono text-[11px] leading-none">{item.displayVal}</span>
                </div>
              </TooltipTrigger>

              {item.tooltip && (
                <TooltipContent
                  side="top"
                  sideOffset={8}
                  className="max-w-48 text-[11px] leading-tight font-medium text-white/90 shadow-2xl"
                >
                  {item.tooltip}
                </TooltipContent>
              )}
            </Tooltip>
          </div>
        ))}
      </div>
    </TooltipProvider>
  );
}
