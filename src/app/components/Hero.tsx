import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Hero({ setIntroCompleted }: { setIntroCompleted: (v: boolean) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const mainBgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%", // Longer scroll for smoother transition
          pin: true,
          scrub: 1,
          onLeave: () => setIntroCompleted(true),
          onEnterBack: () => setIntroCompleted(false)
        }
      });

      // 1. Text fades out
      tl.to(textRef.current, { opacity: 0, scale: 1.1, duration: 0.5 });

      // 2. Portal Scale Up (The "Zoom In" effect)
      tl.to(portalRef.current, {
        scale: 30, 
        opacity: 0,
        ease: "power2.inOut",
        duration: 3
      }, "<");

      // 3. Main Background Reveal (Venus in Mist)
      tl.fromTo(mainBgRef.current, {
        opacity: 0,
        scale: 1.1,
        filter: "blur(10px)"
      }, {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        ease: "power2.inOut",
        duration: 2
      }, "-=2.0"); 

    }, containerRef);
    return () => ctx.revert();
  }, [setIntroCompleted]);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black">
      
      {/* 2. Destination: The Venus in Celadon Mist */}
      <div 
        ref={mainBgRef}
        className="absolute inset-0 w-full h-full overflow-hidden bg-[#738F86]"
      >
        {/* Statue Image - Grayscale base with luminosity blend */}
        <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1583084578821-c4b20344477f?q=80&w=2500&auto=format&fit=crop')`, // Statue
              backgroundPosition: 'center 20%',
              filter: "grayscale(100%) contrast(1.2)",
              mixBlendMode: "luminosity"
            }}
        />
        {/* Additional Celadon Tint Overlay */}
        <div className="absolute inset-0 bg-[#738F86] mix-blend-multiply opacity-50" />
        
        {/* Mist/Fog Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#738F86] via-transparent to-transparent opacity-80" />
      </div>

      {/* 1. Entrance: The Portal (Window/Light) */}
      <div 
        ref={portalRef}
        className="absolute inset-0 z-20 flex items-center justify-center bg-black"
      >
        <div className="relative w-[40vw] h-[60vh] max-w-[600px] overflow-hidden shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1500&auto=format&fit=crop" 
            alt="Portal"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 border-[1px] border-white/20" />
        </div>
      </div>

      {/* Floating Text */}
      <div 
        ref={textRef}
        className="absolute inset-0 z-30 flex flex-col items-center justify-center text-white text-center pointer-events-none"
      >
        <p className="text-xs md:text-sm tracking-[0.5em] font-light uppercase mb-6 opacity-80">Gangnam, Seoul</p>
        <h1 className="text-6xl md:text-9xl font-serif tracking-tight mb-8 drop-shadow-2xl">
          ADO Clinic
        </h1>
        <div className="w-[1px] h-16 bg-white/50 mb-4" />
        <span className="text-[10px] tracking-[0.3em] uppercase opacity-70 animate-pulse">Scroll to Enter</span>
      </div>

    </div>
  );
}
