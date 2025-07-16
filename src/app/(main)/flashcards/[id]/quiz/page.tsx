"use client";

import { use } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

export default function QuizFlashcard({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/flashcards/${id}`);
      if (res.ok) {
        const data = await res.json();
        const shuffled = [...data.flashcards].sort(() => Math.random() - 0.5);
        setCards(shuffled);
      } else {
        alert("Không tìm thấy bộ flashcard.");
        router.push("/dashboard");
      }
      setLoading(false);
    };
    fetchData();
  }, [id, router]);

  const handleAnswer = (value: string) => {
    setSelected(value);
    setShowResult(true);
    if (value === cards[index].answer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelected(null);
    setShowResult(false);
    setIndex((prev) => (prev + 1) % cards.length);
  };

  if (loading) return <div className="p-8">Đang tải dữ liệu...</div>;
  if (cards.length === 0) return <div className="p-8">Không có thẻ nào.</div>;

  const current = cards[index];
  const options = [
    current.answer,
    ...cards
      .filter((c) => c.id !== current.id)
      .slice(0, 3)
      .map((c) => c.answer),
  ].sort(() => Math.random() - 0.5);

  return (
    <div className="max-w-xl mx-auto p-8 text-center">
      <h1 className="text-2xl font-bold mb-6">Quiz Flashcards</h1>

      <div className="border rounded-xl p-6 shadow bg-white">
        <p className="text-lg font-semibold mb-4 text-gray-700">
          {current.question}
        </p>

        <div className="grid gap-3">
          {options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(opt)}
              disabled={showResult}
              className={`border rounded p-2 text-left ${
                showResult && opt === current.answer
                  ? "border-green-500 bg-green-50"
                  : showResult && selected === opt && opt !== current.answer
                  ? "border-red-500 bg-red-50"
                  : "hover:bg-gray-50"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {showResult && (
          <div className="mt-4 flex justify-center gap-2">
            {selected === current.answer ? (
              <p className="text-green-600 font-medium flex items-center gap-1">
                <Check className="w-4 h-4" />
                Chính xác!
              </p>
            ) : (
              <p className="text-red-600 font-medium flex items-center gap-1">
                <X className="w-4 h-4" />
                Sai. Đáp án đúng: {current.answer}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="mt-6">
        {showResult && (
          <Button onClick={handleNext}>Thẻ tiếp theo</Button>
        )}
      </div>

      <p className="mt-4 text-sm text-gray-500">
        Thẻ {index + 1}/{cards.length} · Điểm: {score}
      </p>
    </div>
  );
}
