"use client";

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";

export default function Home() {
  return (
    <section className="flex-1 w-full bg-neutral-900 overflow-x-hidden">
      <div className="min-h-screen w-full flex flex-col justify-center items-center px-4">
        <HeroHighlight className="max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: [20, -5, 0] }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="text-zinc-700 text-2xl md:text-4xl font-bold leading-relaxed lg:leading-snug"
          >
            Your one-stop solution for all PDF-related tasks.{" "}
            <Highlight className="text-white text-xl md:text-3xl">
              Merge, compress, convert, and edit PDFs easily online.
            </Highlight>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-gray-600 mt-6 mb-10"
          >
            Simplify your PDF workflow with our easy-to-use online tools.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            <Link
              to="/services"
              className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-8 py-3 rounded-md shadow-lg transition"
            >
              Explore Services →
            </Link>
          </motion.div>
        </HeroHighlight>
      </div>
    </section>
  );
}
