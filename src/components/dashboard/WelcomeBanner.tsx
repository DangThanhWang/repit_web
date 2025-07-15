"use client";

import { Button } from "@/components/ui/button";

export default function WelcomeBanner({ userName }: { userName: string }) {
  return (
    <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-2">Welcome back, {userName}!</h2>
        <p className="text-sm text-white/90">
          Keep up the great work. You're making amazing progress!
        </p>
      </div>
      <Button className="mt-4 md:mt-0 bg-white text-slate-800 hover:bg-slate-100">
        Continue Learning
      </Button>
    </div>
  );
}
