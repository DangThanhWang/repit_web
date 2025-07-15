"use client";

import { Button } from "@/components/ui/button";

export default function MyFlashcardSets({
  sets,
}: {
  sets: { id: string; title: string; cards: number; progress: number }[];
}) {
  return (
    <div className="bg-white border rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">My Flashcard Sets</h3>
        <Button size="sm">Create New</Button>
      </div>
      <ul className="space-y-4">
        {sets.map((set) => (
          <li
            key={set.id}
            className="border rounded-xl p-4 hover:bg-slate-50 transition"
          >
            <div className="flex justify-between">
              <div>
                <p className="font-medium">{set.title}</p>
                <p className="text-sm text-slate-500">
                  {set.cards} cards • {set.progress}% complete
                </p>
              </div>
              <Button size="sm" variant="outline">
                Review
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
