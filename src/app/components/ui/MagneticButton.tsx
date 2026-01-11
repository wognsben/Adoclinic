import React, { useRef, useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'motion/react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number; // How strong the magnetic pull is (default 0.3)
  triggerArea?: number; // Distance in pixels to trigger the effect (default 150)
}

export function MagneticButton({ 
  children, 
  className = "", 
  onClick,
  strength = 0.3, 
  triggerArea = 100 
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  
  // Motion values for smooth interpolation
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for the "return to center" effect
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);

      if (distance < triggerArea) {
        // Calculate pull
        const pullX = (e.clientX - centerX) * strength;
        const pullY = (e.clientY - centerY) * strength;
        
        x.set(pullX);
        y.set(pullY);
      } else {
        // Reset if out of range
        x.set(0);
        y.set(0);
      }
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [x, y, strength, triggerArea]);

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      className={`relative inline-flex items-center justify-center cursor-pointer transition-colors duration-300 ${className}`}
    >
      {children}
    </motion.button>
  );
}
