import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { Menu } from 'lucide-react';
import GooeyFilter from './ui/GooeyFilter';
// Import the provided brand logo
import logoImage from 'figma:asset/badd8ea61c2312ef02742069ccaa77fc94ee738f.png';

// ----------------------------------------------------------------------
// CURVED METEOR LINK
// ----------------------------------------------------------------------
const MeteorLink = ({ text, isRed }: { text: string, isRed?: boolean }) => {
    const [isHovered, setIsHovered] = useState(false);
    const gradientId = `meteor-gradient-${text}`;

    return (
        <a 
          href="#" 
          className="relative block py-2 group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
            <span className={`
                relative z-10 text-xs font-medium tracking-[0.15em] uppercase transition-colors duration-300
                ${isHovered ? 'text-white' : (isRed ? 'text-[#991B1B]' : 'text-white/70')}
            `}>
                {text}
            </span>
            <div className="absolute left-0 -bottom-2 w-full h-[24px] pointer-events-none overflow-visible">
                <svg width="100%" height="100%" viewBox="0 0 100 24" preserveAspectRatio="none" className="overflow-visible">
                    <defs>
                        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#991B1B" stopOpacity="0" />
                            <stop offset="40%" stopColor="#991B1B" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#ff6b6b" stopOpacity="1" />
                        </linearGradient>
                    </defs>
                    <motion.path
                        d="M 0 22 L 90 22 C 96 22 100 18 100 0"
                        fill="none"
                        stroke={`url(#${gradientId})`}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
                        animate={isHovered ? { pathLength: 1, pathOffset: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" }} : { pathLength: 1, pathOffset: 1, opacity: 0, transition: { duration: 0.55, ease: [0.32, 0, 0.67, 0] }}}
                    />
                </svg>
            </div>
        </a>
    );
};

// ----------------------------------------------------------------------
// LOGO COMPONENT (Updated with Brand Image)
// ----------------------------------------------------------------------
const Logo = () => (
    <div className="flex items-center mr-10 min-w-max relative">
        {/* Use the imported logo image */}
        <img 
            src={logoImage} 
            alt="ADO CLINIC" 
            // Optimized Size: Increased from h-7 to h-14 for better visibility
            // Scale-110: Slightly zoom in to reduce perceived internal padding
            className="h-14 w-auto object-contain transform scale-110 origin-left" 
            style={{ filter: 'brightness(0) invert(1)' }}
            loading="eager"
            decoding="sync"
        />
    </div>
);

// ----------------------------------------------------------------------
// UTILS COMPONENT
// ----------------------------------------------------------------------
const Utilities = ({ onOpenConsultation }: { onOpenConsultation?: () => void }) => (
    <div className="flex items-center gap-6 min-w-max">
        <button className="flex items-center justify-center px-4 py-1.5 rounded-full border border-white/20 text-white text-[10px] font-bold tracking-widest hover:bg-white hover:text-black transition-colors">
            KOREAN
        </button>
        <div className="flex items-center gap-3 text-[10px] font-bold tracking-widest text-white/90">
            <button className="hover:text-[#5E7A70] transition-colors">LOGIN</button>
            <span className="text-white/20">|</span>
            <button onClick={onOpenConsultation} className="hover:text-[#991B1B] transition-colors text-[#991B1B]">CONTACT</button>
        </div>
    </div>
);


interface HeaderProps {
  onOpenConsultation?: () => void;
}

export function Header({ onOpenConsultation }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasSplit, setHasSplit] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const scrolled = latest > 50;
    if (scrolled !== isScrolled) {
      setIsScrolled(scrolled);
      if (scrolled) setHasSplit(false);
      else setHasSplit(false);
    }
  });

  useEffect(() => {
    if (isScrolled && !hasSplit) {
      const timer = setTimeout(() => setHasSplit(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [isScrolled, hasSplit]);

  const springConfig = { type: "spring", stiffness: 100, damping: 15, mass: 1.2 };
  
  const getGap = () => {
    if (!isScrolled) return "40px";
    if (!hasSplit) return "-20px";
    return "12px";
  };

  return (
    <>
      <GooeyFilter />

      <div className="fixed top-0 left-0 w-full z-50 pt-6 pointer-events-none">
        
        {/* ======================================================================== */}
        {/* LAYER 1: BACKGROUND (GOOEY EFFECT) - OPTIMIZED PADDING                   */}
        {/* ======================================================================== */}
        <motion.div 
            className="absolute inset-0 top-6 flex justify-center w-full items-center"
            initial={false}
            animate={{ gap: getGap() }}
            transition={springConfig}
            style={{ 
                filter: isScrolled ? "url(#goo-effect)" : "none",
                transform: "translateY(-4px)" 
            }}
        >
             {/* Left Pill Background */}
             <motion.div
                layout
                className={`relative flex items-center rounded-l-full transition-colors duration-500`}
                style={{
                    backgroundColor: isScrolled ? "rgba(26, 31, 29, 0.98)" : "transparent",
                    
                    // Reduced Padding (Optimized for sleek look while preventing erosion)
                    paddingLeft: "15px",  // Reduced from 30px
                    paddingRight: isScrolled ? "40px" : "30px", // Reduced from 60px/50px
                    paddingTop: "12px",
                    paddingBottom: "12px",
                    
                    // Height Adjusted (80px -> 72px)
                    // Content is 64px. 72px gives 4px buffer on top/bottom.
                    height: "72px", 

                    borderTopRightRadius: isScrolled && !hasSplit ? "20px" : "9999px",
                    borderBottomRightRadius: isScrolled && !hasSplit ? "20px" : "9999px",
                }}
             >
                {/* GHOST CONTENT (For Sizing) */}
                <div className="opacity-0 flex items-center gap-2 pointer-events-none select-none">
                    <Logo />
                    <nav className="flex items-center gap-10">
                        {['병원소개', '시술안내', '이벤트/소식', '칭찬/불만', '전후사진'].map((item) => (
                            <span key={item} className="text-xs font-medium tracking-[0.15em] uppercase">{item}</span>
                        ))}
                    </nav>
                </div>
             </motion.div>

             {/* Right Pill Background */}
             <motion.div
                layout
                className={`relative hidden lg:flex items-center transition-colors duration-500`}
                style={{
                    backgroundColor: isScrolled ? "rgba(26, 31, 29, 0.98)" : "transparent",
                    
                    // Reduced Padding
                    paddingLeft: isScrolled && !hasSplit ? "40px" : "30px", // Reduced from 60px/50px
                    paddingRight: "15px", // Reduced from 30px
                    paddingTop: "12px",
                    paddingBottom: "12px",
                    
                    height: "72px",

                    borderTopLeftRadius: isScrolled && !hasSplit ? "20px" : "9999px",
                    borderBottomLeftRadius: isScrolled && !hasSplit ? "20px" : "9999px",
                }}
             >
                 {/* GHOST CONTENT */}
                 <div className="opacity-0 pointer-events-none select-none">
                    <Utilities onOpenConsultation={onOpenConsultation} />
                 </div>
             </motion.div>
        </motion.div>


        {/* ======================================================================== */}
        {/* LAYER 2: CONTENT (VISIBLE)                                               */}
        {/* ======================================================================== */}
        <motion.div 
            className="relative flex justify-center w-full items-center"
            initial={false}
            animate={{ gap: getGap() }}
            transition={springConfig}
        >
          {/* PILL 1: Logo & Nav */}
          <motion.header
            layout
            className={`flex items-center h-[64px] rounded-l-full pointer-events-auto z-20`}
            style={{
                // No extra padding needed on left, let the gap handle it
                paddingRight: isScrolled ? "32px" : "24px",
            }}
          >
            <Logo />
            <nav className="hidden lg:flex items-center gap-10">
              {['병원소개', '시술안내', '이벤트/소식', '칭찬/불만', '전후사진'].map((item) => (
                 <MeteorLink key={item} text={item} isRed={item === '병원소개'} />
              ))}
            </nav>
            <button className="lg:hidden text-white ml-auto"><Menu className="w-6 h-6" /></button>
          </motion.header>

          {/* PILL 2: Utilities */}
          <motion.div
            layout
            onMouseEnter={() => setHasSplit(true)} 
            className={`flex items-center h-[64px] hidden lg:flex pointer-events-auto cursor-pointer z-20`}
            style={{
                paddingLeft: isScrolled && !hasSplit ? "32px" : "24px",
            }}
          >
            <Utilities onOpenConsultation={onOpenConsultation} />
          </motion.div>

        </motion.div>
      </div>
    </>
  );
}
