import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { SignaturePrograms } from './components/SignaturePrograms';
import { StandardGrid } from './components/StandardGrid';
import { BeforeAfter } from './components/BeforeAfter';
import { ProcessInfo } from './components/ProcessInfo';
import { Location } from './components/Location';
import { Header } from './components/Header';
import { FloatingToolbar } from './components/FloatingToolbar';
import { MedicalStaff } from './components/MedicalStaff';
import { Promotions } from './components/Promotions';
import { TreatmentList } from './components/TreatmentList';
import { Footer } from './components/Footer';
import { TextureOverlay } from './components/ui/TextureOverlay';
import { ConsultationModal } from './components/ConsultationModal';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [introCompleted, setIntroCompleted] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  return (
    <main className="w-full min-h-screen bg-[#F4F3F0] text-[#1c1917]">
      
      {/* 1. Global Texture (Film Grain) */}
      <TextureOverlay />
      
      {/* 2. Global Navigation & Tools */}
      <Header onOpenConsultation={() => setIsConsultationOpen(true)} />
      <FloatingToolbar onOpenConsultation={() => setIsConsultationOpen(true)} />
      <ConsultationModal isOpen={isConsultationOpen} onClose={() => setIsConsultationOpen(false)} />

      {/* 3. Hero Section: The Entrance */}
      <Hero 
        setIntroCompleted={setIntroCompleted} 
        onOpenConsultation={() => setIsConsultationOpen(true)}
      />

      {/* 4. Main Content Flow */}
      {/* Removed hardcoded white background to let the global warm stone theme flow */}
      <div id="main-content" className="relative z-10 shadow-[0_-50px_100px_rgba(28,25,23,0.05)]">
        
        {/* Signature Treatments */}
        <SignaturePrograms />

        {/* Why ADO? */}
        <StandardGrid />

        {/* Proof of Results */}
        <BeforeAfter />

        {/* Patient Experience */}
        <ProcessInfo />

        {/* Detailed Information */}
        <TreatmentList />
        <MedicalStaff />
        <Promotions />

        {/* 5. Footer (Integrated Location) */}
        <Footer />

      </div>

    </main>
  );
}
