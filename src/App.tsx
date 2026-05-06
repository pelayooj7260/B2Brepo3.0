import Lenis from 'lenis';
import { useEffect } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';

import BackgroundCarousel from './components/BackgroundCarousel';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LogosMarquee from './components/ui/LogosMarquee';
import WhoItsFor from './components/WhoItsFor';
import BusinessDiagnostic from './components/BusinessDiagnostic';
import ServiceOffering from './components/ServiceOffering';
import ROICalculator from './components/ROICalculator';
import InteractiveCaseStudies from './components/InteractiveCaseStudies';
import Process from './components/Process';
import Credibility from './components/Credibility';
import TestimonialsCarousel from './components/TestimonialsCarousel';
import FAQ from './components/FAQ';
import AuditForm from './components/AuditForm';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.fade-in-up');
    elements.forEach((el) => observer.observe(el));

    return () => {
      lenis.destroy();
      observer.disconnect();
    };
  }, []);

  const scrollToForm = () => {
    const formElement = document.getElementById('audit-form');
    formElement?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-brand-obsidian overflow-hidden selection:bg-brand-primary/30 selection:text-brand-primary">
        <BackgroundCarousel />

        <Helmet>
          <title>Thorne | Autonomous B2B Infrastructure</title>
          <meta name="description" content="Stop doing manual work. Let our modern backend workflows accelerate your business with instant, real-time data syncs and zero errors." />
        </Helmet>
        
        <Navbar />
        <Hero onCTAClick={scrollToForm} />
        <LogosMarquee />
        <WhoItsFor />
        <BusinessDiagnostic />
        <ServiceOffering />
        <InteractiveCaseStudies />
        <Process />
        <ROICalculator />
        <Credibility />
        <TestimonialsCarousel />
        <FAQ />
        <AuditForm />
        <Footer />
        <button
          onClick={() => { throw new Error("Sentry Test Error: DEBUG_SENTRY_TRIGGER clicked"); }}
          className="fixed bottom-2 right-2 z-[9999] opacity-0 hover:opacity-100 transition-opacity duration-300 bg-slate-900/80 text-[10px] text-slate-400 p-2 rounded border border-slate-700/50 font-mono"
          aria-label="Debug Sentry Trigger"
        >
          DEBUG_SENTRY_TRIGGER
        </button>
      </div>
    </HelmetProvider>
  );
}

export default App;
