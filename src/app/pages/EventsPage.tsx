import React from 'react';
import { Promotions } from '../components/Promotions';
import { NewsHero } from '../components/NewsHero';
import { motion } from 'motion/react';
import { Play, ExternalLink, Youtube } from 'lucide-react';

interface EventsPageProps {
  onHighlightBooking?: () => void;
}

export function EventsPage({ onHighlightBooking }: EventsPageProps) {
  const youtubeContent = [
    {
      thumbnail: 'https://images.unsplash.com/photo-1748407408885-9b62df0e2527?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXJtYXRvbG9neSUyMGxhc2VyJTIwdHJlYXRtZW50JTIwY2xvc2UlMjB1cHxlbnwxfHx8fDE3NjgzMDA5MzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: '피부과 전문의가 말하는',
      subtitle: '안티에이징의 과학',
      duration: '15:42',
      views: '24K',
      category: 'Interview',
      videoId: 'dQw4w9WgXcQ' // 예시
    },
    {
      thumbnail: 'https://images.unsplash.com/photo-1722350766824-f8520e9676ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNpYWwlMjBsaWZ0aW5nJTIwdHJlYXRtZW50fGVufDF8fHx8MTc2ODIwMzA5Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: '리프팅 시술 전후',
      subtitle: '실제 고객 인터뷰',
      duration: '12:30',
      views: '18K',
      category: 'Testimonial',
      videoId: 'dQw4w9WgXcQ'
    },
    {
      thumbnail: 'https://images.unsplash.com/photo-1584800526920-35d8a0409deb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZGVybWF0b2xvZ3klMjBjb25mZXJlbmNlJTIwc2tpbiUyMHNjaWVuY2V8ZW58MXx8fHwxNzY4MzAwOTM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'IMCAS Paris 2025',
      subtitle: '초청 연사 발표 현장',
      duration: '8:15',
      views: '32K',
      category: 'Conference',
      videoId: 'dQw4w9WgXcQ'
    },
    {
      thumbnail: 'https://images.unsplash.com/photo-1614159102369-effd79eadadd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHJvdXRpbmUlMjBiZWF1dHl8ZW58MXx8fHwxNzY4MjAzMDk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: '홈케어 완벽 가이드',
      subtitle: '피부 타입별 맞춤 케어',
      duration: '20:05',
      views: '15K',
      category: 'Education',
      videoId: 'dQw4w9WgXcQ'
    },
    {
      thumbnail: 'https://images.unsplash.com/photo-1620423855978-e5d74a7bef30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXN0aGV0aWMlMjBtZWRpY2luZSUyMHRlY2hub2xvZ3klMjBkZXZpY2V8ZW58MXx8fHwxNzY4MzAwOTQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: '글로벌 트렌드',
      subtitle: '2025 미용의학 전망',
      duration: '18:22',
      views: '28K',
      category: 'Insights',
      videoId: 'dQw4w9WgXcQ'
    },
    {
      thumbnail: 'https://images.unsplash.com/photo-1735448213858-6bdfdf78967a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBkZXJtYXRvbG9neSUyMGNsaW5pYyUyMGludGVyaW9yJTIwbW9kZXJuJTIwd2hpdGV8ZW58MXx8fHwxNzY4MzAwOTM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'ADO 클리닉 투어',
      subtitle: '프리미엄 시설 소개',
      duration: '6:48',
      views: '42K',
      category: 'Tour',
      videoId: 'dQw4w9WgXcQ'
    },
  ];

  return (
    <div className="w-full bg-white">
      {/* News Hero Section */}
      <NewsHero onHighlightBooking={onHighlightBooking} />
      
      <div id="events-content" className="relative z-10 shadow-[0_-50px_100px_rgba(28,25,23,0.05)]">
        <Promotions />
        
        {/* Academic Excellence Section */}
        <section className="w-full bg-white py-32 md:py-40 px-6">
          <div className="max-w-[1600px] mx-auto">
            
            {/* Header */}
            <div className="mb-20 text-center">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xs tracking-[0.3em] text-[#5E7A70] uppercase font-bold mb-4 block"
              >
                Academic Excellence
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-serif text-[#1A1A1A] mb-6"
              >
                시술, 그 이상의 가치
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-[#666] text-lg font-light max-w-2xl mx-auto"
              >
                끊임없는 연구와 교육을 통해<br/>
                미용 의학의 새로운 기준을 제시합니다.
              </motion.p>
            </div>

            {/* YouTube Content Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
              {youtubeContent.map((video, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  className="group cursor-pointer"
                >
                  {/* Video Thumbnail Container */}
                  <div className="relative aspect-video rounded-3xl overflow-hidden mb-4 bg-[#1A1A1A]">
                    {/* Thumbnail Image */}
                    <img 
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                    
                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-2xl">
                        <Play className="w-7 h-7 text-[#1A1A1A] ml-1" fill="currentColor" />
                      </div>
                    </div>
                    
                    {/* Duration Badge */}
                    <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-2 py-1 rounded text-xs text-white font-semibold">
                      {video.duration}
                    </div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-[#1A1A1A] font-bold tracking-wider uppercase">
                      {video.category}
                    </div>
                  </div>
                  
                  {/* Video Info */}
                  <div className="px-2">
                    <h3 className="text-xl md:text-2xl font-serif text-[#1A1A1A] mb-1 group-hover:text-[#5E7A70] transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-sm text-[#666] font-light mb-2">
                      {video.subtitle}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-[#8C8C8C]">
                      <Youtube className="w-4 h-4" />
                      <span>{video.views} views</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Gallery Caption */}
            <div className="mt-24 text-center">
              <p className="text-xs tracking-[0.3em] uppercase text-[#1A1A1A] mb-2">Object 07 : Academic Journey</p>
              <p className="text-[#8C8C8C] font-serif italic text-lg">"끊임없는 연구와 교육"</p>
            </div>

          </div>
        </section>
      </div>
    </div>
  );
}