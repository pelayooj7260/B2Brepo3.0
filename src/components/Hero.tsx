import { ArrowRight } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { AnimatedButton } from './ui/AnimatedButton';

interface HeroProps {
  onCTAClick: () => void;
}

const heroContainerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  },
};

const letterVariant: Variants = {
  hidden: { opacity: 0, y: 10, filter: 'blur(5px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: "spring", damping: 15, stiffness: 400 }
  },
};

const fadeVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { ease: "easeOut", duration: 1, delay: 1.5 }
  },
};

export default function Hero({ onCTAClick }: HeroProps) {
  const sentence1 = "Your Team Shouldn't Be".split("");
  const sentence2 = "Fighting Your Systems".split("");

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
        className="absolute top-0 right-1/4 w-[40rem] h-[40rem] bg-brand-primary rounded-full mix-blend-screen filter blur-[140px] opacity-20 pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.1, 0.2, 0.1],
          x: [0, -60, 0],
          y: [0, 80, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-10 left-10 w-[35rem] h-[35rem] bg-brand-secondary rounded-full mix-blend-screen filter blur-[140px] opacity-30 pointer-events-none"
      />
      
      <div className="relative z-10 max-w-5xl mx-auto text-center mt-12">
        <motion.div variants={heroContainerVariants} initial="hidden" animate="visible" className="flex flex-col items-center">
          
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.1] text-brand-text tracking-tight pb-2 text-glow flex justify-center flex-wrap">
              {sentence1.map((char, index) => (
                <motion.span key={`s1-${index}`} variants={letterVariant} className={char === " " ? "w-[0.3em]" : ""}>
                  {char}
                </motion.span>
              ))}
            </h1>
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.1] tracking-tight text-brand-primary text-glow flex justify-center flex-wrap pb-4">
              {sentence2.map((char, index) => (
                <motion.span key={`s2-${index}`} variants={letterVariant} className={char === " " ? "w-[0.3em]" : ""}>
                  {char}
                </motion.span>
              ))}
            </h1>
          </div>

          <motion.p 
            variants={fadeVariants}
            className="text-xl md:text-2xl text-brand-text mb-8 leading-relaxed max-w-3xl font-light tracking-wide text-glow"
          >
            Manual work. Disconnected tools. Hours lost to tasks that could run themselves.
          </motion.p>

          <motion.div 
            variants={fadeVariants}
            className="text-lg text-brand-text/90 mb-12 leading-relaxed max-w-2xl mx-auto backdrop-blur-xl bg-brand-bg/40 p-8 rounded-3xl border border-brand-primary/20 shadow-[0_0_40px_rgba(32,58,67,0.5)]"
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
