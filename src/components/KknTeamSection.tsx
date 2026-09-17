import React, { useState, useMemo } from "react";
import { KknTeamData } from "../types";
import { Users, Building, Calendar, MapPin, Network } from "lucide-react";
import { KknTeamBagan } from "./KknTeamBagan";
import { KknTeamDaftar } from "./KknTeamDaftar";

interface KknTeamSectionProps {
  kknTeam: KknTeamData | null;
}

export const KknTeamSection: React.FC<KknTeamSectionProps> = ({ kknTeam }) => {
  const [activeTab, setActiveTab] = useState<"bagan" | "daftar">("bagan");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("all");

  const handleContextMenu = (e: React.MouseEvent) => e.preventDefault();
  const handleDragStart = (e: React.DragEvent) => e.preventDefault();

  if (!kknTeam || !kknTeam.members || kknTeam.members.length === 0) {
    return null;
  }

  const teamData = kknTeam;

  const bphMembers = useMemo(() => {
    return teamData.members.filter(
      (m) => m.division.includes("BPH") || m.division.includes("Pimpinan"),
    );
  }, [teamData.members]);

  const divisionGroups = useMemo(() => {
    const divisions = [
      { name: "Divisi Acara" },
      { name: "Divisi PDD" },
      { name: "Divisi Konsumsi" },
      { name: "Divisi Perlengkapan" },
      { name: "Divisi Humas" },
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

  const divisionOptions = useMemo(() => {
    const list = Array.from(new Set(teamData.members.map((m) => m.division)));
    return ["all", ...list];
  }, [teamData.members]);

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
      return "bg-[#633B83] text-white border-transparent";
    }
    if (role.toLowerCase().includes("wakil")) {
      return "bg-white/10 text-slate-200 border-white/10 font-semibold";
    }
    if (
      role.toLowerCase().includes("sekretaris") ||
      role.toLowerCase().includes("bendahara")
    ) {
      return "bg-[#FCA228]/15 text-[#FCCB5D] border-[#FCA228]/30 font-semibold";
    }
    if (role.toLowerCase().includes("koordinator")) {
      return "bg-[#7E549E]/20 text-slate-200 border-[#7E549E]/30 font-semibold";
    }
    return "bg-white/5 text-slate-300 border-white/10";
  };

  const handleSelectDivisionFromChart = (divisionName: string) => {
    setSelectedDivision(divisionName);
    setActiveTab("daftar");
    setTimeout(() => {
      const el = document.getElementById("kkn-list-container");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const devInfo = teamData.webDeveloper;
  const devPhotoUrl =
    devInfo &&
    "photo" in devInfo &&
    typeof devInfo.photo === "string" &&
    devInfo.photo
      ? devInfo.photo
      : "/images/mahasiswa/unk.jpeg";

  const dplPhotoUrl =
    teamData &&
    "dplPhoto" in teamData &&
    typeof (teamData as Record<string, unknown>).dplPhoto === "string"
      ? ((teamData as Record<string, unknown>).dplPhoto as string)
      : "/images/Rahman-Putra-3.webp";

  return (
    <section
      id="kkn"
      className="relative w-full bg-[#0B0F19] text-white py-14 lg:py-16 border-b border-white/5"
    >
      {/* Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] -right-[10%] w-[350px] h-[350px] rounded-full bg-[#633B83]/15 blur-[100px]" />
        <div className="absolute bottom-[20%] -left-[10%] w-[350px] h-[350px] rounded-full bg-[#FCA228]/10 blur-[90px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        {/* ================= SECTION HEADER & TABS ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Tim Pengabdian{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FCA228] to-[#FCCB5D]">
                KKN UISB 2026
              </span>
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
              Direktori struktur organisasi dan anggota mahasiswa KKN di
              Kelurahan Balai Gadang.
            </p>
          </div>

          {/* Compact Tab Switcher */}
          <div className="flex items-center bg-white/[0.03] backdrop-blur-md border border-white/10 p-1 rounded-xl self-start md:self-auto select-none">
            <button
              onClick={() => setActiveTab("bagan")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === "bagan"
                  ? "bg-gradient-to-r from-[#FCA228] to-[#FCB739] text-slate-950 shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              <span>Bagan Struktur</span>
            </button>
            <button
              onClick={() => setActiveTab("daftar")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === "daftar"
                  ? "bg-gradient-to-r from-[#FCA228] to-[#FCB739] text-slate-950 shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Daftar Anggota ({teamData.members.length})</span>
            </button>
          </div>
        </div>

        {/* ================= COMPACT INFO CARD (DPL & DEVELOPER) ================= */}
        <div className="mb-6 bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-5 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            {/* Info KKN */}
            <div className="lg:col-span-7 space-y-2">
              <h3 className="text-xs sm:text-sm font-bold text-white leading-snug">
                {teamData.theme}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                {teamData.summary}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-300 font-medium pt-1">
                <div className="flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-[#FCCB5D]" />
                  <span>{teamData.university}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#FCCB5D]" />
                  <span>{teamData.period}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#FCCB5D]" />
                  <span>{teamData.location}</span>
                </div>
              </div>
            </div>

            {/* DPL & Developer Mini Profiles */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 lg:border-l border-white/10 lg:pl-4">
              {/* DPL */}
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-white/20 shrink-0 select-none">
                  <div
                    className="w-full h-full bg-cover bg-center pointer-events-none"
                    style={{ backgroundImage: `url('${dplPhotoUrl}')` }}
                    role="img"
                    aria-label={teamData.dplName}
                  />
                  <div
                    onContextMenu={handleContextMenu}
                    onDragStart={handleDragStart}
                    className="absolute inset-0 z-10"
                  />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-[#FCCB5D] uppercase tracking-wider block">
                    DPL
                  </span>
                  <h4 className="text-xs font-bold text-white truncate">
                    {teamData.dplName}
                  </h4>
                  <p className="text-[10px] text-slate-400 truncate">
                    {teamData.faculty}
                  </p>
                </div>
              </div>

              {/* Developer */}
              {devInfo && (
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-white/20 shrink-0 select-none">
                    <div
                      className="w-full h-full bg-cover bg-center pointer-events-none"
                      style={{ backgroundImage: `url('${devPhotoUrl}')` }}
                      role="img"
                      aria-label={devInfo.name}
                    />
                    <div
                      onContextMenu={handleContextMenu}
                      onDragStart={handleDragStart}
                      className="absolute inset-0 z-10"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-[#FCCB5D] uppercase tracking-wider block">
                      Developer
                    </span>
                    <h4 className="text-xs font-bold text-white truncate">
                      {devInfo.name}
                    </h4>
                    <p className="text-[10px] text-slate-400 truncate">
                      NIM. {devInfo.nim}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================= TAB CONTENT RENDER ================= */}
        <div>
          {activeTab === "bagan" && (
            <KknTeamBagan
              teamData={teamData}
              bphMembers={bphMembers}
              divisionGroups={divisionGroups}
              onSelectDivision={handleSelectDivisionFromChart}
            />
          )}

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
      </div>
    </section>
  );
};
