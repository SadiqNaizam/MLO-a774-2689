import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  LayoutGrid,
  Users,
  UserCircle2,
  FileText,
  FileStack,
  ShoppingBag,
  Mail,
  Archive,
  CalendarDays,
  HelpCircle,
  Settings,
  Blend,
  PanelLeftOpen,
} from 'lucide-react';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive?: boolean;
  isBottom?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, href, isActive, isBottom }) => {
  return (
    <a href={href}>
      <Button
        variant={isActive ? 'secondary' : 'ghost'}
        className={cn(
          'w-full justify-start text-sm font-medium',
          isActive ? 'bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary' : 'text-sidebar-foreground hover:bg-muted',
          isBottom && 'mt-auto'
        )}
      >
        <Icon className="mr-3 h-5 w-5" />
        {label}
      </Button>
    </a>
  );
};

interface SidebarNavProps {
  className?: string;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ className }) => {
  // In a real app, active state would come from routing
  const [activeItem, setActiveItem] = React.useState<string>('Dashboard'); 

  const navItems: Omit<NavItemProps, 'isActive'>[] = [
    { icon: LayoutGrid, label: 'Dashboard', href: '#' },
    { icon: Users, label: 'Leads', href: '#' },
    { icon: UserCircle2, label: 'Customers', href: '#' },
    { icon: FileText, label: 'Proposals', href: '#' },
    { icon: FileStack, label: 'Invoices', href: '#' },
    { icon: ShoppingBag, label: 'Items', href: '#' },
    { icon: Mail, label: 'Mail', href: '#' },
    { icon: Archive, label: 'Shoebox', href: '#' },
    { icon: CalendarDays, label: 'Calendar', href: '#' },
  ];

  const bottomNavItems: Omit<NavItemProps, 'isActive' | 'isBottom'>[] = [
    { icon: HelpCircle, label: 'Help', href: '#' },
    { icon: Settings, label: 'Settings', href: '#' },
    // The image shows two help icons, likely a placeholder. Using one Settings and one Help.
  ];

  return (
    <div className={cn('fixed top-0 left-0 h-screen w-64 bg-sidebar text-sidebar-foreground flex flex-col p-4 space-y-1', className)}>
      <div className="flex items-center justify-between p-2 mb-4">
        <div className="flex items-center">
          <Blend className="h-8 w-8 text-primary mr-2" />
          <span className="font-semibold text-xl text-foreground">bo</span>
        </div>
        {/* Placeholder for menu toggle - not in static image but typical for sidebars */}
        <Button variant="ghost" size="icon" className="md:hidden">
          <PanelLeftOpen className="h-6 w-6" />
        </Button>
      </div>

      {navItems.map((item) => (
        <NavItem
          key={item.label}
          {...item}
          isActive={activeItem === item.label}
          // onClick={() => setActiveItem(item.label)} // For client-side navigation state update
        />
      ))}

      <div className="mt-auto space-y-1 pt-4 border-t border-border">
        {bottomNavItems.map((item) => (
          <NavItem
            key={item.label}
            {...item}
            isActive={activeItem === item.label}
            // onClick={() => setActiveItem(item.label)}
          />
        ))}
      </div>
    </div>
  );
};

export default SidebarNav;
