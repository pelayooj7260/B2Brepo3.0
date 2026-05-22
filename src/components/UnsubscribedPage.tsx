import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, Mail, ArrowRight, RefreshCw, Undo2 } from 'lucide-react';

export default function UnsubscribedPage() {
  const [resubscribed, setResubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleResubscribe = async () => {
    setIsSubmitting(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    setResubscribed(true);
    setIsSubmitting(false);
  };

  const handleGoHome = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = new URL(window.location.href);
    url.pathname = '/';
    url.searchParams.delete('page');
    window.history.pushState({}, '', url.toString());
    window.dispatchEvent(new Event('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative text-white font-sans selection:bg-brand-primary/30 selection:text-brand-primary min-h-[90vh] flex items-center justify-center px-6 py-20 overflow-hidden">
      <Helmet>
        <title>Unsubscribed | Thorne</title>
        <meta name="description" content="You have unsubscribed from Thorne Systems communications." />
      </Helmet>

      {/* Decorative Glow Orbs */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.08),transparent_60%)] pointer-events-none" />
      <div className="absolute top-[20%] left-[15%] w-72 h-72 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[20%] right-[15%] w-96 h-96 bg-brand-secondary/5 rounded-full blur-3xl pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }} />

      <div className="max-w-md w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card p-10 rounded-[2.5rem] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
        >
          {/* Subtle Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-secondary to-brand-primary" />

          <div className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-brand-secondary/10 border border-brand-secondary/30 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.2)]">
              <Mail className="w-8 h-8 text-brand-secondary" />
            </div>

            <h1 className="text-3xl font-outfit font-extrabold tracking-tight text-white">
              {resubscribed ? 'PROTOCOL ACTIVE' : 'UNSUBSCRIBED'}
            </h1>

            <p className="text-sm text-white/60 font-light leading-relaxed">
              {resubscribed 
                ? 'Your transmission link has been restored. You will continue to receive operational updates and infrastructure intelligence.'
                : 'Your email has been successfully removed from Thorne Systems automated distribution lists. No further communication will be transmitted.'
              }
            </p>

            <div className="w-full h-[1px] bg-white/5 my-6" />

            <div className="space-y-4">
              {!resubscribed ? (
                <button
                  onClick={handleResubscribe}
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl font-bold font-outfit uppercase tracking-wider text-xs md:text-sm bg-white/5 text-white border border-white/15 hover:bg-white/10 hover:border-white/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-brand-secondary" />
                      Reconnecting...
                    </>
                  ) : (
                    <>
                      <Undo2 className="w-4 h-4 text-brand-secondary" />
                      Oops, Resubscribe
                    </>
                  )}
                </button>
              ) : (
                <div className="w-full py-4 rounded-2xl font-bold font-outfit uppercase tracking-wider text-xs md:text-sm bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  Subscription Restored
                </div>
              )}

              <button
                onClick={handleGoHome}
                className="w-full py-4 rounded-2xl font-bold font-outfit uppercase tracking-wider text-xs md:text-sm bg-brand-primary text-brand-obsidian hover:shadow-[0_0_25px_rgba(0,242,255,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
              >
                Return to Base
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
