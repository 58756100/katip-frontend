import CustomerSidebar from "@/components/customer/Sidebar";

export default function CustomerDashboardLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <CustomerSidebar />
      
      {/* Main content area */}
      <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
        {/* Add padding-top on mobile to account for fixed header */}
        <div className="lg:p-6 p-4 pt-20 lg:pt-6">
          {children}
        </div>
      </main>
    </div>
  );
}