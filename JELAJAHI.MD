<!DOCTYPE html><html class="dark" lang="id" style=""><head><meta charset="utf-8"><meta content="width=device-width, initial-scale=1.0" name="viewport"><meta content="web_standard" name="shell-type"><link href="https://lh3.googleusercontent.com/aida-public/AB6AXuDxJqwrMbcElsY2cgFHcoMhxri7ih_Q5ymaczPGhU2HZtAfSe82vWToVdYWdEO-GxiyMTqYxraM3ncBLvh7tMAU9b2ixtodFxU0ub6UVraPaXQxOdwt4ErjanvOaRMb1y3Exuw52q10AKDcVrtjZuprL-BYa1a-ILTS7wvwHCGiJSLwnMZczip3HqYihjC7F-qC6kMceb_qR9lorJnmtYtsAGSQrjT7PQtevf2p5FJ6bF_Ps29nYMFPzToIu-ynB0O4jeg" rel="icon" type="image/png"><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"><link href="https://fonts.googleapis.com" rel="preconnect"><link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"><link href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,500;0,600;0,700;1,400&amp;family=Plus+Jakarta+Sans:wght@400;500;600;700&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;background-color:#0d0d0f;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}

/* Dynamic, High-Energy Organic Ambient Aurora & Orb Animations (6s - 10s cycles) */
@keyframes floatOrb1 {
  0% { transform: translate(0px, 0px) scale(1) rotate(0deg); opacity: 0.75; }
  30% { transform: translate(18vw, 12vh) scale(1.3) rotate(25deg); opacity: 0.95; }
  65% { transform: translate(-10vw, 22vh) scale(0.9) rotate(-18deg); opacity: 0.7; }
  85% { transform: translate(8vw, -10vh) scale(1.22) rotate(12deg); opacity: 0.9; }
  100% { transform: translate(0px, 0px) scale(1) rotate(0deg); opacity: 0.75; }
}

@keyframes floatOrb2 {
  0% { transform: translate(0px, 0px) scale(1) rotate(0deg); opacity: 0.8; }
  35% { transform: translate(-22vw, 16vh) scale(1.35) rotate(-30deg); opacity: 0.95; }
  70% { transform: translate(16vw, -14vh) scale(0.85) rotate(20deg); opacity: 0.65; }
  100% { transform: translate(0px, 0px) scale(1) rotate(0deg); opacity: 0.8; }
}

@keyframes floatOrb3 {
  0% { transform: translate(0px, 0px) scale(0.9) rotate(0deg); opacity: 0.7; }
  40% { transform: translate(24vw, -18vh) scale(1.32) rotate(35deg); opacity: 0.92; }
  75% { transform: translate(-18vw, 15vh) scale(0.88) rotate(-25deg); opacity: 0.68; }
  100% { transform: translate(0px, 0px) scale(0.9) rotate(0deg); opacity: 0.7; }
}

@keyframes floatOrb4 {
  0% { transform: translate(0px, 0px) scale(1.05) rotate(0deg); opacity: 0.75; }
  45% { transform: translate(-20vw, -18vh) scale(1.28) rotate(-22deg); opacity: 0.95; }
  80% { transform: translate(15vw, 16vh) scale(0.92) rotate(28deg); opacity: 0.7; }
  100% { transform: translate(0px, 0px) scale(1.05) rotate(0deg); opacity: 0.75; }
}

@keyframes floatOrb5 {
  0% { transform: translate(0px, 0px) scale(1); opacity: 0.6; }
  50% { transform: translate(16vw, 20vh) scale(1.3); opacity: 0.85; }
  100% { transform: translate(0px, 0px) scale(1); opacity: 0.6; }
}

@keyframes ambientPulseMesh {
  0%, 100% { opacity: 0.7; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.95; transform: scale(1.08) rotate(3deg); }
}

@keyframes floatEmber1 {
  0% { transform: translate(0, 0) scale(0.8); opacity: 0.3; }
  50% { transform: translate(6vw, -15vh) scale(1.4); opacity: 0.85; }
  100% { transform: translate(-4vw, -30vh) scale(0.6); opacity: 0.1; }
}

@keyframes floatEmber2 {
  0% { transform: translate(0, 0) scale(1); opacity: 0.25; }
  50% { transform: translate(-8vw, -20vh) scale(1.5); opacity: 0.9; }
  100% { transform: translate(5vw, -40vh) scale(0.7); opacity: 0.1; }
}

.animate-orb-1 {
  animation: floatOrb1 7.5s ease-in-out infinite;
}
.animate-orb-2 {
  animation: floatOrb2 8.5s ease-in-out infinite;
}
.animate-orb-3 {
  animation: floatOrb3 6.8s ease-in-out infinite;
}
.animate-orb-4 {
  animation: floatOrb4 9s ease-in-out infinite;
}
.animate-orb-5 {
  animation: floatOrb5 8s ease-in-out infinite;
}
.animate-ambient-mesh {
  animation: ambientPulseMesh 7s ease-in-out infinite;
}
.animate-ember-1 {
  animation: floatEmber1 9s ease-in-out infinite;
}
.animate-ember-2 {
  animation: floatEmber2 8s ease-in-out infinite 2s;
}

#aiOverviewExpandedContent {
  transition: opacity 0.4s ease, max-height 0.5s ease;
}
</style><script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script><script id="tailwind-config">tailwind.config={darkMode:"class",theme:{extend:{colors:{"tertiary-fixed":"#ffdea5","outline-variant":"#544244","surface-bright":"#39393b","on-secondary-fixed-variant":"#574500","secondary-container":"#af8d11","surface-container":"#201f21","on-tertiary-fixed-variant":"#5d4201","tertiary-container":"#4d3600","surface-container-low":"#1b1b1d","on-tertiary-fixed":"#261900","on-primary":"#5e1326","background":"#0d0d0f","secondary-fixed-dim":"#e9c349","inverse-surface":"#e5e1e4","on-secondary-container":"#342800","outline":"#a28b8d","on-primary-fixed-variant":"#7c2a3b","on-tertiary-container":"#c39f58","surface-container-high":"#2a2a2c","secondary-fixed":"#ffe088","inverse-primary":"#9a4152","primary-container":"#6b1d2f","secondary":"#e9c349","tertiary":"#e9c176","primary-fixed":"#ffd9dd","inverse-on-surface":"#303032","error":"#ffb4ab","primary-fixed-dim":"#ffb2bc","on-surface":"#e5e1e4","on-error-container":"#ffdad6","on-tertiary":"#412d00","surface-container-highest":"#353437","on-error":"#690005","tertiary-fixed-dim":"#e9c176","on-primary-container":"#ee8495","surface-variant":"#353437","on-secondary-fixed":"#241a00","on-background":"#e5e1e4","on-primary-fixed":"#400013","on-surface-variant":"#dac0c2","surface-dim":"#0d0d0f","surface-container-lowest":"#09090b","primary":"#ffb2bc","error-container":"#93000a","on-secondary":"#3c2f00","surface-tint":"#ffb2bc","surface":"#0d0d0f"},borderRadius:{"DEFAULT":"0.125rem","lg":"0.25rem","xl":"0.5rem","full":"0.75rem"},spacing:{"margin-mobile":"1.25rem","gutter-mobile":"1rem","space-sm":"0.5rem","space-xs":"0.25rem","gutter":"1.5rem","space-md":"1rem","margin":"3rem","space-lg":"1.5rem","space-xl":"2.5rem"},fontFamily:{"headline-lg-mobile":["Noto Serif"],"body-lg":["Plus Jakarta Sans"],"headline-md":["Noto Serif"],"headline-sm":["Noto Serif"],"display-hero-mobile":["Noto Serif"],"body-md":["Plus Jakarta Sans"],"headline-lg":["Noto Serif"],"label-md":["Plus Jakarta Sans"],"label-sm":["Plus Jakarta Sans"],"title-lg":["Plus Jakarta Sans"],"display-hero":["Noto Serif"]},fontSize:{"headline-lg-mobile":["28px",{lineHeight:"36px",letterSpacing:"0em",fontWeight:"500"}],"body-lg":["16px",{lineHeight:"26px",letterSpacing:"0.01em",fontWeight:"400"}],"headline-md":["28px",{lineHeight:"36px",letterSpacing:"0em",fontWeight:"500"}],"headline-sm":["20px",{lineHeight:"28px",letterSpacing:"0.01em",fontWeight:"600"}],"display-hero-mobile":["36px",{lineHeight:"44px",letterSpacing:"-0.01em",fontWeight:"600"}],"body-md":["14px",{lineHeight:"22px",letterSpacing:"0.01em",fontWeight:"400"}],"headline-lg":["40px",{lineHeight:"48px",letterSpacing:"-0.01em",fontWeight:"500"}],"label-md":["12px",{lineHeight:"16px",letterSpacing:"0.08em",fontWeight:"600"}],"label-sm":["10px",{lineHeight:"14px",letterSpacing:"0.1em",fontWeight:"700"}],"title-lg":["18px",{lineHeight:"26px",letterSpacing:"0em",fontWeight:"600"}],"display-hero":["56px",{lineHeight:"64px",letterSpacing:"-0.02em",fontWeight:"600"}]}}}};</script></head><body class="bg-[#0d0d0f] font-body-md text-on-surface antialiased min-h-screen selection:bg-primary-container selection:text-on-primary-container relative">
<!-- DYNAMIC ORGANIC ANIMATED BACKGROUND (HIGHLY VISIBLE, VIBRANT SORA HERITAGE PALETTE) -->
<div class="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-transform duration-700 ease-out will-change-transform scale-110" id="dynamicBgWrapper" style="transform: scale(1.1) translate3d(13.38px, 1.36px, 0px);">
<!-- Ambient Base Fluid Aurora Canvas Glow -->
<div class="absolute inset-0 bg-gradient-to-tr from-[#140e13] via-[#0d0d0f] to-[#1c1410] animate-ambient-mesh opacity-90"></div>
<!-- Orb 1: Deep Crimson Heritage Radiance (#881337 / #6b1d2f) Top-Left to Center-Right -->
<div class="absolute -top-[10%] -left-[10%] w-[68vw] h-[68vw] max-w-[980px] max-h-[980px] rounded-full bg-gradient-to-br from-[#9f1239]/60 via-[#6b1d2f]/50 to-transparent blur-[105px] animate-orb-1 will-change-transform"></div>
<!-- Orb 2: Warm Amber & Luminous Gold (#f59e0b / #d4af37) Top-Right to Center-Left -->
<div class="absolute top-[12%] -right-[10%] w-[64vw] h-[64vw] max-w-[920px] max-h-[920px] rounded-full bg-gradient-to-bl from-[#f59e0b]/55 via-[#d4af37]/45 to-transparent blur-[115px] animate-orb-2 will-change-transform"></div>
<!-- Orb 3: Royal Crimson & Ruby Glow Center-Left to Bottom-Center -->
<div class="absolute top-[38%] -left-[8%] w-[58vw] h-[58vw] max-w-[850px] max-h-[850px] rounded-full bg-gradient-to-r from-[#6b1d2f]/55 via-[#881337]/45 to-transparent blur-[100px] animate-orb-3 will-change-transform"></div>
<!-- Orb 4: Rich Sunlit Honey Amber (#af8d11 / #b45309) Bottom-Right to Center-Up -->
<div class="absolute -bottom-[12%] right-[5%] w-[62vw] h-[62vw] max-w-[900px] max-h-[900px] rounded-full bg-gradient-to-tl from-[#af8d11]/55 via-[#d4af37]/45 to-transparent blur-[110px] animate-orb-4 will-change-transform"></div>
<!-- Orb 5: Center Dynamic Accent Sunset Glow across main cards -->
<div class="absolute top-[52%] left-[28%] w-[48vw] h-[48vw] max-w-[720px] max-h-[720px] rounded-full bg-gradient-to-tr from-[#d4af37]/35 via-[#9f1239]/40 to-transparent blur-[100px] animate-orb-5 will-change-transform"></div>
<!-- Floating Shimmering Amber Embers -->
<div class="absolute top-[25%] left-[20%] w-2.5 h-2.5 rounded-full bg-[#fde047] blur-[1px] shadow-[0_0_12px_#fde047] animate-ember-1"></div>
<div class="absolute top-[60%] right-[25%] w-3 h-3 rounded-full bg-[#f59e0b] blur-[1px] shadow-[0_0_15px_#f59e0b] animate-ember-2"></div>
<div class="absolute top-[75%] left-[40%] w-2 h-2 rounded-full bg-[#ffb2bc] blur-[1px] shadow-[0_0_10px_#ffb2bc] animate-ember-1" style="animation-delay: 4s;"></div>
<div class="absolute top-[40%] right-[38%] w-2.5 h-2.5 rounded-full bg-[#e9c176] blur-[1px] shadow-[0_0_12px_#e9c176] animate-ember-2" style="animation-delay: 5s;"></div>
</div>
<!-- 1. ULTRA-CLEAN SEAMLESS NAVBAR WITH DYNAMIC SCROLL HIDE/SHOW -->
<header class="fixed top-0 left-0 right-0 z-50 bg-transparent transition-transform duration-300 ease-in-out transform translate-y-0" id="mainNavbar">
<div class="w-full px-margin-mobile md:px-margin h-24 flex items-center gap-space-md md:grid-cols-3 grid"><div class="flex items-center justify-start"><a class="group inline-flex items-center" href="#"><span class="font-headline-sm font-bold tracking-tight text-2xl md:text-[27px] bg-gradient-to-r from-[#FDE047] via-[#E9C176] to-[#DC2626] bg-clip-text text-transparent drop-shadow-sm select-none transition-opacity duration-300 group-hover:opacity-90">SORA.Culture</span></a></div><div class="hidden md:flex items-center justify-center"><nav class="inline-flex items-center gap-1.5 p-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-2xl shadow-sm whitespace-nowrap"><a class="px-space-md py-1.5 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-white/[0.06] font-title-lg text-[15px] transition-all" href="#">Beranda</a><a class="px-space-md py-1.5 rounded-full bg-primary-container text-amber-300 font-title-lg text-[15px] font-semibold transition-all shadow-sm" href="#">Jelajahi</a><a class="px-space-md py-1.5 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-white/[0.06] font-title-lg text-[15px] transition-all" href="#">Favorit</a></nav></div><div class="flex items-center justify-end gap-space-md"><button class="flex items-center gap-1.5 px-space-md py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-on-surface hover:bg-white/10 transition-colors backdrop-blur-md" type="button"><span class="material-symbols-outlined text-[17px] text-secondary">language</span><span class="font-label-md text-label-md font-semibold tracking-wider">ID</span><span class="material-symbols-outlined text-[16px] text-outline">expand_more</span></button><div class="relative flex items-center"><img alt="Profile Avatar" class="w-9 h-9 rounded-full object-cover ring-1 ring-secondary/50 shadow-md" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdM6LdqovUf38znnJ2piO9oeXqG106zQlXQ0mH1QkHqKzBesTZyHxj_JNhAKFQND6rT5yxmJ7rSKCDrMmdqtxRwUt4fnm-4vTu_VO0tIsQmzCR8F5H5IHAs_tTiAUDkGATBVUWbwu8gxq1e4SLf1qjXGFwE5_FCXRPfZQ--0U82Ymmwt0yvx50qPRQqiHvnlm4dizkrWPckQ8LVbgnX0lA8dflAOpqsx0G3EwPMo6rHdmAazRJSJVV2w"><span class="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-secondary border-2 border-[#0d0d0f]"></span></div></div></div>
</header>
<main class="w-full bg-transparent relative z-10 pt-28">
<div class="flex flex-col w-full">
<!-- SEARCH BAR SECTION -->
<section class="relative w-full px-margin-mobile md:px-margin pt-2 pb-1">
<div class="relative w-full mx-auto flex flex-col max-w-[720px]">
<!-- Search Engine Capsule -->
<div class="relative w-full bg-white/[0.04] border border-white/10 p-1 shadow-xl backdrop-blur-2xl rounded-full overflow-hidden" style="border-radius: 9999px !important;">
<div class="relative flex items-center w-full px-4 py-2 gap-space-sm rounded-full" style="border-radius: 9999px !important;">
<button aria-label="Kembali" class="flex items-center justify-center p-1.5 -ml-1 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-white/10 transition-colors cursor-pointer focus:outline-none" type="button"><svg class="w-5 h-5 text-on-surface-variant hover:text-secondary transition-colors" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M19 12H5"></path><path d="M12 19l-7-7 7-7"></path></svg></button><div class="flex items-center justify-center text-secondary">
<span class="material-symbols-outlined text-xl">search</span>
</div>
<div class="flex flex-col flex-grow min-w-0"><input class="w-full bg-transparent border-0 border-none outline-none focus:outline-none focus:ring-0 focus:border-0 p-0 font-title-lg text-base md:text-title-lg text-on-surface placeholder:text-outline truncate" readonly="" type="text" value="Filosofi dan Sejarah Songket Lepus Emas Palembang"></div>
<div class="flex items-center gap-space-sm">
<button aria-label="Bersihkan pencarian" class="p-1.5 rounded-full hover:bg-white/10 text-on-surface-variant hover:text-on-surface transition-colors" type="button">
<span class="material-symbols-outlined text-lg">close</span>
</button>
</div>
</div>
</div>
</div>
</section>
<!-- MAIN CONTENT VIEW -->
<div class="w-full px-margin-mobile md:px-margin flex flex-col gap-6 max-w-7xl mx-auto pt-8 pb-4 min-h-[82vh] pb-16" id="resultsNormalState">
<!-- Header Context -->
<div class="flex flex-col md:flex-row md:items-end justify-between gap-2">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-2xl text-amber-300">auto_awesome</span>
<h1 class="font-headline-sm text-2xl md:text-3xl text-on-surface font-semibold">Rangkuman SORA</h1>
</div>
</div>
<!-- 2-COLUMN VIEW: CARD GAMBAR KIRI & CARD RINGKASAN AI KANAN -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
<!-- 3. CARD GAMBAR ARTEFAK KIRI & SOURCE CARDS -->
<div class="lg:col-span-5 flex flex-col gap-4"><article class="relative overflow-hidden border border-amber-400/20 bg-white/[0.02] shadow-[0_0_35px_rgba(212,175,55,0.15)] group flex rounded-3xl min-h-[460px]" style="height: 480px; min-height: 480px;"><img class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 rounded-3xl" data-alt="Photorealistic museum archive close-up macro capture of authentic 18th-century antique Palembang Songket Lepus Bintang Berlian." src="https://lh3.googleusercontent.com/aida/AEtjO1UIF2DDN47KDbuKH0PQ3-0K5eJS2ZRZkAHYQh_7u3dGgWfnNJEKUaetagHxaDoKU2eWpKsf5I8eYGQ_4xcQoJQ2oczj0xWS9Jq_qTRyZWaa4ew49P-DsOwzo5gaxi58OH0rRU7YolxRK5wF5WVFZP3IZ96UDySlaLBQMCTE3wII5iDzvEdhZcfB-axADhBR6AD0_3pOGDWed-JkjAuN2gip9CMlaxa5XvFLzr8uDuqHBNahVNtX-Qfd4n_n"><div class="absolute inset-x-0 bottom-0 z-10 pt-28 pb-8 px-8 bg-gradient-to-t from-[#0d0d0f]/95 via-[#0d0d0f]/60 to-transparent flex flex-col justify-end"><h2 class="font-headline-sm text-3xl md:text-4xl text-white font-medium tracking-wide drop-shadow-md">Songket Lepus Palembang</h2><p class="font-body-md text-base md:text-lg text-white/90 font-normal tracking-wide mt-2 drop-shadow-sm">Kain tenun emas lambang kemegahan tradisi Sriwijaya</p></div></article><style>@keyframes cardEntrance { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }</style><div class="rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl p-4 flex-col gap-3 shadow-xl animate-card-fade-in-up hover:border-secondary/40 transition-all duration-500 hidden" id="sourceArticleCards" style="animation: 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0s 1 normal forwards running cardEntrance;"><div class="flex flex-col gap-3"><a class="flex items-start justify-between gap-3 p-2 rounded-xl hover:bg-white/[0.04] transition-colors group/art" href="#" onclick="event.preventDefault();"><div class="flex flex-col gap-1 min-w-0 flex-1"><div class="flex items-center gap-1.5"><div class="w-4 h-4 rounded-full bg-white flex items-center justify-center text-[#202124] text-[9px] font-bold shrink-0">W</div><span class="text-[11px] text-white/60 truncate">id.wikipedia.org</span></div><h4 class="text-[13px] font-medium text-white group-hover/art:text-secondary transition-colors line-clamp-1">Songket Palembang — Ensiklopedia Warisan Tenun Emas</h4><p class="text-[11px] text-white/50 line-clamp-2 leading-relaxed">Ragam Lepus Bintang dikenal sebagai kasta tertinggal dalam busana kebesaran bangsawan Kesultanan Palembang...</p></div><img alt="Arsip Tenun Songket" class="w-14 h-14 rounded-lg object-cover border border-white/10 shrink-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOgYO--o2IYeheV_8GXQQ15DKygWyflyRSd2SLTyD4uv4W33g3TbYM291t-wpJYWS0vV8KHRgfqusHZTKxhFxOWrI0G-gUITRR1mvynV0VGGHozp_bugkBhpWNIeb2-EfPHCpFT5gzVvc-DW4Ex66dg5_CtG_eDgT1vwHJcS12rsKMrBchJG9B1qCu1N1cxBb0Ov6dULe7pC1HAgQc79i_qX14JxHvLdBkrJqHtHrUv90HB1oWxx48gQ"></a><div class="h-[1px] bg-white/[0.06]"></div><a class="flex items-start justify-between gap-3 p-2 rounded-xl hover:bg-white/[0.04] transition-colors group/art" href="#" onclick="event.preventDefault();"><div class="flex flex-col gap-1 min-w-0 flex-1"><div class="flex items-center gap-1.5"><div class="w-4 h-4 rounded-full bg-secondary-container flex items-center justify-center text-white text-[9px] font-bold shrink-0"><span class="material-symbols-outlined text-[10px]">account_balance</span></div><span class="text-[11px] text-white/60 truncate">kemdikbud.go.id • Warisan Budaya</span></div><h4 class="text-[13px] font-medium text-white group-hover/art:text-secondary transition-colors line-clamp-1">Fakta Sejarah Kain Songket: Epos Kemegahan Maritim</h4><p class="text-[11px] text-white/50 line-clamp-2 leading-relaxed">Teknik pengerjaan benang emas jantung murni dan makna filosofi kemakmuran pesisir Nusantara tempo dulu...</p></div><img alt="Teknik Celup Gambir" class="w-14 h-14 rounded-lg object-cover border border-white/10 shrink-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB15XNpzTUtb2jtoNdQJbOjMc1Mx7VimSbd-QQzOp_tIYpn_ttcR5-k6xt1BCBph_2XH9dXGqhDih5hvMG0yJXNur1IT4v94YJb1leuCs-TFGdATdOdI-bZP_JE0RpHr2a7o0Z2InQHeSZcsLUlHT-Ccr7bDmVhbpNPgzopUqG5aWUuVyO_XECz2DxerK0Dcz_QP86Wzb7JZCWyOk1az8OA_jdLmf44cRHMEaNwuGoswU5Fp95e8lAYMw"></a></div></div></div>
<!-- 4. CARD RINGKASAN AI KANAN WITH PRECISE NATURAL LAYOUT & SMOOTH TRANSITION -->
<div class="lg:col-span-7 relative flex flex-col" id="soraSummaryContainer">
<article class="relative w-full rounded-3xl overflow-hidden bg-[#0d0d0f]/60 border border-white/10 backdrop-blur-2xl p-6 md:p-7 flex flex-col shadow-2xl hover:border-secondary/40 transition-all duration-300 min-h-[480px] h-auto" id="soraSummaryCard"><div class="absolute top-3 right-3 pointer-events-none text-secondary/30 flex items-center justify-center"><svg class="transform rotate-90" fill="none" height="36" viewBox="0 0 36 36" width="36" xmlns="http://www.w3.org/2000/svg"><path d="M2 2H22C27.5228 2 32 6.47715 32 12V32" stroke="currentColor" stroke-dasharray="2 2" stroke-width="1.5"></path><circle cx="2" cy="2" fill="currentColor" r="2"></circle><circle cx="32" cy="32" fill="currentColor" r="1.5"></circle><polygon fill="currentColor" opacity="0.6" points="18,10 22,6 26,10 22,14"></polygon></svg></div><div class="absolute bottom-3 left-3 pointer-events-none text-secondary/30 flex items-center justify-center"><svg class="transform -rotate-90" fill="none" height="36" viewBox="0 0 36 36" width="36" xmlns="http://www.w3.org/2000/svg"><path d="M2 2H22C27.5228 2 32 6.47715 32 12V32" stroke="currentColor" stroke-dasharray="2 2" stroke-width="1.5"></path><circle cx="2" cy="2" fill="currentColor" r="2"></circle><circle cx="32" cy="32" fill="currentColor" r="1.5"></circle><polygon fill="currentColor" opacity="0.6" points="18,10 22,6 26,10 22,14"></polygon></svg></div><div class="absolute -right-8 -bottom-10 pointer-events-none w-72 h-72 opacity-20 overflow-hidden text-secondary mix-blend-screen z-0"><svg class="w-full h-full transform rotate-12" fill="none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor" stroke-width="1"><circle cx="100" cy="100" r="80" stroke-dasharray="3 3"></circle><circle cx="100" cy="100" r="56"></circle><circle cx="100" cy="100" r="32" stroke-dasharray="2 2"></circle><polygon fill="currentColor" fill-opacity="0.1" points="100,10 120,80 190,100 120,120 100,190 80,120 10,100 80,80" stroke-width="1.5"></polygon><polygon points="100,35 115,85 165,100 115,115 100,165 85,115 35,100 85,85" stroke="currentColor" stroke-width="1"></polygon><polygon fill="currentColor" fill-opacity="0.05" points="36,36 100,80 164,36 120,100 164,164 100,120 36,164 80,100" stroke="currentColor" stroke-dasharray="4 2"></polygon><circle cx="100" cy="100" fill="currentColor" fill-opacity="0.6" r="8"></circle></g></svg></div><div class="relative z-10 flex flex-col gap-4 w-full"><div class="flex items-center justify-between gap-4"><button class="inline-flex items-center gap-2 px-1 py-1 bg-transparent hover:opacity-90 text-left focus:outline-none group cursor-pointer transition-all duration-300" data-playing="false" id="audioNarrativeBtn" onclick="(function(btn){ const isPlaying = btn.getAttribute('data-playing') === 'true'; const next = !isPlaying; btn.setAttribute('data-playing', next); const icon = btn.querySelector('#audioIcon'); const text = btn.querySelector('#audioText'); const eq = btn.querySelector('#audioEqualizer'); if(next){ icon.textContent = 'pause'; text.textContent = 'Memutar SORA...'; eq.classList.remove('hidden'); eq.classList.add('flex'); } else { icon.textContent = 'volume_up'; text.textContent = 'Dengarkan SORA'; eq.classList.add('hidden'); eq.classList.remove('flex'); } })(this)" type="button"><span class="material-symbols-outlined text-[26px] text-secondary select-none transition-transform duration-300 group-hover:scale-105 shrink-0" id="audioIcon">volume_up</span><span class="font-headline-sm text-2xl md:text-3xl text-on-surface font-normal select-none tracking-normal transition-colors leading-none pt-0.5" id="audioText">Dengarkan SORA</span><div aria-label="Equalizer Soundwave" class="items-end gap-1 h-3.5 px-1 hidden" id="audioEqualizer"><span class="w-0.5 bg-amber-300 rounded-full animate-pulse h-2.5"></span><span class="w-0.5 bg-secondary rounded-full animate-pulse h-3.5" style="animation-delay: 120ms;"></span><span class="w-0.5 bg-tertiary rounded-full animate-pulse h-2" style="animation-delay: 240ms;"></span></div></button></div><p class="font-body-md text-base leading-relaxed text-on-surface font-normal"><span class="bg-[#6b1d2f]/90 text-amber-50 px-2 py-0.5 rounded font-normal shadow-sm inline border-l-2 border-secondary/70" style="box-decoration-break: clone; -webkit-box-decoration-break: clone; line-height: 1.85;">Songket Lepus diciptakan sebagai evolusi busana adiluhung berkasta tertinggi dalam tradisi Kesultanan Palembang, bergeser dari sekadar pakaian adat menjadi lambang estetika sakral, kehormatan, dan kemegahan peradaban bahari Sriwijaya.</span></p><div class="flex flex-col gap-2.5 text-on-surface" id="aiOverviewTextContainer"><p class="font-body-md text-base text-on-surface-variant leading-relaxed">Kata <strong class="text-secondary not-italic font-semibold">“lepus”</strong> secara etimologis bermakna <em class="italic">merata tanpa celah</em>—merujuk pada teknik pengerjaan motif benang emas murni (benang emas jantung) yang menyelimuti seluruh tenunan kain sutra dasar.</p><p class="font-body-md text-base text-on-surface-variant leading-relaxed" id="aiOverviewPreviewP2" style="mask-image: linear-gradient(rgb(0, 0, 0) 30%, rgba(0, 0, 0, 0) 100%);">Penyanyi dan maestro wastra tenun memandang motif ini bukan sekadar pola ragam hias dekoratif, melainkan pusaka adiluhung paling sakral dalam kebudayaan Melayu dan tradisi pesisir Asia Tenggara...</p><div class="flex-col gap-2.5 pt-1 transition-all duration-300 overflow-hidden hidden" id="aiOverviewExpandedContent" style="max-height: 0px; opacity: 0;"><p class="font-body-md text-base text-on-surface-variant leading-relaxed">Keanggunannya membentang melintasi kurun waktu berabad-abad sebagai lambang kedaulatan serta prestise abadi peradaban Sriwijaya.</p><p class="font-body-md text-base text-on-surface-variant leading-relaxed">Berikut adalah fakta singkat mengenai kebesaran dan keagungan Songket Lepus dalam lintasan budaya nusantara:</p><div class="flex flex-col gap-2 pl-3 border-l-2 border-secondary/40 text-base text-on-surface-variant"><p class="leading-relaxed"><strong class="text-secondary font-semibold">• Ikon Budaya Global:</strong> Saking tersohornya di kalangan bangsawan istana, muncul pepatah kesultanan bahwa di mana pun adat Melayu ditegakkan, di situ kilau benang emas Songket Lepus bertahta.</p><p class="leading-relaxed"><strong class="text-secondary font-semibold">• Mahkota Busana Pernikahan Aesan Gede:</strong> Dikenakan khusus oleh keluarga inti Sultan Palembang dalam penobatan kemuliaan dan resepsi agung pengantin kebesaran.</p><p class="leading-relaxed"><strong class="text-secondary font-semibold">• Simbol Kejayaan Maritim Sriwijaya:</strong> Kilauan benang emas jantung melambangkan kemakmuran rute rempah Selat Malaka serta jalinan sosial yang erat dan harmonis di tepian Sungai Musi.</p></div></div></div><div class="w-full pt-4 flex justify-center"><button aria-expanded="false" class="w-full flex items-center justify-center gap-2 py-2.5 px-6 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-secondary/40 text-on-surface text-xs md:text-sm font-medium tracking-wide transition-all backdrop-blur-md group focus:outline-none shadow-sm cursor-pointer" id="aiOverviewToggleBtn" onclick="toggleIndonesianOverview(this)" style="border-radius: 9999px !important;" type="button"><span class="" id="aiOverviewToggleLabel">Tampilkan lebih banyak</span><span class="material-symbols-outlined text-base transition-transform duration-300" id="aiOverviewToggleIcon">expand_more</span></button></div></div></article>
</div>
</div>
<!-- 5. KONTEN TERKAIT: ARTEFAK & RAGAM MOTIF TERKAIT -->
<section class="flex flex-col gap-space-lg mt-space-xl pt-2 pt-16">
<div class="flex items-center justify-center text-center w-full"><h2 class="font-headline-sm text-2xl md:text-3xl text-on-surface font-normal tracking-wide">Jelajahi kategori terkait...</h2></div>
<!-- 3-Item Gallery Grid -->
<div class="relative w-full rounded-3xl overflow-hidden border border-amber-500/20 shadow-2xl group min-h-[340px] md:min-h-[380px] flex items-center justify-center p-6 md:p-12 transition-all duration-500 hover:border-secondary/50"><img alt="Kemegahan Busana Adat Palembang - Songket Emas" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none rounded-3xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJJa4OjEos8knCb_KPSl1VP_lWOTbSF1H0fnIfr6WtOWPtQFfMaAgN_Qzor06ZpD4OyNjCz_zP6YkksPERGO3DRBOIiBKPQgTbQSR0wfAhGxHqJhcy87PFQ0izt6eDeH91HvzvyGr5rxTz0oIWyjLlf2urCIYsj3a4vZyzTOY4cEkgfHsxUmKeQUfbocsFKdJEXqHG4_b8LTG02uKaBlzm1uBUmxrrnIWtfPBVUJo49CF7wVgSnVTJIA"><div class="absolute inset-0 bg-black/60 via-black/40 to-black/70 backdrop-blur-[1px] pointer-events-none"></div><div class="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto gap-3"><span class="text-[11px] md:text-xs font-semibold tracking-widest uppercase text-amber-200/90 font-label-sm drop-shadow-sm">Kategori Baju adat</span><h3 class="font-headline-md text-2xl md:text-4xl text-white font-medium tracking-wide drop-shadow-md">Kemegahan Busana Adat Palembang</h3><p class="font-body-md text-sm md:text-base text-white/90 max-w-xl mx-auto leading-relaxed drop-shadow-sm">Telusuri mahakarya busana Aesan Gede, Angkinan, dan warisan kebesaran Kesultanan Palembang Darussalam.</p><div class="pt-3"><a class="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 hover:border-secondary/60 text-white hover:text-secondary text-sm font-medium tracking-wide transition-all backdrop-blur-md shadow-lg group/btn" href="#"><span class="tracking-wider">Lihat Tema</span></a></div></div></div>
</section>
</div>
</div>
<!-- 2. DOCK / FLOATING TAB BAR DI KANAN BAWAH LAYAR -->
<aside class="fixed bottom-6 right-8 z-50">
</aside>
</main>
<!-- 6. FOOTER ULTRA-CLEAN -->
<footer class="w-full bg-transparent border-t border-white/10 py-space-lg mt-space-xl relative z-10">
<div class="w-full px-margin-mobile md:px-margin max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-space-sm text-outline font-label-md text-label-md"><div class="flex flex-wrap items-center gap-space-sm"><span class="font-headline-sm font-bold tracking-tight text-base bg-gradient-to-r from-[#FDE047] via-[#E9C176] to-[#DC2626] bg-clip-text text-transparent drop-shadow-sm select-none">SORA.Culture</span><span class="text-outline">© Muhammad Firly Marezky &amp; M. Rifqy Aunur Rahman</span><span class="text-white/20">•</span><span class="text-on-surface-variant font-medium tracking-wide">2026</span></div></div>
</footer>
<!-- Interactive Scripts for Toggle, Popover and Parallax -->
<script>
  function toggleIndonesianOverview(btn) {
    const extraContent = document.getElementById('aiOverviewExpandedContent');
    const sourceCards = document.getElementById('sourceArticleCards');
    const p2 = document.getElementById('aiOverviewPreviewP2');
    const label = document.getElementById('aiOverviewToggleLabel');
    const icon = document.getElementById('aiOverviewToggleIcon');
    const card = document.getElementById('soraSummaryCard');
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';

    if (isExpanded) {
      // COLLAPSE
      if (p2) {
        p2.style.webkitMaskImage = 'linear-gradient(rgb(0, 0, 0) 30%, rgba(0, 0, 0, 0) 100%)';
        p2.style.maskImage = 'linear-gradient(rgb(0, 0, 0) 30%, rgba(0, 0, 0, 0) 100%)';
      }
      if (extraContent) {
        extraContent.style.maxHeight = '0px';
        extraContent.style.opacity = '0';
        setTimeout(() => {
          if (btn.getAttribute('aria-expanded') === 'false') {
            extraContent.classList.add('hidden');
          }
        }, 400);
      }
      if (sourceCards) {
        sourceCards.classList.add('hidden');
        sourceCards.classList.remove('flex');
      }
      if (label) label.textContent = 'Tampilkan lebih banyak';
      if (icon) {
        icon.textContent = 'expand_more';
        icon.classList.remove('rotate-180');
      }
      btn.setAttribute('aria-expanded', 'false');

      // Halus pusatkan kembali ke bagian atas card agar posisi viewport tetap nyaman
      if (card) {
        const navOffset = 100;
        const cardTop = card.getBoundingClientRect().top + window.pageYOffset - navOffset;
        window.scrollTo({ top: cardTop, behavior: 'smooth' });
      }
    } else {
      // EXPAND
      if (p2) {
        p2.style.webkitMaskImage = 'none';
        p2.style.maskImage = 'none';
      }
      if (extraContent) {
        extraContent.classList.remove('hidden');
        // Force reflow
        void extraContent.offsetHeight;
        extraContent.style.maxHeight = '1200px';
        extraContent.style.opacity = '1';
      }
      if (sourceCards) {
        sourceCards.classList.remove('hidden');
        sourceCards.classList.add('flex');
      }
      if (label) label.textContent = 'Tampilkan lebih sedikit';
      if (icon) {
        icon.textContent = 'expand_less';
        icon.classList.add('rotate-180');
      }
      btn.setAttribute('aria-expanded', 'true');

      // Halus scroll ke arah tengah card ringkasan tanpa merusak tata letak
      requestAnimationFrame(() => {
        if (card) {
          const rect = card.getBoundingClientRect();
          const targetY = window.pageYOffset + rect.top + (rect.height / 2) - (window.innerHeight / 2);
          window.scrollTo({
            top: Math.max(0, targetY),
            behavior: 'smooth'
          });
        }
      });
    }
  }

  // Smart Scroll Handler for Navbar Hide/Show
  let lastScrollY = window.scrollY;
  const navbar = document.getElementById('mainNavbar');

  window.addEventListener('scroll', () => {
    if (!navbar) return;
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 60) {
      // User is scrolling down and past initial threshold -> hide navbar
      navbar.classList.add('-translate-y-full');
      navbar.classList.remove('translate-y-0');
    } else {
      // User is scrolling up or near the top -> reveal navbar
      navbar.classList.remove('-translate-y-full');
      navbar.classList.add('translate-y-0');
    }

    lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
  }, { passive: true });

  // Mouse Parallax for Ambient Mesh Background
  document.addEventListener('DOMContentLoaded', () => {
    const bgWrapper = document.getElementById('dynamicBgWrapper');
    if (!bgWrapper) return;
    
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    let ticking = false;

    window.addEventListener('mousemove', (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      targetX = ((e.clientX - centerX) / centerX) * 35;
      targetY = ((e.clientY - centerY) / centerY) * 28;

      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    });

    function updateParallax() {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      bgWrapper.style.transform = `scale(1.1) translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;

      if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
        requestAnimationFrame(updateParallax);
      } else {
        ticking = false;
      }
    }
  });
</script>
