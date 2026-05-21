import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  Check, 
  HelpCircle, 
  ChevronDown, 
  ArrowRight, 
  FileText, 
  Network, 
  Activity, 
  Clock, 
  ShieldAlert, 
  Compass 
} from 'lucide-react';
import { getPageVersion } from '../data/auditPricingPage';
import { trackCTAClick, useScrollDepthTracker } from '../lib/analytics';
import AuditPricingForm from './AuditPricingForm';

// Mapping icons to string titles dynamically
const getDeliverableIcon = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes('map')) return <Network className="w-6 h-6 text-brand-primary" />;
  if (t.includes('api')) return <Activity className="w-6 h-6 text-brand-primary" />;
  if (t.includes('time')) return <Clock className="w-6 h-6 text-brand-primary" />;
  if (t.includes('risk') || t.includes('failure')) return <ShieldAlert className="w-6 h-6 text-brand-primary" />;
  if (t.includes('road') || t.includes('roadmap')) return <Compass className="w-6 h-6 text-brand-primary" />;
  return <FileText className="w-6 h-6 text-brand-primary" />;
};

export default function AuditPricingPage() {
  const [cmsVersion, setCmsVersion] = useState<'1.0' | '1.1'>('1.0');
  const [businessSize, setBusinessSize] = useState<string>('1-10'); // '1-10' | '11-50' | '50+'
  const [selectedTier, setSelectedTier] = useState<string>('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Activate scroll tracking hook
  useScrollDepthTracker('Business Infrastructure Audit Pricing Page');

  // Sync CMS version from query parameter if present
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const v = params.get('v');
    if (v === '1.0' || v === '1.1') {
      setCmsVersion(v as '1.0' | '1.1');
    }
  }, []);

  // Retrieve current version content from the CMS file
  const pageData = getPageVersion(cmsVersion);

  const handleCmsChange = (ver: '1.0' | '1.1') => {
    setCmsVersion(ver);
    trackCTAClick(`cms_version_switch_${ver}`, { targetVersion: ver });
    // Update URL query parameters silently
    const url = new URL(window.location.href);
    url.searchParams.set('v', ver);
    window.history.pushState({}, '', url.toString());
  };

  const handleSelectTier = (tierId: string, range: string) => {
    setSelectedTier(tierId);
    setBusinessSize(range);
    trackCTAClick(`select_tier_${tierId}`, { priceRange: range });
    
    // Scroll to form
    const formSec = document.getElementById('pricing-form-section');
    formSec?.scrollIntoView({ behavior: 'smooth' });
  };

  // Pricing Table display logic:
  // If size = 1-10: Show Starter + Full
  // If size = 11-50: Show Full + Enterprise
  // If size = 50+: Show Enterprise only
  const filteredTiers = pageData.pricingTiers.filter(tier => {
    if (businessSize === '1-10') return tier.id === 'starter' || tier.id === 'full';
    if (businessSize === '11-50') return tier.id === 'full' || tier.id === 'enterprise';
    if (businessSize === '50+') return tier.id === 'enterprise';
    return true;
  });

  return (
    <div className="relative text-white font-sans selection:bg-brand-primary/30 selection:text-brand-primary">
      <Helmet>
        <title>Business Infrastructure Audit Pricing | Thorne</title>
        <meta name="description" content="Identify inefficiencies, risk vectors, and custom automation opportunities. Choose the scale right for your operation." />
      </Helmet>

      {/* Floating CMS Version Control Indicator */}
      <div className="fixed bottom-6 left-6 z-50 glass-card p-4 rounded-2xl border border-white/10 shadow-2xl flex flex-col gap-2 max-w-[260px]">
        <div className="flex items-center justify-between gap-4">
          <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest font-mono">CMS Controller</span>
          <span className="bg-brand-primary/10 text-brand-primary text-[10px] px-2 py-0.5 rounded-full font-mono font-bold">Active: v{cmsVersion}</span>
        </div>
        <p className="text-[11px] text-white/60 leading-tight">
          Verify rollbacks and versioning. Click to toggle content states:
        </p>
        <div className="flex gap-2 mt-1">
          <button
            onClick={() => handleCmsChange('1.0')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold font-mono transition-all ${
              cmsVersion === '1.0'
                ? 'bg-brand-primary text-brand-obsidian font-bold'
                : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
            }`}
          >
            v1.0 (Audit)
          </button>
          <button
            onClick={() => handleCmsChange('1.1')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold font-mono transition-all ${
              cmsVersion === '1.1'
                ? 'bg-brand-primary text-brand-obsidian font-bold'
                : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
            }`}
          >
            v1.1 (Alt Page)
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden flex items-center justify-center min-h-[75vh]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.1),transparent_50%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-brand-primary/20 bg-brand-primary/5 text-brand-primary text-xs font-bold font-mono tracking-widest uppercase mb-4">
              Operational Protocols
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-outfit font-extrabold tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-brand-primary"
          >
            {pageData.hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed"
          >
            {pageData.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="pt-4"
          >
            <button
              onClick={() => {
                trackCTAClick('hero_cta_scroll_pricing');
                document.getElementById('pricing-tiers-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-brand-primary text-brand-obsidian px-8 py-4 rounded-full font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(0,242,255,0.25)] flex items-center gap-3 mx-auto"
            >
              {pageData.hero.ctaText}
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Pain Points Callout */}
      <section className="py-16 px-6 bg-brand-obsidian/30 relative border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold uppercase tracking-widest font-mono text-brand-primary mb-2">
                Operational Warning Signs
              </h3>
              <h2 className="text-2xl md:text-3xl font-outfit font-extrabold text-white">
                Does this describe your current infrastructure?
              </h2>
            </div>
            <div className="md:col-span-3 grid grid-cols-1 gap-3">
              {pageData.painPoints.map((pain, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-xl">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                  <span className="text-sm text-white/80">{pain}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What's Included (Deliverables) */}
      <section className="py-24 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-brand-primary font-bold tracking-[0.2em] text-xs uppercase font-mono">
              Audit Scope
            </span>
            <h2 className="text-3xl md:text-5xl font-outfit font-extrabold text-white mt-3">
              Detailed Deliverables
            </h2>
            <p className="text-white/60 mt-4 text-sm md:text-base max-w-lg mx-auto">
              Every audit yields actionable documentation, system blueprints, and code recommendations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pageData.deliverables.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="glass-card p-6 rounded-2xl border border-white/5 hover:border-white/10 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="mb-4 w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                    {getDeliverableIcon(item.title)}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed font-light">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Table Section */}
      <section id="pricing-tiers-section" className="py-24 px-6 bg-brand-obsidian/20 border-t border-white/5 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-brand-primary font-bold tracking-[0.2em] text-xs uppercase font-mono">
              Investment Tiers
            </span>
            <h2 className="text-3xl md:text-5xl font-outfit font-extrabold text-white mt-3">
              Transparent, Value‑Driven Pricing
            </h2>
            <p className="text-white/60 mt-4 text-sm md:text-base max-w-md mx-auto">
              Toggle your current team size to display relevant infrastructure audit options.
            </p>

            {/* Team Size Switcher */}
            <div className="inline-flex p-1.5 bg-brand-obsidian border border-white/10 rounded-2xl mt-8 shadow-inner">
              {[
                { key: '1-10', label: '1 - 10 Employees (Micro)' },
                { key: '11-50', label: '11 - 50 Employees (Growing)' },
                { key: '50+', label: '50+ Employees (Enterprise)' }
              ].map(opt => (
                <button
                  key={opt.key}
                  onClick={() => {
                    setBusinessSize(opt.key);
                    trackCTAClick(`size_toggle_${opt.key}`, { sizeRange: opt.key });
                  }}
                  className={`py-2.5 px-4 md:px-6 rounded-xl text-xs md:text-sm font-semibold tracking-wide transition-all duration-300 ${
                    businessSize === opt.key
                      ? 'bg-brand-primary text-brand-obsidian font-bold shadow-lg'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto items-stretch">
            <AnimatePresence mode="wait">
              {filteredTiers.map((tier) => {
                const isFeatured = tier.id === 'full';
                return (
                  <motion.div
                    key={tier.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className={`flex-1 rounded-[2.5rem] p-8 relative flex flex-col justify-between overflow-hidden border shadow-2xl ${
                      isFeatured
                        ? 'bg-gradient-to-b from-brand-primary/10 via-brand-obsidian to-brand-obsidian border-brand-primary/40 shadow-[0_0_40px_rgba(0,242,255,0.15)]'
                        : 'glass-card border-white/10'
                    }`}
                  >
                    {isFeatured && (
                      <div className="absolute top-5 right-5 bg-brand-primary/20 text-brand-primary text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-brand-primary/30">
                        Most Popular
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-1 font-outfit">{tier.name}</h3>
                      <p className="text-xs text-white/50 font-light mb-6">{tier.subtitle}</p>

                      <div className="flex items-baseline gap-2 mb-6">
                        <span className="text-4xl md:text-5xl font-extrabold text-white font-outfit">${tier.price}</span>
                        <span className="text-xs text-white/40 font-mono">one-time</span>
                      </div>

                      <div className="w-full h-[1px] bg-white/10 mb-6" />

                      <ul className="space-y-4 text-sm font-light text-white/80">
                        {tier.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <Check className="w-4 h-4 text-brand-primary mt-0.5 flex-shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => handleSelectTier(tier.id, tier.range)}
                      className={`w-full py-4 rounded-2xl font-bold font-outfit uppercase tracking-wider text-xs md:text-sm mt-8 transition-all duration-300 ${
                        isFeatured
                          ? 'bg-brand-primary text-brand-obsidian hover:shadow-[0_0_20px_rgba(0,242,255,0.4)] hover:scale-[1.02] active:scale-[0.98]'
                          : 'bg-white/5 text-white border border-white/15 hover:bg-white/10 hover:border-white/30 hover:scale-[1.02] active:scale-[0.98]'
                      }`}
                    >
                      Select {tier.name.split(' ')[0]}
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Before/After Outcomes */}
      <section className="py-24 px-6 border-t border-white/5 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-brand-primary font-bold tracking-[0.2em] text-xs uppercase font-mono">
              Impact Metric
            </span>
            <h2 className="text-3xl md:text-5xl font-outfit font-extrabold text-white mt-3">
              Measurable Operational Transformations
            </h2>
            <p className="text-white/60 mt-4 text-sm md:text-base max-w-lg mx-auto">
              Comparing workflows before optimization versus the autonomous architecture we design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pageData.outcomes.map((out, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card p-8 rounded-3xl border border-white/5 hover:border-white/10 transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-brand-primary font-mono uppercase tracking-wider mb-6">
                  {out.metric}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-red-950/20 border border-red-500/10 rounded-2xl">
                    <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest block mb-1">Before Audit</span>
                    <p className="text-sm text-white/80 font-light leading-relaxed">{out.before}</p>
                  </div>
                  <div className="p-4 bg-emerald-950/20 border border-emerald-500/10 rounded-2xl">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block mb-1">After Audit Fixes</span>
                    <p className="text-sm text-white/80 font-semibold leading-relaxed">{out.after}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-24 px-6 bg-brand-obsidian/30 border-t border-white/5 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-brand-primary font-bold tracking-[0.2em] text-xs uppercase font-mono">
              Audit Blueprint
            </span>
            <h2 className="text-3xl md:text-5xl font-outfit font-extrabold text-white mt-3">
              Our 6-Step Audit Protocol
            </h2>
            <p className="text-white/60 mt-4 text-sm md:text-base max-w-lg mx-auto">
              How we map, analyze, and build your custom automation recommendations.
            </p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-[50px] left-8 right-8 h-[2px] bg-gradient-to-r from-brand-primary/10 via-brand-primary/40 to-brand-primary/10 z-0" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 relative z-10">
              {pageData.process.map((step) => (
                <div key={step.step} className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center text-brand-primary font-mono font-bold text-lg shadow-[0_0_15px_rgba(0,242,255,0.15)] flex-shrink-0">
                    0{step.step}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1 font-outfit tracking-wide">{step.title}</h4>
                    <p className="text-[12px] text-white/50 font-light leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ accordion */}
      <section className="py-24 px-6 border-t border-white/5 relative">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-brand-primary font-bold tracking-[0.2em] text-xs uppercase font-mono">
              FAQ
            </span>
            <h2 className="text-3xl md:text-5xl font-outfit font-extrabold text-white mt-3">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {pageData.faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div 
                  key={index} 
                  className="glass-card rounded-2xl border border-white/5 overflow-hidden transition-all duration-300 hover:border-white/10"
                >
                  <button
                    onClick={() => {
                      setActiveFaq(isOpen ? null : index);
                      trackCTAClick(`faq_toggle_${index}`, { isOpen: !isOpen });
                    }}
                    className="w-full flex items-center justify-between p-6 text-left transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-brand-primary/80 flex-shrink-0" />
                      <span className="text-sm md:text-base font-bold text-white">{faq.q}</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-white/40 transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-brand-primary' : ''
                    }`} />
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-white/5 text-sm font-light text-white/60 leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Audit Form Section (CTA Footer) */}
      <AuditPricingForm
        selectedTier={selectedTier}
        selectedSize={businessSize}
        onSizeChange={(size) => {
          setBusinessSize(size);
          trackCTAClick(`form_change_size_${size}`, { size });
        }}
        availablePainPoints={pageData.painPoints}
      />
    </div>
  );
}
