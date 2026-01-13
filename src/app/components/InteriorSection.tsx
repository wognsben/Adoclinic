import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import recoveryImage from 'figma:asset/109bb833138db031ab61c872f7bdd27afa9dc929.png';
import waitingImage from 'figma:asset/726390ee550bc4908d10cf2fb04c0c71e734f5d8.png';
import treatmentImage from 'figma:asset/e5ef167a4db6053f520c2c1e859e4a79d09e345a.png';
import detailImage from 'figma:asset/1f08b2b39d608fcbfa897e0da681515194b244cd.png';
import jadeTexture from 'figma:asset/6580d7606d23edb4edaf1c6f54585367770a3336.png';

/**
 * ADO Clinic Interior Section
 * 듀얼 슬라이더 방식 - 화면을 좌우로 나눠서 프리미엄 인테리어 이미지 표시
 * 성능 최적화: 좌/우 배타적 호버 처리 (한 번에 한쪽만 애니메이션)
 */

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  number: string;
}

const leftSlides: Slide[] = [
  {
    id: 1,
    image: waitingImage,
    title: 'Waiting',
    subtitle: '여유로운 기다림',
    number: '01'
  },
  {
    id: 2,
    image: treatmentImage,
    title: 'Treatment',
    subtitle: '프라이빗 공간',
    number: '02'
  }
];

const rightSlides: Slide[] = [
  {
    id: 3,
    image: recoveryImage,
    title: 'Recovery',
    subtitle: '회복의 시간',
    number: '03'
  },
  {
    id: 4,
    image: detailImage,
    title: 'Details',
    subtitle: '디테일의 완성',
    number: '04'
  }
];

interface SlideItemProps {
  slide: Slide;
  isActive: boolean;
  isHovered: boolean; // Managed by parent
}

function SlideItem({ slide, isActive, isHovered }: SlideItemProps) {
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      style={{ visibility: isActive ? 'visible' : 'hidden' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Image with zoom effect */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ 
            willChange: "clip-path, transform",
            backfaceVisibility: "hidden", // Prevent flickering
            transform: "translateZ(0)" // Force GPU
        }}
        animate={{
          clipPath: isHovered 
            ? 'inset(18% 18% 18% 18%)' 
            : 'inset(0% 0% 0% 0%)',
          scale: isHovered ? 0.95 : 1
        }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      >
        <img 
          src={slide.image} 
          alt={slide.title}
          className="w-full h-full object-cover"
        />
        
        {/* Dimming overlay for better text contrast on hover */}
        <motion.div 
            className="absolute inset-0 bg-black/20"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5 }}
        />
      </motion.div>

      {/* Content Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Scene Title - Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2">
          {slide.title.split('').map((char, idx) => (
            <motion.span
              key={idx}
              className="text-5xl md:text-7xl font-light text-white tracking-wider uppercase"
              style={{ 
                  fontFamily: "'Gowun Batang', serif",
                  willChange: "transform, opacity",
                  display: "inline-block"
              }}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50, y: -20 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                x: isHovered ? 0 : (idx % 2 === 0 ? -50 : 50),
                y: isHovered ? 0 : -20
              }}
              transition={{ 
                duration: 0.6, 
                delay: isHovered ? idx * 0.03 : 0,
                ease: "easeOut"
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </div>

        {/* Number - Bottom Right */}
        <motion.div
          className="absolute bottom-[10%] right-[18%] flex text-[8rem] md:text-[10rem] font-light text-white"
          style={{ fontFamily: "'Gowun Batang', serif" }}
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 50
          }}
          transition={{ duration: 0.6, delay: isHovered ? 0.2 : 0 }}
        >
          {slide.number.split('').map((num, idx) => (
            <motion.span
              key={idx}
              style={{ willChange: "transform", display: "inline-block" }}
              initial={{ rotateY: 0 }} // Simplified initial state
              animate={{
                rotateY: isHovered ? 0 : (idx === 0 ? 90 : -90),
                opacity: isHovered ? 1 : 0
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {num}
            </motion.span>
          ))}
        </motion.div>

        {/* Subtitle - Top */}
        <motion.div
          className="absolute top-[8%] left-1/2 -translate-x-1/2 text-white text-sm tracking-[0.3em] uppercase"
          initial={{ opacity: 0, y: -10 }}
          animate={{
            opacity: isHovered ? 0.8 : 0,
            y: isHovered ? 0 : -10
          }}
          transition={{ duration: 0.5 }}
        >
          {slide.subtitle}
        </motion.div>
      </div>
    </motion.div>
  );
}

interface InteriorSectionProps {
    disableBackground?: boolean;
}

export function InteriorSection({ disableBackground = false }: InteriorSectionProps) {
  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Central Hover Management: 'left' | 'right' | null
  const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null);

  const handleNavigation = (direction: 'up' | 'down') => {
    if (isAnimating) return;

    setIsAnimating(true);

    if (direction === 'up') {
      setLeftIndex((prev) => (prev + 1) % leftSlides.length);
      setRightIndex((prev) => (prev + 1) % rightSlides.length);
    } else {
      setLeftIndex((prev) => (prev - 1 + leftSlides.length) % leftSlides.length);
      setRightIndex((prev) => (prev - 1 + rightSlides.length) % rightSlides.length);
    }

    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <section 
        className={`w-full relative overflow-hidden h-[80vh] md:h-screen ${!disableBackground ? 'bg-cover bg-center bg-no-repeat' : ''}`}
        style={!disableBackground ? { backgroundImage: `url(${jadeTexture})` } : {}}
    >
      {/* Dual Slider Container */}
      <div className="flex h-full">
        
        {/* Left Side */}
        <div 
            className="w-1/2 h-full relative overflow-hidden cursor-pointer"
            onMouseEnter={() => setHoveredSide('left')}
            onMouseLeave={() => setHoveredSide(null)}
        >
          {/* Transition Mask: Slightly darken if other side is hovered */}
          <motion.div 
            className="absolute inset-0 bg-black/40 z-10 pointer-events-none"
            animate={{ opacity: hoveredSide === 'right' ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />
          
          {leftSlides.map((slide, index) => (
            <SlideItem
              key={slide.id}
              slide={slide}
              isActive={index === leftIndex}
              isHovered={hoveredSide === 'left'}
            />
          ))}
        </div>

        {/* Right Side */}
        <div 
            className="w-1/2 h-full relative overflow-hidden border-l border-white/10 cursor-pointer"
            onMouseEnter={() => setHoveredSide('right')}
            onMouseLeave={() => setHoveredSide(null)}
        >
          {/* Transition Mask: Slightly darken if other side is hovered */}
          <motion.div 
            className="absolute inset-0 bg-black/40 z-10 pointer-events-none"
            animate={{ opacity: hoveredSide === 'left' ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />

          {rightSlides.map((slide, index) => (
            <SlideItem
              key={slide.id}
              slide={slide}
              isActive={index === rightIndex}
              isHovered={hoveredSide === 'right'}
            />
          ))}
        </div>
      </div>

      {/* Central Safe Zone - Prevents "Tag Game" with the button */}
      <div 
        className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[20%] z-40"
        onMouseEnter={() => setHoveredSide(null)}
      />

      {/* Navigation Controls - Premium Center Circle */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-auto"
        initial={{ opacity: 0, scale: 0.8, x: 0 }}
        animate={{ 
            opacity: 1, 
            scale: 1,
            // Move to the opposite side based on hover
            // If left hovered -> move right (approx 25vw)
            // If right hovered -> move left (approx -25vw)
            x: hoveredSide === 'left' ? '25vw' : hoveredSide === 'right' ? '-25vw' : 0
        }}
        transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 25 
        }}
      >
        <div className="relative group">
          {/* Outer Glow Ring */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-[#1B4D3E]/30 to-[#5E7A70]/30 blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Main Circle */}
          <motion.div
            className="relative w-28 h-28 rounded-full border-2 flex flex-col items-center justify-center gap-3 overflow-hidden backdrop-blur-md"
            style={{
              borderColor: "rgba(255, 255, 255, 0.4)",
              backgroundColor: "rgba(0, 0, 0, 0.1)"
            }}
            whileHover={{
              scale: 1.1,
              borderColor: "rgba(255, 255, 255, 0.8)",
              backgroundColor: "rgba(27, 77, 62, 0.4)"
            }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Background gradient on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#1B4D3E]/60 to-[#5E7A70]/40 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.6 }}
            />

            {/* Up Arrow */}
            <motion.button
              onClick={() => handleNavigation('down')}
              disabled={isAnimating}
              className="relative z-10 p-2 disabled:opacity-50 hover:scale-125 transition-transform duration-300"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronUp className="w-5 h-5 text-white drop-shadow-lg" strokeWidth={1.5} />
            </motion.button>

            {/* Center Divider */}
            <motion.div
              className="relative z-10 w-8 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            />

            {/* Down Arrow */}
            <motion.button
              onClick={() => handleNavigation('up')}
              disabled={isAnimating}
              className="relative z-10 p-2 disabled:opacity-50 hover:scale-125 transition-transform duration-300"
              whileHover={{ y: 3 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronDown className="w-5 h-5 text-white drop-shadow-lg" strokeWidth={1.5} />
            </motion.button>

            {/* Current Slide Indicator */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-1">
              {[0, 1].map((idx) => (
                <motion.div
                  key={idx}
                  className="w-1 h-1 rounded-full bg-white/40"
                  animate={{
                    scale: idx === leftIndex ? 1.5 : 1,
                    opacity: idx === leftIndex ? 1 : 0.3
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </motion.div>

          {/* Hover Hint Text */}
          <motion.div
            className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-white/60 text-xs tracking-[0.3em] uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            initial={{ y: -10 }}
            animate={{ y: 0 }}
          >
            Navigate
          </motion.div>
        </div>
      </motion.div>

      {/* Top Label - Fade out on hover */}
      <motion.div 
        className="absolute top-12 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none"
        animate={{ opacity: hoveredSide ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-white/60 text-xs font-bold tracking-[0.4em] uppercase mb-2 block">
          Interior Space
        </span>
        <h2 className="text-4xl md:text-5xl font-serif text-white/90" style={{ fontFamily: "'Gowun Batang', serif" }}>
          공간
        </h2>
      </motion.div>

      {/* Bottom Signature - Fade out on hover */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center z-10 pointer-events-none"
        animate={{ opacity: hoveredSide ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-[10px] text-white/40 font-light italic tracking-wide" style={{ fontFamily: "'Gowun Batang', serif" }}>
          "본질을 담는 공간"
        </p>
      </motion.div>
    </section>
  );
}