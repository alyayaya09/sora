import React from "react";

export default function Footer() {
  return (
    <footer className="relative z-10 w-full border-t border-white/10 bg-black/40 backdrop-blur-md shadow-[0_-12px_32px_rgba(0,0,0,0.6)] py-6 mt-4">
      <div className="max-w-7xl mx-auto px-5 md:px-12 flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex flex-wrap items-center gap-2 text-sm text-white/40">
          <span className="font-bold bg-gradient-to-r from-[#FDE047] via-[#E9C176] to-[#DC2626] bg-clip-text text-transparent select-none text-base">
            SORA.Culture
          </span>
          <span>© Muhammad Firly Marezky &amp; M. Rifqi Aunur Rahman</span>
          <span className="text-white/20">•</span>
          <span className="text-white/45 font-medium">2026</span>
        </div>
        <span className="text-xs text-white/30">Platform AI Warisan Budaya Sumatera Selatan</span>
      </div>
    </footer>
  );
}
