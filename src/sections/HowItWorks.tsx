"use client";

import { motion } from "framer-motion";
import { CheckCircle, CreditCard, Smartphone } from "lucide-react";

const steps = [
  {
    icon: Smartphone,
    title: "Scan",
    description: "Scan the QR code with your phone camera to get started.",
  },
  {
    icon: CreditCard,
    title: "Amount",
    description: "Select the tip amount easily using our intuitive UI.",
  },
  {
    icon: CheckCircle,
    title: "Pay",
    description: "Pay with mobile money or card, fast and secure.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-semibold text-gray-900 mb-10 text-center">
        How it works
      </h2>
      <motion.div
        className="grid md:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.3 } },
        }}
      >
        {steps.map(({ icon: Icon, title, description }, i) => (
          <motion.div
            key={title}
            className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition cursor-pointer"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-[#1B66FF] mb-4">
              <Icon size={40} />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
