"use client";

import { useState } from "react";

export default function PricingSection() {
  const [selectedRail, setSelectedRail] = useState("M-Pesa");

  const pricingDetails = {
    tipAmount: 500.0,
    processingFee: 12.5,
    total: 512.5,
  };

  const paymentRails = ["M-Pesa", "Visa", "Mastercard", "Bank Transfer"];

  return (
    <section className="w-full py-16 px-6 md:px-10 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-900">Pricing & Fees</h2>
        <p className="text-gray-500 mt-2 text-base">
          Transparent at checkout. No surprises.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {/* Left Column */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">
              Simple for Tippers & Workers
            </h3>
            <p className="text-sm text-gray-600">
              Tippers: You see the processing fee before you pay.
              <br />
              Workers: Instant payout available via supported rails.
              <br />
              Venues: Free pilot; platform fees apply at launch.
            </p>

            <ul className="text-sm text-gray-600 space-y-3">
              <li className="flex items-center">
                <span className="text-green-500">✅</span>
                <span className="ml-2">No hidden charges</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500">✅</span>
                <span className="ml-2">Instant payouts*</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500">✅</span>
                <span className="ml-2">Fees shown upfront</span>
              </li>
            </ul>
          </div>

          {/* Right Column */}
          <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">
              Example Checkout
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Tip amount</span>
                <span>KES {pricingDetails.tipAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Processing fee</span>
                <span>KES {pricingDetails.processingFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-gray-800">
                <span>Total charged</span>
                <span>KES {pricingDetails.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm text-gray-600">
                Select a payment rail
              </label>
              <select
                value={selectedRail}
                onChange={(e) => setSelectedRail(e.target.value)}
                className="mt-2 w-full p-2 border rounded-md text-sm text-gray-800"
              >
                {paymentRails.map((rail) => (
                  <option key={rail} value={rail}>
                    {rail}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-6 flex justify-start">
              <button className="bg-blue-500 text-white py-2 px-6 rounded-md">
                See full pricing
              </button>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-8">
          *Payout timing depends on rail/PSP.
          <br />
          *Fees shown before payment.
        </p>
      </div>
    </section>
  );
}
