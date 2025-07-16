// src/app/(main)/flashcards/[id]/study/page.tsx
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import FlashcardStudyMode from "@/components/flashcards/FlashcardStudyMode";
import AnimatedBackground from "@/components/common/AnimatedBackground";

interface StudyPageProps {
  params: Promise<{ id: string }>;
}

export default async function StudyPage({ params }: StudyPageProps) {
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

    const progress = flashcardSet.progresses[0];

    return (
      <div className="relative min-h-screen">
        <AnimatedBackground variant="gradient" intensity="normal" />
        
        <main className="relative z-10">
          <FlashcardStudyMode
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
    console.error('Error fetching flashcard set for study:', error);
    redirect('/flashcards');
  }
}

export async function generateMetadata({ params }: StudyPageProps) {
  const { id } = await params;
  
  try {
    const flashcardSet = await prisma.flashcardSet.findUnique({
      where: { id },
      select: { title: true }
    });

    return {
      title: flashcardSet?.title ? `Study: ${flashcardSet.title} - REPIT` : 'Study Mode - REPIT',
      description: 'Study your flashcards and improve your knowledge',
    };
  } catch {
    return {
      title: 'Study Mode - REPIT',
      description: 'Study your flashcards and improve your knowledge',
    };
  }
}