import React from 'react';
import { FacilityItem, CategoryConfig, RWData } from '../types';
import { MapPin, Clock, Phone, ChevronRight, Building } from 'lucide-react';

interface FacilityCardProps {
  facility: FacilityItem;
  category: CategoryConfig | undefined;
  rw: RWData | undefined;
  onSelect: (facility: FacilityItem) => void;
  onFocusMap: (facility: FacilityItem) => void;
}

export const FacilityCard: React.FC<FacilityCardProps> = ({
  facility,
  category,
  rw,
  onSelect,
  onFocusMap,
}) => {
  const badgeColor = category?.color || '#0284c7';
  const badgeBg = category?.bgColor || '#e0f2fe';
  const badgeText = category?.textColor || '#0369a1';

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group">
      <div>
        {/* Photo Container */}
        <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
          <img
            src={facility.photo}
            alt={facility.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              // Graceful fallback
              (e.target as HTMLImageElement).src = '/images/facilities/kantor-lurah.jpg';
            }}
          />
          {/* Category Pill */}
          <span
            className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-bold uppercase shadow-sm tracking-wide"
            style={{ backgroundColor: badgeBg, color: badgeText }}
          >
            {category?.name || facility.category}
          </span>

          {/* RW Pill */}
          <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-900/80 text-white backdrop-blur-xs shadow-sm">
            {rw?.name || facility.rw_id}
          </span>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5">
          <h3 className="text-base font-bold text-slate-900 group-hover:text-[#633B83] transition-colors leading-snug line-clamp-2">
            {facility.name}
          </h3>

          <div className="mt-2 flex items-start gap-1.5 text-xs text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-[#FCA228] flex-shrink-0 mt-0.5" />
            <span className="line-clamp-1">{facility.address}</span>
          </div>

          <p className="mt-2.5 text-xs text-slate-600 leading-relaxed line-clamp-2">
            {facility.description}
          </p>

          {/* Extra Info Pills */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap gap-2 text-[11px] text-slate-500">
            {facility.operational_hours && (
              <span className="inline-flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                <Clock className="w-3 h-3 text-slate-400" />
                <span className="truncate max-w-[170px]">{facility.operational_hours}</span>
              </span>
            )}
            {facility.contact_info && (
              <span className="inline-flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                <Phone className="w-3 h-3 text-slate-400" />
                <span>{facility.contact_info}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-4 sm:p-5 pt-0 flex items-center gap-2">
        <button
          onClick={() => onSelect(facility)}
          className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-[#7E549E]/10 hover:text-[#633B83] active:bg-[#7E549E]/20 text-slate-800 text-xs font-semibold transition-colors text-center cursor-pointer"
        >
          Lihat Detail
        </button>
        <button
          onClick={() => onFocusMap(facility)}
          className="py-2 px-3 rounded-xl bg-gradient-to-r from-[#633B83] to-[#7E549E] hover:from-[#7E549E] hover:to-[#633B83] active:scale-98 text-white text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
          title="Fokus di Peta"
        >
          <MapPin className="w-3.5 h-3.5 text-[#FCCB5D]" />
          <span className="hidden sm:inline">Peta</span>
        </button>
      </div>
    </div>
  );
};
