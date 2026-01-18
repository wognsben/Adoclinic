import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission
    alert("Consultation request received. We will contact you soon.");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white/80 backdrop-blur-2xl border-white/40 shadow-[0_40px_80px_rgba(0,0,0,0.12)] p-0 overflow-hidden rounded-[40px]">
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />
        
        <div className="relative z-10 p-8 md:p-10">
          <DialogHeader className="mb-8 text-center">
            <span className="text-[#738F86] text-[10px] font-bold tracking-[0.3em] uppercase mb-3 block">Reservation</span>
            <DialogTitle className="text-3xl font-serif text-[#1c1917] mb-2">Consultation</DialogTitle>
            <DialogDescription className="text-[#888] font-light text-sm">
              Experience the beginning of your beauty journey.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-[10px] font-bold tracking-widest text-[#5E7A70] pl-1">NAME</Label>
                <Input 
                    id="name" 
                    required 
                    placeholder="Name" 
                    className="bg-white/50 border-white/60 focus:bg-white focus:border-[#738F86] rounded-2xl h-11 text-sm shadow-sm transition-all duration-300 placeholder:text-gray-400" 
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone" className="text-[10px] font-bold tracking-widest text-[#5E7A70] pl-1">CONTACT</Label>
                <Input 
                    id="phone" 
                    required 
                    placeholder="010-0000-0000" 
                    className="bg-white/50 border-white/60 focus:bg-white focus:border-[#738F86] rounded-2xl h-11 text-sm shadow-sm transition-all duration-300 placeholder:text-gray-400" 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="category" className="text-[10px] font-bold tracking-widest text-[#5E7A70] pl-1">TREATMENT</Label>
              <Select>
                <SelectTrigger className="bg-white/50 border-white/60 focus:bg-white focus:border-[#738F86] rounded-2xl h-11 text-sm shadow-sm transition-all duration-300 text-gray-600">
                  <SelectValue placeholder="Select Treatment Category" />
                </SelectTrigger>
                <SelectContent className="bg-white/90 backdrop-blur-xl border-white/60 rounded-xl shadow-xl">
                  <SelectItem value="lifting">Lifting (Ulthera/Titanium)</SelectItem>
                  <SelectItem value="skin">Skin Booster (Rejuran/Juvelook)</SelectItem>
                  <SelectItem value="body">Body Contouring</SelectItem>
                  <SelectItem value="other">Other Inquiries</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="message" className="text-[10px] font-bold tracking-widest text-[#5E7A70] pl-1">MESSAGE</Label>
              <Textarea 
                id="message" 
                placeholder="Please describe your concerns or desired consultation topic." 
                className="bg-white/50 border-white/60 focus:bg-white focus:border-[#738F86] min-h-[100px] resize-none rounded-2xl p-4 text-sm shadow-sm transition-all duration-300 placeholder:text-gray-400"
              />
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full bg-[#1c1917] hover:bg-[#738F86] text-white h-14 rounded-full text-xs font-bold tracking-[0.2em] shadow-lg hover:shadow-xl transition-all duration-500 uppercase">
                Submit Request
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
