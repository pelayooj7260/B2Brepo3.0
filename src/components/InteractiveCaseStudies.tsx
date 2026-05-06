import { motion } from 'framer-motion';
import { ArrowRight, ClipboardList, Zap, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function InteractiveCaseStudies() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-brand-primary font-bold tracking-[0.3em] text-xs uppercase">The Evolution</span>
          <h2 className="text-4xl md:text-5xl font-outfit font-extrabold text-white mt-4">The Automation Advantage</h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch max-w-5xl mx-auto relative">
          {/* Background Decorative Line */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent hidden lg:block" />

          {/* Manual Workflow */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex-1 bg-[#1A1A1A] border border-white/5 rounded-[2.5rem] p-10 flex flex-col relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-white/40 mb-8 border border-white/10 group-hover:border-red-500/20 group-hover:text-red-400 transition-all">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-outfit font-bold text-white mb-6">Manual Chaos</h3>
            <ul className="space-y-6">
              {[
                "Hours lost to CSV exports",
                "High risk of data pollution",
                "Siloed communication",
                "Static, outdated reporting"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-white/40 font-light text-sm italic">
                   <div className="w-1.5 h-1.5 rounded-full bg-red-500/30 mt-1.5" />
                   {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Middle Transition Element */}
          <div className="flex flex-col items-center justify-center py-4 lg:py-0 z-10">
            <div className="w-12 h-12 rounded-full bg-brand-primary/20 backdrop-blur-xl border border-brand-primary/30 flex items-center justify-center text-brand-primary shadow-[0_0_20px_rgba(0,242,255,0.3)]">
              <ArrowRight className="w-6 h-6" />
            </div>
          </div>

          {/* Automated Solution */}
          <motion.div 
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="flex-1 glass-card-cyan rounded-[2.5rem] p-10 flex flex-col relative overflow-hidden shadow-[0_30px_60px_rgba(0,242,255,0.1)] transition-all duration-500"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-primary/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="w-14 h-14 bg-brand-primary/20 rounded-2xl flex items-center justify-center text-brand-primary mb-8 border border-brand-primary/30 relative z-10">
              <Zap className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-outfit font-bold text-white mb-6 relative z-10">Autonomous Harmony</h3>
            <ul className="space-y-6 relative z-10">
              {[
                "Real-time ecosystem syncing",
                "100% precision, zero errors",
                "Unified command center",
                "Predictive analytics flow"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-white font-medium text-sm">
                   <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0" />
                   {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
