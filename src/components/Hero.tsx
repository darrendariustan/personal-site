"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex flex-col items-center text-center px-6">
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-32 h-32 md:w-40 md:h-40 relative rounded-full overflow-hidden border-4 border-slate-800 shadow-[0_0_40px_rgba(59,130,246,0.3)] mb-8"
      >
        <Image
          src="/profile.jpg"
          alt="Darren D. Tan"
          fill
          sizes="(max-width: 768px) 128px, 160px"
          className="object-cover"
          priority
        />
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-4"
      >
        Bridging AIML with <br className="hidden md:block"/>
        <span className="text-gradient">Cloud Ops</span>
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10"
      >
        I&apos;m Darren, a GenAI Systems Engineer passionate about Big Data Technologies, AI Workflows & DevOps Engineering.
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex gap-4 flex-col sm:flex-row"
      >
        <a href="#portfolio" className="px-8 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] flex items-center justify-center gap-2">
          View Projects <ArrowRight size={18} />
        </a>
        <a href="#about" className="px-8 py-3 rounded-full bg-slate-800/50 text-slate-200 font-medium hover:bg-slate-800 border border-slate-700 hover:border-slate-600 transition-all">
          More About Me
        </a>
      </motion.div>
    </section>
  );
}
