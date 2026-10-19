<!DOCTYPE html>

<html class="scroll-smooth" lang="en" style=""><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>#144ONTOUR - Web Design &amp; Drone Footage</title>
<!-- Tailwind CSS CDN with plugins -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<!-- Google Fonts: Montserrat for modern geometric UI and Sedgwick Ave / Permanent Marker style for logo script -->
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&amp;family=Permanent+Marker&amp;family=Reenie+Beanie&amp;display=swap" rel="stylesheet"/>
<!-- Font Awesome for clean line icons -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet"/>
<script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brand: {
              cyan: '#00a8c6',
              lightcyan: '#0cb8d6',
              darkcyan: '#008ba3',
              deepteal: '#006c80',
              accent: '#00bcd4'
            }
          },
          fontFamily: {
            sans: ['Montserrat', 'sans-serif'],
            script: ['"Permanent Marker"', 'cursive'],
          }
        }
      }
    }
  </script>
<style data-purpose="custom-decorations">
    @keyframes gradientFlow {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    body {
      background: linear-gradient(-45deg, #1c1013, #451a24, #70261d, #25181b, #3f1822);
      background-size: 400% 400%;
      animation: gradientFlow 12s ease infinite;
      background-attachment: fixed;
      overflow-x: hidden;
    }
    .font-brush {
      font-family: 'Permanent Marker', cursive, sans-serif;
      letter-spacing: 2px;
      text-shadow: 0 4px 15px rgba(0, 0, 0, 0.45);
    }
    .shadow-deep-card {
      box-shadow: 0 20px 45px -10px rgba(0, 0, 0, 0.35);
    }
    .shadow-subtle {
      box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    }

    /* Scroll Triggered Entrance & Exit Animations */
    .scroll-anim {
      opacity: 0;
      transition-property: transform, opacity;
      transition-duration: 0.8s;
      transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
      will-change: transform, opacity;
    }

    /* Direction variants */
    .scroll-anim-left {
      transform: translateX(-60px);
    }
    .scroll-anim-right {
      transform: translateX(60px);
    }
    .scroll-anim-right-lg {
      transform: translateX(70px);
    }
    .scroll-anim-left-lg {
      transform: translateX(-70px);
    }
    .scroll-anim-center-pop {
      transform: translateY(45px) scale(0.96);
    }

    /* In-view active state */
    .scroll-anim.in-view {
      opacity: 1;
      transform: translate(0, 0) scale(1);
    }

    /* Stagger Delays */
    .delay-100 { transition-delay: 100ms; }
    .delay-150 { transition-delay: 150ms; }
    .delay-200 { transition-delay: 200ms; }
    .delay-250 { transition-delay: 250ms; }
    .delay-300 { transition-delay: 300ms; }

    /* Accessibility */
    @media (prefers-reduced-motion: reduce) {
      .scroll-anim {
        opacity: 1 !important;
        transform: none !important;
        transition: none !important;
      }
      body {
        animation: none !important;
      }
    }
  </style>
</head>
<body class="text-gray-200 font-sans antialiased selection:bg-[#00a8c6] selection:text-white min-h-screen">
<!-- BEGIN: TopBar -->
<div class="bg-black/85 text-white/90 text-[11px] font-medium tracking-wider relative z-50">
</div>
<!-- END: TopBar -->
<!-- BEGIN: HeroAndHeaderWrapper -->
<div class="relative bg-slate-900 min-h-[580px] lg:min-h-[700px] flex flex-col justify-between overflow-visible">
<!-- Hero Background Image (Tropical Beach with crystal waters) -->
<div class="absolute inset-0 z-0 overflow-hidden">
<img alt="Tropical paradise beach with white sand and turquoise ocean" class="w-full h-full object-cover object-center transform scale-105 filter brightness-[0.92]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2sQ2bQ6Z6LxsgepKKZk61qtLQRqsY6vC7aVIs8pr9dA7W93L_cbZw1o4rOCEthPcfFfWBaFs6iqtZjyowLyNQB1YjjO98OygAC6RrV4PaQ6Of-F2GnX3T-BCyVuPvT8GKNr3kpMIC-VlzF2Lov4P4ZiHoakHkSlM0Q_kNhVg2lBD5Yv4LI8Le7nSikSuYfE5fFa03C5UIEuUIAJLe43SglCWW7eSf10F3PCoaH-g10pvE3XP6dHnRQ"/>
<!-- Soft gradient overlay for navigation clarity -->
<div class="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/30"></div>
</div>
<!-- BEGIN: NavigationBar -->
<!-- END: NavigationBar -->
<!-- Center Hero Slogan Text -->
<div class="relative z-20 my-auto text-center px-4 pt-4 pb-16">
<h1 class="text-white text-5xl md:text-7xl lg:text-8xl font-brush drop-shadow-2xl">
        #144ontour
      </h1>
</div>
<!-- Bottom Spacing to balance floating bar -->
<div class="h-16 lg:h-24"></div>
</div>
<!-- END: HeroAndHeaderWrapper -->
<!-- BEGIN: FourFeatureCards -->
<!-- Floating Cyan Feature Ribbon across Hero Bottom -->
<section class="relative z-30 max-w-5xl mx-auto px-4 sm:px-6 -mt-10 lg:-mt-16 mb-16"><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 shadow-2xl rounded-xl overflow-hidden backdrop-blur-md border border-[#dda758]/30" style="background: linear-gradient(135deg, rgba(221, 167, 88, 0.18) 0%, rgba(37, 24, 27, 0.92) 50%, rgba(28, 16, 19, 0.96) 100%); box-shadow: rgba(0, 0, 0, 0.6) 0px 20px 50px -10px, rgba(221, 167, 88, 0.2) 0px 0px 25px -5px;">
<!-- Feature 1: Web Design (Slide from Left) -->
<div class="p-6 text-white border-b lg:border-b-0 lg:border-r border-[#dda758]/20 hover:bg-[#35262a]/70 transition duration-200 group scroll-anim scroll-anim-left">
<div class="flex items-center space-x-2.5 mb-2.5">
<div class="text-lg text-[#fbc270] group-hover:scale-105 transition-transform">
<i class="fa-solid fa-laptop-code"></i>
</div>
<h2 class="text-[11px] font-bold tracking-wider uppercase text-[#fbc270]">Web Design</h2>
</div>
<p class="text-[11px] leading-relaxed text-gray-300 font-normal">
          Professional and unique websites are our key service. Available on mobile devices, SEO ready.
        </p>
</div>
<!-- Feature 2: Drone Footage (Slide from Left with slight delay) -->
<div class="p-6 text-white border-b lg:border-b-0 lg:border-r border-[#dda758]/20 hover:bg-[#35262a]/70 transition duration-200 group scroll-anim scroll-anim-left delay-100">
<div class="flex items-center space-x-2.5 mb-2.5">
<div class="text-lg text-[#fbc270] group-hover:scale-105 transition-transform">
<i class="fa-solid fa-crosshairs"></i>
</div>
<h2 class="text-[11px] font-bold tracking-wider uppercase text-[#fbc270]">Drone Footage</h2>
</div>
<p class="text-[11px] leading-relaxed text-gray-300 font-normal">
          We provide drone based aerial video &amp; photography services. Put your TripAdvisor or Booking.com to whole new level.
        </p>
</div>
<!-- Feature 3: Portfolio (Slide from Right with slight delay) -->
<div class="p-6 text-white border-b md:border-b-0 lg:border-r border-[#dda758]/20 hover:bg-[#35262a]/70 transition duration-200 group scroll-anim scroll-anim-right delay-100">
<div class="flex items-center space-x-2.5 mb-2.5">
<div class="text-lg text-[#fbc270] group-hover:scale-105 transition-transform">
<i class="fa-solid fa-folder-open"></i>
</div>
<h2 class="text-[11px] font-bold tracking-wider uppercase text-[#fbc270]">Portfolio</h2>
</div>
<p class="text-[11px] leading-relaxed text-gray-300 font-normal">
          Check out our latest projects of websites and drone footage. Join our list of satisfied customers.
        </p>
</div>
<!-- Feature 4: Free Service (Slide from Right) -->
<div class="p-6 text-white hover:bg-[#35262a]/70 transition duration-200 group scroll-anim scroll-anim-right">
<div class="flex items-center space-x-2.5 mb-2.5">
<div class="text-lg text-[#fbc270] group-hover:scale-105 transition-transform">
<i class="fa-solid fa-handshake"></i>
</div>
<h2 class="text-[11px] font-bold tracking-wider uppercase text-[#fbc270]">Free Service</h2>
</div>
<p class="text-[11px] leading-relaxed text-gray-300 font-normal">
          Check out our Work &amp; Travel offer to find out how to get our services for free.
        </p>
</div>
</div></section>
<!-- END: FourFeatureCards -->
<!-- BEGIN: WhoWeAreSection -->
<section class="max-w-7xl mx-auto px-6 pt-12 pb-0 lg:pt-16 lg:pb-0 bg-transparent">
<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
<!-- Left side: Tropical Viewpoint Photo (Slide from Left) -->
<div class="lg:col-span-6 overflow-hidden rounded-sm shadow-xl scroll-anim scroll-anim-left-lg">
<img alt="Traveler standing on island viewpoint overlooking tropical bay" class="w-full h-[380px] lg:h-[420px] object-cover hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPqSPgcJmpw0VtHUZihgDfL-_cCuqwXsel1WTrkp31i-mWAm971dVuh7e3ABW26zWLxli-cArmpn4U93xR1ObpbBTCIq3UeCxZJwH42cy_ZcexWLiEc6IxS1O91sJs1GegnFsEU6k5_e6Xe-jSTKI87ibU8wbOec46zUOYPH2vwenMQ9VJQ5711e7X1Zy-guJdXRWo3olxuGsK6EvcdAw3zy7jkPeyAtmehqyzCXcFIKNqLGb5IoD3SQ"/>
</div>
<!-- Right side: Text Bio description (Slide from Right) -->
<div class="lg:col-span-6 flex flex-col justify-center scroll-anim scroll-anim-right delay-150">
<!-- Cyan Horizontal Top Line -->
<div class="w-12 h-1 bg-[#dda758] mb-5"></div>
<h2 class="text-2xl lg:text-3xl font-extrabold text-white tracking-wider uppercase mb-6">
          Who We Are
        </h2>
<div class="space-y-4 text-sm text-gray-200/90 font-normal leading-relaxed text-justify">
<p class="">
            My name is Oscar and I'm the founder of 144ONTOUR. I'm a 24 year old student from Lodz, Poland. I've been traveling with my girlfriend Paula for three years, working remotely.
          </p>
<p class="">
            The main idea of the company is Work &amp; Travel Trip around the World. We offer a professional web and digital media design.
          </p>
</div>
</div>
</div>
</section>
<!-- END: WhoWeAreSection -->
<!-- BEGIN: OverlappingCardsSection -->
<!-- Layered layout matching the reference precisely -->
<section class="max-w-7xl mx-auto px-6 pt-0 pb-16 lg:pb-24 -mt-16 md:-mt-24 lg:-mt-28 relative z-20 bg-transparent"><div class="max-w-6xl mx-auto px-4 sm:px-6 relative">
<div class="grid grid-cols-1 lg:grid-cols-12 items-start relative">
<!-- LEFT COLUMN: Cyan Box + Aerial Island Box -->
<div class="lg:col-span-7 relative z-20 lg:pr-0">
<!-- Top Amber Card (Elastic smooth entrance from bottom/left) -->
<div class="relative z-30 bg-[#25181b]/95 backdrop-blur-md border border-[#dda758]/30 text-white p-8 md:p-12 shadow-2xl rounded-sm max-w-xl -mb-16 md:-mb-24 ml-0 mt-8 scroll-anim scroll-anim-center-pop delay-100" style="background: linear-gradient(135deg, rgb(221, 167, 88) 0%, rgb(196, 139, 59) 50%, rgb(158, 109, 36) 100%); border: 1px solid rgba(255, 221, 178, 0.4); box-shadow: rgba(0, 0, 0, 0.6) 0px 25px 50px -12px, rgba(221, 167, 88, 0.3) 0px 0px 35px, rgba(255, 255, 255, 0.2) 0px 1px 0px inset; backdrop-filter: blur(12px);">
<div class="w-10 h-0.5 bg-[#dda758] mb-4" style="background-color: rgb(255, 255, 255);"></div>
<h3 class="text-xl md:text-2xl font-bold uppercase tracking-wider leading-tight mb-4 text-white">
          WEB AND DIGITAL<br/>MEDIA DESIGN
        </h3>
<p class="text-xs md:text-sm font-normal leading-relaxed mb-8 max-w-md text-white/90">
          Your website has only a few seconds to interest potential customers. With 144ONTOUR your new website will effectively attract attention and point it in the right direction. We design modern websites and create a professional image of your company. Our work is our passion. That's why our websites are in line with the latest trends and technologies.
        </p>
<a class="inline-block bg-[#dda758] text-[#1c1013] text-xs font-bold uppercase px-6 py-3 tracking-wider hover:bg-[#fbc270] transition shadow-md" href="#" style="background-color: rgb(255, 255, 255); color: rgb(0, 95, 115); font-weight: 700; box-shadow: rgba(0, 0, 0, 0.25) 0px 4px 14px;">
          BUILD MY WEBSITE
        </a>
</div>
<!-- Bottom Aerial Photography Card (Slide from Left) -->
<div class="relative z-10 w-full max-w-md lg:max-w-lg mt-8 md:mt-12 ml-6 md:ml-12 scroll-anim scroll-anim-left-lg delay-200">
<div class="relative h-[480px] w-full rounded-sm overflow-hidden shadow-2xl">
<img alt="Aerial tropical island coral reef and beach" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0Yuhf89rlrbHEL9zTu3gKPghYTwoYDfUhvnTFVMMPgK8Kzh0auhFNEMVxx4oHMok-v-r0j6eURXrS3Ji96U9y02fjoCTu2wZCg-BtTSfHQgm_0pStnGVkFOaZfC4U8Is93VUYFKVU3ySHPT4VXOGPApveMHZBtakbq0Lkhr5xrOHzxk6m_B9Okp3FoCfZ3BOOiS4WgKOh9rYtefK4P-zHmCqxP3WNjasH5Tr0mXS1YWE_hZMkbhgAmA"/>
<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
<div class="absolute inset-0 p-8 md:p-10 flex flex-col justify-end text-white">
<h3 class="text-xl md:text-2xl font-extrabold uppercase tracking-wide leading-tight mb-3 drop-shadow">
              AERIAL<br/>PHOTOGRAPHY<br/>&amp; VIDEO<br/>SERVICES
            </h3>
<p class="text-xs md:text-sm text-white/90 leading-relaxed mb-6 max-w-xs drop-shadow">
              Show your resort, hotel or anything you want from a completely different perspective. Make your offer on Booking.com or TripAdvisor stand out among others!
            </p>
<a class="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-white hover:text-[#fbc270] transition-colors" href="#"><i class="fa-solid fa-drone"></i><span class="">Find out more</span><i class="fa-solid fa-arrow-right text-[10px]"></i></a>
</div>
</div>
</div>
</div>
<!-- RIGHT COLUMN: Overlapping Sunset Card (Slide from Right) -->
<div class="lg:col-span-5 relative z-30 mt-8 lg:-ml-16 lg:mt-16 scroll-anim scroll-anim-right-lg delay-150">
<div class="relative rounded-sm overflow-hidden shadow-2xl min-h-[660px] md:min-h-[720px] flex flex-col justify-center text-center">
<img alt="Golden sunset over ocean with boat silhouette" class="absolute inset-0 w-full h-full object-cover filter brightness-75 contrast-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuyuVuKhxQxwJnr3VR0yuJCwGZG2575U58B067_I7b_D5VYnKw_e2r6D2pdEAarC51Jndm2HpfGFazrpnOCpfPXaRszHsZZ659kJZEUwSZqVRxNHXzTgz3CoFBgMr-cI1nZQ9GTWtCRS1LZ7VuF9DIl2M2yfAag8cUITwIh6ay9tb3lfrHKxa07FC7vWFgorzjTMWCU5vdmqVfT-xWIdkJXoYOTnHhqH_FiMtpduc7kyMsexzQjQKEXg"/>
<div class="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/75"></div>
<div class="relative z-20 px-8 py-16 md:px-12 text-white flex flex-col items-center">
<h3 class="text-2xl md:text-3xl font-extrabold uppercase tracking-widest leading-snug mb-5 drop-shadow-md">
            SERVICE<br/>FOR FREE
          </h3>
<p class="text-xs md:text-sm text-white/90 leading-relaxed max-w-sm mx-auto mb-8 font-light drop-shadow">
            Do you want a new website but you don't have time to manage it? You don't have photos or materials? Is it possible to build website for free? Instead of standard offer - choose Work &amp; Travel option!
          </p>
<a class="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-white hover:text-[#fbc270] transition-colors border-b border-transparent hover:border-[#fbc270] pb-0.5" href="#"><i class="fa-solid fa-suitcase-rolling"></i><span class="">Find out more</span></a>
</div>
</div>
</div>
</div>
</div></section>
<!-- END: OverlappingCardsSection -->
<!-- BEGIN: WorldMapAndNomadSection -->
<!-- END: WorldMapAndNomadSection -->
<!-- BEGIN: MainFooter -->
<section class="w-full max-w-7xl mx-auto px-6 py-16 md:py-24 bg-transparent">
<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
<!-- Left: World Map with Cyan Travel Pins (Slide from Left) -->
<div class="lg:col-span-7 relative flex items-center justify-center scroll-anim scroll-anim-left-lg">
<div class="relative w-full max-w-2xl">
<svg class="w-full h-auto drop-shadow-sm" fill="none" viewbox="0 0 1000 520" xmlns="http://www.w3.org/2000/svg">
<!-- Continents Silhouette (#2f333a) -->
<g fill="#2f333a">
<!-- North America -->
<path d="M165 48 C 210 42, 280 48, 305 78 C 315 90, 310 115, 290 120 C 275 125, 260 110, 248 118 C 240 125, 260 140, 285 142 C 300 144, 292 165, 275 178 C 260 190, 245 180, 230 195 C 220 205, 235 220, 245 235 C 255 250, 245 270, 230 280 C 220 287, 215 275, 205 285 C 195 295, 205 320, 185 330 C 175 335, 168 318, 155 315 C 142 312, 130 325, 118 310 C 105 295, 115 270, 102 250 C 92 230, 75 225, 78 200 C 80 180, 102 170, 108 150 C 115 130, 95 115, 105 95 C 115 75, 140 52, 165 48 Z"></path>
<!-- Greenland -->
<path d="M345 35 C 375 30, 410 45, 405 75 C 400 95, 370 110, 345 105 C 330 102, 325 80, 330 60 C 335 45, 335 38, 345 35 Z"></path>
<!-- Central America -->
<path d="M218 325 C 230 338, 242 355, 255 370 C 262 380, 275 385, 285 395 C 282 400, 270 395, 262 388 C 250 378, 238 360, 225 348 C 215 338, 212 330, 218 325 Z"></path>
<!-- South America -->
<path d="M275 390 C 310 388, 350 410, 370 440 C 385 465, 375 500, 355 530 C 340 550, 330 580, 315 610 C 305 630, 290 660, 270 670 C 255 680, 242 660, 240 640 C 238 610, 248 580, 245 550 C 242 520, 225 490, 230 460 C 235 430, 255 400, 275 390 Z" transform="scale(0.68) translate(80, 60)"></path>
<!-- Europe -->
<path d="M480 95 C 510 85, 550 90, 570 115 C 585 130, 565 155, 550 170 C 535 185, 550 205, 530 220 C 515 230, 490 225, 475 210 C 460 195, 470 175, 460 160 C 450 145, 455 125, 465 110 C 472 98, 470 100, 480 95 Z"></path>
<!-- Scandinavia & UK -->
<path d="M495 55 C 515 45, 545 50, 540 80 C 535 105, 515 115, 505 95 C 498 80, 485 65, 495 55 Z"></path>
<path d="M445 115 C 455 110, 465 120, 460 135 C 452 148, 440 140, 445 115 Z"></path>
<!-- Africa -->
<path d="M475 230 C 525 220, 575 235, 595 270 C 615 310, 610 360, 600 405 C 590 445, 570 480, 540 510 C 520 530, 495 515, 485 480 C 475 440, 460 400, 450 360 C 440 320, 430 270, 455 245 C 462 238, 468 232, 475 230 Z"></path>
<!-- Madagascar -->
<path d="M625 430 C 635 425, 642 440, 638 465 C 632 485, 622 475, 625 430 Z"></path>
<!-- Asia & Russia -->
<path d="M575 75 C 640 60, 730 50, 800 65 C 865 80, 920 110, 940 150 C 955 180, 930 215, 900 230 C 870 245, 845 220, 820 235 C 795 250, 805 285, 780 305 C 755 325, 730 300, 705 315 C 680 330, 670 360, 640 350 C 620 340, 630 305, 615 285 C 600 265, 580 260, 570 235 C 560 205, 585 185, 575 155 C 565 125, 550 95, 575 75 Z"></path>
<!-- India -->
<path d="M670 240 C 700 240, 725 270, 720 310 C 715 335, 695 365, 680 375 C 670 365, 660 330, 655 300 C 650 270, 655 242, 670 240 Z"></path>
<!-- Japan & East Asian Islands -->
<path d="M885 170 C 895 160, 905 180, 898 210 C 890 230, 880 210, 885 170 Z"></path>
<!-- Southeast Asian Islands / Indonesia / Philippines -->
<path d="M745 365 C 760 360, 770 370, 762 385 C 755 395, 740 380, 745 365 Z"></path>
<path d="M775 385 C 800 380, 825 390, 815 408 C 802 418, 775 405, 775 385 Z"></path>
<path d="M730 400 C 750 395, 770 410, 755 425 C 738 435, 722 415, 730 400 Z"></path>
<!-- Australia -->
<path d="M790 410 C 840 390, 895 410, 920 445 C 935 470, 930 505, 905 525 C 875 545, 830 540, 800 520 C 775 500, 770 460, 775 435 C 778 420, 782 415, 790 410 Z"></path>
<!-- New Zealand -->
<path d="M940 505 C 950 500, 955 515, 948 535 C 940 550, 932 540, 940 505 Z"></path>
</g>
<!-- Cyan Location Pins & Dots -->
<g><circle class="" cx="145" cy="185" fill="#dda758" r="5.5" stroke="#ffffff" stroke-width="1.5"></circle>
<circle class="" cx="205" cy="295" fill="#dda758" r="5.5" stroke="#ffffff" stroke-width="1.5"></circle>
<circle class="" cx="515" cy="145" fill="#fbc270" r="6" stroke="#ffffff" stroke-width="2"></circle>
<circle class="" cx="500" cy="195" fill="#dda758" r="5" stroke="#ffffff" stroke-width="1.5"></circle>
<circle class="" cx="735" cy="295" fill="#fbc270" r="6" stroke="#ffffff" stroke-width="2"></circle>
<circle class="" cx="775" cy="395" fill="#dda758" r="5.5" stroke="#ffffff" stroke-width="1.5"></circle>
<circle class="" cx="885" cy="465" fill="#dda758" r="5.5" stroke="#ffffff" stroke-width="1.5"></circle></g>
</svg>
</div>
</div>
<!-- Right: Text Description & OUR TRIPS Button (Slide from Right) -->
<div class="lg:col-span-5 flex flex-col items-start lg:pl-6 scroll-anim scroll-anim-right delay-150">
<!-- Cyan accent top line -->
<div class="w-12 h-1 bg-[#dda758] mb-4"></div>
<h2 class="text-2xl md:text-3xl font-extrabold text-white tracking-wider uppercase mb-5">
        #144ONTOUR
      </h2>
<p class="text-sm text-gray-200/90 font-normal leading-relaxed text-justify mb-8">
        Thanks to web design and the ability to work remotely, we can realize our passion for traveling and become digital nomads. Our main goal in life is to enjoy the work while traveling around the World. Check out our videos and photos from previous trips and prepare for more!
      </p>
<a class="inline-block bg-[#dda758] text-[#1c1013] text-xs font-bold uppercase tracking-wider px-8 py-3.5 shadow-md hover:bg-[#fbc270] transition duration-200" href="#">
        OUR TRIPS
      </a>
</div>
</div>
</section><footer class="bg-transparent border-t border-white/10 pt-16 pb-12 text-center">
<div class="max-w-7xl mx-auto px-6">
<!-- Footer Secondary Navigation -->
<nav class="mb-10"><ul class="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-medium text-gray-300">
<li class=""><a class="hover:text-[#fbc270] transition-colors" href="#">Home</a></li>
<li class=""><a class="hover:text-[#fbc270] transition-colors" href="#">Web design</a></li>
<li class=""><a class="hover:text-[#fbc270] transition-colors" href="#">Drone footage</a></li>
<li class=""><a class="hover:text-[#fbc270] transition-colors" href="#">Portfolio</a></li>
<li class=""><a class="hover:text-[#fbc270] transition-colors" href="#">Work and Travel</a></li>
<li class=""><a class="hover:text-[#fbc270] transition-colors" href="#">Trips</a></li>
<li class=""><a class="hover:text-[#fbc270] transition-colors" href="#">About us</a></li>
<li class=""><a class="hover:text-[#fbc270] transition-colors" href="#">Contact us</a></li>
</ul></nav>
<!-- Stay in Touch Heading -->
<h4 class="text-[11px] font-bold uppercase tracking-widest text-gray-200 mb-6">
        Stay in touch
      </h4>
<!-- Footer Social Icons -->
<div class="flex items-center justify-center space-x-6 text-gray-300 text-sm mb-10"><a aria-label="Facebook" class="hover:text-[#fbc270] transition-colors" href="#"><i class="fa-brands fa-facebook-f"></i></a>
<a aria-label="Instagram" class="hover:text-[#fbc270] transition-colors" href="#"><i class="fa-brands fa-instagram"></i></a>
<a aria-label="YouTube" class="hover:text-[#fbc270] transition-colors" href="#"><i class="fa-brands fa-youtube"></i></a>
<a aria-label="Email" class="hover:text-[#fbc270] transition-colors" href="#"><i class="fa-regular fa-envelope"></i></a></div>
<!-- Bottom Small Copyright Notice -->
<p class="text-[11px] text-gray-400 font-normal">
        © 144ONTOUR. All rights reserved.
      </p>
</div>
</footer>
<!-- END: MainFooter -->
<!-- Scroll Observer Script for Bidirectional In-and-Out Animations -->
<script>
  document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.scroll-anim');
    
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          } else {
            // Remove class to animate exit when scrolled away
            entry.target.classList.remove('in-view');
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      });

      animatedElements.forEach(el => observer.observe(el));
    } else {
      // Fallback for older browsers
      animatedElements.forEach(el => el.classList.add('in-view'));
    }
  });
</script>
</body></html>