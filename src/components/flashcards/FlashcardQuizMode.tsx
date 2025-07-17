"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence, easeOut } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Timer, 
  Trophy, 
  Target, 
  Zap,
  CheckCircle,
  XCircle,
  Clock,
  BarChart3,
  RefreshCw,
  Award,
  TrendingUp,
  Users,
  Play,
  Pause,
  SkipForward
} from "lucide-react";

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  example?: string | null;
}

interface QuizQuestion {
  id: string;
  question: string;
  correctAnswer: string;
  options: string[];
  explanation?: string;
}

interface FlashcardQuizModeProps {
  flashcardSet: {
    id: string;
    title: string;
    flashcards: Flashcard[];
    currentProgress: number;
  };
  userId: string;
}

interface QuizResult {
  questionId: string;
  question: string;
  correctAnswer: string;
  userAnswer: string;
  isCorrect: boolean;
  timeSpent: number;
}

export default function FlashcardQuizMode({ flashcardSet, userId }: FlashcardQuizModeProps) {
  const router = useRouter();
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds per question
  const [isPaused, setIsPaused] = useState(false);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [totalScore, setTotalScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);

  // Generate quiz questions with multiple choice options
  const generateQuizQuestions = () => {
    const shuffledCards = [...flashcardSet.flashcards].sort(() => Math.random() - 0.5);
    const questions: QuizQuestion[] = [];

    shuffledCards.forEach(card => {
      // Get 3 wrong answers from other cards
      const otherCards = flashcardSet.flashcards.filter(c => c.id !== card.id);
      const wrongAnswers = otherCards
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(c => c.answer);

      // Create options array with correct answer
      const options = [card.answer, ...wrongAnswers].sort(() => Math.random() - 0.5);

      questions.push({
        id: card.id,
        question: card.question,
        correctAnswer: card.answer,
        options,
        explanation: card.example || undefined
      });
    });

    return questions;
  };

  // Initialize quiz
  useEffect(() => {
    const questions = generateQuizQuestions();
    setQuizQuestions(questions);
  }, []);

  // Timer effect
  useEffect(() => {
    if (quizStarted && !isPaused && !showResult && !isCompleted && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleAnswer("");
    }
  }, [timeLeft, isPaused, showResult, isCompleted, quizStarted]);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

  const handleAnswer = (answer: string) => {
    if (showResult) return;

    const timeSpent = Math.round((Date.now() - questionStartTime) / 1000);
    const isCorrect = answer === currentQuestion.correctAnswer;
    
    const result: QuizResult = {
      questionId: currentQuestion.id,
      question: currentQuestion.question,
      correctAnswer: currentQuestion.correctAnswer,
      userAnswer: answer || "No answer",
      isCorrect,
      timeSpent
    };

    setQuizResults(prev => [...prev, result]);
    setSelectedAnswer(answer);
    setShowResult(true);

    if (isCorrect) {
      setTotalScore(prev => prev + (timeLeft > 0 ? Math.max(1, Math.floor(timeLeft / 3)) : 1));
    }

    // Auto advance after 2 seconds
    setTimeout(() => {
      nextQuestion();
    }, 2000);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer("");
      setShowResult(false);
      setTimeLeft(30);
      setQuestionStartTime(Date.now());
    } else {
      setIsCompleted(true);
    }
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setQuestionStartTime(Date.now());
  };

  const resetQuiz = () => {
    const questions = generateQuizQuestions();
    setQuizQuestions(questions);
    setCurrentQuestionIndex(0);
    setSelectedAnswer("");
    setShowResult(false);
    setTimeLeft(30);
    setQuizResults([]);
    setIsCompleted(false);
    setTotalScore(0);
    setQuizStarted(false);
    setIsPaused(false);
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return "text-emerald-600";
    if (percentage >= 70) return "text-blue-600";
    if (percentage >= 50) return "text-amber-600";
    return "text-red-600";
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: easeOut }
  };

  // Pre-quiz start screen
  if (!quizStarted) {
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
              className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg"
            >
              <Zap className="w-12 h-12 text-white" />
            </motion.div>

            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Quiz Challenge
              </span>
            </h1>

            <h2 className="text-2xl font-semibold text-slate-800 mb-6">
              {flashcardSet.title}
            </h2>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 rounded-2xl p-6">
                <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-700">{quizQuestions.length}</p>
                <p className="text-sm text-blue-600">Questions</p>
              </div>
              
              <div className="bg-orange-50 rounded-2xl p-6">
                <Timer className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-orange-700">30s</p>
                <p className="text-sm text-orange-600">Per Question</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Quiz Rules:</h3>
              <ul className="text-left text-slate-700 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>30 seconds per question</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Multiple choice format</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Faster answers = higher scores</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Questions are randomized</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={`/flashcards/${flashcardSet.id}`} className="flex-1">
                <Button
                  variant="outline"
                  className="w-full py-3 rounded-xl font-semibold"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Set
                </Button>
              </Link>
              
              <Button
                onClick={startQuiz}
                className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-3 rounded-xl font-semibold"
              >
                <Play className="w-4 h-4 mr-2" />
                Start Quiz
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Quiz completed screen
  if (isCompleted) {
    const correctAnswers = quizResults.filter(r => r.isCorrect).length;
    const accuracy = Math.round((correctAnswers / quizResults.length) * 100);
    const averageTime = Math.round(quizResults.reduce((sum, r) => sum + r.timeSpent, 0) / quizResults.length);

    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="max-w-4xl w-full"
        >
          <div className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-3xl p-8 lg:p-12 shadow-2xl">
            <div className="text-center mb-8">
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
                className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg"
              >
                <Trophy className="w-12 h-12 text-white" />
              </motion.div>

              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  Quiz Complete!
                </span>
              </h1>

              <p className="text-xl text-slate-600 mb-6">
                Great job on completing the quiz!
              </p>
            </div>

            {/* Results Summary */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-blue-50 rounded-2xl p-6 text-center">
                <BarChart3 className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <p className="text-2xl font-bold text-blue-700">{totalScore}</p>
                <p className="text-sm text-blue-600">Total Score</p>
              </div>
              
              <div className={`bg-emerald-50 rounded-2xl p-6 text-center`}>
                <Target className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
                <p className={`text-2xl font-bold ${getScoreColor(accuracy)}`}>{accuracy}%</p>
                <p className="text-sm text-emerald-600">Accuracy</p>
              </div>
              
              <div className="bg-purple-50 rounded-2xl p-6 text-center">
                <CheckCircle className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <p className="text-2xl font-bold text-purple-700">{correctAnswers}/{quizResults.length}</p>
                <p className="text-sm text-purple-600">Correct</p>
              </div>
              
              <div className="bg-orange-50 rounded-2xl p-6 text-center">
                <Clock className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                <p className="text-2xl font-bold text-orange-700">{averageTime}s</p>
                <p className="text-sm text-orange-600">Avg Time</p>
              </div>
            </div>

            {/* Detailed Results */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Question Review</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {quizResults.map((result, index) => (
                  <div
                    key={result.questionId}
                    className={`p-4 rounded-xl border ${
                      result.isCorrect 
                        ? "bg-emerald-50 border-emerald-200" 
                        : "bg-red-50 border-red-200"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-slate-800 mb-1">
                          {index + 1}. {result.question}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <span className="text-slate-600">
                            <strong>Your answer:</strong> {result.userAnswer}
                          </span>
                          <span className="text-slate-600">
                            <strong>Correct:</strong> {result.correctAnswer}
                          </span>
                          <span className="text-slate-600">
                            <strong>Time:</strong> {result.timeSpent}s
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        {result.isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={resetQuiz}
                variant="outline"
                className="flex-1 py-3 rounded-xl font-semibold"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Take Quiz Again
              </Button>
              
              <Link href={`/flashcards/${flashcardSet.id}`} className="flex-1">
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-3 rounded-xl font-semibold"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Flashcard Set
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Main quiz interface
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
            <div className="flex items-center gap-4">
              <Link 
                href={`/flashcards/${flashcardSet.id}`}
                className="text-slate-600 hover:text-slate-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              
              <div>
                <h1 className="text-lg font-bold text-slate-800 truncate max-w-xs">
                  Quiz: {flashcardSet.title}
                </h1>
                <p className="text-sm text-slate-600">
                  Question {currentQuestionIndex + 1} of {quizQuestions.length}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className={`text-2xl font-bold ${timeLeft <= 10 ? 'text-red-600' : 'text-blue-600'}`}>
                  {timeLeft}s
                </div>
                <div className="text-xs text-slate-600">Time Left</div>
              </div>
              
              <div className="text-center">
                <div className="text-xl font-bold text-emerald-600">{totalScore}</div>
                <div className="text-xs text-slate-600">Score</div>
              </div>

              <Button
                onClick={() => setIsPaused(!isPaused)}
                variant="outline"
                size="sm"
                className="px-3 py-2"
              >
                {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5, ease: easeOut }}
              />
            </div>
          </div>

          {/* Timer Bar */}
          <div className="mt-2">
            <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${timeLeft <= 10 ? 'bg-red-500' : 'bg-orange-500'}`}
                animate={{ width: `${(timeLeft / 30) * 100}%` }}
                transition={{ duration: 1, ease: "linear" }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Question Area */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-3xl p-8 lg:p-12 shadow-2xl">
                {/* Question */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-6">
                    <Zap className="w-4 h-4 text-blue-600" />
                    <span className="text-blue-700 font-semibold text-sm">
                      Question {currentQuestionIndex + 1}
                    </span>
                  </div>
                  
                  <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-4">
                    {currentQuestion?.question}
                  </h2>
                </div>

                {/* Options */}
                <div className="grid gap-4 mb-8">
                  {currentQuestion?.options.map((option, index) => (
                    <motion.button
                      key={index}
                      onClick={() => !showResult && handleAnswer(option)}
                      disabled={showResult}
                      whileHover={{ scale: showResult ? 1 : 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-6 rounded-xl border-2 text-left transition-all duration-300 font-medium text-lg ${
                        showResult
                          ? option === currentQuestion.correctAnswer
                            ? "bg-emerald-100 border-emerald-500 text-emerald-800"
                            : option === selectedAnswer && option !== currentQuestion.correctAnswer
                            ? "bg-red-100 border-red-500 text-red-800"
                            : "bg-slate-100 border-slate-300 text-slate-600"
                          : selectedAnswer === option
                          ? "bg-blue-100 border-blue-500 text-blue-800"
                          : "bg-white/50 border-slate-300 text-slate-700 hover:bg-white hover:border-blue-300"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold ${
                          showResult
                            ? option === currentQuestion.correctAnswer
                              ? "border-emerald-500 bg-emerald-500 text-white"
                              : option === selectedAnswer && option !== currentQuestion.correctAnswer
                              ? "border-red-500 bg-red-500 text-white"
                              : "border-slate-400 text-slate-600"
                            : selectedAnswer === option
                            ? "border-blue-500 bg-blue-500 text-white"
                            : "border-slate-400 text-slate-600"
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span>{option}</span>
                        {showResult && option === currentQuestion.correctAnswer && (
                          <CheckCircle className="w-5 h-5 text-emerald-600 ml-auto" />
                        )}
                        {showResult && option === selectedAnswer && option !== currentQuestion.correctAnswer && (
                          <XCircle className="w-5 h-5 text-red-600 ml-auto" />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Skip button */}
                {!showResult && (
                  <div className="text-center">
                    <Button
                      onClick={() => handleAnswer("")}
                      variant="outline"
                      className="px-6 py-3 rounded-xl font-semibold"
                    >
                      <SkipForward className="w-4 h-4 mr-2" />
                      Skip Question
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}