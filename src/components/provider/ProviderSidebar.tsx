"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  CreditCard,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  ArrowLeftRight,
} from "lucide-react";
import Image from "next/image";
import Logo from "../../../public/logo.svg";
import React from "react";

// -----------------------
// MEMOIZED CONSTANT DATA
// -----------------------

const providerSidebarItems = Object.freeze([
  { name: "Dashboard", href: "/p/dashboard", icon: Home },
  { name: "Wallet", href: "/p/dashboard/wallet", icon: CreditCard },
  { name: "Profile", href: "/p/dashboard/profile", icon: User },
  { name: "Settings", href: "/p/dashboard/settings", icon: Settings },
]);

// -----------------------
// PURE ITEM COMPONENT
// -----------------------
const SidebarItem = React.memo(function SidebarItem({
  item,
  isActive,
  collapsed,
}: {
  item: any;
  isActive: boolean;
  collapsed: boolean;
}) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 ${
        isActive
          ? "bg-blue-50 text-blue-600 font-medium dark:bg-blue-900/20 dark:text-blue-400"
          : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
      } ${collapsed ? "justify-center" : ""}`}
      title={collapsed ? item.name : undefined}
    >
      <Icon size={20} className="shrink-0" />
      {!collapsed && <span className="truncate">{item.name}</span>}
    </Link>
  );
});

// -----------------------
// SIDEBAR NAV LIST
// -----------------------
const SidebarNav = React.memo(function SidebarNav({
  collapsed,
  activeChecker,
}: {
  collapsed: boolean;
  activeChecker: (href: string) => boolean;
}) {
  return (
    <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
      {providerSidebarItems.map((item) => (
        <SidebarItem
          key={item.href}
          item={item}
          isActive={activeChecker(item.href)}
          collapsed={collapsed}
        />
      ))}
    </nav>
  );
});

// -----------------------
// FOOTER
// -----------------------
const SidebarFooter = React.memo(function SidebarFooter({
  collapsed,
}: {
  collapsed: boolean;
}) {
  return (
    <div className="px-2 py-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
      <Link
        href="/c/dashboard"
        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-all ${
          collapsed ? "justify-center" : ""
        }`}
        title={collapsed ? "Customer Dashboard" : undefined}
      >
        <ArrowLeftRight size={20} className="shrink-0" />
        {!collapsed && <span>Customer Dashboard</span>}
      </Link>

      <button
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-all ${
          collapsed ? "justify-center" : ""
        }`}
        title={collapsed ? "Logout" : undefined}
      >
        <LogOut size={20} className="shrink-0" />
        {!collapsed && <span>Logout</span>}
      </button>
    </div>
  );
});

// -----------------------
// MAIN SIDEBAR COMPONENT
// -----------------------
export default function ProviderSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Track active route (stable)
  const activeChecker = useCallback(
    (href: string) => {
      if (href === "/p/dashboard") return pathname === href;
      return pathname.startsWith(href);
    },
    [pathname]
  );

  // Close mobile on route change
  useEffect(() => setMobileOpen(false), [pathname]);

  // Prevent body scroll on mobile drawer
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "unset";
  }, [mobileOpen]);

  const toggleMobileMenu = useCallback(
    () => setMobileOpen((prev) => !prev),
    []
  );

  // -----------------------
  // RENDER
  // -----------------------
  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200 dark:border-gray-800">
          {!collapsed && <Image src={Logo} alt="Logo" width={100} height={100} />}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <SidebarNav collapsed={collapsed} activeChecker={activeChecker} />
        <SidebarFooter collapsed={collapsed} />
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between px-4 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 fixed top-0 left-0 right-0 z-40">
        <Image src={Logo} alt="Logo" width={100} height={100} />
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={toggleMobileMenu}
          />

          <aside className="fixed left-0 top-0 bottom-0 w-72 bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col transform transition-transform duration-300">
            <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200 dark:border-gray-800">
              <Image src={Logo} alt="Logo" width={100} height={100} />
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X size={24} />
              </button>
            </div>

            <SidebarNav collapsed={false} activeChecker={activeChecker} />
            <SidebarFooter collapsed={false} />
          </aside>
        </>
      )}
    </>
  );
}
