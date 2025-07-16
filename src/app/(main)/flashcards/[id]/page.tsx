// src/app/(main)/flashcards/[id]/page.tsx
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import FlashcardSetDetail from "@/components/flashcards/FlashcardSetDetail";
import AnimatedBackground from "@/components/common/AnimatedBackground";

interface FlashcardDetailPageProps {
  params: Promise<{ id: string }>;
}

// Generate metadata dynamically
export async function generateMetadata({ params }: FlashcardDetailPageProps) {
  const { id } = await params;
  
  try {
    const flashcardSet = await prisma.flashcardSet.findUnique({
      where: { id },
      select: { title: true, description: true }
    });

    return {
      title: flashcardSet?.title ? `${flashcardSet.title} - REPIT` : 'Flashcard Set - REPIT',
      description: flashcardSet?.description || 'Study and review your flashcards',
    };
  } catch {
    return {
      title: 'Flashcard Set - REPIT',
      description: 'Study and review your flashcards',
    };
  }
}

export default async function FlashcardDetailPage({ params }: FlashcardDetailPageProps) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    redirect('/auth/login');
  }

  const { id } = await params;
  const userId = session.user.id;

  try {
    // Fetch flashcard set with all flashcards and progress
    const flashcardSet = await prisma.flashcardSet.findFirst({
      where: {
        id,
        userId // Ensure user owns this set
      },
      include: {
        flashcards: {
          orderBy: { createdAt: 'asc' }
        },
        progresses: {
          where: { userId },
          select: { learned: true, lastReviewed: true }
        }
      }
    });

    if (!flashcardSet) {
      notFound();
    }

    // Calculate progress
    const progress = flashcardSet.progresses[0];
    const progressPercentage = flashcardSet.flashcards.length > 0 
      ? Math.round((progress?.learned || 0) / flashcardSet.flashcards.length * 100)
      : 0;

    // Transform data for component
    const setData = {
      id: flashcardSet.id,
      title: flashcardSet.title,
      description: flashcardSet.description,
      flashcards: flashcardSet.flashcards,
      totalCards: flashcardSet.flashcards.length,
      learnedCards: progress?.learned || 0,
      progressPercentage,
      lastReviewed: progress?.lastReviewed,
      createdAt: flashcardSet.createdAt,
      updatedAt: flashcardSet.updatedAt
    };

    return (
      <div className="relative min-h-screen">
        <AnimatedBackground variant="purple" intensity="light" />
        
        <main className="relative z-10 container mx-auto px-6 lg:px-8 py-12">
          <FlashcardSetDetail 
            flashcardSet={setData}
            userName={session.user.name || "Learner"}
          />
        </main>
      </div>
    );

  } catch (error) {
    console.error('Error fetching flashcard set:', error);
    
    return (
      <div className="relative min-h-screen flex items-center justify-center">
        <AnimatedBackground variant="sunset" intensity="light" />
        <div className="relative z-10 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Something went wrong
          </h1>
          <p className="text-gray-600 mb-6">
            We couldn't load this flashcard set. Please try again later.
          </p>
          <a 
            href="/flashcards" 
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Back to Flashcards
          </a>
        </div>
      </div>
    );
  }
}