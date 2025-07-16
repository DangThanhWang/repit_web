// src/app/api/flashcards/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

// POST - Create a new flashcard set
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const body = await req.json();
    const { title, description, flashcards } = body;

    // Validation
    if (!title || title.trim().length === 0) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    if (!flashcards || !Array.isArray(flashcards) || flashcards.length === 0) {
      return NextResponse.json(
        { error: "At least one flashcard is required" },
        { status: 400 }
      );
    }

    // Validate flashcards
    for (const card of flashcards) {
      if (!card.question || !card.answer || 
          card.question.trim().length === 0 || 
          card.answer.trim().length === 0) {
        return NextResponse.json(
          { error: "Each flashcard must have both question and answer" },
          { status: 400 }
        );
      }
    }

    // Create the flashcard set with flashcards in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create the flashcard set
      const newSet = await tx.flashcardSet.create({
        data: {
          title: title.trim(),
          description: description?.trim() || null,
          cardCount: flashcards.length,
          userId: userId,
          flashcards: {
            create: flashcards.map((card: any) => ({
              question: card.question.trim(),
              answer: card.answer.trim(),
              example: card.example?.trim() || null
            }))
          }
        },
        include: {
          flashcards: true
        }
      });

      // Create initial progress record
      await tx.flashcardProgress.create({
        data: {
          userId: userId,
          setId: newSet.id,
          learned: 0
        }
      });

      return newSet;
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error creating flashcard set:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET - Fetch all flashcard sets for the user
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search");
    const sortBy = searchParams.get("sortBy") || "recent";

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = { userId };
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } }
      ];
    }

    // Build orderBy clause
    let orderBy: any = { updatedAt: "desc" };
    switch (sortBy) {
      case "progress":
        orderBy = { progress: "desc" };
        break;
      case "cards":
        orderBy = { cardCount: "desc" };
        break;
      case "title":
        orderBy = { title: "asc" };
        break;
      default:
        orderBy = { updatedAt: "desc" };
    }

    const [flashcardSets, total] = await Promise.all([
      prisma.flashcardSet.findMany({
        where,
        include: {
          flashcards: {
            select: { id: true }
          },
          progresses: {
            where: { userId },
            select: { learned: true }
          }
        },
        orderBy,
        skip,
        take: limit
      }),
      prisma.flashcardSet.count({ where })
    ]);

    // Transform data
    const sets = flashcardSets.map((set) => ({
      id: set.id,
      title: set.title,
      description: set.description,
      cards: set.flashcards.length,
      progress: set.flashcards.length > 0 
        ? Math.round((set.progresses[0]?.learned || 0) / set.flashcards.length * 100)
        : 0,
      createdAt: set.createdAt,
      updatedAt: set.updatedAt
    }));

    return NextResponse.json({
      sets,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching flashcard sets:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}