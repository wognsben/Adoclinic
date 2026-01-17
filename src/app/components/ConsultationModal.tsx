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
      <DialogContent className="sm:max-w-[500px] bg-[#F4F3F0] border-[#D6D3D1] p-0 overflow-hidden rounded-[32px]">
        <div className="p-6 md:p-8">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-serif text-[#1c1917]">Consultation</DialogTitle>
            <DialogDescription className="text-[#57534E]">
              Please enter your information for a personalized 1:1 consultation.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs font-bold tracking-widest text-[#1c1917]">NAME</Label>
                <Input id="name" required placeholder="Name" className="bg-white border-[#E7E5E4] focus:border-[#738F86] rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-xs font-bold tracking-widest text-[#1c1917]">CONTACT</Label>
                <Input id="phone" required placeholder="010-0000-0000" className="bg-white border-[#E7E5E4] focus:border-[#738F86] rounded-xl" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-xs font-bold tracking-widest text-[#1c1917]">TREATMENT</Label>
              <Select>
                <SelectTrigger className="bg-white border-[#E7E5E4] focus:border-[#738F86] rounded-xl">
                  <SelectValue placeholder="Select Treatment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lifting">Lifting (Ulthera/Titanium)</SelectItem>
                  <SelectItem value="skin">Skin Booster (Rejuran/Juvelook)</SelectItem>
                  <SelectItem value="body">Body Contouring</SelectItem>
                  <SelectItem value="other">Other Inquiries</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-xs font-bold tracking-widest text-[#1c1917]">MESSAGE</Label>
              <Textarea 
                id="message" 
                placeholder="Please describe your concerns or desired consultation topic." 
                className="bg-white border-[#E7E5E4] focus:border-[#738F86] min-h-[100px] resize-none rounded-xl"
              />
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full bg-[#1c1917] hover:bg-[#738F86] text-white py-6 rounded-xl text-sm font-bold tracking-wider transition-colors">
                SUBMIT REQUEST
              </Button>
            </div>
          </form>
        </div>
        
        {/* Decorative bottom bar */}
        <div className="h-2 bg-[#738F86] w-full" />
      </DialogContent>
    </Dialog>
  );
}
