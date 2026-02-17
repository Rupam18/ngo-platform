"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stats = [
  { number: 10000, suffix: "+", label: "Lives Impacted" },
  { number: 300, suffix: "+", label: "Volunteers" },
  { number: 50, suffix: "+", label: "Programs" },
  { number: 20, suffix: "+", label: "Cities" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString()
  );

  useEffect(() => {
    if (inView) {
      spring.set(value);
    }
  }, [inView, spring, value]);

  return (
    <span className="flex items-center justify-center">
      <motion.span ref={ref}>{display}</motion.span>
      {suffix}
    </span>
  );
}

export default function ImpactStats() {
  return (
    <section className="relative z-30 -mt-16 md:-mt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl md:rounded-3xl shadow-2xl grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-100 overflow-hidden"
        >
          {stats.map((stat, index) => (
            <div key={index} className="p-6 md:p-8 text-center group hover:bg-blue-50/30 transition-colors">
              <h3 className="text-3xl md:text-5xl font-bold text-blue-900 mb-2 flex justify-center items-center">
                <Counter value={stat.number} suffix={stat.suffix} />
              </h3>
              <p className="text-sm md:text-base text-gray-600 font-medium uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
