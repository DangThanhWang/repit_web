import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Progress } from "@/components/ui/progress";

export default async function FlashcardProgressPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return <div className="p-8">Bạn cần đăng nhập để xem tiến độ.</div>;
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  const set = await prisma.flashcardSet.findUnique({
    where: { id: params.id },
  });

  if (!set) {
    return <div className="p-8">Không tìm thấy bộ flashcard.</div>;
  }

  const progress = await prisma.flashcardProgress.findUnique({
    where: {
      userId_setId: {
        userId: user!.id,
        setId: set.id,
      },
    },
  });

  const learned = progress?.learned || 0;
  const total = set.cardCount || 0;
  const percentage = total === 0 ? 0 : Math.round((learned / total) * 100);

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Tiến độ học tập</h1>
      <h2 className="text-xl font-semibold mb-2">{set.title}</h2>

      <div className="my-6">
        <Progress value={percentage} className="h-4" />
        <p className="mt-2 text-gray-700">
          Đã học: {learned}/{total} thẻ ({percentage}%)
        </p>
      </div>

      <p className="text-sm text-gray-500">
        Lần học gần nhất:{" "}
        {progress?.lastReviewed.toLocaleDateString("vi-VN") ||
          "Chưa có thông tin"}
      </p>
    </div>
  );
}
