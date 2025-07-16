"use client";

import { use } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

interface Flashcard {
  id?: string;
  question: string;
  answer: string;
}

export default function EditFlashcardSet({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Unwrap params
  const { id } = use(params);

  const router = useRouter();
  const { data: session } = useSession();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cards, setCards] = useState<Flashcard[]>([]);

  // Fetch existing data
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/flashcards/${id}`);
      if (res.ok) {
        const data = await res.json();
        setTitle(data.title);
        setDescription(data.description || "");
        setCards(data.flashcards);
      } else {
        alert("Không tìm thấy bộ flashcard.");
        router.push("/dashboard");
      }
      setLoading(false);
    };
    fetchData();
  }, [id, router]);

  const handleAddCard = () => {
    setCards([...cards, { question: "", answer: "" }]);
  };

  const handleRemoveCard = (index: number) => {
    setCards(cards.filter((_, i) => i !== index));
  };

  const handleCardChange = (
    index: number,
    field: keyof Flashcard,
    value: string
  ) => {
    const updated = [...cards];
    updated[index][field] = value;
    setCards(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Vui lòng nhập tiêu đề.");
      return;
    }

    if (cards.some((c) => !c.question.trim() || !c.answer.trim())) {
      alert("Tất cả thẻ phải đầy đủ thông tin.");
      return;
    }

    setSaving(true);

    const res = await fetch(`/api/flashcards/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, cards }),
    });

    if (res.ok) {
      router.push(`/flashcards/${id}`);
    } else {
      alert("Lỗi lưu dữ liệu.");
    }

    setSaving(false);
  };

  if (loading) return <div className="p-8">Đang tải dữ liệu...</div>;

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Chỉnh sửa bộ Flashcard</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Tiêu đề *</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Mô tả</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded p-2"
            rows={2}
          />
        </div>

        {/* Cards */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Danh sách thẻ</h2>
          {cards.map((card, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row gap-2 border p-3 rounded"
            >
              <input
                value={card.question}
                onChange={(e) =>
                  handleCardChange(i, "question", e.target.value)
                }
                placeholder="Mặt trước"
                className="flex-1 border rounded p-2"
                required
              />
              <input
                value={card.answer}
                onChange={(e) =>
                  handleCardChange(i, "answer", e.target.value)
                }
                placeholder="Mặt sau"
                className="flex-1 border rounded p-2"
                required
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => handleRemoveCard(i)}
              >
                Xóa
              </Button>
            </div>
          ))}

          <Button type="button" variant="outline" onClick={handleAddCard}>
            + Thêm thẻ
          </Button>
        </div>

        {/* Submit */}
        <Button type="submit" disabled={saving}>
          {saving ? "Đang lưu..." : "Lưu thay đổi"}
        </Button>
      </form>
    </div>
  );
}
