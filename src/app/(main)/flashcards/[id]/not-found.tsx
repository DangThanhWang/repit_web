// src/app/(main)/flashcards/[id]/not-found.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowLeft, Search, Plus } from "lucide-react";
import AnimatedBackground from "@/components/common/AnimatedBackground";

export default function FlashcardNotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <AnimatedBackground variant="sunset" intensity="light" />
      
      <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
        {/* 404 Animation */}
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="w-32 h-32 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <BookOpen className="w-16 h-16 text-slate-400" />
            </div>
            <div className="absolute -top-2 -right-2 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">!</span>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl lg:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Flashcard Set Not Found
          </span>
        </h1>

        <p className="text-xl text-slate-600/90 mb-8 leading-relaxed">
          The flashcard set you're looking for doesn't exist or you don't have permission to access it.
        </p>

        {/* Possible Reasons */}
        <div className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl p-6 mb-8 text-left">
          <h3 className="font-semibold text-slate-800 mb-4">This could happen if:</h3>
          <ul className="space-y-2 text-slate-600">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              The flashcard set was deleted
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              You don't own this flashcard set
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              The link is incorrect or outdated
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              You're not logged in to the correct account
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/flashcards">
            <Button className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
              <ArrowLeft className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to My Flashcards
            </Button>
          </Link>
          
          <Link href="/flashcards/new">
            <Button variant="outline" className="px-8 py-4 rounded-xl border-slate-300 hover:bg-white hover:border-slate-400 font-semibold transition-all duration-300">
              <Plus className="w-5 h-5 mr-3" />
              Create New Set
            </Button>
          </Link>
        </div>

        {/* Search Alternative */}
        <div className="mt-8 pt-8 border-t border-white/30">
          <p className="text-slate-500 mb-4">Looking for a specific flashcard set?</p>
          <Link href="/flashcards">
            <Button variant="ghost" className="text-slate-600 hover:text-slate-800">
              <Search className="w-4 h-4 mr-2" />
              Search Your Flashcards
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}