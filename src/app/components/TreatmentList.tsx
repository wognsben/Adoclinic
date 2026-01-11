import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, ArrowRight } from 'lucide-react';

const categories = [
  {
    id: 'injection',
    title: 'Injection',
    subtitle: '보톡스 / 윤곽주사',
    items: [
      { name: '[MCT] 자가엑소좀', desc: '미세바늘로 통로를 만들어 피부 재생 유도', price: '1,200,000' },
      { name: '옥시페이셜 Oxyfacial', desc: '산소와 수분을 진피층에 직접 공급', price: '300,000' },
      { name: '쥬베룩 볼륨', desc: '자가 콜라겐 생성 유도 (3회 패키지)', price: '1,500,000' },
    ]
  },
  {
    id: 'lifting',
    title: 'Lifting',
    subtitle: '탄력 / 리프팅',
    items: [
      { name: '소프웨이브', desc: '비수술적 리프팅, 진피 상부층 집중 타겟팅', price: '2,200,000' },
      { name: '울쎄라 (400shot)', desc: '근막층부터 끌어올리는 강력한 리프팅', price: '1,900,000' },
      { name: '티타늄 리프팅', desc: '즉각적인 브라이트닝과 타이트닝 효과', price: '990,000' },
    ]
  },
  {
    id: 'skin',
    title: 'Skin Booster',
    subtitle: '콜라겐 / 스킨부스터',
    items: [
      { name: '리쥬란 힐러', desc: '손상된 피부 내부의 생리적 조건 개선', price: '350,000' },
      { name: '필로가 135', desc: '53가지 복합 성분으로 광채 부여', price: '250,000' },
    ]
  }
];

export function TreatmentList() {
  const [activeCategory, setActiveCategory] = useState<string>('injection');

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
                onClick={() => setActiveCategory(cat.id)}
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

          {/* Treatment Items (Gallery Cards) */}
          <div className="md:w-3/4 min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.32, 0, 0.67, 0] }}
                className="grid grid-cols-1 gap-4"
              >
                {categories.find(c => c.id === activeCategory)?.items.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="group relative p-8 md:p-10 transition-all duration-500 cursor-pointer overflow-hidden border border-transparent hover:border-[#D6D3D1] rounded-[32px]"
                    // Tone-on-tone background: Default is transparent, Hover is slightly lighter stone
                  >
                    {/* Background Layer (Glassy Stone) */}
                    <div className="absolute inset-0 bg-[#EBE9E4] opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row justify-between md:items-center gap-4">
                      <div>
                        <h4 className="text-xl md:text-2xl font-serif text-[#1c1917] mb-2 group-hover:text-[#2F4F4F] transition-colors">
                          {item.name}
                        </h4>
                        <p className="text-[#57534E] font-light text-sm md:text-base max-w-lg leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between md:justify-end gap-10 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-[#E7E5E4]">
                        <span className="font-mono text-lg text-[#44403C] group-hover:font-medium tracking-wide">
                          {item.price} <span className="text-[10px] text-[#A8A29E] tracking-widest">KRW</span>
                        </span>
                        
                        {/* Minimal Arrow Button */}
                        <div className="w-12 h-12 rounded-full border border-[#D6D3D1] flex items-center justify-center group-hover:bg-[#1c1917] group-hover:border-[#1c1917] transition-all duration-300">
                           <ArrowRight className="w-4 h-4 text-[#78716C] group-hover:text-[#F4F3F0]" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
