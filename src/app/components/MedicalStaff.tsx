import React from 'react';
import { motion } from 'motion/react';
import { Instagram, BookOpen, AtSign } from 'lucide-react';
import { AcademicGallery } from './AcademicGallery';
import doctorImg from "figma:asset/bc18b9298660fc46b0d1e94a624c06576d821235.png";

export function MedicalStaff() {
  // 임의의 상세 약력 데이터
  const profileDetails = {
    positions: [
        '현) ADO Clinic 대표원장',
        '전) 청담 OO 피부과 원장',
        '대한피부과의사회 정회원'
    ],
    academic: [
      '서울대학교 의과대학 졸업',
      '서울대학교병원 피부과 전문의 취득',
      '서울대학교병원 피부과 임상 자문의',
    ],
    global: [
        'Ulthera® Global Key Opinion Leader',
        'Juvederm® Global Faculty',
        'Restylane® Master Course 수료'
    ]
  };

  return (
    <section className="min-h-screen bg-[#FDFBF9] text-[#1C1C1C] py-24 px-6 md:px-12 lg:px-24 border-t border-[#E5E5E5]">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header Title */}
        <div className="text-center mb-20 md:mb-32">
            <span className="text-xs font-bold tracking-[0.4em] text-[#8C8C8C] uppercase mb-4 block">Medical Team</span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#1A1A1A]">Professional Experts</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start mb-32">
          
          {/* Left Column: Doctor Image (5 Columns) */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-24">
                <div className="aspect-[3/4] w-full bg-[#E5E5E5] rounded-[4px] overflow-hidden relative group shadow-xl">
                    <img 
                      src={doctorImg} 
                      className="w-full h-full object-cover" 
                      alt="Dr. Kim Ado"
                    />
                    
                    {/* Optional Gradient Overlay for text readability if needed */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <div className="mt-6 text-center lg:text-left">
                     <p className="text-xs tracking-[0.2em] text-[#5F9EA0] uppercase mb-1">Representative Director</p>
                     <h3 className="text-3xl font-serif text-[#1A1A1A]">Dr. Kim Ado</h3>
                </div>
            </div>
          </div>

          {/* Right Column: Philosophy & Biography (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col justify-center py-4 lg:py-12">
            
            {/* Philosophy Text */}
            <div className="mb-16 md:mb-24">
                <h3 className="text-3xl md:text-5xl font-serif leading-tight mb-8 break-keep text-[#1A1A1A]">
                    다른 사람이 되지 마세요.<br/>
                    <span className="text-[#5F9EA0]">최선의 당신</span>이 되세요.
                </h3>
                <div className="space-y-6 text-[#4A4A4A] font-light text-base md:text-lg leading-relaxed max-w-xl">
                    <p>
                        사적인 아름다움 아도(ADO)는<br/>
                        사회가 정의하는 획일화된 기준이 아닌<br/>
                        개개인이 가진 고유의 드라마를 이어가는<br/>
                        자연스러운 아름다움을 추구합니다.
                    </p>
                    <p>
                        당신만의 사적인 아름다움이<br/>
                        더욱 빛나도록<br/>
                        매 순간 최선을 다하겠습니다.
                    </p>
                </div>
            </div>

            {/* Profile Detail Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-[#E5E5E5] pt-12">
                
                {/* Column 1 */}
                <div className="space-y-8">
                    <div>
                        <h4 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider mb-4">Profile</h4>
                        <ul className="space-y-2 text-[#555] font-light text-sm md:text-base">
                            {profileDetails.positions.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider mb-4">Academic</h4>
                        <ul className="space-y-2 text-[#555] font-light text-sm md:text-base">
                            {profileDetails.academic.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Column 2 */}
                <div className="space-y-8">
                     <div>
                        <h4 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider mb-4">Global Activities</h4>
                        <ul className="space-y-2 text-[#555] font-light text-sm md:text-base">
                            {profileDetails.global.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    
                    {/* Signature Area */}
                    <div className="pt-4">
                        <div className="flex items-end gap-3">
                            <span className="text-2xl font-serif text-[#1A1A1A]">박기범</span>
                            <span className="text-sm text-[#888] mb-1">대표원장</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mt-12">
                <SocialButton icon={Instagram} label="Instagram" />
                <SocialButton icon={AtSign} label="Threads" />
                <SocialButton icon={BookOpen} label="Blog" />
            </div>

          </div>
        </div>

        {/* Global Academic Leadership Section (Horizontal 3D Gallery) */}
        <div className="mt-20 border-t border-[#E5E5E5] pt-20">
           <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
              <div>
                <p className="text-xs tracking-[0.2em] text-[#5F9EA0] mb-3 uppercase font-bold">
                   Global Leadership
                </p>
                <h3 className="text-3xl md:text-4xl font-serif text-[#1A1A1A]">Pioneering Medical Artistry</h3>
              </div>
              <p className="text-[#888] text-sm md:text-base font-light text-right">
                 끊임없는 연구와 글로벌 강연 활동으로<br />
                 K-Beauty의 새로운 기준을 제시합니다.
              </p>
           </div>
           
           {/* Horizontal 3D Gallery Container */}
           <div className="w-full h-[50vh] md:h-[60vh] bg-[#F5F5F3] relative overflow-hidden rounded-[20px]">
               <AcademicGallery />
               
               {/* Overlay Instruction */}
               <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[#8C8C8C] text-[10px] tracking-[0.3em] uppercase opacity-70">
                   Drag to Explore
               </div>
           </div>
        </div>

      </div>
    </section>
  );
}

function SocialButton({ icon: Icon, label }: { icon: any, label: string }) {
    return (
        <button 
            className="w-10 h-10 flex items-center justify-center border border-[#E5E5E5] rounded-full text-[#4A4A4A] hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A] transition-all duration-300"
            aria-label={label}
        >
            <Icon className="w-4 h-4" />
        </button>
    );
}
