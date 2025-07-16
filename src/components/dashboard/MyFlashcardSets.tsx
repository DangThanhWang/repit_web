"use client";

import Link from "next/link";
import { motion, easeOut } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, BookOpen, BarChart3, PlayCircle, Settings, Trash2, ArrowRight, Target, Pencil } from "lucide-react";
import AnimatedBackground from "../common/AnimatedBackground";

export default function MyFlashcardSets({
  sets,
}: {
  sets: { id: string; title: string; cards: number; progress: number }[];
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
      {/* <AnimatedBackground variant="blue" intensity="normal" /> */}

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
            className="flex items-center justify-between mb-16"
          >
            <div className="text-center lg:text-left">
              <h2 className="text-4xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  My Flashcard Sets
                </span>
              </h2>
              <p className="text-xl text-slate-600/90 max-w-3xl leading-relaxed">
                Manage and review your custom learning decks
              </p>
            </div>
            
            <Link href="/flashcards/new">
              <Button 
                className="group bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Plus className="w-5 h-5 mr-3 group-hover:rotate-90 transition-transform duration-300" />
                Create New Set
              </Button>
            </Link>

          </motion.div>

          {/* Sets Content */}
          {sets.length === 0 ? (
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
              <h3 className="text-2xl font-bold text-slate-700 mb-4">No flashcard sets yet</h3>
              <p className="text-slate-500 mb-8 max-w-lg mx-auto">
                Create your first flashcard set to start your personalized learning journey!
              </p>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                <Plus className="w-5 h-5 mr-3 group-hover:rotate-90 transition-transform duration-300" />
                Get Started
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </motion.div>
          ) : (
            <>
              <motion.div
                variants={staggerContainer}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
              >
                {sets.map((set, index) => (
                  <motion.div
                    key={set.id}
                    variants={fadeInUp}
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                    className="group relative"
                  >
                    <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                      {/* Set Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                          <Link href={`/flashcards/${set.id}`} className="group-hover:text-blue-600 transition-colors">
                            <h3 className="text-xl font-bold mb-2 line-clamp-2 cursor-pointer">
                              {set.title}
                            </h3>
                          </Link>
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
                        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-auto z-10">
                          {/* <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                            <Settings className="w-4 h-4 text-slate-500" />
                          </button> */}
                          <button
                            onClick={() => {
                              // TODO: Thêm confirm delete
                              alert("Bạn muốn xóa bộ flashcard này?");
                            }}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </div>

                      {/* Progress Section */}
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm font-medium text-slate-700 flex items-center space-x-2">
                            <Target className="w-4 h-4" />
                            <span>Progress</span>
                          </span>
                          <span className="text-sm font-bold text-blue-600">{set.progress}%</span>
                        </div>
                        <div className="relative">
                          <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow-inner"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${set.progress}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Study Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-center p-3 bg-blue-50 rounded-xl">
                          <p className="text-lg font-bold text-blue-600">{Math.round(set.cards * set.progress / 100)}</p>
                          <p className="text-xs text-blue-600/80">Learned</p>
                        </div>
                        <div className="text-center p-3 bg-emerald-50 rounded-xl">
                          <p className="text-lg font-bold text-emerald-600">{set.cards - Math.round(set.cards * set.progress / 100)}</p>
                          <p className="text-xs text-emerald-600/80">Remaining</p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <Link href={`/flashcards/${set.id}/review`} className="flex-1">
                          <Button
                            size="sm"
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 rounded-xl transition-all duration-300"
                          >
                            <PlayCircle className="w-4 h-4 mr-2" />
                            Review
                          </Button>
                        </Link>
                        <Link href={`/flashcards/${set.id}/edit`}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="px-4 py-3 rounded-xl border-slate-300 hover:bg-slate-50 font-medium transition-all duration-300"
                          >
                            <Pencil className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                        </Link>
                      </div>


                      {/* Progress Ring Indicator */}
                      <div className="absolute top-6 right-6 group-hover:opacity-0">
                        <div className="w-10 h-10 relative">
                          <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 40 40">
                            <circle
                              cx="20"
                              cy="20"
                              r="15"
                              stroke="currentColor"
                              strokeWidth="3"
                              fill="none"
                              className="text-slate-200"
                            />
                            <motion.circle
                              cx="20"
                              cy="20"
                              r="15"
                              stroke="currentColor"
                              strokeWidth="3"
                              fill="none"
                              strokeLinecap="round"
                              className="text-blue-500"
                              initial={{ strokeDasharray: 0, strokeDashoffset: 0 }}
                              whileInView={{ 
                                strokeDasharray: 94.2,
                                strokeDashoffset: 94.2 - (94.2 * set.progress) / 100
                              }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs font-bold text-slate-700">{set.progress}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Create More Sets Button */}
              <motion.div
                variants={fadeInUp}
                className="text-center"
              >
                <Link href="/flashcards">
                  <Button 
                    variant="outline" 
                    className="group px-8 py-4 text-lg rounded-2xl bg-white/60 backdrop-blur-sm border-blue-300 hover:bg-blue-50 hover:border-blue-400 transition-all duration-300 font-semibold"
                  >
                    <span className="flex items-center text-blue-700">
                      <Plus className="w-5 h-5 mr-3 group-hover:rotate-90 transition-transform duration-300" />
                      See All Sets
                      <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </Button>
                </Link>

              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}