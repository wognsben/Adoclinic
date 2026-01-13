import React from 'react';
import { TreatmentList } from '../components/TreatmentList';
import { TreatmentMirrorHero } from '../components/TreatmentMirrorHero';

interface TreatmentPageProps {
  onHighlightBooking?: () => void;
}

export function TreatmentPage({ onHighlightBooking }: TreatmentPageProps) {
  return (
    <div className="w-full">
      {/* Mirror Hero Section */}
      <TreatmentMirrorHero />
      
      <div id="treatment-content" className="relative z-10 shadow-[0_-50px_100px_rgba(28,25,23,0.05)]">
        <TreatmentList onHighlightBooking={onHighlightBooking} />
      </div>
    </div>
  );
}