import {
  CategoryConfig,
  RWData,
  FacilityItem,
  PotentialItem,
  InformationItem,
  UnifiedEntity,
  ValidationIssue,
} from '../types';

export interface ValidationResult {
  validRws: RWData[];
  validFacilities: FacilityItem[];
  validPotentials: PotentialItem[];
  validInformation: InformationItem[];
  unifiedEntities: UnifiedEntity[];
  issues: ValidationIssue[];
}

export function validateAndSanitizeData(
  rawRws: Record<string, string>[],
  rawFacilities: Record<string, string>[],
  rawPotentials: Record<string, string>[],
  rawInformation: Record<string, string>[],
  categories: CategoryConfig[]
): ValidationResult {
  const issues: ValidationIssue[] = [];
  const categoryIds = new Set(categories.map((c) => c.id.toLowerCase()));

  // 1. Process RWs
  const validRws: RWData[] = [];
  const rwIds = new Set<string>();
  const rwMap = new Map<string, RWData>();

  rawRws.forEach((row, idx) => {
    const rawId = row.rw_id || `RW_UNKNOWN_${idx + 1}`;
    const id = rawId.trim();

    if (!row.rw_id) {
      issues.push({
        type: 'warning',
        file: 'rw.csv',
        entityId: id,
        message: `Baris ${idx + 1}: rw_id kosong, menggunakan ID fallback: ${id}`,
      });
    }

    if (rwIds.has(id)) {
      issues.push({
        type: 'error',
        file: 'rw.csv',
        entityId: id,
        message: `Duplikasi rw_id "${id}" ditemukan pada baris ${idx + 1}. Melewati baris duplikat.`,
      });
      return;
    }

    rwIds.add(id);

    const rwNumber = parseInt(row.rw_number || '0', 10) || idx + 1;
    const rtCount = parseInt(row.rt_count || '0', 10) || undefined;

    const rwItem: RWData = {
      rw_id: id,
      rw_number: rwNumber,
      name: row.name || `RW ${rwNumber.toString().padStart(2, '0')}`,
      description: row.description || 'Deskripsi wilayah belum tersedia.',
      rt_count: rtCount,
      leader_name: row.leader_name || undefined,
      phone: row.phone || undefined,
    };

    validRws.push(rwItem);
    rwMap.set(id, rwItem);
  });

  // Sort RWs by number
  validRws.sort((a, b) => a.rw_number - b.rw_number);

  // 2. Process Facilities
  const validFacilities: FacilityItem[] = [];
  const facilityIds = new Set<string>();

  rawFacilities.forEach((row, idx) => {
    const id = (row.facility_id || `FAC_${idx + 1}`).trim();
    if (facilityIds.has(id)) {
      issues.push({
        type: 'error',
        file: 'facilities.csv',
        entityId: id,
        message: `Duplikasi facility_id "${id}" pada baris ${idx + 1}.`,
      });
      return;
    }
    facilityIds.add(id);

    // Validate RW
    const rwId = (row.rw_id || '').trim();
    if (!rwIds.has(rwId)) {
      issues.push({
        type: 'warning',
        file: 'facilities.csv',
        entityId: id,
        message: `Fasilitas "${row.name || id}": rw_id "${rwId}" tidak ditemukan pada rw.csv. Menggunakan RW default.`,
      });
    }

    // Validate Category
    let category = (row.category || '').trim().toLowerCase();
    if (!categoryIds.has(category)) {
      issues.push({
        type: 'warning',
        file: 'facilities.csv',
        entityId: id,
        message: `Fasilitas "${row.name || id}": kategori "${row.category}" tidak terdaftar di categories.json. Menggunakan "public_facility".`,
      });
      category = 'public_facility';
    }

    // Validate Coordinates
    let lat = parseFloat(row.latitude || '0');
    let lng = parseFloat(row.longitude || '0');
    if (isNaN(lat) || isNaN(lng) || lat === 0 || lng === 0) {
      issues.push({
        type: 'error',
        file: 'facilities.csv',
        entityId: id,
        message: `Fasilitas "${row.name || id}": Koordinat (${row.latitude}, ${row.longitude}) tidak valid. Menggunakan titik pusat kelurahan.`,
      });
      lat = -0.8345;
      lng = 100.3621;
    }

    validFacilities.push({
      facility_id: id,
      name: row.name || `Fasilitas Tanpa Nama (${id})`,
      category,
      rw_id: rwIds.has(rwId) ? rwId : (validRws[0]?.rw_id || 'RW001'),
      latitude: lat,
      longitude: lng,
      address: row.address || 'Alamat belum dilengkapi.',
      description: row.description || 'Deskripsi fasilitas belum tersedia.',
      photo: row.photo || '/images/facilities/kantor-lurah.jpg',
      operational_hours: row.operational_hours || undefined,
      contact_info: row.contact_info || undefined,
    });
  });

  // 3. Process Potentials
  const validPotentials: PotentialItem[] = [];
  const potentialIds = new Set<string>();

  rawPotentials.forEach((row, idx) => {
    const id = (row.potential_id || `POT_${idx + 1}`).trim();
    if (potentialIds.has(id)) {
      issues.push({
        type: 'error',
        file: 'potentials.csv',
        entityId: id,
        message: `Duplikasi potential_id "${id}" pada baris ${idx + 1}.`,
      });
      return;
    }
    potentialIds.add(id);

    // Validate RW
    const rwId = (row.rw_id || '').trim();
    if (!rwIds.has(rwId)) {
      issues.push({
        type: 'warning',
        file: 'potentials.csv',
        entityId: id,
        message: `Potensi "${row.name || id}": rw_id "${rwId}" tidak ditemukan pada rw.csv.`,
      });
    }

    // Validate Category
    let category = (row.category || '').trim().toLowerCase();
    if (!categoryIds.has(category)) {
      category = 'umkm';
    }

    // Validate Coordinates
    let lat = parseFloat(row.latitude || '0');
    let lng = parseFloat(row.longitude || '0');
    if (isNaN(lat) || isNaN(lng) || lat === 0 || lng === 0) {
      issues.push({
        type: 'error',
        file: 'potentials.csv',
        entityId: id,
        message: `Potensi "${row.name || id}": Koordinat (${row.latitude}, ${row.longitude}) tidak valid.`,
      });
      lat = -0.8345;
      lng = 100.3621;
    }

    validPotentials.push({
      potential_id: id,
      name: row.name || `Potensi Tanpa Nama (${id})`,
      category,
      rw_id: rwIds.has(rwId) ? rwId : (validRws[0]?.rw_id || 'RW001'),
      latitude: lat,
      longitude: lng,
      address: row.address || 'Alamat belum dilengkapi.',
      description: row.description || 'Deskripsi potensi belum tersedia.',
      photo: row.photo || '/images/potentials/tanaman-hias.jpg',
      contact_person: row.contact_person || undefined,
      highlight_info: row.highlight_info || undefined,
    });
  });

  // 4. Process Information
  const validInformation: InformationItem[] = [];
  rawInformation.forEach((row, idx) => {
    const id = (row.info_id || `INFO_${idx + 1}`).trim();
    const isPinned = (row.is_pinned || '').toLowerCase() === 'true' || (row.is_pinned || '') === '1';

    validInformation.push({
      info_id: id,
      title: row.title || 'Pengumuman Kelurahan',
      category: row.category || 'Informasi',
      date: row.date || '2026-08-01',
      summary: row.summary || '',
      content: row.content || row.summary || 'Konten pengumuman...',
      author: row.author || 'Pemerintah Kelurahan',
      badge_type: row.badge_type || 'INFO',
      is_pinned: isPinned,
      contact: row.contact || undefined,
    });
  });

  // 5. Build Unified Entities for Map & Cross-Catalog synchronization
  const unifiedEntities: UnifiedEntity[] = [];

  validFacilities.forEach((fac) => {
    const rw = rwMap.get(fac.rw_id);
    unifiedEntities.push({
      id: fac.facility_id,
      type: 'facility',
      name: fac.name,
      category: fac.category,
      rw_id: fac.rw_id,
      rw_name: rw?.name || fac.rw_id,
      latitude: fac.latitude,
      longitude: fac.longitude,
      address: fac.address,
      description: fac.description,
      photo: fac.photo,
      operationalHours: fac.operational_hours,
      contact: fac.contact_info,
      raw: fac,
    });
  });

  validPotentials.forEach((pot) => {
    const rw = rwMap.get(pot.rw_id);
    unifiedEntities.push({
      id: pot.potential_id,
      type: 'potential',
      name: pot.name,
      category: pot.category,
      rw_id: pot.rw_id,
      rw_name: rw?.name || pot.rw_id,
      latitude: pot.latitude,
      longitude: pot.longitude,
      address: pot.address,
      description: pot.description,
      photo: pot.photo,
      extraInfo: pot.highlight_info,
      contact: pot.contact_person,
      raw: pot,
    });
  });

  return {
    validRws,
    validFacilities,
    validPotentials,
    validInformation,
    unifiedEntities,
    issues,
  };
}
