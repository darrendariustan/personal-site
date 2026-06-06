"use client";
import { motion } from "framer-motion";
import { ExternalLink, Database, FileText, Code } from "lucide-react";

import resumeData from "../data/resume.json";

const iconMap: Record<string, any> = { Database, FileText };
const iconColorMap: Record<string, string> = { Database: "text-blue-400", FileText: "text-teal-400" };

export default function Portfolio() {
  const { projects } = resumeData;

  return (
    <section id="portfolio" className="py-20 px-6 max-w-7xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-white">
          Selected <span className="text-gradient">Projects</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => {
          const Icon = iconMap[project.iconName];
          return (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="glass-card p-8 rounded-2xl flex flex-col h-full"
          >
            {Icon && <Icon className={`${iconColorMap[project.iconName]} mb-4`} size={32} />}
            <div className="mb-2">
              <span className="text-sm font-medium text-slate-400 uppercase tracking-wider">{project.type}</span>
              <h3 className="text-2xl font-bold text-white mt-1">{project.title}</h3>
            </div>
            
            <p className="text-slate-300 mt-4 leading-relaxed flex-grow">
              {project.description}
            </p>
            
            <div className="mt-8 flex flex-wrap gap-2">
              {project.tags.map((tag, tagIndex) => (
                <span key={tagIndex} className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-xs text-slate-300">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-700/50 flex gap-4">
              <a href={project.codeLink || undefined} className={`flex items-center gap-2 text-sm text-slate-400 hover:text-blue-400 transition-colors ${!project.codeLink ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`} aria-disabled={!project.codeLink}>
                <Code size={16} /> Code
              </a>
              <a href={project.detailsLink || undefined} className={`flex items-center gap-2 text-sm text-slate-400 hover:text-blue-400 transition-colors ${!project.detailsLink ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`} aria-disabled={!project.detailsLink}>
                <ExternalLink size={16} /> Details
              </a>
            </div>
          </motion.div>
          );
        })}
      </div>
    </section>
  );
}
