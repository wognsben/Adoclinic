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
  { step: "01", title: "Diagnosis", korTitle: "본질의 발견", desc: "Mark-Vu 정밀 진단을 통해 피부 깊은 곳의 문제와 가능성을 동시에 탐색합니다." },
  { step: "02", title: "Design", korTitle: "미학적 설계", desc: "단순한 시술이 아닌, 얼굴의 골격과 피부결을 고려한 ADO만의 화룡점정 포인트를 설계합니다." },
  { step: "03", title: "Procedure", korTitle: "정교한 시술", desc: "대표원장의 집도 하에, 최소한의 개입으로 최대한의 변화를 이끌어냅니다." },
  { step: "04", title: "Maintenance", korTitle: "지속의 미학", desc: "시술 직후의 아름다움이 일상에서도 지속되도록 체계적인 애프터 케어를 제공합니다." }
];

// Enhanced Data Structure with Full Categories
const categories = [
  {
    id: 'event',
    title: '오픈 런칭 이벤트',
    description: 'ADO Clinic의 시작을 함께하는 특별한 혜택',
    items: [
      { 
        id: 'ev-1',
        name: '오픈 기념 풀페이스 패키지', 
        enName: 'Grand Opening Package',
        desc: '리프팅과 스킨부스터를 한 번에 경험하는 토탈 솔루션', 
        duration: '90분',
        downtime: '1-2일',
        effect: '즉각적',
        sessions: '1회 한정',
        recommended: '첫 방문 고객',
        protocol: "Signature Welcome Protocol",
        options: [
          { label: '풀페이스 토탈 케어 (50% OFF)', price: '990,000' }
        ]
      }
    ]
  },
  {
    id: 'stem',
    title: '줄기세포',
    description: '재생 의학의 정점, 근원적인 안티에이징',
    items: [
      { 
        id: 'stem-1',
        name: 'SC-Max 줄기세포 테라피', 
        enName: 'Stem Cell Therapy',
        desc: '고농축 줄기세포 배양액을 진피층 깊숙이 전달하여 세포 재생 유도', 
        duration: '60분',
        downtime: '당일 복귀',
        effect: '6-12개월',
        sessions: '3회 권장',
        recommended: '노화 피부, 흉터',
        protocol: "Cellular Regeneration",
        options: [
          { label: '1회 시술', price: '1,500,000' },
          { label: '3회 패키지', price: '4,000,000' }
        ]
      }
    ]
  },
  {
    id: 'injection',
    title: '보톡스/윤곽주사',
    description: '자연스러운 라인을 위한 정교한 터치',
    items: [
      { 
        id: 'botox-1',
        name: '코어톡스 (내성없는 보톡스)', 
        enName: 'Coretox',
        desc: '복합 단백질을 제거하여 내성 걱정 없이 안전한 주름 개선', 
        duration: '10분',
        downtime: '즉시 복귀',
        effect: '3-6개월',
        sessions: '4-6개월 간격',
        recommended: '표정 주름',
        protocol: "Precision Targeting",
        options: [
          { label: '이마/미간/눈가 (택1)', price: '79,000' },
          { label: '턱 보톡스 (50u)', price: '120,000' }
        ]
      },
      { 
        id: 'face-1',
        name: 'ADO 캣주사 (윤곽)', 
        enName: 'Contour Injection',
        desc: '불필요한 지방을 분해하고 림프 순환을 촉진하여 날렵한 라인 완성', 
        duration: '15분',
        downtime: '즉시 복귀',
        effect: '반영구적',
        sessions: '3회 권장',
        recommended: '이중턱, 심부볼',
        protocol: "Fat Lysis System",
        options: [
          { label: '1회 (10cc)', price: '99,000' },
          { label: '3회 패키지', price: '270,000' }
        ]
      }
    ]
  },
  {
    id: 'lifting',
    title: '탄력/리프팅',
    description: '중력을 거스르는 탄력의 과학',
    items: [
      { 
        id: 'sof',
        name: '소프웨이브', 
        enName: 'Sofwave™',
        desc: '비수술적 리프팅의 새로운 기준, 진피 상부층 집중 타겟팅', 
        duration: '45-60분',
        downtime: '당일 복귀',
        effect: '12-18개월',
        sessions: '1회 또는 6개월 후 재시술',
        recommended: '30-60대, 잔주름 개선',
        protocol: "ADO 3-Layer Lifting Protocol™",
        options: [
          { label: '풀페이스 (200 Shot)', price: '2,200,000' },
          { label: '풀페이스 + 넥 (300 Shot)', price: '3,000,000' }
        ]
      },
      { 
        id: 'ulthera',
        name: '울쎄라', 
        enName: 'Ultherapy',
        desc: '초음파 에너지를 이용해 근막층(SMAS)부터 끌어올리는 강력한 리프팅', 
        duration: '60-90분',
        downtime: '당일 복귀 가능',
        effect: '12-24개월',
        sessions: '1회 또는 12개월 후',
        recommended: '40-60대, 심한 처짐',
        protocol: "SMAS Targeting System",
        options: [
          { label: '300 Shot', price: '1,500,000' },
          { label: '400 Shot (Standard)', price: '1,900,000' },
          { label: '600 Shot (Premium)', price: '2,700,000' }
        ]
      },
      { 
        id: 'titanium',
        name: '티타늄 리프팅', 
        enName: 'Titanium Lifting',
        desc: '세 가지 파장을 동시에 조사하여 즉각적인 브라이트닝과 타이트닝 효과', 
        duration: '30-40분',
        downtime: '즉시 복귀',
        effect: '6-9개월',
        sessions: '3회 패키지 권장',
        recommended: '20-40대, 피부 결 개선',
        protocol: "Instant Brightening Protocol",
        options: [
          { label: '1회 시술', price: '990,000' },
          { label: '3회 패키지', price: '2,700,000' }
        ]
      }
    ]
  },
  {
    id: 'hair-w',
    title: '여성 레이저 제모',
    description: '매끄러운 피부를 위한 프리미엄 제모',
    items: [
      { 
        id: 'hw-1',
        name: '아포지 엘리트 플러스', 
        enName: 'Apogee Elite Plus',
        desc: '비접촉식 공중타격 방식으로 위생적이고 통증이 적은 프리미엄 제모', 
        duration: '10-30분',
        downtime: '즉시 복귀',
        effect: '반영구적',
        sessions: '5-10회',
        recommended: '모든 여성',
        protocol: "Air-Cooling System",
        options: [
          { label: '겨드랑이 5회', price: '50,000' },
          { label: '종아리 5회', price: '250,000' }
        ]
      }
    ]
  },
  {
    id: 'hair-m',
    title: '남성 레이저 제모',
    description: '깔끔한 인상을 완성하는 남성 전용 제모',
    items: [
      { 
        id: 'hm-1',
        name: '젠틀맥스 프로 플러스', 
        enName: 'GentleMax Pro Plus',
        desc: '굵고 깊은 남성 털에 최적화된 강력한 듀얼 파장 레이저', 
        duration: '20분',
        downtime: '약간의 붉은기',
        effect: '반영구적',
        sessions: '5-10회',
        recommended: '매일 면도가 번거로운 남성',
        protocol: "Dual Wavelength",
        options: [
          { label: '인중+턱수염 5회', price: '350,000' },
          { label: '얼굴 전체 5회', price: '550,000' }
        ]
      }
    ]
  },
  {
    id: 'skin',
    title: '콜라겐/스킨부스터',
    description: '피부 본연의 빛을 깨우는 에너지',
    items: [
      { 
        id: 'rejuran',
        name: '리쥬란 힐러', 
        enName: 'Rejuran Healer',
        desc: 'PN 성분으로 손상된 피부 내부의 생리적 조건을 개선하여 건강한 피부로', 
        duration: '30분',
        downtime: '2-3일 미세 붓기',
        effect: '6-12개월',
        sessions: '4주 간격 3-4회',
        recommended: '전 연령, 피부 재생',
        protocol: "Dermal Regeneration System",
        options: [
          { label: '2cc (눈가/나비존)', price: '350,000' },
          { label: '4cc (풀페이스)', price: '650,000' }
        ]
      },
      { 
        id: 'juve-v',
        name: '쥬베룩 볼륨', 
        enName: 'Juvelook Volume',
        desc: '자가 콜라겐 생성을 유도하여 자연스러운 볼륨감을 형성', 
        duration: '45분',
        downtime: '1-2일',
        effect: '12-18개월',
        sessions: '3회 패키지',
        recommended: '볼륨 부족, 패인 흉터',
        protocol: "Volume Matrix",
        options: [
          { label: '1병 (6cc)', price: '600,000' },
          { label: '3회 패키지', price: '1,500,000' }
        ]
      },
    ]
  },
  {
    id: 'pore',
    title: '모공/여드름/스킨케어',
    description: '깨끗하고 매끄러운 피부결 완성',
    items: [
      { 
        id: 'secret',
        name: '시크릿 RF', 
        enName: 'Secret RF',
        desc: '미세 바늘 고주파로 모공 축소와 흉터 개선을 동시에', 
        duration: '40분',
        downtime: '1-2일 붉은기',
        effect: '지속적 개선',
        sessions: '3-5회',
        recommended: '넓은 모공, 여드름 흉터',
        protocol: "Fractional RF",
        options: [
          { label: '나비존 집중 케어', price: '200,000' },
          { label: '풀페이스', price: '350,000' }
        ]
      },
      { 
        id: 'ldm',
        name: 'LDM 물방울 리프팅', 
        enName: 'LDM Triple',
        desc: '고밀도 초음파로 피부 속 수분을 끌어올려 트러블 진정', 
        duration: '20분',
        downtime: '없음',
        effect: '즉각적 진정',
        sessions: '주 1회',
        recommended: '예민한 피부, 건조함',
        protocol: "Moisture Balance",
        options: [
          { label: '1회 관리', price: '80,000' },
          { label: '10회 패키지', price: '700,000' }
        ]
      }
    ]
  },
  {
    id: 'tone',
    title: '기미/미백/홍조',
    description: '티 없이 맑고 투명한 피부',
    items: [
      { 
        id: 'pico',
        name: '피코 슈어 토닝', 
        enName: 'PicoSure Toning',
        desc: '기존 레이저보다 1000배 빠른 조사 속도로 색소 입자를 잘게 파괴', 
        duration: '15분',
        downtime: '즉시 복귀',
        effect: '점진적 개선',
        sessions: '10회 권장',
        recommended: '기미, 잡티, 칙칙함',
        protocol: "Pico Second Tech",
        options: [
          { label: '1회 체험', price: '99,000' },
          { label: '10회 패키지', price: '890,000' }
        ]
      }
    ]
  },
  {
    id: 'body',
    title: '바디/체형관리',
    description: '균형 잡힌 바디 라인 디자인',
    items: [
      { 
        id: 'inmode-body',
        name: '인모드 바디 FX', 
        enName: 'Inmode Body FX',
        desc: '고주파 열에너지와 전기자극으로 불필요한 지방 세포 사멸', 
        duration: '30분/부위',
        downtime: '멍 3-5일',
        effect: '반영구적',
        sessions: '3-5회',
        recommended: '복부, 허벅지 지방',
        protocol: "Fat Apoptosis",
        options: [
          { label: '1부위 1회', price: '150,000' },
          { label: '복부 전체', price: '300,000' }
        ]
      }
    ]
  },
  {
    id: 'filler',
    title: '필러',
    description: '입체감을 살려주는 볼륨 디자인',
    items: [
      { 
        id: 'belotero',
        name: '벨로테로 (독일산)', 
        enName: 'Belotero',
        desc: '피부 밀착력이 우수하여 이물감 없이 자연스러운 프리미엄 필러', 
        duration: '20분',
        downtime: '약간의 붓기',
        effect: '12-18개월',
        sessions: '필요 시 리터치',
        recommended: '팔자주름, 앞볼',
        protocol: "CPM Technology",
        options: [
          { label: '1cc', price: '350,000' },
          { label: '3cc 패키지', price: '990,000' }
        ]
      }
    ]
  },
  {
    id: 'iv',
    title: '영양주사',
    description: '내면에서 차오르는 활력',
    items: [
      { 
        id: 'white',
        name: '백옥주사 (글루타치온)', 
        enName: 'Glutathione IV',
        desc: '강력한 항산화 성분으로 멜라닌 생성을 억제하고 간 해독 도움', 
        duration: '20-30분',
        downtime: '없음',
        effect: '피부 톤 개선',
        sessions: '주 1-2회',
        recommended: '피로 회복, 미백',
        protocol: "Antioxidant Boost",
        options: [
          { label: '1회', price: '50,000' },
          { label: '10회 패키지', price: '450,000' }
        ]
      }
    ]
  },
  {
    id: 'director',
    title: '대표원장 시술',
    description: 'ADO Clinic만의 시그니처, 장인 정신의 정수',
    items: [
      { 
        id: 'sign-lift',
        name: 'ADO 시그니처 풀페이스 리프팅', 
        enName: 'Signature Full-Face Lifting',
        desc: '울쎄라 + 써마지 + 스킨부스터를 결합한 대표원장 1:1 맞춤 설계', 
        duration: '120분',
        downtime: '1-2일',
        effect: '1년 이상',
        sessions: '연 1회',
        recommended: '토탈 안티에이징',
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
             당신의 고유한 아름다움을 위한 맞춤형 솔루션.<br/>
             가장 부드럽고 섬세한 터치로 완성합니다.
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
