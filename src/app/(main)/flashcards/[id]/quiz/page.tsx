// src/app/(main)/flashcards/[id]/quiz/page.tsx
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import FlashcardQuizMode from "@/components/flashcards/FlashcardQuizMode";
import AnimatedBackground from "@/components/common/AnimatedBackground";

interface QuizPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: QuizPageProps) {
  const { id } = await params;
  
  try {
    const flashcardSet = await prisma.flashcardSet.findUnique({
      where: { id },
      select: { title: true }
    });

    return {
      title: flashcardSet?.title ? `Quiz: ${flashcardSet.title} - REPIT` : 'Quiz Mode - REPIT',
      description: 'Test your knowledge with an interactive quiz',
    };
  } catch {
    return {
      title: 'Quiz Mode - REPIT',
      description: 'Test your knowledge with an interactive quiz',
    };
  }
}

export default async function QuizPage({ params }: QuizPageProps) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    redirect('/auth/login');
  }

  const { id } = await params;
  const userId = session.user.id;

  try {
    // Fetch flashcard set with flashcards
    const flashcardSet = await prisma.flashcardSet.findFirst({
      where: {
        id,
        userId
      },
      include: {
        flashcards: {
          orderBy: { createdAt: 'asc' }
        },
        progresses: {
          where: { userId },
          select: { learned: true }
        }
      }
    });

    if (!flashcardSet) {
      notFound();
    }

    if (flashcardSet.flashcards.length === 0) {
      redirect(`/flashcards/${id}`);
    }

    // We need at least 2 cards for a meaningful quiz
    if (flashcardSet.flashcards.length < 2) {
      redirect(`/flashcards/${id}/study`);
    }

    const progress = flashcardSet.progresses[0];

    return (
      <div className="relative min-h-screen">
        <AnimatedBackground variant="cool" intensity="normal" />
        
        <main className="relative z-10">
          <FlashcardQuizMode
            flashcardSet={{
              id: flashcardSet.id,
              title: flashcardSet.title,
              flashcards: flashcardSet.flashcards,
              currentProgress: progress?.learned || 0
            }}
            userId={userId}
          />
        </main>
      </div>
    );

  } catch (error) {
    console.error('Error fetching flashcard set for quiz:', error);
    redirect('/flashcards');
  }
}