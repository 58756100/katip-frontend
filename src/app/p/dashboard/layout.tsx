// c/dashboard/layout.tsx
import React from "react";
import ProviderSidebar from "@/components/provider/ProviderSidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <aside className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 h-full">
          <ProviderSidebar />
        </div>
      </aside>

      {/* Mobile Sidebar placeholder */}
      <div className="md:hidden">
        {/* You can add a Drawer or Hamburger menu here for mobile */}
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6">
        {children}
      </main>
    </div>
  );
}
