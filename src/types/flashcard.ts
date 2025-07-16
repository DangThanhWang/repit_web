// src/types/flashcard.ts
export interface FlashcardSet {
  id: string;
  title: string;
  description?: string | null;
  cardCount: number;
  progress: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  userId: string;
  flashcards?: Flashcard[];
  progresses?: FlashcardProgress[];
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  example?: string | null;
  createdAt: Date | string;
  setId: string;
  set?: FlashcardSet;
}

export interface FlashcardProgress {
  id: string;
  userId: string;
  setId: string;
  learned: number;
  lastReviewed: Date | string;
  user?: User;
  set?: FlashcardSet;
}

export interface User {
  id: string;
  name?: string | null;
  email: string;
  emailVerified?: Date | string | null;
  image?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface FlashcardSetWithStats extends FlashcardSet {
  cards: number;
  learned: number;
  remaining: number;
  progressPercentage: number;
}

export interface UserStats {
  totalSets: number;
  totalCards: number;
  totalLearned: number;
  averageProgress: number;
  currentStreak: number;
  longestStreak: number;
}

export interface CreateFlashcardSetRequest {
  title: string;
  description?: string;
  flashcards: CreateFlashcardRequest[];
}

export interface CreateFlashcardRequest {
  question: string;
  answer: string;
  example?: string;
}

export interface UpdateFlashcardSetRequest {
  title?: string;
  description?: string;
}

export interface StudySession {
  setId: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  cardsStudied: number;
  correctAnswers: number;
  incorrectAnswers: number;
}

export interface FlashcardFilters {
  search?: string;
  sortBy?: 'recent' | 'progress' | 'cards' | 'title';
  page?: number;
  limit?: number;
}

export interface FlashcardListResponse {
  sets: FlashcardSetWithStats[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiError {
  error: string;
  details?: string;
  code?: string;
}

// Component Props types
export interface FlashcardComponentProps {
  flashcard: Flashcard;
  onAnswer: (correct: boolean) => void;
  showAnswer: boolean;
  onToggleAnswer: () => void;
}

export interface FlashcardSetCardProps {
  set: FlashcardSetWithStats;
  onDelete?: (setId: string) => void;
  onUpdate?: (setId: string) => void;
}

export interface StudyModeProps {
  flashcards: Flashcard[];
  onComplete: (session: StudySession) => void;
  mode: 'review' | 'test' | 'practice';
}

// Utility types
export type FlashcardSetSortOption = 'recent' | 'progress' | 'cards' | 'title';
export type StudyMode = 'review' | 'test' | 'practice';
export type FlashcardDifficulty = 'easy' | 'medium' | 'hard';