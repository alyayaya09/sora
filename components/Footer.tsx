"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "../contexts/LanguageContext";

export default function Footer() {
  const pathname = usePathname();
  const isTourPage = pathname?.startsWith("/tur");
  const { t } = useLanguage();

  return (
    <footer
      className={`relative z-10 w-full border-t border-white/10 py-5 sm:py-6 mt-4 ${
        isTourPage
          ? "bg-black/50 backdrop-blur-md shadow-[0_-16px_36px_rgba(0,0,0,0.8)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 text-center sm:text-left">
        {/* Brand & Creators */}
        <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-white/35">
          <span className="font-bold bg-gradient-to-r from-[#FDE047] via-[#E9C176] to-[#DC2626] bg-clip-text text-transparent select-none text-sm sm:text-base tracking-tight">
            SORA.<span className="italic font-extrabold">Culture</span>
          </span>
          <span className="hidden sm:inline text-white/20">•</span>
          <span className="text-[11px] sm:text-xs text-white/35 leading-tight">
            © 2026 Muhammad Firly Marezky &amp; M. Rifqi Aunur Rahman
          </span>
        </div>

        {/* Tagline */}
        <span className="text-[10px] sm:text-xs text-white/25 tracking-wide">
          {t(
            "Platform AI Warisan Budaya Sumatera Selatan",
            "South Sumatra AI Cultural Heritage Platform"
          )}
        </span>
      </div>
    </footer>
  );
}
