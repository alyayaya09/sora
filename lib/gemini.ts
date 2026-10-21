import { themes, dedicatedTours, Theme, ThemeItem, DedicatedTour } from "../data/sora-content";
import { sumselSongs, findSumselSong, SumselSong } from "../data/sumsel-songs";
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

// ─── Local match helper ─────────────────────────────────────────────────────
export function findLocalMatch(query: string) {
  const q = query.toLowerCase().trim();

  // 1. Dedicated tours
  for (const [slug, tour] of Object.entries(dedicatedTours)) {
    const titleMatch = tour.title.toLowerCase().includes(q) || q.includes(tour.title.toLowerCase());
    const idMatch = slug.includes(q) || q.includes(slug);
    if (titleMatch || idMatch) {
      return { type: "tour" as const, tour, slug };
    }
  }

  // 2. Specific items inside themes
  for (const theme of themes) {
    for (const item of theme.items) {
      const nameMatch = item.name.toLowerCase().includes(q) || q.includes(item.name.toLowerCase());
      const descMatch = item.desc.toLowerCase().includes(q);
      if (nameMatch || descMatch) {
        return { type: "item" as const, item, theme };
      }
    }
  }

  // 3. Exact theme title / tagline matches
  for (const theme of themes) {
    if (theme.title.toLowerCase().includes(q) || theme.tagline.toLowerCase().includes(q)) {
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
export function buildSongSearchResult(song: SumselSong, query: string): SearchResult {
  const theme = themes.find((t) => t.slug === song.themeSlug) || themes[2]; // fallback to tari-musik
  return {
    status: "ok",
    query,
    card1: {
      isDedicatedTour: false,
      title: song.title,
      subtitle: `Lagu Daerah ${song.region} — Warisan Budaya Takbenda`,
      image: song.image,
      badge: "Lagu Daerah Sumsel",
      href: `/tema/${song.themeSlug}`,
    },
    card2: {
      title: `Lirik Lagu ${song.title}`,
      highlight: song.highlight,
      paragraphs: song.lyrics,
      bulletPoints: [
        { label: "Asal Daerah", text: song.region },
        { label: "Pencipta", text: song.creator || "Tradisional" },
        { label: "Makna Filosofis", text: song.meaning },
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
  if (externalImage && isValidImageUrl(externalImage)) {
    return externalImage;
  }

  const q = `${query} ${title || ""}`.toLowerCase();

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
    if (q.includes("pasemah") || q.includes("kebagh")) return "/images/tari_pasemah.jpg";
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
  if (q.includes("purun") || q.includes("anyaman")) return "/images/purun_pedamaran.jpg";

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

  // 2. Jika di referensi tidak ada foto, cari di sumber lain (Wikipedia ID/EN + Commons)
  const directImg = await fetchWikipediaImage(titleId, titleEn, searchQuery || query);
  if (directImg) return directImg;

  // 3. Coba cari di Wikimedia Commons dengan kata kunci regional spesifik
  const qTopic = searchQuery || query || titleId;
  if (qTopic) {
    try {
      const res = await fetch(
        `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(qTopic + " Palembang")}&gsrnamespace=6&gsrlimit=6&prop=imageinfo&iiprop=url|mime&iiurlwidth=800&format=json&origin=*`,
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
  titleId: string,
  titleEn?: string,
  searchQuery?: string
): Promise<string | null> {
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

  // Phase 1: Fast direct REST summaries
  const restLookups: Promise<string | null>[] = [
    tryRest("id", titleId),
  ];
  if (searchQuery) restLookups.push(tryRest("id", searchQuery));
  if (titleEn) restLookups.push(tryRest("en", titleEn));

  const restResults = await Promise.all(restLookups);
  for (const img of restResults) {
    if (img) return img;
  }

  // Phase 2: Search-based queries across Wikipedia & Commons
  const qMain = searchQuery || titleId;
  const qRegional = `${qMain} Palembang`;
  const [s1, s2, s3, s4] = await Promise.all([
    trySearch("id", qMain),
    trySearch("id", qRegional),
    tryCommons(qMain),
    tryCommons(qRegional),
  ]);

  return s1 || s2 || s3 || s4 || null;
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
  "Palembang Darussalam...\\nPalembang kota kito\\nTekenal sungi Musinyo...\\nTekenal dengan pempeknyo\\nJembatan Ampera yang anggun\\nMasjid Agungnyo yang cindo\\nMenambah tekenalnyo\\nKota kesayangan kito\\n\\nPalembang Darussalam...\\nPalembang kota kito\\nTekenal rumah limasnyo\\nTekenal dengan songketnyo\\nPulou Kemaro yang tenang\\nBenteng Kuto Besak yang cindo\\nMenambah semaraknyo\\nKota kebanggaan kito\\n\\nBujang gadesnyo... Oi... belagak nian\\nAdat budayonyo tetep dijago\\nHasil buminyo... Oi... banyak nian\\nPembangunannyo rato dimano-mano\\n\\nOi... Palembang Darussalam\\nOi... Palembang Darussalam\\nPalembang kota kito\\nPalembang Darussalam"
- Pempek Lenjer (Cipt. S. Tarno):
  "Bulet besak panjang mak lengen\\nKejel-kejel rasonyo marem\\nMasuk ke mulut matonyo mejem\\nMertuo lewat masih ditelen\\n\\nKejel keras sudah biaso\\nAsak bae iwaknyo teraso\\nDigoreng pake minyak kelapo\\nJadi nambah lemak rasonyo\\n\\nReff:\\nPempek lenjer oy pempek lenjer\\nSiapo nyingok pastilah ngiler\\nPempek lenjer oy pempek lenjer\\nMakan sikok pacak kelenger\\n\\nMangcek bicek janganlah lupo\\nNgawak balek oleh-olehnyo\\nPempek lenjer samo cukonyo\\nKito makan bersamo-samo"
- Kebile-bile / Kabile-bile (Besemah - Lahat & Pagaralam):
  "Kabile-bile mangke ku lege\\nKabile-bile ku ade kance\\nKabile-bile mangke ku lege\\nKabile-bile ku ade kance\\n\\nKabile nian jagunglah putih\\nPutih dik putih kukendam kina\\nKebile nian ibung kah nulih\\nNulih dik nulih kudendam kina\\n\\nKabile nian mampat begune\\nMangke dik payah ku nandan lagi\\nKebile nian sifat begune\\nMangke dik payah ku midang lagi\\n\\nOh, malang nian nasib ‘mbak ini\\nBilangan jeme lah laut gale\\nAlahkah sedih ai tumbak ini\\nAku ‘mbak ini dide bekance"
- Ya Saman (Cipt. Kamsul A. Harla):
  "Nyelek gelumbang perahu bidar di Sungi Musi\\nJanganlah lupo meli telok abang\\nCantik rupo penyabar dan baek hati\\nAdek manis berambut panjang dikuncit kepang\\n\\nLika-liku banyu Batanghari Sembilan\\nMengalir bemuaro ke Sungi Musi jugo\\nElok laku ngaesi rupo cindo menawan\\nMuat kakak siang tekenang malem tejago\\n\\nPulo Kemaro melah Sungi Musi ke Sungsang\\nNak ke Pusri laju kesasar ke Kalidoni\\nBadan saro pikiran resah hati teguncang\\nNgarapke adek kalu be galak jadi bini\\n\\nAy... ya... ya... ya... Ya Saman\\nPecaknyo mudah tapi saro nian\\nAy... ya... ya... ya... Ya Saman\\nNyari bini yang bener-bener setolok an\\n\\nAy... ya... ya... ya... Ya Saman\\nPecaknyo mudah tapi saro nian\\nAy... ya... ya... ya... Ya Saman\\nYa Saman... Ya Saman... Ya Saman..."
- Cuk Mak Ilang (Palembang):
  Refrein: "Cuk mak ilang mak ilang cagak batu\\nDimane kucing belang di situ rumah aku"
  Bait: "Kapal api maso' Palembang\\nBanyu tenang jadi begelombang\\nTengok adek bepayong kembang\\nHati di dalam jadi bimbang"
  Refrein: "Cuk mak ilang mak ilang cagak batu\\nDimane kucing belang di situ rumah aku"
  Bait: "Ngaso dulu di bawah pohon\\nAngin sepoi sepoi nyentuh badan\\nAdek manis janganlah mohon\\nKando setia sepanjang zaman"
- Dek Sangke (Sumsel):
  "Dek sangke aku dek sangke\\nAwak uke la jadi duwo\\nNemba' bunga putik kelapo\\nBuah jambu la jadi mudo\\nDek sangke aku dek sangke\\nKando batinggal ku de sangke..."
- Gending Sriwijaya (Palembang):
  "Di kala ku merindukan keluhuran dahulu kala\\nKutembangkan nyanyi lagu Gending Sriwijaya\\nDalam seni kunikmati lagi zaman bahagia\\nKuciptakan kembali dari kandungan Maha Kala\\nSriwijaya dengan Asrama Agung Sang Maha Guru..."

PANDUAN UTAMA PENJAWABAN (WAJIB TEPAT PADA INTI PERTANYAAN):
1. JAWABLAH SECARA LANGSUNG, TEPAT, DAN LENGKAP SESUAI DENGAN INTENSI PERTANYAAN:
   - JIKA MENANYAKAN TENTANG LAGU DAERAH ATAU LIRIK LAGU (contoh: "lagu cuk mak ilang", "lagu pempek lenjer", "lirik ya saman", "cuk mak ilang", dll):
     * JANGAN PERNAH mengalihkan atau menjawab tentang makanan/objek fisik (contoh: jika ditanya "lagu pempek lenjer", ini adalah LAGU DAERAH ciptaan S. Tarno, BUKAN resep atau makanan pempek lenjer!).
     * Pada "title": Berikan judul lagu daerah yang jelas (contoh: "Lagu Daerah Palembang: Pempek Lenjer", "Lagu Daerah Sumsel: Cuk Mak Ilang").
     * Pada "badge": "Lagu & Musik Tradisional".
     * Pada "highlight": Berikan pengantar 1-2 kalimat tentang lagu tersebut (asal daerah, pencipta, nuansa lagu, dan tema lagunya).
     * Pada "paragraphs":
       - Uraikan latar belakang lagu, makna budaya, dan konteks sosialnya.
       - TULISKAN SELURUH TEKS LIRIK LAGU SECARA LENGKAP BAIT DEMI BAIT (dengan baris-baris lirik rapi menggunakan \\n)! Gunakan teks kanonikal resmi di atas.
     * Di bagian bulletPoints, cantumkan Pencipta, Asal Daerah, dan Makna Singkat.
   - JIKA MENANYAKAN RESEP / CARA MEMBUAT / CARA MASAK (contoh: "resep pempek", "resep pempek kapal selam", "resep pempek keriting", "resep tekwan", "cara membuat cuko pempek", "cara masak pindang patin"):
     * DILARANG HANYA MEMBERIKAN PENJELASAN SEJARAH! Pengguna meminta RESEP DAN PANDUAN CARA MEMASAK!
     * Pada "title": "Resep & Cara Membuat [Nama Masakan]" (contoh: "Resep Pempek Kapal Selam Asli Palembang", "Resep Pempek Keriting Gurih").
     * Pada "badge": "Resep Kuliner Tradisional".
     * Pada "highlight": Ringkasan hidangan dan rahasia kelezatan/tips suksesnya (contoh: takaran perbandingan ikan dan tepung sagu, atau cara memasukkan telur tanpa bocor).
     * Pada "paragraphs":
       - Paragraf 1: Daftar bahan utama dan bumbu lengkap beserta takaran/ukurannya yang presisi.
       - Paragraf 2 & 3: Langkah-langkah pembuatan step-by-step secara terurut mulai dari mengadon, membentuk, merebus/menggoreng, hingga membuat kuah cuko pendampingnya.
   - JIKA MENANYAKAN SEJARAH / MAKNA / ASAL-USUL / PENJELASAN UMUM:
     * Sajikan sejarah kronologis, filosofi mendalam, dan fakta autentik.
   - JIKA MENANYAKAN LOKASI / RUTE / TIKET / WISATA:
     * Berikan informasi lokasi geografis, alamat, jam operasional, harga tiket, dan rute perjalanan.
   - JIKA MENANYAKAN CIRI KHAS / DAFTAR / PERBEDAAN:
     * Uraikan poin-poin karakteristik spesifiknya secara berbobot.

ATURAN KLASIFIKASI:
1. "status":"ok" — HANYA untuk entitas/topik yang BENAR-BENAR NYATA & FAKTUAL:
   - Segala hal yang nyata ada di Sumatera Selatan: kuliner khas (pempek, tekwan, pindang patin, laksan, maksuba, dll.), tempat wisata/landmark (Monpera, Jembatan Ampera, Jembatan Musi II/IV/VI, Benteng Kuto Besak, Danau Ranau, Gunung Dempo Pagaralam, Pulau Kemaro), sejarah (Sriwijaya, Kesultanan Palembang), busana (songket), adat, seni, budaya, tokoh, alam, kota, hotel, atau rekomendasi umum wisata/kuliner nyata di Sumsel.
   - Pertanyaan umum edukatif yang faktual (sains, geografi, sejarah dunia, teknologi, pengetahuan umum, bahasa, dll.).
   - Pertanyaan tentang Indonesia di luar Sumsel (jawab secara informatif).
2. "status":"outside_sumsel" — HANYA jika pengguna menanyakan tradisi/seni khas spesifik dari luar Sumsel (contoh: "tari kecak bali", "angklung sunda", "batik solo"). Berikan jawaban dan sertakan catatan ("note") menghubungkan kembali ke warisan Sumsel.
3. "status":"no_result" — WAJIB untuk:
   - Entitas/subjek/nama tempat yang FIKTIF, TIDAK NYATA, atau TIDAK PERNAH ADA di dunia nyata (contoh konkret: "jembatan musi 100" -> WAJIB no_result karena jembatan ini tidak ada; "candi borobudur di palembang" -> WAJIB no_result; "pantai salju musi" -> WAJIB no_result).
   - DILARANG MENGARANG atau MENGGANTI ke entitas lain yang mirip jika subjek yang ditanyakan tidak ada (DILARANG KERAS mengganti "jembatan musi 100" menjadi "jembatan musi 6"!). Jika subjek spesifik tersebut fiktif/tidak ada, WAJIB jawab "no_result".
   - Spam acak (contoh: "asdfghjkl"), kata tanpa arti, judi online, obat terlarang, konten dewasa, atau ujaran kebencian.

PENTING:
- Sertakan 2-3 sumber referensi NYATA dengan URL valid (Wikipedia, portal resmi pemprov sumselprov.go.id, indonesia.travel, situs berita kredibel kompas.com, detik.com).
- Berikan "imageSearchQuery": kata kunci spesifik terbaik untuk mencari foto asli (contoh: "Pempek Palembang", "Lagu Cuk Mak Ilang Palembang", "Songket Palembang", "Jembatan Ampera").

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
      "gemini-flash-lite-latest",
      "gemini-3.5-flash-lite",
      "gemini-3.1-flash-lite",
      "gemini-3.8-flash",
      "gemini-3.5-flash",
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

// ─── Local fallback (used if Gemini is unreachable) ─────────────────────────
export function generateLocalFallback(query: string): SearchResult {
  // Cek lagu daerah Sumsel secara langsung
  const matchedSong = findSumselSong(query);
  if (matchedSong) {
    return buildSongSearchResult(matchedSong, query);
  }

  if (isClearlyOffTopic(query)) {
    return {
      status: "no_result",
      query,
      card1: { isDedicatedTour: false, title: "", subtitle: "", image: "", href: "" },
      card2: { title: "", highlight: "", paragraphs: [], sources: [] },
      card3: { themeSlug: "", themeTitle: "", themeLabel: "", themeDesc: "", themeImg: "", themeHref: "", relatedItems: [] },
    };
  }

  // Try to find a local match
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

  // General fallback ONLY for broad general inquiries about South Sumatra
  const qClean = query.toLowerCase().trim();
  const isBroadGeneralQuery = [
    "sumsel",
    "sumatera selatan",
    "provinsi sumatera selatan",
    "palembang",
    "kota palembang",
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

  // Fictitious or unfindable item -> return no_result
  return {
    status: "no_result",
    query,
    card1: { isDedicatedTour: false, title: "", subtitle: "", image: "", href: "" },
    card2: { title: "", highlight: "", paragraphs: [], sources: [] },
    card3: { themeSlug: "", themeTitle: "", themeLabel: "", themeDesc: "", themeImg: "", themeHref: "", relatedItems: [] },
  };
}

