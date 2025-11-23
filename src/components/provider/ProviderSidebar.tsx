"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, CreditCard, User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const items: SidebarItem[] = [
  { name: "Dashboard", href: "/c/dashboard", icon: <Home className="w-5 h-5" /> },
  { name: "Wallet", href: "/c/dashboard/wallet", icon: <CreditCard className="w-5 h-5" /> },
  { name: "Profile", href: "/c/dashboard/profile", icon: <User className="w-5 h-5" /> },
  { name: "Settings", href: "/c/dashboard/settings", icon: <Settings className="w-5 h-5" /> },
];

export default function ProviderSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all">
      {/* Toggle Button */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        {!collapsed && <h1 className="text-lg font-bold">Provider Dashboard</h1>}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="p-1"
        >
          {collapsed ? "→" : "←"}
        </Button>
      </div>

      {/* Sidebar Links */}
      <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 p-2 rounded-md text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary ${
              !collapsed ? "justify-start" : "justify-center"
            }`}
          >
            {item.icon}
            {!collapsed && item.name}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <Button
          variant="ghost"
          className={`w-full flex items-center gap-3 justify-start ${collapsed && "justify-center"}`}
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && "Logout"}
        </Button>
      </div>
    </div>
  );
}
