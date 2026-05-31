import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isPricingPage, setIsPricingPage] = useState(false);
  const [isUnsubscribedPage, setIsUnsubscribedPage] = useState(false);

  useEffect(() => {
    const checkPage = () => {
      setIsPricingPage(
        window.location.search.includes('page=audit-pricing') ||
        window.location.search.includes('page=apply') ||
        window.location.pathname === '/audit-pricing' ||
        window.location.pathname === '/audit-pricing/' ||
        window.location.pathname === '/apply' ||
        window.location.pathname === '/apply/'
      );
      setIsUnsubscribedPage(
        window.location.search.includes('page=unsubscribed') ||
        window.location.pathname === '/unsubscribed' ||
        window.location.pathname === '/unsubscribed/'
      );
    };
    checkPage();
    window.addEventListener('popstate', checkPage);
    return () => window.removeEventListener('popstate', checkPage);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const navigateTo = (e: React.MouseEvent, page: 'home' | 'pricing') => {
    e.preventDefault();
    const url = new URL(window.location.href);
    url.pathname = '/';
    if (page === 'pricing') {
      url.searchParams.set('page', 'apply');
    } else {
      url.searchParams.delete('page');
    }
    window.history.pushState({}, '', url.toString());
    window.dispatchEvent(new Event('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCTAClick = () => {
    if (isPricingPage) {
      const formSec = document.getElementById('pricing-form-section');
      formSec?.scrollIntoView({ behavior: 'smooth' });
    } else {
      const url = new URL(window.location.href);
      url.pathname = '/';
      url.searchParams.set('page', 'apply');
      window.history.pushState({}, '', url.toString());
      window.dispatchEvent(new Event('popstate'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <motion.nav 
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -100, opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-6 left-0 right-0 z-50 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-8 py-3 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
          <a 
            href="/" 
            onClick={(e) => navigateTo(e, 'home')}
            className="flex items-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center shadow-[0_0_15px_rgba(0,242,255,0.4)] group-hover:scale-110 transition-transform">
              <span className="text-brand-obsidian font-black text-lg leading-none">T</span>
            </div>
            <span className="text-white font-outfit font-bold text-xl tracking-tight">Thorne</span>
          </a>
          
          <div className="hidden md:flex items-center gap-8">
            {isUnsubscribedPage ? (
              <a href="/" onClick={(e) => navigateTo(e, 'home')} className="text-xs font-medium text-white/70 hover:text-brand-primary transition-colors uppercase tracking-widest">Home</a>
            ) : isPricingPage ? (
              <>
                <a href="/" onClick={(e) => navigateTo(e, 'home')} className="text-xs font-medium text-white/70 hover:text-brand-primary transition-colors uppercase tracking-widest">Home</a>
                <a href="#pricing-tiers-section" className="text-xs font-medium text-white/70 hover:text-brand-primary transition-colors uppercase tracking-widest">Pricing</a>
              </>
            ) : (
              <>
                <a href="#how-it-works" className="text-xs font-medium text-white/70 hover:text-brand-primary transition-colors uppercase tracking-widest">Process</a>
                <a href="#benefits" className="text-xs font-medium text-white/70 hover:text-brand-primary transition-colors uppercase tracking-widest">Benefits</a>
                <a 
                  href="?page=apply" 
                  onClick={(e) => navigateTo(e, 'pricing')} 
                  className="text-xs font-medium text-white/70 hover:text-brand-primary transition-colors uppercase tracking-widest"
                >
                  Infrastructure Audit
                </a>
              </>
            )}
            <div className="h-4 w-px bg-white/10" />
            <ThemeToggle />
            <button 
              onClick={(e) => {
                if (isUnsubscribedPage) {
                  navigateTo(e as any, 'home');
                } else {
                  handleCTAClick();
                }
              }}
              className="text-xs font-bold bg-brand-primary text-brand-obsidian px-5 py-2.5 rounded-full hover:scale-105 transition-transform active:scale-95 shadow-[0_0_20px_rgba(0,242,255,0.3)]"
            >
              {isUnsubscribedPage ? 'Go Home' : isPricingPage ? 'Request Audit' : 'Analyze Your Business'}
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
