import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default async function FlashcardsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Danh sách Flashcards</h1>
        <p className="text-slate-600 mb-6">
          Bạn cần đăng nhập để xem các bộ flashcard của mình.
        </p>
        <Link href="/auth/login">
          <Button>Đăng nhập</Button>
        </Link>
      </div>
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      flashcardSets: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  const sets = user?.flashcardSets ?? [];

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Tất cả Flashcards của bạn</h1>
        <Link href="/flashcards/new">
          <Button>
            <BookOpen className="w-4 h-4 mr-2" />
            Tạo bộ mới
          </Button>
        </Link>
      </div>

      {sets.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-slate-600 mb-4">
            Bạn chưa có bộ flashcard nào. Hãy tạo bộ đầu tiên!
          </p>
          <Link href="/flashcards/new">
            <Button>
              <BookOpen className="w-4 h-4 mr-2" />
              Tạo flashcard set
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sets.map((set) => {
            const percentage = set.cardCount === 0
              ? 0
              : Math.round((set.progress / 100) * 100);

            return (
              <Link
                key={set.id}
                href={`/flashcards/${set.id}`}
                className="block border border-slate-200 rounded-xl p-5 hover:shadow transition"
              >
                <h2 className="text-xl font-semibold mb-1">{set.title}</h2>
                {set.description && (
                  <p className="text-slate-600 text-sm mb-3">{set.description}</p>
                )}
                <p className="text-slate-500 text-sm mb-3">
                  {set.cardCount} thẻ
                </p>
                <Progress value={percentage} />
                <div className="mt-2 text-sm text-slate-600">
                  Tiến độ: {percentage}%
                </div>
                <div className="mt-3 flex items-center text-blue-600 font-medium text-sm">
                  Xem chi tiết
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
