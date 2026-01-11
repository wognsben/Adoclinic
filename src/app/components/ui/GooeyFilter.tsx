import React from 'react';

const GooeyFilter = () => {
  return (
    <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
      <defs>
        <filter id="goo-effect">
          {/* Blur: Reduced to 8 for a tighter, less "fuzzy" blob */}
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
          
          {/* Contrast: Increased to sharpen the edge drastically */}
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  
                    0 1 0 0 0  
                    0 0 1 0 0  
                    0 0 0 25 -10" 
            result="goo"
          />
          
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
};

export default GooeyFilter;