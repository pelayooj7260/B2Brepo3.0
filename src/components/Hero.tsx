import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onCTAClick: () => void;
}

export default function Hero({ onCTAClick }: HeroProps) {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-5xl mx-auto text-center fade-in-up">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight">
          Your Team Shouldn't Be<br />
          Fighting Your Systems
        </h1>

        <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8 leading-relaxed max-w-4xl mx-auto">
          Manual work. Disconnected tools. Hours lost to tasks that could run themselves.
        </p>

        <p className="text-lg md:text-xl text-gray-400 mb-12 leading-relaxed max-w-3xl mx-auto">
          AI isn't magic. It's a system. And when built right, it quietly handles the friction
          slowing your business down—so you can focus on what actually matters.
        </p>

        <button
          onClick={onCTAClick}
          className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-lg font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 hover:gap-4"
        >
          Request an Automation Audit
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}
