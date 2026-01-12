import React from 'react';
import { Hero } from '../components/Hero';
import { BrandPhilosophy } from '../components/BrandPhilosophy';
import { MedicalStaff } from '../components/MedicalStaff';
import { SkinAnalysis } from '../components/SkinAnalysis';
import { InteriorSection } from '../components/InteriorSection';

interface MainPageProps {
  setIntroCompleted: (completed: boolean) => void;
  onOpenConsultation: () => void;
}

export function MainPage({ setIntroCompleted, onOpenConsultation }: MainPageProps) {
  return (
    <>
      <Hero 
        setIntroCompleted={setIntroCompleted} 
        onOpenConsultation={onOpenConsultation}
      />

      <div id="main-content" className="relative z-10 shadow-[0_-50px_100px_rgba(28,25,23,0.05)]">
        {/* Skin Analysis Section (Extracted from ProcessInfo) */}
        <section className="w-full bg-[#Fdfbf9] py-24 md:py-32 px-6 overflow-hidden">
           <div className="max-w-[1600px] mx-auto">
              <div className="flex flex-col items-center w-full">
                 <div className="relative transform hover:scale-105 transition-transform duration-700 w-full flex justify-center">
                    <SkinAnalysis />
                 </div>
                 
                 <div className="mt-12 text-center">
                    <p className="text-xs tracking-[0.3em] uppercase text-[#1A1A1A] mb-2">Object 01 : Smart Diagnosis</p>
                    <p className="text-[#8C8C8C] font-serif italic text-lg">"당신의 피부를 읽다"</p>
                 </div>
              </div>
           </div>
        </section>

        {/* Brand Philosophy */}
        <BrandPhilosophy />

        <MedicalStaff />

        {/* Interior Section - Footer 위 */}
        <InteriorSection />
      </div>
    </>
  );
}