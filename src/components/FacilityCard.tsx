import React, { useState, useEffect } from "react";
import { FacilityItem, CategoryConfig, RWData } from "../types";
import {
  MapPin,
  Clock,
  Phone,
  GraduationCap,
  HeartPulse,
  Landmark,
  ShieldAlert,
  Trees,
  Store,
  Building,
} from "lucide-react";

interface FacilityCardProps {
  facility: FacilityItem;
  category: CategoryConfig | undefined;
  rw: RWData | undefined;
  onSelect: (facility: FacilityItem) => void;
  onFocusMap: (facility: FacilityItem) => void;
}

// Komponen SVG Ikon Masjid Kustom (Kubah + Bulan Sabit)
const MosqueIcon: React.FC<{ className?: string }> = ({
  className = "w-6 h-6",
}) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Bulan Sabit di Puncak Kubah */}
    <path
      d="M12 2a1.5 1.5 0 0 1 1 1.41A1.5 1.5 0 0 1 11.5 4.9 1.5 1.5 0 0 1 12 2z"
      fill="currentColor"
      stroke="none"
    />
    {/* Kubah Utama */}
    <path d="M12 4.5C9.5 4.5 6.5 7 6.5 10.5V13h11v-2.5C17.5 7 14.5 4.5 12 4.5z" />
    {/* Bangunan Dasar & Pintu Gerbang Lengkung */}
    <path d="M4 13h16v8H4z" />
    <path d="M10 21v-4a2 2 0 0 1 4 0v4" />
    {/* Menara Kiri & Kanan */}
    <path d="M4 13V8l-1.5 1.5M20 13V8l1.5 1.5" />
  </svg>
);

// Helper untuk mendeteksi ikon berdasarkan kata kunci
const getFacilityIcon = (name: string = "", categoryName: string = "") => {
  const text = `${name} ${categoryName}`.toLowerCase();

  // Khusus Masjid, Mushalla, Mushola, Surau -> Gunakan Ikon Masjid SVG Kustom
  if (
    text.includes("masjid") ||
    text.includes("mushalla") ||
    text.includes("mushola") ||
    text.includes("surau") ||
    text.includes("ibadah")
  ) {
    return MosqueIcon;
  }

  if (
    text.includes("sekolah") ||
    text.includes("sd") ||
    text.includes("smp") ||
    text.includes("sma") ||
    text.includes("tk") ||
    text.includes("pendidikan")
  ) {
    return GraduationCap;
  }
  if (
    text.includes("puskesmas") ||
    text.includes("posyandu") ||
    text.includes("klinik") ||
    text.includes("kesehatan") ||
    text.includes("rs")
  ) {
    return HeartPulse;
  }
  if (
    text.includes("kantor") ||
    text.includes("lurah") ||
    text.includes("pemerintahan")
  ) {
    return Landmark;
  }
  if (
    text.includes("pos") ||
    text.includes("polisi") ||
    text.includes("keamanan") ||
    text.includes("hansip")
  ) {
    return ShieldAlert;
  }
  if (
    text.includes("taman") ||
    text.includes("lapangan") ||
    text.includes("hutan") ||
    text.includes("wisata")
  ) {
    return Trees;
  }
  if (
    text.includes("pasar") ||
    text.includes("kios") ||
    text.includes("toko") ||
    text.includes("ekonomi") ||
    text.includes("umkm")
  ) {
    return Store;
  }

  return Building; // Default Icon
};

export const FacilityCard: React.FC<FacilityCardProps> = ({
  facility,
  category,
  rw,
  onSelect,
  onFocusMap,
}) => {
  const [hasError, setHasError] = useState<boolean>(!facility.photo);

  useEffect(() => {
    setHasError(!facility.photo);
  }, [facility.photo]);

  const badgeBg = category?.bgColor || "#e0f2fe";
  const badgeText = category?.textColor || "#0369a1";

  const IconComponent = getFacilityIcon(facility.name, category?.name);

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group">
      <div>
        {/* Container Gambar / Fallback */}
        <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden flex items-center justify-center">
          {!hasError && facility.photo ? (
            <img
              src={facility.photo}
              alt={facility.name}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setHasError(true)}
            />
          ) : (
            /* Fallback Icon Box */
            <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200/80 flex flex-col items-center justify-center gap-2 p-4 text-center">
              <div className="w-12 h-12 rounded-xl bg-white shadow-xs border border-slate-200/60 flex items-center justify-center text-[#633B83] group-hover:scale-110 transition-transform">
                <IconComponent className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-semibold text-slate-500 line-clamp-1 max-w-[80%]">
                {category?.name || "Fasilitas Publik"}
              </span>
            </div>
          )}

          {/* Category Pill */}
          <span
            className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-bold uppercase shadow-sm tracking-wide z-10"
            style={{ backgroundColor: badgeBg, color: badgeText }}
          >
            {category?.name || facility.category}
          </span>

          {/* RW Pill */}
          <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-900/80 text-white backdrop-blur-xs shadow-sm z-10">
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
                <span className="truncate max-w-[170px]">
                  {facility.operational_hours}
                </span>
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
