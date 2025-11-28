"use client";

export default function HowItWorks() {
  return (
    <section className="w-full bg-white py-20 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Heading */}
        <h2 className="text-3xl font-semibold text-gray-900">
          How it works
        </h2>
        <p className="text-gray-500 mt-2">
          Three quick steps to tip privately and instantly.
        </p>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          
          {/* Step 1: Scan */}
          <div className="border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900">1. Scan</h3>
            <p className="text-gray-500 mt-2 text-sm leading-relaxed">
              Open Ka-Tip and scan the worker’s QR.<br />
              No contact info exchanged.
            </p>

            {/* Mock Card */}
            <div className="mt-6 border rounded-lg p-5 bg-gray-50">
              <p className="text-sm font-medium text-blue-700">Ka-Tip</p>
              <div className="mt-4 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-600 text-sm">Scan QR</span>
              </div>
            </div>
          </div>

          {/* Step 2: Amount */}
          <div className="border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900">2. Amount</h3>
            <p className="text-gray-500 mt-2 text-sm leading-relaxed">
              Enter the amount or choose a preset.<br />
              You’ll see fees upfront.
            </p>

            {/* Mock Card */}
            <div className="mt-6 border rounded-lg p-5 bg-gray-50">
              <p className="text-sm font-medium text-blue-700">Ka-Tip</p>

              <div className="mt-3 text-sm text-gray-700">
                Tipping<br />
                <span className="font-medium">Brian -- Bistro 14</span>
              </div>

              <div className="mt-4 text-3xl font-semibold text-gray-900">
                $2.50
              </div>

              <div className="flex gap-2 mt-4">
                {["$1", "$2", "$5"].map((val) => (
                  <button
                    key={val}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm hover:bg-gray-100"
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 3: Pay */}
          <div className="border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900">3. Pay</h3>
            <p className="text-gray-500 mt-2 text-sm leading-relaxed">
              Pay with Mobile Money, card, or wallet.<br />
              The worker gets it instantly.
            </p>

            {/* Mock Card */}
            <div className="mt-6 border rounded-lg p-5 bg-gray-50">
              <p className="text-sm font-medium text-blue-700">
                Ka-Tip
              </p>

              <p className="mt-3 text-sm text-gray-700">
                Choose payment method
              </p>

              <div className="mt-4 space-y-3">
                {["Mobile Money", "Card", "Wallet Pay"].map((method) => (
                  <button
                    key={method}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-left hover:bg-gray-100"
                  >
                    {method}
                  </button>
                ))}
              </div>

              <p className="mt-3 text-xs text-gray-400">
                Fees shown before you pay.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
