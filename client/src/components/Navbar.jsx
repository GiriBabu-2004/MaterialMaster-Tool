
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

// Import your logo image
import logo from '@/assets/M_logo1.png'; // Update this path according to your project structure

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "About Us", to: "/about" },
    { name: "Contact", to: "/contact" },
    { name: "Services", to: "/services" },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className="fixed top-0 left-0 right-0 z-50 h-16 bg-neutral-900 text-white shadow-lg border-b border-gray-700 flex items-center"
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo + Text Container */}
        <div className="flex items-center space-x-3">
          {/* Logo Image */}
          <img src={logo} alt="Material Master Logo" className="h-10 w-10  object-contain" />
          {/* Text */}
          <div className="text-2xl font-semibold tracking-wide">
            Material Master
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link, idx) => (
            <NavLink
              key={idx}
              to={link.to}
              className={({ isActive }) =>
                `text-sm transition duration-300 hover:text-cyan-400 ${
                  isActive ? "text-cyan-400 font-semibold" : "text-gray-300"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-neutral-800 px-6 pb-4 space-y-2"
        >
          {navLinks.map((link, idx) => (
            <NavLink
              key={idx}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block text-sm py-2 transition hover:text-cyan-400 ${
                  isActive ? "text-cyan-400 font-semibold" : "text-gray-300"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}
