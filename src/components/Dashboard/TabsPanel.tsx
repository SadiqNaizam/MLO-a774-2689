import React from 'react';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface TabsPanelProps {
  className?: string;
  onTabChange?: (value: string) => void;
}

const TabsPanel: React.FC<TabsPanelProps> = ({ className, onTabChange }) => {
  const [activeTab, setActiveTab] = React.useState<string>('leads');

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (onTabChange) {
      onTabChange(value);
    }
  };

  return (
    <div className={cn(className)}>
      <Tabs defaultValue="leads" value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:w-[200px]">
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
        </TabsList>
        {/* 
          TabsContent would typically be used here to display content for each tab.
          For this component, we're just providing the tab navigation itself as per the requirements.
          Example usage:
          <TabsContent value="sales">Sales content goes here.</TabsContent>
          <TabsContent value="leads">Leads content goes here.</TabsContent> 
        */}
      </Tabs>
    </div>
  );
};

export default TabsPanel;
