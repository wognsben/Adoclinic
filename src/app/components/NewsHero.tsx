import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { motion } from 'motion/react';
import logoImage from 'figma:asset/fcc6e13ae36e4d588436cc30d4b454b19cc23c67.png';

// GSAP 플러그인 등록
if (typeof window !== 'undefined') {
  gsap.registerPlugin(SplitText, ScrambleTextPlugin);
}

interface NewsHeroProps {
  onHighlightBooking?: () => void;
}

export function NewsHero({ onHighlightBooking }: NewsHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    if (!containerRef.current) return;

    // ====== CONFIG ======
    const quotes = gsap.utils.toArray<HTMLElement>('.promo-quote');
    const scrambleChars = 'upperAndLowerCase';

    // ====== HELPERS ======
    const getRandomPosition = () => {
      const x = Math.random() * (window.innerWidth - 300);
      const y = Math.random() * (window.innerHeight - 100);
      return { x, y };
    };

    const scrambleQuote = (quote: HTMLElement, text: string) => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 3.5 });

      tl.call(() => {
        const { x, y } = getRandomPosition();
        gsap.set(quote, { x, y });
      })
        .to(quote, {
          delay: Math.random() * 8,
          duration: 2,
          opacity: 0.25,
          scrambleText: { text, chars: scrambleChars, revealDelay: 0.8, speed: 0.6 },
          ease: 'power2.out',
        })
        .to(quote, {
          delay: 3,
          duration: 2,
          scrambleText: { text: '', chars: scrambleChars },
          opacity: 0,
          ease: 'power2.in',
        });
    };

    // ====== INIT QUOTES ======
    quotes.forEach((quote) => {
      gsap.set(quote, {
        position: 'absolute',
        opacity: 0,
        whiteSpace: 'nowrap',
      });
      scrambleQuote(quote, quote.textContent ?? '');
    });

    // ====== SUBTITLE ANIMATION ======
    const subtitle = containerRef.current.querySelector('.subtitle');
    if (subtitle) {
      gsap.from(subtitle, {
        opacity: 0,
        y: 50,
        duration: 1.2,
        delay: 1.5,
        ease: 'power3.out',
      });
    }

    // ====== CLEANUP ======
    return () => {
      gsap.killTweensOf(quotes);
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#FDFBF9]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Center Title with 3D Flip Effect */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none"
        style={{ 
          zIndex: 10, // Changed from 100 to prevent blocking Header
          perspective: '2000px', // 3D perspective
          width: '100vw', // Full width to prevent wrapping
          marginTop: '-120px', // Move up to prevent overlapping with Premium Box
        }}
        initial={{ opacity: 0, scale: 0.92, filter: 'blur(12px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 2.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* 3D Flip Container */}
        <motion.div
          style={{
            transformStyle: 'preserve-3d',
            width: '100%', // Ensure full width
          }}
          animate={{
            rotateY: isHovered ? 180 : 0,
          }}
          transition={{
            duration: 1.2,
            ease: [0.45, 0, 0.15, 1],
          }}
        >
          {/* Front Side - 이벤트 · 소식 */}
          <div
            style={{
              backfaceVisibility: 'hidden',
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              whiteSpace: 'nowrap', // Prevent wrapping
            }}
          >
            <h1 
              className="font-light mb-10 relative"
              style={{
                fontSize: '10rem',
                fontFamily: "'Gowun Batang', serif",
                color: '#2D7A7C', // 청옥 dark
                letterSpacing: '0.06em',
                lineHeight: 1.1,
                textShadow: `
                  0 30px 70px rgba(95, 181, 184, 0.55),
                  0 12px 30px rgba(45, 122, 124, 0.4),
                  0 0 140px rgba(95, 181, 184, 0.35),
                  0 5px 10px rgba(255, 255, 255, 0.98),
                  0 2px 4px rgba(45, 122, 124, 0.45)
                `,
                fontFeatureSettings: '"kern" 1, "liga" 1, "calt" 1',
                whiteSpace: 'nowrap', // Prevent wrapping
              }}
            >
              <span className="relative inline-block">
                이벤트 · 소식
                {/* Ultra-premium multi-layer glow */}
                <span 
                  className="absolute inset-0 blur-3xl opacity-85"
                  style={{ color: '#3D9B9E' }} // 청옥 mid
                >
                  이벤트 · 소식
                </span>
                <span 
                  className="absolute inset-0 blur-2xl opacity-65"
                  style={{ color: '#5FB5B8' }} // 청옥 main
                >
                  이벤트 · 소식
                </span>
                <span 
                  className="absolute inset-0 blur-xl opacity-45"
                  style={{ color: '#A8D5D7' }} // 청옥 light
                >
                  이벤트 · 소식
                </span>
                {/* Crisp outline */}
                <span 
                  className="absolute inset-0"
                  style={{ 
                    color: 'transparent',
                    WebkitTextStroke: '0.5px rgba(255, 255, 255, 0.98)',
                  }}
                >
                  이벤트 · 소식
                </span>
              </span>
            </h1>
            <motion.p 
              className="text-xl tracking-[0.45em] font-light"
              style={{ 
                color: '#5FB5B8', // 청옥
                textShadow: '0 6px 24px rgba(95, 181, 184, 0.45), 0 3px 6px rgba(255, 255, 255, 0.85)',
                letterSpacing: '0.45em',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2.2, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
            >
              SPECIAL EVENTS & NEWS
            </motion.p>
          </div>

          {/* Back Side - ADO CLINIC */}
          <div
            style={{
              backfaceVisibility: 'hidden',
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%) rotateY(180deg)',
              whiteSpace: 'nowrap', // Prevent wrapping
            }}
          >
            <h1 
              className="font-light mb-10 relative"
              style={{
                fontSize: '10rem',
                fontFamily: "'Gowun Batang', serif",
                color: '#2D7A7C', // 청옥 dark
                letterSpacing: '0.12em',
                lineHeight: 1.1,
                textShadow: `
                  0 30px 70px rgba(95, 181, 184, 0.55),
                  0 12px 30px rgba(45, 122, 124, 0.4),
                  0 0 140px rgba(95, 181, 184, 0.35),
                  0 5px 10px rgba(255, 255, 255, 0.98),
                  0 2px 4px rgba(45, 122, 124, 0.45)
                `,
                fontFeatureSettings: '"kern" 1, "liga" 1, "calt" 1',
                whiteSpace: 'nowrap', // Prevent wrapping
              }}
            >
              <span className="relative inline-block">
                ADO CLINIC
                {/* Ultra-premium multi-layer glow */}
                <span 
                  className="absolute inset-0 blur-3xl opacity-85"
                  style={{ color: '#3D9B9E' }}
                >
                  ADO CLINIC
                </span>
                <span 
                  className="absolute inset-0 blur-2xl opacity-65"
                  style={{ color: '#5FB5B8' }}
                >
                  ADO CLINIC
                </span>
                <span 
                  className="absolute inset-0 blur-xl opacity-45"
                  style={{ color: '#A8D5D7' }}
                >
                  ADO CLINIC
                </span>
                {/* Crisp outline */}
                <span 
                  className="absolute inset-0"
                  style={{ 
                    color: 'transparent',
                    WebkitTextStroke: '0.5px rgba(255, 255, 255, 0.98)',
                  }}
                >
                  ADO CLINIC
                </span>
              </span>
            </h1>
            <motion.p 
              className="text-xl tracking-[0.45em] font-light"
              style={{ 
                color: '#5FB5B8',
                textShadow: '0 6px 24px rgba(95, 181, 184, 0.45), 0 3px 6px rgba(255, 255, 255, 0.85)',
                letterSpacing: '0.45em',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2.2, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
            >
              PREMIUM DERMATOLOGY
            </motion.p>
          </div>
        </motion.div>
      </motion.div>

      {/* Premium Display Box */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-40 z-40 flex flex-col items-center gap-8">
        <div className="relative w-80 md:w-[480px] bg-white text-[#2D7A7C] border-2 border-[#5FB5B8]/30 py-7 px-8 rounded-[32px] overflow-hidden transition-all duration-500"
          style={{
            boxShadow: `
              0 10px 40px rgba(95, 181, 184, 0.15),
              0 4px 12px rgba(45, 122, 124, 0.08),
              inset 0 1px 2px rgba(255, 255, 255, 0.9)
            `,
          }}
        >
          {/* 내부 글로우 */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#5FB5B8]/5 via-transparent to-[#3D9B9E]/5 pointer-events-none"></div>
          
          {/* Footer 브랜드 로고 (왼쪽) */}
          <img 
            src={logoImage} 
            alt="ADO CLINIC" 
            className="absolute left-5 top-1/2 -translate-y-1/2 h-8 object-contain"
          />
          
          {/* 상담 및 예약 버튼 (오른쪽) */}
          <button
            onClick={() => {
              console.log('🎯 상담 및 예약 버튼 클릭!', { onHighlightBooking });
              if (onHighlightBooking) {
                onHighlightBooking();
                console.log('✅ onHighlightBooking 호출 완료');
              } else {
                console.error('❌ onHighlightBooking이 undefined입니다!');
              }
            }}
            className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-2 px-6 py-3 rounded-full bg-teal-400 hover:bg-teal-500 transition-all duration-300 hover:scale-105"
            style={{
              boxShadow: '0 4px 20px rgba(45, 212, 191, 0.4)',
            }}
          >
            <span className="text-white text-xs font-bold tracking-wider whitespace-nowrap">상담 및 예약</span>
          </button>
        </div>
      </div>

      {/* 떠다니는 프로모션 텍스트들 */}
      <div className="promo-quote opacity-0 text-xs md:text-sm font-semibold text-[#5FB5B8]"
        style={{ textShadow: '0 2px 8px rgba(95, 181, 184, 0.4), 0 4px 16px rgba(95, 181, 184, 0.2)' }}
      >
        신규 회원 환영 이벤트 20%
      </div>
      <div className="promo-quote opacity-0 text-xs md:text-sm font-semibold text-[#3D9B9E]"
        style={{ textShadow: '0 2px 8px rgba(61, 155, 158, 0.4), 0 4px 16px rgba(61, 155, 158, 0.2)' }}
      >
        피부 진단 무료 + 상담
      </div>
      <div className="promo-quote opacity-0 text-xs md:text-sm font-semibold text-[#5FB5B8]"
        style={{ textShadow: '0 2px 8px rgba(95, 181, 184, 0.4), 0 4px 16px rgba(95, 181, 184, 0.2)' }}
      >
        리프팅 특별가 진행중
      </div>
      <div className="promo-quote opacity-0 text-xs md:text-sm font-semibold text-[#A8D5D7]"
        style={{ textShadow: '0 2px 8px rgba(168, 213, 215, 0.4), 0 4px 16px rgba(168, 213, 215, 0.2)' }}
      >
        VIP 회원 전용 혜택
      </div>
      <div className="promo-quote opacity-0 text-xs md:text-sm font-semibold text-[#2D7A7C]"
        style={{ textShadow: '0 2px 8px rgba(45, 122, 124, 0.4), 0 4px 16px rgba(45, 122, 124, 0.2)' }}
      >
        봄 맞이 계절 한정 이벤트
      </div>
      <div className="promo-quote opacity-0 text-xs md:text-sm font-semibold text-[#5FB5B8]"
        style={{ textShadow: '0 2px 8px rgba(95, 181, 184, 0.4), 0 4px 16px rgba(95, 181, 184, 0.2)' }}
      >
        프리미엄 케어 체험단 모집
      </div>
      <div className="promo-quote opacity-0 text-xs md:text-sm font-semibold text-[#3D9B9E]"
        style={{ textShadow: '0 2px 8px rgba(61, 155, 158, 0.4), 0 4px 16px rgba(61, 155, 158, 0.2)' }}
      >
        레이저 토닝 1+1 이벤트
      </div>
      <div className="promo-quote opacity-0 text-xs md:text-sm font-semibold text-[#A8D5D7]"
        style={{ textShadow: '0 2px 8px rgba(168, 213, 215, 0.4), 0 4px 16px rgba(168, 213, 215, 0.2)' }}
      >
        첫 방문 고객 특별 할인
      </div>
      <div className="promo-quote opacity-0 text-xs md:text-sm font-semibold text-[#2D7A7C]"
        style={{ textShadow: '0 2px 8px rgba(45, 122, 124, 0.4), 0 4px 16px rgba(45, 122, 124, 0.2)' }}
      >
        친구 추천 시 양쪽 혜택
      </div>
      <div className="promo-quote opacity-0 text-xs md:text-sm font-semibold text-[#5FB5B8]"
        style={{ textShadow: '0 2px 8px rgba(95, 181, 184, 0.4), 0 4px 16px rgba(95, 181, 184, 0.2)' }}
      >
        월간 베스트 시술 공개
      </div>
      <div className="promo-quote opacity-0 text-xs md:text-sm font-semibold text-[#3D9B9E]"
        style={{ textShadow: '0 2px 8px rgba(61, 155, 158, 0.4), 0 4px 16px rgba(61, 155, 158, 0.2)' }}
      >
        피부 타입 맞춤 패키지
      </div>
      <div className="promo-quote opacity-0 text-xs md:text-sm font-semibold text-[#A8D5D7]"
        style={{ textShadow: '0 2px 8px rgba(168, 213, 215, 0.4), 0 4px 16px rgba(168, 213, 215, 0.2)' }}
      >
        주말 특별 예약 이벤트
      </div>

      {/* 하단 오브젝트 라벨 */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 text-center">
        <p 
          className="text-xs tracking-[0.4em] uppercase text-[#5FB5B8] mb-1 font-semibold"
          style={{
            textShadow: `
              0 1px 2px rgba(95, 181, 184, 0.4),
              0 2px 6px rgba(95, 181, 184, 0.2)
            `,
          }}
        >
          Object 05 · Premium Events
        </p>
        <p 
          className="text-[10px] text-[#A8D5D7] font-light italic" 
          style={{ 
            fontFamily: "'Gowun Batang', serif",
            textShadow: `
              0 1px 3px rgba(168, 213, 215, 0.5),
              0 2px 8px rgba(168, 213, 215, 0.3)
            `,
          }}
        >
          "가장 특별한 당신을 위한 순간"
        </p>
      </div>
    </section>
  );
}