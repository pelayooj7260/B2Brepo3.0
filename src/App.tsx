import { useEffect } from 'react';
import Hero from './components/Hero';
import WhoItsFor from './components/WhoItsFor';
import ServiceOffering from './components/ServiceOffering';
import Process from './components/Process';
import Credibility from './components/Credibility';
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
    <div className="min-h-screen bg-black text-white">
      <Hero onCTAClick={scrollToForm} />
      <WhoItsFor />
      <ServiceOffering />
      <Process />
      <Credibility />
      <AuditForm />
      <Footer />
    </div>
  );
}

export default App;
