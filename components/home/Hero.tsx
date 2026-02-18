"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

// Slide Data Configuration
// Buttons appear on ALL slides if cta: true, or as requested, 'Every slide must contain the same 2 CTA buttons'
// I will render them based on cta: true, but assume we want them on all slides based on the prompt.
const slides = [
  {
    id: 1,
    image: "/banner.png", // Replace with specific image
    title: "Transforming Lives Through Education, Health & Dignity.",
    description: "Empowering underserved communities through impactful programs aligned with the UN Sustainable Development Goals.",
    cta: true
  },
  {
    id: 2,
    image: "/banner.png", // Replace with child dream image
    title: "GIVE EVERY CHILD A CHANCE TO DREAM",
    description: "Your support can turn their dreams into reality. Join us in making a difference today.",
    cta: true
  },
  {
    id: 3,
    image: "/banner.png", // Replace with impact photo
    title: "Together We Can Change Lives",
    description: "Every contribution counts towards building a brighter future for those in need.",
    cta: true
  }
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Auto-play functionality - 5s
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000); // 5 seconds per slide
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative w-full min-h-[85vh] overflow-hidden bg-gray-900 group">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }} // Smooth crossfade as requested
          className="absolute inset-0"
        >
          {/* Background Image with Zoom Effect (Parallax feel) */}
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.1 }}
            transition={{ duration: 10, ease: "linear" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${slides[current].image}')` }}
          />

          {/* Overlay - Dark Blue Gradient */}
          <div className="absolute inset-0 bg-black/45" />

          {/* Content - Center Aligned */}
          <div className="relative z-10 w-full h-full flex flex-col justify-center items-center text-center px-6 max-w-[1440px] mx-auto pt-[120px] pb-[80px]">

            {/* Heading Animation: y: 40 -> 0 */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-2xl max-w-5xl leading-tight mb-6"
            >
              {slides[current].title}
            </motion.h1>

            {/* Subtext Animation: y: 40 -> 0 */}
            {slides[current].description && (
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="text-lg md:text-2xl text-gray-100 max-w-3xl drop-shadow-md font-light mb-10"
              >
                {slides[current].description}
              </motion.p>
            )}

            {/* CTA Buttons - Consistent Styling & Animation */}
            {slides[current].cta && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                className="flex flex-col sm:flex-row gap-5"
              >
                {/* Primary Button: Donate (Yellow) */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/donate"
                    className="inline-block bg-yellow-400 hover:bg-yellow-500 text-white font-bold rounded-lg px-6 py-3 shadow-lg transition-colors text-lg"
                  >
                    DONATE
                  </Link>
                </motion.div>

                {/* Secondary Button: Volunteer (Blue) */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/volunteer"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg px-6 py-3 shadow-lg transition-colors text-lg"
                  >
                    VOLUNTEER
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/30 text-white transition-all backdrop-blur-sm opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft size={32} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/30 text-white transition-all backdrop-blur-sm opacity-0 group-hover:opacity-100"
      >
        <ChevronRight size={32} />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${current === idx ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"
              }`}
          />
        ))}
      </div>
    </section>
  );
}
