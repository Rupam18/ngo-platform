"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const slides = [
  {
    id: 1,
    image: "/banner.png",
    title: "Transforming Lives Through Education, Health & Dignity.",
    description:
      "Empowering underserved communities through impactful programs aligned with the UN Sustainable Development Goals.",
    cta: true,
  },
  {
    id: 2,
    image: "/banner.png",
    title: "GIVE EVERY CHILD A CHANCE TO DREAM",
    description:
      "Your support can turn their dreams into reality. Join us in making a difference today.",
    cta: true,
  },
  {
    id: 3,
    image: "/banner.png",
    title: "Together We Can Change Lives",
    description:
      "Every contribution counts towards building a brighter future for those in need.",
    cta: true,
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative w-full h-[calc(100vh-130px)] overflow-hidden bg-gray-900 group">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.1 }}
            transition={{ duration: 10, ease: "linear" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${slides[current].image}')` }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Content */}
          <div className="relative z-10 w-full h-full flex flex-col justify-center items-center text-center px-6 max-w-[1440px] mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-2xl max-w-5xl leading-tight mb-6"
            >
              {slides[current].title}
            </motion.h1>

            {slides[current].description && (
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-2xl text-gray-100 max-w-3xl drop-shadow-md font-light mb-10"
              >
                {slides[current].description}
              </motion.p>
            )}

            {slides[current].cta && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-5"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/donate">
                    <Button variant="primary" size="lg">
                      DONATE
                    </Button>
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/volunteer">
                    <Button variant="secondary" size="lg">
                      VOLUNTEER
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/30 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft size={32} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/30 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100"
      >
        <ChevronRight size={32} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${current === idx
              ? "bg-white scale-125"
              : "bg-white/50 hover:bg-white/80"
              }`}
          />
        ))}
      </div>
    </section>
  );
}
