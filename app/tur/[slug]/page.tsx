"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getDedicatedTour } from "../../../data/sora-content";

interface TourPageProps {
  params: {
    slug: string;
  };
}

export default function TourDetailPage({ params }: TourPageProps) {
  const tour = getDedicatedTour(params.slug);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showToast, setShowToast] = useState<string | null>(null);

  const sectionIds = [
    "hero-section",
    "narasi-seksi-1",
    "narasi-seksi-2",
    "narasi-seksi-3",
    "konten-terkait",
  ];

  useEffect(() => {
    // Slide in narrative observer matching LKONTEN.MD
    const narrativeCards = document.querySelectorAll(".slide-in-narrative");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    narrativeCards.forEach((c) => observer.observe(c));

    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
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

  const getCurrentSectionIndex = () => {
    const scrollPos = window.scrollY;
    const effectivePos = scrollPos + window.innerHeight * 0.3;
    if (scrollPos <= 60) return 0;
    let activeIndex = 0;
    for (let i = 0; i < sectionIds.length; i++) {
      const el = document.getElementById(sectionIds[i]);
      if (el && effectivePos >= el.offsetTop) {
        activeIndex = i;
      }
    }
    return activeIndex;
  };

  const navigateSection = (direction: number) => {
    const currentIndex = getCurrentSectionIndex();
    let targetIndex = currentIndex + direction;
    if (targetIndex < 0) targetIndex = 0;
    if (targetIndex >= sectionIds.length) targetIndex = sectionIds.length - 1;

    if (targetIndex === 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const targetEl = document.getElementById(sectionIds[targetIndex]);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        navigateSection(1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        navigateSection(-1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCopyLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      triggerToast("Tautan disalin ke papan klip");
    }
  };

  return (
    <div className="bg-[#0d0d0f] font-sans text-neutral-200 antialiased min-h-screen w-full selection:bg-rose-950 selection:text-rose-200 relative overflow-x-hidden pt-16">
      {/* Reading Progress Top Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-amber-400 via-rose-500 to-cyan-400 z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      {/* Ambient Glow Background matching LKONTEN.MD */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[15%] -left-[10%] w-[65vw] h-[65vw] rounded-full bg-[#6b1d2f]/25 blur-[130px]"></div>
        <div className="absolute top-[25%] -right-[10%] w-[55vw] h-[55vw] rounded-full bg-[#af8d11]/20 blur-[140px]"></div>
        <div className="absolute top-[50%] left-[15%] w-[45vw] h-[45vw] rounded-full bg-[#6b1d2f]/20 blur-[120px]"></div>
        <div className="absolute -bottom-[15%] right-[20%] w-[50vw] h-[50vw] rounded-full bg-[#af8d11]/15 blur-[130px]"></div>
      </div>

      <main className="w-full bg-transparent relative z-10">
        {/* ==========================================
             1. GRAND OPENING COVER HERO SECTION (EXACT LKONTEN.MD)
             ========================================== */}
        <section
          className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden px-4 sm:px-6 md:px-12 pt-24 pb-12"
          id="hero-section"
        >
          {/* Full Cover Background Texture with Dark Gradient Vignette */}
          <div className="absolute inset-0 z-0">
            <img
              alt={tour.title}
              className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.12] scale-[1.02]"
              src={tour.heroImg}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0f] via-[#0d0d0f]/60 to-black/40"></div>
          </div>

          {/* Center Hero Monumental Title & Narrative Lead */}
          <div className="relative z-10 max-w-5xl mx-auto w-full text-center flex flex-col items-center gap-3 my-auto pb-6 pt-16">
            <div className="space-y-2 max-w-4xl">
              <h1 className="text-3xl sm:text-5xl md:text-5xl text-white font-medium leading-tight tracking-tight drop-shadow-lg">
                {tour.title}
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-neutral-300 font-normal max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                <span className="text-amber-400 font-medium italic">
                  Kemilau Peradaban Sriwijaya&nbsp;
                </span>
                {tour.subtitle}
              </p>
            </div>

            {/* Action Pills (Simpan, Salin Tautan, Bagikan) matching LKONTEN.MD */}
            <div className="flex items-center justify-center gap-4 mx-auto pt-6 pb-2">
              <div className="relative group/tooltip flex items-center justify-center">
                <button
                  aria-label="Favorit"
                  className="group inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#6b1d2f]/25 hover:bg-[#6b1d2f]/40 border border-rose-500/30 text-rose-400 backdrop-blur-md transition-all duration-300 shadow-sm focus:outline-none hover:-translate-y-0.5 hover:shadow-lg active:scale-95 cursor-pointer"
                  type="button"
                  onClick={() => {
                    setIsFavorited(!isFavorited);
                    triggerToast(
                      !isFavorited ? "Tersimpan di Favorit" : "Dihapus dari Favorit"
                    );
                  }}
                >
                  <svg
                    className="w-5 h-5 transition-transform duration-200 group-hover:scale-110 group-active:scale-125"
                    fill={isFavorited ? "#f43f5e" : "none"}
                    stroke="#f43f5e"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
                <div className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-md bg-[#1b1b1d]/90 border border-white/10 text-neutral-200 text-[10px] tracking-wide opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 backdrop-blur-md shadow-md z-20">
                  {isFavorited ? "Hapus dari Favorit" : "Simpan ke Favorit"}
                </div>
              </div>

              <div className="relative group/tooltip flex items-center justify-center">
                <button
                  aria-label="Salin Tautan"
                  className="group inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/[0.05] border border-white/15 hover:border-white/50 text-white/80 hover:text-white backdrop-blur-md transition-all duration-300 shadow-sm focus:outline-none hover:-translate-y-0.5 hover:shadow-lg active:scale-95 hover:bg-white/10 cursor-pointer"
                  onClick={handleCopyLink}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px] text-white/80 transition-transform group-hover:scale-110 group-hover:text-white">
                    link
                  </span>
                </button>
                <div className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-md bg-[#1b1b1d]/90 border border-white/10 text-neutral-200 text-[10px] tracking-wide opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 backdrop-blur-md shadow-md z-20">
                  Salin Tautan
                </div>
              </div>

              <div className="relative group/tooltip flex items-center justify-center">
                <button
                  aria-label="Bagikan"
                  className="group inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#af8d11]/20 hover:bg-[#af8d11]/15 border border-amber-400/30 text-amber-300 backdrop-blur-md transition-all duration-300 shadow-sm focus:outline-none hover:-translate-y-0.5 hover:shadow-lg active:scale-95 cursor-pointer"
                  onClick={() => triggerToast("Tautan siap dibagikan")}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px] text-amber-300 transition-transform group-hover:scale-110">
                    share
                  </span>
                </button>
                <div className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-md bg-[#1b1b1d]/90 border border-white/10 text-neutral-200 text-[10px] tracking-wide opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 backdrop-blur-md shadow-md z-20">
                  Bagikan
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Subtle Scroll-Down Indicator & Partnership matching LKONTEN.MD */}
          <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center justify-center text-center gap-1.5 pb-2 shrink-0">
            <div className="flex flex-col items-center justify-center gap-1 text-center">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-neutral-400 font-semibold opacity-80 mb-1">
                Bekerja sama dengan
              </span>
              <div className="inline-flex items-center justify-center gap-3 sm:gap-4">
                <span className="text-xs text-amber-300/80 font-semibold border border-amber-400/20 px-3 py-1 rounded-full bg-black/40">
                  Pemerintah Provinsi Sumatera Selatan
                </span>
                <span className="text-xs text-cyan-300/80 font-semibold border border-cyan-400/20 px-3 py-1 rounded-full bg-black/40">
                  Museum Negeri Balaputradewa
                </span>
                <span className="text-xs text-rose-300/80 font-semibold border border-rose-400/20 px-3 py-1 rounded-full bg-black/40">
                  Pesona Indonesia
                </span>
              </div>
            </div>
            <a
              className="inline-flex flex-col items-center text-neutral-400 hover:text-amber-300 transition-colors group cursor-pointer pt-2"
              href="#narasi-seksi-1"
            >
              <span className="text-[10px] sm:text-[11px] tracking-widest uppercase font-semibold text-white/70 group-hover:text-amber-300">
                GULIR UNTUK MENELUSURI NARASI
              </span>
              <span className="material-symbols-outlined text-base animate-bounce text-amber-300 mt-2">
                keyboard_arrow_down
              </span>
            </a>
          </div>
        </section>

        {/* ==========================================
             2. SEQUENTIAL STORY SECTION 1 (EXACT LKONTEN.MD)
             ========================================== */}
        <section
          className="relative w-full min-h-screen flex items-end overflow-hidden border-b border-white/[0.08] px-6 md:px-12 py-16 md:py-24"
          id="narasi-seksi-1"
        >
          <div className="absolute inset-0 z-0">
            <img
              alt={tour.sec1Title}
              className="w-full h-full object-cover object-center filter brightness-[0.85] contrast-[1.1] scale-100"
              src={tour.sec1Img}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0f] via-[#0d0d0f]/60 to-black/40 pointer-events-none"></div>
          </div>
          <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 slide-in-narrative is-visible">
            <div className="max-w-2xl text-left flex flex-col gap-4 drop-shadow-md">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                Bagian 01 / 03
              </span>
              <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl text-white leading-tight tracking-tight">
                {tour.sec1Title}
              </h2>
              <p className="text-base sm:text-lg text-neutral-200 leading-relaxed font-normal">
                {tour.sec1Desc}
              </p>
            </div>
            <div className="hidden md:flex flex-col items-end text-right text-white/50 text-xs"></div>
          </div>
        </section>

        {/* ==========================================
             3. SEQUENTIAL STORY SECTION 2 (EXACT LKONTEN.MD)
             ========================================== */}
        <section
          className="relative w-full min-h-screen flex items-end overflow-hidden border-b border-white/[0.08] px-6 md:px-12 py-16 md:py-24"
          id="narasi-seksi-2"
        >
          <div className="absolute inset-0 z-0">
            <img
              alt={tour.sec2Title}
              className="w-full h-full object-cover object-center filter brightness-[0.8] contrast-[1.12]"
              src={tour.sec2Img}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0f] via-[#0d0d0f]/50 to-black/40 pointer-events-none"></div>
          </div>
          <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 slide-in-narrative is-visible">
            <div className="max-w-2xl text-left flex flex-col gap-4 drop-shadow-md">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                Bagian 02 / 03
              </span>
              <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl text-white leading-tight tracking-tight">
                {tour.sec2Title}
              </h2>
              <p className="text-base sm:text-lg text-neutral-200 leading-relaxed font-normal">
                {tour.sec2Desc}
              </p>
            </div>
            <div className="hidden md:flex flex-col items-end text-right text-white/50 text-xs"></div>
          </div>
        </section>

        {/* ==========================================
             4. SEQUENTIAL STORY SECTION 3 (EXACT LKONTEN.MD)
             ========================================== */}
        <section
          className="relative w-full min-h-screen flex items-end overflow-hidden border-b border-white/[0.08] px-6 md:px-12 py-16 md:py-24"
          id="narasi-seksi-3"
        >
          <div className="absolute inset-0 z-0">
            <img
              alt={tour.sec3Title}
              className="w-full h-full object-cover object-center filter brightness-[0.8] contrast-[1.12]"
              src={tour.sec3Img}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0f] via-[#0d0d0f]/50 to-black/40 pointer-events-none"></div>
          </div>
          <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 slide-in-narrative is-visible">
            <div className="max-w-2xl text-left flex flex-col gap-4 drop-shadow-md">
              <span className="text-xs font-bold uppercase tracking-widest text-rose-400">
                Bagian 03 / 03
              </span>
              <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl text-white leading-tight tracking-tight">
                {tour.sec3Title}
              </h2>
              <p className="text-base sm:text-lg text-neutral-200 leading-relaxed font-normal">
                {tour.sec3Desc}
              </p>
            </div>
            <div className="hidden md:flex flex-col items-end text-right text-white/50 text-xs"></div>
          </div>
        </section>

        {/* ==========================================
             5. FINAL VIEWPORT: "KONTEN TERKAIT" (EXACT LKONTEN.MD)
             ========================================== */}
        <div
          className="min-h-screen w-full flex flex-col justify-between relative overflow-hidden"
          id="konten-terkait"
        >
          <section className="relative w-full flex-1 flex flex-col justify-center px-6 md:px-12 py-8 md:py-12 max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center text-center w-full mb-6">
              <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl text-neutral-200 font-normal tracking-wide drop-shadow-md">
                Jelajahi kategori terkait...
              </h2>
            </div>
            <div className="max-w-5xl md:max-w-6xl mx-auto w-full relative rounded-3xl overflow-hidden border border-amber-400/30 shadow-[0_20px_50px_rgba(0,0,0,0.4),0_0_40px_rgba(107,29,47,0.25)] min-h-[320px] md:min-h-[380px] flex items-center justify-center p-6 md:p-12 text-center group">
              <img
                alt={tour.relTitle}
                className="absolute inset-0 w-full h-full object-cover filter brightness-[0.85] contrast-[1.1] transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                src={tour.relImg}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0f]/80 via-[#6b1d2f]/25 to-black/60 pointer-events-none"></div>
              <div className="relative z-10 flex flex-col items-center justify-center max-w-3xl mx-auto">
                <span className="text-amber-400 text-xs md:text-sm font-semibold tracking-widest uppercase mb-3">
                  {tour.relCat}
                </span>
                <h3 className="font-sans text-3xl md:text-4xl lg:text-5xl text-white font-normal md:font-medium tracking-normal mb-3 drop-shadow-md">
                  {tour.relTitle}
                </h3>
                <p className="text-neutral-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-6 font-light drop-shadow-sm">
                  {tour.relDesc}
                </p>
                <Link
                  href={tour.relLink}
                  className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-medium border border-white/20 backdrop-blur-md transition-all shadow-md active:scale-95"
                >
                  Lihat Tema
                </Link>
              </div>
            </div>
          </section>
        </div>

        {/* ==========================================
             FLOATING MINIMALIST ARROW CONTROLS (EXACT LKONTEN.MD)
             ========================================== */}
        <aside
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 transition-opacity duration-300 opacity-100 pointer-events-auto"
          id="navControlsAside"
        >
          <div
            className="inline-flex items-center p-1.5 rounded-full bg-[#1b1b1d]/80 hover:bg-[#1b1b1d]/95 backdrop-blur-2xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.6)] transition-all duration-300 hover:border-amber-400/50"
            id="centerNavWidget"
          >
            <button
              aria-label="Seksi sebelumnya"
              className="w-10 h-10 rounded-full flex items-center justify-center text-amber-300 hover:text-amber-200 hover:bg-white/10 active:bg-amber-400/20 active:scale-95 transition-all cursor-pointer"
              onClick={() => navigateSection(-1)}
              type="button"
            >
              <span className="material-symbols-outlined text-[24px]">
                keyboard_arrow_up
              </span>
            </button>
            <div className="w-px h-5 bg-white/15 mx-1"></div>
            <button
              aria-label="Seksi berikutnya"
              className="w-10 h-10 rounded-full flex items-center justify-center text-amber-300 hover:text-amber-200 hover:bg-white/10 active:bg-amber-400/20 active:scale-95 transition-all cursor-pointer"
              onClick={() => navigateSection(1)}
              type="button"
            >
              <span className="material-symbols-outlined text-[24px]">
                keyboard_arrow_down
              </span>
            </button>
          </div>
        </aside>
      </main>
    </div>
  );
}
