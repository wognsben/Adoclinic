import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
// Replaced figma:asset with Unsplash URL
const logoImage = "https://github.com/wognsben/jjtest/blob/main/NEW%20IG/1.png?raw=true";

interface TransformationHeroProps {
  onHighlightBooking?: () => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

export function TransformationHero({ onHighlightBooking }: TransformationHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate 20 premium circular particles (reduced for performance)
    const newParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 140 + 60, // 60-200px (larger)
      delay: Math.random() * 5,
      duration: Math.random() * 25 + 20, // 20-45s (slower, smoother)
      opacity: Math.random() * 0.25 + 0.15, // 0.15-0.4 (more visible)
    }));
    setParticles(newParticles);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Premium Circular Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `radial-gradient(circle at 35% 35%, 
              rgba(168, 213, 215, ${particle.opacity * 1.5}), 
              rgba(95, 181, 184, ${particle.opacity * 1.2}),
              rgba(45, 122, 124, ${particle.opacity * 0.6}), 
              transparent 70%)`,
            boxShadow: `
              0 0 ${particle.size * 0.4}px rgba(95, 181, 184, ${particle.opacity * 0.6}),
              inset 0 0 ${particle.size * 0.3}px rgba(255, 255, 255, ${particle.opacity * 0.3})
            `,
            filter: 'blur(12px)',
            willChange: 'transform, opacity', // Performance hint
          }}
          animate={{
            x: [0, Math.random() * 80 - 40, 0],
            y: [0, Math.random() * 80 - 40, 0],
            scale: [1, 1.3, 1],
            opacity: [particle.opacity * 0.8, particle.opacity * 1.3, particle.opacity * 0.8],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Center Title with 3D Flip Effect */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none"
        style={{ 
          zIndex: 10,
          perspective: '2000px',
          width: '100vw',
          marginTop: '-120px',
        }}
        initial={{ opacity: 0, scale: 0.92, filter: 'blur(12px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 2.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* 3D Flip Container */}
        <motion.div
          style={{
            transformStyle: 'preserve-3d',
            width: '100%',
          }}
          animate={{
            rotateY: isHovered ? 180 : 0,
          }}
          transition={{
            duration: 1.2,
            ease: [0.45, 0, 0.15, 1],
          }}
        >
          {/* Front Side - 전후 사진 */}
          <div
            style={{
              backfaceVisibility: 'hidden',
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              whiteSpace: 'nowrap',
            }}
          >
            <h1 
              className="font-light mb-10 relative"
              style={{
                fontSize: 'clamp(3.5rem, 13vw, 7.5rem)',
                fontFamily: "'Gowun Batang', serif",
                color: '#2D7A7C',
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
                whiteSpace: 'nowrap',
              }}
            >
              <span className="relative inline-block">
                BEFORE AFTER
                {/* Ultra-premium multi-layer glow */}
                <span 
                  className="absolute inset-0 blur-3xl opacity-85"
                  style={{ color: '#3D9B9E' }}
                >
                  BEFORE AFTER
                </span>
                <span 
                  className="absolute inset-0 blur-2xl opacity-65"
                  style={{ color: '#5FB5B8' }}
                >
                  BEFORE AFTER
                </span>
                <span 
                  className="absolute inset-0 blur-xl opacity-45"
                  style={{ color: '#A8D5D7' }}
                >
                  BEFORE AFTER
                </span>
                {/* Crisp outline */}
                <span 
                  className="absolute inset-0"
                  style={{ 
                    color: 'transparent',
                    WebkitTextStroke: '0.5px rgba(255, 255, 255, 0.98)',
                  }}
                >
                  BEFORE AFTER
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
              REAL TRANSFORMATION
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
              whiteSpace: 'nowrap',
            }}
          >
            <h1 
              className="font-light mb-10 relative"
              style={{
                fontSize: 'clamp(3.5rem, 13vw, 7.5rem)',
                fontFamily: "'Gowun Batang', serif",
                color: '#2D7A7C',
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
                whiteSpace: 'nowrap',
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
              if (onHighlightBooking) {
                onHighlightBooking();
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
          Object 08 · Real Results
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
          "진실은 결과로 증명됩니다"
        </p>
      </div>
    </section>
  );
}