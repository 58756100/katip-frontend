import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Globe,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0B1220] text-gray-300 py-14 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <img
                src="/logo2.svg" // UPDATE THIS
                alt="Ka-Tip Logo"
                className="h-8 w-auto"
              />
             
            </div>
            <p className="mt-3 text-sm text-gray-400">
              Private, QR-based tips. No contact info exchanged.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-gray-100 mb-3">Product</h4>
            <ul className="space-y-2 text-sm">
              {[
                "How it works",
                "For Workers",
                "For Venues",
                "Pricing",
                "FAQ",
                "Status",
              ].map((i) => (
                <li key={i} className="hover:text-white cursor-pointer">{i}</li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-gray-100 mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              {["About", "Careers", "Contact", "Press", "Partners"].map((i) => (
                <li key={i} className="hover:text-white cursor-pointer">{i}</li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-gray-100 mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              {[
                "Terms of Service",
                "Privacy Policy",
                "Cookies",
                "Acceptable Use",
                "Data Protection",
              ].map((i) => (
                <li key={i} className="hover:text-white cursor-pointer">{i}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Compliance */}
        <div className="mt-12">
          <h4 className="font-semibold text-gray-100 mb-4">Compliance</h4>

          <div className="flex flex-wrap gap-3 text-sm">
            {[
              "PCI-aware (PSP)",
              "Kenya DPA 2019",
              "KYC/AML via PSP",
              "M-Pesa",
              "Visa",
              "Mastercard",
              "Bank",
            ].map((badge) => (
              <span
                key={badge}
                className="border border-gray-700 px-3 py-1 rounded-full text-gray-300 bg-[#111827]"
              >
                {badge}
              </span>
            ))}
          </div>

          <p className="text-xs mt-3 text-gray-500">
            Rails & partners shown are placeholders — actual integrations via licensed PSPs.
          </p>
        </div>

        <hr className="border-gray-800 my-10" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

          {/* Registered Entities */}
          <div className="text-sm text-gray-400">
            <p>
              <span className="font-semibold">Registered entities</span>
            </p>
            <p>HoldCo: Mauritius GBC • Ka-Tip Holdings — Ebene, MU</p>
            <p>OpCo: Ka-Tip Kenya Ltd — Nairobi, KE</p>
          </div>

          {/* Region Selector */}
          <div className="flex items-center gap-2 text-gray-300">
            <Globe size={16} />
            <select className="bg-transparent border border-gray-700 px-2 py-1 rounded-md text-sm focus:outline-none">
              <option className="text-black">Kenya (EAT)</option>
            </select>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition"><Twitter size={18} /></a>
            <a href="#" className="hover:text-white transition"><Instagram size={18} /></a>
            <a href="#" className="hover:text-white transition"><Facebook size={18} /></a>
            <a href="#" className="hover:text-white transition"><Linkedin size={18} /></a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-500 mt-10">
          © 2025 Ka-Tip. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
