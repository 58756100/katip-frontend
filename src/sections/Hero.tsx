"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="w-full bg-gray-50 pt-20 pb-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* LEFT SIDE */}
        <div className="space-y-6">
          <p className="text-blue-600 font-medium text-sm">
            Private QR tipping
          </p>

          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight">
            Scan. Tip. Done.<br />
            No phone numbers ever.
          </h1>

          <p className="text-gray-600 text-lg max-w-md">
            Ka-Tip lets you tip workers instantly by scanning a QR.
            Pay with mobile money or card. The recipient gets the
            tip—your contact details stay private.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-3 px-6 rounded-lg transition">
              Get the app
            </button>

            <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 text-sm font-medium py-3 px-6 rounded-lg transition">
              Create your QR
            </button>
          </div>

          {/* Under-buttons note */}
          <p className="text-gray-500 text-sm">
            Works with Mobile Money and major cards. Fees shown before you pay.
          </p>

          {/* Feature bullets */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 pt-4">
            <span>No contact sharing</span>
            <span className="text-gray-400">•</span>
            <span>Instant payouts via PSP</span>
            <span className="text-gray-400">•</span>
            <span>Tip budget & receipts</span>
          </div>
        </div>

        {/* RIGHT SIDE — PHONE MOCKUP */}
        <div className="flex justify-center md:justify-end">
          <div className="w-[260px] md:w-[300px]">
            <Image
              src="/iphone-mockup.png"  // <-- Replace with your real phone image
              alt="Ka-Tip App Phone Mockup"
              width={300}
              height={600}
              className="w-full h-auto drop-shadow-xl"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
}
