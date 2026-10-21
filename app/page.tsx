"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getThemes } from "../data/sora-content";
import { useLanguage } from "../contexts/LanguageContext";

export default function HomePage() {
  const router = useRouter();
  const { lang, t } = useLanguage();
  const themes = getThemes(lang);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // 1. Dynamic Left / Right / Center Scroll Animation Observer matching BERANDA.MD
    const animElements = document.querySelectorAll(
      ".anim-left, .anim-right, .anim-center"
    );
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!prefersReducedMotion && "IntersectionObserver" in window) {
      const observerOptions = {
        root: null,
        rootMargin: "0px 0px -40px 0px",
        threshold: [0, 0.15, 0.85, 1.0],
      };

      const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          const rect = entry.boundingClientRect;

          if (entry.isIntersecting && entry.intersectionRatio > 0.08) {
            target.classList.remove("anim-out-bottom", "anim-out-top");
            target.classList.add("anim-in");
          } else {
            target.classList.remove("anim-in");
            if (rect.top < 0) {
              target.classList.add("anim-out-top");
              target.classList.remove("anim-out-bottom");
            } else {
              target.classList.add("anim-out-bottom");
              target.classList.remove("anim-out-top");
            }
          }
        });
      }, observerOptions);

      animElements.forEach((el) => scrollObserver.observe(el));
      return () => scrollObserver.disconnect();
    } else {
      animElements.forEach((el) => el.classList.add("anim-in"));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Baca preferensi mute user dari sessionStorage saat mount
  useEffect(() => {
    const saved = sessionStorage.getItem("sora-hero-muted");
    // Default muted = true (browser policy); hanya unmute jika user pernah pilih unmute
    const shouldMute = saved === null ? true : saved === "true";
    setIsMuted(shouldMute);
    if (videoRef.current) {
      videoRef.current.muted = shouldMute;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  // Auto-mute video saat hero keluar dari viewport, restore saat kembali terlihat
  useEffect(() => {
    const heroEl = document.getElementById("hero-ampera");
    if (!heroEl || !videoRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const video = videoRef.current;
        if (!video) return;
        if (!entry.isIntersecting) {
          // Hero tidak terlihat → mute (tapi jangan ubah sessionStorage)
          video.muted = true;
          setIsMuted(true);
        } else {
          // Hero terlihat kembali → kembalikan preferensi user
          const saved = sessionStorage.getItem("sora-hero-muted");
          const shouldMute = saved === null ? true : saved === "true";
          video.muted = shouldMute;
          setIsMuted(shouldMute);
          if (!shouldMute) {
            video.play().catch(() => {});
          }
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  // Cleanup: hanya mute audio, biarkan autoPlay menangani restart saat kembali ke halaman
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        try {
          videoRef.current.muted = true;
        } catch {}
      }
    };
  }, []);

  useEffect(() => {
    const container = document.getElementById("carousel-viewport");
    if (!container) return;
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      container.classList.add("is-dragging");
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    };
    const onMouseLeave = () => {
      isDown = false;
      container.classList.remove("is-dragging");
    };
    const onMouseUp = () => {
      isDown = false;
      container.classList.remove("is-dragging");
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5;
      container.scrollLeft = scrollLeft - walk;
    };

    container.addEventListener("mousedown", onMouseDown);
    container.addEventListener("mouseleave", onMouseLeave);
    container.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mousemove", onMouseMove);

    return () => {
      container.removeEventListener("mousedown", onMouseDown);
      container.removeEventListener("mouseleave", onMouseLeave);
      container.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mousemove", onMouseMove);
    };
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

  const handleVoiceSearch = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      triggerToast("Browser tidak mendukung pencarian suara");
      return;
    }
    try {
      const recognition = new SpeechRecognition();
      recognition.lang = "id-ID";
      recognition.interimResults = false;
      recognition.onstart = () => {
        setIsListening(true);
        triggerToast("Mendengarkan... Silakan ucapkan kata kunci budaya");
      };
      recognition.onresult = (e: any) => {
        const text = e.results[0][0].transcript;
        setSearchQuery(text);
        setIsListening(false);
        triggerToast(`Mencari: "${text}"`);
        if (text && text.trim()) {
          router.push(`/jelajahi?q=${encodeURIComponent(text.trim())}`);
        }
      };
      recognition.onerror = () => {
        setIsListening(false);
        triggerToast("Gagal mendeteksi suara");
      };
      recognition.onend = () => setIsListening(false);
      recognition.start();
    } catch {
      setIsListening(false);
      triggerToast("Pencarian suara belum dapat diakses");
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/jelajahi?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <div className="w-full flex flex-col justify-between selection:bg-cyan-500 selection:text-black">
      {/* ==========================================
           SECTION 1: HERO (EXACT SCREEN_5 CLEAN AMPERA)
           ========================================== */}
      <section
        className="relative min-h-screen h-screen w-full flex flex-col justify-end px-6 pb-8 overflow-hidden select-none"
        id="hero-ampera"
      >
        {/* Full Background Video: HERO.mp4 */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out"
            id="ampera-bg"
            src="/images/HERO.mp4"
            style={{
              transform: `scale(${1 + scrollY * 0.0004}) translateY(${scrollY * 0.25}px)`,
            }}
          />
        </div>

        {/* Bottom Hero Content: Prompt Bar & Scroll Guide */}
        <div className="relative z-10 max-w-4xl mx-auto w-full flex flex-col items-center gap-4 mb-2">
          {/* AI Search Prompt Bar — Clean Transparent Glass Style (matching Jelajahi) */}
          <form
            onSubmit={handleSearchSubmit}
            className="w-full flex items-center justify-between gap-3 px-5 py-3 rounded-full bg-white/[0.05] border border-white/15 shadow-xl backdrop-blur-2xl hover:border-white/30 transition-all duration-300 group"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <span className="p-1.5 rounded-full bg-white/[0.08] text-white/60 group-hover:text-white transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
                </svg>
              </span>
              <input
                className="bg-transparent border-none outline-none text-sm md:text-base text-white placeholder-white/40 w-full focus:placeholder-white/20 focus:ring-0 font-medium"
                placeholder={t("Tanya apa saja tentang seni & budaya Sumsel...", "Ask anything about South Sumatra arts & culture...")}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="p-1 rounded-full hover:bg-white/10 text-white/40 hover:text-white transition-colors shrink-0 cursor-pointer"
                  title="Hapus pencarian"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            <div className="flex items-center gap-2 sm:gap-2.5 text-white/70">
              <button
                className={`hover:text-white p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer ${
                  isListening ? "bg-red-500/80 text-white animate-pulse" : ""
                }`}
                title="Pencarian Suara"
                type="button"
                onClick={handleVoiceSearch}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
              </button>
              <button
                className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-all transform active:scale-95 border border-white/20 shadow-md cursor-pointer"
                title={t("Cari Budaya", "Search Culture")}
                type="submit"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                  ></path>
                </svg>
              </button>
            </div>
          </form>

          {/* Scroll Down Indicator Guide matching BERANDA.MD */}
          <a
            className="inline-flex flex-col items-center gap-1.5 text-xs text-white/70 hover:text-white font-medium tracking-wider uppercase transition-colors group mt-1 cursor-pointer"
            href="#showcase"
          >
            <span className="text-[11px] font-semibold tracking-widest text-[#fbc270]/90">
              SCROLL DOWN TO EXPLORE
            </span>
            <div className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center p-1 group-hover:border-blue-400 transition-colors">
              <div className="w-1.5 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            </div>
          </a>
        </div>

        {/* Audio Mute/Unmute Floating Button matching BERANDA.MD */}
        <div className="absolute bottom-6 left-6 md:left-10 z-20">
          <button
            className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/75 transition-all shadow-lg cursor-pointer"
            id="audio-toggle-btn"
            title="Mute/Unmute audio"
            type="button"
            onClick={() => {
              const nextMuted = !isMuted;
              setIsMuted(nextMuted);
              // Simpan preferensi user ke sessionStorage
              sessionStorage.setItem("sora-hero-muted", String(nextMuted));
              if (videoRef.current) {
                videoRef.current.muted = nextMuted;
                if (!nextMuted) {
                  videoRef.current.play().catch(() => {});
                }
              }
              triggerToast(nextMuted ? t("Audio dibisukan", "Audio muted") : t("Audio video diaktifkan", "Video audio enabled"));
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
              {isMuted ? (
                <path
                  d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
              ) : (
                <path
                  d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
              )}
            </svg>
          </button>
        </div>
      </section>

      {/* ==========================================
           SECTION 2: TEMPLATE SHOWCASE (EXACT BERANDA.MD MARQUEE 8 CARDS)
           ========================================== */}
      <section
        className="relative min-h-screen py-16 flex flex-col justify-center items-center transition-all overflow-hidden bg-transparent"
        id="showcase"
      >
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
              {t("Mulai dari satu tema.", "Begin with one theme.")}
            </h2>
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold italic text-white drop-shadow-md">
              <span className="font-normal font-sans not-italic text-white/95">{t("Jelajahi", "Explore")}</span>{" "}
              {t("Seluruh Budaya Sumsel", "All South Sumatra Cultures")}
            </p>
            <div className="flex items-center justify-center gap-2 mt-4 text-xs tracking-wider text-white/60">
              <svg className="w-3.5 h-3.5 text-[#fbc270]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
              <span>{t("Gerakan otomatis ke kanan • Arahkan kursor atau drag untuk menggeser", "Auto-scroll rightward • Hover or drag to navigate")}</span>
            </div>
          </div>
        </div>

        {/* Continuous Rightward Marquee Wrapper with Fixed Viewport Edge Shadows */}
        <div
          className="relative w-full max-w-full overflow-hidden py-4 select-none"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 80px, black calc(100% - 80px), transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 80px, black calc(100% - 80px), transparent 100%)",
          }}
        >
          {/* Left Gradient Shadow Overlay - Permanently Fixed to Left Edge */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 sm:w-36 md:w-48 z-30 bg-gradient-to-r from-[#140e13] via-[#1c1013]/70 to-transparent"
          />

          {/* Right Gradient Shadow Overlay - Permanently Fixed to Right Edge */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 sm:w-36 md:w-48 z-30 bg-gradient-to-l from-[#140e13] via-[#1c1013]/70 to-transparent"
          />

          {/* Marquee Viewport Container */}
          <div
            className="marquee-container w-full overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing py-2"
            id="carousel-viewport"
          >
            <div className="marquee-track flex gap-5 sm:gap-6 px-4" id="marquee-track">
              {/* SET 1: 8 Themes with EXACT BERANDA.MD CARD CLASSES */}
              {themes.map((theme) => (
                <Link
                  key={`set1-${theme.slug}`}
                  href={`/tema/${theme.slug}`}
                  className="w-[230px] sm:w-[260px] md:w-[280px] shrink-0 group relative rounded-2xl overflow-hidden aspect-[9/16] glass-card shadow-2xl transition-all duration-500 transform hover:-translate-y-2 p-5 cursor-pointer flex flex-col justify-between block"
                >
                  <img
                    alt={theme.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100 pointer-events-none"
                    src={theme.image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70 pointer-events-none z-0"></div>
                  <div className="relative z-10">
                    <span className="text-sm font-semibold tracking-wide text-white drop-shadow-md">
                      {theme.title}
                    </span>
                  </div>
                  <div className="relative z-10 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs text-[#fbc270] font-medium flex items-center gap-1">
                      {theme.cta}
                    </span>
                  </div>
                </Link>
              ))}

              {/* SET 2: 8 Themes Duplicate for Seamless Infinite Marquee Loop */}
              {themes.map((theme) => (
                <Link
                  key={`set2-${theme.slug}`}
                  href={`/tema/${theme.slug}`}
                  aria-hidden="true"
                  className="w-[230px] sm:w-[260px] md:w-[280px] shrink-0 group relative rounded-2xl overflow-hidden aspect-[9/16] glass-card shadow-2xl transition-all duration-500 transform hover:-translate-y-2 p-5 cursor-pointer flex flex-col justify-between block"
                >
                  <img
                    alt={theme.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100 pointer-events-none"
                    src={theme.image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70 pointer-events-none z-0"></div>
                  <div className="relative z-10">
                    <span className="text-sm font-semibold tracking-wide text-white drop-shadow-md">
                      {theme.title}
                    </span>
                  </div>
                  <div className="relative z-10 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs text-[#fbc270] font-medium flex items-center gap-1">
                      {theme.cta}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
           SECTION 3: GALERI WAKTU FAVORIT (EXACT BERANDA.MD 3-COLUMN ASYMMETRIC)
           ========================================== */}
      <section
        className="w-full min-h-screen py-16 px-4 md:px-8 flex flex-col items-center justify-center select-none overflow-hidden bg-transparent"
        id="galeri-waktu"
      >
        <header className="w-full text-center mb-10 anim-center anim-out-bottom" data-purpose="page-header">
          <h1 className="text-3xl sm:text-4xl tracking-normal font-normal text-white heading-shadow">
            {t("Apa waktu favoritmu di Palembang?", "What is your favorite time in Palembang?")}
          </h1>
        </header>

        <main className="w-full max-w-[1200px]" data-purpose="gallery-grid-container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch h-auto md:h-[580px]">
            {/* Left Column: Tall Card (Pagi di Tepian Musi) -> Meluncur dari Kiri */}
            <Link
              href="/tur/pagi-musi"
              aria-label="Pagi di Tepian Musi"
              className="anim-left gallery-card md:col-span-3 h-[420px] md:h-full group anim-out-bottom block"
            >
              <img
                alt="Pagi di Tepian Musi"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src="/images/pagi_tepian_musi.jpg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-6 text-white pointer-events-none">
                <h2 className="text-xl font-bold text-shadow-custom leading-tight mb-1">
                  {t("Pagi di Tepian Musi", "Morning on the Musi Riverbank")}
                </h2>
                <p className="text-xs text-gray-200 text-shadow-custom font-normal leading-relaxed opacity-95">
                  {t("Aroma pempek hangat dan denyut perahu ketek di fajar hari", "Aroma of warm pempek and rhythm of ketek riverboats at dawn")}
                </p>
              </div>
            </Link>

            {/* Middle Column: Stacked Cards (Senja [Kiri] & Malam [Kanan]) */}
            <div className="gallery-card-group md:col-span-4 flex flex-col gap-5 h-full" data-purpose="middle-column-cards">
              {/* Middle Top Card: Senja di Jembatan Ampera -> Meluncur dari Kiri */}
              <Link
                href="/tur/senja-ampera"
                aria-label="Senja di Jembatan Ampera"
                className="anim-left delay-100 gallery-card flex-1 min-h-[220px] group anim-out-bottom block"
              >
                <img
                  alt="Senja di Jembatan Ampera"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="/images/ampera_hero.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-6 text-white pointer-events-none">
                  <h2 className="text-xl font-bold text-shadow-custom leading-tight mb-1">
                    {t("Senja di Jembatan Ampera", "Twilight at Ampera Bridge")}
                  </h2>
                  <p className="text-xs text-gray-200 text-shadow-custom font-normal leading-relaxed opacity-95">
                    {t("Langit oranye keemasan merona di atas aliran Musi", "Golden crimson skies glowing above the Musi currents")}
                  </p>
                </div>
              </Link>

              {/* Middle Bottom Card: Malam di Benteng Kuto Besak -> Meluncur dari Kanan */}
              <Link
                href="/tur/malam-kuto-besak"
                aria-label="Malam di Benteng Kuto Besak"
                className="anim-right delay-150 gallery-card flex-1 min-h-[220px] group anim-out-bottom block"
              >
                <img
                  alt="Malam di Benteng Kuto Besak"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="/images/benteng_kuto_besak_malam.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-6 text-white pointer-events-none">
                  <h2 className="text-xl font-bold text-shadow-custom leading-tight mb-1">
                    {t("Malam di Benteng Kuto Besak", "Night at Kuto Besak Fortress")}
                  </h2>
                  <p className="text-xs text-gray-200 text-shadow-custom font-normal leading-relaxed opacity-95">
                    {t("Lampu kota dan siluet benteng peninggalan Sultan SMB I", "City lights and silhouettes of Sultan Mahmud Badaruddin I's fortress")}
                  </p>
                </div>
              </Link>
            </div>

            {/* Right Column: Large Card (Fajar di Sungai Musi) -> Meluncur dari Kanan */}
            <Link
              href="/tur/fajar-musi"
              aria-label="Fajar di Sungai Musi"
              className="anim-right delay-200 gallery-card md:col-span-5 h-[420px] md:h-full group anim-out-bottom block"
            >
              <img
                alt="Fajar di Sungai Musi"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src="/images/fajar_sungai_musi.jpg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-6 text-white pointer-events-none">
                <h2 className="text-xl font-bold text-shadow-custom leading-tight mb-1">
                  {t("Fajar di Sungai Musi", "Dawn on the Musi River")}
                </h2>
                <p className="text-xs text-gray-200 text-shadow-custom font-normal leading-relaxed opacity-95">
                  {t("Rumah rakit terapung menyongsong semilir angin sungai purba", "Floating raft houses meeting the gentle breeze of the ancient river")}
                </p>
              </div>
            </Link>
          </div>
        </main>
      </section>

      {/* ==========================================
           SECTION 4: BANNER PAKAIAN ADAT PALEMBANG (ANIMASI DARI KIRI)
           ========================================== */}
      <section
        className="relative w-full min-h-screen h-screen overflow-hidden select-none flex flex-col justify-end"
        id="banner-adat-palembang"
      >
        <img
          alt="Pakaian Adat Palembang Aesan Gede"
          className="absolute inset-0 w-full h-full object-cover object-center transform scale-100 transition-transform duration-700 ease-out"
          src="/images/aesan_gede_banner.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c1013] via-black/40 to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1c1013]/90 via-black/40 to-transparent pointer-events-none"></div>

        <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-end pb-12 md:pb-16">
          <div className="anim-left max-w-2xl flex flex-col items-start gap-4 anim-out-bottom">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#fbc270] drop-shadow">
              {t("Warisan Budaya Nusantara", "Cultural Heritage of the Archipelago")}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white heading-shadow leading-tight">
              {t("Pakaian Adat Palembang", "Traditional Palembang Attire")}
            </h2>
            <p className="text-sm md:text-base text-gray-200 text-shadow-custom font-normal leading-relaxed opacity-95 max-w-xl">
              {t(
                "Keanggunan busana adat Aesan Gede dan kain songket berlapis emas khas Palembang, Sumatra Selatan.",
                "The supreme elegance of Aesan Gede royal attire and gold-threaded Songket textiles of Palembang, South Sumatra."
              )}
            </p>
            <Link
              href="/tur/songket-palembang"
              className="mt-2 bg-[#1a73e8] hover:bg-[#1557b0] text-white font-bold px-7 py-3 rounded-full shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transform hover:-translate-y-0.5 active:translate-y-0 transition-all text-sm tracking-wide inline-flex items-center gap-2"
            >
              <span>{t("Masuklah ke dalam", "Step inside")}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ==========================================
           SECTION 5: GALERI 5 KARTU (EXACT BERANDA.MD 2+2+1 GRID)
           ========================================== */}
      <section
        className="w-full min-h-screen py-16 px-4 md:px-8 flex flex-col items-center justify-center select-none relative overflow-hidden bg-transparent"
        id="galeri-surealisme"
      >
        <header className="w-full text-center mb-10 anim-center anim-out-bottom" data-purpose="page-header">
          <h2 className="text-3xl sm:text-4xl tracking-normal font-normal text-white heading-shadow">
            {t("Kemilau Kain Palembang", "Luster of Palembang Woven Textiles")}
          </h2>
        </header>

        <main className="w-full max-w-[1200px]" data-purpose="surealisme-grid-container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 w-full h-auto md:h-[552px]" data-purpose="cards-grid">
            {/* Column 1: Left (Songket Lepus Collection) -> Meluncur dari Kiri */}
            <div className="anim-left col-span-1 md:col-span-4 flex flex-col gap-5 h-[500px] md:h-full anim-out-bottom">
              {/* Top Card: Songket Lepus Emas */}
              <Link
                href="/tur/songket-palembang"
                className="relative flex-1 rounded-2xl overflow-hidden shadow-sm group cursor-pointer bg-neutral-900 border border-white/10 hover:border-[#fbc270]/50 transition-all duration-300 block"
              >
                <img
                  alt={t("Songket Lepus Emas", "Gold Lepus Songket")}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  src="/images/songket_lepus.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white pointer-events-none">
                  <h3 className="text-[1.18rem] font-bold leading-snug tracking-normal text-white drop-shadow-sm">
                    {t("Songket Lepus Emas", "Gold Lepus Songket")}
                  </h3>
                  <p className="text-[13px] text-neutral-200 font-normal mt-0.5">
                    {t("Kasta tertinggi tenun Palembang", "The highest tier of Palembang weaving")}
                  </p>
                </div>
              </Link>

              {/* Bottom Card: Sehari bersama Penenun Songket */}
              <Link
                href="/tur/penenun-songket"
                className="relative flex-1 rounded-2xl overflow-hidden shadow-sm group cursor-pointer bg-neutral-900 border border-white/10 hover:border-[#fbc270]/50 transition-all duration-300 block"
              >
                <img
                  alt={t("Sehari bersama Penenun Songket", "A Day with Songket Weavers")}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  src="/images/menenun_songket.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white pointer-events-none">
                  <h3 className="text-[1.12rem] font-bold leading-snug tracking-normal text-white drop-shadow-sm">
                    {t("Sehari bersama Penenun Songket", "A Day with Songket Weavers")}
                  </h3>
                  <p className="text-[12px] text-neutral-200 font-normal mt-0.5">
                    {t("Kisah ketelitian di balik bilah gedogan kayu", "The story of meticulous devotion behind wooden looms")}
                  </p>
                </div>
              </Link>
            </div>

            {/* Column 2: Middle (Kain Jumputan & Motif) -> Meluncur dari Kanan (stagger) */}
            <div className="anim-right delay-100 col-span-1 md:col-span-4 flex flex-col gap-5 h-[500px] md:h-full anim-out-bottom">
              {/* Top Card: Kain Jumputan Pelangi */}
              <Link
                href="/tur/kain-jumputan"
                className="relative flex-1 rounded-2xl overflow-hidden shadow-sm group cursor-pointer bg-neutral-900 border border-white/10 hover:border-[#fbc270]/50 transition-all duration-300 block"
              >
                <img
                  alt={t("Kain Jumputan Pelangi", "Rainbow Jumputan Textile")}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  src="/images/kain_jumputan.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white pointer-events-none">
                  <h3 className="text-[1.18rem] font-bold leading-snug tracking-normal text-white drop-shadow-sm">
                    {t("Kain Jumputan Pelangi", "Rainbow Jumputan Textile")}
                  </h3>
                  <p className="text-[13px] text-neutral-200 font-normal mt-0.5">
                    {t("Harmoni celup ikat sutra khas Palembang", "Harmony of Palembang silk tie-dye craft")}
                  </p>
                </div>
              </Link>

              {/* Bottom Card: Motif Bunga Mawar & Rebung */}
              <Link
                href="/tur/motif-bunga-mawar-rebung"
                className="relative flex-1 rounded-2xl overflow-hidden shadow-sm group cursor-pointer bg-neutral-900 border border-white/10 hover:border-[#fbc270]/50 transition-all duration-300 block"
              >
                <img
                  alt={t("Motif Bunga Mawar & Rebung", "Rose & Bamboo Shoot Motifs")}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  src="/images/batik_palembang.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white pointer-events-none">
                  <h3 className="text-[1.12rem] font-bold leading-snug tracking-normal text-white drop-shadow-sm">
                    {t("Motif Bunga Mawar & Rebung", "Rose & Bamboo Shoot Motifs")}
                  </h3>
                  <p className="text-[12.5px] text-neutral-200 font-normal mt-0.5">
                    {t("Simbol tolak bala dan aspirasi spiritual", "Symbols of spiritual aspiration and warding misfortune")}
                  </p>
                </div>
              </Link>
            </div>

            {/* Column 3: Right (Aesan Gede) -> Meluncur dari Kanan (stagger lebih lanjut) */}
            <div className="anim-right delay-200 col-span-1 md:col-span-4 h-[420px] md:h-full anim-out-bottom">
              <Link
                href="/tur/aesan-gede"
                className="relative h-full rounded-2xl overflow-hidden shadow-sm group cursor-pointer bg-neutral-900 border border-white/10 hover:border-[#fbc270]/50 transition-all duration-300 block"
              >
                <img
                  alt={t("Aesan Gede Busana Kebesaran", "Aesan Gede: Imperial Ceremonial Attire")}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  src="/images/aesan_gede_banner.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 via-40% to-transparent pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white pointer-events-none">
                  <h3 className="text-[1.18rem] font-bold leading-snug tracking-normal text-white drop-shadow-sm">
                    {t("Aesan Gede: Busana Kebesaran", "Aesan Gede: Imperial Ceremonial Attire")}
                  </h3>
                  <p className="text-[13px] text-neutral-200 font-normal mt-0.5">
                    {t("Mahkota emas dan kemegahan Sriwijaya", "Golden crown and the majesty of Sriwijaya")}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </main>
      </section>

      {/* ==========================================
           SECTION 6: TERUSLAH MENJELAJAH (EXACT BERANDA.MD 4 TALL CARDS)
           ========================================== */}
      <section
        className="w-full min-h-screen py-20 px-4 md:px-8 flex flex-col items-center justify-center select-none relative overflow-hidden bg-transparent"
        id="teruslah-menjelajah"
      >
        <div className="w-full max-w-[1240px] mx-auto">
          {/* Header Title & Subtitle */}
          <div className="anim-center flex flex-col items-center justify-center text-center relative mb-8 anim-out-bottom">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl md:text-[40px] tracking-tight font-normal text-white heading-shadow mb-2 leading-tight">
                {t("Teruslah menjelajah...", "Keep exploring...")}
              </h2>
              <p className="text-sm sm:text-base text-gray-300 text-shadow-custom font-normal opacity-95">
                {t("Selami budaya dari seluruh Sumatera Selatan", "Immerse in cultures from all across South Sumatra")}
              </p>
            </div>
          </div>

          {/* 4-Column Exploration Cards Grid matching BERANDA.MD */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Tari Gending Sriwijaya (Meluncur dari KIRI) */}
            <article className="anim-left gallery-card group h-[480px] rounded-[24px] overflow-hidden relative cursor-pointer border border-white/10 hover:border-[#fbc270]/60 transition-all duration-300 shadow-2xl bg-neutral-900 flex flex-col justify-end anim-out-bottom">
              <img
                alt={t("Tari Gending Sriwijaya", "Gending Sriwijaya Dance")}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                src="/images/tari_gending.jpg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none"></div>
              <div className="relative z-10 p-6 flex flex-col justify-end text-white items-center text-center">
                <h3 className="text-xl font-bold text-shadow-custom leading-snug mb-1 text-white">
                  {t("Tari Gending Sriwijaya", "Gending Sriwijaya Dance")}
                </h3>
                <p className="text-xs text-gray-200 text-shadow-custom font-normal leading-relaxed opacity-90 line-clamp-2 mb-4">
                  {t(
                    "Tepak sekapur sirih dan lentiknya kuku emas penyambut tamu agung.",
                    "The ceremonial betel box and curved golden nails welcoming honored guests."
                  )}
                </p>
                <Link
                  href="/tur/tari-gending-sriwijaya"
                  className="w-fit px-5 py-2 rounded-full border border-white/70 hover:border-white text-white hover:bg-white/10 text-xs font-semibold tracking-wide transition-all shadow-sm"
                >
                  {t("Jelajahi", "Explore")}
                </Link>
              </div>
            </article>

            {/* Card 2: Rumah Limas (Meluncur dari KANAN) */}
            <article className="anim-right delay-100 gallery-card group h-[480px] rounded-[24px] overflow-hidden relative cursor-pointer border border-white/10 hover:border-[#fbc270]/60 transition-all duration-300 shadow-2xl bg-neutral-900 flex flex-col justify-end anim-out-bottom">
              <img
                alt={t("Rumah Limas Palembang", "Palembang Limas House")}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                src="/images/rumah_limas.jpg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none"></div>
              <div className="relative z-10 p-6 flex flex-col justify-end text-white items-center text-center">
                <h3 className="text-xl font-bold text-shadow-custom leading-snug mb-1 text-white">
                  {t("Rumah Limas Palembang", "Palembang Limas House")}
                </h3>
                <p className="text-xs text-gray-200 text-shadow-custom font-normal leading-relaxed opacity-90 line-clamp-2 mb-4">
                  {t(
                    "Falsafah bengkilas bertingkat dan pasak kayu unglen tahan gempa.",
                    "Tiered floor philosophy and earthquake-resistant unglen timber joinery."
                  )}
                </p>
                <Link
                  href="/tur/rumah-limas"
                  className="w-fit px-5 py-2 rounded-full border border-white/70 hover:border-white text-white hover:bg-white/10 text-xs font-semibold tracking-wide transition-all shadow-sm"
                >
                  {t("Jelajahi", "Explore")}
                </Link>
              </div>
            </article>

            {/* Card 3: Kerajaan Sriwijaya (Meluncur dari KIRI) */}
            <article className="anim-left delay-200 gallery-card group h-[480px] rounded-[24px] overflow-hidden relative cursor-pointer border border-white/10 hover:border-[#fbc270]/60 transition-all duration-300 shadow-2xl bg-neutral-900 flex flex-col justify-end anim-out-bottom">
              <img
                alt={t("Kerajaan Sriwijaya", "Sriwijaya Empire")}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                src="/images/aksara_ulu.jpg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none"></div>
              <div className="relative z-10 p-6 flex flex-col justify-end text-white items-center text-center">
                <h3 className="text-xl font-bold text-shadow-custom leading-snug mb-1 text-white">
                  {t("Kerajaan Sriwijaya", "Sriwijaya Empire")}
                </h3>
                <p className="text-xs text-gray-200 text-shadow-custom font-normal leading-relaxed opacity-90 line-clamp-2 mb-4">
                  {t(
                    "Prasasti Kedukan Bukit dan kekuasaan maritim penguasa Selat Malaka.",
                    "Kedukan Bukit Inscription and maritime thalassocracy over the Malacca Strait."
                  )}
                </p>
                <Link
                  href="/tur/kerajaan-sriwijaya"
                  className="w-fit px-5 py-2 rounded-full border border-white/70 hover:border-white text-white hover:bg-white/10 text-xs font-semibold tracking-wide transition-all shadow-sm"
                >
                  {t("Jelajahi", "Explore")}
                </Link>
              </div>
            </article>

            {/* Card 4: Festival Perahu Bidar (Meluncur dari KANAN) */}
            <article className="anim-right delay-300 gallery-card group h-[480px] rounded-[24px] overflow-hidden relative cursor-pointer border border-white/10 hover:border-[#fbc270]/60 transition-all duration-300 shadow-2xl bg-neutral-900 flex flex-col justify-end anim-out-bottom">
              <img
                alt={t("Festival Perahu Bidar", "Bidar Boat Race Festival")}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                src="/images/perahu_bidar.jpg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none"></div>
              <div className="relative z-10 p-6 flex flex-col justify-end text-white items-center text-center">
                <h3 className="text-xl font-bold text-shadow-custom leading-snug mb-1 text-white">
                  {t("Festival Perahu Bidar", "Bidar Boat Race Festival")}
                </h3>
                <p className="text-xs text-gray-200 text-shadow-custom font-normal leading-relaxed opacity-90 line-clamp-2 mb-4">
                  {t(
                    "Ketangkasan 55 pendayung beradu cepat di atas gelombang Sungai Musi.",
                    "Prowess of 55 rowers racing across the waves of the Musi River."
                  )}
                </p>
                <Link
                  href="/tur/perahu-bidar"
                  className="w-fit px-5 py-2 rounded-full border border-white/70 hover:border-white text-white hover:bg-white/10 text-xs font-semibold tracking-wide transition-all shadow-sm"
                >
                  {t("Jelajahi", "Explore")}
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ==========================================
           SECTION 7: TEBAK KARYA SENI (EXACT BERANDA.MD 12-COLUMN EDGE-TO-EDGE MOSAIC)
           ========================================== */}
      <section
        className="w-full py-12 px-0 flex flex-col items-center justify-center select-none relative overflow-hidden bg-transparent"
        id="tebak-karya-seni"
      >
        <div className="w-full relative px-2 md:px-6" data-purpose="mosaic-board">
          <div className="w-full bg-[#521b0e] p-[2px] shadow-2xl overflow-hidden rounded-md border border-black/30">
            <div className="grid grid-cols-12 gap-[2px] h-[520px] md:h-[600px] w-full">
              {/* LEFT REGION (Cols 1-5) */}
              <div className="anim-left col-span-1 flex flex-col gap-[2px] h-full anim-out-bottom">
                <div className="mosaic-tile h-[48%]">
                  <img alt="Songket Lepus Emas" className="object-[25%_60%]" src="/images/songket_lepus.jpg" />
                </div>
                <div className="mosaic-tile h-[52%]">
                  <img alt="Motif Pucuk Rebung" className="object-center" src="/images/aesan_paksangko.jpg" />
                </div>
              </div>

              <div className="anim-left delay-100 col-span-2 flex flex-col gap-[2px] h-full anim-out-bottom">
                <div className="mosaic-tile h-[60%]">
                  <img alt="Aesan Gede Pengantin" className="object-[45%_22%]" src="/images/aesan_gede_banner.jpg" />
                </div>
                <div className="mosaic-tile h-[40%]">
                  <img alt="Pending Emas" className="object-bottom" src="/images/aesan_gede_banner_1792383363369.jpg" />
                </div>
              </div>

              <div className="anim-left delay-150 col-span-2 flex flex-col gap-[2px] h-full anim-out-bottom">
                <div className="mosaic-tile h-[60%]">
                  <img alt="Tari Tanggai Kuku Emas" className="object-[42%_50%]" src="/images/tari_gending.jpg" />
                </div>
                <div className="mosaic-tile h-[40%]">
                  <img alt="Tepak Sekapur Sirih" className="object-center" src="/images/tari_tanggai.jpg" />
                </div>
              </div>

              {/* CENTER REGION: TERRACOTTA PHOTO COLLECTION CARD (Cols 6-8) */}
              <div className="anim-center delay-100 col-span-3 flex flex-col gap-[2px] h-full anim-out-bottom">
                <section
                  aria-label="Koleksi Foto dan Ragam Budaya Sumatera Selatan"
                  className="bg-[#bf4320] h-[60%] flex flex-col justify-center px-6 sm:px-8 md:px-10 py-6 relative shadow-inner select-none"
                  data-purpose="photo-collection-card"
                >
                  <h2 className="text-white text-2xl sm:text-[27px] md:text-[30px] font-bold leading-[1.25] tracking-tight mb-3">
                    {t("Koleksi Foto & Ragam Budaya", "Photo Collections & Cultural Diversity")}
                  </h2>
                  <p className="text-white/90 text-sm sm:text-base font-normal leading-relaxed">
                    {t(
                      "Kumpulan dokumentasi foto dan mahakarya warisan kebudayaan Sumatera Selatan dalam susunan kolase.",
                      "Curated photo documentation and masterpieces of South Sumatra cultural heritage in a mosaic layout."
                    )}
                  </p>
                </section>

                <div className="mosaic-tile h-[40%]">
                  <img alt="Lantai Ukir Kayu Unglen" className="object-[50%_65%]" src="/images/rumah_limas.jpg" />
                </div>
              </div>

              {/* RIGHT REGION (Cols 9-12) */}
              <div className="anim-right delay-150 col-span-2 flex flex-col gap-[2px] h-full anim-out-bottom">
                <div className="mosaic-tile h-[60%]">
                  <img alt="Pempek Cuko Pekat" className="object-[58%_35%]" src="/images/pempek_palembang.jpg" />
                </div>
                <div className="mosaic-tile h-[40%]">
                  <img alt="Aksara Ulu Kuno" className="object-center" src="/images/aksara_ulu.jpg" />
                </div>
              </div>

              <div className="anim-right delay-200 col-span-1 flex flex-col gap-[2px] h-full anim-out-bottom">
                <div className="mosaic-tile h-[35%]">
                  <img alt="Batu Prasasti" className="object-center" src="/images/prasasti_kedukan_bukit.jpg" />
                </div>
                <div className="mosaic-tile h-[30%]">
                  <img alt="Bilah Bambu Ulu" className="object-center" src="/images/aksara_ulu_1792383445918.jpg" />
                </div>
                <div className="mosaic-tile h-[35%]">
                  <img alt="Jembatan Ampera" className="object-center" src="/images/ampera_hero.jpg" />
                </div>
              </div>

              <div className="anim-right delay-250 col-span-1 flex flex-col gap-[2px] h-full anim-out-bottom">
                <div className="mosaic-tile h-[50%]">
                  <img alt="Kelim Songket Lepus" className="object-[80%_40%]" src="/images/songket_lepus_1792383379080.jpg" />
                </div>
                <div className="mosaic-tile h-[50%]">
                  <img alt="Simbar Atap Limas" className="object-center" src="/images/rumah_limas.jpg" />
                </div>
              </div>
            </div>
          </div>

          <div className="anim-center delay-100 w-full flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 mt-3 px-2 anim-out-bottom">
            <div className="flex items-center space-x-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#bf4320]"></span>
              <span className="font-medium text-white/80">
                {t("Koleksi Foto & Dokumentasi Budaya SORA Arts & Culture", "Photo Collection & Cultural Documentation SORA Arts & Culture")}
              </span>
            </div>
            <div className="italic text-white/50 text-[11px] sm:text-xs mt-1 sm:mt-0">
              {t("Dokumentasi visual ragam seni, arsitektur, dan tradisi Sumatera Selatan", "Visual documentation of the arts, architecture, and traditions of South Sumatra")}
            </div>
          </div>
        </div>
      </section>

      {/* Answer Modal matching BERANDA.MD */}
      {isModalOpen && (
        <div
          aria-labelledby="modal-title"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity duration-300"
          role="dialog"
        >
          <div className="bg-[#24130c] border border-[#bf4320]/60 text-white rounded-2xl shadow-2xl max-w-lg w-full p-6 md:p-8 relative">
            <button
              aria-label="Tutup jendela"
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              onClick={() => setIsModalOpen(false)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </button>
            <span className="inline-block uppercase tracking-wider text-xs font-bold text-[#fbc270] bg-[#bf4320]/30 px-3 py-1 rounded-full mb-3">
              Jawaban Kuis Budaya
            </span>
            <h3 className="text-2xl font-bold mb-2 text-white" id="modal-title">
              Kain Songket Lepus Emas
            </h3>
            <p className="text-sm font-medium text-[#fbc270]/90 mb-4 italic">
              (Ratu Kain Tenun) — Warisan Luhur Kesultanan Palembang Darussalam
            </p>
            <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
              Kain tenun legendaris ini disulam dengan benang emas murni pintalan cabutan tanpa celah di atas sutra marun, melambangkan kemakmuran, martabat, dan keagungan peradaban maritim Sriwijaya di tepian Sungai Musi.
            </p>
            <div className="flex items-center justify-end space-x-3">
              <button
                className="bg-[#bf4320] hover:bg-[#a53717] text-white text-sm font-semibold px-6 py-2.5 rounded-full shadow hover:shadow-lg transition-all cursor-pointer"
                onClick={() => setIsModalOpen(false)}
              >
                Tutup &amp; Jelajahi Lagi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
