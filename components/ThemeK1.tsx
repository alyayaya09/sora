"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Theme, themes } from "../data/sora-content";

interface ThemeK1Props {
  theme: Theme;
}

export default function ThemeK1({ theme }: ThemeK1Props) {
  const [activeCardIndex, setActiveCardIndex] = useState(2); // Default 3rd card active matching K1.MD

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
          </div>
        </div>

        <div className="relative z-10 w-full text-white/70 py-3.5 border-b border-white/10 bg-black/20 backdrop-blur-sm flex items-center justify-center text-xs tracking-wide">
          <span>Kolaborasi Kurasi Warisan Budaya Sumatera Selatan — SORA Arts &amp; Culture</span>
        </div>
      </section>
      {/* END: HeroSection */}

      {/* BEGIN: StoryGridSection matching K1.MD */}
      <section className="py-16 sm:py-20 px-6 sm:px-12 max-w-[1440px] mx-auto bg-transparent" data-purpose="editorial-stories" id="cerita-batik">
        <header className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-white drop-shadow-sm">
            Semuanya dimulai dengan sebuah titik
          </h2>
          <p className="mt-3 text-base sm:text-lg font-normal text-[#f3f4f6]">
            Temukan bahasa unik dari titik dan garis
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch bg-transparent">
          {/* Left Column: Two Stacked Cards (Takes 5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col gap-6 sm:gap-8 justify-between bg-transparent">
            {/* Top Left Card */}
            <Link
              href={`/tur/${item1.slug || "songket-palembang"}`}
              className="scroll-animate scroll-from-left group relative rounded-2xl sm:rounded-3xl overflow-hidden story-card-shadow border border-white/10 bg-transparent min-h-[260px] sm:min-h-[290px] flex flex-col justify-end p-6 sm:p-8 cursor-pointer is-visible block"
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

            {/* Bottom Left Card */}
            <Link
              href={`/tur/${item2.slug || "songket-palembang"}`}
              className="scroll-animate scroll-from-left group relative rounded-2xl sm:rounded-3xl overflow-hidden story-card-shadow border border-white/10 bg-transparent min-h-[260px] sm:min-h-[290px] flex flex-col justify-end p-6 sm:p-8 cursor-pointer is-visible block"
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

          {/* Right Column: Large Feature Card (Takes 7 cols on lg) */}
          <Link
            href={`/tur/${item3.slug || "songket-palembang"}`}
            className="lg:col-span-7 scroll-animate scroll-from-right group relative rounded-2xl sm:rounded-3xl overflow-hidden story-card-shadow border border-white/10 bg-transparent min-h-[460px] sm:min-h-[540px] lg:min-h-full flex flex-col justify-end p-8 sm:p-10 cursor-pointer is-visible block"
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
      <section className="py-16 sm:py-24 border-t border-white/10 overflow-hidden bg-transparent" data-purpose="card-showcase-carousel">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 bg-transparent">
          <header className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-white drop-shadow-sm">
              Dimulai dari titik
            </h2>
            <p className="mt-3 text-base sm:text-lg font-normal text-[#f3f4f6]">
              Pelajari mengenai kain yang dipakai oleh semua
            </p>
          </header>

          {/* Overlapping Carousel Cards matching K1.MD with -space-x-4 sm:-space-x-8 */}
          <div className="relative flex items-center justify-center -mx-4 sm:mx-0 overflow-x-auto lg:overflow-visible py-12 px-4 no-scrollbar bg-transparent">
            <div className="flex items-center justify-center -space-x-4 sm:-space-x-8 py-10 px-4 min-w-max lg:min-w-0 bg-transparent" id="batik-carousel-container">
              {carouselItems.map((item, index) => {
                const isActive = activeCardIndex === index;
                return (
                  <div
                    key={index}
                    onMouseEnter={() => setActiveCardIndex(index)}
                    className={`carousel-card-item carousel-card-anim-wrapper flex-shrink-0 is-visible ${
                      isActive ? "is-active-wrapper z-40" : "is-inactive-wrapper z-10"
                    }`}
                  >
                    <Link
                      href={`/tur/${item.slug || "songket-palembang"}`}
                      className={`interactive-card group relative rounded-2xl sm:rounded-3xl overflow-hidden border cursor-pointer flex-shrink-0 bg-transparent block ${
                        isActive
                          ? "is-active"
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
