import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  MapPin,
  Compass,
  Building,
  Sparkles,
  Layers,
  GraduationCap,
  ChevronRight,
} from "lucide-react";

interface NavbarProps {
  activeSection: string;
  customLogoUrl?: string;
  customKknLogoUrl?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  customLogoUrl = "/images/kkn.svg",
  customKknLogoUrl = "/images/uisb.svg",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [kknLogoError, setKknLogoError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Menutup mobile menu saat orientasi layar berubah (resize)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { id: "beranda", label: "Beranda", icon: Compass },
    { id: "profil", label: "Profil", icon: Building },
    { id: "wilayah", label: "Wilayah", icon: Layers },
    { id: "peta", label: "Peta", icon: MapPin },
    { id: "fasilitas", label: "Fasilitas", icon: Building },
    { id: "potensi", label: "Potensi", icon: Sparkles },
    { id: "kkn", label: "KKN", icon: GraduationCap },
  ];

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] border-b border-slate-200/50 py-2.5"
          : "bg-gradient-to-b from-white/90 to-white/50 backdrop-blur-md py-4 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between">
          {/* Kiri: Brand & Logo Group */}
          <div className="flex items-center gap-4">
            <a
              href="#beranda"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("beranda");
              }}
              className="flex items-center gap-3 group focus:outline-none"
            >
              {/* Logo Kelurahan */}
              {!logoError ? (
                <div className="relative flex-shrink-0 bg-white p-1 rounded-xl shadow-sm border border-slate-100 group-hover:shadow-md transition-shadow">
                  <img
                    src={customLogoUrl}
                    alt="Logo Balai Gadang"
                    className={`h-8 w-auto object-contain max-w-[40px] transition-transform duration-300 group-hover:scale-105 ${
                      logoLoaded ? "block" : "hidden"
                    }`}
                    onLoad={() => setLogoLoaded(true)}
                    onError={() => setLogoError(true)}
                  />
                  {!logoLoaded && (
                    <div className="w-8 h-8 rounded-lg bg-slate-100 animate-pulse" />
                  )}
                </div>
              ) : (
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200 group-hover:shadow-md transition-shadow">
                  <Building className="w-5 h-5 text-slate-400" />
                </div>
              )}

              {/* Teks Kelurahan */}
              <div className="flex flex-col">
                <span className="font-bold text-slate-800 text-sm sm:text-base leading-tight">
                  Balai Gadang
                </span>
                <span className="text-[10px] sm:text-xs text-slate-500 font-medium">
                  Koto Tangah
                </span>
              </div>
            </a>

            {/* Separator Tipis */}
            <div className="h-8 w-px bg-slate-200/80 hidden sm:block"></div>

            {/* Badge KKN - Dibuat Lebih Sleek & Minimalis */}
            <a
              href="#kkn"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("kkn");
              }}
              className="hidden xs:flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-colors cursor-pointer group"
              title="Profil Tim KKN UISB 2026"
            >
              {!kknLogoError ? (
                <img
                  src={customKknLogoUrl}
                  alt="Logo UISB"
                  className="w-5 h-5 object-contain"
                  onError={() => setKknLogoError(true)}
                />
              ) : (
                <GraduationCap className="w-4 h-4 text-[#8F66AC]" />
              )}
              <span className="text-[10px] sm:text-xs font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">
                KKN UISB '26
              </span>
            </a>
          </div>

          {/* Tengah/Kanan: Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 border border-slate-200/60 bg-white/50 rounded-full px-1.5 py-1.5 shadow-sm">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all duration-300 ease-out cursor-pointer ${
                    isActive
                      ? "bg-slate-800 text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-100/80"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Kanan: CTA Button & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick("peta")}
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FCA228] to-[#FCB739] hover:from-[#FCB739] hover:to-[#FCCB5D] text-slate-950 text-[13px] font-bold shadow-[0_4px_14px_0_rgba(252,162,40,0.39)] hover:shadow-[0_6px_20px_rgba(252,162,40,0.23)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
            >
              <MapPin className="w-4 h-4" />
              <span>Buka Peta</span>
            </button>

            {/* Hamburger Button (Mobile) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative z-50 p-2.5 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-slate-700 transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Overlay Backdrop Mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Nav - Floating Card Design */}
      <div
        className={`lg:hidden fixed top-[76px] left-4 right-4 z-50 transition-all duration-300 ease-out transform origin-top ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-3 overflow-hidden">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-slate-800 text-white"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon
                      className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`}
                    />
                    {item.label}
                  </div>
                  {isActive && (
                    <ChevronRight className="w-4 h-4 text-white/50" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100">
            <button
              onClick={() => handleNavClick("peta")}
              className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-gradient-to-r from-[#FCA228] to-[#FCB739] text-slate-950 text-sm font-bold shadow-sm"
            >
              <MapPin className="w-4 h-4" />
              <span>Eksplorasi Peta Interaktif</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
