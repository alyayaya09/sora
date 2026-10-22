"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "../lib/auth-client";
import { useLanguage } from "../contexts/LanguageContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const { lang, toggleLang, t } = useLanguage();
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Unified visibility: show at top always, show on scroll/mousemove, hide after 2s idle
  useEffect(() => {
    let hideTimer: ReturnType<typeof setTimeout>;

    const scheduleHide = () => {
      clearTimeout(hideTimer);
      if (window.scrollY > 40 || mobileOpen) {
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
      if (window.scrollY <= 40 && !mobileOpen) {
        // At the very top: always show, cancel any hide timer
        clearTimeout(hideTimer);
        setNavVisible(true);
      } else {
        // Scrolling or panel open: show navbar then schedule hide
        handleActivity();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("touchstart", handleActivity, { passive: true });
    window.addEventListener("pointerdown", handleActivity, { passive: true });

    if (mobileOpen) {
      handleActivity();
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("touchstart", handleActivity);
      window.removeEventListener("pointerdown", handleActivity);
      clearTimeout(hideTimer);
    };
  }, [mobileOpen]);

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
    setMobileOpen(false);
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

  const navLinks = [
    { href: "/", labelID: "Beranda", labelEN: "Home", icon: "home" },
    { href: "/jelajahi", labelID: "Jelajahi", labelEN: "Explore", icon: "explore" },
    { href: "/favorit", labelID: "Favorit", labelEN: "Favorites", icon: "favorite" },
    { href: "/tentang", labelID: "Tentang", labelEN: "About", icon: "info" },
  ];

  const isHome = pathname === "/";

  return (
    <>
      {/* ── Desktop Navbar only (hidden on mobile) ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-[1000] py-4 px-6 md:px-12 w-full transition-all duration-500
          hidden md:block
          ${
            scrolled
              ? "bg-[#0d0d0f]/85 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
              : isHome
              ? "bg-transparent border-b border-transparent backdrop-blur-none"
              : "bg-[#0d0d0f]/45 backdrop-blur-md border-b border-white/[0.06]"
          } ${
          navVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
        id="main-nav"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-1.5 group">
            <img
              src="/logo.png"
              alt="SORA Logo"
              className="w-10 h-10 md:w-11 md:h-11 object-contain transform group-hover:scale-105 transition-transform drop-shadow"
            />
            <span className="font-bold tracking-tight text-lg bg-gradient-to-r from-[#FDE047] via-[#E9C176] to-[#DC2626] bg-clip-text text-transparent drop-shadow-md select-none">
              SORA.<span className="italic font-extrabold">Culture</span>
            </span>
          </Link>

          {/* Center & Right Navigation */}
          <div className="flex items-center gap-6 md:gap-8">
            <nav className="flex items-center gap-8 text-sm font-medium text-white/90 drop-shadow">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative group/nav transition-colors ${
                    pathname === link.href
                      ? "text-amber-300 font-semibold"
                      : "text-white/80 hover:text-amber-200"
                  }`}
                >
                  {t(link.labelID, link.labelEN)}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-[2px] bg-amber-400 transition-all duration-300 ${
                      pathname === link.href ? "w-full" : "w-0 group-hover/nav:w-full"
                    }`}
                  />
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3 sm:gap-4 text-sm">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors drop-shadow cursor-pointer"
                title="Ganti Bahasa"
                type="button"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" strokeWidth="1.8" />
                  <path
                    d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                    strokeWidth="1.8"
                  />
                </svg>
                <span className="font-medium text-xs sm:text-sm">{lang}</span>
              </button>

              {/* Auth area */}
              {isPending ? (
                <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
              ) : user ? (
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
                      <img src={user.image} alt={user.name || "Avatar"} className="w-full h-full object-cover" />
                    ) : (
                      <span>{initials}</span>
                    )}
                  </button>

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

      {/* ── Mobile: Floating Hamburger / Close Button (top-LEFT) ── */}
      <button
        type="button"
        id="hamburger-btn"
        aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
        onClick={() => setMobileOpen((v) => !v)}
        className={`fixed top-4 left-5 z-[1001] md:hidden
          w-11 h-11 rounded-full flex flex-col justify-center items-center gap-[5px]
          bg-[#0d0d0f]/40 hover:bg-[#0d0d0f]/60 backdrop-blur-md border border-white/15
          shadow-[0_4px_16px_rgba(0,0,0,0.3)]
          transition-all duration-500 ease-in-out cursor-pointer
          ${navVisible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"}`}
      >
        <span
          className={`block w-5 h-[2px] bg-white rounded-full transition-all duration-300 origin-center ${
            mobileOpen ? "rotate-45 translate-y-[7px]" : ""
          }`}
        />
        <span
          className={`block w-5 h-[2px] bg-white rounded-full transition-all duration-300 ${
            mobileOpen ? "opacity-0 scale-x-0" : ""
          }`}
        />
        <span
          className={`block w-5 h-[2px] bg-white rounded-full transition-all duration-300 origin-center ${
            mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""
          }`}
        />
      </button>

      {/* ── Mobile: Logo in Panel Menu that appears when Close Button fades out ── */}
      {mobileOpen && (
        <div
          onClick={() => setNavVisible(true)}
          className={`fixed top-4 left-5 z-[1001] md:hidden flex items-center gap-2 cursor-pointer transition-all duration-500 ease-in-out select-none ${
            !navVisible
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-1 pointer-events-none"
          }`}
        >
          <img
            src="/logo.png"
            alt="SORA Logo"
            className="w-10 h-10 object-contain drop-shadow"
          />
          <span className="font-bold tracking-tight text-base bg-gradient-to-r from-[#FDE047] via-[#E9C176] to-[#DC2626] bg-clip-text text-transparent drop-shadow-md">
            SORA.<span className="italic font-extrabold">Culture</span>
          </span>
        </div>
      )}

      {/* ── Mobile: Floating Logo + Brand (top-RIGHT, only at page top when panel closed) ── */}
      <Link
        href="/"
        className={`fixed top-3.5 right-4 z-[1001] md:hidden flex items-center gap-1.5 group
          transition-all duration-300
          ${!scrolled && navVisible && !mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}
      >
        <img
          src="/logo.png"
          alt="SORA Logo"
          className="w-9 h-9 object-contain drop-shadow transform group-hover:scale-105 transition-transform"
        />
        <span className="font-bold tracking-tight text-base bg-gradient-to-r from-[#FDE047] via-[#E9C176] to-[#DC2626] bg-clip-text text-transparent drop-shadow-md select-none">
          SORA.<span className="italic font-extrabold">Culture</span>
        </span>
      </Link>

      {/* ── Mobile Menu Backdrop ── */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 z-[998] bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* ── Mobile Menu Slide-in Panel ── */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 left-0 bottom-0 z-[999] w-72 flex flex-col
          bg-[#0d0d0f]/45 backdrop-blur-2xl border-r border-white/[0.08]
          shadow-[4px_0_32px_rgba(0,0,0,0.5)]
          transition-transform duration-300 ease-in-out md:hidden
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* top padding so nav links don't hide under the floating hamburger/logo */}
        <div className="h-16 shrink-0" />

        {/* Nav Links */}
        <nav className="flex flex-col px-4 py-4 gap-1 flex-1 overflow-y-auto">
          {navLinks.map((link, i) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{ animationDelay: `${i * 60}ms` }}
                className={`group/item flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 ease-in-out border ${
                  isActive
                    ? "bg-amber-400/15 text-amber-300 border-amber-400/30 shadow-[0_0_15px_rgba(251,191,36,0.1)]"
                    : "text-white/75 border-transparent hover:bg-amber-400/15 hover:text-amber-300 hover:border-amber-400/30"
                }`}
              >
                <span className="material-symbols-outlined text-[20px] opacity-80">
                  {link.icon}
                </span>
                <span>{t(link.labelID, link.labelEN)}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom: Language + Auth */}
        <div className="px-4 pb-8 pt-4 border-t border-white/10 flex flex-col gap-3">
          {/* Language toggle */}
          <button
            onClick={toggleLanguage}
            type="button"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/[0.09] hover:translate-x-1 transition-all duration-300 ease-out border border-transparent cursor-pointer"
          >
            <svg className="w-5 h-5 opacity-80 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth="1.8" />
              <path
                d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                strokeWidth="1.8"
              />
            </svg>
            <span className="font-medium">{lang === "ID" ? "Bahasa Indonesia" : "English"}</span>
            <span className="ml-auto text-xs bg-white/10 px-2 py-0.5 rounded-full font-semibold tracking-wide">
              {lang}
            </span>
          </button>

          {/* Auth */}
          {isPending ? (
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="w-9 h-9 rounded-full bg-white/10 animate-pulse shrink-0" />
              <div className="flex-1 h-4 bg-white/10 rounded animate-pulse" />
            </div>
          ) : user ? (
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                <div className="w-9 h-9 rounded-full shrink-0 overflow-hidden flex items-center justify-center font-bold text-sm text-[#f3d38c] bg-gradient-to-br from-[#6b1d2f] to-[#8b273e] border-2 border-[#d4af37]/50">
                  {user.image ? (
                    <img src={user.image} alt={user.name || "Avatar"} className="w-full h-full object-cover" />
                  ) : (
                    <span>{initials}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold truncate">{user.name}</p>
                  <p className="text-white/40 text-xs truncate">{user.email}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 hover:translate-x-1 transition-all duration-300 ease-out border border-transparent cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">logout</span>
                {t("Keluar", "Sign Out")}
              </button>
            </div>
          ) : (
            <Link
              href="/masuk"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 bg-[#1a73e8] hover:bg-[#1557b0] text-white font-bold px-5 py-3 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-sm tracking-wide"
            >
              <span className="material-symbols-outlined text-[18px]">login</span>
              {t("Masuk", "Sign In")}
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
