import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Checkbox } from "../components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from 'lucide-react';
// Replaced figma:asset with Unsplash URL
const bgImage = "https://github.com/wognsben/Adoclinic/blob/main/NEW%20IG/CONTACT.png?raw=true";

const SKIN_TYPES = [
  { value: 'dry', label: '건성' },
  { value: 'oily', label: '지성' },
  { value: 'combination', label: '복합성' },
  { value: 'sensitive', label: '민감성' },
  { value: 'normal', label: '중성' },
];

const AGE_RANGES = [
  { value: '20s', label: '20대' },
  { value: '30s', label: '30대' },
  { value: '40s', label: '40대' },
  { value: '50s', label: '50대' },
  { value: '60plus', label: '60대 이상' },
];

const CONCERNS = [
  { id: 'wrinkles', label: '주름 / 잔주름' },
  { id: 'sagging', label: '처짐 / 턱선' },
  { id: 'pigmentation', label: '기미 / 색소' },
  { id: 'pores', label: '모공 / 흉터' },
  { id: 'dryness', label: '건조 / 수분 부족' },
  { id: 'acne', label: '여드름 / 홍조' },
  { id: 'volume', label: '볼륨 손실' },
  { id: 'contour', label: '윤곽 개선' },
  { id: 'overall', label: '전반적 안티에이징' },
];

export function ContactPage() {
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);

  const toggleConcern = (id: string) => {
    setSelectedConcerns(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  return (
    <div className="relative w-full min-h-screen font-sans bg-white overflow-x-hidden">
      
      {/* Background Image with Gradient Overlay */}
      <div className="fixed inset-0 z-0">
        <img 
            src={bgImage}
            alt="Clinic Reception" 
            className="w-full h-full object-cover"
        />
        {/* Gradient: Solid White on Left -> Fade to Transparent on Right */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white/30 lg:via-white/60 lg:to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-32 lg:py-24 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 w-full items-start lg:items-center">
          
          {/* Left Content: Text & Info */}
          <div className="lg:col-span-5 space-y-12 lg:pr-12">
            <div>
                <motion.span 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="block text-sm font-bold tracking-[0.2em] text-[#738F86] mb-4 uppercase"
                >
                    Contact Us
                </motion.span>
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-6 leading-tight word-keep"
                >
                    아름다움을 향한<br/> 여정의 시작
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-[#8C8C8C] text-lg font-light leading-relaxed max-w-md"
                >
                    아도 클리닉은 100% 예약제로 운영되며, 한 분 한 분 깊이 있는 상담을 통해 최적의 솔루션을 제안합니다.
                </motion.p>
            </div>

            {/* Contact Info List */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-8"
            >
                <div className="flex items-center gap-5 group">
                    <div className="w-12 h-12 rounded-full bg-[#738F86]/10 flex items-center justify-center text-[#738F86] group-hover:bg-[#738F86] group-hover:text-white transition-all duration-300 shadow-sm">
                        <Phone className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-xl font-medium text-[#1A1A1A]">02-540-8829</p>
                        <p className="text-sm text-[#8C8C8C] mt-0.5">상담 가능 시간: 10:00 - 20:00</p>
                    </div>
                </div>

                <div className="flex items-center gap-5 group">
                    <div className="w-12 h-12 rounded-full bg-[#738F86]/10 flex items-center justify-center text-[#738F86] group-hover:bg-[#738F86] group-hover:text-white transition-all duration-300 shadow-sm">
                        <Mail className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-xl font-medium text-[#1A1A1A]">info@adoclinic.com</p>
                        <p className="text-sm text-[#8C8C8C] mt-0.5">언제든 문의주세요</p>
                    </div>
                </div>

                <div className="flex items-center gap-5 group">
                    <div className="w-12 h-12 rounded-full bg-[#738F86]/10 flex items-center justify-center text-[#738F86] group-hover:bg-[#738F86] group-hover:text-white transition-all duration-300 shadow-sm">
                        <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-lg font-medium text-[#1A1A1A] leading-tight">
                            서울특별시 강남구 도산대로 45길 12, <br/>아도빌딩 3, 4F
                        </p>
                    </div>
                </div>
            </motion.div>
          </div>

          {/* Right Content: Glassmorphism Form Card */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="lg:col-span-7"
          >
             <div className="backdrop-blur-xl bg-white/40 border border-white/60 shadow-[0_20px_80px_rgba(0,0,0,0.05)] rounded-[40px] p-8 md:p-12 relative overflow-hidden">
                
                {/* Glossy Highlight Effect */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />

                <div className="relative z-10">
                    <h2 className="text-2xl font-serif text-[#1A1A1A] mb-8 flex items-center gap-3">
                        Request Consultation
                        <div className="h-px flex-1 bg-gradient-to-r from-[#1A1A1A]/20 to-transparent" />
                    </h2>

                    <form className="space-y-6">
                        {/* Personal Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-xs font-bold text-[#5E7A70] uppercase tracking-wider pl-1">Name</Label>
                                <Input 
                                    placeholder="성함" 
                                    className="bg-white/70 border-white/50 focus:bg-white focus:border-[#738F86]/50 rounded-xl h-12 shadow-sm text-base placeholder:text-gray-400"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-bold text-[#5E7A70] uppercase tracking-wider pl-1">Contact</Label>
                                <Input 
                                    placeholder="연락처" 
                                    className="bg-white/70 border-white/50 focus:bg-white focus:border-[#738F86]/50 rounded-xl h-12 shadow-sm text-base placeholder:text-gray-400"
                                />
                            </div>
                        </div>

                        {/* Skin Info & Age (Simplified Layout) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-xs font-bold text-[#5E7A70] uppercase tracking-wider pl-1">Skin Type</Label>
                                <Select>
                                    <SelectTrigger className="bg-white/70 border-white/50 focus:bg-white focus:ring-0 focus:border-[#738F86]/50 rounded-xl h-12 shadow-sm">
                                        <SelectValue placeholder="피부 타입" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white/90 backdrop-blur-xl border-white/50">
                                        {SKIN_TYPES.map(type => (
                                            <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-bold text-[#5E7A70] uppercase tracking-wider pl-1">Age Range</Label>
                                <Select>
                                    <SelectTrigger className="bg-white/70 border-white/50 focus:bg-white focus:ring-0 focus:border-[#738F86]/50 rounded-xl h-12 shadow-sm">
                                        <SelectValue placeholder="연령대" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white/90 backdrop-blur-xl border-white/50">
                                        {AGE_RANGES.map(age => (
                                            <SelectItem key={age.value} value={age.value}>{age.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Concerns (Glass Box) */}
                        <div className="bg-white/40 rounded-2xl p-6 border border-white/50 shadow-inner">
                            <Label className="text-xs font-bold text-[#5E7A70] uppercase tracking-wider mb-4 block">주요 고민 부위</Label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {CONCERNS.map(concern => (
                                    <div key={concern.id} className="flex items-center space-x-2">
                                        <Checkbox 
                                            id={concern.id}
                                            checked={selectedConcerns.includes(concern.id)}
                                            onCheckedChange={() => toggleConcern(concern.id)}
                                            className="data-[state=checked]:bg-[#738F86] data-[state=checked]:border-[#738F86] border-black/20"
                                        />
                                        <label
                                            htmlFor={concern.id}
                                            className="text-sm text-[#444] cursor-pointer leading-none hover:text-black transition-colors"
                                        >
                                            {concern.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Message */}
                        <div className="space-y-2">
                            <Label className="text-xs font-bold text-[#5E7A70] uppercase tracking-wider pl-1">Message</Label>
                            <Textarea 
                                placeholder="문의 내용을 자유롭게 적어주세요." 
                                className="bg-white/70 border-white/50 focus:bg-white focus:border-[#738F86]/50 rounded-xl min-h-[120px] shadow-sm resize-none p-4 text-base placeholder:text-gray-400"
                            />
                        </div>

                        {/* Submit Button */}
                        <Button className="w-full bg-[#738F86] hover:bg-[#5E7A70] text-white h-14 rounded-xl text-sm font-bold tracking-[0.2em] shadow-lg hover:shadow-xl transition-all duration-300">
                            SEND MESSAGE
                        </Button>

                        <p className="text-center text-xs text-[#8C8C8C]">
                            개인정보 수집 및 이용에 동의하는 것으로 간주합니다.
                        </p>
                    </form>
                </div>
             </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}