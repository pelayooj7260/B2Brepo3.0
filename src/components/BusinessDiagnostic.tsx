import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Users, Rocket, Globe, CheckCircle2, ChevronRight, Briefcase, ShoppingCart, Home, Cpu, HeartPulse, Palette } from 'lucide-react';

type Step = 1 | 2 | 3;

interface BusinessDiagnosticProps {
  onComplete?: (data: { scale: string; sector: string; score: number }) => void;
}

export default function BusinessDiagnostic({ onComplete }: BusinessDiagnosticProps) {
  const [step, setStep] = useState<Step>(1);
  const [scale, setScale] = useState<string>('');
  const [sector, setSector] = useState<string>('');

  const scales = [
    { id: 'solopreneur', label: 'Solopreneur', icon: <Rocket className="w-6 h-6" /> },
    { id: 'small', label: 'Small Team (2-10)', icon: <Users className="w-6 h-6" /> },
    { id: 'growth', label: 'Growth Phase (11-50)', icon: <Building2 className="w-6 h-6" /> },
    { id: 'enterprise', label: 'Enterprise (50+)', icon: <Globe className="w-6 h-6" /> },
  ];

  const sectors = [
    { id: 'professional', label: 'Professional Services', icon: <Briefcase className="w-6 h-6" /> },
    { id: 'ecommerce', label: 'E-commerce', icon: <ShoppingCart className="w-6 h-6" /> },
    { id: 'realestate', label: 'Real Estate', icon: <Home className="w-6 h-6" /> },
    { id: 'technology', label: 'Technology', icon: <Cpu className="w-6 h-6" /> },
    { id: 'health', label: 'Health & Wellness', icon: <HeartPulse className="w-6 h-6" /> },
    { id: 'creative', label: 'Creative Agencies', icon: <Palette className="w-6 h-6" /> },
  ];

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, scale: 1.05, transition: { duration: 0.3, ease: "easeIn" } },
  };

  const calculateScore = () => {
    // Logic for Gap Score
    return 84; // Mock score
  };

  useEffect(() => {
    if (step === 3 && onComplete) {
      onComplete({
        scale,
        sector,
        score: calculateScore(),
      });
    }
  }, [step, scale, sector, onComplete]);

  return (
    <section id="diagnostic" className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-outfit font-bold text-white mb-4">Business Diagnostic</h2>
          <p className="text-white/60">Identify the friction points in your infrastructure in under 60 seconds.</p>
        </div>

        <div className="glass-card rounded-[2rem] p-8 md:p-12 min-h-[500px] flex flex-col justify-center relative overflow-hidden">
          {/* Progress Indicator */}
          <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
            <motion.div 
              className="h-full bg-brand-primary shadow-[0_0_10px_rgba(0,242,255,0.8)]"
              animate={{ width: `${(step / 3) * 100}%` }}
            />
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-8"
              >
                <div className="text-center">
                  <span className="text-brand-primary font-bold tracking-widest text-xs uppercase">Step 01</span>
                  <h3 className="text-3xl font-outfit font-bold text-white mt-2">What is your current scale?</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {scales.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => { setScale(item.id); setStep(2); }}
                      className={`flex items-center gap-4 p-6 rounded-2xl border transition-all duration-300 ${
                        scale === item.id 
                        ? 'bg-brand-primary/20 border-brand-primary shadow-[0_0_20px_rgba(0,242,255,0.2)]' 
                        : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
                      }`}
                    >
                      <div className={`p-3 rounded-xl ${scale === item.id ? 'bg-brand-primary text-brand-obsidian' : 'bg-white/5 text-brand-primary'}`}>
                        {item.icon}
                      </div>
                      <span className="text-lg font-medium text-white">{item.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-8"
              >
                <div className="text-center">
                  <span className="text-brand-violet font-bold tracking-widest text-xs uppercase">Step 02</span>
                  <h3 className="text-3xl font-outfit font-bold text-white mt-2">Which sector do you operate in?</h3>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {sectors.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => { setSector(item.id); setStep(3); }}
                      className={`flex flex-col items-center gap-4 p-6 rounded-2xl border transition-all duration-300 text-center ${
                        sector === item.id 
                        ? 'bg-brand-violet/20 border-brand-violet shadow-[0_0_20px_rgba(139,92,246,0.2)]' 
                        : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
                      }`}
                    >
                      <div className={`p-4 rounded-full ${sector === item.id ? 'bg-brand-violet text-white' : 'bg-white/5 text-brand-violet'}`}>
                        {item.icon}
                      </div>
                      <span className="text-sm font-medium text-white">{item.label}</span>
                    </button>
                  ))}
                </div>
                
                <button onClick={() => setStep(1)} className="text-white/40 hover:text-white text-xs block mx-auto underline uppercase tracking-widest">Go Back</button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-center space-y-8"
              >
                <div className="w-24 h-24 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <CheckCircle2 className="w-12 h-12 text-brand-primary" />
                  <motion.div 
                    className="absolute inset-0 border-2 border-brand-primary rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                
                <div>
                  <h3 className="text-4xl font-outfit font-bold text-white mb-2">Analysis Complete</h3>
                  <p className="text-white/60">Your infrastructure has a friction gap of:</p>
                </div>

                <div className="text-7xl font-outfit font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
                  {calculateScore()}%
                </div>

                <div className="glass-card-violet p-6 rounded-2xl max-w-md mx-auto text-sm text-white/80 leading-relaxed italic">
                  "Based on your {sector} focus at {scale} scale, you are likely losing 12-15 hours weekly to preventable sync errors."
                </div>

                <button 
                  onClick={() => {
                    let mappedSize = '1-10';
                    if (scale === 'growth') mappedSize = '11-50';
                    else if (scale === 'enterprise') mappedSize = '50+';
                    
                    const url = new URL(window.location.href);
                    url.pathname = '/';
                    url.search = `?page=apply&size=${mappedSize}&sector=${sector}&score=${calculateScore()}`;
                    window.history.pushState({}, '', url.toString());
                    window.dispatchEvent(new Event('popstate'));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white text-brand-obsidian px-10 py-4 rounded-full font-bold hover:bg-brand-primary transition-colors flex items-center gap-3 mx-auto"
                >
                  Get My Full Audit RoadMap
                  <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
