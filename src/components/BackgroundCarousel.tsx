import React from 'react';
import { motion } from 'framer-motion';

const BackgroundCarousel: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-brand-obsidian pointer-events-none">
      {/* Mesh Gradient Orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-1/4 -left-1/4 w-[80vw] h-[80vw] bg-brand-primary/10 rounded-full blur-[120px]"
      />
      
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 100, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-1/4 -right-1/4 w-[70vw] h-[70vw] bg-brand-secondary/10 rounded-full blur-[140px]"
      />

      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -50, 0],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-brand-primary/5 rounded-full blur-[100px]"
      />

      {/* Global Grainy Noise */}
      <div className="absolute inset-0 opacity-[0.05] z-10 mix-blend-overlay pointer-events-none" 
        style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' 
        }} 
      />
    </div>
  );
};

export default BackgroundCarousel;
