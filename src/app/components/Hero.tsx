import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagneticButton } from './ui/MagneticButton';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Hero({ setIntroCompleted, onOpenConsultation }: { setIntroCompleted: (v: boolean) => void; onOpenConsultation?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const mainBgRef = useRef<HTMLDivElement>(null);
  const introTextRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%", // Scroll distance
          pin: true,
          scrub: 1.5, // Smooth scrubbing
          onLeave: () => setIntroCompleted(true),
          onEnterBack: () => setIntroCompleted(false)
        }
      });

      // 1. Intro Text fades out quickly
      tl.to(introTextRef.current, { opacity: 0, scale: 0.9, duration: 0.2 });

      // 2. Portal Scale Up (Tunnel Effect)
      // The portal expands to reveal the main background behind it
      tl.to(portalRef.current, {
        scale: 40, 
        opacity: 0,
        ease: "power3.inOut",
        duration: 2
      }, 0); // Start at same time

      // 3. Main Background & Content Reveal
      // Subtle scale down from 1.1 to 1 for a "settling in" feel
      tl.fromTo(mainBgRef.current, {
        scale: 1.2,
        filter: "blur(10px) brightness(0.5)"
      }, {
        scale: 1,
        filter: "blur(0px) brightness(1)",
        ease: "power2.out",
        duration: 2
      }, 0.2);
      
      // 4. Main Content Animation (Text & Button)
      tl.fromTo(mainContentRef.current, {
        opacity: 0,
        y: 50
      }, {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        duration: 1
      }, 1.5); // Start late

    }, containerRef);
    return () => ctx.revert();
  }, [setIntroCompleted]);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black">
      
      {/* ========================================================= */}
      {/* 2. DESTINATION: Main Hero Content (Revealed after scroll) */}
      {/* ========================================================= */}
      <div 
        ref={mainBgRef}
        className="absolute inset-0 w-full h-full overflow-hidden bg-[#EAEFE9]" // Light celadon base
      >
        {/* Background Image: Celadon/Mint Gallery Space */}
        <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1679834841135-b73991e3941d?q=80&w=2000&auto=format&fit=crop')`,
              backgroundPosition: 'center center',
            }}
        />
        {/* Celadon Tint Overlay */}
        <div className="absolute inset-0 bg-[#5E7A70] mix-blend-multiply opacity-20" />
        
        {/* Main Content Area */}
        <div 
            ref={mainContentRef}
            className="absolute inset-0 z-10 flex flex-col justify-center px-6 md:px-20 lg:px-32 max-w-[1600px] mx-auto h-full"
        >
            {/* Title Group */}
            <div className="mb-12">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 drop-shadow-sm tracking-tight">
                    ADO Clinic <span className="font-light opacity-70">—</span> <br/>
                    The Point
                </h1>
                
                {/* Rounded Box Description */}
                <div className="bg-black/40 backdrop-blur-md p-8 rounded-3xl border border-white/10 max-w-2xl">
                    <p className="text-white text-lg md:text-2xl font-light leading-relaxed">
                        모든 아름다움은<br/>
                        <span className="font-semibold text-white/90">마지막 한 점</span>, 아도에서 더해질때 비로소 완성됩니다.
                    </p>
                </div>
            </div>

            {/* CTA Button (Magnetic) */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 md:left-auto md:right-32 md:translate-x-0">
                <MagneticButton 
                    onClick={onOpenConsultation}
                    className="group bg-[#991B1B] text-white rounded-full px-10 py-5 text-sm font-bold tracking-[0.2em] hover:bg-[#7F1D1D] shadow-2xl overflow-hidden"
                >
                    <span className="relative z-10 flex items-center gap-3">
                        CONTACT US
                        <span className="opacity-70 font-normal border-l border-white/30 pl-3">상담신청</span>
                        <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </span>
                    {/* Hover Fill Effect */}
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300 rounded-full" />
                </MagneticButton>
            </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 1. ENTRANCE: The Tunnel/Portal (Visible initially)        */}
      {/* ========================================================= */}
      <div 
        ref={portalRef}
        className="absolute inset-0 z-20 flex items-center justify-center bg-[#050505]"
      >
        {/* The "Light at the end of the tunnel" */}
        <div className="relative w-[300px] h-[400px] bg-white overflow-hidden shadow-[0_0_50px_rgba(94,122,112,0.5)] rounded-full">
           <img 
            src="https://images.unsplash.com/photo-1679834841135-b73991e3941d?q=80&w=500&auto=format&fit=crop"
            alt="Portal View"
            className="w-full h-full object-cover opacity-80 scale-150"
           />
           <div className="absolute inset-0 bg-[#5E7A70]/30 mix-blend-overlay"></div>
        </div>
      </div>

      {/* Intro Text (Fades out immediately on scroll) */}
      <div 
        ref={introTextRef}
        className="absolute inset-0 z-30 flex flex-col items-center justify-center text-white pointer-events-none"
      >
        <div className="flex flex-col items-center mix-blend-difference">
            <span className="text-xs tracking-[0.5em] mb-4 uppercase text-[#5E7A70]">The Beginning</span>
            <h2 className="text-4xl md:text-6xl font-serif tracking-widest text-white">ADO</h2>
        </div>
        
        <div className="absolute bottom-12 flex flex-col items-center gap-2 animate-bounce opacity-50">
            <span className="text-[10px] tracking-widest uppercase">Scroll to Enter</span>
            <div className="w-[1px] h-8 bg-white"></div>
        </div>
      </div>

    </div>
  );
}
