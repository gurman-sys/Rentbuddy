
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Search, Plus, MessageCircle, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: Plus, label: 'Add Item', path: '/add-item' },
    { icon: MessageCircle, label: 'Messages', path: '/messages' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  // Don't show bottom nav on certain pages
  const hideOnPaths = ['/spin-wheel', '/wallet', '/chat'];
  const shouldHide = hideOnPaths.some(path => location.pathname.startsWith(path));

  if (shouldHide) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border safe-area-padding-bottom">
      <div className="flex items-center justify-around p-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Button
              key={item.path}
              variant="ghost"
              size="sm"
              className={`flex-1 flex flex-col items-center gap-1 h-auto py-2 ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}
              onClick={() => navigate(item.path)}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'fill-current' : ''}`} />
              <span className="text-xs">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
