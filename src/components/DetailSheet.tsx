import React, { useEffect, useState } from "react";
import { UnifiedEntity, CategoryConfig } from "../types";
import {
  X,
  MapPin,
  Clock,
  Phone,
  Navigation,
  Share2,
  Copy,
  Check,
  Building2,
  Sparkles,
  ExternalLink,
  Tag,
} from "lucide-react";

interface DetailSheetProps {
  entity: UnifiedEntity | null;
  category: CategoryConfig | undefined;
  onClose: () => void;
  onFocusOnMap: (entity: UnifiedEntity) => void;
}

export const DetailSheet: React.FC<DetailSheetProps> = ({
  entity,
  category,
  onClose,
  onFocusOnMap,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCoords, setCopiedCoords] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [entity]);

  useEffect(() => {
    if (!entity) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [entity, onClose]);

  if (!entity) return null;

  const isPotential = entity.type === "potential";
  const badgeColor = category?.color || "#7E549E";
  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${entity.latitude},${entity.longitude}`;

  // ==========================================
  // SMART FALLBACK IMAGE BERDASARKAN NAMA FASILITAS
  // ==========================================
  const getSmartFallbackImage = () => {
    // Mengambil nama fasilitas (atau deskripsi sebagai cadangan) lalu diubah ke huruf kecil
    const text = (entity.name || "").toLowerCase();

    // Logika pencocokan berdasarkan nama fasilitas sesuai permintaan Anda
    if (
      text.includes("masjid") ||
      text.includes("mushalla") ||
      text.includes("mushola") ||
      text.includes("surau") ||
      text.includes("ibadah")
    ) {
      // Foto Tempat Ibadah yang aman & stabil
      return "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=800&q=80";
    }

    // Fasilitas Kesehatan
    if (
      text.includes("klinik") ||
      text.includes("puskesmas") ||
      text.includes("posyandu") ||
      text.includes("dokter") ||
      text.includes("sehat")
    ) {
      return "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80";
    }

    // Fasilitas Pendidikan / Sekolah / MDA
    if (
      text.includes("sekolah") ||
      text.includes("paud") ||
      text.includes("tk") ||
      text.includes("sd") ||
      text.includes("smp") ||
      text.includes("sma") ||
      text.includes("mda") ||
      text.includes("tpa") ||
      text.includes("pendidikan")
    ) {
      return "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80";
    }

    // Olahraga
    if (
      text.includes("lapangan") ||
      text.includes("olahraga") ||
      text.includes("futsal") ||
      text.includes("bola")
    ) {
      return "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80";
    }

    // Kantor Pemerintahan / Kantor Lurah
    if (
      text.includes("kantor") ||
      text.includes("lurah") ||
      text.includes("pos") ||
      text.includes("rw") ||
      text.includes("rt")
    ) {
      return "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80";
    }

    // Potensi / UMKM / Pertanian
    if (
      isPotential ||
      text.includes("tani") ||
      text.includes("kebun") ||
      text.includes("umkm") ||
      text.includes("produk") ||
      text.includes("warung") ||
      text.includes("toko")
    ) {
      return "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80";
    }

    // Default Umum Fasilitas Publik
    return "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80";
  };

  // Jika error saat memuat foto asli ATAU string foto kosong, gunakan fungsi fallback
  const currentPhoto =
    !imgError && entity.photo && entity.photo.trim() !== ""
      ? entity.photo
      : getSmartFallbackImage();

  const handleShareLink = async () => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete("facility");
      url.searchParams.delete("potential");
      url.searchParams.set(
        entity.type === "facility" ? "facility" : "potential",
        entity.id,
      );

      await navigator.clipboard.writeText(url.toString());
      setCopiedLink(true);
      window.setTimeout(() => setCopiedLink(false), 2500);
    } catch (error) {
      console.error("Gagal menyalin tautan:", error);
    }
  };

  const handleCopyCoords = async () => {
    try {
      const coordStr = `${entity.latitude.toFixed(6)}, ${entity.longitude.toFixed(6)}`;
      await navigator.clipboard.writeText(coordStr);
      setCopiedCoords(true);
      window.setTimeout(() => setCopiedCoords(false), 2000);
    } catch (error) {
      console.error("Gagal menyalin koordinat:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200 p-2 sm:p-4 lg:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="relative flex w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl flex-col overflow-hidden bg-white shadow-2xl max-h-[88vh] sm:max-h-[85vh] rounded-t-3xl sm:rounded-3xl border border-slate-200/80 animate-in slide-in-from-bottom-6 duration-300">
        {/* ================= HEADER IMAGE CONTAINER ================= */}
        <div className="relative w-full shrink-0 overflow-hidden bg-slate-900 h-40 sm:h-52 md:h-60">
          <img
            src={currentPhoto}
            alt={entity.name}
            className="h-full w-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
            onError={() => setImgError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-slate-950/70 text-white shadow-md backdrop-blur-md transition-all hover:bg-slate-950 hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Tutup detail"
          >
            <X className="h-4 w-4" />
          </button>

          {/* BADGES OVERLAY */}
          <div className="absolute bottom-2.5 left-3.5 right-3.5 flex flex-wrap items-center gap-1.5 sm:bottom-4 sm:left-6 sm:right-6">
            <span
              className="rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm"
              style={{ backgroundColor: badgeColor }}
            >
              {category?.name || entity.category}
            </span>

            {entity.rw_name && (
              <span className="rounded-md bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-slate-900 backdrop-blur-sm shadow-sm">
                {entity.rw_name}
              </span>
            )}

            <span className="flex items-center gap-1 rounded-md bg-[#633B83] px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm">
              {isPotential ? (
                <>
                  <Sparkles className="h-3 w-3 shrink-0 text-[#FCCB5D]" />
                  <span>Potensi</span>
                </>
              ) : (
                <>
                  <Building2 className="h-3 w-3 shrink-0 text-[#FCCB5D]" />
                  <span>Fasilitas</span>
                </>
              )}
            </span>
          </div>
        </div>

        {/* ================= SCROLLABLE BODY ================= */}
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5 custom-scrollbar space-y-4">
          {/* TITLE & ID */}
          <div>
            <div className="mb-0.5 flex items-center gap-2 text-[10px] font-mono font-semibold text-slate-400">
              <span>ID: {entity.id}</span>
              <span>•</span>
              <span>Kelurahan Balai Gadang</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {entity.name}
            </h2>
          </div>

          {/* EXTRA INFO / PRODUK UNGGULAN */}
          {entity.extraInfo && (
            <div className="flex items-start gap-2.5 rounded-xl border border-[#FCA228]/30 bg-[#FCA228]/10 p-3">
              <Tag className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#FCA228]" />
              <div className="min-w-0">
                <span className="mb-0.5 block text-[11px] font-bold text-[#633B83]">
                  Keunggulan / Produk Utama
                </span>
                <p className="text-xs leading-relaxed text-slate-800 font-medium">
                  {entity.extraInfo}
                </p>
              </div>
            </div>
          )}

          {/* DESCRIPTION */}
          <div className="space-y-1">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Deskripsi Lengkap
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-600 whitespace-pre-line">
              {entity.description ||
                "Belum ada deskripsi mendetail untuk lokasi ini."}
            </p>
          </div>

          {/* META INFORMATION GRID */}
          <div className="space-y-2">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Informasi Kontak & Lokasi
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Address */}
              <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-3 flex items-start gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#7E549E]/10 text-[#7E549E]">
                  <MapPin className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0">
                  <span className="block text-[11px] font-bold text-slate-800 mb-0.5">
                    Alamat
                  </span>
                  <span className="block text-xs text-slate-600 leading-relaxed">
                    {entity.address || "Alamat belum tersedia"}
                  </span>
                </div>
              </div>

              {/* Coordinates */}
              <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-3 flex items-start gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#7E549E]/10 text-[#7E549E]">
                  <Navigation className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-[11px] font-bold text-slate-800 mb-0.5">
                    Koordinat Spasial
                  </span>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] text-slate-600 truncate">
                      {entity.latitude.toFixed(5)},{" "}
                      {entity.longitude.toFixed(5)}
                    </span>
                    <button
                      onClick={handleCopyCoords}
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 hover:text-[#633B83] transition-colors cursor-pointer"
                      title="Salin Koordinat"
                    >
                      {copiedCoords ? (
                        <Check className="h-3 w-3 text-[#633B83]" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Operational Hours */}
              {entity.operationalHours && (
                <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-3 flex items-start gap-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#7E549E]/10 text-[#7E549E]">
                    <Clock className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[11px] font-bold text-slate-800 mb-0.5">
                      Jam Operasional
                    </span>
                    <span className="block text-xs text-slate-600 leading-relaxed">
                      {entity.operationalHours}
                    </span>
                  </div>
                </div>
              )}

              {/* Contact Person */}
              {entity.contact && (
                <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-3 flex items-start gap-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#FCA228]/15 text-[#FCA228]">
                    <Phone className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[11px] font-bold text-slate-800 mb-0.5">
                      Kontak / Pengelola
                    </span>
                    <span className="block text-xs text-slate-600 leading-relaxed break-all">
                      {entity.contact}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================= FOOTER ACTIONS ================= */}
        <div className="shrink-0 border-t border-slate-200/80 bg-white p-3 flex flex-col sm:flex-row items-center gap-2">
          <button
            onClick={() => {
              onClose();
              onFocusOnMap(entity);
            }}
            className="flex w-full sm:flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#633B83] to-[#7E549E] px-3.5 py-2.5 text-xs font-bold text-white shadow-sm hover:from-[#7E549E] hover:to-[#633B83] transition-all cursor-pointer"
          >
            <MapPin className="h-3.5 w-3.5 text-[#FCCB5D]" />
            <span>Fokus di Peta</span>
          </button>

          <a
            href={googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full sm:flex-1 items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-slate-800 transition-all cursor-pointer"
          >
            <Navigation className="h-3.5 w-3.5 text-[#FCCB5D]" />
            <span>Navigasi Maps</span>
            <ExternalLink className="h-3 w-3 text-slate-400" />
          </a>

          <button
            onClick={handleShareLink}
            className={`flex w-full sm:w-auto items-center justify-center gap-1.5 rounded-xl border px-3.5 py-2.5 text-xs font-bold transition-all cursor-pointer ${
              copiedLink
                ? "border-[#8F66AC]/50 bg-[#7E549E]/10 text-[#633B83]"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-sm"
            }`}
          >
            {copiedLink ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Tersalin!</span>
              </>
            ) : (
              <>
                <Share2 className="h-3.5 w-3.5" />
                <span>Bagikan</span>
              </>
            )}
          </button>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 8px; }
      `}</style>
    </div>
  );
};
