import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const bootLines = [
  "> initializing sahil.exe...",
  "> loading neural weights...",
  "> connecting data pipelines...",
  "> 100% — SYSTEM ONLINE"
];

export default function LoadingScreen({ onComplete }) {
  const [lines, setLines] = useState([]);
  
  useEffect(() => {
    let delay = 500;
    bootLines.forEach((line, index) => {
      setTimeout(() => {
        setLines(prev => [...prev, line]);
        if (index === bootLines.length - 1) {
          setTimeout(() => {
            onComplete();
          }, 800);
        }
      }, delay);
      delay += 600 + Math.random() * 400; // staggered terminal effect
    });
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[1000] bg-dark text-cyan font-mono flex flex-col justify-end p-8 sm:p-12 md:p-24 pb-32"
      exit={{
        opacity: 0,
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
        transition: { duration: 0.8, ease: "circIn" }
      }}
    >
      <div className="flex flex-col gap-2 relative">
        {lines.map((line, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, x: -10 }} 
            animate={{ opacity: 1, x: 0 }}
            className={`text-sm sm:text-base md:text-xl ${i === bootLines.length - 1 ? "text-violet text-glow-violet font-bold mt-4" : ""}`}
            style={{ textShadow: i === bootLines.length - 1 ? '0 0 10px rgba(139, 92, 246, 0.5)' : 'none'}}
          >
            {line}
          </motion.div>
        ))}
        {lines.length < bootLines.length && (
          <motion.div 
            animate={{ opacity: [1, 0] }} 
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-3 h-5 bg-cyan ml-1 inline-block mt-2"
          />
        )}
      </div>
    </motion.div>
  );
}
