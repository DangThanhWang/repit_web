"use client";

import { motion, easeOut } from "framer-motion";
import { ArrowRight, Play, Sparkles, Trophy, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import CountUp from "react-countup";

const HeroSection = () => {
  const fadeIn = (direction = "up", delay = 0) => {
    const variants = {
      hidden: { opacity: 0, y: direction === "up" ? 60 : 0, x: direction === "left" ? -60 : direction === "right" ? 60 : 0 },
      visible: { opacity: 1, y: 0, x: 0 },
    };
    return {
      initial: "hidden",
      animate: "visible",
      variants,
      transition: { duration: 0.8, ease: easeOut, delay },
    };
  };

  return (
    <section className="relative pt-24 pb-36 overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 opacity-20 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 opacity-20 blur-2xl rounded-full animate-pulse delay-1000"></div>
      </div>

      <div className="relative container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Hero Text */}
          <motion.div {...fadeIn("up", 0)}>
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/30 backdrop-blur-sm rounded-full border border-white/30 shadow-lg mb-6">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-semibold text-slate-700">AI-Powered Flashcards</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent">
                Learn English Faster
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
                with Interactive Flashcards
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-slate-600/90 leading-relaxed max-w-2xl mb-10">
              Discover thousands of smart flashcards, track your progress, and
              join a vibrant community of learners.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="group relative bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-8 py-4 text-lg rounded-2xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-500 hover:scale-105">
                <span className="flex items-center relative z-10">
                  <Play className="w-5 h-5 mr-3" />
                  Start Learning
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
              <Button variant="outline" className="px-8 py-4 text-lg rounded-2xl bg-white/30 backdrop-blur-sm border-white/50 hover:bg-white/40 transition-all duration-300 font-semibold">
                <span className="flex items-center text-slate-700">
                  Watch Demo
                  <Play className="w-4 h-4 ml-2" />
                </span>
              </Button>
            </div>

            {/* Animated Stats */}
            <motion.div className="mt-12 grid grid-cols-2 gap-6 max-w-md" {...fadeIn("up", 0.2)}>
              <div className="flex items-center space-x-3">
                <Trophy className="w-8 h-8 text-amber-500" />
                <div>
                  <div className="text-3xl font-bold text-slate-800">
                    <CountUp end={5000} duration={3} separator="," />+
                  </div>
                  <div className="text-slate-600 text-sm">Flashcards Created</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="w-8 h-8 text-emerald-500" />
                <div>
                  <div className="text-3xl font-bold text-slate-800">
                    <CountUp end={1200} duration={3} separator="," />+
                  </div>
                  <div className="text-slate-600 text-sm">Active Learners</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Flashcard Mockup */}
          <motion.div
            {...fadeIn("right", 0.3)}
            className="relative w-full h-[600px] flex items-center justify-center"
          >
            <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
              {["Adventure", "Journey", "Success"].map((word, i) => (
                <motion.div
                  key={word}
                  whileHover={{ scale: 1.05, rotate: 0 }}
                  className={`bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg transform ${
                    i % 2 === 0 ? "-rotate-2" : "rotate-2"
                  } transition-transform duration-300`}
                >
                  <div className="text-2xl font-bold text-slate-800">{word}</div>
                  <div className="text-slate-600">
                    {word === "Adventure"
                      ? "Cuộc phiêu lưu"
                      : word === "Journey"
                      ? "Hành trình"
                      : "Thành công"}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
