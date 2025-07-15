"use client";

import { Button } from "@/components/ui/button";

export default function JoinedClasses({
  classes,
}: {
  classes: { id: string; name: string; members: number }[];
}) {
  return (
    <div className="bg-white border rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Joined Classes</h3>
      {classes.length === 0 ? (
        <p className="text-sm text-slate-500">You haven’t joined any classes yet.</p>
      ) : (
        <ul className="space-y-4">
          {classes.map((cls) => (
            <li
              key={cls.id}
              className="flex justify-between items-center border rounded-xl p-3 hover:bg-slate-50 transition"
            >
              <div>
                <p className="font-medium">{cls.name}</p>
                <p className="text-xs text-slate-500">{cls.members} members</p>
              </div>
              <Button size="sm" variant="outline">
                View
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
