import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const set = await prisma.flashcardSet.findUnique({
    where: { id: params.id },
    include: { flashcards: true },
  });
  if (!set) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(set);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { title, description, cards } = await req.json();

  await prisma.flashcardSet.update({
    where: { id: params.id },
    data: {
      title,
      description,
      cardCount: cards.length,
      flashcards: {
        deleteMany: {}, // Xóa thẻ cũ
        create: cards.map((c: any) => ({
          question: c.question,
          answer: c.answer,
        })),
      },
    },
  });

  return NextResponse.json({ message: "Updated" });
}
