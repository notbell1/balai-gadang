import React, { useState, useEffect } from "react";
import { FacilityItem, CategoryConfig, RWData } from "../types";
import { FacilityCard } from "./FacilityCard";
import {
  Building2,
  Search,
  RotateCcw,
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
  const itemsPerPage = 3;

  // Filter facilities
  const filteredFacilities = facilities.filter((fac) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      fac.name.toLowerCase().includes(term) ||
      fac.address.toLowerCase().includes(term) ||
      fac.description.toLowerCase().includes(term);

    const matchesCategory =
      !selectedCategory || fac.category === selectedCategory;
    const matchesRw = !selectedRw || fac.rw_id === selectedRw;

    return matchesSearch && matchesCategory && matchesRw;
  });

  // Reset page when filters change
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

  // Pagination calculation
  const totalItems = filteredFacilities.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const validPage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (validPage - 1) * itemsPerPage;
  const paginatedFacilities = filteredFacilities.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to facilities section top if needed
    const section = document.getElementById("fasilitas");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="fasilitas"
      className="py-16 sm:py-24 bg-slate-50/60 backdrop-blur-xs border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs sm:text-sm font-bold text-[#633B83] tracking-wider uppercase bg-[#7E549E]/15 px-3 py-1 rounded-full border border-[#8F66AC]/30 inline-flex items-center gap-1.5 shadow-2xs">
              <Building2 className="w-3.5 h-3.5 text-[#FCA228]" />
              <span>Katalog Fasilitas</span>
            </span>
            <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Fasilitas Publik ({facilities.length})
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
              Daftar sarana pemerintahan, kesehatan, pendidikan, ibadah, dan
              infrastruktur umum di Balai Gadang.
            </p>
          </div>

          {isFiltered && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold self-start shadow-xs transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filter</span>
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 mb-8 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari fasilitas atau alamat..."
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7E549E] focus:bg-white"
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#7E549E] focus:bg-white font-medium"
              >
                <option value="">Semua Kategori Fasilitas</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Dynamic RW Filter */}
            <div>
              <select
                value={selectedRw}
                onChange={(e) => setSelectedRw(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#7E549E] focus:bg-white font-medium"
              >
                <option value="">Semua Wilayah ({rws.length} RW)</option>
                {rws.map((rw) => (
                  <option key={rw.rw_id} value={rw.rw_id}>
                    {rw.rw_id} — {rw.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Grid - 3 items per view */}
        {totalItems > 0 && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                fasilitas
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
                        // Show first, last, and around current page
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

        {/* Empty State */}
        {totalItems === 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center max-w-lg mx-auto shadow-xs">
            <Building2 className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">
              Tidak ada fasilitas yang sesuai
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Silakan sesuaikan kata kunci pencarian, kategori, atau filter RW
              Anda.
            </p>
            <button
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
