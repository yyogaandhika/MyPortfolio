# Domain Model Glossary — Portfolio Admin & Content Ecosystem

Kamus kanonik istilah untuk arsitektur pengelolaan konten portofolio dinamis Mhd. Yoga Andhika.

## Language & Core Concepts

### Konten & Entitas
**Project Record**:
Data digital sebuah karya portofolio (judul, slug, kategori, deskripsi peran, tahun, tautan demo, repositori, tech stack, metrik impian, dan kredensial testing).
_Avoid_: Portfolio post, kartu proyek, portofolio item

**Case Study**:
Artikel analisis teknis mendalam sebuah proyek yang mendokumentasikan konteks institusional/klien, keputusan rekayasa, arsitektur sistem, dan dampak terukur.
_Avoid_: Detail page, artikel blog

**Hybrid Case Study**:
Pola arsitektur di mana proyek flagship tetap mempertahankan halaman komponen TSX khusus dengan widget kustom tingkat tinggi, sedangkan proyek baru dari admin dirender secara dinamis melalui templat editorial terstruktur.
_Avoid_: Static only, dynamic only

**Profile Configuration**:
Pengaturan identitas global portofolio mencakup bio hero, lokasi, status ketersediaan kerja (*availability*), tautan dokumen CV PDF, dan daftar kontak.
_Avoid_: Profil user, settings akun

**Media Asset**:
File biner gambar mockup (PNG/JPG/WebP) atau dokumen portofolio (PDF CV) yang disimpan di object storage bucket publik dengan URL CDN permanen.
_Avoid_: Uploadan, lampiran, berkas

### Infrastruktur & Keamanan
**Single-Owner Auth**:
Skema keamanan autentikasi yang hanya mengizinkan satu akun pemilik portofolio yang terdaftar di Supabase Auth untuk mengakses `/admin`.
_Avoid_: Multi-user, role yayasan

**Admin Workspace (`/admin`)**:
Antarmuka privat berotentikasi untuk melakukan operasi Create, Read, Update, Delete (CRUD) data portofolio tanpa mengubah source code.
_Avoid_: Backend, CMS publik

**On-Demand Revalidation**:
Mekanisme Next.js untuk memperbarui *cache* server secara instan menggunakan `revalidatePath()` saat data diubah di admin, menjaga kecepatan static site delivery bagi publik.
_Avoid_: Rebuild Vercel, refetch client-side

**Local Fallback Baseline**:
Kemampuan sistem untuk tetap membaca data cadangan dari file `data/*.ts` jika koneksi database cloud sedang offline atau belum diinisialisasi, menjamin uptime 100%.
_Avoid_: Dummy data, mock

**Seed Migration Pipeline**:
Skrip terautomasi (`npm run db:seed`) untuk mentransfer seluruh rekaman data lokal (`data/*.ts`) ke tabel Supabase PostgreSQL secara instan.
_Avoid_: Manual input, copy-paste DB
