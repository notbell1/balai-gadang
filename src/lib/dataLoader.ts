import { parseCSV } from './csvParser';
import { validateAndSanitizeData } from './validators';
import {
  AppDataState,
  CategoryConfig,
  ProfileData,
  DataVersion,
  GalleryItem,
  KknTeamData,
  RWData,
} from '../types';

export async function loadAppData(): Promise<AppDataState> {
  try {
    // Parallel fetch for speed & efficiency
    const [
      categoriesRes,
      profileRes,
      dataVersionRes,
      galleryRes,
      kknTeamRes,
      geoJsonRes,
      rwCsvRes,
      facilitiesCsvRes,
      potentialsCsvRes,
      infoCsvRes,
    ] = await Promise.all([
      fetch('/data/categories.json').then((r) => (r.ok ? r.json() : [])),
      fetch('/data/profile.json').then((r) => (r.ok ? r.json() : null)),
      fetch('/data/data-version.json').then((r) => (r.ok ? r.json() : null)),
      fetch('/data/gallery.json').then((r) => (r.ok ? r.json() : [])),
      fetch('/data/kkn-team.json').then((r) => (r.ok ? r.json() : null)),
      fetch('/data/balai-gadang.geojson').then((r) => (r.ok ? r.json() : null)),
      fetch('/data/rw.csv').then((r) => (r.ok ? r.text() : '')),
      fetch('/data/facilities.csv').then((r) => (r.ok ? r.text() : '')),
      fetch('/data/potentials.csv').then((r) => (r.ok ? r.text() : '')),
      fetch('/data/information.csv').then((r) => (r.ok ? r.text() : '')),
    ]);

    const categories: CategoryConfig[] = Array.isArray(categoriesRes) ? categoriesRes : [];
    const profile: ProfileData | null = profileRes;
    const dataVersion: DataVersion | null = dataVersionRes;
    const gallery: GalleryItem[] = Array.isArray(galleryRes) ? galleryRes : [];
    const kknTeam: KknTeamData | null = kknTeamRes;
    const geoJson: GeoJSON.FeatureCollection | null = geoJsonRes;

    const rwParsed = parseCSV<Record<string, string>>(rwCsvRes);
    const facilitiesParsed = parseCSV<Record<string, string>>(facilitiesCsvRes);
    const potentialsParsed = parseCSV<Record<string, string>>(potentialsCsvRes);
    const infoParsed = parseCSV<Record<string, string>>(infoCsvRes);

    const validation = validateAndSanitizeData(
      rwParsed.data,
      facilitiesParsed.data,
      potentialsParsed.data,
      infoParsed.data,
      categories
    );

    const categoryMap = new Map<string, CategoryConfig>();
    categories.forEach((cat) => categoryMap.set(cat.id.toLowerCase(), cat));

    const rwMap = new Map<string, RWData>();
    validation.validRws.forEach((rw) => rwMap.set(rw.rw_id, rw));

    return {
      categories,
      categoryMap,
      rws: validation.validRws,
      rwMap,
      facilities: validation.validFacilities,
      potentials: validation.validPotentials,
      unifiedEntities: validation.unifiedEntities,
      information: validation.validInformation,
      profile,
      dataVersion,
      gallery,
      kknTeam,
      geoJson,
      validationIssues: validation.issues,
      isLoading: false,
      error: null,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Gagal memuat dataset publik Kelurahan Balai Gadang.';
    return {
      categories: [],
      categoryMap: new Map(),
      rws: [],
      rwMap: new Map(),
      facilities: [],
      potentials: [],
      unifiedEntities: [],
      information: [],
      profile: null,
      dataVersion: null,
      gallery: [],
      kknTeam: null,
      geoJson: null,
      validationIssues: [{ type: 'error', file: 'global', message: errorMsg }],
      isLoading: false,
      error: errorMsg,
    };
  }
}
