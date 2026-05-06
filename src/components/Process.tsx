import { motion } from 'framer-motion';

export default function Process() {
  const steps = [
    {
      number: '01',
      title: 'Initiate the Scan',
      description: "Submit your business profile. Our initial triage identifies high-impact friction points in your current workflow."
    },
    {
      number: '02',
      title: 'Architectural Review',
      description: "We deep-dive into your existing tools. No fluff—just a raw look at what's broken and what's scalable."
    },
    {
      number: '03',
      title: 'Strategic Sync',
      description: "A high-level session to align our proposed automation roadmap with your 12-month growth targets."
    },
    {
      number: '04',
      title: 'System Deployment',
      description: "We deliver a comprehensive audit and transition plan. You get the blueprint to a frictionless infrastructure."
    }
  ];

  return (
    <section id="how-it-works" className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-brand-secondary font-bold tracking-[0.3em] text-xs uppercase"
          >
            The Thorne Protocol
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-outfit font-extrabold text-white mt-4">
            Four Steps to <span className="text-brand-secondary">Zero Friction</span>
          </h2>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-primary via-brand-secondary to-transparent hidden md:block" />

          <div className="space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row items-center gap-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className={`flex-1 w-full ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <h3 className="text-2xl font-outfit font-bold text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-white/50 leading-relaxed max-w-md mx-auto md:mx-0">
                    {step.description}
                  </p>
                </div>

                <div className="relative shrink-0 z-10">
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-sm bg-brand-obsidian ${
                    index % 2 === 0 ? 'border-brand-primary text-brand-primary shadow-[0_0_15px_rgba(0,242,255,0.3)]' : 'border-brand-secondary text-brand-secondary shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                  }`}>
                    {step.number}
                  </div>
                </div>

                <div className="flex-1 w-full hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
