import { useState, FormEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';
import { submitAuditRequest, type AuditRequest } from '../lib/submitForm';

interface AuditFormProps {
  prefilledDiagnostic?: {
    scale: string;
    sector: string;
    score: number;
  } | null;
}

export default function AuditForm({ prefilledDiagnostic }: AuditFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<AuditRequest>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: '',
    gdprConsent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Handle prefilled data
  useEffect(() => {
    if (prefilledDiagnostic) {
      setFormData(prev => ({
        ...prev,
        diagnosticData: prefilledDiagnostic
      }));
    }
  }, [prefilledDiagnostic]);

  const handleNext = () => setStep(s => s + 1);
  const handlePrev = () => setStep(s => s - 1);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      handleNext();
      return;
    }
    
    if (!formData.gdprConsent) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Include the diagnostic data in the final submission
      const submissionData = {
        ...formData,
        diagnosticData: prefilledDiagnostic || undefined,
        source: prefilledDiagnostic ? 'business_diagnostic' : 'audit_form'
      };

      await submitAuditRequest(submissionData);
      setSubmitStatus('success');
      setStep(4);
      setFormData({ 
        firstName: '', 
        lastName: '', 
        email: '', 
        company: '', 
        message: '', 
        gdprConsent: false 
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
  };

  return (
    <section id="audit-form" className="relative py-32 px-6 overflow-hidden bg-brand-obsidian">
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="mb-16 text-center">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-brand-primary font-bold tracking-[0.3em] text-xs uppercase"
          >
            Final Step
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-outfit font-extrabold text-white mt-4"
          >
            Initiate the Protocol
          </motion.h2>
          {prefilledDiagnostic && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-brand-primary/60 text-sm mt-4 font-mono uppercase tracking-widest"
            >
              Diagnostic Context Attached: {prefilledDiagnostic.score}% Friction detected
            </motion.p>
          )}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-[2.5rem] p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden min-h-[500px]"
        >
          <form onSubmit={handleSubmit} className="flex flex-col h-full justify-between">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" variants={formVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8 flex-1">
                  <h3 className="text-2xl font-outfit font-bold text-white mb-6 uppercase tracking-wider">01. Identity</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-3">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-6 py-4 bg-brand-obsidian/50 border border-white/10 rounded-2xl text-white text-lg focus:outline-none focus:border-brand-primary transition-all focus:bg-white/5"
                        placeholder="Jane"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-6 py-4 bg-brand-obsidian/50 border border-white/10 rounded-2xl text-white text-lg focus:outline-none focus:border-brand-primary transition-all focus:bg-white/5"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-6 py-4 bg-brand-obsidian/50 border border-white/10 rounded-2xl text-white text-lg focus:outline-none focus:border-brand-primary transition-all focus:bg-white/5"
                      placeholder="jane@company.com"
                    />
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" variants={formVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8 flex-1">
                  <h3 className="text-2xl font-outfit font-bold text-white mb-6 uppercase tracking-wider">02. Entity</h3>
                  <div>
                    <label htmlFor="company" className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Company Name</label>
                    <input
                      type="text"
                      id="company"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-6 py-4 bg-brand-obsidian/50 border border-white/10 rounded-2xl text-white text-lg focus:outline-none focus:border-brand-primary transition-all focus:bg-white/5"
                      placeholder="Acme Corp."
                    />
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" variants={formVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8 flex-1">
                  <h3 className="text-2xl font-outfit font-bold text-white mb-6 uppercase tracking-wider">03. Context</h3>
                  <div>
                    <label htmlFor="message" className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Describe the friction</label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-6 py-4 bg-brand-obsidian/50 border border-white/10 rounded-2xl text-white text-lg focus:outline-none focus:border-brand-primary transition-all focus:bg-white/5 resize-none"
                      placeholder="What manual processes are slowing you down?"
                    />
                  </div>

                  <div className="pt-4">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative mt-1">
                        <input
                          type="checkbox"
                          required
                          checked={formData.gdprConsent}
                          onChange={(e) => setFormData({ ...formData, gdprConsent: e.target.checked })}
                          className="peer sr-only"
                        />
                        <div className="w-5 h-5 border-2 border-white/20 rounded peer-checked:border-brand-primary peer-checked:bg-brand-primary transition-all" />
                        <ShieldCheck className="absolute inset-0 w-5 h-5 text-brand-obsidian opacity-0 peer-checked:opacity-100 transition-opacity" />
                      </div>
                      <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
                        I agree to the processing of my personal data for the purpose of generating the Audit Roadmap and receiving related communication.
                      </span>
                    </label>
                  </div>
                </motion.div>
              )}

              {step === 4 && submitStatus === 'success' && (
                <motion.div key="success" variants={formVariants} initial="hidden" animate="visible" className="flex-1 flex flex-col items-center justify-center text-center space-y-6 py-10">
                  <div className="w-20 h-20 bg-brand-primary/20 rounded-full flex items-center justify-center text-brand-primary mb-4 shadow-[0_0_30px_rgba(0,242,255,0.3)]">
                    <Send className="w-10 h-10 ml-1" />
                  </div>
                  <h3 className="text-3xl font-outfit font-bold text-white uppercase tracking-wider">Protocol Initialized</h3>
                  <p className="text-white/60 font-light">
                    Thank you. Your request has been forwarded to our automation engine. A specialist will review your infrastructure map and reply within 48 hours.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {step < 4 && (
              <div className="mt-12 flex items-center justify-between pt-8 border-t border-white/5">
                {step > 1 ? (
                  <button type="button" onClick={handlePrev} className="text-white/40 hover:text-white font-bold text-xs uppercase tracking-widest transition-colors flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                ) : (
                  <div></div>
                )}
                
                <button 
                  type="submit" 
                  disabled={isSubmitting || (step === 3 && !formData.gdprConsent)} 
                  className={`bg-brand-primary text-brand-obsidian px-10 py-4 rounded-full font-bold transition-all flex items-center gap-3 shadow-[0_0_20px_rgba(0,242,255,0.2)] ${
                    (isSubmitting || (step === 3 && !formData.gdprConsent)) ? 'opacity-50 cursor-not-allowed grayscale' : 'hover:scale-105 active:scale-95'
                  }`}
                >
                  {isSubmitting ? 'Processing...' : step === 3 ? 'Finalize Protocol' : 'Next Step'}
                  {step < 3 && <ArrowRight className="w-5 h-5" />}
                  {step === 3 && <Send className="w-5 h-5" />}
                </button>
              </div>
            )}
            
            {submitStatus === 'error' && step < 4 && (
               <p className="text-red-400 mt-4 text-center text-xs font-bold uppercase tracking-widest">Protocol Failure. Please Retry.</p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
