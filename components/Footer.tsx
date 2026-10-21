"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const isTourPage = pathname?.startsWith("/tur");

  return (
    <footer
      className={`relative z-10 w-full border-t border-white/10 py-6 mt-4 ${
        isTourPage
          ? "bg-black/50 backdrop-blur-md shadow-[0_-16px_36px_rgba(0,0,0,0.8)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-12 flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex flex-wrap items-center gap-2 text-sm text-white/30">
          <span className="font-bold bg-gradient-to-r from-[#FDE047] via-[#E9C176] to-[#DC2626] bg-clip-text text-transparent select-none text-base">
            SORA.Culture
          </span>
          <span>© Muhammad Firly Marezky &amp; M. Rifqi Aunur Rahman</span>
          <span className="text-white/15">•</span>
          <span className="text-white/35 font-medium">2026</span>
        </div>
        <span className="text-xs text-white/20">Platform AI Warisan Budaya Sumatera Selatan</span>
      </div>
    </footer>
  );
}
