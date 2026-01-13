import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagneticButton } from './ui/MagneticButton';
import { ArrowUpRight } from 'lucide-react';
// Import user provided images
const stage2Image = "https://github.com/wognsben/jjtest/blob/main/NEW%20IG/MAIN%20HERO.png?raw=true";
const fallbackImage = "https://images.unsplash.com/photo-1692318535011-09ea0e3a7aac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBjbGluaWMlMjBtb2RlbCUyMGFlc3RoZXRpYyUyMGJyaWdodCUyMHNraW58ZW58MXx8fHwxNzY4MzA3Njk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

gsap.registerPlugin(ScrollTrigger);

export function Hero({ setIntroCompleted, onOpenConsultation }: { setIntroCompleted: (v: boolean) => void; onOpenConsultation?: () => void }) {
  const [bgUrl, setBgUrl] = useState(stage2Image);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  // Refs
  const glassLayerRef = useRef<HTMLDivElement>(null); // The Fluted Glass Overlay
  const jadeWindowRef = useRef<HTMLDivElement>(null); // The Portal Frame
  const stage2ContentRef = useRef<HTMLDivElement>(null); 
  const cursorRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null); // The Background Image itself

  const hasCompletedRef = useRef(false);

  // Mouse Follower
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.6,
          ease: "power3.out"
        });
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // Initialize Mask Size with responsive logic
      const isMobile = window.innerWidth < 768;
      const initialMaskX = isMobile ? "60vw" : "280px"; // Slightly smaller on mobile to fit width
      const initialMaskY = isMobile ? "80vw" : "380px";

      gsap.set(glassLayerRef.current, { 
        "--mask-size-x": initialMaskX, 
        "--mask-size-y": initialMaskY 
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%", 
          pin: true,
          scrub: 1, // Smooth interaction
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

      // 1. (Removed Intro Text Animation)

      // 2. Expand the "Clear" Hole (Mask Expansion)
      // This reveals the background clearly by removing the glass filter
      tl.to(glassLayerRef.current, {
        "--mask-size-x": "150vw", 
        "--mask-size-y": "150vw", 
        ease: "power2.inOut",
        duration: 3
      }, 0);

      // 3. Expand the Jade Rim (Sync with mask) and Fade Out
      tl.to(jadeWindowRef.current, {
        scale: 15,
        opacity: 0,
        borderWidth: "0px", // Thin out as it expands
        ease: "power2.inOut",
        duration: 2.5
      }, 0);

      // 4. Background Image settles in (Slight zoom out effect)
      tl.fromTo(bgImageRef.current, {
        scale: 1.1,
      }, {
        scale: 1,
        ease: "power2.out",
        duration: 3
      }, 0);

      // 5. Reveal Stage 2 Text Content
      tl.fromTo(stage2ContentRef.current, {
        opacity: 0,
        y: 60
      }, {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        duration: 1
      }, 1.8);

    }, containerRef);
    return () => ctx.revert();
  }, [setIntroCompleted]);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#E0E5E2]">
      
      {/* Custom Cursor (White Glow) */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-32 h-32 bg-white/30 rounded-full blur-[50px] pointer-events-none z-[60] -translate-x-1/2 -translate-y-1/2 mix-blend-soft-light"
      />

      {/* ================================================================= */}
      {/* LAYER 1 (BOTTOM): The Real Image (Stage 2)                        */}
      {/* - This is always visible.                                         */}
      {/* - Initially, it's seen BLURRED through the glass layer,           */}
      {/*   except for the center hole where it is CLEAR.                   */}
      {/* ================================================================= */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        {/* Hidden Image to detect loading errors (e.g. Private Repo) */}
        <img 
            src={stage2Image} 
            className="hidden" 
            onError={() => setBgUrl(fallbackImage)}
            alt="background-loader"
        />
        <div 
            ref={bgImageRef}
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ 
              backgroundImage: `url('${bgUrl}')`,
              backgroundPosition: 'center center',
            }}
        />
        {/* Cinematic Tint to match brand colors */}
        <div className="absolute inset-0 bg-[#5E7A70] mix-blend-multiply opacity-10" />
      </div>


      {/* ================================================================= */}
      {/* LAYER 2 (OVERLAY): Premium Fluted Glass Effect (Stage 1)          */}
      {/* - Covers the whole screen initially.                              */}
      {/* - Has a mask hole in the center.                                  */}
      {/* ================================================================= */}
      <div 
         ref={glassLayerRef}
         className="absolute inset-0 z-10 w-full h-full pointer-events-none"
         style={{
            // The mask creates the clear hole. 
            // 'transparent' is the hole, 'black' is the glass.
            maskImage: `radial-gradient(ellipse var(--mask-size-x) var(--mask-size-y) at center, transparent 45%, black 46%)`,
            WebkitMaskImage: `radial-gradient(ellipse var(--mask-size-x) var(--mask-size-y) at center, transparent 45%, black 46%)`,
            maskComposite: 'exclude',
            WebkitMaskComposite: 'source-out', 
            // Note: 'source-out' usually works best for "punching a hole" in webkit
         }}
      >
         {/* 1. Backdrop Blur (Frosted Effect) */}
         <div className="absolute inset-0 backdrop-blur-[20px] bg-white/10" />
         
         {/* 2. Fluted Glass Texture (Vertical Stripes) */}
         {/* Using repeating linear gradient for the reeded/fluted glass look */}
         <div 
            className="absolute inset-0 opacity-40 mix-blend-overlay"
            style={{
                backgroundImage: `repeating-linear-gradient(
                    90deg,
                    transparent 0px,
                    transparent 2px,
                    rgba(255, 255, 255, 0.1) 2px,
                    rgba(255, 255, 255, 0.1) 4px,
                    rgba(0, 0, 0, 0.1) 4px,
                    rgba(0, 0, 0, 0.1) 6px
                )`
            }}
         />

         {/* 3. Noise Texture for Realism */}
         <div className="absolute inset-0 opacity-[0.07] mix-blend-overlay" style={{backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")'}} />
         
         {/* 4. Jade Tint (Subtle Greenish hue of thick glass) */}
         <div className="absolute inset-0 bg-[#8BAFA5] mix-blend-overlay opacity-20" />
      </div>


      {/* ================================================================= */}
      {/* LAYER 3 (DECORATION): The Jade Portal Rim                         */}
      {/* - Sits exactly on the edge of the mask hole.                      */}
      {/* ================================================================= */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
         <div 
            ref={jadeWindowRef}
            className="relative w-[60vw] h-[80vw] md:w-[280px] md:h-[380px] rounded-[50%]"
         >
            {/* Inner Border (Sharp) */}
            <div className="absolute inset-0 rounded-[50%] border-[1px] border-white/60 shadow-[0_0_15px_rgba(255,255,255,0.3)]"></div>
            
            {/* Outer Glow (Jade) */}
            <div className="absolute -inset-[4px] rounded-[50%] border-[4px] border-[#8BAFA5]/30 blur-[4px]"></div>
            
            {/* Specular Highlights (Glass Edge Reflection) */}
            <div className="absolute top-0 left-1/4 w-1/2 h-[2px] bg-white/80 blur-[1px]"></div>
            <div className="absolute bottom-0 right-1/4 w-1/2 h-[2px] bg-white/50 blur-[1px]"></div>
         </div>
      </div>


      {/* ================================================================= */}
      {/* LAYER 4 (CONTENT): Stage 2 Content (Revealed later)               */}
      {/* ================================================================= */}
      <div 
            ref={stage2ContentRef}
            className="absolute inset-0 z-30 flex flex-col justify-center px-6 md:px-20 lg:px-32 max-w-[1600px] mx-auto h-full pointer-events-auto"
        >
             <div className="mb-12">
                {/* REMOVED H1 "ADO CLINIC - The Point" as requested */}
                
                {/* Description Text */}
                <div className="bg-white/40 backdrop-blur-md p-8 rounded-3xl border border-white/40 max-w-2xl shadow-lg mt-32">
                    <p className="text-[#121C1A] text-lg md:text-2xl font-light leading-relaxed">
                        모든 아름다움은<br/>
                        <span className="font-semibold">마지막 한 점</span>, 아도에서 더해질때 비로소 완성됩니다.
                    </p>
                </div>
            </div>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 md:left-auto md:right-32 md:translate-x-0">
                <MagneticButton 
                    onClick={() => navigate('/contact')}
                    className="group bg-[#991B1B] text-white rounded-full px-10 py-5 text-sm font-bold tracking-[0.2em] hover:bg-[#7F1D1D] shadow-2xl overflow-hidden"
                >
                    <span className="relative z-10 flex items-center gap-3">
                        CONTACT US
                        <span className="opacity-70 font-normal border-l border-white/30 pl-3">상담신청</span>
                        <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </span>
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300 rounded-full" />
                </MagneticButton>
            </div>
      </div>

    </div>
  );
}
