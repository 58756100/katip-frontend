import CustomerSidebar from "@/components/customer/Sidebar";
import { verifySession } from "@/utils/auth";

export const dynamic = "force-dynamic";

interface Props {
  children: React.ReactNode;
}

export default async function CustomerDashboardLayout({ children }: Props) {
  // ✅ Verify session for 'customer' role
  const user = await verifySession(["customer"]);
  console.log("decoooode", user);

  return (
    <div className="flex h-screen overflow-hidden">
      <CustomerSidebar user={user} />
      
      {/* Main content area */}
      <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
        <div className="lg:p-6 p-4 pt-20 lg:pt-6">
          {children}
        </div>
      </main>
    </div>
  );
}
