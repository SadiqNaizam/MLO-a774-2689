import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, ChevronDown } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import PageMetrics from './PageMetrics';

interface TrendDataPoint {
  month: string;
  closedWon: number;
  closedLost: number;
}

const trendData: TrendDataPoint[] = [
  { month: 'March', closedWon: 68, closedLost: 62 },
  { month: 'April', closedWon: 52, closedLost: 38 },
  { month: 'May', closedWon: 70, closedLost: 42 },
  { month: 'June', closedWon: 85, closedLost: 8 },
  { month: 'July', closedWon: 72, closedLost: 38 },
  { month: 'August', closedWon: 98, closedLost: 25 },
];

interface TrendGraphProps {
  className?: string;
}

const TrendGraph: React.FC<TrendGraphProps> = ({ className }) => {
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="pb-2">
        <div className="flex flex-row items-start justify-between">
            <CardTitle className="text-lg font-semibold">Leads tracking</CardTitle>
            <Button variant="outline" size="sm" className="ml-auto gap-1 text-sm">
                <CalendarDays className="h-3.5 w-3.5" />
                <span>Last 6 months</span>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </Button>
        </div>
        <div className="flex space-x-6 mt-1">
            <PageMetrics value="680" label="total closed" valueClassName="text-3xl" labelClassName="text-xs"/>
            <PageMetrics value="70" label="total lost" valueClassName="text-3xl" labelClassName="text-xs"/>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <defs>
                <linearGradient id="colorClosedWon" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#14B8A6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorClosedLost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                fontSize={12} 
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                fontSize={12} 
                stroke="hsl(var(--muted-foreground))"
                tickFormatter={(value) => `${value}`}
              />
              <RechartsTooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} 
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Legend 
                verticalAlign="bottom" 
                align="left" 
                height={36} 
                iconType="square"
                iconSize={10}
                formatter={(value, entry) => <span className="text-muted-foreground text-xs ml-1">{value}</span>}
              />
              <Area 
                type="monotone" 
                dataKey="closedWon" 
                stroke="#14B8A6" // Teal
                fillOpacity={1}
                fill="url(#colorClosedWon)" 
                strokeWidth={2} 
                dot={{ r:4, fill: '#14B8A6', strokeWidth:0 }}
                activeDot={{ r: 6, fill: '#14B8A6', strokeWidth:0 }}
                name="Closed won"
              />
              <Area 
                type="monotone" 
                dataKey="closedLost" 
                stroke="#EF4444" // Red
                fillOpacity={1}
                fill="url(#colorClosedLost)" 
                strokeWidth={2} 
                dot={{ r:4, fill: '#EF4444', strokeWidth:0 }}
                activeDot={{ r: 6, fill: '#EF4444', strokeWidth:0 }}
                name="Closed lost"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendGraph;
