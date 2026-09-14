import React from "react";
import { KknTeamData } from "../types";
import {
  CheckCircle2,
  Mail,
  Phone,
  Quote,
  RotateCcw,
  Search,
  Users,
} from "lucide-react";

type TeamMember = KknTeamData["members"][number];

interface KknTeamDaftarProps {
  teamData: KknTeamData;
  searchTerm: string;
  selectedDivision: string;
  divisionOptions: string[];
  filteredMembers: TeamMember[];
  totalItems: number;
  isFiltered: boolean;
  onSearchChange: (value: string) => void;
  onDivisionChange: (value: string) => void;
  onReset: () => void;
  getRoleBadgeStyle: (role: string) => string;
}

export const KknTeamDaftar: React.FC<KknTeamDaftarProps> = ({
  teamData,
  searchTerm,
  selectedDivision,
  divisionOptions,
  filteredMembers,
  totalItems,
  isFiltered,
  onSearchChange,
  onDivisionChange,
  onReset,
  getRoleBadgeStyle,
}) => {
  // Handler Proteksi: Mencegah Klik Kanan
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  // Handler Proteksi: Mencegah Drag Image
  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div id="kkn-list-container" className="select-none">
      {/* ========================================================= */}
      {/* FILTER & DIVISION SELECTOR BAR                           */}
      {/* ========================================================= */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 mb-6 shadow-xs space-y-3.5">
        {/* Search Input & Stats Counter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-xl">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari nama mahasiswa, NIM, prodi, atau divisi..."
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7E549E] focus:bg-white transition-all shadow-xs select-text"
            />
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-2 rounded-xl border border-slate-200 whitespace-nowrap">
              Menampilkan{" "}
              <span className="text-[#633B83] font-extrabold">
                {totalItems}
              </span>{" "}
              dari {teamData.members.length} Anggota
            </span>

            {isFiltered && (
              <button
                type="button"
                onClick={onReset}
                title="Reset Filter"
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Division Filter Pills */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {/* Tombol Semua Divisi */}
            <button
              type="button"
              onClick={() => onDivisionChange("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                selectedDivision === "all"
                  ? "bg-gradient-to-r from-[#633B83] to-[#7E549E] text-white shadow-xs"
                  : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <span>Semua Divisi</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedDivision === "all"
                    ? "bg-[#FCA228] text-slate-950 font-bold"
                    : "bg-slate-200 text-slate-700"
                }`}
              >
                {teamData.members.length}
              </span>
            </button>

            {/* List Pilihan Divisi */}
            {divisionOptions
              .filter((div) => div !== "all")
              .map((div) => {
                const count = teamData.members.filter(
                  (member) => member.division === div,
                ).length;
                const isActive = selectedDivision === div;

                return (
                  <button
                    key={div}
                    type="button"
                    onClick={() => onDivisionChange(div)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? "bg-gradient-to-r from-[#633B83] to-[#7E549E] text-white shadow-xs"
                        : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    <span>{div}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isActive
                          ? "bg-[#FCA228] text-slate-950 font-bold"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MEMBERS CARDS GRID                                       */}
      {/* ========================================================= */}
      {totalItems > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4.5">
          {filteredMembers.map((member) => {
            const badgeStyle = getRoleBadgeStyle(member.role);
            const isLead =
              member.role.toLowerCase().includes("ketua") ||
              member.role.toLowerCase().includes("koordinator");

            // URL foto utama atau fallback avatar
            const avatarUrl =
              member.photo ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                member.name,
              )}&background=7E549E&color=fff&size=256`;

            return (
              <div
                key={member.id}
                className={`relative bg-white border rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 ${
                  isLead
                    ? "border-[#8F66AC]/60 hover:border-[#FCA228] hover:ring-2 hover:ring-[#FCA228]/40"
                    : "border-slate-200/90 hover:border-[#8F66AC]/70 hover:ring-2 hover:ring-[#8F66AC]/30"
                }`}
              >
                {/* Subtle Gradient Accent Line Top */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#633B83] via-[#8F66AC] to-[#FCA228] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

                <div>
                  {/* Top Header Card */}
                  <div className="p-4 bg-gradient-to-b from-slate-50/90 via-slate-50/40 to-white border-b border-slate-100">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold border ${badgeStyle} truncate max-w-[190px]`}
                      >
                        {member.role}
                      </span>
                      <span className="px-1.5 py-0.5 rounded-md bg-slate-900 text-white text-[10px] font-mono font-bold flex-shrink-0">
                        {member.id}
                      </span>
                    </div>

                    <div className="flex items-center gap-3.5">
                      {/* =================================================== */}
                      {/* PROTECTED AVATAR CONTAINER (CSS Background + Overlay) */}
                      {/* =================================================== */}
                      <div className="relative flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border-2 border-white shadow-md ring-1 ring-slate-200/80 group-hover:scale-105 group-hover:shadow-lg group-hover:ring-[#7E549E]/50 transition-all duration-300">
                        {/* Layer 1: Background Image Rendering */}
                        <div
                          className="w-full h-full bg-cover bg-center pointer-events-none"
                          style={{ backgroundImage: `url('${avatarUrl}')` }}
                          role="img"
                          aria-label={member.name}
                        />

                        {/* Layer 2: Transparent Security Shield Overlay */}
                        <div
                          onContextMenu={handleContextMenu}
                          onDragStart={handleDragStart}
                          className="absolute inset-0 z-10 bg-transparent cursor-default"
                        />
                      </div>
                      {/* =================================================== */}

                      <div className="min-w-0 flex-1">
                        <h3
                          className="text-sm font-bold text-slate-900 group-hover:text-[#633B83] transition-colors leading-snug truncate select-text"
                          title={member.name}
                        >
                          {member.name}
                        </h3>
                        <p className="text-[11px] text-slate-500 font-mono mt-0.5 select-text">
                          NIM. {member.nim}
                        </p>
                        <p className="text-[11px] text-slate-700 font-medium truncate mt-0.5 select-text">
                          {member.major}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Body Details & Quote */}
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-block px-2 py-0.5 rounded-md bg-[#7E549E]/10 text-[#633B83] text-[10px] font-semibold truncate group-hover:bg-[#7E549E]/20 transition-colors">
                        {member.division}
                      </span>
                      <span className="text-[10px] text-slate-500 truncate">
                        {member.faculty}
                      </span>
                    </div>

                    {/* Kutipan / Quote */}
                    {member.quote && (
                      <div className="p-2.5 bg-[#7E549E]/5 rounded-xl border border-[#8F66AC]/20 text-[11px] text-slate-700 italic flex items-start gap-1.5 group-hover:border-[#8F66AC]/40 transition-colors">
                        <Quote className="w-3 h-3 text-[#FCA228] flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-2 select-text">
                          &ldquo;{member.quote}&rdquo;
                        </span>
                      </div>
                    )}

                    {/* Program Kerja / Tanggung Jawab */}
                    <div>
                      <div className="text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-[#7E549E]" />
                        <span>Fokus Program Kerja</span>
                      </div>
                      <ul className="space-y-1">
                        {(member.programs ?? [])
                          .slice(0, 2)
                          .map((prog, idx) => (
                            <li
                              key={idx}
                              className="text-[11px] text-slate-600 leading-snug flex items-start gap-1.5"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#FCA228] mt-1.5 flex-shrink-0 group-hover:scale-125 transition-transform" />
                              <span className="line-clamp-2 select-text">
                                {prog}
                              </span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Footer Info Kontak */}
                {(member.email || member.phone) && (
                  <div className="px-4 py-2.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2 text-[10px] text-slate-500 group-hover:bg-slate-100/60 transition-colors">
                    {member.email && (
                      <div
                        className="flex items-center gap-1 truncate select-text"
                        title={member.email}
                      >
                        <Mail className="w-3 h-3 text-slate-400 flex-shrink-0 group-hover:text-[#633B83] transition-colors" />
                        <span className="truncate">
                          {member.email.split("@")[0]}
                        </span>
                      </div>
                    )}

                    {member.phone && (
                      <div className="flex items-center gap-1 flex-shrink-0 select-text">
                        <Phone className="w-3 h-3 text-slate-400 group-hover:text-[#633B83] transition-colors" />
                        <span>{member.phone.replace("+62 ", "")}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================= */}
      {/* EMPTY STATE                                              */}
      {/* ========================================================= */}
      {totalItems === 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center max-w-lg mx-auto shadow-xs">
          <Users className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">
            Tidak ada anggota tim yang cocok
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Silakan periksa kata kunci pencarian atau ganti pilihan divisi
            filter.
          </p>
          <button
            type="button"
            onClick={onReset}
            className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Tampilkan Semua Anggota
          </button>
        </div>
      )}
    </div>
  );
};
