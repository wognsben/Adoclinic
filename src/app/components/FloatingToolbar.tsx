import React from 'react';
import { motion } from 'motion/react';

// Custom SVG Icons for consistent stroke style
const Icons = {
  NaverBooking: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <path d="M8 14h.01" /> <path d="M12 14h.01" /> <path d="M16 14h.01" />
      <path d="M8 18h.01" /> <path d="M12 18h.01" /> <path d="M16 18h.01" />
    </svg>
  ),
  Instagram: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  Threads: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
       <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-1.84 0-3.33-1.12-3.33-2.5S10.16 12 12 12c.5 0 .97.08 1.4.23.4.15.74.37 1 .64.08.09.15.19.22.29.35.53.56 1.15.56 1.84 0 1.38-1.12 2.5-2.5 2.5h-4.5" />
       <path d="M15.5 12a3.5 3.5 0 1 0-7 0" />
    </svg>
  ),
  Kakao: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 3c-5.52 0-10 3.67-10 8.2 0 2.93 1.9 5.53 4.83 7.02-.22.8-.79 2.9-.82 2.99 0 0-.02.16.08.22.1.06.22.04.22.04.38-.05 4.38-2.88 5.08-3.35.2.03.4.05.61.05 5.52 0 10-3.67 10-8.2S17.52 3 12 3z" />
    </svg>
  ),
  NaverBlog: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
       <path d="M4 4h16v16H4V4zm4 5h8v2H8V9zm0 4h5v2H8v-2z" />
    </svg>
  )
};

export function FloatingToolbar() {
  const tools = [
    { name: "예약", icon: Icons.NaverBooking, color: "hover:bg-[#03C75A]" },
    { name: "Insta", icon: Icons.Instagram, color: "hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-red-500 hover:to-purple-500" },
    { name: "Threads", icon: Icons.Threads, color: "hover:bg-black" },
    { name: "Kakao", icon: Icons.Kakao, color: "hover:bg-[#FEE500] hover:text-black" },
    { name: "Blog", icon: Icons.NaverBlog, color: "hover:bg-[#2DB400]" },
  ];

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-1 p-2">
      {tools.map((item, idx) => (
        <motion.button
          key={idx}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1 + idx * 0.1 }}
          className={`group relative w-12 h-12 bg-[#1A1A1A]/90 backdrop-blur-md flex items-center justify-center text-white/90 shadow-lg transition-all duration-300 ${item.color}`}
        >
          <item.icon />
          
          {/* Tooltip Label */}
          <span className="absolute right-full mr-2 px-2 py-1 bg-black/80 text-white text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity rounded">
            {item.name}
          </span>
        </motion.button>
      ))}
    </div>
  );
}
