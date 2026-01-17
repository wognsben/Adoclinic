import React from 'react';

/**
 * ADO Premium Logo
 * Uses the brand font 'Gowun Batang' with a sophisticated layout.
 * Optimized for scaling and current color context (currentColor).
 */
export const PremiumLogo = ({ className = "h-8 w-auto" }: { className?: string }) => (
  <svg 
    viewBox="0 0 120 40" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    aria-label="ADO Premium Logo"
  >
    <defs>
      <filter id="glow-logo" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="1" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <text 
      x="50%" 
      y="60%" 
      dominantBaseline="middle" 
      textAnchor="middle" 
      fontFamily="'Gowun Batang', serif" 
      fontSize="32" 
      fontWeight="500" 
      fill="currentColor"
      letterSpacing="0.15em"
      style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.1))' }}
    >
      ADO
    </text>
  </svg>
);
