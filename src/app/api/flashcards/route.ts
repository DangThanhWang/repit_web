// app/api/flashcards/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { title, description, cards } = await req.json();

  if (!title || !cards || !Array.isArray(cards) || cards.length === 0) {
    return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
  }

  try {
    const flashcardSet = await prisma.flashcardSet.create({
      data: {
        title,
        description,
        userId: session.user.id,
        cardCount: cards.length,
        flashcards: {
          create: cards.map((c: any) => ({
            question: c.term,
            answer: c.definition
          }))
        }
      }
    });

    return NextResponse.json({ id: flashcardSet.id }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error creating flashcard set" }, { status: 500 });
  }
}
