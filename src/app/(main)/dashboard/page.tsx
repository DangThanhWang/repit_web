import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth"; // file cấu hình next-auth
import WelcomeBanner from "@/components/dashboard/WelcomeBanner";
import LearningProgressCard from "@/components/dashboard/LearningProgressCard";
import MyFlashcardSets from "@/components/dashboard/MyFlashcardSets";
import JoinedClasses from "@/components/dashboard/JoinedClasses";
import RecommendedContent from "@/components/dashboard/RecommendedContent";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    // Redirect hoặc trả về component yêu cầu đăng nhập
    return <div className="p-8">Please sign in to view your dashboard.</div>;
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
    take: 2,
  });

  return (
    <main className="container mx-auto px-4 py-8 space-y-8">
      <WelcomeBanner userName={session.user.name || "Learner"} />

      <div className="grid md:grid-cols-3 gap-6">
        <LearningProgressCard
          wordsLearned={totalLearned}
          streakDays={3} // tuỳ bạn có logic streak riêng
          weeklyGoal={50}
          weeklyProgress={15}
        />

        <JoinedClasses
          classes={joinedClasses}
        />

        <RecommendedContent
          flashcards={recommended.map((set) => ({
            id: set.id,
            title: set.title,
            cards: set.cardCount,
          }))}
        />
      </div>

      <MyFlashcardSets
        sets={flashcardSets.map((set) => ({
          id: set.id,
          title: set.title,
          cards: set.flashcards.length,
          progress: set.progress,
        }))}
      />
    </main>
  );
}
