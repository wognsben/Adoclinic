import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp, ChevronDown } from 'lucide-react';

/**
 * ADO Clinic Interior Section
 * 듀얼 슬라이더 방식 - 화면을 좌우로 나눠서 프리미엄 인테리어 이미지 표시
 * 마우스 호버 시 이미지 줌아웃 + 텍스트 애니메이션
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
    image: 'https://images.unsplash.com/photo-1561105108-fcee05a487a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGphZGUlMjBtaW5pbWFsaXN0JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY4MjA2OTA3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Reception',
    subtitle: '본질을 담는 공간',
    number: '01'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1647845500203-0e7ab145efcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtaW5pbWFsaXN0JTIwd2hpdGUlMjByb29tfGVufDF8fHx8MTc2ODIwNjkwOHww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Waiting',
    subtitle: '여유로운 기다림',
    number: '02'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1735448213858-6bdfdf78967a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3aGl0ZSUyMGNsaW5pYyUyMHNwYWNlfGVufDF8fHx8MTc2ODIwNjkwOHww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Treatment',
    subtitle: '정밀한 시술',
    number: '03'
  }
];

const rightSlides: Slide[] = [
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1765766599489-fd53df7f8724?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2hpdGUlMjBpbnRlcmlvciUyMGRlc2lnbnxlbnwxfHx8fDE3NjgyMDY5MDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Consultation',
    subtitle: '프라이빗 상담',
    number: '04'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1561105108-fcee05a487a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGphZGUlMjBtaW5pbWFsaXN0JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY4MjA2OTA3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Recovery',
    subtitle: '회복의 시간',
    number: '05'
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1647845500203-0e7ab145efcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtaW5pbWFsaXN0JTIwd2hpdGUlMjByb29tfGVufDF8fHx8MTc2ODIwNjkwOHww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Details',
    subtitle: '디테일의 완성',
    number: '06'
  }
];

interface SlideItemProps {
  slide: Slide;
  isActive: boolean;
}

function SlideItem({ slide, isActive }: SlideItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      style={{ visibility: isActive ? 'visible' : 'hidden' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image with zoom effect */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        animate={{
          clipPath: isHovered 
            ? 'inset(18% 18% 18% 18%)' 
            : 'inset(0% 0% 0% 0%)',
          scale: isHovered ? 0.95 : 1
        }}
        transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
      >
        <img 
          src={slide.image} 
          alt={slide.title}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Scene Title - Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2">
          {slide.title.split('').map((char, idx) => (
            <motion.span
              key={idx}
              className="text-6xl md:text-8xl font-light text-white tracking-wider uppercase"
              style={{ fontFamily: "'Gowun Batang', serif" }}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -300 : 300, y: -50 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                x: isHovered ? 0 : (idx % 2 === 0 ? -300 : 300),
                y: isHovered ? 0 : -50
              }}
              transition={{ 
                duration: 1.2, 
                delay: idx * 0.05,
                ease: [0.76, 0, 0.24, 1]
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </div>

        {/* Number - Bottom Right */}
        <motion.div
          className="absolute bottom-[10%] right-[18%] flex text-[8rem] md:text-[12rem] font-light text-white"
          style={{ fontFamily: "'Gowun Batang', serif" }}
          initial={{ opacity: 0, y: 80 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 80
          }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {slide.number.split('').map((num, idx) => (
            <motion.span
              key={idx}
              initial={{ rotateY: idx === 0 ? 90 : -90 }}
              animate={{
                rotateY: isHovered ? 0 : (idx === 0 ? 90 : -90)
              }}
              transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1] }}
            >
              {num}
            </motion.span>
          ))}
        </motion.div>

        {/* Subtitle - Top */}
        <motion.div
          className="absolute top-[8%] left-1/2 -translate-x-1/2 text-white text-sm tracking-[0.3em] uppercase"
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: isHovered ? 0.8 : 0,
            y: isHovered ? 0 : -20
          }}
          transition={{ duration: 0.8 }}
        >
          {slide.subtitle}
        </motion.div>
      </div>
    </motion.div>
  );
}

export function InteriorSection() {
  const [leftIndex, setLeftIndex] = useState(1); // Start at index 1 (middle)
  const [rightIndex, setRightIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

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
    <section className="w-full h-screen bg-[#1A1A1A] relative overflow-hidden">
      {/* Dual Slider */}
      <div className="flex h-full">
        {/* Left Side */}
        <div className="w-1/2 h-full relative overflow-hidden">
          {leftSlides.map((slide, index) => (
            <SlideItem
              key={slide.id}
              slide={slide}
              isActive={index === leftIndex}
            />
          ))}
        </div>

        {/* Right Side */}
        <div className="w-1/2 h-full relative overflow-hidden border-l border-white/10">
          {rightSlides.map((slide, index) => (
            <SlideItem
              key={slide.id}
              slide={slide}
              isActive={index === rightIndex}
            />
          ))}
        </div>
      </div>

      {/* Navigation Controls - Premium Center Circle */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
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

            {/* Current Slide Indicator (optional subtle hint) */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-1">
              {[0, 1, 2].map((idx) => (
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

      {/* Top Label */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 z-10 text-center">
        <span className="text-white/60 text-xs font-bold tracking-[0.4em] uppercase mb-2 block">
          Interior Space
        </span>
        <h2 className="text-4xl md:text-5xl font-serif text-white/90" style={{ fontFamily: "'Gowun Batang', serif" }}>
          공간
        </h2>
      </div>

      {/* Bottom Signature */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center z-10">
        <p className="text-[10px] text-white/40 font-light italic tracking-wide" style={{ fontFamily: "'Gowun Batang', serif" }}>
          "본질을 담는 공간"
        </p>
      </div>
    </section>
  );
}