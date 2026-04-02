import { useEffect } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import CustomCursor from './components/ui/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LogosMarquee from './components/ui/LogosMarquee';
import WhoItsFor from './components/WhoItsFor';
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

    return () => observer.disconnect();
  }, []);

  const scrollToForm = () => {
    const formElement = document.getElementById('audit-form');
    formElement?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-transparent overflow-hidden">
        <CustomCursor />
        <Helmet>
          <title>Thorne | Automated B2B Infrastructure</title>
          <meta name="description" content="Stop doing manual work. Let our modern backend workflows accelerate your business with instant, real-time data syncs and zero errors." />
        </Helmet>
        
        <Navbar />
        <Hero onCTAClick={scrollToForm} />
        <LogosMarquee />
        <WhoItsFor />
        <ServiceOffering />
        <ROICalculator />
        <InteractiveCaseStudies />
        <Process />
        <Credibility />
        <TestimonialsCarousel />
        <FAQ />
        <AuditForm />
        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default App;
