"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Flashcard {
  term: string;
  definition: string;
}

export default function NewFlashcardSetPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cards, setCards] = useState<Flashcard[]>([{ term: "", definition: "" }]);
  const [loading, setLoading] = useState(false);

  const handleAddCard = () => {
    setCards([...cards, { term: "", definition: "" }]);
  };

  const handleRemoveCard = (index: number) => {
    setCards(cards.filter((_, i) => i !== index));
  };

  const handleCardChange = (index: number, field: keyof Flashcard, value: string) => {
    const updatedCards = [...cards];
    updatedCards[index][field] = value;
    setCards(updatedCards);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a title.");
      return;
    }

    if (cards.some(c => !c.term.trim() || !c.definition.trim())) {
      alert("Please fill out all cards.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, cards }),
      });

      if (res.ok) {
        const data = await res.json();
        router.push(`/flashcards/${data.id}`);
      } else {
        const error = await res.json();
        alert("Error: " + error.message);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to create flashcard set.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Create New Flashcard Set</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg p-2"
            placeholder="e.g., English Vocabulary"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-lg p-2"
            rows={3}
            placeholder="Optional description..."
          />
        </div>

        {/* Cards */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Cards</h2>

          {cards.map((card, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row gap-2 border p-3 rounded-lg"
            >
              <input
                type="text"
                value={card.term}
                onChange={(e) => handleCardChange(index, "term", e.target.value)}
                className="flex-1 border rounded p-2"
                placeholder="Term"
                required
              />
              <input
                type="text"
                value={card.definition}
                onChange={(e) => handleCardChange(index, "definition", e.target.value)}
                className="flex-1 border rounded p-2"
                placeholder="Definition"
                required
              />
              <Button
                type="button"
                variant="outline"
                className="mt-1 md:mt-0"
                onClick={() => handleRemoveCard(index)}
              >
                Remove
              </Button>
            </div>
          ))}

          <Button type="button" variant="outline" onClick={handleAddCard}>
            + Add Card
          </Button>
        </div>

        {/* Submit */}
        <Button type="submit" disabled={loading} className="mt-4">
          {loading ? "Saving..." : "Save Flashcard Set"}
        </Button>
      </form>
    </div>
  );
}
