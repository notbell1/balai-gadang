import React, { useState, useEffect, useMemo } from "react";
import { FacilityItem, CategoryConfig, RWData } from "../types";
import { FacilityCard } from "./FacilityCard";
import {
  Building2,
  Search,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  X,
  SlidersHorizontal,
  MapPin,
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

  const itemsPerPage = 4;

  // Optimasi filter menggunakan useMemo agar tidak di-recompute secara berlebihan
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

  // Logika pembentukan array tombol halaman yang aman dan rapi
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
      className="scroll-mt-12 sm:scroll-mt-8 py-6 sm:py-10 bg-slate-50/60 backdrop-blur-xs border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Compact */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-4">
          <div className="max-w-2xl">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Fasilitas Publik ({facilities.length})
            </h2>
            <p className="mt-0.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Daftar sarana pemerintahan, kesehatan, pendidikan, ibadah, dan
              infrastruktur umum di Balai Gadang.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-xl p-2 sm:p-2.5 mb-4 shadow-xs">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari fasilitas atau alamat..."
                aria-label="Cari fasilitas atau alamat"
                className="w-full pl-8 pr-7 py-1.5 h-9 bg-white border border-slate-200 rounded-lg text-xs placeholder-slate-400 focus:outline-none focus:border-[#7E549E] focus:ring-2 focus:ring-[#633B83]/15 transition-all"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                  aria-label="Hapus kata kunci pencarian"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Select Controls Container */}
            <div className="grid grid-cols-2 md:flex items-center gap-2 md:w-auto">
              <div className="relative md:w-44">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  aria-label="Filter berdasarkan Kategori"
                  className="w-full pl-2.5 pr-7 py-1.5 h-9 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 font-medium focus:outline-none focus:border-[#7E549E] focus:ring-2 focus:ring-[#633B83]/15 transition-all appearance-none cursor-pointer truncate"
                >
                  <option value="">Semua Kategori</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <SlidersHorizontal className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              <div className="relative md:w-44">
                <select
                  value={selectedRw}
                  onChange={(e) => setSelectedRw(e.target.value)}
                  aria-label="Filter berdasarkan Wilayah RW"
                  className="w-full pl-2.5 pr-7 py-1.5 h-9 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 font-medium focus:outline-none focus:border-[#7E549E] focus:ring-2 focus:ring-[#633B83]/15 transition-all appearance-none cursor-pointer truncate"
                >
                  <option value="">Semua Wilayah ({rws.length} RW)</option>
                  {rws.map((rw) => (
                    <option key={rw.rw_id} value={rw.rw_id}>
                      {rw.rw_id} — {rw.name}
                    </option>
                  ))}
                </select>
                <MapPin className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {isFiltered && (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-1 px-3 h-9 rounded-lg bg-slate-200/60 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
                title="Reset Semua Filter"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Grid */}
        {totalItems > 0 ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 items-stretch">
              {paginatedFacilities.map((facility) => (
                <FacilityCard
                  key={facility.facility_id}
                  facility={facility}
                  category={categoryMap.get(facility.category)}
                  rw={rwMap.get(facility.rw_id)}
                  onSelect={onSelectFacility}
                  onFocusMap={onFocusMap}
                />
              ))}
            </div>

            {/* Pagination Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-2 px-3 bg-white border border-slate-200/80 rounded-xl shadow-xs">
              <div className="text-[11px] sm:text-xs text-slate-500 font-medium text-center sm:text-left">
                Menampilkan{" "}
                <span className="font-bold text-slate-800">
                  {startIndex + 1}-
                  {Math.min(startIndex + itemsPerPage, totalItems)}
                </span>{" "}
                dari{" "}
                <span className="font-bold text-slate-800">{totalItems}</span>{" "}
                fasilitas
              </div>

              {totalPages > 1 && (
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handlePageChange(validPage - 1)}
                    disabled={validPage <= 1}
                    className="p-1 px-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-[11px] font-semibold flex items-center gap-0.5 cursor-pointer"
                    aria-label="Halaman Sebelumnya"
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
                            className="px-0.5 text-slate-400 text-[10px]"
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
                          className={`w-7 h-7 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                            isActive
                              ? "bg-gradient-to-r from-[#633B83] to-[#7E549E] text-white shadow-xs"
                              : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
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
                    className="p-1 px-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-[11px] font-semibold flex items-center gap-0.5 cursor-pointer"
                    aria-label="Halaman Selanjutnya"
                  >
                    <span className="hidden sm:inline">Selanjutnya</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 text-center max-w-md mx-auto shadow-xs">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
              <Building2 className="w-6 h-6 text-slate-400" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-800">
              Tidak ada fasilitas yang sesuai
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              Silakan sesuaikan kata kunci pencarian, kategori, atau filter RW
              Anda.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-4 px-4 py-2 rounded-xl bg-gradient-to-r from-[#633B83] to-[#7E549E] text-white text-xs font-semibold hover:from-[#7E549E] hover:to-[#633B83] transition-colors cursor-pointer"
            >
              Tampilkan Semua Fasilitas
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
