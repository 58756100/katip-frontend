"use client";

import Image from "next/image";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Only include main sections you want in the navbar
  const sections = [
    { label: "Home", id: "home" },
    { label: "How it works", id: "how-it-works" },
    { label: "Pricing", id: "pricing" },
  ];

  // Smooth scroll function
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setOpen(false); // Close mobile menu if open
    }
  };

  return (
    <header className="w-full border-b border-gray-200/60 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20">

        {/* LOGO */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleScroll("home")}>
          <Image
            src="/logo.svg"
            alt="Ka-TIP Logo"
            width={100}
            height={100}
            className="select-none"
          />
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden items-center gap-8 md:flex">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleScroll(section.id)}
              className="text-gray-700 text-sm font-medium transition-opacity hover:text-blue-600"
            >
              {section.label}
            </button>
          ))}

          {/* Divider */}
          <div className="h-6 w-px bg-gray-300/70" />

          {/* CTA Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="rounded-full border-blue-600 px-5 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
              onClick={() => handleScroll("create-qr")}
            >
              Create QR
            </Button>

            <Link
              href="/login"
              className="rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
            >
              Login
            </Link>
          </div>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700 transition-opacity hover:text-blue-600"
        >
          <Menu size={26} />
        </button>
      </nav>

      {/* MOBILE DROPDOWN */}
      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white px-6 py-4 space-y-4">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleScroll(section.id)}
              className="block text-gray-700 text-base font-medium transition-opacity hover:text-blue-600 w-full text-left"
            >
              {section.label}
            </button>
          ))}

          <Button
            variant="outline"
            className="w-full rounded-full border-blue-600 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
            onClick={() => handleScroll("create-qr")}
          >
            Create QR
          </Button>

          <Link
            href="/login"
            className="block w-full rounded-full border border-gray-300 py-2 text-sm font-medium text-gray-700 text-center hover:bg-gray-100 transition"
          >
            Login
          </Link>
        </div>
      )}
    </header>
  );
}
