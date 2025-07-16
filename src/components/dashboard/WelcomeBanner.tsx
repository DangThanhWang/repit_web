"use client";

import { motion, easeOut } from "framer-motion";
import { ArrowRight, Sparkles, BookOpen, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WelcomeBanner({ userName }: { userName: string }) {
  const currentHour = new Date().getHours();
  const getGreeting = () => {
    if (currentHour < 12) return "Good morning";
    if (currentHour < 17) return "Good afternoon";
    return "Good evening";
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: easeOut }
  };

  const staggerContainer = {
    animate: {
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <section className="relative py-20 overflow-hidden rounded-3xl bg-gradient-to-br from-sky-500 via-indigo-600 to-purple-700">
      {/* Subtle floating gradient blobs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3, scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2, scale: [1, 1.3, 1] }}
        transition={{ repeat: Infinity, duration: 15, ease: "easeInOut", delay: 3 }}
        className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-br from-blue-400 to-sky-500 rounded-full blur-3xl"
      />

      <div className="relative container mx-auto px-8 lg:px-12 text-center">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          {/* Badge */}
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center space-x-3 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg mb-6"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-amber-400" />
            </motion.div>
            <span className="text-sm font-medium text-white/90">
              {getGreeting()}, {userName}!
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-white"
          >
            Ready to{" "}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Continue Learning?
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            className="mt-4 text-lg md:text-xl text-white/80 max-w-2xl mx-auto"
          >
            Your English mastery journey continues with{" "}
            <span className="text-white font-semibold">smart practice</span> and{" "}
            <span className="text-white font-semibold">personalized lessons</span>.
          </motion.p>

          {/* CTA */}
          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button className="group relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-pink-500/30 transition-all duration-300">
              <BookOpen className="w-5 h-5 mr-2" />
              Continue Learning
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            <Button
              variant="outline"
              className="px-8 py-4 rounded-2xl bg-white/10 border border-white/20 hover:bg-white/20 text-white font-semibold transition-all duration-300 backdrop-blur"
            >
              <Calendar className="w-5 h-5 mr-2" />
              View Schedule
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
