"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface FavoriteItem {
  id: string;
  title: string;
  badge: string;
  desc: string;
  image: string;
  fallbackImage: string;
  link: string;
}

const INITIAL_FAVORITES: FavoriteItem[] = [
  {
    id: "songket-bintang",
    title: "Motif Bunga Bintang Songket",
    badge: "Motif Ikonik",
    desc: "Melambangkan arah kompas pelayaran bahari armada Sriwijaya dan filosofi keteguhan batin.",
    image:
      "https://lh3.googleusercontent.com/aida/AEtjO1WCF1J-3c6nSV4lux31qjbnYBJ8DssQlXxYpTLW32b98ttdktCbQGRbDtWRuU7vMJhKVJ1IXPFwyZO7wlW863aJArxJu8djcQCuwIS6WuOmAl-WQzpJgBaqTNa8BzqRrFXzCJ9wc3YBiWhe-Dd1wg81Srm8bf1ihXzzRZS1v0NYOXo7bibviV4GKPJKtP4mrXKZ9OpjIf6H8KJIlwBu7jxckRPDgFsq5jtGs7Cu83dXK4Qs5WNkU701AAkN",
    fallbackImage: "/images/songket_lepus.jpg",
    link: "/tur/songket-palembang",
  },
  {
    id: "celup-gambir",
    title: "Proses Celup Alami Gambir & Sepang",
    badge: "Etnobotani & Pewarnaan",
    desc: "Formulasi getah gambir dan kayu secang penghasil rona merah marun abadi tahan ratusan tahun.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAzWOP7yGmzVqVnlXFOi3ONDYBGP5UXSuy9ItbD2FRle1Ed49-ZEToXjXuyLwdzT5pXg4Rmv_VMfdTJBBeCFTldiOQ_HoIoMkAELqUzYKNL1lDxUnNGp7JcU6OJSlZRj_b3C-JVdMwb13zK7PedkTq-3eM5ynGv290klaTX-R0aTE_UigYVnIJnVlLmkablNOTSnGYW38lh3lWQMTdXeQXFI-1KUv8DnGtWDpXr4VD3J_T-CSzBsZuJjA",
    fallbackImage: "/images/songket_lepus.jpg",
    link: "/tema/kain-pakaian",
  },
  {
    id: "aesan-gede",
    title: "Pakaian Adat Aesan Gede Palembang",
    badge: "Kostum Kerajaan Lengkap",
    desc: "Busana perkawinan agung gabungan pengaruh estetika Buddha Sriwijaya dan etika Kesultanan Palembang.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBJO4Z-bTXBjhbzXkn23uF10_ZVIKjcwSp8nnG6B0xJIRE0nhOgXm4SixSyetg0GB3OwO9UnqY6uKMU0wwAGcHjIWM084GccGNXIm1eE_BBCzcfsF0EZ3bWp0tn2AsGrY5pqydW0m7LlO_-APhVrGGI1hfxXJPXzULHATngnUv30iSQ9D8MvROo5SqtgusvaU4JJYe1JMZmP1AmbJd6IEl_tFaD4ofj78uH_WqShCXsWFMxZyTtkem_8w",
    fallbackImage: "/images/aesan_gede_banner.jpg",
    link: "/tur/aesan-gede",
  },
  {
    id: "hutan-suvarnadvipa",
    title: "Hutan Hujan & Perairan Suvarnadvipa",
    badge: "Konservasi & Ekosistem",
    desc: "Ekosistem maritim dan hutan purba yang dilindungi oleh piagam prasasti raja-raja Sriwijaya.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB0gVTaR0LzzvJnGlJJvzZI4meD-ucCLThXQqF__AgWr2ASNon8GzQaw2NUOQz8EDRYp9AJwP5CfUwsvoq000FXc1RBmLznAiRk8YcgmUEB8GwrlgpcsBI3zF9DyVFrJKKpD40vnE0yKOBJ6eziIkEi1nmrYFcE4VlMP3LgP2WUZIkt01wKM7Gfvw6Io6q7Q4vjKlIY5jK2SzDg1O1j-Z1WpJc5932LTP0G34wSRG7VagnLuzLobqC62g",
    fallbackImage: "/images/ampera_hero.jpg",
    link: "/tur/fajar-musi",
  },
];

export default function FavoritPage() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<FavoriteItem[]>(INITIAL_FAVORITES);
  const [toast, setToast] = useState<{
    visible: boolean;
    title: string;
    subtitle: string;
    isRemove: boolean;
  }>({
    visible: false,
    title: "",
    subtitle: "",
    isRemove: false,
  });

  const showToast = (title: string, subtitle: string, isRemove = false) => {
    setToast({ visible: true, title, subtitle, isRemove });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 2800);
  };

  const handleRemoveFavorite = (e: React.MouseEvent, item: FavoriteItem) => {
    e.stopPropagation();
    setFavorites((prev) => prev.filter((f) => f.id !== item.id));
    showToast("Dihapus dari Favorit", item.title, true);
  };

  return (
    <>
      {/* ── Ambient Heritage Lighting Background (matching favorit.md & PRD) ── */}
      <div aria-hidden="true" className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[15%] -left-[10%] w-[850px] h-[750px] rounded-full bg-gradient-to-br from-[#6b1d2f]/60 via-[#40101b]/40 to-transparent blur-[120px]" />
        <div className="absolute top-[18%] -right-[12%] w-[800px] h-[750px] rounded-full bg-gradient-to-bl from-[#e9c176]/35 via-[#af8d11]/25 to-transparent blur-[130px]" />
        <div className="absolute top-[45%] left-[20%] w-[700px] h-[600px] rounded-full bg-gradient-to-tr from-[#6b1d2f]/45 via-[#e9c176]/20 to-transparent blur-[140px]" />
        <div className="absolute -bottom-[20%] -right-[5%] w-[900px] h-[650px] rounded-full bg-gradient-to-tl from-[#6b1d2f]/50 via-[#af8d11]/25 to-transparent blur-[140px]" />
      </div>


      {/* ── Main Content Area ── */}
      <main className="relative z-10 pt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 flex-1 w-full flex flex-col justify-between">
        
        {/* Profile & Tab Header (matching favorit.md) */}
        <section className="text-center pt-2 pb-4" data-purpose="user-favorites-hero">
          <div className="inline-block relative mb-2">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#6b1d2f]/70 via-[#e9c176]/40 to-[#6b1d2f]/70 blur-lg scale-110" />
            <div className="relative w-20 h-20 rounded-full p-[2.5px] bg-gradient-to-tr from-[#6b1d2f] via-[#e9c176] to-[#6b1d2f] shadow-xl">
              <div className="w-full h-full rounded-full p-0.5 bg-[#131315]">
                <img
                  alt="Foto Profil Pengguna"
                  className="w-full h-full rounded-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCB4mSgnKaQmmdPgIZ3Zv7VSeR1OquXyumHAQzt_w82xEGaWeBi3hz9VkmbWkckuwTrhiYOaCNbhKL_xRsYwiMAFDwfunbuHF2v_lGp3X8s5d9omLN2S8aEPf4bWNKbkH_SV8fmAALpuhPf4GHI1vyskXOjlS1QyhwUJnrH80ruSh5F6dD1cVs5rOpKJgkJCkfAL1v1GMvv7Dxw0Dc9M88QfO-sPU1-NMdmUuFh7AMX9HP-gs0Gyv0WdA"
                  onError={(e) => {
                    // Fallback to default avatar if offline
                    (e.target as HTMLImageElement).src = "/images/ampera_hero.jpg";
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center border-b border-white/10 mt-2" data-purpose="tab-navigation">
            <nav aria-label="Tabs Kurasi" className="flex space-x-12 items-center">
              <button
                type="button"
                className="relative font-serif font-medium text-base sm:text-lg tracking-wider py-1.5 px-3 transition-colors duration-300 cursor-pointer focus:outline-none text-[#f3d38c] hover:text-[#ffe088]"
              >
                Favorit
                <div className="absolute -bottom-px left-0 w-full h-[2.5px] rounded-full bg-gradient-to-r from-[#e9c176] via-[#c2410c] to-[#6b1d2f]" />
              </button>
            </nav>
          </div>
        </section>

        {/* Saved Artefacts / Stories Section (matching favorit.md) */}
        <section className="mt-4 mb-8 max-w-7xl mx-auto w-full">
          <div className="flex items-center justify-between mb-5 pb-1">
            <div className="flex items-baseline gap-3">
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold tracking-wide text-[#F9F8F6] drop-shadow-sm">
                Stories
              </h2>
              <span className="font-serif text-xs text-[#e2be74] font-medium px-2.5 py-0.5 rounded-full bg-[#6b1d2f]/40 border border-amber-400/30">
                {favorites.length}
              </span>
            </div>
          </div>

          {favorites.length === 0 ? (
            <div className="text-center py-16 px-4 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#6b1d2f]/40 border border-amber-400/30 flex items-center justify-center text-amber-300">
                <span className="material-symbols-outlined text-3xl">bookmark_border</span>
              </div>
              <div className="max-w-md">
                <h3 className="font-serif text-xl font-semibold text-white mb-1">
                  Belum Ada Cerita Favorit
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  Semua item favorit telah dihapus. Jelajahi ragam budaya Sumatera Selatan untuk menambahkan kembali ke koleksi Anda.
                </p>
              </div>
              <div className="flex gap-3 mt-2">
                <Link
                  href="/jelajahi"
                  className="px-6 py-2.5 rounded-full bg-[#6b1d2f] hover:bg-[#8b273e] text-white text-sm font-medium transition-all shadow-md"
                >
                  Jelajahi Budaya
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {favorites.map((item) => (
                <article
                  key={item.id}
                  onClick={() => router.push(item.link)}
                  className="group relative rounded-2xl overflow-hidden border border-white/10 aspect-[3/4] flex flex-col justify-between p-4 cursor-pointer shadow-lg hover:border-amber-400/30 transition-all duration-500 bg-black/60 heritage-card"
                >
                  {/* Background Image */}
                  <img
                    alt={item.title}
                    src={item.image}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = item.fallbackImage;
                    }}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 z-0"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent z-10 pointer-events-none" />

                  {/* Top Header inside Card: Favorite Heart Toggle */}
                  <div className="relative z-20 flex items-center justify-end w-full">
                    <button
                      type="button"
                      aria-label="Hapus dari Favorit"
                      onClick={(e) => handleRemoveFavorite(e, item)}
                      className="p-1.5 rounded-full bg-black/50 hover:bg-black/80 text-red-400 hover:text-red-300 border border-white/10 backdrop-blur-md transition-all cursor-pointer shadow-md"
                      title="Hapus dari Favorit"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Center "Eksplor" button on hover */}
                  <div className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="inline-flex items-center justify-center px-5 py-2 rounded-full text-white text-sm font-semibold tracking-wide transition-all duration-300 border border-white/40 hover:border-white focus:outline-none shadow-lg bg-black/40 backdrop-blur-sm">
                      Eksplor
                    </span>
                  </div>

                  {/* Bottom Text Content */}
                  <div className="relative z-20 flex flex-col items-center text-center mt-auto">
                    <h3 className="font-serif font-semibold text-[#f5f0eb] group-hover:text-[#f3d38c] transition duration-300 leading-snug mb-1.5 sm:text-lg">
                      {item.title}
                    </h3>
                    <p className="text-[#cbbba7] leading-relaxed font-sans line-clamp-2 text-sm">
                      {item.desc}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* ── Toast Notification (matching favorit.md) ── */}
      <aside
        aria-live="polite"
        className={`fixed bottom-6 right-6 z-50 transform transition-all duration-300 pointer-events-none ${
          toast.visible
            ? "translate-y-0 opacity-100"
            : "translate-y-24 opacity-0"
        }`}
      >
        <div className="bg-[#1b1b1e]/95 backdrop-blur-xl border border-[#d4af37]/40 text-[#f5eedc] px-5 py-3 rounded-xl shadow-2xl flex items-center space-x-3">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
              toast.isRemove
                ? "bg-white/10 text-white/60"
                : "bg-[#6b1d2f]/80 text-[#d4af37]"
            }`}
          >
            {toast.isRemove ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{toast.title}</p>
            <p className="text-xs text-white/60">{toast.subtitle}</p>
          </div>
        </div>
      </aside>
    </>
  );
}
