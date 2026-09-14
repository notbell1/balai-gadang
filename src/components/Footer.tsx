import React from "react";
import { MapPin, Phone, Mail, Clock, ArrowUp } from "lucide-react";
import { ProfileData } from "../types";

interface FooterProps {
  profile: ProfileData | null;
  onNavigate: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { id: "beranda", label: "Beranda" },
    { id: "profil", label: "Profil & Pelayanan" },
    { id: "wilayah", label: "Data RW" },
    { id: "peta", label: "Peta Interaktif" },
    { id: "fasilitas", label: "Fasilitas Publik" },
    { id: "potensi", label: "Potensi & UMKM" },
    { id: "kkn", label: "Tim KKN" },
  ];

  // Menggunakan periksaan opsional aman agar TypeScript tidak melempar error
  const name = profile?.general?.name || "Kelurahan Balai Gadang";
  const subdistrict =
    (profile?.general as Record<string, any>)?.subdistrict ||
    "Kecamatan Koto Tangah";
  const city = (profile?.general as Record<string, any>)?.city || "Kota Padang";
  const slogan = profile?.general?.slogan;

  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand & Identity */}
          <div className="md:col-span-5 space-y-3">
            <div>
              <h3 className="font-extrabold text-lg text-white leading-tight">
                {name}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {subdistrict}, {city} &bull; KKN UISB {currentYear}
              </p>
            </div>

            <p className="text-xs text-slate-300/80 leading-relaxed max-w-sm">
              Website profil digital dan peta spasial publik untuk transparansi
              data wilayah dan kemudahan pelayanan masyarakat.
            </p>

            {slogan && (
              <p className="text-xs text-[#FCCB5D] italic">
                &ldquo;{slogan}&rdquo;
              </p>
            )}
          </div>

          {/* Quick Nav Grid */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold text-[#FCCB5D] uppercase tracking-wider mb-3">
              Navigasi
            </h4>
            <ul className="grid grid-cols-1 gap-1.5 text-xs text-slate-300">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="hover:text-[#FCA228] transition-colors cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak Kantor */}
          <div className="md:col-span-4 space-y-2.5">
            <h4 className="text-xs font-bold text-[#FCCB5D] uppercase tracking-wider mb-3">
              Kantor Pelayanan
            </h4>

            {profile?.contact?.officeAddress && (
              <div className="flex items-start gap-2 text-xs text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-[#FCA228] flex-shrink-0 mt-0.5" />
                <span>{profile.contact.officeAddress}</span>
              </div>
            )}

            {profile?.contact?.operatingHours && (
              <div className="flex items-start gap-2 text-xs text-slate-300">
                <Clock className="w-3.5 h-3.5 text-[#FCA228] flex-shrink-0 mt-0.5" />
                <span>{profile.contact.operatingHours}</span>
              </div>
            )}

            {(profile?.contact?.phone || profile?.contact?.whatsapp) && (
              <div className="flex items-start gap-2 text-xs text-slate-300">
                <Phone className="w-3.5 h-3.5 text-[#FCA228] flex-shrink-0 mt-0.5" />
                <span>
                  {[profile?.contact?.phone, profile?.contact?.whatsapp]
                    .filter(Boolean)
                    .join(" / ")}
                </span>
              </div>
            )}

            {profile?.contact?.email && (
              <div className="flex items-start gap-2 text-xs text-slate-300">
                <Mail className="w-3.5 h-3.5 text-[#FCA228] flex-shrink-0 mt-0.5" />
                <span>{profile.contact.email}</span>
              </div>
            )}

            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#633B83]/50 hover:bg-[#633B83] text-slate-200 hover:text-white text-xs font-medium border border-[#8F66AC]/40 transition-colors cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5 text-[#FCCB5D]" />
                <span>Kembali ke Atas</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <p>
            &copy; {currentYear} {name} &bull; KKN UISB.
          </p>
        </div>
      </div>
    </footer>
  );
};
