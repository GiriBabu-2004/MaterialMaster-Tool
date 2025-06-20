"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white px-4 py-20 flex items-center justify-center">
      <div className="max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-6 text-center"
        >
          About <span className="text-cyan-500">Material Master</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-lg leading-relaxed text-gray-300 mb-4"
        >
          Material Master is a comprehensive web application designed to make PDF management effortless, efficient, and reliable for users of all levels. Whether you’re a professional dealing with countless documents daily or just someone looking to handle PDFs quickly, our platform is tailored to meet your needs.

Our mission is to simplify every aspect of your PDF-related tasks, so you can focus on what truly matters. From merging multiple documents into a single, well-organized file to compressing large PDFs without sacrificing quality—making sharing easier and faster—we cover all the essentials. We also provide seamless format conversions, allowing you to effortlessly transform Word documents, JPG images, and PDFs back and forth, enabling greater flexibility in your workflow.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-lg leading-relaxed text-gray-300 mb-4"
        >
          Built with modern technologies like <span className="text-white font-medium">React</span>,{" "}
          <span className="text-white font-medium">TailwindCSS</span>, and{" "}
          <span className="text-white font-medium">Node.js</span>, our platform is fast,
          intuitive, and always evolving.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-lg leading-relaxed text-gray-300"
        >
          Thank you for choosing <span className="text-white font-semibold">Material Master</span> — your
          go-to solution for all PDF needs.
        </motion.p>
      </div>
    </div>
  );
}
