import { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorXSpring = useSpring(0, springConfig);
  const cursorYSpring = useSpring(0, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      cursorXSpring.set(e.clientX - 10);
      cursorYSpring.set(e.clientY - 10);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorXSpring, cursorYSpring]);

  return (
    <>
      <div 
        className="fixed top-0 left-0 w-[10px] h-[10px] bg-cyan rounded-full pointer-events-none z-[10000]"
        style={{
          transform: `translate3d(${position.x - 5}px, ${position.y - 5}px, 0)`,
          boxShadow: '0 0 10px #00f5d4, 0 0 20px #00f5d4'
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-[20px] h-[20px] rounded-full border border-cyan/50 pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />
    </>
  );
}
