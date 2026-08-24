import React from "react";
import {
  Building,
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  ArrowUp,
} from "lucide-react";
import { ProfileData } from "../types";

interface FooterProps {
  profile: ProfileData | null;
  onNavigate: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Slogan with Dual Official Logos */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {/* Logo KKN Balai Gadang */}
              <div className="w-11 h-11 rounded-xl bg-white p-1 flex items-center justify-center shadow-md border border-[#8F66AC]/40 flex-shrink-0">
                <img
                  src="/images/kkn.svg"
                  alt="Logo KKN Balai Gadang"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/logo.png";
                  }}
                />
              </div>

              {/* Logo UISB */}
              <div className="h-11 rounded-xl bg-white px-2 py-1 flex items-center justify-center shadow-md border border-[#8F66AC]/40 flex-shrink-0">
                <img
                  src="/images/uisb.svg"
                  alt="Logo UISB"
                  className="h-7 w-auto object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/images/uisb.png";
                  }}
                />
              </div>
            </div>

            <div>
              <span className="font-extrabold text-lg text-white block leading-tight">
                Kelurahan Balai Gadang
              </span>
              <span className="text-xs text-slate-400">
                Kecamatan Koto Tangah, Kota Padang &bull; KKN UISB 2026
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Website profil digital publik dan peta spasial interaktif untuk
              mempermudah masyarakat mengakses informasi pelayanan, wilayah, dan
              potensi nagari secara mandiri.
            </p>

            <div className="p-3 bg-[#633B83]/30 rounded-xl border border-[#8F66AC]/40 text-xs text-[#FCCB5D] font-medium">
              &ldquo;
              {profile?.general.slogan ||
                "Balai Gadang Madani, Asri, dan Berkelanjutan"}
              &rdquo;
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="text-xs font-bold text-[#FCCB5D] uppercase tracking-wider mb-4">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-300">
              <li>
                <button
                  onClick={() => onNavigate("beranda")}
                  className="hover:text-[#FCA228] transition-colors cursor-pointer"
                >
                  Beranda Utama
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("profil")}
                  className="hover:text-[#FCA228] transition-colors cursor-pointer"
                >
                  Profil &amp; Pelayanan Kantor
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("wilayah")}
                  className="hover:text-[#FCA228] transition-colors cursor-pointer"
                >
                  Data Rukun Warga (RW)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("peta")}
                  className="hover:text-[#FCA228] transition-colors cursor-pointer"
                >
                  Peta Spasial Interaktif
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("fasilitas")}
                  className="hover:text-[#FCA228] transition-colors cursor-pointer"
                >
                  Katalog Fasilitas Publik
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("potensi")}
                  className="hover:text-[#FCA228] transition-colors cursor-pointer"
                >
                  Potensi UMKM &amp; Agrowisata
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("kkn")}
                  className="hover:text-[#FCA228] transition-colors cursor-pointer"
                >
                  Struktur Tim KKN Mahasiswa
                </button>
              </li>
            </ul>
          </div>

          {/* Kantor & Kontak */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#FCCB5D] uppercase tracking-wider mb-4">
              Kantor Pelayanan
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-[#FCA228] flex-shrink-0 mt-0.5" />
              <span>
                {profile?.contact.officeAddress ||
                  "Jl. Raya Balai Gadang No. 12, Lubuk Minturun, Kota Padang"}
              </span>
            </div>
            <div className="flex items-start gap-2.5 text-xs text-slate-300">
              <Clock className="w-4 h-4 text-[#FCA228] flex-shrink-0 mt-0.5" />
              <span>
                {profile?.contact.operatingHours ||
                  "Senin – Jumat (07.30 – 16.00 WIB)"}
              </span>
            </div>
            <div className="flex items-start gap-2.5 text-xs text-slate-300">
              <Phone className="w-4 h-4 text-[#FCA228] flex-shrink-0 mt-0.5" />
              <span>
                {profile?.contact.phone || "(0751) 480123"} /{" "}
                {profile?.contact.whatsapp || "0812-7654-3210"}
              </span>
            </div>
            <div className="flex items-start gap-2.5 text-xs text-slate-300">
              <Mail className="w-4 h-4 text-[#FCA228] flex-shrink-0 mt-0.5" />
              <span>
                {profile?.contact.email || "balaigadang.kel@padang.go.id"}
              </span>
            </div>
          </div>

          {/* Legal & Back to Top */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <h4 className="text-xs font-bold text-[#FCCB5D] uppercase tracking-wider mb-4">
                Keterbukaan Publik
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Platform profil digital ini dirancang statis tanpa backend,
                berkinerja tinggi, dan ramah akses QR Code bagi seluruh
                masyarakat nagari.
              </p>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#633B83]/60 hover:bg-[#633B83] text-slate-200 hover:text-white text-xs font-semibold border border-[#8F66AC]/40 transition-colors self-start w-full sm:w-auto cursor-pointer"
            >
              <ArrowUp className="w-4 h-4 text-[#FCCB5D]" />
              <span>Kembali ke Atas</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} Pemerintah Kelurahan Balai Gadang,
            Kecamatan Koto Tangah, Kota Padang &bull; KKN UISB.
          </p>
          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-[#FCA228]" />
            <span>Sistem Informasi Publik Berbasis Open Data</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
