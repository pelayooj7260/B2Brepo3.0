import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    question: "How long does a typical integration take?",
    answer: "Most straightforward automated workflows can be designed, tested, and deployed within 2-4 weeks. More complex legacy system integrations may require an extended timeline, which we'll scope during our audit."
  },
  {
    question: "Do our existing tools need to change?",
    answer: "Not usually. We specialize in connecting the tools you already use (Salesforce, HubSpot, Stripe, Slack, etc.) via APIs and webhooks, creating a seamless background layer without disrupting your team's habits."
  },
  {
    question: "Is our data secure?",
    answer: "Absolutely. We employ enterprise-grade encryption and adhere to strict SOC2 compliance standards. Data passes securely between your applications; we don't store your sensitive customer records on our servers."
  },
  {
    question: "What if an API changes or breaks?",
    answer: "Our ongoing maintenance packages include proactive monitoring. If an endpoint deprecates or a webhook fails, our system alerts us immediately so we can apply a fix—often before you even notice."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-32 px-6 relative overflow-hidden bg-brand-obsidian">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-brand-primary font-bold tracking-[0.3em] text-xs uppercase">Knowledge Base</span>
          <h2 className="text-4xl md:text-5xl font-outfit font-extrabold text-white mt-4">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-[2rem] overflow-hidden group hover:border-brand-primary/30 transition-all"
            >
              <button 
                onClick={() => toggleOpen(index)}
                className="w-full text-left px-8 py-6 flex items-center justify-between focus:outline-none"
              >
                <span className="text-lg font-outfit font-bold text-white pr-8 group-hover:text-brand-primary transition-colors">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-brand-primary flex-shrink-0"
                >
                  <ChevronDown className="w-6 h-6" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-8 pb-8 text-white/50 font-light leading-relaxed border-t border-white/5 pt-6">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
