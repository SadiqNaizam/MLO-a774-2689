import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ReasonLost {
  id: string;
  percentage: number;
  reason: string;
}

const reasonsLostData: ReasonLost[] = [
  { id: '1', percentage: 40, reason: 'The proposal is unclear' },
  { id: '2', percentage: 20, reason: 'However venture pursuit' }, // OCR text, might mean 'High-risk venture pursuit'
  { id: '3', percentage: 10, reason: 'Other' },
  { id: '4', percentage: 30, reason: 'Product fit issue' }, // Changed from 'The proposal is unclear' to be distinct
];

interface OtherDataPoint {
  id: string;
  value: string;
  label: string;
  hasInfo?: boolean;
  infoText?: string;
}

const otherDataPoints: OtherDataPoint[] = [
  { id: '1', value: '900', label: 'total leads count' },
  { id: '2', value: '12', label: 'days in average to convert lead' },
  { id: '3', value: '30', label: 'inactive leads', hasInfo: true, infoText: 'Leads inactive for over 30 days' },
];

interface SummaryCardsProps {
  className?: string;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ className }) => {
  return (
    <TooltipProvider>
      <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-6', className)}>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Reasons of leads lost</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-x-8 gap-y-6">
            {reasonsLostData.map((item) => (
              <div key={item.id}>
                <p className="text-3xl font-bold text-foreground">{item.percentage}%</p>
                <p className="text-sm text-muted-foreground">{item.reason}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Other data</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-6">
            {otherDataPoints.map((item) => (
              <div key={item.id} className="flex flex-col items-start">
                <div className="flex items-center">
                  <p className="text-3xl font-bold text-foreground">{item.value}</p>
                  {item.hasInfo && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground ml-1.5 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{item.infoText}</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
                <p className="text-sm text-muted-foreground text-left">{item.label}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default SummaryCards;
