"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "../lib/auth-client";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState<"ID" | "EN">("ID");
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close avatar menu on outside click
  useEffect(() => {
    if (!avatarMenuOpen) return;
    const handler = () => setAvatarMenuOpen(false);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [avatarMenuOpen]);

  const triggerToast = (msg: string) => {
    const existing = document.getElementById("soraLiveToast");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.id = "soraLiveToast";
    toast.className =
      "fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#141014]/95 border border-[#00f2fe]/50 backdrop-blur-xl shadow-[0_12px_36px_rgba(0,242,254,0.25),0_4px_16px_rgba(0,0,0,0.8)] transition-all duration-300 transform translate-y-0 opacity-100 select-none text-white pointer-events-none";
    toast.innerHTML = `
      <div class="w-6 h-6 rounded-full bg-cyan-950/80 border border-cyan-400 flex items-center justify-center shrink-0">
        <span class="material-symbols-outlined text-[14px] text-cyan-300">info</span>
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

  const toggleLanguage = () => {
    const next = lang === "ID" ? "EN" : "ID";
    setLang(next);
    triggerToast(`Bahasa diubah ke ${next}`);
  };

  const handleSignOut = async () => {
    setAvatarMenuOpen(false);
    await signOut();
    router.push("/");
  };

  // Avatar initials fallback
  const initials = user?.name
    ? user.name
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 py-4 px-6 md:px-12 w-full ${
        scrolled
          ? "bg-black/85 backdrop-blur-md shadow-2xl border-b border-white/10"
          : "bg-black/20 backdrop-blur-md"
      }`}
      id="main-nav"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <svg
            className="w-6 h-6 text-cyan-400 transform group-hover:scale-110 transition-transform"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
          </svg>
          <div className="flex items-center gap-1.5 font-bold tracking-tight text-lg text-white drop-shadow-md">
            <span>SORA.</span>
            <span className="italic font-extrabold text-cyan-400">Culture</span>
          </div>
        </Link>

        {/* Center & Right Navigation Items */}
        <div className="flex items-center gap-6 md:gap-8">
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/90 drop-shadow">
            <Link
              href="/"
              className={`transition-colors ${
                pathname === "/"
                  ? "text-white font-semibold border-b-2 border-cyan-400 pb-0.5"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Beranda
            </Link>
            <Link
              href="/jelajahi"
              className={`transition-colors ${
                pathname === "/jelajahi"
                  ? "text-white font-semibold border-b-2 border-cyan-400 pb-0.5"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Jelajahi
            </Link>
            <Link
              href="/favorit"
              className={`transition-colors ${
                pathname === "/favorit"
                  ? "text-white font-semibold border-b-2 border-cyan-400 pb-0.5"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Favorit
            </Link>
            <Link
              href="/tentang"
              className={`transition-colors ${
                pathname === "/tentang"
                  ? "text-white font-semibold border-b-2 border-cyan-400 pb-0.5"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Tentang
            </Link>
          </nav>

          <div className="flex items-center gap-3 sm:gap-4 text-sm">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors drop-shadow cursor-pointer"
              title="Ganti Bahasa"
              type="button"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth="1.8"></circle>
                <path
                  d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                  strokeWidth="1.8"
                ></path>
              </svg>
              <span className="font-medium text-xs sm:text-sm">{lang}</span>
            </button>

            {/* Auth area */}
            {isPending ? (
              // Loading skeleton
              <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
            ) : user ? (
              // Logged in: avatar + dropdown
              <div className="relative">
                <button
                  type="button"
                  id="nav-avatar-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setAvatarMenuOpen((v) => !v);
                  }}
                  className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-[#f3d38c] bg-gradient-to-br from-[#6b1d2f] to-[#8b273e] border-2 border-[#d4af37]/50 hover:border-[#d4af37] transition-all shadow-lg cursor-pointer overflow-hidden"
                  title={user.name || "Profil"}
                  aria-label="Menu profil"
                >
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || "Avatar"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>{initials}</span>
                  )}
                </button>

                {/* Dropdown */}
                {avatarMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-[#1a1a1e]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl py-2 z-50">
                    <div className="px-4 py-3 border-b border-white/10">
                      <p className="text-white text-sm font-semibold truncate">{user.name}</p>
                      <p className="text-white/40 text-xs truncate">{user.email}</p>
                    </div>
                    <Link
                      href="/favorit"
                      onClick={() => setAvatarMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-white/70 hover:text-white hover:bg-white/5 transition-colors text-sm"
                    >
                      <span className="material-symbols-outlined text-base">favorite</span>
                      Favorit Saya
                    </Link>
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-colors text-sm text-left"
                    >
                      <span className="material-symbols-outlined text-base">logout</span>
                      Keluar
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Not logged in: Sign in + Create now
              <>
                <Link
                  href="/masuk"
                  className="text-white/80 hover:text-white font-medium transition-colors drop-shadow hidden sm:inline-block cursor-pointer"
                >
                  Sign in
                </Link>
                <Link
                  href="/jelajahi"
                  className="bg-[#00f2fe] hover:bg-[#00d6e2] text-slate-950 font-bold px-4 sm:px-5 py-2 rounded-full shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transform hover:-translate-y-0.5 active:translate-y-0 transition-all text-xs tracking-wide inline-block whitespace-nowrap"
                >
                  Create now
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
