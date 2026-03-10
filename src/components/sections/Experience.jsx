import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const experiences = [
  {
    id: 1,
    role: "AI & ML Student Researcher",
    org: "Ajeenkya DY Patil University, Pune",
    period: "2022 — Present",
    desc: "Pursuing BCA with AI/ML specialization. Coursework spans neural networks, supervised learning, database systems, and statistical modeling. Active member of the university's data science club."
  },
  {
    id: 2,
    role: "Data Analysis Intern",
    org: "Self-Initiated Research · Remote",
    period: "Summer 2024",
    desc: "Independently conducted a data analysis case study on publicly available education datasets. Produced a comprehensive report with visualizations using Python, Pandas, and Power BI, simulating a real analyst engagement."
  },
  {
    id: 3,
    role: "Open Source Contributor",
    org: "GitHub · Python ML Community",
    period: "2024 — Present",
    desc: "Contributing to beginner-friendly ML repositories. Submitted PRs for documentation improvements and example notebooks across 3+ repositories."
  }
];

const TimelineNode = ({ index }) => {
  return (
    <div className="absolute left-0 w-4 h-4 rounded-full bg-dark border-2 border-cyan shadow-[0_0_10px_#00f5d4] translate-x-[-7px] z-10 flex items-center justify-center">
      <motion.div 
        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
        transition={{ repeat: Infinity, duration: 2, delay: index * 0.5 }}
        className="w-1.5 h-1.5 rounded-full bg-cyan"
      />
    </div>
  );
};

export default function Experience() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 50%"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative w-full py-24 px-6 md:px-12 lg:px-32 border-b border-slate-900/50">
      
      <div className="max-w-4xl mx-auto">
        <h2 className="text-amber-500 font-mono text-[11px] tracking-[0.3em] uppercase mb-6 flex items-center gap-4">
          <span className="w-8 h-[1px] bg-amber-500/50 block"></span>
          04 / MISSION LOG
        </h2>
        
        <div className="relative mt-16 ml-4 sm:ml-8 md:ml-12 border-slate-800">
          
          {/* Static background line */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-slate-800 pointer-events-none rounded-full" />
          
          {/* Animated glowing progress line */}
          <motion.div 
            className="absolute left-0 top-0 w-[2px] bg-cyan shadow-[0_0_8px_#00f5d4] pointer-events-none origin-top rounded-full z-0"
            style={{ height: lineHeight }}
          />

          <div className="flex flex-col gap-16 pb-8">
            {experiences.map((exp, index) => (
              <motion.div 
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative pl-10 md:pl-16 group"
              >
                <TimelineNode index={index} />
                
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                  <h3 className="font-syne text-2xl font-bold text-white group-hover:text-cyan transition-colors duration-300">
                    {exp.role}
                  </h3>
                  <span className="font-mono text-sm text-cyan/80 mt-1 md:mt-0 tracking-widest">
                    [{exp.period}]
                  </span>
                </div>
                
                <div className="font-mono text-[13px] text-amber-500/80 mb-4 tracking-wider uppercase">
                  {exp.org}
                </div>
                
                <p className="font-mono text-[14px] text-slate-400 leading-relaxed max-w-2xl">
                  {exp.desc}
                </p>
                
              </motion.div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
