"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, PieChart } from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Privacy",
    description: "Your contact details remain private. Only tips are exchanged.",
  },
  {
    icon: Zap,
    title: "Instant payout",
    description: "Tips go directly to providers with no delays or middlemen.",
  },
  {
    icon: PieChart,
    title: "Budgeting",
    description: "Set budgets and track your tipping history easily.",
  },
];

export default function WhyPeopleLove() {
  return (
    <section id="why-people-love" className="max-w-7xl mx-auto px-6 py-20 bg-gray-50 rounded-lg shadow-sm">
      <h2 className="text-3xl font-semibold text-gray-900 mb-10 text-center">
        Why people love Ka-Tip
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
        {benefits.map(({ icon: Icon, title, description }) => (
          <motion.div
            key={title}
            className="bg-white rounded-lg p-6 shadow hover:shadow-md cursor-default"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <div className="text-[#1B66FF] mb-4">
              <Icon size={36} />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
