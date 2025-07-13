import Link from "next/link";
import { BookOpen, Twitter, Facebook, Linkedin, Github, Mail, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { label: "Home", href: "/" },
    { label: "Flashcards", href: "/flashcards" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-blue-400" },
    { icon: Facebook, href: "#", label: "Facebook", color: "hover:text-blue-600" },
    { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:text-blue-700" },
    { icon: Github, href: "#", label: "GitHub", color: "hover:text-slate-800" },
    { icon: Mail, href: "#", label: "Email", color: "hover:text-emerald-600" },
  ];

  return (
    <footer className="relative mt-auto">
      {/* Premium Background with Multiple Layers */}
      <div className="absolute inset-0">
        {/* Base gradient background */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50/95 via-white/90 to-blue-50/95"></div>
        
        {/* Glass morphism layer */}
        <div className="absolute inset-0 bg-white/25 backdrop-blur-2xl"></div>
        
        {/* Subtle accent gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 via-transparent to-purple-500/5"></div>
        
        {/* Premium border and shadow */}
        <div className="absolute inset-0 border-t border-white/40 shadow-2xl shadow-slate-900/10"></div>
        
        {/* Ambient light effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 via-transparent to-transparent"></div>
      </div>

      <div className="relative container mx-auto px-8 lg:px-12 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-16 mb-12">
          
          {/* Logo and Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-4 group">
              <div className="relative">
                {/* Enhanced Glassmorphic Icon Container */}
                <div className="w-12 h-12 bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/50 shadow-xl shadow-blue-500/20 group-hover:shadow-blue-500/30 transition-all duration-700 group-hover:scale-110">
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-inner relative overflow-hidden">
                    <BookOpen className="w-5 h-5 text-white drop-shadow-lg relative z-10" />
                    {/* Inner glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
                  </div>
                </div>
                
                {/* Ambient glow ring */}
                <div className="absolute inset-0 w-12 h-12 bg-blue-400/20 rounded-full blur-xl group-hover:bg-blue-400/30 transition-all duration-700"></div>
              </div>
              
              <div className="flex flex-col space-y-1">
                <span className="text-2xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent tracking-tight leading-none">
                  REPIT
                </span>
                <span className="text-sm text-slate-600/80 font-semibold tracking-wider">
                  Learn. Practice. Master.
                </span>
              </div>
            </div>
            
            {/* Brand Description */}
            <p className="text-slate-600/90 text-lg leading-relaxed max-w-md">
              Transform your English learning journey with our innovative flashcard system. 
              Master vocabulary, improve fluency, and achieve your language goals.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Quick Links</h3>
            <nav className="space-y-3">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center text-slate-600/90 hover:text-blue-600 font-medium transition-all duration-300 relative"
                >
                  <span className="relative z-10">{link.label}</span>
                  <div className="absolute inset-0 -left-2 -right-2 py-1 bg-white/20 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/30"></div>
                  <div className="w-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 ml-2 group-hover:w-4 transition-all duration-300 rounded-full"></div>
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Media & Contact */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Connect</h3>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    className={`w-10 h-10 bg-white/25 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30 text-slate-600 ${social.color} hover:bg-white/40 hover:border-white/50 transition-all duration-300 hover:scale-110 hover:shadow-lg group relative overflow-hidden`}
                    aria-label={social.label}
                  >
                    <IconComponent className="w-5 h-5 relative z-10" />
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </Link>
                );
              })}
            </div>

            {/* Newsletter Signup */}
            <div className="space-y-3">
              <p className="text-sm text-slate-600/80 font-medium">
                Get learning tips & updates
              </p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2.5 bg-white/30 backdrop-blur-sm border border-white/40 rounded-xl text-slate-700 placeholder-slate-500/70 focus:outline-none focus:border-blue-400 focus:bg-white/40 transition-all duration-300 text-sm"
                />
                <button className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 font-medium text-sm">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright & Legal */}
        <div className="pt-8 border-t border-white/30">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-slate-600/80 text-sm">
              <span>© {currentYear} REPIT. Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>for English learners worldwide.</span>
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6 text-sm">
              <Link 
                href="/privacy" 
                className="text-slate-600/80 hover:text-blue-600 transition-colors duration-300 relative group"
              >
                Privacy Policy
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link 
                href="/terms" 
                className="text-slate-600/80 hover:text-blue-600 transition-colors duration-300 relative group"
              >
                Terms of Service
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link 
                href="/support" 
                className="text-slate-600/80 hover:text-blue-600 transition-colors duration-300 relative group"
              >
                Support
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>
          </div>

          {/* Credits & Version */}
          <div className="mt-6 pt-6 border-t border-white/20 text-center">
            <p className="text-xs text-slate-500/80">
              Designed with ❤️ for the future of language learning • Version 2.0.1
            </p>
          </div>
        </div>
      </div>

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-10 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl"></div>
      </div>
    </footer>
  );
}