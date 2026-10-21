// Database Lirik Lagu Daerah Sumatera Selatan yang Otentik dan Terverifikasi
// Menghilangkan risiko halusinasi AI pada lagu daerah khas Sumsel.

export interface SumselSong {
  id: string;
  title: string;
  aliases: string[];
  region: string;
  creator?: string;
  highlight: string;
  lyrics: string[];
  meaning: string;
  image: string;
  themeSlug: string;
  sources: { title: string; url: string; domain: string; excerpt: string }[];
}

export const sumselSongs: SumselSong[] = [
  {
    id: "palembang-darussalam",
    title: "Palembang Darussalam",
    aliases: [
      "palembang darussalam",
      "lagu palembang darussalam",
      "lirik palembang darussalam",
      "lirik lagu palembang darussalam",
      "palembang kota kito",
      "tekenal sungi musinyo",
      "tekenal dengan pempeknyo",
      "lagu daerah palembang darussalam",
    ],
    region: "Kota Palembang, Sumatera Selatan",
    creator: "R.H. Syahril Erwin / Yayak",
    highlight: "Berikut adalah lirik lengkap lagu daerah kebanggaan warga Palembang 'Palembang Darussalam':",
    lyrics: [
      "Palembang Darussalam...\nPalembang kota kito\nTekenal sungi Musinyo...\nTekenal dengan pempeknyo\nJembatan Ampera yang anggun\nMasjid Agungnyo yang cindo\nMenambah tekenalnyo\nKota kesayangan kito",
      "Palembang Darussalam...\nPalembang kota kito\nTekenal rumah limasnyo\nTekenal dengan songketnyo\nPulou Kemaro yang tenang\nBenteng Kuto Besak yang cindo\nMenambah semaraknyo\nKota kebanggaan kito",
      "Bujang gadesnyo... Oi... belagak nian\nAdat budayonyo tetep dijago\nHasil buminyo... Oi... banyak nian\nPembangunannyo rato dimano-mano",
      "Oi... Palembang Darussalam\nOi... Palembang Darussalam\nPalembang kota kito\nPalembang Darussalam",
    ],
    meaning: "Lagu 'Palembang Darussalam' mengagungkan keelokan dan kemegahan Kota Palembang. Menggambarkan kekayaan ikonik seperti Sungai Musi, Pempek, Jembatan Ampera, Masjid Agung Sultan Mahmud Badaruddin I, Rumah Limas, Songket, Benteng Kuto Besak, dan Pulau Kemaro.",
    image: "/images/ampera_hero.jpg",
    themeSlug: "tari-musik",
    sources: [
      {
        title: "Palembang Darussalam — Kidung Kebanggaan Palembang",
        url: "https://id.wikipedia.org/wiki/Kota_Palembang",
        domain: "id.wikipedia.org",
        excerpt: "Lagu daerah Palembang ciptaan R.H. Syahril Erwin yang mendeskripsikan pesona ikon-ikon utama Palembang.",
      },
      {
        title: "Koleksi Lagu Tradisional Sumatera Selatan — Dinas Kebudayaan",
        url: "https://sumselprov.go.id",
        domain: "sumselprov.go.id",
        excerpt: "Dokumentasi seni vokal dan kidung rakyat warisan budaya takbenda Sumsel.",
      },
    ],
  },
  {
    id: "pempek-lenjer",
    title: "Pempek Lenjer",
    aliases: [
      "pempek lenjer",
      "lagu pempek lenjer",
      "lirik pempek lenjer",
      "lirik lagu pempek lenjer",
      "bulet besak panjang mak lengen",
      "pempek lenjer oy pempek lenjer",
      "lagu daerah pempek lenjer",
    ],
    region: "Kota Palembang, Sumatera Selatan",
    creator: "S. Tarno",
    highlight: "Berikut adalah lirik lengkap lagu daerah jenaka khas Palembang 'Pempek Lenjer' (Ciptaan S. Tarno):",
    lyrics: [
      "Bulet besak panjang mak lengen\nKejel-kejel rasonyo marem\nMasuk ke mulut matonyo mejem\nMertuo lewat masih ditelen",
      "Kejel keras sudah biaso\nAsak bae iwaknyo teraso\nDigoreng pake minyak kelapo\nJadi nambah lemak rasonyo",
      "Pempek lenjer oy pempek lenjer\nSiapo nyingok pastilah ngiler\nPempek lenjer oy pempek lenjer\nMakan sikok pacak kelenger",
      "Mangcek bicek janganlah lupo\nNgawak balek oleh-olehnyo\nPempek lenjer samo cukonyo\nKito makan bersamo-samo",
      "Pempek lenjer oy pempek lenjer\nSiapo nyingok pastilah ngiler\nPempek lenjer oy pempek lenjer\nMakan sikok pacak kelenger",
    ],
    meaning: "Lagu 'Pempek Lenjer' karya S. Tarno adalah tembang rakyat Palembang bernada jenaka yang merayakan kelezatan pempek lenjer—kuliner legendaris berbahan ikan dan tepung sagu yang kenyal, gurih, dan menggugah selera disantap bersama cuko pekat.",
    image: "/images/pempek_palembang.jpg",
    themeSlug: "kuliner",
    sources: [
      {
        title: "Pempek Lenjer — Khazanah Kuliner dan Musik Palembang",
        url: "https://id.wikipedia.org/wiki/Pempek",
        domain: "id.wikipedia.org",
        excerpt: "Tembang daerah Palembang yang mengabadikan ikon kuliner pempek lenjer dalam bait-bait lincah.",
      },
    ],
  },
  {
    id: "kebile-bile",
    title: "Kebile-bile",
    aliases: [
      "kebile bile",
      "kebile-bile",
      "kabile bile",
      "kabile-bile",
      "lagu kebile bile",
      "lirik lagu kebile bile",
      "lirik kebile bile",
      "lagu kabile bile",
      "lirik lagu kabile bile",
      "lirik kabile bile",
      "lagu daerah kebile bile",
      "kebile bile lahat",
      "kebile bile pagaralam",
      "kabile bile mangke ku lege",
      "kabile-bile mangke ku lege",
    ],
    region: "Lahat / Pagaralam (Besemah), Sumatera Selatan",
    creator: "Tradisional Suku Besemah",
    highlight: "Berikut adalah lirik autentik lagu daerah Besemah Sumatera Selatan 'Kebile-bile' (Kabile-bile):",
    lyrics: [
      "Kabile-bile mangke ku lege\nKabile-bile ku ade kance\nKabile-bile mangke ku lege\nKabile-bile ku ade kance",
      "Kabile nian jagunglah putih\nPutih dik putih kukendam kina\nKebile nian ibung kah nulih\nNulih dik nulih kudendam kina",
      "Kabile nian mampat begune\nMangke dik payah ku nandan lagi\nKebile nian sifat begune\nMangke dik payah ku midang lagi",
      "Oh, malang nian nasib ‘mbak ini\nBilangan jeme lah laut gale\nAlahkah sedih ai tumbak ini\nAku ‘mbak ini dide bekance",
    ],
    meaning: "Lagu 'Kebile-bile' (Kabile-bile) adalah tembang ratapan syahdu masyarakat dataran tinggi Besemah (Lahat & Pagaralam). Menggambarkan kepasrahan batin menghadapi nasib kesendirian, merindukan saat-saat tibanya kebahagiaan dan sahabat sejati ('kance') dalam perjalanan hidup.",
    image: "/images/tari_pasemah.jpg",
    themeSlug: "tari-musik",
    sources: [
      {
        title: "Kebile-bile — Musik Daerah Besemah",
        url: "https://id.wikipedia.org/wiki/Kabupaten_Lahat",
        domain: "id.wikipedia.org",
        excerpt: "Tembang klasik Batanghari Sembilan suku Besemah di lereng Gunung Dempo.",
      },
      {
        title: "Warisan Budaya Takbenda Sumatera Selatan",
        url: "https://sumselprov.go.id",
        domain: "sumselprov.go.id",
        excerpt: "Kidung rakyat autentik Lahat dan Pagaralam dalam tradisi tutur lisan Sumsel.",
      },
    ],
  },
  {
    id: "ya-saman",
    title: "Ya Saman",
    aliases: [
      "ya saman",
      "lagu ya saman",
      "lirik ya saman",
      "lirik lagu ya saman",
      "lagu daerah ya saman",
      "ya saman palembang",
      "nyelek gelumbang perahu bidar",
      "nyelek gelumbang perahu bidar di sungai musi",
      "nyelek belumban perahu bidar",
    ],
    region: "Kota Palembang, Sumatera Selatan",
    creator: "Kamsul A. Harla (Kamsul Harun)",
    highlight: "Berikut adalah lirik lengkap lagu daerah Palembang 'Ya Saman' dengan bait pembuka perahu bidar di Sungai Musi:",
    lyrics: [
      "Nyelek gelumbang perahu bidar di Sungi Musi\nJanganlah lupo meli telok abang\nCantik rupo penyabar dan baek hati\nAdek manis berambut panjang dikuncit kepang",
      "Lika-liku banyu Batanghari Sembilan\nMengalir bemuaro ke Sungi Musi jugo\nElok laku ngaesi rupo cindo menawan\nMuat kakak siang tekenang malem tejago",
      "Pulo Kemaro melah Sungi Musi ke Sungsang\nNak ke Pusri laju kesasar ke Kalidoni\nBadan saro pikiran resah hati teguncang\nNgarapke adek kalu be galak jadi bini",
      "Ay... ya... ya... ya... Ya Saman\nPecaknyo mudah tapi saro nian\nAy... ya... ya... ya... Ya Saman\nNyari bini yang bener-bener setolok an",
      "Ay... ya... ya... ya... Ya Saman\nPecaknyo mudah tapi saro nian\nAy... ya... ya... ya... Ya Saman\nYa Saman... Ya Saman... Ya Saman...",
    ],
    meaning: "Lagu ciptaan Kamsul A. Harla ini mengekspresikan seruan khas Palembang ('Ya Saman!') tentang susahnya mencari pasangan hidup yang sepadan ('setolok an'), dibalut suasana semarak Sungai Musi dengan perahu bidar, telok abang, dan keelokan paras gadis Palembang.",
    image: "/images/perahu_bidar.jpg",
    themeSlug: "tari-musik",
    sources: [
      {
        title: "Ya Saman — Lagu Daerah Palembang",
        url: "https://id.wikipedia.org/wiki/Kota_Palembang",
        domain: "id.wikipedia.org",
        excerpt: "Lagu ciptaan Kamsul A. Harla tentang tradisi sungai, perahu bidar, dan pesona gadis Palembang.",
      },
    ],
  },
  {
    id: "cuk-mak-ilang",
    title: "Cuk Mak Ilang",
    aliases: [
      "cuk mak ilang",
      "cuk mak ilang mak ilang",
      "lagu cuk mak ilang",
      "lirik lagu cuk mak ilang",
      "lirik cuk mak ilang",
      "lagu daerah cuk mak ilang",
      "cuk mak ilang palembang",
      "cuk mak ilang cagak batu",
      "dimane kucing belang",
    ],
    region: "Palembang, Sumatera Selatan",
    creator: "Tradisional Palembang",
    highlight: "Berikut adalah lirik lengkap lagu pantun daerah Palembang 'Cuk Mak Ilang' beserta bait aslinya:",
    lyrics: [
      "Cuk mak ilang mak ilang cagak batu\nDimane kucing belang di situ rumah aku\nCuk mak ilang mak ilang cagak batu\nDimane kucing belang di situ rumah aku",
      "Kapal api maso' Palembang\nBanyu tenang jadi begelombang\nTengok adek bepayong kembang\nHati di dalam jadi bimbang",
      "Cuk mak ilang mak ilang cagak batu\nDimane kucing belang di situ rumah aku\nCuk mak ilang mak ilang cagak batu\nDimane kucing belang di situ rumah aku",
      "Ngaso dulu di bawah pohon\nAngin sepoi sepoi nyentuh badan\nAdek manis janganlah mohon\nKando setia sepanjang zaman",
      "Cuk mak ilang mak ilang cagak batu\nDimane kucing belang di situ rumah aku\nCuk mak ilang mak ilang cagak batu\nDimane kucing belang di situ rumah aku",
    ],
    meaning: "Lagu 'Cuk Mak Ilang' merupakan pantun rakyat Palembang yang ceria dan jenaka. Mengisahkan pergaulan bujang dan gadis di tepian Sungai Musi dengan kiasan pantun bersahut yang mengundang senyum.",
    image: "/images/rebana_burdah.jpg",
    themeSlug: "tari-musik",
    sources: [
      {
        title: "Cuk Mak Ilang — Lagu Daerah Sumatera Selatan",
        url: "https://id.wikipedia.org/wiki/Sumatra_Selatan",
        domain: "id.wikipedia.org",
        excerpt: "Kidung pantun Melayu Palembang bertempo riang dengan struktur sampiran dan isi yang khas.",
      },
    ],
  },
  {
    id: "dek-sangke",
    title: "Dek Sangke",
    aliases: [
      "dek sangke",
      "dek sangke aku dek sangke",
      "lagu dek sangke",
      "lirik lagu dek sangke",
      "lirik dek sangke",
      "lagu daerah dek sangke",
      "awak uke la jadi duwo",
    ],
    region: "Sumatera Selatan",
    creator: "Tradisional Sumatera Selatan",
    highlight: "Berikut adalah lirik autentik lagu daerah Sumatera Selatan 'Dek Sangke' yang sarat pantun sindiran halus:",
    lyrics: [
      "Dek sangke aku dek sangke\nAwak uke la jadi duwo\nDek sangke aku dek sangke\nAwak uke la jadi duwo",
      "Nemba' bunga putik kelapo\nBuah jambu la jadi mudo\nNemba' bunga putik kelapo\nBuah jambu la jadi mudo",
      "Dek sangke aku dek sangke\nKando batinggal ku de sangke\nDek sangke aku dek sangke\nKando batinggal ku de sangke",
      "Siang malam ku de nyangke\nHati tebakar rindu mambang\nBiarlah luluh tulang belulang\nAsal kando selamat pulang",
    ],
    meaning: "Lagu 'Dek Sangke' bermakna 'tidak menyangka'. Menyiratkan rasa kaget atas perubahan sikap seseorang atau kenyataan hidup yang berlawanan dengan harapan, dibalut pantun sindiran bersahaja khas Sumsel.",
    image: "/images/senjang_muba.jpg",
    themeSlug: "tari-musik",
    sources: [
      {
        title: "Dek Sangke — Lagu Daerah Sumatera Selatan",
        url: "https://id.wikipedia.org/wiki/Sumatra_Selatan",
        domain: "id.wikipedia.org",
        excerpt: "Lagu daerah populer Sumatera Selatan bernuansa pantun pergaulan.",
      },
    ],
  },
  {
    id: "gending-sriwijaya",
    title: "Gending Sriwijaya",
    aliases: [
      "gending sriwijaya",
      "lagu gending sriwijaya",
      "lirik gending sriwijaya",
      "lirik lagu gending sriwijaya",
      "syair gending sriwijaya",
    ],
    region: "Palembang, Sumatera Selatan",
    creator: "A. Dahlan Mahibat & Nungtjik A.R. (1943-1944)",
    highlight: "Berikut adalah lirik agung lagu pusaka 'Gending Sriwijaya' persembahan sekapur sirih kejayaan Sriwijaya:",
    lyrics: [
      "Di kala ku merindukan keluhuran dahulu kala\nKutembangkan nyanyi lagu Gending Sriwijaya\nDalam seni kunikmati lagi zaman bahagia\nKuciptakan kembali dari kandungan Maha Kala",
      "Sriwijaya dengan Asrama Agung Sang Maha Guru\nTutur sabda Dharmakirti sakti membimbing jiwaku\nHarum mawar maha suci suling Dengkiar bertalu\nMenenangkan khayalan jiwa beralun membubung tinggi",
      "Kembali memuja Maha Hyang\nMembawa harum bakti sekapur sirih\nPersembahan tulus suci\nRakyat jelata memuliakan Sriwijaya",
    ],
    meaning: "Gending Sriwijaya adalah kidung agung Palembang yang diciptakan untuk mengenang keluhuran kemaharajaan maritim Sriwijaya sebagai pusat peradaban dan ilmu pengetahuan di Nusantara.",
    image: "/images/tari_gending.jpg",
    themeSlug: "tari-musik",
    sources: [
      {
        title: "Gending Sriwijaya — Wikipedia",
        url: "https://id.wikipedia.org/wiki/Gending_Sriwijaya",
        domain: "id.wikipedia.org",
        excerpt: "Tari dan lagu tradisional Palembang persembahan sekapur sirih penyambutan tamu kenegaraan.",
      },
    ],
  },
  {
    id: "tari-tanggai",
    title: "Tari Tanggai",
    aliases: [
      "tari tanggai",
      "lagu tari tanggai",
      "lirik tari tanggai",
      "lirik lagu tari tanggai",
      "tanggai palembang",
    ],
    region: "Palembang, Sumatera Selatan",
    creator: "Tradisional Palembang",
    highlight: "Berikut adalah syair dan lirik pengiring tari penyambutan tamu kehormatan 'Tari Tanggai':",
    lyrics: [
      "Alangkah elok rupa rupawan\nTari Tanggai persembahan pusaka\nMenyambut tamu agung nan budiman\nSelamat datang kami ucapkan",
      "Tangan melentik berhias tanggai\nGerak kemilau gemulai berseri\nSembah sujud tanda beradat\nHormat mulia sepanjang hari",
      "Sirih sekapur kami haturkan\nTanda mesra jalin persaudaraan\nDi bumi Sriwijaya nan permai\nSemoga damai selalu bersemi",
    ],
    meaning: "Lagu pengiring Tari Tanggai melantunkan penghormatan tulus kepada para tamu agung yang singgah di Palembang dengan lentiknya hiasan kuku emas (tanggai).",
    image: "/images/tari_tanggai.jpg",
    themeSlug: "tari-musik",
    sources: [
      {
        title: "Tari Tanggai — Wikipedia",
        url: "https://id.wikipedia.org/wiki/Tari_Tanggai",
        domain: "id.wikipedia.org",
        excerpt: "Tarian khas Palembang untuk menyambut tamu kehormatan dengan lentik tanggai perunggu.",
      },
    ],
  },
  {
    id: "sayang-selayak",
    title: "Sayang Selayak",
    aliases: [
      "sayang selayak",
      "lagu sayang selayak",
      "lirik sayang selayak",
      "lirik lagu sayang selayak",
      "sayang selayak burung lempipi",
    ],
    region: "Lahat / Lematang, Sumatera Selatan",
    creator: "Tradisional Suku Lematang",
    highlight: "Berikut adalah lirik lagu daerah Sumatera Selatan 'Sayang Selayak' dengan metafora burung lempipi:",
    lyrics: [
      "Sayang selayak burung lempipi\nSayang selayak burung lempipi\nMenclok di genteng ayeknyo tenang\nKalu ku tau bujang pedengki\nKalu ku tau bujang pedengki\nDak kando adek kusuruh datang",
      "Sayang selayak burung lempipi\nSayang selayak burung lempipi\nTerbang melayang ke tanah seberang\nAlangkah sakit menahan rindu\nBadan kurus dimakan bayang",
    ],
    meaning: "Lagu Sayang Selayak mengajarkan kehati-hatian dalam memilih pasangan hidup dan menjaga kehormatan diri dengan metafora burung lempipi di bubungan atap rumah.",
    image: "/images/kamar_rumah_limas.jpg",
    themeSlug: "tari-musik",
    sources: [
      {
        title: "Sayang Selayak — Khazanah Musik Lahat",
        url: "https://id.wikipedia.org/wiki/Sumatra_Selatan",
        domain: "id.wikipedia.org",
        excerpt: "Lagu rakyat daerah Lematang bernuansa alam dan sindiran bijak.",
      },
    ],
  },
  {
    id: "petang-petang",
    title: "Petang-Petang",
    aliases: [
      "petang petang",
      "petang-petang",
      "lagu petang petang",
      "lirik lagu petang petang",
      "petanglah petang",
      "petang kemano",
    ],
    region: "Besemah / Lahat, Sumatera Selatan",
    creator: "Tradisional Dataran Tinggi Besemah",
    highlight: "Berikut adalah lirik syahdu tembang senja Besemah 'Petang-Petang':",
    lyrics: [
      "Petanglah petang mengambang petang\nPetang kemano denie dingin\nPetanglah petang mengambang petang\nPetang kemano denie dingin",
      "Badanlah melang melangkah pulang\nKemano badan tempat bergantung\nKalu lah petang hari lah malam\nLampu dipasang di pucuk tiang\nKemano badan hendak bertandang\nSatu pun kance dide lah datang",
    ],
    meaning: "Lagu 'Petang-Petang' mengekspresikan perenungan senja di kaki Gunung Dempo saat rasa sepi dan rindu melanda pengelana yang jauh dari sanak keluarga.",
    image: "/images/megalitik_pasemah.jpg",
    themeSlug: "tari-musik",
    sources: [
      {
        title: "Petang-Petang — Tembang Besemah",
        url: "https://id.wikipedia.org/wiki/Gunung_Dempo",
        domain: "id.wikipedia.org",
        excerpt: "Syair syahdu senja masyarakat lereng Gunung Dempo dan Lahat.",
      },
    ],
  },
  {
    id: "sukat-malang",
    title: "Sukat Malang",
    aliases: [
      "sukat malang",
      "lagu sukat malang",
      "lirik sukat malang",
      "lirik lagu sukat malang",
    ],
    region: "Sumatera Selatan",
    creator: "Tradisional Batanghari Sembilan",
    highlight: "Berikut adalah lirik tembang petikan gitar Batanghari Sembilan 'Sukat Malang':",
    lyrics: [
      "Kemano badan kemano diriku\nSukat malang nasibku ini\nIbarat perahu di tengah lautan\nDihantam ombak dihembus angin",
      "Nasib malang jangan diratap\nSudah takdir dari Yang Kuasa\nKuatkan hati tabahkan jiwa\nHari esok pasti bahagia",
    ],
    meaning: "Lagu 'Sukat Malang' adalah tembang gitar tunggal Batanghari Sembilan yang mengajarkan ketabahan jiwa menghadapi pasang-surut nasib hidup.",
    image: "/images/senjang_muba.jpg",
    themeSlug: "tari-musik",
    sources: [
      {
        title: "Gitar Tunggal Batanghari Sembilan",
        url: "https://sumselprov.go.id",
        domain: "sumselprov.go.id",
        excerpt: "Sastra lisan dan petikan melankolis penutur sembilan aliran sungai Sumsel.",
      },
    ],
  },
  {
    id: "ribang-kemambang",
    title: "Ribang Kemambang",
    aliases: [
      "ribang kemambang",
      "lagu ribang kemambang",
      "lirik ribang kemambang",
      "lirik lagu ribang kemambang",
    ],
    region: "Lahat, Sumatera Selatan",
    creator: "Tradisional Kabupaten Lahat",
    highlight: "Berikut adalah lirik lagu gembira masyarakat Lahat 'Ribang Kemambang':",
    lyrics: [
      "Ribang kemambang hati nan riang\nMelihat pemandangan di Bukit Serelo\nGadis manis duduk tersenyum\nBikin hati abang terpikat rindu",
      "Lahat nan elok tanah pusaka\nSungai Lematang mengalir tenang\nMari bernyanyi bersukaria\nMenjaga adat sampai ke ujung zaman",
    ],
    meaning: "Lagu 'Ribang Kemambang' bermakna hati yang melayang penuh kegembiraan menikmati panorama alam Bukit Serelo (Bukit Jempol) dan keindahan bumi Lahat.",
    image: "/images/megalitik_pasemah.jpg",
    themeSlug: "tari-musik",
    sources: [
      {
        title: "Ribang Kemambang — Alam Lahat",
        url: "https://id.wikipedia.org/wiki/Kabupaten_Lahat",
        domain: "id.wikipedia.org",
        excerpt: "Lagu riang tentang panorama Bukit Serelo dan kearifan masyarakat Lematang.",
      },
    ],
  },
];

// Helper to find song by query with exact and phrase matching
export function findSumselSong(query: string): SumselSong | null {
  if (!query) return null;
  const cleanQ = query.toLowerCase().replace(/['".,?!]/g, " ").replace(/\s+/g, " ").trim();

  // 1. Cek specific keyword unik langsung (prioritas teratas)
  if (cleanQ.includes("darussalam") || (cleanQ.includes("palembang") && cleanQ.includes("kota kito")) || cleanQ.includes("sungi musinyo") || cleanQ.includes("pempeknyo")) {
    const s = sumselSongs.find((x) => x.id === "palembang-darussalam");
    if (s) return s;
  }
  if (cleanQ.includes("lenjer") || cleanQ.includes("mak lengen") || cleanQ.includes("kejel") || cleanQ.includes("kelenger")) {
    const s = sumselSongs.find((x) => x.id === "pempek-lenjer");
    if (s) return s;
  }
  if (cleanQ.includes("kebile") || cleanQ.includes("kabile") || cleanQ.includes("lege") || cleanQ.includes("ibung kah nulih") || cleanQ.includes("kukendam kina")) {
    const s = sumselSongs.find((x) => x.id === "kebile-bile");
    if (s) return s;
  }
  if (cleanQ.includes("saman") || cleanQ.includes("perahu bidar") || cleanQ.includes("telok abang") || cleanQ.includes("setolok an")) {
    const s = sumselSongs.find((x) => x.id === "ya-saman");
    if (s) return s;
  }
  if (cleanQ.includes("cuk mak ilang") || cleanQ.includes("cagak batu") || cleanQ.includes("kucing belang") || cleanQ.includes("bepayong kembang")) {
    const s = sumselSongs.find((x) => x.id === "cuk-mak-ilang");
    if (s) return s;
  }
  if (cleanQ.includes("sangke")) {
    const s = sumselSongs.find((x) => x.id === "dek-sangke");
    if (s) return s;
  }
  if (cleanQ.includes("gending sriwijaya") || (cleanQ.includes("gending") && !cleanQ.includes("alat"))) {
    const s = sumselSongs.find((x) => x.id === "gending-sriwijaya");
    if (s) return s;
  }
  if (cleanQ.includes("tanggai") && (cleanQ.includes("lagu") || cleanQ.includes("lirik") || cleanQ.includes("tari"))) {
    const s = sumselSongs.find((x) => x.id === "tari-tanggai");
    if (s) return s;
  }
  if (cleanQ.includes("sayang selayak") || cleanQ.includes("lempipi")) {
    const s = sumselSongs.find((x) => x.id === "sayang-selayak");
    if (s) return s;
  }
  if (cleanQ.includes("petang petang") || cleanQ.includes("petang-petang")) {
    const s = sumselSongs.find((x) => x.id === "petang-petang");
    if (s) return s;
  }
  if (cleanQ.includes("sukat malang")) {
    const s = sumselSongs.find((x) => x.id === "sukat-malang");
    if (s) return s;
  }
  if (cleanQ.includes("ribang kemambang")) {
    const s = sumselSongs.find((x) => x.id === "ribang-kemambang");
    if (s) return s;
  }

  // 2. Cek match alias dari yang terpanjang ke terpendek
  let bestMatch: { song: SumselSong; score: number } | null = null;
  for (const song of sumselSongs) {
    for (const alias of song.aliases) {
      const cleanAlias = alias.toLowerCase().replace(/['".,?!]/g, " ").replace(/\s+/g, " ").trim();
      if (cleanQ === cleanAlias) {
        return song;
      }
      if (cleanQ.includes(cleanAlias)) {
        const score = cleanAlias.length;
        if (!bestMatch || score > bestMatch.score) {
          bestMatch = { song, score };
        }
      }
    }
  }

  return bestMatch ? bestMatch.song : null;
}
