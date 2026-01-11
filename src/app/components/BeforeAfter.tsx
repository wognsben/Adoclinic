import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CompareSlider } from './CompareSlider';

// Case Data
const cases = [
  { 
    id: "01",
    title: "Elsco Lifting", 
    category: "Lifting", 
    desc: "처진 턱선을 끌어올리는 가장 강력한 비수술적 해법.",
    img: "https://images.unsplash.com/photo-1729337531424-198f880cb6c7?q=80&w=1600&auto=format&fit=crop" 
  },
  { 
    id: "02",
    title: "Eye Correction", 
    category: "Filler", 
    desc: "인위적이지 않은 눈매 교정, 맑은 인상을 완성하다.",
    img: "https://images.unsplash.com/photo-1758598304384-1f678eabdd4f?q=80&w=1600&auto=format&fit=crop" 
  },
  { 
    id: "03",
    title: "V-Line Filler", 
    category: "Filler", 
    desc: "무너진 턱 끝의 볼륨을 채워 완성하는 우아한 프로필.",
    img: "https://images.unsplash.com/photo-1576015054964-5223bf014dbe?q=80&w=1600&auto=format&fit=crop" 
  },
  { 
    id: "04",
    title: "Ulthera 600", 
    category: "Lifting", 
    desc: "피부 깊은 곳부터 차오르는 탄력, 시간을 되돌리다.",
    img: "https://images.unsplash.com/photo-1663691222849-92b8eb09fda5?q=80&w=1600&auto=format&fit=crop" 
  },
  { 
    id: "05",
    title: "Volume Lip", 
    category: "Filler", 
    desc: "과하지 않은 볼륨감, 본연의 아름다움을 살린 입술.",
    img: "https://images.unsplash.com/photo-1605553700972-5b6ba4447850?q=80&w=1600&auto=format&fit=crop" 
  },
  { 
    id: "06",
    title: "Sofwave", 
    category: "Lifting", 
    desc: "잔주름 없는 매끈한 이마, 하이엔드 리프팅의 정점.",
    img: "https://images.unsplash.com/photo-1599683064250-4f96e6b1379b?q=80&w=1600&auto=format&fit=crop" 
  },
];

export function BeforeAfter() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const linesContainerRef = useRef<HTMLDivElement>(null);
  
  // Initialize lines
  useEffect(() => {
    if (!linesContainerRef.current) return;
    
    // Clear existing
    linesContainerRef.current.innerHTML = '';
    
    // Create 60 lines
    for (let i = 0; i < 60; i++) {
      const line = document.createElement('div');
      line.className = 'w-[2px] bg-[#1A1A1A]/20 transition-all duration-500 ease-out origin-bottom';
      line.style.height = '15px'; // base height
      linesContainerRef.current.appendChild(line);
    }
    
    // Trigger initial wave
    updateDragLines(0);
  }, []);

  const updateDragLines = (activeIndex: number) => {
    if (!linesContainerRef.current) return;
    const lines = Array.from(linesContainerRef.current.children) as HTMLElement[];
    const totalLines = lines.length;
    const totalSlides = cases.length;
    
    // Calculate center position for active slide
    // Map activeIndex (0-5) to line index (0-59)
    const centerLineIdx = (activeIndex / (totalSlides - 1)) * (totalLines - 1);
    
    lines.forEach((line, i) => {
      // Calculate distance from center
      const dist = Math.abs(i - centerLineIdx);
      const maxDist = 15; // Influence range
      
      if (dist < maxDist) {
        // Wave math
        const normalizedDist = dist / maxDist;
        const waveHeight = Math.cos(normalizedDist * Math.PI / 2);
        const height = 15 + (waveHeight * 35); // Base 15 + Wave 35 = Max 50
        const opacity = 0.2 + (waveHeight * 0.6); // Base 0.2 + Wave 0.6 = Max 0.8
        
        line.style.height = `${height}px`;
        line.style.backgroundColor = `rgba(26, 26, 26, ${opacity})`;
      } else {
        line.style.height = '15px';
        line.style.backgroundColor = 'rgba(26, 26, 26, 0.2)';
      }
    });
  };

  const goTo = (index: number) => {
    if (isAnimating || index === currentIdx) return;
    setIsAnimating(true);
    
    const direction = index > currentIdx ? 1 : -1;
    const nextSlide = slidesRef.current[index];
    const currentSlide = slidesRef.current[currentIdx];
    
    // Update lines immediately for responsiveness
    updateDragLines(index);

    // GSAP Timeline
    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentIdx(index);
        setIsAnimating(false);
      }
    });

    // 1. Title Exit
    tl.to([titleRef.current, descRef.current], {
      y: -30,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in"
    });

    // 2. Slide Transition
    if (nextSlide && currentSlide) {
      // Setup next slide
      gsap.set(nextSlide, { 
        zIndex: 10, 
        autoAlpha: 1,
        yPercent: direction === 1 ? 100 : -100,
        scale: 0.8
      });
      
      // Animate next slide in
      tl.to(nextSlide, {
        yPercent: 0,
        scale: 1,
        duration: 1,
        ease: "power4.inOut"
      }, "-=0.2"); // Overlap slightly
      
      // Animate current slide out
      tl.to(currentSlide, {
        scale: 0.9,
        autoAlpha: 0,
        duration: 1,
        ease: "power4.inOut"
      }, "<"); // Start same time
    }

    // 3. Title Enter (New Content)
    tl.call(() => {
      // This part assumes React state update would handle content change, 
      // but inside GSAP context we might need to manually trigger text change visually if we want perfect sync.
      // Since we rely on React rendering the text based on `currentIdx`, there's a slight delay.
      // For this implementation, we will update text via state after animation or use a separate ref approach.
      // To keep it simple with React:
    });
    
    // We animate text back in AFTER index update
    // But since state update is async, we do it in a separate effect or use a little trick.
    // Let's use a "key" on the text elements to force re-mount or simple opacity animation.
    
    // Actually, better way:
    // We can't easily animate text content change mid-timeline in React without state.
    // So we will just animate in the *new* text after state change.
  };

  // Effect to animate text IN when index changes
  useEffect(() => {
    gsap.fromTo([titleRef.current, descRef.current], 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.3 }
    );
  }, [currentIdx]);

  const handleNext = () => {
    const nextIdx = (currentIdx + 1) % cases.length;
    goTo(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (currentIdx - 1 + cases.length) % cases.length;
    goTo(prevIdx);
  };

  return (
    <section className="relative w-full h-[900px] bg-[#Fdfbf9] overflow-hidden flex flex-col items-center justify-center">
      
      {/* Background Slides Container */}
      <div className="absolute inset-0 w-full h-full">
        {cases.map((item, i) => (
          <div 
            key={i}
            ref={(el) => slidesRef.current[i] = el}
            className={`absolute inset-0 w-full h-full flex items-center justify-center p-0 md:p-12 ${i === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <div className="w-full h-full md:w-[90%] md:h-[90%] overflow-hidden shadow-2xl relative">
              {/* Using Compare Slider instead of static image */}
              <CompareSlider 
                title={item.title}
                category={item.category}
                before={item.img}
                after={item.img} // In real scenario, use actual after image
                isActive={i === currentIdx}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom UI Container */}
      <div className="absolute bottom-0 left-0 right-0 z-50 flex flex-col items-center pb-8 md:pb-12 pointer-events-none">
        
        {/* Text Info (Pointer events auto for text selection if needed) */}
        <div className="text-center mb-8 pointer-events-auto max-w-xl px-6">
          <span className="text-[#5E7A70] text-xs font-bold tracking-[0.3em] uppercase mb-2 block">
            Clinical Archive {cases[currentIdx].id}
          </span>
          <h2 ref={titleRef} className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-3">
            {cases[currentIdx].title}
          </h2>
          <p ref={descRef} className="text-[#555] font-light text-sm md:text-base">
            {cases[currentIdx].desc}
          </p>
        </div>

        {/* Controls Container (Glassmorphism) */}
        <div className="bg-white/80 backdrop-blur-md border border-[#1A1A1A]/5 rounded-2xl p-6 w-[90%] max-w-2xl shadow-xl pointer-events-auto">
          
          {/* Navigation & Counter */}
          <div className="flex items-center justify-between mb-6 text-[#1A1A1A]">
            <button 
              onClick={handlePrev}
              className="p-2 hover:bg-black/5 rounded-full transition-colors"
              disabled={isAnimating}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-4 font-serif text-lg">
              <span className="text-[#1A1A1A] font-bold">{cases[currentIdx].id}</span>
              <span className="w-8 h-[1px] bg-[#1A1A1A]/20"></span>
              <span className="text-[#888]">{String(cases.length).padStart(2, '0')}</span>
            </div>

            <button 
              onClick={handleNext}
              className="p-2 hover:bg-black/5 rounded-full transition-colors"
              disabled={isAnimating}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Wave Indicator */}
          <div className="relative w-full h-[50px] mb-6 flex items-end justify-between overflow-hidden" ref={linesContainerRef}>
            {/* Lines injected via JS */}
          </div>

          {/* Thumbnails */}
          <div className="flex justify-between gap-2 overflow-hidden">
            {cases.map((item, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                onMouseEnter={() => updateDragLines(i)}
                className={`relative h-16 flex-1 min-w-0 transition-all duration-300 overflow-hidden group ${i === currentIdx ? 'flex-[2]' : 'opacity-50 hover:opacity-80'}`}
              >
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
                {/* Active Indicator overlay */}
                {i === currentIdx && (
                  <div className="absolute inset-0 border-2 border-[#5E7A70] pointer-events-none" />
                )}
              </button>
            ))}
          </div>

        </div>

      </div>

    </section>
  );
}
