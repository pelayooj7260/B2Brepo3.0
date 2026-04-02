import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp } from 'lucide-react';

export default function ROICalculator() {
  const [employees, setEmployees] = useState(5);
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const [hourlyRate, setHourlyRate] = useState(45);
  const [savings, setSavings] = useState(0);

  useEffect(() => {
    // Calculate yearly cost of manual labor
    const weeklyCost = employees * hoursPerWeek * hourlyRate;
    const yearlyCost = weeklyCost * 52;
    // Assume Thorne's automation eliminates 90% of manual data entry
    setSavings(yearlyCost * 0.9);
  }, [employees, hoursPerWeek, hourlyRate]);

  return (
    <section className="py-24 px-6 relative z-10 border-y border-brand-primary/10 bg-brand-bg">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary mb-6 border border-brand-primary/20"
          >
            <Calculator className="w-4 h-4" />
            <span className="text-sm font-medium uppercase tracking-wider">ROI Calculator</span>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold text-brand-text mb-4 text-glow">
            Quantify Your Leaks
          </h2>
          <p className="text-xl text-brand-text/70 font-light max-w-2xl mx-auto">
            See exactly how much revenue you're bleeding to manual processes every year.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Sliders Container */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-8 md:p-10 space-y-10"
          >
            <div>
              <div className="flex justify-between mb-4">
                <label className="text-brand-text/80 font-medium font-light">Team Size (Employees)</label>
                <span className="text-brand-primary font-bold">{employees}</span>
              </div>
              <input 
                type="range" 
                min="1" max="100" 
                value={employees} 
                onChange={(e) => setEmployees(Number(e.target.value))}
                className="w-full accent-brand-primary h-2 bg-brand-bg rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between mb-4">
                <label className="text-brand-text/80 font-medium font-light">Manual Hours Per Week</label>
                <span className="text-brand-primary font-bold">{hoursPerWeek} hrs</span>
              </div>
              <input 
                type="range" 
                min="1" max="40" 
                value={hoursPerWeek} 
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                className="w-full accent-brand-primary h-2 bg-brand-bg rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between mb-4">
                <label className="text-brand-text/80 font-medium font-light">Average Hourly Rate</label>
                <span className="text-brand-primary font-bold">${hourlyRate}/hr</span>
              </div>
              <input 
                type="range" 
                min="15" max="150" step="5"
                value={hourlyRate} 
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full accent-brand-primary h-2 bg-brand-bg rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </motion.div>

          {/* Results Container */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-full w-full rounded-3xl p-8 md:p-12 flex flex-col justify-center overflow-hidden bg-brand-secondary/5 border border-brand-primary/20 bg-glow"
          >
             <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 blur-[100px] rounded-full pointer-events-none" />
             
             <h3 className="text-brand-text/60 text-xl font-light mb-2 relative z-10 text-center md:text-left">
               Potential Yearly Savings
             </h3>
             <motion.div 
               key={savings}
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ type: "spring", stiffness: 200, damping: 20 }}
               className="text-5xl md:text-7xl font-bold text-brand-primary tracking-tight mb-6 relative z-10 text-center md:text-left"
             >
               ${savings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
             </motion.div>

             <div className="mt-8 pt-8 border-t border-brand-primary/20 relative z-10">
               <div className="flex items-start gap-4">
                 <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary flex-shrink-0 mt-1">
                   <TrendingUp className="w-5 h-5" />
                 </div>
                 <p className="text-brand-text/80 font-light leading-relaxed">
                   Based on eliminating 90% of repetitive data entry, syncing, and report generation through our automated pipelines.
                 </p>
               </div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
