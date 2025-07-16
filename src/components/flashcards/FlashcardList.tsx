"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, easeOut } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  BookOpen, 
  BarChart3, 
  PlayCircle, 
  Settings, 
  Trash2, 
  ArrowRight, 
  Target, 
  Pencil,
  Search,
  Filter,
  Calendar,
  TrendingUp,
  Award,
  MoreVertical,
  Eye,
  Users,
  Clock
} from "lucide-react";

interface FlashcardSet {
  id: string;
  title: string;
  description?: string | null;
  cards: number;
  progress: number;
  createdAt: Date;
  updatedAt: Date;
}

interface UserStats {
  totalSets: number;
  totalCards: number;
  totalLearned: number;
  averageProgress: number;
}

interface FlashcardListProps {
  sets: FlashcardSet[];
  userStats: UserStats;
  userName: string;
}

export default function FlashcardList({ sets, userStats, userName }: FlashcardListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "progress" | "cards">("recent");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Filter and sort sets
  const filteredSets = sets.filter(set =>
    set.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    set.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedSets = [...filteredSets].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      case "progress":
        return b.progress - a.progress;
      case "cards":
        return b.cards - a.cards;
      default:
        return 0;
    }
  });

  const handleDeleteSet = async (setId: string) => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/flashcards/${setId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Refresh the page to update the list
        window.location.reload();
      } else {
        alert("Failed to delete flashcard set. Please try again.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(null);
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
    <div className="space-y-12">
      {/* Header Section */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="text-center"
      >
        <motion.div variants={fadeInUp}>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              My Flashcard Library
            </span>
          </h1>
          <p className="text-xl text-slate-600/90 max-w-3xl mx-auto leading-relaxed">
            Welcome back, {userName}! Continue your learning journey.
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div 
          variants={fadeInUp}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
        >
          <div className="bg-white/80 backdrop-blur-sm border border-white/40 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mx-auto mb-3">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-slate-800">{userStats.totalSets}</p>
            <p className="text-sm text-slate-600">Total Sets</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm border border-white/40 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl mx-auto mb-3">
              <Target className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-slate-800">{userStats.totalCards}</p>
            <p className="text-sm text-slate-600">Total Cards</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm border border-white/40 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl mx-auto mb-3">
              <Award className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-slate-800">{userStats.totalLearned}</p>
            <p className="text-sm text-slate-600">Cards Learned</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm border border-white/40 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-slate-800">{userStats.averageProgress}%</p>
            <p className="text-sm text-slate-600">Avg Progress</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Controls Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col lg:flex-row gap-6 items-center justify-between"
      >
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search flashcard sets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 bg-white/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 w-full sm:w-80"
            />
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-3 bg-white/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          >
            <option value="recent">Most Recent</option>
            <option value="progress">Highest Progress</option>
            <option value="cards">Most Cards</option>
          </select>
        </div>

        {/* Create New Button */}
        <Link href="/flashcards/new">
          <Button className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
            <Plus className="w-5 h-5 mr-3 group-hover:rotate-90 transition-transform duration-300" />
            Create New Set
          </Button>
        </Link>
      </motion.div>

      {/* Flashcard Sets Grid */}
      {sortedSets.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center py-16"
        >
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center mx-auto mb-6"
          >
            <BookOpen className="w-12 h-12 text-slate-400" />
          </motion.div>
          <h3 className="text-2xl font-bold text-slate-700 mb-4">
            {sets.length === 0 ? "No flashcard sets yet" : "No sets match your search"}
          </h3>
          <p className="text-slate-500 mb-8 max-w-lg mx-auto">
            {sets.length === 0 
              ? "Create your first flashcard set to start your personalized learning journey!"
              : "Try adjusting your search terms or create a new set."
            }
          </p>
          <Link href="/flashcards/new">
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
              <Plus className="w-5 h-5 mr-3 group-hover:rotate-90 transition-transform duration-300" />
              {sets.length === 0 ? "Get Started" : "Create New Set"}
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
        </motion.div>
      ) : (
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {sortedSets.map((set, index) => (
            <motion.div
              key={set.id}
              variants={fadeInUp}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="group relative"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                {/* Set Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <Link href={`/flashcards/${set.id}`} className="group-hover:text-blue-600 transition-colors">
                      <h3 className="text-xl font-bold mb-2 line-clamp-2 cursor-pointer">
                        {set.title}
                      </h3>
                    </Link>
                    {set.description && (
                      <p className="text-sm text-slate-600 mb-3 line-clamp-2 min-h-[48px]">
                        {set.description}
                      </p>
                    )}
                    <div className="flex items-center space-x-4 text-sm text-slate-600">
                      <span className="flex items-center space-x-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{set.cards} cards</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{new Date(set.updatedAt).toISOString().split("T")[0]}</span>
                      </span>
                    </div>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="relative">
                    <button
                      onClick={() => setShowDeleteConfirm(showDeleteConfirm === set.id ? null : set.id)}
                      className="p-2 hover:bg-slate-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <MoreVertical className="w-4 h-4 text-slate-500" />
                    </button>
                    
                    {showDeleteConfirm === set.id && (
                      <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-xl border p-2 z-10 min-w-36">
                        <button
                          onClick={() => handleDeleteSet(set.id)}
                          disabled={isDeleting}
                          className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded flex items-center gap-2 text-sm"
                        >
                          <Trash2 className="w-4 h-4" />
                          {isDeleting ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress Section */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium text-slate-700 flex items-center space-x-2">
                      <Target className="w-4 h-4" />
                      <span>Progress</span>
                    </span>
                    <span className="text-sm font-bold text-blue-600">{set.progress}%</span>
                  </div>
                  <div className="relative">
                    <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow-inner"
                        initial={{ width: 0 }}
                        animate={{ width: `${set.progress}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Study Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-blue-50 rounded-xl">
                    <p className="text-lg font-bold text-blue-600">
                      {Math.round(set.cards * set.progress / 100)}
                    </p>
                    <p className="text-xs text-blue-600/80">Learned</p>
                  </div>
                  <div className="text-center p-3 bg-emerald-50 rounded-xl">
                    <p className="text-lg font-bold text-emerald-600">
                      {set.cards - Math.round(set.cards * set.progress / 100)}
                    </p>
                    <p className="text-xs text-emerald-600/80">Remaining</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Link href={`/flashcards/${set.id}/study`} className="flex-1">
                    <Button
                      size="sm"
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 rounded-xl transition-all duration-300"
                    >
                      <PlayCircle className="w-4 h-4 mr-2" />
                      Study
                    </Button>
                  </Link>
                  <Link href={`/flashcards/${set.id}`}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="px-4 py-3 rounded-xl border-slate-300 hover:bg-slate-50 font-medium transition-all duration-300"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}