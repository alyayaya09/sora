"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "../lib/auth-client";
import { useLanguage } from "../contexts/LanguageContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const { lang, toggleLang, t } = useLanguage();
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  // Unified visibility: show at top always, show on scroll/mousemove, hide after 2s idle
  useEffect(() => {
    let hideTimer: ReturnType<typeof setTimeout>;

    const scheduleHide = () => {
      clearTimeout(hideTimer);
      if (window.scrollY > 40) {
        hideTimer = setTimeout(() => {
          setNavVisible(false);
        }, 2000);
      }
    };

    const handleActivity = () => {
      setNavVisible(true);
      scheduleHide();
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      if (window.scrollY <= 40) {
        // At the very top: always show, cancel any hide timer
        clearTimeout(hideTimer);
        setNavVisible(true);
      } else {
        // Scrolling: show navbar then schedule hide
        handleActivity();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("touchstart", handleActivity, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("touchstart", handleActivity);
      clearTimeout(hideTimer);
    };
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

  const toggleLanguage = () => {
    toggleLang();
    const next = lang === "ID" ? "EN" : "ID";
    triggerToast(next === "EN" ? "Language changed to English" : "Bahasa diubah ke Indonesia");
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
      className={`fixed top-0 left-0 right-0 z-[1000] py-4 px-6 md:px-12 w-full transition-all duration-500 ${
        scrolled
          ? "bg-white/8 backdrop-blur-md border-b border-white/10 shadow-sm"
          : "bg-white/5 backdrop-blur-sm"
      } ${
        navVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-2 pointer-events-none"
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
              className={`relative group/nav transition-colors ${
                pathname === "/"
                  ? "text-amber-300 font-semibold"
                  : "text-white/80 hover:text-amber-200"
              }`}
            >
              {t("Beranda", "Home")}
              <span className={`absolute -bottom-0.5 left-0 h-[2px] bg-amber-400 transition-all duration-300 ${
                pathname === "/" ? "w-full" : "w-0 group-hover/nav:w-full"
              }`}></span>
            </Link>
            <Link
              href="/jelajahi"
              className={`relative group/nav transition-colors ${
                pathname === "/jelajahi"
                  ? "text-amber-300 font-semibold"
                  : "text-white/80 hover:text-amber-200"
              }`}
            >
              {t("Jelajahi", "Explore")}
              <span className={`absolute -bottom-0.5 left-0 h-[2px] bg-amber-400 transition-all duration-300 ${
                pathname === "/jelajahi" ? "w-full" : "w-0 group-hover/nav:w-full"
              }`}></span>
            </Link>
            <Link
              href="/favorit"
              className={`relative group/nav transition-colors ${
                pathname === "/favorit"
                  ? "text-amber-300 font-semibold"
                  : "text-white/80 hover:text-amber-200"
              }`}
            >
              {t("Favorit", "Favorites")}
              <span className={`absolute -bottom-0.5 left-0 h-[2px] bg-amber-400 transition-all duration-300 ${
                pathname === "/favorit" ? "w-full" : "w-0 group-hover/nav:w-full"
              }`}></span>
            </Link>
            <Link
              href="/tentang"
              className={`relative group/nav transition-colors ${
                pathname === "/tentang"
                  ? "text-amber-300 font-semibold"
                  : "text-white/80 hover:text-amber-200"
              }`}
            >
              {t("Tentang", "About")}
              <span className={`absolute -bottom-0.5 left-0 h-[2px] bg-amber-400 transition-all duration-300 ${
                pathname === "/tentang" ? "w-full" : "w-0 group-hover/nav:w-full"
              }`}></span>
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
                      {t("Favorit Saya", "My Favorites")}
                    </Link>
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-colors text-sm text-left"
                    >
                      <span className="material-symbols-outlined text-base">logout</span>
                      {t("Keluar", "Sign Out")}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Not logged in: single Sign In button
              <Link
                href="/masuk"
                className="bg-[#1a73e8] hover:bg-[#1557b0] text-white font-bold px-4 sm:px-5 py-2 rounded-full shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transform hover:-translate-y-0.5 active:translate-y-0 transition-all text-xs tracking-wide inline-block whitespace-nowrap"
              >
                {t("Masuk", "Sign In")}
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
