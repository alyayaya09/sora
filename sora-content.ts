// Data konten SORA Arts & Culture — 8 tema untuk card bergerak + halaman Tema.
// Semua teks ditulis ringkas dan faktual berdasarkan daftar budaya Sumsel.
// FOTO: AI tidak menyediakan foto asli. Isi `image` dengan foto dari Wikimedia Commons / Unsplash
// (cari memakai `photoQuery`), cantumkan creator + license. Sebelum itu, `imagePrompt` bisa dipakai
// untuk membuat ilustrasi sementara dan WAJIB diberi label "ilustrasi AI".

export type ThemeItem = { name: string; desc: string };

export type Theme = {
  slug: string;
  title: string;
  cta: string; // teks kecil di bawah judul card marquee
  tagline: string;
  intro: string;
  guidebook: string[];
  photoQuery: string; // kata kunci pencarian foto
  imagePrompt: string; // prompt ilustrasi sementara
  image: { url: string; creator: string; license: string; source: string } | null;
  items: ThemeItem[];
};

export const themes: Theme[] = [
  {
    slug: "rumah-adat",
    title: "Rumah Adat",
    cta: "Lihat Arsitektur ↗",
    tagline: "Rumah panggung yang berbicara tentang sungai, status, dan alam.",
    intro:
      "Rumah tradisional Sumatera Selatan nyaris selalu berbentuk panggung, menyesuaikan diri dengan sungai, rawa, dan pegunungan. Bentuk, bahan, dan ukirannya menandai status sosial serta cara hidup pemiliknya.",
    guidebook: ["Arsitektur", "Pariwisata budaya"],
    photoQuery: "Rumah Limas Palembang; Rumah Rakit Sungai Musi",
    imagePrompt:
      "Rumah Limas Palembang tradisional berundak dari kayu di tepi Sungai Musi saat senja, fotografi dokumenter, hangat",
    image: null,
    items: [
      { name: "Rumah Limas", desc: "Rumah panggung beratap limas dengan lantai berundak (bengkilas) sebagai penanda status sosial." },
      { name: "Rumah Rakit", desc: "Rumah terapung dari kayu dan bambu yang diikat ke tebing sungai, menghadap Sungai Musi." },
      { name: "Rumah Ulu", desc: "Rumah panggung daerah hulu sungai dengan tiang melengkung atau sistem ulak-ulak yang tahan gempa." },
      { name: "Rumah Cara Gudang", desc: "Rumah panggung kayu memanjang beratap pelana sederhana tanpa undakan." },
      { name: "Ghumah Baghi (Rumah Adat Pasemah)", desc: "Rumah panggung suku Besemah dengan tiang diletakkan di atas batu tanpa ditanam; ada variasi Rumah Tatahan dan Rumah Kingking." },
      { name: "Rumah Kilapan", desc: "Rumah panggung Pasemah dengan dinding kayu yang dihaluskan dengan ketam tanpa ukiran." },
    ],
  },
  {
    slug: "kain-pakaian",
    title: "Pakaian Adat & Kain Tenun",
    cta: "Lihat Busana ↗",
    tagline: "Kemilau benang emas di atas sutra, dari istana hingga pelaminan.",
    intro:
      "Busana dan kain Palembang dikenal lewat warna merah, emas, dan teknik tenun yang rumit. Songket, jumputan, dan batik menyimpan makna kemakmuran, kehormatan, dan keselarasan dengan alam.",
    guidebook: ["Pakaian adat", "Kerajinan"],
    photoQuery: "Songket Palembang; Aesan Gede; kain jumputan Palembang",
    imagePrompt:
      "Close-up kain songket Palembang benang emas di atas sutra merah marun, pencahayaan studio hangat, detail tekstur",
    image: null,
    items: [
      { name: "Aesan Gede", desc: "Pakaian adat perkawinan yang melambangkan kebesaran dan keagungan Kerajaan Sriwijaya, didominasi merah, emas, dan perhiasan megah." },
      { name: "Aesan Paksangko", desc: "Pakaian adat perkawinan yang melambangkan keanggunan, dengan baju kurung ningrat berhias teratai penutup dada dan mahkota tinggi." },
      { name: "Kain Songket Palembang", desc: "Tenun berkilau benang emas dengan teknik lepus; ragamnya antara lain Songket Lepus, Tigo Negeri, Limar, Bungo Pacik, Janto Jantung, dan Beranti." },
      { name: "Kain Jumputan (Kain Pelangi)", desc: "Kain sutra warna-warni yang dibuat dengan teknik ikat celup tradisional." },
      { name: "Batik Palembang", desc: "Batik dengan motif dominan flora tanpa gambar makhluk hidup, seperti motif Lasem dan Bunga Teh." },
    ],
  },
  {
    slug: "bahasa-aksara",
    title: "Bahasa & Aksara Daerah",
    cta: "Lihat Bahasa ↗",
    tagline: "Satu provinsi, banyak sungai, banyak cara bertutur.",
    intro:
      "Bahasa daerah di Sumsel tumbuh mengikuti aliran sungai sehingga setiap wilayah punya intonasi dan kosakata khas. Aksara Ulu menjadi bukti tradisi tulis kuno masyarakat pedalaman.",
    guidebook: ["Bahasa daerah"],
    photoQuery: "Aksara Ulu Kaganga naskah bambu; Surat Ulu",
    imagePrompt:
      "Bilah bambu bertulis aksara Ulu (Kaganga) kuno di atas kain tenun, pencahayaan lembut, fotografi artefak",
    image: null,
    items: [
      { name: "Bahasa Melayu Palembang", desc: "Lingua franca dengan tingkatan Bahasa Alus (halus) dan Bahasa Sari-Sari (sehari-hari)." },
      { name: "Bahasa Komering", desc: "Dituturkan di OKU Timur, kaya variasi kosakata kekerabatan." },
      { name: "Bahasa Lematang", desc: "Digunakan di tepian Sungai Lematang (Lahat, Muara Enim) dengan intonasi khas hulu dan hilir." },
      { name: "Bahasa Ogan", desc: "Dituturkan di sepanjang aliran Sungai Ogan (Ogan Ilir, OKU)." },
      { name: "Bahasa Kayu Agung", desc: "Bahasa unik dengan perbedaan mencolok dari bahasa sekitarnya, dituturkan di wilayah OKI." },
      { name: "Bahasa Pedamaran", desc: "Bahasa khas masyarakat rawa gambut Pedamaran, OKI." },
      { name: "Bahasa Musi (Sekayu)", desc: "Dialek Musi Banyuasin yang identik dengan vokal berakhiran \"e\"." },
      { name: "Aksara Ulu (Surat Ulu / Kaganga)", desc: "Sistem tulis kuno jenis abugida yang dulu ditulis pada bilah bambu, tanduk hewan, atau kulit kayu." },
    ],
  },
  {
    slug: "tari-musik",
    title: "Tari & Musik Tradisional",
    cta: "Lihat Tari & Musik ↗",
    tagline: "Gerak penyambutan dan petikan gitar yang menutup bait petuah.",
    intro:
      "Tari di Sumsel banyak berfungsi sebagai penyambutan tamu, sementara musiknya mengiringi doa, syair, dan perayaan. Dari tari kolosal Gending Sriwijaya hingga gitar tunggal Batanghari Sembilan, keduanya saling melengkapi.",
    guidebook: ["Seni pertunjukan", "Musik tradisional"],
    photoQuery: "Tari Gending Sriwijaya; Tari Tanggai",
    imagePrompt:
      "Penari Tanggai Palembang berpakaian merah emas dengan kuku palsu keemasan, latar panggung hangat, fotografi pertunjukan",
    image: null,
    items: [
      { name: "Tari Gending Sriwijaya", desc: "Tari kolosal sakral pembawa sekapur sirih untuk menyambut tamu agung kenegaraan." },
      { name: "Tari Tanggai", desc: "Tari penyambutan tamu kehormatan; penarinya mengenakan tanggai (kuku palsu keemasan)." },
      { name: "Tari Erai-Erai", desc: "Tari etnik suku Lematang yang melambangkan kegembiraan saat panen padi raya." },
      { name: "Tari Kebagh", desc: "Tarian penyambutan kuno dari dataran tinggi Besemah (Pagaralam)." },
      { name: "Tari Setabik", desc: "Tari penyambutan khas Musi Banyuasin dengan prosesi menyuguhkan sirih dari dalam tepak." },
      { name: "Tari Begambo", desc: "Tarian kreasi Dusun Toman yang menceritakan kehidupan petani mengolah tanaman gambir." },
      { name: "Tari Tepak Keraton", desc: "Tari penyambutan ciptaan 1966 yang terinspirasi budaya Kesultanan Palembang Darussalam." },
      { name: "Tari Bujang Gadis Beladas", desc: "Tari pergaulan muda-mudi yang lincah dan enerjik dari Ogan Ilir." },
      { name: "Tari Gegerit & Tari Burung Putih", desc: "Tarian tradisional dari pedalaman dataran tinggi Sumsel." },
      { name: "Gitar Tunggal Batanghari Sembilan", desc: "Seni bermain gitar sendirian dengan petikan melankolis penutup bait syair petuah." },
      { name: "Burdah / Terbangan", desc: "Rebana besar dari kulit hewan dan kayu, sering mengiringi zikir atau lagu islami." },
      { name: "Kenong Basemah / Kelintang", desc: "Alat musik pukul perunggu yang disusun berjejer, mengiringi tarian pedalaman." },
      { name: "Lagu Daerah", desc: "Antara lain Dek Sangke, Cuk Mak Ilang, Kereba Mulang, Sayang Selayak, Ribang Kemambang, dan Gending Sriwijaya." },
    ],
  },
  {
    slug: "kuliner",
    title: "Kuliner Khas",
    cta: "Lihat Kuliner ↗",
    tagline: "Dari pempek hingga tempoyak: rasa yang lahir dari sungai.",
    intro:
      "Kuliner Sumsel berpusat pada ikan sungai, tepung sagu atau tapioka, dan bumbu pedas asam. Hidangannya hadir dari meja sehari-hari sampai jamuan pernikahan.",
    guidebook: ["Kuliner khas"],
    photoQuery: "Pempek Palembang; Pindang Patin; Kue Maksuba",
    imagePrompt:
      "Hidangan pempek kapal selam dengan cuko hitam di piring keramik, meja kayu, fotografi makanan natural",
    image: null,
    items: [
      { name: "Pempek", desc: "Olahan ikan dan sagu dengan ragam Kapal Selam, Lenjer, Adaan, dan Kulit, disantap dengan cuko." },
      { name: "Pindang Patin, Tulang Meranjat, Pegagan", desc: "Keluarga hidangan berkuah pindang asam-pedas khas sungai." },
      { name: "Mie Celor, Laksan, Celimpungan", desc: "Hidangan berkuah santan khas Palembang." },
      { name: "Burgo, Tekwan, Model, Lenggang", desc: "Hidangan olahan ikan dan tepung yang menjadi favorit sehari-hari." },
      { name: "Sambal Tempoyak & Sambal Buah", desc: "Sambal dari durian fermentasi, serta sambal dari mangga, kweni, atau nanas." },
      { name: "Kue Maksuba", desc: "Kue lapis telur manis yang lazim hadir di perayaan." },
      { name: "Lapis Kojo, Kue Delapan Jam, Srikayo", desc: "Kue tradisional berbahan telur dan santan." },
      { name: "Gandus, Engkak, Bolok Koja", desc: "Kudapan tradisional Palembang lainnya." },
    ],
  },
  {
    slug: "pertunjukan-lisan",
    title: "Seni Pertunjukan & Tradisi Lisan",
    cta: "Lihat Pertunjukan ↗",
    tagline: "Cerita, pantun, dan tawa yang diwariskan dari mulut ke mulut.",
    intro:
      "Tradisi tutur Sumsel memadukan hiburan dan nasihat. Teater, senjang, dan tembang bersyair panjang menjadi cara masyarakat menyampaikan kisah, kritik, dan petuah.",
    guidebook: ["Seni pertunjukan", "Cerita rakyat"],
    photoQuery: "Teater Dulmuluk; Senjang Sumatera Selatan",
    imagePrompt:
      "Pementasan teater tradisional Dulmuluk dengan kostum kerajaan Melayu di panggung sederhana, fotografi dokumenter",
    image: null,
    items: [
      { name: "Teater Dulmuluk", desc: "Teater komedi musikal Palembang yang diadaptasi dari Kitab Syair Abdul Muluk, memadukan akting, tari, nyanyian, dan lawakan." },
      { name: "Senjang", desc: "Seni tutur berirama berisi pantun nasihat, ungkapan hati, atau kritik sosial dengan musik pengiring bersahutan." },
      { name: "Tembang Batanghari Sembilan", desc: "Pembacaan pantun panjang yang dilagukan mengikuti petikan gitar tunggal." },
    ],
  },
  {
    slug: "upacara-adat",
    title: "Upacara Adat & Tradisi Sosial",
    cta: "Lihat Tradisi ↗",
    tagline: "Kebersamaan yang dirayakan di sungai, lahan, dan meja pernikahan.",
    intro:
      "Upacara dan tradisi Sumsel memperlihatkan nilai gotong royong, rasa syukur, dan penghormatan pada tamu. Banyak di antaranya terkait erat dengan sungai dan musim.",
    guidebook: ["Festival budaya", "Pariwisata budaya"],
    photoQuery: "Festival Perahu Bidar Sungai Musi; Ngobeng Palembang",
    imagePrompt:
      "Lomba Perahu Bidar di Sungai Musi dengan puluhan pendayung dan Jembatan Ampera di latar, fotografi aksi",
    image: null,
    items: [
      { name: "Tradisi Ngobeng (Saji)", desc: "Menyajikan hidangan melingkar di lantai untuk 8 orang, lauk dioper estafet demi menghormati tamu pernikahan." },
      { name: "Bekarang Iwak", desc: "Menangkap ikan beramai-ramai di sungai, lebak, atau danau saat kemarau." },
      { name: "Perahu Bidar", desc: "Lomba dayung perahu panjang di Sungai Musi untuk memeriahkan hari besar nasional." },
      { name: "Sedekah Rame", desc: "Upacara adat suku Pasemah sebagai wujud syukur sebelum membuka lahan atau memulai musim tanam." },
      { name: "Adat Nindai (Madik)", desc: "Penyelidikan diam-diam latar belakang calon menantu perempuan oleh utusan keluarga pria sebelum lamaran." },
    ],
  },
  {
    slug: "sejarah",
    title: "Sejarah & Peninggalan",
    cta: "Lihat Sejarah ↗",
    tagline: "Dari pusat maritim Sriwijaya hingga Kesultanan Palembang Darussalam.",
    intro:
      "Palembang menyimpan jejak Sriwijaya, kerajaan maritim yang berpengaruh di Asia Tenggara, lalu Kesultanan Palembang Darussalam. Prasasti, bangunan, dan museum menjadi arsip yang masih bisa dikunjungi.",
    guidebook: ["Sejarah", "Museum digital"],
    photoQuery: "Prasasti Kedukan Bukit; Museum Balaputradewa; Benteng Kuto Besak; Jembatan Ampera",
    imagePrompt:
      "Jembatan Ampera dan Sungai Musi saat senja, langit oranye, fotografi lanskap kota bersejarah",
    image: null,
    // CATATAN: item sejarah di bawah di luar daftar budaya yang Anda kirim.
    // Periksa ulang di sumber resmi (Museum Balaputradewa, Dinas Kebudayaan) sebelum dipublikasikan.
    items: [
      { name: "Kerajaan Sriwijaya", desc: "Kerajaan maritim yang berpusat di sekitar Palembang dan menguasai jalur perdagangan Selat Malaka." },
      { name: "Prasasti Kedukan Bukit", desc: "Prasasti Sriwijaya bertarikh 682 M yang ditemukan di Palembang." },
      { name: "Kesultanan Palembang Darussalam", desc: "Kesultanan Melayu yang berdiri sejak abad ke-17 dan melahirkan tradisi songket serta Aesan Gede." },
      { name: "Benteng Kuto Besak", desc: "Benteng keraton di tepi Sungai Musi peninggalan Kesultanan Palembang." },
      { name: "Museum Negeri Balaputradewa", desc: "Museum Sumsel yang menyimpan koleksi arkeologi, etnografi, dan sejarah." },
      { name: "Jembatan Ampera", desc: "Jembatan ikonik di atas Sungai Musi yang menjadi penanda kota Palembang." },
    ],
  },
];

// ============================================================
// KONTEN SECTION BERANDA LAIN (layout tetap, isi diganti)
// Foto: cari dengan `photoQuery`, isi creator + license. Tanpa foto, pakai ilustrasi AI berlabel.
// ============================================================

export const heroSearch = {
  placeholder: "Tanya apa saja tentang budaya Sumsel...",
  scrollHint: "GULIR UNTUK MENJELAJAH",
};

export const showcaseHeading = {
  title: "Mulai dari satu tema.",
  subtitle: "Jelajahi seluruh budaya Sumsel",
  hint: "Bergerak otomatis ke kanan • Arahkan kursor atau geser untuk menjelajah",
};

// Section 3 — pengganti "Apa waktu favoritmu dalam sehari?"
export const dayGallery = {
  title: "Apa waktu favoritmu di Palembang?",
  cards: [
    { slot: "kiri-tinggi", title: "Pagi di tepian Musi", sub: "Sarapan pempek dan pindang di kota sungai", query: "sarapan pempek Palembang", photoQuery: "Pempek Palembang sarapan" },
    { slot: "tengah-atas", title: "Senja di Jembatan Ampera", sub: "Langit oranye di atas Sungai Musi", query: "Jembatan Ampera", photoQuery: "Jembatan Ampera sunset" },
    { slot: "tengah-bawah", title: "Malam di Benteng Kuto Besak", sub: "Lampu kota memantul di air Musi", query: "Benteng Kuto Besak", photoQuery: "Benteng Kuto Besak malam" },
    { slot: "kanan-besar", title: "Fajar di Sungai Musi", sub: "Perahu dan rumah rakit mulai bergerak", query: "Rumah Rakit", photoQuery: "Sungai Musi pagi perahu" },
  ],
};

// Section 4 — banner
export const banner = {
  eyebrow: "Warisan Budaya Sumsel",
  title: "Pakaian Adat Palembang",
  desc: "Keanggunan Aesan Gede dan kain songket berbenang emas, busana kebesaran pengantin Palembang.",
  cta: "Masuklah ke dalam",
  href: "/tur/songket-palembang",
  photoQuery: "Aesan Gede pengantin Palembang",
};

// Section 5 — pengganti "Surealisme"
export const textileGallery = {
  title: "Kemilau Kain Palembang",
  cards: [
    { slot: "kiri-atas", badge: "Tema", title: "Pakaian Adat & Kain Tenun", sub: "5 item", href: "/tema/kain-pakaian", photoQuery: "Songket Palembang" },
    { slot: "kiri-bawah", badge: "Cerita", title: "Sehari bersama Penenun Songket", sub: "Berbulan-bulan untuk satu helai kain berbenang emas.", href: "/jelajahi?q=proses+menenun+songket", photoQuery: "penenun songket Palembang" },
    { slot: "tengah-atas", badge: "Penjelajah warna", title: "Merah Marun & Emas", sub: "Warna kebesaran pada kain Palembang", href: "/jelajahi?q=warna+songket+palembang", photoQuery: "songket merah emas" },
    { slot: "tengah-bawah", badge: "Karya seni", title: "Songket Lepus", sub: "Tenun benang emas yang menutup seluruh kain", href: "/tur/songket-palembang", photoQuery: "Songket Lepus" },
    { slot: "kanan-penuh", badge: "Karya seni", title: "Aesan Gede", sub: "Busana pengantin kebesaran Palembang", href: "/jelajahi?q=Aesan+Gede", photoQuery: "Aesan Gede" },
  ],
};

// Section 6 — Teruslah menjelajah
export const keepExploring = {
  title: "Teruslah menjelajah...",
  subtitle: "Selami budaya dari seluruh Sumatera Selatan",
  cards: [
    { title: "Rumah Limas", desc: "Rumah panggung berundak, penanda status dan kearifan arsitektur sungai.", href: "/tur/rumah-limas", photoQuery: "Rumah Limas Palembang" },
    { title: "Kerajaan Sriwijaya", desc: "Pusat maritim yang menguasai jalur Selat Malaka dari tepian Musi.", href: "/tur/kerajaan-sriwijaya", photoQuery: "Prasasti Kedukan Bukit" },
    { title: "Pempek & Kuliner Palembang", desc: "Rasa ikan sungai, cuko, dan pindang yang melegenda.", href: "/tur/pempek-kuliner", photoQuery: "Pempek Palembang" },
    { title: "Tari Gending Sriwijaya", desc: "Tari kolosal penyambut tamu agung dengan sekapur sirih.", href: "/tur/tari-gending-sriwijaya", photoQuery: "Tari Gending Sriwijaya" },
  ],
};

// Section 7 — pengganti "Tebak karya seni"
export const guessCulture = {
  prompt: "Tebak budaya apa yang tersembunyi di antara potongan-potongan ini.",
  cta: "Klik di sini untuk mengetahui jawabannya",
  footnote: "Gunakan kursor untuk memeriksa setiap potongan detail",
  // Saran: satu foto Rumah Limas beresolusi tinggi, dipotong jadi 12 petak dengan CSS object-position,
  // atau 12 foto detail yang berbeda dari objek yang sama.
  tiles: [
    "Atap limas bertingkat", "Tangga kayu", "Lantai berundak (bengkilas)", "Ukiran dinding",
    "Tiang panggung", "Jendela kayu", "Kisi-kisi ventilasi", "Pintu utama",
    "Tekstur kayu unglen", "Atap sirap", "Teras", "Halaman rumah",
  ],
  answer: {
    badge: "Jawaban Kuis Budaya",
    title: "Rumah Limas",
    subtitle: "Rumah adat Palembang, Sumatera Selatan",
    body:
      "Rumah Limas adalah rumah panggung beratap limas dengan lantai berundak yang disebut bengkilas. Tingkat lantai menandai status sosial penghuni, dan bentuk panggungnya menyesuaikan diri dengan kehidupan di tepi sungai.",
    cta: "Tutup & Jelajahi Lagi",
    href: "/tur/rumah-limas",
  },
};
