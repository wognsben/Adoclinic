import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export function EditorialSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="relative bg-[#F5F5F3] text-[#111] overflow-hidden py-32 md:py-48">
      
      {/* --- Section 0: Brand Philosophy (The Adoh Story) --- */}
      <div className="container mx-auto px-6 md:px-12 mb-52 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-[#111]/10 pt-12">
          
          {/* Left: Concept Title */}
          <div className="md:col-span-4">
             <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-[#B91C1C] mb-4">Origin of ADO</h4>
             <h2 className="text-4xl md:text-5xl font-serif font-medium leading-tight mb-8">
               전신사조,<br/>
               <span className="text-[#666] italic">정신을 담다.</span>
             </h2>
          </div>

          {/* Middle: Vertical Line & Image */}
          <div className="md:col-span-4 relative flex flex-col items-center">
             <div className="w-[1px] h-32 bg-[#1A3C34]/20 mb-8 mx-auto" />
             <div className="aspect-[3/4] w-full max-w-[280px] bg-[#E8F1EF] relative overflow-hidden group">
                {/* Metaphor Image for 'Eye/Painting' */}
                <img 
                  src="https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?q=80&w=1080&auto=format&fit=crop" 
                  alt="Abstract Ink Texture" 
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000 grayscale hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-[#1A3C34]/10 mix-blend-multiply" />
             </div>
             <p className="mt-6 text-center text-xs text-[#666] font-mono">
                Gu Kaizhi (344–406) — Criticism of Painting
             </p>
          </div>

          {/* Right: Narrative */}
          <div className="md:col-span-4 flex flex-col justify-end pb-12">
             <p className="text-lg font-light leading-loose text-[#333] mb-8 text-balance">
               "형태를 흉내 내는 것은 쉽지만,<br/> 
               그 안에 담긴 정신을 표현하는 것은 어렵다."<br/><br/>
               고개지는 그 핵심을 <strong>'아도(阿堵)'</strong>,<br/>
               즉 눈동자에 두었습니다.<br/>
               ADO는 당신의 고유한 아름다움에<br/>
               생명력을 불어넣는 마지막 한 점을 지향합니다.
             </p>
             <div className="flex items-center gap-2 text-[#1A3C34] text-sm font-medium cursor-pointer hover:underline underline-offset-4">
                View Philosophy <ArrowUpRight className="w-4 h-4" />
             </div>
          </div>
        </div>
      </div>


      {/* --- Section 1: "R" (Recovery / Relaxation) --- */}
      <div className="container mx-auto px-6 md:px-12 relative mb-40">
        <div className="flex flex-col md:flex-row relative items-start">
          
          {/* Large Drop Cap "R" - Jade Styled */}
          <div className="w-full md:w-5/12 relative z-10">
             <motion.div 
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 1 }}
               className="text-[18rem] md:text-[25rem] leading-none font-serif font-thin italic -ml-4 md:-ml-12 text-[#E8F1EF] relative select-none"
             >
               R
               {/* Overlay Text on Big Letter */}
               <span className="absolute top-1/2 left-12 text-6xl text-[#1A3C34]/10 mix-blend-overlay">ECOVERY</span>
             </motion.div>
          </div>

          {/* Description Text Column */}
          <div className="w-full md:w-3/12 pt-10 md:pt-32 px-4 md:px-0 z-20">
             <div className="w-2 h-2 bg-[#B91C1C] rounded-full mb-6" /> {/* Red Dot Point */}
             <h3 className="text-sm font-bold tracking-[0.2em] uppercase mb-6 text-[#1A3C34]">Recovery & Rhythm</h3>
             <p className="text-lg leading-relaxed font-light text-[#444]">
               피부는 스스로 회복하는 힘을 가지고 있습니다. 
               우리는 그 힘이 온전히 발휘될 수 있도록 
               가장 편안하고 안전한 환경을 설계합니다.
             </p>
          </div>

          {/* Floating Image (Right) */}
          <div className="w-full md:w-4/12 relative mt-12 md:mt-0 z-10 pl-8">
             <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 1.2 }}
               className="relative aspect-[3/4] overflow-hidden bg-[#1A3C34]"
             >
                <img 
                  src="https://images.unsplash.com/photo-1679466061812-211a6b737175?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwc2tpbiUyMGNhcmUlMjB3b21hbiUyMHBvcnRyYWl0JTIwYXJ0aXN0aWMlMjBjbG9zZSUyMHVwfGVufDF8fHx8MTc2ODExNzM0NHww&ixlib=rb-4.1.0&q=80&w=1080" 
                  alt="Recovery Portrait" 
                  className="w-full h-full object-cover opacity-90"
                />
             </motion.div>
          </div>
        </div>
      </div>


      {/* --- Section 2: "State of the art" (Grid) --- */}
      <div className="container mx-auto px-6 md:px-12 mb-40">
        <div className="flex flex-col md:flex-row gap-12 items-end">
           
           {/* Text Left */}
           <div className="w-full md:w-1/3 mb-12">
              <h2 className="text-4xl md:text-5xl font-serif italic mb-6 text-[#1A3C34]">
                State of the art<br/>Clinic
              </h2>
              <div className="w-12 h-[1px] bg-[#B91C1C] mb-6" />
              <p className="text-sm text-[#666] leading-relaxed max-w-xs">
                 최첨단 장비와 전통적인 미학의 조화.
                 보이지 않는 곳까지 완벽하게 관리되는 
                 ADO만의 멸균 시스템과 프라이빗 룸.
              </p>
           </div>

           {/* Image Grid Right */}
           <div className="w-full md:w-2/3 grid grid-cols-2 gap-1 md:gap-2">
              {/* Large Tech Image */}
              <div className="col-span-2 md:col-span-1 row-span-2 bg-[#0A1A16] overflow-hidden relative group">
                 <img 
                   src="https://images.unsplash.com/photo-1664902265139-934219cee42f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWdoJTIwdGVjaCUyMG1lZGljYWwlMjBlcXVpcG1lbnQlMjBtaW5pbWFsJTIwYWVzdGhldGljfGVufDF8fHx8MTc2ODExNzM1MHww&ixlib=rb-4.1.0&q=80&w=1080"
                   alt="Medical Tech"
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                 />
                 <div className="absolute top-4 left-4 text-white/50 text-[10px] tracking-widest border border-white/20 px-2 py-1">TECH-SPEC</div>
              </div>

              {/* Small Detail 1 (Red Laser Line) */}
              <div className="col-span-1 aspect-square bg-gray-200 overflow-hidden group relative">
                 <img 
                    src="https://images.unsplash.com/photo-1600363329465-3399ad66732d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGJlZCUyMGxhc2VyJTIwbGlnaHQlMjBsaW5lJTIwZGFyayUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzY4MTE3MzQ3fDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Laser Line"
                    className="w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-[#B91C1C]/20 mix-blend-overlay" />
              </div>

              {/* Small Detail 2 (Text Block) */}
              <div className="col-span-1 aspect-square bg-[#1A3C34] overflow-hidden flex flex-col items-center justify-center text-[#E8F1EF] p-4 text-center group">
                 <span className="text-2xl font-serif italic mb-2">Lab.</span>
                 <span className="text-[10px] font-mono opacity-60">RESEARCH FOR<br/>THE PERFECTION</span>
              </div>
           </div>
        </div>
      </div>

    </section>
  );
}
