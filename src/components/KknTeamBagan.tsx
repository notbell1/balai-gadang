import React from "react";
import { KknTeamData } from "../types";
import { Award, ArrowDown, ChevronRight, Crown } from "lucide-react";

type TeamMember = KknTeamData["members"][number];

interface DivisionGroup {
  name: string;
  color: string;
  badgeColor: string;
  koordinator?: TeamMember;
  anggota: TeamMember[];
  total: number;
}

interface KknTeamBaganProps {
  teamData: KknTeamData;
  bphMembers: TeamMember[];
  divisionGroups: DivisionGroup[];
  onSelectDivision: (divisionName: string) => void;
}

export const KknTeamBagan: React.FC<KknTeamBaganProps> = ({
  teamData,
  bphMembers,
  divisionGroups,
  onSelectDivision,
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
    <div className="space-y-6 select-none">
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/90 shadow-xs">
        {/* Header Compact */}
        <div className="text-center max-w-xl mx-auto mb-6">
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
            Struktur Kepengurusan &amp; Pembagian 5 Divisi Kerja
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Klik pada divisi mana saja untuk langsung menyaring daftar anggota
            terperinci.
          </p>
        </div>

        {/* LEVEL 1: DPL (Top Level) */}
        <div className="flex flex-col items-center">
          <div className="bg-gradient-to-b from-slate-950 via-[#633B83] to-slate-900 text-white p-4 rounded-xl shadow-xs border-2 border-[#FCCB5D]/60 max-w-xs w-full text-center relative group hover:shadow-xl hover:shadow-[#633B83]/20 hover:-translate-y-1 transition-all duration-300 cursor-default">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FCA228] to-[#FCB739] text-slate-950 flex items-center justify-center mx-auto -mt-8 shadow-md border-2 border-white group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
              <Crown className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#FCCB5D] block mt-1">
              Dosen Pembimbing Lapangan (DPL)
            </span>
            <h4 className="text-sm font-extrabold text-white mt-0.5 group-hover:text-[#FCCB5D] transition-colors select-text">
              {teamData.dplName}
            </h4>
            <p className="text-[11px] text-slate-300 font-mono mt-0.5 select-text">
              NUPTK. {teamData.dplNip}
            </p>
            <div className="text-[10px] text-slate-300 mt-1.5 pt-1.5 border-t border-slate-700/80">
              {teamData.faculty} &bull; {teamData.university}
            </div>
          </div>

          {/* Connecting Stem */}
          <div className="w-0.5 h-5 bg-slate-300 my-0.5"></div>
          <ArrowDown className="w-3.5 h-3.5 text-slate-400 -mt-1.5 mb-1" />
        </div>

        {/* LEVEL 2: BADAN PENGURUS HARIAN (BPH) */}
        <div className="mt-1">
          <div className="text-center mb-3">
            <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-3 py-0.5 rounded-full border border-slate-200">
              Badan Pengurus Harian (BPH) &bull; 5 Pimpinan Inti
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {bphMembers.map((member) => {
              const isKetua =
                member.role.toLowerCase().includes("ketua") &&
                !member.role.toLowerCase().includes("wakil");

              // Fallback jika member.photo tidak ada
              const avatarUrl =
                member.photo ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  member.name,
                )}&background=7E549E&color=fff&size=256`;

              return (
                <div
                  key={member.id}
                  className={`group relative rounded-2xl p-3.5 transition-all duration-300 border flex flex-col justify-between overflow-hidden hover:-translate-y-1.5 hover:shadow-lg ${
                    isKetua
                      ? "bg-gradient-to-br from-[#7E549E]/15 via-white to-[#FCA228]/10 border-[#8F66AC] shadow-xs ring-1 ring-[#7E549E]/40 hover:ring-2 hover:ring-[#7E549E] hover:shadow-[#7E549E]/20"
                      : "bg-slate-50/80 border-slate-200 hover:border-[#8F66AC] hover:bg-white hover:shadow-slate-300/50"
                  }`}
                >
                  {/* Top Accent Line on Hover */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#633B83] via-[#8F66AC] to-[#FCA228] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    {/* Header Card dengan Proteksi Foto BPH */}
                    <div className="flex flex-col items-center text-center mb-2.5">
                      {/* =================================================== */}
                      {/* PROTECTED AVATAR CONTAINER                         */}
                      {/* =================================================== */}
                      <div className="relative mb-2 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border-2 border-white shadow-md group-hover:scale-105 group-hover:shadow-lg transition-all duration-300 group-hover:border-[#7E549E]/40">
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

                        {/* Crown Badge (khusus Ketua) */}
                        {isKetua && (
                          <div className="absolute top-1 right-1 z-20 bg-[#FCA228] text-slate-950 p-1 rounded-full shadow-xs border border-white">
                            <Crown className="w-2.5 h-2.5" />
                          </div>
                        )}
                      </div>
                      {/* =================================================== */}

                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider mb-1 ${
                          isKetua
                            ? "bg-gradient-to-r from-[#633B83] to-[#7E549E] text-white shadow-xs"
                            : "bg-slate-200 text-slate-800 group-hover:bg-[#7E549E]/15 group-hover:text-[#633B83] transition-colors"
                        }`}
                      >
                        {member.role}
                      </span>
                      <h5 className="text-xs font-bold text-slate-900 leading-tight group-hover:text-[#633B83] transition-colors line-clamp-1 select-text">
                        {member.name}
                      </h5>
                    </div>

                    <div className="text-center space-y-0.5">
                      <p className="text-[10px] text-slate-600 font-medium truncate select-text">
                        {member.major}
                      </p>
                      <p className="text-[9px] text-slate-400 truncate select-text">
                        {member.faculty}
                      </p>
                    </div>
                  </div>

                  <div className="mt-2.5 pt-1.5 border-t border-slate-200/70 text-[9px] text-center text-slate-500 font-mono group-hover:text-slate-700 transition-colors select-text">
                    NIM. {member.nim}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Connecting Stem */}
          <div className="flex flex-col items-center my-4">
            <div className="w-0.5 h-5 bg-slate-300"></div>
            <ArrowDown className="w-3.5 h-3.5 text-slate-400 -mt-1.5" />
          </div>
        </div>

        {/* LEVEL 3: 5 DIVISI KERJA */}
        <div>
          <div className="text-center mb-4">
            <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-3 py-0.5 rounded-full border border-slate-200">
              5 Divisi Pelaksana Program Kerja (16 Mahasiswa)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
            {divisionGroups.map((div, idx) => (
              <div
                key={idx}
                onClick={() => onSelectDivision(div.name)}
                className={`rounded-2xl border p-3 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-[#8F66AC] ${div.color} flex flex-col justify-between group relative overflow-hidden`}
              >
                {/* Glow Effect saat hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="relative z-10">
                  {/* Division Header */}
                  <div className="flex items-center justify-between gap-1.5 pb-2 mb-2 border-b border-slate-200/60">
                    <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-[#633B83] transition-colors truncate">
                      {div.name}
                    </h4>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0 transition-transform duration-300 group-hover:scale-110 ${div.badgeColor}`}
                    >
                      {div.total} Orang
                    </span>
                  </div>

                  {/* Koordinator */}
                  {div.koordinator && (
                    <div className="p-2 bg-white/90 rounded-xl border border-slate-200/80 mb-2 shadow-xs group-hover:border-[#8F66AC]/40 group-hover:shadow-md transition-all duration-300">
                      <div className="text-[9px] font-bold uppercase tracking-wider text-[#633B83] mb-0.5 flex items-center gap-1">
                        <Award className="w-2.5 h-2.5 text-[#FCA228]" />
                        <span>Koordinator</span>
                      </div>
                      <div className="text-[11px] font-bold text-slate-900 truncate select-text">
                        {div.koordinator.name}
                      </div>
                      <div className="text-[9px] text-slate-500 truncate select-text">
                        {div.koordinator.major}
                      </div>
                    </div>
                  )}

                  {/* Anggota List */}
                  <div className="space-y-1">
                    <div className="text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">
                      Anggota ({div.anggota.length})
                    </div>
                    {div.anggota.map((ang) => (
                      <div
                        key={ang.id}
                        className="p-1.5 bg-white/70 rounded-lg text-xs border border-slate-100 flex items-start gap-1.5 group-hover:bg-white group-hover:shadow-xs transition-all duration-200"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FCA228] mt-1 flex-shrink-0 group-hover:scale-125 transition-transform" />
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-800 text-[10px] truncate leading-tight select-text">
                            {ang.name}
                          </p>
                          <p className="text-[9px] text-slate-500 truncate select-text">
                            {ang.major}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative z-10 mt-3 pt-2 border-t border-slate-200/60 text-[9px] font-bold text-[#633B83] flex items-center justify-between group-hover:text-[#633B83]">
                  <span className="group-hover:translate-x-0.5 transition-transform">
                    Lihat Profil Detail
                  </span>
                  <ChevronRight className="w-3 h-3 text-[#FCA228] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
