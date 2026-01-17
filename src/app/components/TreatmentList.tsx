import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Clock, Calendar, TrendingUp, Users, CheckCircle2, ChevronRight, PlayCircle, ArrowUpRight, Activity, Sparkles, RefreshCw, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

// Process Steps Data
const processSteps = [
  { step: "01", title: "Diagnosis", korTitle: "Discovery of Essence", desc: "Exploring problems and possibilities deep within the skin through Mark-Vu precision diagnosis." },
  { step: "02", title: "Design", korTitle: "Aesthetic Design", desc: "Designing ADO's unique finishing touch points considering facial structure and skin texture, not just a simple procedure." },
  { step: "03", title: "Procedure", korTitle: "Precise Procedure", desc: "Performed by the representative director, inducing maximal change with minimal intervention." },
  { step: "04", title: "Maintenance", korTitle: "Aesthetics of Sustainability", desc: "Providing systematic aftercare so that the beauty immediately after the procedure continues in daily life." }
];

// Enhanced Data Structure with Full Categories
const categories = [
  {
    id: 'event',
    title: 'Grand Opening Event',
    description: 'Special benefits to celebrate the beginning of ADO',
    items: [
      { 
        id: 'ev-1',
        name: 'Grand Opening Package', 
        enName: 'Grand Opening Package',
        desc: 'Total solution to experience lifting and skin boosters at once', 
        duration: '90 mins',
        downtime: '1-2 days',
        effect: 'Immediate',
        sessions: 'Limit 1',
        recommended: 'First-time visitors',
        protocol: "Signature Welcome Protocol",
        options: [
          { label: 'Full Face Total Care (50% OFF)', price: '990,000' }
        ]
      }
    ]
  },
  {
    id: 'stem',
    title: 'Stem Cell',
    description: 'The pinnacle of regenerative medicine, fundamental anti-aging',
    items: [
      { 
        id: 'stem-1',
        name: 'SC-Max Stem Cell Therapy', 
        enName: 'Stem Cell Therapy',
        desc: 'Delivering highly concentrated stem cell culture fluid deep into the dermis to induce cell regeneration', 
        duration: '60 mins',
        downtime: 'Same day',
        effect: '6-12 months',
        sessions: '3 sessions rec.',
        recommended: 'Aging skin, scars',
        protocol: "Cellular Regeneration",
        options: [
          { label: '1 Session', price: '1,500,000' },
          { label: '3 Sessions Package', price: '4,000,000' }
        ]
      }
    ]
  },
  {
    id: 'injection',
    title: 'Botox/Contour',
    description: 'Precise touch for natural lines',
    items: [
      { 
        id: 'botox-1',
        name: 'Coretox (Resistance-free)', 
        enName: 'Coretox',
        desc: 'Safe wrinkle improvement without worry of resistance by removing complex proteins', 
        duration: '10 mins',
        downtime: 'Immediate',
        effect: '3-6 months',
        sessions: 'Every 4-6 mos',
        recommended: 'Expression lines',
        protocol: "Precision Targeting",
        options: [
          { label: 'Forehead/Glabella/Eye corners (Choose 1)', price: '79,000' },
          { label: 'Jaw Botox (50u)', price: '120,000' }
        ]
      },
      { 
        id: 'face-1',
        name: 'ADO Cat Injection (Contour)', 
        enName: 'Contour Injection',
        desc: 'Decomposes unnecessary fat and promotes lymph circulation to complete a sharp line', 
        duration: '15 mins',
        downtime: 'Immediate',
        effect: 'Semi-permanent',
        sessions: '3 sessions rec.',
        recommended: 'Double chin, jowls',
        protocol: "Fat Lysis System",
        options: [
          { label: '1 Session (10cc)', price: '99,000' },
          { label: '3 Sessions Package', price: '270,000' }
        ]
      }
    ]
  },
  {
    id: 'lifting',
    title: 'Lifting',
    description: 'Science of elasticity defying gravity',
    items: [
      { 
        id: 'sof',
        name: 'Sofwave™', 
        enName: 'Sofwave™',
        desc: 'New standard for non-surgical lifting, intensive targeting of upper dermis', 
        duration: '45-60 mins',
        downtime: 'Same day',
        effect: '12-18 months',
        sessions: '1 session or 6 mos',
        recommended: '30s-60s, fine wrinkles',
        protocol: "ADO 3-Layer Lifting Protocol™",
        options: [
          { label: 'Full Face (200 Shot)', price: '2,200,000' },
          { label: 'Full Face + Neck (300 Shot)', price: '3,000,000' }
        ]
      },
      { 
        id: 'ulthera',
        name: 'Ultherapy', 
        enName: 'Ultherapy',
        desc: 'Powerful lifting pulling up from the SMAS layer using ultrasound energy', 
        duration: '60-90 mins',
        downtime: 'Same day',
        effect: '12-24 months',
        sessions: '1 session or 12 mos',
        recommended: '40s-60s, sagging',
        protocol: "SMAS Targeting System",
        options: [
          { label: '300 Shot', price: '1,500,000' },
          { label: '400 Shot (Standard)', price: '1,900,000' },
          { label: '600 Shot (Premium)', price: '2,700,000' }
        ]
      },
      { 
        id: 'titanium',
        name: 'Titanium Lifting', 
        enName: 'Titanium Lifting',
        desc: 'Immediate brightening and tightening effect by irradiating three wavelengths simultaneously', 
        duration: '30-40 mins',
        downtime: 'Immediate',
        effect: '6-9 months',
        sessions: '3 sessions rec.',
        recommended: '20s-40s, skin texture',
        protocol: "Instant Brightening Protocol",
        options: [
          { label: '1 Session', price: '990,000' },
          { label: '3 Sessions Package', price: '2,700,000' }
        ]
      }
    ]
  },
  {
    id: 'hair-w',
    title: 'Hair Removal (W)',
    description: 'Premium hair removal for smooth skin',
    items: [
      { 
        id: 'hw-1',
        name: 'Apogee Elite Plus', 
        enName: 'Apogee Elite Plus',
        desc: 'Hygienic and less painful premium hair removal with non-contact air cooling', 
        duration: '10-30 mins',
        downtime: 'Immediate',
        effect: 'Semi-permanent',
        sessions: '5-10 sessions',
        recommended: 'All women',
        protocol: "Air-Cooling System",
        options: [
          { label: 'Armpit 5 sessions', price: '50,000' },
          { label: 'Calves 5 sessions', price: '250,000' }
        ]
      }
    ]
  },
  {
    id: 'hair-m',
    title: 'Hair Removal (M)',
    description: 'Men\'s dedicated hair removal',
    items: [
      { 
        id: 'hm-1',
        name: 'GentleMax Pro Plus', 
        enName: 'GentleMax Pro Plus',
        desc: 'Powerful dual wavelength laser optimized for thick and deep male hair', 
        duration: '20 mins',
        downtime: 'Slight redness',
        effect: 'Semi-permanent',
        sessions: '5-10 sessions',
        recommended: 'Daily shaving hassle',
        protocol: "Dual Wavelength",
        options: [
          { label: 'Philtrum + Beard 5 sessions', price: '350,000' },
          { label: 'Full Face 5 sessions', price: '550,000' }
        ]
      }
    ]
  },
  {
    id: 'skin',
    title: 'Skin Booster',
    description: 'Energy awakening skin\'s natural light',
    items: [
      { 
        id: 'rejuran',
        name: 'Rejuran Healer', 
        enName: 'Rejuran Healer',
        desc: 'improving physiological conditions inside damaged skin with PN ingredients', 
        duration: '30 mins',
        downtime: '2-3 days swelling',
        effect: '6-12 months',
        sessions: '3-4 sessions',
        recommended: 'Skin regeneration',
        protocol: "Dermal Regeneration System",
        options: [
          { label: '2cc (Eye/Butterfly)', price: '350,000' },
          { label: '4cc (Full Face)', price: '650,000' }
        ]
      },
      { 
        id: 'juve-v',
        name: 'Juvelook Volume', 
        enName: 'Juvelook Volume',
        desc: 'Inducing self-collagen production to form natural volume', 
        duration: '45 mins',
        downtime: '1-2 days',
        effect: '12-18 months',
        sessions: '3 sessions',
        recommended: 'Volume deficiency',
        protocol: "Volume Matrix",
        options: [
          { label: '1 Vial (6cc)', price: '600,000' },
          { label: '3 Sessions Package', price: '1,500,000' }
        ]
      },
    ]
  },
  {
    id: 'pore',
    title: 'Pore/Acne',
    description: 'Completing clean and smooth skin',
    items: [
      { 
        id: 'secret',
        name: 'Secret RF', 
        enName: 'Secret RF',
        desc: 'Simultaneous pore reduction and scar improvement with microneedle RF', 
        duration: '40 mins',
        downtime: '1-2 days redness',
        effect: 'Continuous',
        sessions: '3-5 sessions',
        recommended: 'Pores, scars',
        protocol: "Fractional RF",
        options: [
          { label: 'Butterfly Zone', price: '200,000' },
          { label: 'Full Face', price: '350,000' }
        ]
      },
      { 
        id: 'ldm',
        name: 'LDM Triple', 
        enName: 'LDM Triple',
        desc: 'Calming troubles by pulling up moisture inside the skin with high-density ultrasound', 
        duration: '20 mins',
        downtime: 'None',
        effect: 'Immediate',
        sessions: 'Weekly',
        recommended: 'Sensitive, dry',
        protocol: "Moisture Balance",
        options: [
          { label: '1 Session', price: '80,000' },
          { label: '10 Sessions Package', price: '700,000' }
        ]
      }
    ]
  },
  {
    id: 'tone',
    title: 'Whitening',
    description: 'Clear and transparent skin',
    items: [
      { 
        id: 'pico',
        name: 'PicoSure Toning', 
        enName: 'PicoSure Toning',
        desc: 'Breaking pigment particles finely with 1000x faster speed than existing lasers', 
        duration: '15 mins',
        downtime: 'Immediate',
        effect: 'Progressive',
        sessions: '10 sessions rec.',
        recommended: 'Blemishes, dullness',
        protocol: "Pico Second Tech",
        options: [
          { label: '1 Trial Session', price: '99,000' },
          { label: '10 Sessions Package', price: '890,000' }
        ]
      }
    ]
  },
  {
    id: 'body',
    title: 'Body Contouring',
    description: 'Balanced body line design',
    items: [
      { 
        id: 'inmode-body',
        name: 'Inmode Body FX', 
        enName: 'Inmode Body FX',
        desc: 'Apoptosis of unnecessary fat cells with RF heat energy and electrical stimulation', 
        duration: '30 mins/area',
        downtime: 'Bruising 3-5 days',
        effect: 'Semi-permanent',
        sessions: '3-5 sessions',
        recommended: 'Abdomen, thigh fat',
        protocol: "Fat Apoptosis",
        options: [
          { label: '1 Area 1 Session', price: '150,000' },
          { label: 'Full Abdomen', price: '300,000' }
        ]
      }
    ]
  },
  {
    id: 'filler',
    title: 'Filler',
    description: 'Volume design reviving 3D',
    items: [
      { 
        id: 'belotero',
        name: 'Belotero (Germany)', 
        enName: 'Belotero',
        desc: 'Premium filler that is natural without foreign body sensation due to excellent skin adhesion', 
        duration: '20 mins',
        downtime: 'Slight swelling',
        effect: '12-18 months',
        sessions: 'Retouch if needed',
        recommended: 'Nasolabial, cheeks',
        protocol: "CPM Technology",
        options: [
          { label: '1cc', price: '350,000' },
          { label: '3cc Package', price: '990,000' }
        ]
      }
    ]
  },
  {
    id: 'iv',
    title: 'IV Therapy',
    description: 'Vitality filling up from within',
    items: [
      { 
        id: 'white',
        name: 'Glutathione IV', 
        enName: 'Glutathione IV',
        desc: 'Inhibiting melanin production and helping liver detoxification with powerful antioxidants', 
        duration: '20-30 mins',
        downtime: 'None',
        effect: 'Tone improvement',
        sessions: '1-2/week',
        recommended: 'Fatigue, whitening',
        protocol: "Antioxidant Boost",
        options: [
          { label: '1 Session', price: '50,000' },
          { label: '10 Sessions Package', price: '450,000' }
        ]
      }
    ]
  },
  {
    id: 'director',
    title: 'Director\'s Choice',
    description: 'ADO Signature, Essence of Craft',
    items: [
      { 
        id: 'sign-lift',
        name: 'ADO Signature Full-Face Lifting', 
        enName: 'Signature Full-Face Lifting',
        desc: 'Representative director 1:1 custom design combining Ulthera + Thermage + Skin Booster', 
        duration: '120 mins',
        downtime: '1-2 days',
        effect: '1 year+',
        sessions: 'Annually',
        recommended: 'Total anti-aging',
        protocol: "Masterpiece Protocol",
        options: [
          { label: 'Signature Standard', price: '3,500,000' },
          { label: 'Signature Premium', price: '5,000,000' }
        ]
      }
    ]
  }
];

export function TreatmentList({ onHighlightBooking }: { onHighlightBooking?: () => void }) {
  const [activeCategory, setActiveCategory] = useState<string>('injection');
  const [selectedItemId, setSelectedItemId] = useState<string>('');
  
  // Find current category and selected item data
  const currentCategoryData = categories.find(c => c.id === activeCategory);
  
  // Update selected item when category changes
  React.useEffect(() => {
    if (currentCategoryData && currentCategoryData.items.length > 0) {
      setSelectedItemId(currentCategoryData.items[0].id);
    }
  }, [activeCategory]);

  const selectedItem = currentCategoryData?.items.find(i => i.id === selectedItemId) || currentCategoryData?.items[0];

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
  };

  return (
    <section className="w-full relative py-24 bg-[#FAFAFA]">
      <div className="max-w-[1600px] mx-auto px-6">
        
        {/* Header Section: Soft Typography */}
        <div className="mb-20 text-center">
           <span className="inline-block px-4 py-1.5 rounded-full border border-[#E7E5E4] bg-white text-[#991B1B] text-[10px] font-bold tracking-[0.2em] uppercase mb-6 shadow-sm">
             Curated Collection
           </span>
           <h2 className="text-4xl md:text-5xl font-serif text-[#1c1917] mb-6">
             Treatment Menu
           </h2>
           <p className="text-[#57534E] text-sm md:text-base font-light tracking-wide max-w-xl mx-auto leading-relaxed">
             Customized solutions for your unique beauty.<br/>
             Completed with the softest and most delicate touch.
           </p>
        </div>

        {/* Category Navigation: Rounded Capsules */}
        <div className="mb-20">
          <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`
                  px-5 py-2.5 text-sm transition-all duration-300 rounded-full border
                  ${activeCategory === cat.id 
                    ? 'bg-[#1c1917] text-white border-[#1c1917] shadow-md' 
                    : 'bg-white text-[#A8A29E] border-transparent hover:border-[#E7E5E4] hover:text-[#57534E]'
                  }
                `}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area: Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left: Treatment List (Editorial Magazine Style) */}
          <div className="lg:col-span-5 flex flex-col pt-4 relative min-h-[600px] justify-between">
            <div>
              <div className="mb-12 relative pl-2">
                 <span className="text-[10px] font-bold tracking-[0.3em] text-[#991B1B] uppercase mb-3 block">Category</span>
                 <h3 className="text-4xl font-serif text-[#1c1917] mb-6 tracking-tight">{currentCategoryData?.title}</h3>
                 <p className="text-sm text-[#78716C] font-light leading-loose max-w-xs border-l border-[#1c1917] pl-4">
                   {currentCategoryData?.description}
                 </p>
              </div>
              
              <div className="flex flex-col gap-2">
                {currentCategoryData?.items.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedItemId(item.id)}
                    className={`
                      w-full group text-left py-5 transition-all duration-500 border-b border-[#E7E5E4] last:border-0 relative
                      ${selectedItemId === item.id ? 'pl-8 opacity-100' : 'pl-0 hover:pl-4 opacity-50 hover:opacity-100'}
                    `}
                  >
                    {/* Minimal Line Indicator */}
                    <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-[1.5px] bg-[#1c1917] transition-all duration-500 ease-out ${
                      selectedItemId === item.id ? 'h-4 opacity-100' : 'h-0 opacity-0'
                    }`} />
  
                    <div className="flex justify-between items-center">
                      <h4 className={`text-xl font-serif transition-colors duration-300 ${
                          selectedItemId === item.id ? 'text-[#1c1917]' : 'text-[#57534E]'
                        }`}>
                        {item.name}
                      </h4>
                      <span className={`text-[9px] tracking-[0.2em] uppercase transition-colors duration-300 ${
                         selectedItemId === item.id ? 'text-[#1c1917]' : 'text-[#A8A29E]'
                      }`}>
                        {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Editorial Footer Element (Dynamic Index) */}
            <div className="hidden lg:block absolute bottom-0 left-0 opacity-[0.08] pointer-events-none select-none transition-all duration-700">
               <span className="text-[180px] font-serif leading-none text-[#1c1917]">
                 {currentCategoryData?.items.findIndex(item => item.id === selectedItemId) !== -1 
                    ? String(currentCategoryData.items.findIndex(item => item.id === selectedItemId) + 1).padStart(2, '0')
                    : '01'}
               </span>
            </div>
          </div>

          {/* Right: Sticky Details Panel (Architectural Layout) */}
          <div className="lg:col-span-7 lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              {selectedItem && (
                <motion.div
                  key={selectedItem.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative h-full"
                >
                  <div className="
                    bg-white
                    border border-[#F5F5F4]
                    rounded-[2rem] 
                    shadow-[0_40px_100px_-30px_rgba(0,0,0,0.08)]
                    overflow-hidden
                  ">
                    
                    {/* Header Area */}
                    <div className="p-10 md:p-14 pb-8">
                      <div className="flex flex-col gap-6 mb-8">
                         <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold tracking-[0.25em] text-[#991B1B] uppercase">
                              Signature Program
                            </span>
                            <span className="text-xs font-serif italic text-[#A8A29E]">
                              {selectedItem.enName}
                            </span>
                         </div>
                         <h3 className="text-3xl md:text-4xl font-serif text-[#1c1917] tracking-tight leading-none">
                           {selectedItem.name}
                         </h3>
                      </div>
                      
                      <p className="text-[#57534E] leading-loose font-light text-base md:text-lg max-w-2xl">
                        {selectedItem.desc}
                      </p>
                    </div>

                    {/* Specs Section - Responsive Grid (Fixing Cut-off) */}
                    <div className="px-10 md:px-14 py-12 border-t border-[#F5F5F4] border-b border-[#F5F5F4] bg-[#FAFAFA]/30">
                       <div className="grid grid-cols-2 xl:grid-cols-4 gap-y-12 gap-x-8">
                         {/* Duration */}
                         <div className="flex flex-col items-start gap-2 group">
                            <span className="text-[9px] tracking-[0.25em] uppercase text-[#A8A29E] font-bold">Duration</span>
                            <span className="text-2xl md:text-3xl font-serif italic text-[#1c1917] whitespace-nowrap">
                              {selectedItem.duration}
                            </span>
                         </div>

                         {/* Downtime */}
                         <div className="flex flex-col items-start gap-2 group xl:border-l xl:border-[#E7E5E4] xl:pl-8">
                            <span className="text-[9px] tracking-[0.25em] uppercase text-[#A8A29E] font-bold">Downtime</span>
                            <span className="text-2xl md:text-3xl font-serif italic text-[#1c1917] whitespace-nowrap">
                              {selectedItem.downtime}
                            </span>
                         </div>

                         {/* Effect */}
                         <div className="flex flex-col items-start gap-2 group xl:border-l xl:border-[#E7E5E4] xl:pl-8">
                            <span className="text-[9px] tracking-[0.25em] uppercase text-[#A8A29E] font-bold">Effect</span>
                            <span className="text-2xl md:text-3xl font-serif italic text-[#1c1917] whitespace-nowrap">
                              {selectedItem.effect}
                            </span>
                         </div>

                         {/* Cycle */}
                         <div className="flex flex-col items-start gap-2 group xl:border-l xl:border-[#E7E5E4] xl:pl-8">
                            <span className="text-[9px] tracking-[0.25em] uppercase text-[#A8A29E] font-bold">Cycle</span>
                            <span className="text-2xl md:text-3xl font-serif italic text-[#1c1917] whitespace-nowrap">
                              {selectedItem.sessions.split(' ')[0]}
                            </span>
                         </div>
                       </div>
                    </div>

                    {/* Pricing & Actions */}
                    <div className="p-10 md:p-14 bg-white">
                          <div className="space-y-5 mb-10">
                            {selectedItem.options?.map((opt, idx) => (
                              <div key={idx} className="flex justify-between items-end border-b border-[#F5F5F4] pb-4 last:border-0 group cursor-default">
                                 <span className="text-base font-medium text-[#44403C] group-hover:text-[#1c1917] transition-colors">{opt.label}</span>
                                 <div className="flex items-baseline gap-1.5">
                                    <span className="text-2xl font-serif text-[#1c1917]">{opt.price}</span>
                                    <span className="text-[10px] text-[#A8A29E] font-bold tracking-widest">KRW</span>
                                 </div>
                              </div>
                            ))}
                          </div>

                          <div className="flex gap-4">
                            <button 
                              onClick={onHighlightBooking}
                              className="flex-1 bg-[#1c1917] text-white py-6 px-8 rounded-full text-xs font-bold tracking-[0.2em] hover:bg-[#44403C] transition-all shadow-xl hover:shadow-2xl uppercase"
                            >
                              Consultation Booking
                            </button>
                            
                            <Dialog>
                              <DialogTrigger asChild>
                                <button className="aspect-square h-auto px-8 border border-[#E7E5E4] text-[#1c1917] rounded-full hover:bg-[#1c1917] hover:text-white hover:border-[#1c1917] transition-all flex items-center justify-center duration-300">
                                  <ArrowRight className="w-5 h-5" />
                                </button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl bg-white p-0 overflow-hidden rounded-[2rem] border-none shadow-2xl">
                                 <div className="relative p-12 md:p-16">
                                    <div className="text-center mb-16">
                                       <span className="text-[#991B1B] text-[10px] tracking-[0.3em] uppercase block mb-4">The Ritual</span>
                                       <h3 className="text-3xl font-serif text-[#1c1917]">Treatment Process</h3>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                                       <div className="hidden md:block absolute top-4 left-0 w-full h-[1px] bg-[#F5F5F4] -z-10" />
                                       {processSteps.map((step, idx) => (
                                          <div key={idx} className="text-center group">
                                             <div className="w-9 h-9 mx-auto bg-[#1c1917] text-white text-sm font-serif italic flex items-center justify-center rounded-full mb-6 relative z-10 shadow-lg border-4 border-white">
                                                {step.step}
                                             </div>
                                             <h4 className="text-lg font-serif mb-2">{step.title}</h4>
                                             <p className="text-xs text-[#A8A29E] font-medium uppercase tracking-wider mb-4">{step.korTitle}</p>
                                             <p className="text-xs text-[#78716C] leading-relaxed font-light">
                                               {step.desc}
                                             </p>
                                          </div>
                                       ))}
                                    </div>
                                 </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
