"use client";

import { motion } from "framer-motion";

export default function Pricing() {
  return (
    <section id="pricing" className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-semibold text-gray-900 mb-10 text-center">
        Pricing
      </h2>
      <motion.div
        className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.3 } },
        }}
      >
        <motion.div
          className="border border-[#1B66FF] rounded-lg p-8 flex flex-col items-center text-center hover:shadow-lg cursor-default"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <h3 className="text-2xl font-semibold mb-4 text-[#1B66FF]">Free to use</h3>
          <p className="text-gray-700 mb-6">
            No subscription fees. You only pay a small platform fee when you tip.
          </p>
          <p className="text-gray-500 text-sm mb-6">
            * Platform fee varies by transaction. Exact details coming soon.
          </p>
          <button className="bg-[#1B66FF] text-white px-6 py-3 rounded-md font-medium hover:bg-blue-600 transition">
            Learn More
          </button>
        </motion.div>

        <motion.div
          className="border border-gray-300 rounded-lg p-8 flex flex-col items-center text-center cursor-default"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <h3 className="text-2xl font-semibold mb-4 text-gray-900">Future plans</h3>
          <p className="text-gray-700 mb-6">
            We plan to introduce premium features and subscription options soon.
          </p>
          <button className="border border-gray-300 px-6 py-3 rounded-md font-medium text-gray-700 hover:border-[#1B66FF] hover:text-[#1B66FF] transition">
            Stay Updated
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
