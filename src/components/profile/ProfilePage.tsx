// src/components/profile/ProfilePage.tsx
"use client";

import { useState } from "react";
import { motion, easeOut } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Calendar, 
  Settings, 
  BookOpen,
  Target,
  Award,
  Clock,
  TrendingUp,
  Flame,
  Users,
  Bell,
  Shield,
  Palette,
  Globe,
  Download,
  LogOut,
  Edit3,
  Camera,
  Save,
  X,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { signOut } from "next-auth/react";
import ChangePasswordModal from "./ChangePasswordModal";

interface UserData {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  joinedDate: Date;
  lastActive: Date;
  stats: {
    totalSets: number;
    totalLearned: number;
    totalCourses: number;
    daysSinceJoined: number;
    currentStreak: number;
    totalStudyTime: number;
  };
}

interface ProfilePageProps {
  user: UserData;
}

export default function ProfilePage({ user }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "settings" | "activity">("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const handleSaveName = async () => {
    if (!editedName.trim()) {
      setMessage({ type: 'error', text: 'Name cannot be empty' });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editedName.trim() })
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        setIsEditing(false);
        // You might want to refresh the page or update the user state
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
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

  const tabs = [
    { id: "overview" as const, label: "Overview", icon: User },
    { id: "settings" as const, label: "Settings", icon: Settings },
    { id: "activity" as const, label: "Activity", icon: TrendingUp }
  ];

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={staggerContainer}
      className="space-y-8"
    >
      {/* Navigation */}
      <motion.div variants={fadeInUp}>
        <Link 
          href="/dashboard" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Dashboard
        </Link>
      </motion.div>

      {/* Profile Header */}
      <motion.div variants={fadeInUp}>
        <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 rounded-3xl overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-3xl"></div>
          </div>

          <div className="relative p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row lg:items-center gap-8">
              {/* Avatar and Basic Info */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="relative group">
                  <div className="w-32 h-32 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-white/30 shadow-xl">
                    {user.image ? (
                      <img 
                        src={user.image} 
                        alt={user.name}
                        className="w-full h-full rounded-3xl object-cover"
                      />
                    ) : (
                      <User className="w-16 h-16 text-white/80" />
                    )}
                  </div>
                  <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30 hover:bg-white/30 transition-all duration-300 opacity-0 group-hover:opacity-100">
                    <Camera className="w-5 h-5 text-white" />
                  </button>
                </div>

                <div className="text-center sm:text-left">
                  {isEditing ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="text-3xl font-bold text-white bg-white/10 border border-white/30 rounded-xl px-4 py-2 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                      />
                      <div className="flex gap-2">
                        <Button
                          onClick={handleSaveName}
                          disabled={isLoading}
                          size="sm"
                          className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                        >
                          {isLoading ? "Saving..." : <Save className="w-4 h-4" />}
                        </Button>
                        <Button
                          onClick={() => {
                            setIsEditing(false);
                            setEditedName(user.name);
                          }}
                          size="sm"
                          variant="outline"
                          className="bg-white/10 hover:bg-white/20 text-white border-white/30"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="group">
                      <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl lg:text-4xl font-bold text-white">
                          {user.name}
                        </h1>
                        <button
                          onClick={() => setIsEditing(true)}
                          className="opacity-0 group-hover:opacity-100 p-2 hover:bg-white/20 rounded-lg transition-all duration-300"
                        >
                          <Edit3 className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-2 text-white/80">
                    <p className="flex items-center gap-2 justify-center sm:justify-start">
                      <Mail className="w-4 h-4" />
                      {user.email}
                    </p>
                    <p className="flex items-center gap-2 justify-center sm:justify-start">
                      <Calendar className="w-4 h-4" />
                      Joined {new Date(user.joinedDate).toLocaleDateString()}
                    </p>
                    <p className="flex items-center gap-2 justify-center sm:justify-start">
                      <Clock className="w-4 h-4" />
                      Last active {new Date(user.lastActive).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex-1 lg:max-w-md">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Flame className="w-6 h-6 text-orange-400" />
                      <span className="text-white/80 text-sm">Current Streak</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{user.stats.currentStreak} days</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                    <div className="flex items-center gap-3 mb-2">
                      <BookOpen className="w-6 h-6 text-blue-400" />
                      <span className="text-white/80 text-sm">Total Sets</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{user.stats.totalSets}</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Award className="w-6 h-6 text-emerald-400" />
                      <span className="text-white/80 text-sm">Cards Learned</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{user.stats.totalLearned}</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="w-6 h-6 text-purple-400" />
                      <span className="text-white/80 text-sm">Study Time</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{Math.floor(user.stats.totalStudyTime / 60)}h</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Message Alert */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`flex items-center gap-3 p-4 rounded-xl border ${
            message.type === 'success' 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
              : 'bg-red-50 border-red-200 text-red-700'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <span>{message.text}</span>
          <button
            onClick={() => setMessage(null)}
            className="ml-auto text-current hover:opacity-70"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}

      {/* Tab Navigation */}
      <motion.div variants={fadeInUp}>
        <div className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl p-2 shadow-lg">
          <div className="flex">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-white shadow-md text-blue-600"
                      : "text-slate-600 hover:text-slate-800 hover:bg-white/50"
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Tab Content */}
      <motion.div variants={fadeInUp}>
        {activeTab === "overview" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Detailed Stats */}
            <div className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 text-center mb-2">Flashcard Sets</h3>
              <p className="text-3xl font-bold text-blue-600 text-center">{user.stats.totalSets}</p>
              <p className="text-sm text-slate-600 text-center mt-1">Total created</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl mx-auto mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 text-center mb-2">Cards Learned</h3>
              <p className="text-3xl font-bold text-emerald-600 text-center">{user.stats.totalLearned}</p>
              <p className="text-sm text-slate-600 text-center mt-1">Successfully mastered</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl mx-auto mb-4">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 text-center mb-2">Study Streak</h3>
              <p className="text-3xl font-bold text-orange-600 text-center">{user.stats.currentStreak}</p>
              <p className="text-sm text-slate-600 text-center mt-1">Days in a row</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 text-center mb-2">Courses</h3>
              <p className="text-3xl font-bold text-purple-600 text-center">{user.stats.totalCourses}</p>
              <p className="text-sm text-slate-600 text-center mt-1">Enrolled</p>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="space-y-6">
            {/* Account Settings */}
            <div className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <Shield className="w-6 h-6 text-blue-600" />
                Account Settings
              </h3>
              
              <div className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setShowChangePasswordModal(true)}
                >
                  <User className="w-4 h-4 mr-3" />
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="w-4 h-4 mr-3" />
                  Update Email
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-3" />
                  Export Data
                </Button>
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <Settings className="w-6 h-6 text-purple-600" />
                Preferences
              </h3>
              
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="w-4 h-4 mr-3" />
                  Notification Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Palette className="w-4 h-4 mr-3" />
                  Theme Preferences
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Globe className="w-4 h-4 mr-3" />
                  Language Settings
                </Button>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-red-800 mb-4">Danger Zone</h3>
              <p className="text-red-600 mb-4">These actions cannot be undone.</p>
              <div className="space-y-3">
                <Button 
                  onClick={handleSignOut}
                  variant="outline" 
                  className="w-full justify-start border-red-300 text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Sign Out
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-red-300 text-red-600 hover:bg-red-50"
                >
                  <X className="w-4 h-4 mr-3" />
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "activity" && (
          <div className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
              Recent Activity
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-white/50 rounded-xl">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-800">Studied Essential Daily Vocabulary</p>
                  <p className="text-sm text-slate-600">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-white/50 rounded-xl">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-800">Completed Business English set</p>
                  <p className="text-sm text-slate-600">1 day ago</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-white/50 rounded-xl">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-800">Joined Advanced Conversation course</p>
                  <p className="text-sm text-slate-600">3 days ago</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Change Password Modal */}
      <ChangePasswordModal 
        isOpen={showChangePasswordModal}
        onClose={() => setShowChangePasswordModal(false)}
      />
    </motion.div>
  );
}