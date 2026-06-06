"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Mail, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight text-white hover:text-blue-400 transition-colors">
          Darren<span className="text-blue-500">.</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center text-sm font-medium text-slate-300">
          <Link href="#about" className="hover:text-blue-400 transition-colors">About</Link>
          <Link href="#experience" className="hover:text-blue-400 transition-colors">Experience</Link>
          <Link href="#portfolio" className="hover:text-blue-400 transition-colors">Portfolio</Link>
        </nav>

        <div className="hidden md:flex gap-4 items-center">
          <a href="https://www.linkedin.com/in/darren-darius-tan" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors" aria-label="LinkedIn profile">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a href="mailto:darrendariustan@gmail.com" className="text-slate-400 hover:text-blue-400 transition-colors" aria-label="Send email">
            <Mail size={20} />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-slate-300 hover:text-white"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open mobile menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-[60] bg-slate-900/95 backdrop-blur-sm flex flex-col items-center justify-center"
          >
            <button 
              className="absolute top-6 right-6 text-slate-300 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close mobile menu"
            >
              <X size={32} />
            </button>
            <nav className="flex flex-col gap-8 items-center text-xl font-medium text-slate-300">
              <Link href="#about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-blue-400 transition-colors">About</Link>
              <Link href="#experience" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-blue-400 transition-colors">Experience</Link>
              <Link href="#portfolio" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-blue-400 transition-colors">Portfolio</Link>
              <div className="flex gap-6 items-center mt-4">
                <a href="https://www.linkedin.com/in/darren-darius-tan" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors" aria-label="LinkedIn profile">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a href="mailto:darrendariustan@gmail.com" className="text-slate-400 hover:text-blue-400 transition-colors" aria-label="Send email">
                  <Mail size={24} />
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
