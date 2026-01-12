import React, { useRef, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagneticButton } from './ui/MagneticButton';
import { ArrowUpRight } from 'lucide-react';
import HeroGL from './HeroGL';

gsap.registerPlugin(ScrollTrigger);

export function Hero({ setIntroCompleted, onOpenConsultation }: { setIntroCompleted: (v: boolean) => void; onOpenConsultation?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const portalRef = useRef<HTMLDivElement>(null);
  const mainBgRef = useRef<HTMLDivElement>(null);
  const introTextRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const hasCompletedRef = useRef(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%", 
          pin: true,
          scrub: 1.5, 
          onLeave: () => {
            setIntroCompleted(true);
            hasCompletedRef.current = true; 
          },
          onEnterBack: () => {
            if (!hasCompletedRef.current) {
              setIntroCompleted(false);
            }
          }
        }
      });

      // 1. Intro Text fades out
      tl.to(introTextRef.current, { opacity: 0, scale: 0.95, duration: 0.5 });

      // 2. The entire GL Background (Portal) fades out/scales up to reveal the content
      tl.to(portalRef.current, {
        opacity: 0,
        scale: 1.1, // Subtle scale
        ease: "power2.inOut",
        duration: 1.5,
        pointerEvents: "none" // Disable interaction after scroll
      }, 0.2); 

      // 3. Main Background & Content Reveal
      tl.fromTo(mainBgRef.current, {
        scale: 1.1,
        opacity: 0,
        filter: "blur(10px)"
      }, {
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        ease: "power2.out",
        duration: 1.5
      }, 0.2);
      
      // 4. Main Content Animation
      tl.fromTo(mainContentRef.current, {
        opacity: 0,
        y: 30
      }, {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        duration: 1
      }, 1.0);

    }, containerRef);
    return () => ctx.revert();
  }, [setIntroCompleted]);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#0c1210]">
      
      {/* ========================================================= */}
      {/* 2. DESTINATION: Main Hero Content (Revealed after scroll) */}
      {/* ========================================================= */}
      <div 
        ref={mainBgRef}
        className="absolute inset-0 w-full h-full overflow-hidden bg-[#E6E4E0]" // Warm Stone Base
      >
        {/* Background Image: Gallery Space */}
        <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center opacity-90"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1620641788421-7f1c918e7899?q=80&w=2000&auto=format&fit=crop')`, // Stone/Marble texture or Gallery
              backgroundPosition: 'center center',
            }}
        />
        {/* Deep Green Tint Overlay */}
        <div className="absolute inset-0 bg-[#0a2f1c] mix-blend-multiply opacity-30" />
        
        {/* Main Content Area */}
        <div 
            ref={mainContentRef}
            className="absolute inset-0 z-10 flex flex-col justify-center px-6 md:px-20 lg:px-32 max-w-[1600px] mx-auto h-full"
        >
            {/* Title Group */}
            <div className="mb-12">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#1c1917] mb-6 tracking-tight">
                    ADO Clinic <span className="font-light opacity-50 text-3xl align-top">Est. 2024</span>
                </h1>
                
                {/* Description */}
                <div className="border-l-2 border-[#1c1917]/20 pl-8 max-w-2xl">
                    <p className="text-[#44403c] text-lg md:text-2xl font-light leading-relaxed font-serif">
                        시간이 흘러도 변치 않는<br/>
                        <span className="font-semibold text-[#1c1917]">견고한 아름다움</span>을 조각합니다.
                    </p>
                </div>
            </div>

            {/* CTA Button */}
            <div className="absolute bottom-12 left-6 md:left-auto md:right-32">
                <MagneticButton 
                    onClick={() => navigate('/contact')}
                    className="group bg-[#0f392b] text-[#e7e5e4] rounded-none px-12 py-6 text-sm font-medium tracking-[0.2em] hover:bg-[#144736] transition-all duration-500"
                >
                    <span className="flex items-center gap-4">
                        PRIVATE CONSULTATION
                        <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </span>
                </MagneticButton>
            </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 1. ENTRANCE: Stage 1 (Interactive WebGL Background)       */}
      {/* ========================================================= */}
      <div 
        ref={portalRef}
        className="absolute inset-0 z-20 flex items-center justify-center w-full h-full bg-[#051811]"
      >
        {/* High-End 3D WebGL Background */}
        <HeroGL />
        
        {/* Floating Text Overlay (Stage 1) */}
        <div 
            ref={introTextRef}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none"
        >
            <div className="flex flex-col items-center text-center mix-blend-overlay">
                <span className="text-xs md:text-sm tracking-[0.6em] mb-8 text-[#e5e5e5] uppercase opacity-80">
                    High-End Aesthetic Gallery
                </span>
                <h2 className="text-6xl md:text-8xl lg:text-9xl font-serif text-[#f5f5f4] tracking-wider opacity-90">
                    ADO
                </h2>
                <span className="mt-4 text-sm md:text-lg text-[#d6d3d1] font-light tracking-[0.3em] opacity-70">
                    CLINIC & GALLERY
                </span>
            </div>
            
            <div className="absolute bottom-12 flex flex-col items-center gap-4 opacity-40">
                <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white to-transparent"></div>
                <span className="text-[10px] tracking-widest uppercase text-white/60">Scroll to Explore</span>
            </div>
        </div>
      </div>

    </div>
  );
}
