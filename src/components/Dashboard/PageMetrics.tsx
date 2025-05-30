import React from 'react';
import { cn } from '@/lib/utils';

interface PageMetricsProps {
  value: string | number;
  label: string;
  valueClassName?: string;
  labelClassName?: string;
  className?: string;
}

const PageMetrics: React.FC<PageMetricsProps> = ({
  value,
  label,
  valueClassName,
  labelClassName,
  className,
}) => {
  return (
    <div className={cn('flex items-baseline space-x-2', className)}>
      <p className={cn('text-5xl font-bold text-foreground', valueClassName)}>{value}</p>
      <p className={cn('text-sm text-muted-foreground', labelClassName)}>{label}</p>
    </div>
  );
};

export default PageMetrics;
