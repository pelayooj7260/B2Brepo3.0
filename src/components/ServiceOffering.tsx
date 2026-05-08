import { motion } from 'framer-motion';
import { Zap, Clock, Layers, MousePointer2, ShieldCheck } from 'lucide-react';

export default function ServiceOffering() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="benefits" className="relative py-32 px-6 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-20 space-y-4">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-brand-primary font-bold tracking-[0.3em] text-xs uppercase"
          >
            Our Methodology
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-outfit font-extrabold text-white leading-tight">
            Clear Roadmaps. <br />
            <span className="text-brand-primary">Zero Guesswork.</span>
          </h2>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-6 h-full md:h-[600px]"
        >
          {/* Large Main Feature */}
          <motion.div variants={itemVariants} className="md:col-span-3 md:row-span-2 glass-card-cyan p-10 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-brand-primary/20 flex items-center justify-center mb-8 border border-brand-primary/30 group-hover:rotate-12 transition-transform">
                <Layers className="w-8 h-8 text-brand-primary" />
              </div>
              <h3 className="text-3xl font-outfit font-bold text-white mb-4">Deep Infrastructure Audit</h3>
              <p className="text-white/60 leading-relaxed max-w-sm">
                We go beyond surface-level tasks. Our team maps every data flow and API call to find systemic inefficiencies you didn't know existed.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-3 text-brand-primary text-sm font-bold uppercase tracking-widest">
              Explore the Audit <MousePointer2 className="w-4 h-4 animate-bounce" />
            </div>
          </motion.div>

          {/* Side Feature 1 */}
          <motion.div variants={itemVariants} className="md:col-span-3 md:row-span-1 glass-card p-8 flex gap-6 group">
            <div className="shrink-0 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-brand-primary/10 transition-colors">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-outfit font-bold text-white mb-2">Time Recovery Analysis</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Pinpoint exactly where your team loses hours to repetitive entry and manual syncs.
              </p>
            </div>
          </motion.div>

          {/* Side Feature 2 */}
          <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1 glass-card-violet p-6 flex flex-col items-center justify-center text-center group">
             <Zap className="w-10 h-10 text-brand-violet mb-4 group-hover:scale-125 transition-transform" />
             <h3 className="text-sm font-outfit font-bold text-white uppercase tracking-widest">Rapid Prototyping</h3>
          </motion.div>

          {/* Side Feature 3 */}
          <motion.div variants={itemVariants} className="md:col-span-2 md:row-span-1 glass-card p-8 flex gap-6 group">
            <div className="shrink-0 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-brand-secondary/10 transition-colors">
              <ShieldCheck className="w-6 h-6 text-brand-secondary" />
            </div>
            <div>
              <h3 className="text-xl font-outfit font-bold text-white mb-2">Ironclad Security</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Data encryption and RLS protocols at every layer.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
