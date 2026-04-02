import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  glowOnHover?: boolean;
}

export function GlassCard({ children, className = "", glowOnHover = true, ...props }: GlassCardProps) {
  return (
    <motion.div
      whileHover={glowOnHover ? { y: -3, scale: 1.01 } : undefined}
      transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
      className={`relative group rounded-3xl glass-card p-6 md:p-8 overflow-hidden transition-all duration-500 ${glowOnHover ? 'hover:shadow-[0_0_35px_rgba(52,211,153,0.15)] hover:border-[#34D399]/40' : ''} ${className}`}
      {...props}
    >
      {/* Animated gradient border background on hover */}
      {glowOnHover && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#34D399]/5 via-transparent to-[#203A43]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      )}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
}
