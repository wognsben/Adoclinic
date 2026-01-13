import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu } from 'lucide-react';
import GooeyFilter from './ui/GooeyFilter';

// ----------------------------------------------------------------------
// CURVED METEOR LINK
// ----------------------------------------------------------------------
const MeteorLink = ({ text, isRed, to }: { text: string, isRed?: boolean, to?: string }) => {
    const [isHovered, setIsHovered] = useState(false);
    const location = useLocation();
    const gradientId = `meteor-gradient-${text}`;
    
    // Check if this link is active
    const isActive = to === location.pathname;

    return (
        <Link 
          to={to || "#"} 
          className="relative block py-2 group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
            <span className={`
                relative z-10 text-xs font-medium tracking-[0.15em] uppercase transition-colors duration-300
                ${isActive ? 'text-black font-bold' : isHovered ? 'text-black' : (isRed ? 'text-[#991B1B]' : 'text-black/70')}
            `}>
                {text}
            </span>
            
            {/* Active Indicator - Always visible when active */}
            {isActive && (
                <motion.div 
                    className="absolute left-0 -bottom-2 w-full h-[2px] bg-gradient-to-r from-[#991B1B] to-[#ff6b6b]"
                    layoutId="activeNav"
                    initial={false}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
            )}
            
            {/* Hover Animation */}
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
                        animate={
                            isHovered && !isActive 
                                ? { pathLength: 1, pathOffset: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" }} 
                                : { pathLength: 1, pathOffset: 1, opacity: 0, transition: { duration: 0.55, ease: [0.32, 0, 0.67, 0] }}
                        }
                    />
                </svg>
            </div>
        </Link>
    );
};

// ----------------------------------------------------------------------
// LOGO COMPONENT (Updated with Brand Image)
// ----------------------------------------------------------------------
const Logo = () => (
    <div className="flex items-center mr-10 min-w-max relative">
        {/* Use the provided logo image URL */}
        <img 
            src="https://drive.google.com/thumbnail?id=1HaiCyEQkF2vbt0iBRow1pwsHU9CAxFgm&sz=w1000" 
            alt="ADO CLINIC" 
            // Matched with Footer logo size: w-[250px]
            className="w-[250px] h-auto object-contain origin-left" 
            // Removed filter to show original logo colors on white background
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
        <button className="flex items-center justify-center px-4 py-1.5 rounded-full border border-black/20 text-black text-[10px] font-bold tracking-widest hover:bg-black hover:text-white transition-colors">
            KOREAN
        </button>
        <div className="flex items-center gap-3 text-[10px] font-bold tracking-widest text-black/90">
            <Link to="/login" className="hover:text-[#5E7A70] transition-colors">LOGIN</Link>
            <span className="text-black/20">|</span>
            <Link to="/contact" className="hover:text-[#991B1B] transition-colors text-[#991B1B]">CONTACT</Link>
        </div>
    </div>
);


interface HeaderProps {
  onOpenConsultation?: () => void;
}

export function Header({ onOpenConsultation }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(true); // Always show background for visibility
  const [hasSplit, setHasSplit] = useState(false);

  // REMOVED: useMotionValueEvent that was changing isScrolled to false
  // Navigation background is now always visible

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
                    backgroundColor: "white", // Changed to white
                    
                    // Reduced Padding (Optimized for sleek look while preventing erosion)
                    paddingLeft: "15px",  // Reduced from 30px
                    paddingRight: isScrolled ? "40px" : "30px", // Reduced from 60px/50px
                    paddingTop: "12px",
                    paddingBottom: "12px",
                    
                    // Height Adjusted (80px -> 72px)
                    // Content is 64px. 72px gives 4px buffer on top/bottom.
                    height: "72px", 
                    
                    // Optional: Add shadow since background is white
                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",

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
                    backgroundColor: "white", // Changed to white
                    
                    // Reduced Padding
                    paddingLeft: isScrolled && !hasSplit ? "40px" : "30px", // Reduced from 60px/50px
                    paddingRight: "15px", // Reduced from 30px
                    paddingTop: "12px",
                    paddingBottom: "12px",
                    
                    height: "72px",
                    
                    // Optional: Add shadow since background is white
                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",

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
                 <MeteorLink 
                    key={item} 
                    text={item} 
                    isRed={item === '병원소개'} 
                    to={item === '전후사진' ? '/before-after' : item === '시술안내' ? '/treatments' : item === '이벤트/소식' ? '/events' : item === '병원소개' ? '/' : '#'}
                 />
              ))}
            </nav>
            <button className="lg:hidden text-black ml-auto"><Menu className="w-6 h-6" /></button>
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