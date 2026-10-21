"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "../../lib/auth-client";
import AmbientBackground from "../../components/AmbientBackground";
import { getDedicatedTour } from "../../data/sora-content";

interface FavoriteItem {
  id: string;
  user_id?: string;
  userId?: string;
  item_type?: "card" | "theme" | "image";
  itemType?: "card" | "theme" | "image";
  item_ref?: string;
  itemRef?: string;
  title: string | null;
  image_url: string | null;
  imageUrl?: string | null;
  creator: string | null;
  source_url: string | null;
  sourceUrl?: string | null;
  license: string | null;
  created_at?: string;
  createdAt?: string;
}

type TabType = "stories" | "gambar";

export default function FavoritPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("stories");
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

  const fetchFavorites = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await fetch("/api/favorite");
      if (res.ok) {
        const data = await res.json();
        setFavorites(data.favorites || []);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!isPending && !user) {
      router.push("/masuk");
      return;
    }
    fetchFavorites();
  }, [user, isPending, fetchFavorites, router]);

  const handleRemoveFavorite = async (e: React.MouseEvent, item: FavoriteItem) => {
    e.stopPropagation();
    const type = item.item_type || item.itemType;
    const ref = item.item_ref || item.itemRef;
    try {
      await fetch("/api/favorite", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemType: type, itemRef: ref }),
      });
      setFavorites((prev) => prev.filter((f) => f.id !== item.id));
      showToast("Dihapus dari Favorit", item.title || ref || "Item", true);
    } catch {
      showToast("Gagal menghapus", "Coba lagi nanti", true);
    }
  };

  const storiesFavs = favorites.filter((f) => {
    const type = f.item_type || f.itemType;
    return type === "card" || type === "theme";
  });
  const imageFavs = favorites.filter((f) => (f.item_type || f.itemType) === "image");
  const displayedFavs = activeTab === "stories" ? storiesFavs : imageFavs;

  const getItemImage = (item: FavoriteItem) => {
    const direct = item.image_url || item.imageUrl;
    if (direct) return direct;
    const type = item.item_type || item.itemType;
    const ref = item.item_ref || item.itemRef;
    if (type === "card" && ref) {
      try {
        const tour = getDedicatedTour(ref);
        if (tour?.heroImg) return tour.heroImg;
      } catch {}
    }
    return null;
  };

  const getItemLink = (item: FavoriteItem) => {
    const type = item.item_type || item.itemType;
    const ref = item.item_ref || item.itemRef;
    if (type === "card") return `/tur/${ref}`;
    if (type === "theme") return `/tema/${ref}`;
    if (item.source_url || item.sourceUrl) return (item.source_url || item.sourceUrl)!;
    return "/jelajahi";
  };

  if (isPending) {
    return (
      <>
        <AmbientBackground />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-[#d4af37]/40 border-t-[#d4af37] rounded-full animate-spin" />
        </div>
      </>
    );
  }

  return (
    <>
      <AmbientBackground />

      <main className="relative z-10 pt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 flex-1 w-full flex flex-col justify-between">
        {/* Profile & Tab Header */}
        <section className="text-center pt-2 pb-4" data-purpose="user-favorites-hero">
          <div className="inline-block relative mb-2">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#6b1d2f]/70 via-[#e9c176]/40 to-[#6b1d2f]/70 blur-lg scale-110" />
            <div className="relative w-20 h-20 rounded-full p-[2.5px] bg-gradient-to-tr from-[#6b1d2f] via-[#e9c176] to-[#6b1d2f] shadow-xl">
              <div className="w-full h-full rounded-full p-0.5 bg-[#131315] flex items-center justify-center">
                {user?.image ? (
                  <img
                    alt="Foto Profil"
                    className="w-full h-full rounded-full object-cover"
                    src={user.image}
                  />
                ) : (
                  <span className="text-2xl font-bold text-[#f3d38c]">
                    {user?.name
                      ? user.name
                          .split(" ")
                          .slice(0, 2)
                          .map((w) => w[0])
                          .join("")
                          .toUpperCase()
                      : "U"}
                  </span>
                )}
              </div>
            </div>
          </div>

          {user?.name && (
            <p className="text-white/60 text-sm font-sans mb-3">{user.name}</p>
          )}

          {/* Tabs */}
          <div className="flex justify-center border-b border-white/10 mt-2" data-purpose="tab-navigation">
            <nav aria-label="Tabs Kurasi" className="flex space-x-12 items-center">

              <button
                type="button"
                onClick={() => setActiveTab("stories")}
                className={`relative font-sans font-medium text-base sm:text-lg tracking-wider py-1.5 px-3 transition-colors duration-300 cursor-pointer focus:outline-none ${
                  activeTab === "stories"
                    ? "text-[#f3d38c] hover:text-[#ffe088]"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                Tur Digital
                {activeTab === "stories" && (
                  <div className="absolute -bottom-px left-0 w-full h-[2.5px] rounded-full bg-gradient-to-r from-[#e9c176] via-[#c2410c] to-[#6b1d2f]" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("gambar")}
                className={`relative font-sans font-medium text-base sm:text-lg tracking-wider py-1.5 px-3 transition-colors duration-300 cursor-pointer focus:outline-none ${
                  activeTab === "gambar"
                    ? "text-[#f3d38c] hover:text-[#ffe088]"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                Gambar
                {activeTab === "gambar" && (
                  <div className="absolute -bottom-px left-0 w-full h-[2.5px] rounded-full bg-gradient-to-r from-[#e9c176] via-[#c2410c] to-[#6b1d2f]" />
                )}
              </button>
            </nav>
          </div>
        </section>

        {/* Favorites Grid */}
        <section className="mt-4 mb-8 max-w-7xl mx-auto w-full">
          <div className="flex items-center justify-between mb-5 pb-1">
            <div className="flex items-baseline gap-3">
              <h2 className="font-sans text-2xl sm:text-3xl font-semibold tracking-wide text-[#F9F8F6] drop-shadow-sm">
                {activeTab === "stories" ? "Tur Digital" : "Gambar"}
              </h2>
              <span className="font-sans text-xs text-[#e2be74] font-medium px-2.5 py-0.5 rounded-full bg-[#6b1d2f]/40 border border-amber-400/30">
                {displayedFavs.length}
              </span>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-[3/4] rounded-2xl bg-white/5 animate-pulse border border-white/10"
                />
              ))}
            </div>
          ) : displayedFavs.length === 0 ? (
            <div className="text-center py-16 px-4 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#6b1d2f]/40 border border-amber-400/30 flex items-center justify-center text-amber-300">
                <span className="material-symbols-outlined text-3xl">bookmark_border</span>
              </div>
              <div className="max-w-md">
                <h3 className="font-sans text-xl font-semibold text-white mb-1">
                  Belum Ada {activeTab === "stories" ? "Tur Digital" : "Gambar"} Favorit
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  Tekan ikon ❤ pada konten untuk menyimpannya ke favorit.
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
              {displayedFavs.map((item) => (
                <article
                  key={item.id}
                  onClick={() => router.push(getItemLink(item))}
                  className="group relative rounded-2xl overflow-hidden border border-white/10 aspect-[3/4] flex flex-col justify-between p-4 cursor-pointer shadow-lg hover:border-amber-400/30 transition-all duration-500 bg-black/60 heritage-card"
                >
                  {/* Background Image */}
                  {getItemImage(item) && (
                    <img
                      alt={item.title || item.item_ref || item.itemRef || "Favorit"}
                      src={getItemImage(item)!}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 z-0"
                    />
                  )}

                  {/* No image placeholder */}
                  {!getItemImage(item) && (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#6b1d2f]/40 to-[#0d0d0f] z-0 flex items-center justify-center">
                      <span className="material-symbols-outlined text-5xl text-white/20">photo_camera</span>
                    </div>
                  )}

                  {/* Badge */}
                  {(item.item_type || item.itemType) && (
                    <div className="absolute top-3 left-3 z-20">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-black/50 text-[#f3d38c] border border-[#d4af37]/30 backdrop-blur-sm capitalize">
                        {(item.item_type || item.itemType) === "card"
                          ? "Tur Digital"
                          : (item.item_type || item.itemType) === "theme"
                          ? "Tema"
                          : "Gambar"}
                      </span>
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent z-10 pointer-events-none" />

                  {/* Top: Remove Favorite button */}
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

                  {/* Center hover "Eksplor" */}
                  <div className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="inline-flex items-center justify-center px-5 py-2 rounded-full text-white text-sm font-semibold tracking-wide border border-white/40 shadow-lg bg-black/40 backdrop-blur-sm">
                      Eksplor
                    </span>
                  </div>

                  {/* Bottom: title */}
                  <div className="relative z-20 flex flex-col items-center text-center mt-auto">
                    <h3 className="font-sans font-semibold text-[#f5f0eb] group-hover:text-[#f3d38c] transition duration-300 leading-snug mb-1.5 sm:text-lg">
                      {item.title || item.item_ref}
                    </h3>
                    {item.creator && (
                      <p className="text-[#cbbba7] leading-relaxed font-sans text-xs opacity-70">
                        {item.creator}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Toast */}
      <aside
        aria-live="polite"
        className={`fixed bottom-6 right-6 z-50 transform transition-all duration-300 pointer-events-none ${
          toast.visible ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0"
        }`}
      >
        <div className="bg-[#1b1b1e]/95 backdrop-blur-xl border border-[#d4af37]/40 text-[#f5eedc] px-5 py-3 rounded-xl shadow-2xl flex items-center space-x-3">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
              toast.isRemove ? "bg-white/10 text-white/60" : "bg-[#6b1d2f]/80 text-[#d4af37]"
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
