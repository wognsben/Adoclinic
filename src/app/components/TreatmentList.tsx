import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, ArrowRight, Clock, Calendar, TrendingUp, Users, X, CheckCircle2 } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const categories = [
  {
    id: 'injection',
    title: 'Injection',
    subtitle: '보톡스 / 윤곽주사',
    items: [
      { 
        name: '[MCT] 자가엑소좀', 
        desc: '미세바늘로 통로를 만들어 피부 재생 유도', 
        price: '1,200,000',
        duration: '60분',
        downtime: '당일 일상 복귀',
        effect: '3-6개월',
        sessions: '3-5회 권장',
        recommended: '30-50대, 피부 재생',
        protocol: "Kim's Micro-Channel™"
      },
      { 
        name: '옥시페이셜 Oxyfacial', 
        desc: '산소와 수분을 진피층에 직접 공급', 
        price: '300,000',
        duration: '30분',
        downtime: '즉시 복귀',
        effect: '2주',
        sessions: '2주 간격 5회',
        recommended: '전 연령, 수분 충전',
        protocol: "Deep Hydration Protocol"
      },
      { 
        name: '쥬베룩 볼륨', 
        desc: '자가 콜라겐 생성 유도 (3회 패키지)', 
        price: '1,500,000',
        duration: '45분',
        downtime: '1-2일 미세 붓기',
        effect: '12-18개월',
        sessions: '3회 패키지',
        recommended: '40대+, 볼륨 손실',
        protocol: "Golden Ratio Volume Design"
      },
    ]
  },
  {
    id: 'lifting',
    title: 'Lifting',
    subtitle: '탄력 / 리프팅',
    items: [
      { 
        name: '소프웨이브', 
        desc: '비수술적 리프팅, 진피 상부층 집중 타겟팅', 
        price: '2,200,000',
        duration: '45-60분',
        downtime: '당일 복귀',
        effect: '12-18개월',
        sessions: '1회 또는 6개월 후 재시술',
        recommended: '30-60대, 잔주름 개선',
        protocol: "ADO 3-Layer Lifting Protocol™"
      },
      { 
        name: '울쎄라 (400shot)', 
        desc: '근막층부터 끌어올리는 강력한 리프팅', 
        price: '1,900,000',
        duration: '60-90분',
        downtime: '당일 복귀 가능',
        effect: '12-24개월',
        sessions: '1회 또는 12개월 후',
        recommended: '40-60대, 심한 처짐',
        protocol: "SMAS Targeting System"
      },
      { 
        name: '티타늄 리프팅', 
        desc: '즉각적인 브라이트닝과 타이트닝 효과', 
        price: '990,000',
        duration: '30-40분',
        downtime: '즉시 복귀',
        effect: '6-9개월',
        sessions: '3회 패키지 권장',
        recommended: '20-40대, 피부 결 개선',
        protocol: "Instant Brightening Protocol"
      },
    ]
  },
  {
    id: 'skin',
    title: 'Skin Booster',
    subtitle: '콜라겐 / 스킨부스터',
    items: [
      { 
        name: '리쥬란 힐러', 
        desc: '손상된 피부 내부의 생리적 조건 개선', 
        price: '350,000',
        duration: '30분',
        downtime: '2-3일 미세 붓기',
        effect: '6-12개월',
        sessions: '4주 간격 3-4회',
        recommended: '전 연령, 피부 재생',
        protocol: "Dermal Regeneration System"
      },
      { 
        name: '필로가 135', 
        desc: '53가지 복합 성분으로 광채 부여', 
        price: '250,000',
        duration: '20-30분',
        downtime: '당일 복귀',
        effect: '4-6개월',
        sessions: '2주 간격 3회',
        recommended: '30대+, 피부 광채',
        protocol: "Multi-Nutrient Infusion"
      },
    ]
  }
];

export function TreatmentList() {
  const [activeCategory, setActiveCategory] = useState<string>('injection');
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  return (
    <section className="w-full relative py-24 md:py-32">
      {/* Background is handled globally by App.tsx (Warm Stone) */}
      
      <div className="max-w-[1600px] mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-[#1c1917]/10 pb-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-serif text-[#1c1917] mb-4">
              Treatments
            </h2>
            <p className="text-[#57534E] text-sm tracking-wider uppercase">
              Curated by ADO Clinic
            </p>
          </div>
          <div className="hidden md:block text-right">
             <p className="text-xs text-[#A8A29E] mb-1">* 모든 시술은 VAT 별도입니다.</p>
             <p className="text-xs text-[#A8A29E]">* 개인별 맞춤 상담 후 시술이 진행됩니다.</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Category Sidebar */}
          <div className="md:w-1/4 flex flex-col gap-2">
            {categories.map((cat, idx) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setExpandedItem(null);
                }}
                className={`text-left py-5 px-3 border-b transition-all duration-500 group relative overflow-hidden ${
                  activeCategory === cat.id 
                    ? 'border-[#991B1B] text-[#1c1917]' 
                    : 'border-[#E7E5E4] text-[#A8A29E] hover:text-[#57534E]'
                }`}
              >
                <span className={`text-xs block mb-2 uppercase tracking-widest transition-colors duration-300 ${activeCategory === cat.id ? 'text-[#991B1B]' : ''}`}>
                  0{idx + 1}
                </span>
                <span className="text-xl md:text-3xl font-serif italic block group-hover:translate-x-2 transition-transform duration-500">
                  {cat.title}
                </span>
                <span className="text-xs text-[#78716C] mt-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {cat.subtitle}
                </span>
              </button>
            ))}
          </div>

          {/* Treatment Items with Accordion */}
          <div className="md:w-3/4 min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.32, 0, 0.67, 0] }}
                className="space-y-4"
              >
                <Accordion type="single" collapsible value={expandedItem || undefined} onValueChange={setExpandedItem}>
                  {categories.find(c => c.id === activeCategory)?.items.map((item, idx) => (
                    <AccordionItem 
                      key={idx} 
                      value={`item-${idx}`}
                      className="border border-transparent hover:border-[#D6D3D1] rounded-[32px] overflow-hidden bg-transparent hover:bg-[#EBE9E4]/30 transition-all duration-300 mb-4"
                    >
                      {/* Trigger: Main Info */}
                      <AccordionTrigger className="group px-8 md:px-10 py-6 hover:no-underline [&[data-state=open]]:bg-[#EBE9E4]/50">
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 w-full text-left pr-4">
                          <div className="flex-1">
                            {/* Protocol Badge */}
                            {item.protocol && (
                              <div className="flex items-center gap-2 mb-3">
                                <span className="inline-block px-3 py-1 bg-[#991B1B]/10 text-[#991B1B] text-[10px] font-bold tracking-widest rounded-full uppercase border border-[#991B1B]/20">
                                  {item.protocol}
                                </span>
                              </div>
                            )}
                            
                            <h4 className="text-xl md:text-2xl font-serif text-[#1c1917] mb-2 group-hover:text-[#2F4F4F] transition-colors">
                              {item.name}
                            </h4>
                            <p className="text-[#57534E] font-light text-sm md:text-base max-w-lg leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-4 min-w-[180px]">
                            <div className="text-right">
                              <span className="font-mono text-lg text-[#44403C] group-hover:font-medium tracking-wide block">
                                {item.price}
                              </span>
                              <span className="text-[10px] text-[#A8A29E] tracking-widest">KRW</span>
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>

                      {/* Content: Detailed Info */}
                      <AccordionContent className="px-8 md:px-10 pb-8">
                        <div className="pt-6 border-t border-[#E7E5E4]">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                            {/* Duration */}
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-full bg-[#5E7A70]/10 flex items-center justify-center shrink-0">
                                <Clock className="w-4 h-4 text-[#5E7A70]" />
                              </div>
                              <div>
                                <p className="text-[10px] font-bold tracking-widest text-[#A8A29E] uppercase mb-1">Duration</p>
                                <p className="text-sm font-medium text-[#1c1917]">{item.duration}</p>
                              </div>
                            </div>

                            {/* Downtime */}
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-full bg-[#5E7A70]/10 flex items-center justify-center shrink-0">
                                <Calendar className="w-4 h-4 text-[#5E7A70]" />
                              </div>
                              <div>
                                <p className="text-[10px] font-bold tracking-widest text-[#A8A29E] uppercase mb-1">Downtime</p>
                                <p className="text-sm font-medium text-[#1c1917]">{item.downtime}</p>
                              </div>
                            </div>

                            {/* Effect Duration */}
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-full bg-[#5E7A70]/10 flex items-center justify-center shrink-0">
                                <TrendingUp className="w-4 h-4 text-[#5E7A70]" />
                              </div>
                              <div>
                                <p className="text-[10px] font-bold tracking-widest text-[#A8A29E] uppercase mb-1">Effect</p>
                                <p className="text-sm font-medium text-[#1c1917]">{item.effect}</p>
                              </div>
                            </div>

                            {/* Sessions */}
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-full bg-[#5E7A70]/10 flex items-center justify-center shrink-0">
                                <Users className="w-4 h-4 text-[#5E7A70]" />
                              </div>
                              <div>
                                <p className="text-[10px] font-bold tracking-widest text-[#A8A29E] uppercase mb-1">Sessions</p>
                                <p className="text-sm font-medium text-[#1c1917]">{item.sessions}</p>
                              </div>
                            </div>
                          </div>

                          {/* Recommended For */}
                          <div className="bg-[#F9F9F9] rounded-2xl p-6 mb-6">
                            <p className="text-[10px] font-bold tracking-widest text-[#5E7A70] uppercase mb-2">Recommended For</p>
                            <p className="text-sm text-[#525252] font-light">{item.recommended}</p>
                          </div>

                          {/* CTA Button */}
                          <button className="w-full md:w-auto bg-[#1c1917] hover:bg-[#5E7A70] text-white px-8 py-4 rounded-full text-sm font-bold tracking-wider transition-all duration-300 flex items-center justify-center gap-2 group">
                            상담 신청하기
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mark-Vu Diagnosis Notice */}
        <div className="mt-20 border-t border-[#E7E5E4] pt-12">
          <div className="bg-gradient-to-br from-[#5E7A70]/5 to-transparent rounded-[32px] p-8 md:p-12 border border-[#5E7A70]/20">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-[#5E7A70] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-serif text-[#1c1917] mb-2">
                  정확한 시술 계획은 Mark-Vu 진단 후 결정됩니다
                </h3>
                <p className="text-sm md:text-base text-[#525252] font-light leading-relaxed">
                  모든 시술은 Mark-Vu 정밀 피부 진단 시스템을 통해 <span className="font-semibold text-[#1c1917]">18가지 피부 지표</span>를 분석한 후, 
                  대표원장이 직접 개인별 최적의 시술 조합과 강도를 설계합니다. 
                  <span className="text-[#5E7A70] font-medium"> 정확한 진단, 정확한 결과.</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Caption */}
        <div className="mt-24 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-[#1A1A1A] mb-2">Object 05 : Treatment Menu</p>
          <p className="text-[#8C8C8C] font-serif italic text-lg">"정밀한 진단, 정확한 시술"</p>
        </div>

      </div>
    </section>
  );
}
