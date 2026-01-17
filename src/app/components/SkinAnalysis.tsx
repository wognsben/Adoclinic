import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function SkinAnalysis() {
  const [isScanning, setIsScanning] = useState(true);

  // Cycle the animation: Scan (5s) -> Show Result (10s) -> Reset
  useEffect(() => {
    const cycle = () => {
      setIsScanning(true);
      setTimeout(() => setIsScanning(false), 5000); 
    };
    
    cycle(); 
    const interval = setInterval(cycle, 15000); 
    return () => clearInterval(interval);
  }, []);

  return (
    // Main Container
    <div className="relative w-full max-w-[900px] mx-auto flex items-center justify-center py-20 lg:py-10">
      
      {/* ---------------------------------------------------------- */}
      {/* LAYER 1: The Tablet Device (Centered)                      */}
      {/* ---------------------------------------------------------- */}
      <div className="relative w-[340px] md:w-[380px] aspect-[3/4] rounded-[32px] shadow-[0_30px_60px_-10px_rgba(0,0,0,0.6)] overflow-hidden border border-white/20 z-10 ring-4 ring-black/80 transform-gpu bg-black">
        
        {/* Dynamic Island Camera */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 flex items-center justify-center gap-3 z-40 px-4 py-1.5 bg-black rounded-full ring-1 ring-white/10 shadow-lg">
            <div className="w-1.5 h-1.5 rounded-full bg-[#222] ring-1 ring-white/20 animate-pulse"></div>
            <div className="w-10 h-1.5 bg-gray-800 rounded-full flex items-center px-1">
                 <div className="w-1 h-1 bg-green-500 rounded-full animate-ping" />
            </div>
        </div>

        {/* Screen Content */}
        <div className="relative w-full h-full bg-gray-900 overflow-hidden">
          
          {/* Video Layer */}
          <div className="absolute inset-0 w-full h-full z-0 pointer-events-none bg-gray-950"> 
            <iframe 
                src="https://player.vimeo.com/video/1153326185?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1" 
                frameBorder="0" 
                allow="autoplay; fullscreen; picture-in-picture; encrypted-media" 
                className="absolute inset-0 w-[170%] h-[170%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover opacity-90 mix-blend-screen" 
                title="Skin Analysis Video"
                style={{ pointerEvents: 'none' }}
            ></iframe>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 z-10" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 mix-blend-overlay z-10"></div>
          </div>

          {/* Internal Screen UI */}
          <div className="absolute inset-0 z-20 flex flex-col justify-between p-6">
             <div className="mt-8 text-center w-full relative z-30">
                <AnimatePresence mode='wait'>
                    {isScanning ? (
                        <motion.div
                            key="scanning"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, filter: "blur(5px)" }}
                        >
                            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-black/40 border border-teal-500/30 backdrop-blur-md">
                                <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(45,212,191,1)]" />
                                <span className="text-teal-300 text-[9px] font-bold tracking-[0.2em]">SCANNING</span>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="complete"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                        >
                             <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 backdrop-blur-md">
                                <svg className="w-3 h-3 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                <span className="text-white text-[9px] font-bold tracking-[0.2em]">COMPLETE</span>
                             </div>
                        </motion.div>
                    )}
                </AnimatePresence>
             </div>

             <div className="w-full relative z-30">
                 <div className="flex justify-between items-end border-t border-white/10 pt-4">
                    <div>
                        <div className="text-[9px] text-white/50 uppercase tracking-wider mb-1">Subject</div>
                        <div className="text-xs text-white font-mono">ADO-8829</div>
                    </div>
                    <div className="text-right">
                        <div className="text-[9px] text-white/50 uppercase tracking-wider mb-1">Accuracy</div>
                        <div className="text-xs text-teal-400 font-mono">99.9%</div>
                    </div>
                 </div>
             </div>
          </div>

          {/* Grid Scanner */}
          <AnimatePresence>
            {isScanning && (
                <motion.div 
                    key="scanner"
                    className="absolute inset-0 z-20 pointer-events-none"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                >
                    <motion.div 
                        className="w-full h-[2px] bg-teal-400 shadow-[0_0_20px_2px_rgba(45,212,191,0.6)] absolute top-0"
                        animate={{ top: ["0%", "100%"] }}
                        transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(45,212,191,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(45,212,191,0.15)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(circle_at_center,black_40%,transparent_100%)]"></div>
                </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* ---------------------------------------------------------- */}
      {/* LAYER 2: Floating AR Cards (Connected)                     */}
      {/* ---------------------------------------------------------- */}
      <div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center">
          <div className="relative w-[340px] md:w-[380px] aspect-[3/4]"> 
            <AnimatePresence mode="wait">
                {!isScanning && (
                    <motion.div 
                        key="ar-results"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0"
                    >
                        {/* 
                           Geometry Strategy:
                           - Target Point: % on screen
                           - Elbow Point: Fixed offset from Target
                           - Card Anchor: Fixed offset from Elbow
                           - This ensures lines are perfectly horizontal/diagonal connected
                        */}

                        {/* Card 1: Top Left (Pore) */}
                        <ConnectedCard 
                            targetX={30} targetY={40}
                            cardOffsetX={-220} cardOffsetY={-30}
                            title="PORE & TEXTURE"
                            subtitle="Surface Analysis"
                            desc="Micro-texture mapping."
                            score="82"
                            position="left"
                            delay={0.1}
                        />

                        {/* Card 2: Top Right (Elasticity) */}
                        <ConnectedCard 
                            targetX={70} targetY={35}
                            cardOffsetX={220} cardOffsetY={-40}
                            title="ELASTICITY"
                            subtitle="Volume Density"
                            desc="Structural integrity check."
                            score="94"
                            position="right"
                            delay={0.3}
                        />

                        {/* Card 3: Bottom Left (Contour) */}
                        <ConnectedCard 
                            targetX={25} targetY={75}
                            cardOffsetX={-200} cardOffsetY={30}
                            title="CONTOUR"
                            subtitle="V-Line Logic"
                            desc="Mandibular angle analysis."
                            score="88"
                            position="left"
                            delay={0.5}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
          </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// Sub-Component: Connected Card with Perfect SVG Lines
// ------------------------------------------------------------------
const ConnectedCard = React.memo(function ConnectedCard({ 
    targetX, targetY, cardOffsetX, cardOffsetY, 
    title, subtitle, desc, score, position, delay 
}) {
    const isLeft = position === 'left';
    
    // Calculate the 'Knee' or 'Elbow' of the line
    // The line goes: Start -> Diagonal -> Horizontal -> Card
    const elbowX = isLeft ? -50 : 50;
    const elbowY = cardOffsetY; // Align vertically with the card immediately

    // Card Position Style
    const cardStyle = {
        top: 0,
        left: 0,
        transform: `translate(${cardOffsetX}px, ${cardOffsetY}px)`
    };
    
    // To center the card div on the line end point:
    // If Left: Line ends at (cardOffsetX, cardOffsetY). Card right edge should be there.
    // If Right: Line ends at (cardOffsetX, cardOffsetY). Card left edge should be there.
    
    const cardContainerClass = isLeft 
        ? "absolute -translate-y-1/2 right-0 pr-4" 
        : "absolute -translate-y-1/2 left-0 pl-4";

    return (
        <div className="absolute" style={{ top: `${targetY}%`, left: `${targetX}%` }}>
            
            {/* 1. Target Point (Face) */}
            <div className="absolute -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-teal-400 rounded-full shadow-[0_0_15px_rgba(45,212,191,0.8)] z-10">
                 <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-75"></div>
            </div>

            {/* 2. Seamless SVG Line */}
            <svg 
                className="absolute overflow-visible pointer-events-none"
                style={{ top: 0, left: 0 }}
            >
                <defs>
                    <filter id="glow-line" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                    <linearGradient id={`grad-${position}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(45,212,191,0.2)" />
                        <stop offset="50%" stopColor="rgba(45,212,191,1)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,1)" />
                    </linearGradient>
                </defs>
                
                <motion.path
                    d={`M 0 0 L ${elbowX} ${elbowY} L ${cardOffsetX} ${cardOffsetY}`}
                    fill="none"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeOpacity="0.8"
                    filter="url(#glow-line)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: delay, duration: 0.8, ease: "easeOut" }}
                />
                
                {/* Connection Dot at Card End */}
                <motion.circle 
                    cx={cardOffsetX} 
                    cy={cardOffsetY} 
                    r="3" 
                    fill="white"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: delay + 0.8 }}
                />
            </svg>

            {/* 3. The Card */}
            <div 
                className="absolute w-[240px] flex items-center"
                style={{ 
                    transform: `translate(${cardOffsetX}px, ${cardOffsetY}px)`,
                    // Move card body relative to the anchor point (0,0 of this div)
                    // If left, we want the card to be to the LEFT of (0,0)
                    left: isLeft ? '-240px' : '0px',
                    top: '-70px' // Adjust to center vertically roughly
                }}
            >
                <motion.div
                    initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: delay + 0.6, duration: 0.5 }}
                    className={`
                        w-full
                        backdrop-blur-xl bg-white/70 
                        border border-white/50
                        rounded-xl overflow-hidden
                        shadow-2xl
                        p-4
                        text-left
                        relative
                    `}
                >
                    {/* Connection Node Indicator */}
                    <div className={`
                        absolute top-1/2 -translate-y-1/2 w-1.5 h-8 bg-teal-400
                        ${isLeft ? '-right-[1px] rounded-l-sm' : '-left-[1px] rounded-r-sm'}
                    `}></div>

                    <div className="flex justify-between items-start border-b border-gray-200 pb-2 mb-2">
                        <div>
                            <span className="text-[10px] font-bold text-teal-700 tracking-widest uppercase">{title}</span>
                            <h4 className="text-sm font-serif font-bold text-gray-900">{subtitle}</h4>
                        </div>
                        <span className="text-xl font-bold text-teal-600">{score}</span>
                    </div>
                    
                    <p className="text-[11px] text-gray-600 leading-tight mb-2">
                        {desc}
                    </p>
                    
                    {/* Mini Graph */}
                    <div className="flex items-end gap-1 h-6 mt-2 opacity-50">
                        <div className="w-1/5 bg-teal-200 h-[40%] rounded-t-sm"></div>
                        <div className="w-1/5 bg-teal-300 h-[70%] rounded-t-sm"></div>
                        <div className="w-1/5 bg-teal-400 h-[50%] rounded-t-sm"></div>
                        <div className="w-1/5 bg-teal-500 h-[90%] rounded-t-sm"></div>
                        <div className="w-1/5 bg-teal-600 h-[60%] rounded-t-sm"></div>
                    </div>

                </motion.div>
            </div>
        </div>
    );
});
