"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Theme } from "../data/sora-content";

interface ThemeK2Props {
  theme: Theme;
}

export default function ThemeK2({ theme }: ThemeK2Props) {
  useEffect(() => {
    const animatedElements = document.querySelectorAll(".scroll-anim");
    if (!("IntersectionObserver" in window)) {
      animatedElements.forEach((el) => el.classList.add("in-view"));
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -40px 0px",
      threshold: 0.15,
    };

    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        } else {
          entry.target.classList.remove("in-view");
        }
      });
    }, observerOptions);

    animatedElements.forEach((el) => scrollObserver.observe(el));
    return () => scrollObserver.disconnect();
  }, []);

  const highlightItems = theme.items.slice(0, 3);
  const collections = theme.items;

  return (
    <div className="antialiased selection:bg-amber-900 selection:text-white min-h-screen pt-16">
      <main className="w-full bg-transparent">
        {/* BEGIN: HeroSection matching K2.MD */}
        <header className="w-full bg-transparent" data-purpose="hero-header">
          {/* Panoramic Banner Image from IMAGE_64 */}
          <div className="w-full h-56 sm:h-72 md:h-96 lg:h-[420px] overflow-hidden bg-transparent relative">
            <img
              alt={theme.title}
              className="w-full h-full object-cover object-center"
              src={theme.heroImage}
            />
          </div>

          {/* Title & Social Actions Container */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-6 text-center bg-transparent">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white drop-shadow-md mb-6">
              {theme.title}
            </h1>
            <p
              className="text-sm sm:text-base text-white/90 drop-shadow leading-relaxed font-normal text-left sm:text-center max-w-3xl mx-auto"
              data-purpose="country-description"
            >
              {theme.intro}
            </p>
          </div>
        </header>
        {/* END: HeroSection */}

        {/* BEGIN: CollectionsCarousel matching K2.MD */}
        <section
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-transparent"
          data-purpose="collections-section"
        >
          {/* Section Header with total count */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl sm:text-2xl font-normal text-white drop-shadow-md">
              {collections.length} koleksi
            </h2>
          </div>

          {/* Carousel Container */}
          <div className="relative group">
            <div className="overflow-x-auto no-scrollbar py-2 px-1 cursor-grab active:cursor-grabbing select-none">
              <div className="flex space-x-5">
                {/* Set 1 */}
                {collections.map((item, idx) => (
                  <Link
                    key={`set1-${idx}`}
                    href={`/tur/${item.slug || theme.slug}`}
                    className="block"
                  >
                    <article
                      className={`scroll-anim in-view ${
                        idx % 2 === 0 ? "anim-from-left" : "anim-from-right"
                      } delay-${(idx % 6) + 1} flex-none w-[275px] sm:w-[290px] rounded-lg overflow-hidden border border-white/10 bg-white/10 backdrop-blur-md partner-card-shadow hover:border-white/25 transition-all`}
                    >
                      <div className="h-32 bg-gray-900/40 overflow-hidden relative">
                        <img
                          alt={item.name}
                          className="w-full h-full object-cover"
                          src={item.image || theme.image}
                        />
                      </div>
                      <div className="p-4 text-center bg-black/40 backdrop-blur-md -mt-6 mx-4 rounded-md shadow-sm border border-white/10 relative mb-4">
                        <div className="font-serif font-bold text-amber-200 tracking-wider text-sm mb-1">
                          {item.badge || "WARISAN"}
                        </div>
                        <div className="text-[11px] text-white/60 uppercase tracking-widest -mt-1 mb-2 font-sans font-light">
                          SUMATERA SELATAN
                        </div>
                        <h3 className="text-xs sm:text-sm font-medium text-white truncate drop-shadow-sm">
                          {item.name}
                        </h3>
                        <p className="text-[12px] text-white/70 mt-0.5 truncate">
                          {theme.title}
                        </p>
                      </div>
                    </article>
                  </Link>
                ))}

                {/* Duplicated Set 2 for seamless continuous scroll matching K2.MD */}
                {collections.map((item, idx) => (
                  <Link
                    key={`set2-${idx}`}
                    href={`/tur/${item.slug || theme.slug}`}
                    aria-hidden="true"
                    className="block"
                  >
                    <article
                      className={`scroll-anim in-view ${
                        idx % 2 === 0 ? "anim-from-left" : "anim-from-right"
                      } delay-${(idx % 6) + 1} flex-none w-[275px] sm:w-[290px] rounded-lg overflow-hidden border border-white/10 bg-white/10 backdrop-blur-md partner-card-shadow hover:border-white/25 transition-all`}
                    >
                      <div className="h-32 bg-gray-900/40 overflow-hidden relative">
                        <img
                          alt={item.name}
                          className="w-full h-full object-cover"
                          src={item.image || theme.image}
                        />
                      </div>
                      <div className="p-4 text-center bg-black/40 backdrop-blur-md -mt-6 mx-4 rounded-md shadow-sm border border-white/10 relative mb-4">
                        <div className="font-serif font-bold text-amber-200 tracking-wider text-sm mb-1">
                          {item.badge || "WARISAN"}
                        </div>
                        <div className="text-[11px] text-white/60 uppercase tracking-widest -mt-1 mb-2 font-sans font-light">
                          SUMATERA SELATAN
                        </div>
                        <h3 className="text-xs sm:text-sm font-medium text-white truncate drop-shadow-sm">
                          {item.name}
                        </h3>
                        <p className="text-[12px] text-white/70 mt-0.5 truncate">
                          {theme.title}
                        </p>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* END: CollectionsCarousel */}

        {/* BEGIN: ThemesSection matching K2.MD */}
        <section
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-transparent"
          data-purpose="themes-section"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl sm:text-2xl font-normal text-white drop-shadow-md">
              3 tema
            </h2>
          </div>

          <div className="relative group">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Theme 1 */}
              {highlightItems[0] && (
                <Link
                  href={`/tur/${highlightItems[0].slug || theme.slug}`}
                  className="block"
                >
                  <article
                    className="scroll-anim in-view anim-theme-left delay-1 flex flex-col cursor-pointer group/card bg-white/5 backdrop-blur-md p-3 rounded-xl border border-white/10 hover:border-white/25 transition-all"
                    data-purpose="theme-card"
                  >
                    <div className="w-full aspect-[16/10] overflow-hidden rounded-lg bg-stone-900 mb-3 shadow-sm">
                      <img
                        alt={highlightItems[0].name}
                        className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                        src={highlightItems[0].image || theme.image}
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[11px] font-semibold tracking-wider text-amber-400 uppercase drop-shadow-sm">
                        TEMA
                      </span>
                      <h3 className="text-base font-medium text-white group-hover/card:text-amber-300 transition-colors drop-shadow-sm">
                        {highlightItems[0].name}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/80 line-clamp-2 leading-relaxed drop-shadow-sm">
                        {highlightItems[0].desc}
                      </p>
                    </div>
                  </article>
                </Link>
              )}

              {/* Theme 2 */}
              {highlightItems[1] && (
                <Link
                  href={`/tur/${highlightItems[1].slug || theme.slug}`}
                  className="block"
                >
                  <article
                    className="scroll-anim in-view anim-theme-center delay-2 flex flex-col cursor-pointer group/card bg-white/5 backdrop-blur-md p-3 rounded-xl border border-white/10 hover:border-white/25 transition-all"
                    data-purpose="theme-card"
                  >
                    <div className="w-full aspect-[16/10] overflow-hidden rounded-lg bg-amber-950 mb-3 shadow-sm">
                      <img
                        alt={highlightItems[1].name}
                        className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                        src={highlightItems[1].image || theme.image}
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[11px] font-semibold tracking-wider text-amber-400 uppercase drop-shadow-sm">
                        TEMA
                      </span>
                      <h3 className="text-base font-medium text-white group-hover/card:text-amber-300 transition-colors drop-shadow-sm">
                        {highlightItems[1].name}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/80 line-clamp-2 leading-relaxed drop-shadow-sm">
                        {highlightItems[1].desc}
                      </p>
                    </div>
                  </article>
                </Link>
              )}

              {/* Theme 3 */}
              {highlightItems[2] && (
                <Link
                  href={`/tur/${highlightItems[2].slug || theme.slug}`}
                  className="block"
                >
                  <article
                    className="scroll-anim in-view anim-theme-right delay-3 flex flex-col cursor-pointer group/card bg-white/5 backdrop-blur-md p-3 rounded-xl border border-white/10 hover:border-white/25 transition-all"
                    data-purpose="theme-card"
                  >
                    <div className="w-full aspect-[16/10] overflow-hidden rounded-lg bg-amber-950/40 mb-3 shadow-sm">
                      <img
                        alt={highlightItems[2].name}
                        className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                        src={highlightItems[2].image || theme.image}
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[11px] font-semibold tracking-wider text-amber-400 uppercase drop-shadow-sm">
                        TEMA
                      </span>
                      <h3 className="text-base font-medium text-white group-hover/card:text-amber-300 transition-colors drop-shadow-sm">
                        {highlightItems[2].name}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/80 line-clamp-2 leading-relaxed drop-shadow-sm">
                        {highlightItems[2].desc}
                      </p>
                    </div>
                  </article>
                </Link>
              )}
            </div>
          </div>
        </section>
        {/* END: ThemesSection */}

        {/* BEGIN: MosaicGalleryWall matching K2.MD */}
        <section
          className="w-full mt-10 mb-16 overflow-hidden relative bg-transparent"
          data-purpose="artifacts-wall"
        >
          <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-4 bg-transparent">
            <h2 className="text-xl sm:text-2xl font-normal text-white drop-shadow-md">
              Koleksi Seni &amp; Peninggalan Budaya
            </h2>
          </div>

          <div className="relative w-full bg-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="scroll-anim in-view anim-mosaic delay-1 overflow-hidden rounded-xl shadow-2xl border border-white/10 bg-black/40 backdrop-blur-sm">
                <img
                  alt={`Koleksi mozaik artefak ${theme.title}`}
                  className="w-full h-auto object-cover min-h-[360px]"
                  src={theme.heroImage}
                />
              </div>
            </div>
          </div>
        </section>
        {/* END: MosaicGalleryWall */}
      </main>
    </div>
  );
}
