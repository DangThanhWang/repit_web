"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, BookOpen, Star, TrendingUp, ArrowRight } from "lucide-react";

export default function RecommendedContent({
  flashcards,
}: {
  flashcards: { id: string; title: string; cards: number }[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-3xl p-6 shadow-xl h-full"
    >
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 8, 
            ease: "linear" 
          }}
          className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg"
        >
          <Sparkles className="w-6 h-6 text-white" />
        </motion.div>
        <div>
          <h3 className="text-lg font-bold text-slate-800">Recommended</h3>
          <p className="text-sm text-slate-600">Perfect for you</p>
        </div>
      </div>

      {/* Recommended Items */}
      <div className="space-y-4">
        {flashcards.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-8"
          >
            <motion.div
              animate={{ y: [-3, 3, -3] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-4"
            >
              <BookOpen className="w-8 h-8 text-slate-400" />
            </motion.div>
            <p className="text-sm text-slate-500 mb-4">No recommendations yet</p>
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-medium px-4 py-2 rounded-lg"
            >
              Explore Content
            </Button>
          </motion.div>
        ) : (
          <>
            {flashcards.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <div className="p-4 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl hover:bg-white/70 hover:shadow-md transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-800 text-sm mb-1 group-hover:text-amber-600 transition-colors line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 flex items-center space-x-1">
                        <BookOpen className="w-3 h-3" />
                        <span>{item.cards} cards</span>
                      </p>
                    </div>
                    
                    {/* Rating Stars */}
                    <div className="flex space-x-0.5 ml-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-amber-400 fill-current" />
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                      Popular
                    </span>
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full font-medium">
                      Beginner
                    </span>
                  </div>

                  {/* Action Button */}
                  <Button 
                    size="sm" 
                    className="w-full group/btn bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium py-2 rounded-lg transition-all duration-300"
                  >
                    <span className="flex items-center justify-center">
                      Start Learning
                      <ArrowRight className="w-3 h-3 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </span>
                  </Button>
                </div>
              </motion.div>
            ))}

            {/* View All Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button 
                variant="outline" 
                className="w-full mt-4 border-dashed border-2 border-slate-300 hover:border-amber-400 hover:bg-amber-50 text-slate-600 hover:text-amber-600 font-medium py-3 rounded-xl transition-all duration-300"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                View All Recommendations
              </Button>
            </motion.div>
          </>
        )}
      </div>

      {/* AI Suggestion Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 p-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl"
      >
        <div className="flex items-center space-x-2">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
          </motion.div>
          <p className="text-xs font-medium text-amber-700">
            AI-powered recommendations based on your learning style
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}