"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedBackground from "../common/AnimatedBackground";

export default function WelcomeBanner({ userName }: { userName: string }) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white shadow-xl">
      {/* Animated Background */}
      <AnimatedBackground variant="default" intensity="normal" />

      <div className="relative z-10 container mx-auto px-6 py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4 max-w-2xl"
        >
          {/* Badge */}
          <div className="inline-flex items-center space-x-3 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 shadow">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
            </motion.div>
            <span className="text-sm font-medium">
              You’re doing great!
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-black leading-tight">
            Welcome back, {userName}!
          </h2>

          {/* Subtext */}
          <p className="text-white/90 text-base md:text-lg">
            Keep up the amazing work. Your learning progress is outstanding!
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Button
            size="lg"
            className="group relative bg-white text-slate-800 hover:bg-slate-100 font-semibold px-8 py-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <span className="flex items-center">
              Continue Learning
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
