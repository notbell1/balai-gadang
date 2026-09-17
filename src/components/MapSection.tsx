import React from "react";
import { MapView } from "./MapView";
import { MapLegend } from "./MapLegend";
import { CategoryConfig, RWData, UnifiedEntity, FilterState } from "../types";
import {
  Search,
  RotateCcw,
  Sparkles,
  Building2,
  X,
  ChevronDown,
} from "lucide-react";

interface MapSectionProps {
  entities: UnifiedEntity[];
  filteredEntities: UnifiedEntity[];
  categories: CategoryConfig[];
  categoryMap: Map<string, CategoryConfig>;
  rws: RWData[];
  geoJson: GeoJSON.FeatureCollection | null;
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  selectedEntityId: string | null;
  onSelectEntity: (entity: UnifiedEntity) => void;
}

export const MapSection: React.FC<MapSectionProps> = ({
  entities,
  filteredEntities,
  categories,
  categoryMap,
  rws,
  geoJson,
  filters,
  onFilterChange,
  onResetFilters,
  selectedEntityId,
  onSelectEntity,
}) => {
  const activeFiltersCount =
    (filters.search ? 1 : 0) +
    (filters.category ? 1 : 0) +
    (filters.rw_id ? 1 : 0) +
    (filters.entityType !== "all" ? 1 : 0);

  return (
    <section
      id="peta"
      className="scroll-mt-[60px] relative py-10 lg:py-14 bg-slate-50 overflow-hidden border-b border-slate-200/80"
    >
      {/* Decorative Background Minimalis */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ==========================================
            HEADER SECTION (Kompak & 1 Baris)
            ========================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-5">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight mb-1.5 truncate whitespace-normal">
              Peta Interaktif Kelurahan Balai Gadang
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
              Eksplorasi sebaran fasilitas publik, sarana kesehatan, titik
              mitigasi bencana, serta persebaran potensi UMKM dan agrowisata.
            </p>
          </div>

          {activeFiltersCount > 0 && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold transition-colors border border-rose-100 shrink-0 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filter ({activeFiltersCount})</span>
            </button>
          )}
        </div>

        {/* ==========================================
            COMPACT FILTER BAR
            ========================================== */}
        <div className="bg-white rounded-2xl p-3 mb-6 shadow-sm border border-slate-200/80 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
            {/* 1. Search Bar (Span 3) */}
            <div className="lg:col-span-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => onFilterChange({ search: e.target.value })}
                  placeholder="Cari lokasi, fasilitas..."
                  className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7E549E]/50 focus:border-[#7E549E] transition-all"
                />
                {filters.search && (
                  <button
                    onClick={() => onFilterChange({ search: "" })}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 bg-slate-200 hover:bg-slate-300 rounded-full w-4 h-4 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* 2. Entity Type Switcher (Span 4) */}
            <div className="lg:col-span-4">
              <div className="flex p-0.5 bg-slate-100 rounded-xl border border-slate-200/60">
                <button
                  onClick={() => onFilterChange({ entityType: "all" })}
                  className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all duration-300 cursor-pointer ${
                    filters.entityType === "all"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Semua
                </button>
                <button
                  onClick={() => onFilterChange({ entityType: "facility" })}
                  className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
                    filters.entityType === "facility"
                      ? "bg-gradient-to-r from-[#633B83] to-[#7E549E] text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <Building2
                    className={`w-3 h-3 ${filters.entityType === "facility" ? "text-[#FCCB5D]" : "text-slate-400"}`}
                  />
                  <span>Fasilitas</span>
                </button>
                <button
                  onClick={() => onFilterChange({ entityType: "potential" })}
                  className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
                    filters.entityType === "potential"
                      ? "bg-gradient-to-r from-[#FCA228] to-[#FCB739] text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <Sparkles
                    className={`w-3 h-3 ${filters.entityType === "potential" ? "text-slate-900" : "text-slate-400"}`}
                  />
                  <span>Potensi</span>
                </button>
              </div>
            </div>

            {/* 3. RW Dropdown (Span 2) */}
            <div className="lg:col-span-2">
              <div className="relative">
                <select
                  value={filters.rw_id}
                  onChange={(e) => onFilterChange({ rw_id: e.target.value })}
                  className="w-full appearance-none pl-3 pr-7 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#7E549E]/50 focus:border-[#7E549E] font-semibold transition-all cursor-pointer"
                >
                  <option value="">Semua RW</option>
                  {rws.map((rw) => (
                    <option key={rw.rw_id} value={rw.rw_id}>
                      {rw.rw_id} ({rw.name.replace(/RW\s*/i, "")})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* 4. Category Dropdown (Span 3) */}
            <div className="lg:col-span-3">
              <div className="relative">
                <select
                  value={filters.category}
                  onChange={(e) => onFilterChange({ category: e.target.value })}
                  className="w-full appearance-none pl-3 pr-7 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#7E549E]/50 focus:border-[#7E549E] font-semibold transition-all cursor-pointer"
                >
                  <option value="">Semua Kategori</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            MAP & LEGEND LAYOUT (Compact Height)
            ========================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Main Map Container - Kurangi tinggi agar hemat halaman */}
          <div className="lg:col-span-8 xl:col-span-9 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm relative z-10 h-[400px] sm:h-[450px] lg:h-[550px]">
            <MapView
              entities={filteredEntities}
              categories={categories}
              categoryMap={categoryMap}
              geoJson={geoJson}
              selectedEntityId={selectedEntityId}
              onSelectEntity={onSelectEntity}
              activeRwId={filters.rw_id}
            />
          </div>

          {/* Side Compact Legend */}
          <div className="lg:col-span-4 xl:col-span-3 relative z-10">
            <div className="sticky top-20">
              <MapLegend
                categories={categories}
                entities={entities}
                selectedCategory={filters.category}
                onSelectCategory={(catId) =>
                  onFilterChange({ category: catId })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
