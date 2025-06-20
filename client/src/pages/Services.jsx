import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Services() {
  const services = [
    {
      title: "Merge PDF",
      description: "Combine multiple PDF files into one.",
      link: "/services/merge-pdf",
    },
    {
      title: "Compress PDF",
      description: "Reduce PDF file size without losing quality.",
      link: "/services/compress-pdf",
    },
    {
      title: "Word to PDF",
      description: "Convert Word documents to PDF format.",
      link: "/services/word-to-pdf",
    },
    {
      title: "PDF to Word",
      description: "Convert PDF files to editable Word documents.",
      link: "/services/pdf-to-word",
    },
    {
      title: "Compress JPG",
      description: "Compress JPG files easily.",
      link: "/services/compress-jpg",
    },
    {
      title: "JPG to PDF",
      description: "Convert JPG images into PDF files.",
      link: "/services/jpg-to-pdf",
    },
  ];

  return (
    <div className="h-screen w-screen bg-neutral-900 flex flex-col justify-center items-center px-4">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-10 text-white text-center max-w-xl"
      >
         Services
      </motion.h2>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl w-full"
      >
        {services.map(({ title, description, link }) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
            className="h-48"
          >
            <Link
              to={link}
              className="flex flex-col justify-between h-full p-6 rounded-lg bg-gray-800 hover:bg-gray-700 transition-shadow shadow-md hover:shadow-xl"
            >
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
                <p className="text-gray-400 leading-relaxed">{description}</p>
              </div>
              <span className="self-end text-cyan-400 font-medium hover:underline">
                Explore →
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
