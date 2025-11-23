"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  CreditCard,
  Clock,
  User,
  LogOut,
  Activity,
  Layers,
  Users,
  ChevronLeft,
  ChevronRight,
  ArrowLeftRight,
} from "lucide-react";

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const customerSidebarItems: SidebarItem[] = [
  { name: "Wallet", href: "/c/dashboard/wallet", icon: <CreditCard size={20} /> },
  { name: "Tipping History", href: "/c/dashboard/tipping-history", icon: <Clock size={20} /> },
  { name: "Wallet Tipping", href: "/c/dashboard/wallet-tip", icon: <Activity size={20} /> },
  { name: "Become a Provider", href: "/c/dashboard/become-provider", icon: <Layers size={20} /> },
  { name: "Profile", href: "/c/dashboard/profile", icon: <User size={20} /> },
];

export default function CustomerSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Logo + Collapse Button */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200 dark:border-gray-800">
        {!collapsed && <span className="text-xl font-bold text-primary">Ka-Tip</span>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Sidebar Items */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {customerSidebarItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 p-2 rounded-md transition-colors duration-200
                ${
                  isActive
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                }`}
            >
              {item.icon}
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="px-2 py-4 border-t border-gray-200 dark:border-gray-800 flex flex-col gap-2">
        {!collapsed && (
          <Link
            href="/p/dashboard"
            className="flex items-center gap-3 p-2 rounded-md text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition"
          >
            <ArrowLeftRight size={20} />
            <span>Go to Provider Dashboard</span>
          </Link>
        )}
        <button
          className="flex items-center gap-3 p-2 rounded-md text-red-500 hover:bg-red-50 dark:hover:bg-red-900 transition"
        >
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}
