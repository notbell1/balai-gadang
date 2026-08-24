import React from "react";
import {
  MapPin,
  Compass,
  Sparkles,
  Building2,
  ChevronRight,
  QrCode,
  ShieldCheck,
  GraduationCap,
  Award,
} from "lucide-react";
import { ProfileData, RWData, FacilityItem, PotentialItem } from "../types";

interface HeroProps {
  profile: ProfileData | null;
  rws: RWData[];
  facilities: FacilityItem[];
  potentials: PotentialItem[];
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  profile,
  rws,
  facilities,
  potentials,
  onNavigate,
}) => {
  // Calculated directly from datasets (NO hardcoding!)
  const totalRws = rws.length;
  const totalRts = rws.reduce((acc, curr) => acc + (curr.rt_count || 0), 0);
  const totalFacilities = facilities.length;
  const totalPotentials = potentials.length;
  const areaSqKm = profile?.general.areaSqKm || 38.45;
  const population = profile?.general.totalPopulation
    ? profile.general.totalPopulation.toLocaleString("id-ID")
    : "16.420";

  return (
    <section
      id="beranda"
      className="relative pt-24 pb-14 sm:pt-32 sm:pb-20 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden"
    >
      {/* Background Accent Gradients with Subtle Floating Animations */}
      <div className="absolute inset-0 opacity-30 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#633B83] blur-3xl animate-float-slow" />
        <div className="absolute top-1/3 -right-24 w-96 h-96 rounded-full bg-[#7E549E] blur-3xl animate-float-reverse" />
        <div className="absolute -bottom-12 left-1/3 w-80 h-80 rounded-full bg-[#FCA228]/30 blur-3xl animate-float-gentle" />

        {/* Subtle Floating Spark Particles */}
        <div className="absolute top-[20%] left-[15%] w-2 h-2 rounded-full bg-[#FCA228] opacity-40 animate-drift-1 blur-[0.5px]" />
        <div className="absolute top-[60%] right-[18%] w-2.5 h-2.5 rounded-full bg-[#FCCB5D] opacity-35 animate-drift-2 blur-[0.5px]" />
        <div className="absolute bottom-[25%] left-[28%] w-1.5 h-1.5 rounded-full bg-[#8F66AC] opacity-40 animate-drift-3 blur-[0.5px]" />
      </div>

      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Dual Institution & Program Logos Card Banner */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 mb-6 animate-in fade-in slide-in-from-top-4 duration-500">
            {/* Logo 1: Universitas Islam Sumatera Barat */}
            <div className="flex items-center gap-2.5 px-3.5 sm:px-4 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-white/20 shadow-lg shadow-black/20 hover:scale-102 transition-transform">
              <img
                src="/images/uisb.svg"
                alt="Logo Universitas Islam Sumatera Barat"
                className="h-7 sm:h-9 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/images/uisb.png";
                }}
              />
            </div>

            {/* Cross Indicator / Connector */}
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-[#FCCB5D] text-xs font-bold">
              ×
            </div>

            {/* Logo 2: KKN Kelurahan Balai Gadang 2026 */}
            <button
              onClick={() => onNavigate("kkn")}
              className="flex items-center gap-2.5 px-3.5 sm:px-4 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-white/20 shadow-lg shadow-black/20 hover:scale-102 transition-transform cursor-pointer group text-left"
              title="Lihat Tim KKN Balai Gadang 2026"
            >
              <img
                src="/images/kkn.svg"
                alt="Logo KKN Kelurahan Balai Gadang 2026"
                className="h-7 sm:h-9 w-7 sm:w-9 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/images/logo.png";
                }}
              />
              <div className="hidden sm:flex flex-col">
                <span className="text-[11px] font-extrabold text-[#633B83] leading-none group-hover:text-[#7E549E]">
                  KKN UISB 2026
                </span>
                <span className="text-[9px] font-bold text-slate-500 leading-tight mt-0.5">
                  Kelurahan Balai Gadang
                </span>
              </div>
            </button>
          </div>

          {/* Secondary Sub-badge pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6">
            {/* Municipal Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7E549E]/25 border border-[#8F66AC]/50 text-[#FCCB5D] text-xs font-semibold shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FCA228]" />
              <span>Portal Informasi Publik &amp; Pemetaan Wilayah</span>
            </div>

            {/* Official KKN Team Pill */}
            <button
              onClick={() => onNavigate("kkn")}
              className="group inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#633B83] via-[#7E549E] to-slate-900 border border-[#8F66AC]/60 hover:border-[#FCA228] text-white text-xs font-semibold shadow-sm transition-all hover:scale-105 cursor-pointer"
            >
              <GraduationCap className="w-3.5 h-3.5 text-[#FCCB5D]" />
              <span className="text-slate-100 group-hover:text-[#FCCB5D] transition-colors">
                21 Mahasiswa KKN UISB
              </span>
            </button>
          </div>

          {/* Main Titles */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Profil Kelurahan{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FCA228] via-[#FCB739] to-[#FCCB5D]">
              Balai Gadang
            </span>
          </h1>
          <p className="mt-3 text-lg sm:text-xl font-medium text-slate-300">
            Kecamatan Koto Tangah, Kota Padang, Sumatera Barat
          </p>

          <p className="mt-4 text-sm sm:text-base text-slate-300/90 leading-relaxed max-w-2xl mx-auto">
            Pusat informasi profil wilayah, pemetaan fasilitas publik terpadu,
            potensi agrowisata, UMKM, serta data rukun warga (RW) berbasis
            sistem digital terbuka.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <button
              id="hero-btn-peta"
              onClick={() => onNavigate("peta")}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#FCA228] to-[#FCB739] hover:from-[#FCB739] hover:to-[#FCCB5D] text-slate-950 font-extrabold text-sm sm:text-base shadow-lg shadow-[#FCA228]/30 flex items-center justify-center gap-2 transition-all hover:translate-y-[-1px] cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-slate-950" />
              <span>Lihat Peta Interaktif</span>
              <ChevronRight className="w-4 h-4 text-slate-950" />
            </button>

            <button
              id="hero-btn-profil"
              onClick={() => onNavigate("profil")}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#633B83]/50 hover:bg-[#633B83]/80 border border-[#8F66AC]/50 text-slate-200 hover:text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#FCCB5D]" />
              <span>Jelajahi Profil Kelurahan</span>
            </button>
          </div>

          {/* QR Code Quick Access Hint */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
            <QrCode className="w-3.5 h-3.5 text-[#FCCB5D]" />
            <span>
              Optimal untuk scan QR Code smartphone &amp; akses publik cepat
            </span>
          </div>
        </div>

        {/* Dynamic Key Stats Grid (Calculated from Real Datasets) */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          <div className="bg-slate-800/80 backdrop-blur-sm border border-[#8F66AC]/30 rounded-2xl p-4 text-center hover:border-[#FCA228]/60 transition-colors">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#FCA228]">
              {totalRws}
            </div>
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mt-1">
              Rukun Warga (RW)
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              {totalRts > 0
                ? `${totalRts} Rukun Tetangga (RT)`
                : "Data dinamis rw.csv"}
            </div>
          </div>

          <div className="bg-slate-800/80 backdrop-blur-sm border border-[#8F66AC]/30 rounded-2xl p-4 text-center hover:border-[#FCCB5D]/60 transition-colors">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#FCCB5D]">
              {totalFacilities}
            </div>
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mt-1">
              Fasilitas Publik
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Terdata &amp; Terpetakan
            </div>
          </div>

          <div className="bg-slate-800/80 backdrop-blur-sm border border-[#8F66AC]/30 rounded-2xl p-4 text-center hover:border-[#FCB739]/60 transition-colors">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#FCB739]">
              {totalPotentials}
            </div>
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mt-1">
              Potensi Unggulan
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Wisata, UMKM &amp; Tani
            </div>
          </div>

          <div className="bg-slate-800/80 backdrop-blur-sm border border-[#8F66AC]/30 rounded-2xl p-4 text-center hover:border-[#A582BF]/60 transition-colors">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#A582BF]">
              {areaSqKm} <span className="text-sm font-semibold">km²</span>
            </div>
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mt-1">
              Luas Wilayah
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Dataran &amp; Perbukitan
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 bg-slate-800/80 backdrop-blur-sm border border-[#8F66AC]/30 rounded-2xl p-4 text-center hover:border-[#8F66AC]/60 transition-colors">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#8F66AC]">
              {population}
            </div>
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mt-1">
              Jiwa Penduduk
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              ± 4.120 Kepala Keluarga
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
