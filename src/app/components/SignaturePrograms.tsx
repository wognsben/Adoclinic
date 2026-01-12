import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

const programs = [
  {
    id: "01",
    title: "Titanium Lifting",
    subtitle: "Immediate Brightening & Tightening",
    desc: "통증 없이 즉각적인 리프팅과 화이트닝을 동시에. 강남 VIP들이 선택한 다운타임 없는 프리미엄 리프팅.",
    tags: ["Lifting", "Brightening", "No Pain"],
    image: "https://images.unsplash.com/photo-1729337531424-198f880cb6c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200&auto=format&fit=crop",
    protocol: "Instant Brightening Protocol™",
    advantage: "일반 시술 대비 120% 효과"
  },
  {
    id: "02",
    title: "Signature Contour",
    subtitle: "Face Line Reshaping",
    desc: "뼈를 깎지 않고 완성하는 완벽한 얼굴 라인. 튠페이스와 울쎄라의 황금 조합으로 무너진 턱선을 복원합니다.",
    tags: ["Contouring", "V-Line", "Custom"],
    image: "https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200&auto=format&fit=crop",
    protocol: "Golden Ratio Design™",
    advantage: "동양인 골격 특화 설계"
  },
  {
    id: "03",
    title: "Royal Skin Booster",
    subtitle: "Deep Hydration & Glow",
    desc: "피부 깊은 곳부터 차오르는 수분감. 쥬베룩과 리쥬란의 최적 배합으로 건조함과 잔주름을 한번에 해결합니다.",
    tags: ["Anti-Aging", "Hydration", "Glow"],
    image: "https://images.unsplash.com/photo-1728949202468-c37fdbd76856?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200&auto=format&fit=crop",
    protocol: "ADO 3-Layer Protocol™",
    advantage: "3단계 깊이별 맞춤 주입"
  }
];

const MarqueeText = ({ text }: { text: string }) => (
  <div className="relative flex overflow-hidden py-6 border-t border-b border-[#1A1A1A]/10 bg-white">
    <motion.div 
      className="flex whitespace-nowrap"
      animate={{ x: [0, -1000] }}
      transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
    >
      {[...Array(4)].map((_, i) => (
        <span key={i} className="text-4xl md:text-6xl font-serif text-[#1A1A1A] mx-8 font-light uppercase tracking-tighter opacity-80">
          {text} <span className="text-[#5E7A70] mx-4">✦</span>
        </span>
      ))}
    </motion.div>
  </div>
);

export function SignaturePrograms() {
  return (
    <section className="bg-white w-full">
      {/* Moving Marquee - AIVE Style Dynamic Flow */}
      <MarqueeText text="ADO Clinic Signature Program · High-End Lifting · Private Room ·" />

      <div className="max-w-[1600px] mx-auto px-6 py-24 md:py-32">
        <div className="mb-20 flex flex-col md:flex-row justify-between items-end">
          <div>
             <span className="text-[#5E7A70] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Our Specialties</span>
             <h2 className="text-5xl md:text-6xl font-serif text-[#1A1A1A]">Signature Programs</h2>
          </div>
          <div className="hidden md:block">
            <button className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-[#5E7A70] transition-colors">
              View All Programs
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((item, idx) => (
            <div key={idx} className="group cursor-pointer">
              {/* Added rounded-[32px] for soft look */}
              <div className="relative w-full aspect-[3/4] overflow-hidden mb-6 rounded-[32px] shadow-sm">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-10" />
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-[#1A1A1A] w-12 h-12 flex items-center justify-center rounded-full z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-mono text-[#5E7A70] border border-[#5E7A70] px-2 py-0.5 rounded-full">{item.id}</span>
                  <div className="flex gap-2">
                    {item.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] text-[#888] uppercase tracking-wider bg-[#F5F5F5] px-2 py-0.5 rounded-sm">{tag}</span>
                    ))}
                  </div>
                </div>
                
                {/* Protocol Badge - Premium Style */}
                <div className="mb-3">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#991B1B]/10 to-[#5E7A70]/10 border border-[#991B1B]/30 rounded-full px-3 py-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#991B1B] animate-pulse"></div>
                    <span className="text-[10px] font-bold tracking-widest text-[#991B1B] uppercase">{item.protocol}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-serif text-[#1A1A1A] group-hover:text-[#5E7A70] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-[#888] font-light italic mb-2">{item.subtitle}</p>
                <p className="text-sm text-[#555] leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all">
                  {item.desc}
                </p>
                
                {/* Advantage Badge */}
                <div className="mt-3 pt-3 border-t border-[#F5F5F5]">
                  <p className="text-xs text-[#5E7A70] font-semibold flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#5E7A70]"></span>
                    {item.advantage}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
      
      {/* Gallery Caption */}
      <div className="w-full bg-white py-16 text-center border-t border-[#1A1A1A]/10">
        <p className="text-xs tracking-[0.3em] uppercase text-[#1A1A1A] mb-2">Object 04 : Signature Collection</p>
        <p className="text-[#8C8C8C] font-serif italic text-lg">"ADO만의 독점 프로토콜"</p>
      </div>
    </section>
  );
}