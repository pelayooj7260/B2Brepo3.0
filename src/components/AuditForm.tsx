import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ArrowRight, ArrowLeft } from 'lucide-react';
import { submitAuditRequest, type AuditRequest } from '../lib/submitForm';
import { AnimatedButton } from './ui/AnimatedButton';

export default function AuditForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<AuditRequest>({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleNext = () => setStep(s => s + 1);
  const handlePrev = () => setStep(s => s - 1);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      handleNext();
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await submitAuditRequest(formData);
      setSubmitStatus('success');
      setStep(4);
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formVariants: any = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } }
  };

  return (
    <section id="audit-form" className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-[#F4F1EB] mb-6"
          >
            Let's start the conversation
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-[#F4F1EB]/70 leading-relaxed font-light"
          >
            Share a bit about your business. We'll review and get back to you within 48 hours.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-xl border border-[#34D399]/20 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden min-h-[400px]"
        >
          <form onSubmit={handleSubmit} className="flex flex-col h-full justify-between">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" variants={formVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8 flex-1">
                  <h3 className="text-2xl font-bold text-[#F4F1EB] mb-6">First, who are we speaking with?</h3>
                  <div>
                    <label htmlFor="name" className="block text-lg text-[#F4F1EB]/80 mb-3 font-light">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-6 py-4 bg-[#0B192C]/50 border border-[#34D399]/30 rounded-xl text-white text-lg focus:outline-none focus:border-[#34D399] transition-colors focus:bg-[#0B192C]"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-lg text-[#F4F1EB]/80 mb-3 font-light">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-6 py-4 bg-[#0B192C]/50 border border-[#34D399]/30 rounded-xl text-white text-lg focus:outline-none focus:border-[#34D399] transition-colors focus:bg-[#0B192C]"
                      placeholder="jane@company.com"
                    />
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" variants={formVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8 flex-1">
                  <h3 className="text-2xl font-bold text-[#F4F1EB] mb-6">What team are you representing?</h3>
                  <div>
                    <label htmlFor="company" className="block text-lg text-[#F4F1EB]/80 mb-3 font-light">Company Name</label>
                    <input
                      type="text"
                      id="company"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-6 py-4 bg-[#0B192C]/50 border border-[#34D399]/30 rounded-xl text-white text-lg focus:outline-none focus:border-[#34D399] transition-colors focus:bg-[#0B192C]"
                      placeholder="Acme Corp."
                    />
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" variants={formVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8 flex-1">
                  <h3 className="text-2xl font-bold text-[#F4F1EB] mb-6">What's slowing you down?</h3>
                  <div>
                    <label htmlFor="message" className="block text-lg text-[#F4F1EB]/80 mb-3 font-light">Tell us about your situation</label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-6 py-4 bg-[#0B192C]/50 border border-[#34D399]/30 rounded-xl text-white text-lg focus:outline-none focus:border-[#34D399] transition-colors focus:bg-[#0B192C] resize-none"
                      placeholder="What processes feel manual? What tools form your current stack?"
                    />
                  </div>
                </motion.div>
              )}

              {step === 4 && submitStatus === 'success' && (
                <motion.div key="success" variants={formVariants} initial="hidden" animate="visible" className="flex-1 flex flex-col items-center justify-center text-center space-y-6 py-10">
                  <div className="w-20 h-20 bg-[#34D399]/20 rounded-full flex items-center justify-center text-[#34D399] mb-4 shadow-[0_0_30px_rgba(52,211,153,0.3)]">
                    <Send className="w-10 h-10 ml-1" />
                  </div>
                  <h3 className="text-3xl font-bold text-[#F4F1EB]">Message Received</h3>
                  <p className="text-lg text-[#F4F1EB]/70 font-light">
                    Thank you. We will review your workflows and reply within 48 hours.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {step < 4 && (
              <div className="mt-12 flex items-center justify-between pt-6 border-t border-[#34D399]/20">
                {step > 1 ? (
                  <button type="button" onClick={handlePrev} className="text-[#F4F1EB]/60 hover:text-[#34D399] font-medium transition-colors flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                ) : (
                  <div></div>
                )}
                
                <AnimatedButton 
                  type="submit" 
                  disabled={isSubmitting} 
                  variant="primary" 
                  icon={step === 3 ? <Send className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                >
                  {isSubmitting ? 'Sending...' : step === 3 ? 'Send Details' : 'Continue'}
                </AnimatedButton>
              </div>
            )}
            
            {submitStatus === 'error' && step < 4 && (
               <p className="text-red-400 mt-4 text-center">Something went wrong. Please try again.</p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
