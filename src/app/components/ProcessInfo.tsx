import React from 'react';
import { motion } from 'motion/react';

export function ProcessInfo() {
  const steps = [
    {
      step: "01",
      title: "Diagnosis",
      korTitle: "Discovery of Essence",
      desc: "Exploring problems and possibilities deep within the skin through Mark-Vu precision diagnosis."
    },
    {
      step: "02",
      title: "Design",
      korTitle: "Aesthetic Design",
      desc: "Designing ADO's unique finishing touch points considering facial structure and skin texture, not just a simple procedure."
    },
    {
      step: "03",
      title: "Procedure",
      korTitle: "Precise Procedure",
      desc: "Performed by the representative director, inducing maximal change with minimal intervention."
    },
    {
      step: "04",
      title: "Maintenance",
      korTitle: "Aesthetics of Sustainability",
      desc: "Providing systematic aftercare so that the beauty immediately after the procedure continues in daily life."
    }
  ];

  return (
    <section className="w-full bg-white py-32 md:py-48 relative overflow-hidden">
      {/* Background Decor: Abstract Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-[#F2F2F2]" />
      
      <div className="max-w-[1600px] mx-auto px-6 relative z-10">
        
        <div className="text-center mb-32">
          <h2 className="text-4xl md:text-6xl font-serif text-[#1A1A1A] mb-6">
            The Process
          </h2>
          <p className="text-[#8C8C8C] text-sm tracking-widest uppercase">
            From Essence to Perfection
          </p>
        </div>

        <div className="grid grid-cols-1 gap-24 md:gap-40">
          {steps.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Number (Artistic) */}
              <div className="w-full md:w-1/2 flex justify-center md:justify-end px-12">
                 <div className="relative">
                    <span className="text-[120px] md:text-[180px] font-serif leading-none text-[#F0F0F0] absolute -top-12 -left-12 -z-10 select-none">
                      {item.step}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-medium text-[#1A1A1A] relative">
                      {item.title}
                    </h3>
                    <p className="text-[#991B1B] text-xs font-bold tracking-[0.3em] uppercase mt-4">
                      {item.korTitle}
                    </p>
                 </div>
              </div>

              {/* Description */}
              <div className="w-full md:w-1/2 md:pl-12 text-center md:text-left">
                <p className="text-[#525252] text-lg font-light leading-relaxed max-w-sm mx-auto md:mx-0">
                  {item.desc}
                </p>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
      
      {/* Gallery Caption */}
      <div className="w-full bg-white py-16 text-center border-t border-[#1A1A1A]/10">
        <p className="text-xs tracking-[0.3em] uppercase text-[#1A1A1A] mb-2">Object 04.5 : The Process</p>
        <p className="text-[#8C8C8C] font-serif italic text-lg">"From Essence to Perfection"</p>
      </div>
    </section>
  );
}