"use client";

import { Button } from "@/components/ui/button";

export default function RecommendedContent({
  flashcards,
}: {
  flashcards: { id: string; title: string; cards: number }[];
}) {
  return (
    <div className="bg-white border rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Recommended for You</h3>
      <ul className="space-y-4">
        {flashcards.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center border rounded-xl p-3 hover:bg-slate-50 transition"
          >
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-xs text-slate-500">{item.cards} cards</p>
            </div>
            <Button size="sm">View</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
