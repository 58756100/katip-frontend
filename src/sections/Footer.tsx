"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      id="footer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-7xl mx-auto px-6 py-10 border-t border-gray-200 text-gray-600 text-sm"
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <p>© {new Date().getFullYear()} Ka-TIP. All rights reserved.</p>
        <nav className="flex gap-6">
          <a href="#hero" className="hover:text-[#1B66FF] transition">Home</a>
          <a href="#how-it-works" className="hover:text-[#1B66FF] transition">How it works</a>
          <a href="#pricing" className="hover:text-[#1B66FF] transition">Pricing</a>
          <a href="#trusted-by" className="hover:text-[#1B66FF] transition">Trusted By</a>
          <a href="#testimonials" className="hover:text-[#1B66FF] transition">Testimonials</a>
        </nav>
      </div>
    </motion.footer>
  );
}
