// Data konten SORA Arts & Culture — Sumatera Selatan
// Seluruh item memiliki slug unik, foto otentik, dan konten narasi budaya tersendiri.

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
        image: "/images/rumah_limas_1792383411977.jpg",
        badge: "Status Sosial & Sungai",
        slug: "rumah-limas",
      },
      {
        name: "Rumah Rakit",
        desc: "Rumah terapung dari kayu dan bambu yang diikat ke tebing sungai, menghadap aliran Sungai Musi.",
        image: "/images/rumah_rakit.jpg",
        badge: "Terapung Musi",
        slug: "rumah-rakit",
      },
      {
        name: "Rumah Ulu",
        desc: "Rumah panggung daerah hulu sungai dengan tiang melengkung atau sistem ulak-ulak yang tahan gempa.",
        image: "/images/rumah_ulu.jpg",
        badge: "Tahan Gempa",
        slug: "rumah-ulu",
      },
      {
        name: "Rumah Cara Gudang",
        desc: "Rumah panggung kayu memanjang beratap pelana sederhana tanpa undakan untuk rakyat biasa.",
        image: "/images/rumah_cara_gudang.jpg",
        badge: "Kayu Memanjang",
        slug: "rumah-cara-gudang",
      },
      {
        name: "Ghumah Baghi (Pasemah)",
        desc: "Rumah panggung suku Besemah dengan tiang diletakkan di atas batu tanpa ditanam; variasi Tatahan dan Kingking.",
        image: "/images/ghumah_baghi.jpg",
        badge: "Batu Umpak Besemah",
        slug: "ghumah-baghi",
      },
      {
        name: "Rumah Kilapan",
        desc: "Rumah panggung Pasemah dengan dinding kayu yang dihaluskan dengan ketam tanpa ukiran rumit.",
        image: "/images/rumah_kilapan.jpg",
        badge: "Kayu Halus Minimalis",
        slug: "rumah-kilapan",
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
        image: "/images/aesan_paksangko.jpg",
        badge: "Teratai Dada Ningrat",
        slug: "aesan-paksangko",
      },
      {
        name: "Kain Songket Palembang",
        desc: "Tenun berkilau benang emas dengan teknik lepus; ragam Songket Lepus, Tigo Negeri, Limar, dan Bungo Pacik.",
        image: "/images/songket_lepus_1792383379080.jpg",
        badge: "Benang Emas Cabutan",
        slug: "songket-palembang",
      },
      {
        name: "Kain Jumputan (Pelangi)",
        desc: "Kain sutra warna-warni memikat yang dibuat dengan teknik ikat celup tradisional khas Palembang.",
        image: "/images/kain_jumputan.jpg",
        badge: "Ikat Celup Sutra",
        slug: "kain-jumputan",
      },
      {
        name: "Batik Palembang",
        desc: "Batik dengan motif dominan flora tanpa gambar makhluk hidup, seperti motif Lasem dan Bunga Teh.",
        image: "/images/batik_palembang.jpg",
        badge: "Motif Flora Lasem",
        slug: "batik-palembang",
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
        image: "/images/aksara_ulu_1792383445918.jpg",
        badge: "Aksara Kuno Abugida",
        slug: "aksara-ulu",
      },
      {
        name: "Bahasa Melayu Palembang",
        desc: "Lingua franca dengan tingkatan Bahasa Alus (keraton halus) dan Bahasa Sari-Sari (sehari-hari).",
        image: "/images/musi_landscape.jpg",
        badge: "Alus & Sari-Sari",
        slug: "bahasa-melayu-palembang",
      },
      {
        name: "Bahasa Komering",
        desc: "Dituturkan di OKU Timur, kaya variasi kosakata kekerabatan dan intonasi khas dataran perbukitan.",
        image: "/images/komering_culture.jpg",
        badge: "OKU Timur",
        slug: "bahasa-komering",
      },
      {
        name: "Bahasa Lematang",
        desc: "Digunakan di tepian Sungai Lematang (Lahat, Muara Enim) dengan intonasi khas hulu dan hilir.",
        image: "/images/sungai_lematang.jpg",
        badge: "Lahat & Muara Enim",
        slug: "bahasa-lematang",
      },
      {
        name: "Bahasa Ogan",
        desc: "Dituturkan di sepanjang aliran Sungai Ogan (Ogan Ilir, OKU) dengan dialek lembut bersahaja.",
        image: "/images/perahu_ketek.jpg",
        badge: "Sepanjang Musi Ogan",
        slug: "bahasa-ogan",
      },
      {
        name: "Bahasa Kayu Agung",
        desc: "Bahasa unik dengan perbedaan fonologi mencolok dari bahasa sekitarnya, dituturkan di OKI.",
        image: "/images/rumah_kayuagung.jpg",
        badge: "Pesisir OKI",
        slug: "bahasa-kayu-agung",
      },
      {
        name: "Bahasa Pedamaran",
        desc: "Bahasa khas masyarakat rawa gambut Pedamaran, OKI, yang sarat ungkapan kearifan ekologis.",
        image: "/images/purun_pedamaran.jpg",
        badge: "Rawa Gambut",
        slug: "bahasa-pedamaran",
      },
      {
        name: "Bahasa Musi (Sekayu)",
        desc: "Dialek Musi Banyuasin yang identik dengan vokal berakhiran khas 'e' meliuk.",
        image: "/images/sungai_musi_sekayu.jpg",
        badge: "Dialek Musi",
        slug: "bahasa-musi",
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
        image: "/images/tari_gending_1792383394868.jpg",
        badge: "Tepak Sekapur Sirih",
        slug: "tari-gending-sriwijaya",
      },
      {
        name: "Tari Tanggai",
        desc: "Tari penyambutan tamu kehormatan dengan lentiknya kuku palsu keemasan (tanggai).",
        image: "/images/tari_tanggai.jpg",
        badge: "Kuku Emas",
        slug: "tari-tanggai",
      },
      {
        name: "Tari Erai-Erai",
        desc: "Tari etnik suku Lematang yang melambangkan kegembiraan saat panen padi raya di persawahan.",
        image: "/images/tari_pagar_pengantin.jpg",
        badge: "Panen Padi Lematang",
        slug: "tari-erai-erai",
      },
      {
        name: "Tari Kebagh",
        desc: "Tarian penyambutan kuno dari dataran tinggi Besemah (Pagaralam) dengan gerakan sayap burung.",
        image: "/images/tari_kebagh.jpg",
        badge: "Dataran Besemah",
        slug: "tari-kebagh",
      },
      {
        name: "Tari Setabik",
        desc: "Tari penyambutan khas Musi Banyuasin dengan prosesi menyuguhkan sirih dari dalam tepak kuningan.",
        image: "/images/tari_setabik.jpg",
        badge: "Musi Banyuasin",
        slug: "tari-setabik",
      },
      {
        name: "Gitar Tunggal Batanghari Sembilan",
        desc: "Seni bermain gitar sendirian dengan petikan melankolis penutup bait syair petuah sembilan sungai.",
        image: "/images/gitar_tunggal_batanghari.jpg",
        badge: "Petikan Dawai Petuah",
        slug: "gitar-batanghari-sembilan",
      },
      {
        name: "Burdah / Terbangan",
        desc: "Rebana besar dari kulit hewan dan kayu, sering mengiringi zikir dan tembang pujian islami.",
        image: "/images/rebana_burdah.jpg",
        badge: "Rebana Sakral",
        slug: "burdah-terbangan",
      },
      {
        name: "Kenong Basemah / Kelintang",
        desc: "Alat musik pukul perunggu yang disusun berjejer, mengiringi tarian upacara adat pedalaman.",
        image: "/images/kenong_basemah.jpg",
        badge: "Gamelan Perunggu",
        slug: "kenong-basemah",
      },
      {
        name: "Lagu Daerah Sumsel",
        desc: "Kidung rakyat Dek Sangke, Cuk Mak Ilang, Kereba Mulang, Sayang Selayak, dan Ribang Kemambang.",
        image: "/images/lagu_daerah_sumsel.jpg",
        badge: "Syair Abadi",
        slug: "lagu-daerah-sumsel",
      },
      {
        name: "Tari Begambo",
        desc: "Tarian kreasi Dusun Toman yang menceritakan kehidupan petani mengolah tanaman gambir.",
        image: "/images/tari_begambo.jpg",
        badge: "Dusun Toman",
        slug: "tari-begambo",
      },
      {
        name: "Tari Tepak Keraton",
        desc: "Tari penyambutan ciptaan 1966 yang terinspirasi budaya Kesultanan Palembang Darussalam.",
        image: "/images/tari_tepak_keraton.jpg",
        badge: "Kesultanan Palembang",
        slug: "tari-tepak-keraton",
      },
      {
        name: "Tari Bujang Gadis Beladas",
        desc: "Tari pergaulan muda-mudi yang lincah dan enerjik dari Ogan Ilir.",
        image: "/images/tari_bujang_gadis.jpg",
        badge: "Ogan Ilir Lincah",
        slug: "tari-bujang-gadis-beladas",
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
        image: "/images/pempek_palembang_1792383427793.jpg",
        badge: "Ikan & Cuko Hitam",
        slug: "pempek-palembang",
      },
      {
        name: "Pindang Patin, Tulang & Pegagan",
        desc: "Keluarga hidangan berkuah pindang asam-pedas segar rempah nanas dan kemangi khas tepian sungai.",
        image: "/images/pindang_patin.jpg",
        badge: "Kuah Asam Pedas Segar",
        slug: "pindang-patin",
      },
      {
        name: "Mie Celor, Laksan & Celimpungan",
        desc: "Hidangan mi dan adonan ikan kenyal yang disiram kaldu santan udang sungai gurih pekat.",
        image: "/images/mie_celor.jpg",
        badge: "Kaldu Udang Santan",
        slug: "mie-celor-laksan",
      },
      {
        name: "Burgo, Tekwan, Model, Lenggang",
        desc: "Hidangan olahan ikan dan tepung berkuah bening kaldu jamur kuping atau dipanggang daun pisang.",
        image: "/images/tekwan_palembang.jpg",
        badge: "Kuah Kaldu Sedap Malam",
        slug: "tekwan-model-burgo",
      },
      {
        name: "Sambal Tempoyak & Sambal Buah",
        desc: "Sambal dari durian fermentasi beraroma tajam gurih, serta sambal buah mangga kweni dan nanas segar.",
        image: "/images/sambal_tempoyak.jpg",
        badge: "Durian Fermentasi",
        slug: "sambal-tempoyak",
      },
      {
        name: "Kue Maksuba",
        desc: "Kue lapis telur bebek manis legit berlapis-lapis yang lazim hadir pada perayaan dan hari raya.",
        image: "/images/kue_maksuba.jpg",
        badge: "Kudapan Keraton Bangsawan",
        slug: "kue-maksuba",
      },
      {
        name: "Lapis Kojo & Kue Delapan Jam",
        desc: "Kue tradisional pandan suji dan santan yang dikukus selama 8 jam hingga bertekstur karamel kenyal.",
        image: "/images/kue_delapan_jam.jpg",
        badge: "Kukus Delapan Jam",
        slug: "lapis-kojo-delapan-jam",
      },
      {
        name: "Gandus, Engkak Ketan & Bolok Koja",
        desc: "Kudapan gurih tabur ebi bawang goreng serta kue ketan panggang manis tradisional Palembang.",
        image: "/images/gandus_palembang.jpg",
        badge: "Gurih Tabur Ebi",
        slug: "gandus-engkak-ketan",
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
    image: "/images/teater_dulmuluk.jpg",
    heroImage: "/images/teater_dulmuluk.jpg",
    items: [
      {
        name: "Teater Dulmuluk",
        desc: "Teater komedi musikal Palembang yang diadaptasi dari Kitab Syair Abdul Muluk, memadukan akting, tari, nyanyian, dan lawakan jenaka.",
        image: "/images/teater_dulmuluk.jpg",
        badge: "Komedi Musikal Kerajaan",
        slug: "teater-dulmuluk",
      },
      {
        name: "Senjang",
        desc: "Seni tutur berirama berisi pantun nasihat, ungkapan hati, atau kritik sosial dengan musik pengiring bersahutan.",
        image: "/images/senjang_muba.jpg",
        badge: "Pantun Berbalas Musi",
        slug: "senjang-muba",
      },
      {
        name: "Tembang Batanghari Sembilan",
        desc: "Pembacaan pantun panjang berima yang dilagukan secara sendu mengikuti petikan gitar tunggal.",
        image: "/images/tembang_batanghari_sembilan.jpg",
        badge: "Syair Petuah Melankolis",
        slug: "tembang-batanghari-sembilan",
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
    image: "/images/perahu_bidar.jpg",
    heroImage: "/images/perahu_bidar.jpg",
    items: [
      {
        name: "Tradisi Ngobeng (Saji)",
        desc: "Menyajikan hidangan melingkar di lantai untuk 8 orang, lauk dioper estafet demi memuliakan tamu pernikahan.",
        image: "/images/tradisi_ngobeng.jpg",
        badge: "Makan Estafet Lantai",
        slug: "tradisi-ngobeng",
      },
      {
        name: "Festival Perahu Bidar",
        desc: "Lomba dayung perahu panjang di Sungai Musi dengan puluhan pendayung tangguh menyusuri bawah Jembatan Ampera.",
        image: "/images/perahu_bidar.jpg",
        badge: "Dayung Cepat Sungai Musi",
        slug: "perahu-bidar",
      },
      {
        name: "Bekarang Iwak",
        desc: "Tradisi menangkap ikan beramai-ramai di sungai, lebak, atau danau saat musim kemarau tiba.",
        image: "/images/bekarang_iwak.jpg",
        badge: "Panen Ikan Rawa",
        slug: "bekarang-iwak",
      },
      {
        name: "Sedekah Rame",
        desc: "Upacara adat suku Pasemah sebagai wujud rasa syukur bersama sebelum membuka lahan atau memulai tanam padi.",
        image: "/images/sedekah_rame.jpg",
        badge: "Syukur Panen Pasemah",
        slug: "sedekah-rame",
      },
      {
        name: "Adat Nindai (Madik)",
        desc: "Penyelidikan diam-diam budi pekerti calon menantu perempuan oleh utusan keluarga pria sebelum lamaran resmi.",
        image: "/images/adat_nindai.jpg",
        badge: "Adat Pra-Nikah",
        slug: "adat-nindai",
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
    image: "/images/benteng_kuto_besak.jpg",
    heroImage: "/images/benteng_kuto_besak.jpg",
    items: [
      {
        name: "Kerajaan Sriwijaya",
        desc: "Kemaharajaan bahari yang berpusat di Palembang dan menguasai jalur niaga Selat Malaka serta Selat Sunda.",
        image: "/images/buddha_seguntang.jpg",
        badge: "Kedatuan Maritim 682 M",
        slug: "kerajaan-sriwijaya",
      },
      {
        name: "Prasasti Kedukan Bukit",
        desc: "Prasasti batu bertarikh 682 M yang mencatat perjalanan suci (siddhayatra) Dapunta Hyang mendirikan wanua Sriwijaya.",
        image: "/images/prasasti_kedukan_bukit.jpg",
        badge: "Batu Tulis Kuno",
        slug: "prasasti-kedukan-bukit",
      },
      {
        name: "Kesultanan Palembang Darussalam",
        desc: "Kesultanan Islam Melayu berdaulat yang melahirkan tradisi adiluhung songket lepus, Aesan Gede, dan ukiran tembaga.",
        image: "/images/kesultanan_palembang.jpg",
        badge: "Keraton Melayu Islam",
        slug: "kesultanan-palembang",
      },
      {
        name: "Benteng Kuto Besak",
        desc: "Benteng keraton berbahan batu kapur dan putih telur di tepi Sungai Musi peninggalan Sultan Mahmud Badaruddin I.",
        image: "/images/benteng_kuto_besak.jpg",
        badge: "Benteng Keraton Sungai",
        slug: "benteng-kuto-besak",
      },
      {
        name: "Museum Negeri Balaputradewa",
        desc: "Museum kebudayaan Sumsel yang merawat koleksi arca megalitik Pasemah, artefak Sriwijaya, dan Rumah Limas utuh.",
        image: "/images/museum_balaputradewa.jpg",
        badge: "Arsip Megalitik & Sriwijaya",
        slug: "museum-balaputradewa",
      },
      {
        name: "Jembatan Ampera",
        desc: "Jembatan megah pemersatu kawasan Seberang Ulu dan Ilir yang menjadi tengara abadi kota Palembang.",
        image: "/images/ampera_hero.jpg",
        badge: "Tengara Kota Palembang",
        slug: "jembatan-ampera",
      },
    ],
  },
];

export const dedicatedTours: Record<string, DedicatedTour> = {
  // --- KULINER KHAS ---
  "pempek-palembang": {
    id: "pempek-palembang",
    title: "Pempek Palembang",
    subtitle: "Rasa gurih ikan sungai, kenyal sagu, dan kuah cuko hitam pedas asam yang melegenda",
    heroImg: "/images/pempek_palembang.jpg",
    sec1Title: "Kelezatan Ikan Sungai & Kuah Cuko Khas Batok Aren",
    sec1Desc:
      "Pempek adalah mahakarya gastronomi Palembang berbahan dasar daging ikan air tawar lumat (tenggiri, gabus, atau belida) yang diaduk bersama tepung tapioka. Ciri khas paling sakral adalah kuah cuko pekat yang dimasak dari gula batok hitam Linggau murni, cabai rawit hijau tumbuk, bawang putih, dan asam jawa asli tanpa cuka kimia buatan.",
    sec1Img: "/images/pempek_palembang.jpg",
    sec2Title: "Variasi Bentuk: Dari Kapal Selam hingga Kulit Renyah",
    sec2Desc:
      "Setiap bentuk pempek menyimpan teknik tersendiri: Pempek Kapal Selam berisi satu butir telur ayam/bebek utuh yang direbus presisi, Lenjer silinder yang kenyal padat, Pempek Adaan dengan irisan bawang merah dan santan gurih, hingga Pempek Kulit dan Keriting yang berongga renyah.",
    sec2Img: "/images/pempek_palembang.jpg",
    sec3Title: "Ritual Ngirup Cuko di Tepian Sungai Musi",
    sec3Desc:
      "Bagi masyarakat Palembang, cara menikmati pempek sejati adalah dengan 'ngirup cuko' langsung dari mangkok kecil setelah menyantap potongan pempek hangat. Tradisi ini dinikmati dari sarapan fajar hingga larut malam di sepanjang dermaga perahu ketek Sungai Musi.",
    sec3Img: "/images/ampera_hero.jpg",
    relCat: "KATEGORI KULINER TRADISIONAL",
    relTitle: "Kuliner Khas Sumatera Selatan",
    relDesc: "Jelajahi kelezatan Pindang Patin, Tekwan kuah kaldu udang, dan legitnya Kue Maksuba.",
    relLink: "/tema/kuliner",
    relImg: "/images/pempek_palembang.jpg",
  },
  "pempek-kuliner": {
    id: "pempek-kuliner",
    title: "Pempek Palembang & Ragam Cuko",
    subtitle: "Rasa gurih ikan sungai, kenyal sagu, dan kuah cuko hitam pedas asam yang melegenda",
    heroImg: "/images/pempek_palembang.jpg",
    sec1Title: "Kelezatan Ikan Sungai & Kuah Cuko Khas Batok Aren",
    sec1Desc:
      "Pempek adalah mahakarya gastronomi Palembang berbahan dasar daging ikan air tawar lumat yang diaduk bersama tepung tapioka. Ciri khas paling sakral adalah kuah cuko pekat yang dimasak dari gula batok hitam Linggau murni, cabai rawit hijau tumbuk, bawang putih, dan asam jawa asli.",
    sec1Img: "/images/pempek_palembang.jpg",
    sec2Title: "Variasi Bentuk: Dari Kapal Selam hingga Kulit Renyah",
    sec2Desc:
      "Setiap bentuk pempek menyimpan teknik tersendiri: Pempek Kapal Selam berisi telur utuh, Lenjer silinder yang kenyal padat, Pempek Adaan beraroma bawang merah gurih, hingga Pempek Kulit dan Keriting yang renyah.",
    sec2Img: "/images/pempek_palembang.jpg",
    sec3Title: "Ritual Ngirup Cuko di Tepian Sungai Musi",
    sec3Desc:
      "Bagi masyarakat Palembang, cara menikmati pempek sejati adalah dengan 'ngirup cuko' langsung dari cawan kecil. Menikmati pempek bersama teh tawar hangat di tepi sungai menjadi ritual kebersamaan warga Palembang yang tak lekang oleh waktu.",
    sec3Img: "/images/ampera_hero.jpg",
    relCat: "KATEGORI KULINER TRADISIONAL",
    relTitle: "Kuliner Khas Sumatera Selatan",
    relDesc: "Jelajahi kelezatan Pindang Patin, Tekwan kuah kaldu udang, dan legitnya Kue Maksuba.",
    relLink: "/tema/kuliner",
    relImg: "/images/pempek_palembang.jpg",
  },
  "pindang-patin": {
    id: "pindang-patin",
    title: "Pindang Patin, Tulang & Pegagan",
    subtitle: "Segarnya kuah emas asam-pedas rempah nanas dan kemangi dari jantung perairan Sumatera Selatan",
    heroImg: "/images/pindang_patin.jpg",
    sec1Title: "Kesegaran Kuah Kuning Nanas & Asam Jawa Murni",
    sec1Desc:
      "Pindang Patin adalah hidangan berkuah kebanggaan Sumatera Selatan yang memadukan daging ikan patin sungai berlemak lembut dengan kuah kuning kaya rempah kunyit, serai, lengkuas, dan asam jawa. Potongan nanas segar memberikan sentuhan manis-asam alami yang menyeimbangkan rasa gurih ikan.",
    sec1Img: "/images/pindang_patin.jpg",
    sec2Title: "Varian Pindang Pegagan, Meranjat, hingga Pindang Tulang",
    sec2Desc:
      "Di Ogan Ilir terdapat Pindang Pegagan dengan kuah merah cabai giling segar beraroma daun kemangi pekat tanpa kunyit, serta Pindang Meranjat berterasi harum. Sementara Pindang Tulang Palembang menyajikan iga sapi berempah empuk dengan kaldu gurih pedas menggigit.",
    sec2Img: "/images/pindang_patin.jpg",
    sec3Title: "Tradisi Jamuan Makan Siang di Pinggiran Sungai",
    sec3Desc:
      "Menyantap semangkuk pindang patin hangat bersama nasi putih pulen, lalapan daun pakis rebus, dan cocolan sambal tempoyak durian adalah ritual kuliner paling membangkitkan selera bagi masyarakat hulu dan hilir Musi.",
    sec3Img: "/images/sambal_tempoyak.jpg",
    relCat: "KATEGORI KULINER TRADISIONAL",
    relTitle: "Kuliner Khas Sumatera Selatan",
    relDesc: "Jelajahi aneka sajian pindang khas Ogan Ilir, Sekayu, dan tepian Sungai Lematang.",
    relLink: "/tema/kuliner",
    relImg: "/images/pindang_patin.jpg",
  },
  "tekwan-model-burgo": {
    id: "tekwan-model-burgo",
    title: "Tekwan, Model, Burgo & Lenggang",
    subtitle: "Sensasi kaldu bening sedap malam, gurih udang sungai, dan aroma daun pisang panggang",
    heroImg: "/images/tekwan_palembang.jpg",
    sec1Title: "Tekwan: Butiran Ikan Kenyal dalam Kuah Udang Harum",
    sec1Desc:
      "Tekwan disajikan dari butiran pentol adonan ikan tenggiri yang direbus kenyal, disiram kuah kaldu udang sungai gurih bening yang diperkaya jamur kuping hitam renyah, potongan bengkuang manis, dan bunga sedap malam kering (bunga pisang) yang harum khas.",
    sec1Img: "/images/tekwan_palembang.jpg",
    sec2Title: "Model Tahu Gurih & Panggang Lenggang Daun Pisang",
    sec2Desc:
      "Model Palembang membungkus potongan tahu putih lembut dalam balutan adonan ikan goreng renyah yang disajikan berkuah kaldu. Sedangkan Lenggang dibuat dari adonan pempek yang dipanggang lambat bersama kocokan telur di dalam wadah daun pisang di atas bara tempurung kelapa.",
    sec2Img: "/images/tekwan_palembang.jpg",
    sec3Title: "Burgo: Gulungan Tepung Beras Berkuah Santan Ikan",
    sec3Desc:
      "Burgo adalah menu sarapan klasik berupa dadar gulung tepung beras dan sagu yang diiris tipis, diguyur kuah santan gurih kaldu ikan gabus cincang dengan taburan bawang goreng renyah dan sambal rawit hijau segar.",
    sec3Img: "/images/burgo_palembang.jpg",
    relCat: "KATEGORI KULINER TRADISIONAL",
    relTitle: "Ragam Santapan Tepi Sungai",
    relDesc: "Eksplorasi hidangan sarapan dan kudapan khas kota Palembang tempo dulu.",
    relLink: "/tema/kuliner",
    relImg: "/images/tekwan_palembang.jpg",
  },
  "sambal-tempoyak": {
    id: "sambal-tempoyak",
    title: "Sambal Tempoyak & Sambal Buah",
    subtitle: "Harmoni rasa asam durian fermentasi, cabai rawit pedas, dan segarnya buah tropis Sumatera",
    heroImg: "/images/sambal_tempoyak.jpg",
    sec1Title: "Kearifan Fermentasi Durian Tradisi Leluhur",
    sec1Desc:
      "Tempoyak lahir dari kearifan masyarakat pedalaman Sumatera Selatan dalam mengawetkan limpahan buah durian hutan saat musim panen raya. Daging durian difermentasi alami bersama sedikit garam di dalam tempayan tanah liat selama berhari-hari hingga menghasilkan aroma asam gurih pekat.",
    sec1Img: "/images/sambal_tempoyak.jpg",
    sec2Title: "Perpaduan Ikan Sungai & Tumisan Bumbu Pedas",
    sec2Desc:
      "Sambal tempoyak dimasak dengan menumis cabai merah, cabai rawit, serai wangi, dan kunyit bersama daging durian fermentasi. Bumbu ini kerap dimasak bersama ikan patin, baung, atau mujair sungai hingga kuahnya mengental berkarakter kuat.",
    sec2Img: "/images/sambal_tempoyak.jpg",
    sec3Title: "Sambal Mangga Kweni & Nanas Pelengkap Lauk",
    sec3Desc:
      "Selain tempoyak, masyarakat Sumsel menggemari sambal buah mangga kweni iris dan sambal nanas bakar yang menyegarkan tenggorokan saat disantap berdampingan dengan ikan bakar atau goreng kering.",
    sec3Img: "/images/pindang_patin.jpg",
    relCat: "KATEGORI KULINER TRADISIONAL",
    relTitle: "Kuliner Fermentasi Nusantara",
    relDesc: "Ketahui filosofi pengawetan pangan lokal masyarakat Melayu Sumatera Selatan.",
    relLink: "/tema/kuliner",
    relImg: "/images/sambal_tempoyak.jpg",
  },
  "kue-maksuba": {
    id: "kue-maksuba",
    title: "Kue Maksuba Palembang",
    subtitle: "Kudapan lapis bangsawan kesultanan yang kaya telur bebek, susu kental, dan aroma mentega",
    heroImg: "/images/kue_maksuba.jpg",
    sec1Title: "Kasta Tertinggi Kue Basah Kesultanan Palembang",
    sec1Desc:
      "Kue Maksuba adalah primadona dalam tradisi kuliner kesultanan Palembang Darussalam. Dibuat tanpa tepung gandum, adonannya murni mengandalkan puluhan butir telur bebek segar, gula pasir, mentega pilihan, dan susu kental manis yang menghasilkan lapisan emas kecokelatan yang sangat moist dan legit.",
    sec1Img: "/images/kue_maksuba.jpg",
    sec2Title: "Ketelitian Memanggang Lapis demi Lapis di Atas Loyang",
    sec2Desc:
      "Setiap lapis Maksuba dipanggang secara bertahap dengan api atas menggunakan oven tradisional. Dibutuhkan kesabaran berjam-jam untuk memastikan garis-garis gosong karamel alami terbentuk merata tanpa membuat tekstur kue menjadi kering.",
    sec2Img: "/images/kue_maksuba.jpg",
    sec3Title: "Hantaran Sakral Pernikahan & Hari Kemenangan",
    sec3Desc:
      "Dalam adat Palembang, Maksuba merupakan kue wajib yang dibawa pihak pengantin sebagai hantaran penghormatan tertinggi kepada orang tua dan mertua, serta menjadi suguhan kehormatan saat Hari Raya Idul Fitri.",
    sec3Img: "/images/songket_lepus.jpg",
    relCat: "KATEGORI KUDAPAN ISTANA",
    relTitle: "Kue Basah Tradisional Palembang",
    relDesc: "Kenali Kue Delapan Jam, Lapis Kojo pandan suji, dan Engkak Ketan panggang.",
    relLink: "/tema/kuliner",
    relImg: "/images/kue_maksuba.jpg",
  },
  "lapis-kojo-delapan-jam": {
    id: "lapis-kojo-delapan-jam",
    title: "Lapis Kojo & Kue Delapan Jam",
    subtitle: "Kesabaran pengukusan delapan jam tanpa henti demi tekstur legit karamel karomah",
    heroImg: "/images/kue_delapan_jam.jpg",
    sec1Title: "Kue Delapan Jam: Keajaiban Karamelisasi Telur Bebek",
    sec1Desc:
      "Dinamakan Kue Delapan Jam karena proses pengukusannya tepat memakan waktu delapan jam nonstop di atas dandang uap panas. Komposisi telur bebek, gula, dan susu perlahan berubah warna menjadi cokelat gelap kenyal bagaikan agar-agar padat beraroma wangi mendalam.",
    sec1Img: "/images/kue_delapan_jam.jpg",
    sec2Title: "Lapis Kojo: Wangi Daun Pandan & Suji Alami",
    sec2Desc:
      "Kojo berasal dari kata 'kamboja' merujuk pada bentuk cetakan aslinya. Kue ini memiliki warna hijau zamrud cerah dari perasan daun suji dan pandan wangi asli kampung yang dipadukan dengan santan kelapa kental.",
    sec2Img: "/images/kue_maksuba.jpg",
    sec3Title: "Filosofi Kesabaran dan Ketulusan Hati Jamuan",
    sec3Desc:
      "Menyajikan kue yang diproses selama delapan jam merupakan wujud pemuliaan tertinggi masyarakat Palembang terhadap tamu yang berkunjung ke rumah limas mereka.",
    sec3Img: "/images/rumah_limas.jpg",
    relCat: "KATEGORI KULINER TRADISIONAL",
    relTitle: "Warisan Kudapan Manis Sumsel",
    relDesc: "Jelajahi resep rahasia dapur bangsawan Palembang masa lampau.",
    relLink: "/tema/kuliner",
    relImg: "/images/kue_delapan_jam.jpg",
  },
  "mie-celor-laksan": {
    id: "mie-celor-laksan",
    title: "Mie Celor, Laksan & Celimpungan",
    subtitle: "Gurihnya kaldu santan kental udang galah sungai berpadu adonan ikan lembut kenyal",
    heroImg: "/images/mie_celor.jpg",
    sec1Title: "Mie Celor: Mi Tebal Siram Kaldu Udang Sungai Ebi",
    sec1Desc:
      "Mie Celor menyajikan mi kuning berukuran besar yang diseduh ('dicelor') dalam air mendidih bersama tauge segar, lalu diguyur kuah kental santan kaldu udang galah sungai bertabur irisan telur rebus, daun kucai, dan ebi sangrai renyah.",
    sec1Img: "/images/mie_celor.jpg",
    sec2Title: "Laksan: Potongan Ikan Kuah Santan Kari Gurih",
    sec2Desc:
      "Laksan dibuat dari pempek lenjer yang diiris melintang pipih, disajikan dalam siraman kuah santan kuning kemerahan yang gurih pedas mirip kuah lontong sayur bertabur bawang goreng wangi.",
    sec2Img: "/images/pempek_palembang.jpg",
    sec3Title: "Celimpungan: Bola Ikan Mengapung Kuah Kunyit Santan",
    sec3Desc:
      "Berbentuk bola-bola ikan tidak beraturan yang kenyal lembut, Celimpungan berenang dalam kuah santan kunyit kuning muda yang hangat di perut dan menjadi favorit warga saat sarapan pagi.",
    sec3Img: "/images/tekwan_palembang.jpg",
    relCat: "KATEGORI KULINER TRADISIONAL",
    relTitle: "Kuliner Kuah Santan Palembang",
    relDesc: "Nikmati aneka hidangan berkuah kaldu ikan dan udang sungai khas Palembang.",
    relLink: "/tema/kuliner",
    relImg: "/images/mie_celor.jpg",
  },
  "gandus-engkak-ketan": {
    id: "gandus-engkak-ketan",
    title: "Kue Gandus, Engkak Ketan & Bolu Koja",
    subtitle: "Ragam kue basah gurih tabur ebi dan kue ketan panggang manis tradisional",
    heroImg: "/images/pempek_palembang.jpg",
    sec1Title: "Kue Gandus: Lembutnya Tepung Beras Tabur Ebi Sangrai",
    sec1Desc:
      "Kue Gandus adalah kue talam gurih berbahan dasar tepung beras dan santan kental yang dikukus dalam cetakan bulat kecil. Permukaannya ditaburi ebi sangrai cincang, cabai merah iris, daun seledri segar, dan bawang merah goreng gurih.",
    sec1Img: "/images/pempek_palembang.jpg",
    sec2Title: "Engkak Ketan: Lapis Legit Gurih dari Santan & Tepung Ketan",
    sec2Desc:
      "Bertekstur lebih kenyal dibanding Maksuba, Engkak Ketan dibuat dari campuran tepung ketan putih dan santan kental yang dipanggang bertahap hingga menghasilkan lapisan kecokelatan yang harum mengilap.",
    sec2Img: "/images/kue_maksuba.jpg",
    sec3Title: "Kekayaan Cita Rasa Kudapan Pesisir dan Hulu",
    sec3Desc:
      "Keseimbangan antara kue manis legit dan kue asin gurih mencerminkan filosofi keseimbangan hidup masyarakat Melayu Sumatera Selatan.",
    sec3Img: "/images/rumah_limas.jpg",
    relCat: "KATEGORI KULINER TRADISIONAL",
    relTitle: "Kudapan Gurih & Manis Palembang",
    relDesc: "Telusuri aneka ragam jajanan pasar warisan tradisi tepian Musi.",
    relLink: "/tema/kuliner",
    relImg: "/images/pempek_palembang.jpg",
  },

  // --- KAIN & PAKAIAN ADAT ---
  "songket-palembang": {
    id: "songket-palembang",
    title: "Kain Songket Palembang",
    subtitle: "Kemilau emas peradaban maritim Sriwijaya dan kemegahan busana kesultanan",
    heroImg: "/images/songket_lepus.jpg",
    sec1Title: "Songket Lepus Emas: Kasta Tertinggi Tenun Keraton",
    sec1Desc:
      "Songket Lepus menduduki takhta tertinggi dalam seni tenun Palembang Darussalam. Kata 'lepus' bermakna merata tanpa celah, merujuk pada pengerjaan tenun benang emas murni pintalan cabutan yang menutupi seluruh bidang kain sutra merah marun.",
    sec1Img: "/images/songket_lepus.jpg",
    sec2Title: "Benang Emas Pintal Murni dari Jalur Niaga Laut",
    sec2Desc:
      "Benang emas yang didatangkan melalui jalur niaga maritim Sriwijaya dipadukan secara teliti dengan benang sutra alami. Proses penenunan satu helai kain songket lepus dapat memakan waktu hingga berbulan-bulan demi presisi geometris yang sempurna.",
    sec2Img: "/images/menenun_songket.jpg",
    sec3Title: "Simbolisme Mawar & Pucuk Rebung Tumpal",
    sec3Desc:
      "Motif Bunga Mawar melambangkan perlindungan batin dan tolak bala, sementara formasi Pucuk Rebung merepresentasikan aspirasi spiritual yang luhur dalam tata laku kehidupan kesultanan.",
    sec3Img: "/images/aesan_gede_banner.jpg",
    relCat: "KATEGORI BUSANA ADAT & KAIN",
    relTitle: "Kemegahan Busana Adat Palembang",
    relDesc: "Telusuri mahakarya busana Aesan Gede, Aesan Paksangko, dan warisan kebesaran Kesultanan.",
    relLink: "/tema/kain-pakaian",
    relImg: "/images/songket_lepus.jpg",
  },
  "aesan-gede": {
    id: "aesan-gede",
    title: "Aesan Gede: Busana Kebesaran",
    subtitle: "Pakaian adat pengantin lambang keagungan dan kemuliaan Kerajaan Sriwijaya",
    heroImg: "/images/aesan_gede_banner.jpg",
    sec1Title: "Mahkota Gandik Emas & Roncean Bunga Melati",
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
  "aesan-paksangko": {
    id: "aesan-paksangko",
    title: "Aesan Paksangko: Keanggunan Ningrat",
    subtitle: "Perpaduan akulturasi busana bangsawan Melayu dan ornamen mahkota tinggi keemasan",
    heroImg: "/images/aesan_paksangko.jpg",
    sec1Title: "Baju Kurung Beludru Bersulam Benang Emas",
    sec1Desc:
      "Berbeda dengan Aesan Gede yang bertelanjang dada dengan teratai, Aesan Paksangko mengenakan baju kurung beludru merah pekat atau ungu gelap yang disulam motif flora benang emas kawat, mencerminkan pengaruh adab Islam yang santun dan mulia.",
    sec1Img: "/images/aesan_paksangko.jpg",
    sec2Title: "Mahkota Paksangko Bertabur Bunga Goyang",
    sec2Desc:
      "Mempelai wanita mengenakan mahkota tinggi keemasan Paksangko yang dihiasi burung phoenix meliuk dan untaian bunga goyang yang bergetar lembut saat penari atau pengantin melangkah anggun.",
    sec2Img: "/images/aesan_paksangko.jpg",
    sec3Title: "Harmoni Budaya Maritim Sriwijaya",
    sec3Desc:
      "Aesan Paksangko menjadi bukti sejarah keterbukaan Palembang terhadap peradaban maritim dunia, memadukan unsur Tiongkok, Arab, dan tradisi lokal Melayu dalam sehelai pakaian sakral.",
    sec3Img: "/images/songket_lepus.jpg",
    relCat: "KATEGORI BUSANA ADAT & KAIN",
    relTitle: "Pakaian Adat & Kain Tenun",
    relDesc: "Kenali detail busana Aesan Gede dan koleksi songket keraton lainnya.",
    relLink: "/tema/kain-pakaian",
    relImg: "/images/aesan_paksangko.jpg",
  },
  "kain-jumputan": {
    id: "kain-jumputan",
    title: "Kain Jumputan (Kain Pelangi)",
    subtitle: "Teknik ikat celup sutra alami yang memancarkan spektrum warna cerah dan motif titik tujuh",
    heroImg: "/images/kain_jumputan.jpg",
    sec1Title: "Seni Ikat Celup Tradisional Palembang",
    sec1Desc:
      "Kain Jumputan atau Kain Pelangi Palembang dibuat melalui teknik mengikat bagian-bagian kain sutra menggunakan tali atau serat rafia sebelum dicelupkan ke dalam larutan pewarna alami secara bertahap, menciptakan pergradasi warna spektrum pelangi yang memukau.",
    sec1Img: "/images/kain_jumputan.jpg",
    sec2Title: "Ragam Motif Titik Tujuh & Bintik Permata",
    sec2Desc:
      "Ciri khas utama jumputan Palembang adalah motif 'titik tujuh' dan motif kembang cengkih yang membentuk pola belah ketupat simetris di atas bahan sutra halus yang jatuh dengan luwes di tubuh pemakainya.",
    sec2Img: "/images/kain_jumputan.jpg",
    sec3Title: "Busana Sehari-hari hingga Selendang Resepsi",
    sec3Desc:
      "Dahulu dikenakan oleh putri keraton sebagai selendang santai atau kemben pelapis, kini kain jumputan berkembang menjadi busana kontemporer bernilai estetika tinggi yang digemari hingga mancanegara.",
    sec3Img: "/images/songket_lepus.jpg",
    relCat: "KATEGORI KERAJINAN TEKSTIL",
    relTitle: "Kriya Tekstil Tradisional Sumsel",
    relDesc: "Telusuri seni Songket Lepus, Batik Palembang, dan kerajinan sulam benang emas.",
    relLink: "/tema/kain-pakaian",
    relImg: "/images/kain_jumputan.jpg",
  },
  "batik-palembang": {
    id: "batik-palembang",
    title: "Batik Palembang",
    subtitle: "Keindahan motif flora Lasem dan Sisik Ikan tanpa figur makhluk hidup beradab kesultanan",
    heroImg: "/images/batik_palembang.jpg",
    sec1Title: "Adab Seni Rupa Kesultanan Islam",
    sec1Desc:
      "Batik Palembang memiliki karakteristik unik yang membedakannya dari batik tanah Jawa. Mengikuti nilai ajaran Islam Kesultanan Palembang Darussalam, motif batik Palembang tidak pernah menampilkan gambar makhluk hidup bernyawa (hewan atau manusia), melainkan ornamen flora dan geometris.",
    sec1Img: "/images/batik_palembang.jpg",
    sec2Title: "Motif Lasem, Bunga Teh, & Sisik Ikan",
    sec2Desc:
      "Motif legendaris seperti Bunga Teh, Kembang Bakung, Kerak Mutung, dan Sisik Ikan digoreskan dengan canting lilin malam di atas kain katun primissima atau sutra dengan dominasi warna merah cabe, cokelat keemasan, dan hitam.",
    sec2Img: "/images/batik_palembang.jpg",
    sec3Title: "Pelestarian di Sentra Pengrajin Tepi Musi",
    sec3Desc:
      "Kawasan Seberang Ulu dan Kampung Tuan Kentang menjadi benteng pelestarian batik cap dan tulis Palembang yang terus berinovasi menghasilkan motif-motif anggun ramah lingkungan.",
    sec3Img: "/images/kain_jumputan.jpg",
    relCat: "KATEGORI BUSANA ADAT & KAIN",
    relTitle: "Pakaian Adat & Kain Tenun",
    relDesc: "Eksplorasi mahakarya tekstil Sumatera Selatan dari masa ke masa.",
    relLink: "/tema/kain-pakaian",
    relImg: "/images/batik_palembang.jpg",
  },
  "motif-bunga-mawar-rebung": {
    id: "motif-bunga-mawar-rebung",
    title: "Motif Bunga Mawar & Rebung",
    subtitle: "Simbol perlindungan batin, tolak bala, dan aspirasi spiritual luhur dalam wastra Palembang",
    heroImg: "/images/batik_palembang.jpg",
    sec1Title: "Motif Bunga Mawar: Doa Perlindungan Batin & Tolak Bala",
    sec1Desc:
      "Dalam filosofi ragam hias kain dan batik Palembang, motif Bunga Mawar (Bungo Mawar) digubah secara simetris dan anggun. Mawar melambangkan perisai batin, penangkal bala marabahaya, serta keharuman budi pekerti yang dijunjung tinggi oleh keluarga bangsawan Melayu Kesultanan.",
    sec1Img: "/images/batik_palembang.jpg",
    sec2Title: "Pucuk Rebung Tumpal: Aspirasi Spiritual Menjulang Luhur",
    sec2Desc:
      "Formasi segitiga Pucuk Rebung yang menghiasi tumpal dan kepala kain melambangkan tunas bambu muda yang terus tumbuh tegak lurus ke angkasa. Ragam ini merepresentasikan keteguhan tekad, cita-cita spiritual yang luhur menuju Sang Pencipta, serta kerendahan hati saat telah berada di puncak kesuksesan.",
    sec2Img: "/images/songket_lepus_1792383379080.jpg",
    sec3Title: "Keselarasan Kosmis pada Kelim & Pucuk Kain Wastra",
    sec3Desc:
      "Perpaduan motif Bunga Mawar pada badan kain dan Pucuk Rebung pada kelim tumpal menciptakan keselarasan estetika kosmis khas Palembang. Kehadirannya menyiratkan pesan luhur bahwa keteguhan prinsip hidup harus senantiasa diimbangi dengan kelembutan tutur kata dan perbuatan.",
    sec3Img: "/images/songket_lepus.jpg",
    relCat: "KATEGORI BUSANA ADAT & KAIN",
    relTitle: "Pakaian Adat & Kain Tenun",
    relDesc: "Telusuri keanggunan Songket Lepus Emas, Aesan Gede, Kain Jumputan, dan Batik Palembang.",
    relLink: "/tema/kain-pakaian",
    relImg: "/images/batik_palembang.jpg",
  },
  "motif-bunga-bintang": {
    id: "motif-bunga-bintang",
    title: "Motif Bunga Bintang Songket",
    subtitle: "Simbol panduan navigasi bahari Sriwijaya dan filosofi keteguhan batin penenun keraton",
    heroImg: "/images/songket_lepus.jpg",
    sec1Title: "Kompas Bintang di Langit Bahari Sriwijaya",
    sec1Desc:
      "Motif Bunga Bintang (Bungo Bintang) pada kain songket terinspirasi dari gugusan bintang malam yang dijadikan pedoman arah oleh para pelaut dan armada bahari Sriwijaya dalam mengarungi samudra menuju Selat Malaka.",
    sec1Img: "/images/songket_lepus.jpg",
    sec2Title: "Ketelitian Geometris Penuh Makna Batin",
    sec2Desc:
      "Setiap titik dan sudut bintang ditenun dengan hitungan lidi yang sangat presisi menggunakan benang emas cabutan murni. Bentuk bintang bersegi delapan melambangkan delapan penjuru mata angin serta keteguhan hati dalam memegang prinsip kebenaran.",
    sec2Img: "/images/menenun_songket.jpg",
    sec3Title: "Pusaka Agung Pelengkap Busana Kebesaran",
    sec3Desc:
      "Motif Bunga Bintang kerap dipadukan pada bagian pinggiran dan badan kain songket pengantin, memancarkan aura wibawa, kecerdasan kepemimpinan, dan harapan agar sang pemakai senantiasa menjadi penerang bagi lingkungannya.",
    sec3Img: "/images/aesan_gede_banner.jpg",
    relCat: "KATEGORI BUSANA ADAT & KAIN",
    relTitle: "Pakaian Adat & Kain Tenun",
    relDesc: "Kenali ragam motif Songket Lepus, Bunga Pacik, dan Aesan Gede.",
    relLink: "/tema/kain-pakaian",
    relImg: "/images/songket_lepus.jpg",
  },
  "celup-gambir": {
    id: "celup-gambir",
    title: "Proses Celup Alami Gambir & Sepang",
    subtitle: "Formulasi etnobotani getah gambir dan kayu secang penghasil rona merah marun abadi ratusan tahun",
    heroImg: "/images/menenun_songket.jpg",
    sec1Title: "Kearifan Etnobotani Pewarnaan Alami Melayu",
    sec1Desc:
      "Sebelum pewarna sintetis masuk ke Nusantara, para pengrajin kain Palembang memanfaatkan getah tanaman gambir (Uncaria gambir) dan serutan kayu secang (Caesalpinia sappan) yang direbus berjam-jam untuk menghasilkan ekstrak warna merah marun pekat yang meresap sempurna ke dalam serat sutra alami.",
    sec1Img: "/images/menenun_songket.jpg",
    sec2Title: "Teknik Penguncian Warna Menggunakan Jeruk Nipis & Tawas",
    sec2Desc:
      "Agar warna tidak mudah pudar oleh cahaya matahari dan air sungai, benang sutra yang telah dicelup difiksasi menggunakan air perasan jeruk nipis atau larutan tawas alami. Proses pengeringan dilakukan dengan diangin-anginkan di bawah rindang pohon tanpa kontak langsung terik matahari.",
    sec2Img: "/images/kain_jumputan.jpg",
    sec3Title: "Rona Merah Marun Lambang Kehormatan & Keabadian",
    sec3Desc:
      "Warna merah marun hasil celupan gambir dan secang memiliki ketahanan luar biasa hingga ratusan tahun, terlihat pada kain-kain songket kuno koleksi keraton yang warnanya tetap menyala anggun berdampingan dengan kilau benang emas murni.",
    sec3Img: "/images/songket_lepus_1792383379080.jpg",
    relCat: "KATEGORI KERAJINAN TEKSTIL",
    relTitle: "Kriya Tekstil Tradisional Sumsel",
    relDesc: "Pelajari teknik menenun gedogan, kain jumputan pelangi, dan batik Palembang.",
    relLink: "/tema/kain-pakaian",
    relImg: "/images/menenun_songket.jpg",
  },

  // --- TARI & MUSIK TRADISIONAL ---
  "tari-gending-sriwijaya": {
    id: "tari-gending-sriwijaya",
    title: "Tari Gending Sriwijaya",
    subtitle: "Tarian sakral kolosal pembawa tepak sekapur sirih penyambut tamu agung kenegaraan",
    heroImg: "/images/tari_gending.jpg",
    sec1Title: "Sekapur Sirih: Lambang Ketulusan Hati Masyarakat Melayu",
    sec1Desc:
      "Tari Gending Sriwijaya dibawakan sembilan penari dara berbusana Aesan Gede lengkap dengan mahkota keemasan. Salah satu penari membawa Tepak berisi sekapur sirih yang disuguhkan kepada tamu terhormat sebagai ikrar persahabatan tulus.",
    sec1Img: "/images/tari_gending.jpg",
    sec2Title: "Lentiknya Tanggai: Kuku Emas Penari Istana",
    sec2Desc:
      "Setiap jemari penari disematkan kuku tiruan melengkung dari lempengan tembaga bersepuh emas yang disebut tanggai. Gerakan tangan meliuk anggun mencerminkan kepatuhan, kelembutan, dan kehormatan wanita bangsawan.",
    sec2Img: "/images/tari_tanggai.jpg",
    sec3Title: "Alunan Melodi Gending Sriwijaya",
    sec3Desc:
      "Irama musik pengiring memadukan gamelan Melayu, akordeon, dan vokal bertutur yang menggambarkan kejayaan Kerajaan Sriwijaya sebagai pusat peradaban dan pengayom musafir samudra nusantara.",
    sec3Img: "/images/ampera_hero.jpg",
    relCat: "KATEGORI SENI PERTUNJUKAN",
    relTitle: "Tari & Musik Tradisional Sumsel",
    relDesc: "Telusuri Tari Tanggai, Erai-Erai, Kebagh, Setabik, dan Gitar Tunggal Batanghari Sembilan.",
    relLink: "/tema/tari-musik",
    relImg: "/images/tari_gending.jpg",
  },
  "tari-tanggai": {
    id: "tari-tanggai",
    title: "Tari Tanggai",
    subtitle: "Lentiknya sepuluh kuku keemasan menyambut tamu agung dengan keanggunan putri Sriwijaya",
    heroImg: "/images/tari_tanggai.jpg",
    sec1Title: "Simbol Kelembutan & Penghormatan Tamu",
    sec1Desc:
      "Tari Tanggai merupakan tarian penyambutan khas Palembang yang dibawakan lima hingga sembilan penari wanita. Tarian ini menyimbolkan keramahan, ketulusan budi, dan rasa hormat yang mendalam kepada setiap tamu yang menginjakkan kaki di bumi Sriwijaya.",
    sec1Img: "/images/tari_tanggai.jpg",
    sec2Title: "Ornamen Kuku Emas Tanggai & Baju Kurung Dodot",
    sec2Desc:
      "Keunikan paling ikonik terletak pada hiasan kuku palsu melengkung dari tembaga kuning keemasan (tanggai) yang disematkan di delapan jemari penari. Gerakan jemari lentik meliuk berpadu dengan busana kain songket dan kalung keemasan.",
    sec2Img: "/images/tari_tanggai.jpg",
    sec3Title: "Prosesi Mengulurkan Tepak Kuningan Berisi Sirih",
    sec3Desc:
      "Pada puncak tarian, penari utama membawakan tepak sirih kuningan dan mempersembahkannya kepada tamu kehormatan untuk dicicipi sebagai tanda ikatan kekeluargaan yang erat.",
    sec3Img: "/images/tari_gending.jpg",
    relCat: "KATEGORI SENI PERTUNJUKAN",
    relTitle: "Tari & Seni Tradisional",
    relDesc: "Pelajari ragam tarian penyambutan di berbagai kabupaten Sumatera Selatan.",
    relLink: "/tema/tari-musik",
    relImg: "/images/tari_tanggai.jpg",
  },
  "tari-erai-erai": {
    id: "tari-erai-erai",
    title: "Tari Erai-Erai",
    subtitle: "Keceriaan panen padi raya dan kebersamaan suku Lematang di persawahan",
    heroImg: "/images/tari_pasemah.jpg",
    sec1Title: "Ekspresi Syukur Panen Raya Suku Lematang",
    sec1Desc:
      "Tari Erai-Erai berasal dari suku Lematang di Kabupaten Lahat dan Muara Enim. Tarian ini lahir dari rasa syukur para petani saat melihat butiran padi yang menguning berderai-derai (erai-erai) di sawah siap dipanen bersama.",
    sec1Img: "/images/tari_pasemah.jpg",
    sec2Title: "Gerak Lincah Menumbuk Padi & Menganyam Bakul",
    sec2Desc:
      "Gerakan penari memperagakan aktivitas menuai padi, menampi beras dengan nyiru bambu, hingga gerakan menumbuk lesung kayu berirama dinamis yang diiringi tabuhan kenong dan gendang Melayu.",
    sec2Img: "/images/tari_pasemah.jpg",
    sec3Title: "Memupuk Gotong Royong Petani Pedalaman",
    sec3Desc:
      "Hingga kini, Tari Erai-Erai sering dipentaskan dalam pesta panen dan sedekah bumi sebagai pengingat nilai luhur gotong royong antarpetani pedesaan.",
    sec3Img: "/images/rumah_limas.jpg",
    relCat: "KATEGORI SENI PERTUNJUKAN",
    relTitle: "Tari Tradisional Nusantara",
    relDesc: "Saksikan tarian-tarian agraris khas suku Besemah dan Lematang.",
    relLink: "/tema/tari-musik",
    relImg: "/images/tari_pasemah.jpg",
  },
  "tari-kebagh": {
    id: "tari-kebagh",
    title: "Tari Kebagh (Gending Besemah)",
    subtitle: "Tarian sakral kuno dataran tinggi Besemah dengan kepakan tangan menyerupai burung",
    heroImg: "/images/tari_kebagh.jpg",
    sec1Title: "Warisan Sakral Pagaralam di Kaki Gunung Dempo",
    sec1Desc:
      "Tari Kebagh adalah tarian penyambutan paling kuno masyarakat Besemah di Kota Pagaralam. Tarian ini dahulu hanya dipentaskan untuk menyambut raja-raja dan pangeran agung yang bertandang ke dataran tinggi Pasemah.",
    sec1Img: "/images/tari_kebagh.jpg",
    sec2Title: "Gerakan Kepakan Sayap Burung di Alam Bebas",
    sec2Desc:
      "Kata 'kebagh' bermakna mengepakkan sayap. Gerakan tangan para penari merepresentasikan kebebasan dan keagungan burung elang yang melayang di angkasa sekitar lereng Gunung Dempo.",
    sec2Img: "/images/tari_kebagh.jpg",
    sec3Title: "Alunan Musik Kelintang Perunggu Pasemah",
    sec3Desc:
      "Diiringi instrumen kelintang perunggu berlaras slendro khas pedalaman, Tari Kebagh menghadirkan aura mistis yang menggetarkan sanubari para penikmat budaya.",
    sec3Img: "/images/tari_gending.jpg",
    relCat: "KATEGORI SENI PERTUNJUKAN",
    relTitle: "Tari Tradisional Sumsel",
    relDesc: "Eksplorasi seni budaya dataran tinggi Besemah dan megalitik Pasemah.",
    relLink: "/tema/tari-musik",
    relImg: "/images/tari_kebagh.jpg",
  },
  "tari-setabik": {
    id: "tari-setabik",
    title: "Tari Setabik Musi Banyuasin",
    subtitle: "Gerak tabik penghormatan dan prosesi persembahan sirih khas Sekayu",
    heroImg: "/images/tari_setabik.jpg",
    sec1Title: "Penghormatan Adat Musi Banyuasin",
    sec1Desc:
      "Tari Setabik adalah tarian kebesaran masyarakat Kabupaten Musi Banyuasin (Muba). Nama 'setabik' diambil dari kata 'tabik' yang berarti memberikan salam hormat takzim kepada para pembesar dan tamu kehormatan daerah.",
    sec1Img: "/images/tari_setabik.jpg",
    sec2Title: "Prosesi Menyuguhkan Daun Sirih Berkapur",
    sec2Desc:
      "Ciri khas tarian ini adalah prosesi penari membungkuk anggun sambil menyuguhkan daun sirih kapur pinang yang diambil dari wadah kuningan tepak keraton sebagai simbol ikrar kebaikan.",
    sec2Img: "/images/tari_setabik.jpg",
    sec3Title: "Iringan Gendang Melayu & Seruling Sungai",
    sec3Desc:
      "Alunan musik bertempo lambat dengan tiupan seruling mendayu melukiskan ketenangan riak aliran Sungai Musi yang membelah wilayah Sekayu.",
    sec3Img: "/images/musi_landscape.jpg",
    relCat: "KATEGORI SENI PERTUNJUKAN",
    relTitle: "Tari & Seni Tradisional",
    relDesc: "Pelajari tarian penyambutan resmi daerah Sumatera Selatan.",
    relLink: "/tema/tari-musik",
    relImg: "/images/aesan_paksangko.jpg",
  },
  "gitar-batanghari-sembilan": {
    id: "gitar-batanghari-sembilan",
    title: "Gitar Tunggal Batanghari Sembilan",
    subtitle: "Petikan dawai melankolis pengantar pantun petuah dan ratapan musafir sembilan sungai",
    heroImg: "/images/gitar_tunggal_batanghari.jpg",
    sec1Title: "Kearifan Seni Musik Sendirian di Beranda Panggung",
    sec1Desc:
      "Gitar Tunggal Batanghari Sembilan adalah seni musik dawai akustik yang dimainkan oleh satu orang musisi sambil melantunkan bait-bait pantun bersyair panjang. Musik ini lahir dari renungan para perantau di sepanjang sembilan anak sungai Musi.",
    sec1Img: "/images/gitar_tunggal_batanghari.jpg",
    sec2Title: "Ciri Khas Tala Kelingking & Petikan Berirama Melayu",
    sec2Desc:
      "Menggunakan tala nada khusus di mana senar gitar disetel unik (stem kelingking atau stem sarang burung), petikan menghasilkan nada melankolis mendayu-dayu yang menyayat hati penonton.",
    sec2Img: "/images/lagu_daerah_sumsel.jpg",
    sec3Title: "Penyampai Pesan Moral, Asmara, & Nasihat Orang Tua",
    sec3Desc:
      "Syair-syair yang dilantunkan berisi petuah tentang budi pekerti, nasihat perantauan, hingga kepasrahan manusia terhadap takdir Illahi dalam menghadapi liku kehidupan.",
    sec3Img: "/images/tembang_batanghari_sembilan.jpg",
    relCat: "KATEGORI MUSIK TRADISIONAL",
    relTitle: "Tradisi Dawai Batanghari",
    relDesc: "Dengarkan alunan Tembang Batanghari Sembilan dan seni tutur Senjang.",
    relLink: "/tema/tari-musik",
    relImg: "/images/gitar_tunggal_batanghari.jpg",
  },
  "burdah-terbangan": {
    id: "burdah-terbangan",
    title: "Burdah / Terbangan",
    subtitle: "Gema rebana besar kayu nangka pengiring zikir dan qasidah pujian islami",
    heroImg: "/images/rebana_burdah.jpg",
    sec1Title: "Akulturasi Seni Islam Melayu Palembang",
    sec1Desc:
      "Burdah atau Terbangan adalah kesenian perkusi rebana berdiameter besar (hingga 50 cm) berbahan kayu nangka tua dan membran kulit kambing pilihan. Kesenian ini mengiringi pembacaan bait-bait Qasidah Burdah karya Imam Al-Bushiri.",
    sec1Img: "/images/rebana_burdah.jpg",
    sec2Title: "Tabuhan Dinamis Bersahut-sahutan",
    sec2Desc:
      "Dimainkan oleh belasan pria bersarung dan berpeci hitam, tabuhan rebana dibagi menjadi pola pukulan dasar, peningkah, dan penganak yang menghasilkan harmoni ritmis yang menggetarkan dada.",
    sec2Img: "/images/rebana_burdah.jpg",
    sec3Title: "Tradisi Arak-Arakan Pengantin & Khitanan",
    sec3Desc:
      "Kesenian Burdah mengiringi pengantin pria saat melangkah menuju rumah mempelai wanita, menyebarkan suasana religius dan kegembiraan syiar Islam di perkampungan.",
    sec3Img: "/images/aesan_gede_banner.jpg",
    relCat: "KATEGORI MUSIK TRADISIONAL",
    relTitle: "Musik Islami Sumatera Selatan",
    relDesc: "Jelajahi seni hadrah, zikir samman, dan qasidah tradisional Palembang.",
    relLink: "/tema/tari-musik",
    relImg: "/images/rebana_burdah.jpg",
  },
  "kenong-basemah": {
    id: "kenong-basemah",
    title: "Kenong Basemah / Kelintang",
    subtitle: "Laras nada gong perunggu purba pengiring upacara adat di lereng Gunung Dempo",
    heroImg: "/images/ghumah_baghi.jpg",
    sec1Title: "Gamelan Perunggu Dataran Tinggi Besemah",
    sec1Desc:
      "Kenong Basemah atau Kelintang adalah ansambel instrumen idiofon perunggu yang disusun berjajar di atas rancakan kayu berukir. Alat musik ini telah dimainkan sejak zaman megalitikum di kawasan Pagaralam dan Lahat.",
    sec1Img: "/images/ghumah_baghi.jpg",
    sec2Title: "Tangga Nada Pentatonik Alami Pedalaman",
    sec2Desc:
      "Dipukul menggunakan stik kayu berbalut kain, kelintang menghasilkan tangga nada pentatonik bersuara jernih berdenting yang berpadu dengan tabuhan gong besar dan gendang panjang.",
    sec2Img: "/images/ghumah_baghi.jpg",
    sec3Title: "Pengiring Sakral Upacara Sedekah Rame",
    sec3Desc:
      "Kelintang wajib dibunyikan saat upacara adat Sedekah Rame dan perkawinan adat Pasemah sebagai tanda pemberitahuan kepada seluruh warga dusun.",
    sec3Img: "/images/tari_gending.jpg",
    relCat: "KATEGORI MUSIK TRADISIONAL",
    relTitle: "Alat Musik Tradisional Sumsel",
    relDesc: "Kenali aneka instrumen musik kuno warisan peradaban megalitik.",
    relLink: "/tema/tari-musik",
    relImg: "/images/ghumah_baghi.jpg",
  },
  "lagu-daerah-sumsel": {
    id: "lagu-daerah-sumsel",
    title: "Lagu Daerah Sumatera Selatan",
    subtitle: "Untaian kidung rakyat Dek Sangke, Cuk Mak Ilang, hingga Ribang Kemambang",
    heroImg: "/images/ampera_hero.jpg",
    sec1Title: "Dek Sangke & Cuk Mak Ilang: Cermin Jenaka & Asmara",
    sec1Desc:
      "Lagu daerah Sumsel memiliki keanekaragaman tema. 'Dek Sangke' mengisahkan sindiran halus jenaka tentang janji yang tak ditepati, sementara 'Cuk Mak Ilang' bernada riang menggambarkan tebak-tebakan asmara muda-mudi di tepian Musi.",
    sec1Img: "/images/ampera_hero.jpg",
    sec2Title: "Ribang Kemambang & Sayang Selayak: Kerinduan Dusun",
    sec2Desc:
      "Dari wilayah Lahat dan Pagaralam lahir lagu 'Ribang Kemambang' dan 'Sayang Selayak' yang sarat kepedihan perpisahan dan kerinduan mendalam terhadap kampung halaman dan sanak saudara.",
    sec2Img: "/images/rumah_limas.jpg",
    sec3Title: "Warisan Nada yang Dinyanyikan Lintas Generasi",
    sec3Desc:
      "Kidung-kidung ini terus diajarkan di sekolah-sekolah dan dinyanyikan dalam festival kesenian daerah untuk mempererat tali persaudaraan antarwarga Sumatera Selatan.",
    sec3Img: "/images/tari_gending.jpg",
    relCat: "KATEGORI SENI PERTUNJUKAN",
    relTitle: "Karya Musik Tradisional",
    relDesc: "Pelajari syair dan partitur lagu-lagu rakyat Sumatera Selatan.",
    relLink: "/tema/tari-musik",
    relImg: "/images/ampera_hero.jpg",
  },
  "tari-begambo": {
    id: "tari-begambo",
    title: "Tari Begambo",
    subtitle: "Dinamika gerak petani Dusun Toman memetik dan mengolah getah daun gambir",
    heroImg: "/images/menenun_songket.jpg",
    sec1Title: "Kearifan Budaya Dusun Toman Musi Banyuasin",
    sec1Desc:
      "Tari Begambo diangkat dari tradisi masyarakat Dusun Toman di Kabupaten Musi Banyuasin yang sejak ratusan tahun silam menggantungkan hidup pada budidaya dan pengolahan getah tanaman gambir.",
    sec1Img: "/images/menenun_songket.jpg",
    sec2Title: "Eksplorasi Gerak Menuai & Mengempa Daun Gambir",
    sec2Desc:
      "Gerakan penari memperagakan proses memetik daun gambir, merebus, memeras getahnya, hingga mencetaknya menjadi kepingan obat tradisional dan bahan campuran menyirih.",
    sec2Img: "/images/menenun_songket.jpg",
    sec3Title: "Pewarna Alami Kain Jumputan Tradisional",
    sec3Desc:
      "Gambir Toman juga merupakan bahan baku pewarna cokelat alami legendaris yang dipakai dalam seni celup kain jumputan dan batik Palembang.",
    sec3Img: "/images/kain_jumputan.jpg",
    relCat: "KATEGORI SENI PERTUNJUKAN",
    relTitle: "Tari Tradisional Nusantara",
    relDesc: "Saksikan tarian-tarian kreasi berbasis kearifan agrikultur Sumsel.",
    relLink: "/tema/tari-musik",
    relImg: "/images/menenun_songket.jpg",
  },
  "tari-tepak-keraton": {
    id: "tari-tepak-keraton",
    title: "Tari Tepak Keraton",
    subtitle: "Rekonstruksi tata gerak ningrat Kesultanan Palembang Darussalam",
    heroImg: "/images/aesan_gede_banner.jpg",
    sec1Title: "Kelahiran Seni Tari Keraton 1966",
    sec1Desc:
      "Diciptakan pada tahun 1966 oleh para pakar tari Palembang, Tari Tepak Keraton terinspirasi langsung dari etiket sopan santun putri-putri keraton Kesultanan Palembang Darussalam saat menyambut utusan kerajaan sahabat.",
    sec1Img: "/images/aesan_gede_banner.jpg",
    sec2Title: "Kemegahan Kostum Songket Sutra Merah Emas",
    sec2Desc:
      "Para penari mengenakan baju kurung sutra bertabur benang emas kawat, kain songket lepus, dan pending emas di pinggang dengan gerakan tangan yang sangat halus dan terukur.",
    sec2Img: "/images/aesan_gede_banner.jpg",
    sec3Title: "Penghormatan Luhur di Istana Budaya",
    sec3Desc:
      "Tarian ini menjadi standar protokol penyambutan tamu kenegaraan di Sumatera Selatan, menjaga keagungan tata krama istana Melayu Palembang.",
    sec3Img: "/images/tari_gending.jpg",
    relCat: "KATEGORI SENI PERTUNJUKAN",
    relTitle: "Tari Tradisional Sumsel",
    relDesc: "Eksplorasi tari-tari ningrat warisan Kesultanan Palembang.",
    relLink: "/tema/tari-musik",
    relImg: "/images/aesan_gede_banner.jpg",
  },
  "tari-bujang-gadis-beladas": {
    id: "tari-bujang-gadis-beladas",
    title: "Tari Bujang Gadis Beladas",
    subtitle: "Kelincahan dan semangat riang pergaulan muda-mudi Ogan Ilir",
    heroImg: "/images/kain_jumputan.jpg",
    sec1Title: "Semangat Muda Masyarakat Ogan Ilir",
    sec1Desc:
      "Kata 'beladas' dalam bahasa tutur lokal berarti gesit, lincah, dan penuh semangat ceria. Tarian ini melukiskan dinamika pergaulan pemuda dan pemudi di tepian Sungai Ogan.",
    sec1Img: "/images/kain_jumputan.jpg",
    sec2Title: "Koreografi Dinamis Pasangan Pemuda-Pemudi",
    sec2Desc:
      "Dibawakan secara berpasangan dengan tempo musik rancak, para penari memperlihatkan keceriaan saling melempar senyum dan gerak langkah kaki yang serempak memikat.",
    sec2Img: "/images/kain_jumputan.jpg",
    sec3Title: "Media Silaturahmi Antardusun",
    sec3Desc:
      "Tarian ini menjadi sarana hiburan favorit dalam perayaan hari ulang tahun daerah dan pesta rakyat di seluruh pelosok Ogan Ilir.",
    sec3Img: "/images/ampera_hero.jpg",
    relCat: "KATEGORI SENI PERTUNJUKAN",
    relTitle: "Tari Pergaulan Rakyat",
    relDesc: "Ketahui tarian-tarian rakyat muda-mudi Sumatera Selatan.",
    relLink: "/tema/tari-musik",
    relImg: "/images/kain_jumputan.jpg",
  },

  // --- RUMAH ADAT ---
  "rumah-limas": {
    id: "rumah-limas",
    title: "Rumah Limas Palembang",
    subtitle: "Rumah panggung beratap limas berundak, penanda status sosial dan kearifan arsitektur tepi sungai",
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
    relDesc: "Jelajahi Rumah Rakit di tepian Musi, Rumah Ulu pegunungan Besemah, dan Rumah Cara Gudang.",
    relLink: "/tema/rumah-adat",
    relImg: "/images/rumah_limas.jpg",
  },
  "rumah-rakit": {
    id: "rumah-rakit",
    title: "Rumah Rakit Sungai Musi",
    subtitle: "Hunian terapung di atas gelondongan bambu saksi sejarah peradaban niaga air Palembang",
    heroImg: "/images/rumah_rakit.jpg",
    sec1Title: "Tradisi Hidup di Atas Air Sejak Zaman Sriwijaya",
    sec1Desc:
      "Rumah Rakit adalah tipe rumah tertua di Palembang yang terapung langsung di permukaan Sungai Musi. Pada masa Kesultanan, warga asing (pedagang Tionghoa, Arab, dan Eropa) diwajibkan tinggal di atas rumah rakit di sepanjang tepi sungai.",
    sec1Img: "/images/rumah_rakit.jpg",
    sec2Title: "Fondasi Ratusan Batang Bambu & Kayu Tembesu",
    sec2Desc:
      "Struktur rumah ditopang oleh ratusan batang bambu besar yang diikat kawat baja dan gelondongan kayu tahan air. Rumah diikat dengan tali tambang besar ke tonggak pasak di daratan agar tidak hanyut terbawa arus.",
    sec2Img: "/images/rumah_rakit.jpg",
    sec3Title: "Sentra Niaga dan Gaya Hidup Ramah Pasang Surut",
    sec3Desc:
      "Rumah Rakit fleksibel terhadap pasang surut air sungai. Di bagian depan terdapat dermaga kecil tempat bersandar perahu ketek pedagang sayur dan ikan segar.",
    sec3Img: "/images/perahu_ketek.jpg",
    relCat: "KATEGORI ARSITEKTUR BUDAYA",
    relTitle: "Arsitektur Vernakular Air",
    relDesc: "Pelajari kearifan arsitektur air suku Melayu Musi.",
    relLink: "/tema/rumah-adat",
    relImg: "/images/rumah_rakit.jpg",
  },
  "rumah-ulu": {
    id: "rumah-ulu",
    title: "Rumah Ulu Pegunungan",
    subtitle: "Struktur panggung tiang ulak-ulak di dataran hulu yang lentur terhadap guncangan gempa",
    heroImg: "/images/rumah_ulu.jpg",
    sec1Title: "Kearifan Arsitektur Tahan Gempa Pedalaman",
    sec1Desc:
      "Rumah Ulu adalah rumah adat masyarakat yang bermukim di daerah hulu sungai (seperti Ogan, Enim, dan Komering). Rumah panggung tinggi ini dirancang khusus untuk menghadapi gempa bumi tektonik bukit barisan.",
    sec1Img: "/images/rumah_ulu.jpg",
    sec2Title: "Sistem Konstruksi Sendi Tiang Ulak-Ulak",
    sec2Desc:
      "Tiang-tiang penyangga tidak ditanam ke dalam tanah melainkan bertumpu di atas umpak batu besar dengan sistem pasak kayu fleksibel ('ulak-ulak') yang memungkinkan bangunan bergoyang lentur tanpa roboh saat tanah bergetar.",
    sec2Img: "/images/rumah_ulu.jpg",
    sec3Title: "Tata Ruang Garang & Balai Musyawarah",
    sec3Desc:
      "Bagian depan memiliki teras berpagar yang disebut 'garang' tempat mencuci kaki dan menyambut tetangga, sementara bagian dalam luas tanpa sekat untuk musyawarah keluarga besar.",
    sec3Img: "/images/rumah_limas.jpg",
    relCat: "KATEGORI ARSITEKTUR BUDAYA",
    relTitle: "Rumah Adat Vernakular Sumsel",
    relDesc: "Kenali keunikan arsitektur suku Besemah dan Komering.",
    relLink: "/tema/rumah-adat",
    relImg: "/images/rumah_ulu.jpg",
  },
  "rumah-cara-gudang": {
    id: "rumah-cara-gudang",
    title: "Rumah Cara Gudang",
    subtitle: "Kesederhanaan rumah panggung memanjang beratap pelana bagi masyarakat bersahaja",
    heroImg: "/images/rumah_limas.jpg",
    sec1Title: "Arsitektur Rakyat Bersahaja Tepi Sungai",
    sec1Desc:
      "Rumah Cara Gudang adalah rumah panggung kayu memanjang beratap pelana sederhana tanpa lantai undakan (bengkilas). Rumah ini lazim dihuni oleh masyarakat biasa dan para saudagar pedagang di pinggiran Palembang.",
    sec1Img: "/images/rumah_limas.jpg",
    sec2Title: "Struktur Kayu Rengas & Ruang Bawah Lapang",
    sec2Desc:
      "Dibangun menggunakan kayu rengas dan tembesu, ruang bawah panggungnya yang lapang sering digunakan sebagai lumbung perahu, bengkel pertukangan, atau tempat menenun kain songket.",
    sec2Img: "/images/menenun_songket.jpg",
    sec3Title: "Kehangatan Komunitas Kampung Tepi Sungai",
    sec3Desc:
      "Bentuknya yang memanjang memudahkan sirkulasi udara tropis yang sejuk dari hembusan angin sungai, menciptakan hunian yang nyaman dan ramah lingkungan.",
    sec3Img: "/images/perahu_ketek.jpg",
    relCat: "KATEGORI ARSITEKTUR BUDAYA",
    relTitle: "Arsitektur Tradisional Sumsel",
    relDesc: "Pelajari tipe-tipe hunian panggung di Sumatera Selatan.",
    relLink: "/tema/rumah-adat",
    relImg: "/images/rumah_limas.jpg",
  },
  "ghumah-baghi": {
    id: "ghumah-baghi",
    title: "Ghumah Baghi (Rumah Adat Pasemah)",
    subtitle: "Rumah panggung suku Besemah di atas batu umpak bertatah ukiran purba flora",
    heroImg: "/images/ghumah_baghi.jpg",
    sec1Title: "Peninggalan Arsitektur Megalitik Pagaralam",
    sec1Desc:
      "Ghumah Baghi (Rumah Tua) adalah rumah panggung adat suku Besemah di dataran tinggi Pagaralam. Tiang-tiang kayunya yang bulat diletakkan begitu saja di atas batu umpak alam tanpa ditanam, menjadikannya sangat tahan gempa.",
    sec1Img: "/images/ghumah_baghi.jpg",
    sec2Title: "Variasi Rumah Tatahan Bertatahkan Relief Flora",
    sec2Desc:
      "Terdapat dua jenis: Ghumah Kingking (polos tanpa ukiran) dan Ghumah Tatahan yang seluruh dinding kayunya dipahat motif flora geometris purba menggunakan pahat tradisional ('tatah').",
    sec2Img: "/images/ghumah_baghi.jpg",
    sec3Title: "Atap Ijuk Melengkung Mirip Tanduk Kerbau",
    sec3Desc:
      "Atapnya yang tinggi terbuat dari ijuk pohon enau yang melengkung aerodinamis menahan angin kencang pegunungan di sekitar lereng Gunung Dempo.",
    sec3Img: "/images/megalitik_pasemah.jpg",
    relCat: "KATEGORI ARSITEKTUR BUDAYA",
    relTitle: "Rumah Adat Tradisional",
    relDesc: "Eksplorasi jejak peradaban megalitik Pasemah dan Pagaralam.",
    relLink: "/tema/rumah-adat",
    relImg: "/images/ghumah_baghi.jpg",
  },
  "rumah-kilapan": {
    id: "rumah-kilapan",
    title: "Rumah Kilapan",
    subtitle: "Dinding kayu mulus hasil ketaman tangan tanpa ukiran bergaya minimalis purba",
    heroImg: "/images/megalitik_pasemah.jpg",
    sec1Title: "Varian Bersahaja Arsitektur Pasemah",
    sec1Desc:
      "Rumah Kilapan adalah salah satu ragam hunian tradisional suku Besemah di mana seluruh papan dinding kayunya dihaluskan menggunakan bilah ketam hingga licin mengilap (kilap) tanpa diberi ornamen ukiran.",
    sec1Img: "/images/megalitik_pasemah.jpg",
    sec2Title: "Keindahan Serat Kayu Alami Tembesu",
    sec2Desc:
      "Keanggunan rumah ini justru terpancar dari kilauan serat kayu keras alami tembesu dan cempaka yang kokoh bertahan selama ratusan tahun tanpa dimakan rayap.",
    sec2Img: "/images/megalitik_pasemah.jpg",
    sec3Title: "Warisan Ketahanan Kayu Abad Silam",
    sec3Desc:
      "Beberapa unit Rumah Kilapan yang berusia lebih dari 200 tahun masih kokoh berdiri di dusun-dusun tua Pagaralam, menjadi saksi bisu keahlian pertukangan kayu leluhur.",
    sec3Img: "/images/ghumah_baghi.jpg",
    relCat: "KATEGORI ARSITEKTUR BUDAYA",
    relTitle: "Rumah Adat Vernakular Sumsel",
    relDesc: "Kunjungi rumah-rumah bersejarah di dataran tinggi Besemah.",
    relLink: "/tema/rumah-adat",
    relImg: "/images/megalitik_pasemah.jpg",
  },

  // --- BAHASA & AKSARA DAERAH ---
  "aksara-ulu": {
    id: "aksara-ulu",
    title: "Aksara Ulu (Surat Ulu / Kaganga)",
    subtitle: "Tradisi tulis kuno abugida masyarakat pedalaman Sumatera Selatan pada bilah bambu",
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
  "bahasa-melayu-palembang": {
    id: "bahasa-melayu-palembang",
    title: "Bahasa Melayu Palembang",
    subtitle: "Lingua franca metropolitan dengan tingkatan Bahasa Alus ningrat dan Bahasa Sari-Sari",
    heroImg: "/images/musi_landscape.jpg",
    sec1Title: "Bahasa Alus Keraton vs Bahasa Sari-Sari",
    sec1Desc:
      "Bahasa Melayu Palembang terbagi dua tingkatan: 'Baso Palembang Alus' yang digunakan dalam lingkungan bangsawan dan adat dengan pengaruh kosakata Jawa Kuno dan Sanskerta, serta 'Baso Sari-Sari' yang digunakan sehari-hari di pasar dan jalanan dengan ciri khas akhiran huruf 'o'.",
    sec1Img: "/images/musi_landscape.jpg",
    sec2Title: "Ciri Khas Fonologi Vokal 'O' & Kosakata Khas",
    sec2Desc:
      "Kata-kata berakhiran 'a' dalam bahasa Melayu umum berubah menjadi 'o' (apa -> apo, ke mana -> ke mano). Kosakata unik seperti 'katek' (tidak ada), 'beladas' (bersenang-senang), dan 'nemen' (rajin/sering) memperkaya dialek ini.",
    sec2Img: "/images/musi_landscape.jpg",
    sec3Title: "Pemersatu Suku-Suku di Sepanjang Sungai Musi",
    sec3Desc:
      "Sebagai bahasa perdagangan sejak masa Kesultanan, Bahasa Palembang dipahami oleh hampir seluruh penduduk Sumatera Selatan dari hulu hingga hilir.",
    sec3Img: "/images/ampera_hero.jpg",
    relCat: "KATEGORI BAHASA & AKSARA",
    relTitle: "Dialek & Bahasa Daerah Sumsel",
    relDesc: "Pelajari keragaman bahasa di sepanjang sembilan anak sungai Musi.",
    relLink: "/tema/bahasa-aksara",
    relImg: "/images/musi_landscape.jpg",
  },
  "bahasa-komering": {
    id: "bahasa-komering",
    title: "Bahasa Komering",
    subtitle: "Kekayaan kosakata kekerabatan dan intonasi bergelombang masyarakat OKU Timur",
    heroImg: "/images/komering_culture.jpg",
    sec1Title: "Bahasa Berkeluarga Erat dengan Rumpun Lampung",
    sec1Desc:
      "Bahasa Komering dituturkan oleh masyarakat suku Komering di sepanjang aliran Way Komering (OKU Timur, OKU Selatan, dan OKI). Secara linguistik, bahasa ini berkerabat dekat dengan rumpun bahasa Lampung Api.",
    sec1Img: "/images/komering_culture.jpg",
    sec2Title: "Sistem Fonetik Berakhiran Vokal Jelas & Dialek Hulu-Hilir",
    sec2Desc:
      "Berbeda dari bahasa Palembang berakhiran 'o', bahasa Komering mempertahankan vokal 'a' dan 'i' terbuka yang tegas. Terdapat dialek Komering Ilir dan Komering Ulu dengan variasi kosakata kekerabatan yang sangat detail.",
    sec2Img: "/images/komering_culture.jpg",
    sec3Title: "Pelestarian Sastra Lisan & Piil Pesenggiri",
    sec3Desc:
      "Nilai harga diri dan kehormatan keluarga (Piil Pesenggiri) diwariskan secara lisan melalui bahasa Komering dalam upacara lamaran dan petuah tetua adat.",
    sec3Img: "/images/rumah_ulu.jpg",
    relCat: "KATEGORI BAHASA & AKSARA",
    relTitle: "Bahasa Daerah Sumatera Selatan",
    relDesc: "Kenali ragam bahasa Komering, Ogan, dan Lematang.",
    relLink: "/tema/bahasa-aksara",
    relImg: "/images/komering_culture.jpg",
  },
  "bahasa-lematang": {
    id: "bahasa-lematang",
    title: "Bahasa Lematang",
    subtitle: "Dialek khas tepian Sungai Lematang dengan intonasi dinamis Lahat dan Muara Enim",
    heroImg: "/images/tari_pasemah.jpg",
    sec1Title: "Bahasa Aliran Sungai Lematang",
    sec1Desc:
      "Bahasa Lematang dituturkan oleh masyarakat di sepanjang lembah Sungai Lematang yang melintasi Kabupaten Lahat dan Muara Enim. Bahasa ini memiliki intonasi bicara yang bertenaga dan penuh kehangatan persaudaraan.",
    sec1Img: "/images/tari_pasemah.jpg",
    sec2Title: "Ciri Khas Morfologi & Idiom Kearifan Hutan",
    sec2Desc:
      "Kaya akan kosakata agraris persawahan dan perbukitan, bahasa Lematang menyimpan ratusan peribahasa tentang menjaga kelestarian hutan adat dan sumber mata air pegunungan.",
    sec2Img: "/images/tari_pasemah.jpg",
    sec3Title: "Pengantar Tembang Pantun & Tari Erai-Erai",
    sec3Desc:
      "Bahasa ini menjadi media utama dalam melantunkan syair-syair lagu panen raya dan tari Erai-Erai yang menghubungkan masa lalu dengan generasi masa kini.",
    sec3Img: "/images/tari_gending.jpg",
    relCat: "KATEGORI BAHASA & AKSARA",
    relTitle: "Bahasa & Dialek Pedalaman",
    relDesc: "Pelajari dialek Lematang, Enim, dan Semende.",
    relLink: "/tema/bahasa-aksara",
    relImg: "/images/tari_pasemah.jpg",
  },
  "bahasa-ogan": {
    id: "bahasa-ogan",
    title: "Bahasa Ogan",
    subtitle: "Dialek lembut bersahaja di sepanjang aliran Sungai Ogan (Ogan Ilir & OKU)",
    heroImg: "/images/perahu_ketek.jpg",
    sec1Title: "Tutur Lembut Masyarakat Tepian Ogan",
    sec1Desc:
      "Bahasa Ogan digunakan oleh suku Ogan di Kabupaten Ogan Komering Ulu (OKU) dan Ogan Ilir. Dikenal dengan intonasi tuturnya yang lembut, tenang, dan bersahabat.",
    sec1Img: "/images/perahu_ketek.jpg",
    sec2Title: "Variasi Fonem & Pantun Nasihat Dusun",
    sec2Desc:
      "Memiliki sistem pantun berbalas yang kaya, bahasa Ogan kerap menggunakan perumpamaan tanaman rawa dan ikan sungai untuk menyampaikan nasihat sopan santun kepada generasi muda.",
    sec2Img: "/images/perahu_ketek.jpg",
    sec3Title: "Merawat Identitas Budaya Lokal",
    sec3Desc:
      "Meskipun dekat dengan pusat kota Palembang, masyarakat Ogan bangga menggunakan bahasa ibunya dalam forum adat dan pertemuan keluarga besar.",
    sec3Img: "/images/ampera_hero.jpg",
    relCat: "KATEGORI BAHASA & AKSARA",
    relTitle: "Bahasa Daerah Sumsel",
    relDesc: "Eksplorasi bahasa Ogan, Pedamaran, dan Kayu Agung.",
    relLink: "/tema/bahasa-aksara",
    relImg: "/images/perahu_ketek.jpg",
  },
  "bahasa-kayu-agung": {
    id: "bahasa-kayu-agung",
    title: "Bahasa Kayu Agung",
    subtitle: "Bahasa unik dengan fonologi mencolok yang dituturkan di wilayah ibukota OKI",
    heroImg: "/images/menenun_songket.jpg",
    sec1Title: "Keunikan Fonologi Terisolasi di Tengah Melayu",
    sec1Desc:
      "Bahasa Kayu Agung dituturkan oleh warga asli Kota Kayu Agung di Kabupaten Ogan Komering Ilir. Bahasa ini memiliki perbedaan fonologis dan leksikal yang sangat mencolok dari bahasa Melayu Palembang di sekitarnya.",
    sec1Img: "/images/menenun_songket.jpg",
    sec2Title: "Tingkatan Tutur Morga Kayu Agung",
    sec2Desc:
      "Memiliki kosakata khusus yang tidak ditemukan dalam bahasa lain di Sumatera Selatan, bahasa ini mencerminkan struktur sosial marga kuno yang menjunjung tinggi adat istiadat perkawinan.",
    sec2Img: "/images/menenun_songket.jpg",
    sec3Title: "Warisan Kebanggaan Masyarakat OKI",
    sec3Desc:
      "Kini bahasa Kayu Agung terus didokumentasikan dalam kamus daerah dan diajarkan kepada anak-anak agar tidak tergerus arus modernisasi.",
    sec3Img: "/images/rumah_limas.jpg",
    relCat: "KATEGORI BAHASA & AKSARA",
    relTitle: "Bahasa Unik Sumatera Selatan",
    relDesc: "Kenali keanekaragaman linguistik daerah pesisir timur Sumsel.",
    relLink: "/tema/bahasa-aksara",
    relImg: "/images/menenun_songket.jpg",
  },
  "bahasa-pedamaran": {
    id: "bahasa-pedamaran",
    title: "Bahasa Pedamaran",
    subtitle: "Tutur khas masyarakat rawa gambut Pedamaran yang sarat kearifan ekologis",
    heroImg: "/images/purun_pedamaran.jpg",
    sec1Title: "Bahasa Kaum Rawa Gambut Terluas",
    sec1Desc:
      "Bahasa Pedamaran dituturkan oleh masyarakat di Kecamatan Pedamaran, OKI, wilayah yang dikelilingi rawa gambut dan danau lebak lebung. Bahasa ini mencerminkan adaptasi ekologis masyarakat pembuat tikar purun.",
    sec1Img: "/images/purun_pedamaran.jpg",
    sec2Title: "Kosakata Khusus Budidaya Purun & Perikanan Rawa",
    sec2Desc:
      "Memiliki istilah-istilah unik mengenai fase pertumbuhan tanaman purun, teknik penangkapan ikan lebak, dan musim pasang rawa yang tidak ada padanannya dalam bahasa Indonesia.",
    sec2Img: "/images/purun_pedamaran.jpg",
    sec3Title: "Pelestarian Kearifan Lahan Basah",
    sec3Desc:
      "Melalui bahasa Pedamaran, generasi muda diajarkan pentingnya menjaga ekosistem lahan gambut dari kebakaran dan kerusakan lingkungan.",
    sec3Img: "/images/aksara_ulu.jpg",
    relCat: "KATEGORI BAHASA & AKSARA",
    relTitle: "Bahasa Ekologis Nusantara",
    relDesc: "Pelajari kearifan masyarakat rawa gambut Sumatera Selatan.",
    relLink: "/tema/bahasa-aksara",
    relImg: "/images/purun_pedamaran.jpg",
  },
  "bahasa-musi": {
    id: "bahasa-musi",
    title: "Bahasa Musi (Sekayu)",
    subtitle: "Dialek Musi Banyuasin yang identik dengan vokal berakhiran khas 'e' meliuk merdu",
    heroImg: "/images/ampera_hero.jpg",
    sec1Title: "Dialek Khas Wilayah Hulu Sungai Musi",
    sec1Desc:
      "Bahasa Musi atau dialek Sekayu dituturkan di sepanjang aliran Sungai Musi bagian tengah dan hilir Kabupaten Musi Banyuasin. Ciri paling khas dari dialek ini adalah pergantian vokal akhir menjadi 'e' pepet yang dilafalkan meliuk merdu.",
    sec1Img: "/images/ampera_hero.jpg",
    sec2Title: "Kekayaan Kosakata 'Kite', 'Kule', & Pantun Senjang",
    sec2Desc:
      "Bahasa Musi kaya akan idiom kebersamaan dan rasa hormat kepada tamu. Bahasa ini menjadi medium utama penyampaian seni tutur Senjang yang bersahut-sahutan.",
    sec2Img: "/images/aksara_ulu.jpg",
    sec3Title: "Identitas Budaya Masyarakat Muba",
    sec3Desc:
      "Pemerintah Kabupaten Musi Banyuasin secara aktif menerbitkan buku cerita rakyat dan kamus bahasa Sekayu demi melestarikan dialek yang kaya nilai sejarah ini.",
    sec3Img: "/images/ampera_hero.jpg",
    relCat: "KATEGORI BAHASA & AKSARA",
    relTitle: "Dialek Aliran Sungai Musi",
    relDesc: "Kenali ragam bahasa tutur di sepanjang sungai terpanjang di Sumatera.",
    relLink: "/tema/bahasa-aksara",
    relImg: "/images/ampera_hero.jpg",
  },

  // --- SENI PERTUNJUKAN & TRADISI LISAN ---
  "teater-dulmuluk": {
    id: "teater-dulmuluk",
    title: "Teater Dulmuluk",
    subtitle: "Komedi musikal tradisional Palembang berakar dari Kitab Kejayaan Sultan Abdul Muluk",
    heroImg: "/images/teater_dulmuluk.jpg",
    sec1Title: "Kelahiran Seni Teater dari Tradisi Berzikir & Bertutur",
    sec1Desc:
      "Bermula pada paruh kedua abad ke-19, pembacaan Syair Abdul Muluk oleh pedagang Arab di Tangga Takat berkembang menjadi pertunjukan drama panggung rakyat yang memadukan nyanyian bersyair Melayu dan dialog jenaka yang akrab bagi masyarakat.",
    sec1Img: "/images/teater_dulmuluk.jpg",
    sec2Title: "Ciri Khas Lakon, Tari Khodam, & Spontanitas Lawakan",
    sec2Desc:
      "Dalam setiap pementasan, tokoh abdi atau khodam selalu menjadi pemantik tawa penonton melalui lelucon slapstick dan sindiran sosial yang cerdas. Para pemain menari lincah seiring alunan rebana, biola, dan gong pengiring.",
    sec2Img: "/images/rebana_burdah.jpg",
    sec3Title: "Pelestarian Warisan Panggung Rakyat Palembang",
    sec3Desc:
      "Hingga kini, Dulmuluk tetap dipentaskan dalam pesta perkawinan dan festival seni budaya Sumsel, menjadi jembatan penghubung nilai moral kesetiaan, keadilan, dan humor hangat masyarakat Palembang.",
    sec3Img: "/images/ampera_hero.jpg",
    relCat: "KATEGORI SENI PERTUNJUKAN",
    relTitle: "Seni Pertunjukan & Tradisi Lisan",
    relDesc: "Jelajahi Senjang, Tembang Batanghari Sembilan, dan ragam cerita rakyat Sumatera Selatan.",
    relLink: "/tema/pertunjukan-lisan",
    relImg: "/images/teater_dulmuluk.jpg",
  },
  "senjang-muba": {
    id: "senjang-muba",
    title: "Seni Tutur Senjang",
    subtitle: "Seni berbalas pantun berirama berisi petuah moral dan kritik sosial santun khas Musi Banyuasin",
    heroImg: "/images/aksara_ulu.jpg",
    sec1Title: "Tradisi Lisan Pantun Berirama Bersahut-sahutan",
    sec1Desc:
      "Senjang adalah seni bertutur berirama khas Musi Banyuasin di mana dua orang penutur (pesenjang) melantunkan bait-bait pantun bersyair indah secara bergantian, diiringi tabuhan gendang dan gerak tari melangkah santun.",
    sec1Img: "/images/aksara_ulu.jpg",
    sec2Title: "Media Kritik Sosial yang Santun & Penuh Kebijaksanaan",
    sec2Desc:
      "Kata 'senjang' bermakna tidak seimbang atau ada jarak. Melalui senjang, rakyat dapat menyampaikan kritik membangun kepada para pemimpin daerah tanpa rasa tersinggung karena dibungkus dalam kiasan pantun jenaka dan peribahasa bijak.",
    sec2Img: "/images/aksara_ulu.jpg",
    sec3Title: "Warisan Budaya Takbenda Indonesia",
    sec3Desc:
      "Telah diakui secara nasional sebagai Warisan Budaya Takbenda (WBTb), Senjang kini rutin dilombakan di kalangan generasi muda untuk melatih kecerdasan berbahasa dan beretika.",
    sec3Img: "/images/ampera_hero.jpg",
    relCat: "KATEGORI TRADISI LISAN",
    relTitle: "Sastra Lisan Nusantara",
    relDesc: "Pelajari seni tutur Dulmuluk, Tembang Batanghari Sembilan, dan Tadut.",
    relLink: "/tema/pertunjukan-lisan",
    relImg: "/images/aksara_ulu.jpg",
  },
  "tembang-batanghari-sembilan": {
    id: "tembang-batanghari-sembilan",
    title: "Tembang Batanghari Sembilan",
    subtitle: "Lantunan syair sendu penuh filosofi hidup mengikuti alunan petikan dawai gitar tunggal",
    heroImg: "/images/tembang_batanghari_sembilan.jpg",
    sec1Title: "Kidung Renungan Sembilan Sungai",
    sec1Desc:
      "Tembang Batanghari Sembilan adalah nyanyian bertutur lambat yang merefleksikan bentang geografis sembilan sungai besar di Sumatera Selatan: Kelingi, Beliti, Lakitan, Rawas, Rupit, Batanghari Leko, Ogan, Komering, dan Lematang.",
    sec1Img: "/images/tembang_batanghari_sembilan.jpg",
    sec2Title: "Bait Pantun Sarat Metafora Sungai & Rantau",
    sec2Desc:
      "Lirik tembang menggunakan metafora air yang mengalir, batu karang yang tegar, dan perahu yang berlayar untuk melukiskan perjalanan nasib manusia dan kerinduan anak rantau kepada kampung halamannya.",
    sec2Img: "/images/aksara_ulu.jpg",
    sec3Title: "Ketenangan Jiwa di Keheningan Malam",
    sec3Desc:
      "Dahulu disenandungkan saat malam hari di atas perahu getek atau beranda rumah panggung untuk mengiringi tidur anak cucu dan melepas lelah usai berladang seharian.",
    sec3Img: "/images/rumah_limas.jpg",
    relCat: "KATEGORI TRADISI LISAN",
    relTitle: "Sastra Tutur Sumsel",
    relDesc: "Dengarkan alunan petikan Gitar Tunggal Batanghari Sembilan.",
    relLink: "/tema/pertunjukan-lisan",
    relImg: "/images/tembang_batanghari_sembilan.jpg",
  },

  // --- UPACARA ADAT & TRADISI SOSIAL ---
  "tradisi-ngobeng": {
    id: "tradisi-ngobeng",
    title: "Tradisi Ngobeng (Saji Bersama)",
    subtitle: "Kearifan gotong royong jamuan makan bersila 8 orang dengan oper estafet hidangan",
    heroImg: "/images/tradisi_ngobeng.jpg",
    sec1Title: "Falsafah Duduk Bersila Memuliakan Tamu",
    sec1Desc:
      "Ngobeng adalah tata krama jamuan adat Palembang di mana para tamu duduk melingkar di atas tikar dalam kelompok delapan orang. Nasi minyak dan lauk-pauk seperti malbi daging, ayam kecap, dan dalca disajikan di tengah dengan mangkuk cuci tangan (iwangan).",
    sec1Img: "/images/tradisi_ngobeng.jpg",
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
    relImg: "/images/tradisi_ngobeng.jpg",
  },
  "perahu-bidar": {
    id: "perahu-bidar",
    title: "Festival Perahu Bidar",
    subtitle: "Ketangkasan puluhan pendayung beradu cepat di atas riak gelombang Sungai Musi",
    heroImg: "/images/perahu_bidar.jpg",
    sec1Title: "Adat Pacu Dayung Kesultanan Palembang",
    sec1Desc:
      "Lomba Perahu Bidar berakar dari tradisi Kesultanan Palembang untuk menguji ketangkasan armada laut penjaga sungai Musi. Perahu panjang kayu rengas dihiasi kepala naga atau burung garuda berukir.",
    sec1Img: "/images/perahu_bidar.jpg",
    sec2Title: "Harmoni 55 Pendayung Berpadu Tabuhan Gong",
    sec2Desc:
      "Setiap perahu diawaki hingga 55 pendayung yang mengayuh serempak seirama tabuhan gong dan seruan juru mudi. Percikan air sungai Musi berpadu dengan sorak ribuan penonton di sepanjang pelataran Benteng Kuto Besak.",
    sec2Img: "/images/perahu_bidar.jpg",
    sec3Title: "Perahu Hias & Semarak Festival Tahunan",
    sec3Desc:
      "Selain adu kecepatan, festival ini dimeriahkan parade perahu hias yang menampilkan ornamen miniatur Rumah Limas, kain songket, dan replika Jembatan Ampera berhias ribuan lampion warna-warni.",
    sec3Img: "/images/rumah_limas.jpg",
    relCat: "KATEGORI UPACARA & FESTIVAL",
    relTitle: "Upacara Adat & Tradisi Sosial",
    relDesc: "Telusuri Tradisi Ngobeng saji makanan estafet, Bekarang Iwak, dan Adat Sedekah Rame Pasemah.",
    relLink: "/tema/upacara-adat",
    relImg: "/images/perahu_bidar.jpg",
  },
  "bekarang-iwak": {
    id: "bekarang-iwak",
    title: "Tradisi Bekarang Iwak",
    subtitle: "Pesta rakyat menangkap ikan bersama di sungai dan lebak lebung saat musim kemarau",
    heroImg: "/images/bekarang_iwak.jpg",
    sec1Title: "Kearifan Menangkap Ikan Bersama Tanpa Merusak",
    sec1Desc:
      "Bekarang Iwak adalah tradisi turun-temurun menangkap ikan air tawar secara serentak di danau rawa (lebak lebung) atau aliran sungai yang mulai surut saat puncak musim kemarau. Dilakukan bersama oleh ratusan warga desa dari anak-anak hingga orang tua.",
    sec1Img: "/images/bekarang_iwak.jpg",
    sec2Title: "Peralatan Tradisional Tangguk, Jala, & Keranjang Bambu",
    sec2Desc:
      "Warga hanya diperbolehkan menggunakan alat tangkap ramah lingkungan seperti tangguk (anyaman bambu cekung), serkap, jala tebar, atau langsung dengan tangan kosong tanpa racun kimia maupun setrum listrik.",
    sec2Img: "/images/rumah_rakit.jpg",
    sec3Title: "Pesta Masak Pindang & Tempoyak Bersama di Tepi Rawa",
    sec3Desc:
      "Hasil tangkapan ikan gabus, baung, dan sepat kemudian dimasak bersama menjadi pindang patin dan sambal tempoyak di pinggir danau, mempererat kerukunan antarwarga dusun.",
    sec3Img: "/images/pindang_patin.jpg",
    relCat: "KATEGORI UPACARA & TRADISI",
    relTitle: "Kearifan Lingkungan Sumsel",
    relDesc: "Kenali adat lebak lebung dan pengelolaan sumber daya perairan Sumatera Selatan.",
    relLink: "/tema/upacara-adat",
    relImg: "/images/bekarang_iwak.jpg",
  },
  "sedekah-rame": {
    id: "sedekah-rame",
    title: "Upacara Sedekah Rame",
    subtitle: "Rasa syukur agrikultur suku Pasemah sebelum membuka lahan dan menanam padi",
    heroImg: "/images/sedekah_rame.jpg",
    sec1Title: "Ritual Syukur Adat Dataran Tinggi Besemah",
    sec1Desc:
      "Sedekah Rame adalah upacara adat masyarakat suku Besemah di Kabupaten Lahat, Empat Lawang, dan Pagaralam. Dilaksanakan menjelang musim tanam padi raya sebagai permohonan doa keselamatan dan kesuburan tanah kepada Sang Pencipta.",
    sec1Img: "/images/sedekah_rame.jpg",
    sec2Title: "Musyawarah Mufakat Pemimpin Adat & Tabuhan Kelintang",
    sec2Desc:
      "Dimulai dengan musyawarah tetua dusun menentukan hari baik pembagian air irigasi, dilanjutkan doa bersama dan tabuhan kelintang perunggu di tengah hamparan sawah bertingkat di kaki Gunung Dempo.",
    sec2Img: "/images/megalitik_pasemah.jpg",
    sec3Title: "Menjaga Keseimbangan Ekosistem Pertanian",
    sec3Desc:
      "Tradisi ini melarang perburuan satwa burung pemakan hama dan penebangan pohon di hulu mata air, menjadi hukum adat konservasi alam yang sangat dihormati warga.",
    sec3Img: "/images/ghumah_baghi.jpg",
    relCat: "KATEGORI UPACARA & TRADISI",
    relTitle: "Upacara Adat Tradisional",
    relDesc: "Eksplorasi adat Sedekah Bumi, Tradisi Ngobeng, dan Festival Perahu Bidar.",
    relLink: "/tema/upacara-adat",
    relImg: "/images/sedekah_rame.jpg",
  },
  "adat-nindai": {
    id: "adat-nindai",
    title: "Adat Nindai & Madik",
    subtitle: "Prosesi penyelidikan budi pekerti calon mempelai sebelum ikrar lamaran resmi Melayu",
    heroImg: "/images/adat_nindai.jpg",
    sec1Title: "Etiket Luhur Perkawinan Adat Kesultanan",
    sec1Desc:
      "Adat Madik dan Nindai adalah tahap awal sakral dalam tata cara perkawinan Melayu Palembang. Utusan keluarga pihak pria mengunjungi secara santun keluarga gadis untuk 'menilik' (nindai) budi pekerti, kesiapan rohani, dan silsilah keluarga calon menantu.",
    sec1Img: "/images/adat_nindai.jpg",
    sec2Title: "Bawaan Tenong Kuningan & Kue-Kue Kesultanan",
    sec2Desc:
      "Utusan membawa wadah tenong anyaman kuningan berisi kudapan istimewa seperti kue Maksuba, lapis kojo, serta buah-buahan segar sebagai tanda maksud baik dan penghormatan kepada keluarga tuan rumah.",
    sec2Img: "/images/kue_maksuba.jpg",
    sec3Title: "Menyatukan Dua Keluarga Besar dengan Penuh Kehormatan",
    sec3Desc:
      "Jika tanda persetujuan tercapai, prosesi dilanjutkan ke tahap Meminang resmi dan Berjanji, memastikan ikatan pernikahan dibangun di atas restu tulus kedua belah pihak.",
    sec3Img: "/images/aesan_gede_banner.jpg",
    relCat: "KATEGORI UPACARA & TRADISI",
    relTitle: "Adat Perkawinan Palembang",
    relDesc: "Pelajari tata upacara Aesan Gede, malam pacar, dan arak-arakan pengantin.",
    relLink: "/tema/upacara-adat",
    relImg: "/images/aesan_paksangko.jpg",
  },

  // --- SEJARAH & PENINGGALAN ---
  "kerajaan-sriwijaya": {
    id: "kerajaan-sriwijaya",
    title: "Kemaharajaan Sriwijaya",
    subtitle: "Imperium maritim terbesar Asia Tenggara yang menguasai jalur Selat Malaka dari tepian Musi",
    heroImg: "/images/buddha_seguntang.jpg",
    sec1Title: "Prasasti Kedukan Bukit (682 M): Tonggak Suci Kedatuan",
    sec1Desc:
      "Dapunta Hyang memimpin ekspedisi suci (siddhayatra) dengan membawa 20.000 tentara dan 200 peti perbekalan perahu untuk mendirikan wanua makmur di Palembang. Prasasti batu beraksara Pallawa ini menjadi bukti tertulis tertua berdirinya kemaharajaan Sriwijaya.",
    sec1Img: "/images/buddha_seguntang.jpg",
    sec2Title: "Jalur Sutra Bahari & Pusat Pengkajian Internasional",
    sec2Desc:
      "Sebagai pelabuhan niaga tersibuk di Asia Tenggara, Sriwijaya menghubungkan Tiongkok, India, dan Timur Tengah, sekaligus menjadi pusat pengkajian ilmu filsafat dan agama terkemuka tempat ribuan cendekiawan dunia singgah belajar tata bahasa Sanskerta.",
    sec2Img: "/images/prasasti_kedukan_bukit.jpg",
    sec3Title: "Warisan Kemegahan Emas Suvarnadvipa",
    sec3Desc:
      "Julukan Pulau Emas (Suvarnadvipa) mewariskan tradisi kriya logam mulia dan tenun benang emas murni yang kini terus hidup dalam helai kain songket lepus, mahkota Aesan Gede, dan arsitektur ukiran rumah limas.",
    sec3Img: "/images/songket_lepus.jpg",
    relCat: "KATEGORI SEJARAH & ARSIP",
    relTitle: "Arsip Peninggalan Sejarah Sumsel",
    relDesc: "Kunjungi Museum Balaputradewa, Benteng Kuto Besak, dan jejak Kesultanan Palembang Darussalam.",
    relLink: "/tema/sejarah",
    relImg: "/images/buddha_seguntang.jpg",
  },
  "prasasti-kedukan-bukit": {
    id: "prasasti-kedukan-bukit",
    title: "Prasasti Kedukan Bukit (682 M)",
    subtitle: "Batu tulis sakral bertarikh 604 Saka bukti arkeologis tertua berdirinya Kedatuan Sriwijaya",
    heroImg: "/images/prasasti_kedukan_bukit.jpg",
    sec1Title: "Penemuan Batu Sungai Beraksara Pallawa",
    sec1Desc:
      "Ditemukan oleh M. Batenburg pada 29 November 1920 di tepi Sungai Tatang, Kedukan Bukit, Palembang. Prasasti batu sungai bulat berukuran 45 x 80 cm ini terpahat rapi dalam bahasa Melayu Kuno beraksara Pallawa abugida.",
    sec1Img: "/images/prasasti_kedukan_bukit.jpg",
    sec2Title: "Catatan Ekspedisi Siddhayatra Dapunta Hyang",
    sec2Desc:
      "Isi naskah batu mengabadikan tanggal 16 Mei 682 Masehi ketika Dapunta Hyang Sri Jayanasa bertolak dengan perahu dari Minanga Tamwan membawa sukacita dan mendirikan kota pelabuhan Sriwijaya yang jaya makmur.",
    sec2Img: "/images/prasasti_kedukan_bukit.jpg",
    sec3Title: "Tonggak Sejarah Maritim Indonesia",
    sec3Desc:
      "Prasasti ini menjadi rujukan utama para sejarawan dunia yang membuktikan Palembang sebagai pusat pemerintahan maritim tertua yang berpengaruh besar di Nusantara.",
    sec3Img: "/images/buddha_seguntang.jpg",
    relCat: "KATEGORI SEJARAH & ARSIP",
    relTitle: "Koleksi Arkeologi Sriwijaya",
    relDesc: "Pelajari Prasasti Talang Tuwo, Telaga Batu, dan arca Buddha Bukit Seguntang.",
    relLink: "/tema/sejarah",
    relImg: "/images/prasasti_kedukan_bukit.jpg",
  },
  "kesultanan-palembang": {
    id: "kesultanan-palembang",
    title: "Kesultanan Palembang Darussalam",
    subtitle: "Keraton Melayu Islam berdaulat yang melahirkan kemegahan songket lepus dan peradaban sungai",
    heroImg: "/images/kesultanan_palembang.jpg",
    sec1Title: "Kedaulatan Maritim Islam Abad ke-17",
    sec1Desc:
      "Didirikan pada tahun 1659 oleh Ki Gede Ing Suro dan mencapai puncak kejayaan di bawah pimpinan Sultan Mahmud Badaruddin I dan II. Kesultanan Palembang Darussalam berhasil mempertahankan kedaulatan politik dan ekonominya dari tekanan VOC Belanda melalui benteng pertahanan sungai yang tangguh.",
    sec1Img: "/images/kesultanan_palembang.jpg",
    sec2Title: "Pusat Kesenian Adiluhung & Sastra Melayu",
    sec2Desc:
      "Keraton Kesultanan menjadi tempat berkembangnya seni tenun Songket Lepus benang emas murni, arsitektur ukiran tembaga dan kayu jati berprada emas, serta kitab hukum adat Simbur Cahaya karya Ratu Sinuhun.",
    sec2Img: "/images/songket_lepus.jpg",
    sec3Title: "Pahlawan Nasional Sultan Mahmud Badaruddin II",
    sec3Desc:
      "Perjuangan gigih Sultan Mahmud Badaruddin II dalam Perang Menteng (1819) melawan armada Belanda membakar semangat patriotisme rakyat Sumatera Selatan yang diabadikan hingga hari ini.",
    sec3Img: "/images/benteng_kuto_besak.jpg",
    relCat: "KATEGORI SEJARAH & ARSIP",
    relTitle: "Sejarah & Peninggalan Palembang",
    relDesc: "Telusuri Benteng Kuto Besak, Museum Balaputradewa, dan makam Kawah Tengkurep.",
    relLink: "/tema/sejarah",
    relImg: "/images/kesultanan_palembang.jpg",
  },
  "benteng-kuto-besak": {
    id: "benteng-kuto-besak",
    title: "Benteng Kuto Besak",
    subtitle: "Kubu pertahanan keraton abad ke-18 berbahan batu kapur dan putih telur di tepi Sungai Musi",
    heroImg: "/images/benteng_kuto_besak.jpg",
    sec1Title: "Benteng Keraton Abad ke-18 Karya Sultan Mahmud",
    sec1Desc:
      "Benteng Kuto Besak (BKB) didirikan pada tahun 1780 oleh Sultan Mahmud Badaruddin I dan diselesaikan pada era Sultan Mahmud Bahauddin. Dindingnya yang kokoh terbuat dari susunan batu bata yang direkatkan dengan adonan kapur dan putih telur ayam murni.",
    sec1Img: "/images/benteng_kuto_besak.jpg",
    sec2Title: "Benteng Pribumi Satu-Satunya Menghadap Sungai",
    sec2Desc:
      "Berbeda dari benteng kolonial Belanda lainnya di Nusantara, BKB dirancang dan dibangun sepenuhnya oleh pribumi Kesultanan Palembang dengan posisi strategis menghadap langsung ke arah aliran Sungai Musi untuk menahan meriam kapal musuh.",
    sec2Img: "/images/benteng_kuto_besak.jpg",
    sec3Title: "Ruang Publik Semarak & Pemandangan Ampera",
    sec3Desc:
      "Kini pelataran BKB menjelma menjadi ruang publik paling hidup di Palembang tempat warga bersantai menikmati semilir angin sungai, pempek panggang, dan gemerlap cahaya Jembatan Ampera saat malam tiba.",
    sec3Img: "/images/ampera_hero.jpg",
    relCat: "KATEGORI SEJARAH & ARSIP",
    relTitle: "Arsitektur Benteng Bersejarah",
    relDesc: "Kunjungi jejak sejarah perjuangan kemerdekaan di tepian Sungai Musi.",
    relLink: "/tema/sejarah",
    relImg: "/images/benteng_kuto_besak.jpg",
  },
  "malam-kuto-besak": {
    id: "malam-kuto-besak",
    title: "Malam di Benteng Kuto Besak",
    subtitle: "Lampu kota dan siluet benteng keraton peninggalan Sultan Mahmud Badaruddin I",
    heroImg: "/images/benteng_kuto_besak_malam.jpg",
    sec1Title: "Benteng Keraton Abad ke-18 Tepi Musi",
    sec1Desc:
      "Benteng Kuto Besak didirikan oleh Sultan Mahmud Badaruddin I dan diselesaikan oleh Sultan Mahmud Bahauddin. Dindingnya yang kokoh terbuat dari batu bata yang direkatkan dengan adonan kapur dan putih telur.",
    sec1Img: "/images/benteng_kuto_besak_malam.jpg",
    sec2Title: "Pantulan Lampu Warna-Warni di Air Sungai",
    sec2Desc:
      "Pada malam hari, pelataran benteng menjelma menjadi ruang publik paling semarak di Palembang. Pantulan lampu Jembatan Ampera dan kapal-kapal restoran terapung menari indah di permukaan air Musi.",
    sec2Img: "/images/ampera_hero.jpg",
    sec3Title: "Pusat Interaksi Warga & Kuliner Malam",
    sec3Desc:
      "Warga duduk lesehan menikmati es kacang merah, pempek panggang, dan jagung bakar sambil mendengarkan pengamen jalanan melantunkan lagu-lagu daerah Sumatera Selatan.",
    sec3Img: "/images/pempek_palembang.jpg",
    relCat: "KATEGORI SEJARAH & ARSIP",
    relTitle: "Sejarah & Peninggalan Palembang",
    relDesc: "Kunjungi Benteng Kuto Besak, Museum Balaputradewa, dan jejak kemaritiman Sriwijaya.",
    relLink: "/tema/sejarah",
    relImg: "/images/benteng_kuto_besak.jpg",
  },
  "museum-balaputradewa": {
    id: "museum-balaputradewa",
    title: "Museum Negeri Balaputradewa",
    subtitle: "Khasanah arca megalitik Pasemah, artefak Sriwijaya, dan Rumah Limas utuh",
    heroImg: "/images/museum_balaputradewa.jpg",
    sec1Title: "Rumah Pelestarian Budaya Terlengkap Sumsel",
    sec1Desc:
      "Museum Negeri Balaputradewa di Palembang menyimpan lebih dari 8.000 artefak bersejarah dari masa prasejarah, kejayaan kemaharajaan Sriwijaya, masa Kesultanan Palembang Darussalam, hingga masa kolonial Belanda.",
    sec1Img: "/images/museum_balaputradewa.jpg",
    sec2Title: "Koleksi Arca Megalitik Manusia Dililit Ular Pasemah",
    sec2Desc:
      "Di taman museum berdiri deretan arca batu megalitik dari dataran tinggi Besemah berumur ribuan tahun SM, termasuk arca legendaris patung manusia menunggang kerbau dan memeluk gajah purba.",
    sec2Img: "/images/megalitik_pasemah.jpg",
    sec3Title: "Rumah Limas Asli Ikon Uang Kertas Rp 10.000",
    sec3Desc:
      "Di halaman belakang terdapat bangunan Rumah Limas kayu unglen asli abad ke-19 yang pernah diabadikan sebagai gambar utama dalam pecahan uang kertas rupiah edisi tahun 2005.",
    sec3Img: "/images/rumah_limas.jpg",
    relCat: "KATEGORI SEJARAH & ARSIP",
    relTitle: "Museum & Cagar Budaya Sumsel",
    relDesc: "Eksplorasi Museum Sultan Mahmud Badaruddin II dan Taman Purbakala Kerajaan Sriwijaya.",
    relLink: "/tema/sejarah",
    relImg: "/images/museum_balaputradewa.jpg",
  },
  "jembatan-ampera": {
    id: "jembatan-ampera",
    title: "Jembatan Ampera",
    subtitle: "Tengara abadi pemersatu kawasan Seberang Ulu dan Seberang Ilir di atas Sungai Musi",
    heroImg: "/images/ampera_hero.jpg",
    sec1Title: "Karya Arsitektur Megah Pemersatu Palembang",
    sec1Desc:
      "Dibangun mulai April 1962 atas gagasan Presiden Soekarno menggunakan dana rampasan perang, Jembatan Ampera membentang sepanjang 1.177 meter di atas Sungai Musi, menghubungkan kawasan Seberang Ulu dan Seberang Ilir yang dulunya terpisah aliran air.",
    sec1Img: "/images/ampera_hero.jpg",
    sec2Title: "Mekanisme Bagian Tengah yang Dahulu Bisa Terangkat",
    sec2Desc:
      "Pada masa awal peresmiannya di tahun 1965, bagian tengah jembatan sepanjang 71 meter dapat diangkat vertikal seberat 500 ton menggunakan bandul penyeimbang agar kapal-kapal kargo samudra dapat melintas di bawahnya.",
    sec2Img: "/images/ampera_hero.jpg",
    sec3Title: "Ikon Kebanggaan Abadi Wong Kito Galo",
    sec3Desc:
      "Kini Jembatan Ampera dengan menara merah menyala dan lampu hias malam hari menjadi simbol identitas dan kebanggaan tertinggi seluruh masyarakat Sumatera Selatan di mata dunia.",
    sec3Img: "/images/ampera_hero.jpg",
    relCat: "KATEGORI SEJARAH & ARSIP",
    relTitle: "Tengara Bersejarah Palembang",
    relDesc: "Saksikan keelokan Senja di Jembatan Ampera dan denyut kehidupan Sungai Musi.",
    relLink: "/tema/sejarah",
    relImg: "/images/ampera_hero.jpg",
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
    sec2Img: "/images/perahu_ketek.jpg",
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
  "penenun-songket": {
    id: "penenun-songket",
    title: "Sehari bersama Penenun Songket",
    subtitle: "Berbulan-bulan kesabaran untuk sehelai kain berkilau benang emas",
    heroImg: "/images/menenun_songket.jpg",
    sec1Title: "Alat Tenun Tradisional Gedogan Kayu",
    sec1Desc:
      "Di ruang bawah rumah panggung kayu, penenun duduk dengan memangku alat tenun gedogan. Pinggang ditopang sabuk penahan (por), sementara kedua kaki lurus menekan kayu tumpuan demi menjaga ketegangan benang lungsi sutra.",
    sec1Img: "/images/menenun_songket.jpg",
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
    relImg: "/images/menenun_songket.jpg",
  },
  "fajar-musi": {
    id: "fajar-musi",
    title: "Fajar di Sungai Musi",
    subtitle: "Rumah rakit terapung dan perahu ketek menyongsong semilir angin fajar sungai purba",
    heroImg: "/images/rumah_rakit.jpg",
    sec1Title: "Kabut Pagi & Siluet Perahu Ketek Pertama",
    sec1Desc:
      "Sebelum fajar sempurna merekah di ufuk timur, kabut tipis menyelimuti permukaan Sungai Musi. Suara ketukan mesin perahu ketek pertama mulai memecah kesunyian air, mengantarkan para pedagang dan nelayan memulai denyut nadi niaga sungai yang telah berlangsung ribuan tahun.",
    sec1Img: "/images/perahu_ketek.jpg",
    sec2Title: "Kehidupan Bersahaja di Atas Rumah Rakit Terapung",
    sec2Desc:
      "Di atas gelondongan kayu dan ratusan batang bambu penyangga, rumah-rumah rakit yang tertambat di tebing sungai mulai menyalakan lentera dan asap tungku dapur. Kehidupan terapung ini menjadi warisan hidup peradaban maritim Palembang yang adaptif dan selaras dengan pasang surut air sungai.",
    sec2Img: "/images/rumah_rakit.jpg",
    sec3Title: "Kilau Mentari Pagi di Bawah Megahnya Ampera",
    sec3Desc:
      "Sinar matahari keemasan perlahan menembus kabut, menyinari bentangan merah Jembatan Ampera dan benteng kuno Kuto Besak. Udara fajar yang sejuk dipadu aroma pempek hangat dan kopi seduh menyambut hari baru bagi seluruh Wong Kito di tepian Musi.",
    sec3Img: "/images/ampera_hero.jpg",
    relCat: "KATEGORI PERADABAN SUNGAI",
    relTitle: "Peradaban Air Sungai Musi",
    relDesc: "Jelajahi Rumah Rakit terapung, Pagi di Tepian Musi, dan pesona maritim Palembang.",
    relLink: "/tur/rumah-rakit",
    relImg: "/images/rumah_rakit.jpg",
  },
  "hutan-suvarnadvipa": {
    id: "hutan-suvarnadvipa",
    title: "Hutan Hujan & Perairan Suvarnadvipa",
    subtitle: "Ekosistem hutan purba dan perairan sungai yang dilindungi titah prasasti raja-raja Sriwijaya",
    heroImg: "/images/musi_landscape.jpg",
    sec1Title: "Prasasti Talang Tuwo: Amanat Konservasi Tertua Dunia",
    sec1Desc:
      "Pada tahun 684 Masehi, Raja Sriwijaya Dapunta Hyang Sri Jayanasa menitahkan pembangunan Taman Sriksetra sebagaimana terpahat pada Prasasti Talang Tuwo. Ini adalah piagam konservasi alam tertua di dunia yang memerintahkan penanaman pohon buah-buahan, bambu, dan pelestarian sumber air demi kemakmuran seluruh makhluk.",
    sec1Img: "/images/prasasti_kedukan_bukit.jpg",
    sec2Title: "Perairan Sembilan Sungai & Hutan Purba Dataran Rendah",
    sec2Desc:
      "Bentang alam Sumatera Selatan (Suvarnadvipa) dianugerahi sembilan anak sungai Musi yang mengairi hutan gambut, rawa lebak lebung, dan hutan perbukitan Bukit Barisan. Ekosistem ini menyediakan kayu unglen kokoh untuk Rumah Limas serta getah damar untuk aksara kuno.",
    sec2Img: "/images/musi_landscape.jpg",
    sec3Title: "Warisan Keselarasan Manusia & Alam Masa Kini",
    sec3Desc:
      "Kearifan para leluhur dalam menjaga hulu sungai dan hutan adat kini menjadi inspirasi penting bagi pelestarian lingkungan hidup Sumatera Selatan, membuktikan bahwa peradaban besar hanya dapat bertahan jika menjaga keselarasan dengan alam sekitarnya.",
    sec3Img: "/images/rumah_limas.jpg",
    relCat: "KATEGORI LINGKUNGAN & SEJARAH",
    relTitle: "Sejarah & Peninggalan Sumsel",
    relDesc: "Telusuri Kerajaan Sriwijaya, Prasasti Kedukan Bukit, dan Sungai Musi.",
    relLink: "/tema/sejarah",
    relImg: "/images/musi_landscape.jpg",
  },
};

import { themeTranslationsEn, dedicatedToursEn } from "./sora-content-en";

// Helper: Get dedicated tour with robust fallback and multi-language support
export function getDedicatedTour(slug: string, lang: "ID" | "EN" = "ID"): DedicatedTour {
  const baseTour = (() => {
    if (!slug) {
      return dedicatedTours["songket-palembang"];
    }

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
  })();

  if (lang === "EN") {
    const enTour = dedicatedToursEn[slug] || dedicatedToursEn[baseTour.id];
    if (enTour) {
      return {
        ...baseTour,
        ...enTour,
        heroImg: enTour.heroImg || baseTour.heroImg,
        sec1Img: enTour.sec1Img || baseTour.sec1Img,
        sec2Img: enTour.sec2Img || baseTour.sec2Img,
        sec3Img: enTour.sec3Img || baseTour.sec3Img,
        relImg: enTour.relImg || baseTour.relImg,
      };
    }
  }

  return baseTour;
}

export function getTheme(slug: string, lang: "ID" | "EN" = "ID"): Theme | undefined {
  const baseTheme = themes.find((t) => t.slug === slug);
  if (!baseTheme) return undefined;
  if (lang === "EN") {
    const enTrans = themeTranslationsEn[slug];
    if (enTrans) {
      return {
        ...baseTheme,
        title: enTrans.title || baseTheme.title,
        cta: enTrans.cta || baseTheme.cta,
        tagline: enTrans.tagline || baseTheme.tagline,
        intro: enTrans.intro || baseTheme.intro,
        guidebook: enTrans.guidebook || baseTheme.guidebook,
        items: baseTheme.items.map((item) => {
          const itemTrans = enTrans.items?.[item.name];
          if (itemTrans) {
            return {
              ...item,
              name: itemTrans.name || item.name,
              desc: itemTrans.desc || item.desc,
              badge: itemTrans.badge || item.badge,
            };
          }
          return item;
        }),
      };
    }
  }
  return baseTheme;
}

export function getThemes(lang: "ID" | "EN" = "ID"): Theme[] {
  if (lang === "EN") {
    return themes.map((theme) => getTheme(theme.slug, "EN") || theme);
  }
  return themes;
}

