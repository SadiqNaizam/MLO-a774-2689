import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { CalendarDays, ChevronDown } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip as RechartsTooltip } from 'recharts';

interface SourceData {
  name: string;
  value: number; // This will be used for pie chart segment size
  amount: number; // Dollar amount
  percentage: number; // Percentage string for display
  color: string; // Hex color for chart
}

const sourcesData: SourceData[] = [
  { name: 'Clutch', value: 3000, amount: 3000, percentage: 50, color: '#F97316' }, // Orange
  { name: 'Behance', value: 1500, amount: 1000, percentage: 25, color: '#FACC15' }, // Yellow
  { name: 'Instagram', value: 900, amount: 1000, percentage: 15, color: '#14B8A6' }, // Teal
  { name: 'Dribbble', value: 600, amount: 1000, percentage: 10, color: '#10B981' }, // Green (prdAccentGreen)
];
// Note: Values for pie chart are adjusted to sum up more logically for percentage representation.
// Original image data: Clutch $3000 50%, Behance $1000 40%, Instagram $1000 10%, Dribbble $1000 10%. This sums to 110%.
// Adjusted for 100%: Clutch $3000 (50%), Behance $1500 (25%), Instagram $900 (15%), Dribbble $600 (10%). Total $6000.
// The 'amount' in data still reflects original image $ amounts for display, while 'value' drives pie chart proportions.

interface SourcesChartProps {
  className?: string;
}

const SourcesChart: React.FC<SourcesChartProps> = ({ className }) => {
  const [activeToggle, setActiveToggle] = React.useState<string>('leadsConverted');

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">Sources</CardTitle>
        <Button variant="outline" size="sm" className="ml-auto gap-1 text-sm">
          <CalendarDays className="h-3.5 w-3.5" />
          <span>Last 6 months</span>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourcesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  innerRadius={60} // For donut chart appearance
                  fill="#8884d8"
                  dataKey="value"
                  strokeWidth={0}
                >
                  {sourcesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip formatter={(value: number, name: string, entry: { payload: SourceData }) => [`$${entry.payload.amount}`, entry.payload.name]}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {sourcesData.map((source) => (
              <div key={source.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <span style={{ backgroundColor: source.color }} className="h-3 w-3 rounded-sm mr-2"></span>
                  <span className="text-muted-foreground">{source.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-foreground mr-2">${source.amount.toLocaleString()}</span>
                  <span className="text-muted-foreground">{source.percentage}%</span>
                </div>
              </div>
            ))}
            <div className="text-xs text-muted-foreground text-right pt-1">from leads total</div>
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <ToggleGroup 
            type="single" 
            defaultValue="leadsConverted" 
            value={activeToggle}
            onValueChange={(value) => { if (value) setActiveToggle(value); }}
            className="border rounded-md p-0.5"
          >
            <ToggleGroupItem value="leadsCame" aria-label="Leads came" className="px-3 py-1.5 data-[state=on]:bg-muted data-[state=on]:text-foreground">
              Leads came
            </ToggleGroupItem>
            <ToggleGroupItem value="leadsConverted" aria-label="Leads Converted" className="px-3 py-1.5 data-[state=on]:bg-muted data-[state=on]:text-foreground">
              Leads Converted
            </ToggleGroupItem>
            <ToggleGroupItem value="totalDealsSize" aria-label="Total deals size" className="px-3 py-1.5 data-[state=on]:bg-muted data-[state=on]:text-foreground">
              Total deals size
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </CardContent>
    </Card>
  );
};

export default SourcesChart;
