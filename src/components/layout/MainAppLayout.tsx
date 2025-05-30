import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { cn } from '@/lib/utils';

interface MainAppLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
  className?: string; 
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ 
  children,
  pageTitle = 'Dashboard', 
  className 
}) => {
  return (
    <div className={cn("min-h-screen bg-background", className)}>
      <Sidebar />
      
      {/* This div contains the Header and the main content area. */}
      {/* It's positioned to the right of the sidebar (md:pl-64) because Sidebar is w-64 (16rem). */}
      <div className="md:pl-64">
        <Header title={pageTitle} /> {/* Header is fixed, height 72px, and handles its own positioning including md:left-64 */}
        
        {/* Main content area starts below the fixed header and is scrollable. */}
        {/* pt-[72px] to account for fixed header's height. */}
        {/* Layout Requirements -> overall -> sizing -> mainContent: "min-w-0 overflow-y-auto" */}
        {/* Layout Requirements -> mainContent -> layout: "p-6 mt-[72px]" - mt-[72px] is handled by pt-[72px] here. */}
        {/* min-h-[calc(100vh-72px)] ensures content area fills available vertical space below header, making footer stick to bottom if content is short. */}
        <main className="pt-[72px] min-h-[calc(100vh-72px)] overflow-y-auto min-w-0">
          {/* p-6 as per Layout Requirements -> mainContent -> layout */}
          <div className="p-6">
            {/* flex flex-col gap-6 as per Layout Requirements -> mainContent -> container */}
            <div className="flex flex-col gap-6">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainAppLayout;
