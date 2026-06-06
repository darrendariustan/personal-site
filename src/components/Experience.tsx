"use client";
import { motion } from "framer-motion";

import resumeData from "../data/resume.json";

export default function Experience() {
  const { experiences } = resumeData;

  return (
    <section id="experience" className="py-20 px-6 max-w-5xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center text-white">
          Career <span className="text-gradient">Journey</span>
        </h2>
      </motion.div>

      <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
        {experiences.map((exp, index) => (
          <motion.div 
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-900 bg-blue-500 text-slate-900 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
              <div className="w-2 h-2 rounded-full bg-slate-900"></div>
            </div>
            
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-6 rounded-2xl">
              <div className="flex flex-col mb-2 text-slate-300">
                <span className="text-sm font-semibold text-blue-400">{exp.date}</span>
                <h3 className="text-xl font-bold text-white mt-1">{exp.role}</h3>
                <span className="text-sm text-slate-400">{exp.company} | {exp.location}</span>
              </div>
              <p className="text-slate-300 mt-4 leading-relaxed">
                {exp.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
