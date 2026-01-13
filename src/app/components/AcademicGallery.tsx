import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Plus, Grid } from 'lucide-react';

const LECTURES = [
  {
    id: 1,
    title: "IMCAS World Congress 2024",
    location: "Paris, France",
    role: "Invited Speaker",
    image: "https://images.unsplash.com/photo-1696966358378-efa220a6d0cc?auto=format&fit=crop&q=80&w=1080"
  },
  {
    id: 2,
    title: "AMWC Monaco",
    location: "Monte Carlo, Monaco",
    role: "Live Demo Faculty",
    image: "https://images.unsplash.com/photo-1733222765056-b0790217baa9?auto=format&fit=crop&q=80&w=1080"
  },
  {
    id: 3,
    title: "Korea Derma 2023",
    location: "Seoul, Korea",
    role: "Key Doctor",
    image: "https://images.unsplash.com/photo-1576670160060-c4e874631c5a?auto=format&fit=crop&q=80&w=1080"
  },
  {
    id: 4,
    title: "Restylane Master Course",
    location: "Stockholm, Sweden",
    role: "Global Trainer",
    image: "https://images.unsplash.com/photo-1601839777132-b3f4e455c369?auto=format&fit=crop&q=80&w=1080"
  },
  {
    id: 5,
    title: "Juvederm Volux Launch",
    location: "Tokyo, Japan",
    role: "Expert Panel",
    image: "https://images.unsplash.com/photo-1677186304454-6fbe1fe3aaef?auto=format&fit=crop&q=80&w=1080"
  },
  {
    id: 6,
    title: "Aesthetica Global",
    location: "Las Vegas, USA",
    role: "Keynote Speaker",
    image: "https://images.unsplash.com/photo-1760420940953-3958ad9f6287?auto=format&fit=crop&q=80&w=1080"
  },
];

export function AcademicGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const totalItems = LECTURES.length;

  // Handle Next/Prev
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % totalItems);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  const setIndex = (index: number) => {
    setActiveIndex(index);
  }

  return (
    <div className="w-full relative select-none">
      
      {/* Gallery Container */}
      <div 
        ref={containerRef}
        className="w-full h-[650px] flex items-center justify-center relative bg-transparent rounded-[4px] overflow-visible"
      >
        
        {/* Floating Control Panel (Left Top) */}
        <div className="absolute top-8 left-6 md:top-12 md:left-12 z-30 flex flex-col items-start gap-4 pointer-events-none">
            {/* Counter */}
            <div className="flex items-end font-serif leading-none text-[#1A1A1A]">
                <span className="text-6xl md:text-8xl font-light tracking-tighter">
                {String(activeIndex + 1).padStart(2, '0')}
                </span>
                <span className="text-xl md:text-2xl font-light italic ml-3 opacity-40 mb-2 md:mb-3">
                / {String(totalItems).padStart(2, '0')}
                </span>
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex gap-3 pointer-events-auto mt-2 pl-1">
                <button 
                    onClick={handlePrev}
                    className="w-12 h-12 md:w-14 md:h-14 border border-[#1A1A1A]/20 hover:border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all duration-300 rounded-full flex items-center justify-center group bg-white/50 backdrop-blur-sm"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </button>
                <button 
                    onClick={handleNext}
                    className="w-12 h-12 md:w-14 md:h-14 border border-[#1A1A1A]/20 hover:border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all duration-300 rounded-full flex items-center justify-center group bg-white/50 backdrop-blur-sm"
                >
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>

        {/* Cards Area */}
        <div className="absolute inset-0 flex items-center justify-center perspective-[1000px]">
            <AnimatePresence mode="popLayout">
                {LECTURES.map((lecture, index) => {
                    let offset = index - activeIndex;
                    
                    // Simple Visibility Check
                    if (Math.abs(offset) > 2) return null; 

                    const isLast = index === totalItems - 1;

                    return (
                        <Card 
                            key={lecture.id} 
                            lecture={lecture} 
                            offset={offset} 
                            isLast={isLast}
                            onClick={() => setIndex(index)}
                        />
                    );
                })}
            </AnimatePresence>
        </div>

      </div>
    </div>
  );
}

// Individual Card Component with precise Motion
const Card = React.forwardRef(({ lecture, offset, isLast, onClick }: { lecture: any, offset: number, isLast: boolean, onClick: () => void }, ref: React.Ref<HTMLDivElement>) => {
    // Safety check
    if (!lecture) return null;

    const isActive = offset === 0;
    
    // Layout Calculation
    const xOffset = offset * 420; 
    const scale = isActive ? 1 : 0.85;
    const opacity = isActive ? 1 : 0.4;
    const zIndex = isActive ? 10 : 10 - Math.abs(offset);
    const rotateY = offset * -5;

    return (
        <motion.div
            ref={ref}
            layout
            initial={{ opacity: 0, x: xOffset + 100 }}
            animate={{ 
                opacity, 
                x: xOffset,
                scale,
                zIndex,
                rotateY,
                filter: isActive ? 'blur(0px) grayscale(0%)' : 'blur(2px) grayscale(100%)'
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 25,
                mass: 0.8
            }}
            className="absolute origin-center cursor-pointer"
            onClick={onClick}
            style={{ 
                width: '400px', 
                height: '520px',
                perspective: '1000px'
            }}
        >
            <div className="w-full h-full relative rounded-[8px] overflow-hidden shadow-2xl bg-white group">
                <img 
                    src={lecture.image} 
                    alt={lecture.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />

                {/* Badge (Top Left) */}
                <div className="absolute top-8 left-8">
                     <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#5F9EA0] animate-pulse" />
                        <span className="text-[10px] font-bold tracking-widest text-white uppercase">{lecture.role}</span>
                     </div>
                </div>

                {/* Last Item - View All Overlay Button */}
                {isLast && (
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                         <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex flex-col items-center justify-center gap-1 hover:scale-110 transition-transform duration-300 cursor-pointer shadow-lg group-last-btn">
                            <Grid className="w-6 h-6 text-white" />
                            <span className="text-[8px] font-bold text-white uppercase tracking-widest">View All</span>
                         </div>
                    </div>
                )}

                {/* Content (Bottom) */}
                <div className="absolute bottom-0 left-0 w-full p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-[#5F9EA0] text-xs font-bold tracking-[0.2em] uppercase mb-3">
                        {lecture.location}
                    </p>
                    <div className="flex justify-between items-end border-t border-white/20 pt-4">
                        <h3 className="text-3xl font-serif text-white leading-tight max-w-[80%]">
                            {lecture.title}
                        </h3>
                        {/* Only show regular arrow if NOT last item, or show it anyway but styling differs */}
                        {!isLast && (
                            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                                <ArrowUpRight className="w-4 h-4" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
});