import React from 'react';
import TopHeader from '../Dashboard/TopHeader';

interface HeaderProps {
  title?: string;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ title, className }) => {
  // TopHeader is a fixed component with its own styling (h-[72px], bg-card, positioning etc.)
  // It accepts 'title' and 'className' props.
  // The TopHeader component from context code correctly handles merging its base classes with the passed className prop using cn().
  return <TopHeader title={title} className={className} />;
};

export default Header;
