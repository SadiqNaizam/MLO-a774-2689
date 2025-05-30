import React from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import TabsPanel from '../components/Dashboard/TabsPanel';
import FunnelChart from '../components/Dashboard/FunnelChart';
import SourcesChart from '../components/Dashboard/SourcesChart';
import TrendGraph from '../components/Dashboard/TrendGraph';
import SummaryCards from '../components/Dashboard/SummaryCards';

/**
 * LeadsDashboardPage serves as the main overview for leads tracking.
 * It utilizes the MainAppLayout for overall page structure (sidebar, header)
 * and arranges various dashboard widgets like TabsPanel, FunnelChart, SourcesChart,
 * TrendGraph, and SummaryCards in the main content area.
 */
const IndexPage: React.FC = () => {
  return (
    <MainAppLayout pageTitle="Dashboard">
      {/* 
        The MainAppLayout provides a flex container with flex-col and gap-6 for its children.
        Each direct child component below will be a flex item.
      */}
      
      <TabsPanel />

      {/* Grid for FunnelChart and SourcesChart to appear side-by-side on larger screens */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* FunnelChart is typically narrower, occupying 2/5ths of the width on large screens */}
        <FunnelChart className="lg:col-span-2" />
        {/* SourcesChart is wider, occupying 3/5ths of the width on large screens */}
        <SourcesChart className="lg:col-span-3" />
      </div>

      <TrendGraph />

      <SummaryCards />

    </MainAppLayout>
  );
};

export default IndexPage;
