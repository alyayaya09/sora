"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Theme } from "../data/sora-content";
import LoveButton from "./LoveButton";

interface ThemeK3Props {
  theme: Theme;
}

export default function ThemeK3({ theme }: ThemeK3Props) {
  const [activeFannedIndex, setActiveFannedIndex] = useState(2); // Default card 3 active matching K3.MD
  const [activeExpert, setActiveExpert] = useState(6); // Default 7th card active (0-indexed 6) matching K3.MD

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
      "fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#141014]/95 border border-[#00f2fe]/50 backdrop-blur-xl shadow-[0_12px_36px_rgba(0,242,254,0.25),0_4px_16px_rgba(0,0,0,0.8)] transition-all duration-300 transform translate-y-0 opacity-100 select-none text-white pointer-events-none";
    toast.innerHTML = `
      <div class="w-6 h-6 rounded-full bg-cyan-950/80 border border-cyan-400 flex items-center justify-center shrink-0">
        <span class="material-symbols-outlined text-[14px] text-cyan-300">info</span>
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

  // 10 experts for the slit accordion
  const experts = [
    { name: "Elly Rudy", title: "Maestro Tari Tradisi Palembang", img: theme.heroImage },
    { name: "Sahilin", title: "Legenda Batanghari Sembilan", img: theme.image },
    { name: "H. Abdul Rozak", title: "Pemerhati Musik Tradisional", img: theme.heroImage },
    { name: "Siti Rahma", title: "Koreografer Tari Tanggai", img: theme.image },
    { name: "Ahmad Dahlan", title: "Pelestari Gambus & Rebana", img: theme.heroImage },
    { name: "Nurhayati", title: "Penari Istana Kesultanan", img: theme.image },
    { name: "Dra. Farida", title: "Cendekiawan Budaya Sumsel", img: theme.heroImage },
    { name: "Bambang Utoyo", title: "Peneliti Seni Musik Etnik", img: theme.image },
    { name: "Kartini", title: "Pendidik Seni Tari Generasi Muda", img: theme.heroImage },
    { name: "M. Yamin", title: "Pengrajin Tanggai & Alat Musik", img: theme.image },
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

          {/* Interactive Actions: Favorite & Share */}
          <div className="flex items-center gap-6 mt-6">
            <LoveButton
              itemType="theme"
              itemRef={theme.slug}
              title={theme.title}
              imageUrl={theme.heroImage || theme.image}
              creator="Sumatera Selatan"
              sourceUrl={`/tema/${theme.slug}`}
              size="md"
              onToggle={(fav) => {
                triggerToast(
                  fav ? "Tersimpan ke Favorit" : "Dihapus dari Favorit"
                );
              }}
            />
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
           SECTION 5: MAESTRO & SENIMAN TRADISI (SMOOTH & STICKY 10 SLIT ACCORDION)
           ========================================== */}
      <section
        className="py-20 px-3 sm:px-6 border-b-8 border-pink-700/50 bg-transparent"
        data-purpose="future-scholars-section"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 text-white text-shadow-custom">
              Bagaimana masa depan kesenian tari &amp; musik?
            </h2>
            <p className="text-sm md:text-base font-normal text-white text-shadow-custom">
              Dengarkan pandangan para maestro &amp; seniman Sumatera Selatan.
            </p>
          </div>

          <div
            className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-2.5 overflow-x-auto py-8 px-4 no-scrollbar"
            id="expert-carousel"
          >
            {experts.map((exp, idx) => {
              const isActive = activeExpert === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveExpert(idx)}
                  onMouseEnter={() => setActiveExpert(idx)}
                  className={`expert-card group relative flex-shrink-0 h-96 rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer border ${
                    isActive
                      ? "w-56 sm:w-68 md:w-80 opacity-100 z-20 is-active bg-neutral-900/90"
                      : "w-16 sm:w-20 md:w-24 opacity-60 hover:opacity-90 bg-neutral-900/60 z-10"
                  }`}
                >
                  <img
                    alt={exp.name}
                    className="w-full h-full object-cover"
                    src={exp.img}
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
                      {exp.name}
                    </h3>
                    <p className="text-xs text-gray-300 font-light leading-snug text-shadow-custom">
                      {exp.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* END: Section5_MasaDepanBahasa */}
    </div>
  );
}
