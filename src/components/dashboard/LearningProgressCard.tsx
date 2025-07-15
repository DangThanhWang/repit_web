"use client";

import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Target, Flame, BookOpen, Calendar, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 h-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Learning Progress</h3>
          <p className="text-slate-600">Track your daily achievements</p>
        </div>
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg"
        >
          <TrendingUp className="w-7 h-7 text-white" />
        </motion.div>
      </div>

      {/* Progress Stats Grid */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Words Learned */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100"
        >
          <motion.div
            animate={{ y: [-2, 2, -2] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3"
          >
            <BookOpen className="w-5 h-5 text-white" />
          </motion.div>
          <p className="text-2xl font-bold text-slate-800">{wordsLearned}</p>
          <p className="text-sm text-slate-600">Words Learned</p>
        </motion.div>

        {/* Streak */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border border-orange-100"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-3"
          >
            <Flame className="w-5 h-5 text-white" />
          </motion.div>
          <p className="text-2xl font-bold text-slate-800">{streakDays}</p>
          <p className="text-sm text-slate-600">Day Streak</p>
        </motion.div>

        {/* Weekly Goal */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-center p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-3"
          >
            <Target className="w-5 h-5 text-white" />
          </motion.div>
          <p className="text-2xl font-bold text-slate-800">{Math.round(percentage)}%</p>
          <p className="text-sm text-slate-600">Weekly Goal</p>
        </motion.div>
      </div>

      {/* Weekly Progress Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-bold text-slate-800">This Week's Progress</h4>
          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <Calendar className="w-4 h-4" />
            <span>{weeklyGoal - weeklyProgress} words to go</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm font-medium text-slate-700">
            <span>{weeklyProgress} words</span>
            <span>{weeklyGoal} words</span>
          </div>
          
          <div className="relative">
            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full shadow-lg"
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </div>
            
            {/* Progress Indicator */}
            <motion.div
              className="absolute top-0 w-4 h-4 bg-white border-2 border-indigo-500 rounded-full shadow-lg"
              initial={{ left: 0 }}
              animate={{ left: `calc(${percentage}% - 8px)` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Motivational Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100"
        >
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
        </motion.div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl transition-all duration-300">
            Practice Now
          </Button>
          <Button 
            variant="outline" 
            className="px-6 py-3 rounded-xl border-slate-300 hover:bg-slate-50 font-semibold transition-all duration-300"
          >
            View Details
          </Button>
        </div>
      </div>
    </motion.div>
  );
}