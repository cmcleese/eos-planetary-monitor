import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheckIcon } from 'lucide-react';

import StatTile from '@/components/StatusSummary/StatTile';

export default function StatusSummary() {
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
          <StatTile
            name="System Status"
            value="Nominal"
            type="normal"
          />
        </div>
      </CardContent>
    </Card>
  );
}
