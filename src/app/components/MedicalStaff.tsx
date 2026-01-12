import React from 'react';
import { motion } from 'motion/react';
import { Instagram, BookOpen, AtSign, Award, Mic, GraduationCap, ArrowUpRight } from 'lucide-react';
import { AcademicGallery } from './AcademicGallery';

export function MedicalStaff() {
  // 임의의 상세 약력 데이터
  const profileDetails = {
    academic: [
      '서울대학교 의과대학 졸업',
      '서울대학교병원 피부과 전문의 취득',
      '서울대학교병원 피부과 임상 자문의',
      '대한피부과의사회 정회원'
    ],
    keyDoctor: [
      'Ulthera® Global Key Opinion Leader',
      'Juvederm® Global Trainer & Faculty',
      'Restylane® Master Course 수료',
      'Teoxane® Expert Member'
    ],
    awards: [
      '2024 대한민국 메디컬 헬스케어 대상',
      '2023 글로벌 에스테틱 리더 100인 선정',
      'SCI급 논문 다수 등재 (Dermatologic Surgery 등)'
    ]
  };

  // 강의 이력 데이터 (Pioneering Section)
  const lectures = [
    {
      title: "IMCAS Paris 2024",
      role: "Invited Speaker",
      desc: "Asian Facial Contouring with Fillers",
      image: "https://images.unsplash.com/photo-1544531696-60195e297837?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcm5hdGlvbmFsJTIwY29uZmVyZW5jZXxlbnwxfHx8fDE3NjgxNDU1NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "AMWC Monaco",
      role: "Live Demo Faculty",
      desc: "Advanced Lifting Techniques",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc2VtaW5hcnxlbnwxfHx8fDE3NjgxNDU1Njd8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "Korea Derma",
      role: "Key Doctor",
      desc: "Combined Laser Therapy Protocols",
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mZXJlbmNlJTIwc3BlYWtlcnxlbnwxfHx8fDE3NjgxNDU1NzF8MA&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  return (
    <section className="min-h-screen bg-[#F5F5F3] text-[#1C1C1C] py-20 px-6 md:px-12 lg:px-24 border-t border-[#D1D5DB]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column: Doctor Profile with 3D Gallery */}
          <div className="relative h-full">
            {/* Sticky Container */}
            <div className="sticky top-12 h-[85vh] flex flex-col">
              <div className="relative w-full flex-1 overflow-hidden bg-[#E5E5E5] rounded-[40px] shadow-xl">
                
                {/* 3D Infinite Scroll Gallery (Background) */}
                <div className="absolute inset-0 w-full h-full z-0">
                   <AcademicGallery />
                </div>

                {/* Overlay Content (Name & Title) */}
                <div className="absolute bottom-0 left-0 w-full p-10 bg-gradient-to-t from-[#121C1A] via-[#121C1A]/60 to-transparent text-white z-20 pointer-events-none flex flex-col justify-end h-full">
                  
                  <div className="mb-auto pt-4 opacity-70 text-xs tracking-[0.3em] uppercase hidden md:block border-l-2 border-[#5F9EA0] pl-3">
                     Representative Director
                  </div>

                  <div>
                    <h3 className="text-5xl md:text-7xl font-serif mb-3 leading-none">
                      Dr. Kim Ado
                    </h3>
                    <p className="text-2xl opacity-90 font-light mb-8">김아도 대표원장</p>
                    
                    <div className="w-16 h-[1px] bg-[#5F9EA0] mb-8"></div>

                    <div className="grid grid-cols-2 gap-6 text-sm font-light opacity-90">
                      <div>
                        <p className="font-serif text-xl leading-tight mb-1 text-[#5F9EA0]">Specialist</p>
                        <p className="opacity-70 text-sm">피부과 전문의</p>
                      </div>
                      <div>
                         <p className="font-serif text-xl leading-tight mb-1 text-[#5F9EA0]">Ph.D.</p>
                         <p className="opacity-70 text-sm">의학 박사</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Profile & Socials */}
          <div className="flex flex-col pt-12 pb-12">
            
            {/* Social Links */}
            <div className="flex gap-4 mb-16">
                <SocialButton icon={Instagram} label="Instagram" href="#" />
                <SocialButton icon={AtSign} label="Threads" href="#" />
                <SocialButton icon={BookOpen} label="Blog" href="#" />
            </div>

            {/* Profile Sections */}
            <div className="space-y-16">
                
                {/* Section 1: Academic Background */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="border-l border-[#D1D5DB] pl-8"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <GraduationCap className="w-6 h-6 text-[#5F9EA0]" />
                        <h4 className="text-2xl font-serif text-[#121C1A]">Academic Background</h4>
                    </div>
                    <ul className="space-y-3">
                        {profileDetails.academic.map((item, idx) => (
                            <li key={idx} className="text-[#4A4A4A] font-light text-lg leading-relaxed">{item}</li>
                        ))}
                    </ul>
                </motion.div>

                {/* Section 2: Key Doctor */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="border-l border-[#D1D5DB] pl-8"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <Mic className="w-6 h-6 text-[#5F9EA0]" />
                        <h4 className="text-2xl font-serif text-[#121C1A]">Key Doctor & Faculty</h4>
                    </div>
                    <ul className="space-y-3">
                        {profileDetails.keyDoctor.map((item, idx) => (
                            <li key={idx} className="text-[#4A4A4A] font-light text-lg leading-relaxed">{item}</li>
                        ))}
                    </ul>
                </motion.div>

                {/* Section 3: Awards */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="border-l border-[#D1D5DB] pl-8"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <Award className="w-6 h-6 text-[#5F9EA0]" />
                        <h4 className="text-2xl font-serif text-[#121C1A]">Awards & Publications</h4>
                    </div>
                    <ul className="space-y-3">
                        {profileDetails.awards.map((item, idx) => (
                            <li key={idx} className="text-[#4A4A4A] font-light text-lg leading-relaxed">{item}</li>
                        ))}
                    </ul>
                </motion.div>
            </div>

            {/* Quote */}
            <div className="mt-24 p-8 bg-white rounded-2xl shadow-sm border border-[#E5E5E5] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#5F9EA0]/10 rounded-bl-full -mr-4 -mt-4" />
                <p className="font-serif text-xl italic text-[#555] leading-relaxed relative z-10">
                    "가장 이상적인 아름다움은, <br/>의사의 손기술이 아니라 환자를 이해하는 깊이에서 나옵니다."
                </p>
                <p className="mt-4 text-xs font-bold text-[#5F9EA0] tracking-widest uppercase relative z-10">
                    - Dr. Kim Ado
                </p>
            </div>
          </div>
        </div>

        {/* Global Academic Leadership Section */}
        <div className="mt-32 pt-20 border-t border-[#D1D5DB]">
           
           <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
              <div>
                <p className="text-xs tracking-[0.2em] text-[#8C8C8C] mb-4 uppercase flex items-center gap-3">
                   <span className="w-8 h-[1px] bg-[#8C8C8C]"></span>
                   Global Academic Leadership
                </p>
                <h3 className="text-4xl md:text-5xl font-serif text-[#121C1A]">Pioneering Medical Artistry</h3>
              </div>
              <p className="text-[#666] font-light max-w-md text-sm md:text-base leading-relaxed text-right md:text-right">
                의료진 강의 이력 및 학술 활동 <br/>
                <span className="text-[#5F9EA0]">Sharing Knowledge, Leading Trends</span>
              </p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {lectures.map((lecture, index) => (
                 <div key={index} className="group cursor-pointer">
                    <div className="aspect-[4/3] bg-[#D1D5DB] relative overflow-hidden rounded-[24px] mb-6 shadow-md">
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors z-10 duration-500" />
                        <img 
                            src={lecture.image} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                            alt={lecture.title} 
                        />
                        <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                            <div className="bg-white p-2 rounded-full">
                                <ArrowUpRight className="w-4 h-4 text-black" />
                            </div>
                        </div>
                    </div>
                    <div className="pl-2">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-0.5 border border-[#5F9EA0] text-[#5F9EA0] text-[10px] font-bold uppercase rounded-full">
                                {lecture.role}
                            </span>
                        </div>
                        <h4 className="text-xl font-serif text-[#121C1A] mb-1 group-hover:text-[#5F9EA0] transition-colors">{lecture.title}</h4>
                        <p className="text-sm text-[#666] font-light">{lecture.desc}</p>
                    </div>
                 </div>
             ))}
           </div>
        </div>

        <div className="mt-24 text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-[#1C1C1C] mb-2">Object 03 : Master's Touch</p>
            <p className="text-[#666] font-serif italic text-lg">"장인의 손길"</p>
        </div>

      </div>
    </section>
  );
}

// Helper Component for Social Buttons
function SocialButton({ icon: Icon, label, href }: { icon: any, label: string, href: string }) {
    return (
        <a 
            href={href}
            className="flex items-center gap-2 px-5 py-3 bg-white border border-[#E5E5E5] rounded-full text-sm font-medium text-[#4A4A4A] hover:bg-[#121C1A] hover:text-white hover:border-[#121C1A] transition-all duration-300 shadow-sm group"
        >
            <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
            {label}
        </a>
    );
}
