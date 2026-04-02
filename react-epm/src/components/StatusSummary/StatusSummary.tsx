import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheckIcon } from 'lucide-react';

import StatTile from '@/components/StatusSummary/StatTile';
import { useDashboardData, type DashboardTile } from './useDashboardData';
import RsgDisplay from './RsgDisplay';

export default function StatusSummary() {
  // Initialize dashboard state and fetch data
  const { dashboardState } = useDashboardData();

  // Filter out the isLoading property to get just the tile data
  const dataObjectsOnly = Object.values(dashboardState).filter((val): val is DashboardTile => {
    return typeof val === 'object' && val !== null && 'name' in val;
  });

  return (
    <Card className="@container border-white/5 bg-neutral-900 backdrop-blur-md">
      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
        <ShieldCheckIcon className="h-5 w-5 text-white/20" />
        <CardTitle className="text-xs font-bold tracking-widest text-white/40 uppercase">
          Status Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid auto-rows-fr grid-cols-1 gap-2 @[300px]:grid-cols-2 @[400px]:grid-cols-3">
          {dataObjectsOnly.map((system) => (
            <StatTile
              key={system.name}
              name={system.name}
              value={typeof system.value === 'string' ? system.value : undefined}
              type={system.status}
              loading={dashboardState.isLoading}
              isLive={system.isLive}
            >
              {system.name === 'Solar Activity' && (
                <RsgDisplay value={system.value as Record<string, string | number>} />
              )}
            </StatTile>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
