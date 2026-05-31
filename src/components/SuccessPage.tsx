import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, ChevronRight, Calendar, ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function SuccessPage() {
  const [tier, setTier] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setTier(params.get('tier') || '');
    setEmail(params.get('email') || '');
  }, []);

  const navigateToHome = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = new URL(window.location.href);
    url.pathname = '/';
    url.search = '';
    window.history.pushState({}, '', url.toString());
    window.dispatchEvent(new Event('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getTierDisplayName = (tierId: string) => {
    switch (tierId.toLowerCase()) {
      case 'starter':
        return 'Starter Audit ($249)';
      case 'full':
        return 'Full Infrastructure Audit ($499)';
      case 'enterprise':
        return 'Enterprise Audit ($1200)';
      default:
        return 'Transformation Systems Audit';
    }
  };

  return (
    <div className="relative min-h-screen text-white font-sans selection:bg-brand-primary/30 selection:text-brand-primary flex flex-col justify-between overflow-hidden">
      <Helmet>
        <title>Audit Initialized | Thorne</title>
        <meta name="description" content="Thank you for request. Your systems audit protocol has been initialized securely." />
      </Helmet>

      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,255,0.05),transparent_60%)] pointer-events-none" />

      {/* Main Content Card Container */}
      <div className="flex-1 flex items-center justify-center p-6 pt-32 pb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 180 }}
          className="glass-card rounded-[2.5rem] border border-brand-primary/30 max-w-xl w-full p-8 md:p-12 text-center relative overflow-hidden shadow-[0_0_80px_rgba(0,242,255,0.2)]"
        >
          {/* Top Decorative Line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-primary to-transparent" />
          
          <div className="flex flex-col items-center space-y-6">
            {/* Shield Icon with Orbit Dashed Ring */}
            <div className="relative">
              <div className="w-20 h-20 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary shadow-[0_0_40px_rgba(0,242,255,0.3)] border border-brand-primary/20">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-2 border border-dashed border-brand-primary/30 rounded-full pointer-events-none"
              />
            </div>

            {/* Title */}
            <div className="space-y-2">
              <span className="text-brand-primary font-mono text-xs uppercase tracking-[0.3em] font-bold">
                System Protocol Active
              </span>
              <h2 className="text-3xl md:text-4xl font-outfit font-extrabold text-white uppercase tracking-wider leading-none">
                Audit Initialized
              </h2>
            </div>

            <p className="text-sm text-white/60 leading-relaxed max-w-md font-light">
              Thank you! Your payment was verified securely. Our operations engine has spun up your reconnaissance workspace.
            </p>

            {/* Recipt Summary Table */}
            <div className="w-full bg-brand-obsidian/70 border border-white/5 rounded-2xl p-5 text-left space-y-3 font-sans">
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/40 uppercase tracking-widest font-mono">Tier Type</span>
                <span className="text-brand-primary font-bold uppercase tracking-wider font-mono">
                  {getTierDisplayName(tier)}
                </span>
              </div>
              <div className="w-full h-[1px] bg-white/5" />
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/40 uppercase tracking-widest font-mono">Contact Email</span>
                <span className="text-white font-medium truncate max-w-[200px]">{email || 'N/A'}</span>
              </div>
              <div className="w-full h-[1px] bg-white/5" />
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/40 uppercase tracking-widest font-mono">Estimated Turnaround</span>
                <span className="text-brand-secondary font-bold font-mono">3–7 Business Days</span>
              </div>
            </div>

            {/* Next Steps Box */}
            <div className="flex items-start gap-3 text-left bg-brand-primary/5 border border-brand-primary/10 rounded-xl p-4 text-xs text-white/80 leading-relaxed w-full">
              <Sparkles className="w-4 h-4 text-brand-primary flex-shrink-0 mt-0.5 animate-pulse" />
              <div>
                <span className="font-bold text-white block mb-0.5">What happens next?</span>
                An operational setup briefing has been generated. We will coordinate your dashboard generation and reach out via email.
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 w-full pt-4">
              <a
                href="https://calendly.com/ojpadvertisement/appointment-demo"
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 bg-brand-primary text-brand-obsidian rounded-2xl font-bold font-outfit uppercase tracking-wider text-xs md:text-sm text-center shadow-[0_0_20px_rgba(0,242,255,0.25)] hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Schedule Audit Alignment Call
              </a>
              <a
                href="/"
                onClick={navigateToHome}
                className="w-full py-3.5 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Return to Portal
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
