"use client";
import { motion } from "framer-motion";
import resumeData from "../data/resume.json";

export default function About() {
  const { skills, certs } = resumeData;

  return (
    <section id="about" className="py-20 px-6 max-w-7xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-white">
          About <span className="text-gradient">Me</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-8 rounded-2xl"
        >
          <h3 className="text-xl font-semibold mb-4 text-blue-400">The Journey</h3>
          <p className="text-slate-300 leading-relaxed mb-6">
            Postgraduate in Business Analytics, specialising in Advanced AI. Passionate about GenAI and Cloud, aspiring to deepen my skillsets in AI Workflows & DevOps Engineering.
          </p>
          <p className="text-slate-300 leading-relaxed mb-6">
            Looking for opportunities and people who share the same aspirations in sectors where Big Data Technologies, AI and practical-use-case needs intersect.
          </p>
          <p className="text-slate-300 leading-relaxed">
            With 2+ years in commercial functions including CRM and technical project management, I am a highly adaptable individual who believes in lifelong learning and data-driven outcomes.
          </p>
        </motion.div>

        <div className="flex flex-col gap-8">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card p-8 rounded-2xl"
          >
            <h3 className="text-xl font-semibold mb-4 text-blue-400">Top Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-blue-900/30 border border-blue-500/20 rounded-full text-sm text-blue-200">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-card p-8 rounded-2xl"
          >
            <h3 className="text-xl font-semibold mb-4 text-teal-400">Certifications</h3>
            <ul className="space-y-3">
              {certs.map((cert, index) => (
                <li key={index} className="flex items-start gap-2 text-slate-300">
                  <span className="text-teal-400 mt-1">•</span>
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
