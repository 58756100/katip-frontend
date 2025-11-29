"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useMemo, useCallback, useEffect } from "react";
import {
  CreditCard,
  Clock,
  User,
  LogOut,
  Activity,
  Layers,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  ArrowLeftRight,
} from "lucide-react";
import React from "react";
import Image from "next/image";
import Logo from "../../../public/logo.svg";

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}
interface Props {
  user: { roles: string[] };
}
const CustomerSidebar = React.memo(({ user }: Props) => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => setMobileOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [mobileOpen]);

  const toggleMobileMenu = useCallback(() => setMobileOpen(prev => !prev), []);

  const customerSidebarItems: SidebarItem[] = useMemo(() => {
    const items: SidebarItem[] = [
      { name: "Wallet", href: "/c/dashboard/wallet", icon: <CreditCard size={20} /> },
      { name: "Tipping History", href: "/c/dashboard/tipping-history", icon: <Clock size={20} /> },
      { name: "Wallet Tipping", href: "/c/dashboard/wallet-tip", icon: <Activity size={20} /> },
      { name: "Become a Provider", href: "/c/dashboard/become-provider", icon: <Layers size={20} /> },
      { name: "Profile", href: "/c/dashboard/profile", icon: <User size={20} /> },
    ];

    // ✅ Remove “Become a Provider” if user already has provider role
    if (user.roles.includes("provider")) {
      return items.filter(item => item.name !== "Become a Provider");
    }

    return items;
  }, [user.roles]);
  const SidebarNav = () => (
    <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
      {customerSidebarItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
              isActive
                ? "bg-blue-50 text-blue-600 font-medium dark:bg-blue-900/20 dark:text-blue-400"
                : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            }`}
            title={collapsed ? item.name : undefined}
          >
            <span className="flex-shrink-0">{item.icon}</span>
            {!collapsed && <span className="truncate">{item.name}</span>}
          </Link>
        );
      })}
    </nav>
  );

  const SidebarFooter = () => (
    <div className="px-2 py-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
      <Link
        href="/p/dashboard"
        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-all ${
          collapsed ? "justify-center" : ""
        }`}
        title={collapsed ? "Go to Provider Dashboard" : undefined}
      >
        <ArrowLeftRight size={20} className="flex-shrink-0" />
        {!collapsed && <span className="truncate">Provider Dashboard</span>}
      </Link>
      <button 
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-all ${
          collapsed ? "justify-center" : ""
        }`}
        title={collapsed ? "Logout" : undefined}
      >
        <LogOut size={20} className="flex-shrink-0" />
        {!collapsed && <span>Logout</span>}
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Logo + Collapse Button */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
          {!collapsed && (
            <Image src={Logo} alt="Logo" width={100} height={100} />
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ml-auto"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <SidebarNav />
        <SidebarFooter />
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between px-4 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 fixed top-0 left-0 right-0 z-40">
       <Image src={Logo} alt="Logo" width={100} height={100} />
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={toggleMobileMenu}
            aria-hidden="true"
          />

          {/* Mobile Drawer */}
          <aside
            className="fixed left-0 top-0 bottom-0 w-72 bg-white dark:bg-gray-900 shadow-2xl z-50 lg:hidden flex flex-col transform transition-transform duration-300"
          >
            {/* Mobile Header */}
            <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
             <Image src={Logo} alt="Logo" width={100} height={100} />
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <SidebarNav />
            <SidebarFooter />
          </aside>
        </>
      )}
    </>
  );
});

CustomerSidebar.displayName = "CustomerSidebar";

export default CustomerSidebar;