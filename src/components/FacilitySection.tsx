import React, { useState, useEffect, useMemo } from "react";
import { FacilityItem, CategoryConfig, RWData } from "../types";
import { FacilityCard } from "./FacilityCard";
import {
  Building2,
  Search,
  RotateCcw,
  SlidersHorizontal,
  MapPin,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface FacilitySectionProps {
  facilities: FacilityItem[];
  categories: CategoryConfig[];
  categoryMap: Map<string, CategoryConfig>;
  rws: RWData[];
  rwMap: Map<string, RWData>;
  onSelectFacility: (facility: FacilityItem) => void;
  onFocusMap: (facility: FacilityItem) => void;
}

export const FacilitySection: React.FC<FacilitySectionProps> = ({
  facilities,
  categories,
  categoryMap,
  rws,
  rwMap,
  onSelectFacility,
  onFocusMap,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRw, setSelectedRw] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  // Deteksi ukuran layar untuk menentukan jumlah item per halaman secara dinamis
  // Mobile: 4 item (2 baris x 2 kolom)
  // Desktop: 6 item (2 baris x 3 kolom)
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const itemsPerPage = isMobile ? 4 : 6;

  // Optimasi filter menggunakan useMemo
  const filteredFacilities = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    return facilities.filter((fac) => {
      const matchesSearch =
        !term ||
        fac.name?.toLowerCase().includes(term) ||
        fac.address?.toLowerCase().includes(term) ||
        fac.description?.toLowerCase().includes(term);

      const matchesCategory =
        !selectedCategory || fac.category === selectedCategory;
      const matchesRw = !selectedRw || fac.rw_id === selectedRw;

      return matchesSearch && matchesCategory && matchesRw;
    });
  }, [facilities, searchTerm, selectedCategory, selectedRw]);

  // Reset ke halaman 1 ketika opsi filter berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedRw]);

  const handleReset = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedRw("");
    setCurrentPage(1);
  };

  const isFiltered = Boolean(searchTerm || selectedCategory || selectedRw);

  const totalItems = filteredFacilities.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const validPage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (validPage - 1) * itemsPerPage;

  const paginatedFacilities = useMemo(() => {
    return filteredFacilities.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredFacilities, startIndex, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const section = document.getElementById("fasilitas");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Logika Smart Pagination
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (validPage > 3) pages.push("...left");

      const start = Math.max(2, validPage - 1);
      const end = Math.min(totalPages - 1, validPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (validPage < totalPages - 2) pages.push("...right");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <section
      id="fasilitas"
      className="relative lg:min-h-screen w-full flex flex-col justify-center bg-[#0B0F19] text-white overflow-hidden py-14 lg:py-16 border-b border-white/5"
    >
      {/* Background Accent Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] -left-[10%] w-[400px] h-[400px] rounded-full bg-[#633B83]/15 blur-[120px]" />
        <div className="absolute bottom-[20%] -right-[10%] w-[400px] h-[400px] rounded-full bg-[#FCA228]/10 blur-[100px]" />
      </div>

      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 w-full flex flex-col z-10">
        {/* ==========================================
            HEADER & FILTER BAR
            ========================================== */}
        <div className="flex flex-col gap-3.5 mb-4 lg:mb-5 flex-shrink-0">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Fasilitas Publik{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FCA228] to-[#FCCB5D]">
                  ({facilities.length})
                </span>
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl">
                Daftar sarana pemerintahan, kesehatan, pendidikan, ibadah, dan
                infrastruktur umum di Kelurahan Balai Gadang.
              </p>
            </div>
          </div>

          <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-2.5 shadow-sm">
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2.5">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari fasilitas atau alamat..."
                  aria-label="Cari fasilitas atau alamat"
                  className="w-full pl-10 pr-9 py-2 bg-white/[0.05] border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#FCA228]/60 transition-all"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 md:flex items-center gap-2 md:w-auto">
                <div className="relative md:w-44">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    aria-label="Filter berdasarkan Kategori"
                    className="w-full pl-3 pr-7 py-2 bg-white/[0.05] border border-white/10 rounded-xl text-xs text-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-[#FCA228]/60 transition-all appearance-none cursor-pointer truncate"
                  >
                    <option value="" className="bg-slate-900 text-white">
                      Semua Kategori
                    </option>
                    {categories.map((cat) => (
                      <option
                        key={cat.id}
                        value={cat.id}
                        className="bg-slate-900 text-white"
                      >
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                <div className="relative md:w-44">
                  <select
                    value={selectedRw}
                    onChange={(e) => setSelectedRw(e.target.value)}
                    aria-label="Filter berdasarkan Wilayah RW"
                    className="w-full pl-3 pr-7 py-2 bg-white/[0.05] border border-white/10 rounded-xl text-xs text-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-[#FCA228]/60 transition-all appearance-none cursor-pointer truncate"
                  >
                    <option value="" className="bg-slate-900 text-white">
                      Semua Wilayah ({rws.length} RW)
                    </option>
                    {rws.map((rw) => (
                      <option
                        key={rw.rw_id}
                        value={rw.rw_id}
                        className="bg-slate-900 text-white"
                      >
                        {rw.rw_id} — {rw.name}
                      </option>
                    ))}
                  </select>
                  <MapPin className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {isFiltered && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ==========================================
            MAIN CONTENT - Grid Responsif (grid-cols-2 di Mobile, lg:grid-cols-3 di Desktop)
            ========================================== */}
        {totalItems > 0 ? (
          <div className="flex flex-col gap-3.5">
            {/* Grid Kartu: 2 Kolom di Mobile (4 card), 3 Kolom di Desktop (6 card) */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 items-stretch">
              {paginatedFacilities.map((facility) => (
                <div
                  key={facility.facility_id}
                  className="flex flex-col h-full w-full [&>*]:h-full [&>*]:flex [&>*]:flex-col [&>*]:justify-between"
                >
                  <FacilityCard
                    facility={facility}
                    category={categoryMap.get(facility.category)}
                    rw={rwMap.get(facility.rw_id)}
                    onSelect={onSelectFacility}
                    onFocusMap={onFocusMap}
                  />
                </div>
              ))}
            </div>

            {/* Pagination Bar Bawah (Dengan Smart Ellipsis) */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-2.5 sm:p-3 bg-white/[0.03] border border-white/10 rounded-2xl backdrop-blur-md flex-shrink-0">
              <div className="text-[11px] sm:text-xs text-slate-400 font-medium text-center sm:text-left">
                Menampilkan{" "}
                <strong className="text-white">
                  {startIndex + 1} -{" "}
                  {Math.min(startIndex + itemsPerPage, totalItems)}
                </strong>{" "}
                dari <strong className="text-white">{totalItems}</strong>{" "}
                fasilitas
              </div>

              {totalPages > 1 && (
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handlePageChange(validPage - 1)}
                    disabled={validPage <= 1}
                    className="px-2.5 py-1.5 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Sebelumnya</span>
                  </button>

                  <div className="flex items-center gap-1">
                    {getPageNumbers().map((item, idx) => {
                      if (typeof item === "string") {
                        return (
                          <span
                            key={`ellipsis-${idx}`}
                            className="px-1 text-slate-500 text-xs"
                          >
                            ...
                          </span>
                        );
                      }

                      const isActive = item === validPage;
                      return (
                        <button
                          key={`page-${item}`}
                          type="button"
                          onClick={() => handlePageChange(item)}
                          className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            isActive
                              ? "bg-gradient-to-r from-[#FCA228] to-[#FCB739] text-slate-950 shadow-sm"
                              : "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10"
                          }`}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => handlePageChange(validPage + 1)}
                    disabled={validPage >= totalPages}
                    className="px-2.5 py-1.5 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span className="hidden sm:inline">Selanjutnya</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center py-16">
            <div className="bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-2xl p-8 text-center max-w-sm w-full shadow-xl">
              <Building2 className="w-8 h-8 text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-white mb-1">
                Tidak Ada Fasilitas
              </h3>
              <p className="text-xs text-slate-400 mb-5">
                Tidak ditemukan data yang sesuai dengan filter.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FCA228] to-[#FCB739] text-slate-950 text-xs font-extrabold inline-flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset Filter
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
