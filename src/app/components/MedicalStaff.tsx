import React from 'react';
import { motion } from 'motion/react';
import { AcademicGallery } from './AcademicGallery';

// Main Representative Director Image (Authoritative, Global Medical Leader)
const doctorImg = "https://images.unsplash.com/photo-1678940805950-73f2127f9d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwZG9jdG9yJTIwY2hpZWYlMjBtZWRpY2FsJTIwb2ZmaWNlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc2ODY0Njg0Mnww&ixlib=rb-4.1.0&q=80&w=1080";

// Grid of 3 Doctors (Professional Clinic Specialists - High-End & Global Vibe)
const medicalTeam = [
  {
    id: 1,
    name: "Dr. Sarah Mitchell",
    position: "Chief Dermatologist",
    // Professional Female Doctor in Clinic Setting
    image: "https://images.unsplash.com/photo-1759350075177-eeb89d507990?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBkb2N0b3IlMjBhZXN0aGV0aWMlMjBjbGluaWMlMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njg2NDY4NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Specializing in advanced laser toning and personalized skin rejuvenation therapies for natural radiance."
  },
  {
    id: 2,
    name: "Dr. James Chen",
    position: "Senior Surgeon",
    // Professional Male Doctor with White Coat
    image: "https://images.unsplash.com/photo-1679581356089-e65ea18c7f61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZXJtYXRvbG9naXN0JTIwZG9jdG9yJTIwcG9ydHJhaXQlMjB3aGl0ZSUyMGNvYXQlMjBjbGluaWN8ZW58MXx8fHwxNzY4NjQ2ODQyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Expert in minimally invasive lifting procedures and facial contouring with a focus on structural harmony."
  },
  {
    id: 3,
    name: "Dr. Emily Roberts",
    position: "Aesthetic Specialist",
    // Modern Aesthetic Clinic Vibe
    image: "https://images.unsplash.com/photo-1659353887222-630895f23cc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXN0aGV0aWMlMjBtZWRpY2luZSUyMGRvY3RvciUyMHBvcnRyYWl0JTIwc3R1ZGlvJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2ODY0Njg0Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Dedicated to non-surgical enhancements, filler artistry, and comprehensive anti-aging solutions."
  }
];

// Social Icons Data (Matched with FloatingToolbar)
const socialIcons = [
  { name: "Naver Booking", url: "https://raw.githubusercontent.com/wognsben/jjtest/main/assets/1x/%EB%84%A4%EC%9D%B4%EB%B2%84%EC%98%88%EC%95%BD_%EB%A1%9C%EA%B3%A0.png", padding: "p-2", bg: "white" },
  { name: "Instagram", url: "https://raw.githubusercontent.com/wognsben/jjtest/main/assets/1x/instagram.png", padding: "p-2", bg: "white" },
  { name: "Threads", url: "https://raw.githubusercontent.com/wognsben/jjtest/main/assets/1x/thread.jpg", padding: "p-2 rounded-full", bg: "white" },
  { name: "Kakao", url: "https://raw.githubusercontent.com/wognsben/jjtest/main/assets/1x/kakao.png", padding: "p-2", bg: "white" },
  { name: "Blog", url: "https://raw.githubusercontent.com/wognsben/jjtest/main/assets/1x/blog%20bl.png", padding: "p-2", bg: "white" },
];

export function MedicalStaff() {
  const profileDetails = {
    positions: [
        'Current) Representative Director, ADO',
        'Former) Director, Cheongdam OO Dermatology',
        'Member, Korean Dermatological Association'
    ],
    academic: [
      'Graduated from Seoul National University College of Medicine',
      'Board Certified Dermatologist, SNU Hospital',
      'Clinical Advisory Doctor, SNU Hospital Dermatology',
    ],
    global: [
        'Ulthera® Global Key Opinion Leader',
        'Juvederm® Global Faculty',
        'Completed Restylane® Master Course'
    ]
  };

  return (
    <section className="relative min-h-screen bg-white text-[#1C1C1C] py-24 px-6 md:px-12 lg:px-24 border-t border-gray-100 overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-gray-50 to-transparent rounded-full blur-3xl opacity-60 pointer-events-none -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-to-t from-gray-50 to-transparent rounded-full blur-3xl opacity-40 pointer-events-none translate-y-1/2 -translate-x-1/4" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Header Title */}
        <div className="text-center mb-24 md:mb-32">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <span className="text-xs font-bold tracking-[0.4em] text-[#8C8C8C] uppercase mb-4 block">Medical Team</span>
                <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A]">MEDICAL TEAM</h2>
            </motion.div>
        </div>

        {/* 1. Representative Director Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start mb-32">
          
          {/* Left Column: Doctor Image (5 Columns) */}
          <div className="lg:col-span-5 relative group perspective-1000">
            <div className="sticky top-32">
                <div className="relative p-2 rounded-[40px] bg-gradient-to-br from-white via-gray-50 to-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-white/50">
                    <div className="aspect-[3/4] w-full bg-[#E5E5E5] rounded-[32px] overflow-hidden relative">
                        <img 
                          src={doctorImg} 
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                          alt="Dr. Ki-Beom Park"
                        />
                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                </div>
                
                <div className="mt-8 text-center lg:text-left pl-2">
                     <p className="text-xs tracking-[0.2em] text-[#5F9EA0] uppercase mb-2 font-medium">Representative Director</p>
                     <h3 className="text-4xl font-serif text-[#1A1A1A] mb-1">Dr. Ki-Beom Park</h3>
                     <p className="text-sm text-[#8C8C8C] font-light">Representative Director</p>
                </div>
            </div>
          </div>

          {/* Right Column: Philosophy & Biography (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col pt-8 lg:pt-16">
            
            {/* Philosophy Text */}
            <div className="mb-16 pl-2">
                <h3 className="text-3xl md:text-4xl font-serif leading-tight mb-8 break-keep text-[#1A1A1A]">
                    Don't try to be someone else.<br/>
                    <span className="relative inline-block">
                        <span className="relative z-10 text-[#5F9EA0]">Be the best version</span>
                        <span className="absolute bottom-2 left-0 w-full h-[10px] bg-[#5F9EA0]/10 -z-0"></span>
                    </span> of yourself.
                </h3>
                <div className="space-y-6 text-[#4A4A4A] font-light text-base leading-relaxed max-w-xl">
                    <p>
                        ADO pursues natural beauty that continues your unique drama,<br/>
                        rather than standardized criteria defined by society.
                    </p>
                </div>
            </div>

            {/* Premium Glass Card for Profiles - ONE LINE LAYOUT */}
            <div className="relative overflow-hidden rounded-[20px] bg-white/60 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-8 md:p-10 transition-all hover:bg-white/80 hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)]">
                {/* Subtle sheen effect */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-50" />

                {/* Grid Layout for Desktop: 3 Columns in One Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* 1. Profile */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-gray-200/60">
                            <div className="w-1 h-3 bg-[#1A1A1A]" />
                            <h4 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-[0.2em]">Profile</h4>
                        </div>
                        <ul className="space-y-2.5">
                            {profileDetails.positions.map((item, idx) => (
                                <li key={idx} className="text-[#555] font-light text-[13px] leading-relaxed whitespace-nowrap overflow-hidden text-ellipsis hover:text-black transition-colors">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 2. Academic */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-gray-200/60">
                            <div className="w-1 h-3 bg-[#5F9EA0]" />
                            <h4 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-[0.2em]">Academic</h4>
                        </div>
                        <ul className="space-y-2.5">
                            {profileDetails.academic.map((item, idx) => (
                                <li key={idx} className="text-[#555] font-light text-[13px] leading-relaxed whitespace-nowrap overflow-hidden text-ellipsis hover:text-black transition-colors">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 3. Global Activities */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-gray-200/60">
                            <div className="w-1 h-3 bg-[#5F9EA0]" />
                            <h4 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-[0.2em]">Global Activities</h4>
                        </div>
                        <ul className="space-y-2.5">
                            {profileDetails.global.map((item, idx) => (
                                <li key={idx} className="text-[#555] font-light text-[13px] leading-relaxed whitespace-nowrap overflow-hidden text-ellipsis hover:text-black transition-colors">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Social Icons Area */}
                <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-between flex-wrap gap-4">
                     <span className="text-xs text-gray-400 font-medium tracking-widest uppercase hidden md:block">Connect with us</span>
                     <div className="flex gap-3">
                        {socialIcons.map((icon, idx) => (
                            <motion.a
                                key={idx}
                                href="#"
                                whileHover={{ y: -3, scale: 1.05 }}
                                className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all group overflow-hidden"
                                title={icon.name}
                            >
                                <img 
                                    src={icon.url} 
                                    alt={icon.name} 
                                    className={`w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity ${icon.padding}`}
                                    loading="lazy"
                                />
                            </motion.a>
                        ))}
                     </div>
                </div>

            </div>

          </div>
        </div>

        {/* 2. Professional Team Grid Section - Updated to 3 Members */}
        <div className="mb-32">
            <div className="flex flex-col items-center mb-12">
                <span className="text-xs font-bold tracking-[0.3em] text-[#5F9EA0] uppercase mb-3">Our Professionals</span>
                <h3 className="text-3xl md:text-4xl font-serif text-[#1A1A1A]">MEDICAL TEAM</h3>
            </div>
            
            {/* Grid for 3 columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {medicalTeam.map((doctor) => (
                    <motion.div 
                        key={doctor.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: doctor.id * 0.1 }}
                        className="group flex flex-col h-full bg-white rounded-[16px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                    >
                        {/* Image Aspect Ratio adjusted for Portraits - High Resolution */}
                        <div className="aspect-[4/5] overflow-hidden bg-gray-100 relative">
                            <img 
                                src={doctor.image} 
                                alt={doctor.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        <div className="p-6 flex flex-col flex-grow text-center">
                            <h4 className="text-[#1A1A1A] font-serif text-xl mb-1">{doctor.name}</h4>
                            <p className="text-[#5F9EA0] text-xs font-bold uppercase tracking-widest mb-4">{doctor.position}</p>
                            
                            {/* Divider */}
                            <div className="w-8 h-[1px] bg-gray-200 mx-auto mb-4" />
                            
                            {/* Description */}
                            <p className="text-[#666] text-sm font-light leading-relaxed line-clamp-3">
                                {doctor.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>

        {/* 3. Global Academic Leadership Section */}
        <div className="mt-32 pt-20 border-t border-gray-100 relative">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
           
           <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 px-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                    <span className="w-8 h-[1px] bg-[#5F9EA0]"></span>
                    <p className="text-xs tracking-[0.2em] text-[#5F9EA0] uppercase font-bold">
                    Global Academic Insight
                    </p>
                </div>
                <h3 className="text-3xl md:text-4xl font-serif text-[#1A1A1A]">Academic History</h3>
              </div>
              <p className="text-[#888] text-sm md:text-base font-light text-right leading-relaxed">
                 Presenting a new standard for K-Beauty<br />
                 through continuous research and global lectures.
              </p>
           </div>
           
           <div className="w-full mt-12 p-8 md:p-12 rounded-[24px] bg-gray-50/50 backdrop-blur-sm border border-white/50 shadow-inner">
               <AcademicGallery />
           </div>
        </div>

      </div>
    </section>
  );
}