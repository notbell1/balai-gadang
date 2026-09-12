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
  const itemsPerPage = 3;

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
      className="py-16 sm:py-24 bg-white/70 backdrop-blur-xs border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs sm:text-sm font-bold text-[#633B83] tracking-wider uppercase bg-[#7E549E]/15 px-3 py-1 rounded-full border border-[#8F66AC]/30 inline-flex items-center gap-1.5 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#FCA228]" />
              <span>Pemberdayaan &amp; Daya Saing</span>
            </span>
            <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Potensi Unggulan ({potentials.length})
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
              Jelajahi beragam potensi unggulan Kelurahan Balai Gadang, mulai
              dari wisata alam dan pemandian, area camping dan akomodasi,
              agrowisata, pembibitan tanaman dan perikanan, hingga pusat
              perdagangan serta UMKM masyarakat.
            </p>
          </div>

          {isFiltered && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold self-start transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filter</span>
            </button>
          )}
        </div>

        {/* Filter Bar */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5 mb-8 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari potensi, UMKM, wisata..."
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7E549E]"
              />
            </div>

            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#7E549E] font-medium"
              >
                <option value="">Semua Kategori Potensi</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={selectedRw}
                onChange={(e) => setSelectedRw(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#7E549E] font-medium"
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

        {/* Potentials Cards Grid - 3 items per view */}
        {totalItems > 0 && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedPotentials.map((pot) => {
                const category = categoryMap.get(pot.category);
                const rw = rwMap.get(pot.rw_id);

                return (
                  <div
                    key={pot.potential_id}
                    className="bg-white border border-[#FCA228]/30 rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-[#FCA228] transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Photo with Accent */}
                      <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
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
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-bold bg-[#FCA228] text-slate-950 shadow-sm flex items-center gap-1 uppercase tracking-wide">
                          <Sparkles className="w-3 h-3 text-slate-950" />
                          <span>{category?.name || pot.category}</span>
                        </span>

                        <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-900/80 text-white backdrop-blur-xs shadow-sm">
                          {rw?.name || pot.rw_id}
                        </span>
                      </div>

                      {/* Body */}
                      <div className="p-5">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#633B83] transition-colors leading-snug line-clamp-2">
                          {pot.name}
                        </h3>

                        {pot.highlight_info && (
                          <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FCA228]/15 text-[#633B83] border border-[#FCA228]/30 text-xs font-semibold">
                            <Tag className="w-3.5 h-3.5 text-[#FCA228]" />
                            <span>{pot.highlight_info}</span>
                          </div>
                        )}

                        <div className="mt-2.5 flex items-start gap-1.5 text-xs text-slate-500">
                          <MapPin className="w-3.5 h-3.5 text-[#FCA228] flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{pot.address}</span>
                        </div>

                        <p className="mt-3 text-xs text-slate-600 leading-relaxed line-clamp-3">
                          {pot.description}
                        </p>

                        {pot.contact_person && (
                          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-600">
                            <User className="w-3.5 h-3.5 text-[#7E549E] flex-shrink-0" />
                            <span className="truncate font-medium">
                              {pot.contact_person}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-5 pt-0 flex items-center gap-2">
                      <button
                        onClick={() => onSelectPotential(pot)}
                        className="flex-1 py-2 px-3 rounded-xl bg-[#FCA228]/10 hover:bg-[#FCA228]/20 active:bg-[#FCA228]/30 text-[#633B83] text-xs font-bold transition-colors text-center border border-[#FCA228]/30 cursor-pointer"
                      >
                        Lihat Detail Potensi
                      </button>
                      <button
                        onClick={() => onFocusMap(pot)}
                        className="py-2 px-3 rounded-xl bg-gradient-to-r from-[#633B83] to-[#7E549E] hover:from-[#7E549E] hover:to-[#633B83] text-white text-xs font-semibold transition-colors flex items-center gap-1 shadow-2xs cursor-pointer"
                        title="Fokus di Peta"
                      >
                        <MapPin className="w-3.5 h-3.5 text-[#FCCB5D]" />
                        <span className="hidden sm:inline">Peta</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-slate-50 border border-slate-200/90 rounded-2xl shadow-xs">
              <div className="text-xs sm:text-sm text-slate-600 font-medium">
                Menampilkan{" "}
                <span className="font-bold text-slate-900">
                  {startIndex + 1} -{" "}
                  {Math.min(startIndex + itemsPerPage, totalItems)}
                </span>{" "}
                dari{" "}
                <span className="font-bold text-slate-900">{totalItems}</span>{" "}
                potensi
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

        {/* Empty State */}
        {totalItems === 0 && (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-10 text-center max-w-lg mx-auto shadow-xs">
            <Sparkles className="w-10 h-10 text-[#FCA228]/50 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">
              Tidak ada potensi yang cocok
            </h3>
            <p className="text-xs text-slate-500 mt-1">
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
