import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

// Medical Standard Content
const standards = [
  { 
    id: "01", 
    title: "Signature Design", 
    korTitle: "1:1 맞춤 디자인",
    desc: "단순히 찍어내는 시술이 아닙니다. 골격과 근육의 움직임, 피부 두께까지 정밀 진단하여 당신만을 위한 최적의 디자인을 설계합니다.",
    image: "https://images.unsplash.com/photo-1629909613638-0e4a1fad8f81?q=80&w=1200&auto=format&fit=crop" // Doctor Consultation/Design
  },
  { 
    id: "02", 
    title: "High-End Device", 
    korTitle: "하이엔드 장비",
    desc: "강남 최상위 라인업의 리프팅/레이저 장비를 보유하고 있습니다. 끊임없는 장비 투자는 더 강력하고 안전한 결과를 약속합니다.",
    image: "https://images.unsplash.com/photo-1620159074131-6c50abad16b6?q=80&w=1200&auto=format&fit=crop" // Laser Device Detail
  },
  { 
    id: "03", 
    title: "Authentic Safety", 
    korTitle: "정품 정량 원칙",
    desc: "모든 시술 제품은 눈앞에서 개봉합니다. FDA, KFDA 승인을 받은 프리미엄 정품만을 정량 그대로 사용하는 것은 의료진의 자존심입니다.",
    image: "https://images.unsplash.com/photo-1552311348-edee41a6b482?q=80&w=1200&auto=format&fit=crop" // Medical Ampoule/Product
  },
  { 
    id: "04", 
    title: "Private Suite", 
    korTitle: "프라이빗 1인실",
    desc: "모든 과정은 철저히 분리된 1인 VIP 룸에서 진행됩니다. 다른 고객과 마주치지 않는 프라이빗한 동선으로 당신의 편안함을 보장합니다.",
    image: "https://images.unsplash.com/photo-1735013531564-a419dc5f31ea?q=80&w=1200&auto=format&fit=crop" // Luxury Clinic Room
  }
];

export function StandardGrid() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="w-full bg-[#Fdfbf9] py-32 md:py-48 px-6 overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Title Section - Medical Identity Restored */}
        <div className="mb-24 md:mb-32 flex flex-col items-start border-l-2 border-[#1A1A1A] pl-8">
          <span className="text-[#5E7A70] text-xs font-bold tracking-[0.3em] uppercase mb-4">Medical Philosophy</span>
          <h2 className="text-5xl md:text-7xl font-serif text-[#1A1A1A] leading-[1.1] mb-4">
            The Standard<br/>
            of Gangnam
          </h2>
          <p className="text-[#555] text-lg font-light tracking-wide mt-2">
            High-End Medical Aesthetic.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-20">
          
          {/* Left: Medical Visuals (Sticky) */}
          <div className="hidden lg:block w-5/12 h-[600px] relative sticky top-24">
            <div className="w-full h-full relative overflow-hidden bg-[#E5E5E5]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <img 
                    src={standards[activeIdx].image} 
                    alt={standards[activeIdx].title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              
              {/* Floating Badge */}
              <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-md px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                {standards[activeIdx].korTitle}
              </div>
            </div>
          </div>

          {/* Right: Medical Standards List */}
          <div className="w-full lg:w-7/12 flex flex-col">
            {standards.map((item, idx) => (
              <div 
                key={idx}
                onMouseEnter={() => setActiveIdx(idx)}
                className={`group relative py-12 border-t border-[#1A1A1A]/10 cursor-pointer transition-all duration-500 ${idx === standards.length - 1 ? 'border-b' : ''}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-baseline gap-6">
                    <span className={`font-serif text-lg font-bold transition-colors duration-300 ${activeIdx === idx ? 'text-[#5E7A70]' : 'text-[#CCC]'}`}>
                      {item.id}
                    </span>
                    <h3 className={`text-3xl md:text-4xl font-serif transition-all duration-300 ${activeIdx === idx ? 'text-[#1A1A1A] translate-x-2' : 'text-[#888]'}`}>
                      {item.title}
                    </h3>
                  </div>
                  
                  <ArrowUpRight className={`w-6 h-6 transition-all duration-300 ${activeIdx === idx ? 'opacity-100 rotate-45 text-[#991B1B]' : 'opacity-0'}`} />
                </div>

                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeIdx === idx ? 'max-h-[150px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-[#444] leading-relaxed max-w-lg ml-[3.5rem] text-sm md:text-base">
                    {item.desc}
                  </p>
                </div>

                {/* Mobile Image */}
                <div className="lg:hidden mt-6 overflow-hidden h-[0px] group-hover:h-[200px] transition-all duration-500">
                   <img src={item.image} className="w-full h-full object-cover" alt={item.title} />
                   <div className="mt-2 text-xs font-bold text-[#5E7A70]">{item.korTitle}</div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
