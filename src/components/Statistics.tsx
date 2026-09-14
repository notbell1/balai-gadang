import React, { useState, useEffect } from "react";
import {
  Layers,
  MapPin,
  Users,
  Phone,
  Building2,
  Sparkles,
  Search,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
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
  const [currentPage, setCurrentPage] = useState(1);

  // Menampilkan 4 card per halaman (Mobile: 2x2, Desktop: 1x4)
  const itemsPerPage = 4;

  // Calculate counts per RW dynamically
  const facilityCountByRw = new Map<string, number>();
  facilities.forEach((f) => {
    facilityCountByRw.set(f.rw_id, (facilityCountByRw.get(f.rw_id) || 0) + 1);
  });

  const potentialCountByRw = new Map<string, number>();
  potentials.forEach((p) => {
    potentialCountByRw.set(p.rw_id, (potentialCountByRw.get(p.rw_id) || 0) + 1);
  });

  const filteredRws = rws.filter((rw) => {
    const term = searchTerm.toLowerCase();
    return (
      rw.name.toLowerCase().includes(term) ||
      rw.description.toLowerCase().includes(term) ||
      (rw.leader_name && rw.leader_name.toLowerCase().includes(term)) ||
      rw.rw_id.toLowerCase().includes(term)
    );
  });

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalRtCount = rws.reduce((acc, curr) => acc + (curr.rt_count || 0), 0);

  // Pagination calculation
  const totalItems = filteredRws.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const validPage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (validPage - 1) * itemsPerPage;
  const paginatedRws = filteredRws.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const section = document.getElementById("wilayah");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="wilayah"
      className="py-12 sm:py-20 bg-slate-50/60 backdrop-blur-xs border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header & Search */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 lg:mb-10">
          <div className="max-w-2xl">
            <h2 className="mt-2.5 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Data Rukun Warga ({rws.length} RW)
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Distribusi kewilayahan, jumlah RT ({totalRtCount} RT), aparatur
              RW, serta fasilitas pendukung di Kelurahan Balai Gadang.
            </p>
          </div>

          {/* Search Box */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari RW, ketua, atau deskripsi..."
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7E549E] focus:border-transparent shadow-xs transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full w-5 h-5 flex items-center justify-center transition-colors"
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* RW Cards Grid (Mobile: 2 per baris, Desktop: 4 per baris) */}
        {totalItems > 0 ? (
          <div className="space-y-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 items-stretch">
              {paginatedRws.map((rw) => {
                const facCount = facilityCountByRw.get(rw.rw_id) || 0;
                const potCount = potentialCountByRw.get(rw.rw_id) || 0;

                return (
                  <div
                    key={rw.rw_id}
                    className="bg-white border border-slate-200/90 rounded-2xl p-3.5 sm:p-5 shadow-xs hover:shadow-lg hover:border-[#8F66AC]/50 transition-all duration-300 flex flex-col justify-between group h-full"
                  >
                    <div>
                      {/* Card Top: Badge & RT Count */}
                      <div className="flex items-center justify-between gap-1 mb-2 sm:mb-3">
                        <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-[#7E549E]/10 text-[#633B83] text-[10px] sm:text-xs font-bold border border-[#8F66AC]/30">
                          {rw.rw_id}
                        </span>
                        {rw.rt_count !== undefined && (
                          <span className="text-[10px] sm:text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200/60">
                            {rw.rt_count} RT
                          </span>
                        )}
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#633B83] transition-colors leading-snug line-clamp-1 sm:line-clamp-none">
                        {rw.name}
                      </h3>
                      <p className="mt-1.5 text-[11px] sm:text-xs text-slate-600 leading-relaxed line-clamp-2 sm:line-clamp-3">
                        {rw.description}
                      </p>
                    </div>

                    <div>
                      {/* Leader Details */}
                      {rw.leader_name ? (
                        <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-100 space-y-1 text-[11px] sm:text-xs">
                          <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                            <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#7E549E] flex-shrink-0" />
                            <span className="truncate">
                              Ketua: {rw.leader_name}
                            </span>
                          </div>
                          {rw.phone ? (
                            <div className="flex items-center gap-1.5 text-slate-500 text-[10px] sm:text-[11px]">
                              <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400 flex-shrink-0" />
                              <span className="truncate">{rw.phone}</span>
                            </div>
                          ) : (
                            <div className="text-[10px] text-slate-400 italic">
                              No. kontak -
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-100 text-[10px] sm:text-[11px] text-slate-400 italic">
                          Ketua belum diisi
                        </div>
                      )}

                      {/* Card Footer: Counts & Action Buttons */}
                      <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-100">
                        <div className="grid grid-cols-2 gap-1 sm:gap-2 text-[10px] sm:text-xs text-slate-600 mb-2 sm:mb-3 bg-slate-50 p-1.5 sm:p-2 rounded-xl border border-slate-100">
                          <span className="flex items-center gap-1 justify-center font-medium">
                            <Building2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#7E549E]" />
                            <strong className="text-slate-900">
                              {facCount}
                            </strong>{" "}
                            <span className="hidden sm:inline">Fasilitas</span>
                          </span>
                          <span className="flex items-center gap-1 justify-center font-medium border-l border-slate-200">
                            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FCA228]" />
                            <strong className="text-slate-900">
                              {potCount}
                            </strong>{" "}
                            <span className="hidden sm:inline">Potensi</span>
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <button
                            onClick={() => onSelectRw(rw.rw_id)}
                            className="flex-1 py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg sm:rounded-xl bg-slate-100 hover:bg-[#7E549E]/15 text-slate-700 hover:text-[#633B83] font-semibold text-[11px] sm:text-xs transition-colors text-center cursor-pointer border border-transparent hover:border-[#8F66AC]/30"
                          >
                            Filter
                          </button>
                          <button
                            onClick={() => onNavigateToMap(rw.rw_id)}
                            className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-[#633B83] to-[#7E549E] hover:from-[#7E549E] hover:to-[#633B83] text-white transition-all flex items-center justify-center cursor-pointer shadow-xs hover:shadow-md"
                            title="Lihat RW ini di Peta"
                            aria-label="Lihat RW ini di Peta"
                          >
                            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FCCB5D]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3.5 sm:p-4 bg-white border border-slate-200/90 rounded-2xl shadow-xs">
              <div className="text-xs sm:text-sm text-slate-600 font-medium text-center sm:text-left">
                Menampilkan{" "}
                <span className="font-bold text-slate-900">
                  {startIndex + 1} -{" "}
                  {Math.min(startIndex + itemsPerPage, totalItems)}
                </span>{" "}
                dari{" "}
                <span className="font-bold text-slate-900">{totalItems}</span>{" "}
                RW
              </div>

              {totalPages > 1 && (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handlePageChange(validPage - 1)}
                    disabled={validPage <= 1}
                    className="p-1.5 sm:px-3 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    aria-label="Halaman Sebelumnya"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Sebelumnya</span>
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (pageNum) => {
                        const isActive = pageNum === validPage;
                        if (
                          totalPages > 5 &&
                          pageNum !== 1 &&
                          pageNum !== totalPages &&
                          Math.abs(pageNum - validPage) > 1
                        ) {
                          if (pageNum === 2 || pageNum === totalPages - 1) {
                            return (
                              <span
                                key={pageNum}
                                className="px-1 text-slate-400 text-xs"
                              >
                                ...
                              </span>
                            );
                          }
                          return null;
                        }

                        return (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              isActive
                                ? "bg-gradient-to-r from-[#633B83] to-[#7E549E] text-white shadow-xs"
                                : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      },
                    )}
                  </div>

                  <button
                    onClick={() => handlePageChange(validPage + 1)}
                    disabled={validPage >= totalPages}
                    className="p-1.5 sm:px-3 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    aria-label="Halaman Selanjutnya"
                  >
                    <span className="hidden sm:inline">Selanjutnya</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Empty Search State */
          <div className="bg-white border border-slate-200/90 rounded-2xl p-8 sm:p-12 text-center max-w-md mx-auto shadow-xs">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
              <Layers className="w-6 h-6 text-slate-400" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-800">
              Tidak ada RW yang cocok
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              Tidak ditemukan data yang sesuai dengan pencarian &ldquo;
              {searchTerm}&rdquo;.
            </p>
            <button
              onClick={() => setSearchTerm("")}
              className="mt-4 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Pencarian</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
