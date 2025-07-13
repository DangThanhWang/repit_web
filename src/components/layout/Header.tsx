"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, BookOpen, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Flashcards", href: "/flashcards" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="w-full sticky top-0 z-50">
      {/* Premium Background with Multiple Layers */}
      <div className="absolute inset-0">
        {/* Base gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50/95 via-white/90 to-blue-50/95"></div>
        
        {/* Glass morphism layer */}
        <div className="absolute inset-0 bg-white/25 backdrop-blur-2xl"></div>
        
        {/* Subtle accent gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5"></div>
        
        {/* Premium border and shadow */}
        <div className="absolute inset-0 border-b border-white/40 shadow-2xl shadow-slate-900/10"></div>
        
        {/* Ambient light effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-blue-500/5"></div>
      </div>
      
      <div className="relative container mx-auto flex h-24 items-center justify-between px-8 lg:px-12">
        {/* Premium Logo Section */}
        <Link href="/" className="flex items-center space-x-5 group">
          <div className="relative">
            {/* Enhanced Glassmorphic Icon Container */}
            <div className="w-14 h-14 bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center border border-white/50 shadow-2xl shadow-blue-500/20 group-hover:shadow-blue-500/30 transition-all duration-700 group-hover:scale-110 group-hover:rotate-3">
              <div className="w-11 h-11 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-inner relative overflow-hidden">
                <BookOpen className="w-6 h-6 text-white drop-shadow-lg relative z-10" />
                {/* Inner glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
            
            {/* Premium Floating Accent */}
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 rounded-full shadow-lg shadow-amber-400/40 animate-pulse">
              <Sparkles className="w-3 h-3 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            
            {/* Ambient glow ring */}
            <div className="absolute inset-0 w-14 h-14 bg-blue-400/20 rounded-full blur-xl group-hover:bg-blue-400/30 transition-all duration-700"></div>
          </div>
          
          <div className="flex flex-col space-y-1">
            <span className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent tracking-tight leading-none">
              REPIT
            </span>
            <span className="text-sm text-slate-600/80 font-semibold tracking-wider uppercase">
              Learn. Practice. Master.
            </span>
          </div>
        </Link>

        {/* Premium Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-3">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative px-6 py-3.5 text-slate-700/90 hover:text-blue-600 font-semibold transition-all duration-500 rounded-2xl hover:bg-white/40 hover:backdrop-blur-xl hover:border hover:border-white/60 hover:shadow-xl hover:shadow-blue-500/10 group overflow-hidden"
            >
              {/* Background shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              {/* Text */}
              <span className="relative z-10">{link.label}</span>
              
              {/* Premium underline effect */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                <div className="w-0 h-0.5 bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-500 rounded-full transition-all duration-500 group-hover:w-8 shadow-lg shadow-blue-500/50"></div>
                <div className="w-0 h-0.5 bg-white/60 rounded-full transition-all duration-500 group-hover:w-6 mt-0.5 blur-sm"></div>
              </div>
            </Link>
          ))}
        </nav>

        {/* Premium Desktop CTA Buttons */}
        <div className="hidden md:flex items-center space-x-5">
          <Button 
            variant="ghost" 
            className="text-slate-700/80 hover:text-slate-900 font-semibold px-6 py-3 rounded-2xl hover:bg-white/40 hover:backdrop-blur-xl hover:border hover:border-white/60 hover:shadow-lg transition-all duration-500 relative group overflow-hidden"
          >
            <span className="relative z-10">Sign In</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </Button>
          
          <Button className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-700 hover:via-blue-600 hover:to-indigo-700 text-white font-bold px-8 py-4 rounded-2xl shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-500 hover:scale-105 border border-white/30 backdrop-blur-sm group overflow-hidden transform hover:-translate-y-0.5">
            {/* Background gradient animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <span className="relative z-10 flex items-center">
              Get Started
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300" />
            </span>
            
            {/* Inner glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </Button>
        </div>

        {/* Premium Mobile Menu Button */}
        <button
          className="md:hidden p-4 rounded-2xl bg-white/30 backdrop-blur-xl border border-white/50 hover:bg-white/40 hover:border-white/60 transition-all duration-500 shadow-xl shadow-black/10 hover:shadow-2xl hover:scale-105 group"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <motion.div
            animate={{ rotate: menuOpen ? 180 : 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="relative"
          >
            {menuOpen ? (
              <X className="w-7 h-7 text-slate-700 group-hover:text-blue-600 transition-colors duration-300" />
            ) : (
              <Menu className="w-7 h-7 text-slate-700 group-hover:text-blue-600 transition-colors duration-300" />
            )}
          </motion.div>
        </button>
      </div>

      {/* Premium Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, y: -20 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="md:hidden absolute top-full left-0 right-0 overflow-hidden"
          >
            {/* Premium Mobile Background */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-b from-slate-50/95 to-white/90"></div>
              <div className="absolute inset-0 bg-white/30 backdrop-blur-2xl"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/10"></div>
              <div className="absolute inset-0 border-t border-white/50 shadow-2xl shadow-slate-900/20"></div>
            </div>
            
            <div className="relative px-8 py-8 space-y-3">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="relative"
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center px-6 py-4 text-slate-700/90 hover:text-blue-600 hover:bg-white/40 font-semibold rounded-2xl transition-all duration-500 backdrop-blur-sm border border-transparent hover:border-white/60 hover:shadow-xl hover:shadow-blue-500/10 group relative overflow-hidden"
                  >
                    <span className="relative z-10">{link.label}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <ArrowRight className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </Link>
                </motion.div>
              ))}
              
              {/* Premium Mobile CTA Buttons */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: navLinks.length * 0.1, duration: 0.4 }}
                className="pt-6 border-t border-white/30 space-y-4"
              >
                <Button 
                  variant="outline" 
                  className="w-full justify-center font-semibold py-4 rounded-2xl bg-white/30 backdrop-blur-xl border-white/50 hover:bg-white/40 hover:border-white/60 transition-all duration-500 shadow-lg hover:shadow-xl group relative overflow-hidden"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="relative z-10">Sign In</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </Button>
                
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-700 hover:via-blue-600 hover:to-indigo-700 text-white font-bold py-4 rounded-2xl shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-500 border border-white/30 backdrop-blur-sm group relative overflow-hidden hover:scale-105"
                  onClick={() => setMenuOpen(false)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <span className="relative z-10 flex items-center justify-center">
                    Get Started
                    <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}