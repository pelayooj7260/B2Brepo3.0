import { ArrowRight, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';


interface HeroProps {
  onCTAClick: () => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 40, opacity: 0, filter: 'blur(10px)' },
  visible: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero({ onCTAClick }: HeroProps) {
  const { scrollY } = useScroll();
  
  // Parallax effects for floating elements
  const y1 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -400]);
  const y3 = useTransform(scrollY, [0, 1000], [0, 150]);
  const rotate = useTransform(scrollY, [0, 1000], [0, 45]);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20 overflow-hidden">
      {/* Parallax Floating Elements */}
      <motion.div style={{ y: y1, rotate }} className="absolute top-[20%] left-[10%] w-32 h-32 bg-brand-primary/10 rounded-2xl border border-brand-primary/20 backdrop-blur-3xl z-0" />
      <motion.div style={{ y: y2, rotate: -rotate }} className="absolute bottom-[20%] right-[10%] w-48 h-48 bg-brand-secondary/10 rounded-full border border-brand-secondary/20 backdrop-blur-3xl z-0" />
      <motion.div style={{ y: y3 }} className="absolute top-[40%] right-[15%] w-16 h-16 bg-brand-primary/20 rounded-full blur-2xl z-0" />
      
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          animate="visible" 
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-brand-primary" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/60">The Future of B2B Infrastructure</span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-6xl md:text-8xl lg:text-[7rem] font-outfit font-extrabold leading-[0.9] tracking-tighter text-white mb-8"
          >
            Your Team <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-cyan-300 to-brand-secondary">
              Shouldn't Fight
            </span> <br />
            Systems.
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl font-light leading-relaxed tracking-wide"
          >
            Thorne orchestrates your entire backend with precision. 
            We replace manual chaos with automated harmony—so you can 
            focus on growth, not gremlins.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <button 
              onClick={onCTAClick}
              className="group relative px-8 py-4 bg-brand-primary text-brand-obsidian font-bold rounded-full transition-all hover:scale-105 active:scale-95 flex items-center gap-3 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10">Deploy Automation</span>
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="text-sm font-bold text-white/70 hover:text-white transition-colors flex items-center gap-2">
              View the Ecosystem
              <div className="w-1.5 h-1.5 rounded-full bg-brand-secondary animate-pulse" />
            </button>
          </motion.div>

          {/* Social Proof Placeholder */}
          <motion.div 
            variants={itemVariants}
            className="mt-20 pt-10 border-t border-white/5 w-full max-w-3xl flex flex-wrap justify-center items-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700"
          >
            <span className="text-white font-black tracking-widest text-xl">STRIPE</span>
            <span className="text-white font-black tracking-widest text-xl">SHOPIFY</span>
            <span className="text-white font-black tracking-widest text-xl">HUBSPOT</span>
            <span className="text-white font-black tracking-widest text-xl">AIRTABLE</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
