import React from 'react';
import { motion } from 'motion/react';

const principles = [
  {
    title: "Anti-aging",
    desc: "시간을 되돌리는 것이 아닌, 나이듦의 품격을 높입니다.",
    delay: 0
  },
  {
    title: "Texture & Tone",
    desc: "인위적인 광채가 아닌, 본연의 건강한 결을 찾습니다.",
    delay: 0.1
  },
  {
    title: "Balance",
    desc: "특정 부위의 변화가 아닌, 전체적인 조화를 설계합니다.",
    delay: 0.2
  },
  {
    title: "Recovery",
    desc: "빠른 효과보다 중요한 것은 안전한 회복과 지속성입니다.",
    delay: 0.3
  }
];

export function Principles() {
  return (
    <section className="py-32 bg-[#F9F9F7] text-[#333]">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header Text */}
        <div className="mb-24 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-serif leading-tight mb-6">
            우리는 더 많이 바꾸기보다<br/>
            <span className="text-[#4E8C82]">정확히 개입</span>합니다.
          </h2>
          <p className="text-gray-500 font-light text-lg">
            유행을 좇는 시술이 아닌, 당신만의 고유한 기준을 세웁니다.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
          {principles.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: item.delay, ease: "easeOut" }}
              className="group border-t border-black/10 pt-8"
            >
              <h3 className="text-xl font-medium mb-4 group-hover:text-[#4E8C82] transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed font-light">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
