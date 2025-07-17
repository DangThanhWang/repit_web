"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence, easeOut } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  Check, 
  X, 
  Eye, 
  EyeOff,
  Trophy,
  Target,
  BookOpen,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Home,
  BarChart3
} from "lucide-react";

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  example?: string | null;
}

interface FlashcardStudyModeProps {
  flashcardSet: {
    id: string;
    title: string;
    flashcards: Flashcard[];
    currentProgress: number;
  };
  userId: string;
}

export default function FlashcardStudyMode({ flashcardSet, userId }: FlashcardStudyModeProps) {
  const router = useRouter();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [studiedCards, setStudiedCards] = useState<Set<string>>(new Set());
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentCard = flashcardSet.flashcards[currentCardIndex];
  const totalCards = flashcardSet.flashcards.length;
  const progressPercentage = ((currentCardIndex + 1) / totalCards) * 100;

  const nextCard = () => {
    if (currentCardIndex < totalCards - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowAnswer(false);
    } else {
      setIsCompleted(true);
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setShowAnswer(false);
    }
  };

  const handleAnswer = (isCorrect: boolean) => {
    const cardId = currentCard.id;
    
    if (!studiedCards.has(cardId)) {
      if (isCorrect) {
        setCorrectAnswers(prev => prev + 1);
      } else {
        setIncorrectAnswers(prev => prev + 1);
      }
      setStudiedCards(prev => new Set([...prev, cardId]));
    }

    // Auto advance after answering
    setTimeout(() => {
      nextCard();
    }, 1000);
  };

  const handleFinishStudy = async () => {
    setIsSubmitting(true);
    
    try {
      // Update progress in database
      const newLearnedCount = flashcardSet.currentProgress + correctAnswers;
      
      await fetch(`/api/flashcards/${flashcardSet.id}/progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          learned: Math.min(newLearnedCount, totalCards),
          lastReviewed: new Date().toISOString()
        }),
      });

      router.push(`/flashcards/${flashcardSet.id}`);
    } catch (error) {
      console.error('Error updating progress:', error);
      router.push(`/flashcards/${flashcardSet.id}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: easeOut }
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="max-w-2xl w-full"
        >
          <div className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-3xl p-8 lg:p-12 shadow-2xl text-center">
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 3, 
                ease: "easeInOut" 
              }}
              className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg"
            >
              <Trophy className="w-12 h-12 text-white" />
            </motion.div>

            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                Study Complete!
              </span>
            </h1>

            <p className="text-xl text-slate-600 mb-8">
              Great job studying "{flashcardSet.title}"
            </p>

            {/* Results */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-emerald-50 rounded-2xl p-6">
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-emerald-700">{correctAnswers}</p>
                <p className="text-sm text-emerald-600">Correct</p>
              </div>
              
              <div className="bg-red-50 rounded-2xl p-6">
                <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <X className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-red-700">{incorrectAnswers}</p>
                <p className="text-sm text-red-600">Incorrect</p>
              </div>
            </div>

            {/* Accuracy */}
            <div className="bg-blue-50 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Accuracy</h3>
              <p className="text-3xl font-bold text-blue-700">
                {totalCards > 0 ? Math.round((correctAnswers / totalCards) * 100) : 0}%
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => {
                  setCurrentCardIndex(0);
                  setShowAnswer(false);
                  setCorrectAnswers(0);
                  setIncorrectAnswers(0);
                  setStudiedCards(new Set());
                  setIsCompleted(false);
                }}
                variant="outline"
                className="flex-1 py-3 rounded-xl font-semibold"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Study Again
              </Button>
              
              <Button
                onClick={handleFinishStudy}
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-xl font-semibold"
              >
                {isSubmitting ? "Saving..." : "Finish & Save Progress"}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/60 backdrop-blur-sm border-b border-white/40 shadow-lg"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href={`/flashcards/${flashcardSet.id}`}
              className="flex items-center text-slate-600 hover:text-slate-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="font-medium">Back to Set</span>
            </Link>

            <div className="text-center">
              <h1 className="text-lg font-bold text-slate-800 truncate max-w-xs">
                {flashcardSet.title}
              </h1>
              <p className="text-sm text-slate-600">
                {currentCardIndex + 1} of {totalCards}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right text-sm">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-emerald-600">
                    <Check className="w-4 h-4" />
                    {correctAnswers}
                  </span>
                  <span className="flex items-center gap-1 text-red-600">
                    <X className="w-4 h-4" />
                    {incorrectAnswers}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5, ease: easeOut }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Study Area */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCardIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-3xl p-8 lg:p-12 shadow-2xl ">
                {/* Card Number */}
                <div className="flex items-center justify-between mb-8">
                  <div className="px-4 py-2 bg-blue-100 rounded-full">
                    <span className="text-blue-700 font-semibold text-sm">
                      Card {currentCardIndex + 1}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => setShowAnswer(!showAnswer)}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
                  >
                    {showAnswer ? (
                      <>
                        <EyeOff className="w-4 h-4" />
                        <span className="text-sm font-medium">Hide Answer</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4" />
                        <span className="text-sm font-medium">Show Answer</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Question */}
                <div className="mb-8">
                  <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-4">
                    Question:
                  </h2>
                  <p className="text-xl lg:text-2xl text-slate-700 leading-relaxed">
                    {currentCard.question}
                  </p>
                </div>

                {/* Answer Section */}
                <AnimatePresence>
                  {showAnswer && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-slate-200 pt-8"
                    >
                      <h3 className="text-xl font-bold text-slate-800 mb-4">Answer:</h3>
                      <p className="text-lg text-slate-700 leading-relaxed mb-4">
                        {currentCard.answer}
                      </p>
                      
                      {currentCard.example && (
                        <div className="bg-blue-50 rounded-2xl p-6">
                          <h4 className="text-sm font-semibold text-blue-700 mb-2">Example:</h4>
                          <p className="text-blue-600 italic">{currentCard.example}</p>
                        </div>
                      )}

                      {/* Answer Buttons */}
                      <div className="flex gap-4 mt-8">
                        <Button
                          onClick={() => handleAnswer(false)}
                          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl font-semibold text-lg"
                        >
                          <X className="w-5 h-5 mr-2" />
                          Incorrect
                        </Button>
                        <Button
                          onClick={() => handleAnswer(true)}
                          className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-xl font-semibold text-lg"
                        >
                          <Check className="w-5 h-5 mr-2" />
                          Correct
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <Button
              onClick={prevCard}
              disabled={currentCardIndex === 0}
              variant="outline"
              className="px-6 py-3 rounded-xl font-semibold"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <div className="flex gap-2">
              {flashcardSet.flashcards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentCardIndex(index);
                    setShowAnswer(false);
                  }}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentCardIndex
                      ? 'bg-blue-500'
                      : index < currentCardIndex
                      ? 'bg-emerald-500'
                      : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={nextCard}
              variant="outline"
              className="px-6 py-3 rounded-xl font-semibold"
            >
              {currentCardIndex === totalCards - 1 ? 'Finish' : 'Next'}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}