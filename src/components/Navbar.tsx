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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-2.5"
          : "bg-white/90 backdrop-blur-sm border-b border-slate-100 py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Title + Official UISB KKN Logo Badge */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              id="brand-logo-link"
              href="#beranda"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("beranda");
              }}
              className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none"
            >
              {/* Customizable Brand/Municipal Logo with Seamless Fallback */}
              {!logoError ? (
                <div className="relative flex-shrink-0">
                  <img
                    src={customLogoUrl}
                    alt="Logo Kelurahan Balai Gadang"
                    className={`h-9 sm:h-10 w-auto object-contain max-w-[48px] rounded-lg transition-transform group-hover:scale-105 ${
                      logoLoaded ? "block" : "hidden"
                    }`}
                    onLoad={() => setLogoLoaded(true)}
                    onError={() => setLogoError(true)}
                  />
                  {!logoLoaded && (
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#633B83] to-[#7E549E] flex items-center justify-center text-white shadow-md shadow-[#633B83]/25 group-hover:scale-105 transition-transform flex-shrink-0">
                      <Building className="w-5 h-5 text-[#FCCB5D]" />
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#633B83] to-[#7E549E] flex items-center justify-center text-white shadow-md shadow-[#633B83]/25 group-hover:scale-105 transition-transform flex-shrink-0">
                  <Building className="w-5 h-5 text-[#FCCB5D]" />
                </div>
              )}

              <div className="flex flex-col">
                <span className="font-extrabold text-slate-900 text-sm sm:text-lg leading-tight tracking-tight">
                  Balai Gadang
                </span>
                <span className="text-[11px] sm:text-xs text-slate-500 font-medium leading-none">
                  Koto Tangah, Padang
                </span>
              </div>
            </a>

            {/* Separator */}
            <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

            {/* Official KKN UISB Logo & Badge in Header */}
            <a
              id="header-kkn-badge-link"
              href="#kkn"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("kkn");
              }}
              className="group flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1 rounded-xl bg-gradient-to-r from-[#7E549E]/10 via-[#FCA228]/10 to-[#FCCB5D]/15 border border-[#8F66AC]/30 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
              title="Kunjungi Profil Tim KKN UISB 2026"
            >
              {/* KKN Emblem or Custom University Logo */}
              {!kknLogoError ? (
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center bg-white border border-[#A582BF]/40">
                  <img
                    src={customKknLogoUrl}
                    alt="Logo UISB"
                    className="w-full h-full object-contain p-0.5"
                    onError={() => setKknLogoError(true)}
                  />
                </div>
              ) : (
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-gradient-to-tr from-[#633B83] via-[#7E549E] to-[#8F66AC] text-white flex items-center justify-center shadow-xs flex-shrink-0 group-hover:rotate-6 transition-transform">
                  <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FCCB5D]" />
                </div>
              )}

              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1">
                  <span className="text-[10px] sm:text-[11px] font-black text-[#633B83] tracking-tight leading-none group-hover:text-[#7E549E] transition-colors">
                    KKN UISB
                  </span>
                  <span className="text-[8px] sm:text-[9px] font-bold bg-[#FCA228] text-slate-950 px-1 py-0.2 rounded leading-none">
                    2026
                  </span>
                </div>
                <span className="text-[8px] sm:text-[9px] font-semibold text-[#8F66AC] leading-none hidden xs:inline mt-0.5">
                  Univ. Islam Sumbar
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav
            id="desktop-nav"
            className="hidden lg:flex items-center gap-1 xl:gap-1.5"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  id={`nav-link-${item.id}`}
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? "bg-[#7E549E]/15 text-[#633B83] font-bold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                  }`}
                >
                  <item.icon
                    className={`w-3.5 h-3.5 ${isActive ? "text-[#7E549E]" : "text-slate-400"}`}
                  />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTA & Mobile Hamburger */}
          <div className="flex items-center gap-2">
            <a
              id="cta-peta-button"
              href="#peta"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("peta");
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#FCA228] to-[#FCB739] hover:from-[#FCB739] hover:to-[#FCA228] text-slate-950 text-xs sm:text-sm font-bold shadow-sm shadow-[#FCA228]/30 transition-all cursor-pointer hover:scale-102"
            >
              <MapPin className="w-3.5 h-3.5 text-slate-950" />
              <span>Buka Peta</span>
            </a>

            {/* Mobile menu button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label={isOpen ? "Tutup menu" : "Buka menu"}
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden fixed inset-x-0 top-[60px] bg-white border-b border-slate-200 shadow-xl max-h-[calc(100vh-60px)] overflow-y-auto z-50 animate-in slide-in-from-top duration-200"
        >
          <div className="p-4 space-y-1">
            <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Menu Navigasi
            </div>
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  id={`mobile-nav-link-${item.id}`}
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-between cursor-pointer ${
                    isActive
                      ? "bg-[#7E549E]/15 text-[#633B83] font-bold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <item.icon
                      className={`w-4 h-4 ${isActive ? "text-[#7E549E]" : "text-slate-400"}`}
                    />
                    {item.label}
                  </span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FCA228]"></span>
                  )}
                </button>
              );
            })}

            <div className="pt-3 mt-3 border-t border-slate-100">
              <button
                id="mobile-drawer-peta-btn"
                onClick={() => handleNavClick("peta")}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#FCA228] to-[#FCB739] text-slate-950 text-sm font-bold text-center flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-slate-950" />
                <span>Eksplorasi Peta Interaktif</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
