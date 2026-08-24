import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import {
  BASEMAPS,
  createCustomMarkerIcon,
  createInvertedMaskGeoJson,
} from '../lib/mapUtils';
import {
  BasemapId,
  CategoryConfig,
  UnifiedEntity,
} from '../types';
import {
  Layers,
  Locate,
  RotateCcw,
  Maximize2,
  Minimize2,
  Info,
  ExternalLink,
} from 'lucide-react';

interface MapViewProps {
  entities: UnifiedEntity[];
  categories: CategoryConfig[];
  categoryMap: Map<string, CategoryConfig>;
  geoJson: GeoJSON.FeatureCollection | null;
  selectedEntityId: string | null;
  onSelectEntity: (entity: UnifiedEntity) => void;
  activeRwId: string;
}

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

  const [activeBasemap, setActiveBasemap] = useState<BasemapId>('osm');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isOffBounds, setIsOffBounds] = useState(false);

  // Check if map view is too far from Balai Gadang polygon
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

    // If map view doesn't intersect polygon or center is > 4.5 km away
    if (!intersects || distanceKm > 4.5) {
      setIsOffBounds(true);
    } else {
      setIsOffBounds(false);
    }
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Center of Balai Gadang, Koto Tangah
    const defaultCenter: L.LatLngExpression = [-0.8345, 100.3621];
    const defaultZoom = 13;

    const map = L.map(mapContainerRef.current, {
      center: defaultCenter,
      zoom: defaultZoom,
      minZoom: 10,
      maxZoom: 18,
      zoomControl: false, // We place custom ergonomic zoom controls
    });

    // Add Zoom control at top-right
    L.control
      .zoom({
        position: 'topright',
      })
      .addTo(map);

    // Initial Basemap
    const basemapConfig = BASEMAPS.osm;
    const tileLayer = L.tileLayer(basemapConfig.url, {
      attribution: basemapConfig.attribution,
      maxZoom: basemapConfig.maxZoom,
    }).addTo(map);

    tileLayerRef.current = tileLayer;

    // Layers groups
    markersLayerRef.current = L.layerGroup().addTo(map);
    userLocationLayerRef.current = L.layerGroup().addTo(map);

    mapInstanceRef.current = map;

    // Attach moveend listener for far-pan detection
    map.on('moveend', checkBounds);

    // Invalidate size after mount
    setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      map.off('moveend', checkBounds);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Basemap
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

  // Update GeoJSON & Mask
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !geoJson) return;

    // 1. Remove old layers
    if (maskLayerRef.current) {
      map.removeLayer(maskLayerRef.current);
    }
    if (geoJsonLayerRef.current) {
      map.removeLayer(geoJsonLayerRef.current);
    }

    // 2. Render Inverted Mask (darkens outside area)
    const maskGeoJson = createInvertedMaskGeoJson(geoJson);
    const maskLayer = L.geoJSON(maskGeoJson, {
      style: {
        fillColor: '#0f172a',
        fillOpacity: 0.35,
        stroke: false,
      },
      interactive: false,
    }).addTo(map);
    maskLayerRef.current = maskLayer;

    // 3. Render Balai Gadang Boundary
    const boundaryLayer = L.geoJSON(geoJson, {
      style: {
        color: '#633B83', // Royal Purple municipal boundary
        weight: 3.5,
        opacity: 0.95,
        fillColor: '#7E549E',
        fillOpacity: 0.05,
        dashArray: '6, 6',
      },
      interactive: false,
    }).addTo(map);
    geoJsonLayerRef.current = boundaryLayer;

    // Fit bounds to polygon initially
    const bounds = boundaryLayer.getBounds();
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [30, 30] });
    }
  }, [geoJson]);

  // Update Markers when entities, filters, or selectedEntityId changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersGroup = markersLayerRef.current;
    if (!map || !markersGroup) return;

    markersGroup.clearLayers();

    entities.forEach((entity) => {
      const category = categoryMap.get(entity.category);
      const isSelected = entity.id === selectedEntityId;
      const markerIcon = createCustomMarkerIcon(entity, category, isSelected);

      const marker = L.marker([entity.latitude, entity.longitude], {
        icon: markerIcon,
        zIndexOffset: isSelected ? 1000 : entity.type === 'potential' ? 500 : 100,
      });

      // Custom Popup HTML
      const popupHtml = document.createElement('div');
      popupHtml.className = 'p-1 max-w-[260px] font-sans';
      popupHtml.innerHTML = `
        <div class="relative rounded-lg overflow-hidden mb-2 bg-slate-100 aspect-[16/10]">
          <img src="${entity.photo}" alt="${entity.name}" class="w-full h-full object-cover" onerror="this.src='/images/facilities/kantor-lurah.jpg';" />
          <span class="absolute top-1.5 left-1.5 px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase shadow-sm" style="background-color: ${category?.color || '#0284c7'}">
            ${category?.name || entity.category}
          </span>
          <span class="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-900/80 text-white backdrop-blur-xs">
            ${entity.rw_name}
          </span>
        </div>
        <h4 class="font-bold text-sm text-slate-900 leading-snug mb-1">${entity.name}</h4>
        <p class="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-2">${entity.description}</p>
        <button id="btn-popup-detail-${entity.id}" class="w-full py-1.5 px-3 rounded-lg bg-[#633B83] hover:bg-[#7E549E] active:scale-98 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1 shadow-sm cursor-pointer">
          <span>Lihat Detail Lengkap</span>
        </button>
      `;

      // Attach button click event
      const detailBtn = popupHtml.querySelector(`#btn-popup-detail-${entity.id}`);
      if (detailBtn) {
        detailBtn.addEventListener('click', (e) => {
          e.preventDefault();
          onSelectEntity(entity);
        });
      }

      marker.bindPopup(popupHtml, {
        maxWidth: 280,
        className: 'custom-leaflet-popup',
      });

      marker.on('click', () => {
        // Center slightly offset so popup is visible
        map.panTo([entity.latitude, entity.longitude], { animate: true });
      });

      markersGroup.addLayer(marker);

      // Auto open popup if selected
      if (isSelected) {
        setTimeout(() => {
          marker.openPopup();
          map.setView([entity.latitude, entity.longitude], 16, { animate: true });
        }, 150);
      }
    });
  }, [entities, selectedEntityId, categoryMap, onSelectEntity]);

  // Reset View to Balai Gadang Polygon
  const handleResetView = () => {
    const map = mapInstanceRef.current;
    if (!map) return;

    setIsOffBounds(false);

    if (geoJsonLayerRef.current && geoJsonLayerRef.current.getBounds().isValid()) {
      map.fitBounds(geoJsonLayerRef.current.getBounds(), { padding: [30, 30], animate: true });
    } else {
      map.setView([-0.8345, 100.3621], 13, { animate: true });
    }
  };

  // User Geolocation
  const handleLocateMe = () => {
    const map = mapInstanceRef.current;
    const userGroup = userLocationLayerRef.current;
    if (!map || !userGroup) return;

    if (!navigator.geolocation) {
      setLocationError('Browser Anda tidak mendukung geolokasi GPS.');
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        const { latitude, longitude, accuracy } = pos.coords;

        userGroup.clearLayers();

        // Accuracy Circle
        const accuracyCircle = L.circle([latitude, longitude], {
          radius: accuracy,
          color: '#3b82f6',
          fillColor: '#60a5fa',
          fillOpacity: 0.15,
          weight: 1,
        });

        // Pulse User Marker
        const userIcon = L.divIcon({
          html: `
            <div class="relative flex items-center justify-center w-6 h-6">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-4 w-4 bg-blue-600 border-2 border-white shadow-md"></span>
            </div>
          `,
          className: '',
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });

        const userMarker = L.marker([latitude, longitude], { icon: userIcon });
        userMarker.bindPopup(
          `<div class="p-1 font-sans text-xs"><strong>Lokasi Anda Saat Ini</strong><br/>Akurasi ± ${Math.round(accuracy)} meter</div>`
        );

        userGroup.addLayer(accuracyCircle);
        userGroup.addLayer(userMarker);

        map.setView([latitude, longitude], 15, { animate: true });
        userMarker.openPopup();
      },
      (err) => {
        setIsLocating(false);
        setLocationError(`Gagal membaca lokasi: ${err.message}`);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Toggle Fullscreen
  const handleToggleFullscreen = () => {
    const container = mapContainerRef.current?.parentElement;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().then(() => {
        setIsFullscreen(true);
        setTimeout(() => mapInstanceRef.current?.invalidateSize(), 200);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
        setTimeout(() => mapInstanceRef.current?.invalidateSize(), 200);
      });
    }
  };

  return (
    <div className="relative w-full h-[520px] sm:h-[620px] rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100">
      {/* Map Leaflet Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Floating Control: Basemap Selector (Top Left) */}
      <div className="absolute top-3 left-3 z-10 bg-white/95 backdrop-blur-md p-1.5 rounded-xl shadow-md border border-slate-200 flex items-center gap-1">
        <button
          onClick={() => setActiveBasemap('osm')}
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeBasemap === 'osm'
              ? 'bg-[#633B83] text-white shadow-xs'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
          title="OpenStreetMap Default"
        >
          OSM
        </button>
        <button
          onClick={() => setActiveBasemap('esri_street')}
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeBasemap === 'esri_street'
              ? 'bg-[#633B83] text-white shadow-xs'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
          title="ESRI Street Map"
        >
          ESRI Street
        </button>
        <button
          onClick={() => setActiveBasemap('esri_satellite')}
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeBasemap === 'esri_satellite'
              ? 'bg-[#633B83] text-white shadow-xs'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
          title="ESRI Satellite / Citra"
        >
          Satelit
        </button>
      </div>

      {/* Floating Action Controls (Top Right Below Zoom) */}
      <div className="absolute top-20 right-3 z-10 flex flex-col gap-2">
        {/* Reset View */}
        <button
          onClick={handleResetView}
          className="p-2.5 bg-white/95 backdrop-blur-md rounded-xl shadow-md border border-slate-200 text-slate-700 hover:text-[#633B83] hover:bg-white active:bg-slate-50 transition-colors cursor-pointer"
          title="Fokus Ulang Batas Balai Gadang"
          aria-label="Fokus Batas Wilayah"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Locate Me */}
        <button
          onClick={handleLocateMe}
          disabled={isLocating}
          className={`p-2.5 bg-white/95 backdrop-blur-md rounded-xl shadow-md border border-slate-200 transition-colors cursor-pointer ${
            isLocating
              ? 'text-[#7E549E] animate-pulse'
              : 'text-slate-700 hover:text-[#7E549E] hover:bg-white'
          }`}
          title="Tampilkan Lokasi Saya"
          aria-label="Lokasi Saya"
        >
          <Locate className="w-4 h-4" />
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={handleToggleFullscreen}
          className="p-2.5 bg-white/95 backdrop-blur-md rounded-xl shadow-md border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-white transition-colors cursor-pointer"
          title={isFullscreen ? 'Keluar Layar Penuh' : 'Layar Penuh'}
          aria-label="Layar Penuh"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Floating Refocus Prompt when user pans too far */}
      {isOffBounds && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 max-w-[92%] sm:max-w-md w-auto">
          <div className="bg-slate-900/95 backdrop-blur-md text-white px-3.5 sm:px-4 py-2.5 rounded-2xl shadow-2xl border border-[#8F66AC]/50 flex items-center justify-between gap-3 animate-bounce-short">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FCA228] animate-ping flex-shrink-0"></span>
              <span className="text-xs font-semibold text-slate-200 truncate">
                Peta di luar batas wilayah
              </span>
            </div>
            <button
              onClick={handleResetView}
              id="btn-refocus-polygon"
              className="flex-shrink-0 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#633B83] to-[#7E549E] hover:from-[#7E549E] hover:to-[#633B83] text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Fokus ke Wilayah</span>
            </button>
          </div>
        </div>
      )}

      {/* Bottom Information Pill */}
      <div className="absolute bottom-3 left-3 z-10 bg-slate-900/85 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-2 shadow-md border border-slate-700/60 max-w-[calc(100%-24px)]">
        <span className="w-2 h-2 rounded-full bg-[#FCCB5D] animate-pulse"></span>
        <span className="truncate">
          Menampilkan {entities.length} titik {activeRwId ? `di ${activeRwId}` : 'di seluruh wilayah'}
        </span>
      </div>

      {/* Geolocation Error Toast */}
      {locationError && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-20 bg-rose-600 text-white px-4 py-2 rounded-xl text-xs font-medium shadow-lg flex items-center gap-2">
          <span>{locationError}</span>
          <button
            onClick={() => setLocationError(null)}
            className="text-white/80 hover:text-white font-bold ml-2"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};
