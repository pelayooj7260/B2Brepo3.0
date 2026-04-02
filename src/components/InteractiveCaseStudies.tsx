import { motion } from 'framer-motion';
import { ArrowRight, ClipboardList, Zap } from 'lucide-react';

export default function InteractiveCaseStudies() {
  return (
    <section className="py-24 px-6 relative z-10 bg-brand-bg/50 border-y border-brand-primary/10">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-brand-text mb-6">The Automation Advantage</h2>
          <p className="text-xl text-brand-text/70 font-light max-w-2xl mx-auto">
            See how your workflow evolves when you eliminate manual bottlenecks.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-[1fr,auto,1fr] gap-8 items-center max-w-5xl mx-auto">
          {/* Before */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-red-500/5 border border-red-500/20 rounded-3xl p-8 h-full flex flex-col"
          >
            <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-400 mb-6 border border-red-500/20">
              <ClipboardList className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-brand-text mb-4">Manual Workflow</h3>
            <ul className="space-y-4 text-brand-text/60 font-light mt-auto">
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span> Hours spent exporting/importing CSVs
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span> High probability of human error
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span> Siloed data across 5 different apps
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✗</span> Delayed reports holding up decisions
              </li>
            </ul>
          </motion.div>

          {/* Arrow */}
          <div className="hidden md:flex flex-col items-center justify-center text-brand-primary/50">
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <ArrowRight className="w-12 h-12 text-brand-primary drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
            </motion.div>
          </div>
          
          <div className="flex md:hidden justify-center text-brand-primary/50 my-4 transform rotate-90">
             <ArrowRight className="w-8 h-8 text-brand-primary" />
          </div>

          {/* After */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="glass-card rounded-3xl p-8 h-full relative overflow-hidden flex flex-col bg-glow border-brand-primary/50"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 blur-3xl rounded-full" />
            
            <div className="w-14 h-14 bg-brand-primary/20 rounded-2xl flex items-center justify-center text-brand-primary mb-6 border border-brand-primary/30 relative z-10">
              <Zap className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-brand-text mb-4 relative z-10">Automated Solution</h3>
            <ul className="space-y-4 text-brand-text/80 font-light mt-auto relative z-10">
              <li className="flex items-start gap-3">
                <span className="text-brand-primary mt-1">✓</span> Instant, real-time data syncing
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-primary mt-1">✓</span> 100% accuracy, zero manual entry
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-primary mt-1">✓</span> Single source of truth dashboard
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-primary mt-1">✓</span> Automated triggers and alerts
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
