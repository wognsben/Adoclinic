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

      <div id="main-content" className="relative z-10 bg-white">
        {/* Skin Analysis Section - White Background with Glass Layer Effect */}
        <section className="w-full bg-white relative py-24 md:py-32 px-6 overflow-hidden">
           {/* Subtle background decoration for depth */}
           <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-gray-50 to-transparent opacity-50 pointer-events-none" />
           
           <div className="max-w-[1600px] mx-auto relative z-10">
              <div className="flex flex-col items-center w-full">
                 <div className="relative transform hover:scale-105 transition-transform duration-700 w-full flex justify-center">
                    <SkinAnalysis />
                 </div>
                 
                 <div className="mt-12 text-center relative">
                    {/* Glassmorphic label background */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[80px] bg-white/40 backdrop-blur-md rounded-full -z-10 blur-xl opacity-0 md:opacity-100" />
                    
                    <p className="text-xs tracking-[0.3em] uppercase text-[#1A1A1A] mb-2 font-medium">Object 01 : Smart Diagnosis</p>
                    <p className="text-[#8C8C8C] font-serif italic text-lg">"Reading Your Skin"</p>
                 </div>
              </div>
           </div>
        </section>

        {/* Brand Philosophy - Background Unification */}
        <BrandPhilosophy />

        {/* Medical Staff - Background Unification */}
        <MedicalStaff />

        {/* Interior Section - Footer 위 (App.tsx에서 통합 렌더링) */}
        {/* <InteriorSection /> */}
      </div>
    </>
  );
}