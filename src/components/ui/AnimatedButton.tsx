import React, { useRef, useState } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface AnimatedButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: React.ReactNode;
}

export function AnimatedButton({ children, variant = 'primary', icon, className = "", ...props }: AnimatedButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles = "group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-medium rounded-full transition-colors duration-300 overflow-hidden";
  
  const variants = {
    primary: "bg-[#34D399] text-[#0B192C] font-semibold hover:bg-[#6EE7B7] hover:shadow-[0_0_25px_rgba(52,211,153,0.4)]",
    secondary: "bg-white/5 backdrop-blur-lg border border-[#34D399]/30 text-[#F4F1EB] hover:bg-[#34D399]/10 hover:border-[#34D399]/50 hover:shadow-[0_0_15px_rgba(52,211,153,0.3)]",
    outline: "border-2 border-[#34D399] text-[#34D399] hover:bg-[#34D399]/10 hover:shadow-[0_0_15px_rgba(52,211,153,0.2)]"
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative leading-none flex items-center border-none outline-none">{children}</span>
      {icon && (
        <span className="relative shrink-0 group-hover:translate-x-1 transition-transform">
          {icon}
        </span>
      )}
    </motion.button>
  );
}
