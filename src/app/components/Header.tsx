import React, { useState, useEffect } from "react";
import { Menu, X, Globe, ChevronRight } from "lucide-react";
import { Link } from "react-scroll";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", to: "about" },
    { name: "Philosophy", to: "philosophy" },
    { name: "Gallery", to: "interior" },
    { name: "Contact", to: "location" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md py-4 border-[#E5E5E5] shadow-sm"
          : "bg-transparent py-6 border-transparent"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo - Typography based for stability in deployment */}
        <a href="/" className="flex items-center gap-2 group cursor-pointer">
           <div className="w-8 h-8 bg-[#1A1A1A] flex items-center justify-center rounded-sm">
              <span className="text-white font-serif font-bold text-lg">A</span>
           </div>
           <span className="font-serif text-xl md:text-2xl font-bold tracking-[0.15em] text-[#1A1A1A]">
             ADO CLINIC
           </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              smooth={true}
              duration={500}
              className="text-sm font-medium tracking-wide text-[#333] hover:text-[#5F9EA0] transition-colors cursor-pointer uppercase"
            >
              {link.name}
            </Link>
          ))}
          
          <button className="flex items-center gap-2 px-5 py-2 border border-[#1A1A1A] rounded-full hover:bg-[#1A1A1A] hover:text-white transition-all duration-300 text-xs font-bold uppercase tracking-widest group">
            <Globe className="w-3 h-3" />
            <span>KR</span>
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#1A1A1A]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-t border-[#E5E5E5] py-6 px-6 shadow-xl md:hidden flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              smooth={true}
              duration={500}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between text-lg font-medium text-[#1A1A1A] py-2 border-b border-[#F0F0F0]"
            >
              {link.name}
              <ChevronRight size={16} className="text-[#999]" />
            </Link>
          ))}
          <div className="mt-4 flex gap-4">
             <button className="flex-1 py-3 bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-widest rounded-lg">
                Book Consultation
             </button>
          </div>
        </div>
      )}
    </header>
  );
}
