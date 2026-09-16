

import React from 'react';
import Menubar from './Menubar';

const DashboardLayout = ({ children }) => {
  return (
    <div className="gov-shell relative min-h-screen text-slate-900">
      <Menubar />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(181,137,45,0.08),transparent_18%),radial-gradient(circle_at_left_center,rgba(31,93,150,0.08),transparent_22%)]" />
      <main className="relative w-full pb-10 pt-4 md:pl-64">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;




