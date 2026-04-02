import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote: "The manual data entry that used to take our team 15 hours a week is now completely automated. It's like we hired a new full-time employee.",
    author: "Sarah Jenkins",
    role: "VP of Operations, NovaTech"
  },
  {
    quote: "Before this integration, our sales and support data lived in disparate silos. The unified dashboard has transformed how we serve our clients.",
    author: "Marcus Rivera",
    role: "Director of Sales, Apex Dynamics"
  },
  {
    quote: "Sleek, incredibly fast, and reliable. Bringing our legacy systems into a modern SaaS architecture was the best decision we made this year.",
    author: "Emily Chen",
    role: "CTO, Synergy Web"
  }
];

export default function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % TESTIMONIALS.length);
  const prev = () => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section className="py-24 px-6 relative z-10">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-brand-text mb-4 text-glow">Don't just take our word for it</h2>
          <p className="text-xl text-brand-text/70 font-light">See how we're transforming operations across industries.</p>
        </motion.div>

        <div className="relative w-full glass-card rounded-3xl p-8 md:p-14 min-h-[300px] flex items-center justify-center">
          <Quote className="absolute top-8 left-8 w-12 h-12 text-brand-primary/20" />
          
          <div className="w-full relative flex items-center">
            <button onClick={prev} className="absolute left-0 -ml-4 md:-ml-8 p-2 rounded-full border border-brand-primary/30 text-brand-primary hover:bg-brand-primary/10 transition-colors z-20">
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="w-full overflow-hidden px-8 md:px-12 text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center"
                >
                  <p className="text-lg md:text-2xl text-brand-text/90 leading-relaxed font-light mb-8 max-w-2xl">
                    "{TESTIMONIALS[index].quote}"
                  </p>
                  <div>
                    <h4 className="text-brand-primary font-semibold text-lg">{TESTIMONIALS[index].author}</h4>
                    <p className="text-brand-text/50 text-sm tracking-wide">{TESTIMONIALS[index].role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <button onClick={next} className="absolute right-0 -mr-4 md:-mr-8 p-2 rounded-full border border-brand-primary/30 text-brand-primary hover:bg-brand-primary/10 transition-colors z-20">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
