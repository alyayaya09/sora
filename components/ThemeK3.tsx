"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Theme } from "../data/sora-content";

interface ThemeK3Props {
  theme: Theme;
}

export default function ThemeK3({ theme }: ThemeK3Props) {
  const [activeFannedIndex, setActiveFannedIndex] = useState(2); // Default card 3 active matching K3.MD
  const [activeExpert, setActiveExpert] = useState(6); // Default 7th card active matching K3.MD
  const [playingVideo, setPlayingVideo] = useState<{
    id: string;
    name: string;
    origin: string;
    youtubeId: string;
    desc: string;
  } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPlayingVideo(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (playingVideo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [playingVideo]);

  useEffect(() => {
    const slideElements = document.querySelectorAll(".scroll-slide");
    if (!("IntersectionObserver" in window)) {
      slideElements.forEach((el) => el.classList.add("is-in-view"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in-view");
          } else {
            entry.target.classList.remove("is-in-view");
          }
        });
      },
      { threshold: 0.15 }
    );

    slideElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const triggerToast = (msg: string) => {
    const existing = document.getElementById("soraLiveToast");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.id = "soraLiveToast";
    toast.className =
      "fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#141014]/95 border border-amber-400/40 backdrop-blur-xl shadow-[0_12px_36px_rgba(245,158,11,0.2),0_4px_16px_rgba(0,0,0,0.8)] transition-all duration-300 transform translate-y-0 opacity-100 select-none text-white pointer-events-none";
    toast.innerHTML = `
      <div class="w-6 h-6 rounded-full bg-amber-950/80 border border-amber-400/60 flex items-center justify-center shrink-0">
        <span class="material-symbols-outlined text-[14px] text-amber-300">info</span>
      </div>
      <span class="text-xs font-medium tracking-wide text-neutral-100">${msg}</span>
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translate(-50%, 8px)";
      setTimeout(() => toast.remove(), 300);
    }, 2400);
  };

  // Split theme items
  const rhythm1 = theme.items[0] || {
    name: "Tari Gending Sriwijaya",
    desc: "Tarian penyambutan agung tamu kehormatan dari era kejayaan Kedatuan Sriwijaya.",
    image: theme.heroImage,
    slug: "tari-gending-sriwijaya",
  };
  const rhythm2 = theme.items[1] || {
    name: "Tari Tanggai",
    desc: "Gerakan lentik jemari bertapis kuningan yang memancarkan keramahan bumi Sriwijaya.",
    image: theme.image,
    slug: "tari-tanggai",
  };

  const fannedCards = theme.items.slice(0, 4);

  const history1 = theme.items[4] || {
    name: "Kelahiran Tari Sakral Palembang",
    desc: "Kisah prasasti dan relief candi tentang seni tari kuno.",
    image: theme.heroImage,
    slug: "tari-gending-sriwijaya",
  };
  const history2 = theme.items[5] || {
    name: "Gitar Tunggal Batanghari Sembilan",
    desc: "Irama petikan dawai khas pedalaman Sumatera Selatan.",
    image: theme.image,
    slug: "tari-gending-sriwijaya",
  };
  const history3 = theme.items[6] || {
    name: "Tabuhan Rebana dan Dambus",
    desc: "Akulturasi seni musik Melayu dan Timur Tengah.",
    image: theme.heroImage,
    slug: "tari-gending-sriwijaya",
  };

  // 10 Kumpulan Video Tari Tradisional Sumatera Selatan
  const danceVideos = [
    {
      id: "gending-sriwijaya",
      name: "Tari Gending Sriwijaya",
      origin: "Palembang / Sumatera Selatan",
      youtubeId: "-D5nI9cNyRo",
      desc: "Tarian agung penyambutan tamu kehormatan yang melambangkan kemegahan, keanggunan, dan keluhuran budaya Kedatuan Sriwijaya.",
    },
    {
      id: "tari-tanggai",
      name: "Tari Tanggai",
      origin: "Palembang",
      youtubeId: "_I9cZt-74J8",
      desc: "Tarian penyambutan khas dengan lentik jemari bertapis kuningan kuku emas tanggai, memancarkan keramahan bumi Sriwijaya.",
    },
    {
      id: "pagar-pengantin",
      name: "Tari Pagar Pengantin",
      origin: "Palembang",
      youtubeId: "yaj6InlaZCc",
      desc: "Tarian sakral mempelai wanita di dalam lingkaran nampan kuningan (dulang kencana), perlambang perpisahan masa lajang menuju alam pernikahan.",
    },
    {
      id: "tari-kebagh",
      name: "Tari Kebagh",
      origin: "Besemah, Kota Pagar Alam",
      youtubeId: "DMThptENETA",
      desc: "Tarian adat sakral tertua masyarakat Besemah dengan kepakan sayap lembut bagai burung dinang saat menyambut para tetamu kehormatan.",
    },
    {
      id: "tari-erai-erai",
      name: "Tari Erai-Erai",
      origin: "Kabupaten Lahat",
      youtubeId: "Nt_5ekQ6E0k",
      desc: "Tarian kegembiraan dan kebersamaan masyarakat Lahat saat panen raya padi diiringi alunan syair tembang penuh suka cita.",
    },
    {
      id: "tari-setabik",
      name: "Tari Setabik",
      origin: "Musi Banyuasin",
      youtubeId: "OSamBGmmtE0",
      desc: "Tarian penghormatan khas Sekayu Musi Banyuasin dengan prosesi menyuguhkan daun sirih kapur dalam wadah tepak tembaga.",
    },
    {
      id: "tepak-keraton",
      name: "Tari Tepak Keraton",
      origin: "Kesultanan Palembang",
      youtubeId: "UI2kn8aVYIE",
      desc: "Tarian istana yang diciptakan untuk menyambut tamu agung kesultanan dengan busana kebesaran Aesan Gede dan tepak kencana.",
    },
    {
      id: "tari-silampari",
      name: "Tari Silampari Kayangan Tinggi",
      origin: "Musi Rawas / Lubuklinggau",
      youtubeId: "0EdfcCQ10F4",
      desc: "Tarian legendaris bidadari kahyangan yang memadukan kelembutan gerak dan pesona mistis tanah Silampari.",
    },
    {
      id: "tari-seluang-mudik",
      name: "Tari Seluang Mudik",
      origin: "Kabupaten Banyuasin",
      youtubeId: "XVUvnrbCEGg",
      desc: "Tarian tradisi pesisir yang terinspirasi dari lincahnya kawanan ikan seluang yang berenang mudik menentang arus sungai.",
    },
    {
      id: "pagar-pengantin-adat",
      name: "Prosesi Adat Tari Pengantin",
      origin: "Sumatera Selatan",
      youtubeId: "cKpWcPLnyC4",
      desc: "Dokumentasi pementasan prosesi Tari Pagar Pengantin lengkap dalam balutan adat pernikahan megah Kesultanan Palembang Darussalam.",
    },
  ];

  return (
    <div className="font-sans antialiased selection:bg-amber-400 selection:text-black text-white pt-16">
      {/* ==========================================
           SECTION 1: HERO (EXACT K3.MD 3D WIREFRAME TUNNEL HERO)
           ========================================== */}
      <section
        className="relative min-h-[92vh] md:min-h-screen tunnel-hero flex flex-col items-center justify-center px-4 overflow-hidden py-4"
        data-purpose="hero-section"
        style={{ height: "700px", minHeight: "700px", maxHeight: "700px" }}
      >
        {/* Wireframe perspective grid illusion */}
        <div className="absolute inset-0 perspective-grid opacity-70 pointer-events-none"></div>

        {/* Decorative yellow concentric arc in background left & right */}
        <div className="absolute -left-36 top-12 w-96 h-96 rounded-full border-[6px] border-amber-400 opacity-60 pointer-events-none"></div>
        <div className="absolute -right-36 bottom-6 w-96 h-96 rounded-full border-[6px] border-amber-400 opacity-60 pointer-events-none"></div>

        {/* Tunnel Frame Concentric Box Core */}
        <div className="relative w-full max-w-4xl px-6 md:px-14 border-4 border-amber-500/70 bg-[#721535]/90 rounded-none shadow-2xl flex flex-col items-center justify-center text-center nested-frame-1 transition-all py-6">
          {/* Inner sub-border corridor */}
          <div className="absolute inset-3 md:inset-5 border border-pink-500/40 pointer-events-none"></div>

          {/* Yellow Speech Bubble Emblem */}
          <div className="relative w-64 h-56 md:w-72 md:h-60 bg-[#FFCA00] rounded-[48px] rounded-bl-sm flex flex-col items-center justify-center p-6 shadow-xl transform hover:scale-105 transition-transform duration-300">
            {/* Curved speech bubble tail */}
            <div className="absolute -bottom-4 left-6 w-0 h-0 border-t-[20px] border-t-[#FFCA00] border-r-[22px] border-r-transparent"></div>
            <h1 className="text-white font-sans text-4xl md:text-5xl font-black uppercase tracking-tight text-center leading-none drop-shadow-sm select-none">
              Tari &amp; Musik
            </h1>
            <p className="text-white font-sans text-lg md:text-xl font-extrabold uppercase tracking-wide mt-2 text-center leading-tight drop-shadow-sm select-none">
              Sumatera<br />Selatan
            </p>
          </div>

          {/* Hero Subtitle in Indonesian */}
          <p className="mt-8 text-white font-medium text-base md:text-lg max-w-xl text-shadow-custom leading-relaxed">
            {theme.intro}
          </p>

          {/* Interactive Actions: Share */}
          <div className="flex items-center gap-6 mt-6">
            <button
              aria-label="Bagikan"
              className="text-white/90 hover:text-white hover:scale-110 transition-transform cursor-pointer"
              type="button"
              onClick={() => triggerToast("Tautan tema siap dibagikan")}
            >
              <svg
                className="w-6 h-6 stroke-current"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>
          </div>

          {/* Downward Chevron Scroll Indicator */}
          <a
            aria-label="Scroll down"
            className="mt-8 text-white/80 hover:text-white animate-bounce inline-block"
            href="#ritme-bahasa"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                d="M19 9l-7 7-7-7"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </a>
        </div>
      </section>
      {/* END: Section1_Hero */}

      {/* ==========================================
           SECTION 2: RITME BAHASA / GERAK TARI (EXACT K3.MD)
           ========================================== */}
      <section
        className="py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden flex flex-col items-center bg-transparent"
        data-purpose="rhythm-section"
        id="ritme-bahasa"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-10 tracking-tight text-white text-shadow-custom">
          Ritme &amp; Gerak Tari
        </h2>

        <div className="relative w-full max-w-7xl px-2 sm:px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {/* Card 1: Slide from Left */}
            <Link
              href={`/tur/${rhythm1.slug || "tari-gending-sriwijaya"}`}
              className="scroll-slide is-in-view group relative h-96 md:h-[360px] rounded-3xl overflow-hidden shadow-xl cursor-pointer transform hover:-translate-y-2 transition-all duration-500 block"
              data-slide-direction="left"
            >
              <img
                alt={rhythm1.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                src={rhythm1.image || theme.heroImage}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-shadow-custom">
                  {rhythm1.name}
                </h3>
                <p className="text-base text-gray-200 font-light leading-relaxed text-shadow-custom">
                  {rhythm1.desc}
                </p>
              </div>
            </Link>

            {/* Card 2: Slide from Right */}
            <Link
              href={`/tur/${rhythm2.slug || "tari-gending-sriwijaya"}`}
              className="scroll-slide delay-150 is-in-view group relative h-96 md:h-[360px] rounded-3xl overflow-hidden shadow-xl cursor-pointer transform hover:-translate-y-2 transition-all duration-500 block"
              data-slide-direction="right"
            >
              <img
                alt={rhythm2.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                src={rhythm2.image || theme.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-shadow-custom">
                  {rhythm2.name}
                </h3>
                <p className="text-base text-gray-200 font-light leading-relaxed text-shadow-custom">
                  {rhythm2.desc}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
      {/* END: Section2_RitmeBahasa */}

      {/* ==========================================
           SECTION 3: IKON KESENIAN TARI & MUSIK (SMOOTH & STICKY FANNED CARDS)
           ========================================== */}
      <section
        className="py-20 px-4 sm:px-6 relative bg-transparent"
        data-purpose="music-icons-section"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold text-center mb-14 tracking-tight text-white text-shadow-custom">
            Temui ikon kesenian tari &amp; musik
          </h2>

          {/* Fanned Cards with Smooth GPU Transform & Sticky Active State (Exact K1 Dimensions) */}
          <div className="relative flex flex-col md:flex-row items-center justify-center -space-y-6 md:-space-y-0 md:-space-x-8 px-4 py-8 overflow-visible">
            {fannedCards.map((item, idx) => {
              const isFannedActive = activeFannedIndex === idx;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setActiveFannedIndex(idx)}
                  className={`k3-fanned-item flex-shrink-0 ${
                    isFannedActive ? "is-active-wrapper" : "is-inactive-wrapper"
                  }`}
                  style={{ zIndex: isFannedActive ? 30 : 10 + idx }}
                >
                  <Link
                    href={`/tur/${item.slug || "tari-gending-sriwijaya"}`}
                    className={`k3-fanned-card group relative rounded-2xl sm:rounded-3xl overflow-hidden border cursor-pointer flex-shrink-0 bg-transparent block ${
                      isFannedActive ? "is-active" : "is-inactive"
                    }`}
                  >
                    <img
                      alt={item.name}
                      className={`w-full h-full object-cover transition-transform duration-500 ${
                        isFannedActive ? "scale-105" : ""
                      }`}
                      src={item.image || theme.heroImage}
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent transition-opacity duration-300 ${
                        isFannedActive ? "opacity-90" : "opacity-80"
                      }`}
                    ></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7 text-white">
                      <h4 className="text-xl sm:text-2xl font-bold leading-snug text-shadow-custom text-white">
                        {item.name}
                      </h4>
                      <p className="mt-1.5 text-xs sm:text-sm text-[#f3f4f6] font-normal line-clamp-2 text-shadow-custom">
                        {item.desc}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* END: Section3_IkonMusik */}

      {/* ==========================================
           SECTION 4: SEJARAH DI BALIK KESENIAN (EXACT K3.MD ASYMMETRICAL 3 CARDS)
           ========================================== */}
      <section
        className="py-20 px-4 sm:px-6 bg-transparent"
        data-purpose="history-section"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 tracking-tight text-white text-shadow-custom">
            Sejarah di balik kesenian
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Left Tall Card: Slide from Left */}
            <Link
              href={`/tur/${history1.slug || "tari-gending-sriwijaya"}`}
              className="scroll-slide is-in-view group relative rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-80 sm:h-96 md:h-full min-h-[360px] md:min-h-[516px] cursor-pointer block"
              data-slide-direction="left"
            >
              <img
                alt={history1.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src={history1.image || theme.heroImage}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white z-10">
                <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-2 text-shadow-custom">
                  {history1.name}
                </h3>
                <p className="text-sm text-gray-200 font-light text-shadow-custom">
                  {history1.desc}
                </p>
              </div>
            </Link>

            {/* Right Side: Two Stacked Cards (Slide from Right) */}
            <div className="flex flex-col gap-6">
              {/* Top Card */}
              <Link
                href={`/tur/${history2.slug || "tari-gending-sriwijaya"}`}
                className="scroll-slide delay-100 is-in-view group relative rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-60 md:h-[246px] cursor-pointer block"
                data-slide-direction="right"
              >
                <img
                  alt={history2.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src={history2.image || theme.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                  <h3 className="text-lg md:text-xl font-bold tracking-tight mb-1 text-shadow-custom">
                    {history2.name}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-200 font-light text-shadow-custom">
                    {history2.desc}
                  </p>
                </div>
              </Link>

              {/* Bottom Card */}
              <Link
                href={`/tur/${history3.slug || "tari-gending-sriwijaya"}`}
                className="scroll-slide delay-200 is-in-view group relative rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-60 md:h-[246px] cursor-pointer block"
                data-slide-direction="right"
              >
                <img
                  alt={history3.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src={history3.image || theme.heroImage}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                  <h3 className="text-lg md:text-xl font-bold tracking-tight mb-1 text-shadow-custom">
                    {history3.name}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-200 font-light text-shadow-custom">
                    {history3.desc}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* END: Section4_SejarahKata */}

      {/* ==========================================
           SECTION 5: KUMPULAN VIDEO SENI TARI SUMATERA SELATAN (SMOOTH & STICKY 10 SLIT ACCORDION)
           ========================================== */}
      <section
        className="py-20 px-3 sm:px-6 border-b-8 border-pink-700/50 bg-transparent"
        data-purpose="future-scholars-section"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 text-white text-shadow-custom">
              Kumpulan Video Seni Tari Sumatera Selatan
            </h2>
          </div>

          <div
            className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-2.5 overflow-x-auto py-8 px-4 no-scrollbar"
            id="expert-carousel"
          >
            {danceVideos.map((video, idx) => {
              const isActive = activeExpert === idx;
              return (
                <div
                  key={video.id}
                  onClick={() => {
                    setActiveExpert(idx);
                    setPlayingVideo(video);
                    triggerToast(`Memutar ${video.name}`);
                  }}
                  onMouseEnter={() => setActiveExpert(idx)}
                  className={`expert-card group relative flex-shrink-0 h-96 rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer border ${
                    isActive
                      ? "w-56 sm:w-68 md:w-80 opacity-100 z-20 is-active bg-neutral-900/90"
                      : "w-16 sm:w-20 md:w-24 opacity-60 hover:opacity-90 bg-neutral-900/60 z-10"
                  }`}
                >
                  <img
                    alt={video.name}
                    className="w-full h-full object-cover"
                    src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                  />
                  <div
                    className={`overlay-dark absolute inset-0 ${
                      isActive
                        ? "bg-gradient-to-t from-black/90 via-black/20 to-transparent"
                        : "bg-black/35"
                    } transition-opacity duration-300`}
                  ></div>

                  <div className="play-badge absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span
                      className={`badge-circle rounded-full border-2 border-white flex items-center justify-center text-white transition-all duration-300 ${
                        isActive
                          ? "w-11 h-11 bg-black/50 backdrop-blur-xs text-sm shadow-md"
                          : "w-8 h-8 border-white/80 bg-black/40 text-xs"
                      }`}
                    >
                      ▶
                    </span>
                  </div>

                  <div
                    className={`card-info absolute bottom-0 left-0 right-0 p-5 text-white transition-opacity duration-300 ${
                      isActive
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <h3 className="font-bold text-lg leading-tight mb-1 text-shadow-custom text-white">
                      {video.name}
                    </h3>
                    <p className="text-xs text-gray-300 font-light leading-snug text-shadow-custom">
                      {video.origin}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Clean Pemutar Video YouTube (Opsi A) */}
        {playingVideo && (
          <div
            className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-10 transition-all duration-300"
            onClick={() => setPlayingVideo(null)}
          >
            {/* Tombol Tutup Melayang di Pojok Kanan Atas */}
            <button
              onClick={() => setPlayingVideo(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 active:scale-90 border border-white/20 flex items-center justify-center text-white text-lg transition-all cursor-pointer z-50 shadow-2xl"
              title="Tutup (Esc)"
              aria-label="Tutup Video"
            >
              ✕
            </button>

            {/* Video Player Clean (Tanpa Teks di Bawahnya) */}
            <div
              className="relative w-full max-w-5xl aspect-video rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.98)] border border-amber-500/30 bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${playingVideo.youtubeId}?autoplay=1&rel=0`}
                title={playingVideo.name}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </section>
      {/* END: Section5_VideoTariSumsel */}
    </div>
  );
}
