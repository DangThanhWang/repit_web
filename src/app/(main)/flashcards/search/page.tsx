import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

export default async function SearchFlashcards({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q || "";

  let flashcards: {
    id: string;
    title: string;
    description: string | null;
    cardCount: number;
    }[] = [];

  if (query.trim()) {
    flashcards = await prisma.flashcardSet.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      },
      orderBy: { createdAt: "desc" },
      take: 20,
    });
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Tìm kiếm Flashcards</h1>

      <form className="mb-6">
        <input
          name="q"
          defaultValue={query}
          placeholder="Tìm theo tiêu đề hoặc mô tả..."
          className="w-full border rounded p-2"
        />
      </form>

      {!query.trim() && (
        <p className="text-gray-600">Nhập từ khóa để tìm kiếm bộ flashcards.</p>
      )}

      {query.trim() && flashcards.length === 0 && (
        <p className="text-gray-600">Không tìm thấy kết quả nào.</p>
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
              {set.cardCount} thẻ
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
