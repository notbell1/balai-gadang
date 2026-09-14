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
      /* Scroll Margin-Top: Mobile 12px, Desktop 8px */
      className="scroll-mt-[30px] sm:scroll-mt-[30px] py-5 sm:py-7 bg-white/70 backdrop-blur-xs border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-3">
          <div className="max-w-3xl">
            <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Peta Interaktif Kelurahan Balai Gadang
            </h2>
            <p className="mt-0.5 text-xs text-slate-600 leading-snug">
              Eksplorasi sebaran fasilitas publik, sarana kesehatan, titik
              mitigasi bencana, serta potensi UMKM dan agrowisata.
            </p>
          </div>

          {activeFiltersCount > 0 && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold self-start sm:self-end transition-colors cursor-pointer border border-slate-200 shrink-0"
            >
              <RotateCcw className="w-3 h-3 text-slate-500" />
              <span>Reset Filter ({activeFiltersCount})</span>
            </button>
          )}
        </div>

        {/* Compact Global Filter Bar */}
        <div className="bg-slate-50/90 border border-slate-200/90 rounded-xl p-2 sm:p-2.5 mb-3.5 shadow-2xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2 items-center">
            {/* 1. Search (Span 3) */}
            <div className="lg:col-span-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => onFilterChange({ search: e.target.value })}
                  placeholder="Cari lokasi, fasilitas..."
                  className="w-full pl-8 pr-7 py-1.5 bg-white border border-slate-200 rounded-lg text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7E549E] focus:border-transparent transition-all"
                />
                {filters.search && (
                  <button
                    onClick={() => onFilterChange({ search: "" })}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-100 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* 2. Entity Type Switcher (Span 3) */}
            <div className="lg:col-span-3">
              <div className="flex p-0.5 bg-slate-200/60 rounded-lg border border-slate-200/40">
                <button
                  onClick={() => onFilterChange({ entityType: "all" })}
                  className={`flex-1 py-1 text-[11px] font-semibold rounded-md transition-all cursor-pointer ${
                    filters.entityType === "all"
                      ? "bg-white text-slate-900 shadow-2xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Semua
                </button>
                <button
                  onClick={() => onFilterChange({ entityType: "facility" })}
                  className={`flex-1 py-1 text-[11px] font-semibold rounded-md transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    filters.entityType === "facility"
                      ? "bg-[#633B83] text-white shadow-2xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Building2 className="w-3 h-3 text-[#FCCB5D]" />
                  <span>Fasilitas</span>
                </button>
                <button
                  onClick={() => onFilterChange({ entityType: "potential" })}
                  className={`flex-1 py-1 text-[11px] font-semibold rounded-md transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    filters.entityType === "potential"
                      ? "bg-[#FCA228] text-slate-950 shadow-2xs font-bold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Sparkles className="w-3 h-3 text-slate-950" />
                  <span>Potensi</span>
                </button>
              </div>
            </div>

            {/* 3. Simpel RW Dropdown (Span 3) */}
            <div className="lg:col-span-3">
              <div className="relative">
                <select
                  value={filters.rw_id}
                  onChange={(e) => onFilterChange({ rw_id: e.target.value })}
                  className="w-full appearance-none px-2.5 py-1.5 pr-8 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#7E549E] focus:border-transparent font-medium transition-all cursor-pointer"
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
                  className="w-full appearance-none px-2.5 py-1.5 pr-8 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#7E549E] focus:border-transparent font-medium transition-all cursor-pointer"
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

        {/* Map Layout & Side-by-Side Legend */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
          {/* Main Map Container */}
          <div className="lg:col-span-9 xl:col-span-9 bg-white border border-slate-200/90 rounded-xl overflow-hidden shadow-2xs">
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
          <div className="lg:col-span-3 xl:col-span-3">
            <div className="sticky top-16">
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
