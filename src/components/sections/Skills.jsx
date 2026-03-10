import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  { name: "Python", icon: "🐍", color: "border-[#00f5d4]/50" },
  { name: "Machine Learning", icon: "🤖", color: "border-[#8b5cf6]/50" },
  { name: "Data Analysis", icon: "📊", color: "border-[#f59e0b]/50" },
  { name: "SQL", icon: "🗄️", color: "border-[#00f5d4]/30" },
  { name: "Power BI", icon: "📈", color: "border-[#8b5cf6]/30" },
  { name: "JavaScript", icon: "⚡", color: "border-[#f59e0b]/30" },
  { name: "HTML/CSS", icon: "🎨", color: "border-slate-700" },
  { name: "Excel", icon: "📋", color: "border-slate-700" },
  { name: "Scikit-learn", icon: "🔬", color: "border-slate-700" },
  { name: "Pandas", icon: "🐼", color: "border-slate-700" },
  { name: "NumPy", icon: "🔢", color: "border-slate-700" },
];

export default function Skills() {
  return (
    <section id="skills" className="relative w-full min-h-screen py-24 flex flex-col justify-center overflow-hidden border-b border-slate-900/50">
      
      {/* Background radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[80vw] h-[80vw] bg-[radial-gradient(circle_at_center,#00f5d4_0%,transparent_50%)] animate-pulse" style={{ animationDuration: '4s' }} />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col gap-16">
        
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-4"
          >
            <span className="text-violet font-mono text-sm tracking-widest">[02]</span>
            <div className="h-[1px] w-12 bg-violet"></div>
            <span className="text-slate-400 font-mono text-sm uppercase tracking-widest">The Neural Stack</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-syne text-4xl sm:text-5xl font-bold uppercase tracking-tight text-white mb-6"
          >
            Cognitive <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-violet">Architecture</span>
          </motion.h2>
        </div>

        {/* CSS 2.5D Animated Grid Float */}
        <div className="relative w-full max-w-5xl mx-auto h-[400px] flex items-center justify-center perspective-[1000px]">
          <div className="absolute inset-0 flex flex-wrap justify-center items-center gap-4 sm:gap-6 p-4 perspective-1000 origin-center" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(10deg) rotateY(-5deg)' }}>
            
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, translateZ: -200, scale: 0.8 }}
                whileInView={{ opacity: 1, translateZ: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1, 
                  type: "spring",
                  bounce: 0.4
                }}
                whileHover={{ 
                  scale: 1.15, 
                  translateZ: 80,
                  rotateX: (Math.random() - 0.5) * 30,
                  rotateY: (Math.random() - 0.5) * 30,
                  boxShadow: "0 0 30px rgba(0, 245, 212, 0.6)",
                  borderColor: "#00f5d4",
                  backdropFilter: "blur(20px)"
                }}
                className={`flex flex-col items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md border ${skill.color} rounded-2xl min-w-[140px] cursor-none transition-colors duration-300`}
              >
                <div className="text-4xl mb-3 drop-shadow-lg">{skill.icon}</div>
                <div className="font-mono text-xs sm:text-sm text-slate-300 font-medium text-center">{skill.name}</div>
              </motion.div>
            ))}

          </div>
        </div>

      </div>

      {/* Infinite scrolling ticker (Bottom) */}
      <div className="absolute bottom-0 w-full overflow-hidden flex border-t border-slate-800 bg-slate-950/80 backdrop-blur-sm z-20">
        <motion.div 
          className="flex whitespace-nowrap py-4 items-center"
          animate={{ x: [0, -1000] }}
          transition={{ 
            repeat: Infinity, 
            duration: 20, 
            ease: "linear" 
          }}
        >
          {/* Repeat skills to create seamless loop */}
          {[...skills, ...skills, ...skills].map((skill, i) => (
            <div key={i} className="flex items-center gap-6 px-6 shrink-0">
              <span className="text-xl">{skill.icon}</span>
              <span className="font-mono text-sm tracking-widest uppercase text-slate-400">{skill.name}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan/50 ml-6"></span>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}
