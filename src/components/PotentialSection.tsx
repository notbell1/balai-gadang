import React, { useState, useEffect } from "react";
import { PotentialItem, CategoryConfig, RWData } from "../types";
import {
  Sparkles,
  MapPin,
  User,
  Search,
  RotateCcw,
  Tag,
  ChevronLeft,
  ChevronRight,
  X,
  SlidersHorizontal,
} from "lucide-react";

interface PotentialSectionProps {
  potentials: PotentialItem[];
  categories: CategoryConfig[];
  categoryMap: Map<string, CategoryConfig>;
  rws: RWData[];
  rwMap: Map<string, RWData>;
  onSelectPotential: (potential: PotentialItem) => void;
  onFocusMap: (potential: PotentialItem) => void;
}

export const PotentialSection: React.FC<PotentialSectionProps> = ({
  potentials,
  categories,
  categoryMap,
  rws,
  rwMap,
  onSelectPotential,
  onFocusMap,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRw, setSelectedRw] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;

  const filteredPotentials = potentials.filter((pot) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      pot.name.toLowerCase().includes(term) ||
      pot.address.toLowerCase().includes(term) ||
      pot.description.toLowerCase().includes(term) ||
      (pot.highlight_info && pot.highlight_info.toLowerCase().includes(term));

    const matchesCategory =
      !selectedCategory || pot.category === selectedCategory;
    const matchesRw = !selectedRw || pot.rw_id === selectedRw;

    return matchesSearch && matchesCategory && matchesRw;
  });

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

  const totalItems = filteredPotentials.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const validPage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (validPage - 1) * itemsPerPage;
  const paginatedPotentials = filteredPotentials.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const section = document.getElementById("potensi");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="potensi"
      /* scroll-mt-20 (Mobile) & scroll-mt-24 (Desktop) mencegah header tertutup Navbar saat di-scroll */
      className="scroll-mt-12 sm:scroll-mt-8 py-6 sm:py-10 bg-white/70 backdrop-blur-xs border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Compact */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-4">
          <div className="max-w-2xl">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Potensi Unggulan ({potentials.length})
            </h2>
            <p className="mt-0.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Jelajahi beragam potensi unggulan Kelurahan Balai Gadang, mulai
              dari wisata alam, agrowisata, pembibitan, hingga UMKM masyarakat.
            </p>
          </div>
        </div>

        {/* Compact & Professional Filter Bar */}
        <div className="bg-slate-50/80 backdrop-blur-md border border-slate-200/80 rounded-xl p-2 sm:p-2.5 mb-4 shadow-2xs">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari potensi, UMKM, lokasi..."
                className="w-full pl-8 pr-7 py-1.5 h-9 bg-white border border-slate-200 rounded-lg text-xs placeholder-slate-400 focus:outline-none focus:border-[#7E549E] focus:ring-2 focus:ring-[#633B83]/15 transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
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

        {/* Potentials Cards Grid */}
        {totalItems > 0 ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 items-stretch">
              {paginatedPotentials.map((pot) => {
                const category = categoryMap.get(pot.category);
                const rw = rwMap.get(pot.rw_id);

                return (
                  <div
                    key={pot.potential_id}
                    className="h-full bg-white border border-[#FCA228]/30 rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-[#FCA228] transition-all flex flex-col justify-between group"
                  >
                    <div className="flex flex-col flex-1">
                      {/* Fixed Aspect Ratio Photo */}
                      <div className="relative aspect-[16/9] bg-slate-100 overflow-hidden flex-shrink-0">
                        <img
                          src={pot.photo}
                          alt={pot.name}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "/images/potentials/tanaman-hias.jpg";
                          }}
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#FCA228] text-slate-950 shadow-xs flex items-center gap-1 uppercase tracking-wide">
                          <Sparkles className="w-2.5 h-2.5 text-slate-950 flex-shrink-0" />
                          <span className="truncate max-w-[80px] sm:max-w-none">
                            {category?.name || pot.category}
                          </span>
                        </span>

                        <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-900/80 text-white backdrop-blur-xs shadow-xs">
                          {rw?.name || pot.rw_id}
                        </span>
                      </div>

                      {/* Card Content with Fixed Heights */}
                      <div className="p-3 sm:p-4 flex flex-col flex-1">
                        {/* Title Fixed 2 Lines */}
                        <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#633B83] transition-colors leading-snug line-clamp-2 h-[2.25rem] sm:h-[2.5rem]">
                          {pot.name}
                        </h3>

                        {/* Highlight Tag Container */}
                        <div className="mt-1.5 h-5 flex items-center">
                          {pot.highlight_info ? (
                            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#FCA228]/15 text-[#633B83] border border-[#FCA228]/30 text-[10px] sm:text-xs font-semibold max-w-full">
                              <Tag className="w-3 h-3 text-[#FCA228] flex-shrink-0" />
                              <span className="truncate">
                                {pot.highlight_info}
                              </span>
                            </div>
                          ) : null}
                        </div>

                        {/* Address Line */}
                        <div className="mt-2 flex items-center gap-1 text-[11px] sm:text-xs text-slate-500 h-4">
                          <MapPin className="w-3 h-3 text-[#FCA228] flex-shrink-0" />
                          <span className="truncate">{pot.address}</span>
                        </div>

                        {/* Description Fixed 2 Lines */}
                        <p className="mt-2 text-[11px] sm:text-xs text-slate-600 leading-relaxed line-clamp-2 h-[2.1rem] sm:h-[2.25rem]">
                          {pot.description}
                        </p>

                        {/* Contact Person Container */}
                        <div className="mt-auto pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-600 h-6">
                          {pot.contact_person ? (
                            <>
                              <User className="w-3 h-3 text-[#7E549E] flex-shrink-0" />
                              <span className="truncate font-medium">
                                {pot.contact_person}
                              </span>
                            </>
                          ) : (
                            <span className="text-slate-400 italic text-[10px]">
                              Kontak tidak tersedia
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Footer Action Buttons */}
                    <div className="p-3 sm:p-4 pt-0 flex items-center gap-1.5 flex-shrink-0">
                      <button
                        onClick={() => onSelectPotential(pot)}
                        className="flex-1 py-1.5 px-2 rounded-xl bg-[#FCA228]/10 hover:bg-[#FCA228]/20 active:bg-[#FCA228]/30 text-[#633B83] text-[11px] sm:text-xs font-bold transition-colors text-center border border-[#FCA228]/30 cursor-pointer truncate"
                      >
                        Detail
                      </button>
                      <button
                        onClick={() => onFocusMap(pot)}
                        className="py-1.5 px-2.5 rounded-xl bg-gradient-to-r from-[#633B83] to-[#7E549E] hover:from-[#7E549E] hover:to-[#633B83] text-white text-[11px] sm:text-xs font-semibold transition-colors flex items-center gap-1 shadow-2xs cursor-pointer"
                        title="Fokus di Peta"
                      >
                        <MapPin className="w-3 h-3 text-[#FCCB5D]" />
                        <span className="hidden sm:inline">Peta</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Ultra-Compact Pagination Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-2 px-3 bg-slate-50 border border-slate-200/80 rounded-xl shadow-2xs">
              <div className="text-[11px] sm:text-xs text-slate-500 font-medium text-center sm:text-left">
                Menampilkan{" "}
                <span className="font-bold text-slate-800">
                  {startIndex + 1}-
                  {Math.min(startIndex + itemsPerPage, totalItems)}
                </span>{" "}
                dari{" "}
                <span className="font-bold text-slate-800">{totalItems}</span>{" "}
                potensi
              </div>

              {totalPages > 1 && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handlePageChange(validPage - 1)}
                    disabled={validPage <= 1}
                    className="p-1 px-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-[11px] font-semibold flex items-center gap-0.5 cursor-pointer"
                    aria-label="Halaman Sebelumnya"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
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
                                className="px-0.5 text-slate-400 text-[10px]"
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
                            className={`w-7 h-7 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                              isActive
                                ? "bg-gradient-to-r from-[#633B83] to-[#7E549E] text-white shadow-2xs"
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
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-12 text-center max-w-md mx-auto shadow-xs">
            <div className="w-12 h-12 rounded-full bg-slate-200/60 flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6 text-[#FCA228]" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-800">
              Tidak ada potensi yang cocok
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              Coba sesuaikan kata kunci pencarian atau bersihkan filter.
            </p>
            <button
              onClick={handleReset}
              className="mt-4 px-4 py-2 rounded-xl bg-gradient-to-r from-[#633B83] to-[#7E549E] text-white text-xs font-semibold hover:from-[#7E549E] hover:to-[#633B83] transition-colors cursor-pointer"
            >
              Tampilkan Semua Potensi
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
