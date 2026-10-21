"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "../../lib/auth-client";

type Mode = "masuk" | "daftar";

export default function MasukPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("masuk");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "daftar") {
        const { error: err } = await signUp.email({
          email,
          password,
          name,
        });
        if (err) throw new Error(err.message || "Gagal mendaftar");
      } else {
        const { error: err } = await signIn.email({
          email,
          password,
        });
        if (err) throw new Error(err.message || "Email atau sandi salah");
      }
      router.push("/");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0D0D0F]">
      {/* Ambient orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-[#6b1d2f]/25 blur-[120px] animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#d4af37]/10 blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full bg-[#6b1d2f]/10 blur-[80px]" />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <span className="text-2xl font-serif tracking-widest font-bold bg-gradient-to-r from-[#d4af37] via-[#f3d38c] to-[#d4af37] bg-clip-text text-transparent">
              SORA
            </span>
            <span className="text-xs text-white/40 font-sans tracking-[0.2em] uppercase mt-0.5">
              Arts & Culture
            </span>
          </Link>
          <p className="text-white/40 text-sm mt-2 font-sans">
            Jelajahi warisan budaya Sumatera Selatan
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          {/* Tab switcher */}
          <div className="flex rounded-2xl bg-black/30 p-1 mb-8 border border-white/10">
            {(["masuk", "daftar"] as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => { setMode(m); setError(""); }}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold font-sans transition-all duration-300 ${
                  mode === m
                    ? "bg-gradient-to-r from-[#6b1d2f] to-[#8b273e] text-[#f3d38c] shadow-lg"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                {m === "masuk" ? "Masuk" : "Daftar"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === "daftar" && (
              <div>
                <label className="block text-xs font-semibold text-white/60 uppercase tracking-widest mb-2 font-sans">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama Anda"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm font-sans focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/30 transition-all"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-white/60 uppercase tracking-widest mb-2 font-sans">
                Alamat Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm font-sans focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/30 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/60 uppercase tracking-widest mb-2 font-sans">
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  id="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 8 karakter"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 pr-11 text-white placeholder-white/30 text-sm font-sans focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/30 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                  aria-label={showPw ? "Sembunyikan sandi" : "Tampilkan sandi"}
                >
                  <span className="material-symbols-outlined text-xl">
                    {showPw ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2.5 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
                <span className="material-symbols-outlined text-red-400 text-base mt-0.5 shrink-0">error</span>
                <p className="text-red-300 text-sm font-sans leading-snug">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              id="submit-auth"
              className="w-full py-3.5 rounded-xl font-semibold text-sm font-sans tracking-wide transition-all duration-300 relative overflow-hidden group disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(135deg, #6b1d2f 0%, #8b273e 50%, #6b1d2f 100%)",
                color: "#f3d38c",
                boxShadow: "0 4px 20px rgba(107,29,47,0.5)",
              }}
            >
              <span className="relative z-10">
                {loading
                  ? "Memproses..."
                  : mode === "masuk"
                  ? "Masuk ke SORA"
                  : "Buat Akun"}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#8b273e] to-[#6b1d2f] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </form>

          <p className="text-center text-white/40 text-xs font-sans mt-6 leading-relaxed">
            Dengan {mode === "masuk" ? "masuk" : "mendaftar"}, Anda menyetujui{" "}
            <span className="text-[#d4af37]/70">syarat penggunaan</span> SORA Arts & Culture.
          </p>
        </div>

        <p className="text-center mt-6 text-white/40 text-sm font-sans">
          <Link href="/" className="text-[#d4af37]/70 hover:text-[#d4af37] transition-colors">
            ← Kembali ke Beranda
          </Link>
        </p>
      </div>
    </div>
  );
}
