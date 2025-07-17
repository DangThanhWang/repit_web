// src/app/(main)/flashcards/[id]/edit/page.tsx
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import EditFlashcardForm from "@/components/flashcards/EditFlashcardForm";
import AnimatedBackground from "@/components/common/AnimatedBackground";

interface EditFlashcardPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: EditFlashcardPageProps) {
  const { id } = await params;
  
  try {
    const flashcardSet = await prisma.flashcardSet.findUnique({
      where: { id },
      select: { title: true }
    });

    return {
      title: flashcardSet?.title ? `Edit: ${flashcardSet.title} - REPIT` : 'Edit Flashcard Set - REPIT',
      description: 'Edit your flashcard set and update cards',
    };
  } catch {
    return {
      title: 'Edit Flashcard Set - REPIT',
      description: 'Edit your flashcard set and update cards',
    };
  }
}

export default async function EditFlashcardPage({ params }: EditFlashcardPageProps) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    redirect('/auth/login');
  }

  const { id } = await params;
  const userId = session.user.id;

  try {
    // Fetch flashcard set with all flashcards
    const flashcardSet = await prisma.flashcardSet.findFirst({
      where: {
        id,
        userId // Ensure user owns this set
      },
      include: {
        flashcards: {
          orderBy: { createdAt: 'asc' }
        }
      }
    });

    if (!flashcardSet) {
      notFound();
    }

    // Transform data for form
    const formData = {
      id: flashcardSet.id,
      title: flashcardSet.title,
      description: flashcardSet.description || "",
      flashcards: flashcardSet.flashcards.map(card => ({
        id: card.id,
        question: card.question,
        answer: card.answer,
        example: card.example || ""
      }))
    };

    return (
      <div className="relative min-h-screen">
        <AnimatedBackground variant="warm" intensity="light" />
        
        <main className="relative z-10 container mx-auto px-6 lg:px-8 py-12">
          <EditFlashcardForm
            flashcardSet={formData}
            userId={userId}
          />
        </main>
      </div>
    );

  } catch (error) {
    console.error('Error fetching flashcard set for editing:', error);
    
    return (
      <div className="relative min-h-screen flex items-center justify-center">
        <AnimatedBackground variant="sunset" intensity="light" />
        <div className="relative z-10 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Something went wrong
          </h1>
          <p className="text-gray-600 mb-6">
            We couldn't load this flashcard set for editing. Please try again later.
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