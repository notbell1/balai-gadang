import L from 'leaflet';
import { BasemapConfig, BasemapId, CategoryConfig, UnifiedEntity } from '../types';

export const BASEMAPS: Record<BasemapId, BasemapConfig> = {
  osm: {
    id: 'osm',
    name: 'OpenStreetMap',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
    maxZoom: 19,
  },
  esri_street: {
    id: 'esri_street',
    name: 'ESRI Street Map',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; <a href="https://www.esri.com" target="_blank" rel="noopener noreferrer">Esri</a> &mdash; Street Map',
    maxZoom: 19,
  },
  esri_satellite: {
    id: 'esri_satellite',
    name: 'ESRI Satellite / Citra',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; <a href="https://www.esri.com" target="_blank" rel="noopener noreferrer">Esri</a>, Earthstar Geographics &mdash; Citra Satelit',
    maxZoom: 19,
  },
};

/**
 * Returns SVG path icon based on icon identifier
 */
export function getCategorySvgIcon(iconName: string): string {
  switch (iconName.toLowerCase()) {
    case 'building2':
    case 'government':
      return `<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>`;
    case 'heartpulse':
    case 'health':
      return `<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/>`;
    case 'graduationcap':
    case 'education':
      return `<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>`;
    case 'landmark':
    case 'religious':
      return `<line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/>`;
    case 'trophy':
    case 'sports':
      return `<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>`;
    case 'users':
    case 'youth':
      return `<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>`;
    case 'store':
    case 'umkm':
      return `<path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7a2 2 0 0 1-2 2 2.5 2.5 0 0 1-2.5-2.5V7"/><path d="M17.5 7v-.5A2.5 2.5 0 0 0 15 9a2.5 2.5 0 0 0-2.5-2.5V7"/><path d="M12.5 7v-.5A2.5 2.5 0 0 0 10 9a2.5 2.5 0 0 0-2.5-2.5V7"/><path d="M7.5 7v-.5A2.5 2.5 0 0 0 5 9a2 2 0 0 1-2-2"/>`;
    case 'trees':
    case 'tourism':
      return `<path d="M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z"/><path d="M7 16v6"/><path d="M13 19v3"/><path d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-4 4.3a1 1 0 0 0 .8 1.7H10l-3 3.3a1 1 0 0 0 .7 1.7H10l-3 3.3a1 1 0 0 0 .7 1.7Z"/>`;
    case 'waves':
    case 'flood_risk':
      return `<path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>`;
    default:
      return `<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>`;
  }
}

/**
 * Creates custom SVG HTML Pin for Leaflet DivIcon
 */
export function createCustomMarkerIcon(
  entity: UnifiedEntity,
  category: CategoryConfig | undefined,
  isSelected: boolean = false
): L.DivIcon {
  const color = category?.color || '#0284c7';
  const iconSvg = getCategorySvgIcon(category?.icon || 'MapPin');
  const isPotential = entity.type === 'potential';

  const size = isSelected ? 44 : 36;
  const height = isSelected ? 54 : 44;
  const anchorY = height;

  // Distinct visual styling:
  // Facility: Solid colored pin with crisp white badge center
  // Potential: Solid pin with golden star badge & diamond outer halo
  const haloHtml = isPotential
    ? `<div class="absolute -top-1 -left-1 w-[calc(100%+8px)] h-[calc(100%+8px)] rounded-full border-2 border-amber-400 opacity-90 animate-pulse pointer-events-none"></div>`
    : '';

  const typeBadge = isPotential
    ? `<span class="absolute -top-2 -right-2 bg-amber-500 text-white rounded-full p-0.5 shadow-sm">
        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
      </span>`
    : '';

  const html = `
    <div class="custom-map-pin relative group transition-transform duration-200 ${isSelected ? 'scale-115 z-50' : 'hover:scale-110 z-10'}" style="width: ${size}px; height: ${height}px;">
      ${haloHtml}
      <!-- Pin SVG Base -->
      <svg viewBox="0 0 36 46" width="${size}" height="${height}" class="drop-shadow-md overflow-visible">
        <defs>
          <filter id="shadow-${entity.id}" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.3"/>
          </filter>
        </defs>
        <!-- Pin Body -->
        <path d="M18 0 C8.058 0 0 8.058 0 18 C0 27.5 14 42 18 46 C22 42 36 27.5 36 18 C36 8.058 27.942 0 18 0 Z" 
              fill="${color}" 
              stroke="${isSelected ? '#ffffff' : (isPotential ? '#fef08a' : '#ffffff')}" 
              stroke-width="${isSelected ? 2.5 : 1.5}"
        />
        <!-- Inner Disc -->
        <circle cx="18" cy="18" r="12" fill="#ffffff" />
        <!-- Icon Container -->
        <g transform="translate(10, 10) scale(0.65)" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none">
          ${iconSvg}
        </g>
      </svg>
      ${typeBadge}
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-leaflet-div-icon',
    iconSize: [size, height],
    iconAnchor: [size / 2, anchorY],
    popupAnchor: [0, -anchorY + 6],
  });
}

/**
 * Generates an inverted polygon polygon mask (world rectangle with a hole inside for Balai Gadang)
 * to darken & desaturate the surrounding non-Balai-Gadang areas.
 */
export function createInvertedMaskGeoJson(
  kelurahanGeoJson: GeoJSON.FeatureCollection
): GeoJSON.FeatureCollection {
  const worldOuterRing = [
    [-180, -90],
    [180, -90],
    [180, 90],
    [-180, 90],
    [-180, -90],
  ];

  const features: GeoJSON.Feature[] = [];

  const mainPolygon = kelurahanGeoJson.features[0];
  if (mainPolygon && mainPolygon.geometry && mainPolygon.geometry.type === 'Polygon') {
    const coordinates = (mainPolygon.geometry as GeoJSON.Polygon).coordinates;
    const innerRing = coordinates[0]; // Hole coordinates

    features.push({
      type: 'Feature',
      properties: {
        mask: true,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [worldOuterRing, innerRing],
      },
    });
  }

  return {
    type: 'FeatureCollection',
    features,
  };
}
