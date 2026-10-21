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
  /** Shape variant */
  variant?: "circle" | "rounded-2xl" | "pill";
  /** Extra class names */
  className?: string;
  /** Optional callback on status change */
  onToggle?: (isFavorited: boolean) => void;
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
  variant = "circle",
  className = "",
  onToggle,
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
          const exists = favorites.some(
            (f: { item_type?: string; itemType?: string; item_ref?: string; itemRef?: string }) =>
              (f.item_type === itemType || f.itemType === itemType) &&
              (f.item_ref === itemRef || f.itemRef === itemRef)
          );
          setIsFav(exists);
        }
      })
      .catch(() => {});
  }, [session, itemType, itemRef]);

  const showMiniToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
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
        onToggle?.(false);
        showMiniToast("Dihapus dari Favorit");
      } else {
        await fetch("/api/favorite", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ itemType, itemRef, title, imageUrl, creator, sourceUrl, license }),
        });
        setIsFav(true);
        onToggle?.(true);
        showMiniToast("Disimpan ke Favorit ❤");
      }
    } catch {
      showMiniToast("Gagal, coba lagi");
    } finally {
      setLoading(false);
    }
  };

  const iconSize = size === "sm" ? "text-base" : size === "lg" ? "text-2xl" : "text-xl";
  const btnSize =
    variant === "rounded-2xl"
      ? "w-12 h-12"
      : size === "sm"
      ? "p-1.5"
      : size === "lg"
      ? "p-3"
      : "p-2";
  const roundedClass = variant === "rounded-2xl" ? "rounded-2xl" : "rounded-full";

  return (
    <div className="relative inline-flex flex-col items-center">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        aria-label={isFav ? "Hapus dari Favorit" : "Tambah ke Favorit"}
        title={isFav ? "Hapus dari Favorit" : "Tambah ke Favorit"}
        className={`
          ${btnSize} ${roundedClass} flex items-center justify-center transition-all duration-300 cursor-pointer
          ${isFav
            ? "bg-[#6b1d2f]/90 text-rose-300 border border-rose-500/50 shadow-lg shadow-[#6b1d2f]/40 hover:bg-[#8b273e]"
            : "bg-black/40 text-white/70 border border-white/20 hover:text-rose-400 hover:border-rose-400/40 hover:bg-black/60"
          }
          backdrop-blur-md disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 active:scale-95
          ${className}
        `}
      >
        {loading ? (
          <div className={`${iconSize} w-[1em] h-[1em] border-2 border-current border-t-transparent rounded-full animate-spin`} />
        ) : (
          <svg
            className={`${iconSize} w-[1em] h-[1em] transition-transform duration-200 hover:scale-110 ${isFav ? "fill-rose-500 stroke-rose-500" : "fill-none stroke-current stroke-2"}`}
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
        <div className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#141014]/95 text-amber-200 text-xs px-3.5 py-1.5 rounded-xl border border-amber-400/40 backdrop-blur-2xl shadow-[0_8px_24px_rgba(0,0,0,0.8)] pointer-events-none z-50 animate-fade-in font-medium tracking-wide">
          {toast}
        </div>
      )}
    </div>
  );
}
