import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#170b0e] backdrop-blur-md py-8 px-6 text-xs text-white/60 w-full relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-white tracking-wide">SORA.Culture</span>
          <span>— Platform Warisan Seni &amp; Budaya Sumatera Selatan</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/" className="hover:text-white transition-colors">
            Beranda
          </Link>
          <Link href="/tema/tari-musik" className="hover:text-white transition-colors">
            Tari &amp; Musik
          </Link>
          <Link href="/tema/kuliner" className="hover:text-white transition-colors">
            Kuliner
          </Link>
          <Link href="/tema/kain-pakaian" className="hover:text-white transition-colors">
            Kain &amp; Pakaian
          </Link>
        </div>
        <div>
          <span>© 2026 Muhammad Firly Marezky &amp; M. Rifqi Aunur Rahman. Hak cipta dilindungi undang-undang.</span>
        </div>
      </div>
    </footer>
  );
}
