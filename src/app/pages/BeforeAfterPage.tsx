import React from 'react';
import { BeforeAfter } from '../components/BeforeAfter';
import { TransformationHero } from '../components/TransformationHero';

interface BeforeAfterPageProps {
  onHighlightBooking?: () => void;
}

export function BeforeAfterPage({ onHighlightBooking }: BeforeAfterPageProps) {
  return (
    <div className="w-full">
      {/* Transformation Hero Section */}
      <TransformationHero onHighlightBooking={onHighlightBooking} />
      
      {/* Before/After Section */}
      <BeforeAfter />

      {/* Medical Disclaimer Section */}
      <section className="w-full bg-white py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="border border-black/5 rounded-[32px] p-12 md:p-16 bg-[#F9F9F9]">
            <h3 className="text-2xl md:text-3xl font-serif text-[#1A1A1A] mb-8 text-center">
              Important Notice
            </h3>
            
            <div className="space-y-6 text-[#4A4A4A] text-sm md:text-base leading-relaxed">
              <div className="flex items-start gap-4">
                <span className="text-[#2D7A7C] font-bold text-xs mt-1 min-w-[24px]">01</span>
                <p>
                  <span className="text-[#1A1A1A] font-semibold">시술 전 의료진 상담 필수:</span> 
                  {" "}모든 시술은 반드시 대표원장과의 1:1 상담 후 개인별 피부 상태, 골격 구조, 생활 패턴을 종합적으로 분석하여 진행됩니다.
                </p>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-[#2D7A7C] font-bold text-xs mt-1 min-w-[24px]">02</span>
                <p>
                  <span className="text-[#1A1A1A] font-semibold">개인차에 따른 결과 차이:</span> 
                  {" "}시술 결과는 개인의 피부 타입, 나이, 생활 습관, 관리 상태에 따라 다를 수 있으며, 사진은 실제 시술 사례이나 모든 환자에게 동일한 결과를 보장하지 않습니다.
                </p>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-[#2D7A7C] font-bold text-xs mt-1 min-w-[24px]">03</span>
                <p>
                  <span className="text-[#1A1A1A] font-semibold">부작용 가능성 고지:</span> 
                  {" "}시술 부위의 일시적인 붓기, 멍, 발적 등이 나타날 수 있으며, 드물게 감염, 색소침착 등의 부작용이 발생할 수 있습니다. 시술 전 충분한 설명을 드립니다.
                </p>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-[#2D7A7C] font-bold text-xs mt-1 min-w-[24px]">04</span>
                <p>
                  <span className="text-[#1A1A1A] font-semibold">의료법 준수:</span> 
                  {" "}본 웹사이트의 모든 Before/After 사진은 의료법에 따라 환자 동의 하에 촬영되었으며, 과장 또는 허위 광고를 하지 않습니다.
                </p>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-black/10 text-center">
              <p className="text-xs text-[#8C8C8C] tracking-wider">
                ADO Clinic은 정확한 진단과 안전한 시술을 최우선으로 합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Caption */}
      <section className="w-full bg-white py-16 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-[#1A1A1A] mb-2">
          Object 04 : Transformation Archive
        </p>
        <p className="text-[#8C8C8C] font-serif italic text-lg">
          "변화의 기록, 정확한 판단의 결과"
        </p>
      </section>
    </div>
  );
}