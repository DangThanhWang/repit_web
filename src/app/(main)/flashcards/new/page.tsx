// src/app/(main)/flashcards/new/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import CreateFlashcardForm from "@/components/flashcards/CreateFlashcardForm";
import AnimatedBackground from "@/components/common/AnimatedBackground";

export const metadata = {
  title: "Create New Flashcard Set - REPIT",
  description: "Create a new flashcard set to enhance your learning experience",
};

export default async function CreateFlashcardPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    redirect('/auth/login');
  }

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground variant="purple" intensity="light" />
      
      <main className="relative z-10 container mx-auto px-6 lg:px-8 py-12">
        <CreateFlashcardForm userId={session.user.id} />
      </main>
    </div>
  );
}