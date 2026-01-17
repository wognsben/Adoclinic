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
const bgImage = "https://github.com/wognsben/jjtest/blob/main/NEW%20IG/CONTACT.png?raw=true";

const SKIN_TYPES = [
  { value: 'dry', label: 'Dry' },
  { value: 'oily', label: 'Oily' },
  { value: 'combination', label: 'Combination' },
  { value: 'sensitive', label: 'Sensitive' },
  { value: 'normal', label: 'Normal' },
];

const AGE_RANGES = [
  { value: '20s', label: '20s' },
  { value: '30s', label: '30s' },
  { value: '40s', label: '40s' },
  { value: '50s', label: '50s' },
  { value: '60plus', label: '60s+' },
];

const CONCERNS = [
  { id: 'wrinkles', label: 'Wrinkles / Fine Lines' },
  { id: 'sagging', label: 'Sagging / Jawline' },
  { id: 'pigmentation', label: 'Blemishes / Pigmentation' },
  { id: 'pores', label: 'Pores / Scars' },
  { id: 'dryness', label: 'Dryness / Dehydration' },
  { id: 'acne', label: 'Acne / Redness' },
  { id: 'volume', label: 'Volume Loss' },
  { id: 'contour', label: 'Contour Improvement' },
  { id: 'overall', label: 'General Anti-aging' },
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
                    Beginning of the Journey<br/> Towards Beauty
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-[#8C8C8C] text-lg font-light leading-relaxed max-w-md"
                >
                    ADO operates on a 100% reservation basis, proposing optimal solutions through in-depth consultation with each person.
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
                        <p className="text-sm text-[#8C8C8C] mt-0.5">Consultation Hours: 10:00 - 20:00</p>
                    </div>
                </div>

                <div className="flex items-center gap-5 group">
                    <div className="w-12 h-12 rounded-full bg-[#738F86]/10 flex items-center justify-center text-[#738F86] group-hover:bg-[#738F86] group-hover:text-white transition-all duration-300 shadow-sm">
                        <Mail className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-xl font-medium text-[#1A1A1A]">info@adoclinic.com</p>
                        <p className="text-sm text-[#8C8C8C] mt-0.5">Contact us anytime</p>
                    </div>
                </div>

                <div className="flex items-center gap-5 group">
                    <div className="w-12 h-12 rounded-full bg-[#738F86]/10 flex items-center justify-center text-[#738F86] group-hover:bg-[#738F86] group-hover:text-white transition-all duration-300 shadow-sm">
                        <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-lg font-medium text-[#1A1A1A] leading-tight">
                            3, 4F ADO Building,<br/> 12 Dosan-daero 45-gil, Gangnam-gu, Seoul
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
                                    placeholder="Name" 
                                    className="bg-white/70 border-white/50 focus:bg-white focus:border-[#738F86]/50 rounded-xl h-12 shadow-sm text-base placeholder:text-gray-400"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-bold text-[#5E7A70] uppercase tracking-wider pl-1">Contact</Label>
                                <Input 
                                    placeholder="Phone Number" 
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
                                        <SelectValue placeholder="Skin Type" />
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
                                        <SelectValue placeholder="Age Group" />
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
                            <Label className="text-xs font-bold text-[#5E7A70] uppercase tracking-wider mb-4 block">Main Concerns</Label>
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
                                placeholder="Please write your inquiry freely." 
                                className="bg-white/70 border-white/50 focus:bg-white focus:border-[#738F86]/50 rounded-xl min-h-[120px] shadow-sm resize-none p-4 text-base placeholder:text-gray-400"
                            />
                        </div>

                        {/* Submit Button */}
                        <Button className="w-full bg-[#738F86] hover:bg-[#5E7A70] text-white h-14 rounded-xl text-sm font-bold tracking-[0.2em] shadow-lg hover:shadow-xl transition-all duration-300">
                            SEND MESSAGE
                        </Button>

                        <p className="text-center text-xs text-[#8C8C8C]">
                            By submitting, you agree to the collection and use of personal information.
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
