import { motion } from 'framer-motion';
import { GlassCard } from './ui/GlassCard';
import { Zap, Clock, TrendingUp } from 'lucide-react';

export default function ServiceOffering() {
  return (
    <section id="benefits" className="relative py-32 px-6 overflow-hidden bg-gradient-to-b from-transparent to-[#0B192C]">
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-20 space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#34D399]/5 border border-[#34D399]/20 text-[#34D399] font-medium text-sm"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34D399] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#34D399]"></span>
            </span>
            Automation Audit
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold text-[#F4F1EB] leading-tight">
            Clear Roadmaps. <br />
            <span className="text-[#34D399] font-light">Zero Guesswork.</span>
          </h2>
          <p className="text-xl text-[#F4F1EB]/70 max-w-2xl mx-auto font-light leading-relaxed">
            Before any commitment, we review your current workflows and identify specific opportunities where automation could elegantly save time.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Clock,
              title: "Time Recovered",
              description: "Identify exactly where your team is losing the most time to manual processes and repetitive tasks.",
              delay: 0.1
            },
            {
              icon: Zap,
              title: "Realistic Candidates",
              description: "Pinpoint which workflows are actually realistic candidates for automation vs what needs human touch.",
              delay: 0.3
            },
            {
              icon: TrendingUp,
              title: "Implementation Path",
              description: "Get a practical roadmap for implementation without pressure or a sales pitch.",
              delay: 0.5
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: feature.delay, duration: 0.8, ease: "easeOut" }}
              className="h-full"
            >
              <GlassCard className="h-full flex flex-col items-start group">
                <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-[#34D399]/10 to-transparent border border-[#34D399]/20 text-[#34D399] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#F4F1EB] mb-3">{feature.title}</h3>
                <p className="text-[#F4F1EB]/60 font-light leading-relaxed group-hover:text-[#F4F1EB]/80 transition-colors duration-300">
                  {feature.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
