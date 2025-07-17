"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, easeOut } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  PlayCircle, 
  Pencil, 
  Share2, 
  Trash2, 
  BookOpen,
  Target,
  Calendar,
  TrendingUp,
  Award,
  Eye,
  EyeOff,
  RotateCcw,
  MoreVertical,
  Download,
  Copy,
  Settings,
  BarChart3,
  Clock,
  Sparkles
} from "lucide-react";

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  example?: string | null;
  createdAt: Date;
}

interface FlashcardSetDetailProps {
  flashcardSet: {
    id: string;
    title: string;
    description?: string | null;
    flashcards: Flashcard[];
    totalCards: number;
    learnedCards: number;
    progressPercentage: number;
    lastReviewed?: Date | null;
    createdAt: Date;
    updatedAt: Date;
  };
  userName: string;
}

export default function FlashcardSetDetail({ flashcardSet, userName }: FlashcardSetDetailProps) {
  const [showAnswers, setShowAnswers] = useState<Record<string, boolean>>({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const toggleAnswer = (cardId: string) => {
    setShowAnswers(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/flashcards/${flashcardSet.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        window.location.href = "/flashcards";
      } else {
        alert("Failed to delete flashcard set. Please try again.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

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

  const cardVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.4, ease: easeOut }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={staggerContainer}
      className="space-y-12"
    >
      {/* Navigation */}
      <motion.div variants={fadeInUp}>
        <Link 
          href="/flashcards" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Flashcards
        </Link>
      </motion.div>

      {/* Header Section */}
      <motion.div variants={fadeInUp} className="relative">
        <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 rounded-3xl overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-3xl"></div>
          </div>

          <div className="relative p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              {/* Title and Description */}
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                    className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30"
                  >
                    <BookOpen className="w-6 h-6 text-white" />
                  </motion.div>
                  <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                    <span className="text-white/90 text-sm font-medium flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      {flashcardSet.totalCards} Cards
                    </span>
                  </div>
                </div>

                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                  {flashcardSet.title}
                </h1>
                
                {flashcardSet.description && (
                  <p className="text-xl text-white/80 max-w-2xl leading-relaxed">
                    {flashcardSet.description}
                  </p>
                )}

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-6 mt-6 text-white/70">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Created {new Date(flashcardSet.createdAt).toISOString().split("T")[0]}
                  </span>
                  {flashcardSet.lastReviewed && (
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Last studied {new Date(flashcardSet.lastReviewed).toISOString().split("T")[0]}
                    </span>
                  )}
                </div>
              </div>

              {/* Progress Ring */}
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-white/20"
                    />
                    <motion.circle
                      cx="60"
                      cy="60"
                      r="50"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      className="text-white"
                      initial={{ strokeDasharray: 0, strokeDashoffset: 0 }}
                      animate={{ 
                        strokeDasharray: 314,
                        strokeDashoffset: 314 - (314 * flashcardSet.progressPercentage) / 100
                      }}
                      transition={{ duration: 1.5, ease: easeOut }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <span className="text-2xl font-bold">{flashcardSet.progressPercentage}%</span>
                    <span className="text-sm opacity-80">Complete</span>
                  </div>
                </div>
                <p className="text-white/80 text-sm mt-3 text-center">
                  {flashcardSet.learnedCards} of {flashcardSet.totalCards} cards learned
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats and Actions */}
      <motion.div variants={fadeInUp} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stats Cards */}
        <div className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mx-auto mb-3">
            <Target className="w-6 h-6 text-white" />
          </div>
          <p className="text-2xl font-bold text-slate-800 text-center">{flashcardSet.totalCards}</p>
          <p className="text-sm text-slate-600 text-center">Total Cards</p>
        </div>
        
        <div className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl mx-auto mb-3">
            <Award className="w-6 h-6 text-white" />
          </div>
          <p className="text-2xl font-bold text-slate-800 text-center">{flashcardSet.learnedCards}</p>
          <p className="text-sm text-slate-600 text-center">Learned</p>
        </div>
        
        <div className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl mx-auto mb-3">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <p className="text-2xl font-bold text-slate-800 text-center">{flashcardSet.totalCards - flashcardSet.learnedCards}</p>
          <p className="text-sm text-slate-600 text-center">Remaining</p>
        </div>
        
        <div className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl mx-auto mb-3">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <p className="text-2xl font-bold text-slate-800 text-center">{flashcardSet.progressPercentage}%</p>
          <p className="text-sm text-slate-600 text-center">Progress</p>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 justify-center">
        <Link href={`/flashcards/${flashcardSet.id}/study`}>
          <Button className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
            <PlayCircle className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
            Start Studying
          </Button>
        </Link>

        <Link href={`/flashcards/${flashcardSet.id}/study`}>
          <Button className="group bg-gradient-to-br from-amber-500 to-amber-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
            <PlayCircle className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
            Start Quiz
          </Button>
        </Link>
        
        <Link href={`/flashcards/${flashcardSet.id}/edit`}>
          <Button variant="outline" className="px-6 py-3 rounded-xl border-slate-300 hover:bg-slate-50 font-semibold transition-all duration-300">
            <Pencil className="w-4 h-4 mr-2" />
            Edit Set
          </Button>
        </Link>
        
        <Button variant="outline" className="px-6 py-3 rounded-xl border-slate-300 hover:bg-slate-50 font-semibold transition-all duration-300">
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
        
        <Button 
          variant="outline" 
          onClick={() => setShowDeleteConfirm(true)}
          className="px-6 py-3 rounded-xl border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 font-semibold transition-all duration-300"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </Button>
      </motion.div>

      {/* Flashcards Grid */}
      <motion.div variants={fadeInUp}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-slate-800">
            All Flashcards ({flashcardSet.flashcards.length})
          </h2>
          <Button
            variant="outline"
            onClick={() => setShowAnswers({})}
            className="px-4 py-2 rounded-lg"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset View
          </Button>
        </div>

        {flashcardSet.flashcards.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No flashcards yet</h3>
            <p className="text-slate-500 mb-6">Add some flashcards to get started!</p>
            <Link href={`/flashcards/${flashcardSet.id}/edit`}>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                Add Flashcards
              </Button>
            </Link>
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {flashcardSet.flashcards.map((card, index) => (
              <motion.div
                key={card.id}
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <div className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-slate-500">
                      Card {index + 1}
                    </span>
                    <button
                      onClick={() => toggleAnswer(card.id)}
                      className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      {showAnswers[card.id] ? (
                        <EyeOff className="w-4 h-4 text-slate-500" />
                      ) : (
                        <Eye className="w-4 h-4 text-slate-500" />
                      )}
                    </button>
                  </div>

                  {/* Question */}
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Question:</h3>
                    <p className="text-slate-700 leading-relaxed">{card.question}</p>
                  </div>

                  {/* Answer (toggleable) */}
                  <motion.div
                    initial={false}
                    animate={{ 
                      height: showAnswers[card.id] ? "auto" : 0,
                      opacity: showAnswers[card.id] ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-slate-200 pt-4">
                      <h4 className="text-sm font-semibold text-slate-600 mb-2">Answer:</h4>
                      <p className="text-slate-700 leading-relaxed">{card.answer}</p>
                      
                      {card.example && (
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                          <h5 className="text-xs font-semibold text-blue-700 mb-1">Example:</h5>
                          <p className="text-sm text-blue-600 italic">{card.example}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl"
          >
            <h3 className="text-xl font-bold text-slate-800 mb-4">Delete Flashcard Set?</h3>
            <p className="text-slate-600 mb-6">
              Are you sure you want to delete "{flashcardSet.title}"? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1"
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}