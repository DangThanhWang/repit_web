// src/app/(main)/profile/page.tsx
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import ProfilePage from "@/components/profile/ProfilePage";
import AnimatedBackground from "@/components/common/AnimatedBackground";

export const metadata = {
  title: "Profile - REPIT",
  description: "Manage your profile and learning preferences",
};

export default async function Profile() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    redirect('/auth/login');
  }

  const userId = session.user.id;

  try {
    // Fetch user data with learning statistics
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
        updatedAt: true,
        flashcardSets: {
          select: { id: true }
        },
        flashcardProgress: {
          select: { learned: true, lastReviewed: true }
        },
        memberships: {
          select: { 
            id: true, 
            joinedAt: true,
            course: {
              select: { name: true }
            }
          }
        }
      }
    });

    if (!user) {
      redirect('/auth/login');
    }

    // Calculate learning statistics
    const totalSets = user.flashcardSets.length;
    const totalLearned = user.flashcardProgress.reduce((sum, p) => sum + p.learned, 0);
    const totalCourses = user.memberships.length;
    
    // Calculate learning streak (simplified - you might want to implement more complex logic)
    const recentActivity = user.flashcardProgress
      .filter(p => p.lastReviewed)
      .sort((a, b) => new Date(b.lastReviewed!).getTime() - new Date(a.lastReviewed!).getTime());
    
    const daysSinceJoined = Math.floor(
      (new Date().getTime() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24)
    );

    const userData = {
      id: user.id,
      name: user.name || "",
      email: user.email,
      image: user.image,
      joinedDate: user.createdAt,
      lastActive: recentActivity[0]?.lastReviewed || user.updatedAt,
      stats: {
        totalSets,
        totalLearned,
        totalCourses,
        daysSinceJoined,
        currentStreak: 7, // You can implement streak calculation logic
        totalStudyTime: Math.floor(totalLearned * 2.5), // Estimated study time in minutes
      }
    };

    return (
      <div className="relative min-h-screen">
        <AnimatedBackground variant="gradient" intensity="light" />
        
        <main className="relative z-10 container mx-auto px-6 lg:px-8 py-12">
          <ProfilePage user={userData} />
        </main>
      </div>
    );

  } catch (error) {
    console.error('Error fetching user profile:', error);
    
    return (
      <div className="relative min-h-screen flex items-center justify-center">
        <AnimatedBackground variant="sunset" intensity="light" />
        <div className="relative z-10 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Something went wrong
          </h1>
          <p className="text-gray-600 mb-6">
            We couldn't load your profile. Please try again later.
          </p>
          <a 
            href="/dashboard" 
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Back to Dashboard
          </a>
        </div>
      </div>
    );
  }
}