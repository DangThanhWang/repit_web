"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, easeOut } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Plus, 
  Trash2, 
  ArrowLeft, 
  Save, 
  BookOpen,
  AlertCircle,
  Loader2,
  FileText,
  GripVertical,
  Eye,
  RotateCcw
} from "lucide-react";

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  example?: string;
  isNew?: boolean; // Track if this is a new card
}

interface EditFlashcardFormProps {
  flashcardSet: {
    id: string;
    title: string;
    description: string;
    flashcards: Flashcard[];
  };
  userId: string;
}

export default function EditFlashcardForm({ flashcardSet, userId }: EditFlashcardFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(flashcardSet.title);
  const [description, setDescription] = useState(flashcardSet.description);
  const [flashcards, setFlashcards] = useState<Flashcard[]>(flashcardSet.flashcards);
  const [deletedCards, setDeletedCards] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const addFlashcard = () => {
    const newCard: Flashcard = {
      id: `new-${Date.now()}`,
      question: "",
      answer: "",
      example: "",
      isNew: true
    };
    setFlashcards([...flashcards, newCard]);
    setHasChanges(true);
  };

  const removeFlashcard = (id: string) => {
    const cardToRemove = flashcards.find(card => card.id === id);
    
    if (cardToRemove && !cardToRemove.isNew) {
      // Mark existing card for deletion
      setDeletedCards(prev => [...prev, id]);
    }
    
    // Remove from current list
    setFlashcards(flashcards.filter(card => card.id !== id));
    setHasChanges(true);
  };

  const updateFlashcard = (id: string, field: keyof Flashcard, value: string) => {
    setFlashcards(flashcards.map(card => 
      card.id === id ? { ...card, [field]: value } : card
    ));
    setHasChanges(true);
    
    // Clear errors when user starts typing
    if (errors[`${id}-${field}`]) {
      setErrors(prev => ({ ...prev, [`${id}-${field}`]: "" }));
    }
  };

  const resetForm = () => {
    setTitle(flashcardSet.title);
    setDescription(flashcardSet.description);
    setFlashcards(flashcardSet.flashcards);
    setDeletedCards([]);
    setErrors({});
    setHasChanges(false);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    const validCards = flashcards.filter(card => 
      card.question.trim() && card.answer.trim()
    );

    if (validCards.length === 0) {
      newErrors.general = "At least one flashcard with question and answer is required";
    }

    flashcards.forEach(card => {
      if (card.question.trim() && !card.answer.trim()) {
        newErrors[`${card.id}-answer`] = "Answer is required when question is provided";
      }
      if (!card.question.trim() && card.answer.trim()) {
        newErrors[`${card.id}-question`] = "Question is required when answer is provided";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Filter out empty cards
      const validCards = flashcards.filter(card => 
        card.question.trim() && card.answer.trim()
      );

      // Separate new and existing cards
      const newCards = validCards.filter(card => card.isNew).map(card => ({
        question: card.question.trim(),
        answer: card.answer.trim(),
        example: card.example?.trim() || null
      }));

      const updatedCards = validCards.filter(card => !card.isNew).map(card => ({
        id: card.id,
        question: card.question.trim(),
        answer: card.answer.trim(),
        example: card.example?.trim() || null
      }));

      const response = await fetch(`/api/flashcards/${flashcardSet.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() || null,
          newCards,
          updatedCards,
          deletedCards
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update flashcard set");
      }

      router.push(`/flashcards/${flashcardSet.id}`);
    } catch (error: any) {
      setErrors({ general: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: easeOut }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={staggerContainer}
      className="max-w-4xl mx-auto space-y-8"
    >
      {/* Header */}
      <motion.div variants={fadeInUp} className="text-center">
        <Link 
          href={`/flashcards/${flashcardSet.id}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Flashcard Set
        </Link>
        
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Edit Flashcard Set
          </span>
        </h1>
        <p className="text-xl text-slate-600/90 max-w-2xl mx-auto">
          Update your flashcard set and modify individual cards
        </p>

        {/* Changes indicator */}
        {hasChanges && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 border border-amber-300 rounded-full mt-4"
          >
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <span className="text-amber-700 text-sm font-medium">You have unsaved changes</span>
          </motion.div>
        )}
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Set Details */}
        <motion.div variants={fadeInUp}>
          <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                Set Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setHasChanges(true);
                    if (errors.title) setErrors(prev => ({ ...prev, title: "" }));
                  }}
                  placeholder="Enter flashcard set title"
                  className={`w-full px-4 py-3 bg-white/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-200 ${
                    errors.title ? "border-red-300" : "border-slate-200"
                  }`}
                />
                {errors.title && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.title}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setHasChanges(true);
                  }}
                  placeholder="Describe what this flashcard set covers"
                  rows={3}
                  className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-200 resize-none"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Flashcards */}
        <motion.div variants={fadeInUp}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              Flashcards ({flashcards.length})
            </h2>
            <div className="flex gap-3">
              <Button
                type="button"
                onClick={resetForm}
                variant="outline"
                className="border-slate-300 text-slate-700 hover:bg-slate-50"
                disabled={!hasChanges}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Changes
              </Button>
              <Button
                type="button"
                onClick={addFlashcard}
                variant="outline"
                className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Card
              </Button>
            </div>
          </div>

          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {errors.general}
            </div>
          )}

          <div className="space-y-4">
            {flashcards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={card.isNew ? "ring-2 ring-emerald-300 rounded-2xl" : ""}
              >
                <Card className={`bg-white/60 backdrop-blur-sm border-white/40 shadow-lg ${
                  deletedCards.includes(card.id) ? "opacity-50 grayscale" : ""
                }`}>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <GripVertical className="w-4 h-4 text-slate-400" />
                        <span>Card {index + 1}</span>
                        {card.isNew && (
                          <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full font-medium">
                            New
                          </span>
                        )}
                      </CardTitle>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFlashcard(card.id)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Question *
                        </label>
                        <textarea
                          value={card.question}
                          onChange={(e) => updateFlashcard(card.id, "question", e.target.value)}
                          placeholder="Enter the question or term"
                          rows={3}
                          className={`w-full px-4 py-3 bg-white/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-200 resize-none ${
                            errors[`${card.id}-question`] ? "border-red-300" : "border-slate-200"
                          }`}
                        />
                        {errors[`${card.id}-question`] && (
                          <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors[`${card.id}-question`]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Answer *
                        </label>
                        <textarea
                          value={card.answer}
                          onChange={(e) => updateFlashcard(card.id, "answer", e.target.value)}
                          placeholder="Enter the answer or definition"
                          rows={3}
                          className={`w-full px-4 py-3 bg-white/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-200 resize-none ${
                            errors[`${card.id}-answer`] ? "border-red-300" : "border-slate-200"
                          }`}
                        />
                        {errors[`${card.id}-answer`] && (
                          <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors[`${card.id}-answer`]}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Example (Optional)
                      </label>
                      <input
                        type="text"
                        value={card.example || ""}
                        onChange={(e) => updateFlashcard(card.id, "example", e.target.value)}
                        placeholder="Add an example sentence or usage"
                        className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-200"
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div variants={fadeInUp} className="flex gap-4 justify-end pt-6">
          <Link href={`/flashcards/${flashcardSet.id}`}>
            <Button variant="outline" className="px-6">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={isSubmitting || !hasChanges}
            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving Changes...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
}