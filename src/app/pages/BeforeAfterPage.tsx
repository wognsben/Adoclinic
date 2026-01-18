import React from 'react';
import { BeforeAfter } from '../components/BeforeAfter';
import { TransformationHero } from '../components/TransformationHero';

interface BeforeAfterPageProps {
  onHighlightBooking?: () => void;
}

export function BeforeAfterPage({ onHighlightBooking }: BeforeAfterPageProps) {
  return (
    <div className="w-full">
      {/* Transformation Hero Section */}
      <TransformationHero onHighlightBooking={onHighlightBooking} />
      
      {/* Before/After Section */}
      <BeforeAfter />

      {/* Medical Disclaimer Section */}
      <section className="w-full bg-white py-20 px-6 relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-gray-100 to-transparent" />
        
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="relative overflow-hidden rounded-[40px] p-12 md:p-16 bg-white/60 backdrop-blur-xl border border-white/50 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)]">
            
            {/* Glass Sheen */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-transparent to-white/40 pointer-events-none" />

            <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-serif text-[#1A1A1A] mb-10 text-center flex items-center justify-center gap-4">
                  <span className="h-[1px] w-12 bg-[#1A1A1A]/20"></span>
                  Important Notice
                  <span className="h-[1px] w-12 bg-[#1A1A1A]/20"></span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  <div className="space-y-6">
                      <div className="flex gap-4 group">
                        <span className="text-[#738F86] font-serif italic text-xl opacity-60 group-hover:opacity-100 transition-opacity">01</span>
                        <p className="text-[#4A4A4A] text-sm leading-relaxed font-light">
                          <span className="text-[#1A1A1A] font-medium block mb-1">Consultation Required</span> 
                          All procedures are conducted after a 1:1 consultation with the head doctor, thoroughly analyzing individual skin condition, skeletal structure, and lifestyle patterns.
                        </p>
                      </div>

                      <div className="flex gap-4 group">
                        <span className="text-[#738F86] font-serif italic text-xl opacity-60 group-hover:opacity-100 transition-opacity">02</span>
                        <p className="text-[#4A4A4A] text-sm leading-relaxed font-light">
                          <span className="text-[#1A1A1A] font-medium block mb-1">Individual Results Vary</span> 
                          Results may vary depending on individual skin type, age, lifestyle, and care status. Photos shown are actual cases but do not guarantee identical results for all patients.
                        </p>
                      </div>
                  </div>

                  <div className="space-y-6">
                      <div className="flex gap-4 group">
                        <span className="text-[#738F86] font-serif italic text-xl opacity-60 group-hover:opacity-100 transition-opacity">03</span>
                        <p className="text-[#4A4A4A] text-sm leading-relaxed font-light">
                          <span className="text-[#1A1A1A] font-medium block mb-1">Possible Side Effects</span> 
                          Temporary swelling, bruising, or redness may occur at the treatment site. Rarely, side effects such as infection or pigmentation may occur. Sufficient explanation will be provided before the procedure.
                        </p>
                      </div>

                      <div className="flex gap-4 group">
                        <span className="text-[#738F86] font-serif italic text-xl opacity-60 group-hover:opacity-100 transition-opacity">04</span>
                        <p className="text-[#4A4A4A] text-sm leading-relaxed font-light">
                          <span className="text-[#1A1A1A] font-medium block mb-1">Medical Law Compliance</span> 
                          All Before/After photos on this website were taken with patient consent in accordance with medical laws and do not constitute exaggerated or false advertising.
                        </p>
                      </div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-[#1A1A1A]/5 text-center">
                  <p className="text-[10px] text-[#8C8C8C] tracking-[0.2em] uppercase font-medium">
                    ADO prioritizes accurate diagnosis and safe procedures
                  </p>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Caption */}
      <section className="w-full bg-white py-16 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-[#1A1A1A] mb-2">
          Object 04 : Transformation Archive
        </p>
        <p className="text-[#8C8C8C] font-serif italic text-lg">
          "Record of Change, Result of Precise Judgment"
        </p>
      </section>
    </div>
  );
}