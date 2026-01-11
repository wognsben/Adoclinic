import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { Menu, Globe } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center pt-6 pointer-events-none">
      <motion.header
        layout
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className={cn(
          "pointer-events-auto flex items-center justify-between px-8 md:px-10 transition-colors duration-500",
          isScrolled 
            ? "w-[min(90vw,1100px)] h-[64px] rounded-full bg-[#1A1F1D]/95 backdrop-blur-md shadow-2xl border border-white/10" 
            : "w-full h-[100px] bg-transparent border-b border-white/5"
        )}
      >
        {/* Left: Logo Area */}
        <motion.div layout className="flex items-center gap-4">
          {/* Three Dots: Empty, Celadon, Red */}
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full border border-white/60" /> {/* Empty */}
            <div className="w-2 h-2 rounded-full bg-[#5E7A70]" /> {/* Celadon */}
            <div className="w-2 h-2 rounded-full bg-[#991B1B]" /> {/* Red */}
          </div>

          {/* Stacked Logo */}
          <div className="flex flex-col leading-[0.9] text-white">
            <span className="font-serif font-bold text-lg tracking-widest">ADO</span>
            <span className="font-serif text-[10px] tracking-[0.3em] font-light ml-[1px]">CLINIC</span>
          </div>
        </motion.div>

        {/* Center: Navigation (Desktop) */}
        <motion.nav layout className="hidden lg:flex items-center gap-10">
          {['Philosophy', 'Program', 'Case', 'Community'].map((item) => (
            <a 
              key={item} 
              href="#" 
              className="text-xs font-medium tracking-widest text-white/70 hover:text-white uppercase transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#5E7A70] transition-all group-hover:w-full" />
            </a>
          ))}
        </motion.nav>

        {/* Right: Utilities */}
        <motion.div layout className="hidden lg:flex items-center gap-6">
          {/* Language Toggle */}
          <button className="flex items-center justify-center px-4 py-1.5 rounded-full border border-white/20 text-white text-[10px] font-bold tracking-widest hover:bg-white hover:text-black transition-colors">
            KOREAN
          </button>
          
          <div className="flex items-center gap-3 text-[10px] font-bold tracking-widest text-white/90">
            <button className="hover:text-[#5E7A70] transition-colors">LOGIN</button>
            <span className="text-white/20">|</span>
            <button className="hover:text-[#5E7A70] transition-colors">JOIN</button>
          </div>
        </motion.div>

        {/* Mobile Menu Trigger */}
        <button className="lg:hidden text-white">
          <Menu className="w-6 h-6" />
        </button>

      </motion.header>
    </div>
  );
}
