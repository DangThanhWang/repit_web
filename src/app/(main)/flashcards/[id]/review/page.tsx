"use client";

import { use } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

export default function ReviewFlashcard({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Unwrap params
  const { id } = use(params);

  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  // Fetch cards
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/flashcards/${id}`);
      if (res.ok) {
        const data = await res.json();
        setCards(data.flashcards);
      } else {
        alert("Không tìm thấy bộ flashcard.");
        router.push("/dashboard");
      }
      setLoading(false);
    };
    fetchData();
  }, [id, router]);

  const handleNext = () => {
    setShowAnswer(false);
    setIndex((prev) => (prev + 1) % cards.length);
  };

  if (loading) return <div className="p-8">Đang tải dữ liệu...</div>;

  if (cards.length === 0)
    return <div className="p-8">Bộ flashcard này chưa có thẻ nào.</div>;

  const current = cards[index];

  return (
    <div className="max-w-lg mx-auto p-8 text-center">
      <h1 className="text-2xl font-bold mb-6">Ôn tập Flashcards</h1>

      <div className="border rounded-xl p-8 shadow bg-white">
        <p className="text-lg font-semibold mb-4 text-gray-700">Câu hỏi:</p>
        <p className="text-xl font-medium">{current.question}</p>

        {showAnswer && (
          <div className="mt-6 border-t pt-4">
            <p className="text-lg font-semibold mb-2 text-green-700">Đáp án:</p>
            <p className="text-green-700 text-lg">{current.answer}</p>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-center gap-4">
        {!showAnswer && (
          <Button onClick={() => setShowAnswer(true)}>Hiện đáp án</Button>
        )}
        {showAnswer && (
          <Button onClick={handleNext}>Thẻ tiếp theo</Button>
        )}
      </div>

      <p className="mt-4 text-sm text-gray-500">
        Thẻ {index + 1} / {cards.length}
      </p>
    </div>
  );
}
