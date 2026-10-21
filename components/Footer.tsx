import React from "react";

export default function Footer() {
  return (
    <footer className="relative z-10 w-full border-t border-white/10 py-6 mt-4">
      <div className="max-w-7xl mx-auto px-5 md:px-12 flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex flex-wrap items-center gap-2 text-sm text-white/30">
          <span className="font-bold bg-gradient-to-r from-[#FDE047] via-[#E9C176] to-[#DC2626] bg-clip-text text-transparent select-none text-base">
            SORA.Culture
          </span>
          <span>© Muhammad Firly Marezky &amp; M. Rifqy Aunur Rahman</span>
          <span className="text-white/15">•</span>
          <span className="text-white/35 font-medium">2026</span>
        </div>
        <span className="text-xs text-white/20">Platform AI Warisan Budaya Sumatera Selatan</span>
      </div>
    </footer>
  );
}
