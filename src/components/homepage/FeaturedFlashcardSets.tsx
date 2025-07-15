"use client";

import { motion, easeOut } from "framer-motion";
import { ArrowRight, BookOpen, Briefcase, Globe, MessageCircle, Plane, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import AnimatedBackground from "../common/AnimatedBackground";

const FeaturedFlashcardSets = () => {
  const flashcardSets = [
    {
      id: 1,
      title: "Travel English",
      description: "Essential phrases for travelers",
      cardCount: 120,
      icon: Plane,
      color: "from-blue-500 to-blue-600",
      image: "/api/placeholder/400/300"
    },
    {
      id: 2,
      title: "Daily Conversation",
      description: "Common phrases for everyday communication",
      cardCount: 200,
      icon: MessageCircle,
      color: "from-emerald-500 to-emerald-600",
      image: "/api/placeholder/400/300"
    },
    {
      id: 3,
      title: "Job Interview",
      description: "Professional vocabulary and phrases",
      cardCount: 150,
      icon: Briefcase,
      color: "from-purple-500 to-purple-600",
      image: "/api/placeholder/400/300"
    },
    {
      id: 4,
      title: "Academic English",
      description: "Academic writing and presentation skills",
      cardCount: 180,
      icon: BookOpen,
      color: "from-amber-500 to-amber-600",
      image: "/api/placeholder/400/300"
    },
    {
      id: 5,
      title: "Business English",
      description: "Professional communication for business",
      cardCount: 160,
      icon: Target,
      color: "from-indigo-500 to-indigo-600",
      image: "/api/placeholder/400/300"
    },
    {
      id: 6,
      title: "Cultural Topics",
      description: "Learn about English-speaking cultures",
      cardCount: 100,
      icon: Globe,
      color: "from-rose-500 to-rose-600",
      image: "/api/placeholder/400/300"
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: easeOut}
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section className="relative py-32 bg-gradient-to-b from-white via-slate-50/30 to-white">
      {/* Animated Background */}
      <AnimatedBackground variant="default" intensity="normal" />

      <div className="container mx-auto px-8 lg:px-12">
        <motion.div
          className="text-center mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Featured Flashcard Sets
            </span>
          </h2>
          <p className="text-xl text-slate-600/90 max-w-3xl mx-auto leading-relaxed">
            Start learning with our most popular flashcard collections
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {flashcardSets.map((set) => {
            const IconComponent = set.icon;
            return (
              <motion.div
                key={set.id}
                variants={fadeInUp}
                className="group cursor-pointer"
              >
                <div className="relative h-full bg-white/60 backdrop-blur-sm border border-white/40 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105">
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${set.color} opacity-80`}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <IconComponent className="w-24 h-24 text-white/30" />
                    </div>
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 border border-white/30">
                      <span className="text-white text-sm font-semibold">{set.cardCount} cards</span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-2xl font-bold text-slate-800">{set.title}</h3>
                    <p className="text-slate-600/90">{set.description}</p>
                    
                    <Button className="w-full group/btn bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white font-semibold py-3 rounded-xl transition-all duration-300">
                      <span className="flex items-center justify-center">
                        Start Learning
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </span>
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <Button 
            variant="outline" 
            className="group px-8 py-4 text-lg rounded-2xl bg-white/60 backdrop-blur-sm border-slate-300 hover:bg-white hover:border-slate-400 transition-all duration-300 font-semibold"
          >
            <span className="flex items-center text-slate-700">
              View All Flashcard Sets
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedFlashcardSets;