import React from 'react';

export function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white/60 py-20 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-serif text-white mb-6">ADO CLINIC</h2>
            <p className="text-sm font-light leading-relaxed max-w-xs">
              The Point of Beauty.<br/>
              본질에 집중하는 미드 하이엔드 클리닉
            </p>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4 text-sm font-light">
            <p>서울시 강남구 테헤란로 123, ADO Tower 4F</p>
            <p>T. 02-1234-5678</p>
            <p className="text-xs text-white/40 mt-4">
              © 2026 ADO CLINIC. All Rights Reserved.
            </p>
          </div>

          {/* Minimal Map or Certification Placeholder */}
          <div className="w-full md:w-auto">
             <div className="w-[120px] h-[80px] border border-white/10 flex items-center justify-center text-xs text-white/30">
               LOCATION MAP
             </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
