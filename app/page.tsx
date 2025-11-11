"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-20">
      <motion.h1
        className="text-5xl font-bold text-gray-900 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Learn English Smarter with <span className="text-brand">Wordora</span>
      </motion.h1>

      <motion.p
        className="text-lg text-gray-600 max-w-xl mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        AI destekli kelime, cümle ve quizlerle İngilizce öğrenme deneyimini
        kişiselleştir.
      </motion.p>

      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Button>Get Started</Button>
      </motion.div>
    </section>
  );
}
