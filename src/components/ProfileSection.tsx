import React, { useState } from 'react';
import {
  Building2,
  Target,
  History,
  Compass,
  Users,
  Clock,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { ProfileData } from '../types';

interface ProfileSectionProps {
  profile: ProfileData | null;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ profile }) => {
  const [activeTab, setActiveTab] = useState<'profil' | 'aparatur'>('profil');

  if (!profile) return null;

  return (
    <section id="profil" className="py-16 sm:py-24 bg-white/70 backdrop-blur-xs border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs sm:text-sm font-bold text-[#633B83] tracking-wider uppercase bg-[#7E549E]/10 px-3.5 py-1 rounded-full border border-[#8F66AC]/30">
            Profil Kelurahan
          </span>
          <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Profil &amp; Struktur Kelurahan
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Mengenal lebih dekat visi misi pembangunan, latar belakang sejarah, batas geografis, serta struktur aparatur di Kelurahan Balai Gadang.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200/80 max-w-md w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('profil')}
              className={`flex-1 sm:flex-none px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'profil'
                  ? 'bg-white text-[#633B83] shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Target className={`w-4 h-4 ${activeTab === 'profil' ? 'text-[#FCA228]' : 'text-slate-400'}`} />
              <span>Visi, Misi &amp; Wilayah</span>
            </button>
            <button
              onClick={() => setActiveTab('aparatur')}
              className={`flex-1 sm:flex-none px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'aparatur'
                  ? 'bg-white text-[#633B83] shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className={`w-4 h-4 ${activeTab === 'aparatur' ? 'text-[#FCA228]' : 'text-slate-400'}`} />
              <span>Aparatur &amp; Kontak Kantor</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Profil, Visi, Misi, Sejarah, Batas */}
        {activeTab === 'profil' && (
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Visi & Misi */}
            <div className="lg:col-span-7 space-y-6">
              {/* Visi Card */}
              <div className="bg-gradient-to-br from-[#7E549E]/10 via-[#FCA228]/5 to-purple-50/50 border border-[#8F66AC]/30 rounded-2xl p-6 sm:p-7 shadow-xs">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gradient-to-br from-[#633B83] to-[#7E549E] text-white rounded-xl shadow-xs">
                    <Target className="w-5 h-5 text-[#FCCB5D]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Visi Kelurahan</h3>
                    <p className="text-xs text-[#7E549E] font-semibold">Arah Pembangunan Jangka Panjang</p>
                  </div>
                </div>
                <blockquote className="text-slate-800 font-medium text-base sm:text-lg italic leading-relaxed border-l-4 border-[#FCA228] pl-4 py-2 my-3 bg-white/90 rounded-r-xl">
                  &ldquo;{profile.vision}&rdquo;
                </blockquote>
              </div>

              {/* Misi Card */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-7 shadow-xs">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#7E549E]" />
                  Misi Pembangunan Kelurahan
                </h3>
                <ul className="space-y-3">
                  {profile.missions.map((misi, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#7E549E]/15 text-[#633B83] font-bold text-xs flex items-center justify-center mt-0.5 border border-[#8F66AC]/30">
                        {idx + 1}
                      </span>
                      <span className="text-sm text-slate-700 leading-relaxed">{misi}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sejarah Singkat */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-7 shadow-xs">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <History className="w-5 h-5 text-[#FCA228]" />
                  Latar Belakang &amp; Karakteristik Wilayah
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {profile.history}
                </p>
              </div>
            </div>

            {/* Right: Batas Wilayah & Geografis */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-gradient-to-br from-slate-950 via-[#633B83]/95 to-slate-900 text-white rounded-2xl p-6 sm:p-7 shadow-md border border-[#8F66AC]/30">
                <h3 className="text-lg font-bold flex items-center gap-2 text-white mb-4">
                  <Compass className="w-5 h-5 text-[#FCCB5D]" />
                  Batas Geografis Wilayah
                </h3>
                <div className="space-y-3">
                  <div className="p-3.5 bg-slate-900/80 rounded-xl border border-white/10">
                    <span className="text-xs font-bold text-[#FCA228] block uppercase tracking-wider mb-0.5">Sebelah Utara</span>
                    <span className="text-xs sm:text-sm text-slate-200 leading-snug">{profile.boundaries.north}</span>
                  </div>
                  <div className="p-3.5 bg-slate-900/80 rounded-xl border border-white/10">
                    <span className="text-xs font-bold text-[#FCB739] block uppercase tracking-wider mb-0.5">Sebelah Selatan</span>
                    <span className="text-xs sm:text-sm text-slate-200 leading-snug">{profile.boundaries.south}</span>
                  </div>
                  <div className="p-3.5 bg-slate-900/80 rounded-xl border border-white/10">
                    <span className="text-xs font-bold text-[#FCCB5D] block uppercase tracking-wider mb-0.5">Sebelah Barat</span>
                    <span className="text-xs sm:text-sm text-slate-200 leading-snug">{profile.boundaries.west}</span>
                  </div>
                  <div className="p-3.5 bg-slate-900/80 rounded-xl border border-white/10">
                    <span className="text-xs font-bold text-[#A582BF] block uppercase tracking-wider mb-0.5">Sebelah Timur</span>
                    <span className="text-xs sm:text-sm text-slate-200 leading-snug">{profile.boundaries.east}</span>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-white/10 text-xs text-slate-300 grid grid-cols-2 gap-4">
                  <div className="p-2.5 bg-slate-900/60 rounded-lg">
                    <span className="text-slate-400 block text-[11px]">Ketinggian:</span>
                    <span className="font-bold text-white text-sm">{profile.general.elevationMeters}</span>
                  </div>
                  <div className="p-2.5 bg-slate-900/60 rounded-lg">
                    <span className="text-slate-400 block text-[11px]">Kode Pos:</span>
                    <span className="font-bold text-white text-sm">{profile.general.postalCode}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Aparatur & Kontak Kantor */}
        {activeTab === 'aparatur' && (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
            {/* Struktur Aparatur */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#7E549E]" />
                  Struktur Pimpinan &amp; Pembina
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="p-4 bg-gradient-to-r from-[#7E549E]/15 to-[#FCA228]/10 rounded-xl border border-[#8F66AC]/30">
                    <span className="text-xs font-bold text-[#633B83] block uppercase tracking-wider">Lurah Balai Gadang</span>
                    <span className="font-extrabold text-slate-900 text-base sm:text-lg">{profile.leadership.lurah}</span>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/60">
                    <span className="text-xs font-semibold text-slate-500 block uppercase tracking-wider">Sekretaris Kelurahan</span>
                    <span className="font-semibold text-slate-900">{profile.leadership.sekretaris}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                      <span className="text-[11px] font-semibold text-slate-500 block">Kasi Pemerintahan</span>
                      <span className="font-medium text-slate-900 text-xs">{profile.leadership.kasiPemerintahan}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                      <span className="text-[11px] font-semibold text-slate-500 block">Kasi Kesos & PB</span>
                      <span className="font-medium text-slate-900 text-xs">{profile.leadership.kasiKesosPB}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                      <span className="text-[11px] font-semibold text-slate-500 block">Staff</span>
                      <span className="font-medium text-slate-900 text-xs">{profile.leadership.staff1}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                      <span className="text-[11px] font-semibold text-slate-500 block">Staff</span>
                      <span className="font-medium text-slate-900 text-xs">{profile.leadership.staff2}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Kontak & Jam Operasional */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#FCA228]" />
                  Informasi Kantor Lurah
                </h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                    <MapPin className="w-5 h-5 text-[#7E549E] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900 block text-xs sm:text-sm">Alamat Kantor</span>
                      <p className="text-slate-600 text-xs leading-relaxed mt-0.5">{profile.contact.officeAddress}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                    <Clock className="w-5 h-5 text-[#7E549E] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900 block text-xs sm:text-sm">Jam Operasional Pelayanan</span>
                      <p className="text-slate-600 text-xs mt-0.5">{profile.contact.operatingHours}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                    <Phone className="w-5 h-5 text-[#7E549E] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900 block text-xs sm:text-sm">Kontak Telepon &amp; WhatsApp</span>
                      <p className="text-slate-600 text-xs mt-0.5">{profile.contact.phone} | {profile.contact.whatsapp}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                    <Mail className="w-5 h-5 text-[#7E549E] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900 block text-xs sm:text-sm">Email Resmi</span>
                      <p className="text-slate-600 text-xs mt-0.5">{profile.contact.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100">
                <a
                  href={profile.contact.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#633B83] to-[#7E549E] hover:from-[#7E549E] hover:to-[#8F66AC] text-white text-xs sm:text-sm font-semibold text-center flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <MapPin className="w-4 h-4 text-[#FCCB5D]" />
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
