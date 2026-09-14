import React, { useState, useMemo } from "react";
import { KknTeamData } from "../types";
import {
  GraduationCap,
  Users,
  Building,
  Calendar,
  CheckCircle2,
  Sparkles,
  Crown,
  MapPin,
  Network,
} from "lucide-react";
import { KknTeamBagan } from "./KknTeamBagan";
import { KknTeamDaftar } from "./KknTeamDaftar";

interface KknTeamSectionProps {
  kknTeam: KknTeamData | null;
}

export const KknTeamSection: React.FC<KknTeamSectionProps> = ({ kknTeam }) => {
  const [activeTab, setActiveTab] = useState<"bagan" | "daftar">("bagan");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("all");

  // Handler Proteksi Foto (Mencegah Klik Kanan & Drag Foto)
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault();
  };

  if (!kknTeam || !kknTeam.members || kknTeam.members.length === 0) {
    return null;
  }

  const teamData = kknTeam;

  /*
   * Extract BPH Members
   */
  const bphMembers = useMemo(() => {
    return teamData.members.filter(
      (m) => m.division.includes("BPH") || m.division.includes("Pimpinan"),
    );
  }, [teamData.members]);

  /*
   * Division categories mapping
   */
  const divisionGroups = useMemo(() => {
    const divisions = [
      {
        name: "Divisi Acara",
        color: "border-[#8F66AC]/30 bg-[#7E549E]/5 hover:bg-[#7E549E]/10",
        badgeColor: "bg-[#7E549E] text-white",
      },
      {
        name: "Divisi PDD",
        color: "border-[#FCA228]/30 bg-[#FCA228]/5 hover:bg-[#FCA228]/10",
        badgeColor: "bg-[#FCA228] text-slate-950 font-bold",
      },
      {
        name: "Divisi Konsumsi",
        color: "border-[#FCB739]/30 bg-[#FCB739]/5 hover:bg-[#FCB739]/10",
        badgeColor: "bg-[#FCB739] text-slate-950 font-bold",
      },
      {
        name: "Divisi Perlengkapan",
        color: "border-[#633B83]/30 bg-[#633B83]/5 hover:bg-[#633B83]/10",
        badgeColor: "bg-[#633B83] text-[#FCA228]",
      },
      {
        name: "Divisi Humas",
        color: "border-[#A582BF]/40 bg-[#A582BF]/10 hover:bg-[#A582BF]/15",
        badgeColor: "bg-[#8F66AC] text-white",
      },
    ];

    return divisions.map((div) => {
      const membersInDiv = teamData.members.filter(
        (m) => m.division === div.name,
      );

      const koordinator = membersInDiv.find((m) =>
        m.role.toLowerCase().includes("koordinator"),
      );

      const anggota = membersInDiv.filter(
        (m) => !m.role.toLowerCase().includes("koordinator"),
      );

      return {
        ...div,
        koordinator,
        anggota,
        total: membersInDiv.length,
      };
    });
  }, [teamData.members]);

  /*
   * Unique divisions list for filters
   */
  const divisionOptions = useMemo(() => {
    const list = Array.from(new Set(teamData.members.map((m) => m.division)));
    return ["all", ...list];
  }, [teamData.members]);

  /*
   * Filtered members for directory view
   */
  const filteredMembers = useMemo(() => {
    return teamData.members.filter((member) => {
      const term = searchTerm.toLowerCase();

      const matchesSearch =
        member.name.toLowerCase().includes(term) ||
        member.nim.toLowerCase().includes(term) ||
        member.role.toLowerCase().includes(term) ||
        member.major.toLowerCase().includes(term) ||
        member.faculty.toLowerCase().includes(term) ||
        member.division.toLowerCase().includes(term);

      const matchesDivision =
        selectedDivision === "all" || member.division === selectedDivision;

      return matchesSearch && matchesDivision;
    });
  }, [teamData.members, searchTerm, selectedDivision]);

  const handleReset = () => {
    setSearchTerm("");
    setSelectedDivision("all");
  };

  const isFiltered = Boolean(searchTerm || selectedDivision !== "all");
  const totalItems = filteredMembers.length;

  const getRoleBadgeStyle = (role: string) => {
    if (
      role.toLowerCase().includes("ketua") &&
      !role.toLowerCase().includes("wakil")
    ) {
      return "bg-[#633B83] text-white border-[#633B83] shadow-2xs";
    }

    if (role.toLowerCase().includes("wakil")) {
      return "bg-[#7E549E]/15 text-[#633B83] border-[#8F66AC]/40 font-bold";
    }

    if (
      role.toLowerCase().includes("sekretaris") ||
      role.toLowerCase().includes("bendahara")
    ) {
      return "bg-[#FCA228]/15 text-[#633B83] border-[#FCA228]/40 font-bold";
    }

    if (role.toLowerCase().includes("koordinator")) {
      return "bg-[#FCB739]/20 text-[#633B83] border-[#FCB739]/50 font-bold";
    }

    return "bg-slate-100 text-slate-700 border-slate-200";
  };

  /*
   * Jump to specific division in directory view
   */
  const handleSelectDivisionFromChart = (divisionName: string) => {
    setSelectedDivision(divisionName);
    setActiveTab("daftar");

    setTimeout(() => {
      const el = document.getElementById("kkn-list-container");
      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 50);
  };

  /*
   * Web developer information & photo path resolution (Tanpa error TS)
   */
  const devInfo = teamData.webDeveloper;
  const focusPills = devInfo?.focusAreas ?? [];
  const devPhotoUrl: string =
    devInfo &&
    "photo" in devInfo &&
    typeof devInfo.photo === "string" &&
    devInfo.photo
      ? devInfo.photo
      : "/images/mahasiswa/unk.jpeg";

  /*
   * DPL Photo path resolution
   */
  const dplPhotoUrl: string =
    teamData &&
    "dplPhoto" in teamData &&
    typeof (teamData as Record<string, unknown>).dplPhoto === "string"
      ? ((teamData as Record<string, unknown>).dplPhoto as string)
      : "/images/Rahman-Putra-3.webp";

  return (
    <section
      id="kkn"
      className="py-16 sm:py-24 bg-slate-50/70 border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Struktur Organisasi Tim KKN
            </h2>

            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
              Bagan hierarki pengabdian dan direktori {teamData.members.length}{" "}
              mahasiswa KKN {teamData.university} (UISB) di Kelurahan Balai
              Gadang dengan pembagian 5 divisi pelaksana dan pimpinan inti BPH.
            </p>
          </div>

          {/* Tab Switcher */}
          <div
            id="kkn-tabs"
            className="flex items-center bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs self-start md:self-auto select-none"
          >
            <button
              onClick={() => setActiveTab("bagan")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "bagan"
                  ? "bg-gradient-to-r from-[#633B83] to-[#7E549E] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <Network className="w-4 h-4" />
              <span>Bagan Struktur</span>
            </button>

            <button
              onClick={() => setActiveTab("daftar")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "daftar"
                  ? "bg-gradient-to-r from-[#633B83] to-[#7E549E] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Daftar Seluruh Anggota ({teamData.members.length})</span>
            </button>
          </div>
        </div>

        {/* COMBINED HERO CARD: Program Info, DPL & Web Developer */}
        <div className="mb-10 bg-gradient-to-br from-slate-950 via-[#633B83]/95 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg border border-[#8F66AC]/40 relative overflow-hidden space-y-6">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-[#FCA228]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Middle Content: Theme & DPL Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-3">
              <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                {teamData.theme}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {teamData.summary}
              </p>

              <div className="pt-1 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-[#FCCB5D]" />
                  <span className="font-semibold text-white">
                    {teamData.university}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#FCCB5D]" />
                  <span>{teamData.period}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#FCCB5D]" />
                  <span>{teamData.location}</span>
                </div>
              </div>
            </div>

            {/* DPL Sub-Card (Dengan Foto DPL & Hover Foto) */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 sm:p-4.5">
              <div className="text-[11px] font-semibold text-[#FCCB5D] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <span>Dosen Pembimbing Lapangan (DPL)</span>
              </div>

              <div className="flex items-center gap-3.5">
                {/* PROTECTED FOTO DPL */}
                <div className="group/dplAvatar relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-white/30 shadow-md ring-2 ring-[#FCCB5D]/40 hover:ring-[#FCCB5D] hover:scale-105 shrink-0 transition-all duration-300 cursor-pointer select-none">
                  <div
                    className="w-full h-full bg-cover bg-center pointer-events-none group-hover/dplAvatar:scale-110 transition-transform duration-500"
                    style={{ backgroundImage: `url('${dplPhotoUrl}')` }}
                    role="img"
                    aria-label={teamData.dplName}
                  />

                  <div
                    onContextMenu={handleContextMenu}
                    onDragStart={handleDragStart}
                    className="absolute inset-0 z-10 bg-transparent"
                  />
                </div>

                {/* Detail DPL */}
                <div className="min-w-0 flex-1">
                  <h4 className="text-base font-bold text-white truncate">
                    {teamData.dplName}
                  </h4>

                  {teamData.dplNip && (
                    <p className="text-xs text-slate-300 font-mono mt-0.5">
                      NUPTK: {teamData.dplNip}
                    </p>
                  )}

                  <p className="text-xs text-slate-200 font-medium mt-1 truncate">
                    {teamData.faculty}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Integrated Section: Web Developer Info (Tanpa Icon Terminal) */}
          {devInfo && (
            <div className="pt-5 border-t border-white/10">
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  {/* PROTECTED AVATAR DEVELOPER (HOVER HANYA PADA FOTO) */}
                  <div className="group/avatar relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-white/30 shadow-md ring-2 ring-[#FCCB5D]/40 hover:ring-[#FCCB5D] hover:scale-105 shrink-0 transition-all duration-300 cursor-pointer select-none">
                    <div
                      className="w-full h-full bg-cover bg-center pointer-events-none group-hover/avatar:scale-110 transition-transform duration-500"
                      style={{ backgroundImage: `url('${devPhotoUrl}')` }}
                      role="img"
                      aria-label={devInfo.name}
                    />

                    <div
                      onContextMenu={handleContextMenu}
                      onDragStart={handleDragStart}
                      className="absolute inset-0 z-10 bg-transparent"
                    />
                  </div>

                  {/* Dev Details */}
                  <div className="min-w-0">
                    <div className="text-[10px] font-extrabold text-[#FCCB5D] uppercase tracking-wider mb-0.5">
                      {devInfo.role}
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-white truncate">
                      {devInfo.name}
                    </h4>

                    <p className="text-xs text-slate-300">
                      NIM. {devInfo.nim} &bull; {devInfo.major} (
                      {devInfo.faculty})
                    </p>
                  </div>
                </div>

                {/* Focus Areas Pills */}
                {focusPills.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 md:justify-end">
                    {focusPills.map((pill, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-white/10 text-slate-200 border border-white/15 text-[11px] font-medium flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3 h-3 text-[#FCA228] shrink-0" />
                        <span>{pill}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* VIEW 1: ORGANIZATIONAL CHART */}
        {activeTab === "bagan" && (
          <KknTeamBagan
            teamData={teamData}
            bphMembers={bphMembers}
            divisionGroups={divisionGroups}
            onSelectDivision={handleSelectDivisionFromChart}
          />
        )}

        {/* VIEW 2: DIRECTORY */}
        {activeTab === "daftar" && (
          <KknTeamDaftar
            teamData={teamData}
            searchTerm={searchTerm}
            selectedDivision={selectedDivision}
            divisionOptions={divisionOptions}
            filteredMembers={filteredMembers}
            totalItems={totalItems}
            isFiltered={isFiltered}
            onSearchChange={setSearchTerm}
            onDivisionChange={setSelectedDivision}
            onReset={handleReset}
            getRoleBadgeStyle={getRoleBadgeStyle}
          />
        )}
      </div>
    </section>
  );
};
