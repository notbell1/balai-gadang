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
  const itemsPerPage = 3;

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
      className="py-16 sm:py-24 bg-slate-50/60 backdrop-blur-xs border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <span className="text-xs sm:text-sm font-bold text-[#633B83] tracking-wider uppercase bg-[#7E549E]/15 px-3 py-1 rounded-full border border-[#8F66AC]/30 inline-flex items-center gap-1.5 shadow-2xs">
              <Layers className="w-3.5 h-3.5 text-[#FCA228]" />
              <span>Struktur Wilayah</span>
            </span>
            <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Data Rukun Warga ({rws.length} RW)
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
              Distribusi kewilayahan, jumlah RT ({totalRtCount} RT), aparatur
              RW, serta fasilitas di Balai Gadang.
            </p>
          </div>

          {/* Search Box */}
          <div className="w-full md:w-72">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari RW atau nama wilayah..."
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7E549E] shadow-xs"
              />
            </div>
          </div>
        </div>

        {/* RW Cards Grid - 3 items per view */}
        {totalItems > 0 && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedRws.map((rw) => {
                const facCount = facilityCountByRw.get(rw.rw_id) || 0;
                const potCount = potentialCountByRw.get(rw.rw_id) || 0;

                return (
                  <div
                    key={rw.rw_id}
                    className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-[#8F66AC]/50 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top Badge & Number */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="px-2.5 py-1 rounded-lg bg-[#7E549E]/10 text-[#633B83] text-xs font-bold border border-[#8F66AC]/30">
                          {rw.rw_id}
                        </span>
                        {rw.rt_count !== undefined && (
                          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                            {rw.rt_count} RT
                          </span>
                        )}
                      </div>

                      {/* RW Title & Description */}
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#633B83] transition-colors">
                        {rw.name}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                        {rw.description}
                      </p>

                      {/* Leader info if available */}
                      {rw.leader_name && (
                        <div className="mt-3.5 pt-3 border-t border-slate-100 space-y-1 text-xs text-slate-600">
                          <div className="flex items-center gap-1.5 font-medium text-slate-700">
                            <Users className="w-3.5 h-3.5 text-[#7E549E]" />
                            <span>Ketua: {rw.leader_name}</span>
                          </div>
                          {rw.phone && (
                            <div className="flex items-center gap-1.5 text-slate-500">
                              <Phone className="w-3.5 h-3.5 text-slate-400" />
                              <span>{rw.phone}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Bottom Counts & CTA */}
                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5 text-[#7E549E]" />
                          <strong>{facCount}</strong> Fasilitas
                        </span>
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-[#FCA228]" />
                          <strong>{potCount}</strong> Potensi
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onSelectRw(rw.rw_id)}
                          className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-[#7E549E]/10 text-slate-700 hover:text-[#633B83] font-semibold text-xs transition-colors text-center cursor-pointer"
                        >
                          Filter Data
                        </button>
                        <button
                          onClick={() => onNavigateToMap(rw.rw_id)}
                          className="p-2 rounded-xl bg-gradient-to-r from-[#633B83] to-[#7E549E] hover:from-[#7E549E] hover:to-[#633B83] text-white transition-colors flex items-center justify-center cursor-pointer shadow-xs"
                          title="Lihat RW ini di Peta"
                          aria-label="Lihat RW ini di Peta"
                        >
                          <MapPin className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white border border-slate-200/90 rounded-2xl shadow-xs">
              <div className="text-xs sm:text-sm text-slate-600 font-medium">
                Menampilkan{" "}
                <span className="font-bold text-slate-900">
                  {startIndex + 1} -{" "}
                  {Math.min(startIndex + itemsPerPage, totalItems)}
                </span>{" "}
                dari{" "}
                <span className="font-bold text-slate-900">{totalItems}</span>{" "}
                Rukun Warga
              </div>

              {totalPages > 1 && (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handlePageChange(validPage - 1)}
                    disabled={validPage <= 1}
                    className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-xs font-semibold flex items-center gap-1 cursor-pointer"
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
                            className={`w-8 h-8 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
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
                    className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    aria-label="Halaman Selanjutnya"
                  >
                    <span className="hidden sm:inline">Selanjutnya</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {totalItems === 0 && (
          <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-8 text-center max-w-md mx-auto shadow-xs">
            <Layers className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700">
              Tidak ada RW yang cocok
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Coba gunakan kata kunci pencarian yang lain.
            </p>
            <button
              onClick={() => setSearchTerm("")}
              className="mt-3 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700"
            >
              Reset Pencarian
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
