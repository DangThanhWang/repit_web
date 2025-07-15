"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Flame, Star, TrendingUp, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedBackground from "../common/AnimatedBackground";

export default function WelcomeBanner({ userName }: { userName: string }) {
  const currentHour = new Date().getHours();
  const getGreeting = () => {
    if (currentHour < 12) return "Good morning";
    if (currentHour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-2xl">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <AnimatedBackground variant="blue" intensity="light" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-indigo-600/90 to-purple-600/90"></div>
      </div>

      <div className="relative z-10 container mx-auto px-8 py-16 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 flex-1"
        >
          {/* Achievement Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center space-x-3 px-6 py-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30 shadow-lg"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </motion.div>
            <span className="text-sm font-semibold">
              Learning Streak Active 🔥
            </span>
          </motion.div>

          {/* Main Greeting */}
          <div className="space-y-2">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-white/80 font-medium"
            >
              {getGreeting()}!
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-4xl lg:text-5xl font-black leading-tight"
            >
              Welcome back,{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                {userName}
              </span>
            </motion.h1>
          </div>

          {/* Motivational Message */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg text-white/90 leading-relaxed max-w-xl"
          >
            Ready to continue your English mastery journey? Your consistency is paying off!
          </motion.p>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <Button className="group bg-white text-blue-600 hover:bg-gray-50 font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="flex items-center">
                Continue Learning
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Button>
            <Button
              variant="outline"
              className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              View Progress
            </Button>
          </motion.div>
        </motion.div>

        {/* Right Content - Stats Cards */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-6 lg:min-w-[300px]"
        >
          {/* Today's Goal */}
          <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white/90 font-semibold">Today's Goal</h3>
              <Target className="w-5 h-5 text-white/70" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white/80 text-sm">Learn 10 new words</span>
                <span className="text-white font-bold">7/10</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "70%" }}
                  transition={{ duration: 1.5, delay: 1.2 }}
                  className="h-2 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full"
                />
              </div>
              <p className="text-white/70 text-xs">You're almost there! 💪</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <StatsCard
              icon={<Flame className="w-5 h-5 text-orange-300" />}
              label="Streak"
              value="7 days"
              delay={1.4}
            />
            <StatsCard
              icon={<Star className="w-5 h-5 text-yellow-300" />}
              label="Level"
              value="Pro"
              delay={1.6}
            />
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-8 right-8 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-8 left-8 w-16 h-16 bg-yellow-300/20 rounded-full blur-xl"></div>
    </section>
  );
}

// Stats Card Component
function StatsCard({ 
  icon, 
  label, 
  value, 
  delay 
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      className="bg-white/15 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center hover:bg-white/20 transition-all duration-300"
    >
      <div className="flex justify-center mb-2">
        {icon}
      </div>
      <p className="text-white font-bold text-lg">{value}</p>
      <p className="text-white/70 text-xs uppercase tracking-wide">{label}</p>
    </motion.div>
  );
}