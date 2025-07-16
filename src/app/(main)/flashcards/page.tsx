// src/app/(main)/flashcards/page.tsx
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import FlashcardList from "@/components/flashcards/FlashcardList";
import AnimatedBackground from "@/components/common/AnimatedBackground";

export const metadata = {
  title: "My Flashcards - REPIT",
  description: "Manage your flashcard collections and track learning progress",
};

export default async function FlashcardsPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    redirect('/auth/login');
  }

  const userId = session.user.id;

  try {
    // Fetch user's flashcard sets with stats
    const flashcardSets = await prisma.flashcardSet.findMany({
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
      orderBy: { updatedAt: "desc" }
    });

    // Transform data for component
    const sets = flashcardSets.map((set) => ({
      id: set.id,
      title: set.title,
      description: set.description,
      cards: set.flashcards.length,
      progress: set.flashcards.length > 0 
        ? Math.round((set.progresses[0]?.learned || 0) / set.flashcards.length * 100)
        : 0,
      createdAt: set.createdAt,
      updatedAt: set.updatedAt
    }));

    // Get user stats
    const totalCards = sets.reduce((sum, set) => sum + set.cards, 0);
    const totalLearned = sets.reduce((sum, set) => sum + Math.round(set.cards * set.progress / 100), 0);
    const averageProgress = sets.length > 0 
      ? Math.round(sets.reduce((sum, set) => sum + set.progress, 0) / sets.length)
      : 0;

    const userStats = {
      totalSets: sets.length,
      totalCards,
      totalLearned,
      averageProgress
    };

    return (
      <div className="relative min-h-screen">
        <AnimatedBackground variant="blue" intensity="light" />
        
        <main className="relative z-10 container mx-auto px-6 lg:px-8 py-12">
          <FlashcardList 
            sets={sets} 
            userStats={userStats}
            userName={session.user.name || "Learner"}
          />
        </main>
      </div>
    );

  } catch (error) {
    console.error('Error fetching flashcard sets:', error);
    
    return (
      <div className="relative min-h-screen flex items-center justify-center">
        <AnimatedBackground variant="sunset" intensity="light" />
        <div className="relative z-10 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Something went wrong
          </h1>
          <p className="text-gray-600 mb-6">
            We couldn't load your flashcard sets. Please try again later.
          </p>
          <a 
            href="/flashcards" 
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Retry
          </a>
        </div>
      </div>
    );
  }
}