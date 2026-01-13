import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronRight } from 'lucide-react';
import GooeyFilter from './ui/GooeyFilter';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
  SheetClose
} from "@/app/components/ui/sheet";

// ----------------------------------------------------------------------
// CURVED METEOR LINK
// ----------------------------------------------------------------------
const MeteorLink = ({ text, isRed, to, onClick }: { text: string, isRed?: boolean, to?: string, onClick?: () => void }) => {
    const [isHovered, setIsHovered] = useState(false);
    const location = useLocation();
    const gradientId = `meteor-gradient-${text.replace(/\s+/g, '-')}`;
    
    // Check if this link is active
    const isActive = to === location.pathname;

    return (
        <Link 
          to={to || "#"} 
          className="relative block py-2 group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={onClick}
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
            <div className="absolute left-0 -bottom-2 w-full h-[24px] pointer-events-none overflow-visible hidden lg:block">
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
// LOGO COMPONENT
// ----------------------------------------------------------------------
const Logo = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className={`flex items-center ${isMobile ? '' : 'mr-10'} min-w-max relative`}>
        {/* Use the provided logo image URL */}
        <img 
            src="https://drive.google.com/thumbnail?id=1HaiCyEQkF2vbt0iBRow1pwsHU9CAxFgm&sz=w1000" 
            alt="ADO CLINIC" 
            // Matched with Footer logo size: w-[250px]
            className={`${isMobile ? 'w-[140px]' : 'w-[200px] lg:w-[250px]'} h-auto object-contain origin-left transition-all duration-300`}
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
        {/* KR Button Restored */}
        <button className="flex items-center justify-center px-4 py-1.5 rounded-full border border-black/20 text-black text-[10px] font-bold tracking-widest hover:bg-black hover:text-white transition-colors">
            KR
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    return "8px"; // Reduced Gap to restore gooey connection
  };

  const navItems = [
    { text: '병원소개', path: '/' },
    { text: '시술안내', path: '/treatments' },
    { text: '이벤트/소식', path: '/events' },
    { text: '칭찬/불만', path: '#' },
    { text: '전후사진', path: '/before-after' }
  ];

  return (
    <>
      <GooeyFilter />

      <div className="fixed top-0 left-0 w-full z-50 pt-4 lg:pt-6 pointer-events-none">
        
        {/* ======================================================================== */}
        {/* LAYER 1: BACKGROUND (GOOEY EFFECT) - OPTIMIZED PADDING                   */}
        {/* ======================================================================== */}
        <motion.div 
            className="absolute inset-0 top-4 lg:top-6 flex justify-center w-full items-center px-4 lg:px-0"
            initial={false}
            animate={{ gap: getGap() }}
            transition={springConfig}
            style={{ 
                filter: isScrolled ? "url(#goo-effect)" : "none",
                transform: "translateY(-4px)" 
            }}
        >
             {/* Left Pill Background (Merged on Mobile) */}
             <motion.div
                layout
                className={`relative flex items-center w-full lg:w-auto justify-between lg:justify-start rounded-full lg:rounded-l-full lg:rounded-r-none transition-colors duration-500`}
                style={{
                    backgroundColor: "white",
                    
                    // Reduced Padding (Optimized for sleek look while preventing erosion)
                    paddingLeft: "20px",
                    paddingRight: isScrolled ? "20px" : "20px", // Mobile padding
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    
                    // Height Adjusted
                    height: "64px", // Matches Right Pill Height
                    
                    // Optional: Add shadow since background is white
                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",

                    // Mobile: Full rounded, Desktop: Dynamic
                    borderRadius: "9999px",
                }}
             >
                {/* GHOST CONTENT (For Sizing - Desktop Only) */}
                <div className="opacity-0 hidden lg:flex items-center gap-2 pointer-events-none select-none">
                    <Logo />
                    <nav className="flex items-center gap-10">
                        {navItems.map((item) => (
                            <span key={item.text} className="text-xs font-medium tracking-[0.15em] uppercase">{item.text}</span>
                        ))}
                    </nav>
                </div>
             </motion.div>

             {/* Right Pill Background (Desktop Only) */}
             <motion.div
                layout
                className={`relative hidden lg:flex items-center transition-colors duration-500`}
                style={{
                    backgroundColor: "white",
                    
                    // KEY FIX: Significantly increased left padding to prevent content from hitting the gooey edge
                    paddingLeft: isScrolled && !hasSplit ? "60px" : "60px", 
                    paddingRight: "30px",
                    paddingTop: "12px",
                    paddingBottom: "12px",
                    
                    height: "64px", // Matches Left Pill Height
                    
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
            className="relative flex justify-center w-full items-center px-4 lg:px-0"
            initial={false}
            animate={{ gap: getGap() }}
            transition={springConfig}
        >
          {/* PILL 1: Logo & Nav */}
          <motion.header
            layout
            className={`flex items-center justify-between w-full lg:w-auto h-[60px] lg:h-[64px] rounded-full lg:rounded-l-full pointer-events-auto z-20`}
            style={{
                // Padding handled by container size for desktop, fixed for mobile
                paddingRight: isScrolled ? "20px" : "20px", 
                paddingLeft: "20px",
            }}
          >
            <Logo isMobile={true} />
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-10 ml-8">
              {navItems.map((item) => (
                 <MeteorLink 
                    key={item.text} 
                    text={item.text} 
                    isRed={item.text === '병원소개'} 
                    to={item.path}
                 />
              ))}
            </nav>

            {/* Mobile Menu Trigger */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                    <button className="lg:hidden text-black p-2 -mr-2 hover:bg-black/5 rounded-full transition-colors">
                        <Menu className="w-6 h-6" />
                    </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0 border-none bg-white/95 backdrop-blur-xl">
                    <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                    <SheetDescription className="sr-only">Navigation links</SheetDescription>
                    
                    <div className="flex flex-col h-full">
                        {/* Mobile Menu Header */}
                        <div className="p-6 border-b border-black/5 flex justify-between items-center">
                            <span className="text-sm font-bold tracking-[0.2em] text-[#738F86]">MENU</span>
                            <SheetClose className="rounded-full p-2 hover:bg-black/5 transition-colors">
                                <X className="w-5 h-5 text-black/60" />
                            </SheetClose>
                        </div>

                        {/* Mobile Menu Items */}
                        <div className="flex-1 overflow-y-auto py-6 px-6">
                            <nav className="flex flex-col gap-6">
                                {navItems.map((item) => (
                                    <Link 
                                        key={item.text} 
                                        to={item.path}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="group flex items-center justify-between py-2 border-b border-black/5 last:border-0"
                                    >
                                        <span className={`text-lg font-medium tracking-wide ${item.text === '병원소개' ? 'text-[#991B1B]' : 'text-black/80'} group-hover:text-black transition-colors`}>
                                            {item.text}
                                        </span>
                                        <ChevronRight className="w-4 h-4 text-black/20 group-hover:text-black/50 group-hover:translate-x-1 transition-all" />
                                    </Link>
                                ))}
                            </nav>

                            {/* Mobile Utils */}
                            <div className="mt-12 space-y-6">
                                <div className="flex gap-4">
                                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex-1 py-3 text-center text-xs font-bold tracking-widest border border-black/10 rounded-xl hover:bg-black hover:text-white transition-colors">
                                        LOGIN
                                    </Link>
                                    <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="flex-1 py-3 text-center text-xs font-bold tracking-widest bg-[#738F86]/10 text-[#5E7A70] rounded-xl hover:bg-[#738F86] hover:text-white transition-colors">
                                        CONTACT
                                    </Link>
                                </div>
                                <button className="w-full py-3 text-center text-xs font-bold tracking-widest border border-black/10 rounded-xl hover:bg-black hover:text-white transition-colors">
                                    KOREAN / ENGLISH
                                </button>
                            </div>
                        </div>

                        {/* Mobile Menu Footer */}
                        <div className="p-6 bg-black/5 text-[10px] text-black/40 font-light tracking-wide text-center">
                            © 2026 ADO CLINIC. All Rights Reserved.
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
          </motion.header>

          {/* PILL 2: Utilities (Desktop Only) */}
          <motion.div
            layout
            onMouseEnter={() => setHasSplit(true)} 
            className={`flex items-center h-[64px] hidden lg:flex pointer-events-auto cursor-pointer z-20`}
            style={{
                // IMPORTANT: Match the padding of the background layer so content aligns perfectly
                paddingLeft: isScrolled && !hasSplit ? "60px" : "60px",
            }}
          >
            <Utilities onOpenConsultation={onOpenConsultation} />
          </motion.div>

        </motion.div>
      </div>
    </>
  );
}