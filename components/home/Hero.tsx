"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const slides = [
  {
    id: 1,
    title: "Empower Lives.",
    subtitle: "Support a Cause Today.",
    description: "Join us in making a difference. Help fund education, healthcare, and environmental initiatives.",
    cta: "Donate Now",
    color: "bg-blue-900"
  },
  {
    id: 2,
    title: "Nourishing Future",
    subtitle: "End Hunger.",
    description: "Every child deserves a healthy start. Support our nutrition programs.",
    cta: "Join the Movement",
    color: "bg-green-900"
  },
  {
    id: 3,
    title: "Educate a Child",
    subtitle: "Build a Nation.",
    description: "Education is the key to breaking the cycle of poverty.",
    cta: "Sponsor a Child",
    color: "bg-purple-900"
  }
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[600px] overflow-hidden bg-gray-900 text-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className={`absolute inset-0 flex items-center justify-center ${slides[current].color}`}
        >
          {/* Background Overlay */}
          <div className="absolute inset-0 bg-black/40" />

          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold leading-tight"
            >
              {slides[current].title} <br />
              <span className="text-yellow-400">{slides[current].subtitle}</span>
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 text-xl md:text-2xl text-gray-200"
            >
              {slides[current].description}
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 flex justify-center gap-4"
            >
              <Button className="px-8 py-6 text-xl font-semibold bg-yellow-500 hover:bg-yellow-600 text-black border-none">
                {slides[current].cta}
              </Button>
              <Button variant="outline" className="px-8 py-6 text-xl font-semibold border-white text-white hover:bg-white hover:text-black">
                Learn More
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots/Indicators */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all ${index === current ? "bg-white w-8" : "bg-white/50"
              }`}
          />
        ))}
      </div>
    </section>
  );
}
