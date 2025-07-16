"use client";

import { motion, easeOut } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Users, GraduationCap, Plus, Eye, ArrowRight, Calendar, BookOpen } from "lucide-react";
import AnimatedBackground from "../common/AnimatedBackground";

export default function JoinedClasses({
  classes,
}: {
  classes: { id: string; name: string; members: number }[];
}) {
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
    <section className="relative py-20  overflow-hidden rounded-3xl">
      {/* Animated Background */}
      {/* <AnimatedBackground variant="default" intensity="normal" /> */}

      <div className="relative container mx-auto px-8 lg:px-12">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {/* Header */}
          <motion.div
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                My Learning Classes
              </span>
            </h2>
            <p className="text-xl text-slate-600/90 max-w-3xl mx-auto leading-relaxed">
              Connect with fellow learners and grow together
            </p>
          </motion.div>

          {/* Classes Content */}
          {classes.length === 0 ? (
            <motion.div
              variants={fadeInUp}
              className="text-center py-16"
            >
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center mx-auto mb-6"
              >
                <Users className="w-12 h-12 text-slate-400" />
              </motion.div>
              <h3 className="text-2xl font-bold text-slate-700 mb-4">No classes joined yet</h3>
              <p className="text-slate-500 mb-8 max-w-lg mx-auto">
                Join learning communities to connect with other English learners and get motivated together!
              </p>
              <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                <Plus className="w-5 h-5 mr-3 group-hover:rotate-90 transition-transform duration-300" />
                Explore Classes
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </motion.div>
          ) : (
            <>
              <motion.div
                variants={staggerContainer}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
              >
                {classes.map((cls, index) => (
                  <motion.div
                    key={cls.id}
                    variants={fadeInUp}
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                    className="group"
                  >
                    <div className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                      {/* Class Header */}
                      <div className="flex items-center space-x-4 mb-6">
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: index * 0.2 }}
                          className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg"
                        >
                          <GraduationCap className="w-7 h-7 text-white" />
                        </motion.div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-slate-800 group-hover:text-emerald-600 transition-colors line-clamp-2">
                            {cls.name}
                          </h3>
                          <p className="text-sm text-slate-600 flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{cls.members} members</span>
                          </p>
                        </div>
                      </div>

                      {/* Class Stats */}
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600 flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>Next session</span>
                          </span>
                          <span className="font-semibold text-slate-700">Tomorrow 2PM</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600 flex items-center space-x-2">
                            <BookOpen className="w-4 h-4" />
                            <span>Progress</span>
                          </span>
                          <span className="font-semibold text-emerald-600">75% complete</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-6">
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                          <motion.div
                            className="h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: "75%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                          />
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <Button 
                          size="sm" 
                          className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium py-3 rounded-xl transition-all duration-300"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Join Session
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="px-4 py-3 rounded-xl border-slate-300 hover:bg-slate-50 font-medium transition-all duration-300"
                        >
                          Details
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Join More Classes Button */}
              <motion.div
                variants={fadeInUp}
                className="text-center"
              >
                <Button 
                  variant="outline" 
                  className="group px-8 py-4 text-lg rounded-2xl bg-white/60 backdrop-blur-sm border-emerald-300 hover:bg-emerald-50 hover:border-emerald-400 transition-all duration-300 font-semibold"
                >
                  <span className="flex items-center text-emerald-700">
                    <Plus className="w-5 h-5 mr-3 group-hover:rotate-90 transition-transform duration-300" />
                    Join More Classes
                    <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Button>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}