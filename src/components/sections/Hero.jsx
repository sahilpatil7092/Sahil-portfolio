import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

const GlitchText = ({ text, className }) => {
  const [displayText, setDisplayText] = useState('');
  const chars = '!<>-_\\\\/[]{}—=+*^?#________';

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{displayText}</span>;
}

// Generates a random network of nodes and connecting lines
const NeuralNetworkBackground = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions({ 
      width: window.innerWidth, 
      height: window.innerHeight 
    });
    
    const handleResize = () => {
      setDimensions({ 
        width: window.innerWidth, 
        height: window.innerHeight 
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { nodes, lines } = useMemo(() => {
    if (dimensions.width === 0) return { nodes: [], lines: [] };
    
    // Increased density to make the screen feel fuller and more active
    const nodeCount = Math.floor((dimensions.width * dimensions.height) / 7000); 
    const generatedNodes = Array.from({ length: nodeCount }).map((_, i) => ({
      id: i,
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      size: Math.random() * 2 + 1,
      baseOpacity: Math.random() * 0.3 + 0.1
    }));

    const generatedLines = [];
    const connectionRadius = 150;

    for (let i = 0; i < generatedNodes.length; i++) {
        for (let j = i + 1; j < generatedNodes.length; j++) {
            const dx = generatedNodes[i].x - generatedNodes[j].x;
            const dy = generatedNodes[i].y - generatedNodes[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < connectionRadius && Math.random() > 0.5) {
                generatedLines.push({
                    id: `${i}-${j}`,
                    x1: generatedNodes[i].x,
                    y1: generatedNodes[i].y,
                    x2: generatedNodes[j].x,
                    y2: generatedNodes[j].y,
                    distance
                });
            }
        }
    }

    return { nodes: generatedNodes, lines: generatedLines };
  }, [dimensions]);

  if (dimensions.width === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
      <svg width={dimensions.width} height={dimensions.height}>
        {/* Draw lines */}
        {lines.map(line => (
          <motion.line
            key={line.id}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="#8b5cf6"
            strokeWidth="0.5"
            strokeOpacity="0.3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 1], 
              opacity: [0, 0.4, 0] 
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
          />
        ))}

        {/* Nodes */}
        {nodes.map(node => (
          <motion.circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r={node.size}
            fill="#00f5d4"
            initial={{ opacity: node.baseOpacity }}
            animate={{ 
              opacity: [node.baseOpacity, 0.9, node.baseOpacity],
              r: [node.size, node.size * 2.5, node.size]
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
      </svg>
      
      {/* Fallback radial glows to give deep lighting */}
      <motion.div 
        className="absolute top-1/2 left-1/4 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_center,rgba(0,245,212,0.08)_0%,transparent_60%)]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-1/2 right-0 w-[600px] h-[600px] -translate-y-1/2 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.08)_0%,transparent_60%)]"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* 3D Perspective Grid Floor to fill the bottom empty space */}
      <div 
        className="absolute bottom-0 w-full h-[50%]"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,245,212,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,212,0.15) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          transform: 'perspective(1000px) rotateX(75deg) scale(2.5) translateY(100px)',
          transformOrigin: 'bottom',
          maskImage: 'linear-gradient(to top, black 20%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, black 20%, transparent 100%)'
        }}
      />
    </div>
  );
};

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden border-b border-slate-900/50">
      
      {/* 2.5D Animated SVG Canvas wrapper */}
      <NeuralNetworkBackground />

      <div className="relative z-10 flex flex-col items-center pointer-events-none mt-12">
        <h1 className="font-syne text-5xl sm:text-6xl md:text-[80px] font-bold text-white uppercase tracking-tight mb-2 text-glow-cyan">
          <GlitchText text="SAHIL PATIL" />
        </h1>
        
        <div className="font-mono text-cyan text-base md:text-xl flex items-center mb-12">
          <motion.span 
            initial={{ width: 0 }}
            animate={{ width: "auto" }}
            className="overflow-hidden whitespace-nowrap block"
            transition={{ duration: 1.5, ease: "linear", delay: 1.5 }}
          >
            AI & ML Engineer
          </motion.span>
          <motion.span 
            animate={{ opacity: [1, 0, 1] }} 
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-2.5 h-4 sm:w-3 sm:h-5 bg-cyan ml-1 inline-block"
            style={{boxShadow: '0 0 8px #00f5d4'}}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pointer-events-auto">
          <button 
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="relative px-6 py-2 sm:px-8 sm:py-3 border border-cyan text-cyan font-mono text-xs sm:text-sm tracking-wider uppercase group overflow-hidden transition-all duration-300 hover:text-dark cursor-pointer"
          >
            <span className="relative z-10">[VIEW MY WORK]</span>
            <div className="absolute inset-0 translate-y-full bg-cyan transition-transform duration-300 group-hover:translate-y-0" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}></div>
          </button>
          
          <a 
            href="/Sahil_Patil_CV.pptx" 
            download
            className="relative px-6 py-2 sm:px-8 sm:py-3 border border-violet text-violet font-mono text-xs sm:text-sm tracking-wider uppercase group overflow-hidden transition-all duration-300 hover:text-white text-center cursor-pointer"
          >
            <span className="relative z-10">[DOWNLOAD CV]</span>
            <div className="absolute inset-0 translate-y-full bg-violet transition-transform duration-300 group-hover:translate-y-0" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}></div>
          </a>
        </div>
      </div>

      {/* Floating Left HUD UI */}
      <div className="absolute top-1/3 left-12 hidden lg:flex flex-col gap-2 opacity-40 pointer-events-none z-0">
        <div className="font-mono text-[10px] text-cyan tracking-[0.2em] mb-4">V_1.0_ONLINE</div>
        <div className="w-32 h-32 border border-cyan/20 rounded-full flex items-center justify-center relative">
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 12, ease: "linear" }} className="w-full h-full border-t-2 border-cyan/50 rounded-full absolute"></motion.div>
          <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }} className="w-24 h-24 border-b-2 border-violet/50 rounded-full absolute"></motion.div>
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse shadow-[0_0_10px_#f59e0b]"></div>
        </div>
      </div>

      {/* Floating Right HUD UI */}
      <div className="absolute bottom-1/3 right-12 hidden lg:flex flex-col items-end gap-3 opacity-40 pointer-events-none z-0">
        <div className="flex items-end gap-1.5 h-16">
          {[1, 2, 3, 4, 5, 6].map((bar) => (
            <motion.div 
              key={bar} 
              className="w-2 bg-violet/60"
              animate={{ height: [`${Math.random() * 20 + 20}%`, `${Math.random() * 80 + 20}%`, `${Math.random() * 20 + 20}%`] }}
              transition={{ repeat: Infinity, duration: Math.random() * 1.5 + 1, ease: "easeInOut" }}
            />
          ))}
        </div>
        <div className="font-mono text-[10px] text-violet tracking-[0.2em]">NETWORK_ACTIVITY</div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 z-10">
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00f5d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </motion.div>
        <span className="font-mono text-[10px] tracking-[0.4em] text-cyan">SCROLL</span>
      </div>
    </section>
  );
}
