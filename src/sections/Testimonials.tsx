"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Lydia M.",
    rating: 5,
    text: "Guests tip more often and more, and I never miss the payouts.",
  },
  {
    name: "Brian K.",
    rating: 4,
    text: "Setup took minutes — QR booking instantly increased income.",
  },
  {
    name: "Alisha N.",
    rating: 5,
    text: "Our diners get tips via cards straight away.",
  },
];

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      fill={filled ? "#1B66FF" : "none"}
      stroke="#1B66FF"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      className="w-5 h-5 inline-block"
      aria-hidden="true"
    >
      <path d="M12 17.27L18.18 21 15.54 13.97 21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="max-w-7xl mx-auto px-6 py-20 bg-gray-50 rounded-lg shadow-sm">
      <h2 className="text-3xl font-semibold text-gray-900 mb-10 text-center">
        Testimonials
      </h2>
      <motion.div
        className="grid md:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
      >
        {testimonials.map(({ name, rating, text }) => (
          <motion.div
            key={name}
            className="bg-white rounded-lg p-6 shadow cursor-default hover:shadow-lg transition-transform"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} filled={i < rating} />
              ))}
            </div>
            <p className="text-gray-700 italic mb-4">"{text}"</p>
            <p className="text-gray-900 font-semibold">{name}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
