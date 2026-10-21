"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchResult } from "@/lib/gemini";
import { themes } from "@/data/sora-content";
import LoveButton from "@/components/LoveButton";

// ─── Orb / Ambient Background ───
function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden scale-110" id="dynamicBgWrapper">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#140e13] via-[#0d0d0f] to-[#1c1410] opacity-90" />
      <div className="absolute -top-[10%] -left-[10%] w-[68vw] h-[68vw] max-w-[980px] max-h-[980px] rounded-full bg-gradient-to-br from-[#9f1239]/60 via-[#6b1d2f]/50 to-transparent blur-[105px] animate-orb-1 will-change-transform" />
      <div className="absolute top-[12%] -right-[10%] w-[64vw] h-[64vw] max-w-[920px] max-h-[920px] rounded-full bg-gradient-to-bl from-[#f59e0b]/55 via-[#d4af37]/45 to-transparent blur-[115px] animate-orb-2 will-change-transform" />
      <div className="absolute top-[38%] -left-[8%] w-[58vw] h-[58vw] max-w-[850px] max-h-[850px] rounded-full bg-gradient-to-r from-[#6b1d2f]/55 via-[#881337]/45 to-transparent blur-[100px] animate-orb-3 will-change-transform" />
      <div className="absolute -bottom-[12%] right-[5%] w-[62vw] h-[62vw] max-w-[900px] max-h-[900px] rounded-full bg-gradient-to-tl from-[#af8d11]/55 via-[#d4af37]/45 to-transparent blur-[110px] animate-orb-4 will-change-transform" />
      <div className="absolute top-[52%] left-[28%] w-[48vw] h-[48vw] max-w-[720px] max-h-[720px] rounded-full bg-gradient-to-tr from-[#d4af37]/35 via-[#9f1239]/40 to-transparent blur-[100px] animate-orb-5 will-change-transform" />
      <div className="absolute top-[25%] left-[20%] w-2.5 h-2.5 rounded-full bg-[#fde047] blur-[1px] shadow-[0_0_12px_#fde047] animate-ember-1" />
      <div className="absolute top-[60%] right-[25%] w-3 h-3 rounded-full bg-[#f59e0b] blur-[1px] shadow-[0_0_15px_#f59e0b] animate-ember-2" />
      <div className="absolute top-[75%] left-[40%] w-2 h-2 rounded-full bg-[#ffb2bc] blur-[1px] shadow-[0_0_10px_#ffb2bc] animate-ember-1" style={{ animationDelay: "4s" }} />
      <div className="absolute top-[40%] right-[38%] w-2.5 h-2.5 rounded-full bg-[#e9c176] blur-[1px] shadow-[0_0_12px_#e9c176] animate-ember-2" style={{ animationDelay: "5s" }} />
    </div>
  );
}

const SUGGESTIONS = [
  "Filosofi dan Sejarah Songket Lepus Emas Palembang",
  "Tari Gending Sriwijaya dan makna sekapur sirih",
  "Rumah Limas arsitektur panggung tepi Sungai Musi",
  "Pempek Palembang asal usul dan tradisi kuliner",
  "Aksara Ulu sistem tulis kuno Sumatera Selatan",
  "Festival Perahu Bidar Sungai Musi",
  "Aesan Gede busana adat pengantin Palembang",
  "Kerajaan Sriwijaya dan Prasasti Kedukan Bukit",
];

function JelajahiContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(urlQuery || "");
  const [inputValue, setInputValue] = useState(urlQuery || "");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const activeAudioRef = useRef<HTMLAudioElement | null>(null);

  // Trigger custom toast notification
  const triggerToast = (msg: string, icon = "mic") => {
    const existing = document.getElementById("jelajahiLiveToast");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.id = "jelajahiLiveToast";
    toast.className =
      "fixed bottom-8 left-1/2 -translate-x-1/2 z-[300] flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#141014]/95 border border-amber-400/40 backdrop-blur-xl shadow-[0_12px_36px_rgba(245,158,11,0.2),0_4px_16px_rgba(0,0,0,0.8)] transition-all duration-300 transform translate-y-0 opacity-100 select-none text-white pointer-events-none";
    toast.innerHTML = `
      <div class="w-6 h-6 rounded-full bg-amber-950/80 border border-amber-400 flex items-center justify-center shrink-0">
        <span class="material-symbols-outlined text-[14px] text-amber-300">${icon}</span>
      </div>
      <span class="text-xs font-medium tracking-wide text-neutral-100">${msg}</span>
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translate(-50%, 8px)";
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  };

  // Fetch search results from backend API
  const performSearch = async (searchTerm: string) => {
    const term = searchTerm.trim();
    if (!term) {
      setResult(null);
      return;
    }

    setLoading(true);
    // Stop any ongoing audio
    if (activeAudioRef.current) {
      activeAudioRef.current.pause();
      activeAudioRef.current = null;
    }
    setIsPlaying(false);

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(term)}`);
      if (!res.ok) {
        if (res.status === 429) {
          const errData = await res.json().catch(() => ({}));
          triggerToast(
            errData?.error || "Terlalu banyak pencarian. Silakan tunggu beberapa detik.",
            "hourglass_empty"
          );
          setLoading(false);
          return;
        }
        throw new Error(`Gagal memuat data (${res.status})`);
      }
      const data: SearchResult = await res.json();
      setResult(data);
    } catch (err: any) {
      console.error("Search error:", err);
      triggerToast("Gagal memuat hasil pencarian", "error");
    } finally {
      setLoading(false);
    }
  };

  // Sync state and perform search whenever URL query param changes
  useEffect(() => {
    if (urlQuery) {
      setQuery(urlQuery);
      setInputValue(urlQuery);
      performSearch(urlQuery);
    } else {
      setQuery("");
      setInputValue("");
      setResult(null);
    }
  }, [urlQuery]);

  // Ambient parallax effect on mouse move
  useEffect(() => {
    const bg = document.getElementById("dynamicBgWrapper");
    if (!bg) return;
    let tx = 0, ty = 0, cx = 0, cy = 0, ticking = false;
    const onMove = (e: MouseEvent) => {
      const hw = window.innerWidth / 2,
        hh = window.innerHeight / 2;
      tx = ((e.clientX - hw) / hw) * 30;
      ty = ((e.clientY - hh) / hh) * 22;
      if (!ticking) {
        requestAnimationFrame(tick);
        ticking = true;
      }
    };
    const tick = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      bg.style.transform = `scale(1.1) translate3d(${cx.toFixed(2)}px,${cy.toFixed(2)}px,0)`;
      if (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) requestAnimationFrame(tick);
      else ticking = false;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Voice Search via Web Speech API (PRD F1, F2)
  const handleVoiceSearch = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      triggerToast("Browser tidak mendukung pencarian suara", "mic_off");
      return;
    }
    try {
      const recognition = new SpeechRecognition();
      recognition.lang = "id-ID";
      recognition.interimResults = false;
      recognition.onstart = () => {
        setIsListening(true);
        triggerToast("Mendengarkan... Silakan ucapkan kata kunci budaya", "mic");
      };
      recognition.onresult = (e: any) => {
        const text = e.results[0][0].transcript;
        setIsListening(false);
        if (text && text.trim()) {
          setInputValue(text.trim());
          handleSearch(text.trim());
        }
      };
      recognition.onerror = () => {
        setIsListening(false);
        triggerToast("Gagal mendeteksi suara", "mic_off");
      };
      recognition.onend = () => setIsListening(false);
      recognition.start();
    } catch {
      setIsListening(false);
      triggerToast("Pencarian suara belum dapat diakses", "mic_off");
    }
  };

  const handleSearch = (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    setQuery(trimmed);
    setInputValue(trimmed);
    setShowSuggestions(false);
    window.history.replaceState(null, "", `/jelajahi?q=${encodeURIComponent(trimmed)}`);
    performSearch(trimmed);
  };

  // Audio Playback Handler (PRD F3 & F14: Gemini TTS with "audio belum tersedia" fallback)
  const handleToggleAudio = async () => {
    if (isPlaying) {
      if (activeAudioRef.current) {
        activeAudioRef.current.pause();
        activeAudioRef.current = null;
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setIsPlaying(false);
      return;
    }

    if (!result || !result.card2) return;

    setIsPlaying(true);
    triggerToast("Menyiapkan audio SORA...", "volume_up");

    const textToSpeak = `${result.card2.title}. ${result.card2.highlight} ${result.card2.paragraphs[0] || ""}`;

    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: textToSpeak }),
      });

      if (res.status === 429) {
        const errData = await res.json().catch(() => ({}));
        setIsPlaying(false);
        triggerToast(
          errData?.error || "Terlalu banyak permintaan suara. Silakan coba sebentar lagi.",
          "volume_off"
        );
        return;
      }

      const data = await res.json().catch(() => ({}));

      if (data?.available && data?.audioBase64) {
        const audioSrc = `data:${data.mimeType || "audio/wav"};base64,${data.audioBase64}`;
        const audio = new Audio(audioSrc);
        activeAudioRef.current = audio;

        audio.onended = () => {
          setIsPlaying(false);
          activeAudioRef.current = null;
        };

        audio.onerror = () => {
          setIsPlaying(false);
          activeAudioRef.current = null;
          triggerToast("audio belum tersedia", "volume_off");
        };

        await audio.play();
        return;
      }

      // If external Gemini TTS is unavailable, try browser SpeechSynthesis as fallback
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = "id-ID";
        utterance.rate = 0.95;
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => {
          setIsPlaying(false);
          triggerToast("audio belum tersedia", "volume_off");
        };
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
        return;
      }

      // Final fallback message per PRD F3 & F14
      setIsPlaying(false);
      triggerToast("audio belum tersedia", "volume_off");
    } catch (err) {
      console.warn("TTS playback error:", err);
      setIsPlaying(false);
      triggerToast("audio belum tersedia", "volume_off");
    }
  };

  return (
    <>
      <style>{`
        @keyframes floatOrb1{0%{transform:translate(0,0) scale(1) rotate(0deg);opacity:.75}30%{transform:translate(18vw,12vh) scale(1.3) rotate(25deg);opacity:.95}65%{transform:translate(-10vw,22vh) scale(.9) rotate(-18deg);opacity:.7}85%{transform:translate(8vw,-10vh) scale(1.22) rotate(12deg);opacity:.9}100%{transform:translate(0,0) scale(1) rotate(0deg);opacity:.75}}
        @keyframes floatOrb2{0%{transform:translate(0,0) scale(1) rotate(0deg);opacity:.8}35%{transform:translate(-22vw,16vh) scale(1.35) rotate(-30deg);opacity:.95}70%{transform:translate(16vw,-14vh) scale(.85) rotate(20deg);opacity:.65}100%{transform:translate(0,0) scale(1) rotate(0deg);opacity:.8}}
        @keyframes floatOrb3{0%{transform:translate(0,0) scale(.9) rotate(0deg);opacity:.7}40%{transform:translate(24vw,-18vh) scale(1.32) rotate(35deg);opacity:.92}75%{transform:translate(-18vw,15vh) scale(.88) rotate(-25deg);opacity:.68}100%{transform:translate(0,0) scale(.9) rotate(0deg);opacity:.7}}
        @keyframes floatOrb4{0%{transform:translate(0,0) scale(1.05) rotate(0deg);opacity:.75}45%{transform:translate(-20vw,-18vh) scale(1.28) rotate(-22deg);opacity:.95}80%{transform:translate(15vw,16vh) scale(.92) rotate(28deg);opacity:.7}100%{transform:translate(0,0) scale(1.05) rotate(0deg);opacity:.75}}
        @keyframes floatOrb5{0%{transform:translate(0,0) scale(1);opacity:.6}50%{transform:translate(16vw,20vh) scale(1.3);opacity:.85}100%{transform:translate(0,0) scale(1);opacity:.6}}
        @keyframes floatEmber1{0%{transform:translate(0,0) scale(.8);opacity:.3}50%{transform:translate(6vw,-15vh) scale(1.4);opacity:.85}100%{transform:translate(-4vw,-30vh) scale(.6);opacity:.1}}
        @keyframes floatEmber2{0%{transform:translate(0,0) scale(1);opacity:.25}50%{transform:translate(-8vw,-20vh) scale(1.5);opacity:.9}100%{transform:translate(5vw,-40vh) scale(.7);opacity:.1}}
        @keyframes eqBar{0%,100%{height:5px}50%{height:14px}}
        .animate-orb-1{animation:floatOrb1 7.5s ease-in-out infinite}
        .animate-orb-2{animation:floatOrb2 8.5s ease-in-out infinite}
        .animate-orb-3{animation:floatOrb3 6.8s ease-in-out infinite}
        .animate-orb-4{animation:floatOrb4 9s ease-in-out infinite}
        .animate-orb-5{animation:floatOrb5 8s ease-in-out infinite}
        .animate-ember-1{animation:floatEmber1 9s ease-in-out infinite}
        .animate-ember-2{animation:floatEmber2 8s ease-in-out infinite 2s}
        .eq-bar{display:inline-block;width:2px;border-radius:2px;animation:eqBar 0.7s ease-in-out infinite}
        .eq-bar:nth-child(2){animation-delay:.1s}
        .eq-bar:nth-child(3){animation-delay:.22s}
        .eq-bar:nth-child(4){animation-delay:.34s}
        .expanded-body{transition:max-height .55s cubic-bezier(.2,.8,.2,1),opacity .4s ease;overflow:hidden}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
      `}</style>

      <AmbientBackground />

      <main className="relative z-10 w-full min-h-screen pt-28 pb-20">
        <div className="flex flex-col w-full max-w-7xl mx-auto px-5 md:px-12 gap-8">

          {/* ── SEARCH CAPSULE (PRD F2) ── */}
          <section className="relative w-full flex flex-col items-center z-[100]">
            <div className="relative w-full max-w-[720px] mx-auto z-[100]">
              <div className="relative w-full bg-white/[0.04] border border-white/10 shadow-xl backdrop-blur-2xl rounded-full">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSearch(inputValue);
                  }}
                  className="flex items-center w-full px-4 py-2.5 gap-3"
                >
                  <button
                    type="button"
                    onClick={() => router.push("/")}
                    aria-label="Kembali ke Beranda"
                    className="flex items-center justify-center p-1.5 -ml-1 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M19 12H5" /><path d="M12 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    type="submit"
                    aria-label="Cari"
                    className="flex items-center justify-center p-0 text-amber-400 hover:text-amber-300 transition-colors shrink-0 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-xl">search</span>
                  </button>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    placeholder="Cari budaya, sejarah, kuliner Sumsel..."
                    className="flex-1 min-w-0 bg-transparent border-0 outline-none focus:outline-none focus:ring-0 text-base md:text-[17px] text-white placeholder:text-white/30 font-medium"
                  />
                  {inputValue && (
                    <button
                      type="button"
                      onClick={() => { setInputValue(""); inputRef.current?.focus(); }}
                      className="p-1.5 rounded-full hover:bg-white/10 text-white/40 hover:text-white transition-colors shrink-0 cursor-pointer"
                      title="Hapus pencarian"
                    >
                      <span className="material-symbols-outlined text-lg">close</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleVoiceSearch}
                    aria-label="Pencarian Suara"
                    title="Pencarian Suara"
                    className={`p-1.5 rounded-full transition-all shrink-0 cursor-pointer ${
                      isListening
                        ? "bg-red-500/80 text-white animate-pulse"
                        : "text-white/40 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>
                  </button>
                </form>

                {/* Suggestions dropdown */}
                {showSuggestions && (
                  <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-[#141014]/95 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-2xl overflow-hidden z-[200]">
                    {SUGGESTIONS.filter(
                      (s) => s.toLowerCase().includes(inputValue.toLowerCase()) || inputValue.length < 2
                    ).map((s, i) => (
                      <button
                        key={i}
                        type="button"
                        onMouseDown={() => handleSearch(s)}
                        className="w-full flex items-center gap-3 px-5 py-3 hover:bg-white/[0.05] text-left transition-colors"
                      >
                        <span className="material-symbols-outlined text-base text-amber-400/60 shrink-0">history</span>
                        <span className="text-sm text-white/75 truncate">{s}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* ── LOADING STATE ── */}
          {loading && (
            <div className="w-full flex flex-col items-center justify-center py-24 gap-4">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 rounded-full border-2 border-amber-400/20 border-t-amber-400 animate-spin" />
                <div className="absolute inset-2 rounded-full border-2 border-rose-500/20 border-b-rose-400 animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.2s" }} />
              </div>
              <p className="text-sm md:text-base font-medium text-amber-200/80 animate-pulse">
                Menganalisis warisan budaya Sumatera Selatan dengan SORA AI...
              </p>
            </div>
          )}

          {/* ── INITIAL STATE (NO QUERY) — PRD F2: 8 TEMA & PINTASAN ── */}
          {!loading && !result && !query && (
            <div className="flex flex-col gap-10 py-6">
              <div className="flex flex-col items-center text-center gap-3 max-w-2xl mx-auto">
                <span className="px-3.5 py-1 rounded-full border border-amber-400/30 bg-amber-500/10 text-amber-300 text-xs font-semibold tracking-wider uppercase">
                  Pusat Eksplorasi Budaya
                </span>
                <h2 className="text-3xl md:text-4xl text-white font-serif font-medium">
                  Jelajahi Khazanah Bumi Sriwijaya
                </h2>
                <p className="text-sm md:text-base text-white/60 leading-relaxed">
                  Pilih salah satu dari 8 pilar tema budaya, atau ketik topik spesifik seperti nama kain tenun, rumah adat, atau kuliner favorit Anda.
                </p>
              </div>

              {/* 8 Tema Grid Pintasan */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {themes.map((theme) => (
                  <Link
                    key={theme.slug}
                    href={`/tema/${theme.slug}`}
                    className="group relative h-48 md:h-56 rounded-2xl overflow-hidden border border-white/10 hover:border-amber-400/50 transition-all duration-300 shadow-lg flex flex-col justify-end p-4"
                  >
                    <img
                      src={theme.heroImage || theme.image}
                      alt={theme.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
                    <div className="relative z-10 flex flex-col gap-1">
                      <span className="text-[10px] uppercase font-semibold text-amber-300 tracking-wider">
                        {theme.guidebook[0] || "Tema Budaya"}
                      </span>
                      <h3 className="text-base md:text-lg font-medium text-white group-hover:text-amber-200 transition-colors">
                        {theme.title}
                      </h3>
                      <p className="text-xs text-white/70 line-clamp-1">{theme.tagline}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* ── NO RESULT TEMPLATE ── */}
          {!loading && result?.status === "no_result" && (
            <div className="w-full flex flex-col items-center text-center py-16 px-4 max-w-2xl mx-auto gap-6 bg-white/[0.02] border border-white/10 rounded-3xl backdrop-blur-xl">
              <div className="w-16 h-16 rounded-full bg-amber-950/40 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <span className="material-symbols-outlined text-3xl">travel_explore</span>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl md:text-3xl text-white font-medium">
                  Pertanyaan Tidak Dapat Dijawab
                </h2>
                <p className="text-sm md:text-base text-white/60 leading-relaxed">
                  SORA AI dapat menjawab pertanyaan tentang{" "}
                  <strong className="text-amber-300 font-semibold">Sumatera Selatan</strong>,
                  tempat wisata, kuliner, sejarah, dan pengetahuan umum.
                  Coba ubah kata kunci Anda.
                </p>
              </div>

              <div className="flex flex-col gap-3 w-full pt-2">
                <p className="text-xs uppercase font-semibold tracking-wider text-white/40">
                  Coba contoh pertanyaan:
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {[
                    "Wisata terbaik di Palembang",
                    "Makanan khas Sumsel",
                    "Monpera Palembang",
                    "Songket Lepus",
                    "Rumah Limas",
                    "Tari Gending Sriwijaya",
                  ].map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => handleSearch(chip)}
                      className="px-4 py-2 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/10 hover:border-amber-400/40 text-xs md:text-sm text-white/80 transition-all cursor-pointer"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}


          {/* ── RESULT VALID: 3-CARD TEMPLATE (PRD F2, F3, F9) ── */}
          {!loading && result && result.status !== "no_result" && (
            <>
              {/* Header Label */}
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-2xl text-amber-300">auto_awesome</span>
                <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">Rangkuman SORA</h1>
              </div>

              {/* Outside Sumsel Notice (PRD Bagian 9) */}
              {result.status === "outside_sumsel" && result.note && (
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-950/40 border border-amber-400/40 text-amber-200 text-xs md:text-sm">
                  <span className="material-symbols-outlined text-lg shrink-0 text-amber-400">info</span>
                  <p className="leading-relaxed">{result.note}</p>
                </div>
              )}

              {/* ── 2-COLUMN LAYOUT (KARTU 1 & KARTU 2) ── */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                {/* KARTU 1 — Foto dari web (Wikipedia/real), tanpa teks, tidak bisa diklik */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                  <div
                    className="relative overflow-hidden border border-amber-400/20 bg-[#0d0d0f] shadow-[0_0_35px_rgba(212,175,55,0.12)] rounded-3xl select-none"
                    style={{ height: 480 }}
                  >
                    {/* Love Button on Image Card */}
                    <div className="absolute top-4 right-4 z-20">
                      <LoveButton
                        itemType="image"
                        itemRef={result.card1.title || query}
                        title={result.card1.title}
                        imageUrl={result.card1.image}
                        creator={
                          result.card2?.highlight
                            ? (result.card2.highlight.length > 95
                                ? result.card2.highlight.slice(0, 92) + "..."
                                : result.card2.highlight)
                            : (result.card2?.paragraphs?.[0]
                                ? (result.card2.paragraphs[0].length > 95
                                    ? result.card2.paragraphs[0].slice(0, 92) + "..."
                                    : result.card2.paragraphs[0])
                                : `Dokumentasi visual pesona budaya ${result.card1.title || query || "Sumatera Selatan"}`)
                        }
                        sourceUrl={result.card2.sources?.[0]?.url || `/jelajahi?q=${encodeURIComponent(query)}`}
                        size="sm"
                      />
                    </div>
                    {result.card1.image && !result.card1.image.startsWith("/images/") ? (
                      <img
                        src={result.card1.image}
                        alt={result.card1.title}
                        className="w-full h-full object-cover rounded-3xl"
                        draggable={false}
                        onError={(e) => {
                          // Jika gambar gagal load, sembunyikan elemen
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    ) : (
                      // Elegant dark gradient fallback
                      <div className="w-full h-full rounded-3xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#3a0a14] via-[#0d0d0f] to-[#1a1200]" />
                        <div className="absolute inset-0" style={{
                          background: "radial-gradient(ellipse at 30% 40%, rgba(212,175,55,0.12) 0%, transparent 60%), radial-gradient(ellipse at 70% 70%, rgba(107,29,47,0.25) 0%, transparent 55%)"
                        }} />
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/20">
                          <span className="material-symbols-outlined text-6xl">photo_camera</span>
                          <span className="text-xs tracking-widest uppercase">{result.card1.title}</span>
                        </div>
                      </div>
                    )}
                    {/* Label sumber foto */}
                    {result.card1.image && !result.card1.image.startsWith("/images/") && (
                      <div className="absolute bottom-3 right-4 pointer-events-none">
                        <span className="text-[9px] font-medium text-white/35 tracking-wider uppercase bg-black/50 px-2 py-0.5 rounded-full backdrop-blur-sm">
                          Wikimedia Commons
                        </span>
                      </div>
                    )}
                  </div>


                  {/* Sources Section — clickable links */}
                  {result.card2.sources && result.card2.sources.length > 0 && (
                    <div
                      className="expanded-body"
                      style={{ maxHeight: expanded ? "500px" : "0px", opacity: expanded ? 1 : 0 }}
                    >
                      <div className="rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl p-4 flex flex-col gap-3 shadow-xl">
                        <p className="text-[10px] font-semibold text-white/35 uppercase tracking-[0.15em] px-1">Sumber Referensi</p>
                        {result.card2.sources.map((art, i) => (
                          <div key={i}>
                            {i > 0 && <div className="h-px bg-white/[0.06] my-1" />}
                            <a
                              href={art.url || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-start gap-3 p-2 rounded-xl hover:bg-white/[0.06] transition-colors cursor-pointer group/art no-underline block"
                            >
                              <div className="flex flex-col gap-1 min-w-0 flex-1">
                                <div className="flex items-center gap-1.5">
                                  <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 ${art.iconStyle}`}>
                                    {art.icon}
                                  </div>
                                  <span className="text-[11px] text-white/45 truncate">{art.domain}</span>
                                  <span className="material-symbols-outlined text-[11px] text-white/25 ml-auto shrink-0">open_in_new</span>
                                </div>
                                <p className="text-[13px] font-medium text-white group-hover/art:text-amber-300 transition-colors line-clamp-1">{art.title}</p>
                                <p className="text-[11px] text-white/40 line-clamp-2 leading-relaxed">{art.excerpt}</p>
                              </div>
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* KARTU 2 — AI Summary Card */}
                <div className="lg:col-span-7">
                  <article className="relative w-full rounded-3xl overflow-hidden bg-[#0d0d0f]/60 border border-white/10 backdrop-blur-2xl p-6 md:p-8 flex flex-col gap-5 shadow-2xl hover:border-amber-400/25 transition-all duration-300 min-h-[480px]">
                    {/* Decorative mandala */}
                    <div className="absolute -right-8 -bottom-10 pointer-events-none w-64 h-64 opacity-10 text-amber-400 mix-blend-screen z-0">
                      <svg className="w-full h-full rotate-12" fill="none" viewBox="0 0 200 200">
                        <g stroke="currentColor" strokeWidth="1">
                          <circle cx="100" cy="100" r="80" strokeDasharray="3 3" />
                          <circle cx="100" cy="100" r="56" />
                          <circle cx="100" cy="100" r="32" strokeDasharray="2 2" />
                          <polygon fill="currentColor" fillOpacity="0.1" points="100,10 120,80 190,100 120,120 100,190 80,120 10,100 80,80" strokeWidth="1.5" />
                        </g>
                      </svg>
                    </div>

                    <div className="relative z-10 flex flex-col gap-5 w-full">
                      {/* Audio Button */}
                      <button
                        type="button"
                        onClick={handleToggleAudio}
                        className="inline-flex items-center gap-2.5 px-0 py-0 bg-transparent hover:opacity-90 text-left focus:outline-none group cursor-pointer transition-all w-fit"
                      >
                        <span className="material-symbols-outlined text-[26px] text-amber-400 select-none transition-transform group-hover:scale-105 shrink-0">
                          {isPlaying ? "pause" : "volume_up"}
                        </span>
                        <span className="text-2xl md:text-3xl text-white font-normal select-none leading-none">
                          {isPlaying ? "Memutar SORA..." : "Dengarkan SORA"}
                        </span>
                        {isPlaying && (
                          <span className="flex items-end gap-0.5 h-4 px-1">
                            {[0, 1, 2, 3].map((i) => (
                              <span
                                key={i}
                                className={`eq-bar ${i % 2 === 0 ? "bg-amber-300" : "bg-rose-400"}`}
                                style={{ height: 8, animationDelay: `${i * 120}ms` }}
                              />
                            ))}
                          </span>
                        )}
                      </button>

                      {/* Highlighted text */}
                      {result.card2.highlight && (
                        <p className="text-base leading-[1.85] text-white/90">
                          <span
                            className="bg-[#6b1d2f]/90 text-amber-50 px-2 py-0.5 rounded font-normal shadow-sm border-l-2 border-amber-400/60"
                            style={{ boxDecorationBreak: "clone" as React.CSSProperties["boxDecorationBreak"] }}
                          >
                            {result.card2.highlight}
                          </span>
                        </p>
                      )}

                      {/* Paragraphs */}
                      <div className="flex flex-col gap-3 text-white/70 text-base leading-relaxed">
                        {result.card2.paragraphs[0] && (
                          <p>{result.card2.paragraphs[0]}</p>
                        )}

                        {result.card2.paragraphs[1] && (
                          <p
                            style={
                              !expanded
                                ? { WebkitMaskImage: "linear-gradient(black 30%, transparent 100%)", maskImage: "linear-gradient(black 30%, transparent 100%)" }
                                : {}
                            }
                          >
                            {result.card2.paragraphs[1]}
                          </p>
                        )}

                        {/* Expanded details & bullets */}
                        <div
                          className="expanded-body"
                          style={{ maxHeight: expanded ? "600px" : "0px", opacity: expanded ? 1 : 0 }}
                        >
                          <div className="flex flex-col gap-3 pt-2">
                            {result.card2.paragraphs.slice(2).map((p, idx) => (
                              <p key={idx}>{p}</p>
                            ))}

                            {result.card2.bulletPoints && result.card2.bulletPoints.length > 0 && (
                              <div className="flex flex-col gap-2.5 pl-4 border-l-2 border-amber-400/35 mt-1">
                                {result.card2.bulletPoints.map((bp, bidx) => (
                                  <p key={bidx}>
                                    <strong className="text-amber-400 font-semibold">• {bp.label}:</strong> {bp.text}
                                  </p>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Expand / Collapse Button */}
                      <button
                        type="button"
                        onClick={() => setExpanded((v) => !v)}
                        aria-expanded={expanded}
                        className="w-full flex items-center justify-center gap-2 py-2.5 px-6 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-amber-400/40 text-white text-sm font-medium tracking-wide transition-all backdrop-blur-md focus:outline-none shadow-sm cursor-pointer"
                      >
                        <span>{expanded ? "Tampilkan lebih sedikit" : "Tampilkan lebih banyak"}</span>
                        <span
                          className="material-symbols-outlined text-base transition-transform duration-300"
                          style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
                        >
                          expand_more
                        </span>
                      </button>
                    </div>
                  </article>
                </div>
              </div>

              {/* ── KARTU 3 — KONTEN TERKAIT & FILTER TEMA ── */}
              {result.card3 && result.card3.themeSlug && result.card3.themeTitle && (
                <section className="flex flex-col gap-6 mt-12 pt-4">
                  <div>
                    <span className="text-xs uppercase font-semibold text-amber-300 tracking-wider">
                      Eksplorasi Lanjutan
                    </span>
                    <h2 className="text-2xl md:text-3xl text-white font-serif font-medium mt-1">
                      Kategori Terkait: {result.card3.themeTitle}
                    </h2>
                  </div>

                  {/* Panoramic theme card */}
                  <Link
                    href={result.card3.themeHref}
                    className="relative w-full rounded-3xl overflow-hidden border border-amber-500/20 shadow-2xl group min-h-[300px] md:min-h-[340px] flex items-center justify-center p-6 md:p-12 transition-all duration-500 hover:border-amber-400/50 hover:shadow-[0_0_60px_rgba(212,175,55,0.18)]"
                  >
                    <img
                      src={result.card3.themeImg || "/images/rumah_limas.jpg"}
                      alt={result.card3.themeTitle}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none rounded-3xl"
                    />
                    <div className="absolute inset-0 bg-black/65 backdrop-blur-[1px] pointer-events-none rounded-3xl" />

                    <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto gap-3">
                      <span className="text-[11px] md:text-xs font-semibold tracking-widest uppercase text-amber-200/90 drop-shadow-sm">
                        {result.card3.themeLabel}
                      </span>
                      <h3 className="text-2xl md:text-4xl text-white font-medium tracking-wide drop-shadow-md">
                        {result.card3.themeTitle}
                      </h3>
                      <p className="text-sm md:text-base text-white/90 max-w-xl mx-auto leading-relaxed drop-shadow-sm">
                        {result.card3.themeDesc}
                      </p>
                      <div className="pt-3">
                        <span className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 hover:border-amber-400/50 text-white hover:text-amber-300 text-sm font-medium tracking-wide transition-all backdrop-blur-md shadow-lg">
                          Jelajahi Tema Ini
                          <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                        </span>
                      </div>
                    </div>
                  </Link>


                </section>
              )}
            </>
          )}

        </div>
      </main>

      {/* ── FOOTER (PRD Bagian 5) ── */}
      <footer className="relative z-10 w-full border-t border-white/10 py-6 mt-4">
        <div className="max-w-7xl mx-auto px-5 md:px-12 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex flex-wrap items-center gap-2 text-sm text-white/30">
            <span className="font-bold bg-gradient-to-r from-[#FDE047] via-[#E9C176] to-[#DC2626] bg-clip-text text-transparent select-none text-base">SORA.Culture</span>
            <span>© Muhammad Firly Marezky & M. Rifqy Aunur Rahman</span>
            <span className="text-white/15">•</span>
            <span className="text-white/35 font-medium">2026</span>
          </div>
          <span className="text-xs text-white/20">Platform AI Warisan Budaya Sumatera Selatan</span>
        </div>
      </footer>
    </>
  );
}

export default function JelajahiPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0d0d0f] flex items-center justify-center text-white/40">
          Memuat SORA Jelajahi...
        </div>
      }
    >
      <JelajahiContent />
    </Suspense>
  );
}
