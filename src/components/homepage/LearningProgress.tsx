"use client";

import { motion, easeOut } from "framer-motion";
import { 
  TrendingUp, 
  Target, 
  Award, 
  Calendar,
  Flame,
  BookMarked
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface LearningProgressProps {
  userName?: string;
  wordsLearned?: number;
  currentStreak?: number;
  weeklyGoal?: number;
  weeklyProgress?: number;
}

const LearningProgress = ({ 
  userName = "John",
  wordsLearned = 245,
  currentStreak = 7,
  weeklyGoal = 50,
  weeklyProgress = 35
}: LearningProgressProps) => {
  const progressPercentage = (weeklyProgress / weeklyGoal) * 100;

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
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
    <section className="relative py-24 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50">
      <div className="container mx-auto px-8 lg:px-12">
        <motion.div
          className="max-w-6xl mx-auto"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {/* Welcome Message */}
          <motion.div 
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Hello, {userName}!
              </span>
            </h2>
            <p className="text-xl text-slate-600/90">
              Keep up the great work on your English learning journey
            </p>
          </motion.div>

          {/* Progress Stats Grid */}
          <motion.div 
            variants={fadeInUp}
            className="grid md:grid-cols-3 gap-8 mb-12"
          >
            {/* Words Learned */}
            <div className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <BookMarked className="w-7 h-7 text-white" />
                </div>
                <TrendingUp className="w-6 h-6 text-emerald-500" />
              </div>
              <div className="space-y-2">
                <p className="text-slate-600 font-medium">Words Learned</p>
                <p className="text-4xl font-bold text-slate-800">{wordsLearned}</p>
                <p className="text-sm text-slate-500">+12 this week</p>
              </div>
            </div>

            {/* Current Streak */}
            <div className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Flame className="w-7 h-7 text-white" />
                </div>
                <Award className="w-6 h-6 text-amber-500" />
              </div>
              <div className="space-y-2">
                <p className="text-slate-600 font-medium">Current Streak</p>
                <p className="text-4xl font-bold text-slate-800">{currentStreak} days</p>
                <p className="text-sm text-slate-500">Keep it going!</p>
              </div>
            </div>

            {/* Weekly Goal */}
            <div className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <Calendar className="w-6 h-6 text-purple-500" />
              </div>
              <div className="space-y-2">
                <p className="text-slate-600 font-medium">Weekly Goal</p>
                <p className="text-4xl font-bold text-slate-800">{weeklyProgress}/{weeklyGoal}</p>
                <p className="text-sm text-slate-500">{Math.round(progressPercentage)}% complete</p>
              </div>
            </div>
          </motion.div>

          {/* Weekly Progress Bar */}
          <motion.div 
            variants={fadeInUp}
            className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-3xl p-8 shadow-lg"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-800">This Week's Progress</h3>
                <span className="text-sm font-medium text-slate-600">
                  {weeklyGoal - weeklyProgress} words to go
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="relative">
                <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${progressPercentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: easeOut, delay: 0.5 }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-slate-500">0</span>
                  <span className="text-sm text-slate-500">{weeklyGoal} words</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl transition-all duration-300">
                  Continue Learning
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
};

export default LearningProgress;