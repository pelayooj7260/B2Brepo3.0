import React from 'react';

const BackgroundCarousel: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[rgb(var(--color-bg))] pointer-events-none">
      {/* Dark overlay to ensure text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1221]/90 via-[#0B1221]/80 to-[#0B1221]/95 z-10" />

      {/* Sliding Carousel Layer */}
      <div 
        className="absolute top-0 left-0 w-[200vw] h-full flex items-center opacity-30"
        style={{ animation: 'background-slide 80s linear infinite' }}
      >
        {/* Repeat the set of shapes twice to create a seamless infinite scroll loop */}
        {[...Array(2)].map((_, index) => (
          <div key={index} className="flex w-[100vw] justify-around items-center h-full shrink-0">
            {/* Shape 1: Large Gold Orb glow */}
            <div className="w-[40vw] h-[40vw] rounded-full bg-[#D4AF37] blur-[150px] opacity-20 transform -translate-y-1/4"></div>
            
            {/* Shape 2: Muted Blue Rectangular glow */}
            <div className="w-[50vw] h-[30vw] rounded-[100px] bg-[#4E5F70] blur-[120px] opacity-20 transform translate-y-1/3"></div>

            {/* Shape 3: Secondary Gold glow */}
            <div className="w-[30vw] h-[30vw] rounded-full bg-[#D4AF37] blur-[140px] opacity-15 transform -translate-y-1/2 translate-x-1/4"></div>
          </div>
        ))}
      </div>
      
      {/* Subtle Noise Texture Overlay (Optional but nice for premium look) */}
      <div className="absolute inset-0 opacity-[0.03] z-20 mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
    </div>
  );
};

export default BackgroundCarousel;
