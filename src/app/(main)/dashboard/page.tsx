// src/app/(main)/dashboard/page.tsx - Thay thế toàn bộ file
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import WelcomeBanner from "@/components/dashboard/WelcomeBanner";
import LearningProgressCard from "@/components/dashboard/LearningProgressCard";
import MyFlashcardSets from "@/components/dashboard/MyFlashcardSets";
import JoinedClasses from "@/components/dashboard/JoinedClasses";
import RecommendedContent from "@/components/dashboard/RecommendedContent";
import AnimatedBackground from "@/components/common/AnimatedBackground";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <div className="relative min-h-screen flex items-center justify-center">
        <AnimatedBackground variant="sunset" intensity="heavy" />
        <div className="relative z-10 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">Please sign in to view your dashboard.</p>
        </div>
      </div>
    );
  }

  const userId = session.user.id;

  // ✅ SINGLE OPTIMIZED QUERY - No N+1, no duplicates
  const [userFlashcardSets, userMemberships, recommendedSets] = await Promise.all([
    prisma.flashcardSet.findMany({
      where: { userId },
      include: {
        flashcards: {
          select: { id: true }
        },
        progresses: {
          where: { userId },
          select: { learned: true }
        }
      },
      orderBy: { updatedAt: "desc" },
      take: 10
    }),
    prisma.membership.findMany({
      where: { userId },
      include: {
        course: {
          select: { id: true, name: true }
        }
      },
      take: 10
    }),
    prisma.flashcardSet.findMany({
      where: { NOT: { userId } }, // Exclude user's own sets
      select: { id: true, title: true, cardCount: true },
      orderBy: { createdAt: "desc" },
      take: 3
    })
  ]);

  // ✅ Transform data efficiently
  const flashcardSetsForComponent = userFlashcardSets.map((set) => ({
    id: set.id,
    title: set.title,
    cards: set.flashcards.length,
    progress: set.progress,
  }));

  const totalLearned = userFlashcardSets.reduce((sum, set) => 
    sum + (set.progresses[0]?.learned || 0), 0
  );

  const joinedClasses = userMemberships.map((membership) => ({
    id: membership.course.id,
    name: membership.course.name,
    members: 0, // You can add this later if needed
  }));

  const recommendedFlashcards = recommendedSets.map((set) => ({
    id: set.id,
    title: set.title,
    cards: set.cardCount,
  }));

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground variant="blue" intensity="heavy" />
      <main className="relative z-10 container mx-auto px-6 lg:px-8 py-12 space-y-16">
        <WelcomeBanner userName={session.user.name || "Learner"} />
        <LearningProgressCard
          wordsLearned={totalLearned}
          streakDays={7}
          weeklyGoal={50}
          weeklyProgress={Math.min(totalLearned, 50)}
        />
        <MyFlashcardSets sets={flashcardSetsForComponent} />
        <JoinedClasses classes={joinedClasses} />
        <RecommendedContent flashcards={recommendedFlashcards} />
      </main>
    </div>
  );
}