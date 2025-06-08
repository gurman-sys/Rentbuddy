
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';

const Layout: React.FC = () => {
  const location = useLocation();
  const hideBottomNav = ['/splash', '/login', '/signup'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
      {!hideBottomNav && <BottomNav />}
    </div>
  );
};

export default Layout;
