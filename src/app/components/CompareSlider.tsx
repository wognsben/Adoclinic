import React, { useState, useRef, useCallback } from 'react';
import { ArrowLeftRight, MoveHorizontal } from 'lucide-react';

interface CompareSliderProps {
  before: string;
  after: string;
  category: string;
  title: string;
  isActive?: boolean;
}

export const CompareSlider = ({ before, after, category, title, isActive = true }: CompareSliderProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPosition(percent);
  }, []);

  // Mouse interaction
  const onMouseMove = (e: React.MouseEvent) => {
    if (isHovering) handleMove(e.clientX);
  };
  
  // Touch interaction
  const onTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <div className={`w-full h-full relative group transition-opacity duration-500 ${isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      
      {/* Slider Area */}
      <div 
        ref={containerRef}
        className="relative w-full h-full overflow-hidden cursor-ew-resize select-none"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={onMouseMove}
        onTouchMove={onTouchMove}
      >
        {/* Background (After - Natural) */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={after} 
            alt="After" 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-8 right-8 bg-[#1A1A1A]/80 backdrop-blur-sm text-white text-xs px-4 py-1.5 rounded-full uppercase tracking-widest z-10 font-medium">
            After
          </div>
        </div>

        {/* Foreground (Before - Natural) */}
        <div 
          className="absolute inset-0 w-full h-full border-r border-white/50 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img 
            src={before} 
            alt="Before" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-sm text-[#1A1A1A] text-xs px-4 py-1.5 rounded-full uppercase tracking-widest z-10 font-bold">
            Before
          </div>
        </div>

        {/* Slider Handle */}
        <div 
          className="absolute top-0 bottom-0 w-[1px] bg-white z-20 pointer-events-none shadow-[0_0_20px_rgba(0,0,0,0.2)]"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md border border-white rounded-full flex items-center justify-center shadow-2xl">
            <ArrowLeftRight className="w-5 h-5 text-white" />
          </div>
        </div>

      </div>
    </div>
  );
};
