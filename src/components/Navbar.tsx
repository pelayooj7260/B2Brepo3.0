import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav 
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -100, opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-6 left-0 right-0 z-50 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-8 py-3 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center shadow-[0_0_15px_rgba(0,242,255,0.4)]">
              <span className="text-brand-obsidian font-black text-lg leading-none">T</span>
            </div>
            <span className="text-white font-outfit font-bold text-xl tracking-tight">Thorne</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-xs font-medium text-white/70 hover:text-brand-primary transition-colors uppercase tracking-widest">Process</a>
            <a href="#benefits" className="text-xs font-medium text-white/70 hover:text-brand-primary transition-colors uppercase tracking-widest">Benefits</a>
            <div className="h-4 w-px bg-white/10" />
            <ThemeToggle />
            <button 
              onClick={() => document.getElementById('audit-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-xs font-bold bg-brand-primary text-brand-obsidian px-5 py-2.5 rounded-full hover:scale-105 transition-transform active:scale-95 shadow-[0_0_20px_rgba(0,242,255,0.3)]"
            >
              Analyze Your Business
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
