# PRD: SORA Arts & Culture

**Versi:** 1.2 (revisi besar dari v1.1) | **Tanggal:** 19 Oktober 2026
**Konteks:** Lomba vibecoding tingkat kampus (web/aplikasi)
**Tema lomba:** _Empowering Culture Through AI-Driven Innovation_
**SORA** = South Sumatra
**Dibangun di:** Antigravity

## Perubahan dari v1.1

| # | Perubahan |
|---|-----------|
| 1 | Menu final: Beranda, Jelajahi, Favorit, Tentang. Navbar mengikuti halaman Beranda. |
| 2 | Pencarian dipindah ke halaman **Jelajahi** (v1.1 menaruhnya di hero homepage). Hero Beranda tetap punya search bar yang mengarah ke Jelajahi. |
| 3 | Homepage didefinisikan persis seperti layout yang sudah dibuat (8 section). **Layout tidak diubah**, hanya isinya diganti konten Sumsel. |
| 4 | Ditambah **halaman Tema** (daftar isi per tema) dan **halaman Tentang**. |
| 5 | 8 tema ditetapkan (lihat bagian 8). Tari dan Musik digabung, ditambah tema Sejarah & Peninggalan. |
| 6 | Tur Digital bukan menu, melainkan template halaman dedicated card. |
| 7 | **Tidak ada elemen layout yang dibuang.** Elemen yang tidak ada di PRD lama tetap tampil, dengan fungsi disesuaikan (lihat F1). |
| 8 | Tema bisa di-love (`item_type` ditambah `theme`). |
| 9 | Warna aksen Beranda dipertahankan sesuai desain yang sudah dibuat (bagian 17). |

---

## 1. Ringkasan Produk

SORA Arts & Culture adalah web budaya Sumatera Selatan dengan Google Arts & Culture sebagai acuan. User menjelajahi budaya lewat dua cara: menggulir Beranda yang kaya visual, atau mencari lewat halaman Jelajahi yang menghasilkan rangkuman AI, audio, dan kartu gambar. Konten unggulan adalah _dedicated card_: halaman narasi imersif (gambar penuh layar dipadu teks bertempo estetik) yang berfungsi sebagai tur digital.

## 2. Masalah dan Tujuan

**Masalah:** Konten seni dan budaya Sumsel sulit diserap. Web budaya umumnya berisi teks panjang yang monoton, terutama bagi orang visual yang mudah kehilangan fokus.

**Tujuan:**
1. Membuat penyerapan konten budaya menarik dan tidak monoton.
2. Membuat user terus menelusuri konten terkait atau kembali di hari lain.
3. Memenuhi tema lomba dan seluruh aspek budaya dalam guidebook.

## 3. Target User

Semua kalangan usia, untuk belajar atau memuaskan rasa penasaran.
- **User yang tahu tujuannya:** langsung ke Jelajahi dan mencari.
- **User yang iseng:** menggulir Beranda dan mengklik kartu yang menarik.

## 4. Ruang Lingkup MVP

**Masuk MVP:**
- Navbar dan footer konsisten di semua halaman
- Beranda (F1)
- Jelajahi: pencarian, rangkuman AI, audio, kartu terkait (F2, F3)
- 6 dedicated card (F4) dengan template Tur Digital
- 8 halaman Tema (F10)
- Detail konten dan explore related content (F5)
- Tab pencarian (F6)
- Login, love, Favorit (F7, F8)
- Halaman "no result" (F9)
- Halaman Tentang (F11)

**Di luar MVP:**
- User membuat atau mengunggah konten
- Museum digital dengan streetview
- Skor/papan peringkat untuk kuis Tebak Budaya
- Multi-bahasa penuh (tombol bahasa hanya tampil, isi tetap Indonesia)

## 5. Navigasi dan Peta Halaman

**Navbar (mengikuti Beranda):** logo SORA.Culture di kiri; menu tengah **Beranda, Jelajahi, Favorit, Tentang**; kanan tombol bahasa, **Sign in**, dan **Create now** (tampil sesuai layout; fungsinya mengarah ke `/jelajahi` karena user tidak membuat konten). Setelah login, Sign in berganti avatar user. Navbar transparan saat di puncak halaman dan gelap berblur saat digulir.

**Footer (mengikuti Jelajahi):** logo SORA.Culture, "© Muhammad Firly Marezky & M. Rifqi Aunur Rahman", "2026". Dipakai di semua halaman. Konfirmasi ejaan "Rifqi" vs "Rifqy" sebelum final.

| Rute | Halaman |
|------|---------|
| `/` | Beranda |
| `/jelajahi` | Jelajahi (pencarian) |
| `/jelajahi?q=...` | Hasil pencarian (template 3 kartu) |
| `/tema/[slug]` | Halaman Tema |
| `/tur/[slug]` | Tur Digital (dedicated card) |
| `/favorit` | Favorit |
| `/tentang` | Tentang |
| `/masuk` | Login/daftar |

## 6. Alur User

**Jalur scroll:** Beranda, klik card tema atau kartu cerita, masuk halaman Tema atau Tur Digital, pakai _explore related content_, love konten (perlu login), tersimpan di Favorit.

**Jalur cari:** search bar hero atau menu Jelajahi, halaman hasil (gambar/dedicated card, rangkuman AI, konten terkait), buka pencarian baru di tab lain, love konten, tersimpan di Favorit.

## 7. Kebutuhan Fitur

Setiap fitur punya "Selesai jika".

### F1. Beranda (layout tetap, isi diganti)

Urutan dan struktur section **tidak boleh diubah**. Yang diganti hanya teks, gambar, dan tautan.

| # | Section (layout asli) | Isi untuk SORA | Catatan fungsi |
|---|-----------------------|----------------|----------------|
| 1 | **Hero Ampera**: gambar penuh, navbar transparan, search bar di bawah, petunjuk gulir, tombol mute | Gambar Jembatan Ampera tetap. Placeholder: "Tanya apa saja tentang budaya Sumsel..." | Kirim mengarah ke `/jelajahi?q=`. Mic = pencarian suara (Web Speech API). Tombol upload gambar tetap tampil tetapi nonaktif dengan tooltip "Segera hadir". Tombol mute tampil, aktif bila nanti ada audio/video. |
| 2 | **Template showcase**: judul "Start with a Template", marquee 8 card 9:16 bergerak ke kanan | Judul: "Mulai dari satu tema. Jelajahi seluruh budaya Sumsel." 8 card = 8 tema (bagian 8) | Klik card membuka `/tema/[slug]`. Set duplikat harus 8 card agar loop mulus. |
| 3 | **Galeri 4 kartu** (kiri tinggi, tengah 2 bertumpuk, kanan besar), judul "Apa waktu favoritmu dalam sehari?" | "Apa waktu favoritmu di Palembang?": pagi, senja, malam, fajar (lihat `dayGallery`) | Klik membuka pencarian atau Tur Digital terkait. |
| 4 | **Banner layar penuh** Pakaian Adat Palembang | Tetap, tombol "Masuklah ke dalam" | Membuka Tur Digital Songket. |
| 5 | **Galeri 5 kartu** (2+2+1), judul "Surealisme" | Judul: "Kemilau Kain Palembang". Badge: Tema, Cerita, Penjelajah warna, Karya seni | Klik membuka Tema/pencarian. |
| 6 | **Teruslah menjelajah**: 4 kartu tinggi, tombol panah bulat di kanan judul | Subjudul: "Selami budaya dari seluruh Sumatera Selatan". 4 dedicated card | Panah bulat membuka `/jelajahi`. |
| 7 | **Tebak karya seni**: mosaik edge-to-edge, kartu terakota tengah, modal jawaban | "Tebak Budaya": tebak objek budaya dari potongan foto | Klik kartu terakota memunculkan modal jawaban. |
| 8 | **Footer** | Hak cipta sesuai bagian 5 | Branding Dreamina diganti SORA.Culture. |

Animasi masuk/keluar dari kiri-kanan saat scroll, parallax hero, dan navbar yang berubah saat digulir dipertahankan, dengan dukungan `prefers-reduced-motion`.

- **Selesai jika:** delapan section tampil sesuai urutan dan struktur layout asli dengan konten Sumsel, marquee berputar tanpa lompatan, semua kartu bisa diklik, modal Tebak Budaya berfungsi.

### F2. Jelajahi dan Hasil Pencarian

- `/jelajahi` tanpa query menampilkan search bar besar, contoh pencarian ("Songket Lepus", "Pempek", "Rumah Limas"), dan 8 tema sebagai pintasan.
- Hasil pencarian memakai template **3 kartu** (desain halaman "Rangkuman SORA"):
  1. **Kartu 1:** dedicated card yang cocok, atau gambar relevan.
  2. **Kartu 2:** rangkuman AI + tombol "Dengarkan SORA" + "Tampilkan lebih banyak" + kartu sumber.
  3. **Kartu 3:** konten terkait (campuran dedicated card dan gambar). Tombol _explore more content like this_ ber-backlight AI.
- Footer hak cipta sesuai bagian 5.
- **Selesai jika:** pencarian valid menampilkan tiga kartu; di luar scope menampilkan F9.

### F3. Rangkuman AI dan Audio
- Rangkuman dari Gemini, tunduk pada bagian 9. Audio dari Gemini TTS **hanya dibuat saat tombol putar ditekan**, dengan pesan "audio belum tersedia" jika gagal.
- **Selesai jika:** rangkuman tampil dan audio bisa diputar.

### F4. Dedicated Card (Tur Digital)
- 6 dedicated card (bagian 8). Template: cover penuh, 3 section narasi layar penuh dengan teks di kiri bawah, tombol Favorit/Salin Tautan/Bagikan, kontrol panah atas-bawah melayang, dan "Jelajahi kategori terkait" di akhir. Mendukung navigasi keyboard (panah, PageUp/Down, spasi).
- Disimpan sebagai array object di kode.
- **Selesai jika:** 6 card tampil dengan narasi dan gambar, bisa dibuka dari Beranda dan hasil pencarian.

### F5. Detail Konten dan Explore Related Content
- Gambar dan card menampilkan judul, kreator/sumber, lisensi. Tombol _explore related_ menampilkan konten serupa.

### F6. Tab Pencarian
- Banyak pencarian dalam satu sesi, bisa tambah, pindah, tutup. Disimpan di `sessionStorage` (hilang saat tab browser ditutup, bertahan saat muat ulang).

### F7. Login
- Better Auth. Login hanya diwajib saat love. Tombol Sign in di navbar tersedia kapan saja.

### F8. Love dan Favorit
- User login bisa me-love **tema, dedicated card, dan gambar**. Halaman Favorit memuat tab "Stories" (card/tema) dan "Gambar". Love bisa dibatalkan. Notifikasi toast muncul saat love/batal.

### F9. Halaman "No Result"
- Template "Sorry, we have no result" untuk pencarian di luar scope. Selalu tampil, bukan jawaban AI.

### F10. Halaman Tema (baru)
- `/tema/[slug]`: hero tema (gambar penuh + judul + deskripsi + tombol love), lalu **daftar item** tema (misalnya tema Rumah Adat: Limas, Rakit, Ulu, dst.) sebagai grid kartu dengan nama dan deskripsi satu kalimat, lalu "Jelajahi tema lain".
- Klik item membuka pencarian `/jelajahi?q=<nama item>` sehingga rangkuman AI dan gambar tersaji, atau dedicated card bila item cocok.
- **Selesai jika:** 8 halaman tema tampil dengan semua item dari data konten.

### F11. Halaman Tentang (baru)
- Isi: tujuan SORA, kaitan dengan tema lomba, tim, sumber konten dan lisensi gambar, catatan bahwa rangkuman AI bisa keliru dan sumber perlu dicek.

## 8. Konten MVP

### 8 Tema (card bergerak)

| # | Slug | Tema | Aspek guidebook |
|---|------|------|-----------------|
| 1 | `rumah-adat` | Rumah Adat | Arsitektur, pariwisata budaya |
| 2 | `kain-pakaian` | Pakaian Adat & Kain Tenun | Pakaian adat, kerajinan |
| 3 | `bahasa-aksara` | Bahasa & Aksara Daerah | Bahasa daerah |
| 4 | `tari-musik` | Tari & Musik Tradisional | Seni pertunjukan, musik tradisional |
| 5 | `kuliner` | Kuliner Khas | Kuliner khas |
| 6 | `pertunjukan-lisan` | Seni Pertunjukan & Tradisi Lisan | Seni pertunjukan, cerita rakyat |
| 7 | `upacara-adat` | Upacara Adat & Tradisi Sosial | Festival budaya, pariwisata budaya |
| 8 | `sejarah` | Sejarah & Peninggalan | Sejarah, museum digital (tanpa streetview) |

Tema 8 menutup celah v1.1 (sejarah dan museum). Daftar item per tema dan teks siap pakai ada di file `sora-content.ts`.

### 6 Dedicated card

| # | Topik | Tema induk |
|---|-------|-----------|
| 1 | Songket Palembang | Pakaian & Kain |
| 2 | Rumah Limas | Rumah Adat |
| 3 | Kerajaan Sriwijaya | Sejarah |
| 4 | Pempek dan kuliner Palembang | Kuliner |
| 5 | Tari Gending Sriwijaya | Tari & Musik |
| 6 | Festival Perahu Bidar | Upacara Adat |

Struktur data card: ID, judul, kategori, ringkasan, segmen narasi (teks, gambar, keterangan), kata kunci pencocokan, kreator/sumber, tautan sumber, lisensi gambar.

## 9. Aturan Perilaku AI

| Situasi | Perilaku |
|---------|----------|
| Kata kunci ada di konten SORA (tema, item, dedicated card) | AI menjawab kompeten; konten terkait tampil di kartu 3. |
| Kata kunci cocok dengan dedicated card | Kartu 1 diganti dedicated card. |
| Seni/budaya Indonesia di luar konten SORA | AI menjawab singkat, dengan catatan fokus SORA adalah Sumsel, dan mengarahkan ke tema terdekat. (Keputusan sementara, menjawab pertanyaan terbuka v1.1 no. 1.) |
| Di luar seni/budaya | Halaman "no result". |

## 10. Sumber Gambar

- Prioritas 1: dedicated card yang cocok.
- Prioritas 2: Wikimedia Commons, cadangan Unsplash. Cantumkan pembuat dan lisensi.
- Gambar hasil AI (seperti yang dipakai di desain) boleh untuk prototipe, tetapi **wajib diberi label "ilustrasi AI"** dan diganti foto asli bila tersedia, karena web ini berfungsi sebagai arsip budaya.

## 11. Kesesuaian Tema dan Guidebook

Sama dengan v1.1: Empowering 4/4 (pelestarian, pengembangan tidak langsung, promosi, solusi bermanfaat), fitur AI penentu 2/2 (rangkuman+audio, dedicated content imersif), dan definisi budaya 11/11 (kini seluruhnya punya tema: bahasa, seni pertunjukan, musik, pakaian adat, kuliner, cerita rakyat lewat tradisi lisan, sejarah, museum digital, pariwisata, kerajinan, festival).

## 12. Ukuran Keberhasilan

1. Semua fitur F1-F11 berjalan.
2. Klik konten membuka konten; pencarian menghasilkan rangkuman AI dan detail.
3. Dedicated card dieksekusi semaksimal mungkin.
4. Love berfungsi untuk user login.

## 13. Tech Stack

| Lapisan | Teknologi | Fungsi di SORA |
|---------|-----------|----------------|
| Framework | **Next.js** (App Router, TypeScript) | Satu aplikasi untuk halaman dan API route (`/api/search`, `/api/tts`). |
| Styling | **Tailwind CSS** | Mengikuti layout HTML yang sudah dibuat (token warna burgundy, emas, obsidian, aksen cyan di Beranda). |
| Animasi | **Motion** (opsional) + IntersectionObserver/CSS | Animasi masuk kiri-kanan, marquee, parallax. Hormati `prefers-reduced-motion`. |
| Autentikasi | **Better Auth** | Login/sesi. Login hanya diwajib saat menekan love. |
| Database | **Supabase Postgres** | Menyimpan user, sesi, dan favorit. Row Level Security aktif. |
| ORM | **Drizzle** | Skema dan query tabel `user`, `session`, `favorite`. |
| AI rangkuman | **Gemini API** | Rangkuman hasil pencarian budaya, dipanggil dari server saja. |
| AI suara | **Gemini TTS** (status Preview; nama model dicek saat membangun) | Audio hanya dibuat saat tombol putar ditekan. |
| Gambar | **Wikimedia Commons**, cadangan **Unsplash** | Foto dengan pembuat dan lisensi dicantumkan. |
| Pencarian suara | **Web Speech API** (browser) | Tombol mic di search bar. |
| Hosting | **Vercel** | Deploy demo. |
| Font dan ikon | Noto Serif (judul), Plus Jakarta Sans (isi), Material Symbols | Sesuai layout. |

Catatan: konten 8 tema dan 6 dedicated card disimpan sebagai array object di kode (`sora-content.ts`), bukan di database.

## 14. Arsitektur dan Diagram Urutan

- Satu aplikasi Next.js. **Server adalah satu-satunya** yang memanggil Gemini, sumber gambar, dan database.
- Kunci API hanya ada di server (environment variable), tidak pernah dikirim ke browser.
- Rate limit pada `/api/search` dan `/api/tts`.
- Tombol audio aman saat gagal: tampil pesan "audio belum tersedia".
- Pencarian dipicu dari halaman `/jelajahi` dan dari search bar hero Beranda.

Alur pencarian: Browser (`/jelajahi?q=`) → `/api/search` (cek rate limit) → server memanggil Gemini untuk rangkuman dan Wikimedia/Unsplash untuk gambar → server mengembalikan 3 card hasil → browser menampilkan. Alur audio: tombol putar → `/api/tts` → Gemini TTS → audio diputar di browser.

## 15. Database

Tetap: akun/sesi di Postgres lewat Better Auth, 6 dedicated card dan 8 tema sebagai array object di kode. Perubahan pada tabel `favorite`:

```sql
CREATE TABLE favorite (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     text NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  item_type   text NOT NULL CHECK (item_type IN ('card', 'theme', 'image')),
  item_ref    text NOT NULL,
  title       text,
  image_url   text,
  creator     text,
  source_url  text,
  license     text,
  created_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, item_type, item_ref)
);
CREATE INDEX favorite_user_idx ON favorite (user_id, created_at DESC);
```

`theme`: `item_ref` berisi slug tema. `card`: ID dedicated card. `image`: ID gambar sumber (data salinan wajib). Aktifkan Row Level Security di Supabase tanpa aturan tambahan.

## 16. Risiko dan Pertanyaan Terbuka

**Risiko:** akurasi AI pada detail lokal; penentuan scope pencarian; TTS masih Preview; kuota API; ketergantungan layanan luar saat demo (siapkan tampilan cadangan); kualitas dan lisensi gambar; gambar AI bisa dinilai menyesatkan bila tidak diberi label.

**Pertanyaan terbuka:**
1. Ejaan nama tim ("Rifqi").
2. Apakah hero memakai video atau cukup gambar Ampera untuk demo.
3. Batas pemakaian Gemini, Wikimedia, Unsplash untuk demo.
4. Isi tombol bahasa: dibiarkan tampil saja atau dibuat dua bahasa.

## 17. Design Guidelines

- **Primer (kain):** Burgundy `#6B1D2F` (alternatif `#4A0E17`).
- **Aksen emas:** `#D4AF37` / `#C5A059` untuk highlight, tombol aktif, backlight kartu.
- **Latar:** Obsidian `#0D0D0F`–`#121212` dengan aurora/orb animasi merah-emas.
- **Keputusan v1.2:** aksen **cyan (`#00F2FE`) pada tombol dan ikon Beranda dipertahankan** sesuai desain yang sudah dibuat, karena menjadi penanda aksi AI (search bar, tombol kirim, "Masuklah ke dalam"). Halaman Jelajahi, Tur Digital, Favorit, dan Tema memakai burgundy-emas. Pastikan Antigravity tidak menyeragamkan keduanya tanpa persetujuan.
- **Light mode:** Alabaster `#F9F8F6` (opsional, di luar MVP).
- **Komponen konsisten:** pill nav bulat, kartu `rounded-2xl/3xl`, overlay gradasi gelap di bawah gambar, badge kategori kecil di atas judul.