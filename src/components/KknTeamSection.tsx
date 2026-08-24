import React, { useState, useMemo } from "react";
import { KknTeamData } from "../types";
import {
  GraduationCap,
  Users,
  Search,
  RotateCcw,
  ChevronRight,
  BookOpen,
  Calendar,
  Building,
  CheckCircle2,
  Mail,
  Phone,
  Quote,
  Sparkles,
  Award,
  Crown,
  Network,
  ArrowDown,
  ShieldCheck,
  Building2,
  FileText,
  MapPin,
} from "lucide-react";

interface KknTeamSectionProps {
  kknTeam: KknTeamData | null;
}

export const KknTeamSection: React.FC<KknTeamSectionProps> = ({ kknTeam }) => {
  const [activeTab, setActiveTab] = useState<"bagan" | "daftar">("bagan");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("all");

  // Comprehensive fallback data for Universitas Islam Sumatera Barat (UISB)
  const teamData: KknTeamData = useMemo(() => {
    if (kknTeam && kknTeam.members && kknTeam.members.length >= 21) {
      return kknTeam;
    }
    return {
      groupName: "Tim KKN Kelurahan Balai Gadang",
      theme:
        "Digitalisasi Informasi Spasial, Pemetaan Fasilitas Publik, dan Pemberdayaan Potensi Unggulan Kelurahan Balai Gadang",
      period: "Semester Ganjil 2026 (Juli – Agustus 2026)",
      university: "Universitas Islam Sumatera Barat",
      faculty:
        "Lembaga Penelitian dan Pengabdian kepada Masyarakat (LPPM) UISB",
      dplName: "Dr. Ir. Syahrul Anwar, M.Si.",
      dplNip: "19780412 200501 1 003",
      location: "Kelurahan Balai Gadang, Kecamatan Koto Tangah, Kota Padang",
      summary:
        "Kelompok Mahasiswa Kuliah Kerja Nyata (KKN) Universitas Islam Sumatera Barat (UISB) berkolaborasi bersama Pemerintah Kelurahan, Pengurus RW, dan Tokoh Masyarakat Balai Gadang dalam mewujudkan keterbukaan informasi publik, pemetaan spasial fasilitas nagari, dan promosi potensi sentra tanaman hias serta UMKM.",
      webDeveloper: {
        name: "Muhammad Rizky Pratama",
        nim: "2211522001",
        major: "Sistem Informasi",
        faculty: "Fakultas Sains dan Teknologi",
        university: "Universitas Islam Sumatera Barat",
        role: "Ketua Kelompok & Perancang Sistem Informasi",
        bio: "Perancang sistem informasi digital dan pemetaan wilayah interaktif Kelurahan Balai Gadang dari Program Studi Sistem Informasi UISB.",
        focusAreas: [
          "Pemetaan Spasial Fasilitas Publik",
          "Katalog Digital Potensi UMKM & Agrowisata",
          "Sistem Informasi Kependudukan & Wilayah RW",
          "Akses Informasi Cepat Ramah Warga & QR Code",
        ],
        responsibilities: [
          "Penyusunan arsitektur basis data spasial fasilitas nagari berbasis OpenStreetMap",
          "Implementasi peta interaktif dan katalog profil pelayanan publik terpadu",
          "Penyediaan akses informasi terbuka yang mudah dijangkau seluruh lapisan warga",
        ],
      },
      members: [
        {
          id: "KKN-01",
          name: "Muhammad Rizky Pratama",
          nim: "2211522001",
          role: "Ketua Kelompok",
          division: "Pimpinan Inti (BPH)",
          major: "Sistem Informasi",
          faculty: "Fakultas Sains dan Teknologi",
          university: "Universitas Islam Sumatera Barat",
          photo:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
          email: "rizky.pratama@student.uisb.ac.id",
          phone: "+62 812-7890-1234",
          quote:
            "Membangun nagari yang mandiri dan berkemajuan melalui integrasi sistem informasi dan pengabdian masyarakat.",
          programs: [
            "Koordinator umum kemitraan program kerja KKN dengan Kelurahan dan pengurus 10 RW",
            "Perancangan sistem informasi profil digital dan peta spasial nagari",
            "Penyusunan laporan akhir evaluasi capaian program pengabdian masyarakat",
          ],
        },
        {
          id: "KKN-02",
          name: "Ahmad Fadillah",
          nim: "2210921012",
          role: "Wakil Ketua",
          division: "Pimpinan Inti (BPH)",
          major: "Teknik Sipil",
          faculty: "Fakultas Sains dan Teknologi",
          university: "Universitas Islam Sumatera Barat",
          photo:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
          email: "ahmad.fadillah@student.uisb.ac.id",
          phone: "+62 812-3456-7891",
          quote:
            "Sinergi yang kokoh dan kepedulian nyata menghadirkan kebermanfaatan luas bagi nagari.",
          programs: [
            "Pendampingan operasional harian dan koordinasi lintas divisi lapangan",
            "Survei kelayakan dan verifikasi titik koordinat sarana infrastruktur publik 10 RW",
            "Monitoring berkala realisasi seluruh kegiatan kemasyarakatan",
          ],
        },
        {
          id: "KKN-03",
          name: "Nabila Putri Maharani",
          nim: "2210842015",
          role: "Sekretaris 1",
          division: "Pimpinan Inti (BPH)",
          major: "Ilmu Administrasi",
          faculty: "Fakultas Ekonomi dan Bisnis Islam",
          university: "Universitas Islam Sumatera Barat",
          photo:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
          email: "nabila.maharani@student.uisb.ac.id",
          phone: "+62 821-6543-9870",
          quote:
            "Ketertiban administrasi dan tata kelola yang rapi adalah kunci keberhasilan program nagari.",
          programs: [
            "Pengelolaan tata persuratan resmi, kemitraan instansi, dan notulensi koordinasi",
            "Inventarisasi dokumen profil wilayah dan verifikasi data demografi kelurahan",
            "Penyusunan naskah buku laporan akhir pengabdian masyarakat",
          ],
        },
        {
          id: "KKN-04",
          name: "Tiara Amelia",
          nim: "2210712033",
          role: "Sekretaris 2",
          division: "Pimpinan Inti (BPH)",
          major: "Pendidikan Bahasa",
          faculty: "Fakultas Tarbiyah dan Keguruan",
          university: "Universitas Islam Sumatera Barat",
          photo:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
          email: "tiara.amelia@student.uisb.ac.id",
          phone: "+62 813-7766-5544",
          quote:
            "Penyajian informasi yang santun, jelas, dan edukatif mempererat hubungan bersama warga.",
          programs: [
            "Penyusunan naskah narasi sejarah, kearifan lokal Minangkabau, dan potensi wilayah",
            "Pengarsipan data pendataan sarana publik dan presensi kegiatan warga",
            "Penyusunan berita acara kegiatan sosialisasi dan lokakarya",
          ],
        },
        {
          id: "KKN-05",
          name: "Siti Rahma Azzahra",
          nim: "2210531024",
          role: "Bendahara",
          division: "Pimpinan Inti (BPH)",
          major: "Akuntansi Syariah",
          faculty: "Fakultas Ekonomi dan Bisnis Islam",
          university: "Universitas Islam Sumatera Barat",
          photo:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
          email: "siti.rahma@student.uisb.ac.id",
          phone: "+62 853-2109-8765",
          quote:
            "Transparansi dan amanah dalam pengelolaan anggaran menjamin kelancaran setiap program kerja.",
          programs: [
            "Penyusunan Rencana Anggaran Biaya (RAB) program kerja KKN",
            "Pencatatan arus kas operasional, survei lapangan, dan plang informasi QR Code",
            "Penyusunan Laporan Pertanggungjawaban (LPJ) keuangan pengabdian",
          ],
        },
        {
          id: "KKN-06",
          name: "Dimas Setiawan",
          nim: "2210522041",
          role: "Koordinator Divisi Acara",
          division: "Divisi Acara",
          major: "Manajemen Bisnis",
          faculty: "Fakultas Ekonomi dan Bisnis Islam",
          university: "Universitas Islam Sumatera Barat",
          photo:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
          email: "dimas.setiawan@student.uisb.ac.id",
          phone: "+62 812-9988-1122",
          quote:
            "Rangkaian kegiatan yang terstruktur dan bermakna menumbuhkan kebersamaan warga nagari.",
          programs: [
            "Penyusunan susunan acara lokakarya pemanfaatan informasi digital dan potensi nagari",
            "Pengorganisasian sosialisasi profil wilayah kepada tokoh masyarakat di kantor kelurahan",
            "Koordinasi teknis penutupan dan penyerahan simbolis plang QR Code ke 10 RW",
          ],
        },
        {
          id: "KKN-07",
          name: "Farhan Maulana",
          nim: "2210811019",
          role: "Anggota Divisi Acara",
          division: "Divisi Acara",
          major: "Sosiologi Agama",
          faculty: "Fakultas Ushuluddin dan Studi Islam",
          university: "Universitas Islam Sumatera Barat",
          photo:
            "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=400",
          email: "farhan.maulana@student.uisb.ac.id",
          phone: "+62 823-1122-3344",
          quote:
            "Membangun interaksi sosial yang hangat dan berakar pada nilai-nilai kebersamaan.",
          programs: [
            "Pendampingan agenda kebersamaan gotong royong dan senam sehat warga",
            "Pemandu acara pada sesi musyawarah kelurahan dan penyuluhan lingkungan",
            "Fasilitasi dialog kepemudaan bersama generasi muda Balai Gadang",
          ],
        },
        {
          id: "KKN-08",
          name: "Putri Anggraini",
          nim: "2210322018",
          role: "Anggota Divisi Acara",
          division: "Divisi Acara",
          major: "Bimbingan Konseling",
          faculty: "Fakultas Tarbiyah dan Keguruan",
          university: "Universitas Islam Sumatera Barat",
          photo:
            "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
          email: "putri.anggraini@student.uisb.ac.id",
          phone: "+62 851-2233-4455",
          quote:
            "Pendidikan dan bimbingan yang tulus menyalakan semangat generasi penerus nagari.",
          programs: [
            "Penyelenggaraan kelas bimbingan belajar dan pojok literasi anak nagari",
            "Pengembangan materi motivasi belajar untuk siswa di lingkungan Balai Gadang",
            "Bantuan teknis pendampingan kegiatan posyandu dan edukasi keluarga",
          ],
        },
        {
          id: "KKN-09",
          name: "Tari Wahyuni",
          nim: "2210832014",
          role: "Anggota Divisi Acara",
          division: "Divisi Acara",
          major: "Hukum Tata Negara",
          faculty: "Fakultas Syariah dan Hukum",
          university: "Universitas Islam Sumatera Barat",
          photo:
            "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
          email: "tari.wahyuni@student.uisb.ac.id",
          phone: "+62 853-4455-6677",
          quote:
            "Kegiatan yang tertata apik mendorong partisipasi aktif seluruh elemen masyarakat.",
          programs: [
            "Fasilitasi rembug warga dan pengaturan tata tertib musyawarah nagari",
            "Pengorganisasian panggung apresiasi masyarakat dan penyerahan cinderamata",
            "Manajemen tim kepemanduan lapangan selama masa pengabdian",
          ],
        },
        {
          id: "KKN-10",
          name: "Anisa Zahra",
          nim: "2210862009",
          role: "Koordinator Divisi PDD",
          division: "Divisi PDD",
          major: "Komunikasi Penyiaran Islam",
          faculty: "Fakultas Dakwah dan Komunikasi",
          university: "Universitas Islam Sumatera Barat",
          photo:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
          email: "anisa.zahra@student.uisb.ac.id",
          phone: "+62 852-7654-3219",
          quote:
            "Menyampaikan narasi keindahan budaya dan kekayaan potensi Balai Gadang secara bermartabat.",
          programs: [
            "Pengarahan publikasi kegiatan, dokumentasi visual, dan poster edukatif nagari",
            "Desain media sosialisasi profil kelurahan dan panduan pemindaian QR Code",
            "Penyusunan video profil pengabdian masyarakat KKN Kelurahan Balai Gadang",
          ],
        },
        {
          id: "KKN-11",
          name: "Bayu Pratama",
          nim: "2211512028",
          role: "Anggota Divisi PDD",
          division: "Divisi PDD",
          major: "Teknik Informatika",
          faculty: "Fakultas Sains dan Teknologi",
          university: "Universitas Islam Sumatera Barat",
          photo:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
          email: "bayu.pratama@student.uisb.ac.id",
          phone: "+62 813-5566-7788",
          quote:
            "Dokumentasi visual yang otentik memperkuat citra positif nagari di mata publik.",
          programs: [
            "Fotografi fasilitas sarana pemerintahan, ibadah, sekolah, dan sentra tanaman hias",
            "Penyuntingan video dokumenter wawancara tokoh adat dan ketua RW",
            "Pengelolaan arsip galeri foto kegiatan pengabdian masyarakat",
          ],
        },
        {
          id: "KKN-12",
          name: "Nadia Safitri",
          nim: "2210741005",
          role: "Anggota Divisi PDD",
          division: "Divisi PDD",
          major: "Pendidikan Seni & Bahasa",
          faculty: "Fakultas Tarbiyah dan Keguruan",
          university: "Universitas Islam Sumatera Barat",
          photo:
            "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400",
          email: "nadia.safitri@student.uisb.ac.id",
          phone: "+62 822-4433-2211",
          quote:
            "Sentuhan estetika mempercantik ruang publik dan mempertegas identitas lokal nagari.",
          programs: [
            "Tata letak grafis infografis cetak panduan akses QR Code untuk papan informasi RW",
            "Dekorasi panggung acara sosialisasi dan posko pengabdian KKN",
            "Penulisan narasi edukatif untuk publikasi informasi warga",
          ],
        },
        {
          id: "KKN-13",
          name: "Zahra Ramadhani",
          nim: "2211222014",
          role: "Koordinator Divisi Konsumsi",
          division: "Divisi Konsumsi",
          major: "Gizi & Kesehatan Masyarakat",
          faculty: "Fakultas Kedokteran dan Ilmu Kesehatan",
          university: "Universitas Islam Sumatera Barat",
          photo:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
          email: "zahra.ramadhani@student.uisb.ac.id",
          phone: "+62 813-8899-0011",
          quote:
            "Konsumsi yang halal, higienis, dan bergizi menjaga semangat serta stamina seluruh tim.",
          programs: [
            "Perencanaan logistik konsumsi bergizi seimbang selama periode KKN",
            "Pengadaan jamuan ramah tamah untuk musyawarah kelurahan dan kunjungan DPL",
            "Pemberdayaan kuliner UMKM lokal Balai Gadang sebagai mitra konsumsi utama",
          ],
        },
        {
          id: "KKN-14",
          name: "Melati Sukma",
          nim: "2211112021",
          role: "Anggota Divisi Konsumsi",
          division: "Divisi Konsumsi",
          major: "Teknologi Pertanian",
          faculty: "Fakultas Sains dan Teknologi",
          university: "Universitas Islam Sumatera Barat",
          photo:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
          email: "melati.sukma@student.uisb.ac.id",
          phone: "+62 852-9988-7766",
          quote:
            "Pemanfaatan hasil pangan lokal berkualitas mewujudkan kemandirian gizi keluarga.",
          programs: [
            "Distribusi konsumsi kegiatan kerja bakti lingkungan dan posyandu",
            "Pengelolaan ketersediaan stok bahan pangan harian posko KKN",
            "Edukasi pemanfaatan olahan hasil kebun lokal bersama kelompok PKK",
          ],
        },
        {
          id: "KKN-15",
          name: "Rendi Kurniawan",
          nim: "2210611032",
          role: "Anggota Divisi Konsumsi",
          division: "Divisi Konsumsi",
          major: "Agribisnis",
          faculty: "Fakultas Sains dan Teknologi",
          university: "Universitas Islam Sumatera Barat",
          photo:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
          email: "rendi.kurniawan@student.uisb.ac.id",
          phone: "+62 821-7788-9900",
          quote:
            "Kesigapan dan kerja sama tim memastikan setiap kebutuhan logistik terpenuhi baik.",
          programs: [
            "Distribusi logistik konsumsi saat survei koordinat sarana ke pelosok RW",
            "Pemeliharaan kebersihan dan sterilisasi perlengkapan dapur posko",
            "Koordinasi pengadaan bahan pokok bersama koordinator konsumsi",
          ],
        },
        {
          id: "KKN-16",
          name: "Fajar Ramadhan",
          nim: "2210923040",
          role: "Koordinator Divisi Perlengkapan",
          division: "Divisi Perlengkapan",
          major: "Teknik Lingkungan",
          faculty: "Fakultas Sains dan Teknologi",
          university: "Universitas Islam Sumatera Barat",
          photo:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
          email: "fajar.ramadhan@student.uisb.ac.id",
          phone: "+62 813-9876-5432",
          quote:
            "Kesiapan sarana prasarana adalah fondasi kelancaran setiap aksi nyata di tengah warga.",
          programs: [
            "Manajemen peralatan survei spasial GPS, proyektor, tata suara, dan posko KKN",
            "Pemasangan fisik tiang plang informasi QR Code di 10 titik strategis RW",
            "Penyediaan sarana pendukung kegiatan gotong royong kebersihan lingkungan",
          ],
        },
        {
          id: "KKN-17",
          name: "Aldi Pratama",
          nim: "2210952011",
          role: "Anggota Divisi Perlengkapan",
          division: "Divisi Perlengkapan",
          major: "Teknik Elektro",
          faculty: "Fakultas Sains dan Teknologi",
          university: "Universitas Islam Sumatera Barat",
          photo:
            "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=400",
          email: "aldi.pratama@student.uisb.ac.id",
          phone: "+62 812-4455-6677",
          quote:
            "Keandalan instalasi dan keamanan teknis menjamin kenyamanan seluruh kegiatan.",
          programs: [
            "Pemeriksaan instalasi kelistrikan dan audio pada sosialisasi kelurahan",
            "Perawatan armada kendaraan operasional survei lapangan ke seluruh RW",
            "Pemasangan papan petunjuk arah fasilitas umum bersama warga",
          ],
        },
        {
          id: "KKN-18",
          name: "Kevin Sanjaya",
          nim: "2210311025",
          role: "Anggota Divisi Perlengkapan",
          division: "Divisi Perlengkapan",
          major: "Fisika Terapan",
          faculty: "Fakultas Sains dan Teknologi",
          university: "Universitas Islam Sumatera Barat",
          photo:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
          email: "kevin.sanjaya@student.uisb.ac.id",
          phone: "+62 853-1144-7700",
          quote:
            "Ketelitian inventaris memastikan sarana prasarana terjaga dan termanfaatkan optimal.",
          programs: [
            "Pencatatan inventaris barang masuk-keluar dan perlengkapan posko",
            "Bantuan teknis pengukuran dimensi fisik sarana publik untuk pemutakhiran data",
            "Penyimpanan dan pemeliharaan perlengkapan pasca kegiatan",
          ],
        },
        {
          id: "KKN-19",
          name: "Irfan Hakim",
          nim: "2211121008",
          role: "Anggota Divisi Perlengkapan",
          division: "Divisi Perlengkapan",
          major: "Teknologi Pertanian",
          faculty: "Fakultas Sains dan Teknologi",
          university: "Universitas Islam Sumatera Barat",
          photo:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
          email: "irfan.hakim@student.uisb.ac.id",
          phone: "+62 821-6677-8899",
          quote:
            "Mendukung pengembangan potensi agrowisata dan sentra tanaman hias nagari.",
          programs: [
            "Penyediaan peralatan peraga budidaya tanaman hias dan pupuk organik",
            "Bantuan logistik pada kegiatan pendampingan agrowisata Lubuk Minturun",
            "Pengangkutan material plang QR Code ke kantor kelurahan dan balai RW",
          ],
        },
        {
          id: "KKN-20",
          name: "Rahmat Hidayat",
          nim: "2210221035",
          role: "Koordinator Divisi Humas",
          division: "Divisi Humas",
          major: "Pengembangan Masyarakat Islam",
          faculty: "Fakultas Dakwah dan Komunikasi",
          university: "Universitas Islam Sumatera Barat",
          photo:
            "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=400",
          email: "rahmat.hidayat@student.uisb.ac.id",
          phone: "+62 811-9876-1234",
          quote:
            "Merajut tali silaturahmi yang erat antara akademisi perguruan tinggi, kelurahan, dan warga.",
          programs: [
            "Penghubung komunikasi tim KKN dengan Lurah, LPM, Babinsa, Bhabinkamtibmas, dan Niniak Mamak",
            "Audiensi dengan pengurus paguyuban sentra tanaman hias Lubuk Minturun",
            "Sosialisasi program kerja dan penyerapan aspirasi ketua RW 01 hingga RW 10",
          ],
        },
        {
          id: "KKN-21",
          name: "Dinda Ayu Lestari",
          nim: "2211212048",
          role: "Anggota Divisi Humas",
          division: "Divisi Humas",
          major: "Kesehatan Masyarakat",
          faculty: "Fakultas Kedokteran dan Ilmu Kesehatan",
          university: "Universitas Islam Sumatera Barat",
          photo:
            "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400",
          email: "dinda.lestari@student.uisb.ac.id",
          phone: "+62 819-8765-0987",
          quote:
            "Pelayanan yang humanis dan peduli menumbuhkan kedekatan batin bersama masyarakat nagari.",
          programs: [
            "Pendampingan kader posyandu balita dan lansia di seluruh wilayah rukun warga",
            "Penyebaran survei kepuasan masyarakat terhadap kemudahan akses informasi publik",
            "Edukasi perilaku hidup bersih dan sehat (PHBS) secara door-to-door",
          ],
        },
      ],
    };
  }, [kknTeam]);

  // Extract BPH Members (5 Inti)
  const bphMembers = useMemo(() => {
    return teamData.members.filter(
      (m) => m.division.includes("BPH") || m.division.includes("Pimpinan"),
    );
  }, [teamData.members]);

  // Division categories mapping
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
        badgeColor: "bg-[#633B83] text-white",
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

  // Unique divisions list for filters
  const divisionOptions = useMemo(() => {
    const list = Array.from(new Set(teamData.members.map((m) => m.division)));
    return ["all", ...list];
  }, [teamData.members]);

  // Filtered members for directory view
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

  // Jump to specific division in directory view
  const handleSelectDivisionFromChart = (divisionName: string) => {
    setSelectedDivision(divisionName);
    setActiveTab("daftar");
    setTimeout(() => {
      const el = document.getElementById("kkn-list-container");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);
  };

  const devInfo = teamData.webDeveloper || {
    name: "Muhammad Rizky Pratama",
    nim: "2211522001",
    major: "Sistem Informasi",
    faculty: "Fakultas Sains dan Teknologi",
    university: "Universitas Islam Sumatera Barat",
    role: "Ketua Kelompok & Perancang Sistem Informasi",
    bio: "Perancang sistem informasi digital dan pemetaan wilayah interaktif Kelurahan Balai Gadang dari Program Studi Sistem Informasi UISB.",
    focusAreas: [
      "Pemetaan Spasial Fasilitas Publik",
      "Katalog Digital Potensi UMKM & Agrowisata",
      "Sistem Informasi Kependudukan & Wilayah RW",
      "Akses Informasi Cepat Ramah Warga & QR Code",
    ],
    responsibilities: [
      "Penyusunan arsitektur basis data spasial fasilitas nagari berbasis OpenStreetMap",
      "Implementasi peta interaktif dan katalog profil pelayanan publik terpadu",
      "Penyediaan akses informasi terbuka yang mudah dijangkau seluruh lapisan warga",
    ],
  };

  const focusPills = devInfo.focusAreas || [
    "Pemetaan Spasial Fasilitas Publik",
    "Katalog Digital Potensi UMKM & Agrowisata",
    "Sistem Informasi Kependudukan & Wilayah RW",
    "Akses Cepat Ramah Warga via QR Code",
  ];

  return (
    <section
      id="kkn"
      className="py-16 sm:py-24 bg-slate-50/70 border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs sm:text-sm font-bold text-[#633B83] tracking-wider uppercase bg-[#7E549E]/15 px-3.5 py-1 rounded-full border border-[#8F66AC]/30 inline-flex items-center gap-1.5 shadow-2xs">
              <GraduationCap className="w-4 h-4 text-[#FCA228]" />
              <span>Pengabdian Masyarakat &bull; UISB</span>
            </span>
            <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Struktur Organisasi Tim KKN ({teamData.members.length} Mahasiswa +
              1 Dosen DPL)
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
              Bagan hierarki pengabdian dan direktori 21 mahasiswa KKN{" "}
              {teamData.university} (UISB) di Kelurahan Balai Gadang dengan
              pembagian 5 divisi pelaksana dan pimpinan inti BPH.
            </p>
          </div>

          {/* Tab Switcher */}
          <div
            id="kkn-tabs"
            className="flex items-center bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs self-start md:self-auto"
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

        {/* Highlight DPL & Program Information Card with Official Dual Logos */}
        <div className="mb-8 bg-gradient-to-br from-slate-950 via-[#633B83]/95 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-[#8F66AC]/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-[#FCA228]/15 rounded-full blur-2xl pointer-events-none"></div>

          {/* Top Logo Bar inside card */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Logo UISB */}
              <div className="bg-white/95 rounded-xl p-2 sm:p-2.5 shadow-md flex items-center justify-center">
                <img
                  src="/images/uisb.svg"
                  alt="Universitas Islam Sumatera Barat"
                  className="h-7 sm:h-8 w-auto object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/uisb.png";
                  }}
                />
              </div>

              <span className="text-slate-400 font-bold text-lg">&amp;</span>

              {/* Logo KKN Balai Gadang */}
              <div className="bg-white/95 rounded-xl p-1.5 sm:p-2 shadow-md flex items-center gap-2">
                <img
                  src="/images/kkn.svg"
                  alt="KKN Kelurahan Balai Gadang 2026"
                  className="h-8 sm:h-9 w-8 sm:w-9 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/logo.png";
                  }}
                />
                <div className="hidden sm:block text-slate-900 pr-2">
                  <div className="text-[11px] font-extrabold text-[#633B83] leading-none">
                    KKN BALAI GADANG
                  </div>
                  <div className="text-[9px] font-bold text-slate-500">
                    TAHUN 2026
                  </div>
                </div>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCA228]/20 text-[#FCCB5D] border border-[#FCA228]/40 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#FCA228]" />
              <span>{teamData.groupName}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3">
              <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                {teamData.theme}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {teamData.summary}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-300">
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

            {/* DPL Card */}
            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-4 sm:p-5">
              <div className="text-[11px] font-semibold text-[#FCCB5D] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5 text-[#FCA228]" />
                <span>Dosen Pembimbing Lapangan (DPL)</span>
              </div>
              <h4 className="text-base font-bold text-white">
                {teamData.dplName}
              </h4>
              {teamData.dplNip && (
                <p className="text-xs text-slate-300 font-mono mt-0.5">
                  NIP: {teamData.dplNip}
                </p>
              )}
              <div className="mt-3 pt-2.5 border-t border-white/10 text-xs text-slate-300">
                <span className="font-medium text-white">
                  {teamData.faculty}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Civic Academic Highlight: Inisiatif Digitalisasi & Sistem Informasi Nagari */}
        <div className="mb-10 bg-white rounded-2xl p-6 sm:p-8 border border-[#8F66AC]/30 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#7E549E]/5 rounded-bl-full pointer-events-none -z-0"></div>

          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-5 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#633B83] to-[#7E549E] text-white flex items-center justify-center shadow-xs">
                  <FileText className="w-5 h-5 text-[#FCCB5D]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#633B83] uppercase tracking-wider bg-[#7E549E]/10 px-2.5 py-0.5 rounded-md border border-[#8F66AC]/30">
                      Inovasi Digital Kelurahan Balai Gadang
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      Program Studi Sistem Informasi UISB
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                    Penanggung Jawab Proker &amp; Pemetaan Digital Wilayah
                  </h3>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold self-start sm:self-auto shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FCA228]" />
                <span>Pengabdian Berbasis Teknologi Informasi</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Profile Bio */}
              <div className="lg:col-span-5 flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <img
                  src="/images/mahasiswa/2359201015_Abbel.png"
                  alt={devInfo.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white shadow-sm ring-2 ring-[#7E549E]/40 flex-shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[#633B83]">
                    {devInfo.role}
                  </div>
                  <h4 className="text-base font-bold text-slate-900 truncate">
                    {devInfo.name}
                  </h4>
                  <p className="text-xs text-slate-500 font-mono">
                    NIM. {devInfo.nim}
                  </p>
                  <p className="text-xs text-slate-700 font-medium mt-1">
                    {devInfo.major} &bull; {devInfo.faculty}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {devInfo.university}
                  </p>
                </div>
              </div>

              {/* Responsibilities & Civic Focus */}
              <div className="lg:col-span-7 space-y-3">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  &ldquo;Perancangan sistem informasi dan pemetaan geospasial
                  Kelurahan Balai Gadang ini diinisiasi untuk menghadirkan
                  keterbukaan informasi publik yang transparan, memudahkan
                  pemetaan sarana wilayah kelurahan Balai Gadang, serta
                  memperluas promosi potensi lokal dan UMKM warga.&rdquo;
                </p>

                {/* Focus Badges */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {focusPills.map((pill, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-[#7E549E]/10 text-[#633B83] border border-[#8F66AC]/30 text-[11px] font-semibold flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3 text-[#FCA228] flex-shrink-0" />
                      <span>{pill}</span>
                    </span>
                  ))}
                </div>

                {/* Scope items */}
                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                  {devInfo.responsibilities.map((resp, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FCA228] mt-1.5 flex-shrink-0"></span>
                      <span className="line-clamp-2">{resp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* VIEW 1: ORGANIZATIONAL CHART (BAGAN STRUKTUR) */}
        {activeTab === "bagan" && (
          <div className="space-y-10">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm">
              <div className="text-center max-w-2xl mx-auto mb-8">
                <span className="text-xs font-bold uppercase tracking-wider text-[#633B83] bg-[#7E549E]/15 px-3.5 py-1 rounded-full border border-[#8F66AC]/30">
                  Bagan Hierarki Pengabdian KKN
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                  Struktur Kepengurusan &amp; Pembagian 5 Divisi Kerja
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Klik pada divisi mana saja untuk langsung menyaring daftar
                  anggota terperinci.
                </p>
              </div>

              {/* LEVEL 1: DPL (Top Level) */}
              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-b from-slate-950 via-[#633B83] to-slate-900 text-white p-5 rounded-2xl shadow-md border-2 border-[#FCCB5D]/60 max-w-sm w-full text-center relative group">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FCA228] to-[#FCB739] text-slate-950 flex items-center justify-center mx-auto -mt-9 shadow-sm border-2 border-white">
                    <Crown className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#FCCB5D] block mt-1">
                    Dosen Pembimbing Lapangan (DPL)
                  </span>
                  <h4 className="text-base font-extrabold text-white mt-0.5">
                    {teamData.dplName}
                  </h4>
                  <p className="text-xs text-slate-300 font-mono mt-0.5">
                    NIP. {teamData.dplNip}
                  </p>
                  <div className="text-[11px] text-slate-300 mt-2 pt-2 border-t border-slate-700">
                    {teamData.faculty} &bull; {teamData.university}
                  </div>
                </div>

                {/* Connecting Stem */}
                <div className="w-0.5 h-8 bg-slate-300 my-1"></div>
                <ArrowDown className="w-4 h-4 text-slate-400 -mt-2 mb-1" />
              </div>

              {/* LEVEL 2: BADAN PENGURUS HARIAN (BPH / Pimpinan Inti: 5 Orang) */}
              <div className="mt-2">
                <div className="text-center mb-4">
                  <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3.5 py-1 rounded-full border border-slate-200">
                    Badan Pengurus Harian (BPH) &bull; 5 Pimpinan Inti
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {bphMembers.map((member) => {
                    const isKetua =
                      member.role.toLowerCase().includes("ketua") &&
                      !member.role.toLowerCase().includes("wakil");
                    return (
                      <div
                        key={member.id}
                        className={`rounded-2xl p-4 transition-all border flex flex-col justify-between ${
                          isKetua
                            ? "bg-gradient-to-br from-[#7E549E]/15 to-[#FCA228]/10 border-[#8F66AC] shadow-xs ring-1 ring-[#7E549E]/50"
                            : "bg-slate-50 border-slate-200 hover:border-[#8F66AC]/40"
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-3 mb-2.5">
                            <img
                              src={member.photo}
                              alt={member.name}
                              className="w-12 h-12 rounded-xl object-cover border border-white shadow-xs"
                            />
                            <div className="min-w-0">
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-md inline-block uppercase tracking-wider ${
                                  isKetua
                                    ? "bg-gradient-to-r from-[#633B83] to-[#7E549E] text-white"
                                    : "bg-slate-200 text-slate-800"
                                }`}
                              >
                                {member.role}
                              </span>
                              <h5 className="text-xs font-bold text-slate-900 mt-1 truncate">
                                {member.name}
                              </h5>
                            </div>
                          </div>
                          <p className="text-[11px] text-slate-600 font-medium">
                            {member.major}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {member.faculty}
                          </p>
                        </div>

                        <div className="mt-3 pt-2 border-t border-slate-200/70 text-[10px] text-slate-500 font-mono">
                          NIM. {member.nim}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Connecting Stem to 5 Divisions */}
                <div className="flex flex-col items-center my-6">
                  <div className="w-0.5 h-8 bg-slate-300"></div>
                  <ArrowDown className="w-4 h-4 text-slate-400 -mt-2" />
                </div>
              </div>

              {/* LEVEL 3: 5 DIVISI KERJA */}
              <div>
                <div className="text-center mb-6">
                  <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3.5 py-1 rounded-full border border-slate-200">
                    5 Divisi Pelaksana Program Kerja (16 Mahasiswa)
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                  {divisionGroups.map((div, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSelectDivisionFromChart(div.name)}
                      className={`rounded-2xl border p-4 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md ${div.color} flex flex-col justify-between group`}
                    >
                      <div>
                        {/* Division Header */}
                        <div className="flex items-center justify-between gap-2 pb-2.5 mb-3 border-b border-slate-200/60">
                          <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-[#633B83] transition-colors">
                            {div.name}
                          </h4>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${div.badgeColor}`}
                          >
                            {div.total} Orang
                          </span>
                        </div>

                        {/* Koordinator */}
                        {div.koordinator && (
                          <div className="p-2.5 bg-white/90 rounded-xl border border-slate-200/80 mb-3 shadow-2xs">
                            <div className="text-[10px] font-bold uppercase tracking-wider text-[#633B83] mb-1 flex items-center gap-1">
                              <Award className="w-3 h-3 text-[#FCA228]" />
                              <span>Koordinator</span>
                            </div>
                            <div className="text-xs font-bold text-slate-900 truncate">
                              {div.koordinator.name}
                            </div>
                            <div className="text-[10px] text-slate-500 truncate">
                              {div.koordinator.major}
                            </div>
                          </div>
                        )}

                        {/* Anggota List */}
                        <div className="space-y-1.5">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                            Anggota ({div.anggota.length})
                          </div>
                          {div.anggota.map((ang) => (
                            <div
                              key={ang.id}
                              className="p-2 bg-white/70 rounded-lg text-xs border border-slate-100 flex items-start gap-1.5"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#FCA228] mt-1.5 flex-shrink-0"></span>
                              <div className="min-w-0">
                                <p className="font-semibold text-slate-800 text-[11px] truncate leading-tight">
                                  {ang.name}
                                </p>
                                <p className="text-[10px] text-slate-500 truncate">
                                  {ang.major}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 pt-2.5 border-t border-slate-200/60 text-[10px] font-bold text-[#633B83] flex items-center justify-between">
                        <span>Lihat Profil Detail</span>
                        <ChevronRight className="w-3.5 h-3.5 text-[#FCA228] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: DIRECTORY VIEW (SEMUA ANGGOTA TANPA PAGINATION) */}
        {activeTab === "daftar" && (
          <div id="kkn-list-container">
            {/* Filter and Division Selector Bar */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 mb-6 shadow-xs space-y-3.5">
              {/* Search Bar & Stats */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-xl">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Cari nama mahasiswa, NIM, prodi, atau divisi..."
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7E549E] focus:bg-white transition-colors shadow-2xs"
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
                      onClick={handleReset}
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
                  <button
                    onClick={() => setSelectedDivision("all")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedDivision === "all"
                        ? "bg-gradient-to-r from-[#633B83] to-[#7E549E] text-white shadow-xs"
                        : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    <span>Semua Divisi</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${selectedDivision === "all" ? "bg-[#FCA228] text-slate-950 font-bold" : "bg-slate-200 text-slate-700"}`}
                    >
                      {teamData.members.length}
                    </span>
                  </button>

                  {divisionOptions
                    .filter((div) => div !== "all")
                    .map((div) => {
                      const count = teamData.members.filter(
                        (m) => m.division === div,
                      ).length;
                      const isActive = selectedDivision === div;
                      return (
                        <button
                          key={div}
                          onClick={() => setSelectedDivision(div)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                            isActive
                              ? "bg-gradient-to-r from-[#633B83] to-[#7E549E] text-white shadow-xs"
                              : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
                          }`}
                        >
                          <span>{div}</span>
                          <span
                            className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? "bg-[#FCA228] text-slate-950 font-bold" : "bg-slate-200 text-slate-700"}`}
                          >
                            {count}
                          </span>
                        </button>
                      );
                    })}
                </div>
              </div>
            </div>

            {/* Members Cards Grid - Tampilkan Seluruhnya Tanpa Pagination */}
            {totalItems > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4.5">
                {filteredMembers.map((member) => {
                  const badgeStyle = getRoleBadgeStyle(member.role);
                  const isLead =
                    member.role.toLowerCase().includes("ketua") ||
                    member.role.toLowerCase().includes("koordinator");

                  return (
                    <div
                      key={member.id}
                      className={`bg-white border rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group ${
                        isLead
                          ? "border-[#8F66AC]/60 hover:border-[#FCA228]"
                          : "border-slate-200/90 hover:border-[#8F66AC]/50"
                      }`}
                    >
                      <div>
                        {/* Top Header Card with Avatar, Role & ID */}
                        <div className="p-4 bg-gradient-to-b from-slate-50/90 to-white border-b border-slate-100">
                          <div className="flex items-start justify-between gap-2 mb-2.5">
                            <span
                              className={`inline-block px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold border ${badgeStyle} truncate max-w-[190px]`}
                            >
                              {member.role}
                            </span>
                            <span className="px-1.5 py-0.5 rounded-md bg-slate-900 text-white text-[10px] font-mono font-bold flex-shrink-0">
                              {member.id}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="relative flex-shrink-0">
                              <img
                                src={member.photo}
                                alt={member.name}
                                className="w-13 h-13 rounded-xl object-cover border border-white shadow-xs ring-1 ring-slate-200"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                      member.name,
                                    )}&background=7E549E&color=fff&size=128`;
                                }}
                              />
                            </div>

                            <div className="min-w-0 flex-1">
                              <h3
                                className="text-sm font-bold text-slate-900 group-hover:text-[#633B83] transition-colors leading-snug truncate"
                                title={member.name}
                              >
                                {member.name}
                              </h3>
                              <p className="text-[11px] text-slate-500 font-mono">
                                NIM. {member.nim}
                              </p>
                              <p className="text-[11px] text-slate-700 font-medium truncate mt-0.5">
                                {member.major}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Details & Quote */}
                        <div className="p-4 space-y-3">
                          <div className="flex items-center justify-between gap-2">
                            <span className="inline-block px-2 py-0.5 rounded-md bg-[#7E549E]/10 text-[#633B83] text-[10px] font-semibold truncate">
                              {member.division}
                            </span>
                            <span className="text-[10px] text-slate-500 truncate">
                              {member.faculty}
                            </span>
                          </div>

                          {member.quote && (
                            <div className="p-2.5 bg-[#7E549E]/5 rounded-xl border border-[#8F66AC]/20 text-[11px] text-slate-700 italic flex items-start gap-1.5">
                              <Quote className="w-3 h-3 text-[#FCA228] flex-shrink-0 mt-0.5" />
                              <span className="line-clamp-2">
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
                              {member.programs.slice(0, 2).map((prog, idx) => (
                                <li
                                  key={idx}
                                  className="text-[11px] text-slate-600 leading-snug flex items-start gap-1.5"
                                >
                                  <span className="w-1 h-1 rounded-full bg-[#FCA228] mt-1.5 flex-shrink-0"></span>
                                  <span className="line-clamp-2">{prog}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Footer Contact Info */}
                      {(member.email || member.phone) && (
                        <div className="px-4 py-2.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2 text-[10px] text-slate-500">
                          {member.email && (
                            <div
                              className="flex items-center gap-1 truncate"
                              title={member.email}
                            >
                              <Mail className="w-3 h-3 text-slate-400 flex-shrink-0" />
                              <span className="truncate">
                                {member.email.split("@")[0]}
                              </span>
                            </div>
                          )}
                          {member.phone && (
                            <div className="flex items-center gap-1 flex-shrink-0">
                              <Phone className="w-3 h-3 text-slate-400" />
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

            {/* Empty State */}
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
                  onClick={handleReset}
                  className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Tampilkan Semua Anggota
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
