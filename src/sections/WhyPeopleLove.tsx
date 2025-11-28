"use client";

import { Shield, Zap, PieChart } from "lucide-react";

export default function WhyPeopleLoveKaTip() {
  return (
    <section className="w-full py-16 px-6 md:px-10 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl font-semibold text-gray-900">
          Why people love Ka-Tip
        </h2>
        <p className="text-gray-500 mt-2 text-base">
          Clear privacy, instant payouts, and budgeting that keeps generosity on track.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          
          {/* Privacy */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 pb-8">
            <div className="h-1.5 w-full bg-blue-600 rounded-t-md -mt-6 mb-4"></div>

            <div className="flex items-center gap-2">
              <Shield className="text-blue-600" size={20} />
              <h3 className="text-lg font-semibold text-gray-800">Privacy</h3>
            </div>

            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li className="flex gap-2">
                <span className="text-blue-500">•</span>
                No Phone numbers or bank details shared
              </li>
              <li className="flex gap-2">
                <span className="text-blue-500">•</span>
                Aliases only on receipts
              </li>
              <li className="flex gap-2">
                <span className="text-blue-500">•</span>
                Minimal data, encrypted on transit & at rest
              </li>
            </ul>
          </div>

          {/* Instant payout */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 pb-8">
            <div className="h-1.5 w-full bg-blue-600 rounded-t-md -mt-6 mb-4"></div>

            <div className="flex items-center gap-2">
              <Zap className="text-blue-600" size={20} />
              <h3 className="text-lg font-semibold text-gray-800">Instant payout</h3>
            </div>

            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li className="flex gap-2">
                <span className="text-blue-500">•</span>
                Direct to M-Pesa or bank via PSP
              </li>
              <li className="flex gap-2">
                <span className="text-blue-500">•</span>
                No Ka-Tip wallet in MVP
              </li>
              <li className="flex gap-2">
                <span className="text-blue-500">•</span>
                Clear fee line before you pay
              </li>
            </ul>
          </div>

          {/* Budgeting */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 pb-8">
            <div className="h-1.5 w-full bg-blue-600 rounded-t-md -mt-6 mb-4"></div>

            <div className="flex items-center gap-2">
              <PieChart className="text-blue-600" size={20} />
              <h3 className="text-lg font-semibold text-gray-800">Budgeting</h3>
            </div>

            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li className="flex gap-2">
                <span className="text-blue-500">•</span>
                Set a monthly tip cap
              </li>
              <li className="flex gap-2">
                <span className="text-blue-500">•</span>
                See history and receipts
              </li>
              <li className="flex gap-2">
                <span className="text-blue-500">•</span>
                Nudges when you're close to the limit
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
