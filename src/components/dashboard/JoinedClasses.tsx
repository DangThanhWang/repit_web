"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Users, GraduationCap, Plus, Eye } from "lucide-react";

export default function JoinedClasses({
  classes,
}: {
  classes: { id: string; name: string; members: number }[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-3xl p-6 shadow-xl h-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg"
          >
            <GraduationCap className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">My Classes</h3>
            <p className="text-sm text-slate-600">Learning communities</p>
          </div>
        </div>
      </div>

      {/* Classes List */}
      {classes.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center py-8"
        >
          <motion.div
            animate={{ y: [-3, 3, -3] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-4"
          >
            <Users className="w-8 h-8 text-slate-400" />
          </motion.div>
          <p className="text-sm text-slate-500 mb-4">No classes joined yet</p>
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium px-4 py-2 rounded-lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            Explore Classes
          </Button>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {classes.map((cls, index) => (
            <motion.div
              key={cls.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <div className="flex items-center justify-between p-4 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl hover:bg-white/70 hover:shadow-md transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">
                      {cls.name}
                    </p>
                    <p className="text-xs text-slate-500 flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>{cls.members} members</span>
                    </p>
                  </div>
                </div>
                
                <Button 
                  size="sm" 
                  variant="outline"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-3 py-1 text-xs rounded-lg border-slate-300 hover:bg-slate-50"
                >
                  <Eye className="w-3 h-3 mr-1" />
                  View
                </Button>
              </div>
            </motion.div>
          ))}
          
          {/* Add More Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button 
              variant="outline" 
              className="w-full mt-4 border-dashed border-2 border-slate-300 hover:border-emerald-400 hover:bg-emerald-50 text-slate-600 hover:text-emerald-600 font-medium py-3 rounded-xl transition-all duration-300"
            >
              <Plus className="w-4 h-4 mr-2" />
              Join More Classes
            </Button>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}