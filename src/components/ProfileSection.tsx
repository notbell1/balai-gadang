import React, { useState } from "react";
import {
  Building2,
  Target,
  History,
  Users,
  Clock,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Quote,
  ChevronRight,
} from "lucide-react";
import { ProfileData } from "../types";

interface ProfileSectionProps {
  profile: ProfileData | null;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ profile }) => {
  const [activeTab, setActiveTab] = useState<"profil" | "aparatur">("profil");

  if (!profile) return null;

  return (
    <section
      id="profil"
      className="relative py-12 lg:py-16 bg-slate-50 overflow-hidden border-b border-slate-200/80"
    >
      {/* Decorative Background Minimal */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header - Kompak */}
        <div className="text-center max-w-2xl mx-auto mb-6 lg:mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight mb-2">
            Profil & Struktur{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#633B83] to-[#A582BF]">
              Balai Gadang
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Mengenal lebih dekat visi misi, sejarah, dan susunan aparatur
            kelurahan.
          </p>
        </div>

        {/* Navigation Tabs - Padat */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-slate-200/60 rounded-xl w-full sm:w-auto shadow-inner">
            <button
              onClick={() => setActiveTab("profil")}
              className={`flex-1 sm:flex-none px-4 py-2 sm:px-6 text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === "profil"
                  ? "bg-white text-[#633B83] shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Target
                className={`w-3.5 h-3.5 ${activeTab === "profil" ? "text-[#FCA228]" : "text-slate-400"}`}
              />
              <span>Visi, Misi & Sejarah</span>
            </button>
            <button
              onClick={() => setActiveTab("aparatur")}
              className={`flex-1 sm:flex-none px-4 py-2 sm:px-6 text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === "aparatur"
                  ? "bg-white text-[#633B83] shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Users
                className={`w-3.5 h-3.5 ${activeTab === "aparatur" ? "text-[#FCA228]" : "text-slate-400"}`}
              />
              <span>Aparatur & Kontak</span>
            </button>
          </div>
        </div>

        {/* =========================================
            TAB 1: PROFIL (Visi, Misi, Sejarah)
            ========================================= */}
        {activeTab === "profil" && (
          <div className="animate-in fade-in zoom-in-[0.98] duration-200 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:h-[420px] items-stretch">
            {/* Kiri: Visi & Misi */}
            <div className="lg:col-span-7 flex flex-col gap-5 h-full">
              {/* Visi Card */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex-shrink-0">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#633B83] to-[#8F66AC] flex items-center justify-center shadow-sm">
                    <Target className="w-4 h-4 text-[#FCCB5D]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 leading-none mb-1">
                      Visi Kelurahan
                    </h3>
                    <p className="text-[10px] font-semibold text-[#7E549E] uppercase tracking-wider leading-none">
                      Arah Pembangunan
                    </p>
                  </div>
                </div>
                <div className="relative pl-3 border-l-2 border-[#FCA228]">
                  <p className="text-slate-700 font-medium text-xs sm:text-sm italic leading-relaxed">
                    "{profile.vision}"
                  </p>
                </div>
              </div>

              {/* Misi Card - Diberi overflow-y-auto jika misi panjang */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex-1 flex flex-col min-h-0">
                <div className="flex items-center gap-2.5 mb-4 flex-shrink-0">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#633B83]" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 leading-none">
                    Misi Kelurahan
                  </h3>
                </div>

                <div className="overflow-y-auto custom-scrollbar pr-2 flex-1">
                  <ul className="space-y-3">
                    {profile.missions.map((misi, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-md bg-[#7E549E]/10 text-[#633B83] font-bold text-[10px] flex items-center justify-center mt-0.5 border border-[#8F66AC]/20">
                          {idx + 1}
                        </div>
                        <span className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                          {misi}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Kanan: Sejarah */}
            <div className="lg:col-span-5 flex h-full min-h-[300px]">
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 w-full flex flex-col min-h-0">
                <div className="flex items-center gap-2.5 mb-4 flex-shrink-0">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FCA228] to-[#FCB739] flex items-center justify-center shadow-sm">
                    <History className="w-4 h-4 text-slate-900" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">
                    Latar Belakang <br /> & Sejarah
                  </h3>
                </div>

                {/* Scrollable text area */}
                <div className="overflow-y-auto custom-scrollbar pr-3 flex-1">
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed whitespace-pre-wrap">
                    {profile.history}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================
            TAB 2: APARATUR (Struktur, Kontak)
            ========================================= */}
        {activeTab === "aparatur" && (
          <div className="animate-in fade-in zoom-in-[0.98] duration-200 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:h-[420px] items-stretch">
            {/* Kiri: Struktur Aparatur */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col h-full overflow-y-auto custom-scrollbar">
              <div className="flex items-center gap-2.5 mb-5 flex-shrink-0">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center border border-slate-200">
                  <Users className="w-4 h-4 text-[#633B83]" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 leading-tight">
                  Struktur Pimpinan <br className="hidden sm:block" /> & Pembina
                </h3>
              </div>

              <div className="space-y-3">
                {/* Lurah */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-[#633B83] to-[#8F66AC] text-white shadow-sm flex flex-col justify-center">
                  <span className="text-[10px] font-bold text-[#FCCB5D] block uppercase tracking-widest mb-1 opacity-90">
                    Lurah Balai Gadang
                  </span>
                  <span className="font-extrabold text-base sm:text-lg">
                    {profile.leadership.lurah}
                  </span>
                </div>

                {/* Sekretaris */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-500 block uppercase tracking-wider mb-0.5">
                    Sekretaris Kelurahan
                  </span>
                  <span className="font-bold text-slate-800 text-sm">
                    {profile.leadership.sekretaris}
                  </span>
                </div>

                {/* Kasie & Staff Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[10px] font-bold text-slate-500 block uppercase tracking-wider mb-0.5">
                      Kasi Pemerintahan
                    </span>
                    <span className="font-semibold text-slate-800 text-[13px]">
                      {profile.leadership.kasiPemerintahan}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[10px] font-bold text-slate-500 block uppercase tracking-wider mb-0.5">
                      Kasi Kesos & PB
                    </span>
                    <span className="font-semibold text-slate-800 text-[13px]">
                      {profile.leadership.kasiKesosPB}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-0.5">
                      Staff
                    </span>
                    <span className="font-medium text-slate-700 text-[13px]">
                      {profile.leadership.staff1}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-0.5">
                      Staff
                    </span>
                    <span className="font-medium text-slate-700 text-[13px]">
                      {profile.leadership.staff2}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Kanan: Kontak & Jam Operasional */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col h-full">
              <div className="flex items-center gap-2.5 mb-5 flex-shrink-0">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center border border-slate-200">
                  <Building2 className="w-4 h-4 text-[#FCA228]" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 leading-tight">
                  Informasi & <br /> Kontak Kantor
                </h3>
              </div>

              <div className="space-y-3 flex-1 overflow-y-auto custom-scrollbar pr-2">
                <div className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50">
                  <div className="mt-0.5 p-1.5 bg-slate-100 rounded-md text-[#7E549E]">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-xs mb-0.5">
                      Alamat Kantor
                    </span>
                    <p className="text-slate-600 text-[11px] sm:text-xs leading-relaxed">
                      {profile.contact.officeAddress}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50">
                  <div className="mt-0.5 p-1.5 bg-slate-100 rounded-md text-[#7E549E]">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-xs mb-0.5">
                      Jam Pelayanan
                    </span>
                    <p className="text-slate-600 text-[11px] sm:text-xs">
                      {profile.contact.operatingHours}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50">
                  <div className="mt-0.5 p-1.5 bg-slate-100 rounded-md text-[#7E549E]">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-xs mb-0.5">
                      Telp & WhatsApp
                    </span>
                    <p className="text-slate-600 text-[11px] sm:text-xs">
                      {profile.contact.phone} | {profile.contact.whatsapp}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50">
                  <div className="mt-0.5 p-1.5 bg-slate-100 rounded-md text-[#7E549E]">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-xs mb-0.5">
                      Email Resmi
                    </span>
                    <p className="text-slate-600 text-[11px] sm:text-xs">
                      {profile.contact.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Google Maps CTA */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex-shrink-0">
                <a
                  href={profile.contact.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-[13px] font-bold text-center flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#FCA228]" />
                  <span>Petunjuk Arah Maps</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom CSS untuk Scrollbar Tipis dan Bersih */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: #94a3b8;
        }
      `}</style>
    </section>
  );
};
