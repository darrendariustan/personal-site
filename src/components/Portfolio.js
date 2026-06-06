"use client";
import { motion } from "framer-motion";
import { ExternalLink, Database, FileText, Code } from "lucide-react";

export default function Portfolio() {
  const projects = [
    {
      title: "HR Analytics Attrition Prototype",
      type: "AI Engineering Capstone (Banco Sabadell)",
      description: "Co-built an in-house HR Analytics prototype predicting 2-year employee attrition risk for a workforce of over 18,000 employees. Partnered with HR teams to translate complex analytics into business-actionable insights.",
      tags: ["Scikit-learn", "AWS", "Python", "Data Science"],
      icon: <Database className="text-blue-400 mb-4" size={32} />
    },
    {
      title: "How Expert Consultation Affects Creativity",
      type: "Publication",
      description: "Research exploring the role of expert input in early-stage innovation and how it influences creative outcomes.",
      tags: ["Research", "Innovation", "Analytics"],
      icon: <FileText className="text-teal-400 mb-4" size={32} />
    }
  ];

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
        {projects.map((project, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="glass-card p-8 rounded-2xl flex flex-col h-full"
          >
            {project.icon}
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
              <a href="#" className="flex items-center gap-2 text-sm text-slate-400 hover:text-blue-400 transition-colors">
                <Code size={16} /> Code
              </a>
              <a href="#" className="flex items-center gap-2 text-sm text-slate-400 hover:text-blue-400 transition-colors">
                <ExternalLink size={16} /> Details
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
