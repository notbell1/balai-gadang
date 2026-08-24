export interface CategoryConfig {
  id: string;
  name: string;
  color: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
  icon: string;
  description: string;
}

export interface RWData {
  rw_id: string;
  rw_number: number;
  name: string;
  description: string;
  rt_count?: number;
  leader_name?: string;
  phone?: string;
}

export interface FacilityItem {
  facility_id: string;
  name: string;
  category: string;
  rw_id: string;
  latitude: number;
  longitude: number;
  address: string;
  description: string;
  photo: string;
  operational_hours?: string;
  contact_info?: string;
}

export interface PotentialItem {
  potential_id: string;
  name: string;
  category: string;
  rw_id: string;
  latitude: number;
  longitude: number;
  address: string;
  description: string;
  photo: string;
  contact_person?: string;
  highlight_info?: string;
}

export type EntityType = 'facility' | 'potential';

export interface UnifiedEntity {
  id: string;
  type: EntityType;
  name: string;
  category: string;
  rw_id: string;
  rw_name: string;
  latitude: number;
  longitude: number;
  address: string;
  description: string;
  photo: string;
  extraInfo?: string;
  contact?: string;
  operationalHours?: string;
  raw: FacilityItem | PotentialItem;
}

export interface InformationItem {
  info_id: string;
  title: string;
  category: string;
  date: string;
  summary: string;
  content: string;
  author: string;
  badge_type: string;
  is_pinned: boolean;
  contact?: string;
}

export interface ProfileData {
  general: {
    name: string;
    district: string;
    city: string;
    province: string;
    postalCode: string;
    areaSqKm: number;
    totalPopulation: number;
    totalHouseholds: number;
    malePopulation: number;
    femalePopulation: number;
    densityPerSqKm: number;
    elevationMeters: string;
    slogan: string;
  };
  boundaries: {
    north: string;
    south: string;
    west: string;
    east: string;
  };
  vision: string;
  missions: string[];
  history: string;
  leadership: {
    lurah: string;
    sekretaris: string;
    kasiPemerintahan: string;
    kasiKesosPB: string;
    staff1: string;
    staff2: string;
    bhabinkamtibmas: string;
  };
  contact: {
    officeAddress: string;
    phone: string;
    whatsapp: string;
    email: string;
    operatingHours: string;
    googleMapsUrl: string;
  };
  publicServices: Array<{
    name: string;
    requirements: string;
    processTime: string;
  }>;
}

export interface DataVersion {
  version: string;
  lastUpdated: string;
  source: string;
  dataCustodian: string;
  contactEmail: string;
  notes: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  description: string;
  image: string;
  date: string;
  location: string;
}

export interface ValidationIssue {
  type: 'error' | 'warning';
  file: string;
  entityId?: string;
  message: string;
}

export interface KknMember {
  id: string;
  name: string;
  nim: string;
  role: string;
  division: string;
  major: string;
  faculty: string;
  university: string;
  photo: string;
  phone?: string;
  email?: string;
  quote?: string;
  programs: string[];
}

export interface KknWebDeveloper {
  name: string;
  nim: string;
  major: string;
  faculty: string;
  university: string;
  role: string;
  bio: string;
  techStack?: string[];
  focusAreas?: string[];
  responsibilities: string[];
}

export interface KknTeamData {
  groupName: string;
  theme: string;
  period: string;
  university: string;
  faculty: string;
  dplName: string;
  dplNip?: string;
  location: string;
  summary: string;
  webDeveloper?: KknWebDeveloper;
  members: KknMember[];
}

export interface AppDataState {
  categories: CategoryConfig[];
  categoryMap: Map<string, CategoryConfig>;
  rws: RWData[];
  rwMap: Map<string, RWData>;
  facilities: FacilityItem[];
  potentials: PotentialItem[];
  unifiedEntities: UnifiedEntity[];
  information: InformationItem[];
  profile: ProfileData | null;
  dataVersion: DataVersion | null;
  gallery: GalleryItem[];
  kknTeam: KknTeamData | null;
  geoJson: GeoJSON.FeatureCollection | null;
  validationIssues: ValidationIssue[];
  isLoading: boolean;
  error: string | null;
}

export interface FilterState {
  search: string;
  category: string;
  rw_id: string;
  entityType: 'all' | 'facility' | 'potential';
}

export type BasemapId = 'osm' | 'esri_street' | 'esri_satellite';

export interface BasemapConfig {
  id: BasemapId;
  name: string;
  url: string;
  attribution: string;
  maxZoom: number;
}
