"use client";

import { motion, easeOut } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, BookOpen, Star, TrendingUp, ArrowRight, Target, Award } from "lucide-react";
import AnimatedBackground from "../common/AnimatedBackground";

export default function RecommendedContent({
  flashcards,
}: {
  flashcards: { id: string; title: string; cards: number }[];
}) {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: easeOut }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section className="relative py-20  overflow-hidden rounded-3xl">
      {/* Animated Background */}
      {/* <AnimatedBackground variant="purple" intensity="normal" /> */}

      <div className="relative container mx-auto px-8 lg:px-12">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {/* Header */}
          <motion.div
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-3 px-6 py-3 bg-white/70 backdrop-blur-xl rounded-2xl border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300 mb-8">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-amber-500" />
              </motion.div>
              <span className="text-sm font-bold bg-gradient-to-r from-slate-600 to-slate-800 bg-clip-text text-transparent">
                ✨ AI-Powered Recommendations
              </span>
            </div>

            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Recommended for You
              </span>
            </h2>
            <p className="text-xl text-slate-600/90 max-w-3xl mx-auto leading-relaxed">
              Personalized content based on your learning progress and interests
            </p>
          </motion.div>

          {/* Recommended Content */}
          {flashcards.length === 0 ? (
            <motion.div
              variants={fadeInUp}
              className="text-center py-16"
            >
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center mx-auto mb-6"
              >
                <BookOpen className="w-12 h-12 text-slate-400" />
              </motion.div>
              <h3 className="text-2xl font-bold text-slate-700 mb-4">No recommendations yet</h3>
              <p className="text-slate-500 mb-8 max-w-lg mx-auto">
                Start learning with some flashcards and we'll recommend personalized content for you!
              </p>
              <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                <Sparkles className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                Explore Content
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </motion.div>
          ) : (
            <>
              <motion.div
                variants={staggerContainer}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
              >
                {flashcards.map((item, index) => (
                  <motion.div
                    key={item.id}
                    variants={fadeInUp}
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                    className="group"
                  >
                    <div className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                      {/* Content Header */}
                      <div className="flex items-start justify-between mb-4">
                        <motion.div
                          animate={{ 
                            rotate: [0, 360],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ 
                            repeat: Infinity, 
                            duration: 8, 
                            ease: "linear",
                            delay: index * 0.5
                          }}
                          className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg"
                        >
                          <Sparkles className="w-6 h-6 text-white" />
                        </motion.div>
                        
                        {/* Rating Stars */}
                        <div className="flex space-x-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                          ))}
                        </div>
                      </div>

                      {/* Content Info */}
                      <div className="space-y-4 mb-6">
                        <h3 className="text-lg font-bold text-slate-800 group-hover:text-amber-600 transition-colors line-clamp-2">
                          {item.title}
                        </h3>
                        <div className="flex items-center justify-between text-sm text-slate-600">
                          <span className="flex items-center space-x-1">
                            <BookOpen className="w-4 h-4" />
                            <span>{item.cards} cards</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Target className="w-4 h-4" />
                            <span>95% match</span>
                          </span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                          Popular
                        </span>
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full font-medium">
                          Beginner
                        </span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">
                          Trending
                        </span>
                      </div>

                      {/* Recommendation Score */}
                      <div className="mb-6">
                        <div className="flex items-center justify-between text-sm font-medium text-slate-700 mb-2">
                          <span>Perfect for you</span>
                          <span className="text-amber-600">95%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                          <motion.div
                            className="h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: "95%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                          />
                        </div>
                      </div>

                      {/* Action Button */}
                      <Button 
                        className="w-full group/btn bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium py-3 rounded-xl transition-all duration-300"
                      >
                        <span className="flex items-center justify-center">
                          Start Learning
                          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </span>
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* View All Recommendations Button */}
              <motion.div
                variants={fadeInUp}
                className="text-center"
              >
                <Button 
                  variant="outline" 
                  className="group px-8 py-4 text-lg rounded-2xl bg-white/60 backdrop-blur-sm border-purple-300 hover:bg-purple-50 hover:border-purple-400 transition-all duration-300 font-semibold"
                >
                  <span className="flex items-center text-purple-700">
                    <TrendingUp className="w-5 h-5 mr-3" />
                    View All Recommendations
                    <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Button>
              </motion.div>

              {/* AI Suggestion Badge */}
              <motion.div
                variants={fadeInUp}
                className="mt-12 text-center"
              >
                <div className="inline-flex items-center space-x-3 px-6 py-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  >
                    <Sparkles className="w-5 h-5 text-amber-500" />
                  </motion.div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-amber-700">
                      AI-powered recommendations
                    </p>
                    <p className="text-xs text-amber-600">
                      Based on your learning style and progress
                    </p>
                  </div>
                  <Award className="w-5 h-5 text-amber-500" />
                </div>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}