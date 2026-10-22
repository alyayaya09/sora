import { themes, dedicatedTours, Theme, ThemeItem, DedicatedTour } from "../data/sora-content";
import { sumselSongs, findSumselSong, isLyricQuery, SumselSong } from "../data/sumsel-songs";
import fs from "fs";
import path from "path";

export interface SearchSource {
  title: string;
  domain: string;
  excerpt: string;
  icon: string;
  iconStyle: string;
  img: string;
  url: string; // required: real clickable URL
}

export interface SearchResult {
  status: "ok" | "no_result" | "outside_sumsel";
  query: string;
  note?: string;
  card1: {
    isDedicatedTour: boolean;
    tourSlug?: string;
    title: string;
    subtitle: string;
    image: string; // real URL from Wikipedia or web
    badge?: string;
    href: string;
  };
  card2: {
    title: string;
    highlight: string;
    paragraphs: string[];
    bulletPoints?: { label: string; text: string }[];
    sources: SearchSource[];
  };
  card3: {
    themeSlug: string;
    themeTitle: string;
    themeLabel: string;
    themeDesc: string;
    themeImg: string;
    themeHref: string;
    relatedItems: {
      name: string;
      desc: string;
      image: string;
      slug?: string;
      link: string;
    }[];
  };
}

export let geminiDebugLogs: string[] = [];

// ─── Rate limiter ───────────────────────────────────────────────────────────
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export interface RateLimitInfo {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetSeconds: number;
}

export function checkRateLimitWithInfo(
  identifier: string,
  limit = 20,
  windowMs = 60_000
): RateLimitInfo {
  const now = Date.now();

  // Bersihkan entri lama jika Map terlalu besar
  if (rateLimitMap.size > 2000) {
    for (const [key, val] of rateLimitMap.entries()) {
      if (now > val.resetTime) rateLimitMap.delete(key);
    }
  }

  let record = rateLimitMap.get(identifier);
  if (!record || now > record.resetTime) {
    record = { count: 1, resetTime: now + windowMs };
    rateLimitMap.set(identifier, record);
    return {
      allowed: true,
      limit,
      remaining: Math.max(0, limit - 1),
      resetSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (record.count >= limit) {
    return {
      allowed: false,
      limit,
      remaining: 0,
      resetSeconds: Math.max(1, Math.ceil((record.resetTime - now) / 1000)),
    };
  }

  record.count += 1;
  return {
    allowed: true,
    limit,
    remaining: Math.max(0, limit - record.count),
    resetSeconds: Math.max(1, Math.ceil((record.resetTime - now) / 1000)),
  };
}

export function checkRateLimit(identifier: string, limit = 20, windowMs = 60_000): boolean {
  return checkRateLimitWithInfo(identifier, limit, windowMs).allowed;
}

// ─── Trigger keywords for dedicated tours (prevents city name queries like 'palembang' or 'lahat' from triggering food/dialect tours) ─────
const tourTriggerKeywords: Record<string, string[]> = {
  "pempek-palembang": ["pempek", "mpek-mpek", "empek-empek", "empek", "mpek", "cuko", "kapal selam", "tekwan"],
  "songket-palembang": ["songket", "tenun songket", "kain songket", "lepus"],
  "rumah-limas": ["rumah limas", "arsitektur limas", "limas palembang"],
  "tari-gending-sriwijaya": ["gending sriwijaya", "tari gending"],
  "tari-tanggai": ["tari tanggai", "tanggai"],
  "kesultanan-palembang-darussalam": ["kesultanan palembang", "sultan mahmud badaruddin", "palembang darussalam"],
  "dulmuluk": ["dulmuluk", "teater dulmuluk", "syair abdul muluk"],
  "aksara-ulu": ["aksara ulu", "surat ulu", "kaganga", "aksara kaganga", "surat incung"],
  "perahu-bidar": ["perahu bidar", "bidar", "lomba bidar"],
  "gitar-tunggal": ["gitar tunggal", "batanghari sembilan"],
  "pindang-patin": ["pindang", "pindang patin", "pindang meranjat"],
  "kue-maksuba": ["maksuba", "kue maksuba"],
  "tari-kebagh": ["tari kebagh", "kebagh"],
  "megalitik-pasemah": ["megalitik", "megalit", "batu megalit", "menhir pasemah"],
  "candi-bumi-ayu": ["candi bumi ayu", "bumi ayu"],
  "bahasa-lematang": ["bahasa lematang", "dialek lematang", "tutur lematang"],
  "bahasa-komering": ["bahasa komering", "suku komering"],
  "bahasa-ogan": ["bahasa ogan", "dialek ogan"],
  "bahasa-rawas": ["bahasa rawas", "dialek rawas"],
};

// ─── Database 17 Kabupaten/Kota di Sumatera Selatan ──────────────────────────
export interface SumselRegionInfo {
  id: string;
  name: string;
  aliases: string[];
  title: string;
  subtitle: string;
  highlight: string;
  paragraphs: string[];
  bulletPoints: { label: string; text: string }[];
  sources: SearchSource[];
  image: string;
  themeSlug: string;
  imageSearchQuery: string;
  titleWikipediaId: string;
}

export const sumselRegionsData: SumselRegionInfo[] = [
  {
    id: "palembang",
    name: "Kota Palembang",
    aliases: ["palembang", "kota palembang", "kota sriwijaya", "bumi sriwijaya", "palembang city"],
    title: "Kota Palembang",
    subtitle: "Ibu kota Provinsi Sumatera Selatan, kota tertua di Indonesia, dan pusat peradaban Kedatuan Sriwijaya di tepian Sungai Musi.",
    highlight: "Kota Palembang adalah ibu kota Provinsi Sumatera Selatan sekaligus kota tertua di Indonesia (berdiri sejak 17 Juni 683 M berdasarkan Prasasti Kedukan Bukit). Kota ini tersohor dengan julukan 'Bumi Sriwijaya' dan 'Venesia dari Timur' berkat peradaban bahari Sungai Musi serta megahnya Jembatan Ampera.",
    paragraphs: [
      "Sejarah & Peradaban Luhur:\nPalembang merupakan pusat kemaharajaan maritim terbesar di Nusantara pada masa Kedatuan Sriwijaya yang menguasai jalur pelayaran niaga Selat Malaka. Memasuki era Islam, kota ini menjelma menjadi pusat Kesultanan Palembang Darussalam yang makmur dan berdaulat di bawah pimpinan para sultan terkemuka, termasuk Pahlawan Nasional Sultan Mahmud Badaruddin II.",
      "Ikonografi Budaya & Arsitektur:\nIdentitas visual Palembang terwakili oleh kemegahan Jembatan Ampera yang membentang gagah di atas Sungai Musi, Benteng Kuto Besak (BKB) sebagai benteng pertahanan bata kokoh warisan kesultanan, kemegahan Masjid Agung Sultan Mahmud Badaruddin I, Pulau Kemaro yang sarat legenda toleransi budaya, serta arsitektur vernakular Rumah Limas dan Rumah Rakit.",
      "Khazanah Adat & Kuliner Dunia:\nPalembang dikenal luas lewat mahakarya adibusana Songket Lepus berbahan benang emas murni yang dijuluki 'Ratu Segala Kain'. Di sektor kuliner, kelezatan Pempek berbahan ikan segar berpadu kuah cuko pedas-manis-gurih telah diakui secara global, berdampingan dengan sajian khas tekwan, laksan, celimpungan, burgo, hingga kue basah legit maksuba."
    ],
    bulletPoints: [
      { label: "Status Wilayah", text: "Ibu Kota Provinsi Sumatera Selatan" },
      { label: "Hari Jadi", text: "17 Juni 683 M (Kota Tertua di Indonesia, Prasasti Kedukan Bukit)" },
      { label: "Ikon Utama", text: "Jembatan Ampera, Sungai Musi, Benteng Kuto Besak, Songket, & Pempek" },
      { label: "Julukan", text: "Bumi Sriwijaya, Kota Pempek, Venice of the East" }
    ],
    sources: [
      {
        title: "Kota Palembang — Wikipedia",
        url: "https://id.wikipedia.org/wiki/Kota_Palembang",
        domain: "id.wikipedia.org",
        excerpt: "Ibu kota Provinsi Sumatera Selatan dan salah satu kota tertua di Indonesia.",
        icon: "W",
        iconStyle: "bg-white text-slate-900",
        img: ""
      },
      {
        title: "Portal Resmi Pemerintah Kota Palembang",
        url: "https://palembang.go.id",
        domain: "palembang.go.id",
        excerpt: "Layanan informasi dan dokumentasi resmi Pemerintah Kota Palembang.",
        icon: "🏛",
        iconStyle: "bg-[#6b1d2f] text-white",
        img: ""
      }
    ],
    image: "/images/ampera_hero.jpg",
    themeSlug: "sejarah",
    imageSearchQuery: "Kota Palembang Jembatan Ampera",
    titleWikipediaId: "Kota_Palembang"
  },
  {
    id: "prabumulih",
    name: "Kota Prabumulih",
    aliases: ["prabumulih", "kota prabumulih", "prabu", "kota nanas"],
    title: "Kota Prabumulih",
    subtitle: "Kota otonom strategis di Sumatera Selatan yang tersohor dengan julukan 'Kota Nanas' dan lumbung energi migas.",
    highlight: "Kota Prabumulih adalah salah satu kota otonom di Sumatera Selatan yang menempati lokasi persimpangan strategis perlintasan Sumatera. Kota ini sangat terkenal dengan produksi buah nanas manis berkualitas tinggi hingga dijuluki 'Kota Nanas', sekaligus menjadi sentra pertambangan minyak bumi dan gas alam bersejarah di Sumsel.",
    paragraphs: [
      "Geografi & Peran Strategis:\nSecara geografis, Prabumulih terletak di bagian tengah Provinsi Sumatera Selatan dan berbatasan langsung dengan Kabupaten Muara Enim serta Penukal Abab Lematang Ilir (PALI). Posisi perlintasan rel kereta api pengangkut logistik dan jalan raya lintas Sumatera menjadikan Prabumulih simpul perdagangan, jasa, dan mobilitas masyarakat yang sangat dinamis.",
      "Pertanian Unggulan & Industri Nanas:\nPrabumulih dikenal menghasilkan nanas dengan kadar kemanisan tinggi dan cita rasa segar yang khas. Olahan nanas Prabumulih telah berkembang menjadi aneka produk bernilai tambah tinggi seperti selai nanas, sirup, dodol, keripik nanas, hingga inovasi serat daun nanas yang dipintal menjadi benang dan kain tenun bernilai ekonomi ekspor.",
      "Energi, Budaya, & Pariwisata:\nSebagai salah satu kota pertambangan migas tertua di Sumatera Selatan sejak masa Hindia Belanda, Prabumulih memiliki fasilitas pengolahan migas Pertamina yang bersejarah. Masyarakat Prabumulih menjunjung tinggi adat Melayu Enim dan Lematang yang guyub dengan semboyan 'Seinggok Sepemunyian', serta memiliki destinasi favorit seperti Danau Buji, Islamic Center Prabumulih, dan Desa Wisata Nanas."
    ],
    bulletPoints: [
      { label: "Status Wilayah", text: "Kota Otonom di Provinsi Sumatera Selatan" },
      { label: "Julukan", text: "Kota Nanas & Kota Minyak" },
      { label: "Komoditas Khas", text: "Nanas Manis Prabumulih, Benang Serat Nanas, Minyak Bumi & Gas Alam" },
      { label: "Semboyan", text: "Seinggok Sepemunyian (Satu Hati Sepakat Menuju Kesejahteraan Bersama)" }
    ],
    sources: [
      {
        title: "Kota Prabumulih — Wikipedia",
        url: "https://id.wikipedia.org/wiki/Kota_Prabumulih",
        domain: "id.wikipedia.org",
        excerpt: "Kota otonom di Sumatera Selatan yang terkenal sebagai sentra penghasil nanas dan minyak bumi.",
        icon: "W",
        iconStyle: "bg-white text-slate-900",
        img: ""
      },
      {
        title: "Portal Resmi Pemerintah Kota Prabumulih",
        url: "https://kotaprabumulih.go.id",
        domain: "kotaprabumulih.go.id",
        excerpt: "Layanan informasi publik resmi Pemerintah Kota Prabumulih.",
        icon: "🏛",
        iconStyle: "bg-[#6b1d2f] text-white",
        img: ""
      }
    ],
    image: "/images/musi_landscape.jpg",
    themeSlug: "kuliner",
    imageSearchQuery: "Kota Prabumulih Nanas",
    titleWikipediaId: "Kota_Prabumulih"
  },
  {
    id: "lahat",
    name: "Kabupaten Lahat",
    aliases: ["lahat", "kabupaten lahat", "kab lahat", "bumi seganti setungguan"],
    title: "Kabupaten Lahat",
    subtitle: "Bumi Seganti Setungguan, pusat peradaban megalitikum Pasemah terbesar di Indonesia di bawah naungan Bukit Serelo.",
    highlight: "Kabupaten Lahat adalah salah satu kabupaten tertua di Sumatera Selatan yang berjuluk 'Bumi Seganti Setungguan'. Lahat merupakan pusat peradaban megalitikum terkaya di Nusantara dengan ribuan artefak batu megalit Pasemah, serta berhiaskan ikon bentang alam spektakuler Bukit Serelo (Gunung Jempol) dan Sungai Lematang.",
    paragraphs: [
      "Peradaban Megalitikum Tertua di Indonesia:\nKabupaten Lahat menyimpan kekayaan arkeologi megalitikum Pasemah yang membentang dari ribuan tahun silam. Di dataran tinggi Lahat dan lembah Lematang, terdapat ribuan menhir, dolmen, arca batu manusia menunggang gajah, dan bilik batu megalit yang telah diakui oleh MURI serta menjadi salah satu warisan arkeologi prasejarah terpenting di Asia Tenggara.",
      "Panorama Alam Spektakuler & Bukit Serelo:\nBentang geografis Lahat yang berbukit menyajikan panorama alam memukau. Ikon paling tersohor adalah Bukit Serelo atau sering disebut Gunung Jempol karena bentuk puncaknya yang unik menyerupai ibu jari mengacung ke langit. Lahat juga dialiri Sungai Lematang yang jernih di bagian hulu serta memiliki puluhan air terjun (curup) alami yang mempesona, seperti Curup Maung dan Curup Panjang.",
      "Tradisi Luhur Suku Besemah & Kopi Lahat:\nLahat dihuni oleh rumpun masyarakat Melayu Besemah, Lematang, Gumay, dan Kikim yang memiliki kearifan luhur. Budaya tutur tadut, sastra rejung, tari kebagh, tradisi rumah adat Ghumah Baghi, serta perkebunan kopi robusta Lahat yang harum pekat menjadikan Lahat destinasi budaya dan sejarah yang tiada duanya."
    ],
    bulletPoints: [
      { label: "Status Wilayah", text: "Kabupaten di Provinsi Sumatera Selatan" },
      { label: "Julukan & Semboyan", text: "Bumi Seganti Setungguan (Satu Persepsi dan Saling Menopang)" },
      { label: "Ikon Utama", text: "Bukit Serelo (Gunung Jempol), Sungai Lematang, & Situs Megalitik Pasemah" },
      { label: "Kekayaan Khusus", text: "Pusat situs megalitikum terbanyak di Indonesia & Kopi Robusta Lahat" }
    ],
    sources: [
      {
        title: "Kabupaten Lahat — Wikipedia",
        url: "https://id.wikipedia.org/wiki/Kabupaten_Lahat",
        domain: "id.wikipedia.org",
        excerpt: "Kabupaten di Sumatera Selatan yang kaya akan peninggalan megalitikum Pasemah dan panorama Bukit Serelo.",
        icon: "W",
        iconStyle: "bg-white text-slate-900",
        img: ""
      },
      {
        title: "Portal Resmi Pemerintah Kabupaten Lahat",
        url: "https://lahatkab.go.id",
        domain: "lahatkab.go.id",
        excerpt: "Layanan informasi publik resmi Pemerintah Kabupaten Lahat.",
        icon: "🏛",
        iconStyle: "bg-[#6b1d2f] text-white",
        img: ""
      }
    ],
    image: "/images/sungai_lematang.jpg",
    themeSlug: "sejarah",
    imageSearchQuery: "Kabupaten Lahat Bukit Serelo Megalitik",
    titleWikipediaId: "Kabupaten_Lahat"
  },
  {
    id: "pagaralam",
    name: "Kota Pagar Alam",
    aliases: ["pagar alam", "kota pagar alam", "pagaralam", "kota pagaralam", "besemah", "gunung dempo"],
    title: "Kota Pagar Alam",
    subtitle: "Kota pegunungan sejuk di lereng Gunung Dempo, pusat kebudayaan suku Besemah dan hamparan kebun teh tertua di Sumsel.",
    highlight: "Kota Pagar Alam adalah kota pegunungan di Sumatera Selatan yang terletak di kaki Gunung Dempo (3.159 mdpl). Kota ini terkenal dengan keindahan perkebunan teh Gunung Dempo yang menghampar hijau, hawa sejuk berkabut, puluhan air terjun (curup) alami, serta situs arca megalitik Pasemah.",
    paragraphs: [
      "Pesona Alam Gunung Dempo & Perkebunan Teh:\nGunung Dempo merupakan atap tertinggi Sumatera Selatan yang menjadi magnet bagi para pendaki dan wisatawan pencinta alam. Di lerengnya terbentang perkebunan teh peninggalan kolonial Belanda yang menghasilkan teh hitam berkualitas ekspor dengan udara pegunungan yang sangat menyegarkan.",
      "Pusat Peradaban & Suku Besemah:\nPagar Alam adalah jantung kebudayaan suku Besemah. Di sini berkembang kesenian sakral Tari Kebagh yang dahulu hanya ditarikan untuk menyambut pangeran dan tamu kehormatan, sastra tutur Rejung, serta arsitektur vernakular Ghumah Baghi yang tahan gempa.",
      "Destinasi Wisata Alam Berlimpah:\nKota ini kaya akan air terjun alami berair jernih seperti Curup Embun, Curup Mangkok, dan Curup Tujuh Kenangan, serta memiliki situs batu megalit bersejarah Tegur Wangi yang sarat misteri peradaban kuno Nusantara."
    ],
    bulletPoints: [
      { label: "Status Wilayah", text: "Kota Otonom di Provinsi Sumatera Selatan" },
      { label: "Puncak Tertinggi", text: "Gunung Dempo (3.159 meter di atas permukaan laut)" },
      { label: "Ikon Wisata", text: "Kebun Teh Gunung Dempo, Curup Embun, & Megalitik Tegur Wangi" },
      { label: "Semboyan", text: "Besemah (Bersih, Sejuk, Ramah)" }
    ],
    sources: [
      {
        title: "Kota Pagar Alam — Wikipedia",
        url: "https://id.wikipedia.org/wiki/Kota_Pagar_Alam",
        domain: "id.wikipedia.org",
        excerpt: "Kota wisata pegunungan di Sumatera Selatan di lereng Gunung Dempo.",
        icon: "W",
        iconStyle: "bg-white text-slate-900",
        img: ""
      }
    ],
    image: "/images/megalitik_pasemah.jpg",
    themeSlug: "sejarah",
    imageSearchQuery: "Kota Pagar Alam Gunung Dempo",
    titleWikipediaId: "Kota_Pagar_Alam"
  },
  {
    id: "muara-enim",
    name: "Kabupaten Muara Enim",
    aliases: ["muara enim", "kabupaten muara enim", "kab muara enim", "tanjung enim"],
    title: "Kabupaten Muara Enim",
    subtitle: "Bumi Serasan Sekundang, lumbung energi Sumatera Selatan dengan pesona alam spektakuler Air Terjun Curup Tenang Bedegung.",
    highlight: "Kabupaten Muara Enim adalah salah satu kabupaten terkemuka di Sumatera Selatan yang berjuluk 'Bumi Serasan Sekundang'. Daerah ini terkenal sebagai salah satu lumbung energi nasional penghasil batubara, minyak, dan gas bumi terbesar, serta memiliki panorama wisata alam mempesona seperti Air Terjun Curup Tenang Bedegung.",
    paragraphs: [
      "Lumbung Energi Sumatera Selatan:\nMuara Enim memiliki cadangan batubara terbesar di Indonesia yang ditambang di Tanjung Enim oleh PT Bukit Asam. Pertambangan ini menggerakkan sektor energi nasional dan listrik interkoneksi Sumatera-Jawa.",
      "Keindahan Wisata Alam Bedegung:\nSalah satu destinasi kebanggaan Muara Enim adalah Air Terjun Bedegung (Curup Tenang) yang memiliki ketinggian sekitar 99 meter dan bersumber dari mata air alami Celah Bukit Barisan, menyajikan pemandangan alam asri yang memukau.",
      "Kekayaan Adat Semendo & Perkebunan Kopi:\nDi bagian selatan, terdapat Dataran Tinggi Semende yang dihuni masyarakat suku Semendo. Wilayah ini terkenal dengan perkebunan Kopi Robusta Semendo yang beraroma harum pekat dan memiliki tradisi adat Tunggu Tubang yang menjaga warisan keluarga secara turun-temurun."
    ],
    bulletPoints: [
      { label: "Status Wilayah", text: "Kabupaten di Provinsi Sumatera Selatan" },
      { label: "Julukan & Semboyan", text: "Bumi Serasan Sekundang (Seia Sekata, Sehati Menuju Keberkahan)" },
      { label: "Destinasi Ikonik", text: "Air Terjun Curup Tenang Bedegung & Dataran Tinggi Semendo" },
      { label: "Komoditas Unggulan", text: "Kopi Semendo, Batubara, Minyak Bumi, & Karet" }
    ],
    sources: [
      {
        title: "Kabupaten Muara Enim — Wikipedia",
        url: "https://id.wikipedia.org/wiki/Kabupaten_Muara_Enim",
        domain: "id.wikipedia.org",
        excerpt: "Kabupaten di Sumatera Selatan yang kaya sumber daya mineral dan pariwisata alam.",
        icon: "W",
        iconStyle: "bg-white text-slate-900",
        img: ""
      }
    ],
    image: "/images/sungai_lematang.jpg",
    themeSlug: "rumah-adat",
    imageSearchQuery: "Kabupaten Muara Enim Curup Bedegung",
    titleWikipediaId: "Kabupaten_Muara_Enim"
  },
  {
    id: "lubuklinggau",
    name: "Kota Lubuklinggau",
    aliases: ["lubuklinggau", "kota lubuklinggau", "lubuk linggau", "linggau"],
    title: "Kota Lubuklinggau",
    subtitle: "Kota Sebiduk Semare di barat Sumatera Selatan dengan pesona Bukit Sulap dan Air Terjun Temam yang dijuluki Niagara mini.",
    highlight: "Kota Lubuklinggau adalah kota otonom strategis di perbatasan barat Sumatera Selatan dengan Provinsi Bengkulu. Kota ini berjuluk 'Kota Sebiduk Semare' dan terkenal dengan pesona bentang alam Bukit Sulap serta Air Terjun Temam yang anggun melebar menyerupai tirai air terjun Niagara versi mini.",
    paragraphs: [
      "Posisi Geografis & Simpul Transportasi:\nLubuklinggau merupakan kota persinggahan penting di jalur lintas barat dan tengah Sumatera. Stasiun Kereta Api Lubuklinggau menjadi terminus paling barat jalur rel kereta api di Sumatera Selatan yang menghubungkannya langsung dengan Kota Palembang.",
      "Wisata Alam Air Terjun Temam & Bukit Sulap:\nAir Terjun Temam merupakan ikon wisata alam paling terkenal di Lubuklinggau dengan ketinggian 12 meter dan bentangan tirai air selebar 25 meter. Sementara Bukit Sulap yang berada di kawasan Taman Nasional Kerinci Seblat menyajikan pemandangan lanskap kota dari ketinggian dengan fasilitas inclinator kereta gantung.",
      "Religi & Kebudayaan:\nKota ini memiliki Masjid Agung As-Salam yang megah dengan menara kembar modern dan prasasti adat. Masyarakat Lubuklinggau merupakan perpaduan harmonis suku Melayu Rawas, Musi, Rejang, dan pendatang dari berbagai penjuru Nusantara."
    ],
    bulletPoints: [
      { label: "Status Wilayah", text: "Kota Otonom di Provinsi Sumatera Selatan" },
      { label: "Semboyan", text: "Sebiduk Semare (Satu Perahu Mengayuh Menuju Tujuan yang Sama)" },
      { label: "Ikon Wisata", text: "Air Terjun Temam (Niagara Mini Sumsel) & Bukit Sulap" },
      { label: "Infrastruktur Utama", text: "Stasiun Terminus Lubuklinggau & Bandara Silampari" }
    ],
    sources: [
      {
        title: "Kota Lubuklinggau — Wikipedia",
        url: "https://id.wikipedia.org/wiki/Kota_Lubuklinggau",
        domain: "id.wikipedia.org",
        excerpt: "Kota transit strategis di Sumatera Selatan di kaki Bukit Sulap.",
        icon: "W",
        iconStyle: "bg-white text-slate-900",
        img: ""
      }
    ],
    image: "/images/sungai_musi_sekayu.jpg",
    themeSlug: "sejarah",
    imageSearchQuery: "Kota Lubuklinggau Air Terjun Temam",
    titleWikipediaId: "Kota_Lubuklinggau"
  },
  {
    id: "banyuasin",
    name: "Kabupaten Banyuasin",
    aliases: ["banyuasin", "kabupaten banyuasin", "pangkalan balai", "sembilang", "tanjung api api"],
    title: "Kabupaten Banyuasin",
    subtitle: "Bumi Sedulang Setudung, habitat migrasi burung dunia di Taman Nasional Sembilang dan lumbung pangan pesisir Sumsel.",
    highlight: "Kabupaten Banyuasin membentang di pesisir timur Sumatera Selatan dengan ibu kota Pangkalan Balai. Kabupaten ini berjuluk 'Bumi Sedulang Setudung' dan tersohor dengan ekosistem mangrove Taman Nasional Sembilang tempat persinggahan migrasi burung antarbenua dari Siberia, serta lumbung padi pasang surut utama Sumsel.",
    paragraphs: [
      "Ekosistem Mangrove & Taman Nasional Sembilang:\nTaman Nasional Sembilang merupakan salah satu bentang hutan mangrove terluas di Indonesia barat. Setiap akhir tahun, kawasan berlumpur ini menjadi tempat mampir ratusan ribu burung migran dunia seperti burung Bluwok (Mycteria cinerea) dalam rute migrasi Asia Timur-Australasia.",
      "Lumbung Beras Pasang Surut:\nMemanfaatkan teknologi pertanian lahan rawa pasang surut, Banyuasin menjelma menjadi salah satu sentra penghasil beras terbesar di Indonesia yang menopang ketahanan pangan nasional.",
      "Kawasan Strategis Tanjung Api-Api:\nBanyuasin memiliki kawasan pelabuhan laut internasional Tanjung Api-Api (TAA) yang menjadi pintu gerbang ekspor-impor maritim Sumatera Selatan menuju Selat Bangka dan Laut Natuna."
    ],
    bulletPoints: [
      { label: "Status Wilayah", text: "Kabupaten di Provinsi Sumatera Selatan" },
      { label: "Semboyan", text: "Sedulang Setudung (Bersatu Padu dalam Kebersamaan)" },
      { label: "Cagar Alam Dunia", text: "Taman Nasional Sembilang (Surganya Burung Migran Dunia)" },
      { label: "Potensi Utama", text: "Lumbung Padi Pasang Surut, Kelapa Pasang Surut, & Perikanan Pesisir" }
    ],
    sources: [
      {
        title: "Kabupaten Banyuasin — Wikipedia",
        url: "https://id.wikipedia.org/wiki/Kabupaten_Banyuasin",
        domain: "id.wikipedia.org",
        excerpt: "Kabupaten di pesisir timur Sumatera Selatan dengan Taman Nasional Sembilang.",
        icon: "W",
        iconStyle: "bg-white text-slate-900",
        img: ""
      }
    ],
    image: "/images/musi_landscape.jpg",
    themeSlug: "sejarah",
    imageSearchQuery: "Kabupaten Banyuasin Taman Nasional Sembilang",
    titleWikipediaId: "Kabupaten_Banyuasin"
  },
  {
    id: "musi-banyuasin",
    name: "Kabupaten Musi Banyuasin",
    aliases: ["musi banyuasin", "muba", "sekayu", "kabupaten musi banyuasin"],
    title: "Kabupaten Musi Banyuasin",
    subtitle: "Bumi Serasan Sekate, sentra kain Gambo Muba ramah lingkungan dan sastra tutur lisan Senjang di tepian Sungai Musi.",
    highlight: "Kabupaten Musi Banyuasin (Muba) dengan ibu kota Sekayu adalah daerah kaya sumber daya energi dan tradisi budaya di Sumatera Selatan. Kabupaten ini berjuluk 'Bumi Serasan Sekate' dan terkenal dengan inovasi adibusana Gambo Muba dari getah gambir alami serta seni sastra tutur Senjang.",
    paragraphs: [
      "Inovasi Wastra Gambo Muba:\nGambo Muba merupakan produk tekstil khas Musi Banyuasin yang memanfaatkan limbah getah pohon gambir (Uncaria gambir) sebagai pewarna alami ramah lingkungan. Kain ini telah menembus panggung busana nasional hingga internasional.",
      "Seni Tutur Lisan Senjang:\nSenjang adalah sastra lisan tradisional kebanggaan Wong Muba berupa seni berbalas pantun berirama yang diiringi tabuhan musik tradisional Melayu Musi, berisi nasihat bijak, ungkapan asmara, maupun kritik sosial konstruktif.",
      "Kekayaan Alam & Ibu Kota Sekayu:\nMuba dialiri oleh aliran Sungai Musi yang lebar dengan jembatan megah Jembatan Musi Sekayu. Kota Sekayu juga dikenal tertata rapi dengan ikon Danau Ulak Lia serta sirkuit balap Skyland bertaraf internasional."
    ],
    bulletPoints: [
      { label: "Status Wilayah", text: "Kabupaten di Provinsi Sumatera Selatan" },
      { label: "Semboyan", text: "Serasan Sekate (Sejalan Seia Sekata dalam Kemajuan)" },
      { label: "Warisan Budaya", text: "Kain Etnik Gambo Muba & Sastra Tutur Senjang" },
      { label: "Ibu Kota", text: "Sekayu (Tepian Sungai Musi)" }
    ],
    sources: [
      {
        title: "Kabupaten Musi Banyuasin — Wikipedia",
        url: "https://id.wikipedia.org/wiki/Kabupaten_Musi_Banyuasin",
        domain: "id.wikipedia.org",
        excerpt: "Kabupaten di Sumatera Selatan yang kaya migas, perkebunan sawit, dan budaya Gambo Muba.",
        icon: "W",
        iconStyle: "bg-white text-slate-900",
        img: ""
      }
    ],
    image: "/images/senjang_muba.jpg",
    themeSlug: "pertunjukan-lisan",
    imageSearchQuery: "Kabupaten Musi Banyuasin Sekayu Gambo",
    titleWikipediaId: "Kabupaten_Musi_Banyuasin"
  },
  {
    id: "ogan-ilir",
    name: "Kabupaten Ogan Ilir",
    aliases: ["ogan ilir", "indralaya", "tanjung batu", "kabupaten ogan ilir"],
    title: "Kabupaten Ogan Ilir",
    subtitle: "Bumi Caram Seguguk, pusat pendidikan Universitas Sriwijaya dan sentra kerajinan perak serta pandai besi Tanjung Batu.",
    highlight: "Kabupaten Ogan Ilir dengan pusat pemerintahan di Indralaya berjuluk 'Bumi Caram Seguguk'. Daerah ini dikenal sebagai kota santri dan pendidikan tempat berdirinya kampus utama Universitas Sriwijaya (Unsri), serta sentra kerajinan emas perak, tembaga, dan pandai besi legendaris di Tanjung Batu.",
    paragraphs: [
      "Pusat Pendidikan & Kota Santri:\nOgan Ilir menampung ribuan mahasiswa dari penjuru Indonesia di Kampus Indralaya Universitas Sriwijaya seluas ratusan hektar, serta memiliki pondok-pondok pesantren berpengaruh seperti Ponpes Al-Ittifaqiah dan Raudhatul Ulum.",
      "Sentra Kerajinan Emas, Perak, & Pandai Besi Tanjung Batu:\nKecamatan Tanjung Batu sejak berabad-abad silam telah tersohor sebagai pusat kerajinan logam mulia, ukiran perak, serta pembuatan senjata tradisional pisau dan parang yang halus buatannya.",
      "Karakteristik Alam Rawa Lebak:\nWilayah Ogan Ilir dihiasi oleh bentang rawa lebak lebung yang dialiri Sungai Ogan dan Sungai Kelekar, menghidupkan tradisi perikanan tangkap tawar dan aneka olahan pindang lezat seperti Pindang Meranjat dan Pindang Pegagan."
    ],
    bulletPoints: [
      { label: "Status Wilayah", text: "Kabupaten di Provinsi Sumatera Selatan" },
      { label: "Semboyan", text: "Caram Seguguk (Kebersamaan Menjaga Perdamaian dan Ketenteraman)" },
      { label: "Sentra Kerajinan", text: "Kerajinan Emas & Perak Tanjung Batu, Rumah Kayu Bongkar Pasang" },
      { label: "Kuliner Khas", text: "Pindang Meranjat, Pindang Pegagan, & Gula Puan" }
    ],
    sources: [
      {
        title: "Kabupaten Ogan Ilir — Wikipedia",
        url: "https://id.wikipedia.org/wiki/Kabupaten_Ogan_Ilir",
        domain: "id.wikipedia.org",
        excerpt: "Kabupaten di Sumatera Selatan pusat kampus utama Unsri dan kerajinan Tanjung Batu.",
        icon: "W",
        iconStyle: "bg-white text-slate-900",
        img: ""
      }
    ],
    image: "/images/perahu_ketek.jpg",
    themeSlug: "rumah-adat",
    imageSearchQuery: "Kabupaten Ogan Ilir Indralaya Tanjung Batu",
    titleWikipediaId: "Kabupaten_Ogan_Ilir"
  },
  {
    id: "ogan-komering-ilir",
    name: "Kabupaten Ogan Komering Ilir (OKI)",
    aliases: ["ogan komering ilir", "oki", "kayuagung", "kayu agung", "pedamaran", "kabupaten oki"],
    title: "Kabupaten Ogan Komering Ilir (OKI)",
    subtitle: "Bumi Bende Seguguk, pusat tradisi tikar anyaman Purun Pedamaran dan Rumah Kayuagung pesisir rawa lebak.",
    highlight: "Kabupaten Ogan Komering Ilir (OKI) dengan ibu kota Kayuagung adalah kabupaten terluas di Sumatera Selatan yang berjuluk 'Bumi Bende Seguguk'. Daerah ini tersohor dengan kekayaan ekosistem rawa gambut, tradisi kerajinan anyaman Purun Pedamaran, Rumah Limas 100 Tiang di Sugih Waras, dan keindahan Danau Teluk Gelam.",
    paragraphs: [
      "Kerajinan Anyaman Purun Pedamaran:\nTumbuhan purun yang tumbuh subur di rawa gambut Pedamaran dipanen dan diolah oleh para perajin perempuan menjadi aneka tikar, tas, dan cinderamata bernilai seni tinggi yang diakui sebagai Warisan Budaya Takbenda Indonesia.",
      "Arsitektur Adat & Rumah Limas 100 Tiang:\nDi desa Sugih Waras Teluk Gelam berdiri Rumah Limas Seratus Tiang yang didirikan pada abad ke-19, mencerminkan kejayaan arsitektur panggung kayu ulin dan tembesu tanpa paku besi peninggalan para pangeran pesisir Komering.",
      "Kebudayaan Wong Kayuagung & Danau Teluk Gelam:\nMasyarakat Kayuagung memiliki bahasa dan dialek yang khas serta tradisi arak-arakan Midang Morge Siwe saat Hari Raya Idulfitri. OKI juga memiliki destinasi wisata air Danau Teluk Gelam yang asri."
    ],
    bulletPoints: [
      { label: "Status Wilayah", text: "Kabupaten di Provinsi Sumatera Selatan" },
      { label: "Semboyan", text: "Bende Seguguk (Gong Kebesaran Pengikat Persatuan Masyarakat)" },
      { label: "Warisan Budaya", text: "Anyaman Purun Pedamaran, Midang Morge Siwe, & Rumah 100 Tiang" },
      { label: "Ibu Kota", text: "Kayuagung" }
    ],
    sources: [
      {
        title: "Kabupaten Ogan Komering Ilir — Wikipedia",
        url: "https://id.wikipedia.org/wiki/Kabupaten_Ogan_Komering_Ilir",
        domain: "id.wikipedia.org",
        excerpt: "Kabupaten terluas di Sumatera Selatan dengan kekayaan rawa gambut dan budaya Kayuagung.",
        icon: "W",
        iconStyle: "bg-white text-slate-900",
        img: ""
      }
    ],
    image: "/images/purun_pedamaran.jpg",
    themeSlug: "kain-pakaian",
    imageSearchQuery: "Kabupaten Ogan Komering Ilir Kayuagung Purun",
    titleWikipediaId: "Kabupaten_Ogan_Komering_Ilir"
  },
  {
    id: "ogan-komering-ulu",
    name: "Kabupaten Ogan Komering Ulu (OKU)",
    aliases: ["ogan komering ulu", "oku", "baturaja", "kabupaten oku"],
    title: "Kabupaten Ogan Komering Ulu (OKU)",
    subtitle: "Bumi Sebimbing Sekundang dengan keajaiban karst Gua Putri dan situs arkeologi prasejarah Gua Harimau di Baturaja.",
    highlight: "Kabupaten OKU dengan ibu kota Baturaja berjuluk 'Bumi Sebimbing Sekundang'. Daerah ini menyimpan warisan geologi dan arkeologi prasejarah kelas dunia di kawasan karst Padang Bindu, meliputi Gua Putri yang sarat legenda Si Pahit Lidah serta Gua Harimau tempat ditemukannya hunian manusia purba tertua di Sumatera Selatan.",
    paragraphs: [
      "Arkeologi Prasejarah Gua Harimau:\nGua Harimau di OKU menjadi situs penemuan puluhan kerangka manusia purba ras Mongoloid dan Australomelanesid berusia hingga 4.000 tahun silam, lengkap dengan lukisan cadas purba (rock art) langka di dinding gua.",
      "Legenda & Pesona Gua Putri:\nGua Putri merupakan gua karst yang dihiasi stalaktit dan stalagmit berkilauan. Menurut legenda tutur rakyat setempat, gua ini berkaitan dengan sumpah Si Pahit Lidah terhadap Putri Dayang Merindu yang berubah menjadi batu.",
      "Kota Industri Baturaja & Sungai Ogan:\nBaturaja dialiri oleh aliran Sungai Ogan yang berbatu dan menjadi pusat industri semen terkemuka Semen Baturaja, serta memiliki sentra batu akik Baturaja yang pernah tersohor di seluruh Indonesia."
    ],
    bulletPoints: [
      { label: "Status Wilayah", text: "Kabupaten di Provinsi Sumatera Selatan" },
      { label: "Semboyan", text: "Sebimbing Sekundang (Saling Membimbing dan Saling Menyayangi)" },
      { label: "Situs Dunia", text: "Gua Putri & Gua Harimau (Situs Arkeologi Prasejarah Terlengkap Sumsel)" },
      { label: "Ibu Kota", text: "Baturaja" }
    ],
    sources: [
      {
        title: "Kabupaten Ogan Komering Ulu — Wikipedia",
        url: "https://id.wikipedia.org/wiki/Kabupaten_Ogan_Komering_Ulu",
        domain: "id.wikipedia.org",
        excerpt: "Kabupaten di Sumatera Selatan dengan situs prasejarah Gua Harimau dan kota Baturaja.",
        icon: "W",
        iconStyle: "bg-white text-slate-900",
        img: ""
      }
    ],
    image: "/images/musi_landscape.jpg",
    themeSlug: "sejarah",
    imageSearchQuery: "Kabupaten Ogan Komering Ulu Baturaja Gua Putri",
    titleWikipediaId: "Kabupaten_Ogan_Komering_Ulu"
  },
  {
    id: "oku-timur",
    name: "Kabupaten OKU Timur",
    aliases: ["oku timur", "martapura", "komering", "kabupaten oku timur"],
    title: "Kabupaten OKU Timur",
    subtitle: "Bumi Sebiduk Sehaluan, lumbung pangan dan sentra padi terbesar di Sumatera Selatan dengan kebudayaan luhur suku Komering.",
    highlight: "Kabupaten OKU Timur dengan ibu kota Martapura adalah lumbung padi terbesar di Sumatera Selatan yang berjuluk 'Bumi Sebiduk Sehaluan'. Daerah ini ditopang jaringan irigasi Danau Ranau-Komering yang subur serta menjadi pusat pelestarian bahasa dan adat istiadat Suku Komering.",
    paragraphs: [
      "Lumbung Beras Utama Sumatera Selatan:\nBerkat jaringan irigasi teknis Bendung Perjaya di Sungai Komering, lahan persawahan di OKU Timur mampu panen hingga tiga kali setahun, memasok beras berkualitas tinggi untuk Sumatera Selatan dan pulau Jawa.",
      "Pusat Adat & Bahasa Komering:\nOKU Timur adalah tanah leluhur Suku Komering yang memiliki kekayaan sastra tutur, bahasa Komering yang ekspresif, upacara adat perhelatan perkawinan, serta kain tenun tradisional Tajung.",
      "Keindahan Alam Bendung Perjaya:\nBendung Perjaya di Martapura tidak hanya berfungsi vital untuk irigasi pertanian, namun juga menjadi destinasi wisata favorit berkat pemandangan aliran Sungai Komering yang membentang luas berlatar perbukitan."
    ],
    bulletPoints: [
      { label: "Status Wilayah", text: "Kabupaten di Provinsi Sumatera Selatan" },
      { label: "Semboyan", text: "Sebiduk Sehaluan (Satu Perahu Satu Tujuan Pembangunan)" },
      { label: "Keunggulan", text: "Penghasil Padi Terbesar di Sumatera Selatan & Jaringan Irigasi Perjaya" },
      { label: "Ibu Kota", text: "Martapura" }
    ],
    sources: [
      {
        title: "Kabupaten Ogan Komering Ulu Timur — Wikipedia",
        url: "https://id.wikipedia.org/wiki/Kabupaten_Ogan_Komering_Ulu_Timur",
        domain: "id.wikipedia.org",
        excerpt: "Kabupaten agraris di Sumatera Selatan dengan lumbung padi dan budaya Komering.",
        icon: "W",
        iconStyle: "bg-white text-slate-900",
        img: ""
      }
    ],
    image: "/images/komering_culture.jpg",
    themeSlug: "bahasa-aksara",
    imageSearchQuery: "Kabupaten OKU Timur Martapura Komering",
    titleWikipediaId: "Kabupaten_Ogan_Komering_Ulu_Timur"
  },
  {
    id: "oku-selatan",
    name: "Kabupaten OKU Selatan",
    aliases: ["oku selatan", "muaradua", "ranau", "danau ranau", "kabupaten oku selatan", "banding agung"],
    title: "Kabupaten OKU Selatan",
    subtitle: "Bumi Serasan Seandanan, surga wisata Danau Ranau terbesar kedua di Sumatera di bawah naungan Gunung Seminung.",
    highlight: "Kabupaten OKU Selatan dengan ibu kota Muaradua berjuluk 'Bumi Serasan Seandanan'. Daerah ini merupakan destinasi pariwisata alam unggulan di Sumatera Selatan berkat pesona Danau Ranau yang anggun membiru, kemegahan Gunung Seminung, mata air panas alami, serta jeram Sungai Selabung.",
    paragraphs: [
      "Pesona Spektakuler Danau Ranau:\nDanau Ranau adalah danau vulkanik-tektonik terbesar kedua di Pulau Sumatera setelah Danau Toba. Airnya yang tenang dan jernih berpadu dengan latar belakang kerucut Gunung Seminung (1.888 mdpl) dan Pulau Marisa di tengah danau.",
      "Arung Jeram Sungai Selabung & Wisata Air Panas:\nAliran Sungai Selabung yang mengalir deras dari Danau Ranau menjadi arena olahraga arung jeram (rafting) favorit tingkat nasional. Di tepian danau di kaki Gunung Seminung juga terdapat sumber air panas alami Subik.",
      "Kekayaan Perkebunan Kopi & Budaya Ranau:\nMasyarakat OKU Selatan membudidayakan kopi robusta berkualitas prima di lereng perbukitan dan memiliki ragam budaya Melayu Ranau, Semende, dan Daya yang kaya akan keramahan."
    ],
    bulletPoints: [
      { label: "Status Wilayah", text: "Kabupaten di Provinsi Sumatera Selatan" },
      { label: "Semboyan", text: "Serasan Seandanan (Rukun Damai dan Selaras Menuju Kesejahteraan)" },
      { label: "Ikon Wisata Dunia", text: "Danau Ranau, Gunung Seminung, & Arung Jeram Selabung" },
      { label: "Ibu Kota", text: "Muaradua" }
    ],
    sources: [
      {
        title: "Kabupaten Ogan Komering Ulu Selatan — Wikipedia",
        url: "https://id.wikipedia.org/wiki/Kabupaten_Ogan_Komering_Ulu_Selatan",
        domain: "id.wikipedia.org",
        excerpt: "Kabupaten di Sumatera Selatan tempat beradanya Danau Ranau dan Gunung Seminung.",
        icon: "W",
        iconStyle: "bg-white text-slate-900",
        img: ""
      }
    ],
    image: "/images/musi_landscape.jpg",
    themeSlug: "sejarah",
    imageSearchQuery: "Kabupaten OKU Selatan Danau Ranau Seminung",
    titleWikipediaId: "Kabupaten_Ogan_Komering_Ulu_Selatan"
  },
  {
    id: "musi-rawas",
    name: "Kabupaten Musi Rawas",
    aliases: ["musi rawas", "mura", "muara beliti", "kabupaten musi rawas"],
    title: "Kabupaten Musi Rawas",
    subtitle: "Bumi Lan Serasan Sekentenan dengan keindahan Danau Aur dan peradaban rumah tradisional Rumah Ulu di hulu Sungai Musi.",
    highlight: "Kabupaten Musi Rawas di bagian barat Sumatera Selatan berjuluk 'Bumi Lan Serasan Sekentenan' dengan ibu kota Muara Beliti. Kabupaten ini memiliki potensi agraris dan perkebunan sawit karet melimpah, wisata air Danau Aur, serta merawat arsitektur tradisional Rumah Ulu khas hulu Musi.",
    paragraphs: [
      "Pariwisata Danau Aur:\nDanau Aur di Kecamatan Sumber Harta menyajikan panorama danau asri yang dikelilingi rimbunnya pohon karet dan sawit, dilengkapi fasilitas rumah makan terapung kapal hias yang menjadi destinasi rekreasi keluarga.",
      "Arsitektur Adat Rumah Ulu:\nMusi Rawas merupakan salah satu daerah pelestari Rumah Ulu, yaitu rumah panggung kayu tradisional khas pedalaman Sumatera Selatan yang dibangun dengan sistem pasak kayu elastis tanpa paku untuk merespons kondisi banjir dan gempa.",
      "Potensi Agraris & Muara Beliti:\nSebagai simpul penghubung antara Palembang, Bengkulu, dan Jambi, Musi Rawas terus berkembang dengan pusat pemerintahan modern di Muara Beliti serta bentang alam Bukit Cogong yang asri."
    ],
    bulletPoints: [
      { label: "Status Wilayah", text: "Kabupaten di Provinsi Sumatera Selatan" },
      { label: "Semboyan", text: "Lan Serasan Sekentenan (Selaras Sepakat dan Sejalan)" },
      { label: "Ikon Wisata", text: "Danau Aur, Bukit Cogong, & Rumah Adat Ulu" },
      { label: "Ibu Kota", text: "Muara Beliti" }
    ],
    sources: [
      {
        title: "Kabupaten Musi Rawas — Wikipedia",
        url: "https://id.wikipedia.org/wiki/Kabupaten_Musi_Rawas",
        domain: "id.wikipedia.org",
        excerpt: "Kabupaten di Sumatera Selatan dengan pesona Danau Aur dan Rumah Ulu.",
        icon: "W",
        iconStyle: "bg-white text-slate-900",
        img: ""
      }
    ],
    image: "/images/rumah_ulu.jpg",
    themeSlug: "rumah-adat",
    imageSearchQuery: "Kabupaten Musi Rawas Danau Aur",
    titleWikipediaId: "Kabupaten_Musi_Rawas"
  },
  {
    id: "musi-rawas-utara",
    name: "Kabupaten Musi Rawas Utara (Muratara)",
    aliases: ["musi rawas utara", "muratara", "rupit", "kabupaten muratara"],
    title: "Kabupaten Musi Rawas Utara (Muratara)",
    subtitle: "Bumi Beselang Serundingan di hulu Sungai Rawas dengan keajaiban Danau Rayo dan stalaktit Gua Napalicin.",
    highlight: "Kabupaten Muratara dengan ibu kota Rupit adalah kabupaten pemekaran di perbatasan utara Sumatera Selatan yang berjuluk 'Bumi Beselang Serundingan'. Daerah ini memiliki pesona alam perawan Danau Rayo di dalam kawasan suaka margasatwa serta Gua Napalicin yang memesona.",
    paragraphs: [
      "Keajaiban Alam Danau Rayo:\nDanau Rayo terletak di kawasan Suaka Margasatwa Danau Kelingi/Rayo, menyajikan perairan alami seluas puluhan hektar yang dikelilingi hutan rawa berhawa sejuk dan dihuni aneka burung liar.",
      "Gua Karst Napalicin:\nGua Napalicin merupakan gua batu kapur alami yang berada di atas bukit karang di tepi Sungai Rawas, dihiasi formasi stalaktit dan stalagmit yang menawan serta lorong tembus ke puncak bukit.",
      "Tradisi Luhur & Aliran Sungai Rawas:\nMasyarakat Muratara hidup berdampingan dengan aliran Sungai Rawas yang kaya ikan sungai, memelihara tradisi gotong royong Beselang serta seni kerajinan lokal."
    ],
    bulletPoints: [
      { label: "Status Wilayah", text: "Kabupaten di Provinsi Sumatera Selatan" },
      { label: "Semboyan", text: "Beselang Serundingan (Gotong Royong dan Musyawarah Mufakat)" },
      { label: "Destinasi Ikonik", text: "Danau Rayo, Gua Napalicin, & Sungai Rawas" },
      { label: "Ibu Kota", text: "Rupit" }
    ],
    sources: [
      {
        title: "Kabupaten Musi Rawas Utara — Wikipedia",
        url: "https://id.wikipedia.org/wiki/Kabupaten_Musi_Rawas_Utara",
        domain: "id.wikipedia.org",
        excerpt: "Kabupaten di Sumatera Selatan dengan Danau Rayo dan Gua Napalicin.",
        icon: "W",
        iconStyle: "bg-white text-slate-900",
        img: ""
      }
    ],
    image: "/images/sungai_musi_sekayu.jpg",
    themeSlug: "sejarah",
    imageSearchQuery: "Kabupaten Musi Rawas Utara Danau Rayo",
    titleWikipediaId: "Kabupaten_Musi_Rawas_Utara"
  },
  {
    id: "pali",
    name: "Kabupaten Penukal Abab Lematang Ilir (PALI)",
    aliases: ["penukal abab lematang ilir", "pali", "talang ubi", "candi bumi ayu", "kabupaten pali"],
    title: "Kabupaten Penukal Abab Lematang Ilir (PALI)",
    subtitle: "Bumi Serepat Serasan, lokasi percandian Hindu kuno Candi Bumi Ayu peninggalan abad ke-9 hingga ke-13 Masehi.",
    highlight: "Kabupaten PALI dengan pusat di Talang Ubi berjuluk 'Bumi Serepat Serasan'. Kabupaten ini menyimpan pusaka sejarah mahapenting berupa Kompleks Candi Bumi Ayu, satu-satunya kompleks percandian bata merah peninggalan era peralihan Hindu-Buddha di Sumatera Selatan, sekaligus sentra minyak bumi dan perkebunan karet.",
    paragraphs: [
      "Kompleks Percandian Candi Bumi Ayu:\nCandi Bumi Ayu terletak di tepi Sungai Lematang di Desa Bumi Ayu. Kompleks ini terdiri dari belasan runtuhan candi bata merah yang membuktikan bahwa wilayah pedalaman Sumatera Selatan pernah menjadi pusat peradaban dan keagamaan penting semasa dengan era Mataram Kuno hingga Sriwijaya.",
      "Kekayaan Energi Migas & Karet:\nWilayah Pendopo di Talang Ubi telah menjadi ladang pengeboran minyak bumi sejak era kolonial (dikenal sebagai Pendopo lumbung minyak Stanvac/Pertamina) yang dilengkapi fasilitas perumahan energi bersejarah.",
      "Masyarakat Melayu Penukal & Abab:\nMasyarakat PALI menjunjung adat Melayu Penukal dan Abab yang akrab dengan perairan Sungai Lematang, menghasilkan tradisi kuliner fermentasi khas seperti Sagarurung (ikan asap bumbu pedas khas PALI)."
    ],
    bulletPoints: [
      { label: "Status Wilayah", text: "Kabupaten di Provinsi Sumatera Selatan" },
      { label: "Semboyan", text: "Serepat Serasan (Sepakat Bersama dalam Persatuan)" },
      { label: "Pusaka Sejarah", text: "Kompleks Percandian Candi Bumi Ayu (Abad ke-9 s.d. 13 M)" },
      { label: "Ibu Kota", text: "Talang Ubi" }
    ],
    sources: [
      {
        title: "Kabupaten Penukal Abab Lematang Ilir — Wikipedia",
        url: "https://id.wikipedia.org/wiki/Kabupaten_Penukal_Abab_Lematang_Ilir",
        domain: "id.wikipedia.org",
        excerpt: "Kabupaten di Sumatera Selatan tempat berdirinya Candi Bumi Ayu.",
        icon: "W",
        iconStyle: "bg-white text-slate-900",
        img: ""
      }
    ],
    image: "/images/sungai_lematang.jpg",
    themeSlug: "sejarah",
    imageSearchQuery: "Kabupaten PALI Candi Bumi Ayu",
    titleWikipediaId: "Kabupaten_Penukal_Abab_Lematang_Ilir"
  },
  {
    id: "empat-lawang",
    name: "Kabupaten Empat Lawang",
    aliases: ["empat lawang", "tebing tinggi", "tebing tinggi empat lawang", "kabupaten empat lawang"],
    title: "Kabupaten Empat Lawang",
    subtitle: "Bumi Saling Keruani Sangi Kerawati di hulu Ayek Musi, sentra perkebunan kopi robusta dan kearifan masyarakat adat Lintang.",
    highlight: "Kabupaten Empat Lawang dengan ibu kota Tebing Tinggi berjuluk 'Bumi Saling Keruani Sangi Kerawati'. Terletak di kawasan perbukitan hulu Sungai Musi (Ayek Musi), daerah ini tersohor dengan sentra perkebunan kopi robusta bermutu tinggi serta tradisi kebudayaan masyarakat suku Lintang dan Besemah.",
    paragraphs: [
      "Hulu Sungai Musi & Bentang Alam Perbukitan:\nEmpat Lawang dialiri oleh aliran Sungai Musi bagian hulu yang jernih berarus deras dengan bebatuan besar alami, serta dilalui jalur rel kereta api lintang Sumatera yang melintasi jembatan-jembatan jurang peninggalan kolonial Belanda yang dramatis.",
      "Sentra Kopi Robusta & Pertanian:\nKondisi tanah vulkanik yang subur menjadikan Empat Lawang salah satu pemasok biji kopi robusta terbesar di Sumatera Selatan dengan aroma khas yang kuat.",
      "Adat Masyarakat Suku Lintang:\nNama Empat Lawang konon berasal dari empat pendekar pelindung empat gerbang (lawang). Masyarakatnya memelihara tradisi adat, seni tari, serta sastra pantun rejung yang diwariskan leluhur."
    ],
    bulletPoints: [
      { label: "Status Wilayah", text: "Kabupaten di Provinsi Sumatera Selatan" },
      { label: "Semboyan", text: "Saling Keruani Sangi Kerawati (Saling Mengayomi dan Saling Menghormati)" },
      { label: "Ibu Kota", text: "Tebing Tinggi" },
      { label: "Komoditas Unggulan", text: "Kopi Robusta Empat Lawang & Karet" }
    ],
    sources: [
      {
        title: "Kabupaten Empat Lawang — Wikipedia",
        url: "https://id.wikipedia.org/wiki/Kabupaten_Empat_Lawang",
        domain: "id.wikipedia.org",
        excerpt: "Kabupaten di perbukitan hulu Sungai Musi Sumatera Selatan.",
        icon: "W",
        iconStyle: "bg-white text-slate-900",
        img: ""
      }
    ],
    image: "/images/sungai_lematang.jpg",
    themeSlug: "sejarah",
    imageSearchQuery: "Kabupaten Empat Lawang Tebing Tinggi",
    titleWikipediaId: "Kabupaten_Empat_Lawang"
  }
];

// ─── Database Entitas dan Landmark Populer di Luar Sumsel ─────────────────────
export interface OutsideSumselEntity {
  id: string;
  aliases: string[];
  title: string;
  subtitle: string;
  highlight: string;
  paragraphs: string[];
  bulletPoints: { label: string; text: string }[];
  sources: SearchSource[];
  image: string;
  imageSearchQuery: string;
  titleWikipediaId: string;
}

export const outsideSumselEntities: OutsideSumselEntity[] = [
  {
    id: "bundaran-hi",
    aliases: [
      "bundaran hi", "bundaran hotel indonesia", "bunderan hi",
      "monumen selamat datang", "patung selamat datang", "hotel indonesia jakarta"
    ],
    title: "Bundaran Hotel Indonesia (Bundaran HI)",
    subtitle: "Landmark bersejarah di pusat metropolitan Jakarta dengan Monumen Selamat Datang megah warisan Presiden Soekarno.",
    highlight: "Bundaran Hotel Indonesia (Bundaran HI) adalah salah satu tengara (landmark) ruang terbuka paling terkenal di Jakarta Pusat, dengan Monumen Selamat Datang berdiri megah di tengah kolam air mancurnya.",
    paragraphs: [
      "Latar Belakang & Monumen Selamat Datang:\nBundaran HI digagas oleh Presiden pertama Republik Indonesia, Ir. Soekarno, sebagai pintu gerbang ibu kota dalam menyambut delegasi, atlet, dan tamu mancanegara pada perhelatan Asian Games IV tahun 1962. Patung sepasang pemuda-pemudi perunggu yang melambaikan tangan ke arah utara dirancang oleh seniman Henk Ngantung dan dipahat oleh pematung Trubus Soedarsono di bawah koordinasi Edhi Sunarso.",
      "Pusat Bisnis, Sejarah, & Diplomasi:\nDi sekeliling bundaran terdapat bangunan ikonik Hotel Indonesia (hotel bertaraf internasional pertama di Indonesia yang diresmikan tahun 1962), Wisma Nusantara, serta pusat perbelanjaan papan atas Grand Indonesia dan Plaza Indonesia. Kawasan ini menjadi salah satu pusat ekonomi, bisnis, dan pariwisata tersibuk di Asia Tenggara.",
      "Transformasi Ruang Publik Modern:\nDalam beberapa tahun terakhir, Bundaran HI mengalami revitalisasi besar melalui integrasi sistem transportasi massal modern, seperti Stasiun MRT Bundaran HI di bawah tanah dan Halte Transjakarta berlantai dua yang menyerupai geladak kapal pesiar megah. Kawasan ini juga menjadi arena favorit berkumpulnya warga saat Hari Bebas Kendaraan Bermotor (Car Free Day)."
    ],
    bulletPoints: [
      { label: "Lokasi", text: "Menteng, Jakarta Pusat, DKI Jakarta" },
      { label: "Ikon Utama", text: "Monumen Selamat Datang & Air Mancur Bundaran HI" },
      { label: "Tahun Pembangunan", text: "1962 (Dalam rangka Asian Games IV)" },
      { label: "Perancang & Penggagas", text: "Presiden Soekarno, Henk Ngantung, & Edhi Sunarso" }
    ],
    sources: [
      {
        title: "Bundaran Hotel Indonesia — Wikipedia",
        url: "https://id.wikipedia.org/wiki/Bundaran_Hotel_Indonesia",
        domain: "id.wikipedia.org",
        excerpt: "Bundaran bersejarah di pusat Jakarta Pusat dengan Monumen Selamat Datang di tengahnya.",
        icon: "W",
        iconStyle: "bg-white text-slate-900",
        img: ""
      },
      {
        title: "Monumen Selamat Datang — Wikipedia",
        url: "https://id.wikipedia.org/wiki/Monumen_Selamat_Datang",
        domain: "id.wikipedia.org",
        excerpt: "Monumen yang dibangun pada tahun 1962 untuk menyambut atlet Asian Games IV.",
        icon: "🏛",
        iconStyle: "bg-[#6b1d2f] text-white",
        img: ""
      }
    ],
    image: "https://thumb.wikimedia.org/wikipedia/id/thumb/3/35/Monumen_Selamat_Datang_%28Maret_2025%29.jpg/330px-Monumen_Selamat_Datang_%28Maret_2025%29.jpg",
    imageSearchQuery: "Bundaran Hotel Indonesia Monumen Selamat Datang Jakarta",
    titleWikipediaId: "Bundaran_Hotel_Indonesia"
  },
  {
    id: "monas",
    aliases: ["monas", "monumen nasional", "tugu monas"],
    title: "Monumen Nasional (Monas)",
    subtitle: "Tugu peringatan setinggi 132 meter di Jakarta Pusat yang melambangkan semangat perjuangan kemerdekaan bangsa Indonesia.",
    highlight: "Monumen Nasional (Monas) adalah monumen peringatan yang didirikan untuk mengenang perlawanan dan perjuangan rakyat Indonesia dalam merebut kemerdekaan dari pemerintah kolonial Hindia Belanda, dihiasi lidah api berlapis emas di puncaknya.",
    paragraphs: [
      "Sejarah & Pembangunan:\nPembangunan Monas dimulai pada 17 Agustus 1961 atas perintah Presiden Soekarno dan diresmikan dibuka untuk umum pada 12 Juli 1975 oleh Presiden Soeharto. Tugu berbentuk lingga dan yoni ini melambangkan kesuburan dan kesatuan abadi rakyat Indonesia.",
      "Museum Sejarah & Puncak Lidah Api:\nDi bagian cawan bawah Monas terdapat Museum Sejarah Nasional yang menampilkan puluhan diorama perjuangan bangsa Indonesia sejak era prasejarah hingga kemerdekaan. Di puncaknya terdapat pelataran pandang setinggi 115 meter dan lidah api perunggu berlapis emas seberat puluhan kilogram.",
      "Pusat Ruang Terbuka Hijau Ibu Kota:\nDikelilingi Lapangan Medan Merdeka seluas puluhan hektar, kawasan Monas menjadi ruang rekreasi publik, olahraga, dan upacara kenegaraan terpenting di Republik Indonesia."
    ],
    bulletPoints: [
      { label: "Lokasi", text: "Gambir, Jakarta Pusat, DKI Jakarta" },
      { label: "Tinggi Monumen", text: "132 Meter (Dengan lidah api berlapis emas murni)" },
      { label: "Fasilitas Utama", text: "Pelataran Puncak, Museum Sejarah Nasional, & Ruang Kemerdekaan" },
      { label: "Arsitek", text: "Soedarsono, Frederich Silaban, & Ir. Rooseno" }
    ],
    sources: [
      {
        title: "Monumen Nasional — Wikipedia",
        url: "https://id.wikipedia.org/wiki/Monumen_Nasional",
        domain: "id.wikipedia.org",
        excerpt: "Tugu peringatan setinggi 132 meter di Jakarta Pusat lambang kemerdekaan Indonesia.",
        icon: "W",
        iconStyle: "bg-white text-slate-900",
        img: ""
      }
    ],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/National_Monument_%28Monas%29%2C_Jakarta.jpg/800px-National_Monument_%28Monas%29%2C_Jakarta.jpg",
    imageSearchQuery: "Monumen Nasional Monas Jakarta",
    titleWikipediaId: "Monumen_Nasional"
  },
  {
    id: "borobudur",
    aliases: ["borobudur", "candi borobudur"],
    title: "Candi Borobudur",
    subtitle: "Candi Buddha terbesar di dunia peninggalan wangsa Syailendra di Magelang, Jawa Tengah, Warisan Dunia UNESCO.",
    highlight: "Candi Borobudur adalah candi atau kuil Buddha Mahayana terbesar di dunia yang dibangun pada abad ke-8 dan ke-9 Masehi oleh wangsa Syailendra di Magelang, Jawa Tengah.",
    paragraphs: [
      "Arsitektur Mahakarya Dunia:\nBorobudur dirancang dengan struktur punden berundak tanpa perekat semen, terdiri dari enam teras bujur sangkar dan tiga pelataran melingkar yang dihiasi ribuan panel relief pahatan batu andesit serta ratusan arca Buddha.",
      "Makna Filosofis Kosmologi Buddha:\nStruktur Borobudur melambangkan tingkatan kosmologi Buddha: Kamadhatu (alam hawa nafsu), Rupadhatu (alam wujud), dan Arupadhatu (alam tanpa wujud) yang berpuncak pada stupa induk agung.",
      "Pusat Wisata & Perayaan Waisak:\nSebagai Situs Warisan Dunia UNESCO, Candi Borobudur menjadi tujuan ziarah umat Buddha dunia saat puncak perayaan Hari Raya Waisak dan salah satu destinasi pariwisata super prioritas Indonesia."
    ],
    bulletPoints: [
      { label: "Lokasi", text: "Magelang, Jawa Tengah" },
      { label: "Status Global", text: "Situs Warisan Dunia UNESCO (World Heritage Site)" },
      { label: "Dibangun", text: "Sekitar abad ke-8 s.d. 9 Masehi (Wangsa Syailendra)" },
      { label: "Jumlah Panel Relief", text: "2.672 Panel relief pahatan batu andesit" }
    ],
    sources: [
      {
        title: "Borobudur — Wikipedia",
        url: "https://id.wikipedia.org/wiki/Borobudur",
        domain: "id.wikipedia.org",
        excerpt: "Candi Buddha Mahayana terbesar di dunia yang terletak di Magelang, Jawa Tengah.",
        icon: "W",
        iconStyle: "bg-white text-slate-900",
        img: ""
      }
    ],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Borobudur-Nothwest-view.jpg/800px-Borobudur-Nothwest-view.jpg",
    imageSearchQuery: "Candi Borobudur Magelang Jawa Tengah",
    titleWikipediaId: "Borobudur"
  },
  {
    id: "prambanan",
    aliases: ["prambanan", "candi prambanan", "candi roro jonggrang"],
    title: "Candi Prambanan",
    subtitle: "Kompleks candi Hindu terbesar di Indonesia di perbatasan Sleman, D.I. Yogyakarta dan Klaten, Jawa Tengah.",
    highlight: "Candi Prambanan (atau Candi Roro Jonggrang) adalah kompleks candi Hindu terbesar di Indonesia yang dibangun pada abad ke-9 Masehi oleh raja Rakai Pikatan dari Kerajaan Mataram Kuno.",
    paragraphs: [
      "Kemegahan Arsitektur Trimurti:\nKompleks Prambanan dipersembahkan untuk Trimurti, tiga dewa utama dalam Hinduisme: Brahma (Sang Pencipta), Wisnu (Sang Pemelihara), dan Siwa (Sang Pemusnah). Candi Siwa berdiri paling megah di tengah dengan ketinggian mencapai 47 meter.",
      "Relief Kisah Ramayana:\nDinding candi dihiasi pahatan relief naratif epos Ramayana dan Krishnayana yang menceritakan petualangan Rama membebaskan Dewi Sita dari cengkeraman Rahwana.",
      "Situs Warisan Dunia UNESCO:\nDiakui sebagai Situs Warisan Dunia UNESCO, pelataran Candi Prambanan juga menjadi panggung terbuka megah pertunjukan Sendratari Ramayana Prambanan bertaraf internasional."
    ],
    bulletPoints: [
      { label: "Lokasi", text: "Perbatasan Sleman (DIY) & Klaten (Jawa Tengah)" },
      { label: "Status Global", text: "Situs Warisan Dunia UNESCO" },
      { label: "Tinggi Candi Utama", text: "47 Meter (Candi Siwa)" },
      { label: "Pembangunan", text: "Abad ke-9 Masehi (Rakai Pikatan, Mataram Kuno)" }
    ],
    sources: [
      {
        title: "Candi Prambanan — Wikipedia",
        url: "https://id.wikipedia.org/wiki/Candi_Prambanan",
        domain: "id.wikipedia.org",
        excerpt: "Kompleks percandian Hindu terbesar di Indonesia Warisan Dunia UNESCO.",
        icon: "W",
        iconStyle: "bg-white text-slate-900",
        img: ""
      }
    ],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Prambanan_Temple_Complex.jpg/800px-Prambanan_Temple_Complex.jpg",
    imageSearchQuery: "Candi Prambanan Yogyakarta Sleman",
    titleWikipediaId: "Candi_Prambanan"
  },
  {
    id: "bali",
    aliases: ["bali", "pulau bali", "provinsi bali", "pulau dewata", "denpasar"],
    title: "Provinsi Bali (Pulau Dewata)",
    subtitle: "Provinsi kepulauan di timur Pulau Jawa yang tersohor di dunia dengan keagungan budaya Hindu Dharma, pura megah, dan pariwisata alam.",
    highlight: "Bali adalah salah satu provinsi terkemuka di Indonesia dengan ibu kota Denpasar, berjuluk 'Pulau Dewata' dan 'Pulau Seribu Pura' berkat keluhuran tradisi adat, seni pertunjukan sakral, serta lanskap pantai dan perbukitannya yang mendunia.",
    paragraphs: [
      "Geografi & Peradaban Luhur:\nPulau Bali diapit oleh Selat Bali di barat dan Selat Lombok di timur. Sebagian besar masyarakatnya memeluk agama Hindu Dharma yang terintegrasi erat dengan sistem kekerabatan adat banjar, filosofi Tri Hita Karana (keharmonisan antara manusia, alam, dan Sang Pencipta), serta sistem irigasi persawahan tradisional Subak yang diakui sebagai Warisan Budaya Dunia UNESCO.",
      "Kekayaan Seni Tradisi & Pura Ikonik:\nIdentitas budaya Bali terpancar dari arsitektur pura-pura suci seperti Pura Besakih di lereng Gunung Agung, Pura Ulun Danu di Danau Bratan, serta Pura Luhur Uluwatu di tebing Samudra Hindia. Dalam seni pertunjukan, Bali memiliki ragam tarian sakral dan profan seperti Tari Pendet, Tari Legong, Tari Barong, dan Tari Kecak, berdampingan dengan alunan gamelan gong kebyar.",
      "Ikon Pariwisata Internasional:\nSebagai gerbang utama pariwisata Nusantara, Bali menawarkan perpaduan atraksi wisata bahari di Kuta, Seminyak, Sanur, dan Nusa Dua, serta keteduhan pusat seni budaya dan alam Ubud yang menjadi magnet wisatawan mancanegara."
    ],
    bulletPoints: [
      { label: "Ibu Kota", text: "Kota Denpasar" },
      { label: "Julukan", text: "Pulau Dewata, Pulau Seribu Pura, The Island of Gods" },
      { label: "Filosofi Luhur", text: "Tri Hita Karana & Lanskap Budaya Subak (UNESCO)" },
      { label: "Tengara Terkenal", text: "Pura Besakih, Ubud, Pura Uluwatu, Tanah Lot, Danau Bratan" }
    ],
    sources: [
      {
        title: "Bali — Wikipedia Bahasa Indonesia",
        url: "https://id.wikipedia.org/wiki/Bali",
        domain: "id.wikipedia.org",
        excerpt: "Provinsi kepulauan di Indonesia yang tersohor dengan budaya dan pariwisatanya.",
        icon: "W",
        iconStyle: "bg-white text-slate-900",
        img: ""
      },
      {
        title: "Portal Resmi Pemerintah Provinsi Bali",
        url: "https://baliprov.go.id",
        domain: "baliprov.go.id",
        excerpt: "Layanan informasi publik dan kepariwisataan resmi Pemerintah Provinsi Bali.",
        icon: "🏛",
        iconStyle: "bg-[#6b1d2f] text-white",
        img: ""
      }
    ],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Pura_Ulun_Danu_Bratan%2C_2022.jpg/800px-Pura_Ulun_Danu_Bratan%2C_2022.jpg",
    imageSearchQuery: "Pura Ulun Danu Bratan Bedugul Bali",
    titleWikipediaId: "Bali"
  },
  {
    id: "padang",
    aliases: ["padang", "kota padang", "padang kota", "ranah minang"],
    title: "Kota Padang",
    subtitle: "Ibu kota Provinsi Sumatera Barat, kota terbesar di pesisir barat Pulau Sumatra, dan pusat kebudayaan Minangkabau.",
    highlight: "Kota Padang adalah ibu kota Provinsi Sumatera Barat dan kota terbesar di pantai barat Pulau Sumatra. Menghadap langsung ke Samudra Hindia dengan latar Bukit Barisan, Padang tersohor sebagai pusat kebudayaan Minangkabau, kawasan niaga bahari bersejarah, dan kiblat kuliner legendaris yang mendunia.",
    paragraphs: [
      "Pintu Gerbang Barat Sumatra & Sejarah:\nSecara historis, Padang berkembang pesat sejak abad ke-17 sebagai pelabuhan lada dan rempah-rempah yang dikelola oleh Kesultanan Aceh dan VOC di tepian Muara Batang Arau. Kawasan Kota Tua Padang kini masih mempertahankan deretan bangunan kolonial bernilai pusaka arsitektur tinggi berdampingan dengan Pelabuhan Teluk Bayur yang melegenda.",
      "Pusat Budaya Minangkabau & Kuliner Global:\nPadang identik dengan kelezatan tradisi memasak Minangkabau, terutama Rendang yang berulang kali dinobatkan sebagai salah satu makanan terlezat di dunia oleh media internasional. Selain rendang, hidangan sate padang, dendeng balado, gulai tunjang, dan ayam pop dengan sajian 'hidang' di rumah makan Minang telah menjadi simbol diplomasi kuliner Nusantara di seantero dunia.",
      "Destinasi Wisata Pesisir & Alam:\nKota Padang menawarkan pesona wisata bahari yang menawan seperti Pantai Padang (Taplau), Pantai Air Manis dengan legenda Batu Malin Kundang, Jembatan Siti Nurbaya yang ikonik, serta gugusan pulau eksotis Mandeh dan Sirandah."
    ],
    bulletPoints: [
      { label: "Status Wilayah", text: "Ibu Kota Provinsi Sumatera Barat" },
      { label: "Letak Geografis", text: "Pesisir Barat Sumatra (Menghadap Samudra Hindia)" },
      { label: "Kuliner Ikonik", text: "Rendang Minangkabau, Sate Padang, Dendeng Batokok, Es Tebak" },
      { label: "Tengara Terkenal", text: "Jembatan Siti Nurbaya, Pelabuhan Teluk Bayur, Masjid Raya Sumbar" }
    ],
    sources: [
      {
        title: "Kota Padang — Wikipedia Bahasa Indonesia",
        url: "https://id.wikipedia.org/wiki/Kota_Padang",
        domain: "id.wikipedia.org",
        excerpt: "Kota terbesar di pesisir barat Pulau Sumatra dan ibu kota Provinsi Sumatera Barat.",
        icon: "W",
        iconStyle: "bg-white text-slate-900",
        img: ""
      },
      {
        title: "Portal Resmi Pemerintah Kota Padang",
        url: "https://padang.go.id",
        domain: "padang.go.id",
        excerpt: "Pusat informasi publik dan layanan pemerintah Kota Padang.",
        icon: "🏛",
        iconStyle: "bg-[#6b1d2f] text-white",
        img: ""
      }
    ],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Padang_Kota_yang_Dikelilingi_Bukit_dan_Lautan.jpg/800px-Padang_Kota_yang_Dikelilingi_Bukit_dan_Lautan.jpg",
    imageSearchQuery: "Kota Padang Pantai Padang Jembatan Siti Nurbaya",
    titleWikipediaId: "Kota_Padang"
  },
  {
    id: "tari-kecak",
    aliases: ["tari kecak", "tari kecak bali", "tari cak"],
    title: "Tari Kecak Bali",
    subtitle: "Seni tari sakral dan drama musikal spektakuler khas Bali yang diiringi paduan suara vokal 'cak-cak-cak'.",
    highlight: "Tari Kecak adalah seni pertunjukan drama musikal khas Bali yang dibawakan oleh puluhan penari pria bertelanjang dada duduk melingkar dengan lantunan irama paduan suara vokal 'cak-cak-cak'.",
    paragraphs: [
      "Asal-Usul Tradisi Sanghyang:\nTari Kecak berakar dari ritual Sanghyang, yakni tarian sakral penolak bala di mana penari berkomunikasi dengan roh leluhur dalam keadaan trans (trance). Pada dekade 1930-an, seniman Bali Wayan Limbak bersama pelukis Jerman Walter Spies menyusunnya menjadi drama tari kisah Ramayana yang memukau publik dunia.",
      "Karakteristik Paduan Suara Tanpa Alat Musik:\nKeunikan Tari Kecak terletak pada absennya instrumen gamelan. Irama musik sepenuhnya dihasilkan oleh ritme vokal dinamis puluhan penari pria yang menggerakkan tangan ke angkasa di sekeliling kobaran api obor di tengah lingkaran.",
      "Pertunjukan Ikonik Pura Uluwatu:\nPementasan Tari Kecak berlatar matahari terbenam (sunset) di tebing karang Pura Luhur Uluwatu menjadi salah satu atraksi seni budaya paling populer di dunia."
    ],
    bulletPoints: [
      { label: "Asal Daerah", text: "Bali, Indonesia" },
      { label: "Alat Musik", text: "Akustik Vokal Tanpa Gamelan (Paduan suara penari)" },
      { label: "Lakon Cerita", text: "Epos Ramayana (Penculikan Shinta & Hanoman)" },
      { label: "Fungsi Budaya", text: "Seni Pertunjukan Tradisional & Daya Tarik Wisata Dunia" }
    ],
    sources: [
      {
        title: "Tari Kecak — Wikipedia",
        url: "https://id.wikipedia.org/wiki/Tari_Kecak",
        domain: "id.wikipedia.org",
        excerpt: "Seni tari dan drama musikal tradisional khas Bali berlatar kisah Ramayana.",
        icon: "W",
        iconStyle: "bg-white text-slate-900",
        img: ""
      }
    ],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Kecak_Dance_Uluwatu.jpg/800px-Kecak_Dance_Uluwatu.jpg",
    imageSearchQuery: "Tari Kecak Bali Uluwatu",
    titleWikipediaId: "Tari_Kecak"
  },
  {
    id: "danau-toba",
    aliases: ["danau toba", "danau toba sumut", "pulau samosir"],
    title: "Danau Toba & Pulau Samosir",
    subtitle: "Danau vulkanik kaldera terbesar di dunia dan UNESCO Global Geopark di Sumatera Utara.",
    highlight: "Danau Toba adalah danau vulkanik terbesar di dunia yang terbentuk akibat letusan mahadasyat (supervolcano) Gunung Toba purba sekitar 74.000 tahun silam, dengan Pulau Samosir terbentang megah di tengah perairannya.",
    paragraphs: [
      "Geologi Letusan Supervolcano:\nLetusan supervolcano Toba diperkirakan mengubah iklim bumi purba. Kaldera raksasa yang terbentuk kini terisi air jernih sepanjang 100 kilometer dengan kedalaman mencapai lebih dari 500 meter.",
      "Kekayaan Budaya Batak Toba:\nPulau Samosir dan pesisir Danau Toba merupakan pusat kebudayaan suku Batak Toba, terkenal dengan rumah adat Rumah Bolon, patung Sigale-gale, serta kain tenun Ulos.",
      "Destinasi Super Prioritas:\nDanau Toba telah ditetapkan sebagai UNESCO Global Geopark dan Destinasi Pariwisata Super Prioritas Indonesia yang menawarkan lanskap perbukitan hijau spektakuler."
    ],
    bulletPoints: [
      { label: "Lokasi", text: "Sumatera Utara, Indonesia" },
      { label: "Status Internasional", text: "UNESCO Global Geopark" },
      { label: "Luas Danau", text: "Panjang 100 km, lebar 30 km (Danau vulkanik terbesar dunia)" },
      { label: "Pulau di Tengah", text: "Pulau Samosir (Pusat kebudayaan Batak Toba)" }
    ],
    sources: [
      {
        title: "Danau Toba — Wikipedia",
        url: "https://id.wikipedia.org/wiki/Danau_Toba",
        domain: "id.wikipedia.org",
        excerpt: "Danau vulkanik terbesar di dunia di Sumatera Utara.",
        icon: "W",
        iconStyle: "bg-white text-slate-900",
        img: ""
      }
    ],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Indonesia_-_Lake_Toba_%282622412750%29.jpg/800px-Indonesia_-_Lake_Toba_%282622412750%29.jpg",
    imageSearchQuery: "Danau Toba Pulau Samosir Sumatera Utara",
    titleWikipediaId: "Danau_Toba"
  },
  {
    id: "gedung-sate",
    aliases: ["gedung sate", "gedung sate bandung"],
    title: "Gedung Sate Bandung",
    subtitle: "Ikon arsitektur neo-klasik berpadu ornamen lokal di Kota Bandung, pusat kantor Gubernur Jawa Barat.",
    highlight: "Gedung Sate adalah gedung bersejarah di Kota Bandung yang dirancang oleh arsitek J. Gerber pada tahun 1920, terkenal dengan ornamen ornamen tusuk sate enam ornamen bundar di pucuk atapnya.",
    paragraphs: [
      "Arsitektur Hibrida Indisch Empire:\nGedung Sate menggabungkan gaya arsitektur klasik Eropa dengan elemen atap pura tradisional Bali dan ornamen lokal Nusantara, menjadi mahakarya arsitektur kolonial tropis.",
      "Enam Ornamen Tusuk Sate:\nOrnamen 6 bulatan menyerupai tusuk sate di puncak menara melambangkan biaya pembangunan gedung senilai 6 juta gulden pada era Hindia Belanda.",
      "Pusat Pemerintahan & Museum Modern:\nSaat ini Gedung Sate berfungsi sebagai kantor Gubernur Jawa Barat dan dilengkapi Museum Gedung Sate interaktif berbasis teknologi augmented reality."
    ],
    bulletPoints: [
      { label: "Lokasi", text: "Kota Bandung, Jawa Barat" },
      { label: "Tahun Dibangun", text: "1920 - 1924 (Arsitek J. Gerber)" },
      { label: "Fungsi Saat Ini", text: "Kantor Gubernur Jawa Barat & Museum Publik" },
      { label: "Ciri Khas", text: "Menara atap berornamen enam bulatan tusuk sate" }
    ],
    sources: [
      {
        title: "Gedung Sate — Wikipedia",
        url: "https://id.wikipedia.org/wiki/Gedung_Sate",
        domain: "id.wikipedia.org",
        excerpt: "Gedung peninggalan kolonial ikon Kota Bandung Jawa Barat.",
        icon: "W",
        iconStyle: "bg-white text-slate-900",
        img: ""
      }
    ],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Gedung_Sate_Bandung_Jawa_Barat.jpg/800px-Gedung_Sate_Bandung_Jawa_Barat.jpg",
    imageSearchQuery: "Gedung Sate Bandung Jawa Barat",
    titleWikipediaId: "Gedung_Sate"
  }
];

// ─── Helpers pencocokan Wilayah Sumsel & Luar Sumsel ──────────────────────────
export function findSumselRegion(query: string): SumselRegionInfo | null {
  const q = query.toLowerCase().replace(/['".,?!]/g, " ").replace(/\s+/g, " ").trim();
  if (!q) return null;

  // Jika query menanyakan subtopik spesifik (makanan, kain, lagu, tarian spesifik),
  // jangan cegat sebagai profil kota
  const isSpecificSubtopic = [
    "pempek", "resep", "cara membuat", "cara masak", "cuko", "tekwan", "lirik", "syair",
    "kain", "songket", "tenun", "tari", "lagu", "aksara", "rumah limas", "dulmuluk"
  ].some((kw) => q.includes(kw));

  if (isSpecificSubtopic && !q.startsWith("kota ") && !q.startsWith("kabupaten ")) {
    return null;
  }

  // 1. Cocokkan alias persis atau dengan prefiks kota/kabupaten
  for (const reg of sumselRegionsData) {
    for (const alias of reg.aliases) {
      if (
        q === alias ||
        q === `kota ${alias}` ||
        q === `kabupaten ${alias}` ||
        q === `kab ${alias}` ||
        q === `profil ${alias}` ||
        q === `tentang ${alias}` ||
        q === `daerah ${alias}`
      ) {
        return reg;
      }
    }
  }

  // 2. Cocokkan jika kueri mengandung nama alias yang cukup panjang (>= 4 karakter)
  for (const reg of sumselRegionsData) {
    for (const alias of reg.aliases) {
      if (alias.length >= 4 && (q.startsWith(alias + " ") || q.endsWith(" " + alias))) {
        return reg;
      }
    }
  }

  return null;
}

export function findOutsideSumselEntity(query: string): OutsideSumselEntity | null {
  const q = query.toLowerCase().replace(/['".,?!]/g, " ").replace(/\s+/g, " ").trim();
  if (!q) return null;

  // 1. Cocokkan alias persis atau dengan awalan umum (kota/provinsi/pulau/tentang)
  for (const ent of outsideSumselEntities) {
    for (const alias of ent.aliases) {
      if (
        q === alias ||
        q === `kota ${alias}` ||
        q === `provinsi ${alias}` ||
        q === `pulau ${alias}` ||
        q === `daerah ${alias}` ||
        q === `tentang ${alias}`
      ) {
        return ent;
      }
    }
  }

  // 2. Cocokkan jika kueri mengandung alias sebagai kata utuh (bukan sebaliknya)
  for (const ent of outsideSumselEntities) {
    for (const alias of ent.aliases) {
      if (
        alias.length >= 4 &&
        (q.startsWith(alias + " ") || q.endsWith(" " + alias) || q.includes(" " + alias + " "))
      ) {
        return ent;
      }
    }
  }

  return null;
}

export function buildRegionSearchResult(reg: SumselRegionInfo, query: string): SearchResult {
  const theme = themes.find((t) => t.slug === reg.themeSlug) || themes[0];
  return {
    status: "ok",
    query,
    card1: {
      isDedicatedTour: false,
      title: reg.title,
      subtitle: reg.subtitle,
      image: reg.image,
      badge: "Profil Wilayah Sumatera Selatan",
      href: `/tema/${theme.slug}`,
    },
    card2: {
      title: reg.title,
      highlight: reg.highlight,
      paragraphs: reg.paragraphs,
      bulletPoints: reg.bulletPoints,
      sources: reg.sources,
    },
    card3: {
      themeSlug: theme.slug,
      themeTitle: theme.title,
      themeLabel: theme.tagline,
      themeDesc: theme.intro,
      themeImg: theme.heroImage,
      themeHref: `/tema/${theme.slug}`,
      relatedItems: theme.items.slice(0, 4).map((it) => ({
        name: it.name,
        desc: it.desc,
        image: it.image || theme.image,
        slug: it.slug,
        link: it.slug ? `/tur/${it.slug}` : `/tema/${theme.slug}`,
      })),
    },
  };
}

export function buildOutsideSumselSearchResult(ent: OutsideSumselEntity, query: string): SearchResult {
  return {
    status: "outside_sumsel",
    query,
    note: "Topik ini berada di luar wilayah Sumatera Selatan, namun SORA tetap menyajikan ringkasannya untuk menambah wawasan Nusantara Anda.",
    card1: {
      isDedicatedTour: false,
      title: ent.title,
      subtitle: ent.subtitle,
      image: ent.image,
      badge: "Landmark & Wawasan Nusantara",
      href: "/jelajahi",
    },
    card2: {
      title: ent.title,
      highlight: ent.highlight,
      paragraphs: ent.paragraphs,
      bulletPoints: ent.bulletPoints,
      sources: ent.sources,
    },
    card3: {
      themeSlug: "",
      themeTitle: "",
      themeLabel: "",
      themeDesc: "",
      themeImg: "",
      themeHref: "",
      relatedItems: [],
    },
  };
}

// ─── Local match helper (Safe & Presisi: Bebas False Positive Kota) ──────────
export function findLocalMatch(query: string) {
  const q = query.toLowerCase().trim();

  // 0. Cegah query nama kota/daerah atau landmark luar Sumsel dibajak oleh tur/item
  if (findSumselRegion(query) || findOutsideSumselEntity(query)) {
    return null;
  }

  // 1. Dedicated tours: HANYA cocok jika kata kunci pemicu spesifik terpenuhi
  for (const [slug, tour] of Object.entries(dedicatedTours)) {
    const triggers = tourTriggerKeywords[slug] || [tour.title.toLowerCase()];
    const matchesTrigger = triggers.some((tw) => q.includes(tw));
    const exactMatch = tour.title.toLowerCase() === q || slug === q;
    if (exactMatch || matchesTrigger) {
      return { type: "tour" as const, tour, slug };
    }
  }

  // 2. Specific items inside themes: HANYA cocokkan nama item, HINDARI kata bebas di deskripsi
  for (const theme of themes) {
    for (const item of theme.items) {
      const name = item.name.toLowerCase();
      if (q === name || (name.length >= 5 && q.includes(name))) {
        return { type: "item" as const, item, theme };
      }
    }
  }

  // 3. Exact theme title / tagline matches
  for (const theme of themes) {
    if (theme.title.toLowerCase() === q || (q.length >= 6 && theme.title.toLowerCase().includes(q))) {
      return { type: "theme" as const, theme };
    }
  }

  // 4. Keyword-to-theme mapping for common Sumsel queries
  const keywordMap: { keywords: string[]; slug: string }[] = [
    {
      keywords: ["makan", "kuliner", "pangan", "pempek", "pindang", "tekwan", "laksan", "celimpungan", "model", "kue", "maksuba", "kojo", "tempoyak", "cuko", "mie celor", "brengkes", "gula puan", "engkak"],
      slug: "kuliner",
    },
    {
      keywords: ["kain", "songket", "tenun", "tajung", "blongket", "lepus", "pakaian", "busana", "baju", "sewet", "aesan"],
      slug: "kain-pakaian",
    },
    {
      keywords: ["tari", "musik", "gending", "tanggai", "kebagh", "era-era", "serelo", "kenong", "alat musik", "gamelan palembang"],
      slug: "tari-musik",
    },
    {
      keywords: ["rumah", "arsitektur", "limas", "rakit", "tata ruang", "tiang", "bengking", "ulu"],
      slug: "rumah-adat",
    },
    {
      keywords: ["bahasa", "aksara", "kaganga", "surat ulu", "dialek", "tutur", "melayu palembang", "baso"],
      slug: "bahasa-aksara",
    },
    {
      keywords: ["sejarah", "sriwijaya", "prasasti", "kedukan bukit", "talang tuo", "telaga batu", "bukit siguntang", "kesultanan", "badaruddin", "kerajaan"],
      slug: "sejarah",
    },
    {
      keywords: ["upacara", "adat", "sedekah", "ngobeng", "ngidang", "tepung tawar", "sedekah rame", "ritual"],
      slug: "upacara-adat",
    },
    {
      keywords: ["lisan", "pantun", "senandung", "dulmuluk", "teater", "tadut", "tembang", "cerita rakyat"],
      slug: "pertunjukan-lisan",
    },
  ];

  for (const mapping of keywordMap) {
    if (mapping.keywords.some((k) => q.includes(k))) {
      const theme = themes.find((t) => t.slug === mapping.slug);
      if (theme) return { type: "theme" as const, theme };
    }
  }

  return null;
}

// ─── Blacklist for truly off-topic queries ──────────────────────────────────
export function isClearlyOffTopic(query: string): boolean {
  const q = query.toLowerCase().trim();
  const blocked = [
    "kripto", "bitcoin", "judi", "slot", "togel", "saham", "forex", "hack",
    "bokep", "porno", "obat", "cuaca besok", "download movie"
  ];
  return blocked.some((t) => q.includes(t));
}

// ─── Builder for authentic Sumsel Song result (Zero Hallucination) ───────────
export function buildSongSearchResult(
  song: SumselSong,
  query: string,
  mode: "lyrics" | "explanation" = "lyrics"
): SearchResult {
  const theme = themes.find((t) => t.slug === song.themeSlug) || themes[2]; // fallback to tari-musik

  if (mode === "explanation") {
    const explanation = song.explanation;
    return {
      status: "ok",
      query,
      card1: {
        isDedicatedTour: false,
        title: `Lagu Daerah: ${song.title}`,
        subtitle: `Khazanah Seni Tradisional ${song.region} — Warisan Budaya`,
        image: song.image,
        badge: "Penjelasan Lagu Tradisional",
        href: `/tema/${song.themeSlug}`,
      },
      card2: {
        title: explanation?.title || `Penjelasan & Makna Lagu ${song.title}`,
        highlight: explanation?.highlight || song.meaning,
        paragraphs: explanation?.paragraphs || [
          `Latar Belakang & Sejarah:\nLagu '${song.title}' merupakan salah satu tembang daerah kebanggaan masyarakat ${song.region} yang sarat akan nilai budaya dan kearifan lokal.`,
          `Makna Filosofis:\n${song.meaning}`,
          `Karakteristik Musikal & Pelestarian:\nTembang ini mencerminkan identitas seni vokal tradisional Sumatera Selatan dan terus dilestarikan sebagai Warisan Budaya Takbenda kebanggaan Nusantara.`,
        ],
        bulletPoints: explanation?.bulletPoints || [
          { label: "Asal Wilayah", text: song.region },
          { label: "Pencipta", text: song.creator || "Tradisional" },
          { label: "Fungsi Budaya", text: "Tembang tradisi, sastra tutur, dan kidung rakyat" },
        ],
        sources: song.sources.map((s, i) => ({
          ...s,
          icon: ["W", "🏛", "📚"][i] || "🔗",
          iconStyle: [
            "bg-white text-slate-900",
            "bg-[#6b1d2f] text-white",
            "bg-amber-700 text-white",
          ][i] || "bg-slate-700 text-white",
          img: "",
        })),
      },
      card3: {
        themeSlug: theme.slug,
        themeTitle: theme.title,
        themeLabel: theme.tagline,
        themeDesc: theme.intro,
        themeImg: theme.heroImage,
        themeHref: `/tema/${theme.slug}`,
        relatedItems: theme.items.slice(0, 4).map((it) => ({
          name: it.name,
          desc: it.desc,
          image: it.image || theme.image,
          slug: it.slug,
          link: it.slug ? `/tur/${it.slug}` : `/tema/${theme.slug}`,
        })),
      },
    };
  }

  // mode === "lyrics" (Pertanyaan Lirik Lagu)
  return {
    status: "ok",
    query,
    card1: {
      isDedicatedTour: false,
      title: song.title,
      subtitle: `Lagu Daerah ${song.region} — Warisan Budaya Takbenda`,
      image: song.image,
      badge: "Lirik Lagu Daerah Sumsel",
      href: `/tema/${song.themeSlug}`,
    },
    card2: {
      title: `Lirik Lagu ${song.title}`,
      highlight: song.highlight,
      paragraphs: song.lyrics,
      bulletPoints: [
        { label: "Kategori", text: `Teks Lirik Autentik Lagu Daerah ${song.region}` },
        { label: "Pencipta / Sumber", text: song.creator || "Tradisional" },
        { label: "Makna Singkat", text: song.meaning },
      ],
      sources: song.sources.map((s, i) => ({
        ...s,
        icon: ["W", "🏛", "📚"][i] || "🔗",
        iconStyle: [
          "bg-white text-slate-900",
          "bg-[#6b1d2f] text-white",
          "bg-amber-700 text-white",
        ][i] || "bg-slate-700 text-white",
        img: "",
      })),
    },
    card3: {
      themeSlug: theme.slug,
      themeTitle: theme.title,
      themeLabel: theme.tagline,
      themeDesc: theme.intro,
      themeImg: theme.heroImage,
      themeHref: `/tema/${theme.slug}`,
      relatedItems: theme.items.slice(0, 4).map((it) => ({
        name: it.name,
        desc: it.desc,
        image: it.image || theme.image,
        slug: it.slug,
        link: it.slug ? `/tur/${it.slug}` : `/tema/${theme.slug}`,
      })),
    },
  };
}

// ─── Resolves a guaranteed high-quality contextual image for every query ─────
export function resolveContextualImage(
  query: string,
  title?: string,
  themeSlug?: string,
  externalImage?: string | null
): string {
  const q = `${query} ${title || ""}`.toLowerCase();

  // ── PRIORITAS 1: Gambar dari Wikimedia/Wikipedia (URL http nyata) ─────────────
  // Hanya URL http yang benar-benar dari Wikimedia yang dipercaya sebagai gambar relevan.
  // Path lokal seperti /images/pempek.jpg yang dikirim Gemini TIDAK diterima di sini.
  if (externalImage && externalImage.startsWith("http") && isValidImageUrl(externalImage)) {
    return externalImage;
  }

  // ── PRIORITAS 2: Pemetaan topik lokal yang akurat ────────────────────────────
  // Bundaran HI / Hotel Indonesia Jakarta / Monumen Selamat Datang
  if (
    q.includes("bundaran hi") ||
    q.includes("bunderan hi") ||
    q.includes("hotel indonesia") ||
    q.includes("monumen selamat datang") ||
    q.includes("patung selamat datang")
  ) {
    return "https://thumb.wikimedia.org/wikipedia/id/thumb/3/35/Monumen_Selamat_Datang_%28Maret_2025%29.jpg/330px-Monumen_Selamat_Datang_%28Maret_2025%29.jpg";
  }

  // Prabumulih / Kota Nanas
  if (q.includes("prabumulih") || q.includes("kota nanas")) {
    return "/images/musi_landscape.jpg";
  }

  // Palembang profil kota (bukan kuliner pempek / busana songket / rumah limas)
  if (
    (q.includes("palembang") || q.includes("kota palembang") || q.includes("bumi sriwijaya")) &&
    !q.includes("pempek") &&
    !q.includes("songket") &&
    !q.includes("limas") &&
    !q.includes("tekwan") &&
    !q.includes("cuko")
  ) {
    return "/images/ampera_hero.jpg";
  }

  // Wilayah & Geografi spesifik Sumatera Selatan

  // Semendo / Semende / Kopi Semendo
  if (q.includes("semendo") || q.includes("semende")) {
    return "/images/sungai_lematang.jpg"; // lanskap pegunungan Sumsel terdekat
  }

  // Kopi (di luar konteks kopi Palembang)
  if (q.includes("kopi") && !q.includes("pempek") && !q.includes("palembang")) {
    return "/images/sungai_lematang.jpg"; // visual alami/hijau
  }

  // Pagaralam / Besemah / Gunung Dempo / Megalitik
  if (
    q.includes("pagaralam") || q.includes("pagar alam") ||
    q.includes("besemah") || q.includes("dempo") ||
    q.includes("megalitik") || q.includes("megalit")
  ) {
    return "/images/megalitik_pasemah.jpg";
  }

  // Pasemah (umum, tanpa kata tari)
  if (q.includes("pasemah") && !q.includes("tari") && !q.includes("kebagh")) {
    return "/images/megalitik_pasemah.jpg";
  }

  // Lahat / Lematang
  if (q.includes("lahat") || q.includes("lematang")) {
    return "/images/sungai_lematang.jpg";
  }

  // Danau Ranau / OKU Selatan / Seminung
  if (q.includes("ranau") || q.includes("oku selatan") || q.includes("seminung") || q.includes("muaradua")) {
    return "/images/musi_landscape.jpg";
  }

  // Pedamaran / Anyaman Purun / OKI
  if (q.includes("pedamaran") || q.includes("purun") || q.includes("anyaman")) {
    return "/images/purun_pedamaran.jpg";
  }

  // Musi Rawas / Lubuklinggau
  if (q.includes("musi rawas") || q.includes("lubuklinggau") || q.includes("linggau")) {
    return "/images/sungai_musi_sekayu.jpg";
  }

  // Musi Banyuasin / Sekayu
  if (q.includes("musi banyuasin") || q.includes("sekayu")) {
    return "/images/sungai_musi_sekayu.jpg";
  }

  // Sungai Musi Sekayu (beda dari Sungai Musi Palembang)
  if (q.includes("muba") && !q.includes("senjang")) {
    return "/images/sungai_musi_sekayu.jpg";
  }

  // Banyuasin / Tanjung Api-Api / Upang
  if (q.includes("banyuasin") || q.includes("tanjung api") || q.includes("upang")) {
    return "/images/musi_landscape.jpg";
  }

  // Empat Lawang
  if (q.includes("empat lawang") || q.includes("tebing tinggi")) {
    return "/images/sungai_lematang.jpg";
  }

  // Komering / Kayuagung
  if (q.includes("komering") || q.includes("kayuagung")) {
    return "/images/rumah_kayuagung.jpg";
  }

  // Kenong Basemah / musik Pasemah
  if (q.includes("kenong") || q.includes("basemah")) {
    return "/images/kenong_basemah.jpg";
  }

  // Tradisi Ngobeng / Sedekah Rame
  if (q.includes("ngobeng") || q.includes("sedekah rame")) {
    return "/images/sedekah_rame.jpg";
  }

  // Bekarang / Iwak / Mancing Tradisional
  if (q.includes("bekarang") || q.includes("mancing") || q.includes("iwak")) {
    return "/images/bekarang_iwak.jpg";
  }

  // Randai
  if (q.includes("randai")) {
    return "/images/randai_panggung.jpg";
  }

  // Nindai / Upacara Adat
  if (q.includes("nindai") || q.includes("upacara")) {
    return "/images/adat_nindai.jpg";
  }

  // Gandus / Kawasan Palembang
  if (q.includes("gandus")) {
    return "/images/gandus_palembang.jpg";
  }

  // Kesultanan Palembang / Darussalam
  if (q.includes("kesultanan") || q.includes("darussalam") || q.includes("sultan")) {
    return "/images/kesultanan_palembang.jpg";
  }

  // ── PRIORITAS 3: Pemetaan topik lainnya (fallback lokal) ────────────────────

  // 1. Lagu Daerah & Musik Tradisional
  if (
    q.includes("lagu") ||
    q.includes("lirik") ||
    q.includes("nyanyi") ||
    q.includes("tembang") ||
    q.includes("syair") ||
    q.includes("musik") ||
    q.includes("burdah") ||
    q.includes("rebana") ||
    q.includes("batanghari sembilan")
  ) {
    if (q.includes("batanghari sembilan") || q.includes("gitar")) {
      return "/images/tembang_batanghari_sembilan.jpg";
    }
    if (q.includes("kebile") || q.includes("besemah") || q.includes("lahat") || q.includes("pagaralam")) {
      return "/images/tari_pasemah.jpg";
    }
    if (q.includes("cuk mak ilang") || q.includes("senjang") || q.includes("lisan") || q.includes("pantun")) {
      return "/images/rebana_burdah.jpg";
    }
    if (q.includes("dek sangke")) {
      return "/images/senjang_muba.jpg";
    }
    if (q.includes("saman") || q.includes("songket")) {
      return "/images/songket_lepus.jpg";
    }
    return "/images/rebana_burdah.jpg";
  }

  // 2. Seni Tari Tradisional
  if (q.includes("tari") || q.includes("joget") || q.includes("gerak") || q.includes("penari")) {
    if (q.includes("tanggai")) return "/images/tari_tanggai.jpg";
    if (q.includes("setabik")) return "/images/tari_setabik.jpg";
    if (q.includes("pagar pengantin")) return "/images/tari_pagar_pengantin.jpg";
    if (q.includes("pasemah") || q.includes("kebagh")) return "/images/tari_kebagh.jpg";
    if (q.includes("begambo")) return "/images/tari_begambo.jpg";
    return "/images/tari_gending.jpg";
  }

  // 3. Kuliner Khas
  if (q.includes("pempek") || q.includes("cuko")) return "/images/pempek_palembang.jpg";
  if (q.includes("tekwan") || q.includes("model")) return "/images/tekwan_palembang.jpg";
  if (q.includes("pindang") || q.includes("patin")) return "/images/pindang_patin.jpg";
  if (q.includes("mie celor") || q.includes("celor")) return "/images/mie_celor.jpg";
  if (q.includes("burgo") || q.includes("lakso")) return "/images/burgo_palembang.jpg";
  if (q.includes("tempoyak") || q.includes("sambal")) return "/images/sambal_tempoyak.jpg";
  if (q.includes("maksuba") || q.includes("kue")) return "/images/kue_maksuba.jpg";
  if (q.includes("delapan jam") || q.includes("lapan jam")) return "/images/kue_delapan_jam.jpg";
  if (q.includes("makan") || q.includes("kuliner") || q.includes("masak") || q.includes("resep")) {
    return "/images/pempek_palembang.jpg";
  }

  // 4. Pakaian Adat & Kain Tenun
  if (q.includes("aesan") || q.includes("pengantin") || q.includes("mahkota")) {
    return "/images/aesan_gede_banner.jpg";
  }
  if (q.includes("songket") || q.includes("tenun")) return "/images/songket_lepus.jpg";
  if (q.includes("jumputan")) return "/images/kain_jumputan.jpg";
  if (q.includes("batik")) return "/images/batik_palembang.jpg";
  if (q.includes("kain") || q.includes("busana") || q.includes("baju")) return "/images/songket_lepus.jpg";

  // 5. Rumah Adat & Arsitektur
  if (q.includes("limas")) return "/images/rumah_limas.jpg";
  if (q.includes("rakit")) return "/images/rumah_rakit.jpg";
  if (q.includes("ulu")) return "/images/rumah_ulu.jpg";
  if (q.includes("baghi")) return "/images/ghumah_baghi.jpg";
  if (q.includes("kilapan")) return "/images/rumah_kilapan.jpg";
  if (q.includes("cara gudang")) return "/images/rumah_cara_gudang.jpg";
  if (q.includes("rumah") || q.includes("arsitektur") || q.includes("bangunan")) return "/images/rumah_limas.jpg";

  // 6. Tempat, Landmark & Geografi
  if (q.includes("ampera") || q.includes("jembatan")) return "/images/ampera_hero.jpg";
  if (q.includes("kuto besak") || q.includes("benteng") || q.includes("bkb")) return "/images/benteng_kuto_besak.jpg";
  if (q.includes("musi") || q.includes("sungai")) return "/images/musi_landscape.jpg";
  if (q.includes("bidar")) return "/images/perahu_bidar.jpg";
  if (q.includes("ketek") || q.includes("perahu")) return "/images/perahu_ketek.jpg";
  if (q.includes("museum") || q.includes("balaputradewa")) return "/images/museum_balaputradewa.jpg";
  if (q.includes("dempo") || q.includes("megalitik") || q.includes("pasemah")) return "/images/megalitik_pasemah.jpg";

  // 7. Sejarah, Bahasa & Budaya
  if (q.includes("aksara") || q.includes("kaganga") || q.includes("surat ulu")) return "/images/aksara_ulu.jpg";
  if (q.includes("prasasti") || q.includes("kedukan bukit") || q.includes("sriwijaya")) return "/images/prasasti_kedukan_bukit.jpg";
  if (q.includes("buddha") || q.includes("siguntang")) return "/images/buddha_seguntang.jpg";
  if (q.includes("teater") || q.includes("dulmuluk")) return "/images/teater_dulmuluk.jpg";

  // 8. Theme slug matching fallback
  if (themeSlug === "tari-musik") return "/images/tari_gending.jpg";
  if (themeSlug === "kuliner") return "/images/pempek_palembang.jpg";
  if (themeSlug === "kain-pakaian") return "/images/songket_lepus.jpg";
  if (themeSlug === "rumah-adat") return "/images/rumah_limas.jpg";
  if (themeSlug === "sejarah") return "/images/prasasti_kedukan_bukit.jpg";
  if (themeSlug === "bahasa-aksara") return "/images/aksara_ulu.jpg";
  if (themeSlug === "pertunjukan-lisan") return "/images/teater_dulmuluk.jpg";
  if (themeSlug === "upacara-adat") return "/images/adat_nindai.jpg";

  // Default universal fallback
  return "/images/ampera_hero.jpg";
}

// ─── Filter for clean, authentic photos (avoid diagrams/placeholders) ────────
export function isValidImageUrl(url?: string | null): boolean {
  if (!url || typeof url !== "string") return false;
  const lower = url.toLowerCase();
  if (lower.includes(".svg")) return false;
  if (lower.includes("bamboofabric")) return false;
  if (lower.includes("coat_of_arms")) return false;
  if (lower.includes("flag_of")) return false;
  if (lower.includes("blank.png")) return false;
  if (lower.includes("disambig")) return false;
  if (lower.includes("question_book")) return false;
  return true;
}

// ─── Smart keyword expander: maps raw query to precise Wikipedia search terms ──
// Menghindari generalisasi ke "Palembang" untuk topik yang berlokasi di luar kota
export function expandQueryKeywords(rawQuery: string): {
  primaryTerms: string[];    // Istilah Wikipedia paling tepat (dicoba duluan via REST)
  searchTerms: string[];     // Kata kunci pencarian (generator=search)
  commonsTerms: string[];    // Kata kunci untuk Wikimedia Commons
  regionalContext: string;   // Konteks regional yang tepat (bukan selalu "Palembang")
} {
  const q = rawQuery.toLowerCase().trim();

  // ── Landmark Populer Luar Sumsel ──────────────────────────────────────────
  // Bundaran HI / Hotel Indonesia / Monumen Selamat Datang
  if (
    q.includes("bundaran hi") ||
    q.includes("bunderan hi") ||
    q.includes("hotel indonesia") ||
    q.includes("monumen selamat datang") ||
    q.includes("patung selamat datang")
  ) {
    return {
      primaryTerms: ["Bundaran Hotel Indonesia", "Monumen Selamat Datang", "Hotel Indonesia"],
      searchTerms: ["Bundaran Hotel Indonesia Jakarta Pusat", "Monumen Selamat Datang landmark Jakarta"],
      commonsTerms: ["Bundaran HI Jakarta", "Monumen Selamat Datang"],
      regionalContext: "Jakarta Pusat",
    };
  }

  // ── Wilayah & Geografi Spesifik Sumatera Selatan ────────────────────────────

  // Kota Palembang (bukan makanan pempek atau kain songket)
  if (
    (q.includes("palembang") || q.includes("kota palembang") || q.includes("bumi sriwijaya")) &&
    !q.includes("pempek") &&
    !q.includes("songket") &&
    !q.includes("limas") &&
    !q.includes("tekwan") &&
    !q.includes("cuko")
  ) {
    return {
      primaryTerms: ["Kota Palembang", "Palembang", "Jembatan Ampera"],
      searchTerms: ["Kota Palembang South Sumatra capital", "Jembatan Ampera Palembang city"],
      commonsTerms: ["Palembang city", "Jembatan Ampera"],
      regionalContext: "Kota Palembang",
    };
  }

  // Prabumulih / Kota Nanas
  if (q.includes("prabumulih") || q.includes("kota nanas")) {
    return {
      primaryTerms: ["Kota Prabumulih", "Prabumulih"],
      searchTerms: ["Kota Prabumulih South Sumatra", "Prabumulih nanas"],
      commonsTerms: ["Prabumulih", "Kota Prabumulih"],
      regionalContext: "Prabumulih Sumatera Selatan",
    };
  }

  // Semendo / Semende
  if (q.includes("semendo") || q.includes("semende")) {
    return {
      primaryTerms: ["Semende", "Dataran Tinggi Semende", "Kopi Semendo", "Suku Semende"],
      searchTerms: ["Semende Muara Enim", "Semende culture South Sumatra", "Semende highland coffee"],
      commonsTerms: ["Semende", "Semendo coffee plantation Sumatra"],
      regionalContext: "Semende Muara Enim",
    };
  }

  // Pagaralam / Besemah / Pasemah / Dempo
  if (q.includes("pagaralam") || q.includes("pagar alam") || q.includes("besemah") || q.includes("pasemah") || q.includes("dempo") || q.includes("megalitik")) {
    return {
      primaryTerms: ["Pagaralam", "Suku Pasemah", "Gunung Dempo", "Megalitik Pasemah", "Besemah"],
      searchTerms: ["Pagaralam city South Sumatra", "Pasemah megalithic culture", "Gunung Dempo Pagaralam"],
      commonsTerms: ["Pagaralam", "Gunung Dempo", "Pasemah megalith"],
      regionalContext: "Pagaralam Sumatera Selatan",
    };
  }

  // Lahat / Lematang
  if (q.includes("lahat") || q.includes("lematang")) {
    return {
      primaryTerms: ["Kabupaten Lahat", "Sungai Lematang", "Suku Pasemah Lahat"],
      searchTerms: ["Lahat Regency South Sumatra", "Lematang River cultural heritage"],
      commonsTerms: ["Lahat South Sumatra", "Lematang Sumatera Selatan"],
      regionalContext: "Lahat Sumatera Selatan",
    };
  }

  // Danau Ranau / OKU Selatan
  if (q.includes("ranau") || q.includes("oku selatan") || q.includes("muaradua")) {
    return {
      primaryTerms: ["Danau Ranau", "Ogan Komering Ulu Selatan", "Seminung"],
      searchTerms: ["Danau Ranau South Sumatra", "Ranau lake Indonesia", "OKU Selatan"],
      commonsTerms: ["Danau Ranau", "Lake Ranau South Sumatra"],
      regionalContext: "Danau Ranau OKU Selatan",
    };
  }

  // Pedamaran / Rawa / Purun / OKI
  if (q.includes("pedamaran") || q.includes("purun") || q.includes("anyaman") || (q.includes("oki") && !q.includes("oki sunda"))) {
    return {
      primaryTerms: ["Pedamaran", "Rawa Pedamaran", "Anyaman Purun", "Ogan Komering Ilir"],
      searchTerms: ["Pedamaran wetland South Sumatra", "Purun weaving Pedamaran", "Rawa Pedamaran"],
      commonsTerms: ["Pedamaran", "Purun weaving Sumatra"],
      regionalContext: "Pedamaran Ogan Komering Ilir",
    };
  }

  // Musi Rawas / MURA
  if (q.includes("musi rawas") || q.includes("lubuklinggau") || q.includes("linggau")) {
    return {
      primaryTerms: ["Musi Rawas", "Lubuklinggau", "Kabupaten Musi Rawas"],
      searchTerms: ["Musi Rawas Sumatera Selatan", "Lubuklinggau city South Sumatra"],
      commonsTerms: ["Musi Rawas", "Lubuklinggau"],
      regionalContext: "Musi Rawas Sumatera Selatan",
    };
  }

  // Musi Banyuasin / Senjang
  if (q.includes("musi banyuasin") || q.includes("muba") || q.includes("senjang") || q.includes("sekayu")) {
    return {
      primaryTerms: ["Musi Banyuasin", "Senjang", "Sekayu"],
      searchTerms: ["Musi Banyuasin Senjang oral tradition", "Sekayu Musi Banyuasin South Sumatra"],
      commonsTerms: ["Senjang oral poetry Muba", "Musi Banyuasin"],
      regionalContext: "Musi Banyuasin Sumatera Selatan",
    };
  }

  // Banyuasin / Tanjung Api-Api
  if (q.includes("banyuasin") || q.includes("tanjung api") || q.includes("upang")) {
    return {
      primaryTerms: ["Banyuasin", "Kabupaten Banyuasin", "Tanjung Api-Api"],
      searchTerms: ["Banyuasin regency South Sumatra", "Tanjung Api-Api port"],
      commonsTerms: ["Banyuasin South Sumatra"],
      regionalContext: "Banyuasin Sumatera Selatan",
    };
  }

  // Empat Lawang / Tebing Tinggi
  if (q.includes("empat lawang") || q.includes("tebing tinggi")) {
    return {
      primaryTerms: ["Empat Lawang", "Tebing Tinggi Empat Lawang"],
      searchTerms: ["Empat Lawang regency South Sumatra"],
      commonsTerms: ["Empat Lawang Sumatera Selatan"],
      regionalContext: "Empat Lawang Sumatera Selatan",
    };
  }

  // ── Seni & Tradisi Lokal Non-Palembang ──────────────────────────────────────

  // Kebile-bile / Besemah / lagu daerah Lahat & Pagaralam
  if (q.includes("kebile") || (q.includes("lagu") && (q.includes("lahat") || q.includes("besemah")))) {
    return {
      primaryTerms: ["Lagu Daerah Besemah", "Kabupaten Lahat"],
      searchTerms: ["Kebile-bile lagu daerah Besemah Pagaralam"],
      commonsTerms: ["Besemah traditional music Sumatra"],
      regionalContext: "Besemah Lahat Pagaralam",
    };
  }

  // Tari Kebagh / Tari Pasemah
  if (q.includes("kebagh") || (q.includes("tari") && q.includes("pasemah"))) {
    return {
      primaryTerms: ["Tari Kebagh", "Suku Pasemah", "Tari Besemah"],
      searchTerms: ["Tari Kebagh Pasemah South Sumatra dance"],
      commonsTerms: ["Tari Kebagh Sumatra", "Pasemah dance"],
      regionalContext: "Pasemah Pagaralam",
    };
  }

  // Aksara Ulu / Surat Ulu / Ka-Ga-Nga / Komering
  if (q.includes("aksara ulu") || q.includes("surat ulu") || q.includes("kaganga") || q.includes("ka-ga-nga")) {
    return {
      primaryTerms: ["Aksara Ulu", "Surat Ulu", "Ka-Ga-Nga script"],
      searchTerms: ["Aksara Ulu South Sumatra script inscription"],
      commonsTerms: ["Aksara Ulu manuscript Sumatra", "Surat Ulu"],
      regionalContext: "Sumatera Selatan aksara tradisional",
    };
  }

  // Perahu Bidar / Bidar Musi
  if (q.includes("bidar") || (q.includes("perahu") && q.includes("musi"))) {
    return {
      primaryTerms: ["Perahu Bidar", "Bidar boat Palembang", "Sungai Musi"],
      searchTerms: ["Perahu Bidar Musi River traditional boat race Palembang"],
      commonsTerms: ["Bidar boat South Sumatra", "Perahu Bidar Palembang"],
      regionalContext: "Sungai Musi Palembang",
    };
  }

  // Batanghari Sembilan / musik gambang
  if (q.includes("batanghari sembilan") || (q.includes("gambang") && q.includes("sumsel"))) {
    return {
      primaryTerms: ["Batanghari Sembilan", "Musik Batanghari Sembilan"],
      searchTerms: ["Batanghari Sembilan traditional music South Sumatra"],
      commonsTerms: ["Batanghari Sembilan music", "Gambus Palembang"],
      regionalContext: "Sumatera Selatan musik tradisional",
    };
  }

  // Songket / Tenun Palembang
  if (q.includes("songket") || q.includes("tenun") || q.includes("lepus")) {
    return {
      primaryTerms: ["Songket Palembang", "Kain Songket", "Songket"],
      searchTerms: ["Songket Palembang weaving traditional textile"],
      commonsTerms: ["Songket Palembang", "Indonesian songket weaving"],
      regionalContext: "Palembang",
    };
  }

  // Jumputan / Kain Pelangi
  if (q.includes("jumputan") || q.includes("pelangi") || q.includes("tritik")) {
    return {
      primaryTerms: ["Kain Jumputan", "Jumputan Palembang", "Tie-dye Indonesia"],
      searchTerms: ["Kain Jumputan Palembang tie-dye batik"],
      commonsTerms: ["Jumputan cloth Palembang", "Indonesian tie-dye fabric"],
      regionalContext: "Palembang",
    };
  }

  // Rumah Limas / Rumah Adat Palembang
  if (q.includes("limas") || (q.includes("rumah") && q.includes("adat") && q.includes("palembang"))) {
    return {
      primaryTerms: ["Rumah Limas", "Rumah adat Palembang"],
      searchTerms: ["Rumah Limas traditional house Palembang South Sumatra"],
      commonsTerms: ["Rumah Limas Palembang", "Limas house architecture"],
      regionalContext: "Palembang",
    };
  }

  // Rumah Rakit / Sungai Musi
  if (q.includes("rakit") || (q.includes("rumah") && q.includes("terapung"))) {
    return {
      primaryTerms: ["Rumah Rakit", "Rumah terapung Musi"],
      searchTerms: ["Rumah Rakit floating house Musi River Palembang"],
      commonsTerms: ["Rumah Rakit Palembang", "floating house Musi River"],
      regionalContext: "Sungai Musi Palembang",
    };
  }

  // Rumah Ulu / Musi Rawas
  if (q.includes("rumah ulu") || (q.includes("ulu") && q.includes("rumah"))) {
    return {
      primaryTerms: ["Rumah Ulu", "Rumah tradisional Musi Rawas"],
      searchTerms: ["Rumah Ulu traditional house Musi Rawas South Sumatra"],
      commonsTerms: ["Rumah Ulu Sumatra", "Ulu house architecture"],
      regionalContext: "Musi Rawas Sumatera Selatan",
    };
  }

  // Ghumah Baghi / Pasemah
  if (q.includes("baghi") || q.includes("ghumah")) {
    return {
      primaryTerms: ["Ghumah Baghi", "Rumah adat Pasemah"],
      searchTerms: ["Ghumah Baghi Pasemah traditional house Pagaralam"],
      commonsTerms: ["Ghumah Baghi Pasemah", "traditional house Pagaralam"],
      regionalContext: "Pagaralam Besemah",
    };
  }

  // Dulmuluk / Teater tradisional
  if (q.includes("dulmuluk") || (q.includes("teater") && q.includes("sumsel"))) {
    return {
      primaryTerms: ["Dulmuluk", "Teater Dulmuluk", "Syair Abdul Muluk"],
      searchTerms: ["Dulmuluk traditional theater Palembang South Sumatra"],
      commonsTerms: ["Dulmuluk theater Palembang"],
      regionalContext: "Palembang",
    };
  }

  // Tari Tanggai / Gending Sriwijaya
  if (q.includes("tanggai") || q.includes("gending sriwijaya")) {
    return {
      primaryTerms: ["Tari Tanggai", "Gending Sriwijaya", "Tari Gending Sriwijaya"],
      searchTerms: ["Tari Tanggai traditional dance Palembang Sriwijaya"],
      commonsTerms: ["Tari Tanggai Palembang", "Gending Sriwijaya dance"],
      regionalContext: "Palembang",
    };
  }

  // Sriwijaya / Prasasti
  if (q.includes("sriwijaya") || q.includes("prasasti") || q.includes("kedukan bukit")) {
    return {
      primaryTerms: ["Sriwijaya", "Kerajaan Sriwijaya", "Prasasti Kedukan Bukit"],
      searchTerms: ["Sriwijaya empire South Sumatra historical kingdom"],
      commonsTerms: ["Sriwijaya kingdom", "Prasasti Kedukan Bukit"],
      regionalContext: "Palembang kuno Sriwijaya",
    };
  }

  // Pempek / Kuliner Palembang
  if (q.includes("pempek") || q.includes("cuko")) {
    return {
      primaryTerms: ["Pempek", "Pempek Palembang"],
      searchTerms: ["Pempek Palembang traditional food South Sumatra"],
      commonsTerms: ["Pempek Palembang food", "Pempek fish cake Indonesia"],
      regionalContext: "Palembang",
    };
  }

  // Tempoyak / Fermentasi Durian
  if (q.includes("tempoyak") || q.includes("fermentasi durian")) {
    return {
      primaryTerms: ["Tempoyak", "Sambal Tempoyak"],
      searchTerms: ["Tempoyak fermented durian South Sumatra Palembang"],
      commonsTerms: ["Tempoyak Indonesian fermented durian food"],
      regionalContext: "Sumatera Selatan",
    };
  }

  // Mie Celor / Tekwan / Model / Kuliner Sumsel
  if (q.includes("celor") || q.includes("tekwan") || q.includes("pindang") || q.includes("burgo") || q.includes("lakso")) {
    return {
      primaryTerms: ["Mie Celor", "Tekwan", "Pindang Palembang", "Burgo Palembang"],
      searchTerms: [`${rawQuery} South Sumatra traditional food`],
      commonsTerms: [`${rawQuery} Palembang traditional cuisine`],
      regionalContext: "Palembang kuliner",
    };
  }

  // Jembatan Ampera / Landmark Palembang
  if (q.includes("ampera") || q.includes("jembatan")) {
    return {
      primaryTerms: ["Jembatan Ampera", "Ampera Bridge"],
      searchTerms: ["Jembatan Ampera Palembang landmark bridge"],
      commonsTerms: ["Ampera Bridge Palembang", "Jembatan Ampera"],
      regionalContext: "Palembang",
    };
  }

  // Benteng Kuto Besak / Museum Balaputradewa
  if (q.includes("kuto besak") || q.includes("bkb") || q.includes("benteng")) {
    return {
      primaryTerms: ["Benteng Kuto Besak", "Museum Balaputradewa"],
      searchTerms: ["Benteng Kuto Besak Palembang fort historical"],
      commonsTerms: ["Benteng Kuto Besak", "Kuto Besak fort Palembang"],
      regionalContext: "Palembang",
    };
  }

  // Sungai Musi / kehidupan sungai
  if (q.includes("musi") || (q.includes("sungai") && !q.includes("komering") && !q.includes("lematang"))) {
    return {
      primaryTerms: ["Sungai Musi", "Musi River"],
      searchTerms: ["Sungai Musi Palembang River South Sumatra"],
      commonsTerms: ["Musi River Palembang", "Sungai Musi"],
      regionalContext: "Sungai Musi Palembang",
    };
  }

  // ── Default: Sumatera Selatan umum ─────────────────────────────────────────
  return {
    primaryTerms: [rawQuery, `${rawQuery} Sumatera Selatan`],
    searchTerms: [rawQuery, `${rawQuery} Sumatera Selatan budaya tradisional`],
    commonsTerms: [`${rawQuery} South Sumatra`, `${rawQuery} Indonesia`],
    regionalContext: "Sumatera Selatan",
  };
}

// ─── Fetch real image: Direct from references first, then Wikipedia & Commons ───
export async function fetchSmartImage(
  sources: SearchSource[] = [],
  titleId: string,
  titleEn?: string,
  searchQuery?: string,
  query?: string
): Promise<string | null> {
  // 1. Coba ambil foto langsung dari sumber referensi (sources) yang valid
  if (Array.isArray(sources) && sources.length > 0) {
    for (const src of sources) {
      if (!src?.url) continue;

      // a. Jika referensi dari Wikipedia, ambil foto artikel aslinya via REST API
      const wikiMatch = src.url.match(/wikipedia\.org\/wiki\/([^#?]+)/i);
      if (wikiMatch && wikiMatch[1]) {
        const pageTitle = decodeURIComponent(wikiMatch[1]);
        const lang = src.url.includes("en.wikipedia") ? "en" : "id";
        try {
          const cleanTitle = pageTitle.replace(/\s+/g, "_");
          const res = await fetch(
            `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cleanTitle)}`,
            { headers: { "User-Agent": "SORA-App/1.0" }, signal: AbortSignal.timeout(3500) }
          );
          if (res.ok) {
            const d = await res.json();
            const img = d?.thumbnail?.source || d?.originalimage?.source;
            if (isValidImageUrl(img)) return img;
          }
        } catch {}
      }

      // b. Jika referensi adalah situs web eksternal berita/budaya, ambil og:image
      if (src.url.startsWith("http") && !src.url.includes("wikipedia.org")) {
        try {
          const res = await fetch(src.url, {
            headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)" },
            signal: AbortSignal.timeout(3500),
          });
          if (res.ok) {
            const html = await res.text();
            const ogMatch =
              html.match(/<meta\s+[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i) ||
              html.match(/<meta\s+[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i) ||
              html.match(/<meta\s+[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["']/i);
            if (ogMatch && ogMatch[1]) {
              let candidate = ogMatch[1].trim();
              if (candidate.startsWith("//")) candidate = "https:" + candidate;
              if (candidate.startsWith("http") && isValidImageUrl(candidate)) {
                return candidate;
              }
            }
          }
        } catch {}
      }
    }
  }

  // 2. Expand keyword untuk pencarian yang tepat sasaran
  const rawQ = query || searchQuery || titleId;
  const expanded = expandQueryKeywords(rawQ);

  // 2a. Gabungkan dengan titleId dan searchQuery jika berbeda dari rawQ
  const extendedPrimary = [...new Set([...expanded.primaryTerms, titleId, searchQuery].filter(Boolean) as string[])];

  const directImg = await fetchWikipediaImage(extendedPrimary, titleEn, expanded);
  if (directImg) return directImg;

  // 3. Coba cari di Wikimedia Commons dengan kata kunci kontekstual yang tepat
  for (const commonsQ of expanded.commonsTerms) {
    try {
      const res = await fetch(
        `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(commonsQ)}&gsrnamespace=6&gsrlimit=6&prop=imageinfo&iiprop=url|mime&iiurlwidth=800&format=json&origin=*`,
        { signal: AbortSignal.timeout(4000) }
      );
      if (res.ok) {
        const d = await res.json();
        const pages = Object.values(d?.query?.pages || {}) as any[];
        for (const p of pages) {
          const info = p?.imageinfo?.[0];
          const mime = info?.mime || "";
          const url = info?.thumburl || info?.url;
          if (url && mime.startsWith("image/") && isValidImageUrl(url)) {
            return url;
          }
        }
      }
    } catch {}
  }

  return null;
}

// ─── Fetch real image: Wikipedia REST + search + Wikimedia Commons ──────────
export async function fetchWikipediaImage(
  primaryTerms: string | string[],
  titleEn?: string,
  expanded?: ReturnType<typeof expandQueryKeywords>
): Promise<string | null> {
  // Normalise: accept both old single-string and new array form
  const terms: string[] = Array.isArray(primaryTerms) ? primaryTerms : [primaryTerms];
  const titleId = terms[0] || "";

  // Helper: Wikipedia REST API (exact title)
  const tryRest = async (lang: string, title: string): Promise<string | null> => {
    if (!title) return null;
    try {
      const cleanTitle = title.replace(/\s+/g, "_");
      const res = await fetch(
        `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cleanTitle)}`,
        { headers: { "User-Agent": "SORA-App/1.0" }, signal: AbortSignal.timeout(4000) }
      );
      if (!res.ok) return null;
      const d = await res.json();
      const src = d?.thumbnail?.source || d?.originalimage?.source || null;
      return isValidImageUrl(src) ? src : null;
    } catch { return null; }
  };

  // Helper: Wikipedia search API (finds image for best matching article)
  const trySearch = async (lang: string, q: string): Promise<string | null> => {
    if (!q) return null;
    try {
      const res = await fetch(
        `https://${lang}.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(q)}&gsrlimit=5&prop=pageimages&pithumbsize=800&format=json&origin=*`,
        { signal: AbortSignal.timeout(5000) }
      );
      if (!res.ok) return null;
      const d = await res.json();
      const pages = Object.values(d?.query?.pages || {}) as any[];
      // Sort by search index (best match first)
      pages.sort((a, b) => (a.index ?? 999) - (b.index ?? 999));
      for (const p of pages) {
        const src = p?.thumbnail?.source;
        if (isValidImageUrl(src)) return src;
      }
      return null;
    } catch { return null; }
  };

  // Helper: Wikimedia Commons image search
  const tryCommons = async (q: string): Promise<string | null> => {
    if (!q) return null;
    try {
      const res = await fetch(
        `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(q)}&gsrnamespace=6&gsrlimit=5&prop=imageinfo&iiprop=url|mime&iiurlwidth=800&format=json&origin=*`,
        { signal: AbortSignal.timeout(5000) }
      );
      if (!res.ok) return null;
      const d = await res.json();
      const pages = Object.values(d?.query?.pages || {}) as any[];
      for (const p of pages) {
        const info = p?.imageinfo?.[0];
        const mime = info?.mime || "";
        const url = info?.thumburl || info?.url;
        if (url && mime.startsWith("image/") && isValidImageUrl(url)) {
          return url;
        }
      }
      return null;
    } catch { return null; }
  };

  // Phase 1: Fast direct REST — try all primary terms in parallel
  const restLookups = terms.map((t) => tryRest("id", t));
  if (titleEn) restLookups.push(tryRest("en", titleEn));
  const restResults = await Promise.all(restLookups);
  for (const img of restResults) {
    if (img) return img;
  }

  // Phase 2: Search-based queries — use expanded contextual terms if available
  const searchTerms = expanded?.searchTerms || [`${titleId} Sumatera Selatan`];
  const commonsTerms = expanded?.commonsTerms || [titleId];

  const searchLookups = [
    ...searchTerms.map((st) => trySearch("id", st)),
    ...commonsTerms.map((ct) => tryCommons(ct)),
  ];
  const searchResults = await Promise.all(searchLookups);
  for (const img of searchResults) {
    if (img) return img;
  }

  return null;
}

// Helper to securely get GEMINI_API_KEY even if Next dev server has not reloaded .env.local
function getGeminiApiKey(): string {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;
  try {
    const envPath = path.resolve(process.cwd(), ".env.local");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      const match = content.match(/GEMINI_API_KEY\s*=\s*["']?([^"'\r\n]+)["']?/);
      if (match && match[1]) {
        process.env.GEMINI_API_KEY = match[1].trim();
        return process.env.GEMINI_API_KEY;
      }
    }
  } catch {}
  return "AQ.Ab8RN6I5aGFGW3UtYlQaln0XErOgFMWdDLbXBIJT8P43B6gGRw";
}

// ─── Main Gemini summary generator ─────────────────────────────────────────
export async function generateGeminiSummary(
  query: string,
  localMatch: ReturnType<typeof findLocalMatch>
): Promise<SearchResult | null> {
  const apiKey = getGeminiApiKey();
  if (!apiKey) return null;

  const prompt = `
Anda adalah SORA AI — asisten cerdas serba bisa yang ahli tentang Sumatera Selatan (Sumsel) dan Indonesia.

Query pengguna: "${query}"

REFERENSI RESMI LIRIK LAGU DAERAH SUMATERA SELATAN (ANTI-HALUSINASI MUTLAK):
Jika menanyakan lagu daerah Sumatera Selatan, Anda WAJIB menggunakan bait kanonikal otentik berikut sesuai judul yang ditanyakan:
- Palembang Darussalam (Cipt. R.H. Syahril Erwin / Yayak):
  "Palembang Darussalam...\nPalembang kota kito\nTekenal sungi Musinyo...\nTekenal dengan pempeknyo\nJembatan Ampera yang anggun\nMasjid Agungnyo yang cindo\nMenambah tekenalnyo\nKota kesayangan kito\n\nPalembang Darussalam...\nPalembang kota kito\nTekenal rumah limasnyo\nTekenal dengan songketnyo\nPulou Kemaro yang tenang\nBenteng Kuto Besak yang cindo\nMenambah semaraknyo\nKota kebanggaan kito\n\nBujang gadesnyo... Oi... belagak nian\nAdat budayonyo tetep dijago\nHasil buminyo... Oi... banyak nian\nPembangunannyo rato dimano-mano\n\nOi... Palembang Darussalam\nOi... Palembang Darussalam\nPalembang kota kito\nPalembang Darussalam"
- Pempek Lenjer (Cipt. S. Tarno):
  "Bulet besak panjang mak lengen\nKejel-kejel rasonyo marem\nMasuk ke mulut matonyo mejem\nMertuo lewat masih ditelen\n\nKejel keras sudah biaso\nAsak bae iwaknyo teraso\nDigoreng pake minyak kelapo\nJadi nambah lemak rasonyo\n\nReff:\nPempek lenjer oy pempek lenjer\nSiapo nyingok pastilah ngiler\nPempek lenjer oy pempek lenjer\nMakan sikok pacak kelenger\n\nMangcek bicek janganlah lupo\nNgawak balek oleh-olehnyo\nPempek lenjer samo cukonyo\nKito makan bersamo-samo"
- Kebile-bile / Kabile-bile (Besemah - Lahat & Pagaralam):
  Refrein:
  "Kebile-bile mangke ku lege\nKebile-bile ku ade kance\nKebile-bile mangke ku lege\nKebile-bile ku ade kance"
  Bait 1:
  "Kebile nian jagunglah putih\nPutih dik putih kukendam kina\nKebile nian ibung kah nulih\nNulih dik nulih kudendam kina"
  Bait 2:
  "Kebile nian mampat begune\nMangke dik payah ku nandan lagi\nKebile nian sifat begune\nMangke dik payah ku midang lagi"
  Bait Penutup:
  "Oh, malang nian nasib ‘mbak ini\nBilangan jeme lah laut gale\nAlahkah sedih ai tumbak ini\nAku ‘mbak ini dide bekance"
- Ya Saman (Cipt. Kamsul A. Harla):
  "Nyelek gelumbang perahu bidar di Sungi Musi\nJanganlah lupo meli telok abang\nCantik rupo penyabar dan baek hati\nAdek manis berambut panjang dikuncit kepang\n\nLika-liku banyu Batanghari Sembilan\nMengalir bemuaro ke Sungi Musi jugo\nElok laku ngaesi rupo cindo menawan\nMuat kakak siang tekenang malem tejago\n\nPulo Kemaro melah Sungi Musi ke Sungsang\nNak ke Pusri laju kesasar ke Kalidoni\nBadan saro pikiran resah hati teguncang\nNgarapke adek kalu be galak jadi bini\n\nAy... ya... ya... ya... Ya Saman\nPecaknyo mudah tapi saro nian\nAy... ya... ya... ya... Ya Saman\nNyari bini yang bener-bener setolok an\n\nAy... ya... ya... ya... Ya Saman\nPecaknyo mudah tapi saro nian\nAy... ya... ya... ya... Ya Saman\nYa Saman... Ya Saman... Ya Saman..."
- Cuk Mak Ilang (Palembang):
  Refrein:
  "Cuk mak ilang mak ilang cagak batu\nDimano koceng belang disitu rumah aku\nCuk mak ilang mak ilang cagak batu\nDimano koceng belang disitu rumah aku"
  Bait 1:
  "Kapal api masok Pelembang\nBanyunyo tenang jadi gelumbang\nOi mak mano ati dak bimbang\nGades doson bujang Pelembang"
  Bait 2:
  "Alangke lemak rumah di lebak\nSiput dan gondang memanjat cagak\nAlangke lemak rumah nan parak\nBukak jendelo lah saling agak"
  Bait 3:
  "Sempayo digulai lemak\nBatang padi dibelah duo\nJangan takot dimarah umak\nAsak jadi kito beduo"
  Bait 4:
  "Anak ikan dimakan ikan\nIkan dilaut beduri duri\nSanaklah bukan saudaro bukan\nSangkot paotnyo kareno budi"
- Dek Sangke (Sumsel):
  "Dek sangke aku dek sangke\nAwak uke la jadi duwo\nNemba' bunga putik kelapo\nBuah jambu la jadi mudo\nDek sangke aku dek sangke\nKando batinggal ku de sangke\nSiang malam ku de nyangke\nHati tebakar rindu mambang\nBiarlah luluh tulang belulang\nAsal kando selamat pulang"
- Gending Sriwijaya (Palembang):
  "Di kala ku merindukan keluhuran dahulu kala\nKutembangkan nyanyi lagu Gending Sriwijaya\nDalam seni kunikmati lagi zaman bahagia\nKuciptakan kembali dari kandungan Maha Kala\nSriwijaya dengan Asrama Agung Sang Maha Guru..."

PANDUAN UTAMA PENJAWABAN (WAJIB TEPAT PADA INTI PERTANYAAN):
1. JAWABLAH SECARA LANGSUNG, TEPAT, DAN LENGKAP SESUAI DENGAN INTENSI PERTANYAAN:
   - JIKA MENANYAKAN LIRIK LAGU SECARA SPESIFIK (pertanyaan lirik, contoh: "lirik cuk mak ilang", "lirik lagu kebile bile", "lirik ya saman", "syair cuk mak ilang", dll):
     * Pada "title": Berikan judul lirik yang jelas (contoh: "Lirik Lagu Cuk Mak Ilang", "Lirik Lagu Kebile-bile").
     * Pada "badge": "Lirik Lagu Daerah Sumsel".
     * Pada "highlight": Pengantar lirik resmi/autentik 1 kalimat (contoh: "Berikut adalah teks lirik autentik dan lengkap lagu daerah...").
     * Pada "paragraphs":
       - SAJIKAN SELURUH TEKS LIRIK ASLI BAIT DEMI BAIT SECARA LENGKAP DAN PRESISI (dengan baris-baris lirik rapi menggunakan \n)! Gunakan teks kanonikal resmi di atas, DILARANG MENGARANG ATAU MENGUBAH LIRIK.
     * Di bagian bulletPoints: Kategori Lirik, Asal Daerah, Pencipta / Sumber Tradisi.

   - JIKA MENANYAKAN PENJELASAN / MAKNA / ASAL-USUL / SEJARAH LAGU (pertanyaan penjelasan, contoh: "lagu cuk mak ilang", "penjelasan lagu cuk mak ilang", "makna lagu kebile bile", "cerita lagu...", "apa arti lagu...", dll):
     * JANGAN HANYA MENYALIN TEKS LIRIK! Pengguna meminta PENJELASAN DAN MAKNA LAGU, BUKAN HANYA LIRIK!
     * Pada "title": Berikan judul penjelasan yang jelas (contoh: "Penjelasan & Makna Lagu Cuk Mak Ilang", "Penjelasan & Makna Lagu Kebile-bile").
     * Pada "badge": "Penjelasan Lagu Tradisional".
     * Pada "highlight": Uraikan esensi, filosofi, dan latar belakang lagu secara padat dalam 1-2 kalimat.
     * Pada "paragraphs":
       - Paragraf 1: Asal-usul, sejarah, dan konteks sosial budaya masyarakat penciptanya (misalnya Palembang tepian Sungai Musi atau Suku Besemah Lahat & Pagar Alam).
       - Paragraf 2: Makna filosofis mendalam di balik syair dan bait-baitnya (misal: tradisi pantun bersahut asmara bujang-gadis, atau kepasrahan batin menghadapi kesendirian).
       - Paragraf 3: Karakteristik musikal (tempo, irama, instrumen khas seperti rebana, gendang, gitar tunggal Batanghari Sembilan) dan pelestariannya sebagai Warisan Budaya Takbenda.
     * Di bagian bulletPoints: Asal Daerah, Karakter Musik & Instrumen, Nilai Budaya & Pesan Moral.
   - JIKA MENANYAKAN RESEP / CARA MEMBUAT / CARA MASAK (contoh: "resep pempek", "resep pempek kapal selam", "resep pempek keriting", "resep tekwan", "cara membuat cuko pempek", "cara masak pindang patin"):
     * DILARANG HANYA MEMBERIKAN PENJELASAN SEJARATURAN KLASIFIKASI:
1. "status":"ok" — HANYA untuk entitas/topik yang BENAR-BENAR NYATA & FAKTUAL DI SUMATERA SELATAN:
   - Segala hal yang nyata ada di Sumatera Selatan: kabupaten/kota (Palembang, Prabumulih, Lahat, Pagar Alam, Muara Enim, Ogan Ilir, OKI, OKU, Banyuasin, Muba, Musi Rawas, dll.), kuliner khas (pempek, tekwan, pindang patin, laksan, maksuba, dll.), tempat wisata/landmark (Monpera, Jembatan Ampera, Benteng Kuto Besak, Danau Ranau, Gunung Dempo, Bukit Serelo, Pulau Kemaro), sejarah (Sriwijaya, Kesultanan Palembang), busana (songket), adat, seni, budaya, tokoh, alam, dan hotel di Sumsel.
   - PANDUAN PENTING NAMA DAERAH / KOTA DI SUMSEL (contoh: "Palembang", "Prabumulih", "Lahat", "Pagar Alam", dll):
     * WAJIB sajikan profil kota/kabupaten tersebut secara komprehensif (sejarah pendirian, letak geografis, semboyan, ikon daerah, kekayaan budaya, dan perannya di Sumsel)!
     * DILARANG KERAS membelokkan pertanyaan tentang Kota Palembang menjadi hanya resep pempek! Pempek hanya boleh disebut sebagai salah satu ikon kuliner dalam profil kota!
     * DILARANG KERAS membelokkan pertanyaan tentang Kabupaten Lahat menjadi hanya bahasa lematang! Jelaskan Bukit Serelo, peradaban megalitikum Pasemah, Sungai Lematang, dan sejarah Lahat!
     * DILARANG KERAS mengembalikan status no_result untuk kota/kabupaten nyata di Sumsel seperti Prabumulih! Prabumulih adalah kota otonom, sentra nanas, dan lumbung migas penting di Sumsel!
2. "status":"outside_sumsel" — WAJIB untuk entitas/tempat/landmark/tradisi NYATA di Indonesia yang berlokasi DI LUAR SUMATERA SELATAN:
   - Contoh: "Bundaran HI", "Monas", "Candi Borobudur", "Candi Prambanan", "Tari Kecak Bali", "Gedung Sate Bandung", "Danau Toba", "Angklung Sunda", "Batik Solo", kota lain (Jakarta, Bandung, Surabaya, Yogyakarta, dll.).
   - DILARANG KERAS mengembalikan status "no_result" untuk landmark/tempat nyata di Indonesia seperti Bundaran HI! Bundaran HI adalah landmark nyata dan sangat terkenal di Jakarta!
   - JAWABLAH SECARA LENGKAP, AKURAT, DAN INFORMATIF tentang sejarah dan fakta subjek tersebut!
   - Pada field "note": Berikan kalimat peringatan ramah: "Topik ini berada di luar wilayah Sumatera Selatan, namun SORA tetap menyajikan ringkasannya untuk menambah wawasan Nusantara Anda."
3. "status":"no_result" — HANYA dan WAJIB untuk:
   - Entitas/subjek/nama tempat yang BENAR-BENAR FIKTIF, TIDAK NYATA, KHAYALAN, atau TIDAK PERNAH ADA di dunia nyata (contoh konkret: "jembatan musi 100" -> WAJIB no_result karena jembatan ini fiktif; "candi borobudur di palembang" -> WAJIB no_result; "pantai salju musi" -> WAJIB no_result).
   - DILARANG MENGARANG atau MENGGANTI ke entitas lain jika subjek yang ditanyakan fiktif (DILARANG KERAS mengganti "jembatan musi 100" menjadi "jembatan musi 6"!).
   - Spam acak (contoh: "asdfghjkl"), kata tanpa arti, judi online, obat terlarang, konten dewasa, atau ujaran kebencian.

PENTING:
- Sertakan 2-3 sumber referensi NYATA dengan URL valid (Wikipedia, portal resmi pemda, indonesia.travel, situs berita kredibel kompas.com, detik.com).
- Berikan "imageSearchQuery": kata kunci spesifik terbaik untuk mencari foto asli (contoh: "Bundaran Hotel Indonesia Jakarta", "Kota Palembang Jembatan Ampera", "Kota Prabumulih", "Kabupaten Lahat Bukit Serelo").

Output HANYA JSON valid (tanpa backtick, tanpa kata pengantar):
{
  "status": "ok" | "outside_sumsel" | "no_result",
  "note": "catatan pengantar jika ada, atau string kosong",
  "title": "Judul lengkap yang representatif (kosong jika no_result)",
  "imageSearchQuery": "Kata kunci pencarian foto spesifik",
  "titleWikipediaId": "Judul halaman Wikipedia Bahasa Indonesia",
  "titleWikipediaEn": "Wikipedia page title in English",
  "subtitle": "Satu kalimat ringkasan yang langsung menjawab pertanyaan",
  "highlight": "Jawaban langsung atau pembuka yang langsung menjawab inti pertanyaan",
  "paragraphs": [
    "Paragraf/Bait 1",
    "Paragraf/Bait 2",
    "Paragraf/Bait 3"
  ],
  "bulletPoints": [
    {"label": "Label 1", "text": "Detail 1"},
    {"label": "Label 2", "text": "Detail 2"}
  ],
  "sources": [
    {
      "title": "Nama Sumber 1",
      "url": "https://...",
      "domain": "id.wikipedia.org",
      "excerpt": "Kutipan atau ringkasan informasi"
    }
  ],
  "matchedThemeSlug": "sejarah | rumah-adat | kain-pakaian | bahasa-aksara | tari-musik | kuliner | pertunjukan-lisan | upacara-adat | null"
}
`;

  try {
    // Priority order: valid Gemini API model IDs (free-tier available)
    const models = [
      "gemini-2.0-flash",
      "gemini-2.0-flash-lite",
      "gemini-1.5-flash",
      "gemini-2.5-flash",
      "gemini-flash-lite-latest",
    ];
    let jsonText = "";

    geminiDebugLogs = [];
    for (const model of models) {
      try {
        geminiDebugLogs.push(`Trying ${model} (key: ${apiKey.slice(0, 6)}...${apiKey.slice(-4)})`);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 12000);

        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            signal: controller.signal,
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: 0.25,
                maxOutputTokens: 4000,
              },
            }),
          }
        );
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          jsonText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
          geminiDebugLogs.push(`Model ${model} OK! (len: ${jsonText.length})`);
          if (jsonText) break;
        } else {
          const errBody = await res.text().catch(() => "");
          geminiDebugLogs.push(`Model ${model} HTTP ${res.status}: ${errBody.slice(0, 100)}`);
        }
      } catch (err: any) {
        geminiDebugLogs.push(`Model ${model} Exception: ${err?.message || err}`);
      }
    }

    if (!jsonText) return null;

    // Strip markdown wrappers if any
    const cleaned = jsonText
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```\s*$/i, "")
      .trim();

    let parsed: any;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      // Robust JSON recovery for truncated responses
      try {
        const jsonMatch = cleaned.match(/\{[\s\S]*/);
        if (jsonMatch) {
          let candidate = jsonMatch[0];
          // Strip unclosed string at end
          const quoteCount = (candidate.match(/(?<!\\)"/g) || []).length;
          if (quoteCount % 2 !== 0) {
            candidate += '"';
          }
          candidate = candidate.replace(/,\s*([}\]])/g, "$1").replace(/,\s*$/, "");
          const openBrackets = (candidate.match(/\[/g) || []).length;
          const closeBrackets = (candidate.match(/\]/g) || []).length;
          for (let i = 0; i < openBrackets - closeBrackets; i++) candidate += "]";
          const openBraces = (candidate.match(/\{/g) || []).length;
          const closeBraces = (candidate.match(/\}/g) || []).length;
          for (let i = 0; i < openBraces - closeBraces; i++) candidate += "}";
          parsed = JSON.parse(candidate);
        }
      } catch (e2) {
        geminiDebugLogs.push(`JSON repair error: ${e2}`);
        return null;
      }
    }

    if (!parsed) return null;

    if (parsed.status === "no_result") {
      return {
        status: "no_result",
        query,
        card1: { isDedicatedTour: false, title: "", subtitle: "", image: "", href: "" },
        card2: { title: "", highlight: "", paragraphs: [], sources: [] },
        card3: { themeSlug: "", themeTitle: "", themeLabel: "", themeDesc: "", themeImg: "", themeHref: "", relatedItems: [] },
      };
    }

    // ── Build sources with real URLs ──────────────────────────────────────
    const geminiSources: SearchSource[] = (parsed.sources || []).map((s: any, i: number) => ({
      title: s.title || `Sumber ${i + 1}`,
      url: s.url || `https://id.wikipedia.org/wiki/${encodeURIComponent(parsed.titleWikipediaId || parsed.title || query)}`,
      domain: s.domain || (s.url ? new URL(s.url).hostname : "id.wikipedia.org"),
      excerpt: s.excerpt || "",
      icon: ["W", "🏛", "📚"][i] || "🔗",
      iconStyle: [
        "bg-white text-slate-900",
        "bg-[#6b1d2f] text-white",
        "bg-amber-700 text-white",
      ][i] || "bg-slate-700 text-white",
      img: "",
    }));

    // Fallback sources if Gemini didn't provide them
    const sources: SearchSource[] =
      geminiSources.length > 0
        ? geminiSources
        : [
            {
              title: `${parsed.title || query} — Wikipedia`,
              url: `https://id.wikipedia.org/wiki/${encodeURIComponent(parsed.titleWikipediaId || parsed.title || query)}`,
              domain: "id.wikipedia.org",
              excerpt: "Ensiklopedia bebas berbahasa Indonesia.",
              icon: "W",
              iconStyle: "bg-white text-slate-900",
              img: "",
            },
          ];

    // ── Theme & Card3 — only populate when matchedThemeSlug is valid ──────
    const rawSlug = parsed.matchedThemeSlug;
    const validSlugs = [
      "rumah-adat", "kain-pakaian", "bahasa-aksara", "tari-musik",
      "kuliner", "pertunjukan-lisan", "upacara-adat", "sejarah",
    ];
    const isValidTheme = rawSlug && rawSlug !== "null" && validSlugs.includes(rawSlug);
    const selectedTheme = isValidTheme
      ? themes.find((t) => t.slug === rawSlug) || null
      : null;

    // Prefer local match for Card1 if it's a dedicated tour
    let card1: SearchResult["card1"] = {
      isDedicatedTour: false,
      title: parsed.title || query,
      subtitle: parsed.subtitle || "",
      image: selectedTheme?.heroImage || "",
      badge: selectedTheme?.title,
      href: selectedTheme ? `/tema/${selectedTheme.slug}` : "/jelajahi",
    };

    if (localMatch?.type === "tour") {
      card1 = {
        isDedicatedTour: true,
        tourSlug: localMatch.slug,
        title: localMatch.tour.title,
        subtitle: localMatch.tour.subtitle,
        image: localMatch.tour.heroImg,
        badge: "Tur Digital Unggulan",
        href: `/tur/${localMatch.slug}`,
      };
    } else if (localMatch?.type === "item") {
      card1 = {
        isDedicatedTour: Boolean(localMatch.item.slug),
        tourSlug: localMatch.item.slug,
        title: localMatch.item.name,
        subtitle: localMatch.item.desc,
        image: localMatch.item.image || selectedTheme?.heroImage || "",
        badge: localMatch.theme.title,
        href: localMatch.item.slug
          ? `/tur/${localMatch.item.slug}`
          : `/tema/${localMatch.theme.slug}`,
      };
    }

    // card3: empty when no valid theme matched (UI will hide it)
    const card3: SearchResult["card3"] = selectedTheme
      ? {
          themeSlug: selectedTheme.slug,
          themeTitle: selectedTheme.title,
          themeLabel: selectedTheme.tagline,
          themeDesc: selectedTheme.intro,
          themeImg: selectedTheme.heroImage,
          themeHref: `/tema/${selectedTheme.slug}`,
          relatedItems: selectedTheme.items.slice(0, 4).map((it) => ({
            name: it.name,
            desc: it.desc,
            image: it.image || selectedTheme.image,
            slug: it.slug,
            link: it.slug ? `/tur/${it.slug}` : `/tema/${selectedTheme.slug}`,
          })),
        }
      : { themeSlug: "", themeTitle: "", themeLabel: "", themeDesc: "", themeImg: "", themeHref: "", relatedItems: [] };

    return {
      status: parsed.status || "ok",
      query,
      note: parsed.note || undefined,
      card1,
      card2: {
        title: parsed.title || query,
        highlight: parsed.highlight || "",
        paragraphs: parsed.paragraphs || [],
        bulletPoints: parsed.bulletPoints || [],
        sources,
      },
      card3,
      // Pass helper metadata for route.ts to fetch real image
      _wikiTitleId: parsed.titleWikipediaId,
      _wikiTitleEn: parsed.titleWikipediaEn,
      _imageSearchQuery: parsed.imageSearchQuery,
    } as SearchResult & { _wikiTitleId?: string; _wikiTitleEn?: string; _imageSearchQuery?: string };
  } catch (e: any) {
    geminiDebugLogs.push(`Exception in generateGeminiSummary: ${e?.message || e}`);
    console.error("Gemini summary error:", e);
    return null;
  }
}

// ─── Dynamic Wikipedia Real-time Search (Faktual, Akurat, Tanpa Template Palsu) ────
export async function fetchDynamicWikipediaResult(query: string): Promise<SearchResult | null> {
  const qClean = query.trim();
  if (!qClean || qClean.length < 2) return null;

  try {
    const searchUrl = `https://id.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(qClean)}&utf8=&format=json`;
    const searchRes = await fetch(searchUrl, {
      headers: { "User-Agent": "KateknamoBot/1.0 (https://kateknamo.id; contact@kateknamo.id)" },
      signal: AbortSignal.timeout(6000),
    });
    if (!searchRes.ok) return null;
    const searchData = await searchRes.json();
    const firstHit = searchData.query?.search?.[0];
    if (!firstHit || !firstHit.title) return null;

    const summaryUrl = `https://id.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(firstHit.title)}`;
    const sumRes = await fetch(summaryUrl, {
      headers: { "User-Agent": "KateknamoBot/1.0 (https://kateknamo.id; contact@kateknamo.id)" },
      signal: AbortSignal.timeout(6000),
    });
    if (!sumRes.ok) return null;
    const sumData = await sumRes.json();
    if (!sumData.extract || sumData.extract.length < 30) return null;

    const pageTitle = sumData.title || firstHit.title;
    const extractText = sumData.extract.trim();
    const descText = sumData.description || `Wawasan seputar ${pageTitle}`;

    // Buat paragraf yang rapi dan terstruktur dari extract ensiklopedia asli
    const sentences = extractText.split(/(?<=[.!?])\s+/);
    let p1 = "";
    let p2 = "";
    if (sentences.length <= 2) {
      p1 = sentences.join(" ");
    } else {
      const mid = Math.ceil(sentences.length / 2);
      p1 = sentences.slice(0, mid).join(" ");
      p2 = sentences.slice(mid).join(" ");
    }

    const paragraphs = [p1, p2].filter(Boolean);
    const highlight = sentences.slice(0, 2).join(" ");

    const sources: SearchSource[] = [
      {
        title: `${pageTitle} — Ensiklopedia Bebas Wikipedia`,
        url: `https://id.wikipedia.org/wiki/${encodeURIComponent(pageTitle)}`,
        domain: "id.wikipedia.org",
        excerpt: extractText.length > 140 ? extractText.slice(0, 137) + "..." : extractText,
        icon: "W",
        iconStyle: "bg-white text-slate-900",
        img: sumData.thumbnail?.source || "",
      },
    ];

    const bulletPoints = [
      { label: "Topik Pembahasan", text: pageTitle },
      { label: "Karakteristik", text: descText },
      { label: "Klasifikasi", text: "Khazanah & Wawasan Pengetahuan Nusantara" },
    ];

    return {
      status: "outside_sumsel",
      query,
      note: "Topik ini berada di luar wilayah Sumatera Selatan, namun SORA tetap menyajikan ringkasannya untuk menambah wawasan Nusantara Anda.",
      card1: {
        isDedicatedTour: false,
        title: pageTitle,
        subtitle: descText,
        image: sumData.thumbnail?.source || "/images/sora_about_hero.jpg",
        badge: "Wawasan Nusantara",
        href: "/jelajahi",
      },
      card2: {
        title: pageTitle,
        highlight,
        paragraphs,
        bulletPoints,
        sources,
      },
      card3: {
        themeSlug: "",
        themeTitle: "",
        themeLabel: "",
        themeDesc: "",
        themeImg: "",
        themeHref: "",
        relatedItems: [],
      },
    };
  } catch {
    return null;
  }
}

// ─── Local fallback (used if Gemini is unreachable or key limit) ─────────────
export async function generateLocalFallback(query: string): Promise<SearchResult> {
  const qClean = query.toLowerCase().replace(/['".,?!]/g, " ").replace(/\s+/g, " ").trim();

  // 1. Cek lagu daerah Sumsel secara langsung (Zero Halusinasi)
  const matchedSong = findSumselSong(query);
  if (matchedSong) {
    const isLyric = isLyricQuery(query);
    return buildSongSearchResult(matchedSong, query, isLyric ? "lyrics" : "explanation");
  }

  // 2. Blacklist kueri terlarang (judi, konten dewasa, malware)
  if (isClearlyOffTopic(query)) {
    return {
      status: "no_result",
      query,
      card1: { isDedicatedTour: false, title: "", subtitle: "", image: "", href: "" },
      card2: { title: "", highlight: "", paragraphs: [], sources: [] },
      card3: { themeSlug: "", themeTitle: "", themeLabel: "", themeDesc: "", themeImg: "", themeHref: "", relatedItems: [] },
    };
  }

  // 3. PRIORITAS UTAMA SUMSEL: Cek apakah kueri adalah Daerah/Kota di Sumatera Selatan (17 Kab/Kota)
  const regionMatch = findSumselRegion(query);
  if (regionMatch) {
    return buildRegionSearchResult(regionMatch, query);
  }

  // 4. PRIORITAS LUAR SUMSEL: Cek apakah kueri adalah Landmark/Budaya Populer Luar Sumsel (Bundaran HI, Monas, dll.)
  const outsideMatch = findOutsideSumselEntity(query);
  if (outsideMatch) {
    return buildOutsideSumselSearchResult(outsideMatch, query);
  }

  // 5. Cek kecocokan konten lokal (Dedicated Tour, Item Tema, atau Tema Kebudayaan)
  const match = findLocalMatch(query);

  if (match?.type === "tour") {
    const tour = match.tour;
    const parentTheme =
      themes.find((t) => t.items.some((i) => i.name.toLowerCase().includes(tour.title.toLowerCase()))) ||
      themes[0];
    return {
      status: "ok",
      query,
      card1: {
        isDedicatedTour: true,
        tourSlug: match.slug,
        title: tour.title,
        subtitle: tour.subtitle,
        image: tour.heroImg,
        badge: "Tur Digital Unggulan",
        href: `/tur/${match.slug}`,
      },
      card2: {
        title: tour.title,
        highlight: tour.sec1Desc,
        paragraphs: [tour.sec2Desc, tour.sec3Desc],
        bulletPoints: [
          { label: "Pusaka Budaya", text: `${tour.title} adalah warisan takbenda kebanggaan Sumatera Selatan.` },
          { label: "Pelestarian Digital", text: "Didokumentasikan oleh SORA Arts & Culture." },
        ],
        sources: [
          {
            title: `${tour.title} — Wikipedia`,
            url: `https://id.wikipedia.org/wiki/${encodeURIComponent(tour.title)}`,
            domain: "id.wikipedia.org",
            excerpt: "Ensiklopedia bebas berbahasa Indonesia",
            icon: "W",
            iconStyle: "bg-white text-slate-900",
            img: "",
          },
        ],
      },
      card3: {
        themeSlug: parentTheme.slug,
        themeTitle: parentTheme.title,
        themeLabel: parentTheme.tagline,
        themeDesc: parentTheme.intro,
        themeImg: parentTheme.heroImage,
        themeHref: `/tema/${parentTheme.slug}`,
        relatedItems: parentTheme.items.slice(0, 4).map((it) => ({
          name: it.name,
          desc: it.desc,
          image: it.image || parentTheme.image,
          slug: it.slug,
          link: it.slug ? `/tur/${it.slug}` : `/tema/${parentTheme.slug}`,
        })),
      },
    };
  }

  if (match?.type === "item") {
    const { item, theme } = match;
    return {
      status: "ok",
      query,
      card1: {
        isDedicatedTour: Boolean(item.slug),
        tourSlug: item.slug,
        title: item.name,
        subtitle: item.desc,
        image: item.image || theme.heroImage,
        badge: theme.title,
        href: item.slug ? `/tur/${item.slug}` : `/tema/${theme.slug}`,
      },
      card2: {
        title: item.name,
        highlight: `${item.name} adalah bagian dari kekayaan tradisi ${theme.title.toLowerCase()} Sumatera Selatan.`,
        paragraphs: [
          `${item.desc}. Warisan ini telah diturunkan dari generasi ke generasi.`,
          `Melalui SORA Arts & Culture, ${item.name} didokumentasikan untuk apresiasi publik luas.`,
        ],
        bulletPoints: [
          { label: "Kategori", text: theme.title },
          { label: "Wilayah", text: "Sumatera Selatan" },
        ],
        sources: [
          {
            title: `${item.name} — Wikipedia`,
            url: `https://id.wikipedia.org/wiki/${encodeURIComponent(item.name)}`,
            domain: "id.wikipedia.org",
            excerpt: "Ensiklopedia bebas berbahasa Indonesia",
            icon: "W",
            iconStyle: "bg-white text-slate-900",
            img: "",
          },
        ],
      },
      card3: {
        themeSlug: theme.slug,
        themeTitle: theme.title,
        themeLabel: theme.tagline,
        themeDesc: theme.intro,
        themeImg: theme.heroImage,
        themeHref: `/tema/${theme.slug}`,
        relatedItems: theme.items.slice(0, 4).map((it) => ({
          name: it.name,
          desc: it.desc,
          image: it.image || theme.image,
          slug: it.slug,
          link: it.slug ? `/tur/${it.slug}` : `/tema/${theme.slug}`,
        })),
      },
    };
  }

  if (match?.type === "theme") {
    const { theme } = match;
    return {
      status: "ok",
      query,
      card1: {
        isDedicatedTour: false,
        title: theme.title,
        subtitle: theme.tagline,
        image: theme.heroImage,
        badge: theme.title,
        href: `/tema/${theme.slug}`,
      },
      card2: {
        title: theme.title,
        highlight: theme.intro,
        paragraphs: [
          `${theme.title} merupakan salah satu pilar peradaban penting di Sumatera Selatan yang mencerminkan kearifan lokal luhur.`,
          `SORA Arts & Culture merawat dokumentasi digital ${theme.title} agar tetap lestari dan dapat dipelajari oleh generasi mendatang.`,
        ],
        bulletPoints: theme.items.slice(0, 3).map((it) => ({
          label: it.name,
          text: it.desc,
        })),
        sources: [
          {
            title: `${theme.title} — Kebudayaan Sumatera Selatan`,
            url: `https://id.wikipedia.org/wiki/${encodeURIComponent(theme.title)}`,
            domain: "id.wikipedia.org",
            excerpt: "Dokumentasi seni dan kebudayaan daerah.",
            icon: "🏛",
            iconStyle: "bg-[#6b1d2f] text-white",
            img: "",
          },
        ],
      },
      card3: {
        themeSlug: theme.slug,
        themeTitle: theme.title,
        themeLabel: theme.tagline,
        themeDesc: theme.intro,
        themeImg: theme.heroImage,
        themeHref: `/tema/${theme.slug}`,
        relatedItems: theme.items.slice(0, 4).map((it) => ({
          name: it.name,
          desc: it.desc,
          image: it.image || theme.image,
          slug: it.slug,
          link: it.slug ? `/tur/${it.slug}` : `/tema/${theme.slug}`,
        })),
      },
    };
  }

  // 6. Coba cari ensiklopedia faktual real-time (Wikipedia) untuk daerah lain di Indonesia / wawasan Nusantara
  const wikiResult = await fetchDynamicWikipediaResult(query);
  if (wikiResult) {
    return wikiResult;
  }

  // 7. General broad inquiries about South Sumatra
  const isBroadGeneralQuery = [
    "sumsel",
    "sumatera selatan",
    "provinsi sumatera selatan",
    "kebudayaan sumsel",
    "budaya sumsel",
    "wisata sumsel",
    "tentang sumsel",
  ].some((kw) => qClean === kw || qClean.startsWith("tentang " + kw));

  if (isBroadGeneralQuery) {
    const defaultTheme = themes[0];
    return {
      status: "ok",
      query,
      card1: {
        isDedicatedTour: false,
        title: `Eksplorasi: ${query}`,
        subtitle: "Kekayaan warisan budaya dan peradaban Sumatera Selatan",
        image: defaultTheme.heroImage,
        badge: "Sumatera Selatan",
        href: "/jelajahi",
      },
      card2: {
        title: query,
        highlight: `Topik "${query}" berkaitan erat dengan kekayaan peradaban, pariwisata, dan kebudayaan Sumatera Selatan.`,
        paragraphs: [
          "Sumatera Selatan menyimpan warisan luhur mulai dari kejayaan kemaritiman Sriwijaya, mahakarya arsitektur Rumah Limas, adibusana Songket Lepus, hingga kekayaan kuliner khas berbasis hasil bumi dan perairan Sungai Musi.",
          "Anda dapat menjelajahi berbagai tema kebudayaan terpilih di bawah ini atau menanyakan topik spesifik lainnya kepada SORA AI.",
        ],
        bulletPoints: [
          { label: "Pusat Peradaban", text: "Ibu kota Palembang dan 16 kabupaten/kota di Sumatera Selatan." },
          { label: "Identitas Budaya", text: "Perpaduan luhur tradisi Melayu Bahari, Sriwijaya, dan Kesultanan Palembang Darussalam." },
        ],
        sources: [
          {
            title: "Sumatera Selatan — Ensiklopedia Bebas Wikipedia",
            url: "https://id.wikipedia.org/wiki/Sumatera_Selatan",
            domain: "id.wikipedia.org",
            excerpt: "Provinsi di Indonesia yang terletak di bagian selatan Pulau Sumatera.",
            icon: "W",
            iconStyle: "bg-white text-slate-900",
            img: "",
          },
        ],
      },
      card3: {
        themeSlug: defaultTheme.slug,
        themeTitle: defaultTheme.title,
        themeLabel: defaultTheme.tagline,
        themeDesc: defaultTheme.intro,
        themeImg: defaultTheme.heroImage,
        themeHref: `/tema/${defaultTheme.slug}`,
        relatedItems: defaultTheme.items.slice(0, 4).map((it) => ({
          name: it.name,
          desc: it.desc,
          image: it.image || defaultTheme.image,
          slug: it.slug,
          link: it.slug ? `/tur/${it.slug}` : `/tema/${defaultTheme.slug}`,
        })),
      },
    };
  }

  // 8. Fictitious or unfindable item -> return no_result
  return {
    status: "no_result",
    query,
    card1: { isDedicatedTour: false, title: "", subtitle: "", image: "", href: "" },
    card2: { title: "", highlight: "", paragraphs: [], sources: [] },
    card3: { themeSlug: "", themeTitle: "", themeLabel: "", themeDesc: "", themeImg: "", themeHref: "", relatedItems: [] },
  };
}

