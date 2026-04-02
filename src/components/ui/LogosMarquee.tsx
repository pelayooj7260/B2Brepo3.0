import { motion } from 'framer-motion';

const MOCK_LOGOS = [
  "Acme Corp", "GlobalTech", "Nexus", "Synergy", "Vertex", "Quantum", "Apex", "Nova"
];

export default function LogosMarquee() {
  return (
    <div className="w-full py-10 bg-transparent overflow-hidden flex flex-col items-center border-b border-brand-primary/10 relative z-10">
      <p className="text-sm text-brand-text/50 uppercase tracking-widest mb-6 font-light">Trusted by innovative teams</p>
      
      {/* Marquee Container */}
      <div className="relative flex w-full max-w-5xl overflow-hidden mask-image-gradient">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 25,
          }}
        >
          {/* Duplicate list for seamless looping */}
          {[...MOCK_LOGOS, ...MOCK_LOGOS].map((logo, idx) => (
            <div
              key={idx}
              className="mx-8 md:mx-12 text-2xl md:text-3xl font-bold text-brand-text/30 uppercase tracking-wider"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {logo}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
