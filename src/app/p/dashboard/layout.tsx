import React from "react";
import ProviderSidebar from "@/components/provider/ProviderSidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function ProviderDashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <ProviderSidebar />
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
        {/* Add padding-top on mobile to account for fixed header */}
        <div className="lg:p-6 p-4 pt-20 lg:pt-6">
          {children}
        </div>
      </main>
    </div>
  );
}