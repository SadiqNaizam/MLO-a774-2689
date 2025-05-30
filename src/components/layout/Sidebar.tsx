import React from 'react';
import SidebarNav from '../Dashboard/SidebarNav';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  // SidebarNav is already a fixed component with its own styling (w-64, h-screen, bg-sidebar, etc.)
  // The SidebarNav component from context code correctly handles merging its base classes with the passed className prop using cn().
  return <SidebarNav className={className} />;
};

export default Sidebar;
