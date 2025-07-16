import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function FlashcardDetailPage({ params }: { params: { id: string } }) {
  const flashcardSet = await prisma.flashcardSet.findUnique({
    where: { id: params.id },
    include: { flashcards: true },
  });

  if (!flashcardSet) return notFound();

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{flashcardSet.title}</h1>
      {flashcardSet.description && (
        <p className="text-slate-600 mb-6">{flashcardSet.description}</p>
      )}

      <div className="grid gap-4">
        {flashcardSet.flashcards.map(card => (
          <div key={card.id} className="border p-4 rounded-lg">
            <p className="font-semibold">Q: {card.question}</p>
            <p className="text-slate-700">A: {card.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
