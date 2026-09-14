import React, { useState } from "react";
import { QrCode } from "lucide-react";
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
  const [hasImageError, setHasImageError] = useState(false);

  // Handler Proteksi Foto (Prevent Right-Click & Drag)
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Calculated directly from datasets
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
      className="relative min-h-screen w-full flex flex-col justify-center bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden py-20 sm:py-24"
    >
      {/* Background Accent Gradients */}
      <div className="absolute inset-0 opacity-30 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#633B83] blur-3xl animate-float-slow" />
        <div className="absolute top-1/3 -right-24 w-96 h-96 rounded-full bg-[#7E549E] blur-3xl animate-float-reverse" />
        <div className="absolute -bottom-12 left-1/3 w-80 h-80 rounded-full bg-[#FCA228]/30 blur-3xl animate-float-gentle" />

        <div className="absolute top-[20%] left-[15%] w-2 h-2 rounded-full bg-[#FCA228] opacity-40 animate-drift-1 blur-[0.5px]" />
        <div className="absolute top-[60%] right-[18%] w-2.5 h-2.5 rounded-full bg-[#FCCB5D] opacity-35 animate-drift-2 blur-[0.5px]" />
        <div className="absolute bottom-[25%] left-[28%] w-1.5 h-1.5 rounded-full bg-[#8F66AC] opacity-40 animate-drift-3 blur-[0.5px]" />
      </div>

      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        {/* Layout Utama */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Kolom Kiri: Teks & Aksi */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Profil Kelurahan{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FCA228] via-[#FCB739] to-[#FCCB5D]">
                Balai Gadang
              </span>
            </h1>

            <p className="mt-3 text-base sm:text-xl font-medium text-slate-300">
              Kecamatan Koto Tangah, Kota Padang, Sumatera Barat
            </p>

            <p className="mt-3.5 text-xs sm:text-base text-slate-300/90 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Pusat informasi profil wilayah, pemetaan fasilitas publik terpadu,
              potensi agrowisata, UMKM, serta data rukun warga (RW) berbasis
              sistem digital terbuka.
            </p>

            {/* Action Buttons */}
            <div className="mt-7 flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
              <button
                id="hero-btn-peta"
                onClick={() => onNavigate("peta")}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#FCA228] to-[#FCB739] hover:from-[#FCB739] hover:to-[#FCCB5D] text-slate-950 font-extrabold text-xs sm:text-base shadow-lg shadow-[#FCA228]/30 flex items-center justify-center transition-all hover:translate-y-[-1px] cursor-pointer animate-subtle-blink"
              >
                <span>Lihat Peta Interaktif</span>
              </button>

              <button
                id="hero-btn-profil"
                onClick={() => onNavigate("profil")}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#633B83]/50 hover:bg-[#633B83]/80 border border-[#8F66AC]/50 text-slate-200 hover:text-white font-semibold text-xs sm:text-base flex items-center justify-center transition-all cursor-pointer animate-subtle-blink-delayed"
              >
                <span>Jelajahi Profil Kelurahan</span>
              </button>
            </div>
          </div>

          {/* Kolom Kanan: Foto */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-none">
              {/* Efek Glow */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#FCA228] to-[#7E549E] opacity-30 blur-lg animate-pulse" />

              {/* Container Foto */}
              <div className="group/heroImg relative rounded-2xl overflow-hidden border border-[#8F66AC]/40 bg-slate-800 shadow-2xl aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] select-none cursor-pointer">
                {!hasImageError ? (
                  <>
                    <img
                      src="/images/kantor-lurah.png"
                      alt="Kelurahan Balai Gadang"
                      className="w-full h-full object-cover transform group-hover/heroImg:scale-105 transition-transform duration-700 pointer-events-none"
                      onError={() => setHasImageError(true)}
                    />

                    {/* Shield Overlay */}
                    <div
                      onContextMenu={handleContextMenu}
                      onDragStart={handleDragStart}
                      className="absolute inset-0 z-10 bg-transparent"
                    />
                  </>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-[#633B83]/50 border border-[#8F66AC]/50 flex items-center justify-center mb-3 text-[#FCCB5D] font-bold text-xl">
                      BG
                    </div>
                    <span className="text-sm font-semibold text-slate-200">
                      Kawasan Balai Gadang
                    </span>
                    <span className="text-xs text-slate-400 mt-1">
                      Pastikan file berada di `public/images/kantor-lurah.png`
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Key Stats Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <div className="bg-slate-800/80 backdrop-blur-sm border border-[#8F66AC]/30 rounded-xl p-3 text-center hover:border-[#FCA228]/60 transition-colors">
            <div className="text-xl sm:text-2xl font-extrabold text-[#FCA228]">
              {totalRws}
            </div>
            <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider mt-0.5">
              Rukun Warga (RW)
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              {totalRts > 0
                ? `${totalRts} Rukun Tetangga (RT)`
                : "Data dinamis rw.csv"}
            </div>
          </div>

          <div className="bg-slate-800/80 backdrop-blur-sm border border-[#8F66AC]/30 rounded-xl p-3 text-center hover:border-[#FCCB5D]/60 transition-colors">
            <div className="text-xl sm:text-2xl font-extrabold text-[#FCCB5D] flex items-center justify-center gap-1">
              <span>±</span>
              <span>{totalFacilities}</span>
            </div>
            <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider mt-0.5">
              Fasilitas Publik
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Terdata &amp; Terpetakan
            </div>
          </div>

          <div className="bg-slate-800/80 backdrop-blur-sm border border-[#8F66AC]/30 rounded-xl p-3 text-center hover:border-[#FCB739]/60 transition-colors">
            <div className="text-xl sm:text-2xl font-extrabold text-[#FCB739] flex items-center justify-center gap-1">
              <span>±</span>
              <span>{totalPotentials}</span>
            </div>
            <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider mt-0.5">
              Potensi Unggulan
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Wisata, UMKM &amp; Tani
            </div>
          </div>

          <div className="bg-slate-800/80 backdrop-blur-sm border border-[#8F66AC]/30 rounded-xl p-3 text-center hover:border-[#A582BF]/60 transition-colors">
            <div className="text-xl sm:text-2xl font-extrabold text-[#A582BF]">
              {areaSqKm} <span className="text-xs font-semibold">km²</span>
            </div>
            <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider mt-0.5">
              Luas Wilayah
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Dataran &amp; Perbukitan
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 bg-slate-800/80 backdrop-blur-sm border border-[#8F66AC]/30 rounded-xl p-3 text-center hover:border-[#8F66AC]/60 transition-colors">
            <div className="text-xl sm:text-2xl font-extrabold text-[#8F66AC] flex items-center justify-center gap-1">
              <span>±</span>
              <span>{population}</span>
            </div>
            <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider mt-0.5">
              Jiwa Penduduk
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              ± 4.120 Kepala Keluarga
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
