import React from 'react';

export function TextureOverlay() {
  return (
    <div className="fixed inset-0 z-[1] pointer-events-none opacity-[0.4] mix-blend-overlay">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.8" 
            numOctaves="3" 
            stitchTiles="stitch" 
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" opacity="0.15" />
      </svg>
    </div>
  );
}