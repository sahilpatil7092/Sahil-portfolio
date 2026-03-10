import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ReactLenis as Lenis } from '@studio-freight/react-lenis';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, errorInfo) { console.error(error, errorInfo); }
  render() {
    if (this.state.hasError) return <div className="fixed inset-0 bg-red-900 text-white p-10 z-[99999] overflow-auto"><h1>CRASH</h1><pre>{this.state.error?.toString()}</pre></div>;
    return this.props.children;
  }
}

// Sections
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Contact from './components/sections/Contact';

function App() {
  const [loading, setLoading] = useState(true);

  // Simple mobile detection fallback
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <ErrorBoundary>
      <CustomCursor />
      
      {loading ? (
        <LoadingScreen key="loading" onComplete={() => setLoading(false)} />
      ) : (
        <main className="w-full min-h-screen text-slate-200">
          {/* Fixed Social Links Header */}
          <header className="fixed top-0 left-0 w-full p-6 z-50 flex justify-end pointer-events-none">
            <div className="flex gap-6 pointer-events-auto bg-dark/50 backdrop-blur-md px-6 py-3 rounded-full border border-slate-800/50">
              <a href="https://www.linkedin.com/in/sahil-patil-aa1543291/" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-slate-400 hover:text-cyan transition-colors">LINKEDIN</a>
              <a href="https://github.com/sahilpatil7092" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-slate-400 hover:text-cyan transition-colors">GITHUB</a>
              <a href="mailto:sahil.patil@adypu.edu.in" className="font-mono text-xs text-slate-400 hover:text-cyan transition-colors">MAIL</a>
            </div>
          </header>

          <Hero isMobile={isMobile} />
          <About />
          <Skills isMobile={isMobile} />
          <Projects />
          <Experience />
          <Contact isMobile={isMobile} />
        </main>
      )}
    </ErrorBoundary>
  );
}

export default App;
