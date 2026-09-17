import React, { useState, useEffect, useMemo } from "react";
import { loadAppData } from "./lib/dataLoader";
import {
  AppDataState,
  FilterState,
  UnifiedEntity,
  FacilityItem,
  PotentialItem,
} from "./types";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ProfileSection } from "./components/ProfileSection";
import { Statistics } from "./components/Statistics";
import { MapSection } from "./components/MapSection";
import { FacilitySection } from "./components/FacilitySection";
import { PotentialSection } from "./components/PotentialSection";
import { KknTeamSection } from "./components/KknTeamSection";
import { Footer } from "./components/Footer";
import { DetailSheet } from "./components/DetailSheet";
import { AnimatedBackground } from "./components/AnimatedBackground";
import {
  Loader2,
  AlertTriangle,
  RefreshCw,
  Map as MapIcon,
} from "lucide-react";

export default function App() {
  // ==========================================
  // PENGATURAN WAKTU LOADING (Dalam Milidetik)
  // ==========================================
  const MINIMUM_LOADING_MS = 2500;

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

  const [activeSection, setActiveSection] = useState("beranda");
  const [selectedEntity, setSelectedEntity] = useState<UnifiedEntity | null>(
    null,
  );

  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "",
    rw_id: "",
    entityType: "all",
  });

  useEffect(() => {
    let isMounted = true;
    async function init() {
      const startTime = Date.now();
      const data = await loadAppData();
      const elapsedTime = Date.now() - startTime;

      if (elapsedTime < MINIMUM_LOADING_MS) {
        await new Promise((resolve) =>
          setTimeout(resolve, MINIMUM_LOADING_MS - elapsedTime),
        );
      }

      if (isMounted) {
        setDataState(data);
        const params = new URLSearchParams(window.location.search);
        const entityParam =
          params.get("entity") ||
          params.get("facility") ||
          params.get("potential");

        if (entityParam) {
          const match = data.unifiedEntities.find(
            (e) => e.id.toLowerCase() === entityParam.toLowerCase(),
          );
          if (match) setSelectedEntity(match);
        }
      }
    }
    init();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const sections = [
      "beranda",
      "profil",
      "wilayah",
      "peta",
      "fasilitas",
      "potensi",
      "kkn",
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -40% 0px", threshold: 0.1 },
    );

    const timeoutId = setTimeout(() => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [dataState.isLoading]);

  const filteredEntities = useMemo(() => {
    return dataState.unifiedEntities.filter((entity) => {
      if (filters.entityType === "facility" && entity.type !== "facility")
        return false;
      if (filters.entityType === "potential" && entity.type !== "potential")
        return false;
      if (
        filters.category &&
        entity.category.toLowerCase() !== filters.category.toLowerCase()
      )
        return false;
      if (filters.rw_id && entity.rw_id !== filters.rw_id) return false;
      if (filters.search) {
        const term = filters.search.toLowerCase();
        return (
          entity.name.toLowerCase().includes(term) ||
          entity.address.toLowerCase().includes(term) ||
          entity.description.toLowerCase().includes(term) ||
          entity.rw_name.toLowerCase().includes(term)
        );
      }
      return true;
    });
  }, [dataState.unifiedEntities, filters]);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({ search: "", category: "", rw_id: "", entityType: "all" });
  };

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleSelectFacility = (fac: FacilityItem) => {
    const match = dataState.unifiedEntities.find(
      (e) => e.id === fac.facility_id,
    );
    if (match) setSelectedEntity(match);
  };

  const handleSelectPotential = (pot: PotentialItem) => {
    const match = dataState.unifiedEntities.find(
      (e) => e.id === pot.potential_id,
    );
    if (match) setSelectedEntity(match);
  };

  const handleFocusOnMap = (
    item: FacilityItem | PotentialItem | UnifiedEntity,
  ) => {
    const id =
      "id" in item
        ? item.id
        : "facility_id" in item
          ? item.facility_id
          : item.potential_id;
    const match = dataState.unifiedEntities.find((e) => e.id === id);
    if (match) {
      setSelectedEntity(match);
      handleNavigate("peta");
    }
  };

  const handleSelectRw = (rwId: string) => {
    handleFilterChange({ rw_id: rwId });
    handleNavigate("fasilitas");
  };

  const handleNavigateToMapRw = (rwId: string) => {
    handleFilterChange({ rw_id: rwId });
    handleNavigate("peta");
  };

  // ==========================================
  // MODERN LOADING SCREEN
  // ==========================================
  if (dataState.isLoading) {
    const loadSec = MINIMUM_LOADING_MS / 1000;

    // Perhitungan Akurat: Selesai di angka 1.5 detik (60% dari 2.5s)
    const typeSec = loadSec * 0.5; // 50% = 1.25 detik waktu mengetik
    const delaySec = loadSec * 0.1; // 10% = 0.25 detik waktu tunda awal
    // Total animasi = 1.25 + 0.25 = 1.5 detik.

    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0B0F19] text-white overflow-hidden selection:bg-transparent">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#633B83]/15 rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#FCA228]/10 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        <div className="relative z-10 flex flex-col items-center">
          <div className="relative w-24 h-24 mb-10 flex items-center justify-center">
            <div
              className="absolute inset-0 border-[2px] border-white/5 border-t-[#FCA228] border-r-[#FCB739] rounded-2xl animate-spin"
              style={{ animationDuration: "3s" }}
            />
            <div className="absolute inset-2.5 border-[2px] border-white/5 border-b-[#A582BF] border-l-[#8F66AC] rounded-xl animate-[spin_2s_linear_infinite_reverse]" />
            <div className="w-12 h-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(252,162,40,0.15)] animate-pulse">
              <MapIcon className="w-6 h-6 text-[#FCCB5D]" />
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
            Kelurahan Balai Gadang
          </h1>

          <div className="flex items-center gap-2 mb-12">
            <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#FCA228]" />
            <p className="text-[10px] sm:text-xs font-semibold text-[#FCCB5D] tracking-[0.25em] uppercase">
              Pemetaan Potensi Wilayah
            </p>
            <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#FCA228]" />
          </div>

          <div className="w-56 sm:w-64 h-1 bg-white/5 rounded-full overflow-hidden shadow-inner relative">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#FCA228] via-[#FCB739] to-[#FCCB5D] rounded-full"
              style={{
                animation: `loading-progress ${loadSec}s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
              }}
            />
          </div>

          <div className="mt-5 text-[11px] text-slate-400 font-medium flex items-center gap-2 animate-pulse">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-[#A582BF]" />
            Memuat profil wilayah Balai Gadang...
          </div>
        </div>

        {/* --- TYPEWRITER WATERMARK --- */}
        <div className="absolute bottom-12 left-0 right-0 flex justify-center items-center opacity-80">
          <div className="inline-block pr-1">
            <p className="typewriter-text text-[10px] sm:text-[11px] text-[#A582BF] font-mono tracking-widest font-bold">
              CREATED BY KKN UISB 2026
            </p>
          </div>
        </div>

        {/* Custom CSS Keyframes */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
          /* PERBAIKAN: Animasi 0 hingga 100% sempurna tanpa opacity drop di akhir */
          @keyframes loading-progress {
            0% { width: 0%; }
            100% { width: 100%; }
          }
          
          @keyframes typing {
            from { width: 0; }
            to { width: 29ch; } 
          }
          
          @keyframes blink-cursor {
            from, to { border-color: transparent; }
            50% { border-color: #FCA228; }
          }
          
          .typewriter-text {
            overflow: hidden;
            white-space: nowrap;
            border-right: 2px solid #FCA228;
            width: 0;
            animation: 
              typing ${typeSec}s steps(24, end) ${delaySec}s forwards,
              blink-cursor 0.75s step-end infinite;
          }
        `,
          }}
        />
      </div>
    );
  }

  // Fatal load error state
  if (
    dataState.error &&
    dataState.facilities.length === 0 &&
    dataState.rws.length === 0
  ) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-slate-200 shadow-xl text-center">
          <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">
            Gagal Memuat Data Profil
          </h2>
          <p className="text-xs text-slate-600 mb-6 leading-relaxed">
            {dataState.error}
          </p>
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
      <AnimatedBackground />
      <Navbar activeSection={activeSection} />
      <Hero
        profile={dataState.profile}
        rws={dataState.rws}
        facilities={dataState.facilities}
        potentials={dataState.potentials}
        onNavigate={handleNavigate}
      />
      <ProfileSection profile={dataState.profile} />
      <Statistics
        rws={dataState.rws}
        facilities={dataState.facilities}
        potentials={dataState.potentials}
        onSelectRw={handleSelectRw}
        onNavigateToMap={handleNavigateToMapRw}
      />
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
      <FacilitySection
        facilities={dataState.facilities}
        categories={dataState.categories}
        categoryMap={dataState.categoryMap}
        rws={dataState.rws}
        rwMap={dataState.rwMap}
        onSelectFacility={handleSelectFacility}
        onFocusMap={handleFocusOnMap}
      />
      <PotentialSection
        potentials={dataState.potentials}
        categories={dataState.categories}
        categoryMap={dataState.categoryMap}
        rws={dataState.rws}
        rwMap={dataState.rwMap}
        onSelectPotential={handleSelectPotential}
        onFocusMap={handleFocusOnMap}
      />
      <KknTeamSection kknTeam={dataState.kknTeam} />
      <Footer profile={dataState.profile} onNavigate={handleNavigate} />
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
