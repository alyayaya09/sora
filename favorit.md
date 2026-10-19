<!DOCTYPE html><html class="dark scroll-smooth" lang="id" style=""><head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>Favorit &amp; Kurasi — SORA Arts &amp; Culture</title>
<!-- Google Fonts: Noto Serif & Plus Jakarta Sans -->
<link href="https://fonts.preconnect.com" rel="preconnect">
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect">
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,300;0,400;0,600;0,700;1,400&amp;family=Plus+Jakarta+Sans:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet">
<!-- Tailwind CSS CDN with forms and container plugins -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<!-- Tailwind Configuration -->
<script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            serif: ['"Noto Serif"', 'Georgia', 'serif'],
            sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
          },
          colors: {
            sora: {
              base: '#131315',
              card: '#1b1b1e',
              crimson: '#6b1d2f',
              'crimson-dark': '#40101b',
              gold: '#d4af37',
              'gold-light': '#f5eedc',
              'gold-dark': '#8e7123',
            }
          }
        }
      }
    }
  </script>
<!-- BEGIN: Custom Ambient Styles -->
<style data-purpose="ambient-lighting">
    body {
      background-color: #131315;
      color: #e5e5e7;
      min-height: 100vh;
      overflow-x: hidden;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }

    /* Ambient heritage background glows */
    .ambient-glow-crimson {
      position: fixed;
      top: 5%;
      left: 20%;
      width: 650px;
      height: 450px;
      background: radial-gradient(circle, rgba(107, 29, 47, 0.18) 0%, rgba(19, 19, 21, 0) 70%);
      pointer-events: none;
      z-index: 0;
      filter: blur(50px);
    }

    .ambient-glow-amber {
      position: fixed;
      top: 35%;
      right: 15%;
      width: 700px;
      height: 500px;
      background: radial-gradient(circle, rgba(212, 175, 55, 0.10) 0%, rgba(19, 19, 21, 0) 70%);
      pointer-events: none;
      z-index: 0;
      filter: blur(60px);
    }

    /* Autohide Navbar Transition */
    #main-header {
      will-change: transform, opacity;
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
  </style>
<style data-purpose="custom-utilities">
    /* Subtle custom card transitions */
    .heritage-card {
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .heritage-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 16px 36px -10px rgba(0, 0, 0, 0.6), 0 0 18px 1px rgba(212, 175, 55, 0.15);
    }

    /* Hide scrollbar for category filter pills */
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  </style>
<!-- END: Custom Ambient Styles -->
</head>
<body class="selection:bg-sora-crimson selection:text-sora-gold-light flex flex-col min-h-screen justify-between">
<!-- Ambient Lighting Effects -->
<div aria-hidden="true" class="fixed inset-0 pointer-events-none overflow-hidden z-0"><div class="absolute -top-[15%] -left-[10%] w-[850px] h-[750px] rounded-full bg-gradient-to-br from-[#6b1d2f]/60 via-[#40101b]/40 to-transparent blur-[120px]"></div><div class="absolute top-[18%] -right-[12%] w-[800px] h-[750px] rounded-full bg-gradient-to-bl from-[#e9c176]/35 via-[#af8d11]/25 to-transparent blur-[130px]"></div><div class="absolute top-[45%] left-[20%] w-[700px] h-[600px] rounded-full bg-gradient-to-tr from-[#6b1d2f]/45 via-[#e9c176]/20 to-transparent blur-[140px]"></div><div class="absolute -bottom-[20%] -right-[5%] w-[900px] h-[650px] rounded-full bg-gradient-to-tl from-[#6b1d2f]/50 via-[#af8d11]/25 to-transparent blur-[140px]"></div></div>

<!-- BEGIN: MainHeader -->
<header class="fixed top-0 left-0 right-0 z-50 bg-transparent border-b border-transparent transform translate-y-0 opacity-100 pointer-events-auto" data-purpose="top-navigation" id="main-header"><div class="w-full px-4 sm:px-6 md:px-12 h-20 flex items-center justify-between md:grid md:grid-cols-3"><div class="flex items-center justify-start"><a class="group inline-flex items-center" href="#"><span class="font-serif font-bold tracking-tight text-2xl md:text-[27px] bg-gradient-to-r from-[#FDE047] via-[#E9C176] to-[#DC2626] bg-clip-text text-transparent drop-shadow-md select-none transition-opacity duration-300 group-hover:opacity-90">SORA.Culture</span></a></div><div class="hidden md:flex items-center justify-center"><nav class="inline-flex items-center gap-1.5 p-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-xl shadow-lg whitespace-nowrap"><a class="px-4 py-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/[0.06] font-sans text-[14px] transition-all" href="#">Beranda</a><a class="px-4 py-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/[0.06] font-sans text-[14px] transition-all" href="#">Jelajahi</a><a class="px-4 py-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/[0.06] font-sans text-[14px] transition-all" href="#">Tur Digital</a><a class="px-4 py-1.5 rounded-full bg-[#6b1d2f] text-amber-300 font-sans text-[14px] font-semibold transition-all shadow-sm border border-amber-400/30" href="#">Favorit</a></nav></div><div class="flex items-center justify-end gap-3"><button aria-label="Ganti Bahasa" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 border border-white/10 text-white hover:bg-white/10 transition-colors backdrop-blur-md shadow-md" type="button"><svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="1.5"></circle><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke-width="1.5"></path></svg><span class="text-xs font-semibold tracking-wider">ID</span><svg class="w-3.5 h-3.5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg></button><div class="relative flex items-center ml-1"><img alt="Profile Avatar" class="w-9 h-9 rounded-full object-cover ring-1 ring-amber-400/50 shadow-md" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdM6LdqovUf38znnJ2piO9oeXqG106zQlXQ0mH1QkHqKzBesTZyHxj_JNhAKFQND6rT5yxmJ7rSKCDrMmdqtxRwUt4fnm-4vTu_VO0tIsQmzCR8F5H5IHAs_tTiAUDkGATBVUWbwu8gxq1e4SLf1qjXGFwE5_FCXRPfZQ--0U82Ymmwt0yvx50qPRQqiHvnlm4dizkrWPckQ8LVbgnX0lA8dflAOpqsx0G3EwPMo6rHdmAazRJSJVV2w"><span class="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-amber-400 border-2 border-[#131315]"></span></div></div></div></header>
<!-- END: MainHeader -->
<!-- BEGIN: MainContent -->
<main class="relative z-10 pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 flex-1 w-full flex flex-col justify-between pb-6">
<!-- BEGIN: ProfileAndTabHeader -->
<section class="text-center pt-1 pb-3" data-purpose="user-favorites-hero">
<div class="inline-block relative mb-1"><div class="absolute inset-0 rounded-full bg-gradient-to-tr from-[#6b1d2f]/70 via-[#e9c176]/40 to-[#6b1d2f]/70 blur-lg scale-110"></div><div class="relative w-20 h-20 rounded-full p-[2.5px] bg-gradient-to-tr from-[#6b1d2f] via-[#e9c176] to-[#6b1d2f] shadow-xl"><div class="w-full h-full rounded-full p-0.5 bg-[#131315]"><img alt="Foto Profil Pengguna" class="w-full h-full rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCB4mSgnKaQmmdPgIZ3Zv7VSeR1OquXyumHAQzt_w82xEGaWeBi3hz9VkmbWkckuwTrhiYOaCNbhKL_xRsYwiMAFDwfunbuHF2v_lGp3X8s5d9omLN2S8aEPf4bWNKbkH_SV8fmAALpuhPf4GHI1vyskXOjlS1QyhwUJnrH80ruSh5F6dD1cVs5rOpKJgkJCkfAL1v1GMvv7Dxw0Dc9M88QfO-sPU1-NMdmUuFh7AMX9HP-gs0Gyv0WdA"></div></div></div>
<div class="flex justify-center border-b border-white/10 mt-1" data-purpose="tab-navigation">
<nav aria-label="Tabs Kurasi" class="flex space-x-12 items-center"><button type="button" class="relative font-serif font-medium text-base sm:text-lg tracking-wider py-1.5 px-3 transition-colors duration-300 cursor-pointer focus:outline-none text-[#f3d38c] hover:text-[#ffe088]">Favorit<div class="absolute -bottom-px left-0 w-full h-[2.5px] rounded-full bg-gradient-to-r from-[#e9c176] via-[#c2410c] to-[#6b1d2f]"></div></button></nav>
</div>
</section>
<!-- END: ProfileAndTabHeader -->
<!-- BEGIN: SavedArtefactsSection -->
<section class="mt-4 mb-4 max-w-7xl mx-auto">
<div class="flex items-center justify-between mb-4 pb-1">
<div class="flex items-baseline gap-3"><h2 class="font-serif text-2xl sm:text-3xl font-semibold tracking-wide text-[#F9F8F6] drop-shadow-sm">Stories</h2><span class="font-serif text-xs text-[#e2be74] font-medium px-2.5 py-0.5 rounded-full bg-[#6b1d2f]/40 border border-amber-400/30">4</span></div><a class="font-serif text-sm text-[#e8b958] hover:text-[#ffe088] font-medium tracking-wide flex items-center gap-1.5 transition duration-300 group" href="#"></a>
</div>
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"><article class="group relative rounded-2xl overflow-hidden border border-white/10 aspect-[3/4] flex flex-col justify-between p-4 cursor-pointer shadow-lg hover:border-amber-400/30 transition-all duration-500 bg-black/60">
  <img alt="Motif Bunga Bintang Songket" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 z-0" src="https://lh3.googleusercontent.com/aida/AEtjO1WCF1J-3c6nSV4lux31qjbnYBJ8DssQlXxYpTLW32b98ttdktCbQGRbDtWRuU7vMJhKVJ1IXPFwyZO7wlW863aJArxJu8djcQCuwIS6WuOmAl-WQzpJgBaqTNa8BzqRrFXzCJ9wc3YBiWhe-Dd1wg81Srm8bf1ihXzzRZS1v0NYOXo7bibviV4GKPJKtP4mrXKZ9OpjIf6H8KJIlwBu7jxckRPDgFsq5jtGs7Cu83dXK4Qs5WNkU701AAkN">
  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none"></div>
  <div class="relative z-20 flex items-start">
    <span class="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-black/60 text-amber-300 border border-white/10 backdrop-blur-md">Motif Ikonik</span>
  </div>
  <div class="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
    <button type="button" class="pointer-events-auto inline-flex items-center justify-center px-5 py-2 rounded-full text-white text-sm font-semibold tracking-wide transition-all duration-300 border border-white/40 hover:border-white hover:text-white focus:outline-none shadow-lg bg-transparent hover:bg-transparent"><span class="">Eksplor</span></button>
  </div>
  <div class="relative z-20 flex flex-col items-center text-center mt-auto">
    <h3 class="font-serif font-semibold text-[#f5f0eb] group-hover:text-[#f3d38c] transition duration-300 leading-snug mb-1.5 sm:text-lg">Motif Bunga Bintang Songket</h3>
    <p class="text-[#cbbba7] leading-relaxed font-sans line-clamp-2 text-sm">Melambangkan arah kompas pelayaran bahari armada Sriwijaya dan filosofi keteguhan batin.</p>
  </div>
</article>
<article class="group relative rounded-2xl overflow-hidden border border-white/10 aspect-[3/4] flex flex-col justify-between p-4 cursor-pointer shadow-lg hover:border-amber-400/30 transition-all duration-500 bg-black/60">
  <img alt="Proses Celup Alami Gambir &amp; Sepang" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 z-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzWOP7yGmzVqVnlXFOi3ONDYBGP5UXSuy9ItbD2FRle1Ed49-ZEToXjXuyLwdzT5pXg4Rmv_VMfdTJBBeCFTldiOQ_HoIoMkAELqUzYKNL1lDxUnNGp7JcU6OJSlZRj_b3C-JVdMwb13zK7PedkTq-3eM5ynGv290klaTX-R0aTE_UigYVnIJnVlLmkablNOTSnGYW38lh3lWQMTdXeQXFI-1KUv8DnGtWDpXr4VD3J_T-CSzBsZuJjA">
  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none"></div>
  <div class="relative z-20 flex items-start">
    <span class="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-black/60 text-amber-300 border border-white/10 backdrop-blur-md">Etnobotani &amp; Pewarnaan</span>
  </div>
  <div class="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
    <button type="button" class="pointer-events-auto inline-flex items-center justify-center px-5 py-2 rounded-full text-white text-sm font-semibold tracking-wide transition-all duration-300 border border-white/40 hover:border-white hover:text-white focus:outline-none shadow-lg bg-transparent hover:bg-transparent"><span class="">Eksplor</span></button>
  </div>
  <div class="relative z-20 flex flex-col items-center text-center mt-auto">
    <h3 class="font-serif font-semibold text-[#f5f0eb] group-hover:text-[#f3d38c] transition duration-300 leading-snug mb-1.5 sm:text-lg">Proses Celup Alami Gambir &amp; Sepang</h3>
    <p class="text-[#cbbba7] leading-relaxed font-sans line-clamp-2 text-sm">Formulasi getah gambir dan kayu secang penghasil rona merah marun abadi tahan ratusan tahun.</p>
  </div>
</article>
<article class="group relative rounded-2xl overflow-hidden border border-white/10 aspect-[3/4] flex flex-col justify-between p-4 cursor-pointer shadow-lg hover:border-amber-400/30 transition-all duration-500 bg-black/60">
  <img alt="Pakaian Adat Aesan Gede Palembang" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 z-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJO4Z-bTXBjhbzXkn23uF10_ZVIKjcwSp8nnG6B0xJIRE0nhOgXm4SixSyetg0GB3OwO9UnqY6uKMU0wwAGcHjIWM084GccGNXIm1eE_BBCzcfsF0EZ3bWp0tn2AsGrY5pqydW0m7LlO_-APhVrGGI1hfxXJPXzULHATngnUv30iSQ9D8MvROo5SqtgusvaU4JJYe1JMZmP1AmbJd6IEl_tFaD4ofj78uH_WqShCXsWFMxZyTtkem_8w">
  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none"></div>
  <div class="relative z-20 flex items-start">
    <span class="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-black/60 text-amber-300 border border-white/10 backdrop-blur-md">Kostum Kerajaan Lengkap</span>
  </div>
  <div class="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
    <button type="button" class="pointer-events-auto inline-flex items-center justify-center px-5 py-2 rounded-full text-white text-sm font-semibold tracking-wide transition-all duration-300 border border-white/40 hover:border-white hover:text-white focus:outline-none shadow-lg bg-transparent hover:bg-transparent"><span class="">Eksplor</span></button>
  </div>
  <div class="relative z-20 flex flex-col items-center text-center mt-auto">
    <h3 class="font-serif font-semibold text-[#f5f0eb] group-hover:text-[#f3d38c] transition duration-300 leading-snug mb-1.5 sm:text-lg">Pakaian Adat Aesan Gede Palembang</h3>
    <p class="text-[#cbbba7] leading-relaxed font-sans line-clamp-2 text-sm">Busana perkawinan agung gabungan pengaruh estetika Buddha Sriwijaya dan etika Kesultanan Palembang.</p>
  </div>
</article>
<article class="group relative rounded-2xl overflow-hidden border border-white/10 aspect-[3/4] flex flex-col justify-between p-4 cursor-pointer shadow-lg hover:border-amber-400/30 transition-all duration-500 bg-black/60">
  <img alt="Hutan Hujan &amp; Perairan Suvarnadvipa" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 z-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0gVTaR0LzzvJnGlJJvzZI4meD-ucCLThXQqF__AgWr2ASNon8GzQaw2NUOQz8EDRYp9AJwP5CfUwsvoq000FXc1RBmLznAiRk8YcgmUEB8GwrlgpcsBI3zF9DyVFrJKKpD40vnE0yKOBJ6eziIkEi1nmrYFcE4VlMP3LgP2WUZIkt01wKM7Gfvw6Io6q7Q4vjKlIY5jK2SzDg1O1j-Z1WpJc5932LTP0G34wSRG7VagnLuzLobqC62g">
  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none"></div>
  <div class="relative z-20 flex items-start">
    <span class="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-black/60 text-amber-300 border border-white/10 backdrop-blur-md">Konservasi &amp; Ekosistem</span>
  </div>
  <div class="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
    <button type="button" class="pointer-events-auto inline-flex items-center justify-center px-5 py-2 rounded-full text-white text-sm font-semibold tracking-wide transition-all duration-300 border border-white/40 hover:border-white hover:text-white focus:outline-none shadow-lg bg-transparent hover:bg-transparent"><span class="">Eksplor</span></button>
  </div>
  <div class="relative z-20 flex flex-col items-center text-center mt-auto">
    <h3 class="font-serif font-semibold text-[#f5f0eb] group-hover:text-[#f3d38c] transition duration-300 leading-snug mb-1.5 sm:text-lg">Hutan Hujan &amp; Perairan Suvarnadvipa</h3>
    <p class="text-[#cbbba7] leading-relaxed font-sans line-clamp-2 text-sm">Ekosistem maritim dan hutan purba yang dilindungi oleh piagam prasasti raja-raja Sriwijaya.</p>
  </div>
</article></div>
</section>
<!-- END: SavedArtefactsSection -->
</main>
<!-- END: MainContent -->
<!-- BEGIN: ToastNotification -->
<!-- Floating feedback notification for bookmark and favorite interaction -->
<aside aria-live="polite" class="fixed bottom-6 right-6 z-50 transform translate-y-24 opacity-0 transition-all duration-300 pointer-events-none" id="toast-notification">
<div class="bg-sora-card/95 backdrop-blur-xl border border-sora-gold/40 text-sora-gold-light px-5 py-3 rounded-xl shadow-2xl flex items-center space-x-3">
<div class="w-7 h-7 rounded-full bg-sora-crimson/80 flex items-center justify-center text-sora-gold" id="toast-icon-container">
<svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path clip-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fill-rule="evenodd"></path></svg>
</div>
<div>
<p class="text-sm font-semibold text-white" id="toast-title">Berhasil Diperbarui</p>
<p class="text-xs text-white/60" id="toast-subtitle">Tersimpan dalam daftar favorit Anda</p>
</div>
</div>
</aside>
<!-- END: ToastNotification -->
<!-- BEGIN: MainFooter -->
<footer class="w-full bg-transparent border-t border-white/10 py-3 md:py-4 relative z-10 shrink-0"><div class="w-full px-4 sm:px-6 md:px-12 max-w-7xl mx-auto flex items-center gap-2 text-white/60 font-sans text-xs"><span class="font-serif font-bold tracking-tight text-sm bg-gradient-to-r from-[#FDE047] via-[#E9C176] to-[#DC2626] bg-clip-text text-transparent drop-shadow-md select-none">SORA.Culture</span><span class="text-white/60 ml-1">© Muhammad Firly Marezky &amp; M. Rifqi Aunur Rahman • 2026</span></div></footer>
<!-- END: MainFooter -->
<!-- BEGIN: InteractivityScript -->
<script data-purpose="toast-and-favorite-handlers">
    /**
     * Show elegant toast notification
     */
    function showToast(title, subtitle, isRemove = false) {
      const toast = document.getElementById('toast-notification');
      const toastTitle = document.getElementById('toast-title');
      const toastSubtitle = document.getElementById('toast-subtitle');
      const toastIcon = document.getElementById('toast-icon-container');

      toastTitle.textContent = title;
      toastSubtitle.textContent = subtitle;

      if (isRemove) {
        toastIcon.className = "w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white/60";
        toastIcon.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`;
      } else {
        toastIcon.className = "w-7 h-7 rounded-full bg-sora-crimson/80 flex items-center justify-center text-sora-gold";
        toastIcon.innerHTML = `<svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>`;
      }

      toast.classList.remove('translate-y-24', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');

      setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('translate-y-24', 'opacity-0');
      }, 2600);
    }

    /**
     * Toggle item favorite heart state
     */
    function toggleFavorite(button, itemName) {
      const svg = button.querySelector('svg');
      const isFavorited = button.classList.contains('text-red-500');

      if (isFavorited) {
        button.classList.remove('text-red-500');
        button.classList.add('text-white/40');
        svg.classList.remove('fill-current');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');
        svg.setAttribute('stroke-width', '2');
        showToast("Dihapus dari Favorit", itemName, true);
      } else {
        button.classList.add('text-red-500');
        button.classList.remove('text-white/40');
        svg.setAttribute('fill', 'currentColor');
        svg.removeAttribute('stroke');
        svg.removeAttribute('stroke-width');
        showToast("Tersimpan di Favorit", itemName, false);
      }
    }

    /**
     * Toggle weekly digest card bookmark
     */
    function toggleBookmark(button, cardName) {
      const isSaved = button.getAttribute('data-saved') === 'true';
      if (!isSaved) {
        button.setAttribute('data-saved', 'true');
        button.classList.add('text-sora-gold');
        button.classList.remove('text-white/80');
        showToast("Kurasi Ditandai", cardName, false);
      } else {
        button.setAttribute('data-saved', 'false');
        button.classList.remove('text-sora-gold');
        button.classList.add('text-white/80');
        showToast("Tanda Kurasi Dihapus", cardName, true);
      }
    }

    /**
     * Smart Autohide Navbar with Proximity & rAF Throttling
     */
    const headerEl = document.getElementById('main-header');
    let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
    let isHeaderHovered = false;
    let ticking = false;

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

    function updateNavbar() {
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;

      // Always show near top
      if (currentScrollY < 60) {
        showNavbar();
      } else {
        const diff = currentScrollY - lastScrollY;
        if (diff > 4) {
          // Scrolling down
          hideNavbar();
        } else if (diff < -4) {
          // Scrolling up
          showNavbar();
        }
      }

      lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    }, { passive: true });

    // Cursor proximity to top edge of viewport
    window.addEventListener('mousemove', (e) => {
      if (e.clientY < 60) {
        showNavbar();
      }
    }, { passive: true });
  </script>
<!-- END: InteractivityScript -->


</body></html>