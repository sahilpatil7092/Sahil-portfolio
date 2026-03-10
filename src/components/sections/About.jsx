import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CountUp from 'react-countup';

const stats = [
  { label: 'Projects', value: 15, suffix: '+' },
  { label: 'Years Coding', value: 3, suffix: '+' },
  { label: 'Technologies\nMastered', value: 5, suffix: '+' },
  { label: 'Research Papers\nin Progress', value: 2, suffix: '' }
];

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"]
  });

  return (
    <section ref={containerRef} className="relative w-full min-h-screen flex items-center py-20 px-6 md:px-12 lg:px-24">
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
        
        {/* Left Side: 60% */}
        <div className="w-full lg:w-[60%] flex flex-col">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-violet font-mono text-[11px] tracking-[0.3em] uppercase mb-6 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-violet/50 block"></span>
              01 / ABOUT
            </h2>
            
            <h3 className="font-syne text-4xl md:text-5xl lg:text-[48px] font-bold text-white leading-tight mb-8">
              Building intelligence,<br/>one model at a time.
            </h3>
            
            <p className="font-mono text-[15px] text-slate-400 leading-relaxed mb-12 max-w-2xl">
              I'm a final-year BCA student specializing in AI & ML at Ajeenkya DY Patil 
              University, Pune. I don't just study algorithms — I build with them. From 
              training predictive models to wrangling messy datasets into clean insights, 
              I'm obsessed with making machines smarter and data speak louder.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-8 md:gap-12">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col"
              >
                <div className="font-syne text-[48px] font-bold text-cyan leading-none text-glow-cyan">
                  <CountUp 
                    end={stat.value} 
                    suffix={stat.suffix} 
                    duration={2.5} 
                    enableScrollSpy 
                    scrollSpyOnce 
                  />
                </div>
                <div className="font-mono text-[12px] text-slate-400 mt-2 whitespace-pre-line leading-tight">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side: 40% */}
        <div className="w-full lg:w-[40%] flex flex-col items-center justify-center relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "circOut" }}
            className="relative"
          >
            {/* Hexagonal Outer Glowing Frame */}
            <div className="relative w-64 h-72 md:w-80 md:h-96">
              
              {/* Rotating Gradient Border Hack */}
              <div 
                className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0%,transparent_30%,#00f5d4_50%,#8b5cf6_70%,transparent_100%)]"
                style={{ 
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  animation: 'spin 10s linear infinite'
                }}
              />
              
              {/* Inner Hex (Creates the border effect by standing inside the outer hex) */}
              <div 
                className="absolute inset-[2px] bg-dark flex items-center justify-center overflow-hidden group"
                style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
              >
                {/* Image Placeholder with Initials */}
                <div className="w-full h-full bg-slate-900/40 border border-slate-800 flex items-center justify-center relative z-10">
                   <img 
                      src="/sahil_photo.jpeg" 
                      alt="Sahil Patil" 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 blur-[1px] group-hover:blur-0"
                   />
                </div>
                
                {/* Inner Glow on hover */}
                <div className="absolute inset-0 bg-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
              </div>
            </div>

            {/* Floating Pill Tags */}
            <div className="absolute -bottom-6 w-full flex flex-wrap justify-center gap-3 z-30">
              <motion.div 
                animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0 }}
                className="px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700 backdrop-blur-sm font-mono text-[11px] text-slate-300 shadow-[0_0_10px_rgba(0,0,0,0.5)] flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                📍 Pune, IN
              </motion.div>
              
              <motion.div 
                animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
                className="px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700 backdrop-blur-sm font-mono text-[11px] text-slate-300 shadow-[0_0_10px_rgba(0,0,0,0.5)] flex items-center gap-2"
              >
                🎓 BCA AI/ML
              </motion.div>
              
              <motion.div 
                animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 1 }}
                className="px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700 backdrop-blur-sm font-mono text-[11px] text-slate-300 shadow-[0_0_10px_rgba(0,0,0,0.5)] flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-cyan shadow-[0_0_8px_#00f5d4] animate-pulse"></span>
                🚀 Open to Work
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
