"use client";

import { motion, easeOut } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Target, Flame, BookOpen, Calendar, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedBackground from "../common/AnimatedBackground";

export default function LearningProgressCard({
  wordsLearned,
  streakDays,
  weeklyGoal,
  weeklyProgress,
}: {
  wordsLearned: number;
  streakDays: number;
  weeklyGoal: number;
  weeklyProgress: number;
}) {
  const percentage = Math.min((weeklyProgress / weeklyGoal) * 100, 100);

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
    <section className="relative py-20 overflow-hidden rounded-3xl">
      {/* Animated Background */}
      {/* <AnimatedBackground variant="gradient" intensity="normal" /> */}
      
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
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Your Learning Progress
              </span>
            </h2>
            <p className="text-xl text-slate-600/90 max-w-3xl mx-auto leading-relaxed">
              Track your achievements and stay motivated on your journey
            </p>
          </motion.div>

          {/* Progress Stats Grid */}
          <motion.div 
            variants={fadeInUp}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            {/* Words Learned */}
            <div className="group bg-white/60 backdrop-blur-sm border border-white/40 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <motion.div
                  className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                >
                  <BookOpen className="w-7 h-7 text-white" />
                </motion.div>
                <TrendingUp className="w-6 h-6 text-emerald-500" />
              </div>
              <div className="space-y-2">
                <p className="text-slate-600 font-medium">Words Learned</p>
                <p className="text-4xl font-bold text-slate-800">{wordsLearned}</p>
                <p className="text-sm text-slate-500">+12 this week</p>
              </div>
            </div>

            {/* Current Streak */}
            <div className="group bg-white/60 backdrop-blur-sm border border-white/40 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <motion.div
                  className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <Flame className="w-7 h-7 text-white" />
                </motion.div>
                <Award className="w-6 h-6 text-amber-500" />
              </div>
              <div className="space-y-2">
                <p className="text-slate-600 font-medium">Current Streak</p>
                <p className="text-4xl font-bold text-slate-800">{streakDays} days</p>
                <p className="text-sm text-slate-500">Keep it going!</p>
              </div>
            </div>

            {/* Weekly Goal */}
            <div className="group bg-white/60 backdrop-blur-sm border border-white/40 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <motion.div
                  className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                >
                  <Target className="w-7 h-7 text-white" />
                </motion.div>
                <Calendar className="w-6 h-6 text-purple-500" />
              </div>
              <div className="space-y-2">
                <p className="text-slate-600 font-medium">Weekly Goal</p>
                <p className="text-4xl font-bold text-slate-800">{weeklyProgress}/{weeklyGoal}</p>
                <p className="text-sm text-slate-500">{Math.round(percentage)}% complete</p>
              </div>
            </div>
          </motion.div>

          {/* Weekly Progress Section */}
          <motion.div 
            variants={fadeInUp}
            className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-3xl p-8 shadow-xl"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-slate-800">This Week's Progress</h3>
                <span className="text-sm font-medium text-slate-600">
                  {weeklyGoal - weeklyProgress} words to go
                </span>
              </div>
              
              <div className="relative">
                <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: easeOut }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-slate-500">0</span>
                  <span className="text-sm text-slate-500">{weeklyGoal} words</span>
                </div>
              </div>

              {/* Motivational Message */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-indigo-600" />
                  <p className="text-sm font-medium text-slate-700">
                    {percentage >= 100 
                      ? "🎉 Congratulations! You've reached your weekly goal!" 
                      : percentage >= 70 
                      ? "Great job! You're almost there!" 
                      : "Keep going! Every word counts!"
                    }
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 group">
                  Continue Learning
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 border-slate-300 hover:bg-slate-50 font-semibold py-3 rounded-xl transition-all duration-300"
                >
                  Review Progress
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}