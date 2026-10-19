"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

// ─── Orb / Ambient Background ───
function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden scale-110" id="dynamicBgWrapper">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#140e13] via-[#0d0d0f] to-[#1c1410] opacity-90" />
      <div className="absolute -top-[10%] -left-[10%] w-[68vw] h-[68vw] max-w-[980px] max-h-[980px] rounded-full bg-gradient-to-br from-[#9f1239]/60 via-[#6b1d2f]/50 to-transparent blur-[105px] animate-orb-1 will-change-transform" />
      <div className="absolute top-[12%] -right-[10%] w-[64vw] h-[64vw] max-w-[920px] max-h-[920px] rounded-full bg-gradient-to-bl from-[#f59e0b]/55 via-[#d4af37]/45 to-transparent blur-[115px] animate-orb-2 will-change-transform" />
      <div className="absolute top-[38%] -left-[8%] w-[58vw] h-[58vw] max-w-[850px] max-h-[850px] rounded-full bg-gradient-to-r from-[#6b1d2f]/55 via-[#881337]/45 to-transparent blur-[100px] animate-orb-3 will-change-transform" />
      <div className="absolute -bottom-[12%] right-[5%] w-[62vw] h-[62vw] max-w-[900px] max-h-[900px] rounded-full bg-gradient-to-tl from-[#af8d11]/55 via-[#d4af37]/45 to-transparent blur-[110px] animate-orb-4 will-change-transform" />
      <div className="absolute top-[52%] left-[28%] w-[48vw] h-[48vw] max-w-[720px] max-h-[720px] rounded-full bg-gradient-to-tr from-[#d4af37]/35 via-[#9f1239]/40 to-transparent blur-[100px] animate-orb-5 will-change-transform" />
      <div className="absolute top-[25%] left-[20%] w-2.5 h-2.5 rounded-full bg-[#fde047] blur-[1px] shadow-[0_0_12px_#fde047] animate-ember-1" />
      <div className="absolute top-[60%] right-[25%] w-3 h-3 rounded-full bg-[#f59e0b] blur-[1px] shadow-[0_0_15px_#f59e0b] animate-ember-2" />
      <div className="absolute top-[75%] left-[40%] w-2 h-2 rounded-full bg-[#ffb2bc] blur-[1px] shadow-[0_0_10px_#ffb2bc] animate-ember-1" style={{ animationDelay: "4s" }} />
      <div className="absolute top-[40%] right-[38%] w-2.5 h-2.5 rounded-full bg-[#e9c176] blur-[1px] shadow-[0_0_12px_#e9c176] animate-ember-2" style={{ animationDelay: "5s" }} />
    </div>
  );
}


const SUGGESTIONS = [
  "Filosofi dan Sejarah Songket Lepus Emas Palembang",
  "Tari Gending Sriwijaya dan makna sekapur sirih",
  "Rumah Limas arsitektur panggung tepi Sungai Musi",
  "Pempek Palembang asal usul dan tradisi kuliner",
  "Aksara Ulu sistem tulis kuno Sumatera Selatan",
  "Festival Perahu Bidar Sungai Musi",
  "Aesan Gede busana adat pengantin Palembang",
];



const SOURCE_ARTICLES = [
  {
    icon: "W",
    iconStyle: "bg-white text-slate-900",
    domain: "id.wikipedia.org",
    title: "Songket Palembang — Ensiklopedia Warisan Tenun Emas",
    excerpt: "Ragam Lepus Bintang dikenal sebagai kasta tertinggi dalam busana kebesaran bangsawan Kesultanan Palembang...",
    img: "/images/songket_lepus.jpg",
  },
  {
    icon: "🏛",
    iconStyle: "bg-[#6b1d2f] text-white",
    domain: "kemdikbud.go.id • Warisan Budaya",
    title: "Fakta Sejarah Kain Songket: Epos Kemegahan Maritim",
    excerpt: "Teknik pengerjaan benang emas jantung murni dan makna filosofi kemakmuran pesisir Nusantara tempo dulu...",
    img: "/images/songket_lepus.jpg",
  },
];

// ─── Related Theme Filter — shows matching theme chips from 8 home categories ───
const THEME_FILTERS = [
  {
    slug: "rumah-adat",
    label: "Arsitektur Tradisional",
    title: "Rumah Adat Sumatera Selatan",
    desc: "Jelajahi Rumah Limas berundak, Rumah Rakit terapung di tepian Musi, dan Ghumah Baghi Pasemah yang tahan gempa.",
    href: "/tema/rumah-adat",
    img: "/images/rumah_limas.jpg",
    keywords: ["rumah", "limas", "rakit", "panggung", "arsitektur", "ulu", "ghumah", "baghi", "pasemah", "kilapan"],
  },
  {
    slug: "kain-pakaian",
    label: "Busana Adat & Kain Tenun",
    title: "Kemegahan Busana Adat Palembang",
    desc: "Telusuri mahakarya busana Aesan Gede, Songket Lepus berbenang emas, Jumputan Pelangi, dan warisan kebesaran Kesultanan Palembang Darussalam.",
    href: "/tema/kain-pakaian",
    img: "/images/songket_lepus.jpg",
    keywords: ["songket", "lepus", "aesan", "gede", "paksangko", "kain", "pakaian", "busana", "jumputan", "batik", "tenun", "benang", "emas"],
  },
  {
    slug: "bahasa-aksara",
    label: "Bahasa & Aksara Kuno",
    title: "Bahasa & Aksara Daerah Sumsel",
    desc: "Satu provinsi, banyak sungai, banyak cara bertutur. Dari Aksara Ulu kuno abugida hingga ragam dialek Melayu Palembang.",
    href: "/tema/bahasa-aksara",
    img: "/images/aksara_ulu.jpg",
    keywords: ["aksara", "ulu", "bahasa", "melayu", "komering", "lematang", "ogan", "musi", "kaganga", "tulis", "surat"],
  },
  {
    slug: "tari-musik",
    label: "Seni Pertunjukan",
    title: "Tari & Musik Tradisional",
    desc: "Dari Tari Gending Sriwijaya yang kolosal sakral hingga petikan melankolis Gitar Tunggal Batanghari Sembilan yang penuh petuah.",
    href: "/tema/tari-musik",
    img: "/images/tari_gending.jpg",
    keywords: ["tari", "gending", "sriwijaya", "tanggai", "erai", "kebagh", "setabik", "gitar", "tunggal", "burdah", "kelintang", "musik", "lagu", "begambo", "batanghari"],
  },
  {
    slug: "kuliner",
    label: "Kuliner Khas",
    title: "Cita Rasa Tepian Sungai Musi",
    desc: "Dari Pempek dan cuko hitam pekat hingga Kue Maksuba kesultanan, Sambal Tempoyak Durian, dan Kue Delapan Jam yang legit.",
    href: "/tema/kuliner",
    img: "/images/pempek_palembang.jpg",
    keywords: ["pempek", "kuliner", "makan", "cuko", "pindang", "mie", "celor", "tempoyak", "maksuba", "lapis", "kojo", "gandus", "burgo", "tekwan", "laksan"],
  },
  {
    slug: "pertunjukan-lisan",
    label: "Tradisi Lisan",
    title: "Seni Pertunjukan & Tradisi Lisan",
    desc: "Teater Dulmuluk, Senjang berpantun, dan Tembang Batanghari Sembilan — cerita, pantun, dan tawa yang diwariskan dari mulut ke mulut.",
    href: "/tema/pertunjukan-lisan",
    img: "/images/tari_gending.jpg",
    keywords: ["dulmuluk", "teater", "senjang", "pantun", "tembang", "pertunjukan", "lisan", "syair", "tutur"],
  },
  {
    slug: "upacara-adat",
    label: "Upacara & Festival",
    title: "Upacara Adat & Tradisi Sosial",
    desc: "Ngobeng, Festival Perahu Bidar, Bekarang Iwak, dan Sedekah Rame — kebersamaan yang dirayakan di sungai, lahan, dan meja pernikahan.",
    href: "/tema/upacara-adat",
    img: "/images/ampera_hero.jpg",
    keywords: ["ngobeng", "bidar", "perahu", "bekarang", "iwak", "sedekah", "rame", "nindai", "madik", "upacara", "festival", "tradisi", "adat"],
  },
  {
    slug: "sejarah",
    label: "Sejarah & Peninggalan",
    title: "Jejak Sriwijaya & Kesultanan Palembang",
    desc: "Prasasti Kedukan Bukit, Benteng Kuto Besak, Museum Balaputradewa, dan Jembatan Ampera — arsip hidup peradaban Palembang.",
    href: "/tema/sejarah",
    img: "/images/ampera_hero.jpg",
    keywords: ["sejarah", "sriwijaya", "prasasti", "kesultanan", "palembang", "benteng", "kuto", "besak", "museum", "balaputradewa", "ampera", "jembatan", "peninggalan", "kerajaan"],
  },
];


function RelatedThemeFilter({ query }: { query: string }) {
  const q = query.toLowerCase();
  // Pick the first / most relevant matching theme
  const match = THEME_FILTERS.find((t) =>
    t.keywords.some((kw) => q.includes(kw))
  );

  if (!match) return null;

  return (
    <section className="flex flex-col gap-6 mt-20 pt-4">
      {/* Section heading */}
      <div className="flex items-center justify-center text-center w-full">
        <h2 className="noto-heading text-2xl md:text-3xl text-white font-normal tracking-wide">
          Jelajahi kategori terkait...
        </h2>
      </div>

      {/* ONE wide panoramic card — persis seperti JELAJAHI.MD */}
      <Link
        href={match.href}
        className="relative w-full rounded-3xl overflow-hidden border border-amber-500/20 shadow-2xl group min-h-[340px] md:min-h-[380px] flex items-center justify-center p-6 md:p-12 transition-all duration-500 hover:border-amber-400/50 hover:shadow-[0_0_60px_rgba(212,175,55,0.18)]"
      >
        {/* Background image */}
        <img
          src={match.img}
          alt={match.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none rounded-3xl"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] pointer-events-none rounded-3xl" />

        {/* Centered content */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto gap-3">
          <span className="text-[11px] md:text-xs font-semibold tracking-widest uppercase text-amber-200/90 drop-shadow-sm">
            {match.label}
          </span>
          <h3 className="noto-heading text-2xl md:text-4xl text-white font-medium tracking-wide drop-shadow-md">
            {match.title}
          </h3>
          <p className="text-sm md:text-base text-white/90 max-w-xl mx-auto leading-relaxed drop-shadow-sm">
            {match.desc}
          </p>
          <div className="pt-3">
            <span className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 hover:border-amber-400/50 text-white hover:text-amber-300 text-sm font-medium tracking-wide transition-all backdrop-blur-md shadow-lg">
              Lihat Tema
              <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}

function JelajahiContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(urlQuery || "Filosofi dan Sejarah Songket Lepus Emas Palembang");
  const [inputValue, setInputValue] = useState(urlQuery || "Filosofi dan Sejarah Songket Lepus Emas Palembang");
  const [isPlaying, setIsPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync state whenever URL query param changes (e.g. redirected from Beranda)
  useEffect(() => {
    if (urlQuery) {
      setQuery(urlQuery);
      setInputValue(urlQuery);
    }
  }, [urlQuery]);

  useEffect(() => {
    const bg = document.getElementById("dynamicBgWrapper");
    if (!bg) return;
    let tx = 0, ty = 0, cx = 0, cy = 0, ticking = false;
    const onMove = (e: MouseEvent) => {
      const hw = window.innerWidth / 2,
        hh = window.innerHeight / 2;
      tx = ((e.clientX - hw) / hw) * 30;
      ty = ((e.clientY - hh) / hh) * 22;
      if (!ticking) {
        requestAnimationFrame(tick);
        ticking = true;
      }
    };
    const tick = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      bg.style.transform = `scale(1.1) translate3d(${cx.toFixed(2)}px,${cy.toFixed(2)}px,0)`;
      if (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) requestAnimationFrame(tick);
      else ticking = false;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const handleSearch = (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    setQuery(trimmed);
    setInputValue(trimmed);
    setShowSuggestions(false);
    // Keep URL in sync smoothly without full page reload and without touching Beranda
    window.history.replaceState(null, "", `/jelajahi?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <>
      <style>{`
        @keyframes floatOrb1{0%{transform:translate(0,0) scale(1) rotate(0deg);opacity:.75}30%{transform:translate(18vw,12vh) scale(1.3) rotate(25deg);opacity:.95}65%{transform:translate(-10vw,22vh) scale(.9) rotate(-18deg);opacity:.7}85%{transform:translate(8vw,-10vh) scale(1.22) rotate(12deg);opacity:.9}100%{transform:translate(0,0) scale(1) rotate(0deg);opacity:.75}}
        @keyframes floatOrb2{0%{transform:translate(0,0) scale(1) rotate(0deg);opacity:.8}35%{transform:translate(-22vw,16vh) scale(1.35) rotate(-30deg);opacity:.95}70%{transform:translate(16vw,-14vh) scale(.85) rotate(20deg);opacity:.65}100%{transform:translate(0,0) scale(1) rotate(0deg);opacity:.8}}
        @keyframes floatOrb3{0%{transform:translate(0,0) scale(.9) rotate(0deg);opacity:.7}40%{transform:translate(24vw,-18vh) scale(1.32) rotate(35deg);opacity:.92}75%{transform:translate(-18vw,15vh) scale(.88) rotate(-25deg);opacity:.68}100%{transform:translate(0,0) scale(.9) rotate(0deg);opacity:.7}}
        @keyframes floatOrb4{0%{transform:translate(0,0) scale(1.05) rotate(0deg);opacity:.75}45%{transform:translate(-20vw,-18vh) scale(1.28) rotate(-22deg);opacity:.95}80%{transform:translate(15vw,16vh) scale(.92) rotate(28deg);opacity:.7}100%{transform:translate(0,0) scale(1.05) rotate(0deg);opacity:.75}}
        @keyframes floatOrb5{0%{transform:translate(0,0) scale(1);opacity:.6}50%{transform:translate(16vw,20vh) scale(1.3);opacity:.85}100%{transform:translate(0,0) scale(1);opacity:.6}}
        @keyframes floatEmber1{0%{transform:translate(0,0) scale(.8);opacity:.3}50%{transform:translate(6vw,-15vh) scale(1.4);opacity:.85}100%{transform:translate(-4vw,-30vh) scale(.6);opacity:.1}}
        @keyframes floatEmber2{0%{transform:translate(0,0) scale(1);opacity:.25}50%{transform:translate(-8vw,-20vh) scale(1.5);opacity:.9}100%{transform:translate(5vw,-40vh) scale(.7);opacity:.1}}
        @keyframes eqBar{0%,100%{height:5px}50%{height:14px}}
        .animate-orb-1{animation:floatOrb1 7.5s ease-in-out infinite}
        .animate-orb-2{animation:floatOrb2 8.5s ease-in-out infinite}
        .animate-orb-3{animation:floatOrb3 6.8s ease-in-out infinite}
        .animate-orb-4{animation:floatOrb4 9s ease-in-out infinite}
        .animate-orb-5{animation:floatOrb5 8s ease-in-out infinite}
        .animate-ember-1{animation:floatEmber1 9s ease-in-out infinite}
        .animate-ember-2{animation:floatEmber2 8s ease-in-out infinite 2s}
        .eq-bar{display:inline-block;width:2px;border-radius:2px;animation:eqBar 0.7s ease-in-out infinite}
        .eq-bar:nth-child(2){animation-delay:.1s}
        .eq-bar:nth-child(3){animation-delay:.22s}
        .eq-bar:nth-child(4){animation-delay:.34s}
        .expanded-body{transition:max-height .55s cubic-bezier(.2,.8,.2,1),opacity .4s ease;overflow:hidden}
      `}</style>

      <AmbientBackground />

      <main className="relative z-10 w-full min-h-screen pt-28 pb-20">
        <div className="flex flex-col w-full max-w-7xl mx-auto px-5 md:px-12 gap-8">

          {/* ── SEARCH CAPSULE ── */}
          <section className="relative w-full flex flex-col items-center z-[100]">
            <div className="relative w-full max-w-[720px] mx-auto z-[100]">
              <div className="relative w-full bg-white/[0.04] border border-white/10 shadow-xl backdrop-blur-2xl rounded-full">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSearch(inputValue);
                  }}
                  className="flex items-center w-full px-4 py-2.5 gap-3"
                >
                  <button
                    type="button"
                    onClick={() => router.push("/")}
                    aria-label="Kembali"
                    className="flex items-center justify-center p-1.5 -ml-1 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M19 12H5" /><path d="M12 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    type="submit"
                    aria-label="Cari"
                    className="flex items-center justify-center p-0 text-amber-400 hover:text-amber-300 transition-colors shrink-0 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-xl">search</span>
                  </button>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 180)}
                    placeholder="Cari budaya, sejarah, kuliner Sumsel..."
                    className="flex-1 min-w-0 bg-transparent border-0 outline-none focus:outline-none focus:ring-0 text-base md:text-[17px] text-white placeholder:text-white/30 font-medium"
                  />
                  {inputValue && (
                    <button
                      type="button"
                      onClick={() => { setInputValue(""); inputRef.current?.focus(); }}
                      className="p-1.5 rounded-full hover:bg-white/10 text-white/40 hover:text-white transition-colors shrink-0 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-lg">close</span>
                    </button>
                  )}
                </form>
                {showSuggestions && (
                  <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-[#141014]/95 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-2xl overflow-hidden z-[200]">
                    {SUGGESTIONS.filter(
                      (s) => s.toLowerCase().includes(inputValue.toLowerCase()) || inputValue.length < 2
                    ).map((s, i) => (
                      <button
                        key={i}
                        type="button"
                        onMouseDown={() => handleSearch(s)}
                        className="w-full flex items-center gap-3 px-5 py-3 hover:bg-white/[0.05] text-left transition-colors"
                      >
                        <span className="material-symbols-outlined text-base text-amber-400/60 shrink-0">history</span>
                        <span className="text-sm text-white/75 truncate">{s}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* ── HEADER LABEL ── */}
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-2xl text-amber-300">auto_awesome</span>
            <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">Rangkuman SORA</h1>
          </div>

          {/* ── 2-COLUMN LAYOUT ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

            {/* LEFT — Artifact card */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <article className="relative overflow-hidden border border-amber-400/20 bg-white/[0.02] shadow-[0_0_35px_rgba(212,175,55,0.12)] group rounded-3xl" style={{ height: 480 }}>
                <img
                  src="/images/songket_lepus.jpg"
                  alt="Songket Lepus Palembang"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 rounded-3xl"
                />
                <div className="absolute inset-x-0 bottom-0 z-10 pt-24 pb-7 px-7 bg-gradient-to-t from-[#0d0d0f]/95 via-[#0d0d0f]/55 to-transparent flex flex-col justify-end">
                  <h2 className="font-semibold text-3xl md:text-[2rem] text-white tracking-wide drop-shadow-md noto-heading">
                    Songket Lepus Palembang
                  </h2>
                  <p className="text-base text-white/85 mt-2 drop-shadow-sm">Kain tenun emas lambang kemegahan tradisi Sriwijaya</p>
                </div>
              </article>

              {/* Source cards — appear when expanded */}
              <div
                className="expanded-body"
                style={{ maxHeight: expanded ? "400px" : "0px", opacity: expanded ? 1 : 0 }}
              >
                <div className="rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl p-4 flex flex-col gap-3 shadow-xl">
                  <p className="text-[10px] font-semibold text-white/35 uppercase tracking-[0.15em] px-1">Sumber Referensi</p>
                  {SOURCE_ARTICLES.map((art, i) => (
                    <div key={i}>
                      {i > 0 && <div className="h-px bg-white/[0.06] my-1" />}
                      <div className="flex items-start gap-3 p-2 rounded-xl hover:bg-white/[0.04] transition-colors cursor-pointer group/art">
                        <div className="flex flex-col gap-1 min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 ${art.iconStyle}`}>
                              {art.icon}
                            </div>
                            <span className="text-[11px] text-white/45 truncate">{art.domain}</span>
                          </div>
                          <p className="text-[13px] font-medium text-white group-hover/art:text-amber-300 transition-colors line-clamp-1">{art.title}</p>
                          <p className="text-[11px] text-white/40 line-clamp-2 leading-relaxed">{art.excerpt}</p>
                        </div>
                        <img src={art.img} alt={art.title} className="w-14 h-14 rounded-lg object-cover border border-white/10 shrink-0" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT — AI Summary Card */}
            <div className="lg:col-span-7">
              <article className="relative w-full rounded-3xl overflow-hidden bg-[#0d0d0f]/60 border border-white/10 backdrop-blur-2xl p-6 md:p-8 flex flex-col gap-5 shadow-2xl hover:border-amber-400/25 transition-all duration-300 min-h-[480px]">
                {/* Decorative mandala */}
                <div className="absolute -right-8 -bottom-10 pointer-events-none w-64 h-64 opacity-10 text-amber-400 mix-blend-screen z-0">
                  <svg className="w-full h-full rotate-12" fill="none" viewBox="0 0 200 200">
                    <g stroke="currentColor" strokeWidth="1">
                      <circle cx="100" cy="100" r="80" strokeDasharray="3 3" />
                      <circle cx="100" cy="100" r="56" />
                      <circle cx="100" cy="100" r="32" strokeDasharray="2 2" />
                      <polygon fill="currentColor" fillOpacity="0.1" points="100,10 120,80 190,100 120,120 100,190 80,120 10,100 80,80" strokeWidth="1.5" />
                    </g>
                  </svg>
                </div>

                <div className="relative z-10 flex flex-col gap-5 w-full">
                  {/* Audio Toggle */}
                  <button
                    type="button"
                    onClick={() => setIsPlaying((v) => !v)}
                    className="inline-flex items-center gap-2.5 px-0 py-0 bg-transparent hover:opacity-90 text-left focus:outline-none group cursor-pointer transition-all w-fit"
                  >
                    <span className="material-symbols-outlined text-[26px] text-amber-400 select-none transition-transform group-hover:scale-105 shrink-0">
                      {isPlaying ? "pause" : "volume_up"}
                    </span>
                    <span className="text-2xl md:text-3xl text-white font-normal select-none leading-none noto-heading">
                      {isPlaying ? "Memutar SORA..." : "Dengarkan SORA"}
                    </span>
                    {isPlaying && (
                      <span className="flex items-end gap-0.5 h-4 px-1">
                        {[0, 1, 2, 3].map((i) => (
                          <span
                            key={i}
                            className={`eq-bar ${i % 2 === 0 ? "bg-amber-300" : "bg-rose-400"}`}
                            style={{ height: 8, animationDelay: `${i * 120}ms` }}
                          />
                        ))}
                      </span>
                    )}
                  </button>

                  {/* Highlighted intro */}
                  <p className="text-base leading-[1.85] text-white/90">
                    <span
                      className="bg-[#6b1d2f]/90 text-amber-50 px-2 py-0.5 rounded font-normal shadow-sm border-l-2 border-amber-400/60"
                      style={{ boxDecorationBreak: "clone" as React.CSSProperties["boxDecorationBreak"] }}
                    >
                      Songket Lepus diciptakan sebagai evolusi busana adiluhung berkasta tertinggi dalam tradisi Kesultanan Palembang, bergeser dari sekadar pakaian adat menjadi lambang estetika sakral, kehormatan, dan kemegahan peradaban bahari Sriwijaya.
                    </span>
                  </p>

                  {/* Body paragraphs */}
                  <div className="flex flex-col gap-3 text-white/65 text-base leading-relaxed">
                    <p>
                      Kata <strong className="text-amber-400 font-semibold">"lepus"</strong> secara etimologis bermakna{" "}
                      <em>merata tanpa celah</em>—merujuk pada teknik pengerjaan motif benang emas murni yang menyelimuti seluruh tenunan kain sutra dasar.
                    </p>
                    <p
                      style={
                        !expanded
                          ? { WebkitMaskImage: "linear-gradient(black 30%, transparent 100%)", maskImage: "linear-gradient(black 30%, transparent 100%)" }
                          : {}
                      }
                    >
                      Penyanyi dan maestro wastra tenun memandang motif ini bukan sekadar pola ragam hias dekoratif, melainkan pusaka adiluhung paling sakral dalam kebudayaan Melayu dan tradisi pesisir Asia Tenggara...
                    </p>

                    {/* Expanded content */}
                    <div
                      className="expanded-body"
                      style={{ maxHeight: expanded ? "600px" : "0px", opacity: expanded ? 1 : 0 }}
                    >
                      <div className="flex flex-col gap-3 pt-1">
                        <p>Keanggunannya membentang melintasi kurun waktu berabad-abad sebagai lambang kedaulatan serta prestise abadi peradaban Sriwijaya.</p>
                        <p>Berikut adalah fakta singkat mengenai kebesaran dan keagungan Songket Lepus dalam lintasan budaya nusantara:</p>
                        <div className="flex flex-col gap-2.5 pl-4 border-l-2 border-amber-400/35">
                          <p><strong className="text-amber-400 font-semibold">• Ikon Budaya Global:</strong> Saking tersohornya di kalangan bangsawan istana, muncul pepatah kesultanan bahwa di mana pun adat Melayu ditegakkan, di situ kilau benang emas Songket Lepus bertahta.</p>
                          <p><strong className="text-amber-400 font-semibold">• Mahkota Busana Pernikahan Aesan Gede:</strong> Dikenakan khusus oleh keluarga inti Sultan Palembang dalam penobatan kemuliaan dan resepsi agung pengantin kebesaran.</p>
                          <p><strong className="text-amber-400 font-semibold">• Simbol Kejayaan Maritim Sriwijaya:</strong> Kilauan benang emas jantung melambangkan kemakmuran rute rempah Selat Malaka serta jalinan sosial yang erat di tepian Sungai Musi.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Toggle button */}
                  <button
                    type="button"
                    onClick={() => setExpanded((v) => !v)}
                    aria-expanded={expanded}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-6 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-amber-400/40 text-white text-sm font-medium tracking-wide transition-all backdrop-blur-md focus:outline-none shadow-sm cursor-pointer"
                  >
                    <span>{expanded ? "Tampilkan lebih sedikit" : "Tampilkan lebih banyak"}</span>
                    <span
                      className="material-symbols-outlined text-base transition-transform duration-300"
                      style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
                    >
                      expand_more
                    </span>
                  </button>
                </div>
              </article>
            </div>
          </div>

          {/* ── KATEGORI TERKAIT — filter chip dari 8 tema beranda ── */}
          <RelatedThemeFilter query={query} />

        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 w-full border-t border-white/10 py-6 mt-4">
        <div className="max-w-7xl mx-auto px-5 md:px-12 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex flex-wrap items-center gap-2 text-sm text-white/30">
            <span className="font-bold bg-gradient-to-r from-[#FDE047] via-[#E9C176] to-[#DC2626] bg-clip-text text-transparent select-none text-base">SORA.Culture</span>
            <span>© Muhammad Firly Marezky & M. Rifqy Aunur Rahman</span>
            <span className="text-white/15">•</span>
            <span className="text-white/35 font-medium">2026</span>
          </div>
          <span className="text-xs text-white/20">Platform AI Warisan Budaya Sumatera Selatan</span>
        </div>
      </footer>
    </>
  );
}

export default function JelajahiPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0d0d0f] flex items-center justify-center text-white/40">
          Memuat SORA Jelajahi...
        </div>
      }
    >
      <JelajahiContent />
    </Suspense>
  );
}
