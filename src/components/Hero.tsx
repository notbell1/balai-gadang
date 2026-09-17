import React, { useState } from "react";
import {
  Map,
  Info,
  Users,
  MapPin,
  Target,
  Layout,
  Activity,
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
  const [hasImageError, setHasImageError] = useState(false);

  // Handler Proteksi Foto
  const handleContextMenu = (e: React.MouseEvent) => e.preventDefault();
  const handleDragStart = (e: React.DragEvent) => e.preventDefault();

  // Calculated variables
  const totalRws = rws.length;
  const totalRts = rws.reduce((acc, curr) => acc + (curr.rt_count || 0), 0);
  const totalFacilities = facilities.length;
  const totalPotentials = potentials.length;
  const areaSqKm = profile?.general.areaSqKm || 38.45;
  const population = profile?.general.totalPopulation
    ? profile.general.totalPopulation.toLocaleString("id-ID")
    : "16.420";

  return (
    <>
      {/* CSS Animasi Orbit Otomatis di belakang foto */}
      <style>{`
        @keyframes orbit-spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes orbit-spin-reverse {
          from { transform: translate(-50%, -50%) rotate(360deg); }
          to { transform: translate(-50%, -50%) rotate(0deg); }
        }
        .animate-orbit {
          animation: orbit-spin 25s linear infinite;
        }
        .animate-orbit-reverse {
          animation: orbit-spin-reverse 30s linear infinite;
        }
      `}</style>

      <section
        id="beranda"
        className="relative min-h-screen w-full flex flex-col justify-center bg-[#0B0F19] text-white overflow-hidden py-24"
      >
        {/* Background Accent Gradients */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-[20%] -left-[10%] w-[500px] h-[500px] rounded-full bg-[#633B83]/20 blur-[120px]" />
          <div className="absolute top-[20%] -right-[10%] w-[400px] h-[400px] rounded-full bg-[#FCA228]/10 blur-[100px]" />
          <div className="absolute -bottom-[10%] left-[20%] w-[600px] h-[600px] rounded-full bg-[#7E549E]/15 blur-[120px]" />
        </div>

        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full my-auto z-10">
          {/* Layout Utama */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Kolom Kiri: Teks & Aksi */}
            <div className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                Profil Kelurahan <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FCA228] via-[#FCB739] to-[#FCCB5D]">
                  Balai Gadang
                </span>
              </h1>

              <p className="mt-4 text-base sm:text-lg font-medium text-slate-300">
                Kec. Koto Tangah, Kota Padang, Sumatera Barat
              </p>

              <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl">
                Pusat informasi profil wilayah, pemetaan fasilitas publik
                terpadu, potensi agrowisata, UMKM, serta data rukun warga (RW)
                berbasis sistem digital terbuka.
              </p>

              {/* Action Buttons - Ukuran Kecil/Kompak */}
              <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3 w-full sm:w-auto">
                <button
                  onClick={() => onNavigate("peta")}
                  className="group relative w-full sm:w-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FCA228] to-[#FCB739] text-slate-950 font-bold text-sm shadow-[0_0_30px_rgba(252,162,40,0.25)] hover:shadow-[0_0_40px_rgba(252,162,40,0.35)] flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                  <Map className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">Lihat Peta Interaktif</span>
                </button>

                <button
                  onClick={() => onNavigate("profil")}
                  className="group w-full sm:w-auto px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 backdrop-blur-sm"
                >
                  <Info className="w-4 h-4 text-[#A582BF] group-hover:text-white transition-colors" />
                  <span>Jelajahi Profil</span>
                </button>
              </div>
            </div>

            {/* Kolom Kanan: Foto (Statik dengan Animasi Orbit di belakangnya) */}
            <div className="lg:col-span-5 flex justify-center mt-12 lg:mt-0 relative">
              <div className="relative w-full max-w-sm flex items-center justify-center">
                {/* Garis Orbit 1 (Luar) */}
                <div className="absolute top-1/2 left-1/2 w-[110%] aspect-square rounded-full border border-dashed border-white/10 animate-orbit">
                  <div className="absolute top-0 left-1/2 w-2.5 h-2.5 bg-[#FCCB5D] rounded-full shadow-[0_0_10px_#FCCB5D] transform -translate-x-1/2 -translate-y-1/2" />
                </div>

                {/* Garis Orbit 2 (Dalam - Berlawanan Arah) */}
                <div className="absolute top-1/2 left-1/2 w-[90%] aspect-square rounded-full border border-white/5 animate-orbit-reverse">
                  <div className="absolute bottom-0 right-1/4 w-1.5 h-1.5 bg-[#A582BF] rounded-full shadow-[0_0_10px_#A582BF] transform translate-x-1/2 translate-y-1/2" />
                </div>

                {/* Container Foto (Sudah tidak goyang) */}
                <div className="relative z-10 w-full rounded-3xl overflow-hidden border border-white/10 bg-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] aspect-[4/3]">
                  {/* Efek Glow di dalam kartu */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none z-20" />

                  {!hasImageError ? (
                    <>
                      <img
                        src="/images/kantor-lurah.png"
                        alt="Kelurahan Balai Gadang"
                        className="w-full h-full object-cover pointer-events-none"
                        onError={() => setHasImageError(true)}
                      />
                      <div
                        onContextMenu={handleContextMenu}
                        onDragStart={handleDragStart}
                        className="absolute inset-0 z-30 bg-transparent"
                      />
                    </>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 p-6 text-center">
                      <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                        <Layout className="w-6 h-6 text-[#FCCB5D]" />
                      </div>
                      <span className="text-sm font-bold text-white mb-1">
                        Kawasan Balai Gadang
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Gambar tidak ditemukan
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Key Stats Grid - Glassmorphism */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <StatCard
              icon={<Users className="w-5 h-5 text-[#FCA228]" />}
              value={totalRws.toString()}
              title="Rukun Warga (RW)"
              subtitle={
                totalRts > 0 ? `${totalRts} Rukun Tetangga` : "Data Dinamis"
              }
            />
            <StatCard
              icon={<MapPin className="w-5 h-5 text-[#FCCB5D]" />}
              value={`± ${totalFacilities}`}
              title="Fasilitas Publik"
              subtitle="Terdata & Terpetakan"
            />
            <StatCard
              icon={<Target className="w-5 h-5 text-[#FCB739]" />}
              value={`± ${totalPotentials}`}
              title="Potensi Unggulan"
              subtitle="Wisata, UMKM & Tani"
            />
            <StatCard
              icon={<Layout className="w-5 h-5 text-[#A582BF]" />}
              value={`${areaSqKm}`}
              suffix="km²"
              title="Luas Wilayah"
              subtitle="Dataran & Perbukitan"
            />
            <StatCard
              icon={<Activity className="w-5 h-5 text-[#8F66AC]" />}
              className="col-span-2 sm:col-span-1"
              value={`± ${population}`}
              title="Jiwa Penduduk"
              subtitle="± 4.120 Kepala Keluarga"
            />
          </div>
        </div>
      </section>
    </>
  );
};

// Sub-komponen untuk merapikan kode Card
const StatCard = ({
  icon,
  value,
  suffix,
  title,
  subtitle,
  className = "",
}: any) => (
  <div
    className={`group bg-white/[0.03] hover:bg-white/[0.06] backdrop-blur-md border border-white/10 hover:border-white/20 rounded-2xl p-4 text-left transition-all duration-300 hover:-translate-y-1 ${className}`}
  >
    <div className="flex items-center justify-between mb-3">
      <div className="p-2 rounded-xl bg-white/5 border border-white/5 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
    </div>
    <div className="text-xl sm:text-2xl font-bold text-white mb-1 flex items-baseline gap-1">
      {value}{" "}
      {suffix && (
        <span className="text-xs font-semibold text-slate-400">{suffix}</span>
      )}
    </div>
    <div className="text-[10px] sm:text-xs font-semibold text-slate-300 uppercase tracking-wider mb-0.5">
      {title}
    </div>
    <div className="text-[10px] text-slate-500">{subtitle}</div>
  </div>
);
