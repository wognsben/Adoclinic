import React from 'react';
import { MapPin, Phone, Clock, Instagram } from 'lucide-react';

export function Location() {
  return (
    <footer className="w-full bg-[#1C2E2A] text-[#E8EFED] pt-24 pb-12">
      <div className="max-w-[1600px] mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 pb-24 border-b border-[#E8EFED]/10">
          
          {/* Info Column */}
          <div className="space-y-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif mb-8">ADO</h2>
              <p className="font-light opacity-80 max-w-md leading-relaxed">
                10F ADO Tower, 123 Teheran-ro, Gangnam-gu, Seoul<br/>
                (3 min walk from Gangnam Station Exit 1, Parking Available)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[#738F86]">
                     <Phone className="w-5 h-5" />
                     <span className="text-xs uppercase tracking-widest">Contact</span>
                  </div>
                  <p className="text-2xl font-mono">02-555-1234</p>
                  <p className="text-sm opacity-60">adoclinic@email.com</p>
               </div>

               <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[#738F86]">
                     <Clock className="w-5 h-5" />
                     <span className="text-xs uppercase tracking-widest">Hours</span>
                  </div>
                  <div className="space-y-2 text-sm opacity-80">
                     <div className="flex justify-between w-40"><span>Mon - Fri</span> <span>10:00 - 20:00</span></div>
                     <div className="flex justify-between w-40"><span>Sat</span> <span>10:00 - 16:00</span></div>
                     <div className="flex justify-between w-40"><span className="text-[#991B1B]">Sun / Hol</span> <span>Closed</span></div>
                  </div>
               </div>
            </div>

            <div className="flex gap-4">
               <button className="w-12 h-12 rounded-full border border-[#E8EFED]/20 flex items-center justify-center hover:bg-[#E8EFED] hover:text-[#1C2E2A] transition-colors">
                  <Instagram className="w-5 h-5" />
               </button>
               <button className="px-8 py-3 border border-[#E8EFED]/20 hover:bg-[#E8EFED] hover:text-[#1C2E2A] transition-colors text-xs uppercase tracking-widest">
                  Naver Map
               </button>
            </div>
          </div>

          {/* Map Image (Visual Only) */}
          <div className="relative aspect-square md:aspect-[4/3] bg-[#0A1A16] overflow-hidden grayscale opacity-80 hover:opacity-100 transition-opacity">
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.1106864190777!2d127.02761091530965!3d37.4996999798103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca158d69345d3%3A0xc665174415510614!2z6rCV64Ko7Jet!5e0!3m2!1sko!2skr!4v1646726245846!5m2!1sko!2skr" 
               width="100%" 
               height="100%" 
               style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(80%)" }} 
               allowFullScreen 
               loading="lazy"
               title="Map"
             />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#991B1B] rounded-full shadow-[0_0_20px_#991B1B] animate-pulse" />
          </div>

        </div>

        <div className="pt-12 flex flex-col md:flex-row justify-between items-center text-[10px] text-[#E8EFED]/30 uppercase tracking-widest">
           <p>© 2024 ADO. All Rights Reserved.</p>
           <div className="flex gap-6 mt-4 md:mt-0">
              <span className="hover:text-white cursor-pointer">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer">Terms of Use</span>
           </div>
        </div>

      </div>
    </footer>
  );
}
