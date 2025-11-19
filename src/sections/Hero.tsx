// src/sections/Hero.tsx
"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.section
      id="hero"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-10"
    >
      <div className="flex-1 space-y-6">
        <h1 className="text-5xl font-semibold text-gray-900">
          Scan. Tip. Done.
        </h1>
        <p className="text-gray-600 max-w-xl">
          Ka-Tip lets you support instantly by scanning a QR. Pay with mobile money or card. The recipient gets the gift — the contact details stay private.
        </p>
        <div className="flex gap-4">
          <button className="bg-[#1B66FF] text-white px-6 py-3 rounded-md font-medium hover:bg-blue-600 transition">
            Get the app
          </button>
          <button className="border border-gray-300 px-6 py-3 rounded-md font-medium text-gray-700 hover:border-[#1B66FF] hover:text-[#1B66FF] transition">
            Create your QR
          </button>
        </div>
        <p className="text-gray-500 text-sm italic">
          No contact sharing • Instant delivery • Tip securely & privately
        </p>
      </div>
      <div className="flex-1">
        {/* Replace with your iPhone mockup image */}
        <img
          src="/images/iphone-mockup.png"
          alt="Ka-Tip app on phone"
          className="w-full max-w-md mx-auto"
        />
      </div>
    </motion.section>
  );
}
