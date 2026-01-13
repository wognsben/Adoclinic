import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { FloatingToolbar, FloatingToolbarRef } from './components/FloatingToolbar';
import { Footer } from './components/Footer';
import { TextureOverlay } from './components/ui/TextureOverlay';
import { ConsultationModal } from './components/ConsultationModal';
import { MainPage } from './pages/MainPage';
import { BeforeAfterPage } from './pages/BeforeAfterPage';
import { TreatmentPage } from './pages/TreatmentPage';
import { EventsPage } from './pages/EventsPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { InteriorSection } from './components/InteriorSection';

// Replaced figma:asset with a real Unsplash URL for build compatibility
const jadeTexture = "https://github.com/wognsben/Adoclinic/blob/main/NEW%20IG/FOOTER.png?raw=true";

// ScrollToTop Component
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const [introCompleted, setIntroCompleted] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const floatingToolbarRef = useRef<FloatingToolbarRef>(null);
  const location = useLocation();
  const isMainPage = location.pathname === '/';

  const handleHighlightBooking = () => {
    console.log('📱 App.tsx: handleHighlightBooking 호출됨');
    if (floatingToolbarRef.current) {
      floatingToolbarRef.current.highlightBooking();
    }
  };

  return (
    <main className="w-full min-h-screen bg-[#F4F3F0] text-[#1c1917]">
      <TextureOverlay />
      
      {/* Global Navigation & Tools */}
      <Header onOpenConsultation={() => setIsConsultationOpen(true)} />
      <FloatingToolbar ref={floatingToolbarRef} onOpenConsultation={() => setIsConsultationOpen(true)} />
      <ConsultationModal isOpen={isConsultationOpen} onClose={() => setIsConsultationOpen(false)} />

      <Routes>
        <Route path="/" element={
          <MainPage 
            setIntroCompleted={setIntroCompleted} 
            onOpenConsultation={() => setIsConsultationOpen(true)} 
          />
        } />
        <Route path="/before-after" element={<BeforeAfterPage onHighlightBooking={handleHighlightBooking} />} />
        <Route path="/treatments" element={<TreatmentPage onHighlightBooking={handleHighlightBooking} />} />
        <Route path="/events" element={<EventsPage onHighlightBooking={handleHighlightBooking} />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>

      {/* Footer Logic: Integrated for Main Page, Standalone for others */}
      {isMainPage ? (
        <div 
            className="relative w-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${jadeTexture}')` }}
        >
            <InteriorSection disableBackground={true} />
            <Footer disableBackground={true} />
        </div>
      ) : (
        <Footer />
      )}
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
}