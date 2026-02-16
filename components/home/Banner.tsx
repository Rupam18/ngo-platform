"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Banner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full bg-white border-b"
    >
      <div className="max-w-7xl mx-auto py-6 px-4 flex justify-center">
        <Image
          src="/banner.png"
          alt="Rostrum India Social Organization"
          width={800}
          height={150}
          className="object-contain"
        />
      </div>
    </motion.div>
  );
}
