"use client";
import { motion } from "framer-motion";

export default function Experience() {
  const experiences = [
    {
      company: "PUB, Singapore's National Water Agency",
      role: "GenAI Systems Engineer",
      date: "March 2026 - Present",
      location: "Singapore",
      description: "Working on GenAI systems and solutions."
    },
    {
      company: "Banco Sabadell",
      role: "AI Engineering Capstone",
      date: "February 2025 - June 2025",
      location: "Spain",
      description: "Co-built in-house HR Analytics prototype predicting 2-year employee attrition risk for 18k+ workforce using Scikit-learn with AWS services. Partnered with HR teams to translate analytics into insights."
    },
    {
      company: "Singapore Oceanarium",
      role: "Retail Merchandise Analyst",
      date: "February 2023 - March 2024",
      location: "Singapore",
      description: "Spearheaded retail system and merchandise development initiatives for the launch in July 2025."
    },
    {
      company: "Singapore Airlines",
      role: "Loyalty Marketing Executive",
      date: "July 2021 - December 2022",
      location: "Singapore",
      description: "Coordinated Krisflyer loyalty program onto Scoot with various digital/business units."
    },
    {
      company: "L'Oréal",
      role: "Online Brand Management (Garnier)",
      date: "January 2021 - July 2021",
      location: "Singapore",
      description: "Market research, data analysis via Tableau and Power BI. Co-proposed 360 campaign concepts for mega festivals."
    },
    {
      company: "SEPHORA",
      role: "Ecommerce Intern",
      date: "January 2020 - July 2020",
      location: "Singapore",
      description: "Omnichannel customer activation, hyper-personalized in-app campaigns monthly with Braze, Ematics, Salesforce Marketing Cloud."
    }
  ];

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
            key={index}
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
