"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full border-b border-gray-200/60 bg-white/80 backdrop-blur-md font-geist">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Ka-TIP Logo"
            width={100}
            height={100}
            className="select-none"
          />
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden items-center gap-10 md:flex">
          <Link
            href="/how-it-works"
            className="text-gray-700 text-sm font-medium transition-opacity hover:opacity-70"
          >
            How it works
          </Link>

          <Link
            href="/pricing"
            className="text-gray-700 text-sm font-medium transition-opacity hover:opacity-70"
          >
            Pricing
          </Link>

          <Link
            href="/auth/login"
            className="text-gray-700 text-sm font-medium transition-opacity hover:opacity-70"
          >
            Login
          </Link>

          {/* Divider */}
          <div className="h-6 w-px bg-gray-300/70" />

          {/* Button */}
          <Button
            variant="outline"
            className="rounded-full border-gray-300 px-5 py-2 text-sm font-medium"
            asChild
          >
            <Link href="/create-qr">Create QR</Link>
          </Button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700 transition-opacity hover:opacity-70"
        >
          <Menu size={26} />
        </button>
      </nav>

      {/* MOBILE DROPDOWN */}
      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white px-6 py-4 space-y-4">
          <MobileLink label="How it works" href="/how-it-works" />
          <MobileLink label="Pricing" href="/pricing" />
          <MobileLink label="Login" href="/auth/login" />

          <Button
            variant="outline"
            className="w-full rounded-full border-gray-300 py-2 text-sm font-medium"
            asChild
          >
            <Link href="/create-qr">Create QR</Link>
          </Button>
        </div>
      )}
    </header>
  );
}

function MobileLink({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="block text-gray-700 text-base font-medium transition-opacity hover:opacity-70"
    >
      {label}
    </Link>
  );
}
