import React, { useState } from 'react';
import { motion } from 'framer-motion';

const GlobeSonar = () => {
  return (
    <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full border border-cyan/30 flex items-center justify-center overflow-hidden bg-slate-900/40 shadow-[0_0_50px_rgba(0,245,212,0.1)]">
      {/* Sonar sweep */}
      <motion.div 
        className="absolute inset-0 rounded-full border border-cyan/10"
        style={{
          background: 'conic-gradient(from 0deg, transparent 70%, rgba(0, 245, 212, 0.2) 100%)'
        }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
      />
      
      {/* Grid rings */}
      <div className="absolute inset-4 rounded-full border border-cyan/10 border-dashed"></div>
      <div className="absolute inset-12 rounded-full border border-cyan/20"></div>
      <div className="absolute inset-24 rounded-full border border-cyan/30 border-dashed"></div>
      <div className="absolute inset-36 rounded-full border border-cyan/40"></div>
      
      {/* Center blip */}
      <div className="absolute w-2 h-2 bg-amber-500 rounded-full shadow-[0_0_10px_#f59e0b]">
        <div className="absolute inset-0 bg-amber-500 rounded-full animate-ping"></div>
      </div>
      <span className="absolute mt-8 text-[10px] font-mono text-amber-500 tracking-widest bg-dark/60 px-1 rounded">PUNE_HQ</span>

      {/* Decorative blips */}
      <div className="absolute top-[20%] left-[30%] w-1.5 h-1.5 bg-cyan rounded-full shadow-[0_0_8px_#00f5d4] opacity-50"></div>
      <div className="absolute bottom-[25%] right-[20%] w-1.5 h-1.5 bg-cyan rounded-full shadow-[0_0_8px_#00f5d4] opacity-40"></div>
      <div className="absolute top-[60%] left-[15%] w-1 h-1 bg-violet rounded-full shadow-[0_0_8px_#8b5cf6] opacity-60"></div>
    </div>
  );
};

export default function Contact() {
  const [formState, setFormState] = useState({ state: 'idle', name: '', email: '', message: '' }); // idle, loading, sent

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState(prev => ({ ...prev, state: 'loading' }));
    
    // Create mailto link
    const subject = encodeURIComponent(`Portfolio Enquiry from ${formState.name}`);
    const body = encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`);
    const mailtoLink = `mailto:sahil.patil@adypu.edu.in?subject=${subject}&body=${body}`;
    
    // Simulate slight delay for effect, then open mail client
    setTimeout(() => {
      window.location.href = mailtoLink;
      setFormState({ state: 'sent', name: '', email: '', message: '' });
      setTimeout(() => setFormState(prev => ({ ...prev, state: 'idle' })), 5000); // Reset after 5s
    }, 1500);
  };

  return (
    <section id="contact" className="relative w-full min-h-screen pt-24 pb-12 flex flex-col justify-between overflow-hidden">
      
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[80vw] h-[80vw] -translate-y-1/2 translate-x-1/3 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.05)_0%,transparent_50%)] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 flex-grow flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Globe/Info */}
          <div className="flex flex-col gap-8 order-2 lg:order-1 items-center lg:items-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <GlobeSonar />
              
              {/* Location Tag */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-0 lg:-bottom-2 bg-slate-900 border border-slate-700 py-2 px-4 rounded-full flex items-center gap-3 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                <span className="font-mono text-xs tracking-widest text-slate-300">PUNE, MAHARASHTRA — IN</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Form */}
          <div className="flex flex-col gap-6 order-1 lg:order-2">
            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-4"
              >
                <div className="h-[1px] w-12 bg-cyan"></div>
                <span className="text-cyan font-mono text-sm tracking-widest">[05]</span>
                <span className="text-slate-400 font-mono text-sm uppercase tracking-widest">Establish Connection</span>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-syne text-4xl sm:text-5xl font-bold uppercase tracking-tight text-white mb-6"
              >
                Initialize <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-violet to-cyan">Handshake</span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-slate-400 font-mono text-sm leading-relaxed max-w-md"
              >
                Seeking an AI engineer to optimize your models or build full-stack data pipelines? Transmit a signal below.
              </motion.p>
            </div>

            <motion.form 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 mt-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="group">
                  <input 
                    type="text" 
                    required
                    value={formState.name}
                    onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="_NAME" 
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-lg p-4 font-mono text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan focus:bg-slate-900 transition-colors"
                  />
                </div>
                <div className="group">
                  <input 
                    type="email" 
                    required
                    value={formState.email}
                    onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="_EMAIL" 
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-lg p-4 font-mono text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan focus:bg-slate-900 transition-colors"
                  />
                </div>
              </div>
              <div className="group">
                <textarea 
                  required
                  value={formState.message}
                  onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="_TRANSMISSION_PAYLOAD" 
                  rows="4"
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-lg p-4 font-mono text-sm text-white placeholder-slate-600 focus:outline-none focus:border-violet focus:bg-slate-900 transition-colors resize-none"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={formState.state !== 'idle'}
                className="relative overflow-hidden group bg-transparent border border-white/20 rounded-lg py-4 flex flex-col items-center justify-center transition-colors hover:border-cyan disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-white/20 mt-2"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan/20 to-violet/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                
                {formState.state === 'idle' && (
                  <span className="relative z-10 font-mono text-sm tracking-widest text-white group-hover:text-cyan transition-colors">
                    [ TRANSMIT ]
                  </span>
                )}
                
                {formState.state === 'loading' && (
                  <span className="relative z-10 font-mono text-sm tracking-widest text-cyan flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan animate-ping"></span>
                    OPENING_MAIL_CLIENT...
                  </span>
                )}
                
                {formState.state === 'sent' && (
                  <span className="relative z-10 font-mono text-sm tracking-widest text-emerald-400">
                    PACKET PREPARED //
                  </span>
                )}
              </button>
            </motion.form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="container mx-auto px-6 lg:px-12 mt-24">
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-slate-500">
            © {new Date().getFullYear()} Sahil Patil. SYSTEM v1.0.
          </p>
          
          <div className="flex gap-6">
            <a href="https://www.linkedin.com/in/sahil-patil-aa1543291/" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-slate-400 hover:text-cyan transition-colors">LINKEDIN</a>
            <a href="https://github.com/sahilpatil7092" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-slate-400 hover:text-cyan transition-colors">GITHUB</a>
            <a href="mailto:sahil.patil@adypu.edu.in" className="font-mono text-xs text-slate-400 hover:text-cyan transition-colors">MAIL</a>
          </div>
        </div>
      </div>
    </section>
  );
}
