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

  const badgeColor = category?.color || "#0284c7";
  const badgeBg = category?.bgColor || "#e0f2fe";
  const badgeText = category?.textColor || "#0369a1";

  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${entity.latitude},${entity.longitude}`;

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

      window.setTimeout(() => {
        setCopiedLink(false);
      }, 2500);
    } catch (error) {
      console.error("Gagal menyalin tautan:", error);
    }
  };

  const handleCopyCoords = async () => {
    try {
      const coordStr = `${entity.latitude.toFixed(6)}, ${entity.longitude.toFixed(6)}`;

      await navigator.clipboard.writeText(coordStr);

      setCopiedCoords(true);

      window.setTimeout(() => {
        setCopiedCoords(false);
      }, 2000);
    } catch (error) {
      console.error("Gagal menyalin koordinat:", error);
    }
  };

  return (
    <div
      id="entity-detail-backdrop"
      className="
        fixed inset-0 z-50
        flex items-end justify-center
        bg-slate-950/60
        backdrop-blur-[2px]
        animate-in fade-in duration-200

        sm:items-center
        sm:p-4

        lg:p-6
      "
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="entity-detail-title"
    >
      <div
        id="entity-detail-container"
        className="
          relative
          flex
          w-full
          flex-col
          overflow-hidden
          bg-white
          shadow-2xl

          max-h-[96dvh]
          rounded-t-[1.75rem]

          animate-in
          slide-in-from-bottom-8
          duration-300

          sm:max-w-2xl
          sm:max-h-[92dvh]
          sm:rounded-2xl

          md:max-w-3xl

          lg:max-w-4xl
          lg:max-h-[88dvh]

          xl:max-w-5xl

          border border-slate-200/80
        "
      >
        {/* ================= HEADER / IMAGE ================= */}

        <div
          className="
            relative
            w-full
            shrink-0
            overflow-hidden
            bg-slate-100

            h-[180px]

            xs:h-[200px]

            sm:h-[220px]

            md:h-[250px]

            lg:h-[280px]

            xl:h-[300px]
          "
        >
          <img
            src={entity.photo}
            alt={entity.name}
            className="
              h-full
              w-full
              object-cover
            "
            onError={(event) => {
              (event.target as HTMLImageElement).src = isPotential
                ? "/images/potentials/tanaman-hias.jpg"
                : "/images/facilities/kantor-lurah.jpg";
            }}
          />

          <div
            className="
              absolute inset-0
              bg-gradient-to-t
              from-slate-950/90
              via-slate-950/35
              to-slate-950/5
            "
          />

          {/* CLOSE BUTTON */}

          <button
            id="btn-close-detail"
            onClick={onClose}
            className="
              absolute
              right-3
              top-3

              sm:right-4
              sm:top-4

              flex
              h-10
              w-10
              items-center
              justify-center

              rounded-full
              bg-slate-950/70
              text-white
              shadow-lg
              backdrop-blur-md

              transition-all
              hover:bg-slate-950
              hover:scale-105
              active:scale-95

              focus:outline-none
              focus:ring-2
              focus:ring-white/80
            "
            aria-label="Tutup detail"
          >
            <X className="h-5 w-5" />
          </button>

          {/* BADGES */}

          <div
            className="
              absolute
              bottom-3
              left-3
              right-3

              flex
              flex-wrap
              items-center
              gap-1.5

              sm:bottom-4
              sm:left-5
              sm:right-5
              sm:gap-2
            "
          >
            <span
              className="
                max-w-full
                truncate

                rounded-lg
                px-2.5
                py-1

                text-[10px]
                font-bold
                uppercase
                tracking-wide
                shadow-sm

                sm:px-3
                sm:text-xs
              "
              style={{
                backgroundColor: badgeBg,
                color: badgeText,
                borderColor: badgeColor,
              }}
            >
              {category?.name || entity.category}
            </span>

            {entity.rw_name && (
              <span
                className="
                  rounded-lg
                  bg-white/90
                  px-2.5
                  py-1

                  text-[10px]
                  font-semibold
                  text-slate-900

                  backdrop-blur-sm

                  sm:text-xs
                "
              >
                {entity.rw_name}
              </span>
            )}

            <span
              className="
                flex
                items-center
                gap-1

                rounded-lg
                bg-[#633B83]
                px-2.5
                py-1

                text-[10px]
                font-semibold
                text-white
                shadow-sm

                sm:text-xs
              "
            >
              {isPotential ? (
                <>
                  <Sparkles className="h-3 w-3 shrink-0 text-[#FCCB5D]" />

                  <span className="whitespace-nowrap">Potensi Unggulan</span>
                </>
              ) : (
                <>
                  <Building2 className="h-3 w-3 shrink-0 text-[#FCCB5D]" />

                  <span className="whitespace-nowrap">Fasilitas Publik</span>
                </>
              )}
            </span>
          </div>
        </div>

        {/* ================= SCROLLABLE CONTENT ================= */}

        <div
          className="
            min-h-0
            flex-1
            overflow-y-auto

            px-4
            py-5

            sm:px-6
            sm:py-6

            lg:px-8
            lg:py-7
          "
        >
          <div
            className="
              mx-auto
              w-full
              max-w-4xl
              space-y-5

              sm:space-y-6
            "
          >
            {/* TITLE */}

            <div>
              <div
                className="
                  mb-1.5
                  flex
                  flex-wrap
                  items-center
                  gap-x-2
                  gap-y-1

                  text-[10px]
                  font-semibold
                  text-slate-400

                  sm:text-xs
                "
              >
                <span className="font-mono">ID: {entity.id}</span>

                <span className="hidden sm:inline">•</span>

                <span>Kelurahan Balai Gadang</span>
              </div>

              <h2
                id="entity-detail-title"
                className="
                  break-words
                  text-xl
                  font-extrabold
                  leading-snug
                  text-slate-900

                  sm:text-2xl

                  md:text-3xl
                "
              >
                {entity.name}
              </h2>
            </div>

            {/* EXTRA INFO */}

            {entity.extraInfo && (
              <div
                className="
                  flex
                  items-start
                  gap-3

                  rounded-xl
                  border
                  border-[#FCA228]/30
                  bg-[#FCA228]/10

                  p-3.5

                  sm:p-4
                "
              >
                <Tag
                  className="
                    mt-0.5
                    h-4
                    w-4
                    shrink-0
                    text-[#FCA228]
                  "
                />

                <div className="min-w-0">
                  <span
                    className="
                      mb-0.5
                      block
                      text-xs
                      font-bold
                      text-[#633B83]
                    "
                  >
                    Keunggulan / Produk
                  </span>

                  <p
                    className="
                      break-words
                      text-xs
                      leading-relaxed
                      text-[#633B83]

                      sm:text-sm
                    "
                  >
                    {entity.extraInfo}
                  </p>
                </div>
              </div>
            )}

            {/* DESCRIPTION */}

            <section>
              <h3
                className="
                  mb-2
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-slate-400

                  sm:text-xs
                "
              >
                Deskripsi Lengkap
              </h3>

              <p
                className="
                  whitespace-pre-line
                  break-words

                  text-sm
                  leading-7
                  text-slate-700

                  sm:text-base
                  sm:leading-7
                "
              >
                {entity.description || "Belum ada deskripsi untuk lokasi ini."}
              </p>
            </section>

            {/* META INFORMATION */}

            <section>
              <h3
                className="
                  mb-3
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-slate-400

                  sm:text-xs
                "
              >
                Informasi Lokasi
              </h3>

              <div
                className="
                  grid
                  grid-cols-1
                  gap-3

                  sm:grid-cols-2

                  lg:gap-4
                "
              >
                {/* ADDRESS */}

                <div
                  className="
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50

                    p-3.5

                    sm:p-4
                  "
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-[#7E549E]/10
                      "
                    >
                      <MapPin className="h-4 w-4 text-[#7E549E]" />
                    </div>

                    <div className="min-w-0">
                      <span
                        className="
                          mb-1
                          block
                          text-xs
                          font-bold
                          text-slate-800
                        "
                      >
                        Alamat Lokasi
                      </span>

                      <span
                        className="
                          block
                          break-words
                          text-xs
                          leading-relaxed
                          text-slate-600

                          sm:text-sm
                        "
                      >
                        {entity.address || "Alamat belum tersedia"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* COORDINATES */}

                <div
                  className="
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50

                    p-3.5

                    sm:p-4
                  "
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-[#7E549E]/10
                      "
                    >
                      <Navigation className="h-4 w-4 text-[#7E549E]" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <span
                        className="
                          mb-1
                          block
                          text-xs
                          font-bold
                          text-slate-800
                        "
                      >
                        Koordinat Spasial
                      </span>

                      <div className="flex items-center justify-between gap-2">
                        <span
                          className="
                            min-w-0
                            break-all
                            font-mono
                            text-[11px]
                            text-slate-600

                            sm:text-xs
                          "
                        >
                          {entity.latitude.toFixed(6)},{" "}
                          {entity.longitude.toFixed(6)}
                        </span>

                        <button
                          onClick={handleCopyCoords}
                          className="
                            flex
                            h-8
                            w-8
                            shrink-0
                            items-center
                            justify-center

                            rounded-lg
                            border
                            border-slate-200
                            bg-white
                            text-slate-600

                            transition-all
                            hover:bg-slate-100
                            hover:text-[#633B83]
                            active:scale-95

                            focus:outline-none
                            focus:ring-2
                            focus:ring-[#7E549E]/30
                          "
                          title="Salin koordinat"
                          aria-label="Salin koordinat"
                        >
                          {copiedCoords ? (
                            <Check className="h-4 w-4 text-[#633B83]" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* OPERATIONAL HOURS */}

                {entity.operationalHours && (
                  <div
                    className="
                      rounded-xl
                      border
                      border-slate-200
                      bg-slate-50

                      p-3.5

                      sm:p-4
                    "
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="
                          flex
                          h-8
                          w-8
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          bg-[#7E549E]/10
                        "
                      >
                        <Clock className="h-4 w-4 text-[#7E549E]" />
                      </div>

                      <div className="min-w-0">
                        <span
                          className="
                            mb-1
                            block
                            text-xs
                            font-bold
                            text-slate-800
                          "
                        >
                          Jam Operasional
                        </span>

                        <span
                          className="
                            block
                            break-words
                            text-xs
                            leading-relaxed
                            text-slate-600

                            sm:text-sm
                          "
                        >
                          {entity.operationalHours}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* CONTACT */}

                {entity.contact && (
                  <div
                    className="
                      rounded-xl
                      border
                      border-slate-200
                      bg-slate-50

                      p-3.5

                      sm:p-4
                    "
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="
                          flex
                          h-8
                          w-8
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          bg-[#FCA228]/15
                        "
                      >
                        <Phone className="h-4 w-4 text-[#FCA228]" />
                      </div>

                      <div className="min-w-0">
                        <span
                          className="
                            mb-1
                            block
                            text-xs
                            font-bold
                            text-slate-800
                          "
                        >
                          Kontak / Pengelola
                        </span>

                        <span
                          className="
                            block
                            break-all
                            text-xs
                            leading-relaxed
                            text-slate-600

                            sm:text-sm
                          "
                        >
                          {entity.contact}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>

        {/* ================= FOOTER ACTION ================= */}

        <div
          className="
            shrink-0
            border-t
            border-slate-200
            bg-white/95
            p-3
            backdrop-blur-md

            sm:p-4

            lg:px-6
          "
        >
          <div
            className="
              mx-auto
              flex
              w-full
              max-w-4xl
              flex-col
              gap-2

              sm:flex-row
              sm:items-center
              sm:gap-2.5
            "
          >
            {/* FOCUS MAP */}

            <button
              onClick={() => onFocusOnMap(entity)}
              className="
                flex
                min-h-11
                w-full
                items-center
                justify-center
                gap-2

                rounded-xl

                bg-gradient-to-r
                from-[#633B83]
                to-[#7E549E]

                px-4
                py-3

                text-xs
                font-semibold
                text-white
                shadow-sm

                transition-all

                hover:from-[#7E549E]
                hover:to-[#633B83]

                active:scale-[0.98]

                focus:outline-none
                focus:ring-2
                focus:ring-[#7E549E]/40

                sm:flex-1
                sm:text-sm
              "
            >
              <MapPin className="h-4 w-4 text-[#FCCB5D]" />

              <span>Lihat di Peta</span>
            </button>

            {/* GOOGLE MAPS */}

            <a
              href={googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex
                min-h-11
                w-full
                items-center
                justify-center
                gap-2

                rounded-xl
                bg-slate-900

                px-4
                py-3

                text-xs
                font-semibold
                text-white
                shadow-sm

                transition-all

                hover:bg-slate-800
                active:scale-[0.98]

                focus:outline-none
                focus:ring-2
                focus:ring-slate-400/40

                sm:flex-1
                sm:text-sm
              "
            >
              <Navigation className="h-4 w-4 text-[#FCCB5D]" />

              <span>Buka Navigasi</span>

              <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
            </a>

            {/* SHARE */}

            <button
              onClick={handleShareLink}
              className={`
                flex
                min-h-11
                w-full
                items-center
                justify-center
                gap-2

                rounded-xl
                border

                px-4
                py-3

                text-xs
                font-semibold

                transition-all
                active:scale-[0.98]

                focus:outline-none
                focus:ring-2
                focus:ring-[#7E549E]/30

                sm:w-auto
                sm:min-w-[110px]
                sm:text-sm

                ${
                  copiedLink
                    ? `
                      border-[#8F66AC]/50
                      bg-[#7E549E]/10
                      text-[#633B83]
                    `
                    : `
                      border-slate-200
                      bg-white
                      text-slate-700
                      shadow-sm
                      hover:bg-slate-100
                    `
                }
              `}
              title="Bagikan tautan lokasi"
            >
              {copiedLink ? (
                <>
                  <Check className="h-4 w-4" />

                  <span>Tersalin!</span>
                </>
              ) : (
                <>
                  <Share2 className="h-4 w-4" />

                  <span>Bagikan</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
