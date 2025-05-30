import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import PageMetrics from './PageMetrics'; // Assuming PageMetrics is in the same directory

interface FunnelStage {
  id: string;
  name: string;
  count: number;
  value: number;
  duration: string;
  color: string; // Tailwind bg color class e.g., 'bg-red-500'
  avgTime?: boolean;
}

const funnelData: FunnelStage[] = [
  { id: 'discovery', name: 'Discovery', count: 200, value: 200, duration: '2 days', color: 'bg-red-500' },
  { id: 'qualified', name: 'Qualified', count: 100, value: 100, duration: '2 days', color: 'bg-yellow-500' },
  { id: 'inConversation', name: 'In conversation', count: 50, value: 100, duration: 'average time on this stage', color: 'bg-indigo-700', avgTime: true },
  { id: 'negotiations', name: 'Negotiations', count: 20, value: 50, duration: '8 days', color: 'bg-green-500' },
  { id: 'closedWon', name: 'Closed won', count: 20, value: 50, duration: '10 days', color: 'bg-purple-600' },
];

const totalFunnelCount = funnelData.reduce((sum, stage) => sum + stage.count, 0);

interface FunnelChartProps {
  className?: string;
}

const FunnelChart: React.FC<FunnelChartProps> = ({ className }) => {
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Funnel count</CardTitle>
        <PageMetrics value="600" label="active leads" valueClassName="text-4xl" />
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <div className="mb-4">
            <div className="flex h-3 w-full rounded-full overflow-hidden">
              {funnelData.map((stage) => (
                <Tooltip key={stage.id}>
                  <TooltipTrigger asChild>
                    <div
                      className={cn('h-full', stage.color)}
                      style={{ width: `${(stage.count / totalFunnelCount) * 100}%` }}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{stage.name}: {stage.count}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>

          <ul className="space-y-3">
            {funnelData.map((stage) => (
              <li key={stage.id} className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-x-4 text-sm">
                <span className={cn('h-3 w-3 rounded-sm', stage.color)} />
                <span className="text-muted-foreground truncate">{stage.name}</span>
                <span className="font-medium text-foreground text-right">{stage.count}</span>
                <span className="text-muted-foreground text-right">${stage.value}</span>
                {stage.avgTime ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="text-muted-foreground text-right cursor-help">{stage.duration.split(' ')[0]} days</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{stage.duration}</p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <span className="text-muted-foreground text-right">{stage.duration}</span>
                )}
              </li>
            ))}
          </ul>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
};

export default FunnelChart;
