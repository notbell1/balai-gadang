import React from "react";
import { MapView } from "./MapView";
import { MapLegend } from "./MapLegend";
import { CategoryConfig, RWData, UnifiedEntity, FilterState } from "../types";
import {
  Search,
  Filter,
  Layers,
  RotateCcw,
  Sparkles,
  Building2,
  MapPin,
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
      className="py-16 sm:py-24 bg-white/70 backdrop-blur-xs border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs sm:text-sm font-bold text-[#633B83] tracking-wider uppercase bg-[#7E549E]/15 px-3 py-1 rounded-full border border-[#8F66AC]/30 inline-flex items-center gap-1.5 shadow-2xs">
              <Layers className="w-3.5 h-3.5 text-[#FCA228]" />
              <span>Pusat Data Spasial</span>
            </span>
            <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              <span>Peta Interaktif Kelurahan Balai Gadang</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-3xl">
              Eksplorasi sebaran fasilitas publik, pusat layanan warga, sekolah,
              sarana kesehatan, titik mitigasi bencana, serta potensi UMKM dan
              agrowisata kelurahan Balai Gadang.
            </p>
          </div>

          {activeFiltersCount > 0 && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold self-start transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filter ({activeFiltersCount})</span>
            </button>
          )}
        </div>

        {/* Global Filter Bar */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5 mb-6 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 items-center">
            {/* Search */}
            <div className="lg:col-span-4">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => onFilterChange({ search: e.target.value })}
                  placeholder="Cari fasilitas, potensi, atau nama..."
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7E549E] focus:border-transparent"
                />
              </div>
            </div>

            {/* Entity Type Selector */}
            <div className="lg:col-span-3">
              <div className="flex p-1 bg-slate-200/70 rounded-xl">
                <button
                  onClick={() => onFilterChange({ entityType: "all" })}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    filters.entityType === "all"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Semua
                </button>
                <button
                  onClick={() => onFilterChange({ entityType: "facility" })}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    filters.entityType === "facility"
                      ? "bg-[#633B83] text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Building2 className="w-3 h-3 text-[#FCCB5D]" />
                  <span>Fasilitas</span>
                </button>
                <button
                  onClick={() => onFilterChange({ entityType: "potential" })}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    filters.entityType === "potential"
                      ? "bg-[#FCA228] text-slate-950 shadow-xs font-bold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Sparkles className="w-3 h-3 text-slate-950" />
                  <span>Potensi</span>
                </button>
              </div>
            </div>

            {/* Dynamic RW Selector */}
            <div className="lg:col-span-3">
              <select
                value={filters.rw_id}
                onChange={(e) => onFilterChange({ rw_id: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#7E549E] focus:border-transparent font-medium"
              >
                <option value="">Semua Rukun Warga ({rws.length} RW)</option>
                {rws.map((rw) => (
                  <option key={rw.rw_id} value={rw.rw_id}>
                    {rw.rw_id} — {rw.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Dropdown */}
            <div className="lg:col-span-2">
              <select
                value={filters.category}
                onChange={(e) => onFilterChange({ category: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#7E549E] focus:border-transparent font-medium"
              >
                <option value="">Semua Kategori</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Map Layout with Floating Legend */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Map View */}
          <div className="lg:col-span-9">
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

          {/* Side Legend & Category Filter */}
          <div className="lg:col-span-3">
            <MapLegend
              categories={categories}
              entities={entities}
              selectedCategory={filters.category}
              onSelectCategory={(catId) => onFilterChange({ category: catId })}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
