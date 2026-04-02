import { ArrowRight } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { AnimatedButton } from './ui/AnimatedButton';

interface HeroProps {
  onCTAClick: () => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const maskVariants: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { ease: [0.33, 1, 0.68, 1], duration: 1.2 }
  },
};

const fadeVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { ease: "easeOut", duration: 1 }
  },
};

export default function Hero({ onCTAClick }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
      {/* Liquid / Mesh Gradient Background */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
          x: [0, 80, 0],
          y: [0, -60, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 right-1/4 w-[40rem] h-[40rem] bg-[#34D399] rounded-full mix-blend-screen filter blur-[140px] opacity-20 pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.1, 0.2, 0.1],
          x: [0, -60, 0],
          y: [0, 80, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-10 left-10 w-[35rem] h-[35rem] bg-[#203A43] rounded-full mix-blend-screen filter blur-[140px] opacity-30 pointer-events-none"
      />
      
      <div className="relative z-10 max-w-5xl mx-auto text-center mt-12">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col items-center">
          
          <div className="mb-8">
            <div className="overflow-hidden pb-2">
              <motion.h1 variants={maskVariants} className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.1] text-[#F4F1EB] tracking-tight">
                Your Team Shouldn't Be
              </motion.h1>
            </div>
            <div className="overflow-hidden pb-4">
              <motion.h1 variants={maskVariants} className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.1] tracking-tight text-[#F4F1EB]">
                <span className="text-[#34D399]">Fighting Your Systems</span>
              </motion.h1>
            </div>
          </div>

          <motion.p 
            variants={fadeVariants}
            className="text-xl md:text-2xl text-[#F4F1EB]/80 mb-8 leading-relaxed max-w-3xl font-light tracking-wide"
          >
            Manual work. Disconnected tools. Hours lost to tasks that could run themselves.
          </motion.p>

          <motion.div 
            variants={fadeVariants}
            className="text-lg text-[#F4F1EB]/60 mb-12 leading-relaxed max-w-2xl mx-auto backdrop-blur-md bg-white/5 p-6 rounded-3xl border border-[#34D399]/10 shadow-[0_0_40px_rgba(32,58,67,0.5)]"
          >
            <p className="font-light">
              AI isn't magic. It's a system. And when built right, it gently resolves the friction
              slowing your business down—so you can focus on what actually matters.
            </p>
          </motion.div>

          <motion.div variants={fadeVariants}>
            <AnimatedButton onClick={onCTAClick} variant="primary" icon={<ArrowRight className="w-5 h-5" />}>
              Let's explore your workflows
            </AnimatedButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
