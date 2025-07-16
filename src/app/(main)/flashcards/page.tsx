import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ArrowRight, BookOpen } from "lucide-react";

export default async function FlashcardsListPage() {
  const flashcards = await prisma.flashcardSet.findMany({
    orderBy: { createdAt: "desc" },
    take: 20, // Lấy 20 bộ gần nhất
    include: {
      user: true,
    },
  });

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Tất cả bộ Flashcards</h1>

      {flashcards.length === 0 && (
        <p className="text-gray-600">Chưa có bộ flashcards nào.</p>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {flashcards.map((set) => (
          <div
            key={set.id}
            className="border rounded-xl p-4 shadow-sm hover:shadow transition"
          >
            <h2 className="text-xl font-semibold mb-1">{set.title}</h2>
            {set.description && (
              <p className="text-gray-600 mb-2">{set.description}</p>
            )}
            <p className="text-sm text-gray-500 mb-4">
              {set.cardCount} thẻ · Tạo bởi {set.user?.name || "Người dùng"}
            </p>
            <div className="flex gap-2">
              <Link href={`/flashcards/${set.id}`}>
                <button className="inline-flex items-center gap-1 text-blue-600 hover:underline text-sm">
                  <BookOpen className="w-4 h-4" />
                  Xem chi tiết
                </button>
              </Link>
              <Link href={`/flashcards/${set.id}/review`}>
                <button className="inline-flex items-center gap-1 text-green-600 hover:underline text-sm">
                  Bắt đầu ôn tập
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
