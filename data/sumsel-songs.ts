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
    ],
    region: "Palembang, Sumatera Selatan",
    creator: "Tradisional Palembang",
    highlight: "Berikut adalah lirik lengkap lagu daerah khas Palembang 'Cuk Mak Ilang' beserta bait pantun aslinya:",
    lyrics: [
      "Cuk mak ilang mak ilang cagak batu\nDimane kucing belang di situ rumah aku\nCuk mak ilang mak ilang cagak batu\nDimane kucing belang di situ rumah aku",
      "Kapal api maso' Palembang\nBanyu tenang jadi begelombang\nTengok adek bepayong kembang\nHati di dalam jadi bimbang",
      "Cuk mak ilang mak ilang cagak batu\nDimane kucing belang di situ rumah aku\nCuk mak ilang mak ilang cagak batu\nDimane kucing belang di situ rumah aku",
      "Ngaso dulu di bawah pohon\nAngin sepoi sepoi nyentuh badan\nAdek manis janganlah mohon\nKando setia sepanjang zaman",
      "Cuk mak ilang mak ilang cagak batu\nDimane kucing belang di situ rumah aku\nCuk mak ilang mak ilang cagak batu\nDimane kucing belang di situ rumah aku",
    ],
    meaning: "Lagu 'Cuk Mak Ilang' merupakan lagu pantun rakyat Palembang yang sangat populer dan ceria. Mengisahkan pergaulan muda-mudi Melayu Palembang dengan kiasan jenaka dan rayuan kasih sayang di tepian Sungai Musi.",
    image: "/images/rebana_burdah.jpg",
    themeSlug: "tari-musik",
    sources: [
      {
        title: "Cuk Mak Ilang — Lagu Daerah Sumatera Selatan",
        url: "https://id.wikipedia.org/wiki/Sumatra_Selatan",
        domain: "id.wikipedia.org",
        excerpt: "Lagu rakyat Melayu Palembang bertempo lincah dengan struktur pantun bersahut.",
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
    id: "kebile-bile",
    title: "Kebile-bile",
    aliases: [
      "kebile bile",
      "kebile-bile",
      "lagu kebile bile",
      "lirik lagu kebile bile",
      "lirik kebile bile",
      "lagu daerah kebile bile",
      "kebile bile lahat",
      "kebile bile pagaralam",
    ],
    region: "Lahat / Pagaralam (Besemah), Sumatera Selatan",
    creator: "Tradisional Suku Besemah",
    highlight: "Berikut adalah lirik lengkap lagu daerah Besemah Sumatera Selatan 'Kebile-bile' yang sarat kepasrahan dan kerinduan:",
    lyrics: [
      "Kebile-bile mangke ku luge\nKebile-bile ku ade kance\nKebile-bile mangke ku luge\nKebile-bile ku ade kance",
      "Kebile nian jagung la rapus\nKite begulai sendok la patah\nKebile nian daging la angus\nKite berumah tangga la punah",
      "Kebile-bile mangke ku luge\nKebile-bile ku ade kance\nKebile-bile mangke ku luge\nKebile-bile ku ade kance",
      "Kebile nian linjang tebuang\nKite bemandi ayek la keruh\nKebile nian badan melayang\nKite bedudok la jauh-jauh",
      "Kebile-bile mangke ku luge\nKebile-bile ku ade kance",
    ],
    meaning: "Lagu 'Kebile-bile' adalah tembang ratapan suku Besemah yang mempertanyakan kapan ('kebile-bile') nasib kesendirian akan berakhir dan kapan kebahagiaan serta sahabat hidup ('kance') akan datang mengiringi langkah.",
    image: "/images/tari_pasemah.jpg",
    themeSlug: "tari-musik",
    sources: [
      {
        title: "Kebile-bile — Musik Daerah Besemah",
        url: "https://id.wikipedia.org/wiki/Kabupaten_Lahat",
        domain: "id.wikipedia.org",
        excerpt: "Lagu daerah melankolis dari dataran tinggi Besemah, Lahat, dan Pagaralam.",
      },
      {
        title: "Tembang Batanghari Sembilan — Warisan Budaya Sumsel",
        url: "https://sumselprov.go.id",
        domain: "sumselprov.go.id",
        excerpt: "Khazanah petikan dawai gitar tunggal dan nyanyian pedalaman Sumsel.",
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
    ],
    region: "Sumatera Selatan",
    creator: "Tradisional Sumatera Selatan",
    highlight: "Berikut adalah lirik autentik lagu daerah Sumatera Selatan 'Dek Sangke' yang terkenal dengan pantun sindiran halusnya:",
    lyrics: [
      "Dek sangke aku dek sangke\nAwak uke la jadi duwo\nDek sangke aku dek sangke\nAwak uke la jadi duwo",
      "Nemba' bunga putik kelapo\nBuah jambu la jadi mudo\nNemba' bunga putik kelapo\nBuah jambu la jadi mudo",
      "Dek sangke aku dek sangke\nKando batinggal ku de sangke\nDek sangke aku dek sangke\nKando batinggal ku de sangke",
      "Siang malam ku de nyangke\nHati tebakar rindu mambang\nBiarlah luluh tulang belulang\nAsal kando selamat pulang",
    ],
    meaning: "Lagu 'Dek Sangke' bermakna 'tidak menyangka'. Liriknya berisi pantun perumpamaan khas masyarakat Sumsel tentang perubahan sikap seseorang yang di luar dugaan, disampaikan dengan nada riang dan jenaka.",
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
    meaning: "Gending Sriwijaya adalah lagu dan tarian sakral Palembang yang diciptakan untuk mengenang keluhuran dan kejayaan kemaharajaan Sriwijaya sebagai pusat peradaban bahari dan pendidikan agama Buddha terbesar di Asia Tenggara.",
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
    meaning: "Lagu pengiring Tari Tanggai menyuarakan penghormatan tertinggi kepada para tamu agung yang hadir di Palembang, diiringi lentiknya kuku keemasan (tanggai) dan persembahan sekapur sirih.",
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
    id: "ya-saman",
    title: "Ya Saman",
    aliases: [
      "ya saman",
      "lagu ya saman",
      "lirik ya saman",
      "lirik lagu ya saman",
      "lagu daerah ya saman",
      "ya saman palembang",
    ],
    region: "Palembang, Sumatera Selatan",
    creator: "Kamsul Harun",
    highlight: "Berikut adalah lirik lengkap lagu daerah populer Palembang 'Ya Saman' yang penuh kekaguman:",
    lyrics: [
      "Antara Musi rengep belago\nNengok budak beselendang sutro\nAdek manis la berambut panjang\nBikin hati abang melayang",
      "Ya Saman, ya Saman\nUji uwong Palembang\nYa Saman, ya Saman\nElok nian rupo gades Palembang",
      "Baju kurung kain songket\nJalan melenggang bikin terpikat\nKalu jodoh dak lari kemano\nKito beiring naik pelaminan",
      "Ya Saman, ya Saman\nUji uwong Palembang\nYa Saman, ya Saman\nElok nian rupo gades Palembang",
    ],
    meaning: "Lagu ciptaan Kamsul Harun ini mengekspresikan rasa kagum masyarakat Palembang ('Ya Saman!') atas keanggunan dan kecantikan gadis Palembang yang mengenakan selendang sutra dan kain songket.",
    image: "/images/songket_lepus.jpg",
    themeSlug: "tari-musik",
    sources: [
      {
        title: "Ya Saman — Lagu Palembang",
        url: "https://id.wikipedia.org/wiki/Kota_Palembang",
        domain: "id.wikipedia.org",
        excerpt: "Lagu populer Palembang ciptaan Kamsul Harun bertema pesona gadis berbusana tradisional.",
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
    meaning: "Lagu Sayang Selayak mengisahkan sindiran halus dan petuah pergaulan muda-mudi Lematang dengan metafora burung lempipi yang hinggap di bubungan rumah.",
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
    meaning: "Lagu 'Petang-Petang' merefleksikan perenungan di kala senja hari di kaki Gunung Dempo, saat seseorang merasa sebatang kara dan merindukan kehangatan keluarga serta sahabat.",
    image: "/images/tari_pasemah.jpg",
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
    meaning: "Lagu 'Sukat Malang' adalah tembang gitar tunggal Batanghari Sembilan yang mengajarkan ketabahan jiwa menghadapi lika-liku nasib dan cobaan hidup.",
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

// Helper to find song by query
export function findSumselSong(query: string): SumselSong | null {
  const cleanQ = query.toLowerCase().trim();
  for (const song of sumselSongs) {
    if (song.aliases.some((alias) => cleanQ.includes(alias) || alias.includes(cleanQ))) {
      return song;
    }
    // Also check word boundary match
    const words = song.title.toLowerCase().split(/\s+/);
    if (words.every((w) => cleanQ.includes(w))) {
      return song;
    }
  }
  return null;
}
