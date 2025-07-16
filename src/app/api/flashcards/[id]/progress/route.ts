// src/app/api/flashcards/[id]/progress/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

// POST - Update flashcard set progress
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id: setId } = await params;
    const userId = session.user.id;
    const body = await req.json();
    const { learned, lastReviewed } = body;

    // Validate input
    if (typeof learned !== 'number' || learned < 0) {
      return NextResponse.json(
        { error: "Invalid learned count" },
        { status: 400 }
      );
    }

    // Check if the flashcard set exists and belongs to the user
    const flashcardSet = await prisma.flashcardSet.findFirst({
      where: {
        id: setId,
        userId: userId
      },
      include: {
        flashcards: { select: { id: true } }
      }
    });

    if (!flashcardSet) {
      return NextResponse.json(
        { error: "Flashcard set not found" },
        { status: 404 }
      );
    }

    // Ensure learned count doesn't exceed total cards
    const maxLearned = flashcardSet.flashcards.length;
    const validLearnedCount = Math.min(Math.max(0, learned), maxLearned);

    // Update or create progress record
    const progress = await prisma.flashcardProgress.upsert({
      where: {
        userId_setId: {
          userId,
          setId
        }
      },
      update: {
        learned: validLearnedCount,
        lastReviewed: lastReviewed ? new Date(lastReviewed) : new Date()
      },
      create: {
        userId,
        setId,
        learned: validLearnedCount,
        lastReviewed: lastReviewed ? new Date(lastReviewed) : new Date()
      }
    });

    // Update the flashcard set's progress field
    const progressPercentage = maxLearned > 0 ? Math.round((validLearnedCount / maxLearned) * 100) : 0;
    
    await prisma.flashcardSet.update({
      where: { id: setId },
      data: { 
        progress: progressPercentage,
        updatedAt: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      progress: {
        learned: validLearnedCount,
        percentage: progressPercentage,
        lastReviewed: progress.lastReviewed
      }
    });

  } catch (error) {
    console.error("Error updating progress:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET - Get flashcard set progress
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id: setId } = await params;
    const userId = session.user.id;

    // Get progress for the flashcard set
    const progress = await prisma.flashcardProgress.findUnique({
      where: {
        userId_setId: {
          userId,
          setId
        }
      },
      include: {
        set: {
          include: {
            flashcards: { select: { id: true } }
          }
        }
      }
    });

    if (!progress) {
      return NextResponse.json(
        { error: "Progress not found" },
        { status: 404 }
      );
    }

    const totalCards = progress.set.flashcards.length;
    const progressPercentage = totalCards > 0 ? Math.round((progress.learned / totalCards) * 100) : 0;

    return NextResponse.json({
      learned: progress.learned,
      total: totalCards,
      percentage: progressPercentage,
      lastReviewed: progress.lastReviewed
    });

  } catch (error) {
    console.error("Error fetching progress:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}