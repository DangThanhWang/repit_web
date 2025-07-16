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
  const flashcardSets = await prisma.flashcardSet.findMany({ where: { userId }, include: { flashcards: true } });
  const progress = await prisma.flashcardProgress.findMany({ where: { userId } });
  const totalLearned = progress.reduce((sum, p) => sum + p.learned, 0);
  const memberships = await prisma.membership.findMany({ where: { userId }, include: { course: true } });
  const joinedClasses = Array.from(
    new Map(
      memberships.map((m) => [
        m.course.id,
        { id: m.course.id, name: m.course.name, members: 0 },
      ])
    ).values()
  );
  const recommended = await prisma.flashcardSet.findMany({ orderBy: { createdAt: "desc" }, take: 3 });

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
        <MyFlashcardSets sets={flashcardSets.map((set) => ({
          id: set.id,
          title: set.title,
          cards: set.flashcards.length,
          progress: set.progress,
        }))} />
        <JoinedClasses classes={joinedClasses} />
        <RecommendedContent flashcards={recommended.map((set) => ({
          id: set.id,
          title: set.title,
          cards: set.cardCount,
        }))} />
      </main>
    </div>
  );
}
