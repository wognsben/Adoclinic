import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function SkinAnalysis() {
  const [isScanning, setIsScanning] = useState(true);

  // Cycle the animation: Scan (6s) -> Show Result (10s) -> Reset
  useEffect(() => {
    const cycle = () => {
      setIsScanning(true);
      setTimeout(() => setIsScanning(false), 6000); // Stop scanning after 6s
    };
    
    cycle(); // Start immediately
    const interval = setInterval(cycle, 16000); // Full cycle every 16s (6s scan + 10s result)
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-[500px] aspect-[3/4] mx-auto">
      
      {/* ---------------------------------------------------------- */}
      {/* LAYER 1: The Tablet Device (Clipped Content)               */}
      {/* ---------------------------------------------------------- */}
      <div className="absolute inset-0 bg-black rounded-[32px] shadow-2xl overflow-hidden border border-white/20 z-10 ring-1 ring-black/50">
        
        {/* Top Camera Unit */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-3 z-40 p-2 bg-black/20 backdrop-blur-md rounded-full border border-white/5">
            <div className="w-2 h-2 rounded-full bg-[#1a1b26] ring-1 ring-white/20"></div>
            <div className="w-2 h-2 rounded-full bg-[#1a1b26] ring-1 ring-white/20"></div>
        </div>

        {/* Screen Content (Video & Internal UI) */}
        <div className="relative w-full h-full bg-gray-900 overflow-hidden">
          
          {/* Vimeo Video Layer */}
          <div className="absolute inset-0 w-full h-full z-0 pointer-events-none bg-gray-900"> 
            <iframe 
                src="https://player.vimeo.com/video/1153326185?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1" 
                frameBorder="0" 
                allow="autoplay; fullscreen; picture-in-picture; encrypted-media" 
                className="absolute inset-0 w-[150%] h-[150%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover opacity-90"
                title="Skin Analysis Video"
                style={{ pointerEvents: 'none' }}
            ></iframe>
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70 z-10" />
          </div>

          {/* Internal UI Layer (Text, Buttons - inside screen) */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-between py-10 px-8">
             
             {/* Header Status */}
             <div className="mt-6 text-center w-full relative z-30">
                <AnimatePresence mode='wait'>
                    {isScanning ? (
                        <motion.div
                            key="scanning-text"
                            initial={{ opacity: 0, filter: "blur(10px)" }}
                            animate={{ opacity: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, filter: "blur(10px)" }}
                            className="flex flex-col items-center"
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                                </span>
                                <p className="text-teal-400/90 text-[10px] font-bold tracking-[0.2em] uppercase">Mark-Vu Analysis</p>
                            </div>
                            <h3 className="text-2xl font-light text-white leading-tight">
                                피부 깊은 곳의<br/>
                                <span className="font-serif italic">본질을 탐색합니다</span>
                            </h3>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="result-text"
                            initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
                        >
                             <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-teal-950/40 border border-teal-500/30 text-teal-300 mb-3 backdrop-blur-md">
                                <span className="text-[10px] font-bold tracking-widest">SKIN ID COMPLETE</span>
                             </div>
                             <h3 className="text-2xl font-light text-white leading-tight">
                                당신만의 고유한<br/>
                                <span className="font-serif italic">미학적 설계 완료</span>
                             </h3>
                        </motion.div>
                    )}
                </AnimatePresence>
             </div>

             {/* Bottom Interface */}
             <div className="w-full relative z-30">
                 <div className="flex justify-between items-end mb-4 px-2">
                    <div className="flex flex-col">
                        <span className="text-[9px] text-white/40 font-mono uppercase tracking-wider">Client ID</span>
                        <span className="text-xs text-white/90 font-mono">ADO-8829</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[9px] text-white/40 font-mono uppercase tracking-wider">AI Status</span>
                        <span className="text-xs text-teal-400 font-mono flex items-center gap-1">
                            OPTIMIZED
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                        </span>
                    </div>
                 </div>
                 
                 <div className="w-full h-14 bg-white/5 backdrop-blur-2xl rounded-2xl flex items-center px-4 gap-4 border border-white/10 shadow-2xl ring-1 ring-white/5 group hover:bg-white/10 transition-colors duration-500 cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-400 to-emerald-500 flex items-center justify-center opacity-90 shrink-0 group-hover:scale-110 transition-transform">
                         <div className="w-4 h-4 text-black">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2a4 4 0 0 0-4 4v8a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4z"></path></svg>
                         </div>
                    </div>
                    <div className="w-full text-white/50 text-sm font-light tracking-wide group-hover:text-white/80 transition-colors">무엇이든 물어보세요...</div>
                 </div>
             </div>
          </div>

          {/* Scan Line Effect (Inside Screen) */}
          <AnimatePresence>
            {isScanning && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 pointer-events-none"
                >
                    <motion.div 
                        className="w-full h-[1px] bg-gradient-to-r from-transparent via-teal-300 to-transparent shadow-[0_0_25px_3px_rgba(45,212,191,0.4)] absolute top-0"
                        animate={{ top: ["10%", "90%", "10%"] }}
                        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
                    />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
                </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* ---------------------------------------------------------- */}
      {/* LAYER 2: Floating Cards (Outside the Tablet)               */}
      {/* ---------------------------------------------------------- */}
      {/* This layer sits ON TOP of the tablet and has NO overflow-hidden */}
      <div className="absolute inset-0 z-50 pointer-events-none">
          <AnimatePresence>
            {!isScanning && (
                <>
                    {/* Card 1: Diagnosis (Cheek - Skin Texture Analysis) */}
                    <PremiumCard 
                        x={32} y={48} 
                        title="Diagnosis" 
                        subtitle="본질의 발견"
                        desc="피부 깊은 곳의 문제 탐색"
                        align="right"
                        delay={0.1}
                    />

                    {/* Card 2: Design (Apple Zone - Volume & Contour) */}
                    <PremiumCard 
                        x={72} y={42} 
                        title="Design" 
                        subtitle="미학적 설계"
                        desc="골격과 피부결을 고려한 포인트"
                        align="left"
                        delay={0.3}
                    />

                    {/* Card 3: Procedure (Jawline - Lifting Point) */}
                    <PremiumCard 
                        x={28} y={78} 
                        title="Procedure" 
                        subtitle="정교한 시술"
                        desc="최소한의 개입, 최대한의 변화"
                        align="right"
                        delay={0.5}
                    />
                </>
            )}
          </AnimatePresence>
      </div>

      {/* Phone Glow Effect */}
      <div className="absolute inset-0 bg-teal-500/5 blur-3xl -z-10 rounded-full" />
    </div>
  );
}

function PremiumCard({ x, y, title, subtitle, desc, align = 'left', delay }) {
    return (
        <div className="absolute" style={{ top: `${y}%`, left: `${x}%` }}>
            {/* 1. The Dot (Must be exactly on the face position) */}
            <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ delay: delay, type: "spring", stiffness: 300, damping: 20 }}
                className="relative flex items-center justify-center w-4 h-4 -translate-x-1/2 -translate-y-1/2" // Center the dot on the x,y coordinate
            >
                <div className="w-1.5 h-1.5 bg-white rounded-full z-10 box-content border border-teal-500/50 shadow-[0_0_10px_rgba(255,255,255,1)]"></div>
                <div className="absolute inset-0 bg-teal-400/30 rounded-full animate-ping"></div>
                <div className="absolute inset-0 bg-teal-400/20 rounded-full"></div>
            </motion.div>
            
            {/* 2. The Card (Offset from the dot) */}
            <motion.div
                initial={{ opacity: 0, x: align === 'left' ? 30 : -30, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: delay + 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }} 
                className={`absolute top-0 flex items-center ${align === 'left' ? 'left-8' : 'right-8 flex-row-reverse'}`}
                style={{ transform: 'translateY(-50%)' }} // Vertically center relative to the dot
            >
                {/* Connecting Line */}
                <svg 
                    className={`w-12 h-2 ${align === 'left' ? '-ml-2' : '-mr-2'}`} 
                    viewBox="0 0 48 2"
                    fill="none"
                    style={{ transform: align === 'left' ? 'none' : 'rotate(180deg)' }}
                >
                    <motion.path 
                        d="M0 1H48" 
                        stroke="url(#lineGradient)" 
                        strokeWidth="1"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: delay + 0.1, duration: 0.4 }}
                    />
                    <defs>
                        <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                            <stop offset="100%" stopColor="rgba(255,255,255,0.6)" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Glass Card Content */}
                {/* min-w-[200px] ensures it's wide enough. whitespace-nowrap prevents unexpected wrapping */}
                <div className={`
                    relative 
                    bg-black/40 backdrop-blur-xl 
                    border border-white/20 
                    rounded-xl p-5 min-w-[220px]
                    shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]
                    ${align === 'right' ? 'text-right' : 'text-left'}
                    group hover:bg-black/50 transition-colors duration-300
                `}>
                    {/* Shimmer */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] animate-[shimmer_3s_infinite]"></div>

                    <p className="text-teal-400 text-[10px] uppercase tracking-widest font-bold mb-1">{title}</p>
                    <h4 className="text-white text-xl font-serif mb-2 leading-none">{subtitle}</h4>
                    <p className="text-white/80 text-xs font-light leading-snug whitespace-pre-wrap">{desc}</p>
                </div>
            </motion.div>
        </div>
    );
}
