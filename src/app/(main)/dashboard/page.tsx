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
      <div className="min-h-screen flex items-center justify-center relative">
        <AnimatedBackground variant="default" intensity="heavy" />
        <div className="relative z-10 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">Please sign in to view your dashboard.</p>
        </div>
      </div>
    );
  }

  const userId = session.user.id;

  // Lấy Flashcard Sets
  const flashcardSets = await prisma.flashcardSet.findMany({
    where: { userId },
    include: {
      flashcards: true,
    },
  });

  // Tính tổng số thẻ đã học từ FlashcardProgress
  const progress = await prisma.flashcardProgress.findMany({
    where: { userId },
  });

  const totalLearned = progress.reduce((sum, p) => sum + p.learned, 0);

  // Lấy Classes user đã join
  const memberships = await prisma.membership.findMany({
    where: { userId },
    include: {
      course: true,
    },
  });

  // Tạo dữ liệu cho JoinedClasses
  const joinedClasses = Array.from(
    new Map(
      memberships.map((m) => [
        m.course.id,
        {
          id: m.course.id,
          name: m.course.name,
          members: 0,
        },
      ])
    ).values()
  );

  // Recommended content: ví dụ lấy 2 bộ thẻ gần đây nhất
  const recommended = await prisma.flashcardSet.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* Animated Background */}
      <AnimatedBackground variant="default" intensity="normal" />
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-8 py-12 space-y-12">
        {/* Welcome Banner */}
        <WelcomeBanner userName={session.user.name || "Learner"} />

        {/* Stats Overview Grid */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Learning Progress - Takes up 2 columns */}
          <div className="lg:col-span-2">
            <LearningProgressCard
              wordsLearned={totalLearned}
              streakDays={7} // You can implement streak logic
              weeklyGoal={50}
              weeklyProgress={Math.min(totalLearned, 50)}
            />
          </div>

          {/* Quick Stats */}
          <div className="space-y-8">
            <JoinedClasses classes={joinedClasses} />
          </div>

          <div className="space-y-8">
            <RecommendedContent
              flashcards={recommended.map((set) => ({
                id: set.id,
                title: set.title,
                cards: set.cardCount,
              }))}
            />
          </div>
        </div>

        {/* My Flashcard Sets - Full Width */}
        <div className="w-full">
          <MyFlashcardSets
            sets={flashcardSets.map((set) => ({
              id: set.id,
              title: set.title,
              cards: set.flashcards.length,
              progress: set.progress,
            }))}
          />
        </div>
      </div>
    </main>
  );
}