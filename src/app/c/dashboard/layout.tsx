import CustomerSidebar from "@/components/customer/Sidebar";

export default function CustomerDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <CustomerSidebar />
      <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4">
        {children}
      </main>
    </div>
  );
}
