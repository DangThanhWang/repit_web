"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Target, 
  Smartphone, 
  TrendingUp, 
  Star, 
  ArrowRight, 
  Play,
  Zap,
  Users,
  Award,
  Globe,
  Brain,
  Clock,
  CheckCircle,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const fadeInScale = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Sample flashcards data
const flashcardsData = [
  { id: 1, word: "Adventure", translation: "Cuộc phiêu lưu", difficulty: "Intermediate", category: "Travel" },
  { id: 2, word: "Brilliant", translation: "Xuất sắc", difficulty: "Advanced", category: "Adjectives" },
  { id: 3, word: "Courage", translation: "Lòng dũng cảm", difficulty: "Intermediate", category: "Emotions" },
  { id: 4, word: "Delicious", translation: "Ngon", difficulty: "Beginner", category: "Food" },
  { id: 5, word: "Explore", translation: "Khám phá", difficulty: "Beginner", category: "Actions" },
  { id: 6, word: "Friendship", translation: "Tình bạn", difficulty: "Intermediate", category: "Relationships" },
];

const features = [
  {
    icon: BookOpen,
    title: "Interactive Flashcards",
    description: "Learn with beautifully designed, interactive flashcards that adapt to your learning pace.",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Monitor your learning journey with detailed analytics and personalized insights.",
    color: "from-emerald-500 to-emerald-600"
  },
  {
    icon: Smartphone,
    title: "Learn Anywhere",
    description: "Access your flashcards on any device - desktop, tablet, or smartphone.",
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: Brain,
    title: "Smart Learning",
    description: "AI-powered spaced repetition system that optimizes your learning efficiency.",
    color: "from-amber-500 to-amber-600"
  }
];

const stats = [
  { number: "50K+", label: "Active Learners", icon: Users },
  { number: "1M+", label: "Flashcards Studied", icon: BookOpen },
  { number: "25+", label: "Languages Supported", icon: Globe },
  { number: "95%", label: "Success Rate", icon: Award }
];

export default function Homepage() {
  return (
    <div className="relative min-h-screen">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-60 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/4 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Premium Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50"></div>
          <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5"></div>
        </div>

        <div className="relative container mx-auto px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Hero Content */}
            <motion.div 
              className="space-y-8"
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="space-y-6">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/30 backdrop-blur-sm rounded-full border border-white/30 shadow-lg">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-semibold text-slate-700">New: AI-Powered Learning</span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent">
                    Master English
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
                    Vocabulary
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-slate-700 to-slate-600 bg-clip-text text-transparent">
                    Effortlessly
                  </span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-slate-600/90 leading-relaxed max-w-2xl">
                  Transform your English learning journey with REPIT's innovative flashcard system. 
                  Learn faster, remember longer, and achieve fluency with confidence.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                <Button className="group relative bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-700 hover:via-blue-600 hover:to-indigo-700 text-white font-bold px-8 py-4 text-lg rounded-2xl shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-500 hover:scale-105 border border-white/30 backdrop-blur-sm overflow-hidden">
                  <span className="relative z-10 flex items-center">
                    <Play className="w-5 h-5 mr-3" />
                    Start Learning Now
                    <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </Button>
                
                <Button variant="outline" className="group px-8 py-4 text-lg rounded-2xl bg-white/30 backdrop-blur-sm border-white/50 hover:bg-white/40 hover:border-white/60 transition-all duration-300 font-semibold">
                  <span className="flex items-center text-slate-700">
                    Watch Demo
                    <Play className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform duration-300" />
                  </span>
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div variants={fadeInUp} className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-8">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <motion.div
                      key={index}
                      variants={fadeInScale}
                      className="text-center space-y-2"
                    >
                      <div className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg border border-white/30">
                        <IconComponent className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="text-2xl lg:text-3xl font-bold text-slate-800">{stat.number}</div>
                      <div className="text-sm text-slate-600/80 font-medium">{stat.label}</div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative w-full h-[600px] rounded-3xl overflow-hidden">
                {/* Glassmorphic Container */}
                <div className="absolute inset-0 bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl shadow-black/10 rounded-3xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-emerald-500/10 rounded-3xl"></div>
                </div>
                
                {/* Hero Illustration - You can replace with actual image */}
                <div className="relative z-10 h-full flex items-center justify-center p-12">
                  <div className="text-center space-y-8">
                    <div className="w-48 h-48 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-blue-500/30 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                      <BookOpen className="w-24 h-24 text-white" />
                    </div>
                    <div className="space-y-4">
                      <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                        <div className="text-2xl font-bold text-slate-800">Adventure</div>
                        <div className="text-slate-600">Cuộc phiêu lưu</div>
                      </div>
                      <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-300">
                        <div className="text-2xl font-bold text-slate-800">Brilliant</div>
                        <div className="text-slate-600">Xuất sắc</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/50 to-transparent"></div>
        
        <div className="relative container mx-auto px-8 lg:px-12">
          <motion.div
            className="text-center mb-20"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Why Choose REPIT?
              </span>
            </h2>
            <p className="text-xl text-slate-600/90 max-w-3xl mx-auto leading-relaxed">
              Experience the future of language learning with our cutting-edge features designed to maximize your learning potential.
            </p>
          </motion.div>

          <motion.div
            className="grid lg:grid-cols-2 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeInScale}
                  className="group relative"
                >
                  {/* Glassmorphic Card */}
                  <div className="relative h-full bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl p-8 lg:p-12 shadow-xl shadow-black/5 hover:shadow-2xl hover:shadow-black/10 transition-all duration-500 hover:scale-105 overflow-hidden">
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}></div>
                    
                    {/* Content */}
                    <div className="relative z-10 space-y-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-2xl lg:text-3xl font-bold text-slate-800">{feature.title}</h3>
                        <p className="text-lg text-slate-600/90 leading-relaxed">{feature.description}</p>
                      </div>
                      
                      <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                        <span>Learn more</span>
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Flashcards Showcase */}
      <section className="relative py-32 overflow-hidden">
        {/* Premium Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 via-white/50 to-purple-50/30"></div>
          <div className="absolute inset-0 bg-white/30 backdrop-blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-8 lg:px-12">
          <motion.div
            className="text-center mb-20"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Interactive Flashcards
              </span>
            </h2>
            <p className="text-xl text-slate-600/90 max-w-3xl mx-auto leading-relaxed">
              Discover our beautifully designed flashcards that make learning English vocabulary engaging and effective.
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {flashcardsData.map((card, index) => (
              <motion.div
                key={card.id}
                variants={fadeInScale}
                className="group relative"
              >
                {/* Flashcard */}
                <div className="relative h-64 bg-white/25 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl shadow-black/5 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:scale-105 hover:rotate-1 overflow-hidden cursor-pointer">
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-between p-8">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          card.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                          card.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {card.difficulty}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">{card.category}</span>
                      </div>
                      
                      <div className="text-center space-y-3">
                        <h3 className="text-3xl font-bold text-slate-800">{card.word}</h3>
                        <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
                        <p className="text-xl text-slate-600/80">{card.translation}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center">
                      <div className="w-8 h-8 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                        <Play className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Button className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-8 py-4 text-lg rounded-2xl shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105">
              <span className="flex items-center">
                Explore All Flashcards
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-32">
        {/* Premium Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-indigo-600/10"></div>
          <div className="absolute inset-0 bg-white/30 backdrop-blur-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5"></div>
        </div>

        <div className="relative container mx-auto px-8 lg:px-12">
          <motion.div
            className="text-center space-y-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="space-y-8">
              <h2 className="text-4xl lg:text-6xl font-bold">
                <span className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Ready to Transform Your
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
                  English Learning?
                </span>
              </h2>
              
              <p className="text-xl lg:text-2xl text-slate-600/90 max-w-4xl mx-auto leading-relaxed">
                Join thousands of learners who have already improved their English vocabulary with REPIT. 
                Start your journey today and see the difference in just 7 days.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button className="group relative bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-700 hover:via-blue-600 hover:to-indigo-700 text-white font-bold px-12 py-6 text-xl rounded-2xl shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-500 hover:scale-105 border border-white/30 backdrop-blur-sm overflow-hidden">
                <span className="relative z-10 flex items-center">
                  Start Free Trial
                  <Zap className="w-6 h-6 ml-3 group-hover:scale-110 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Button>

              <div className="flex items-center space-x-4 text-slate-600">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-medium">7-day free trial</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-medium">No credit card required</span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="pt-8">
              <div className="flex items-center justify-center space-x-2 text-slate-500">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="ml-3 font-semibold">4.9/5 from 10,000+ learners</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}