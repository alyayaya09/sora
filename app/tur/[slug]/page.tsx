"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getDedicatedTour } from "../../../data/sora-content";
import LoveButton from "../../../components/LoveButton";
import { useLanguage } from "../../../contexts/LanguageContext";

interface TourPageProps {
  params?: {
    slug?: string;
  };
}

export default function TourDetailPage({ params }: TourPageProps) {
  const routerParams = useParams();
  const slug = (routerParams?.slug as string) || params?.slug || "songket-palembang";
  const { lang, t } = useLanguage();
  const tour = getDedicatedTour(slug, lang);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showToast, setShowToast] = useState<string | null>(null);

  const sectionIds = [
    "hero-section",
    "narasi-seksi-1",
    "narasi-seksi-2",
    "narasi-seksi-3",
    "konten-terkait",
  ];

  const [currentSection, setCurrentSection] = useState(0);
  const [isPointerActive, setIsPointerActive] = useState(false);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Observer animasi dinamis (kiri, kanan, fade in / fade out, zoom)
    const animElements = document.querySelectorAll(
      ".tur-anim-left, .tur-anim-right, .tur-anim-fade, .tur-anim-zoom"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -20px 0px" }
    );
    animElements.forEach((c) => observer.observe(c));

    const updateScrollState = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
      const scrollPos = window.scrollY;
      const effectivePos = scrollPos + window.innerHeight * 0.3;
      if (scrollPos <= 60) {
        setCurrentSection(0);
        return;
      }
      let activeIndex = 0;
      for (let i = 0; i < sectionIds.length; i++) {
        const el = document.getElementById(sectionIds[i]);
        if (el && effectivePos >= el.offsetTop) {
          activeIndex = i;
        }
      }
      setCurrentSection(activeIndex);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateScrollState);
    };
  }, []);

  // Idle auto-hide pointer tracking (muncul saat pointer digerakkan, sembunyi saat pointer diam)
  useEffect(() => {
    const handlePointerActivity = () => {
      setIsPointerActive(true);
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      idleTimerRef.current = setTimeout(() => {
        setIsPointerActive(false);
      }, 2500);
    };

    window.addEventListener("mousemove", handlePointerActivity, { passive: true });
    window.addEventListener("scroll", handlePointerActivity, { passive: true });
    window.addEventListener("touchstart", handlePointerActivity, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handlePointerActivity);
      window.removeEventListener("scroll", handlePointerActivity);
      window.removeEventListener("touchstart", handlePointerActivity);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
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
      triggerToast(t("Tautan disalin ke papan klip", "Link copied to clipboard"));
    }
  };

  const handleShare = async () => {
    const shareTitle = tour?.title ? `${tour.title} — SORA.Culture` : "SORA.Culture";
    const shareText = tour?.subtitle || t(
      "Jelajahi warisan seni dan budaya Sumatera Selatan di SORA!",
      "Explore the arts and cultural heritage of South Sumatra on SORA!"
    );
    const shareUrl = typeof window !== "undefined" ? window.location.href : "";

    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } catch (err: any) {
        if (err?.name !== "AbortError") {
          handleCopyLink();
        }
      }
    } else {
      const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
        `${shareTitle} - ${shareText}\n${shareUrl}`
      )}`;
      window.open(waUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="bg-[#0d0d0f] font-sans text-neutral-200 antialiased min-h-screen w-full selection:bg-rose-950 selection:text-rose-200 relative overflow-x-hidden pt-16">
      <style jsx global>{`
        .tur-anim-left {
          opacity: 0;
          transform: translateX(-50px);
          transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }
        .tur-anim-left.is-visible {
          opacity: 1;
          transform: translateX(0);
        }

        .tur-anim-right {
          opacity: 0;
          transform: translateX(50px);
          transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }
        .tur-anim-right.is-visible {
          opacity: 1;
          transform: translateX(0);
        }

        .tur-anim-fade {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }
        .tur-anim-fade.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .tur-anim-zoom {
          opacity: 0;
          transform: scale(0.94) translateY(24px);
          transition: opacity 0.95s cubic-bezier(0.16, 1, 0.3, 1), transform 0.95s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }
        .tur-anim-zoom.is-visible {
          opacity: 1;
          transform: scale(1) translateY(0);
        }

        .tur-delay-1 { transition-delay: 150ms; }
        .tur-delay-2 { transition-delay: 300ms; }
        .tur-delay-3 { transition-delay: 450ms; }
      `}</style>
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
            <div className="space-y-2 max-w-4xl tur-anim-fade">
              <h1 className="text-3xl sm:text-5xl md:text-5xl text-white font-medium leading-tight tracking-tight drop-shadow-lg">
                {tour.title}
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-neutral-300 font-normal max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                <span className="text-amber-400 font-medium italic">
                  {t("Kemilau Peradaban Sriwijaya ", "Splendor of Sriwijaya Civilization ")}
                </span>
                {tour.subtitle}
              </p>
            </div>

            {/* Action Pills (Simpan, Salin Tautan, Bagikan) matching LKONTEN.MD */}
            <div className="flex items-center justify-center gap-4 mx-auto pt-6 pb-2 tur-anim-fade tur-delay-1">
              <div className="relative group/tooltip flex items-center justify-center">
                <LoveButton
                  itemType="card"
                  itemRef={slug}
                  title={tour.title}
                  imageUrl={tour.heroImg}
                  creator={tour.subtitle}
                  sourceUrl={`/tur/${slug}`}
                  variant="rounded-2xl"
                />
                <div className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-md bg-[#1b1b1d]/90 border border-white/10 text-neutral-200 text-[10px] tracking-wide opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 backdrop-blur-md shadow-md z-20">
                  {t("Favorit", "Favorite")}
                </div>
              </div>

              <div className="relative group/tooltip flex items-center justify-center">
                <button
                  aria-label={t("Salin Tautan", "Copy Link")}
                  className="group inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/[0.05] border border-white/15 hover:border-white/50 text-white/80 hover:text-white backdrop-blur-md transition-all duration-300 shadow-sm focus:outline-none hover:-translate-y-0.5 hover:shadow-lg active:scale-95 hover:bg-white/10 cursor-pointer"
                  onClick={handleCopyLink}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px] text-white/80 transition-transform group-hover:scale-110 group-hover:text-white">
                    link
                  </span>
                </button>
                <div className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-md bg-[#1b1b1d]/90 border border-white/10 text-neutral-200 text-[10px] tracking-wide opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 backdrop-blur-md shadow-md z-20">
                  {t("Salin Tautan", "Copy Link")}
                </div>
              </div>

              <div className="relative group/tooltip flex items-center justify-center">
                <button
                  aria-label={t("Bagikan", "Share")}
                  className="group inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#af8d11]/20 hover:bg-[#af8d11]/15 border border-amber-400/30 text-amber-300 backdrop-blur-md transition-all duration-300 shadow-sm focus:outline-none hover:-translate-y-0.5 hover:shadow-lg active:scale-95 cursor-pointer"
                  onClick={handleShare}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px] text-amber-300 transition-transform group-hover:scale-110">
                    share
                  </span>
                </button>
                <div className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-md bg-[#1b1b1d]/90 border border-white/10 text-neutral-200 text-[10px] tracking-wide opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 backdrop-blur-md shadow-md z-20">
                  {t("Bagikan", "Share")}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Subtle Scroll-Down Indicator matching LKONTEN.MD */}
          <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center justify-center text-center gap-1.5 pb-2 shrink-0 tur-anim-fade tur-delay-2">
            <a
              className="inline-flex flex-col items-center text-neutral-400 hover:text-amber-300 transition-colors group cursor-pointer pt-2"
              href="#narasi-seksi-1"
            >
              <span className="text-[10px] sm:text-[11px] tracking-widest uppercase font-semibold text-white/70 group-hover:text-amber-300">
                {t("GULIR UNTUK MENELUSURI NARASI", "SCROLL TO EXPLORE THE NARRATIVE")}
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
          <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl text-left flex flex-col gap-4 drop-shadow-md tur-anim-left">
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
          <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl text-left flex flex-col gap-4 drop-shadow-md tur-anim-right">
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
          <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl text-left flex flex-col gap-4 drop-shadow-md tur-anim-left">
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
          className="min-h-screen w-full flex flex-col justify-between relative overflow-hidden pb-16"
          id="konten-terkait"
        >
          <section className="relative w-full flex-1 flex flex-col justify-center px-6 md:px-12 py-8 md:py-12 max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center text-center w-full mb-6 tur-anim-fade">
              <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl text-neutral-200 font-normal tracking-wide drop-shadow-md">
                {t("Jelajahi kategori terkait...", "Explore related category...")}
              </h2>
            </div>
            <div className="max-w-5xl md:max-w-6xl mx-auto w-full relative rounded-3xl overflow-hidden border border-amber-400/30 shadow-[0_20px_50px_rgba(0,0,0,0.4),0_0_40px_rgba(107,29,47,0.25)] min-h-[320px] md:min-h-[380px] flex items-center justify-center p-6 md:p-12 text-center group tur-anim-zoom tur-delay-1">
              <img
                alt={tour.relTitle}
                className="absolute inset-0 w-full h-full object-cover filter brightness-[0.85] contrast-[1.1] transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                src={tour.relImg}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0f]/80 via-[#6b1d2f]/25 to-black/60 pointer-events-none"></div>
              <div className="relative z-10 flex flex-col items-center justify-center max-w-3xl mx-auto">
                <h3 className="font-sans text-3xl md:text-4xl lg:text-5xl text-white font-normal md:font-medium tracking-normal mb-3 drop-shadow-md tur-anim-fade tur-delay-1">
                  {tour.relTitle}
                </h3>
                <p className="text-neutral-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-6 font-light drop-shadow-sm tur-anim-fade tur-delay-2">
                  {tour.relDesc}
                </p>
                <Link
                  href={tour.relLink}
                  className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 hover:scale-105 active:scale-95 text-white text-sm font-medium border border-white/20 backdrop-blur-md transition-all duration-300 shadow-md hover:shadow-[0_0_24px_rgba(251,191,36,0.3)] tur-anim-fade tur-delay-3"
                >
                  {t("Lihat Tema", "View Theme")}
                </Link>
              </div>
            </div>
          </section>
        </div>

        {/* ==========================================
             FLOATING MINIMALIST ARROW CONTROLS (EXACT LKONTEN.MD)
             ========================================== */}
        <aside
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-700 ease-in-out ${
            currentSection >= 1 && isPointerActive
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
          id="navControlsAside"
        >
          <div
            className="inline-flex items-center p-1.5 rounded-full bg-[#1b1b1d]/80 hover:bg-[#1b1b1d]/95 backdrop-blur-2xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.6)] transition-all duration-300 hover:border-amber-400/50"
            id="centerNavWidget"
          >
            <button
              aria-label={t("Seksi sebelumnya", "Previous section")}
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
              aria-label={t("Seksi berikutnya", "Next section")}
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
