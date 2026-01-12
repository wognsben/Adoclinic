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
    <div className="w-full min-h-screen bg-[#Fdfbf9]">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#1A1A1A]">
            <img 
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2000&auto=format&fit=crop" 
                alt="Reception" 
                className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent opacity-90" />
        </div>
        <div className="relative z-10 text-center text-white px-6">
            <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="block text-sm md:text-base tracking-[0.3em] text-[#738F86] mb-6 uppercase font-medium"
            >
                Private Consultation
            </motion.span>
            <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-7xl font-serif mb-6 leading-tight"
            >
                Start Your Journey
            </motion.h1>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-white/70 max-w-xl mx-auto font-light text-lg"
            >
                아도 클리닉은 100% 예약제로 운영되며,<br className="hidden md:block"/> 한 분 한 분 깊이 있는 상담을 통해 최적의 솔루션을 제안합니다.
            </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <div className="relative z-20 -mt-20 max-w-[1400px] mx-auto px-6 pb-32">
        <div className="bg-white rounded-[32px] shadow-[0_20px_80px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-5">
                
                {/* Left: Contact Info (Dark) */}
                <div className="lg:col-span-2 bg-[#1A1A1A] text-white p-12 md:p-16 flex flex-col justify-between relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#738F86] rounded-full filter blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>

                    <div>
                        <h3 className="text-3xl font-serif mb-12">Contact Information</h3>
                        
                        <div className="space-y-10">
                            <div className="flex items-start gap-6 group">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#738F86] transition-colors duration-300 shrink-0">
                                    <Phone className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold tracking-widest text-[#738F86] uppercase mb-2">Phone</p>
                                    <p className="text-xl font-light">02-540-8829</p>
                                    <p className="text-white/40 text-sm mt-1">상담 가능 시간: 10:00 - 20:00</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-6 group">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#738F86] transition-colors duration-300 shrink-0">
                                    <Mail className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold tracking-widest text-[#738F86] uppercase mb-2">Email</p>
                                    <p className="text-xl font-light">info@adoclinic.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#738F86] transition-colors duration-300 shrink-0">
                                    <MapPin className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold tracking-widest text-[#738F86] uppercase mb-2">Location</p>
                                    <p className="text-lg font-light leading-relaxed text-white/90">
                                        서울특별시 강남구 도산대로 45길 12,<br/>
                                        아도빌딩 3, 4F
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-20 lg:mt-0">
                         {/* Simple Hours Summary */}
                         <div className="border-t border-white/10 pt-8">
                            <h4 className="font-serif text-xl mb-4 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-[#738F86]" />
                                Operating Hours
                            </h4>
                            <ul className="space-y-2 text-sm text-white/60 font-light">
                                <li className="flex justify-between"><span>Mon - Fri</span> <span>10:00 - 20:00</span></li>
                                <li className="flex justify-between"><span>Saturday</span> <span>10:00 - 16:00</span></li>
                                <li className="flex justify-between text-[#738F86]"><span>Sun / Holiday</span> <span>Closed</span></li>
                            </ul>
                         </div>
                    </div>
                </div>

                {/* Right: Advanced Consultation Form (Light) */}
                <div className="lg:col-span-3 p-12 md:p-16 bg-white">
                    <div className="mb-10">
                        <h2 className="text-3xl md:text-4xl font-serif text-[#1A1A1A] mb-4">Request Consultation</h2>
                        <p className="text-[#8C8C8C] font-light">
                            정확한 진단을 위해 아래 정보를 입력해주시면,<br/>
                            <span className="text-[#5E7A70] font-medium">24시간 내 전문 상담실장이 연락드립니다.</span>
                        </p>
                    </div>

                    <form className="space-y-8">
                        {/* Personal Info Group */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <Label htmlFor="name" className="text-xs font-bold tracking-widest text-[#5E7A70] uppercase">Name *</Label>
                                <Input 
                                    id="name" 
                                    placeholder="성함을 입력해주세요" 
                                    className="border-x-0 border-t-0 border-b border-[#E5E5E5] rounded-none px-0 py-2 focus-visible:ring-0 focus-visible:border-[#1A1A1A] placeholder:text-[#D6D3D1] text-base"
                                />
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="phone" className="text-xs font-bold tracking-widest text-[#5E7A70] uppercase">Contact *</Label>
                                <Input 
                                    id="phone" 
                                    placeholder="연락처를 입력해주세요" 
                                    className="border-x-0 border-t-0 border-b border-[#E5E5E5] rounded-none px-0 py-2 focus-visible:ring-0 focus-visible:border-[#1A1A1A] placeholder:text-[#D6D3D1] text-base"
                                />
                            </div>
                        </div>

                        {/* Skin Analysis Group */}
                        <div className="bg-[#F9F9F9] rounded-3xl p-8 space-y-6 border border-[#E5E5E5]">
                            <h3 className="text-lg font-serif text-[#1A1A1A] mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#5E7A70]"></span>
                                피부 분석 정보
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <Label className="text-xs font-bold tracking-widest text-[#5E7A70] uppercase">Skin Type</Label>
                                    <Select>
                                        <SelectTrigger className="border-x-0 border-t-0 border-b border-[#E5E5E5] rounded-none px-0 py-2 focus:ring-0 focus:ring-offset-0 focus:border-[#1A1A1A] text-base font-normal bg-transparent">
                                            <SelectValue placeholder="피부 타입 선택" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white z-50">
                                            {SKIN_TYPES.map(type => (
                                                <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-xs font-bold tracking-widest text-[#5E7A70] uppercase">Age Range</Label>
                                    <Select>
                                        <SelectTrigger className="border-x-0 border-t-0 border-b border-[#E5E5E5] rounded-none px-0 py-2 focus:ring-0 focus:ring-offset-0 focus:border-[#1A1A1A] text-base font-normal bg-transparent">
                                            <SelectValue placeholder="연령대 선택" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white z-50">
                                            {AGE_RANGES.map(age => (
                                                <SelectItem key={age.value} value={age.value}>{age.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Main Concerns - Checkboxes */}
                            <div className="space-y-4">
                                <Label className="text-xs font-bold tracking-widest text-[#5E7A70] uppercase block">
                                    주요 고민 부위 (복수 선택 가능)
                                </Label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {CONCERNS.map(concern => (
                                        <div key={concern.id} className="flex items-center space-x-2">
                                            <Checkbox 
                                                id={concern.id}
                                                checked={selectedConcerns.includes(concern.id)}
                                                onCheckedChange={() => toggleConcern(concern.id)}
                                                className="data-[state=checked]:bg-[#5E7A70] data-[state=checked]:border-[#5E7A70]"
                                            />
                                            <label
                                                htmlFor={concern.id}
                                                className="text-sm font-light text-[#525252] cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                {concern.label}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Treatment Preferences */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <Label className="text-xs font-bold tracking-widest text-[#5E7A70] uppercase">Treatment Interest</Label>
                                <Select>
                                    <SelectTrigger className="border-x-0 border-t-0 border-b border-[#E5E5E5] rounded-none px-0 py-2 focus:ring-0 focus:ring-offset-0 focus:border-[#1A1A1A] text-base font-normal">
                                        <SelectValue placeholder="관심 시술을 선택해주세요" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white z-50">
                                        <SelectItem value="lifting">리프팅 (울쎄라/티타늄/튠페이스)</SelectItem>
                                        <SelectItem value="skin">스킨부스터 (리쥬란/쥬베룩)</SelectItem>
                                        <SelectItem value="pore">모공/흉터 (포텐자/피코)</SelectItem>
                                        <SelectItem value="pigment">기미/색소</SelectItem>
                                        <SelectItem value="body">바디 컨투어링</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-3">
                                <Label className="text-xs font-bold tracking-widest text-[#5E7A70] uppercase">Previous Treatment</Label>
                                <Select>
                                    <SelectTrigger className="border-x-0 border-t-0 border-b border-[#E5E5E5] rounded-none px-0 py-2 focus:ring-0 focus:ring-offset-0 focus:border-[#1A1A1A] text-base font-normal">
                                        <SelectValue placeholder="이전 시술 경험" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white z-50">
                                        <SelectItem value="none">경험 없음</SelectItem>
                                        <SelectItem value="botox">보톡스 경험 있음</SelectItem>
                                        <SelectItem value="filler">필러 경험 있음</SelectItem>
                                        <SelectItem value="laser">레이저 경험 있음</SelectItem>
                                        <SelectItem value="multiple">복수 시술 경험</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Preferred Time */}
                        <div className="space-y-3">
                            <Label className="text-xs font-bold tracking-widest text-[#5E7A70] uppercase">Preferred Time</Label>
                            <Select>
                                <SelectTrigger className="border-x-0 border-t-0 border-b border-[#E5E5E5] rounded-none px-0 py-2 focus:ring-0 focus:ring-offset-0 focus:border-[#1A1A1A] text-base font-normal">
                                    <SelectValue placeholder="희망 상담 시간대" />
                                </SelectTrigger>
                                <SelectContent className="bg-white z-50">
                                    <SelectItem value="morning">오전 (10:00 - 13:00)</SelectItem>
                                    <SelectItem value="afternoon">오후 (13:00 - 17:00)</SelectItem>
                                    <SelectItem value="evening">저녁 (17:00 - 20:00)</SelectItem>
                                    <SelectItem value="any">상관없음</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Message */}
                        <div className="space-y-3">
                            <Label htmlFor="message" className="text-xs font-bold tracking-widest text-[#5E7A70] uppercase">Message</Label>
                            <Textarea 
                                id="message" 
                                placeholder="현재 고민이거나 궁금하신 점을 자유롭게 적어주세요." 
                                className="bg-[#F9F9F9] border-0 resize-none min-h-[150px] p-4 text-base placeholder:text-[#D6D3D1] focus-visible:ring-1 focus-visible:ring-[#1A1A1A]"
                            />
                        </div>

                        {/* Agreement */}
                        <div className="flex items-start space-x-3 pt-4">
                            <Checkbox id="terms" className="mt-1 data-[state=checked]:bg-[#1A1A1A] data-[state=checked]:border-[#1A1A1A]" />
                            <div className="grid gap-1.5 leading-none">
                                <label
                                    htmlFor="terms"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#525252]"
                                >
                                    개인정보 수집 및 이용에 동의합니다.
                                </label>
                                <p className="text-xs text-[#A3A3A3]">
                                    상담 예약 및 응대를 위해 이름, 연락처, 피부 정보를 수집하며, 
                                    상담 완료 후 <span className="text-[#5E7A70] font-medium">6개월 이내 자동 파기</span>됩니다.
                                </p>
                            </div>
                        </div>

                        <div className="pt-8">
                            <Button className="w-full md:w-auto bg-[#1A1A1A] hover:bg-[#5E7A70] text-white px-10 py-6 text-sm font-bold tracking-[0.2em] transition-all duration-300 rounded-none md:rounded-full group">
                                SUBMIT REQUEST
                                <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      </div>

      {/* Gallery Caption */}
      <section className="w-full bg-[#Fdfbf9] py-16 text-center border-t border-[#1A1A1A]/10">
        <p className="text-xs tracking-[0.3em] uppercase text-[#1A1A1A] mb-2">Object 06 : Gateway</p>
        <p className="text-[#8C8C8C] font-serif italic text-lg">"정확한 진단의 시작"</p>
      </section>
    </div>
  );
}
