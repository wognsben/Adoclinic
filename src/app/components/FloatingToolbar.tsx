import React, { forwardRef, useImperativeHandle, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'motion/react';

// === Icons ===
const Icons = {
  NaverBooking: () => (
    <img 
      src="https://github.com/wognsben/jjtest/blob/main/assets/1x/%EB%84%A4%EC%9D%B4%EB%B2%84%EC%98%88%EC%95%BD_%EB%A1%9C%EA%B3%A0.png?raw=true" 
      alt="Naver Booking" 
      loading="eager"
      decoding="async"
      className="w-full h-full object-contain p-2" 
    />
  ),
  Instagram: () => (
    <img 
      src="https://github.com/wognsben/jjtest/blob/main/assets/1x/instagram.png?raw=true" 
      alt="Instagram" 
      loading="eager"
      decoding="async"
      className="w-full h-full object-contain p-2" 
    />
  ),
  Threads: () => (
    <img 
      src="https://github.com/wognsben/jjtest/blob/main/assets/1x/thread.jpg?raw=true" 
      alt="Threads" 
      loading="eager"
      decoding="async"
      className="w-full h-full object-contain p-2 rounded-full" 
    />
  ),
  Kakao: () => (
    <img 
      src="https://github.com/wognsben/jjtest/blob/main/assets/1x/kakao.png?raw=true" 
      alt="Kakao Talk" 
      loading="eager"
      decoding="async"
      className="w-full h-full object-contain p-2" 
    />
  ),
  NaverBlog: () => (
    <img 
      src="https://github.com/wognsben/jjtest/blob/main/assets/1x/blog%20bl.png?raw=true" 
      alt="Naver Blog" 
      loading="eager"
      decoding="async"
      className="w-full h-full object-contain p-2" 
    />
  ),
  Top: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full p-3">
       <path d="m18 15-6-6-6 6"/>
    </svg>
  )
};

interface FloatingToolbarProps {
  onOpenConsultation?: () => void;
}

export interface FloatingToolbarRef {
  highlightBooking: () => void;
}

// === Dock Item Component ===
function DockItem({ 
    mouseY, 
    icon: Icon, 
    label, 
    onClick,
    isHighlighted,
    customBg
}: { 
    mouseY: MotionValue; 
    icon: any; 
    label: string; 
    onClick?: () => void;
    isHighlighted?: boolean;
    customBg?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Calculate distance from mouse to this item
  const distance = useTransform(mouseY, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { y: 0, height: 0 };
    return val - bounds.y - bounds.height / 2;
  });

  // Transform distance to scale/width/height
  // range: [-150, 0, 150] -> output: [40, 80, 40]
  const widthSync = useTransform(distance, [-150, 0, 150], [40, 70, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  const [hovered, setHovered] = useState(false);

  // Background Class Logic
  // Priority: Highlighted > Custom Bg > Transparent
  let bgClass = 'bg-transparent';
  if (isHighlighted) {
    bgClass = 'bg-teal-400 text-white shadow-[0_0_20px_rgba(45,212,191,0.6)]';
  } else if (customBg) {
    bgClass = `${customBg} text-gray-500 hover:text-[#1A1A1A] shadow-sm border border-gray-100`; // Added slight shadow/border for white bg visibility
  } else {
    bgClass = 'bg-transparent text-gray-500 hover:text-[#1A1A1A]';
  }

  return (
    <motion.div
      ref={ref}
      style={{ width, height: width }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className={`relative flex items-center justify-center rounded-full cursor-pointer transition-colors duration-200 shrink-0 ${bgClass}`}
    >
      {/* Icon */}
      <Icon />

      {/* Tooltip (Always rendered to prevent insertBefore error) */}
      <motion.div
        initial={false}
        animate={{ 
          opacity: hovered ? 1 : 0,
          x: hovered ? -20 : -10,
          scale: hovered ? 1 : 0.9,
        }}
        transition={{ duration: 0.2 }}
        className="absolute right-full px-3 py-1 bg-white/80 backdrop-blur-md border border-white/20 text-[#1A1A1A] text-xs font-medium rounded-lg shadow-lg whitespace-nowrap pointer-events-none z-50 origin-right"
      >
        {label}
      </motion.div>
    </motion.div>
  );
}

// === Main Component ===
export const FloatingToolbar = forwardRef<FloatingToolbarRef, FloatingToolbarProps>(
  ({ onOpenConsultation }, ref) => {
    const mouseY = useMotionValue(Infinity);
    const [highlightedIndices, setHighlightedIndices] = useState<number[]>([]);

    // Event Listener for Highlighting
    React.useEffect(() => {
        const handleHighlight = () => {
            setHighlightedIndices([0, 3]); // Naver Booking & Kakao
            setTimeout(() => setHighlightedIndices([]), 3000);
        };
        window.addEventListener('highlight-consultation', handleHighlight);
        return () => window.removeEventListener('highlight-consultation', handleHighlight);
    }, []);

    // Expose ref method
    useImperativeHandle(ref, () => ({
        highlightBooking: () => {
            setHighlightedIndices([0, 3]);
            setTimeout(() => setHighlightedIndices([]), 3000);
        }
    }));

    const scrollToTop = () => {
        const mainContent = document.getElementById('main-content');
        if (mainContent) mainContent.scrollIntoView({ behavior: 'smooth' });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const tools = [
      { name: "예약", icon: Icons.NaverBooking, action: onOpenConsultation, customBg: "bg-white" },
      { name: "Instagram", icon: Icons.Instagram, customBg: "bg-white" },
      { name: "Threads", icon: Icons.Threads, customBg: "bg-white" },
      { name: "Kakao", icon: Icons.Kakao, customBg: "bg-white" },
      { name: "Blog", icon: Icons.NaverBlog, customBg: "bg-white" },
      { name: "Top", icon: Icons.Top, action: scrollToTop },
    ];

    return (
      <div 
        className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3"
        onMouseLeave={() => mouseY.set(Infinity)}
      >
        {/* Glass Container (The Dock) */}
        <motion.div 
            className="flex flex-col items-center gap-2 p-3 rounded-full bg-white/40 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.05)]"
            onMouseMove={(e) => mouseY.set(e.clientY)}
        >
            {tools.map((tool, idx) => (
                <DockItem 
                    key={idx}
                    mouseY={mouseY}
                    icon={tool.icon}
                    label={tool.name}
                    onClick={tool.action}
                    isHighlighted={highlightedIndices.includes(idx)}
                    customBg={tool.customBg}
                />
            ))}
        </motion.div>
      </div>
    );
  }
);

FloatingToolbar.displayName = 'FloatingToolbar';