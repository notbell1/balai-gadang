import React from "react";
import { CategoryConfig, UnifiedEntity } from "../types";

interface MapLegendProps {
  categories: CategoryConfig[];
  entities: UnifiedEntity[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const MapLegend: React.FC<MapLegendProps> = ({
  categories,
  entities,
  selectedCategory,
  onSelectCategory,
}) => {
  // Menghitung jumlah item per kategori
  const countByCategory = new Map<string, number>();
  entities.forEach((e) => {
    countByCategory.set(e.category, (countByCategory.get(e.category) || 0) + 1);
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-3.5 flex flex-col max-h-[350px]">
      {/* Header & Panduan Pin (Sangat Kompak 1 Baris) */}
      <div className="mb-2 pb-2 border-b border-slate-100 flex-shrink-0">
        <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-1.5">
          Legenda Peta
        </h3>
        <div className="flex items-center gap-3 text-[10px] text-slate-500 font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#633B83]"></span>
            <span>Fasilitas</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#FCCB5D] border border-[#FCA228]"></span>
            <span>Potensi</span>
          </div>
        </div>
      </div>

      {/* Daftar Kategori (Tanpa Badge, Scrollable) */}
      <div className="overflow-y-auto custom-scrollbar pr-1 space-y-0.5">
        {/* Tombol Semua Kategori */}
        <button
          onClick={() => onSelectCategory("")}
          className={`w-full flex items-center justify-between py-1.5 px-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
            !selectedCategory
              ? "text-[#633B83] font-bold bg-slate-50"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
          }`}
        >
          <span>Semua Kategori</span>
          <span
            className={!selectedCategory ? "text-[#633B83]" : "text-slate-400"}
          >
            {entities.length}
          </span>
        </button>

        {/* List Kategori Spesifik */}
        {categories.map((cat) => {
          const count = countByCategory.get(cat.id) || 0;
          const isSelected = selectedCategory === cat.id;

          // Sembunyikan kategori yang tidak ada datanya agar lebih hemat ruang
          if (count === 0) return null;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(isSelected ? "" : cat.id)}
              className={`w-full flex items-center justify-between py-1.5 px-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                isSelected
                  ? "text-[#633B83] font-bold bg-slate-50"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: cat.color }}
                />
                <span className="truncate">{cat.name}</span>
              </div>
              <span
                className={isSelected ? "text-[#633B83]" : "text-slate-400"}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Custom CSS Scrollbar Tipis untuk Legenda */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
      `}</style>
    </div>
  );
};
