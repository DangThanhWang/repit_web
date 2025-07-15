"use client";

import { Progress } from "@/components/ui/progress";

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
    <div className="bg-white border rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Your Progress</h3>
      <p className="text-sm mb-2">Words Learned: {wordsLearned}</p>
      <p className="text-sm mb-2">Current Streak: {streakDays} days</p>
      <p className="text-sm mb-2">
        Weekly Goal: {weeklyProgress}/{weeklyGoal} words
      </p>
      <Progress value={percentage} className="mt-2" />
    </div>
  );
}
