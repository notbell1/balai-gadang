import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";

import {
  BASEMAPS,
  createCustomMarkerIcon,
  createInvertedMaskGeoJson,
} from "../lib/mapUtils";

import { BasemapId, CategoryConfig, UnifiedEntity } from "../types";

import { Locate, RotateCcw, Maximize2, Minimize2 } from "lucide-react";

interface MapViewProps {
  entities: UnifiedEntity[];
  categories: CategoryConfig[];
  categoryMap: Map<string, CategoryConfig>;
  geoJson: GeoJSON.FeatureCollection | null;
  selectedEntityId: string | null;
  onSelectEntity: (entity: UnifiedEntity) => void;
  activeRwId: string;
}

/**
 * ============================================================
 * FALLBACK IMAGE
 * ============================================================
 */
const getCategoryFallbackImage = (
  categoryName?: string,
  entityName?: string,
): string => {
  const category = (categoryName || "").toLowerCase().trim();
  const name = (entityName || "").toLowerCase().trim();

  let icon = "📍";
  let title = "Fasilitas Publik";
  let bgColor = "#633B83";

  // ==========================================================
  // PEMERINTAHAN
  // ==========================================================
  if (
    category.includes("pemerintahan") ||
    category.includes("government") ||
    name.includes("kantor lurah") ||
    name.includes("kelurahan") ||
    name.includes("kantor camat") ||
    name.includes("kecamatan") ||
    name.includes("kantor rw") ||
    name.includes("kantor rt")
  ) {
    icon = "🏛️";
    title = "Pemerintahan";
    bgColor = "#633B83";
  }

  // ==========================================================
  // KEAGAMAAN
  // ==========================================================
  else if (
    category.includes("keagamaan") ||
    category.includes("agama") ||
    category.includes("ibadah") ||
    category.includes("relig") ||
    category.includes("religious") ||
    name.includes("masjid") ||
    name.includes("mushalla") ||
    name.includes("mushola") ||
    name.includes("surau") ||
    name.includes("gereja") ||
    name.includes("vihara") ||
    name.includes("pura")
  ) {
    icon = "🕌";
    title = "Tempat Ibadah";
    bgColor = "#0F766E";
  }

  // ==========================================================
  // PENDIDIKAN
  // ==========================================================
  else if (
    category.includes("pendidikan") ||
    category.includes("education") ||
    name.includes("sd ") ||
    name.startsWith("sd ") ||
    name.includes("smp ") ||
    name.startsWith("smp ") ||
    name.includes("sma ") ||
    name.startsWith("sma ") ||
    name.includes("smk ") ||
    name.startsWith("smk ") ||
    name.includes("paud") ||
    name.includes("tk ") ||
    name.startsWith("tk ") ||
    name.includes("sekolah") ||
    name.includes("madrasah")
  ) {
    icon = "🏫";
    title = "Pendidikan";
    bgColor = "#2563EB";
  }

  // ==========================================================
  // UMKM / EKONOMI
  // ==========================================================
  else if (
    category.includes("umkm") ||
    category.includes("ekonomi") ||
    category.includes("pasar") ||
    category.includes("usaha") ||
    category.includes("perdagangan") ||
    category.includes("business") ||
    name.includes("pasar") ||
    name.includes("warung") ||
    name.includes("toko") ||
    name.includes("kedai") ||
    name.includes("usaha")
  ) {
    icon = "🏪";
    title = "UMKM & Ekonomi";
    bgColor = "#D97706";
  }

  // ==========================================================
  // WISATA
  // ==========================================================
  else if (
    category.includes("wisata") ||
    category.includes("tourism") ||
    category.includes("destinasi") ||
    category.includes("pariwisata") ||
    name.includes("wisata") ||
    name.includes("kolam") ||
    name.includes("air terjun") ||
    name.includes("lubuk") ||
    name.includes("pantai") ||
    name.includes("pemandian")
  ) {
    icon = "🏞️";
    title = "Potensi Wisata";
    bgColor = "#059669";
  }

  // ==========================================================
  // OLAHRAGA
  // ==========================================================
  else if (
    category.includes("olahraga") ||
    category.includes("sport") ||
    name.includes("lapangan") ||
    name.includes("sepak bola") ||
    name.includes("futsal") ||
    name.includes("badminton") ||
    name.includes("voli") ||
    name.includes("basket")
  ) {
    icon = "⚽";
    title = "Olahraga";
    bgColor = "#16A34A";
  }

  // ==========================================================
  // KEPEMUDAAN
  // ==========================================================
  else if (
    category.includes("kepemudaan") ||
    category.includes("pemuda") ||
    category.includes("youth") ||
    category.includes("karang taruna")
  ) {
    icon = "👥";
    title = "Kepemudaan";
    bgColor = "#7C3AED";
  }

  // ==========================================================
  // KESEHATAN
  // ==========================================================
  else if (
    category.includes("kesehatan") ||
    category.includes("health") ||
    name.includes("puskesmas") ||
    name.includes("posyandu") ||
    name.includes("klinik") ||
    name.includes("bidan") ||
    name.includes("apotek")
  ) {
    icon = "🏥";
    title = "Kesehatan";
    bgColor = "#DC2626";
  }

  // ==========================================================
  // RISIKO BANJIR
  // ==========================================================
  else if (
    category.includes("banjir") ||
    category.includes("risiko") ||
    category.includes("risk") ||
    name.includes("banjir") ||
    name.includes("rawan banjir")
  ) {
    icon = "🌊";
    title = "Risiko Banjir";
    bgColor = "#0284C7";
  }

  // ==========================================================
  // SVG FALLBACK
  // ==========================================================
  const svg = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="800"
      height="500"
      viewBox="0 0 800 500"
    >
      <defs>
        <linearGradient
          id="gradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop
            offset="0%"
            stop-color="${bgColor}"
          />

          <stop
            offset="100%"
            stop-color="#0F172A"
          />
        </linearGradient>
      </defs>

      <!-- Background -->
      <rect
        width="800"
        height="500"
        fill="url(#gradient)"
      />

      <!-- Decorative circles -->
      <circle
        cx="100"
        cy="80"
        r="100"
        fill="rgba(255,255,255,0.05)"
      />

      <circle
        cx="720"
        cy="420"
        r="150"
        fill="rgba(255,255,255,0.05)"
      />

      <!-- Icon container -->
      <circle
        cx="400"
        cy="205"
        r="105"
        fill="rgba(255,255,255,0.12)"
      />

      <circle
        cx="400"
        cy="205"
        r="90"
        fill="rgba(255,255,255,0.06)"
      />

      <!-- Category icon -->
      <text
        x="400"
        y="250"
        text-anchor="middle"
        font-size="110"
        font-family="Arial, sans-serif"
      >
        ${icon}
      </text>

      <!-- Category title -->
      <text
        x="400"
        y="365"
        text-anchor="middle"
        fill="white"
        font-size="34"
        font-weight="700"
        font-family="Arial, sans-serif"
      >
        ${title}
      </text>

      <!-- Location -->
      <text
        x="400"
        y="410"
        text-anchor="middle"
        fill="rgba(255,255,255,0.75)"
        font-size="20"
        font-family="Arial, sans-serif"
      >
        Kelurahan Balai Gadang
      </text>

      <!-- Bottom label -->
      <text
        x="400"
        y="450"
        text-anchor="middle"
        fill="rgba(255,255,255,0.55)"
        font-size="15"
        font-family="Arial, sans-serif"
      >
        Data Pemetaan KKN UISB 2026
      </text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

/**
 * ============================================================
 * MAP VIEW
 * ============================================================
 */
export const MapView: React.FC<MapViewProps> = ({
  entities,
  categories,
  categoryMap,
  geoJson,
  selectedEntityId,
  onSelectEntity,
  activeRwId,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const geoJsonLayerRef = useRef<L.GeoJSON | null>(null);
  const maskLayerRef = useRef<L.GeoJSON | null>(null);
  const userLocationLayerRef = useRef<L.LayerGroup | null>(null);

  const [activeBasemap, setActiveBasemap] = useState<BasemapId>("osm");

  const [isFullscreen, setIsFullscreen] = useState(false);

  const [isLocating, setIsLocating] = useState(false);

  const [locationError, setLocationError] = useState<string | null>(null);

  const [isOffBounds, setIsOffBounds] = useState(false);

  /**
   * ==========================================================
   * CHECK MAP BOUNDS
   * ==========================================================
   */
  const checkBounds = () => {
    const map = mapInstanceRef.current;
    const boundaryLayer = geoJsonLayerRef.current;

    if (!map || !boundaryLayer) return;

    const polyBounds = boundaryLayer.getBounds();

    if (!polyBounds.isValid()) return;

    const mapBounds = map.getBounds();

    const intersects = mapBounds.intersects(polyBounds);

    const polyCenter = polyBounds.getCenter();

    const mapCenter = map.getCenter();

    const distanceKm = polyCenter.distanceTo(mapCenter) / 1000;

    if (!intersects || distanceKm > 4.5) {
      setIsOffBounds(true);
    } else {
      setIsOffBounds(false);
    }
  };

  /**
   * ==========================================================
   * INITIALIZE MAP
   * ==========================================================
   */
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) {
      return;
    }

    const defaultCenter: L.LatLngExpression = [-0.8345, 100.3621];

    const defaultZoom = 13;

    const map = L.map(mapContainerRef.current, {
      center: defaultCenter,
      zoom: defaultZoom,
      minZoom: 10,
      maxZoom: 18,
      zoomControl: false,
    });

    /**
     * Zoom Control
     */
    L.control
      .zoom({
        position: "topright",
      })
      .addTo(map);

    /**
     * Initial Basemap
     */
    const basemapConfig = BASEMAPS.osm;

    const tileLayer = L.tileLayer(basemapConfig.url, {
      attribution: basemapConfig.attribution,
      maxZoom: basemapConfig.maxZoom,
    }).addTo(map);

    tileLayerRef.current = tileLayer;

    /**
     * Marker Layer
     */
    markersLayerRef.current = L.layerGroup().addTo(map);

    /**
     * User Location Layer
     */
    userLocationLayerRef.current = L.layerGroup().addTo(map);

    mapInstanceRef.current = map;

    /**
     * Detect far pan
     */
    map.on("moveend", checkBounds);

    /**
     * Invalidate size after mount
     */
    setTimeout(() => {
      map.invalidateSize();
    }, 200);

    /**
     * Cleanup
     */
    return () => {
      map.off("moveend", checkBounds);

      map.remove();

      mapInstanceRef.current = null;
    };
  }, []);

  /**
   * ==========================================================
   * UPDATE BASEMAP
   * ==========================================================
   */
  useEffect(() => {
    const map = mapInstanceRef.current;

    if (!map) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    const config = BASEMAPS[activeBasemap];

    const newTileLayer = L.tileLayer(config.url, {
      attribution: config.attribution,
      maxZoom: config.maxZoom,
    }).addTo(map);

    tileLayerRef.current = newTileLayer;

    newTileLayer.bringToBack();
  }, [activeBasemap]);

  /**
   * ==========================================================
   * UPDATE GEOJSON & MASK
   * ==========================================================
   */
  useEffect(() => {
    const map = mapInstanceRef.current;

    if (!map || !geoJson) return;

    /**
     * Remove old mask
     */
    if (maskLayerRef.current) {
      map.removeLayer(maskLayerRef.current);
    }

    /**
     * Remove old boundary
     */
    if (geoJsonLayerRef.current) {
      map.removeLayer(geoJsonLayerRef.current);
    }

    /**
     * Inverted Mask
     */
    const maskGeoJson = createInvertedMaskGeoJson(geoJson);

    const maskLayer = L.geoJSON(maskGeoJson, {
      style: {
        fillColor: "#0f172a",
        fillOpacity: 0.35,
        stroke: false,
      },
      interactive: false,
    }).addTo(map);

    maskLayerRef.current = maskLayer;

    /**
     * Balai Gadang Boundary
     */
    const boundaryLayer = L.geoJSON(geoJson, {
      style: {
        color: "#633B83",
        weight: 3.5,
        opacity: 0.95,
        fillColor: "#7E549E",
        fillOpacity: 0.05,
        dashArray: "6, 6",
      },
      interactive: false,
    }).addTo(map);

    geoJsonLayerRef.current = boundaryLayer;

    /**
     * Fit map to polygon
     */
    const bounds = boundaryLayer.getBounds();

    if (bounds.isValid()) {
      map.fitBounds(bounds, {
        padding: [30, 30],
      });
    }
  }, [geoJson]);

  /**
   * ==========================================================
   * UPDATE MARKERS
   * ==========================================================
   */
  useEffect(() => {
    const map = mapInstanceRef.current;

    const markersGroup = markersLayerRef.current;

    if (!map || !markersGroup) {
      return;
    }

    markersGroup.clearLayers();

    entities.forEach((entity) => {
      const category = categoryMap.get(entity.category);

      const isSelected = entity.id === selectedEntityId;

      /**
       * Custom Marker Icon
       */
      const markerIcon = createCustomMarkerIcon(entity, category, isSelected);

      const marker = L.marker([entity.latitude, entity.longitude], {
        icon: markerIcon,

        zIndexOffset: isSelected
          ? 1000
          : entity.type === "potential"
            ? 500
            : 100,
      });

      /**
       * ======================================================
       * FALLBACK IMAGE
       * ======================================================
       */
      const fallbackImage = getCategoryFallbackImage(
        category?.name || entity.category,
        entity.name,
      );

      /**
       * Jika photo kosong/null/undefined,
       * langsung gunakan fallback.
       *
       * Jika URL foto rusak,
       * onerror akan mengganti dengan fallback.
       */
      const photoSrc =
        entity.photo && entity.photo.trim() !== ""
          ? entity.photo
          : fallbackImage;

      /**
       * ======================================================
       * POPUP HTML
       * ======================================================
       */
      const popupHtml = document.createElement("div");

      popupHtml.className = "p-1 max-w-[260px] font-sans";

      popupHtml.innerHTML = `
        <div
          class="relative rounded-lg overflow-hidden mb-2 bg-slate-100 aspect-[16/10]"
        >
          <img
            src="${photoSrc}"
            alt="${entity.name}"
            class="w-full h-full object-cover"
            onerror="
              this.onerror=null;
              this.src='${fallbackImage}';
            "
          />

          <span
            class="absolute top-1.5 left-1.5 px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase shadow-sm"
            style="
              background-color: ${category?.color || "#0284c7"}
            "
          >
            ${category?.name || entity.category}
          </span>

          <span
            class="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-900/80 text-white backdrop-blur-xs"
          >
            ${entity.rw_name || entity.rw_id || "Wilayah"}
          </span>
        </div>

        <h4
          class="font-bold text-sm text-slate-900 leading-snug mb-1"
        >
          ${entity.name}
        </h4>

        <p
          class="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-2"
        >
          ${entity.description || "Informasi fasilitas belum tersedia."}
        </p>

        <button
          id="btn-popup-detail-${entity.id}"
          class="w-full py-1.5 px-3 rounded-lg bg-[#633B83] hover:bg-[#7E549E] active:scale-98 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1 shadow-sm cursor-pointer"
        >
          <span>
            Lihat Detail Lengkap
          </span>
        </button>
      `;

      /**
       * ======================================================
       * DETAIL BUTTON
       * ======================================================
       */
      const detailBtn = popupHtml.querySelector(
        `#btn-popup-detail-${entity.id}`,
      );

      if (detailBtn) {
        detailBtn.addEventListener("click", (e) => {
          e.preventDefault();

          onSelectEntity(entity);
        });
      }

      /**
       * ======================================================
       * BIND POPUP
       * ======================================================
       */
      marker.bindPopup(popupHtml, {
        maxWidth: 280,
        className: "custom-leaflet-popup",
      });

      /**
       * ======================================================
       * MARKER CLICK
       * ======================================================
       */
      marker.on("click", () => {
        map.panTo([entity.latitude, entity.longitude], {
          animate: true,
        });
      });

      markersGroup.addLayer(marker);

      /**
       * ======================================================
       * AUTO OPEN SELECTED MARKER
       * ======================================================
       */
      if (isSelected) {
        setTimeout(() => {
          marker.openPopup();

          map.setView([entity.latitude, entity.longitude], 16, {
            animate: true,
          });
        }, 150);
      }
    });
  }, [entities, selectedEntityId, categoryMap, onSelectEntity]);

  /**
   * ==========================================================
   * RESET VIEW
   * ==========================================================
   */
  const handleResetView = () => {
    const map = mapInstanceRef.current;

    if (!map) return;

    setIsOffBounds(false);

    if (
      geoJsonLayerRef.current &&
      geoJsonLayerRef.current.getBounds().isValid()
    ) {
      map.fitBounds(geoJsonLayerRef.current.getBounds(), {
        padding: [30, 30],
        animate: true,
      });
    } else {
      map.setView([-0.8345, 100.3621], 13, {
        animate: true,
      });
    }
  };

  /**
   * ==========================================================
   * USER GEOLOCATION
   * ==========================================================
   */
  const handleLocateMe = () => {
    const map = mapInstanceRef.current;

    const userGroup = userLocationLayerRef.current;

    if (!map || !userGroup) {
      return;
    }

    if (!navigator.geolocation) {
      setLocationError("Browser Anda tidak mendukung geolokasi GPS.");

      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);

        const { latitude, longitude, accuracy } = pos.coords;

        userGroup.clearLayers();

        /**
         * Accuracy Circle
         */
        const accuracyCircle = L.circle([latitude, longitude], {
          radius: accuracy,
          color: "#3b82f6",
          fillColor: "#60a5fa",
          fillOpacity: 0.15,
          weight: 1,
        });

        /**
         * User Marker
         */
        const userIcon = L.divIcon({
          html: `
              <div
                class="relative flex items-center justify-center w-6 h-6"
              >
                <span
                  class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"
                ></span>

                <span
                  class="relative inline-flex rounded-full h-4 w-4 bg-blue-600 border-2 border-white shadow-md"
                ></span>
              </div>
            `,
          className: "",
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });

        const userMarker = L.marker([latitude, longitude], {
          icon: userIcon,
        });

        userMarker.bindPopup(
          `
            <div
              class="p-1 font-sans text-xs"
            >
              <strong>
                Lokasi Anda Saat Ini
              </strong>
              <br/>
              Akurasi ±
              ${Math.round(accuracy)}
              meter
            </div>
          `,
        );

        userGroup.addLayer(accuracyCircle);

        userGroup.addLayer(userMarker);

        map.setView([latitude, longitude], 15, {
          animate: true,
        });

        userMarker.openPopup();
      },

      (err) => {
        setIsLocating(false);

        setLocationError(`Gagal membaca lokasi: ${err.message}`);
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
      },
    );
  };

  /**
   * ==========================================================
   * FULLSCREEN
   * ==========================================================
   */
  const handleToggleFullscreen = () => {
    const container = mapContainerRef.current?.parentElement;

    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().then(() => {
        setIsFullscreen(true);

        setTimeout(() => {
          mapInstanceRef.current?.invalidateSize();
        }, 200);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);

        setTimeout(() => {
          mapInstanceRef.current?.invalidateSize();
        }, 200);
      });
    }
  };

  /**
   * ==========================================================
   * RENDER
   * ==========================================================
   */
  return (
    <div
      className="
        relative
        w-full
        h-[520px]
        sm:h-[620px]
        rounded-2xl
        overflow-hidden
        shadow-lg
        border
        border-slate-200
        bg-slate-100
      "
    >
      {/* =====================================================
          MAP CONTAINER
          ===================================================== */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* =====================================================
          BASEMAP SELECTOR
          ===================================================== */}
      <div
        className="
          absolute
          top-3
          left-3
          z-10
          bg-white/95
          backdrop-blur-md
          p-1.5
          rounded-xl
          shadow-md
          border
          border-slate-200
          flex
          items-center
          gap-1
        "
      >
        {/* OSM */}
        <button
          onClick={() => setActiveBasemap("osm")}
          className={`
            px-2.5
            py-1
            rounded-lg
            text-xs
            font-semibold
            transition-all
            cursor-pointer
            ${
              activeBasemap === "osm"
                ? "bg-[#633B83] text-white shadow-xs"
                : "text-slate-700 hover:bg-slate-100"
            }
          `}
          title="OpenStreetMap Default"
        >
          OSM
        </button>

        {/* ESRI STREET */}
        <button
          onClick={() => setActiveBasemap("esri_street")}
          className={`
            px-2.5
            py-1
            rounded-lg
            text-xs
            font-semibold
            transition-all
            cursor-pointer
            ${
              activeBasemap === "esri_street"
                ? "bg-[#633B83] text-white shadow-xs"
                : "text-slate-700 hover:bg-slate-100"
            }
          `}
          title="ESRI Street Map"
        >
          ESRI Street
        </button>

        {/* SATELLITE */}
        <button
          onClick={() => setActiveBasemap("esri_satellite")}
          className={`
            px-2.5
            py-1
            rounded-lg
            text-xs
            font-semibold
            transition-all
            cursor-pointer
            ${
              activeBasemap === "esri_satellite"
                ? "bg-[#633B83] text-white shadow-xs"
                : "text-slate-700 hover:bg-slate-100"
            }
          `}
          title="ESRI Satellite / Citra"
        >
          Satelit
        </button>
      </div>

      {/* =====================================================
          FLOATING ACTION CONTROLS
          ===================================================== */}
      <div
        className="
          absolute
          top-20
          right-3
          z-10
          flex
          flex-col
          gap-2
        "
      >
        {/* RESET */}
        <button
          onClick={handleResetView}
          className="
            p-2.5
            bg-white/95
            backdrop-blur-md
            rounded-xl
            shadow-md
            border
            border-slate-200
            text-slate-700
            hover:text-[#633B83]
            hover:bg-white
            active:bg-slate-50
            transition-colors
            cursor-pointer
          "
          title="Fokus Ulang Batas Balai Gadang"
          aria-label="Fokus Batas Wilayah"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* LOCATE */}
        <button
          onClick={handleLocateMe}
          disabled={isLocating}
          className={`
            p-2.5
            bg-white/95
            backdrop-blur-md
            rounded-xl
            shadow-md
            border
            border-slate-200
            transition-colors
            cursor-pointer
            ${
              isLocating
                ? "text-[#7E549E] animate-pulse"
                : "text-slate-700 hover:text-[#7E549E] hover:bg-white"
            }
          `}
          title="Tampilkan Lokasi Saya"
          aria-label="Lokasi Saya"
        >
          <Locate className="w-4 h-4" />
        </button>

        {/* FULLSCREEN */}
        <button
          onClick={handleToggleFullscreen}
          className="
            p-2.5
            bg-white/95
            backdrop-blur-md
            rounded-xl
            shadow-md
            border
            border-slate-200
            text-slate-700
            hover:text-slate-900
            hover:bg-white
            transition-colors
            cursor-pointer
          "
          title={isFullscreen ? "Keluar Layar Penuh" : "Layar Penuh"}
          aria-label="Layar Penuh"
        >
          {isFullscreen ? (
            <Minimize2 className="w-4 h-4" />
          ) : (
            <Maximize2 className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* =====================================================
          OFF-BOUNDS PROMPT
          ===================================================== */}
      {isOffBounds && (
        <div
          className="
            absolute
            top-3
            left-1/2
            -translate-x-1/2
            z-20
            max-w-[92%]
            sm:max-w-md
            w-auto
          "
        >
          <div
            className="
              bg-slate-900/95
              backdrop-blur-md
              text-white
              px-3.5
              sm:px-4
              py-2.5
              rounded-2xl
              shadow-2xl
              border
              border-[#8F66AC]/50
              flex
              items-center
              justify-between
              gap-3
              animate-bounce-short
            "
          >
            <div
              className="
                flex
                items-center
                gap-2
                min-w-0
              "
            >
              <span
                className="
                  w-2.5
                  h-2.5
                  rounded-full
                  bg-[#FCA228]
                  animate-ping
                  flex-shrink-0
                "
              />

              <span
                className="
                  text-xs
                  font-semibold
                  text-slate-200
                  truncate
                "
              >
                Peta di luar batas wilayah
              </span>
            </div>

            <button
              onClick={handleResetView}
              id="btn-refocus-polygon"
              className="
                flex-shrink-0
                px-3
                py-1.5
                rounded-xl
                bg-gradient-to-r
                from-[#633B83]
                to-[#7E549E]
                hover:from-[#7E549E]
                hover:to-[#633B83]
                text-white
                text-xs
                font-bold
                transition-all
                shadow-md
                flex
                items-center
                gap-1.5
                cursor-pointer
              "
            >
              <RotateCcw className="w-3.5 h-3.5" />

              <span>Fokus ke Wilayah</span>
            </button>
          </div>
        </div>
      )}

      {/* =====================================================
          BOTTOM INFORMATION
          ===================================================== */}
      <div
        className="
          absolute
          bottom-3
          left-3
          z-10
          bg-slate-900/85
          backdrop-blur-md
          text-white
          px-3
          py-1.5
          rounded-xl
          text-xs
          font-medium
          flex
          items-center
          gap-2
          shadow-md
          border
          border-slate-700/60
          max-w-[calc(100%-24px)]
        "
      >
        <span
          className="
            w-2
            h-2
            rounded-full
            bg-[#FCCB5D]
            animate-pulse
          "
        />

        <span className="truncate">
          Menampilkan {entities.length} titik{" "}
          {activeRwId ? `di ${activeRwId}` : "di seluruh wilayah"}
        </span>
      </div>

      {/* =====================================================
          GEOLOCATION ERROR
          ===================================================== */}
      {locationError && (
        <div
          className="
            absolute
            top-14
            left-1/2
            -translate-x-1/2
            z-20
            bg-rose-600
            text-white
            px-4
            py-2
            rounded-xl
            text-xs
            font-medium
            shadow-lg
            flex
            items-center
            gap-2
          "
        >
          <span>{locationError}</span>

          <button
            onClick={() => setLocationError(null)}
            className="
              text-white/80
              hover:text-white
              font-bold
              ml-2
            "
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};
