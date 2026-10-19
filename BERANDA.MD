<!DOCTYPE html><html class="scroll-smooth" lang="id" style=""><head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>Dreamina AI - Beranda &amp; Template AI</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com" rel="preconnect">
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,700&amp;family=Playfair+Display:ital,wght@0,600;0,700;1,600;1,700&amp;family=Syne:wght@600;700;800&amp;display=swap" rel="stylesheet">
<style>
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
    }
    .serif-heading {
      font-family: 'Playfair Display', serif;
    }
    @keyframes gradientFlow {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
    .animated-gradient-bg {
      background: linear-gradient(135deg, #1c1013 0%, #2f1219 25%, #40171d 45%, #622718 70%, #1c1013 100%);
      background-size: 300% 300%;
      animation: gradientFlow 16s ease infinite;
    }
    @media (prefers-reduced-motion: reduce) {
      .animated-gradient-bg {
        animation: none;
      }
    }
    .glass-card {
      background: rgba(41, 28, 31, 0.45);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.12);
    }
    .glass-card:hover {
      border-color: rgba(251, 194, 112, 0.5);
      box-shadow: 0 20px 40px -15px rgba(251, 194, 112, 0.25);
    }

    /* Infinite Marquee moving towards right */
    @keyframes marqueeRight {
      0% {
        transform: translateX(-50%);
      }
      100% {
        transform: translateX(0%);
      }
    }
    .marquee-track {
      display: flex;
      width: max-content;
      animation: marqueeRight 38s linear infinite;
      will-change: transform;
    }
    .marquee-container:hover .marquee-track,
    .marquee-container.is-dragging .marquee-track {
      animation-play-state: paused !important;
    }
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }

    /* Gallery card styles matching SCREEN_10 */
    .gallery-card {
      border-radius: 28px;
      overflow: hidden;
      position: relative;
      cursor: pointer;
      transition: transform 0.25s ease, box-shadow 0.25s ease;
    }
    .gallery-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 16px 32px -8px rgba(0, 0, 0, 0.25);
    }
    .text-shadow-custom {
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
    }
    .heading-shadow {
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.45);
    }

    /* Mosaic Puzzle Styles */
    .mosaic-tile {
      overflow: hidden;
      position: relative;
      background-color: #24130c;
    }
    .mosaic-tile img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }
    .mosaic-tile:hover img {
      transform: scale(1.06);
    }

    /* Dynamic Left and Right Scroll Animations */
    .anim-left,
    .anim-right,
    .anim-center {
      transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1),
                  transform 0.85s cubic-bezier(0.16, 1, 0.3, 1),
                  filter 0.85s cubic-bezier(0.16, 1, 0.3, 1);
      will-change: opacity, transform, filter;
    }

    /* Left elements initial / exited states */
    .anim-left.anim-out-bottom {
      opacity: 0;
      transform: translateX(-80px) translateY(20px) scale(0.96) skewX(-1.5deg);
      filter: blur(6px);
    }
    .anim-left.anim-out-top {
      opacity: 0;
      transform: translateX(-80px) translateY(-20px) scale(0.96) skewX(1.5deg);
      filter: blur(6px);
    }

    /* Right elements initial / exited states */
    .anim-right.anim-out-bottom {
      opacity: 0;
      transform: translateX(80px) translateY(20px) scale(0.96) skewX(1.5deg);
      filter: blur(6px);
    }
    .anim-right.anim-out-top {
      opacity: 0;
      transform: translateX(80px) translateY(-20px) scale(0.96) skewX(-1.5deg);
      filter: blur(6px);
    }

    /* Center scale elements initial / exited states */
    .anim-center.anim-out-bottom {
      opacity: 0;
      transform: scale(0.9) translateY(25px);
      filter: blur(6px);
    }
    .anim-center.anim-out-top {
      opacity: 0;
      transform: scale(0.9) translateY(-25px);
      filter: blur(6px);
    }

    /* Fully Active In-View State */
    .anim-in {
      opacity: 1 !important;
      transform: translate(0, 0) scale(1) skewX(0deg) !important;
      filter: blur(0) !important;
    }

    /* Stagger Delays */
    .delay-100 { transition-delay: 100ms; }
    .delay-150 { transition-delay: 150ms; }
    .delay-200 { transition-delay: 200ms; }
    .delay-250 { transition-delay: 250ms; }
    .delay-300 { transition-delay: 300ms; }

    @media (prefers-reduced-motion: reduce) {
      .anim-left,
      .anim-right,
      .anim-center {
        opacity: 1 !important;
        transform: none !important;
        filter: none !important;
        transition: none !important;
      }
    }
  </style>
</head>
<body class="text-[#f5dce1] min-h-screen selection:bg-cyan-500 selection:text-black antialiased relative overflow-x-hidden flex flex-col justify-between animated-gradient-bg" style="background: linear-gradient(-45deg, #18080c, #3a0d16, #5c1815, #852a03, #43112b, #250914, #732612); background-size: 400% 400%; animation: gradientFlow 14s ease infinite; background-attachment: fixed;">
<!-- ==========================================
     SECTION 1: HERO (EXACT SCREEN_5 CLEAN AMPERA)
     ========================================== -->
<section class="relative min-h-screen h-screen w-full flex flex-col justify-end px-6 pb-8 overflow-hidden select-none" id="hero-ampera">
<!-- Persistent Fixed Transparent Navbar -->
<header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-12 bg-black/20 backdrop-blur-md w-full" id="main-nav">
<div class="max-w-7xl mx-auto flex items-center justify-between">
<!-- Brand Logo -->
<a class="flex items-center gap-2 group" href="#">
<svg class="w-6 h-6 text-cyan-400 transform group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
<path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
</svg>
<div class="flex items-center gap-1.5 font-bold tracking-tight text-lg text-white drop-shadow-md">
<span class="">SORA.</span>
<span class="italic font-extrabold text-cyan-400">Culture</span>
</div>
</a>
<!-- Center & Right Navigation Items -->
<div class="flex items-center gap-8">
<nav class="hidden md:flex items-center gap-8 text-sm font-medium text-white/90 drop-shadow">
<a class="text-white hover:text-cyan-300 transition-colors" href="#">Beranda</a><a class="text-white/80 hover:text-white transition-colors" href="#">Jelajahi</a>
<a class="text-white/80 hover:text-white transition-colors" href="#">Favorit</a>
<a class="text-white/80 hover:text-white transition-colors" href="#">Tentang</a>
</nav>
<div class="flex items-center gap-4 text-sm">
<button class="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors drop-shadow" type="button">
<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<circle cx="12" cy="12" r="10" stroke-width="1.8"></circle>
<path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke-width="1.8"></path>
</svg>
<span class="font-medium">En</span>
</button>
<a class="text-white/80 hover:text-white font-medium transition-colors drop-shadow hidden sm:inline-block" href="#">Sign in</a>
<button class="bg-[#00f2fe] hover:bg-[#00d6e2] text-slate-950 font-bold px-5 py-2 rounded-full shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transform hover:-translate-y-0.5 active:translate-y-0 transition-all text-xs tracking-wide" type="button">
            Create now
          </button>
</div>
</div>
</div>
</header>
<!-- Full Background Image: Jembatan Ampera (Palembang) -->
<div class="absolute inset-0 z-0">
<img alt="Jembatan Ampera Malam Hari" class="w-full h-full object-cover object-center transform scale-100 transition-transform duration-700 ease-out" id="ampera-bg" src="https://lh3.googleusercontent.com/aida/AEtjO1XfZebqIrL4oWm7WFgAqCRsmGbi-MwMiqIeu3rpRSHXkuIoo9Y8_D-B7Os0VDzeb6SSj8IBBgABYIvlX6z7fEmNC-7jdn-2ld5lqqsQgamZPcv3eGWclCMcWcT4CUnQlsAUwEwL77XqqN2AmuKkVBw157XM22Vx84zd5FWfjwTjN6OyAXeJGLd-yK9TIc1dtr-TXrJEjDkDwKm1Hdu9Z2TU4__yRv3xX4E_6qnEViygNVeAo1qi3w3t6nPg" style="transform: scale(1) translateY(0px);">
<div class="absolute inset-0 bg-gradient-to-t from-[#1c1013] via-black/35 to-black/30 pointer-events-none"></div>
</div>
<!-- Bottom Hero Content: Prompt Bar & Scroll Guide (No Big Headline over Ampera) -->
<div class="relative z-10 max-w-4xl mx-auto w-full flex flex-col items-center gap-4 mb-2">
<!-- AI Search Prompt Bar -->
<div class="w-full flex items-center justify-between gap-3 px-5 py-3.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 shadow-2xl hover:border-cyan-400/60 transition-all duration-300 group">
<div class="flex items-center gap-3 flex-1 min-w-0">
<span class="p-1.5 rounded-full bg-white/10 text-cyan-300">
<svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
<path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
</svg>
</span>
<input class="bg-transparent border-none outline-none text-sm text-white placeholder-white/70 w-full focus:placeholder-white/40 focus:ring-0" placeholder="Ask anything or create with prompt..." type="text">
</div>
<div class="flex items-center gap-2 sm:gap-3 text-white/80">
<button class="hover:text-white p-1.5 hover:bg-white/15 rounded-full transition-colors" title="Upload Image" type="button">
<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
</svg>
</button>
<button class="hover:text-white p-1.5 hover:bg-white/15 rounded-full transition-colors" title="Voice Input" type="button">
<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
</svg>
</button>
<button class="w-8 h-8 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 flex items-center justify-center transition-all transform active:scale-95 shadow-lg shadow-cyan-500/30" title="Generate" type="button">
<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path d="M5 10l7-7m0 0l7 7m-7-7v18" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"></path>
</svg>
</button>
</div>
</div>
<!-- Scroll Down Indicator Guide -->
<a class="inline-flex flex-col items-center gap-1.5 text-xs text-white/70 hover:text-white font-medium tracking-wider uppercase transition-colors group mt-1 cursor-pointer" href="#showcase">
<span class="text-[11px] font-semibold tracking-widest text-[#fbc270]/90">SCROLL DOWN TO EXPLORE</span>
<div class="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center p-1 group-hover:border-cyan-400 transition-colors">
<div class="w-1.5 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
</div>
</a>
</div>
<!-- Audio Mute/Unmute Floating Button -->
<div class="absolute bottom-6 left-6 md:left-10 z-20">
<button class="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/75 transition-all shadow-lg" id="audio-toggle-btn" title="Mute/Unmute audio" type="button">
<svg class="w-4 h-4" fill="none" id="audio-icon-svg" stroke="currentColor" viewBox="0 0 24 24">
<path d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
<path d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
</svg>
</button>
</div>
<!-- Seamless Gradient Transition -->
<div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#1c1013]/70 to-[#1c1013] pointer-events-none z-10"></div>
</section>
<!-- ==========================================
     SECTION 2: TEMPLATE SHOWCASE (EXACT SCREEN_5 - TETAP TANPA ANIMASI SCROLL MASUK/KELUAR)
     ========================================== -->
<section class="relative min-h-screen py-16 flex flex-col justify-center items-center transition-all overflow-hidden bg-transparent" id="showcase">
<div class="max-w-7xl mx-auto px-6 relative z-10">
<!-- Header Titles matching SCREEN_5 -->
<div class="text-center mb-12 md:mb-16">
<h2 class="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
        Start with a Template.
      </h2>
<p class="text-3xl sm:text-4xl md:text-5xl font-bold serif-heading italic text-white drop-shadow-md">
<span class="font-normal font-sans not-italic text-white/95">Make</span> Anything, Any Style with AI
      </p>
<div class="flex items-center justify-center gap-2 mt-4 text-xs tracking-wider text-white/60">
<svg class="w-3.5 h-3.5 text-[#fbc270]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
</svg>
<span class="">Gerakan otomatis ke kanan • Arahkan kursor atau drag untuk menggeser</span>
</div>
</div>
</div>
<!-- Continuous Rightward Marquee / Carousel Wrapper (Set 1 & 2 exact from SCREEN_5) -->
<div class="marquee-container relative w-full overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing select-none py-4" id="carousel-viewport">
<div class="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-20 bg-gradient-to-r from-[#1c1013] to-transparent"></div>
<div class="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-20 bg-gradient-to-l from-[#1c1013] to-transparent"></div>
<div class="marquee-track flex gap-5 sm:gap-6 px-4" id="marquee-track">
<!-- SET 1 (8 Original Cards from SCREEN_5) -->
<!-- Card 1: Trending effects -->
<div class="w-[230px] sm:w-[260px] md:w-[280px] shrink-0 group relative rounded-2xl overflow-hidden aspect-[9/16] glass-card shadow-2xl transition-all duration-500 transform hover:-translate-y-2 p-5 cursor-pointer flex flex-col justify-between">
<img alt="Trending effects" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100 pointer-events-none" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjo3q0wkwF4309ysQRnifFBGpEKLOx_aTQBFMUZ0Abi3vaUtUPCHXpBP42S7EF18WKLcUU0D2kzbp7n3LuBGhLGvVrywiKEkJ-w7tQy6nn34gxOYJA2_GBkGCjLdgw5izP6aCJ_e0HWOlwMJYRJO4YU6vxoZFQGXuWDCAAXYXpjjNnXXFa1Z21rrgiICsvXX976w48gXcGRVJ0fw-zHeY-Bn8oy_CNFjTw1LbXH8GUyNvCCIyht9wOBw">
<div class="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70 pointer-events-none z-0"></div>
<div class="relative z-10">
<span class="text-sm font-semibold tracking-wide text-white drop-shadow-md">Trending effects</span>
</div>
<div class="relative z-10 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
<span class="text-xs text-[#fbc270] font-medium flex items-center gap-1">Eksplorasi Efek ↗</span>
</div>
</div>
<!-- Card 2: AI photo editor -->
<div class="w-[230px] sm:w-[260px] md:w-[280px] shrink-0 group relative rounded-2xl overflow-hidden aspect-[9/16] glass-card shadow-2xl transition-all duration-500 transform hover:-translate-y-2 p-5 cursor-pointer flex flex-col justify-between">
<img alt="AI photo editor" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100 pointer-events-none" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZ4uRuhTovw4ECB08lsL7nJ25i_cGmhquFX80zcem-NA6nGOwYYGU2VN7S6IaXZg7-FcdKE-DNtwzm2jlKniqB01gBtU3LlmPxvHuy1o93iXY5M1KErN49j03km50vphp224xx2v3qABXCbqPZ07ejeOIlWHpUcgxVV6Zek0m54ROQs2qfWL9oy_FORsf21Pl44GPj6NR9l5ZHPEiGZQnbB7vqeQMtHpAJaI0ymrS80ATsHqYERxOaWQ">
<div class="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70 pointer-events-none z-0"></div>
<div class="relative z-10">
<span class="text-sm font-semibold tracking-wide text-white drop-shadow-md">AI photo editor</span>
</div>
<div class="relative z-10 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
<span class="text-xs text-[#fbc270] font-medium flex items-center gap-1">Edit Foto ↗</span>
</div>
</div>
<!-- Card 3: Style transfer -->
<div class="w-[230px] sm:w-[260px] md:w-[280px] shrink-0 group relative rounded-2xl overflow-hidden aspect-[9/16] glass-card shadow-2xl transition-all duration-500 transform hover:-translate-y-2 p-5 cursor-pointer flex flex-col justify-between">
<img alt="Style transfer" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100 pointer-events-none" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxVr3kz4amotXPGmZU1QmX6fF3ypQ5BLvxIzfjEXOOrQm0cVBROxvjWy6-2-lB5InR8quC9v6nDIpbDQAen_oT9loQ_p80L1yimGMCeMFZ7OegCV5zX-rTsMnuhXBsCRdqGgtJ1-WQh5nZLTv0aKGvnenNp5JShP720tggocoA2mZvHOwYMbsIJBrbSl_SIAtUIklOpSjBUsXFz54ClWeQosLApv85dcSLfLI9pvWcT7aeNSaKt66AGw">
<div class="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70 pointer-events-none z-0"></div>
<div class="relative z-10">
<span class="text-sm font-semibold tracking-wide text-white drop-shadow-md">Style transfer</span>
</div>
<div class="relative z-10 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
<span class="text-xs text-[#fbc270] font-medium flex items-center gap-1">Ganti Gaya ↗</span>
</div>
</div>
<!-- Card 4: Logos & Icons -->
<div class="w-[230px] sm:w-[260px] md:w-[280px] shrink-0 group relative rounded-2xl overflow-hidden aspect-[9/16] glass-card shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col justify-between p-5 cursor-pointer">
<img alt="Logos &amp; Icons" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100 pointer-events-none" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD33ujpFKVJJfkQltywAkN2qy8gyG6Jvre-H1S5rtnRViBMBeTf4G6KjhmitkZEcqT7x9khUdiwaaX2vKTJAkLZ70nDnJ_0r7utDESWsjIIsxTseaJy0fhHZpTSi6pd1MEizGael21tnUO84D3dWqTaq3rJ_-HOG6uXNp0qrkMoyECRPr-ahzZPZTLlLcpCjyY96m1Sf_PX6KCsB89d9Lo_plJ80Mnl2iaZxIPdPF8S-p_XrYHEmVSaTw">
<div class="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70 pointer-events-none z-0"></div>
<div class="relative z-10 flex items-center justify-between">
<span class="text-sm font-semibold tracking-wide text-white drop-shadow-md">Logos &amp; Icons</span>
<span class="text-xs font-semibold text-cyan-300 group-hover:text-white flex items-center gap-0.5 transition-colors drop-shadow">
            Try now <span class="text-[10px]">↗</span>
</span>
</div>
<div class="relative z-10">
<span class="text-[11px] text-white/70 block">Desain Vektor &amp; Brand</span>
</div>
</div>
<!-- Card 5: Poster design -->
<div class="w-[230px] sm:w-[260px] md:w-[280px] shrink-0 group relative rounded-2xl overflow-hidden aspect-[9/16] glass-card shadow-2xl transition-all duration-500 transform hover:-translate-y-2 p-5 cursor-pointer flex flex-col justify-between">
<img alt="Poster design" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100 pointer-events-none" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDOGvQpfEu2bRpdRZvLLPY-pZnCE9YZIT5kqm0UTk09eFvlZrnoPjaTE-S3c7h1Enc6P5HJYPTUDIUhzmSFV3AR_ZWpWurYH8Kf5pJ31jav4gCO3Ta-L6V8UYy7Gu5CAwy1bIdoDIjWdZDpI5Efhda4NQKQE9UrlEBLD8Q4qKDkrrlgpzLupiVDOhOD2hG67XMsTLKagBXavemwdSC6uGV5leHvKynitkOGBcjtJMYJ2gmQzc_2wACRQ">
<div class="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70 pointer-events-none z-0"></div>
<div class="relative z-10">
<span class="text-sm font-semibold tracking-wide text-white drop-shadow-md">Poster design</span>
</div>
<div class="relative z-10 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
<span class="text-xs text-[#fbc270] font-medium flex items-center gap-1">Buat Poster ↗</span>
</div>
</div>
<!-- Card 6: 3D Game Avatars -->
<div class="w-[230px] sm:w-[260px] md:w-[280px] shrink-0 group relative rounded-2xl overflow-hidden aspect-[9/16] glass-card shadow-2xl transition-all duration-500 transform hover:-translate-y-2 p-5 cursor-pointer flex flex-col justify-between">
<img alt="3D Game Avatars" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100 pointer-events-none" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOKHEFxvnCejRGr98n48vO4JgTC1RA_AxFH_R6AhYjclQZFxRwVkafw5skbsH5dd5ycFjoq95Kkx71jNaokHe1-BPrsXoqLwdUaVxxDz9UhvfEagy-E68xUKZs_Zw05eRFPWPKsgoGgBlQJxD7own3WB1sDibPKmYeydZn_kzhPcGJKY_5IEql-cz7YY9n_X_lB13B9wfh1-uGayNGQ-QhCsTIfBMoJY2KVajhzubTlaAHYNQzXel64g">
<div class="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70 pointer-events-none z-0"></div>
<div class="relative z-10">
<span class="text-sm font-semibold tracking-wide text-white drop-shadow-md">3D Game Avatars</span>
</div>
<div class="relative z-10 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
<span class="text-xs text-[#fbc270] font-medium flex items-center gap-1">Karakter 3D ↗</span>
</div>
</div>
<!-- Card 7: Anime Art generator -->
<div class="w-[230px] sm:w-[260px] md:w-[280px] shrink-0 group relative rounded-2xl overflow-hidden aspect-[9/16] glass-card shadow-2xl transition-all duration-500 transform hover:-translate-y-2 p-5 cursor-pointer flex flex-col justify-between">
<img alt="Anime Art generator" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100 pointer-events-none" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAW5bkv_bxnGVQLnoxdmKFwqZl8QxKGxXhBtsCr7lPkoXNB-D81vLeoUbOG7tb14Pq4h7VzvWhDjBMWlxOPwQkLLgZoAOs1kxy3eTwlI1ZxXwsYlb44wnhT9lkagWome5ZE3l78g31TVTJA4n1_Mu8M3e_yoe20iwKXjLZZ20X0EbxjcKupPXMBFZqq2pkFFim-5HXVQGATjfd7JsXqdUVHK8SST2KoIjQbkW_kDDnqyGNttP-eLzU7OQ">
<div class="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70 pointer-events-none z-0"></div>
<div class="relative z-10">
<span class="text-sm font-semibold tracking-wide text-white drop-shadow-md">Anime Art generator</span>
</div>
<div class="relative z-10 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
<span class="text-xs text-[#fbc270] font-medium flex items-center gap-1">Visual Anime ↗</span>
</div>
</div>
<!-- Card 8: Cyberpunk Concept -->
<div class="w-[230px] sm:w-[260px] md:w-[280px] shrink-0 group relative rounded-2xl overflow-hidden aspect-[9/16] glass-card shadow-2xl transition-all duration-500 transform hover:-translate-y-2 p-5 cursor-pointer flex flex-col justify-between">
<img alt="Cyberpunk Concept" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100 pointer-events-none" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAha7jy_32rW06nw3c5pCJx9eu9QaXViWo1ew3YWSA7g5nGs0rZTSh4Kxk8jov9CQ6hJtcA4PHpM7LL7jpv44Jh3lvg3qujFMS8WMq5BB69mR3ShGGQD6znP-Jwi27jnxHwVOBFBQcywwQAyuiEMykNHXSyd-KN-0Xr4GBDiZ1F1jJJlgRJGjTjqaMhC8tV5My-epU_YBhMSnSqFJsdJS2cZjKWhGOecmpJ9CQEwj0bHE36d16CvdthaA">
<div class="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70 pointer-events-none z-0"></div>
<div class="relative z-10">
<span class="text-sm font-semibold tracking-wide text-white drop-shadow-md">Cyberpunk Concept</span>
</div>
<div class="relative z-10 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
<span class="text-xs text-[#fbc270] font-medium flex items-center gap-1">Konsep Futuristik ↗</span>
</div>
</div>
<!-- SET 2 (Duplicate for Seamless Infinite Marquee Loop) -->
<!-- Card 1 -->
<div aria-hidden="true" class="w-[230px] sm:w-[260px] md:w-[280px] shrink-0 group relative rounded-2xl overflow-hidden aspect-[9/16] glass-card shadow-2xl transition-all duration-500 transform hover:-translate-y-2 p-5 cursor-pointer flex flex-col justify-between">
<img alt="Trending effects" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100 pointer-events-none" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjo3q0wkwF4309ysQRnifFBGpEKLOx_aTQBFMUZ0Abi3vaUtUPCHXpBP42S7EF18WKLcUU0D2kzbp7n3LuBGhLGvVrywiKEkJ-w7tQy6nn34gxOYJA2_GBkGCjLdgw5izP6aCJ_e0HWOlwMJYRJO4YU6vxoZFQGXuWDCAAXYXpjjNnXXFa1Z21rrgiICsvXX976w48gXcGRVJ0fw-zHeY-Bn8oy_CNFjTw1LbXH8GUyNvCCIyht9wOBw">
<div class="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70 pointer-events-none z-0"></div>
<div class="relative z-10">
<span class="text-sm font-semibold tracking-wide text-white drop-shadow-md">Trending effects</span>
</div>
<div class="relative z-10 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
<span class="text-xs text-[#fbc270] font-medium flex items-center gap-1">Eksplorasi Efek ↗</span>
</div>
</div>
<!-- Card 2 -->
<div aria-hidden="true" class="w-[230px] sm:w-[260px] md:w-[280px] shrink-0 group relative rounded-2xl overflow-hidden aspect-[9/16] glass-card shadow-2xl transition-all duration-500 transform hover:-translate-y-2 p-5 cursor-pointer flex flex-col justify-between">
<img alt="AI photo editor" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100 pointer-events-none" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZ4uRuhTovw4ECB08lsL7nJ25i_cGmhquFX80zcem-NA6nGOwYYGU2VN7S6IaXZg7-FcdKE-DNtwzm2jlKniqB01gBtU3LlmPxvHuy1o93iXY5M1KErN49j03km50vphp224xx2v3qABXCbqPZ07ejeOIlWHpUcgxVV6Zek0m54ROQs2qfWL9oy_FORsf21Pl44GPj6NR9l5ZHPEiGZQnbB7vqeQMtHpAJaI0ymrS80ATsHqYERxOaWQ">
<div class="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70 pointer-events-none z-0"></div>
<div class="relative z-10">
<span class="text-sm font-semibold tracking-wide text-white drop-shadow-md">AI photo editor</span>
</div>
<div class="relative z-10 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
<span class="text-xs text-[#fbc270] font-medium flex items-center gap-1">Edit Foto ↗</span>
</div>
</div>
<!-- Card 3 -->
<div aria-hidden="true" class="w-[230px] sm:w-[260px] md:w-[280px] shrink-0 group relative rounded-2xl overflow-hidden aspect-[9/16] glass-card shadow-2xl transition-all duration-500 transform hover:-translate-y-2 p-5 cursor-pointer flex flex-col justify-between">
<img alt="Style transfer" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100 pointer-events-none" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxVr3kz4amotXPGmZU1QmX6fF3ypQ5BLvxIzfjEXOOrQm0cVBROxvjWy6-2-lB5InR8quC9v6nDIpbDQAen_oT9loQ_p80L1yimGMCeMFZ7OegCV5zX-rTsMnuhXBsCRdqGgtJ1-WQh5nZLTv0aKGvnenNp5JShP720tggocoA2mZvHOwYMbsIJBrbSl_SIAtUIklOpSjBUsXFz54ClWeQosLApv85dcSLfLI9pvWcT7aeNSaKt66AGw">
<div class="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70 pointer-events-none z-0"></div>
<div class="relative z-10">
<span class="text-sm font-semibold tracking-wide text-white drop-shadow-md">Style transfer</span>
</div>
<div class="relative z-10 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
<span class="text-xs text-[#fbc270] font-medium flex items-center gap-1">Ganti Gaya ↗</span>
</div>
</div>
<!-- Card 4 -->
<div aria-hidden="true" class="w-[230px] sm:w-[260px] md:w-[280px] shrink-0 group relative rounded-2xl overflow-hidden aspect-[9/16] glass-card shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col justify-between p-5 cursor-pointer">
<img alt="Logos &amp; Icons" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100 pointer-events-none" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD33ujpFKVJJfkQltywAkN2qy8gyG6Jvre-H1S5rtnRViBMBeTf4G6KjhmitkZEcqT7x9khUdiwaaX2vKTJAkLZ70nDnJ_0r7utDESWsjIIsxTseaJy0fhHZpTSi6pd1MEizGael21tnUO84D3dWqTaq3rJ_-HOG6uXNp0qrkMoyECRPr-ahzZPZTLlLcpCjyY96m1Sf_PX6KCsB89d9Lo_plJ80Mnl2iaZxIPdPF8S-p_XrYHEmVSaTw">
<div class="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70 pointer-events-none z-0"></div>
<div class="relative z-10 flex items-center justify-between">
<span class="text-sm font-semibold tracking-wide text-white drop-shadow-md">Logos &amp; Icons</span>
<span class="text-xs font-semibold text-cyan-300 group-hover:text-white flex items-center gap-0.5 transition-colors drop-shadow">
            Try now <span class="text-[10px]">↗</span>
</span>
</div>
<div class="relative z-10">
<span class="text-[11px] text-white/70 block">Desain Vektor &amp; Brand</span>
</div>
</div>
<!-- Card 5 -->
<div aria-hidden="true" class="w-[230px] sm:w-[260px] md:w-[280px] shrink-0 group relative rounded-2xl overflow-hidden aspect-[9/16] glass-card shadow-2xl transition-all duration-500 transform hover:-translate-y-2 p-5 cursor-pointer flex flex-col justify-between">
<img alt="Poster design" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100 pointer-events-none" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDOGvQpfEu2bRpdRZvLLPY-pZnCE9YZIT5kqm0UTk09eFvlZrnoPjaTE-S3c7h1Enc6P5HJYPTUDIUhzmSFV3AR_ZWpWurYH8Kf5pJ31jav4gCO3Ta-L6V8UYy7Gu5CAwy1bIdoDIjWdZDpI5Efhda4NQKQE9UrlEBLD8Q4qKDkrrlgpzLupiVDOhOD2hG67XMsTLKagBXavemwdSC6uGV5leHvKynitkOGBcjtJMYJ2gmQzc_2wACRQ">
<div class="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70 pointer-events-none z-0"></div>
<div class="relative z-10">
<span class="text-sm font-semibold tracking-wide text-white drop-shadow-md">Poster design</span>
</div>
<div class="relative z-10 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
<span class="text-xs text-[#fbc270] font-medium flex items-center gap-1">Buat Poster ↗</span>
</div>
</div>
</div>
</div>
</section>
<!-- ==========================================
     SECTION 3: GALERI WAKTU FAVORIT (EXACT SCREEN_10 DENGAN ANIMASI KIRI/KANAN)
     ========================================== -->
<section class="w-full min-h-screen py-16 px-4 md:px-8 flex flex-col items-center justify-center select-none overflow-hidden bg-transparent" id="galeri-waktu">
<!-- Clean Main Header matching SCREEN_10 -->
<header class="w-full text-center mb-10 anim-center anim-out-bottom" data-purpose="page-header">
<h1 class="text-3xl sm:text-4xl tracking-normal font-normal text-white heading-shadow">
      Apa waktu favoritmu dalam sehari?
    </h1>
</header>
<!-- 3-Column Asymmetric Layout matching SCREEN_10 -->
<main class="w-full max-w-[1200px]" data-purpose="gallery-grid-container">
<div class="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch h-auto md:h-[580px]">
<!-- Left Column: Tall Card (Pagi menjelang siang) -> Meluncur dari Kiri -->
<article aria-label="Pagi menjelang siang: Seorang anak laki-laki di bawah sinar matahari" class="anim-left gallery-card md:col-span-3 h-[420px] md:h-full group anim-out-bottom" data-purpose="morning-card" role="button" tabindex="0">
<img alt="Lukisan anak laki-laki dengan jerami di bawah terik matahari" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJSuEuyAeFg4fzK9162A_NM7gz7jJ86YOwGaUepEXS4-2c_ZcIyvF6BByESwCLHxUicOfTOxaDE12fUXIJC1ST3FV51hNZTsVg14-tZXiwqhC7_nFyn-h3pA0Z5vXXGMovgtPCb-5jRMuVp05fqgWSq4PkwzvL6DSKvChz2fmlIMBethb0svrubXQ_y6j3gRwI4QPbMzH52myydOipeds2vWSElGtnAMNwKnfL5Mfh4nngXxnkZxE9JQ">
<div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-6 text-white pointer-events-none">
<h2 class="text-xl font-bold text-shadow-custom leading-tight mb-1">
            Pagi menjelang siang
          </h2>
<p class="text-xs text-gray-200 text-shadow-custom font-normal leading-relaxed opacity-95">
            Seorang anak laki-laki di bawah sinar matahari
          </p>
</div>
</article>
<!-- Middle Column: Stacked Cards (Matahari terbenam [Kiri] & Malam [Kanan]) -->
<div class="gallery-card-group md:col-span-4 flex flex-col gap-5 h-full" data-purpose="middle-column-cards">
<!-- Middle Top Card: Matahari terbenam -> Meluncur dari Kiri -->
<article aria-label="Matahari terbenam: London karya Monet" class="anim-left delay-100 gallery-card flex-1 min-h-[220px] group anim-out-bottom" data-purpose="sunset-card" role="button" tabindex="0">
<img alt="Lukisan berkabut pemandangan London karya Monet" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCg_P3Z7cUb2JqgcmToTyogMHG29nlWb1WKsF-9AC2tRQRQ5zFIjpOCqOS0wdpTwKSmBBmKoUAsb774hjAMpMvSeqvCMzO6T9O8zhsn3iFc30ac5LhNYX8O4ejWxx16x7evr2DXjo5NpGSrU2m1Oey4PKUyKoIvuaZTJfv1FMfBC5DiFSXQbVS9c4ozRbYkhhmsf2yHzpqjvRqPWRphuJ34ib5Zd77poe-qtOS-Pw_ZvHjlSrxXkyifw">
<div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-6 text-white pointer-events-none">
<h2 class="text-xl font-bold text-shadow-custom leading-tight mb-1">
              Matahari terbenam
            </h2>
<p class="text-xs text-gray-200 text-shadow-custom font-normal leading-relaxed opacity-95">
              London karya Monet
            </p>
</div>
</article>
<!-- Middle Bottom Card: Malam -> Meluncur dari Kanan -->
<article aria-label="Malam: Dunia ngengat" class="anim-right delay-150 gallery-card flex-1 min-h-[220px] group anim-out-bottom" data-purpose="night-card" role="button" tabindex="0">
<img alt="Ngengat hijau pucat di bawah sinar bulan malam hari" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnrG1Uirs2xPGV3cL8OR2bLOxyQIwRzPZpItLhUZG05knmm4K0N7m6FYljbMAn6X4J5RlgYfHoyuVpMX3sGEPtrRgvOyOO-BysbGCMZv312GjViGdEcpc4w55Zv-9ENni2ldnBOgj85cyKM9IKMuHxzoS2956ZW3Lx4Jw6G2CpKzVrL5l6xRDxlvDZ8KJk1VhfB28Zn_TsRXL49evktbNl475emEKfBA8FGwy97mpU13sp166oy1UiNg">
<div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-6 text-white pointer-events-none">
<h2 class="text-xl font-bold text-shadow-custom leading-tight mb-1">
              Malam
            </h2>
<p class="text-xs text-gray-200 text-shadow-custom font-normal leading-relaxed opacity-95">
              Dunia ngengat
            </p>
</div>
</article>
</div>
<!-- Right Column: Large Card (Matahari terbit) -> Meluncur dari Kanan -->
<article aria-label="Matahari terbit: Di Afrika Selatan" class="anim-right delay-200 gallery-card md:col-span-5 h-[420px] md:h-full group anim-out-bottom" data-purpose="sunrise-card" role="button" tabindex="0">
<img alt="Pemandangan siluet pepohonan dengan matahari terbit langit oranye di Afrika Selatan" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAV7GftU9mcy973ofFjNH1XsHhv5_WJKa6BphRjcksIS8szgXu9CnixHot6k1eRZYyjzTgjSq_DabnnPM9t9kgiAD3j2zi0XHYY18wwgPSlj1wPPYvMk5EVqSOMl1-2xe6IcRCZKzZ36528_qk8TSEOzyMjFpAD3VPilLy_OPF43WGuG2buI977WxauE1uyXjXIBazaybD8O4PyRqqbxrUWPRHrLjssqZLL-McnnYvTmLDoPLFNjHF2pg">
<div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-6 text-white pointer-events-none">
<h2 class="text-xl font-bold text-shadow-custom leading-tight mb-1">
            Matahari terbit
          </h2>
<p class="text-xs text-gray-200 text-shadow-custom font-normal leading-relaxed opacity-95">
            Di Afrika Selatan
          </p>
</div>
</article>
</div>
</main>
</section>
<!-- ==========================================
     SECTION 4: BANNER PAKAIAN ADAT PALEMBANG (ANIMASI DARI KIRI)
     ========================================== -->
<section class="relative w-full min-h-screen h-screen overflow-hidden select-none flex flex-col justify-end" id="banner-adat-palembang">
<!-- Full-bleed background image -->
<img alt="Pakaian Adat Palembang Aesan Gede" class="absolute inset-0 w-full h-full object-cover object-center transform scale-100 transition-transform duration-700 ease-out" src="https://lh3.googleusercontent.com/aida/AEtjO1XX3Y6wtpyyN-xvEPyD_Bd3k1GoMQgbEtz4eZvfSN_w6hTNO3N0xiaYfbpnaS1vsxHbxV2-qcegqiYc3al1SGlBr-CtMZbTKa5mIVEVqEly_2VM3eE4VjZi2l9vqMSgVijGDSHbArM33vKspA7nYQ3LPEOPyUVG4WrGwimvBnYoPKfHgfUyQs48g6lzOIma1Z5Ar5f9S-I-2vv4s7aFUcaZzxfVJii_e7W-ino7XQvT1syoRKoRHM4AWyc">
<!-- Gradient overlays to seamlessly blend top and bottom with surrounding dark atmosphere -->
<div class="absolute inset-0 bg-gradient-to-t from-[#1c1013] via-black/40 to-transparent pointer-events-none"></div>
<div class="absolute inset-0 bg-gradient-to-r from-[#1c1013]/90 via-black/40 to-transparent pointer-events-none"></div>
<!-- Content in bottom-left -> Meluncur dari Kiri -->
<div class="relative z-10 w-full h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-end pb-12 md:pb-16">
<div class="anim-left max-w-2xl flex flex-col items-start gap-4 anim-out-bottom">
<span class="text-xs font-semibold tracking-widest uppercase text-[#fbc270] drop-shadow">Warisan Budaya Nusantara</span>
<h2 class="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white heading-shadow leading-tight">
        Pakaian Adat Palembang
      </h2>
<p class="text-sm md:text-base text-gray-200 text-shadow-custom font-normal leading-relaxed opacity-95 max-w-xl">
        Keanggunan busana adat Aesan Gede dan kain songket berlapis emas khas Palembang, Sumatra Selatan.
      </p>
<button class="mt-2 bg-[#00f2fe] hover:bg-[#00d6e2] text-slate-950 font-bold px-7 py-3 rounded-full shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transform hover:-translate-y-0.5 active:translate-y-0 transition-all text-sm tracking-wide inline-flex items-center gap-2" type="button">
<span class="">Masuklah ke dalam</span>
<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
</svg>
</button>
</div>
</div>
</section>
<!-- ==========================================
     SECTION 5: GALERI SUREALISME (ANIMASI KIRI & KANAN)
     ========================================== -->
<section class="w-full min-h-screen py-16 px-4 md:px-8 flex flex-col items-center justify-center select-none relative overflow-hidden bg-transparent" id="galeri-surealisme">
<!-- Header Title -->
<header class="w-full text-center mb-10 anim-center anim-out-bottom" data-purpose="page-header">
<h2 class="text-3xl sm:text-4xl tracking-normal font-normal text-white heading-shadow">
      Surealisme
    </h2>
</header>
<!-- 3-Column Card Grid matching SCREEN_55 -->
<main class="w-full max-w-[1200px]" data-purpose="surealisme-grid-container">
<div class="grid grid-cols-1 md:grid-cols-12 gap-5 w-full h-auto md:h-[552px]" data-purpose="cards-grid">
<!-- Column 1: Left (Frida Kahlo Collection) -> Meluncur dari Kiri -->
<div class="anim-left col-span-1 md:col-span-4 flex flex-col gap-5 h-[500px] md:h-full anim-out-bottom">
<!-- Top Card: Frida Kahlo Artist -->
<article class="relative flex-1 rounded-2xl overflow-hidden shadow-sm group cursor-pointer bg-neutral-900 border border-white/10 hover:border-[#fbc270]/50 transition-all duration-300" data-purpose="artist-card-frida">
<img alt="Frida Kahlo Surreal Portrait" class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDx8AG-qcKaTm8gE7zx3FceYzA87PWr0sq5jgjwXc48PSVvs20bQkFnbhyI4Bs_kMulSFer2KatW1WNnyzddtk-F7km0hAhEmpQbU0nouGfBfLw3sCugZC5rlJAQUKBMF0j4NQRzamwkUcHbH4_YMZlh1jLdBI_WfrZrBybYifym7kjDhSGna_y03KkBUD3xYrvH0H6HOzLZmUawqUUeDFxtWrJpGnoljb-Ymr1_TfHtZ4Bb1e9kxapSg">
<div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none"></div>
<div class="absolute bottom-0 left-0 right-0 p-5 text-white pointer-events-none">
<span class="inline-block bg-[#1a73e8] text-white text-[11px] font-semibold px-2 py-0.5 rounded-[4px] mb-1.5 shadow-sm">
              Seniman
            </span>
<h3 class="text-[1.18rem] font-bold leading-snug tracking-normal text-white drop-shadow-sm">
              Frida Kahlo
            </h3>
<p class="text-[13px] text-neutral-200 font-normal mt-0.5">
              70 item
            </p>
</div>
</article>
<!-- Bottom Card: Sehari dalam Kehidupan Frida Kahlo -->
<article class="relative flex-1 rounded-2xl overflow-hidden shadow-sm group cursor-pointer bg-neutral-900 border border-white/10 hover:border-[#fbc270]/50 transition-all duration-300" data-purpose="story-card-frida">
<img alt="Sehari dalam Kehidupan Frida Kahlo" class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkPf9tPbZQm1c3ajFHx5yymX0mZncSaeWQbO8u7wbiq1I1PjcLWbBRBCvrAGk58mU6eQ-DY7TirljiYLHO1iyRSORrHZvhBiqBgDwtK4uN6YDWGDTwIRt3H13-NvE0ao_ezvd9qiedS1Gus59Q_gd2c9P7TIY4bQMEQMyID6vEMAYO8ftCVo1LhMq0KOMijmi3oyvvMnmcGSTDgVb7ANX6duh0sHJfjU4MI-E7FNxlVUvXQtO2JKt6Kg">
<div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none"></div>
<div class="absolute bottom-0 left-0 right-0 p-5 text-white pointer-events-none">
<span class="inline-block bg-[#1a73e8] text-white text-[11px] font-semibold px-2 py-0.5 rounded-[4px] mb-1.5 shadow-sm">
              Cerita
            </span>
<h3 class="text-[1.12rem] font-bold leading-snug tracking-normal text-white drop-shadow-sm">
              Sehari dalam Kehidupan Frida Kahlo
            </h3>
<p class="text-[12px] text-neutral-200 font-normal mt-0.5">
              Pelajari tentang kehidupan Kahlo di Rumah Biru.
            </p>
</div>
</article>
</div>
<!-- Column 2: Middle (Surreal Perspectives) -> Meluncur dari Kanan (stagger) -->
<div class="anim-right delay-100 col-span-1 md:col-span-4 flex flex-col gap-5 h-[500px] md:h-full anim-out-bottom">
<!-- Top Card: Merah Muda di Surealisme -->
<article class="relative flex-1 rounded-2xl overflow-hidden shadow-sm group cursor-pointer bg-neutral-900 border border-white/10 hover:border-[#fbc270]/50 transition-all duration-300" data-purpose="color-explorer-card">
<img alt="Merah Muda di Surealisme" class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwU2LSqhUWRqGKOsay6WSehGeVpRLNjHfEo8Y1W1Bf0jUiIdwOZKdFEAnnfMgMkh8182A2V3FpGdo3RFdQtT-puuuSMJ2xz_TJ8R0kBZeTu2VKXAJWTLz3RrbcpuMS3ux1UC-JKYIxZu_YXQlzNqKULanZiAxFRJ7qarax5vALZ5Ipjc-etdm1r7c9gcTvn3PU0UmFpKJFajxL8XuW86v1jFNUQMDOCR7hkWNvfVptjok_dCnfHfis4g">
<div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none"></div>
<div class="absolute bottom-0 left-0 right-0 p-5 text-white pointer-events-none">
<span class="inline-block bg-[#1a73e8] text-white text-[11px] font-semibold px-2 py-0.5 rounded-[4px] mb-1.5 shadow-sm">
              Penjelajah warna
            </span>
<h3 class="text-[1.18rem] font-bold leading-snug tracking-normal text-white drop-shadow-sm">
              Merah Muda di Surealisme
            </h3>
<p class="text-[13px] text-neutral-200 font-normal mt-0.5">
              1.220 item
            </p>
</div>
</article>
<!-- Bottom Card: 13 Attempts to Become a Rooster - 5 -->
<article class="relative flex-1 rounded-2xl overflow-hidden shadow-sm group cursor-pointer bg-neutral-900 border border-white/10 hover:border-[#fbc270]/50 transition-all duration-300" data-purpose="artwork-card-rooster">
<img alt="13 Attempts to Become a Rooster - 5" class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtTExeyatGlzqpqeV2gLMprZz9uYTwfvEIXO6u7_Kg6aiTF-GMNL3JUt9nEeqrKH6aEuaDiQ_kef8E4OxBc_tDIVDPuDF7E64CNDOgS1ldCOwWKwunz_JuTmHSloAGrVHjDGqlPkkmp7A_TdYt9agTZhYJHTEfo_edcQ7V5_tFAnDkpU_v5RTFNwz-w316M4pUdcTAnMM6LPhHxBJvYGgYerPMncmAFQg-d1dQqESKAk5-yshOCrLOOw">
<div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none"></div>
<div class="absolute bottom-0 left-0 right-0 p-5 text-white pointer-events-none">
<span class="inline-block bg-[#1a73e8] text-white text-[11px] font-semibold px-2 py-0.5 rounded-[4px] mb-1.5 shadow-sm">
              Karya seni
            </span>
<h3 class="text-[1.12rem] font-bold leading-snug tracking-normal text-white drop-shadow-sm">
              13 Attempts to Become a Rooster - 5
            </h3>
<p class="text-[12.5px] text-neutral-200 font-normal mt-0.5">
              Wolfgang Lettl
            </p>
</div>
</article>
</div>
<!-- Column 3: Right (Paris Opéra Ceiling Artwork) -> Meluncur dari Kanan (stagger lebih lanjut) -->
<div class="anim-right delay-200 col-span-1 md:col-span-4 h-[420px] md:h-full anim-out-bottom">
<!-- Full Height Card: Marc Chagall -->
<article class="relative h-full rounded-2xl overflow-hidden shadow-sm group cursor-pointer bg-neutral-900 border border-white/10 hover:border-[#fbc270]/50 transition-all duration-300" data-purpose="artwork-card-chagall">
<img alt="Marc Chagall's Ceiling for the Paris Opéra" class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxTpR8COmf3qzazChdEpPhQsx_jvRfgM5jFtslI1XvtsV_v0B736dJ6qS6OY0Y_SdgM_g-My0hNwnEDWoPEbpiqUQywVQk1dlpqhJst62bCQfXe3aNqsBBViAwR3GjTjnK6ffGFQU7X7PogCGQQBJwrAckwuYIinbRZI4qrI34Kpx8M0ej6BlD9Nde-FGTbm4CrjWCH2ECiycQQCyBiRmSapdb55xCaNC2umuOVd22i4ZNRiKacmNaHg">
<div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 via-40% to-transparent pointer-events-none"></div>
<div class="absolute bottom-0 left-0 right-0 p-5 text-white pointer-events-none">
<span class="inline-block bg-[#1a73e8] text-white text-[11px] font-semibold px-2 py-0.5 rounded-[4px] mb-1.5 shadow-sm">
              Karya seni
            </span>
<h3 class="text-[1.18rem] font-bold leading-snug tracking-normal text-white drop-shadow-sm">
              Marc Chagall's Ceiling for the Paris Opéra
            </h3>
<p class="text-[13px] text-neutral-200 font-normal mt-0.5">
              Marc Chagall
            </p>
</div>
</article>
</div>
</div>
</main>
</section>
<!-- ==========================================
     SECTION 6: TERUSLAH MENJELAJAH (4 KARTU SELANG-SELING KIRI & KANAN)
     ========================================== -->
<section class="w-full min-h-screen py-20 px-4 md:px-8 flex flex-col items-center justify-center select-none relative overflow-hidden bg-transparent" id="teruslah-menjelajah">
<div class="w-full max-w-[1240px] mx-auto">
<!-- Header Title & Subtitle + Right Circular Navigation Button -->
<div class="anim-center flex flex-col items-center justify-center text-center relative mb-8 anim-out-bottom"><div class="text-center"><h2 class="text-3xl sm:text-4xl md:text-[40px] tracking-tight font-normal text-white heading-shadow mb-2 leading-tight">Teruslah menjelajah...</h2><p class="text-sm sm:text-base text-gray-300 text-shadow-custom font-normal opacity-95">Selami budaya dari seluruh dunia</p></div><div class="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2"><button aria-label="Jelajahi lebih banyak budaya" class="w-12 h-12 rounded-full bg-white hover:bg-neutral-100 text-neutral-900 flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-black/40 group cursor-pointer" type="button"><svg class="w-5 h-5 text-neutral-900 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"></path></svg></button></div></div>
<!-- 4-Column Exploration Cards Grid (Kartu 1 & 3 dari Kiri, Kartu 2 & 4 dari Kanan) -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
<!-- Card 1: Menjelajahi Dunia Maya (Meluncur dari KIRI) -->
<article class="anim-left gallery-card group h-[480px] rounded-[24px] overflow-hidden relative cursor-pointer border border-white/10 hover:border-[#fbc270]/60 transition-all duration-300 shadow-2xl bg-neutral-900 flex flex-col justify-end anim-out-bottom">
<img alt="Menjelajahi Dunia Maya" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" src="https://lh3.googleusercontent.com/aida/AEtjO1WcVw3GTBRoT0RgAasxyuNtNDmevYo3PKhqmEfzny1NAqlioteXbMMVr3Kjs6W4hkloc9rpfyQ87_yWAdtmv6QKmkirm4L-jfFhAj95-mnNc4JsW7fYmX7DavIHOOluIZnql2OvBnO4qtKtEFJcTwVolcXE7bBpx0ND9Zi8T2iWnoZIjjyofEhiQBre29qhhKTLorSsAgKbeUHulEoXr2nGbCgunJXWzLQCQlI1ISzeonJVXgbJc8fk7ESW">
<div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none"></div>
<div class="relative z-10 p-6 flex flex-col justify-end text-white items-center text-center">
<h3 class="text-xl font-bold text-shadow-custom leading-snug mb-1 text-white">
            Menjelajahi Dunia Maya
          </h3>
<p class="text-xs text-gray-200 text-shadow-custom font-normal leading-relaxed opacity-90 line-clamp-2 mb-4">
            Buka rahasia peradaban kuno melalui visualisasi digital dan sejarah seni.
          </p>
<button class="w-fit px-5 py-2 rounded-full border border-white/70 hover:border-white text-white hover:bg-white/10 text-xs font-semibold tracking-wide transition-all shadow-sm" type="button">
            Jelajahi
          </button>
</div>
</article>
<!-- Card 2: Mengenal Masyarakat Kenya (Meluncur dari KANAN) -->
<article class="anim-right delay-100 gallery-card group h-[480px] rounded-[24px] overflow-hidden relative cursor-pointer border border-white/10 hover:border-[#fbc270]/60 transition-all duration-300 shadow-2xl bg-neutral-900 flex flex-col justify-end anim-out-bottom">
<img alt="Mengenal Masyarakat Kenya" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" src="https://lh3.googleusercontent.com/aida/AEtjO1URl579qHNLjhmHTduBopbccb2oJklA8Pxfk3sa_myqYYbqC6zehcD9hlDTnUAwMWutoT0L2DVb3qcgUws9Z7yEzxVafe6Jmsz8xupVa2AmMiDNjgX0XBDzlU9B9tmxyAgAwQTd7aJXHhjAvX7SQw7LdaKNglUG2IiLLQloMg02HP7rExHpmALq0dGxKi95FO0Qq0sFs-TZ7WrxHB9pBS40xIPjDgglDLQD-SEHRvrJYhl0nT1VCYx9FSFK">
<div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none"></div>
<div class="relative z-10 p-6 flex flex-col justify-end text-white items-center text-center">
<h3 class="text-xl font-bold text-shadow-custom leading-snug mb-1 text-white">
            Mengenal Masyarakat Kenya
          </h3>
<p class="text-xs text-gray-200 text-shadow-custom font-normal leading-relaxed opacity-90 line-clamp-2 mb-4">
            Tradisi kaya, busana penuh warna, dan kisah kehidupan komunitas lokal Kenya.
          </p>
<button class="w-fit px-5 py-2 rounded-full border border-white/70 hover:border-white text-white hover:bg-white/10 text-xs font-semibold tracking-wide transition-all shadow-sm" type="button">
            Jelajahi
          </button>
</div>
</article>
<!-- Card 3: Keajaiban Pakistan (Meluncur dari KIRI) -->
<article class="anim-left delay-200 gallery-card group h-[480px] rounded-[24px] overflow-hidden relative cursor-pointer border border-white/10 hover:border-[#fbc270]/60 transition-all duration-300 shadow-2xl bg-neutral-900 flex flex-col justify-end anim-out-bottom">
<img alt="Keajaiban Pakistan" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" src="https://lh3.googleusercontent.com/aida/AEtjO1V8q4Gvbk6aXdXMHVoxTaIdOudHVWHK3VUf00W1YJwMnO7GyBHnoULhjwfNRaZ4zZhKu9GmbC_3vVPaXBXEQFukStLj1OL8LDIEAMz_h_DDRg61Ze3_rjwlNOaMte1j9cTEyUEOPJjgVYp_SnN5t677cnc6zpNVCEIH9yhclY_Scg7ahf_Dn0KB9Msoc46v4SKDuaNoo5DkUXahh9qgr4587wp6jSsyJrsRhxAXx4MXTaieaehmTQnlSaL-">
<div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none"></div>
<div class="relative z-10 p-6 flex flex-col justify-end text-white items-center text-center">
<h3 class="text-xl font-bold text-shadow-custom leading-snug mb-1 text-white">
            Keajaiban Pakistan
          </h3>
<p class="text-xs text-gray-200 text-shadow-custom font-normal leading-relaxed opacity-90 line-clamp-2 mb-4">
            Pemandangan alam spektakuler dan arsitektur bersejarah yang memukau.
          </p>
<button class="w-fit px-5 py-2 rounded-full border border-white/70 hover:border-white text-white hover:bg-white/10 text-xs font-semibold tracking-wide transition-all shadow-sm" type="button">
            Jelajahi
          </button>
</div>
</article>
<!-- Card 4: Wayang (Pertunjukan Bayangan) (Meluncur dari KANAN) -->
<article class="anim-right delay-300 gallery-card group h-[480px] rounded-[24px] overflow-hidden relative cursor-pointer border border-white/10 hover:border-[#fbc270]/60 transition-all duration-300 shadow-2xl bg-neutral-900 flex flex-col justify-end anim-out-bottom">
<img alt="Wayang (Pertunjukan Bayangan)" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" src="https://lh3.googleusercontent.com/aida/AEtjO1X2LxvmSyPla7GMhPoa0Sq9p6fPHYXcpqXZDMuUSutQZYB1WqqSyWbSrSAzyVNdtUxoxTJx1Kyy1EcwaBXOCkidJt6YrWKy9kh4cKOZw-tVCzQJevnWLhp6Urq8RduohquG4P-Tm032uKJJ9F2ONSqjoYqR6woEUm_vHyeG4TV1mujhy-TaAbgtkYKGJaa6If9ehQEGymhZG-6O348LvNN8NkxMZJdHPszi9FIOiEhaE7eJMMqy4yqIHaTC">
<div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none"></div>
<div class="relative z-10 p-6 flex flex-col justify-end text-white items-center text-center">
<h3 class="text-xl font-bold text-shadow-custom leading-snug mb-1 text-white">
            Wayang (Pertunjukan Bayangan)
          </h3>
<p class="text-xs text-gray-200 text-shadow-custom font-normal leading-relaxed opacity-90 line-clamp-2 mb-4">
            Warisan kesenian bercerita tradisional yang sarat makna filosofis dan kearifan.
          </p>
<button class="w-fit px-5 py-2 rounded-full border border-white/70 hover:border-white text-white hover:bg-white/10 text-xs font-semibold tracking-wide transition-all shadow-sm" type="button">
            Jelajahi
          </button>
</div>
</article>
</div>
</div>
</section>
<!-- ==========================================
     SECTION 7: TEBAK KARYA SENI (MOSAIC PUZZLE: MOSAIC KIRI DARI KIRI, KANAN DARI KANAN, TENGAH SCALE/FADE)
     ========================================== -->
<section class="w-full py-12 px-0 flex flex-col items-center justify-center select-none relative overflow-hidden bg-transparent" id="tebak-karya-seni">
<!-- Full-width 100% Edge-to-Edge Mosaic Art Container -->
<div class="w-full relative px-2 md:px-6" data-purpose="mosaic-board">
<div class="w-full bg-[#521b0e] p-[2px] shadow-2xl overflow-hidden rounded-md border border-black/30">
<!-- Responsive 12-Column Mosaic Grid matching SCREEN_63 & Osman Hamdi Bey Artwork Tiles -->
<div class="grid grid-cols-12 gap-[2px] h-[520px] md:h-[600px] w-full">
<!-- ================= LEFT REGION (Cols 1-5): Meluncur dari KIRI ================= -->
<!-- Column 1 (Left narrow strip): 2 stacked items -->
<div class="anim-left col-span-1 flex flex-col gap-[2px] h-full anim-out-bottom">
<div class="mosaic-tile h-[48%]" title="Detail Karapas Kura-kura">
<img alt="Detail tempurung kura-kura" class="object-[25%_60%]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxD4s5-6X3OdvusR44Fp9dUZVVtPyp23VCoVXX5IRkVsl7VWLajLA3SI-7c6aTcBPJwPi9GJimUMdjDNuWHutbT8o2ueD_AxhNPP_I3R2_tpAlRt9NkWsz0cXvyznrCeypunTfkRaLCL9oV_bzWacQQqRE_r4JJQvXWhsDBTv56R8zOJO8Rldax_X0x4ccY1YtmlIUJJ0U0PeIgXmu51-vFDXuptTVK8P4cxD6kvTBhGwsLD-Crobdcg">
</div>
<div class="mosaic-tile h-[52%]" title="Motif Ubin Geometris Biru Iznik">
<img alt="Ubin ornamen klasik biru tua" class="object-center" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwD2tATdxz5iE1uCLA39C7TlRWySk4YLm1Msv-i6xhtXq2cDYz2XC1TfXEqvB6W4eUwJXRTEYnuH4_RqI8JhQ6z0TzYV_tL-Fsba89fk4qhae9TdvpMWEYdDKqvp2p-O2NyBkhcfylnZXQ-KN4S7FtWu8G50CC2go8iwDTUtcdcQx326XBWyXCT638Smds2JaYfyGN-7wAPQ4I_4SVa94KHhoD06myt13wc-wFNzVoAzdzSTW5vcwnaA">
</div>
</div>
<!-- Column 2 (Profile of Dervish with Turban) -->
<div class="anim-left delay-100 col-span-2 flex flex-col gap-[2px] h-full anim-out-bottom">
<div class="mosaic-tile h-[60%]" title="Sosok Pelatih Berturban">
<img alt="Profil wajah pria berjanggut dengan serban oriental" class="object-[45%_22%]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvmYP0rBdZulQdjZBVuOI2u8lXR4Uf9Ei-kqOGoJNG2v5QH8rrxEFoGgt57dIsIXZnmSOAfw7nShznQcWhoG2Sac0UEKLP1Rie4O0ktd5pXbunn1SgoqkExI9TTKpbpegupKt0zPFb9rArQ_LpApsXW47ptw2L8vlJL6LrO5Qt6x9zGYVZteyVrUuebwQy-FsD7gwkBUg0Q4yD7BrOtcgnO6QrgotX6IVPVr5fUq88qH3kRkIcn7WEKA">
</div>
<div class="mosaic-tile h-[40%]" title="Kaki &amp; Selop Kuning Tradisional">
<img alt="Kaki berselop di atas lantai batu marmer" class="object-bottom" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVii2J3a3jIEWn89pZS4KjyIWfSZuXBZsRARNCw_O0OP9j13-FWQ8Wc8W1rsIJWDrJXMiZA-7NeSW-nXB3scC-iB4zKoX44_LCVKAUH53YLUCqNGs2ebXGsvRKcMw7rxgNy5uWFrMiiYfJ2tUCxxvP6nTNKebnkNZhpF1XeMRwf19FC-7e-xr0nZ9yPlsrgVPDu9CmwhxrBPGviFP2P-K-inBwqIM1aOA4SM_bSnO3vdXfYOqnf6E8mw">
</div>
</div>
<!-- Column 3 (Close-up Turtle Shell Pattern & Ney Flute) -->
<div class="anim-left delay-150 col-span-2 flex flex-col gap-[2px] h-full anim-out-bottom">
<div class="mosaic-tile h-[60%]" title="Detail Tekstur Karapas Kura-kura">
<img alt="Karapas kura-kura sisik geometris" class="object-[42%_50%]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlhRHBCoe3lpQQ19NJ9DpB_IsjraZ5PzqIdO6mh79PeDXXQ91M7OedGeBECDZ4jMSc8RkbC-phALcLUR_zjjGP0A4Y2D6qPo8VaYzmNzV_te8w1G5PlfqzgApLkp8BXb2MYfFUfzp2lemgnE_QH8lTHxP8Yjth6Cjq0iXm0hqCQAZ8q2TOs7TM5lKgJQjc_1XFeXn4944jYAD6xk4HVNNZ3kl8OQnhI1ViDyKN4-_iDJWtEYEDiDGMWA">
</div>
<div class="mosaic-tile h-[40%]" title="Seruling Bambu (Ney) &amp; Jubah Merah">
<img alt="Seruling kayu tradisional di atas kain merah menyala" class="object-center" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAP_sKBJo1W4QRMwtZ-lyj7Mk-5piuHNLST1t8s9o4IRN0y2t-zKDqdbkQfkCCmuGDWJQMwrc0Mw8glL_ipE2pZtxATwBQx_0PvkdUI9vJX26nQ89IgaIDcGaGS9v1gQdrhwRRW6Y0oy-JJPjKFkZFKoaDLV1Cm8R5AckvXMpQsPVSK5VoBe0syXPjt_WOgy_sJwcdwciYq5zQZ08nllX2akA25XzJY7mMMh6Dzuj9zS1C3suEummA7kA">
</div>
</div>
<!-- ================= CENTER REGION: TERRACOTTA QUIZ CARD (Cols 6-8): Scale & Fade ================= -->
<div class="anim-center delay-100 col-span-3 flex flex-col gap-[2px] h-full anim-out-bottom">
<!-- Terracotta Prompt Block (#bf4320) matching SCREEN_63 -->
<section aria-label="Tebak karya seni apa yang ada di antara potongan-potongan tersebut. Klik untuk melihat jawaban." class="bg-[#bf4320] hover:bg-[#b03d1b] h-[60%] flex flex-col justify-center px-6 sm:px-8 md:px-10 py-6 relative shadow-inner cursor-pointer group transition-colors duration-200" data-purpose="interactive-quiz-card" id="reveal-trigger" role="button" tabindex="0">
<!-- Top right circular info badge -->
<div class="absolute top-4 right-5 text-white/40 group-hover:text-white transition-colors">
<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24">
<circle cx="12" cy="12" r="10"></circle>
<line x1="12" x2="12" y1="16" y2="12"></line>
<line x1="12" x2="12.01" y1="8" y2="8"></line>
</svg>
</div>
<!-- Main Prompt Question -->
<h2 class="text-white text-2xl sm:text-[27px] md:text-[30px] font-bold leading-[1.25] tracking-tight mb-6">
              Tebak karya seni apa yang ada di antara potongan-potongan tersebut.
            </h2>
<!-- Interactive Action Indicator -->
<div>
<span class="inline-block text-white text-[15px] sm:text-base font-normal tracking-normal py-0.5 border-b border-white hover:opacity-85 transition-opacity underline decoration-1 underline-offset-4 cursor-pointer">
                Klik di sini untuk mengetahui jawabannya
              </span>
</div>
</section>
<!-- Bottom Green Leaf on Stone Ground -->
<div class="mosaic-tile h-[40%]" title="Daun Hijau Makanan Kura-kura di Lantai">
<img alt="Daun hijau segar di lantai batu marmer kuno" class="object-[50%_65%]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBc8U7UgZcQFEjImQbFdOxrgtIuxxNsjmKcuU9hL2l-6AZuj2O-uS1vi2pESc91m-vgyPC8tMLp8DThxvN0Hxf0VGZ_uJh_RCW_a0508WF5qF6o2FRSsCpikMd8GYcegNo1ynatuADxtmLxSzRetUlYsFWK9n12LMeZYJNGwww97q4HbLSiPdVXzYX8kfdt8u_-fMrmOSlHiYivgprdlgfIBU3GhaQ4YhMs6Sg9T7zh3jP8eRtXUR6tdw">
</div>
</div>
<!-- ================= RIGHT REGION (Cols 9-12): Meluncur dari KANAN ================= -->
<!-- Column 5: Large Walking Tortoise (Top) & Dervish Back View (Bottom) -->
<div class="anim-right delay-150 col-span-2 flex flex-col gap-[2px] h-full anim-out-bottom">
<div class="mosaic-tile h-[60%]" title="Kura-kura Utsmaniyah Merayap">
<img alt="Kura-kura darat memakan dedaunan di lantai ruang istana" class="object-[58%_35%]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYmLSya1Vktf-rghMiuGF4Bni3TjOsovmA1jNUmJeIQ8qgKFm0JDrOQjBSJI0N2XafQLc0WRsgo1-CQ745y36WbfyiBeB-vKbQz2vr7gFcLbl3k6t_x3p5Jvm_1cYD7I00FFXaUidlpabD2e3MEr6Qc8WCsMjb9oq3QouYmsyGfLareqjpEEkCPnmLZmHuS1rAHakeT_9nq67jukI3BkuWA2vojtPVXeUJ1we0DY2_pBeuC9aXPm0xpw">
</div>
<div class="mosaic-tile h-[40%]" title="Tampak Belakang Sorban &amp; Pundak Pelatih">
<img alt="Tampak belakang kain sorban kuning violet dervish" class="object-center" src="https://lh3.googleusercontent.com/aida-public/AB6AXuARY43fat--95PV1ABgdjtRfkMi9wIIFRgGiKKQUvhLScK0jOBuG29rvB9_Z-Zk8ArMRlY7qc0PReOMfTUbi2xiBhMx9FovZtmBoPvhhULHLJnTmXzzxjWKnJep9GqnrlrIEcX-GJ9Ae9ICjb2PcyxWPtxhr2wzoTwIKxAK1LkBd0a5ri5uyhRW2vl78gWYgJwv8RGvpnTJkeFYiFeJVY6LQRcWtLk7WXO0zTmoiF6dwq6Wnfea8L_Gqg">
</div>
</div>
<!-- Column 6: Distressed Wall, Pottery, Blue Mosaic -->
<div class="anim-right delay-200 col-span-1 flex flex-col gap-[2px] h-full anim-out-bottom">
<div class="mosaic-tile h-[35%]" title="Dinding Bata Kuno &amp; Mortar">
<img alt="Tekstur dinding batu bata tua terkelupas" class="object-center" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJSlpv5kqJs6hg2lloGQh5A5BRKQQFpEVLW0X86zfn-_S53KNpd6T-vx_lAGeivjqT6iYU4Fthv5js6DeZyV-vRru4HGuk1rL3bYSy3Fj6oRFS9lPQ9XcCU9TVfh7uqzPUKkaP4JWQ7iTlGfkRQ57adR5Uh6OwX8tbMbFF5cN5igIqKcd8ms8-WkwumDdSkcKwpfIcpmSSaEU38njWlUeUZi8_17i5_eQKQQBpw7_iUIXDgwDkwKsb0Q">
</div>
<div class="mosaic-tile h-[30%]" title="Tempat Tinta / Wadah Gerabah Terikat Tali">
<img alt="Wadah gerabah tradisional terikat tali kulit" class="object-center" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSNga4EiVZ10t392Gatko74pA_wBoEOwdF4nCi61KmY8_HGhsHuzWVxmkBLIgT15oTX-8Fn0kfm3-1VuUt7vXqPdjUudVio4hxraNWoLi9LZxLX4TskNz6jJKBbqmpZVL7CSXw2wzDOlBvToxappnRrBw6rlHfmqAmjlz7O3NsG2nOPa4B2Wvy0V_YGcFLgAghyF5hPSjSLHI0GTD_RktTYgBb9BUHAFg_-loHnuFOafjZitiHuB2idw">
</div>
<div class="mosaic-tile h-[35%]" title="Ornamen Ubin Geometris Biru">
<img alt="Ubin keramik segitiga biru oriental" class="object-center" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAT7i006eNl4TURvaoxTCqEFAfto7luy683QYx0qc4YY2YJaH830aF98BCNp9ZY-8avRyZogrWCvGT3YSJ1kU6REi-FgK-kNxkjwfHSdAm3f4SjqXfEvBi3LRSvB7XZoC4KWlm8kRWUwDRBWJ6gMm9eykshcJfqvLCiELrYJn_sxFFSWhXc5hEXQ3GLH_1bGA8ywZlPj7Sud10_-F3DfkN5ektWsOMCh2aWLcQcQNbW2_ni78vfkWN3Tg">
</div>
</div>
<!-- Column 7: Embroidered Oriental Robe Hem & Stone Wall Profile -->
<div class="anim-right delay-250 col-span-1 flex flex-col gap-[2px] h-full anim-out-bottom">
<div class="mosaic-tile h-[50%]" title="Kelim Jubah Bordir Motif Flora">
<img alt="Bordir sulaman emas dan merah pada kain jubah" class="object-[80%_40%]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAk0MWE8XkW2EDaGG97lw8qecIfN_7DKZ1iDpt_6YThwNuMJmX8Zoqh0R0gZgk5yDLUm15Qjz6MoxtbQRCqRQoXY-Gk4nIFBq7QcJ6BbemNGX4Jl5XE55bjidVUrzp9MjjEWAUJRpTiToJhIdsYzrDQ7zoo_Vbr8AiPGiBMsEbEWPYn-V9iSa5igcAHYKIf8SnbrES5o1Tj9VPsWOKwxUWM7viy-hSIKGJ8qZyV4nmnGNdlitVC08OiuA">
</div>
<div class="mosaic-tile h-[50%]" title="Pilar &amp; Plesteran Dinding Klasik">
<img alt="Dinding kapur dan relief arsitektur Utsmaniyah" class="object-center" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAT-_7g7dFdXioLCaDsXXfhpAWTEjNureTo9FAikeWse53ZcEREmWPzGRMgg5ns-tIcjNmgl-gMYZSDi9Nc9Ij6XfzoFeUcY1lgeW8f0UDUrwIs26U7GQdvI9g-z3ueYUriwoAtDXuORMGNXdcsJL3J15gthArjdL76m6qyCCbYFYNgvmcR06o7lf37evWT36PTst-pTY-zXzpba-iCxQVkq_piIsB7ieO4Nx9SbnmmY5UQmz3zwNKFRw">
</div>
</div>
</div>
</div>
<!-- Footnote details bar exact matching SCREEN_63 -->
<div class="anim-center delay-100 w-full flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 mt-3 px-2 anim-out-bottom">
<div class="flex items-center space-x-2">
<span class="inline-block w-2.5 h-2.5 rounded-full bg-[#bf4320]"></span>
<span class="font-medium text-white/80">Eksplorasi Seni Interaktif Google Arts &amp; Culture</span>
</div>
<div class="italic text-white/50 text-[11px] sm:text-xs mt-1 sm:mt-0">
        Gunakan kursor untuk memeriksa setiap potongan detail lukisan
      </div>
</div>
</div>
</section>
<!-- BEGIN: AnswerModal for Tebak Karya Seni -->
<div aria-labelledby="modal-title" aria-modal="true" class="reveal-modal fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md opacity-0 pointer-events-none transition-opacity duration-300" data-purpose="answer-dialog" id="answer-modal" role="dialog">
<div class="bg-[#24130c] border border-[#bf4320]/60 text-white rounded-2xl shadow-2xl max-w-lg w-full p-6 md:p-8 transform scale-95 transition-transform duration-300 relative">
<!-- Close Button -->
<button aria-label="Tutup jendela" class="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors" id="modal-close-btn">
<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
</svg>
</button>
<!-- Badge Header -->
<span class="inline-block uppercase tracking-wider text-xs font-bold text-[#fbc270] bg-[#bf4320]/30 px-3 py-1 rounded-full mb-3">
      Jawaban Kuis Seni
    </span>
<h3 class="text-2xl font-bold font-serif mb-2 text-white" id="modal-title">
      The Tortoise Trainer
    </h3>
<p class="text-sm font-medium text-[#fbc270]/90 mb-4 italic">
      (Kaplumbağa Terbiyecisi) — Osman Hamdi Bey, 1906
    </p>
<p class="text-gray-300 text-sm leading-relaxed mb-6">
      Lukisan legendaris ini menggambarkan seorang darwis pengembara tua berturban merah yang mencoba melatih kura-kura menggunakan seruling bambu (<em>ney</em>) di dalam Masjid Hijau di Bursa, Turki. Karya ini merupakan simbolisme kritik sosial terhadap reformasi Utsmaniyah yang lambat.
    </p>
<!-- Action Button -->
<div class="flex items-center justify-end space-x-3">
<button class="bg-[#bf4320] hover:bg-[#a53717] text-white text-sm font-semibold px-6 py-2.5 rounded-full shadow hover:shadow-lg transition-all" id="modal-confirm-btn">
        Tutup &amp; Jelajahi Lagi
      </button>
</div>
</div>
</div>
<!-- END: AnswerModal -->
<!-- ==========================================
     SECTION 8: FOOTER (EXACT SCREEN_5)
     ========================================== -->
<footer class="border-t border-white/10 bg-[#170b0e] backdrop-blur-md py-8 px-6 text-xs text-white/60">
<div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
<div class="flex items-center gap-2">
<span class="font-bold text-white tracking-wide">Dreamina AI</span>
<span class="">— Platform Generasi Visual Cerdas</span>
</div>
<div class="flex items-center gap-6">
<a class="hover:text-white transition-colors" href="#">Kebijakan Privasi</a>
<a class="hover:text-white transition-colors" href="#">Ketentuan Layanan</a>
<a class="hover:text-white transition-colors" href="#">Bantuan</a>
</div>
<div>
<span class="">© 2026 Dreamina. Hak cipta dilindungi undang-undang.</span>
</div>
</div>
</footer>
<!-- Interactive Scripts -->
<script>
  document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Left / Right / Center Scroll Animation Observer with in & out transitions
    const animElements = document.querySelectorAll('.anim-left, .anim-right, .anim-center');
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
      const observerOptions = {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: [0, 0.15, 0.85, 1.0]
      };

      const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const target = entry.target;
          const rect = entry.boundingClientRect;
          
          if (entry.isIntersecting && entry.intersectionRatio > 0.08) {
            // Element is entering into viewport -> smooth slide in
            target.classList.remove('anim-out-bottom', 'anim-out-top');
            target.classList.add('anim-in');
          } else {
            // Element is leaving viewport -> smooth exit left/right/center
            target.classList.remove('anim-in');
            if (rect.top < 0) {
              // Exited above viewport
              target.classList.add('anim-out-top');
              target.classList.remove('anim-out-bottom');
            } else {
              // Exited below viewport (or scrolling up past)
              target.classList.add('anim-out-bottom');
              target.classList.remove('anim-out-top');
            }
          }
        });
      }, observerOptions);

      animElements.forEach(el => {
        scrollObserver.observe(el);
      });
    } else {
      // Fallback if reduced motion or no IntersectionObserver
      animElements.forEach(el => {
        el.classList.add('anim-in');
      });
    }

    // Parallax on Ampera Hero & Navbar blur dynamic opacity
    const heroBg = document.getElementById('ampera-bg');
    const nav = document.getElementById('main-nav');

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (heroBg && scrollY <= window.innerHeight) {
        heroBg.style.transform = `scale(${1 + scrollY * 0.0004}) translateY(${scrollY * 0.25}px)`;
      }

      if (nav) {
        if (scrollY > 50) {
          nav.classList.add('bg-black/80', 'shadow-2xl');
          nav.classList.remove('bg-black/20');
        } else {
          nav.classList.remove('bg-black/80', 'shadow-2xl');
          nav.classList.add('bg-black/20');
        }
      }
    }, { passive: true });

    // Interactive Drag & Swipe for Marquee Carousel
    const container = document.getElementById('carousel-viewport');
    let isDown = false;
    let startX;
    let scrollLeft;

    if (container) {
      container.addEventListener('mousedown', (e) => {
        isDown = true;
        container.classList.add('is-dragging');
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
      });

      container.addEventListener('mouseleave', () => {
        isDown = false;
        container.classList.remove('is-dragging');
      });

      container.addEventListener('mouseup', () => {
        isDown = false;
        container.classList.remove('is-dragging');
      });

      container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 1.5;
        container.scrollLeft = scrollLeft - walk;
      });

      let touchStartX = 0;
      let touchScrollLeft = 0;

      container.addEventListener('touchstart', (e) => {
        container.classList.add('is-dragging');
        touchStartX = e.touches[0].pageX - container.offsetLeft;
        touchScrollLeft = container.scrollLeft;
      }, { passive: true });

      container.addEventListener('touchend', () => {
        container.classList.remove('is-dragging');
      }, { passive: true });

      container.addEventListener('touchmove', (e) => {
        const x = e.touches[0].pageX - container.offsetLeft;
        const walk = (x - touchStartX) * 1.5;
        container.scrollLeft = touchScrollLeft - walk;
      }, { passive: true });
    }

    // Audio button toggle simulation
    const audioBtn = document.getElementById('audio-toggle-btn');
    let isMuted = true;
    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        isMuted = !isMuted;
        audioBtn.classList.toggle('text-cyan-400', !isMuted);
      });
    }

    // Modal Interaction for Tebak Karya Seni
    const trigger = document.getElementById('reveal-trigger');
    const modal = document.getElementById('answer-modal');
    const closeBtn = document.getElementById('modal-close-btn');
    const confirmBtn = document.getElementById('modal-confirm-btn');

    function openModal() {
      if (modal) {
        modal.classList.remove('opacity-0', 'pointer-events-none');
        modal.querySelector('div').classList.remove('scale-95');
        modal.querySelector('div').classList.add('scale-100');
      }
    }

    function closeModal() {
      if (modal) {
        modal.classList.add('opacity-0', 'pointer-events-none');
        modal.querySelector('div').classList.add('scale-95');
        modal.querySelector('div').classList.remove('scale-100');
      }
    }

    if (trigger) {
      trigger.addEventListener('click', openModal);
      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal();
        }
      });
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (confirmBtn) confirmBtn.addEventListener('click', closeModal);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }
  });
</script>




</body></html>