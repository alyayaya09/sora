<!DOCTYPE html><html class="dark" lang="id" style="scroll-behavior: smooth; min-height: 100vh;"><head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<meta content="web_standard" name="shell-type">
<link href="https://lh3.googleusercontent.com/aida-public/AB6AXuBtirIQsjR4ntIu11jDJ6s0WUaw2o5g5-pOgYYZzeCU98rvu1QeHrC_YSbPYPHrSJIWm7Lja3UmSiR5TFTwcWOQH4CnNP8reJVXbnspvGeswqr-mqf1zOMtG11n_IlrKetW30YbVqLrWd9NYUoRn_-BcGWZd2EJHqU48J5zYsSbewWiCQCG6mGW0igNG-4aFcc0y4KH5hf5iscWgfKnyv57bKgDLH7SONK3e6-0oKrZX9yCMIXKgno40TqJxaUJ9gQt3oM" rel="icon" type="image/png">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
<link href="https://fonts.googleapis.com" rel="preconnect">
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect">
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&amp;family=Plus+Jakarta+Sans:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<style>
    @layer base {
      html, body { 
        margin: 0; 
        padding: 0; 
        min-height: 100vh;
        overflow-y: auto !important;
        scroll-behavior: smooth;
      }
      body { 
        background-color: #0d0d0f; 
      }
      main > :first-child { margin-top: 0 !important; }
      main > :last-child { margin-bottom: 0 !important; }
    }
    ::-webkit-scrollbar { display: none; }
    
    .slide-in-narrative {
      opacity: 0;
      transform: translateY(40px);
      transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
      will-change: opacity, transform;
    }
    .slide-in-narrative.is-visible {
      opacity: 1;
      transform: translateY(0);
    }

    #main-header {
      will-change: transform, opacity;
      transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }
  </style>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          colors: {
            "tertiary-fixed": "#ffdea5",
            "outline-variant": "#544244",
            "surface-bright": "#39393b",
            "on-secondary-fixed-variant": "#574500",
            "secondary-container": "#af8d11",
            "surface-container": "#201f21",
            "on-tertiary-fixed-variant": "#5d4201",
            "tertiary-container": "#4d3600",
            "surface-container-low": "#1b1b1d",
            "on-tertiary-fixed": "#261900",
            "on-primary": "#5e1326",
            "background": "#0d0d0f",
            "secondary-fixed-dim": "#e9c349",
            "inverse-surface": "#e5e1e4",
            "on-secondary-container": "#342800",
            "outline": "#a28b8d",
            "on-primary-fixed-variant": "#7c2a3b",
            "on-tertiary-container": "#c39f58",
            "surface-container-high": "#2a2a2c",
            "secondary-fixed": "#ffe088",
            "inverse-primary": "#9a4152",
            "primary-container": "#6b1d2f",
            "secondary": "#e9c349",
            "tertiary": "#e9c176",
            "primary-fixed": "#ffd9dd",
            "inverse-on-surface": "#303032",
            "error": "#ffb4ab",
            "primary-fixed-dim": "#ffb2bc",
            "on-surface": "#e5e1e4",
            "on-error-container": "#ffdad6",
            "on-tertiary": "#412d00",
            "surface-container-highest": "#353437",
            "on-error": "#690005",
            "tertiary-fixed-dim": "#e9c176",
            "on-primary-container": "#ee8495",
            "surface-variant": "#353437",
            "on-secondary-fixed": "#241a00",
            "on-background": "#e5e1e4",
            "on-primary-fixed": "#400013",
            "on-surface-variant": "#dac0c2",
            "surface-dim": "#0d0d0f",
            "surface-container-lowest": "#09090b",
            "primary": "#ffb2bc",
            "error-container": "#93000a",
            "on-secondary": "#3c2f00",
            "surface-tint": "#ffb2bc",
            "surface": "#0d0d0f"
          },
          borderRadius: {
            "DEFAULT": "0.125rem",
            "lg": "0.25rem",
            "xl": "0.5rem",
            "full": "0.75rem"
          },
          spacing: {
            "margin-mobile": "1.25rem",
            "gutter-mobile": "1rem",
            "space-sm": "0.5rem",
            "space-xs": "0.25rem",
            "gutter": "1.5rem",
            "space-md": "1rem",
            "margin": "3rem",
            "space-lg": "1.5rem",
            "space-xl": "2.5rem"
          },
          fontFamily: {
            "headline-lg-mobile": ["Noto Serif"],
            "body-lg": ["Plus Jakarta Sans"],
            "headline-md": ["Noto Serif"],
            "headline-sm": ["Noto Serif"],
            "display-hero-mobile": ["Noto Serif"],
            "body-md": ["Plus Jakarta Sans"],
            "headline-lg": ["Noto Serif"],
            "label-md": ["Plus Jakarta Sans"],
            "label-sm": ["Plus Jakarta Sans"],
            "title-lg": ["Plus Jakarta Sans"],
            "display-hero": ["Noto Serif"]
          },
          fontSize: {
            "headline-lg-mobile": ["28px", { lineHeight: "36px", letterSpacing: "0em", fontWeight: "500" }],
            "body-lg": ["16px", { lineHeight: "26px", letterSpacing: "0.01em", fontWeight: "400" }],
            "headline-md": ["28px", { lineHeight: "36px", letterSpacing: "0em", fontWeight: "500" }],
            "headline-sm": ["20px", { lineHeight: "28px", letterSpacing: "0.01em", fontWeight: "600" }],
            "display-hero-mobile": ["36px", { lineHeight: "44px", letterSpacing: "-0.01em", fontWeight: "600" }],
            "body-md": ["14px", { lineHeight: "22px", letterSpacing: "0.01em", fontWeight: "400" }],
            "headline-lg": ["40px", { lineHeight: "48px", letterSpacing: "-0.01em", fontWeight: "500" }],
            "label-md": ["12px", { lineHeight: "16px", letterSpacing: "0.08em", fontWeight: "600" }],
            "label-sm": ["10px", { lineHeight: "14px", letterSpacing: "0.1em", fontWeight: "700" }],
            "title-lg": ["18px", { lineHeight: "26px", letterSpacing: "0em", fontWeight: "600" }],
            "display-hero": ["56px", { lineHeight: "64px", letterSpacing: "-0.02em", fontWeight: "600" }]
          }
        }
      }
    };
  </script>
</head>
<body class="bg-[#0d0d0f] font-body-md text-on-surface antialiased min-h-screen w-full min-w-full selection:bg-primary-container selection:text-on-primary-container relative overflow-x-hidden overflow-y-auto m-0 p-0" data-mode="connect">
<div class="absolute top-0 left-0 w-full h-px pointer-events-none" id="top-anchor"></div>
<!-- Ambient Glow Background -->
<div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
<div class="absolute -top-[15%] -left-[10%] w-[65vw] h-[65vw] rounded-full bg-[#6b1d2f]/25 blur-[130px]"></div>
<div class="absolute top-[25%] -right-[10%] w-[55vw] h-[55vw] rounded-full bg-[#af8d11]/20 blur-[140px]"></div>
<div class="absolute top-[50%] left-[15%] w-[45vw] h-[45vw] rounded-full bg-[#6b1d2f]/20 blur-[120px]"></div>
<div class="absolute -bottom-[15%] right-[20%] w-[50vw] h-[50vw] rounded-full bg-[#af8d11]/15 blur-[130px]"></div>
</div>
<!-- 1. TOP HEADER & NAVIGATION CHROME (Autohide Tanpa Background Pekat) -->
<header class="fixed top-0 left-0 right-0 z-50 bg-transparent border-b border-transparent transform translate-y-0 opacity-100 pointer-events-auto" id="main-header">
<div class="w-full px-margin-mobile md:px-margin h-20 md:h-24 flex items-center justify-between md:grid md:grid-cols-3">
<div class="flex items-center justify-start">
<a class="group inline-flex items-center" href="#" onclick="window.scrollTo({ top: 0, behavior: 'smooth' }); return false;">
<span class="font-headline-sm font-bold tracking-tight text-2xl md:text-[27px] bg-gradient-to-r from-[#FDE047] via-[#E9C176] to-[#DC2626] bg-clip-text text-transparent drop-shadow-md select-none transition-opacity duration-300 group-hover:opacity-90">SORA.Culture</span>
</a>
</div>
<div class="hidden md:flex items-center justify-center">
<nav class="inline-flex items-center gap-1.5 p-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-xl shadow-lg whitespace-nowrap">
<a class="px-space-md py-1.5 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-white/[0.06] font-title-lg text-[14px] transition-all" href="#">Beranda</a>
<a class="px-space-md py-1.5 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-white/[0.06] font-title-lg text-[14px] transition-all" href="#">Jelajahi</a>
<a class="px-space-md py-1.5 rounded-full bg-primary-container text-amber-300 font-title-lg text-[14px] font-semibold transition-all shadow-sm border border-amber-400/30" href="#" onclick="window.scrollTo({ top: 0, behavior: 'smooth' }); return false;">Tur Digital</a>
<a class="px-space-md py-1.5 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-white/[0.06] font-title-lg text-[14px] transition-all" href="#">Favorit</a>
</nav>
</div>
<div class="flex items-center justify-end gap-space-sm">
<button aria-label="Ganti Bahasa" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 border border-white/10 text-on-surface hover:bg-white/10 transition-colors backdrop-blur-md shadow-md" type="button">
<span class="material-symbols-outlined text-[17px] text-secondary">language</span>
<span class="font-label-md text-label-md font-semibold tracking-wider">ID</span>
<span class="material-symbols-outlined text-[16px] text-outline">expand_more</span>
</button>
<div class="relative flex items-center ml-1">
<img alt="Profile Avatar" class="w-9 h-9 rounded-full object-cover ring-1 ring-secondary/50 shadow-md" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdM6LdqovUf38znnJ2piO9oeXqG106zQlXQ0mH1QkHqKzBesTZyHxj_JNhAKFQND6rT5yxmJ7rSKCDrMmdqtxRwUt4fnm-4vTu_VO0tIsQmzCR8F5H5IHAs_tTiAUDkGATBVUWbwu8gxq1e4SLf1qjXGFwE5_FCXRPfZQ--0U82Ymmwt0yvx50qPRQqiHvnlm4dizkrWPckQ8LVbgnX0lA8dflAOpqsx0G3EwPMo6rHdmAazRJSJVV2w">
<span class="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-secondary border-2 border-[#0d0d0f]"></span>
</div>
</div>
</div>
</header>
<!-- MAIN STORY VIEW CONTAINER -->
<main class="w-full bg-transparent relative z-10">
<!-- 1. GRAND OPENING COVER HERO SECTION -->
<section class="relative w-full min-h-screen flex flex-col justify-between overflow-hidden px-4 sm:px-6 md:px-12 pt-24 pb-12" id="hero-section">
<!-- Full Cover Background Texture with Dark Gradient Vignette -->
<div class="absolute inset-0 z-0">
<img alt="Songket Palembang Lepus Emas Cover Hero" class="w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.12] scale-[1.02]" src="https://lh3.googleusercontent.com/aida/AEtjO1WCF1J-3c6nSV4lux31qjbnYBJ8DssQlXxYpTLW32b98ttdktCbQGRbDtWRuU7vMJhKVJ1IXPFwyZO7wlW863aJArxJu8djcQCuwIS6WuOmAl-WQzpJgBaqTNa8BzqRrFXzCJ9wc3YBiWhe-Dd1wg81Srm8bf1ihXzzRZS1v0NYOXo7bibviV4GKPJKtP4mrXKZ9OpjIf6H8KJIlwBu7jxckRPDgFsq5jtGs7Cu83dXK4Qs5WNkU701AAkN">
<div class="absolute inset-0 bg-gradient-to-t from-[#0d0d0f] via-[#0d0d0f]/60 to-black/40"></div>
</div>
<!-- Center Hero Monumental Title & Narrative Lead -->
<div class="relative z-10 max-w-5xl mx-auto w-full text-center flex flex-col items-center gap-3 my-auto pb-6 pt-16">
<div class="space-y-2 max-w-4xl">
<h1 class="font-headline-lg text-3xl sm:text-5xl md:text-5xl text-on-surface font-medium leading-tight tracking-tight drop-shadow-lg">Songket Palembang</h1>
<p class="font-body-lg text-sm sm:text-base md:text-lg text-on-surface-variant font-normal max-w-2xl mx-auto leading-relaxed drop-shadow-md"><span class="text-secondary font-medium font-serif italic">Kemilau Emas Peradaban Sriwijaya&nbsp;</span>dan kemegahan di tepian Sungai Musi</p>
</div>
<!-- Action Pills (Simpan, Salin Tautan, Bagikan) -->
<div class="flex items-center justify-center gap-4 mx-auto pt-6 pb-2">
<div class="relative group/tooltip flex items-center justify-center">
<button aria-label="Favorit" class="group inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#6b1d2f]/25 hover:bg-[#6b1d2f]/40 border border-rose-500/30 text-rose-400 backdrop-blur-md transition-all duration-300 shadow-sm focus:outline-none hover:-translate-y-0.5 hover:shadow-lg active:scale-95" data-active="false" id="heroFavBtn" onclick="const act = this.dataset.active === 'true'; const icon = document.getElementById('heroFavIcon'); const text = document.getElementById('heroFavText'); if(!act){ this.dataset.active = 'true'; icon.setAttribute('fill', '#f43f5e'); icon.setAttribute('stroke', 'none'); if(text) text.textContent = 'Hapus dari Favorit'; showFeedback('Tersimpan di Favorit', 'bookmark'); } else { this.dataset.active = 'false'; icon.setAttribute('fill', 'none'); icon.setAttribute('stroke', '#f43f5e'); if(text) text.textContent = 'Simpan ke Favorit'; showFeedback('Dihapus dari Favorit', 'bookmark_border'); }" type="button">
<svg class="w-5 h-5 transition-transform duration-200 group-hover:scale-110 group-active:scale-125" fill="none" id="heroFavIcon" stroke="#f43f5e" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
</button>
<div class="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-md bg-[#1b1b1d]/90 border border-white/10 text-neutral-200 font-label-md text-[10px] tracking-wide opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 backdrop-blur-md shadow-md z-20" id="heroFavText">Simpan ke Favorit</div>
</div>
<div class="relative group/tooltip flex items-center justify-center">
<button aria-label="Salin Tautan" class="group inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/[0.05] border border-white/15 hover:border-white/50 text-white/80 hover:text-white backdrop-blur-md transition-all duration-300 shadow-sm focus:outline-none hover:-translate-y-0.5 hover:shadow-lg active:scale-95 hover:bg-white/10" onclick="if(navigator.clipboard){navigator.clipboard.writeText(window.location.href);}; showFeedback('Tautan disalin ke papan klip', 'link')" type="button">
<span class="material-symbols-outlined text-[20px] text-white/80 transition-transform group-hover:scale-110 group-hover:text-white">link</span>
</button>
<div class="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-md bg-[#1b1b1d]/90 border border-white/10 text-neutral-200 font-label-md text-[10px] tracking-wide opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 backdrop-blur-md shadow-md z-20">Salin Tautan</div>
</div>
<div class="relative group/tooltip flex items-center justify-center">
<button aria-label="Bagikan" class="group inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#af8d11]/20 hover:bg-[#af8d11]/15 border border-amber-400/30 text-secondary backdrop-blur-md transition-all duration-300 shadow-sm focus:outline-none hover:-translate-y-0.5 hover:shadow-lg active:scale-95" onclick="showFeedback('Tautan siap dibagikan', 'share')" type="button">
<span class="material-symbols-outlined text-[20px] text-secondary transition-transform group-hover:scale-110">share</span>
</button>
<div class="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-md bg-[#1b1b1d]/90 border border-white/10 text-neutral-200 font-label-md text-[10px] tracking-wide opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 backdrop-blur-md shadow-md z-20">Bagikan</div>
</div>
</div>
</div>
<!-- Bottom Subtle Scroll-Down Indicator & Partnership -->
<div class="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center justify-center text-center gap-1.5 pb-2 shrink-0">
<div class="flex flex-col items-center justify-center gap-1 text-center"><span class="font-label-md text-[10px] sm:text-[11px] uppercase tracking-widest text-outline font-semibold opacity-80 mb-1">Bekerja sama dengan</span><div class="inline-flex items-center justify-center gap-3 sm:gap-4"><img alt="Pemerintah Provinsi Sumatera Selatan" class="h-9 sm:h-11 w-auto object-contain drop-shadow-md brightness-[0.9] hover:brightness-100 transition-all duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB47KoCPsVsoVcYOd2pI6RDuOdmYtJPRaW23GONrCmPqrGg7ifqI7GAo1ZhNfS4_Tpo3xeEp5Eqc7Q2Jg040eEHY9pvLmeHlQnVfBndpE8ZicCqFXaCIRcDY_qOKS8Vx7Ir4sODHWwrUVjfO7qkg7uKaE1STXIoV58949yghyWzO10PJ25mkdEyZ_Nc0RA8qe0EWhkgshBQtJImVEG3QYZgzVuRqul9qeUOrv2yxDc-lR010BMhIsuREKYGew5R-8cqjtQ"><img alt="Pesona Indonesia - Kementerian Pariwisata" class="h-8 sm:h-10 w-auto object-contain drop-shadow-md brightness-[0.9] hover:brightness-100 transition-all duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuARZnn7EwKYMPaSp-5IRrA-79I5Av-rMPRFpfDJj5IUOoZRwwrvFjR3UR-ZynXZbxDpVrCuKglbYxdKsXD6DBmwtGEv__cI23T_5ks1K5hXC77C1EZqoJy9jJcKqYkjmSqgvhqE-y26nX92z6resLXTZeh6FDuSaBg1n2LsLXEVXiqL6um2KMiNUXs6IFNxNW_gKqfbgxVrlrEyhZifR0HZVGqtUAq9Kk77Uh5xhVMVnd7_SyX0Qd6UsmwNNbqnoBulhrc"><img alt="Museum Negeri Balaputradewa" class="h-10 sm:h-12 w-auto object-contain drop-shadow-md brightness-[0.9] hover:brightness-100 transition-all duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0aCf6bhJjNh_yx2lHPXeztqpSO7znATSpmH88Bgz0j4JKNmqNu3BgdBa_89z3y8_0RANchPSo4fu-tRwJudr6SjyNhw7iSUBAVcOCS-i46VavM3e5yI8UFDaIuV7qL7knq_Q-rPAkYqHywHgPPznRej8XZzKMlfn9XW30mPu6ytJbYhwCwYMpwriJ3Q9A7bwnVHW-91dX-NwFwcuXPnnqfxKWwK8CyKVqAqp9kEiQLUG6al0H5BLVjcboLHIa03IZRwo"></div></div>
<a class="inline-flex flex-col items-center text-outline hover:text-amber-300 transition-colors group cursor-pointer pt-2" href="#narasi-seksi-1">
<span class="text-[10px] sm:text-[11px] font-label-md tracking-widest uppercase font-semibold text-white/70 group-hover:text-amber-300">GULIR UNTUK MENELUSURI NARASI</span>
<span class="material-symbols-outlined text-base animate-bounce text-amber-300 mt-2">keyboard_arrow_down</span>
</a>
</div>
</section>
<!-- 2. SEQUENTIAL STORY SECTION 1: KARYA UTAMA & KEMILAU SONGKET LEPUS -->
<section class="relative w-full min-h-screen flex items-end overflow-hidden border-b border-white/[0.08] px-margin-mobile md:px-margin py-16 md:py-24" id="narasi-seksi-1">
<div class="absolute inset-0 z-0">
<img alt="Songket Palembang Lepus Berlian Emas" class="w-full h-full object-cover object-center filter brightness-[0.85] contrast-[1.1] scale-100" src="https://lh3.googleusercontent.com/aida/AEtjO1WCF1J-3c6nSV4lux31qjbnYBJ8DssQlXxYpTLW32b98ttdktCbQGRbDtWRuU7vMJhKVJ1IXPFwyZO7wlW863aJArxJu8djcQCuwIS6WuOmAl-WQzpJgBaqTNa8BzqRrFXzCJ9wc3YBiWhe-Dd1wg81Srm8bf1ihXzzRZS1v0NYOXo7bibviV4GKPJKtP4mrXKZ9OpjIf6H8KJIlwBu7jxckRPDgFsq5jtGs7Cu83dXK4Qs5WNkU701AAkN">
<div class="absolute inset-0 bg-gradient-to-t from-[#0d0d0f] via-[#0d0d0f]/60 to-black/40 pointer-events-none"></div>
</div>
<div class="relative z-20 w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 slide-in-narrative is-visible">
<div class="max-w-2xl text-left flex flex-col gap-4 drop-shadow-md">
<h2 class="font-headline-lg font-bold text-3xl sm:text-4xl md:text-5xl text-on-surface leading-tight tracking-tight">Songket Lepus Emas: Kemilau Peradaban Maritim Sriwijaya</h2>
<p class="font-body-lg text-base sm:text-lg text-on-surface leading-relaxed font-normal"><strong class="text-secondary font-medium">Songket Lepus</strong> menduduki kasta tertinggi dalam tradisi tenun Palembang Darussalam. Kata <em>“lepus”</em> secara harfiah bermakna merata tanpa celah, merujuk pada pengerjaan tenun benang emas murni pintalan cabutan yang menyelimuti seluruh latar kain sutra marun.</p>
</div>
<div class="hidden md:flex flex-col items-end text-right text-white/50 font-label-md text-xs"></div>
</div>
</section>
<!-- 3. SEQUENTIAL STORY SECTION 2: MAKRO SERAT & KEMURNIAN BENANG EMAS CABUTAN -->
<section class="relative w-full min-h-screen flex items-end overflow-hidden border-b border-white/[0.08] px-margin-mobile md:px-margin py-16 md:py-24" id="narasi-seksi-2">
<div class="absolute inset-0 z-0">
<img alt="Makro Serat Benang Emas Pintal Cabutan" class="w-full h-full object-cover object-center filter brightness-[0.8] contrast-[1.12]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDO4VPKKBwJdA_qSm0mOZHH7QOMeDnKYBkkzSHYAz9TL_H_H1BhNPbGDl0gtTyrL307s26WpU_bDd90UsWxU3Rt4f_wBXE13G0ZkDBSyyMMYtk4aF7NlAh5PprG2Jo_rAxyg8EGqPSBDIE8J4RaQ6asqmuvStzoMA9AmUItO5dkeKEMdo0OPUKIPzSWwgybk5rTw7Q280867UmHFURjSSs9lKgC4SUNllr8jlYAxsxG2O0P9TnnJT7icQ">
<div class="absolute inset-0 bg-gradient-to-t from-[#0d0d0f] via-[#0d0d0f]/50 to-black/40 pointer-events-none"></div>
</div>
<div class="relative z-20 w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 slide-in-narrative is-visible">
<div class="max-w-2xl text-left flex flex-col gap-4 drop-shadow-md">
<h2 class="font-headline-lg font-bold text-3xl sm:text-4xl md:text-5xl text-on-surface leading-tight tracking-tight">Asal Usul &amp; Benang Emas Pintal Murni Jalur Bahari</h2>
<p class="font-body-lg text-base sm:text-lg text-on-surface leading-relaxed font-normal">Benang emas murni (benang emas cabutan) yang didatangkan melalui jalur niaga maritim Sriwijaya dipadukan secara teliti dengan benang sutra marun alami. Proses penenunan satu helai kain songket lepus dapat memakan waktu hingga berbulan-bulan demi presisi geometris yang sempurna.</p>
</div>
<div class="hidden md:flex flex-col items-end text-right text-white/50 font-label-md text-xs"></div>
</div>
</section>
<!-- 4. SEQUENTIAL STORY SECTION 3: SIMBOLISME KOSMOLOGI & RAGAM HIAS -->
<section class="relative w-full min-h-screen flex items-end overflow-hidden border-b border-white/[0.08] px-margin-mobile md:px-margin py-16 md:py-24" id="narasi-seksi-3">
<div class="absolute inset-0 z-0">
<img alt="Motif Bunga Bintang Songket Palembang" class="w-full h-full object-cover object-center filter brightness-[0.8] contrast-[1.12]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOgYO--o2IYeheV_8GXQQ15DKygWyflyRSd2SLTyD4uv4W33g3TbYM291t-wpJYWS0vV8KHRgfqusHZTKxhFxOWrI0G-gUITRR1mvynV0VGGHozp_bugkBhpWNIeb2-EfPHCpFT5gzVvc-DW4Ex66dg5_CtG_eDgT1vwHJcS12rsKMrBchJG9B1qCu1N1cxBb0Ov6dULe7pC1HAgQc79i_qX14JxHvLdBkrJqHtHrUv90HB1oWxx48gQ">
<div class="absolute inset-0 bg-gradient-to-t from-[#0d0d0f] via-[#0d0d0f]/50 to-black/40 pointer-events-none"></div>
</div>
<div class="relative z-20 w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 slide-in-narrative is-visible">
<div class="max-w-2xl text-left flex flex-col gap-4 drop-shadow-md">
<h2 class="font-headline-lg font-bold text-3xl sm:text-4xl md:text-5xl text-on-surface leading-tight tracking-tight">Simbolisme Mawar &amp; Pucuk Rebung Tumpal</h2>
<p class="font-body-lg text-base sm:text-lg text-on-surface leading-relaxed font-normal">Setiap motif geometri pada permukaan kain menyimpan doa kosmis. Motif Bunga Mawar melambangkan perlindungan batin dan tolak bala, sementara formasi Pucuk Rebung merepresentasikan aspirasi spiritual yang luhur namun bersahaja dalam tata laku kehidupan kesultanan.</p>
</div>
<div class="hidden md:flex flex-col items-end text-right text-white/50 font-label-md text-xs"></div>
</div>
</section>
<!-- 5. FINAL VIEWPORT WRAPPER: "KONTEN TERKAIT" & FOOTER SNUG FIT -->
<div class="min-h-screen w-full flex flex-col justify-between relative overflow-hidden" id="konten-terkait">
<section class="relative w-full flex-1 flex flex-col justify-center px-margin-mobile md:px-margin py-8 md:py-12 max-w-7xl mx-auto">
<div class="flex flex-col items-center justify-center text-center w-full mb-6">
<h2 class="font-serif text-2xl sm:text-3xl md:text-4xl text-neutral-200 font-normal tracking-wide drop-shadow-md">Jelajahi kategori terkait...</h2>
</div>
<div class="max-w-5xl md:max-w-6xl mx-auto w-full relative rounded-3xl overflow-hidden border border-amber-400/30 shadow-[0_20px_50px_rgba(0,0,0,0.4),0_0_40px_rgba(107,29,47,0.25)] min-h-[320px] md:min-h-[380px] flex items-center justify-center p-6 md:p-12 text-center group">
<img alt="Kemegahan Busana Adat Palembang Background" class="absolute inset-0 w-full h-full object-cover filter brightness-[0.85] contrast-[1.1] transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none" src="https://lh3.googleusercontent.com/aida/AEtjO1WCF1J-3c6nSV4lux31qjbnYBJ8DssQlXxYpTLW32b98ttdktCbQGRbDtWRuU7vMJhKVJ1IXPFwyZO7wlW863aJArxJu8djcQCuwIS6WuOmAl-WQzpJgBaqTNa8BzqRrFXzCJ9wc3YBiWhe-Dd1wg81Srm8bf1ihXzzRZS1v0NYOXo7bibviV4GKPJKtP4mrXKZ9OpjIf6H8KJIlwBu7jxckRPDgFsq5jtGs7Cu83dXK4Qs5WNkU701AAkN">
<div class="absolute inset-0 bg-gradient-to-t from-[#0d0d0f]/80 via-[#6b1d2f]/25 to-black/60 pointer-events-none"></div>
<div class="relative z-10 flex flex-col items-center justify-center max-w-3xl mx-auto">
<span class="text-secondary text-xs md:text-sm font-semibold tracking-widest uppercase mb-3">KATEGORI BAJU ADAT</span>
<h3 class="font-serif text-3xl md:text-4xl lg:text-5xl text-white font-normal md:font-medium tracking-normal mb-3 drop-shadow-md">Kemegahan Busana Adat Palembang</h3>
<p class="text-neutral-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-6 font-light drop-shadow-sm">Telusuri mahakarya busana Aesan Gede, Angkinan, dan warisan kebesaran Kesultanan Palembang Darussalam.</p>
<button class="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-medium border border-white/20 backdrop-blur-md transition-all shadow-md active:scale-95">Lihat Tema</button>
</div>
</div>
</section>
<!-- 3. FOOTER SNUGLY AT THE BOTTOM -->
<footer class="w-full bg-transparent border-t border-white/10 py-5 md:py-6 relative z-10 shrink-0">
<div class="w-full px-margin-mobile md:px-margin max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-space-sm text-outline font-label-md text-label-md">
<div class="flex flex-wrap items-center gap-space-sm">
<span class="font-headline-sm font-bold tracking-tight text-base bg-gradient-to-r from-[#FDE047] via-[#E9C176] to-[#DC2626] bg-clip-text text-transparent drop-shadow-sm select-none">SORA.Culture</span>
<span class="text-outline">© Muhammad Firly Marezky &amp; M. Rifqi Aunur Rahman</span>
<span class="text-white/20">•</span>
<span class="text-on-surface-variant font-medium tracking-wide">2026</span>
</div>
</div>
</footer>
</div>
<!-- Seamless Clean Floating Minimalist Arrow Controls -->
<aside class="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 transition-opacity duration-300 opacity-0 pointer-events-none" id="navControlsAside">
<div class="inline-flex items-center p-1.5 rounded-full bg-[#1b1b1d]/80 hover:bg-[#1b1b1d]/95 backdrop-blur-2xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.6)] transition-all duration-300 hover:border-secondary/50" data-target-section="narasi-seksi-1" id="centerNavWidget">
<button aria-label="Seksi sebelumnya" class="w-10 h-10 rounded-full flex items-center justify-center text-amber-300 hover:text-amber-200 hover:bg-white/10 active:bg-amber-400/20 active:scale-95 transition-all" onclick="navigateSection(-1)" type="button">
<span class="material-symbols-outlined text-[24px]">keyboard_arrow_up</span>
</button>
<div class="w-px h-5 bg-white/15 mx-1"></div>
<button aria-label="Seksi berikutnya" class="w-10 h-10 rounded-full flex items-center justify-center text-amber-300 hover:text-amber-200 hover:bg-white/10 active:bg-amber-400/20 active:scale-95 transition-all" onclick="navigateSection(1)" type="button">
<span class="material-symbols-outlined text-[24px]">keyboard_arrow_down</span>
</button>
</div>
</aside>
</main>
<!-- Interactive Story Script & Smooth Navigation Handling -->
<script>
    // Intersection Observer to trigger smooth slide-in from bottom when card enters viewport
    document.addEventListener("DOMContentLoaded", () => {
      const narrativeCards = document.querySelectorAll('.slide-in-narrative');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      }, {
        threshold: 0.2,
        rootMargin: "0px 0px -40px 0px"
      });
      narrativeCards.forEach(card => observer.observe(card));
    });

    // Exhibition sections sequence:
    // Section 0: The Hero Cover (top: 0)
    // Section 1: Songket Lepus Emas (#narasi-seksi-1)
    // Section 2: Asal Usul & Benang Emas Pintal Murni Jalur Bahari (#narasi-seksi-2)
    // Section 3: Simbolisme Mawar & Pucuk Rebung Tumpal (#narasi-seksi-3)
    // Section 4: Jelajahi kategori terkait... & Footer (#konten-terkait)
    const sectionIds = [
      'hero-section',
      'narasi-seksi-1',
      'narasi-seksi-2',
      'narasi-seksi-3',
      'konten-terkait'
    ];

    let isNavigating = false;
    let keyNavThrottleTimer = null;

    function getCurrentSectionIndex() {
      const scrollPos = window.scrollY;
      const effectivePos = scrollPos + window.innerHeight * 0.3;
      
      if (scrollPos <= 60) {
        return 0;
      }

      let activeIndex = 0;
      for (let i = 0; i < sectionIds.length; i++) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (effectivePos >= top) {
            activeIndex = i;
          }
        }
      }
      return activeIndex;
    }

    function navigateSection(direction) {
      if (isNavigating) return;
      const currentIndex = getCurrentSectionIndex();
      let targetIndex = currentIndex + direction;

      if (targetIndex < 0) targetIndex = 0;
      if (targetIndex >= sectionIds.length) targetIndex = sectionIds.length - 1;

      if (targetIndex === currentIndex && direction !== 0) {
        return;
      }

      isNavigating = true;

      if (targetIndex === 0) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const targetEl = document.getElementById(sectionIds[targetIndex]);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }

      setTimeout(() => {
        isNavigating = false;
      }, 500);
    }

    // Keyboard Arrow & Page Navigation Listener (ArrowDown, ArrowUp, PageDown, PageUp, Space, Shift+Space)
    window.addEventListener('keydown', (e) => {
      // Ignore if user is typing inside input, textarea, or contentEditable elements
      const targetTag = e.target.tagName.toLowerCase();
      if (targetTag === 'input' || targetTag === 'textarea' || targetTag === 'select' || e.target.isContentEditable) {
        return;
      }

      const key = e.key;

      if (key === 'ArrowDown' || key === 'PageDown' || (key === ' ' && !e.shiftKey)) {
        e.preventDefault();
        if (keyNavThrottleTimer) return;
        navigateSection(1);
        keyNavThrottleTimer = setTimeout(() => {
          keyNavThrottleTimer = null;
        }, 450);
      } else if (key === 'ArrowUp' || key === 'PageUp' || (key === ' ' && e.shiftKey)) {
        e.preventDefault();
        if (keyNavThrottleTimer) return;
        navigateSection(-1);
        keyNavThrottleTimer = setTimeout(() => {
          keyNavThrottleTimer = null;
        }, 450);
      }
    });

    // Navbar Autohide & Proximity Script (Updated with responsive low-threshold micro-scroll logic)
    const headerEl = document.getElementById('main-header');
    let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
    let isHeaderHovered = false;

    function showNavbar() {
      if (!headerEl) return;
      headerEl.classList.remove('-translate-y-full', 'opacity-0', 'pointer-events-none');
      headerEl.classList.add('translate-y-0', 'opacity-100', 'pointer-events-auto');
    }

    function hideNavbar() {
      if (!headerEl || isHeaderHovered) return;
      headerEl.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
      headerEl.classList.add('-translate-y-full', 'opacity-0', 'pointer-events-none');
    }

    if (headerEl) {
      headerEl.addEventListener('mouseenter', () => {
        isHeaderHovered = true;
        showNavbar();
      });
      headerEl.addEventListener('mouseleave', () => {
        isHeaderHovered = false;
      });
    }

    window.addEventListener('scroll', () => {
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
      
      // Jika currentScroll <= 10, navbar selalu tampil di puncak halaman
      if (currentScrollY <= 10) {
        showNavbar();
        lastScrollY = currentScrollY;
        return;
      }

      const diff = currentScrollY - lastScrollY;

      // Threshold sensitif terhadap micro-scroll (> 2px)
      // User scroll ke bawah dan sudah melewati 15px dari atas
      if (diff > 2 && currentScrollY > 15) {
        hideNavbar();
      } 
      // User scroll ke atas
      else if (diff < -2) {
        showNavbar();
      }

      lastScrollY = currentScrollY;
    }, { passive: true });

    // Hover / Cursor Proximity pada window tepi atas (< 60px)
    window.addEventListener('mousemove', (e) => {
      if (e.clientY < 60) {
        showNavbar();
      }
    }, { passive: true });

    // Floating section navigation widget logic:
    const navAside = document.getElementById('navControlsAside');
    let idleTimer = null;
    let isWidgetHovered = false;

    function isCursorInNarrativeSection(mouseClientY) {
      const startEl = document.getElementById('narasi-seksi-1');
      const endEl = document.getElementById('narasi-seksi-3');
      if (!startEl || !endEl) return false;

      const startRect = startEl.getBoundingClientRect();
      const endRect = endEl.getBoundingClientRect();

      return mouseClientY >= startRect.top && mouseClientY <= endRect.bottom;
    }

    function showWidget() {
      if (!navAside) return;
      navAside.classList.remove('opacity-0', 'pointer-events-none');
      navAside.classList.add('opacity-100', 'pointer-events-auto');
    }

    function hideWidget() {
      if (!navAside || isWidgetHovered) return;
      navAside.classList.remove('opacity-100', 'pointer-events-auto');
      navAside.classList.add('opacity-0', 'pointer-events-none');
    }

    function onUserMouseMoveWidget(e) {
      if (!navAside) return;

      const inNarrative = isCursorInNarrativeSection(e.clientY);

      if (!inNarrative && !isWidgetHovered) {
        clearTimeout(idleTimer);
        hideWidget();
        return;
      }

      showWidget();
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        hideWidget();
      }, 2500);
    }

    if (navAside) {
      navAside.addEventListener('mouseenter', () => {
        isWidgetHovered = true;
        clearTimeout(idleTimer);
        showWidget();
      });
      navAside.addEventListener('mouseleave', () => {
        isWidgetHovered = false;
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
          hideWidget();
        }, 2500);
      });
    }

    window.addEventListener('mousemove', onUserMouseMoveWidget, { passive: true });

    function showFeedback(msg, iconName = 'auto_awesome') {
      const existing = document.getElementById('liveToast');
      if (existing) existing.remove();
      
      const toast = document.createElement('div');
      toast.id = 'liveToast';
      toast.className = 'fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#141014]/92 border border-[#6b1d2f]/60 backdrop-blur-xl shadow-[0_12px_36px_rgba(107,29,47,0.35),0_4px_16px_rgba(0,0,0,0.7)] transition-all duration-300 transform translate-y-0 opacity-100 select-none';
      
      toast.innerHTML = `
        <div class="w-7 h-7 rounded-full bg-gradient-to-br from-[#af8d11]/30 to-[#6b1d2f]/50 border border-[#e9c176]/40 flex items-center justify-center shrink-0 shadow-inner">
          <span class="material-symbols-outlined text-[15px] text-[#e9c176] drop-shadow-sm">${iconName}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="font-label-md text-xs font-medium tracking-wide text-[#f5e6c8]">${msg}</span>
          <span class="w-1.5 h-1.5 rounded-full bg-[#e9c176]/80 animate-pulse"></span>
        </div>
      `;
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translate(-50%, 8px)';
        setTimeout(() => toast.remove(), 320);
      }, 2400);
    }
  </script>
</body></html>