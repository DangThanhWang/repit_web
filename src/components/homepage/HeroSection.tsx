"use client";

import { motion } from "framer-motion";
import { Play, ArrowRight, BookOpen, Star, Globe, Brain, Sparkles, Zap, Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedBackground from "../common/AnimatedBackground"; // Import component

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden ">
      {/* Animated Background */}
      {/* <AnimatedBackground variant="default" intensity="normal" /> */}

      <div className="relative container mx-auto px-8 lg:px-12 grid lg:grid-cols-2 gap-20 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-10 z-10"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="inline-flex items-center space-x-3 px-6 py-3 bg-white/70 backdrop-blur-xl rounded-2xl border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-amber-500" />
            </motion.div>
            <span className="text-sm font-bold bg-gradient-to-r from-slate-600 to-slate-800 bg-clip-text text-transparent">
              ✨ AI-Powered Learning
            </span>
          </motion.div>

          {/* Title */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-6xl lg:text-8xl font-black leading-none"
            >
              <span className="block bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">
                Master
              </span>
              <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent relative">
                English
                {/* <motion.div
                  animate={{ scaleX: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 2, delay: 1 }}
                  className="absolute bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full origin-left"
                /> */}
              </span>
              <span className="block bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">
                Fluently
              </span>
            </motion.h1>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl lg:text-2xl text-slate-600 max-w-2xl leading-relaxed"
          >
            Transform your English skills with{" "}
            <span className="font-semibold text-blue-600">AI-powered lessons</span>,{" "}
            <span className="font-semibold text-indigo-600">smart practice</span>, and{" "}
            <span className="font-semibold text-purple-600">real-time feedback</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-6 pt-4"
          >
            <Button className="group relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-bold px-10 py-6 text-lg rounded-2xl shadow-2xl hover:shadow-blue-500/40 transition-all duration-500 overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                animate={{ x: [-100, 300] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              />
              <span className="flex items-center relative z-10">
                <Play className="w-6 h-6 mr-3" />
                Start Learning Now
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </Button>
            <Button
              variant="outline"
              className="px-10 py-6 text-lg rounded-2xl bg-white/50 backdrop-blur-xl border-2 border-slate-200 hover:bg-white/70 hover:border-slate-300 font-bold text-slate-700 transition-all duration-300 hover:shadow-lg"
            >
              Watch Demo
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex items-center gap-8 pt-6"
          >
            <div className="text-center">
              <p className="text-3xl font-black text-slate-800">50K+</p>
              <p className="text-sm text-slate-600">Active Learners</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-black text-slate-800">95%</p>
              <p className="text-sm text-slate-600">Success Rate</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-black text-slate-800">4.9★</p>
              <p className="text-sm text-slate-600">User Rating</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Content - Feature Visualization */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="relative"
        >
          {/* Feature Cards Grid */}
          <div className="grid grid-cols-2 gap-6">
            <FeatureCard 
              icon={Brain} 
              title="AI Tutor"
              description="Personal guidance"
              delay={0.5}
            />
            <FeatureCard 
              icon={Globe} 
              title="Global Community"
              description="Learn with others"
              delay={0.7}
            />
            <FeatureCard 
              icon={Star} 
              title="Achievements"
              description="Track progress"
              delay={0.9}
            />
            <FeatureCard 
              icon={BookOpen} 
              title="Smart Content"
              description="Adaptive learning"
              delay={1.1}
            />
          </div>

          {/* Floating Central Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 20, 
                ease: "linear" 
              }}
              className="w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full backdrop-blur-xl border border-white/30 flex items-center justify-center"
            >
              <Sparkles className="w-8 h-8 text-indigo-600" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon: Icon, title, description, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ 
      scale: 1.05, 
      rotate: 2,
      transition: { duration: 0.3 }
    }}
    className="relative group"
  >
    <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300">
      <motion.div
        animate={{ 
          rotate: [0, 5, -5, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 4, 
          ease: "easeInOut",
          delay: delay * 2
        }}
        className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:shadow-lg transition-all duration-300"
      >
        <Icon className="w-6 h-6 text-white" />
      </motion.div>
      <h3 className="font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-sm text-slate-600">{description}</p>
    </div>
  </motion.div>
);

export default HeroSection;