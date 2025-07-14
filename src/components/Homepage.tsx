"use client";

import HeroSection from "@/components/homepage/HeroSection";
import FeaturesSection from "@/components/homepage/FeaturesSection";
import FeaturedFlashcardSets from "@/components/homepage/FeaturedFlashcardSets";
import LearningProgress from "@/components/homepage/LearningProgress";
import TestimonialsSection from "@/components/homepage/TestimonialsSection";
import { useSession } from "next-auth/react";

export default function Homepage() {
  const { data: session } = useSession();

  return (
    <div className="relative min-h-screen">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-60 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/4 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Featured Flashcard Sets */}
      <FeaturedFlashcardSets />

      {/* Learning Progress (Only show if user is logged in) */}
      {session && (
        <LearningProgress 
          userName={session.user?.name || "Learner"}
          wordsLearned={245}
          currentStreak={7}
          weeklyGoal={50}
          weeklyProgress={35}
        />
      )}

      {/* Testimonials Section */}
      <TestimonialsSection />
    </div>
  );
}