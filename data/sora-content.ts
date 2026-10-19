// Data konten SORA Arts & Culture — 8 tema untuk card bergerak + halaman Tema + Tur Digital
// Sesuai dengan PRD.MD dan sora-content.ts

export type ThemeItem = {
  name: string;
  desc: string;
  image?: string;
  badge?: string;
  slug?: string;
};

export type Theme = {
  slug: string;
  title: string;
  cta: string;
  tagline: string;
  intro: string;
  guidebook: string[];
  layout: "k1" | "k2" | "k3";
  image: string;
  heroImage: string;
  items: ThemeItem[];
};

export type DedicatedTour = {
  id: string;
  title: string;
  subtitle: string;
  heroImg: string;
  sec1Title: string;
  sec1Desc: string;
  sec1Img: string;
  sec2Title: string;
  sec2Desc: string;
  sec2Img: string;
  sec3Title: string;
  sec3Desc: string;
  sec3Img: string;
  relCat: string;
  relTitle: string;
  relDesc: string;
  relLink: string;
  relImg: string;
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
    layout: "k1",
    image: "/images/rumah_limas.jpg",
    heroImage: "/images/rumah_limas.jpg",
    items: [
      {
        name: "Rumah Limas",
        desc: "Rumah panggung beratap limas dengan lantai berundak (bengkilas) sebagai penanda status sosial.",
        image: "/images/rumah_limas.jpg",
        badge: "Status Sosial & Sungai",
        slug: "rumah-limas",
      },
      {
        name: "Rumah Rakit",
        desc: "Rumah terapung dari kayu dan bambu yang diikat ke tebing sungai, menghadap aliran Sungai Musi.",
        image: "/images/ampera_hero.jpg",
        badge: "Terapung Musi",
        slug: "fajar-musi",
      },
      {
        name: "Rumah Ulu",
        desc: "Rumah panggung daerah hulu sungai dengan tiang melengkung atau sistem ulak-ulak yang tahan gempa.",
        image: "/images/rumah_limas.jpg",
        badge: "Tahan Gempa",
        slug: "rumah-limas",
      },
      {
        name: "Rumah Cara Gudang",
        desc: "Rumah panggung kayu memanjang beratap pelana sederhana tanpa undakan untuk rakyat biasa.",
        image: "/images/rumah_limas.jpg",
        badge: "Kayu Memanjang",
        slug: "rumah-limas",
      },
      {
        name: "Ghumah Baghi (Pasemah)",
        desc: "Rumah panggung suku Besemah dengan tiang diletakkan di atas batu tanpa ditanam; variasi Tatahan dan Kingking.",
        image: "/images/rumah_limas.jpg",
        badge: "Batu Umpak Besemah",
        slug: "rumah-limas",
      },
      {
        name: "Rumah Kilapan",
        desc: "Rumah panggung Pasemah dengan dinding kayu yang dihaluskan dengan ketam tanpa ukiran rumit.",
        image: "/images/rumah_limas.jpg",
        badge: "Kayu Halus Minimalis",
        slug: "rumah-limas",
      },
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
    layout: "k1",
    image: "/images/songket_lepus.jpg",
    heroImage: "/images/songket_lepus.jpg",
    items: [
      {
        name: "Aesan Gede",
        desc: "Pakaian adat perkawinan yang melambangkan kebesaran Kerajaan Sriwijaya, didominasi merah, emas, dan perhiasan megah.",
        image: "/images/aesan_gede_banner.jpg",
        badge: "Mahkota Kebesaran",
        slug: "aesan-gede",
      },
      {
        name: "Aesan Paksangko",
        desc: "Pakaian adat perkawinan melambangkan keanggunan ningrat, dengan baju kurung berhias teratai penutup dada.",
        image: "/images/aesan_gede_banner.jpg",
        badge: "Teratai Dada Ningrat",
        slug: "aesan-gede",
      },
      {
        name: "Kain Songket Palembang",
        desc: "Tenun berkilau benang emas dengan teknik lepus; ragam Songket Lepus, Tigo Negeri, Limar, dan Bungo Pacik.",
        image: "/images/songket_lepus.jpg",
        badge: "Benang Emas Cabutan",
        slug: "songket-palembang",
      },
      {
        name: "Kain Jumputan (Pelangi)",
        desc: "Kain sutra warna-warni memikat yang dibuat dengan teknik ikat celup tradisional khas Palembang.",
        image: "/images/songket_lepus.jpg",
        badge: "Ikat Celup Sutra",
        slug: "songket-palembang",
      },
      {
        name: "Batik Palembang",
        desc: "Batik dengan motif dominan flora tanpa gambar makhluk hidup, seperti motif Lasem dan Bunga Teh.",
        image: "/images/songket_lepus.jpg",
        badge: "Motif Flora Lasem",
        slug: "songket-palembang",
      },
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
    layout: "k2",
    image: "/images/aksara_ulu.jpg",
    heroImage: "/images/aksara_ulu.jpg",
    items: [
      {
        name: "Aksara Ulu (Surat Ulu / Kaganga)",
        desc: "Sistem tulis kuno jenis abugida yang ditulis pada bilah bambu, tanduk hewan, atau kulit kayu.",
        image: "/images/aksara_ulu.jpg",
        badge: "Aksara Kuno Abugida",
        slug: "aksara-ulu",
      },
      {
        name: "Bahasa Melayu Palembang",
        desc: "Lingua franca dengan tingkatan Bahasa Alus (keraton halus) dan Bahasa Sari-Sari (sehari-hari).",
        image: "/images/ampera_hero.jpg",
        badge: "Alus & Sari-Sari",
        slug: "aksara-ulu",
      },
      {
        name: "Bahasa Komering",
        desc: "Dituturkan di OKU Timur, kaya variasi kosakata kekerabatan dan intonasi khas dataran perbukitan.",
        image: "/images/aksara_ulu.jpg",
        badge: "OKU Timur",
        slug: "aksara-ulu",
      },
      {
        name: "Bahasa Lematang",
        desc: "Digunakan di tepian Sungai Lematang (Lahat, Muara Enim) dengan intonasi khas hulu dan hilir.",
        image: "/images/rumah_limas.jpg",
        badge: "Lahat & Muara Enim",
        slug: "aksara-ulu",
      },
      {
        name: "Bahasa Ogan",
        desc: "Dituturkan di sepanjang aliran Sungai Ogan (Ogan Ilir, OKU) dengan dialek lembut bersahaja.",
        image: "/images/aksara_ulu.jpg",
        badge: "Sepanjang Musi Ogan",
        slug: "aksara-ulu",
      },
      {
        name: "Bahasa Kayu Agung",
        desc: "Bahasa unik dengan perbedaan fonologi mencolok dari bahasa sekitarnya, dituturkan di OKI.",
        image: "/images/aksara_ulu.jpg",
        badge: "Pesisir OKI",
        slug: "aksara-ulu",
      },
      {
        name: "Bahasa Pedamaran",
        desc: "Bahasa khas masyarakat rawa gambut Pedamaran, OKI, yang sarat ungkapan kearifan ekologis.",
        image: "/images/ampera_hero.jpg",
        badge: "Rawa Gambut",
        slug: "aksara-ulu",
      },
      {
        name: "Bahasa Musi (Sekayu)",
        desc: "Dialek Musi Banyuasin yang identik dengan vokal berakhiran khas 'e' meliuk.",
        image: "/images/aksara_ulu.jpg",
        badge: "Dialek Musi",
        slug: "aksara-ulu",
      },
    ],
  },
  {
    slug: "tari-musik",
    title: "Tari & Musik Tradisional",
    cta: "Lihat Tari & Musik ↗",
    tagline: "Gerak penyambutan dan petikan gitar yang menutup bait petuah.",
    intro:
      "Tari di Sumsel banyak berfungsi sebagai penyambutan tamu, sementara musiknya mengiringi doa, syair, dan perayaan. Dari tari kolosal Gending Sriwijaya hingga gitar tunggal Batanghari Sembilan.",
    guidebook: ["Seni pertunjukan", "Musik tradisional"],
    layout: "k3",
    image: "/images/tari_gending.jpg",
    heroImage: "/images/tari_gending.jpg",
    items: [
      {
        name: "Tari Gending Sriwijaya",
        desc: "Tari kolosal sakral pembawa sekapur sirih untuk menyambut tamu agung kenegaraan.",
        image: "/images/tari_gending.jpg",
        badge: "Tepak Sekapur Sirih",
        slug: "tari-gending-sriwijaya",
      },
      {
        name: "Tari Tanggai",
        desc: "Tari penyambutan tamu kehormatan dengan lentiknya kuku palsu keemasan (tanggai).",
        image: "/images/tari_gending.jpg",
        badge: "Kuku Emas",
        slug: "tari-gending-sriwijaya",
      },
      {
        name: "Tari Erai-Erai",
        desc: "Tari etnik suku Lematang yang melambangkan kegembiraan saat panen padi raya di persawahan.",
        image: "/images/tari_gending.jpg",
        badge: "Panen Padi Lematang",
        slug: "tari-gending-sriwijaya",
      },
      {
        name: "Tari Kebagh",
        desc: "Tarian penyambutan kuno dari dataran tinggi Besemah (Pagaralam) dengan gerakan sayap burung.",
        image: "/images/rumah_limas.jpg",
        badge: "Dataran Besemah",
        slug: "tari-gending-sriwijaya",
      },
      {
        name: "Tari Setabik",
        desc: "Tari penyambutan khas Musi Banyuasin dengan prosesi menyuguhkan sirih dari dalam tepak kuningan.",
        image: "/images/tari_gending.jpg",
        badge: "Musi Banyuasin",
        slug: "tari-gending-sriwijaya",
      },
      {
        name: "Gitar Tunggal Batanghari Sembilan",
        desc: "Seni bermain gitar sendirian dengan petikan melankolis penutup bait syair petuah sembilan sungai.",
        image: "/images/aksara_ulu.jpg",
        badge: "Petikan Dawai Petuah",
        slug: "aksara-ulu",
      },
      {
        name: "Burdah / Terbangan",
        desc: "Rebana besar dari kulit hewan dan kayu, sering mengiringi zikir dan tembang pujian islami.",
        image: "/images/tari_gending.jpg",
        badge: "Rebana Sakral",
        slug: "tari-gending-sriwijaya",
      },
      {
        name: "Kenong Basemah / Kelintang",
        desc: "Alat musik pukul perunggu yang disusun berjejer, mengiringi tarian upacara adat pedalaman.",
        image: "/images/rumah_limas.jpg",
        badge: "Gamelan Perunggu",
        slug: "tari-gending-sriwijaya",
      },
      {
        name: "Lagu Daerah Sumsel",
        desc: "Kidung rakyat Dek Sangke, Cuk Mak Ilang, Kereba Mulang, Sayang Selayak, dan Ribang Kemambang.",
        image: "/images/ampera_hero.jpg",
        badge: "Syair Abadi",
        slug: "tari-gending-sriwijaya",
      },
      {
        name: "Tari Begambo",
        desc: "Tarian kreasi Dusun Toman yang menceritakan kehidupan petani mengolah tanaman gambir.",
        image: "/images/tari_gending.jpg",
        badge: "Dusun Toman",
        slug: "tari-gending-sriwijaya",
      },
      {
        name: "Tari Tepak Keraton",
        desc: "Tari penyambutan ciptaan 1966 yang terinspirasi budaya Kesultanan Palembang Darussalam.",
        image: "/images/tari_gending.jpg",
        badge: "Kesultanan Palembang",
        slug: "tari-gending-sriwijaya",
      },
      {
        name: "Tari Bujang Gadis Beladas",
        desc: "Tari pergaulan muda-mudi yang lincah dan enerjik dari Ogan Ilir.",
        image: "/images/tari_gending.jpg",
        badge: "Ogan Ilir Lincah",
        slug: "tari-gending-sriwijaya",
      },
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
    layout: "k2",
    image: "/images/pempek_palembang.jpg",
    heroImage: "/images/pempek_palembang.jpg",
    items: [
      {
        name: "Pempek Palembang",
        desc: "Olahan ikan tenggiri/belida dan sagu dengan ragam Kapal Selam, Lenjer, Adaan, dan Kulit disantap bersama cuko pekat.",
        image: "/images/pempek_palembang.jpg",
        badge: "Ikan & Cuko Hitam",
        slug: "pempek-kuliner",
      },
      {
        name: "Pindang Patin, Tulang & Pegagan",
        desc: "Keluarga hidangan berkuah pindang asam-pedas segar rempah nanas dan kemangi khas tepian sungai.",
        image: "/images/pempek_palembang.jpg",
        badge: "Kuah Asam Pedas Segar",
        slug: "pempek-kuliner",
      },
      {
        name: "Mie Celor, Laksan & Celimpungan",
        desc: "Hidangan mi dan adonan ikan kenyal yang disiram kaldu santan udang sungai gurih pekat.",
        image: "/images/pempek_palembang.jpg",
        badge: "Kaldu Udang Santan",
        slug: "pempek-kuliner",
      },
      {
        name: "Burgo, Tekwan, Model, Lenggang",
        desc: "Hidangan olahan ikan dan tepung berkuah bening kaldu jamur kuping atau dipanggang daun pisang.",
        image: "/images/pempek_palembang.jpg",
        badge: "Kuah Kaldu Sedap Malam",
        slug: "pempek-kuliner",
      },
      {
        name: "Sambal Tempoyak & Sambal Buah",
        desc: "Sambal dari durian fermentasi beraroma tajam gurih, serta sambal buah mangga kweni dan nanas segar.",
        image: "/images/pempek_palembang.jpg",
        badge: "Durian Fermentasi",
        slug: "pempek-kuliner",
      },
      {
        name: "Kue Maksuba",
        desc: "Kue lapis telur bebek manis legit berlapis-lapis yang lazim hadir pada perayaan dan hari raya.",
        image: "/images/songket_lepus.jpg",
        badge: "Kudapan Keraton Bangsawan",
        slug: "pempek-kuliner",
      },
      {
        name: "Lapis Kojo & Kue Delapan Jam",
        desc: "Kue tradisional pandan suji dan santan yang dikukus selama 8 jam hingga bertekstur karamel kenyal.",
        image: "/images/songket_lepus.jpg",
        badge: "Kukus Delapan Jam",
        slug: "pempek-kuliner",
      },
      {
        name: "Gandus, Engkak Ketan & Bolok Koja",
        desc: "Kudapan gurih tabur ebi bawang goreng serta kue ketan panggang manis tradisional Palembang.",
        image: "/images/pempek_palembang.jpg",
        badge: "Gurih Tabur Ebi",
        slug: "pempek-kuliner",
      },
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
    layout: "k1",
    image: "/images/tari_gending.jpg",
    heroImage: "/images/tari_gending.jpg",
    items: [
      {
        name: "Teater Dulmuluk",
        desc: "Teater komedi musikal Palembang yang diadaptasi dari Kitab Syair Abdul Muluk, memadukan akting, tari, nyanyian, dan lawakan jenaka.",
        image: "/images/tari_gending.jpg",
        badge: "Komedi Musikal Kerajaan",
        slug: "teater-dulmuluk",
      },
      {
        name: "Senjang",
        desc: "Seni tutur berirama berisi pantun nasihat, ungkapan hati, atau kritik sosial dengan musik pengiring bersahutan.",
        image: "/images/aksara_ulu.jpg",
        badge: "Pantun Berbalas Musi",
        slug: "aksara-ulu",
      },
      {
        name: "Tembang Batanghari Sembilan",
        desc: "Pembacaan pantun panjang berima yang dilagukan secara sendu mengikuti petikan gitar tunggal.",
        image: "/images/ampera_hero.jpg",
        badge: "Syair Petuah Melankolis",
        slug: "aksara-ulu",
      },
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
    layout: "k2",
    image: "/images/ampera_hero.jpg",
    heroImage: "/images/ampera_hero.jpg",
    items: [
      {
        name: "Tradisi Ngobeng (Saji)",
        desc: "Menyajikan hidangan melingkar di lantai untuk 8 orang, lauk dioper estafet demi memuliakan tamu pernikahan.",
        image: "/images/pempek_palembang.jpg",
        badge: "Makan Estafet Lantai",
        slug: "tradisi-ngobeng",
      },
      {
        name: "Festival Perahu Bidar",
        desc: "Lomba dayung perahu panjang di Sungai Musi dengan puluhan pendayung tangguh menyusuri bawah Jembatan Ampera.",
        image: "/images/ampera_hero.jpg",
        badge: "Dayung Cepat Sungai Musi",
        slug: "perahu-bidar",
      },
      {
        name: "Bekarang Iwak",
        desc: "Tradisi menangkap ikan beramai-ramai di sungai, lebak, atau danau saat musim kemarau tiba.",
        image: "/images/ampera_hero.jpg",
        badge: "Panen Ikan Rawa",
        slug: "perahu-bidar",
      },
      {
        name: "Sedekah Rame",
        desc: "Upacara adat suku Pasemah sebagai wujud rasa syukur bersama sebelum membuka lahan atau memulai tanam padi.",
        image: "/images/rumah_limas.jpg",
        badge: "Syukur Panen Pasemah",
        slug: "tradisi-ngobeng",
      },
      {
        name: "Adat Nindai (Madik)",
        desc: "Penyelidikan diam-diam budi pekerti calon menantu perempuan oleh utusan keluarga pria sebelum lamaran resmi.",
        image: "/images/aesan_gede_banner.jpg",
        badge: "Adat Pra-Nikah",
        slug: "aesan-gede",
      },
    ],
  },
  {
    slug: "sejarah",
    title: "Sejarah & Peninggalan",
    cta: "Lihat Sejarah ↗",
    tagline: "Dari pusat maritim Sriwijaya hingga Kesultanan Palembang Darussalam.",
    intro:
      "Palembang menyimpan jejak Sriwijaya, kerajaan maritim yang berpengaruh di Asia Tenggara, lalu Kesultanan Palembang Darussalam. Prasasti, benteng, dan museum menjadi arsip yang masih bisa dikunjungi.",
    guidebook: ["Sejarah", "Museum digital"],
    layout: "k2",
    image: "/images/rumah_limas.jpg",
    heroImage: "/images/ampera_hero.jpg",
    items: [
      {
        name: "Kerajaan Sriwijaya",
        desc: "Kemaharajaan bahari yang berpusat di Palembang dan menguasai jalur niaga Selat Malaka serta Selat Sunda.",
        image: "/images/aksara_ulu.jpg",
        badge: "Kedatuan Maritim 682 M",
        slug: "kerajaan-sriwijaya",
      },
      {
        name: "Prasasti Kedukan Bukit",
        desc: "Prasasti batu bertarikh 682 M yang mencatat perjalanan suci (siddhayatra) Dapunta Hyang mendirikan wanua Sriwijaya.",
        image: "/images/aksara_ulu.jpg",
        badge: "Batu Tulis Kuno",
        slug: "kerajaan-sriwijaya",
      },
      {
        name: "Kesultanan Palembang Darussalam",
        desc: "Kesultanan Islam Melayu berdaulat yang melahirkan tradisi adiluhung songket lepus, Aesan Gede, dan ukiran tembaga.",
        image: "/images/aesan_gede_banner.jpg",
        badge: "Keraton Melayu Islam",
        slug: "songket-palembang",
      },
      {
        name: "Benteng Kuto Besak",
        desc: "Benteng keraton berbahan batu kapur dan putih telur di tepi Sungai Musi peninggalan Sultan Mahmud Badaruddin I.",
        image: "/images/ampera_hero.jpg",
        badge: "Benteng Keraton Sungai",
        slug: "malam-kuto-besak",
      },
      {
        name: "Museum Negeri Balaputradewa",
        desc: "Museum kebudayaan Sumsel yang merawat koleksi arca megalitik Pasemah, artefak Sriwijaya, dan Rumah Limas utuh.",
        image: "/images/rumah_limas.jpg",
        badge: "Arsip Megalitik & Sriwijaya",
        slug: "rumah-limas",
      },
      {
        name: "Jembatan Ampera",
        desc: "Jembatan megah pemersatu kawasan Seberang Ulu dan Ilir yang menjadi tengara abadi kota Palembang.",
        image: "/images/ampera_hero.jpg",
        badge: "Tengara Kota Palembang",
        slug: "senja-ampera",
      },
    ],
  },
];

export const dedicatedTours: Record<string, DedicatedTour> = {
  "songket-palembang": {
    id: "songket-palembang",
    title: "Songket Palembang",
    subtitle: "Kemilau Emas Peradaban Sriwijaya dan kemegahan di tepian Sungai Musi",
    heroImg: "/images/songket_lepus.jpg",
    sec1Title: "Songket Lepus Emas: Kemilau Peradaban Maritim Sriwijaya",
    sec1Desc:
      "Songket Lepus menduduki kasta tertinggi dalam tradisi tenun Palembang Darussalam. Kata 'lepus' secara harfiah bermakna merata tanpa celah, merujuk pada pengerjaan tenun benang emas murni pintalan cabutan yang menyelimuti seluruh latar kain sutra marun.",
    sec1Img: "/images/songket_lepus.jpg",
    sec2Title: "Asal Usul & Benang Emas Pintal Murni Jalur Bahari",
    sec2Desc:
      "Benang emas murni yang didatangkan melalui jalur niaga maritim Sriwijaya dipadukan secara teliti dengan benang sutra marun alami. Proses penenunan satu helai kain songket lepus dapat memakan waktu hingga berbulan-bulan demi presisi geometris yang sempurna.",
    sec2Img: "/images/songket_lepus.jpg",
    sec3Title: "Simbolisme Mawar & Pucuk Rebung Tumpal",
    sec3Desc:
      "Setiap motif geometri pada permukaan kain menyimpan doa kosmis. Motif Bunga Mawar melambangkan perlindungan batin dan tolak bala, sementara formasi Pucuk Rebung merepresentasikan aspirasi spiritual yang luhur dalam tata laku kehidupan kesultanan.",
    sec3Img: "/images/aesan_gede_banner.jpg",
    relCat: "KATEGORI BUSANA ADAT",
    relTitle: "Kemegahan Busana Adat Palembang",
    relDesc:
      "Telusuri mahakarya busana Aesan Gede, Aesan Paksangko, dan warisan kebesaran Kesultanan Palembang Darussalam.",
    relLink: "/tema/kain-pakaian",
    relImg: "/images/aesan_gede_banner.jpg",
  },
  "rumah-limas": {
    id: "rumah-limas",
    title: "Rumah Limas Palembang",
    subtitle:
      "Rumah panggung beratap limas berundak, penanda status sosial dan kearifan arsitektur tepi sungai",
    heroImg: "/images/rumah_limas.jpg",
    sec1Title: "Bengkilas: Falsafah Lantai Berundak Bertingkat",
    sec1Desc:
      "Rumah Limas khas Palembang memiliki lantai berundak yang disebut bengkilas. Tingkat lantai menandai status sosial penghuni dan tamu dalam adat, mulai dari Jogan, Kekijing Dua, Kekijing Tiga, hingga Ruang Gagap.",
    sec1Img: "/images/rumah_limas.jpg",
    sec2Title: "Struktur Pasak Kayu Unglen Tahan Gempa",
    sec2Desc:
      "Dibangun di atas tiang kayu unglen dan ulin berdiameter kokoh tanpa paku besi, melainkan sistem purus dan pasak kayu tradisional yang lentur terhadap getaran gempa dan pasang surut rawa sungai Musi.",
    sec2Img: "/images/rumah_limas.jpg",
    sec3Title: "Simbar Melati & Ukiran Flora Bersepuh Emas",
    sec3Desc:
      "Atap limas dihiasi ornamen tanduk simbar bunga melati emas yang bermakna keanggunan budi pekerti. Dinding dalam dipenuhi ukiran flora timbul berbalut perada emas yang menghidupkan suasana istana.",
    sec3Img: "/images/songket_lepus.jpg",
    relCat: "KATEGORI ARSITEKTUR BUDAYA",
    relTitle: "Rumah Adat Sumatera Selatan",
    relDesc:
      "Jelajahi Rumah Rakit di tepian Musi, Rumah Ulu pegunungan Besemah, dan Rumah Cara Gudang.",
    relLink: "/tema/rumah-adat",
    relImg: "/images/rumah_limas.jpg",
  },
  "tari-gending-sriwijaya": {
    id: "tari-gending-sriwijaya",
    title: "Tari Gending Sriwijaya",
    subtitle:
      "Tarian sakral kolosal pembawa tepak sekapur sirih penyambut tamu agung kenegaraan",
    heroImg: "/images/tari_gending.jpg",
    sec1Title: "Sekapur Sirih: Lambang Ketulusan Hati Masyarakat Melayu",
    sec1Desc:
      "Tari Gending Sriwijaya dibawakan sembilan penari dara berbusana Aesan Gede lengkap dengan mahkota keemasan. Salah satu penari membawa Tepak berisi sekapur sirih yang disuguhkan kepada tamu terhormat sebagai ikrar persahabatan tulus.",
    sec1Img: "/images/tari_gending.jpg",
    sec2Title: "Lentiknya Tanggai: Kuku Emas Penari Istana",
    sec2Desc:
      "Setiap jemari penari disematkan kuku tiruan melengkung dari lempengan tembaga bersepuh emas yang disebut tanggai. Gerakan tangan meliuk anggun mencerminkan kepatuhan, kelembutan, dan kehormatan wanita bangsawan.",
    sec2Img: "/images/tari_gending.jpg",
    sec3Title: "Alunan Melodi Gending Sriwijaya",
    sec3Desc:
      "Irama musik pengiring memadukan gamelan Melayu, akordeon, dan vokal bertutur yang menggambarkan kejayaan Kerajaan Sriwijaya sebagai pusat peradaban dan pengayom musafir samudra nusantara.",
    sec3Img: "/images/ampera_hero.jpg",
    relCat: "KATEGORI SENI PERTUNJUKAN",
    relTitle: "Tari & Musik Tradisional Sumsel",
    relDesc:
      "Telusuri Tari Tanggai, Erai-Erai, Kebagh, Setabik, dan Gitar Tunggal Batanghari Sembilan.",
    relLink: "/tema/tari-musik",
    relImg: "/images/tari_gending.jpg",
  },
  "pempek-kuliner": {
    id: "pempek-kuliner",
    title: "Pempek & Kuliner Palembang",
    subtitle:
      "Rasa ikan sungai Musi, tepung sagu, dan kuah cuko hitam pedas asam yang melegenda",
    heroImg: "/images/pempek_palembang.jpg",
    sec1Title: "Keajaiban Cuko: Gula Batok Aren & Asam Jawa Murni",
    sec1Desc:
      "Kunci kelezatan pempek terletak pada kuah cuko pekat yang dimasak dari gula merah batok Linggau, asam jawa, cabai rawit pedas, dan bawang putih halus yang menghasilkan rasa gurih, asam, pedas, dan manis seimbang.",
    sec1Img: "/images/pempek_palembang.jpg",
    sec2Title: "Kapal Selam, Lenjer, & Tekwan Kuah Udang",
    sec2Desc:
      "Dari pempek kapal selam berisi kuning telur utuh hingga lembutnya pentol tekwan berkuah kaldu udang sungai dengan jamur kuping dan bunga sedap malam, kuliner Palembang menghadirkan sensasi gurih alami ikan air tawar.",
    sec2Img: "/images/pempek_palembang.jpg",
    sec3Title: "Tradisi Santap Pagi di Sepanjang Urat Nadi Musi",
    sec3Desc:
      "Sejak fajar menyingsing di tepian Musi, kedai-kedai pempek telah mengepulkan aroma sedap. Menyantap pempek bersama teh tawar hangat di tepi sungai menjadi ritual kebersamaan warga Palembang yang tak lekang oleh waktu.",
    sec3Img: "/images/ampera_hero.jpg",
    relCat: "KATEGORI KULINER TRADISIONAL",
    relTitle: "Ragam Kuliner Khas Sumatera Selatan",
    relDesc:
      "Eksplorasi Pindang Patin, Sambal Tempoyak Durian, Mie Celor, hingga Kue Maksuba kesultanan.",
    relLink: "/tema/kuliner",
    relImg: "/images/pempek_palembang.jpg",
  },
  "kerajaan-sriwijaya": {
    id: "kerajaan-sriwijaya",
    title: "Kerajaan Sriwijaya",
    subtitle:
      "Imperium maritim terbesar Asia Tenggara yang menguasai jalur Selat Malaka dari tepian Musi",
    heroImg: "/images/aksara_ulu.jpg",
    sec1Title: "Prasasti Kedukan Bukit (682 M): Tonggak Suci Kedatuan",
    sec1Desc:
      "Dapunta Hyang memimpin ekspedisi 20.000 tentara dengan perahu untuk membangun wanua makmur di Palembang. Prasasti batu beraksara Pallawa ini menjadi bukti tertulis tertua berdirinya kedatuan Sriwijaya.",
    sec1Img: "/images/aksara_ulu.jpg",
    sec2Title: "Jalur Sutra Bahari & Pusat Pengkajian Internasional",
    sec2Desc:
      "Sebagai pelabuhan niaga tersibuk di Asia, Sriwijaya menghubungkan Tiongkok dan India, sekaligus menjadi pusat pengkajian ilmu agama terkemuka tempat ribuan cendekiawan dunia singgah belajar tata bahasa dan filosofi.",
    sec2Img: "/images/ampera_hero.jpg",
    sec3Title: "Warisan Kemegahan Emas Suvarnadvipa",
    sec3Desc:
      "Julukan Pulau Emas (Suvarnadvipa) mewariskan tradisi kriya logam mulia dan tenun benang emas yang kini terus hidup dalam helai kain songket lepus, mahkota Aesan Gede, dan arsitektur rumah adat panggung.",
    sec3Img: "/images/songket_lepus.jpg",
    relCat: "KATEGORI SEJARAH & ARSIP",
    relTitle: "Arsip Peninggalan Sejarah Sumsel",
    relDesc:
      "Kunjungi Museum Balaputradewa, Benteng Kuto Besak, dan jejak Kesultanan Palembang Darussalam.",
    relLink: "/tema/sejarah",
    relImg: "/images/rumah_limas.jpg",
  },
  "perahu-bidar": {
    id: "perahu-bidar",
    title: "Festival Perahu Bidar",
    subtitle:
      "Ketangkasan puluhan pendayung beradu cepat di atas riak gelombang Sungai Musi",
    heroImg: "/images/ampera_hero.jpg",
    sec1Title: "Adat Pacu Dayung Kesultanan Palembang",
    sec1Desc:
      "Lomba Perahu Bidar berakar dari tradisi Kesultanan Palembang untuk menguji ketangkasan armada laut penjaga sungai Musi. Perahu panjang kayu rengas dihiasi kepala naga atau burung garuda berukir.",
    sec1Img: "/images/ampera_hero.jpg",
    sec2Title: "Harmoni 55 Pendayung Berpadu Tabuhan Gong",
    sec2Desc:
      "Setiap perahu diawaki hingga 55 pendayung yang mengayuh serempak seirama tabuhan gong dan seruan juru mudi. Percikan air sungai Musi berpadu dengan sorak ribuan penonton di sepanjang pelataran Benteng Kuto Besak.",
    sec2Img: "/images/ampera_hero.jpg",
    sec3Title: "Perahu Hias & Semarak Festival Tahunan",
    sec3Desc:
      "Selain adu kecepatan, festival ini dimeriahkan parade perahu hias yang menampilkan ornamen miniatur Rumah Limas, kain songket, dan replika Jembatan Ampera berhias ribuan lampion warna-warni.",
    sec3Img: "/images/rumah_limas.jpg",
    relCat: "KATEGORI UPACARA & FESTIVAL",
    relTitle: "Upacara Adat & Tradisi Sosial",
    relDesc:
      "Telusuri Tradisi Ngobeng saji makanan estafet, Bekarang Iwak, dan Adat Sedekah Rame Pasemah.",
    relLink: "/tema/upacara-adat",
    relImg: "/images/ampera_hero.jpg",
  },
  "pagi-musi": {
    id: "pagi-musi",
    title: "Pagi di Tepian Musi",
    subtitle: "Sarapan pempek dan pindang hangat di kota sungai Palembang",
    heroImg: "/images/pempek_palembang.jpg",
    sec1Title: "Aroma Pempek & Pindang Fajar Sungai",
    sec1Desc:
      "Ketika kabut pagi perlahan terangkat di atas permukaan Musi, kedai-kedai sarapan tepi sungai mulai menyajikan potongan pempek lenjer hangat dan semangkuk pindang patin berkuah asam pedas segar kemangi.",
    sec1Img: "/images/pempek_palembang.jpg",
    sec2Title: "Pasar Terapung & Denyut Pedagang Perahu Ketek",
    sec2Desc:
      "Suara mesin perahu ketek dan perahu getek yang hilir mudik mengantarkan sayuran, buah-buahan, dan ikan segar dari pedalaman menjadi melodi khas pagi hari yang menghidupkan perdagangan sungai sejak ratusan tahun lalu.",
    sec2Img: "/images/ampera_hero.jpg",
    sec3Title: "Teh Hangat & Obrolan Santai Warga Palembang",
    sec3Desc:
      "Masyarakat berkumpul di beranda kedai kayu membicarakan kabar hari ini, menyeruput kuah cuko pedas, dan menikmati semilir angin sungai sebelum memulai aktivitas harian.",
    sec3Img: "/images/pempek_palembang.jpg",
    relCat: "KATEGORI KULINER TRADISIONAL",
    relTitle: "Kuliner Khas Sumatera Selatan",
    relDesc: "Jelajahi ragam pempek, pindang patin, mie celor, dan kudapan manis kesultanan.",
    relLink: "/tema/kuliner",
    relImg: "/images/pempek_palembang.jpg",
  },
  "senja-ampera": {
    id: "senja-ampera",
    title: "Senja di Jembatan Ampera",
    subtitle: "Langit oranye keemasan merona di atas aliran megah Sungai Musi",
    heroImg: "/images/ampera_hero.jpg",
    sec1Title: "Cahaya Lembayung di Atas Dua Menara Merah",
    sec1Desc:
      "Ketika matahari mulai condong ke ufuk barat, Jembatan Ampera menampakkan siluet paling romantis. Semburat jingga dan ungu terpantul di riak air Musi, menciptakan kanvas alam yang spektakuler.",
    sec1Img: "/images/ampera_hero.jpg",
    sec2Title: "Lampu Sorot Menghidupkan Mahakarya Arsitektur",
    sec2Desc:
      "Tepat saat senja berganti petang, ribuan lampu LED di menara dan bentang jembatan mulai menyala terang, mengubah Ampera menjadi lentera raksasa yang menghubungkan Seberang Ulu dan Seberang Ilir.",
    sec2Img: "/images/ampera_hero.jpg",
    sec3Title: "Pusat Rekreasi & Nostalgia Budaya Warga",
    sec3Desc:
      "Dari pelataran Benteng Kuto Besak, warga dan wisatawan duduk bersantai menikmati jagung bakar dan pempek panggang sambil mengagumi kemegahan jembatan yang dibangun sejak 1962 ini.",
    sec3Img: "/images/ampera_hero.jpg",
    relCat: "KATEGORI SEJARAH & ARSIP",
    relTitle: "Sejarah & Peninggalan Palembang",
    relDesc: "Kunjungi Benteng Kuto Besak, Museum Balaputradewa, dan jejak kemaritiman Sriwijaya.",
    relLink: "/tema/sejarah",
    relImg: "/images/ampera_hero.jpg",
  },
  "malam-kuto-besak": {
    id: "malam-kuto-besak",
    title: "Malam di Benteng Kuto Besak",
    subtitle: "Lampu kota dan siluet benteng keraton peninggalan Sultan Mahmud Badaruddin I",
    heroImg: "/images/ampera_hero.jpg",
    sec1Title: "Benteng Keraton Abad ke-18 Tepi Musi",
    sec1Desc:
      "Benteng Kuto Besak didirikan oleh Sultan Mahmud Badaruddin I dan diselesaikan oleh Sultan Mahmud Bahauddin. Dindingnya yang kokoh terbuat dari batu bata yang direkatkan dengan adonan kapur dan putih telur.",
    sec1Img: "/images/ampera_hero.jpg",
    sec2Title: "Pantulan Lampu Warna-Warni di Air Sungai",
    sec2Desc:
      "Pada malam hari, pelataran benteng menjelma menjadi ruang publik paling semarak di Palembang. Pantulan lampu Jembatan Ampera dan kapal-kapal restoran terapung menari indah di permukaan air Musi.",
    sec2Img: "/images/ampera_hero.jpg",
    sec3Title: "Alunan Musik Tradisional & Hangatnya Keramahan",
    sec3Desc:
      "Seniman jalanan membawakan lagu daerah Dek Sangke dan petikan gitar tunggal, melengkapi malam syahdu dengan kehangatan keramahan masyarakat Palembang Darussalam.",
    sec3Img: "/images/tari_gending.jpg",
    relCat: "KATEGORI SEJARAH & ARSIP",
    relTitle: "Peninggalan Sejarah & Keraton",
    relDesc: "Pelajari sejarah Kesultanan Palembang Darussalam, prasasti Sriwijaya, dan Rumah Limas.",
    relLink: "/tema/sejarah",
    relImg: "/images/ampera_hero.jpg",
  },
  "fajar-musi": {
    id: "fajar-musi",
    title: "Fajar di Sungai Musi",
    subtitle: "Perahu dan rumah rakit terapung mulai bergerak menyongsong hari baru",
    heroImg: "/images/rumah_limas.jpg",
    sec1Title: "Kehidupan di Atas Rumah Rakit Terapung",
    sec1Desc:
      "Rumah Rakit terapung yang dirangkai dari balok kayu dan ratusan batang bambu menjadi saksi tradisi permukiman air sejak zaman Sriwijaya. Diikat dengan tali rotan ke pancang tebing sungai, rumah ini bergoyang lembut mengikuti arus pasang.",
    sec1Img: "/images/rumah_limas.jpg",
    sec2Title: "Aktivitas Fajar Nelayan & Penenun",
    sec2Desc:
      "Sebelum mentari menyengat, para nelayan telah kembali membawa hasil tangkapan ikan patin, belida, dan baung segar. Dari balik jendela kayu rumah panggung, suara ketukan alat tenun gedogan mulai terdengar pelan.",
    sec2Img: "/images/songket_lepus.jpg",
    sec3Title: "Sungai Musi Sebagai Urat Nadi Peradaban",
    sec3Desc:
      "Panjang 750 kilometer yang melintasi sembilan anak sungai (Batanghari Sembilan) menjadikan Musi bukan sekadar aliran air, melainkan ibu peradaban yang membentuk watak, budaya, dan cita rasa seluruh Sumatera Selatan.",
    sec3Img: "/images/ampera_hero.jpg",
    relCat: "KATEGORI ARSITEKTUR BUDAYA",
    relTitle: "Rumah Adat Sumatera Selatan",
    relDesc: "Pelajari Rumah Rakit, Rumah Limas, Rumah Ulu, dan Ghumah Baghi Pasemah.",
    relLink: "/tema/rumah-adat",
    relImg: "/images/rumah_limas.jpg",
  },
  "penenun-songket": {
    id: "penenun-songket",
    title: "Sehari bersama Penenun Songket",
    subtitle: "Berbulan-bulan kesabaran untuk sehelai kain berkilau benang emas",
    heroImg: "/images/songket_lepus.jpg",
    sec1Title: "Alat Tenun Tradisional Gedogan Kayu",
    sec1Desc:
      "Di ruang bawah rumah panggung kayu, penenun duduk dengan memangku alat tenun gedogan. Pinggang ditopang sabuk penahan (por), sementara kedua kaki lurus menekan kayu tumpuan demi menjaga ketegangan benang lungsi sutra.",
    sec1Img: "/images/songket_lepus.jpg",
    sec2Title: "Menyulam Benang Emas Cabutan Satu Demi Satu",
    sec2Desc:
      "Dengan menggunakan bilah lidi kelapa atau belira kayu, penenun mengangkat helai demi helai benang sutra untuk menyisipkan benang pakan emas murni. Satu kesalahan kecil pada hitungan motif berarti kain harus diurai kembali.",
    sec2Img: "/images/songket_lepus.jpg",
    sec3Title: "Warisan Turun-Temurun Penuh Doa & Filosofi",
    sec3Desc:
      "Setiap motif Songket Lepus, Bunga Pacik, atau Cantik Manis bukan hanya pola hias, melainkan doa luhur tentang ketulusan budi, kemakmuran keluarga, dan kehormatan yang diwariskan dari ibu kepada anak perempuannya.",
    sec3Img: "/images/aesan_gede_banner.jpg",
    relCat: "KATEGORI BUSANA ADAT & KAIN",
    relTitle: "Pakaian Adat & Kain Tenun",
    relDesc: "Telusuri Aesan Gede, Kain Jumputan Pelangi, dan Batik Palembang bermotif flora.",
    relLink: "/tema/kain-pakaian",
    relImg: "/images/songket_lepus.jpg",
  },
  "aesan-gede": {
    id: "aesan-gede",
    title: "Aesan Gede: Busana Kebesaran",
    subtitle: "Pakaian adat pengantin lambang keagungan dan kemuliaan Kerajaan Sriwijaya",
    heroImg: "/images/aesan_gede_banner.jpg",
    sec1Title: "Mahkota Gandik Emas & Bunga Melati Bergoyang",
    sec1Desc:
      "Pengantin wanita mengenakan mahkota emas bertingkat berhias ronce melati dan cempaka. Keemasan mahkota mencerminkan kemurnian jiwa dan keagungan permaisuri istana keraton Melayu Palembang.",
    sec1Img: "/images/aesan_gede_banner.jpg",
    sec2Title: "Teratai Penutup Dada Bertatah Permata",
    sec2Desc:
      "Hiasan kain teratai beludru merah berbordir benang emas dan taburan manik permata menutupi dada hingga pundak, melambangkan kesucian hati, ketenteraman jiwa, dan perlindungan batin bagi sang pengantin.",
    sec2Img: "/images/aesan_gede_banner.jpg",
    sec3Title: "Kain Songket Lepus Berlian & Keris Kehormatan",
    sec3Desc:
      "Dipadukan dengan kain songket lepus benang emas murni serta keris berhulu gading bertatah permata bagi mempelai pria, Aesan Gede menyiratkan wibawa bangsawan dan doa keberkahan rumah tangga.",
    sec3Img: "/images/songket_lepus.jpg",
    relCat: "KATEGORI BUSANA ADAT & KAIN",
    relTitle: "Pakaian Adat & Kain Tenun",
    relDesc: "Jelajahi Aesan Paksangko, Kain Songket Lepus, dan Kain Jumputan Palembang.",
    relLink: "/tema/kain-pakaian",
    relImg: "/images/aesan_gede_banner.jpg",
  },
  "aksara-ulu": {
    id: "aksara-ulu",
    title: "Aksara Ulu (Surat Ulu / Kaganga)",
    subtitle: "Tradisi tulis kuno abugida masyarakat pedalaman Sumatera Selatan",
    heroImg: "/images/aksara_ulu.jpg",
    sec1Title: "Naskah Kuno Pada Bilah Bambu & Kulit Kayu",
    sec1Desc:
      "Jauh sebelum kertas modern dikenal, para cerdik pandai di hulu Musi menggoreskan aksara Ulu pada bilah bambu kering (gelumpai), kulit kayu terap (khasag), dan tanduk kerbau menggunakan pisau raut bertinta jelaga damar.",
    sec1Img: "/images/aksara_ulu.jpg",
    sec2Title: "Sistem Fonetis Abugida Ka-Ga-Nga",
    sec2Desc:
      "Aksara Ulu berakar dari aksara Pallawa yang disederhanakan menjadi 28 konsonan dasar dengan lambang diakritik anak surat untuk mengubah atau mematikan bunyi vokal, menghasilkan tulisan yang ramping dan indah.",
    sec2Img: "/images/aksara_ulu.jpg",
    sec3Title: "Kitab Pengobatan, Hukum Adat, & Syair Kasih",
    sec3Desc:
      "Naskah-naskah Surat Ulu memuat catatan ramuan obat herbal tradisional, hukum adat simbur cahaya, kidung doa keselamatan, hingga pantun asmara pemuda-pemudi zaman lampau yang menjadi warisan literasi berharga dunia.",
    sec3Img: "/images/rumah_limas.jpg",
    relCat: "KATEGORI BAHASA & AKSARA",
    relTitle: "Bahasa & Aksara Daerah Sumsel",
    relDesc: "Telusuri Bahasa Melayu Palembang, Komering, Lematang, Ogan, dan Aksara Ulu.",
    relLink: "/tema/bahasa-aksara",
    relImg: "/images/aksara_ulu.jpg",
  },
  "teater-dulmuluk": {
    id: "teater-dulmuluk",
    title: "Teater Dulmuluk",
    subtitle: "Komedi musikal tradisional Palembang berakar dari Kitab Kejayaan Sultan Abdul Muluk",
    heroImg: "/images/tari_gending.jpg",
    sec1Title: "Kelahiran Seni Teater dari Tradisi Berzikir & Bertutur",
    sec1Desc:
      "Bermula pada paruh kedua abad ke-19, pembacaan Syair Abdul Muluk oleh pedagang Arab di Tangga Takat berkembang menjadi pertunjukan drama panggung rakyat yang memadukan nyanyian bersyair Melayu dan dialog jenaka yang akrab bagi masyarakat.",
    sec1Img: "/images/tari_gending.jpg",
    sec2Title: "Ciri Khas Lakon, Tari Khodam, & Spontanitas Lawakan",
    sec2Desc:
      "Dalam setiap pementasan, tokoh abdi atau khodam selalu menjadi pemantik tawa penonton melalui lelucon slapstick dan sindiran sosial yang cerdas. Para pemain menari lincah seiring alunan rebana, biola, dan gong pengiring.",
    sec2Img: "/images/ampera_hero.jpg",
    sec3Title: "Pelestarian Warisan Panggung Rakyat Palembang",
    sec3Desc:
      "Hingga kini, Dulmuluk tetap dipentaskan dalam pesta perkawinan dan festival seni budaya Sumsel, menjadi jembatan penghubung nilai moral kesetiaan, keadilan, dan humor hangat masyarakat Palembang.",
    sec3Img: "/images/tari_gending.jpg",
    relCat: "KATEGORI SENI PERTUNJUKAN",
    relTitle: "Seni Pertunjukan & Tradisi Lisan",
    relDesc: "Jelajahi Senjang, Tembang Batanghari Sembilan, dan ragam cerita rakyat Sumatera Selatan.",
    relLink: "/tema/pertunjukan-lisan",
    relImg: "/images/tari_gending.jpg",
  },
  "tradisi-ngobeng": {
    id: "tradisi-ngobeng",
    title: "Tradisi Ngobeng (Saji Bersama)",
    subtitle: "Kearifan gotong royong jamuan makan bersila 8 orang dengan oper estafet hidangan",
    heroImg: "/images/pempek_palembang.jpg",
    sec1Title: "Falsafah Duduk Bersila Memuliakan Tamu",
    sec1Desc:
      "Ngobeng adalah tata krama jamuan adat Palembang di mana para tamu duduk melingkar di atas tikar dalam kelompok delapan orang. Nasi minyak dan lauk-pauk seperti malbi daging, ayam kecap, dan dalca disajikan di tengah dengan mangkuk cuci tangan (iwangan).",
    sec1Img: "/images/pempek_palembang.jpg",
    sec2Title: "Estafet Cepat Penuh Keakraban Tanpa Berdiri",
    sec2Desc:
      "Para pemuda menyalurkan piring dan mangkok hidangan secara estafet dari dapur ke hadapan para tamu tanpa berdiri, melambangkan kesigapan pemuda dan penghormatan setinggi-tingginya kepada para tetua dan tamu undangan.",
    sec2Img: "/images/rumah_limas.jpg",
    sec3Title: "Merawat Kebersamaan dan Persaudaraan Sejati",
    sec3Desc:
      "Di era serba cepat, tradisi Ngobeng terus dijaga dalam hajatan adat dan perayaan hari besar Islam di kampung-kampung tua Palembang sebagai simbol bahwa derajat semua manusia setara saat duduk makan bersama.",
    sec3Img: "/images/aesan_gede_banner.jpg",
    relCat: "KATEGORI UPACARA & TRADISI",
    relTitle: "Upacara Adat & Tradisi Sosial",
    relDesc: "Telusuri Festival Perahu Bidar, Bekarang Iwak, dan Adat Sedekah Rame Pasemah.",
    relLink: "/tema/upacara-adat",
    relImg: "/images/ampera_hero.jpg",
  },
};

// Helper: Get dedicated tour with robust fallback so any item clicked always renders properly
export function getDedicatedTour(slug: string): DedicatedTour {
  if (dedicatedTours[slug]) {
    return dedicatedTours[slug];
  }

  // Find in themes items
  for (const theme of themes) {
    const item = theme.items.find(
      (it) => it.slug === slug || it.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug
    );
    if (item) {
      return {
        id: slug,
        title: item.name,
        subtitle: item.desc,
        heroImg: item.image || theme.heroImage || "/images/ampera_hero.jpg",
        sec1Title: `${item.name}: Makna & Nilai Budaya Luhur`,
        sec1Desc: `${item.desc}. Warisan ini telah mengakar dalam kehidupan masyarakat Sumatera Selatan dari generasi ke generasi, melambangkan kebersamaan dan identitas budaya lokal yang tak ternilai.`,
        sec1Img: item.image || theme.heroImage || "/images/ampera_hero.jpg",
        sec2Title: "Kearifan Lokal & Keindahan Tradisi",
        sec2Desc: `Setiap detail dari ${item.name} mencerminkan kearifan adaptasi manusia terhadap alam sekitar, sungai-sungai besar, serta keagungan peradaban kesultanan dan kedatuan masa lampau di bumi Sriwijaya.`,
        sec2Img: theme.image || "/images/songket_lepus.jpg",
        sec3Title: "Upaya Pelestarian di Era Digital",
        sec3Desc: `Melalui platform SORA Arts & Culture, dokumentasi ${item.name} dihadirkan secara visual dan interaktif agar generasi penerus dapat mengapresiasi dan bangga akan kekayaan warisan budaya Sumatera Selatan.`,
        sec3Img: theme.heroImage || "/images/ampera_hero.jpg",
        relCat: `KATEGORI ${theme.title.toUpperCase()}`,
        relTitle: theme.title,
        relDesc: theme.intro,
        relLink: `/tema/${theme.slug}`,
        relImg: theme.heroImage || "/images/ampera_hero.jpg",
      };
    }
  }

  // Default fallback to songket-palembang
  return dedicatedTours["songket-palembang"];
}

