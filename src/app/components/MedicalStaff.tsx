import React from 'react';
import { motion } from 'motion/react';
import { AcademicGallery } from './AcademicGallery';

export function MedicalStaff() {
  const histories = [
    { year: '2023', title: 'Grand Master of K-Aesthetics', desc: '필러/보톡스 시술 부문 대상 수상' },
    { year: '2021', title: 'Key Opinion Leader (KOL)', desc: '글로벌 에스테틱 브랜드 공식 트레이너 선정' },
    { year: '2019', title: 'Director of Dermatology', desc: '서울대학교병원 피부과 임상 자문의' },
    { year: '2015', title: 'Medical License', desc: '서울대학교 의과대학 졸업' },
  ];

  return (
    <section className="min-h-screen bg-[#F5F5F3] text-[#1C1C1C] py-20 px-6 md:px-12 lg:px-24 border-t border-[#D1D5DB] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column: Doctor Profile with 3D Gallery */}
          <div className="relative">
            {/* Sticky Container: Occupies full viewport height */}
            <div className="sticky top-0 h-screen flex flex-col py-12">
              <div className="relative w-full flex-1 overflow-hidden bg-[#E5E5E5] rounded-sm shadow-xl">
                
                {/* 3D Infinite Scroll Gallery */}
                <div className="absolute inset-0 w-full h-full z-0">
                   <AcademicGallery />
                </div>

                {/* Overlay Content (Combined Name & Expertise for cleaner look) */}
                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white z-20 pointer-events-none flex flex-col justify-end h-full">
                  
                  <div className="mb-auto pt-4 opacity-50 text-xs tracking-[0.3em] uppercase hidden md:block">
                     Rep. Director
                  </div>

                  <div>
                    <h3 className="text-5xl md:text-6xl font-serif mb-2 leading-none">
                      Dr. Kim Ado
                    </h3>
                    <p className="text-xl opacity-90 font-light mb-8">김아도 대표원장</p>
                    
                    <div className="w-12 h-[1px] bg-white/50 mb-8"></div>

                    <div className="grid grid-cols-2 gap-4 text-sm font-light opacity-90">
                      <div>
                        <p className="font-serif text-lg leading-tight mb-1">Facial Contouring</p>
                        <p className="opacity-70 text-xs">안면 윤곽 / 리모델링</p>
                      </div>
                      <div>
                         <p className="font-serif text-lg leading-tight mb-1">Anti-Aging</p>
                         <p className="opacity-70 text-xs">프리미엄 안티에이징</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: History & Philosophy */}
          <div className="flex flex-col pt-12 pb-12">
            {/* Philosophy - Increased height for longer initial scroll */}
            <div className="mb-[30vh] min-h-[80vh] flex flex-col justify-center">
              <h2 className="text-3xl md:text-5xl font-serif mb-12 leading-snug break-keep">
                "진정한 아름다움은<br/>
                본연의 <span className="italic text-[#5F9EA0]">조화 (Harmony)</span>에 있습니다."
              </h2>
              <p className="text-[#4A4A4A] leading-relaxed text-xl font-light max-w-lg break-keep">
                우리는 인위적인 변화보다는 당신이 가진 고유의 매력을 찾아내는 것을 추구합니다. 
                정밀한 분석과 섬세한 터치를 통해, 시간이 흘러도 변치 않는 가장 자연스럽고 아름다운 라인을 완성합니다.
              </p>
            </div>

            {/* History List - Massive spacing between items to prolong the 3D gallery experience */}
            <div className="space-y-[50vh] border-l border-[#D1D5DB] pl-10 ml-2 pb-[20vh]">
              {histories.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="relative group"
                >
                  <span className="absolute -left-[45px] top-2 w-4 h-4 rounded-full bg-[#F5F5F3] border border-[#8C8C8C] group-hover:bg-[#5F9EA0] group-hover:border-[#5F9EA0] transition-colors duration-300" />
                  <span className="text-base font-bold tracking-widest text-[#5F9EA0] mb-2 block">{item.year}</span>
                  <h4 className="text-2xl font-medium mb-2">{item.title}</h4>
                  <p className="text-base text-[#666] font-light break-keep">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Academic Activities (Separated Section) */}
        <div className="mt-32 pt-20 border-t border-[#D1D5DB]">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
              <div>
                <p className="text-xs tracking-[0.2em] text-[#8C8C8C] mb-4 uppercase flex items-center gap-3">
                   <span className="w-8 h-[1px] bg-[#8C8C8C]"></span>
                   Academic Activities
                </p>
                <h3 className="text-3xl font-serif">Global Key Opinion Leader</h3>
              </div>
              <p className="text-[#666] font-light max-w-md text-sm md:text-base leading-relaxed">
                끊임없는 연구와 글로벌 강연 활동을 통해<br/> 
                대한민국 미용 의학의 수준을 세계에 알리고 있습니다.
              </p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             <div className="aspect-[4/3] bg-[#D1D5DB] relative overflow-hidden group rounded-sm">
               <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10" />
               <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1080&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Conference 1" />
               <div className="absolute bottom-6 left-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-sm bg-black/50 px-3 py-1 backdrop-blur-sm">2023 AMWC Monaco</span>
               </div>
             </div>
             <div className="aspect-[4/3] bg-[#D1D5DB] relative overflow-hidden group rounded-sm">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10" />
                <img src="https://images.unsplash.com/photo-1576091160550-2187d80aeffd?q=80&w=1080&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Conference 2" />
                <div className="absolute bottom-6 left-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-sm bg-black/50 px-3 py-1 backdrop-blur-sm">2022 IMCAS Paris</span>
               </div>
             </div>
             <div className="aspect-[4/3] bg-[#D1D5DB] relative overflow-hidden group rounded-sm hidden lg:block">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10" />
                <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1080&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Conference 3" />
                <div className="absolute bottom-6 left-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-sm bg-black/50 px-3 py-1 backdrop-blur-sm">2021 KAPS Seminar</span>
               </div>
             </div>
           </div>
        </div>

      </div>
    </section>
  );
}