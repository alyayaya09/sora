"use client";

/**
 * components/LoveButton.tsx
 * Reusable heart/love button that integrates with /api/favorite
 * Shows login prompt if user not logged in
 */

import React, { useEffect, useState } from "react";
import { useSession } from "../lib/auth-client";
import { useRouter } from "next/navigation";

interface LoveButtonProps {
  itemType: "card" | "theme" | "image";
  itemRef: string;
  title?: string;
  imageUrl?: string;
  creator?: string;
  sourceUrl?: string;
  license?: string;
  /** Visual size variant */
  size?: "sm" | "md" | "lg";
  /** Extra class names */
  className?: string;
}

export default function LoveButton({
  itemType,
  itemRef,
  title,
  imageUrl,
  creator,
  sourceUrl,
  license,
  size = "md",
  className = "",
}: LoveButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isFav, setIsFav] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Check initial state
  useEffect(() => {
    if (!session?.user) return;
    fetch("/api/favorite")
      .then((r) => r.json())
      .then(({ favorites }) => {
        if (Array.isArray(favorites)) {
          setIsFav(
            favorites.some(
              (f: { item_type: string; item_ref: string }) =>
                f.item_type === itemType && f.item_ref === itemRef
            )
          );
        }
      })
      .catch(() => {});
  }, [session, itemType, itemRef]);

  const showMiniToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session?.user) {
      router.push("/masuk");
      return;
    }

    setLoading(true);
    try {
      if (isFav) {
        await fetch("/api/favorite", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ itemType, itemRef }),
        });
        setIsFav(false);
        showMiniToast("Dihapus dari Favorit");
      } else {
        await fetch("/api/favorite", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ itemType, itemRef, title, imageUrl, creator, sourceUrl, license }),
        });
        setIsFav(true);
        showMiniToast("Ditambahkan ke Favorit ❤");
      }
    } catch {
      showMiniToast("Gagal, coba lagi");
    } finally {
      setLoading(false);
    }
  };

  const iconSize = size === "sm" ? "text-base" : size === "lg" ? "text-2xl" : "text-xl";
  const btnSize = size === "sm" ? "p-1.5" : size === "lg" ? "p-3" : "p-2";

  return (
    <div className="relative inline-flex flex-col items-center">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        aria-label={isFav ? "Hapus dari Favorit" : "Tambah ke Favorit"}
        title={isFav ? "Hapus dari Favorit" : "Tambah ke Favorit"}
        className={`
          ${btnSize} rounded-full transition-all duration-300 cursor-pointer
          ${isFav
            ? "bg-[#6b1d2f]/80 text-[#f3d38c] border border-[#d4af37]/50 shadow-lg shadow-[#6b1d2f]/30"
            : "bg-black/40 text-white/60 border border-white/20 hover:text-red-400 hover:border-red-400/40 hover:bg-black/60"
          }
          backdrop-blur-md disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
      >
        {loading ? (
          <div className={`${iconSize} w-[1em] h-[1em] border-2 border-current border-t-transparent rounded-full animate-spin`} />
        ) : (
          <svg
            className={`${iconSize} w-[1em] h-[1em] ${isFav ? "fill-current" : "fill-none stroke-current stroke-2"}`}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        )}
      </button>

      {/* Mini toast */}
      {toast && (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#1a1a1e]/95 text-white text-xs px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-xl shadow-lg pointer-events-none z-50 animate-fade-in">
          {toast}
        </div>
      )}
    </div>
  );
}
