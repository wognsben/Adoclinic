import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export function Promotions() {
  return (
    <section className="w-full bg-[#1A1A1A] text-white py-24 md:py-40 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <h2 className="text-5xl md:text-8xl font-serif text-[#Fdfbf9]">
            ADO<br/>
            <span className="italic text-[#738F86]">Promotion</span>
          </h2>
          <div className="text-right mt-8 md:mt-0">
             <p className="text-sm tracking-widest uppercase mb-2 text-[#8C8C8C]">Seasonal Benefits</p>
             <button className="text-sm border-b border-white pb-1 hover:text-[#738F86] hover:border-[#738F86] transition-colors">
               View All Events
             </button>
          </div>
        </div>

        {/* Horizontal Scroll Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Happy Hour (Light Luxury) */}
          <div className="group relative aspect-[4/3] md:aspect-[16/9] overflow-hidden cursor-pointer">
            <div className="absolute inset-0 bg-[#E8EFED] transition-transform duration-700 group-hover:scale-105">
               {/* Background Image */}
               <img 
                 src="https://images.unsplash.com/photo-1606603049788-24284ce70986?q=80&w=1080&auto=format&fit=crop" 
                 alt="Silk Texture" 
                 className="w-full h-full object-cover opacity-80"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#E8EFED] via-transparent to-transparent opacity-50" />
            </div>
            
            <div className="absolute inset-0 p-10 flex flex-col justify-between z-10">
               <div className="flex justify-between items-start">
                  <span className="text-[#2F4F4F] text-xs font-bold tracking-[0.2em] border border-[#2F4F4F] px-3 py-1 rounded-full uppercase">
                    Time Attack
                  </span>
                  <ArrowUpRight className="w-8 h-8 text-[#2F4F4F] opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1" />
               </div>

               <div>
                  <h3 className="text-4xl md:text-5xl font-serif text-[#2F4F4F] mb-4">
                    Happy<br/>Hour<span className="text-[#991B1B] text-2xl align-top">+</span>
                  </h3>
                  <p className="text-[#525252] text-sm md:text-base font-light max-w-xs">
                    수, 목 타임어택 해피아워<br/>
                    정해진 시간에 누리는 특별한 혜택
                  </p>
               </div>
            </div>
          </div>

          {/* Card 2: New Year Event (Dark Luxury) */}
          <div className="group relative aspect-[4/3] md:aspect-[16/9] overflow-hidden cursor-pointer">
             <div className="absolute inset-0 bg-[#0F172A] transition-transform duration-700 group-hover:scale-105">
                <img 
                  src="https://images.unsplash.com/photo-1758568938040-fb8b7275ca5f?q=80&w=1080&auto=format&fit=crop" 
                  alt="Dark Fluid" 
                  className="w-full h-full object-cover opacity-60 mix-blend-screen"
                />
             </div>

             <div className="absolute inset-0 p-10 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                   <span className="text-[#B4C5C0] text-xs font-bold tracking-[0.2em] border border-[#B4C5C0]/30 px-3 py-1 rounded-full uppercase">
                     January Exclusive
                   </span>
                   <ArrowUpRight className="w-8 h-8 text-[#B4C5C0] opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>

                <div className="text-center md:text-left">
                   <p className="text-[#B4C5C0] text-xs tracking-[0.4em] uppercase mb-4">ADO 1st Anniversary</p>
                   <h3 className="text-4xl md:text-5xl font-serif text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-[#E8EFED] to-[#738F86]">
                     New Standard
                   </h3>
                   <p className="text-white/70 text-sm md:text-base font-light">
                     새해, 피부의 기준을 바꾸다<br/>
                     프리미엄 리프팅 패키지
                   </p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
