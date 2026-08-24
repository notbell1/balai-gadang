import React from 'react';
import { CategoryConfig, UnifiedEntity } from '../types';

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
  // Compute counts per category
  const countByCategory = new Map<string, number>();
  entities.forEach((e) => {
    countByCategory.set(e.category, (countByCategory.get(e.category) || 0) + 1);
  });

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-md p-4 max-h-[380px] overflow-y-auto">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
        <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          Legenda Kategori
        </span>
        <button
          onClick={() => onSelectCategory('')}
          className={`text-[11px] font-semibold px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
            !selectedCategory
              ? 'bg-[#7E549E]/15 text-[#633B83] font-bold border border-[#8F66AC]/30'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
          }`}
        >
          Semua ({entities.length})
        </button>
      </div>

      {/* Pin Type Differentiation Hint */}
      <div className="mb-3 p-2 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-600 space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#633B83] inline-block"></span>
          <span><strong>Pin Solid:</strong> Fasilitas Publik</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full border-2 border-[#FCA228] bg-[#FCCB5D] inline-block"></span>
          <span><strong>Pin Aksen Emas:</strong> Potensi Unggulan</span>
        </div>
      </div>

      <div className="space-y-1">
        {categories.map((cat) => {
          const count = countByCategory.get(cat.id) || 0;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(isSelected ? '' : cat.id)}
              className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between gap-2 cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 text-white font-semibold shadow-sm'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0 shadow-xs"
                  style={{ backgroundColor: cat.color }}
                />
                <span className="truncate">{cat.name}</span>
              </div>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold ${
                  isSelected ? 'bg-slate-800 text-[#FCCB5D]' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
