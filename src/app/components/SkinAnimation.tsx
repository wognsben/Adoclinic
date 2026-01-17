import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function SkinAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!containerRef.current || !videoWrapperRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=200%", // 스크롤 길이 (천천히 열리도록 설정)
        pin: true,     // 화면 고정
        scrub: 1,      // 부드러운 반응
      }
    });

    // 1. Mask Expansion (Clip-path animation)
    // 중앙의 작은 직사각형(또는 원)에서 시작해 전체 화면으로 커짐
    tl.fromTo(videoWrapperRef.current, 
      { 
        clipPath: "inset(40% 45% 40% 45% round 10px)", // 작게 시작
        scale: 0.9, // 살짝 작음
      },
      { 
        clipPath: "inset(0% 0% 0% 0% round 0px)", // 전체 화면으로 확장
        scale: 1,   // 원래 크기로
        duration: 2,
        ease: "power2.inOut"
      }
    );

    // 2. Text Fade Out (영상에 집중하도록)
    tl.to(textRef.current, {
      opacity: 0,
      scale: 1.2,
      y: -50,
      duration: 1,
      ease: "power2.in"
    }, "<"); // 영상 확장과 동시에 시작

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#F5F5F3] overflow-hidden flex items-center justify-center">
      
      {/* Background Text (Initial View) */}
      <div 
        ref={textRef}
        className="absolute z-20 text-center mix-blend-difference pointer-events-none px-4"
      >
        <p className="text-xs font-bold tracking-[0.3em] text-[#B91C1C] mb-4 uppercase">
          The Process
        </p>
        <h2 className="text-5xl md:text-7xl font-serif text-white mb-6">
          Unveiling<br/>The True Skin
        </h2>
        <p className="text-white/80 text-sm tracking-widest max-w-md mx-auto">
          Scroll to witness the transformation
        </p>
      </div>

      {/* Video Container (The Masked Element) */}
      <div 
        ref={videoWrapperRef}
        className="relative w-full h-full z-10 bg-black overflow-hidden"
        style={{ clipPath: "inset(40% 45% 40% 45% round 10px)" }} // 초기 상태 (CSS fallback)
      >
        {/* Placeholder for Cinematic Video */}
        {/* 실제 구현 시에는 loop muted autoplay playsInline 속성이 있는 video 태그 사용 권장 */}
        <div className="absolute inset-0 w-full h-full">
           <img 
             src="https://images.unsplash.com/photo-1519681393798-38e43269d877?q=80&w=2070&auto=format&fit=crop" 
             alt="Skin Texture Abstract" 
             className="w-full h-full object-cover opacity-80"
           />
           {/* Video Noise Overlay */}
           <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Overlay Content (Visible inside the video when expanded) */}
        <div className="absolute bottom-10 left-10 text-white z-20 flex items-center gap-4">
           <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-[#B91C1C] hover:border-[#B91C1C] transition-all duration-300">
              <Play className="w-4 h-4 fill-white" />
           </button>
           <div>
              <p className="text-xs font-mono uppercase opacity-70 mb-1">ADO Movie</p>
              <p className="text-lg font-serif italic">"Texture of Life"</p>
           </div>
        </div>
      </div>

      {/* Optional: Background Pattern behind the mask */}
      <div className="absolute inset-0 z-0 bg-[#E8F1EF] opacity-50" />
      
    </section>
  );
}
