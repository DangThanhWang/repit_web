"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";

export default function FlashcardItem({
  word,
  meaning,
}: {
  word: string;
  meaning: string;
}) {
  return (
    <motion.div whileHover={{ scale: 1.03 }}>
      <Card className="p-4 cursor-pointer">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{word}</h3>
          <Eye className="w-5 h-5 text-gray-500" />
        </div>
        <p className="text-gray-400">Click to see meaning: {meaning}</p>
      </Card>
    </motion.div>
  );
}
