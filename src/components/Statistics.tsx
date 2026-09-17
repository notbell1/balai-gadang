import React, { useState, useMemo, useEffect } from "react";
import {
  Layers,
  MapPin,
  Users,
  Phone,
  Building2,
  Sparkles,
  Search,
  RotateCcw,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { RWData, FacilityItem, PotentialItem } from "../types";

interface StatisticsProps {
  rws: RWData[];
  facilities: FacilityItem[];
  potentials: PotentialItem[];
  onSelectRw: (rwId: string) => void;
  onNavigateToMap: (rwId: string) => void;
}

export const Statistics: React.FC<StatisticsProps> = ({
  rws,
  facilities,
  potentials,
  onSelectRw,
  onNavigateToMap,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllMobile, setShowAllMobile] = useState(false);
  const INITIAL_MOBILE_COUNT = 4;

  // Reset showAllMobile saat pengguna melakukan pencarian
  useEffect(() => {
    setShowAllMobile(false);
  }, [searchTerm]);

  const facilityCountByRw = useMemo(() => {
    const map = new Map<string, number>();
    facilities.forEach((f) => {
      map.set(f.rw_id, (map.get(f.rw_id) || 0) + 1);
    });
    return map;
  }, [facilities]);

  const potentialCountByRw = useMemo(() => {
    const map = new Map<string, number>();
    potentials.forEach((p) => {
      map.set(p.rw_id, (map.get(p.rw_id) || 0) + 1);
    });
    return map;
  }, [potentials]);

  const filteredRws = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return rws.filter((rw) => {
      return (
        rw.name.toLowerCase().includes(term) ||
        rw.description.toLowerCase().includes(term) ||
        (rw.leader_name && rw.leader_name.toLowerCase().includes(term)) ||
        rw.rw_id.toLowerCase().includes(term)
      );
    });
  }, [rws, searchTerm]);

  const totalRtCount = useMemo(() => {
    return rws.reduce((acc, curr) => acc + (curr.rt_count || 0), 0);
  }, [rws]);

  // Handler cerdas untuk tombol Show More / Show Less di Mobile
  const handleToggleMobileView = () => {
    if (showAllMobile) {
      // Ketika "Lebih Sedikit" diklik:
      // Sembunyikan data, lalu scroll halus kembali ke header agar tidak terlempar ke section bawah
      setShowAllMobile(false);
      setTimeout(() => {
        const section = document.getElementById("wilayah");
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 50); // Delay 50ms untuk menunggu DOM selesai disembunyikan
    } else {
      // Ketika "Lihat Semua" diklik, biarkan memanjang natural ke bawah
      setShowAllMobile(true);
    }
  };

  return (
    <section
      id="wilayah"
      className="relative lg:h-screen w-full flex flex-col justify-center bg-[#0B0F19] text-white overflow-hidden py-16 lg:py-0 border-b border-white/5"
    >
      {/* Background Accent Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] -right-[10%] w-[400px] h-[400px] rounded-full bg-[#633B83]/15 blur-[120px]" />
        <div className="absolute bottom-[20%] -left-[10%] w-[400px] h-[400px] rounded-full bg-[#FCA228]/10 blur-[100px]" />
      </div>

      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 w-full flex flex-col lg:h-[85vh] z-10">
        {/* ==========================================
            HEADER & SEARCH BAR
            ========================================== */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-8 lg:mb-10 flex-shrink-0">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Data Rukun Warga{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FCA228] to-[#FCCB5D]">
                ({rws.length} RW)
              </span>
            </h2>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed max-w-xl">
              Distribusi wilayah pembantu kelurahan, mencakup{" "}
              <strong className="text-slate-200">
                {totalRtCount} Rukun Tetangga (RT)
              </strong>
              , perangkat RW, serta pemetaan aset fasilitas dan potensi lokal.
            </p>
          </div>

          {/* Modern Dark Search Box */}
          <div className="w-full md:w-80 flex-shrink-0 relative group">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#633B83]/50 to-[#FCA228]/40 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" />
            <div className="relative">
              <Search className="w-4.5 h-4.5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari RW, ketua, atau lokasi..."
                className="w-full pl-11 pr-4 py-3 bg-white/[0.05] backdrop-blur-sm border border-white/10 rounded-full text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#FCA228]/60 focus:border-transparent transition-all duration-300"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white bg-white/10 hover:bg-white/20 rounded-full w-6 h-6 flex items-center justify-center transition-colors cursor-pointer"
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ==========================================
            MAIN CONTENT
            ========================================== */}
        {filteredRws.length > 0 ? (
          <div className="flex-1 min-h-0 lg:overflow-y-auto lg:pr-3 custom-scrollbar-dark animate-in fade-in duration-500">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 pb-5">
              {filteredRws.map((rw, index) => {
                const facCount = facilityCountByRw.get(rw.rw_id) || 0;
                const potCount = potentialCountByRw.get(rw.rw_id) || 0;

                const isHiddenOnMobile =
                  !showAllMobile && index >= INITIAL_MOBILE_COUNT;

                return (
                  <div
                    key={rw.rw_id}
                    className={`group bg-white/[0.02] hover:bg-white/[0.05] backdrop-blur-md border border-white/5 hover:border-[#8F66AC]/30 rounded-2xl p-5 sm:p-6 transition-all duration-500 flex-col justify-between h-full relative overflow-hidden ${
                      isHiddenOnMobile ? "hidden lg:flex" : "flex"
                    }`}
                  >
                    <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[#633B83]/20 via-transparent to-[#FCA228]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
                        <span className="px-3 py-1 rounded-lg bg-[#7E549E]/20 text-[#A582BF] text-xs font-bold border border-[#8F66AC]/30">
                          {rw.rw_id}
                        </span>
                        {rw.rt_count !== undefined && (
                          <span className="text-[11px] font-semibold text-slate-300 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                            {rw.rt_count} RT
                          </span>
                        )}
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#FCCB5D] transition-colors leading-snug">
                        {rw.name}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-2">
                        {rw.description}
                      </p>
                    </div>

                    <div className="relative z-10 mt-5 pt-5 border-t border-white/5 space-y-4">
                      <div className="bg-white/[0.02] p-3 rounded-xl border border-white/5 text-xs space-y-2">
                        {rw.leader_name ? (
                          <>
                            <div className="flex items-center gap-2 font-semibold text-slate-200">
                              <Users className="w-3.5 h-3.5 text-[#A582BF] flex-shrink-0" />
                              <span className="truncate">
                                Ketua: {rw.leader_name}
                              </span>
                            </div>
                            {rw.phone && (
                              <div className="flex items-center gap-2 text-slate-400">
                                <Phone className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                                <span className="truncate text-[11px]">
                                  {rw.phone}
                                </span>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="flex items-center gap-2 text-slate-500 italic text-[11px]">
                            <Users className="w-3.5 h-3.5 text-slate-600" />
                            Aparatur belum terdata
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 bg-black/20 p-2 rounded-xl border border-white/5">
                        <div className="flex items-center gap-2 justify-center font-medium p-1">
                          <Building2 className="w-3.5 h-3.5 text-[#FCCB5D]" />
                          <span className="font-bold text-white text-sm">
                            {facCount}
                          </span>{" "}
                          <span className="hidden sm:inline">Fasilitas</span>
                        </div>
                        <div className="flex items-center gap-2 justify-center font-medium border-l border-white/5 p-1">
                          <Sparkles className="w-3.5 h-3.5 text-[#A582BF]" />
                          <span className="font-bold text-white text-sm">
                            {potCount}
                          </span>{" "}
                          <span className="hidden sm:inline">Potensi</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onSelectRw(rw.rw_id)}
                          className="flex-1 py-2.5 px-4 rounded-xl bg-white/5 hover:bg-[#7E549E]/20 text-slate-200 hover:text-white font-semibold text-xs transition-colors text-center cursor-pointer border border-white/5 hover:border-[#8F66AC]/40"
                        >
                          Filter Data
                        </button>
                        <button
                          onClick={() => onNavigateToMap(rw.rw_id)}
                          className="p-2.5 h-[37px] rounded-xl bg-gradient-to-r from-[#633B83] to-[#7E549E] hover:from-[#7E549E] hover:to-[#633B83] text-white transition-all duration-300 flex items-center justify-center cursor-pointer shadow-sm hover:shadow-[#633B83]/30"
                          title={`Lihat wilayah ${rw.rw_id} di Peta`}
                        >
                          <MapPin className="w-4 h-4 text-[#FCCB5D]" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ==========================================
                MOBILE ONLY: SHOW MORE / LESS BUTTON
                ========================================== */}
            {filteredRws.length > INITIAL_MOBILE_COUNT && (
              <div className="mt-4 flex justify-center lg:hidden pb-4">
                <button
                  onClick={handleToggleMobileView}
                  className="px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  {showAllMobile ? (
                    <>
                      Tampilkan Lebih Sedikit <ChevronUp className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Lihat Semua RW ({filteredRws.length}){" "}
                      <ChevronDown className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center animate-in fade-in duration-500 py-16">
            <div className="bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-2xl p-10 text-center max-w-sm w-full shadow-xl relative overflow-hidden">
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[#633B83]/10 to-[#FCA228]/5 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-5">
                  <Layers className="w-8 h-8 text-slate-600" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Wilayah Tidak Ditemukan
                </h3>
                <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                  Tidak ditemukan data Rukun Warga yang sesuai dengan kata kunci
                  &ldquo;
                  <strong className="text-slate-200">{searchTerm}</strong>
                  &rdquo;. Silakan coba kata kunci lain.
                </p>
                <button
                  onClick={() => setSearchTerm("")}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FCA228] to-[#FCB739] hover:from-[#FCB739] hover:to-[#FCCB5D] text-slate-950 text-xs font-extrabold inline-flex items-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-[#FCA228]/30"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset Pencarian
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .custom-scrollbar-dark::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar-dark::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 10px;
        }
        .custom-scrollbar-dark::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar-dark::-webkit-scrollbar-thumb:hover {
          background: #7E549E;
        }
      `}</style>
    </section>
  );
};
