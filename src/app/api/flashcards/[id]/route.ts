// src/app/api/flashcards/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

// GET - Fetch a specific flashcard set
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

    const flashcardSet = await prisma.flashcardSet.findFirst({
      where: {
        id: setId,
        userId: userId // Ensure user owns this set
      },
      include: {
        flashcards: true,
        progresses: {
          where: { userId }
        }
      }
    });

    if (!flashcardSet) {
      return NextResponse.json(
        { error: "Flashcard set not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(flashcardSet);
  } catch (error) {
    console.error("Error fetching flashcard set:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a flashcard set
export async function DELETE(
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

    // Check if the flashcard set exists and belongs to the user
    const existingSet = await prisma.flashcardSet.findFirst({
      where: {
        id: setId,
        userId: userId
      }
    });

    if (!existingSet) {
      return NextResponse.json(
        { error: "Flashcard set not found or you don't have permission to delete it" },
        { status: 404 }
      );
    }

    // Delete the flashcard set (this will cascade delete flashcards and progress)
    await prisma.flashcardSet.delete({
      where: {
        id: setId
      }
    });

    return NextResponse.json(
      { message: "Flashcard set deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting flashcard set:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update a flashcard set
export async function PUT(
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

    const { title, description } = body;

    if (!title || title.trim().length === 0) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    // Check if the flashcard set exists and belongs to the user
    const existingSet = await prisma.flashcardSet.findFirst({
      where: {
        id: setId,
        userId: userId
      }
    });

    if (!existingSet) {
      return NextResponse.json(
        { error: "Flashcard set not found or you don't have permission to update it" },
        { status: 404 }
      );
    }

    // Update the flashcard set
    const updatedSet = await prisma.flashcardSet.update({
      where: {
        id: setId
      },
      data: {
        title: title.trim(),
        description: description?.trim() || null,
        updatedAt: new Date()
      },
      include: {
        flashcards: true
      }
    });

    return NextResponse.json(updatedSet);
  } catch (error) {
    console.error("Error updating flashcard set:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}