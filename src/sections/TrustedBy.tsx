"use client";

import { motion } from "framer-motion";

const brands = [
  "/images/brands/cafe-do.svg",
  "/images/brands/bistro-14.svg",
  "/images/brands/urban-salon.svg",
  "/images/brands/rapid-courier.svg",
  "/images/brands/hills-hotel.svg",
  "/images/brands/coconut-coco.svg",
  "/images/brands/sunset-club.svg",
  "/images/brands/city-taxi.svg",
  "/images/brands/dean-bar.svg",
  "/images/brands/north-star.svg",
];

export default function TrustedBy() {
  return (
    <section id="trusted-by" className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-semibold text-gray-900 mb-10 text-center">
        Trusted by teams you know
      </h2>
      <motion.div
        className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.15 } },
        }}
      >
        {brands.map((src, i) => (
          <motion.div
            key={i}
            className="flex justify-center grayscale hover:grayscale-0 transition cursor-pointer"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <img
              src={src}
              alt="Brand logo"
              className="max-h-12 object-contain"
              loading="lazy"
              draggable={false}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
