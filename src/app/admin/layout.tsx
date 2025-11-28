"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Users, Home, Wallet, Settings } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const nav = [
    { name: "Dashboard", href: "/admin", icon: Home },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Wallets", href: "/admin/wallets", icon: Wallet },
    { name: "Settings", href: "/admin/settings", icon: Settings }
  ];

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-white border-r h-full">
        <div className="p-4 text-xl font-bold">Ka-Tip Admin</div>

        <nav className="flex flex-col px-2">
          {nav.map(item => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm",
                  active ? "bg-primary text-white" : "hover:bg-muted"
                )}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 p-6 bg-muted/40 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
