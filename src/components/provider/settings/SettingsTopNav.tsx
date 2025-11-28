"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const tabs = [
  { name: "Overview", href: "/p/dashboard/settings/overview" },
  { name: "Profile", href: "/p/dashboard/settings/profile" },
  { name: "Security", href: "/p/dashboard/settings/security" },
  { name: "Payouts", href: "/p/dashboard/settings/payouts" },
  { name: "Notifications", href: "/p/dashboard/settings/notifications" },
];

export default function SettingsTopNav() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-neutral-700 flex gap-8">
      {tabs.map((tab) => {
        const isActive = pathname.startsWith(tab.href);

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "pb-3 text-sm font-medium transition-colors",
              isActive
                ? "text-black border-b-2 border-gray-500"
                : "text-neutral-400 hover:text-neutral-200"
            )}
          >
            {tab.name}
          </Link>
        );
      })}
    </nav>
  );
}
