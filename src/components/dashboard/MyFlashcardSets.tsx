"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus, BookOpen, BarChart3, PlayCircle, Settings, Trash2 } from "lucide-react";

export default function MyFlashcardSets({
  sets,
}: {
  sets: { id: string; title: string; cards: number; progress: number }[];
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-3xl p-8 shadow-xl"
    >
      {/* Header */}
      <motion.div 
        variants={itemVariants}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center space-x-4">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg"
          >
            <BookOpen className="w-7 h-7 text-white" />
          </motion.div>
          <div>
            <h3 className="text-2xl font-bold text-slate-800">My Flashcard Sets</h3>
            <p className="text-slate-600">Manage and review your custom decks</p>
          </div>
        </div>
        
        <Button 
          className="group bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
          Create New Set
        </Button>
      </motion.div>

      {/* Sets Grid */}
      {sets.length === 0 ? (
        <motion.div
          variants={itemVariants}
          className="text-center py-16"
        >
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center mx-auto mb-6"
          >
            <BookOpen className="w-12 h-12 text-slate-400" />
          </motion.div>
          <h4 className="text-xl font-bold text-slate-700 mb-2">No flashcard sets yet</h4>
          <p className="text-slate-500 mb-6">Create your first set to start learning!</p>
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-3 rounded-xl">
            <Plus className="w-5 h-5 mr-2" />
            Get Started
          </Button>
        </motion.div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sets.map((set, index) => (
            <motion.div
              key={set.id}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="group relative"
            >
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                {/* Set Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-slate-800 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {set.title}
                    </h4>
                    <div className="flex items-center space-x-4 text-sm text-slate-600">
                      <span className="flex items-center space-x-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{set.cards} cards</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <BarChart3 className="w-4 h-4" />
                        <span>{set.progress}% done</span>
                      </span>
                    </div>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                      <Settings className="w-4 h-4 text-slate-500" />
                    </button>
                    <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-slate-700">Progress</span>
                    <span className="text-sm font-bold text-blue-600">{set.progress}%</span>
                  </div>
                  <div className="relative">
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${set.progress}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2 rounded-lg transition-all duration-300"
                  >
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Review
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="px-4 py-2 rounded-lg border-slate-300 hover:bg-slate-50 font-medium transition-all duration-300"
                  >
                    Edit
                  </Button>
                </div>

                {/* Progress Ring Indicator */}
                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 relative">
                    <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
                      <circle
                        cx="16"
                        cy="16"
                        r="12"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        className="text-slate-200"
                      />
                      <motion.circle
                        cx="16"
                        cy="16"
                        r="12"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                        className="text-blue-500"
                        initial={{ strokeDasharray: 0, strokeDashoffset: 0 }}
                        animate={{ 
                          strokeDasharray: 75.4,
                          strokeDashoffset: 75.4 - (75.4 * set.progress) / 100
                        }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}