import React, { useState, useEffect, useMemo } from 'react';
import { loadAppData } from './lib/dataLoader';
import {
  AppDataState,
  FilterState,
  UnifiedEntity,
  FacilityItem,
  PotentialItem,
} from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProfileSection } from './components/ProfileSection';
import { Statistics } from './components/Statistics';
import { MapSection } from './components/MapSection';
import { FacilitySection } from './components/FacilitySection';
import { PotentialSection } from './components/PotentialSection';
import { KknTeamSection } from './components/KknTeamSection';
import { Footer } from './components/Footer';
import { DetailSheet } from './components/DetailSheet';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Building2, Loader2, AlertTriangle, RefreshCw } from 'lucide-react';

export default function App() {
  const [dataState, setDataState] = useState<AppDataState>({
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
    validationIssues: [],
    isLoading: true,
    error: null,
  });

  const [activeSection, setActiveSection] = useState('beranda');
  const [selectedEntity, setSelectedEntity] = useState<UnifiedEntity | null>(null);

  // Global filters
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: '',
    rw_id: '',
    entityType: 'all',
  });

  // Fetch all datasets on mount
  useEffect(() => {
    let isMounted = true;
    async function init() {
      const data = await loadAppData();
      if (isMounted) {
        setDataState(data);

        // Check deep linking from query params (e.g. ?facility=FAC001 or ?potential=POT001)
        const params = new URLSearchParams(window.location.search);
        const facilityParam = params.get('facility');
        const potentialParam = params.get('potential');
        const entityParam = params.get('entity') || facilityParam || potentialParam;

        if (entityParam) {
          const match = data.unifiedEntities.find(
            (e) => e.id.toLowerCase() === entityParam.toLowerCase()
          );
          if (match) {
            setSelectedEntity(match);
          }
        }
      }
    }
    init();

    return () => {
      isMounted = false;
    };
  }, []);

  // Intersection Observer for scroll spy
  useEffect(() => {
    const sections = [
      'beranda',
      'profil',
      'wilayah',
      'peta',
      'fasilitas',
      'potensi',
      'kkn',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [dataState.isLoading]);

  // Filtered unified entities for map
  const filteredEntities = useMemo(() => {
    return dataState.unifiedEntities.filter((entity) => {
      // Type filter
      if (filters.entityType === 'facility' && entity.type !== 'facility') return false;
      if (filters.entityType === 'potential' && entity.type !== 'potential') return false;

      // Category filter
      if (filters.category && entity.category.toLowerCase() !== filters.category.toLowerCase()) {
        return false;
      }

      // RW filter
      if (filters.rw_id && entity.rw_id !== filters.rw_id) {
        return false;
      }

      // Search term
      if (filters.search) {
        const term = filters.search.toLowerCase();
        const matches =
          entity.name.toLowerCase().includes(term) ||
          entity.address.toLowerCase().includes(term) ||
          entity.description.toLowerCase().includes(term) ||
          entity.rw_name.toLowerCase().includes(term);
        if (!matches) return false;
      }

      return true;
    });
  }, [dataState.unifiedEntities, filters]);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      category: '',
      rw_id: '',
      entityType: 'all',
    });
  };

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectFacility = (fac: FacilityItem) => {
    const match = dataState.unifiedEntities.find((e) => e.id === fac.facility_id);
    if (match) setSelectedEntity(match);
  };

  const handleSelectPotential = (pot: PotentialItem) => {
    const match = dataState.unifiedEntities.find((e) => e.id === pot.potential_id);
    if (match) setSelectedEntity(match);
  };

  const handleFocusOnMap = (item: FacilityItem | PotentialItem | UnifiedEntity) => {
    const id = 'id' in item ? item.id : 'facility_id' in item ? item.facility_id : item.potential_id;
    const match = dataState.unifiedEntities.find((e) => e.id === id);

    if (match) {
      setSelectedEntity(match);
      // Scroll to map
      handleNavigate('peta');
    }
  };

  const handleSelectRw = (rwId: string) => {
    handleFilterChange({ rw_id: rwId });
    handleNavigate('fasilitas');
  };

  const handleNavigateToMapRw = (rwId: string) => {
    handleFilterChange({ rw_id: rwId });
    handleNavigate('peta');
  };

  // Loading state
  if (dataState.isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 rounded-2xl bg-emerald-600 flex items-center justify-center mb-6 shadow-xl animate-pulse">
          <Building2 className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-xl font-bold mb-2">Memuat Profil Kelurahan Balai Gadang...</h2>
        <p className="text-xs text-slate-400 max-w-sm text-center mb-6">
          Menginisialisasi dataset publik, batas peta spasial GeoJSON, dan katalog potensi wilayah.
        </p>
        <Loader2 className="w-6 h-6 text-emerald-400 animate-spin" />
      </div>
    );
  }

  // Fatal load error state
  if (dataState.error && dataState.facilities.length === 0 && dataState.rws.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-slate-200 shadow-xl text-center">
          <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">Gagal Memuat Data Profil</h2>
          <p className="text-xs text-slate-600 mb-6 leading-relaxed">{dataState.error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Muat Ulang Halaman</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-slate-50/90 text-slate-800 selection:bg-[#7E549E] selection:text-white">
      {/* Subtle Background Movement & Ambient Animations */}
      <AnimatedBackground />

      {/* Fixed Navbar */}
      <Navbar activeSection={activeSection} />

      {/* Hero Section with key stats */}
      <Hero
        profile={dataState.profile}
        rws={dataState.rws}
        facilities={dataState.facilities}
        potentials={dataState.potentials}
        onNavigate={handleNavigate}
      />

      {/* Profile, Vision, Mission, Public Services */}
      <ProfileSection profile={dataState.profile} />

      {/* Dynamic RW overview & counts */}
      <Statistics
        rws={dataState.rws}
        facilities={dataState.facilities}
        potentials={dataState.potentials}
        onSelectRw={handleSelectRw}
        onNavigateToMap={handleNavigateToMapRw}
      />

      {/* Interactive Leaflet Map with Mask & Filters */}
      <MapSection
        entities={dataState.unifiedEntities}
        filteredEntities={filteredEntities}
        categories={dataState.categories}
        categoryMap={dataState.categoryMap}
        rws={dataState.rws}
        geoJson={dataState.geoJson}
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        selectedEntityId={selectedEntity?.id || null}
        onSelectEntity={(entity) => setSelectedEntity(entity)}
      />

      {/* Public Facilities Catalog */}
      <FacilitySection
        facilities={dataState.facilities}
        categories={dataState.categories}
        categoryMap={dataState.categoryMap}
        rws={dataState.rws}
        rwMap={dataState.rwMap}
        onSelectFacility={handleSelectFacility}
        onFocusMap={handleFocusOnMap}
      />

      {/* Potentials & UMKM Catalog */}
      <PotentialSection
        potentials={dataState.potentials}
        categories={dataState.categories}
        categoryMap={dataState.categoryMap}
        rws={dataState.rws}
        rwMap={dataState.rwMap}
        onSelectPotential={handleSelectPotential}
        onFocusMap={handleFocusOnMap}
      />

      {/* KKN Student Team Profile & Structure */}
      <KknTeamSection kknTeam={dataState.kknTeam} />

      {/* Municipal Footer */}
      <Footer profile={dataState.profile} onNavigate={handleNavigate} />

      {/* Entity Detail Modal / Bottom Sheet */}
      {selectedEntity && (
        <DetailSheet
          entity={selectedEntity}
          category={dataState.categoryMap.get(selectedEntity.category)}
          onClose={() => setSelectedEntity(null)}
          onFocusOnMap={(entity) => {
            setSelectedEntity(null);
            handleFocusOnMap(entity);
          }}
        />
      )}
    </div>
  );
}
