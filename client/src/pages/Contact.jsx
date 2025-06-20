"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import axios from "axios";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus({ type: "error", message: "All fields are required." });
      return;
    }
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/contact/send", form);
      setStatus({ type: "success", message: "Message sent successfully!" });
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus({ type: "error", message: "Failed to send message. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-neutral-950 to-neutral-900 px-4 py-12">
      <motion.div
        className="relative w-full max-w-md rounded-xl border border-white/[0.1] bg-white/5 p-6 backdrop-blur-lg shadow-[0px_0px_1px_1px_#262626] transition-all"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-white">Contact Us</h2>
        <p className="mt-1 text-sm text-neutral-300">
          We'd love to hear your thoughts.
        </p>

        {status && (
          <div
            className={cn(
              "mt-4 p-3 rounded text-sm",
              status.type === "success"
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            )}
          >
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <Label htmlFor="name" className="text-white">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter your name"
              type="text"
              className="mt-0.25"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="Enter your email"
              type="email"
              className="mt-0.25"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="message" className="text-white">
              Message
            </Label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Write your message..."
              className="mt-1 w-full rounded-md bg-white/10 px-4 py-2 text-white placeholder-neutral-400 shadow-input focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative mt-4 w-full rounded-md bg-white/10 py-2 text-white font-bold transition-all hover:bg-white/20"
          >
            {loading ? "Sending..." : "Send Message →"}
            <span className="absolute inset-x-0 -bottom-px h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </button>
        </form>
      </motion.div>
    </section>
  );
}
