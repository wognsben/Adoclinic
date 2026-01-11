import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Copy, MessageCircle, Phone, ArrowUpRight, Instagram, Map as MapIcon, ArrowUp } from 'lucide-react';
import mapImage from 'figma:asset/6c0afad9e2fdd413414a793d92801ce7a718649c.png';
import logoImage from 'figma:asset/2fbedda476eb26284d7ca2fbd1385497c99baa07.png';

export function Footer() {
  const handleCopyAddress = () => {
    navigator.clipboard.writeText("서울특별시 강남구 도산대로 119, 5층 케이타워(K-Tower) (신사동)");
    alert("주소가 복사되었습니다.");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-[#1A1A1A] text-[#Fdfbf9] overflow-hidden pt-10">
        {/* Container with rounded aesthetic */}
        <div className="flex flex-col lg:flex-row min-h-[550px] gap-6 px-4 pb-4 lg:px-6 lg:pb-6">
            
            {/* --------------------------------------------------------------------------- */}
            {/* LEFT COLUMN: MAP VISUAL (ROUNDED)                                           */}
            {/* --------------------------------------------------------------------------- */}
            <div className="w-full lg:w-[42%] h-[400px] lg:h-auto relative overflow-hidden rounded-[40px] group bg-[#0F172A] shadow-sm border border-white/5">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.1106864190777!2d127.02761091530965!3d37.4996999798103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca158d69345d3%3A0xc665174415510614!2z6rCV64Ko7Jet!5e0!3m2!1sko!2skr!4v1646726245846!5m2!1sko!2skr" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy"
                    title="Map"
                    className="w-full h-full object-cover"
                />
                
                {/* Overlay: View Large Map (Removed for iframe interaction, or keep as pointer-events-none if needed) */}
                {/* Keeping it simple: iframe is interactive immediately */}

                <div className="absolute top-8 left-8 bg-[#1A1A1A]/90 backdrop-blur-md px-5 py-3 rounded-full shadow-lg border border-white/10 pointer-events-none">
                    <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-[#738F86] animate-pulse"></div>
                         <span className="text-[12px] font-bold tracking-widest text-white">오시는 길</span>
                    </div>
                </div>
            </div>

            {/* --------------------------------------------------------------------------- */}
            {/* RIGHT COLUMN: INFORMATION & ACTIONS (ROUNDED BG)                            */}
            {/* --------------------------------------------------------------------------- */}
            <div className="w-full lg:w-[58%] bg-[#222] rounded-[40px] px-8 py-12 lg:px-16 lg:py-16 flex flex-col justify-between shadow-lg border border-white/5 relative">
                
                {/* Scroll To Top Button (Absolute Position inside Right Panel) */}
                <button 
                    onClick={scrollToTop}
                    className="absolute top-8 right-8 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-[#1A1A1A] transition-all duration-300 group text-white/50"
                    aria-label="Scroll to top"
                >
                    <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                </button>

                {/* TOP: Brand & Shortcuts */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-12 pr-12">
                    {/* Brand */}
                    <div>
                         {/* Logo: Increased size to w-[250px], Removed Filter for original color */}
                         <img 
                            src={logoImage} 
                            alt="ADO CLINIC" 
                            className="w-[250px] object-contain mb-8 origin-left"
                            // style={{ filter: 'brightness(0) invert(1) opacity(0.9)' }} 
                         />
                         <p className="text-sm font-light leading-relaxed text-[#8C8C8C] max-w-sm">
                            <span className="font-medium text-white">The Point of Beauty.</span><br/>
                            본질에 집중하는 미드 하이엔드 클리닉, 에이도
                         </p>
                    </div>

                    {/* Quick Links (External Maps & SNS) */}
                    <div className="flex flex-col items-end gap-3 pt-2">
                        <ExternalLink text="NAVER MAP" />
                        <ExternalLink text="GOOGLE MAP" />
                        <ExternalLink text="INSTAGRAM" icon={Instagram} />
                    </div>
                </div>

                {/* MIDDLE: Detailed Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-white/10 pt-10 mb-12">
                    <div className="space-y-4">
                        <InfoItem label="ADDRESS" value="서울 강남구 도산대로 119, 5층 케이타워" />
                        <InfoItem label="CONTACT" value="02-543-7501" />
                        <InfoItem label="KAKAO" value="@라도무드" />
                    </div>
                    <div className="space-y-4">
                         <div className="grid grid-cols-[80px_1fr] items-start gap-2 text-sm font-light">
                            <span className="font-bold text-[#738F86] text-[11px] tracking-widest mt-0.5">HOURS</span>
                            <div className="space-y-1 text-[#8C8C8C] text-xs">
                                <p className="flex justify-between w-full max-w-[200px]"><span className="font-medium text-white">Mon - Fri</span> 10:00 - 20:00</p>
                                <p className="flex justify-between w-full max-w-[200px]"><span className="font-medium text-white">Saturday</span> 10:00 - 16:00</p>
                                <p className="text-[#991B1B] mt-1">* Sun & Holiday Off</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* BOTTOM: Primary Actions & Copyright */}
                <div className="space-y-8">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <FooterActionButton icon={MapPin} label="오시는 길" variant="light" />
                        <FooterActionButton icon={Copy} label="주소복사" variant="outline" onClick={handleCopyAddress} />
                        <FooterActionButton icon={MessageCircle} label="카톡상담" variant="outline" />
                        <FooterActionButton icon={Phone} label="전화상담" variant="light" />
                    </div>

                    {/* Copyright */}
                    <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-white/10 text-[10px] font-medium tracking-wider text-[#8C8C8C] uppercase">
                        <span>© 2026 ADO CLINIC. All Rights Reserved.</span>
                        <div className="flex gap-6 mt-2 sm:mt-0">
                            <span className="cursor-pointer hover:text-white transition-colors">Privacy Policy</span>
                            <span className="cursor-pointer hover:text-white transition-colors">Terms of Use</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </footer>
  );
}

// ----------------------------------------------------------------------
// SUB COMPONENTS
// ----------------------------------------------------------------------

const ExternalLink = ({ text, icon: Icon }: { text: string, icon?: any }) => (
    <a href="#" className="group flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-white hover:text-[#738F86] transition-colors">
        {Icon && <Icon className="w-3 h-3" />}
        {text}
        <ArrowUpRight className="w-2.5 h-2.5 opacity-30 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
    </a>
);

const InfoItem = ({ label, value }: { label: string, value: string }) => (
    <div className="grid grid-cols-[80px_1fr] items-start gap-2 text-sm font-light">
        <span className="font-bold text-[#738F86] text-[11px] tracking-widest mt-0.5">{label}</span>
        <span className="text-[#8C8C8C] text-xs">{value}</span>
    </div>
);

const FooterActionButton = ({ icon: Icon, label, variant, onClick }: { icon: any, label: string, variant: 'light' | 'outline', onClick?: () => void }) => {
    return (
        <button 
            onClick={onClick}
            className={`
                relative overflow-hidden group flex flex-col items-center justify-center gap-2 px-4 py-6 rounded-[20px] transition-all duration-300
                ${variant === 'light' 
                    ? 'bg-[#Fdfbf9] text-[#1A1A1A] hover:bg-[#EAEFE9]' 
                    : 'bg-[#2A2A2A] border border-white/5 text-[#Fdfbf9] hover:border-white/20 hover:bg-[#333]'
                }
            `}
        >
            <Icon className={`w-5 h-5 mb-1 opacity-80 group-hover:scale-110 transition-transform duration-300 ${variant === 'light' ? 'text-[#1A1A1A]' : 'text-white'}`} />
            <span className="text-xs font-bold tracking-wider">{label}</span>
        </button>
    );
};
