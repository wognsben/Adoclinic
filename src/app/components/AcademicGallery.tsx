import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, animate } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';

const LECTURES = [
  {
    id: 1,
    title: "IMCAS World Congress 2024",
    location: "Paris, France",
    role: "Invited Speaker",
    image: "https://images.unsplash.com/photo-1544531696-60195e297837?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcm5hdGlvbmFsJTIwY29uZmVyZW5jZXxlbnwxfHx8fDE3NjgxNDU1NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 2,
    title: "AMWC Monaco",
    location: "Monte Carlo, Monaco",
    role: "Live Demo Faculty",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc2VtaW5hcnxlbnwxfHx8fDE3NjgxNDU1Njd8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 3,
    title: "Korea Derma 2023",
    location: "Seoul, Korea",
    role: "Key Doctor",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mZXJlbmNlJTIwc3BlYWtlcnxlbnwxfHx8fDE3NjgxNDU1NzF8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 4,
    title: "Restylane Master Course",
    location: "Stockholm, Sweden",
    role: "Global Trainer",
    image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Juvederm Volux Launch",
    location: "Tokyo, Japan",
    role: "Expert Panel",
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Aesthetica Global",
    location: "Las Vegas, USA",
    role: "Keynote Speaker",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1000&auto=format&fit=crop"
  },
];

// Custom Arrow Button with Corner Borders
const CornerButton = ({ direction, onClick, disabled }: { direction: 'prev' | 'next', onClick: () => void, disabled: boolean }) => {
    return (
        <button 
            onClick={onClick}
            disabled={disabled}
            className={`group relative w-14 h-14 flex items-center justify-center transition-all duration-300 ${disabled ? 'opacity-30 cursor-not-allowed' : 'hover:bg-black/5 cursor-pointer'}`}
        >
            {/* Icon */}
            {direction === 'prev' ? (
                <ArrowLeft className="w-5 h-5 text-black" />
            ) : (
                <ArrowRight className="w-5 h-5 text-black" />
            )}

            {/* Corner Borders */}
            {/* Top Left */}
            <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-black transition-all duration-300 group-hover:w-full group-hover:h-full" />
            {/* Top Right */}
            <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-black transition-all duration-300 group-hover:w-full group-hover:h-full" />
            {/* Bottom Left */}
            <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-black transition-all duration-300 group-hover:w-full group-hover:h-full" />
            {/* Bottom Right */}
            <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-black transition-all duration-300 group-hover:w-full group-hover:h-full" />
        </button>
    )
}

export function AcademicGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  // Calculate widths for drag constraints
  useEffect(() => {
    if (sliderRef.current && containerRef.current) {
      const totalWidth = sliderRef.current.scrollWidth;
      const viewWidth = containerRef.current.offsetWidth;
      setSliderWidth(totalWidth);
      setContainerWidth(viewWidth);
    }
  }, []);

  const handleDrag = () => {
    const currentX = x.get();
    const slideWidth = 440; 
    const index = Math.round(Math.abs(currentX) / slideWidth);
    const clampedIndex = Math.min(Math.max(index, 0), LECTURES.length - 1);
    
    if (clampedIndex !== activeIndex) {
      setActiveIndex(clampedIndex);
    }
  };

  const handleNext = () => {
    const slideWidth = 440;
    const nextIndex = Math.min(activeIndex + 1, LECTURES.length - 1);
    setActiveIndex(nextIndex);
    animate(x, -nextIndex * slideWidth, { type: "spring", stiffness: 300, damping: 30 });
  };

  const handlePrev = () => {
    const slideWidth = 440;
    const prevIndex = Math.max(activeIndex - 1, 0);
    setActiveIndex(prevIndex);
    animate(x, -prevIndex * slideWidth, { type: "spring", stiffness: 300, damping: 30 });
  };

  return (
    <div className="relative w-full h-[600px] bg-[#F5F5F3] text-[#1A1A1A] overflow-hidden rounded-[20px] flex">
      
      {/* 1. Left Control Panel (White Theme) */}
      <div className="absolute left-0 top-0 bottom-0 w-[30%] z-20 bg-gradient-to-r from-[#F5F5F3] via-[#F5F5F3] to-transparent p-10 flex flex-col justify-between pointer-events-none md:pointer-events-auto">
        
        {/* Counter */}
        <div className="flex flex-col gap-2">
           <div className="flex items-end leading-none font-serif">
              <span className="text-8xl font-light text-[#1A1A1A]">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span className="text-2xl text-gray-400 mb-2 ml-4 font-light italic">
                / {String(LECTURES.length).padStart(2, '0')}
              </span>
           </div>
           <div className="h-[1px] w-24 bg-black/10 mt-4 rotate-[-15deg] origin-left transform translate-y-4"></div>
        </div>

        {/* Navigation Buttons (Corner Style) */}
        <div className="flex gap-4 mt-auto pl-2 pb-2">
           <CornerButton direction="prev" onClick={handlePrev} disabled={activeIndex === 0} />
           <CornerButton direction="next" onClick={handleNext} disabled={activeIndex === LECTURES.length - 1} />
        </div>
      </div>

      {/* 2. Main Slider Area */}
      <div 
        ref={containerRef} 
        className="w-full h-full pl-[30%] flex items-center"
      >
        <motion.div 
          ref={sliderRef}
          className="flex gap-8 px-8 cursor-grab active:cursor-grabbing"
          style={{ x }}
          drag="x"
          dragConstraints={{ right: 0, left: -(sliderWidth - containerWidth + 100) }}
          onDrag={handleDrag}
          dragElastic={0.1}
        >
          {LECTURES.map((lecture, index) => {
            const isActive = index === activeIndex;
            return (
              <motion.div 
                key={lecture.id}
                className={`relative flex-shrink-0 w-[400px] aspect-[4/5] rounded-lg overflow-hidden transition-all duration-500 shadow-sm ${isActive ? 'opacity-100 scale-100 ring-1 ring-black/5' : 'opacity-40 scale-95 hover:opacity-70 grayscale'}`}
                onClick={() => {
                    setActiveIndex(index);
                    animate(x, -index * 440, { type: "spring", stiffness: 300, damping: 30 });
                }}
              >
                {/* Image */}
                <img 
                  src={lecture.image} 
                  alt={lecture.title} 
                  className="w-full h-full object-cover"
                />
                
                {/* Inner Shadow for Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                {/* Caption (Glassmorphism Light) */}
                <motion.div 
                  className="absolute top-6 left-6 bg-white/90 backdrop-blur-md border border-white/50 px-4 py-2 rounded-full flex items-center gap-3 shadow-sm"
                  initial={false}
                  animate={{ y: isActive ? 0 : -20, opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="w-2 h-2 rounded-full bg-[#5F9EA0]" />
                  <span className="text-xs font-bold tracking-wide text-[#1A1A1A] uppercase">{lecture.role}</span>
                </motion.div>

                {/* Bottom Info */}
                <div className="absolute bottom-0 left-0 w-full p-8 transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
                   <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-2">{lecture.location}</p>
                   <div className="flex justify-between items-end">
                      <h3 className="text-2xl font-serif leading-tight text-white max-w-[85%]">{lecture.title}</h3>
                      <div className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                         <ArrowUpRight className="w-4 h-4" />
                      </div>
                   </div>
                </div>

                {/* Active Border (Inner White Frame) */}
                {isActive && (
                    <motion.div 
                        layoutId="activeBorder"
                        className="absolute inset-0 border-[1px] border-white/20 rounded-lg pointer-events-none" 
                    />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Custom Cursor Text */}
      <div className="absolute bottom-6 right-6 text-[#1A1A1A]/30 text-[10px] tracking-[0.2em] uppercase hidden md:block pointer-events-none">
         Drag / Scroll
      </div>

    </div>
  );
}
