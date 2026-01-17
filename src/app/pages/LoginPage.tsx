import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

export function LoginPage() {
  const memberBenefits = [
    {
      title: 'Treatment History Management',
      desc: 'View Mark-Vu diagnosis results and treatment records'
    },
    {
      title: 'Personalized Home Care',
      desc: 'Providing routines based on individual skin analysis'
    },
    {
      title: 'Priority Booking Benefits',
      desc: 'Member-exclusive events and priority booking for new procedures'
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#Fdfbf9] flex items-center justify-center relative overflow-hidden py-12 px-6">
      
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#5E7A70] rounded-full filter blur-[120px] opacity-10"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#738F86] rounded-full filter blur-[120px] opacity-10"></div>
      </div>

      <div className="w-full max-w-[1400px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-[40px] shadow-[0_20px_80px_rgba(0,0,0,0.08)] overflow-hidden">
          
          {/* LEFT: Gallery Concept with Benefits */}
          <div className="relative bg-[#1A1A1A] text-white p-12 md:p-16 flex flex-col justify-between min-h-[600px] lg:min-h-[700px]">
            
            {/* Background Image */}
            <div className="absolute inset-0 opacity-20">
              <img 
                src="https://images.unsplash.com/photo-1679834841135-b73991e3941d?q=80&w=1200&auto=format&fit=crop"
                alt="Gallery Background"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] via-[#1A1A1A]/80 to-transparent"></div>
            </div>

            <div className="relative z-10">
              {/* Gallery Object Caption */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-16"
              >
                <span className="text-xs tracking-[0.3em] text-[#738F86] uppercase font-bold mb-6 block">
                  Object 07 : Members Only
                </span>
                <h1 className="text-5xl md:text-6xl font-serif mb-6 leading-tight">
                  Exclusive<br/>
                  Access
                </h1>
                <div className="w-16 h-[1px] bg-white/30"></div>
              </motion.div>

              {/* Member Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-serif mb-8 text-white/90">Member Exclusive Benefits</h3>
                {memberBenefits.map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#5E7A70]/20 flex items-center justify-center shrink-0 group-hover:bg-[#5E7A70] transition-colors duration-300">
                      <CheckCircle2 className="w-5 h-5 text-[#5E7A70] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold mb-1">{benefit.title}</h4>
                      <p className="text-sm text-white/60 font-light leading-relaxed">{benefit.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Bottom Quote */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative z-10 border-t border-white/10 pt-8"
            >
              <p className="text-sm text-white/50 font-light italic">
                "Precise diagnosis and systematic management,<br/>
                Premium service just for you"
              </p>
            </motion.div>
          </div>

          {/* RIGHT: Premium Login Form */}
          <div className="p-12 md:p-16 flex flex-col justify-center bg-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="mb-12">
                <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-4">Login</h2>
                <p className="text-[#8C8C8C] text-sm tracking-wider uppercase font-medium">Welcome to ADO</p>
              </div>

              <form className="space-y-8">
                <div className="space-y-3">
                  <label className="block text-xs font-bold tracking-widest text-[#5E7A70] uppercase">Email</label>
                  <input 
                    type="email" 
                    className="w-full bg-transparent border-b border-[#E5E5E5] py-3 text-[#1A1A1A] placeholder-[#D6D3D1] focus:outline-none focus:border-[#1A1A1A] transition-colors text-base"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div className="space-y-3">
                  <label className="block text-xs font-bold tracking-widest text-[#5E7A70] uppercase">Password</label>
                  <input 
                    type="password" 
                    className="w-full bg-transparent border-b border-[#E5E5E5] py-3 text-[#1A1A1A] placeholder-[#D6D3D1] focus:outline-none focus:border-[#1A1A1A] transition-colors text-base"
                    placeholder="Enter your password"
                  />
                </div>

                <button className="w-full bg-[#1A1A1A] text-white py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#5E7A70] transition-colors rounded-full mt-10">
                  Sign In
                </button>
              </form>
              
              {/* Social Login */}
              <div className="mt-10">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-[#E5E5E5]" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-4 text-[#8C8C8C] tracking-widest font-medium">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  <button className="flex items-center justify-center py-4 bg-[#FAE100] hover:bg-[#F2D900] transition-colors rounded-2xl group">
                    <span className="text-[#3C1E1E] text-xs font-bold tracking-wider">KAKAO</span>
                  </button>
                  <button className="flex items-center justify-center py-4 bg-[#03C75A] hover:bg-[#02B351] transition-colors rounded-2xl group">
                    <span className="text-white text-xs font-bold tracking-wider">NAVER</span>
                  </button>
                </div>
              </div>

              {/* Footer Links */}
              <div className="mt-10 pt-8 border-t border-[#E5E5E5] space-y-4">
                <a href="#" className="block text-center text-xs text-[#8C8C8C] hover:text-[#1A1A1A] underline underline-offset-4 transition-colors">
                  Forgot Password?
                </a>
                <div className="flex items-center justify-center gap-4 text-xs text-[#8C8C8C]">
                  <span>Don't have an account?</span>
                  <a href="#" className="text-[#1A1A1A] font-bold hover:text-[#5E7A70] transition-colors tracking-wider">
                    JOIN US
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Gallery Caption Below */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-[#1A1A1A] mb-2">
            Object 08 : Members Portal
          </p>
          <p className="text-[#8C8C8C] font-serif italic text-lg">
            "The Beginning of a Premium Experience"
          </p>
        </motion.div>
      </div>
    </div>
  );
}
