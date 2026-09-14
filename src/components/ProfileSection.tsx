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
      className="py-10 sm:py-16 bg-white/70 backdrop-blur-xs border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-[11px] sm:text-xs font-bold text-[#633B83] tracking-wider uppercase bg-[#7E549E]/10 px-3 py-0.5 rounded-full border border-[#8F66AC]/30">
            Profil Kelurahan
          </span>
          <h2 className="mt-2 text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Profil &amp; Struktur Kelurahan
          </h2>
          <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-slate-600">
            Mengenal lebih dekat visi misi pembangunan, latar belakang sejarah,
            serta struktur aparatur di Kelurahan Balai Gadang.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-6 flex justify-center">
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200/80 max-w-sm w-full sm:w-auto">
            <button
              onClick={() => setActiveTab("profil")}
              className={`flex-1 sm:flex-none px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === "profil"
                  ? "bg-white text-[#633B83] shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Target
                className={`w-3.5 h-3.5 ${activeTab === "profil" ? "text-[#FCA228]" : "text-slate-400"}`}
              />
              <span>Visi, Misi &amp; Sejarah</span>
            </button>
            <button
              onClick={() => setActiveTab("aparatur")}
              className={`flex-1 sm:flex-none px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === "aparatur"
                  ? "bg-white text-[#633B83] shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Users
                className={`w-3.5 h-3.5 ${activeTab === "aparatur" ? "text-[#FCA228]" : "text-slate-400"}`}
              />
              <span>Aparatur &amp; Kontak Kantor</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Profil, Visi, Misi, Sejarah */}
        {activeTab === "profil" && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch max-w-6xl mx-auto">
            {/* Kiri: Visi & Misi */}
            <div className="lg:col-span-7 space-y-4 flex flex-col justify-between">
              {/* Visi Card */}
              <div className="bg-gradient-to-br from-[#7E549E]/10 via-[#FCA228]/5 to-purple-50/50 border border-[#8F66AC]/30 rounded-xl p-4 sm:p-5 shadow-xs">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="p-1.5 bg-gradient-to-br from-[#633B83] to-[#7E549E] text-white rounded-lg shadow-xs">
                    <Target className="w-4 h-4 text-[#FCCB5D]" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">
                      Visi Kelurahan
                    </h3>
                    <p className="text-[10px] sm:text-[11px] text-[#7E549E] font-semibold">
                      Arah Pembangunan Jangka Panjang
                    </p>
                  </div>
                </div>
                <blockquote className="text-slate-800 font-medium text-xs sm:text-sm italic leading-relaxed border-l-3 border-[#FCA228] pl-3 py-1.5 my-2 bg-white/90 rounded-r-lg">
                  &ldquo;{profile.vision}&rdquo;
                </blockquote>
              </div>

              {/* Misi Card */}
              <div className="bg-white border border-slate-200/80 rounded-xl p-4 sm:p-5 shadow-xs flex-1 flex flex-col justify-center">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#7E549E]" />
                  Misi Pembangunan Kelurahan
                </h3>
                <ul className="space-y-2">
                  {profile.missions.map((misi, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#7E549E]/15 text-[#633B83] font-bold text-[10px] flex items-center justify-center mt-0.5 border border-[#8F66AC]/30">
                        {idx + 1}
                      </span>
                      <span className="text-xs text-slate-700 leading-relaxed">
                        {misi}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Kanan: Latar Belakang / Sejarah */}
            <div className="lg:col-span-5 flex">
              <div className="bg-white border border-slate-200/80 rounded-xl p-4 sm:p-5 shadow-xs w-full flex flex-col">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-2.5 flex items-center gap-2">
                  <History className="w-4 h-4 text-[#FCA228]" />
                  Latar Belakang &amp; Karakteristik Wilayah
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed overflow-y-auto">
                  {profile.history}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Aparatur & Kontak Kantor */}
        {activeTab === "aparatur" && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-4xl mx-auto items-stretch">
            {/* Struktur Aparatur */}
            <div className="bg-white border border-slate-200/80 rounded-xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-3.5 flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#7E549E]" />
                  Struktur Pimpinan &amp; Pembina
                </h3>
                <div className="space-y-2.5 text-xs">
                  <div className="p-3 bg-gradient-to-r from-[#7E549E]/15 to-[#FCA228]/10 rounded-lg border border-[#8F66AC]/30">
                    <span className="text-[10px] font-bold text-[#633B83] block uppercase tracking-wider">
                      Lurah Balai Gadang
                    </span>
                    <span className="font-extrabold text-slate-900 text-sm">
                      {profile.leadership.lurah}
                    </span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/60">
                    <span className="text-[10px] font-semibold text-slate-500 block uppercase tracking-wider">
                      Sekretaris Kelurahan
                    </span>
                    <span className="font-semibold text-slate-900 text-xs">
                      {profile.leadership.sekretaris}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">
                      <span className="text-[10px] font-semibold text-slate-500 block">
                        Kasi Pemerintahan
                      </span>
                      <span className="font-medium text-slate-900 text-[11px]">
                        {profile.leadership.kasiPemerintahan}
                      </span>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">
                      <span className="text-[10px] font-semibold text-slate-500 block">
                        Kasi Kesos & PB
                      </span>
                      <span className="font-medium text-slate-900 text-[11px]">
                        {profile.leadership.kasiKesosPB}
                      </span>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">
                      <span className="text-[10px] font-semibold text-slate-500 block">
                        Staff
                      </span>
                      <span className="font-medium text-slate-900 text-[11px]">
                        {profile.leadership.staff1}
                      </span>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">
                      <span className="text-[10px] font-semibold text-slate-500 block">
                        Staff
                      </span>
                      <span className="font-medium text-slate-900 text-[11px]">
                        {profile.leadership.staff2}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Kontak & Jam Operasional */}
            <div className="bg-white border border-slate-200/80 rounded-xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-3.5 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#FCA228]" />
                  Informasi Kantor Lurah
                </h3>
                <div className="space-y-2.5 text-xs">
                  <div className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                    <MapPin className="w-4 h-4 text-[#7E549E] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900 block text-xs">
                        Alamat Kantor
                      </span>
                      <p className="text-slate-600 text-[11px] leading-relaxed mt-0.5">
                        {profile.contact.officeAddress}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                    <Clock className="w-4 h-4 text-[#7E549E] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900 block text-xs">
                        Jam Operasional Pelayanan
                      </span>
                      <p className="text-slate-600 text-[11px] mt-0.5">
                        {profile.contact.operatingHours}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                    <Phone className="w-4 h-4 text-[#7E549E] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900 block text-xs">
                        Kontak Telepon &amp; WhatsApp
                      </span>
                      <p className="text-slate-600 text-[11px] mt-0.5">
                        {profile.contact.phone} | {profile.contact.whatsapp}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                    <Mail className="w-4 h-4 text-[#7E549E] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900 block text-xs">
                        Email Resmi
                      </span>
                      <p className="text-slate-600 text-[11px] mt-0.5">
                        {profile.contact.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <a
                  href={profile.contact.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-[#633B83] to-[#7E549E] hover:from-[#7E549E] hover:to-[#8F66AC] text-white text-xs font-semibold text-center flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#FCCB5D]" />
                  <span>Petunjuk Arah Google Maps ke Kantor Lurah</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
