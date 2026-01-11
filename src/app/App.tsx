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
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [introCompleted, setIntroCompleted] = useState(false);

  return (
    <main className="w-full min-h-screen bg-[#Fdfbf9] selection:bg-[#5E7A70] selection:text-white">
      
      {/* Texture: Subtle Grain for Paper-like feel */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999] mix-blend-multiply" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />
      
      {/* 1. Global Navigation & Tools */}
      <Header />
      <FloatingToolbar />

      {/* 2. Hero Section: The Entrance */}
      <Hero setIntroCompleted={setIntroCompleted} />

      {/* 3. Main Content Flow */}
      {/* Reveal content smoothly after hero intro if needed, or keep it static */}
      <div className="relative z-10 bg-[#Fdfbf9] shadow-[0_-50px_100px_rgba(0,0,0,0.1)]">
        
        {/* Signature Treatments (AIVE Style Flow) */}
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

        {/* Contact & Location */}
        <Location />

      </div>

    </main>
  );
}
