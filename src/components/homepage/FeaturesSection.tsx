"use client";

import { motion, easeOut } from "framer-motion";
import { 
  BookOpen, 
  TrendingUp, 
  Smartphone, 
  Brain,
  Layers,
  Cloud
} from "lucide-react";
import AnimatedBackground from "../common/AnimatedBackground";

const FeaturesSection = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Diverse Flashcards",
      description: "Learn vocabulary, conversational phrases, and grammar with our comprehensive flashcard collection.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed charts and maintain your daily learning streak.",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      icon: Layers,
      title: "Create Custom Decks",
      description: "Build your own personalized flashcard decks tailored to your learning needs and goals.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Cloud,
      title: "Sync Across Devices",
      description: "Access your flashcards seamlessly on desktop, tablet, or smartphone - learn anywhere, anytime.",
      color: "from-amber-500 to-amber-600"
    }
  ];

  const fadeInScale = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6, ease: easeOut }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Dynamic Gradient Background */}
      {/* <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 opacity-20 blur-3xl rounded-full animate-pulse"></div> */}

      {/* Animated Background */}
      <AnimatedBackground variant="default" intensity="normal" />

      <div className="relative container mx-auto px-8 lg:px-12">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Key Features
            </span>
          </h2>
          <p className="text-xl text-slate-600/90 max-w-3xl mx-auto leading-relaxed">
            Everything you need to master English effectively
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                variants={fadeInScale}
                className="group relative"
              >
                <div className="h-full relative border border-slate-200/50 bg-white/30 backdrop-blur-xl rounded-3xl p-8 shadow-xl shadow-black/10 hover:shadow-2xl hover:shadow-black/20 transition-all duration-500 hover:scale-105 hover:-translate-y-1">
                  {/* Border Gradient Ring */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gradient-to-br group-hover:from-blue-500 group-hover:to-purple-500 pointer-events-none transition-colors duration-500"></div>

                  {/* Icon */}
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-6`}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
                  <p className="text-slate-600/90 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
