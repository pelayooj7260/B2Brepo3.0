import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertTriangle } from 'lucide-react';
import { submitPricingAuditRequest, type PricingAuditRequest } from '../lib/submitForm';
import { trackFormSubmission } from '../lib/analytics';

interface AuditPricingFormProps {
  selectedTier?: string;
  selectedSize: string; // '1-10' | '11-50' | '50+'
  onSizeChange: (size: string) => void;
  availablePainPoints: string[];
}

export default function AuditPricingForm({
  selectedTier = '',
  selectedSize,
  onSizeChange,
  availablePainPoints
}: AuditPricingFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [currentTools, setCurrentTools] = useState('');
  const [selectedPainPoints, setSelectedPainPoints] = useState<string[]>([]);
  const [customPainPoint, setCustomPainPoint] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Track submission timing
  const renderTimeRef = React.useRef<number>(Date.now());

  useEffect(() => {
    renderTimeRef.current = Date.now();
  }, []);

  const handlePainPointToggle = (point: string) => {
    setSelectedPainPoints(prev =>
      prev.includes(point) ? prev.filter(p => p !== point) : [...prev, point]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');
    setErrorMessage('');

    if (!selectedTier) {
      setStatus('error');
      setErrorMessage('Please select a pricing tier above before initiating the payment protocol.');
      setIsSubmitting(false);
      return;
    }

    const duration = Date.now() - renderTimeRef.current;
    
    // Combine checked pain points and any custom ones
    const finalPainPoints = [...selectedPainPoints];
    if (customPainPoint.trim()) {
      finalPainPoints.push(customPainPoint.trim());
    }

    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const payload = {
      name,
      firstName,
      lastName,
      email,
      company: company.trim(),
      businessSize: selectedSize,
      currentTools: currentTools.trim(),
      painPoints: finalPainPoints.join(', '),
      productType: 'Business Infrastructure Audit',
      selectedTier,
      source: 'audit_pricing'
    };

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to initiate secure checkout session.');
      }

      const { url } = await response.json();
      trackFormSubmission('success', duration, { businessSize: selectedSize, selectedTier });
      
      // Redirect browser directly to secure Stripe Checkout
      window.location.href = url;
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err.message || 'Failed to initialize secure payment. Please try again.');
      trackFormSubmission('error', duration, { businessSize: selectedSize, selectedTier, error: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="pricing-form-section" className="relative py-24 px-6 bg-brand-obsidian/40 border-t border-white/5">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-brand-primary font-bold tracking-[0.2em] text-xs uppercase font-mono">
            Request Audit
          </span>
          <h2 className="text-3xl md:text-4xl font-outfit font-extrabold text-white mt-3">
            Initiate Your Systems Audit
          </h2>
          <p className="text-white/60 mt-4 text-sm md:text-base">
            Select your details below. Our automation experts will analyze your stack and build your workflow roadmap.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-[2rem] p-8 md:p-12 relative overflow-hidden shadow-2xl border border-white/10"
        >
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 flex flex-col items-center justify-center space-y-6"
            >
              <div className="w-16 h-16 bg-brand-primary/20 rounded-full flex items-center justify-center text-brand-primary shadow-[0_0_20px_rgba(0,242,255,0.4)]">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-outfit font-bold text-white tracking-wide">
                AUDIT RECONNAISSANCE PROTOCOL INITIATED
              </h3>
              <p className="text-white/70 max-w-md mx-auto leading-relaxed">
                Thank you! Your infrastructure submission was successfully received. Our operations team is setting up your systems map draft. You will receive an email within 48-72 hours.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-6 text-brand-primary border border-brand-primary/30 hover:border-brand-primary px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300"
              >
                Submit Another Request
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Name */}
                <div>
                  <label htmlFor="p-name" className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2 font-mono">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="p-name"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="w-full px-5 py-3.5 bg-brand-obsidian/75 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-primary transition-all duration-300 font-sans"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="p-email" className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2 font-mono">
                    Business Email
                  </label>
                  <input
                    type="email"
                    id="p-email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="w-full px-5 py-3.5 bg-brand-obsidian/75 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-primary transition-all duration-300 font-sans"
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label htmlFor="p-company" className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2 font-mono">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="p-company"
                    required
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                    placeholder="Acme Corp"
                    className="w-full px-5 py-3.5 bg-brand-obsidian/75 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-primary transition-all duration-300 font-sans"
                  />
                </div>
              </div>

              {/* Business Size Select */}
              <div>
                <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-3 font-mono">
                  Business Size (Team Scale)
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { key: '1-10', label: '1 - 10 employees' },
                    { key: '11-50', label: '11 - 50 employees' },
                    { key: '50+', label: '50+ employees' }
                  ].map(item => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => onSizeChange(item.key)}
                      className={`py-3 px-4 rounded-xl border text-xs md:text-sm font-semibold tracking-wide transition-all duration-300 ${
                        selectedSize === item.key
                          ? 'border-brand-primary bg-brand-primary/10 text-brand-primary shadow-[0_0_15px_rgba(0,242,255,0.15)]'
                          : 'border-white/10 bg-brand-obsidian/50 text-white/60 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Type (Read-only Display) */}
              <div>
                <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2 font-mono">
                  Product Type
                </label>
                <input
                  type="text"
                  readOnly
                  value="Business Infrastructure Audit"
                  className="w-full px-5 py-3 bg-brand-obsidian/30 border border-white/5 rounded-xl text-brand-primary/80 font-mono text-sm focus:outline-none cursor-default"
                />
              </div>

              {/* Current Tools */}
              <div>
                <label htmlFor="p-tools" className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2 font-mono">
                  Current Tools in Use
                </label>
                <textarea
                  id="p-tools"
                  required
                  rows={2}
                  value={currentTools}
                  onChange={e => setCurrentTools(e.target.value)}
                  placeholder="e.g. HubSpot, Slack, Google Sheets, Gmail, Zapier..."
                  className="w-full px-5 py-3 bg-brand-obsidian/75 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-primary transition-all duration-300 resize-none font-sans"
                />
              </div>

              {/* Pain Points checkboxes */}
              <div>
                <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-3 font-mono">
                  Current Operational Bottlenecks (Select all that apply)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  {availablePainPoints.map((point, index) => {
                    const isSelected = selectedPainPoints.includes(point);
                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handlePainPointToggle(point)}
                        className={`flex items-center gap-3 p-3.5 rounded-xl border text-left text-xs md:text-sm transition-all duration-300 ${
                          isSelected
                            ? 'border-brand-primary bg-brand-primary/5 text-white'
                            : 'border-white/5 bg-brand-obsidian/20 text-white/60 hover:border-white/15'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all ${
                            isSelected
                              ? 'border-brand-primary bg-brand-primary'
                              : 'border-white/30 bg-transparent'
                          }`}
                        >
                          {isSelected && (
                            <svg className="w-2.5 h-2.5 text-brand-obsidian fill-current" viewBox="0 0 20 20">
                              <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                            </svg>
                          )}
                        </div>
                        <span className="truncate">{point}</span>
                      </button>
                    );
                  })}
                </div>
                {/* Custom Pain Point input */}
                <input
                  type="text"
                  value={customPainPoint}
                  onChange={e => setCustomPainPoint(e.target.value)}
                  placeholder="Other issues slowing you down..."
                  className="w-full px-5 py-3 bg-brand-obsidian/75 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-primary transition-all duration-300 text-sm font-sans"
                />
              </div>

              {/* Error Alert */}
              {status === 'error' && (
                <div className="flex items-center gap-3 p-4 bg-red-950/40 border border-red-500/20 text-red-300 rounded-xl text-sm font-medium">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 text-red-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-brand-primary text-brand-obsidian py-4 rounded-xl font-bold font-outfit uppercase tracking-wider flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_4px_20px_rgba(0,242,255,0.2)] ${
                    isSubmitting
                      ? 'opacity-60 cursor-not-allowed scale-100'
                      : 'hover:scale-[1.02] hover:shadow-[0_6px_25px_rgba(0,242,255,0.35)] active:scale-[0.98]'
                  }`}
                >
                  {isSubmitting ? (
                    'Redirecting to Stripe...'
                  ) : selectedTier ? (
                    <>
                      Proceed to Stripe Payment
                      <Send className="w-4 h-4 ml-1" />
                    </>
                  ) : (
                    <>
                      Select a Pricing Tier Above
                      <Send className="w-4 h-4 ml-1" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
