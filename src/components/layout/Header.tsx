"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Menu, X, BookOpen, ArrowRight, Sparkles, ChevronDown, User, LogOut, Settings, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session, status } = useSession();

  // Navigation links for unauthenticated users
  const guestNavLinks = [
    { label: "Home", href: "/", icon: undefined, highlight: false },
    { label: "Flashcards", href: "/flashcards", icon: undefined, highlight: false },
    { label: "Community", href: "/community", icon: undefined, highlight: false },
    { label: "About", href: "/about", icon: undefined, highlight: false },
    { label: "Contact", href: "/contact", icon: undefined, highlight: false },
  ];

  // Navigation links for authenticated users
  const userNavLinks = [
    { label: "Dashboard", href: "/dashboard", icon: undefined, highlight: false },
    { label: "Flashcards", href: "/flashcards", icon: undefined, highlight: false },
    { label: "Classes", href: "/classes", icon: undefined, highlight: false },
    { label: "Community", href: "/community", icon: undefined, highlight: false },
    { 
      label: "Upgrade", 
      href: "/upgrade", 
      icon: Flame,
      highlight: true 
    },
  ];

  // Choose appropriate nav links based on authentication status
  const navLinks = session ? userNavLinks : guestNavLinks;
  
  // Logo link based on authentication status
  const logoHref = session ? "/dashboard" : "/";

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Disable scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.user-menu')) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <header className={`w-full sticky top-0 z-50 transition-all duration-500 ${
      scrolled ? "py-2" : "py-4"
    }`}>
      {/* Elegant Background */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 transition-all duration-500 ${
          scrolled 
            ? "bg-white/95 backdrop-blur-xl shadow-lg" 
            : "bg-gradient-to-b from-white/80 to-white/60 backdrop-blur-md"
        }`}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/[0.03] via-transparent to-indigo-500/[0.03]"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      </div>

      <div className="relative container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={logoHref} className="flex items-center space-x-4 group">
            <div className="relative">
              <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-0.5 shadow-lg shadow-blue-600/20 group-hover:shadow-xl group-hover:shadow-blue-600/30 transition-all duration-300 group-hover:scale-105">
                <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-600" strokeWidth={2.5} />
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <Sparkles className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                REPIT
              </h1>
              <p className="text-xs text-gray-500 font-medium tracking-wide">
                Smart Learning Platform
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main navigation">
            {navLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-5 py-2.5 font-medium transition-all duration-300 rounded-xl group flex items-center gap-2 ${
                    link.highlight 
                      ? "text-orange-600 hover:text-orange-700 hover:bg-orange-50" 
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/70"
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {link.label}
                    {IconComponent && (
                      <IconComponent className={`w-4 h-4 ${
                        link.highlight ? "text-orange-500" : ""
                      }`} />
                    )}
                  </span>
                  <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 rounded-full transition-all duration-300 group-hover:w-3/4 ${
                    link.highlight 
                      ? "bg-gradient-to-r from-orange-500 to-red-500"
                      : "bg-gradient-to-r from-blue-500 to-indigo-500"
                  }`}></div>
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {status === "loading" ? (
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            ) : session ? (
              <div className="relative user-menu">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-3 px-4 py-2 rounded-xl hover:bg-gray-100/70 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {session.user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className="font-medium text-gray-700">{session.user?.name || "User"}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-white/95 backdrop-blur-xl border border-white/50 rounded-xl shadow-xl py-2"
                    >
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{session.user?.name}</p>
                        <p className="text-xs text-gray-500">{session.user?.email}</p>
                      </div>
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button 
                    variant="ghost" 
                    className="text-gray-700 hover:text-gray-900 font-medium px-5 py-2.5 h-auto rounded-xl hover:bg-gray-100/70 transition-all duration-300"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="relative bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-6 py-2.5 h-auto rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group overflow-hidden">
                    <span className="relative z-10 flex items-center gap-2">
                      Get Started
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
                    </span>
                    <div className="absolute inset-0 -top-1/2 -left-1/2 w-[200%] h-[200%] rotate-45 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-x-[-100%] group-hover:translate-x-[100%]"></div>
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden relative w-10 h-10 rounded-xl bg-gray-100/70 hover:bg-gray-100 transition-all duration-300 flex items-center justify-center group"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <div className="relative w-6 h-6">
              <motion.div
                animate={{ 
                  rotate: menuOpen ? 45 : 0,
                  y: menuOpen ? 0 : -8
                }}
                transition={{ duration: 0.3 }}
                className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-700 rounded-full"
              />
              <motion.div
                animate={{ 
                  opacity: menuOpen ? 0 : 1,
                  x: menuOpen ? 20 : 0
                }}
                transition={{ duration: 0.3 }}
                className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-700 rounded-full"
              />
              <motion.div
                animate={{ 
                  rotate: menuOpen ? -45 : 0,
                  y: menuOpen ? 0 : 8
                }}
                transition={{ duration: 0.3 }}
                className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-700 rounded-full"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden"
              onClick={() => setMenuOpen(false)}
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <Link href={logoHref} className="flex items-center space-x-3" onClick={() => setMenuOpen(false)}>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 p-0.5">
                    <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-blue-600" strokeWidth={2.5} />
                    </div>
                  </div>
                  <span className="text-xl font-bold text-gray-900">REPIT</span>
                </Link>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              <nav className="p-6 space-y-2">
                {navLinks.map((link, index) => {
                  const IconComponent = link.icon;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group ${
                          link.highlight 
                            ? "text-orange-600 hover:text-orange-700 hover:bg-orange-50" 
                            : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                        }`}
                      >
                        <span className="font-medium flex items-center gap-2">
                          {link.label}
                          {IconComponent && (
                            <IconComponent className={`w-4 h-4 ${
                              link.highlight ? "text-orange-500" : ""
                            }`} />
                          )}
                        </span>
                        <ChevronDown className="w-4 h-4 text-gray-400 -rotate-90 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3 border-t border-gray-100 bg-white">
                {session ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {session.user?.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{session.user?.name}</p>
                        <p className="text-xs text-gray-500">{session.user?.email}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Link href="/profile" onClick={() => setMenuOpen(false)}>
                        <Button variant="outline" className="w-full justify-start font-medium py-3 h-auto rounded-xl border-gray-200 hover:bg-gray-50 transition-all duration-300">
                          <User className="w-4 h-4 mr-2" />
                          Profile
                        </Button>
                      </Link>
                      <Link href="/settings" onClick={() => setMenuOpen(false)}>
                        <Button variant="outline" className="w-full justify-start font-medium py-3 h-auto rounded-xl border-gray-200 hover:bg-gray-50 transition-all duration-300">
                          <Settings className="w-4 h-4 mr-2" />
                          Settings
                        </Button>
                      </Link>
                    </div>
                    <Button
                      onClick={handleSignOut}
                      variant="outline"
                      className="w-full justify-start font-medium py-3 h-auto rounded-xl border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-300"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <>
                    <Link href="/auth/login" onClick={() => setMenuOpen(false)}>
                      <Button 
                        variant="outline" 
                        className="w-full font-medium py-3 h-auto rounded-xl border-gray-200 hover:bg-gray-50 transition-all duration-300"
                      >
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/auth/register" onClick={() => setMenuOpen(false)}>
                      <Button 
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 h-auto rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}