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

  // Curated theme-specific collage items for the mosaic section (12 varied items)
  const themeExtras: Record<
    string,
    Array<{ name: string; badge: string; image: string; slug?: string }>
  > = {
    kuliner: [
      {
        name: "Pempek Panggang & Lenggang",
        badge: "Khas Tepian Musi",
        image: "/images/pempek_palembang.jpg",
        slug: "pempek-palembang",
      },
      {
        name: "Pindang Patin Nanas Kuah Kuning",
        badge: "Rasa Asam Gurih",
        image: "/images/pindang_patin.jpg",
        slug: "pindang-patin",
      },
      {
        name: "Mie Celor Santan Udang Ebi",
        badge: "Kuliner Kuah",
        image: "/images/mie_celor.jpg",
        slug: "mie-celor-laksan",
      },
      {
        name: "Burgo Ikan Kuah Santan",
        badge: "Sarapan Klasik",
        image: "/images/burgo_palembang.jpg",
        slug: "tekwan-model-burgo",
      },
      {
        name: "Kue Maksuba Legit Telur Bebek",
        badge: "Kudapan Bangsawan",
        image: "/images/kue_maksuba.jpg",
        slug: "kue-maksuba",
      },
    ],
    "bahasa-aksara": [
      {
        name: "Prasasti Kedukan Bukit (682 M)",
        badge: "Bukti Tertua Sriwijaya",
        image: "/images/prasasti_kedukan_bukit.jpg",
        slug: "prasasti-kedukan-bukit",
      },
      {
        name: "Naskah Gelumpai Bambu Ulu",
        badge: "Manuskrip Asli",
        image: "/images/aksara_ulu.jpg",
        slug: "aksara-ulu",
      },
      {
        name: "Arca Buddha Bukit Seguntang",
        badge: "Pustaka Sriwijaya",
        image: "/images/buddha_seguntang.jpg",
        slug: "kerajaan-sriwijaya",
      },
      {
        name: "Museum Kesultanan Palembang",
        badge: "Arsip Sejarah",
        image: "/images/museum_balaputradewa.jpg",
        slug: "kesultanan-palembang",
      },
      {
        name: "Benteng Pertahanan Kuto Besak",
        badge: "Arsip Keraton",
        image: "/images/benteng_kuto_besak.jpg",
        slug: "benteng-kuto-besak",
      },
    ],
    "upacara-adat": [
      {
        name: "Aesan Gede Busana Pengantin",
        badge: "Adat Kebesaran",
        image: "/images/aesan_gede_banner.jpg",
        slug: "aesan-gede",
      },
      {
        name: "Lomba Perahu Dayung Musi",
        badge: "Lomba Sungai Musi",
        image: "/images/perahu_bidar.jpg",
        slug: "perahu-bidar",
      },
      {
        name: "Penari Tanggai Kuku Emas",
        badge: "Penghormatan Tamu",
        image: "/images/tari_tanggai.jpg",
        slug: "tari-tanggai",
      },
      {
        name: "Tari Tradisional Adat Pasemah",
        badge: "Tari Penyambutan",
        image: "/images/tari_pasemah.jpg",
        slug: "tari-kebagh",
      },
      {
        name: "Ghumah Baghi Bersih Dusun",
        badge: "Kearifan Agrikultur",
        image: "/images/ghumah_baghi.jpg",
        slug: "sedekah-rame",
      },
      {
        name: "Kain Jumputan Pelangi Titik Tujuh",
        badge: "Ikat Celup",
        image: "/images/kain_jumputan.jpg",
        slug: "kain-jumputan",
      },
      {
        name: "Rebana Burdah Arak-Arakan",
        badge: "Syiar Musik Islami",
        image: "/images/rebana_burdah.jpg",
        slug: "burdah-terbangan",
      },
      {
        name: "Tari Gending Sriwijaya Keraton",
        badge: "Penyambutan Agung",
        image: "/images/tari_gending.jpg",
        slug: "tari-gending-sriwijaya",
      },
    ],
    sejarah: [
      {
        name: "Arca Megalitik Pasemah Kuno",
        badge: "Peninggalan Ribuan SM",
        image: "/images/megalitik_pasemah.jpg",
        slug: "museum-balaputradewa",
      },
      {
        name: "Ghumah Baghi Arsitektur Purba",
        badge: "Kearifan Besemah",
        image: "/images/ghumah_baghi.jpg",
        slug: "museum-balaputradewa",
      },
      {
        name: "Rumah Ulu Pasak Fleksibel",
        badge: "Arsitektur Hulu",
        image: "/images/rumah_ulu.jpg",
        slug: "museum-balaputradewa",
      },
      {
        name: "Rumah Rakit Terapung Sejarah",
        badge: "Pemukiman Air Musi",
        image: "/images/rumah_rakit.jpg",
        slug: "benteng-kuto-besak",
      },
      {
        name: "Aesan Gede Mahkota Kebesaran",
        badge: "Pusaka Kerajaan",
        image: "/images/aesan_gede_banner.jpg",
        slug: "kerajaan-sriwijaya",
      },
      {
        name: "Penenun Songket Lepus Emas",
        badge: "Warisan Tenun",
        image: "/images/menenun_songket.jpg",
        slug: "kesultanan-palembang",
      },
      {
        name: "Aliran Sungai Musi Jalur Niaga",
        badge: "Nadi Peradaban",
        image: "/images/musi_landscape.jpg",
        slug: "jembatan-ampera",
      },
    ],
  };

  const currentExtras = themeExtras[theme.slug] || [
    {
      name: `${theme.title} Warisan Sriwijaya`,
      badge: "Pusaka",
      image: theme.heroImage,
      slug: theme.slug,
    },
    {
      name: `Arsip Budaya ${theme.title}`,
      badge: "Koleksi",
      image: theme.image,
      slug: theme.slug,
    },
    {
      name: `Khasanah Tradisi Lokal`,
      badge: "Dokumentasi",
      image: theme.heroImage,
      slug: theme.slug,
    },
    {
      name: `Nilai Filosofi Nusantara`,
      badge: "Warisan Luhur",
      image: theme.image,
      slug: theme.slug,
    },
  ];

  const collageItems = [
    ...theme.items.map((it) => ({
      name: it.name,
      badge: it.badge || theme.title,
      image: it.image || theme.heroImage,
      slug: it.slug || theme.slug,
    })),
    ...currentExtras,
  ].slice(0, 13);

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
                        <div className="font-sans font-bold text-amber-200 tracking-wider text-sm mb-1">
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
                        <div className="font-sans font-bold text-amber-200 tracking-wider text-sm mb-1">
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
          <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-5 bg-transparent flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-[11px] font-semibold tracking-wider text-amber-300 uppercase block mb-1">
                Mozaik Kolase Warisan
              </span>
              <h2 className="text-xl sm:text-2xl font-normal text-white drop-shadow-md">
                Koleksi Seni &amp; Peninggalan Budaya
              </h2>
            </div>
            <p className="text-xs text-white/60">
              Dokumentasi visual dan artefak budaya terpilih dari tema {theme.title}
            </p>
          </div>

          <div className="relative w-full bg-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="scroll-anim in-view anim-mosaic delay-1 overflow-hidden rounded-xl shadow-2xl border border-white/10 bg-[#1c1013] p-[2px] md:p-[3px]">
                {/* Seamless Mosaic Puzzle Collage — 100% pure photos, no cards, no text, zero empty gaps */}
                <div className="w-full flex gap-[2px] md:gap-[3px] h-[360px] sm:h-[420px] md:h-[480px] lg:h-[520px]">
                  {/* Column 1 */}
                  <div className="flex-1 flex flex-col gap-[2px] md:gap-[3px] h-full">
                    <Link
                      href={`/tur/${collageItems[0]?.slug || theme.slug}`}
                      title={collageItems[0]?.name}
                      style={{ flex: 58 }}
                      className="mosaic-tile group relative overflow-hidden w-full min-h-0 block"
                    >
                      <img
                        src={collageItems[0]?.image}
                        alt={collageItems[0]?.name}
                        className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            theme.heroImage || theme.image;
                        }}
                      />
                    </Link>
                    <Link
                      href={`/tur/${collageItems[1]?.slug || theme.slug}`}
                      title={collageItems[1]?.name}
                      style={{ flex: 42 }}
                      className="mosaic-tile group relative overflow-hidden w-full min-h-0 block"
                    >
                      <img
                        src={collageItems[1]?.image}
                        alt={collageItems[1]?.name}
                        className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            theme.image || theme.heroImage;
                        }}
                      />
                    </Link>
                  </div>

                  {/* Column 2 */}
                  <div className="flex-1 flex flex-col gap-[2px] md:gap-[3px] h-full">
                    <Link
                      href={`/tur/${collageItems[2]?.slug || theme.slug}`}
                      title={collageItems[2]?.name}
                      style={{ flex: 38 }}
                      className="mosaic-tile group relative overflow-hidden w-full min-h-0 block"
                    >
                      <img
                        src={collageItems[2]?.image}
                        alt={collageItems[2]?.name}
                        className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            theme.heroImage || theme.image;
                        }}
                      />
                    </Link>
                    <Link
                      href={`/tur/${collageItems[3]?.slug || theme.slug}`}
                      title={collageItems[3]?.name}
                      style={{ flex: 62 }}
                      className="mosaic-tile group relative overflow-hidden w-full min-h-0 block"
                    >
                      <img
                        src={collageItems[3]?.image}
                        alt={collageItems[3]?.name}
                        className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            theme.image || theme.heroImage;
                        }}
                      />
                    </Link>
                  </div>

                  {/* Column 3 */}
                  <div className="flex-1 flex flex-col gap-[2px] md:gap-[3px] h-full">
                    <Link
                      href={`/tur/${collageItems[4]?.slug || theme.slug}`}
                      title={collageItems[4]?.name}
                      style={{ flex: 65 }}
                      className="mosaic-tile group relative overflow-hidden w-full min-h-0 block"
                    >
                      <img
                        src={collageItems[4]?.image}
                        alt={collageItems[4]?.name}
                        className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            theme.heroImage || theme.image;
                        }}
                      />
                    </Link>
                    <Link
                      href={`/tur/${collageItems[5]?.slug || theme.slug}`}
                      title={collageItems[5]?.name}
                      style={{ flex: 35 }}
                      className="mosaic-tile group relative overflow-hidden w-full min-h-0 block"
                    >
                      <img
                        src={collageItems[5]?.image}
                        alt={collageItems[5]?.name}
                        className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            theme.image || theme.heroImage;
                        }}
                      />
                    </Link>
                  </div>

                  {/* Column 4 */}
                  <div className="flex-1 flex flex-col gap-[2px] md:gap-[3px] h-full">
                    <Link
                      href={`/tur/${collageItems[6]?.slug || theme.slug}`}
                      title={collageItems[6]?.name}
                      style={{ flex: 35 }}
                      className="mosaic-tile group relative overflow-hidden w-full min-h-0 block"
                    >
                      <img
                        src={collageItems[6]?.image}
                        alt={collageItems[6]?.name}
                        className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            theme.heroImage || theme.image;
                        }}
                      />
                    </Link>
                    <Link
                      href={`/tur/${collageItems[7]?.slug || theme.slug}`}
                      title={collageItems[7]?.name}
                      style={{ flex: 30 }}
                      className="mosaic-tile group relative overflow-hidden w-full min-h-0 block"
                    >
                      <img
                        src={collageItems[7]?.image}
                        alt={collageItems[7]?.name}
                        className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            theme.image || theme.heroImage;
                        }}
                      />
                    </Link>
                    <Link
                      href={`/tur/${collageItems[8]?.slug || theme.slug}`}
                      title={collageItems[8]?.name}
                      style={{ flex: 35 }}
                      className="mosaic-tile group relative overflow-hidden w-full min-h-0 block"
                    >
                      <img
                        src={collageItems[8]?.image}
                        alt={collageItems[8]?.name}
                        className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            theme.heroImage || theme.image;
                        }}
                      />
                    </Link>
                  </div>

                  {/* Column 5 */}
                  <div className="flex-1 flex flex-col gap-[2px] md:gap-[3px] h-full">
                    <Link
                      href={`/tur/${collageItems[9]?.slug || theme.slug}`}
                      title={collageItems[9]?.name}
                      style={{ flex: 45 }}
                      className="mosaic-tile group relative overflow-hidden w-full min-h-0 block"
                    >
                      <img
                        src={collageItems[9]?.image}
                        alt={collageItems[9]?.name}
                        className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            theme.heroImage || theme.image;
                        }}
                      />
                    </Link>
                    <Link
                      href={`/tur/${collageItems[10]?.slug || theme.slug}`}
                      title={collageItems[10]?.name}
                      style={{ flex: 55 }}
                      className="mosaic-tile group relative overflow-hidden w-full min-h-0 block"
                    >
                      <img
                        src={collageItems[10]?.image}
                        alt={collageItems[10]?.name}
                        className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            theme.image || theme.heroImage;
                        }}
                      />
                    </Link>
                  </div>

                  {/* Column 6 */}
                  <div className="flex-1 flex flex-col gap-[2px] md:gap-[3px] h-full">
                    <Link
                      href={`/tur/${collageItems[11]?.slug || theme.slug}`}
                      title={collageItems[11]?.name}
                      style={{ flex: 55 }}
                      className="mosaic-tile group relative overflow-hidden w-full min-h-0 block"
                    >
                      <img
                        src={collageItems[11]?.image}
                        alt={collageItems[11]?.name}
                        className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            theme.heroImage || theme.image;
                        }}
                      />
                    </Link>
                    <Link
                      href={`/tur/${collageItems[12]?.slug || theme.slug}`}
                      title={collageItems[12]?.name}
                      style={{ flex: 45 }}
                      className="mosaic-tile group relative overflow-hidden w-full min-h-0 block"
                    >
                      <img
                        src={collageItems[12]?.image}
                        alt={collageItems[12]?.name}
                        className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            theme.image || theme.heroImage;
                        }}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* END: MosaicGalleryWall */}
      </main>
    </div>
  );
}
