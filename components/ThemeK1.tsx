"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Theme } from "../data/sora-content";
import LoveButton from "./LoveButton";

interface ThemeK1Props {
  theme: Theme;
}

export default function ThemeK1({ theme }: ThemeK1Props) {
  useEffect(() => {
    // Carousel Hover & Sticky Active State Interactivity matching K1.MD
    const itemWrappers = document.querySelectorAll(
      "#batik-carousel-container .carousel-card-item"
    );
    let currentActiveWrapper = itemWrappers[2]; // Default active: Card 3

    function setActiveCard(targetWrapper: Element) {
      if (!targetWrapper || currentActiveWrapper === targetWrapper) return;

      // Nonaktifkan kartu aktif sebelumnya
      if (currentActiveWrapper) {
        const prevCard = currentActiveWrapper.querySelector(".interactive-card");
        currentActiveWrapper.classList.remove("is-active-wrapper");
        currentActiveWrapper.classList.add("is-inactive-wrapper");
        if (prevCard) {
          prevCard.classList.remove("is-active", "ring-2", "ring-amber-400/50");
          prevCard.classList.add("is-inactive");
        }
      }

      // Aktifkan kartu baru yang sedang di-hover
      currentActiveWrapper = targetWrapper;
      const newCard = targetWrapper.querySelector(".interactive-card");
      targetWrapper.classList.remove("is-inactive-wrapper");
      targetWrapper.classList.add("is-active-wrapper");
      if (newCard) {
        newCard.classList.remove("is-inactive");
        newCard.classList.add("is-active", "ring-2", "ring-amber-400/50");
      }
    }

    const mouseEnterCleanups: Array<() => void> = [];
    itemWrappers.forEach((wrapper) => {
      const handler = () => setActiveCard(wrapper);
      wrapper.addEventListener("mouseenter", handler);
      mouseEnterCleanups.push(() => wrapper.removeEventListener("mouseenter", handler));
    });

    // IntersectionObserver for entrance & exit scroll animations on story cards
    const animElements = document.querySelectorAll(".scroll-animate");

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!prefersReducedMotion && "IntersectionObserver" in window) {
      const scrollObserverOptions: IntersectionObserverInit = {
        root: null,
        rootMargin: "0px 0px -60px 0px",
        threshold: [0, 0.15],
      };

      const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Meluncur masuk ke dalam posisi normal
            entry.target.classList.add("is-visible");
          } else {
            // Meluncur keluar kembali ke arah luar (exit animation)
            entry.target.classList.remove("is-visible");
          }
        });
      }, scrollObserverOptions);

      animElements.forEach((el) => scrollObserver.observe(el));

      return () => {
        mouseEnterCleanups.forEach((cleanup) => cleanup());
        scrollObserver.disconnect();
      };
    } else {
      animElements.forEach((el) => el.classList.add("is-visible"));
      return () => {
        mouseEnterCleanups.forEach((cleanup) => cleanup());
      };
    }
  }, [theme.slug]);

  const item1 = theme.items[0] || { name: "Pola & Ragam", desc: "Koleksi budaya", badge: "Pola & Ragam", slug: "songket-palembang", image: theme.image };
  const item2 = theme.items[1] || { name: "Pusat Kerajinan", desc: "Sentra kerajinan tradisi", badge: "Sentra", slug: "songket-palembang", image: theme.image };
  const item3 = theme.items[2] || { name: "Fakta Menarik", desc: "Sejarah dan filosofi luhur", badge: "Fakta Menarik", slug: "songket-palembang", image: theme.image };

  const carouselItems = theme.items.slice(0, 4);

  return (
    <div className="font-sans antialiased selection:bg-amber-300 selection:text-neutral-900 overflow-x-hidden text-white min-h-screen">
      {/* BEGIN: HeroSection matching K1.MD */}
      <section className="relative text-white min-h-[580px] lg:min-h-[660px] flex flex-col justify-between overflow-hidden" data-purpose="hero-banner">
        <div className="absolute inset-0 z-0">
          <img
            alt={theme.title}
            className="w-full h-full object-cover object-center filter brightness-[0.6] contrast-[1.1] scale-105 transition-transform duration-1000"
            src={theme.heroImage}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c1013] via-[#1c1013]/60 to-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#1c1013]/90 via-[#1c1013]/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto w-full px-6 sm:px-12 flex-1 flex flex-col justify-center pt-28 pb-12">
          <div className="max-w-2xl text-left">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] drop-shadow-lg">
              {theme.title}
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-[#f3f4f6] font-normal leading-relaxed drop-shadow-md max-w-xl">
              {theme.tagline}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <LoveButton
                itemType="theme"
                itemRef={theme.slug}
                title={theme.title}
                imageUrl={theme.heroImage || theme.image}
                creator="Sumatera Selatan"
                sourceUrl={`/tema/${theme.slug}`}
                size="md"
              />
              <span className="text-xs text-white/60 font-sans tracking-wide">
                Simpan ke Favorit
              </span>
            </div>
          </div>
        </div>

        <div className="relative z-10 w-full text-white/70 py-3.5 border-b border-white/10 bg-black/20 backdrop-blur-sm flex items-center justify-center text-xs tracking-wide">
          <span>Kolaborasi Kurasi Warisan Budaya Sumatera Selatan — SORA Arts &amp; Culture</span>
        </div>
      </section>
      {/* END: HeroSection */}

      {/* BEGIN: StoryGridSection matching K1.MD */}
      <section
        className="py-16 sm:py-20 px-6 sm:px-12 max-w-[1440px] mx-auto bg-transparent"
        data-purpose="editorial-stories"
        id="cerita-budaya"
      >
        <header className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-white drop-shadow-sm">
            {theme.slug === "rumah-adat"
              ? "Falsafah Ruang & Arsitektur Sungai"
              : theme.slug === "pertunjukan-lisan"
              ? "Tradisi Tutur & Seni Panggung Rakyat"
              : "Semuanya dimulai dengan sebuah titik"}
          </h2>
          <p className="mt-3 text-base sm:text-lg font-normal text-[#f3f4f6]">
            {theme.slug === "rumah-adat"
              ? "Menyelami kearifan rancang bangun hunian tradisional Sumatera Selatan"
              : theme.slug === "pertunjukan-lisan"
              ? "Cerita, pantun berirama, dan petuah leluhur yang tak lekang waktu"
              : "Temukan bahasa unik dari titik dan garis"}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch bg-transparent">
          {/* Left Column: Two Stacked Cards (Takes 5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col gap-6 sm:gap-8 justify-between bg-transparent">
            {/* Top Left Card (Meluncur masuk dari kiri) */}
            <Link
              href={`/tur/${item1.slug || "songket-palembang"}`}
              className="scroll-animate scroll-from-left group relative rounded-2xl sm:rounded-3xl overflow-hidden story-card-shadow border border-white/10 bg-transparent min-h-[260px] sm:min-h-[290px] flex flex-col justify-end p-6 sm:p-8 cursor-pointer block"
              data-purpose="story-card-top-left"
            >
              <img
                alt={item1.name}
                className="absolute inset-0 w-full h-full object-cover object-top-left transform group-hover:scale-105 transition-transform duration-500"
                src={item1.image || theme.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent"></div>
              <div className="relative z-10 text-white">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight leading-snug group-hover:text-amber-200 transition-colors">
                  {item1.name}
                </h3>
                <p className="mt-1 text-sm text-[#f3f4f6] line-clamp-2 font-normal">
                  {item1.desc}
                </p>
              </div>
            </Link>

            {/* Bottom Left Card (Meluncur masuk dari kiri) */}
            <Link
              href={`/tur/${item2.slug || "songket-palembang"}`}
              className="scroll-animate scroll-from-left group relative rounded-2xl sm:rounded-3xl overflow-hidden story-card-shadow border border-white/10 bg-transparent min-h-[260px] sm:min-h-[290px] flex flex-col justify-end p-6 sm:p-8 cursor-pointer block"
              data-purpose="story-card-bottom-left"
              style={{ transitionDelay: "0.1s" }}
            >
              <img
                alt={item2.name}
                className="absolute inset-0 w-full h-full object-cover object-bottom-left transform group-hover:scale-105 transition-transform duration-500"
                src={item2.image || theme.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent"></div>
              <div className="relative z-10 text-white">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight leading-snug group-hover:text-amber-200 transition-colors">
                  {item2.name}
                </h3>
                <p className="mt-1 text-sm text-[#f3f4f6] line-clamp-2 font-normal">
                  {item2.desc}
                </p>
              </div>
            </Link>
          </div>

          {/* Right Column: Large Feature Card (Meluncur masuk dari kanan) */}
          <Link
            href={`/tur/${item3.slug || "songket-palembang"}`}
            className="lg:col-span-7 scroll-animate scroll-from-right group relative rounded-2xl sm:rounded-3xl overflow-hidden story-card-shadow border border-white/10 bg-transparent min-h-[460px] sm:min-h-[540px] lg:min-h-full flex flex-col justify-end p-8 sm:p-10 cursor-pointer block"
            data-purpose="story-card-feature-right"
            style={{ transitionDelay: "0.15s" }}
          >
            <img
              alt={item3.name}
              className="absolute inset-0 w-full h-full object-cover object-right transform group-hover:scale-105 transition-transform duration-500"
              src={item3.image || theme.image}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            <div className="relative z-10 text-white max-w-xl">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-snug group-hover:text-amber-200 transition-colors">
                {item3.name}
              </h3>
              <p className="mt-2 text-base text-[#f3f4f6] font-normal">
                {item3.desc}
              </p>
            </div>
          </Link>
        </div>
      </section>
      {/* END: StoryGridSection */}

      {/* BEGIN: CarouselShowcaseSection matching K1.MD */}
      <section
        className="py-16 sm:py-24 border-t border-white/10 overflow-hidden bg-transparent"
        data-purpose="card-showcase-carousel"
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 bg-transparent">
          <header className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-white drop-shadow-sm">
              {theme.slug === "rumah-adat"
                ? "Ragam Struktur & Konstruksi"
                : theme.slug === "pertunjukan-lisan"
                ? "Lakon Seni & Tembang Rakyat"
                : "Dimulai dari titik"}
            </h2>
            <p className="mt-3 text-base sm:text-lg font-normal text-[#f3f4f6]">
              {theme.slug === "rumah-adat"
                ? "Pelajari arsitektur panggung yang berbicara tentang sungai, status, dan alam"
                : theme.slug === "pertunjukan-lisan"
                ? "Pelajari seni tutur, pantun bersahut, dan pementasan teater tradisional"
                : "Pelajari mengenai kain yang dipakai oleh semua"}
            </p>
          </header>

          {/* Overlapping Carousel Cards matching K1.MD with -space-x-4 sm:-space-x-8 */}
          <div className="relative flex items-center justify-center -mx-4 sm:mx-0 overflow-x-auto lg:overflow-visible py-12 px-4 no-scrollbar bg-transparent">
            <div className="flex items-center justify-center -space-x-4 sm:-space-x-8 py-10 px-4 min-w-max lg:min-w-0 bg-transparent" id="batik-carousel-container">
              {carouselItems.map((item, index) => {
                const isDefaultActive = index === 2;
                return (
                  <div
                    key={index}
                    className={`carousel-card-item flex-shrink-0 ${
                      isDefaultActive ? "is-active-wrapper z-40" : "is-inactive-wrapper z-10"
                    }`}
                  >
                    <Link
                      href={`/tur/${item.slug || "songket-palembang"}`}
                      className={`interactive-card group relative rounded-2xl sm:rounded-3xl overflow-hidden border cursor-pointer flex-shrink-0 bg-transparent block ${
                        isDefaultActive
                          ? "is-active ring-2 ring-amber-400/50"
                          : "is-inactive"
                      }`}
                    >
                      <img
                        alt={item.name}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        src={item.image || theme.image}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>

                      <div className="relative z-10 h-full flex flex-col justify-end p-6 sm:p-7 text-white">
                        <h4 className="text-xl sm:text-2xl font-bold leading-snug text-white">
                          {item.name}
                        </h4>
                        <p className="mt-1.5 text-xs sm:text-sm text-[#f3f4f6] font-normal line-clamp-2">
                          {item.desc}
                        </p>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      {/* END: CarouselShowcaseSection */}
    </div>
  );
}
