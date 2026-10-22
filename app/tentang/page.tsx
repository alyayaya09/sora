"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import AmbientBackground from "../../components/AmbientBackground";
import { useLanguage } from "../../contexts/LanguageContext";

export default function TentangPage() {
  const { t } = useLanguage();
  useEffect(() => {
    const animatedElements = document.querySelectorAll(".scroll-anim");
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!prefersReducedMotion && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
            } else {
              entry.target.classList.remove("in-view");
            }
          });
        },
        {
          threshold: 0.15,
          rootMargin: "0px 0px -50px 0px",
        }
      );

      animatedElements.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    } else {
      animatedElements.forEach((el) => el.classList.add("in-view"));
    }
  }, []);

  return (
    <div className="text-gray-200 font-sans antialiased selection:bg-[#00f2fe] selection:text-black min-h-screen relative">
      {/* ── Ambient Background persis seperti halaman Jelajahi ── */}
      <AmbientBackground />
        
        {/* ========================================================
            HERO WRAPPER: Cinematic Cultural AI Studio Header
            ======================================================== */}
        <div className="relative bg-transparent min-h-[580px] lg:min-h-[660px] flex flex-col justify-between overflow-visible">
          {/* Hero Background Image */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              alt="SORA Arts & Culture AI Heritage Studio"
              className="w-full h-full object-cover object-center transform scale-105 filter brightness-[0.75] contrast-[1.05]"
              src="/images/sora_about_hero.jpg"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/images/ampera_hero.jpg";
              }}
            />
            {/* Soft gradient overlay fading to ambient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent" />
          </div>

          {/* Center Hero Slogan Text (#SORACulture replacing #144ontour) */}
          <div className="relative z-20 my-auto text-center px-4 pt-28 pb-16 max-w-5xl mx-auto">
            <h1 className="text-white text-5xl md:text-7xl lg:text-8xl drop-shadow-2xl font-bold tracking-tight">
              #SORA.Culture
            </h1>
            <p className="mt-4 text-sm sm:text-base md:text-lg text-white/85 max-w-2xl mx-auto font-light leading-relaxed drop-shadow">
              {t(
                "Platform Pelestarian Seni, Tradisi, dan Warisan Luhur Peradaban Sriwijaya Sumatera Selatan Bertenaga Kecerdasan Buatan.",
                "AI-Powered Preservation Platform for the Arts, Traditions, and Noble Heritage of South Sumatra's Sriwijaya Civilization."
              )}
            </p>
          </div>

          {/* Bottom Spacing to balance floating ribbon */}
          <div className="h-16 lg:h-24" />
        </div>

        {/* ========================================================
            FLOATING 4-FEATURE RIBBON ACROSS HERO BOTTOM
            ======================================================== */}
        <section className="relative z-30 max-w-5xl mx-auto px-4 sm:px-6 -mt-10 lg:-mt-16 mb-16">
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 shadow-2xl rounded-2xl overflow-hidden backdrop-blur-xl border border-[#dda758]/30"
            style={{
              background:
                "linear-gradient(135deg, rgba(221, 167, 88, 0.22) 0%, rgba(37, 24, 27, 0.94) 50%, rgba(28, 16, 19, 0.98) 100%)",
              boxShadow:
                "0 20px 50px -10px rgba(0, 0, 0, 0.7), 0 0 25px -5px rgba(221, 167, 88, 0.25)",
            }}
          >
            {/* Feature 1: AI Cultural Engine */}
            <div className="p-6 text-white border-b lg:border-b-0 lg:border-r border-[#dda758]/20 hover:bg-[#35262a]/70 transition duration-300 group scroll-anim scroll-anim-left">
              <div className="flex items-center space-x-2.5 mb-2.5">
                <div className="text-lg text-[#fbc270] group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[22px]">auto_awesome</span>
                </div>
                <h2 className="text-[11px] font-bold tracking-wider uppercase text-[#fbc270]">
                  AI Cultural Engine
                </h2>
              </div>
              <p className="text-[11px] leading-relaxed text-gray-300 font-normal">
                {t(
                  "Rangkuman interaktif Gemini bertenaga AI dengan sintesis suara naratif untuk mempelajari filosofi budaya Sumsel secara mendalam.",
                  "Gemini AI-powered interactive summaries with voice synthesis to explore South Sumatra's cultural philosophy in depth."
                )}
              </p>
            </div>

            {/* Feature 2: Digital Heritage Tours */}
            <div className="p-6 text-white border-b lg:border-b-0 lg:border-r border-[#dda758]/20 hover:bg-[#35262a]/70 transition duration-300 group scroll-anim scroll-anim-left delay-100">
              <div className="flex items-center space-x-2.5 mb-2.5">
                <div className="text-lg text-[#fbc270] group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[22px]">explore</span>
                </div>
                <h2 className="text-[11px] font-bold tracking-wider uppercase text-[#fbc270]">
                  {t("Tur Digital Imersif", "Immersive Digital Tours")}
                </h2>
              </div>
              <p className="text-[11px] leading-relaxed text-gray-300 font-normal">
                {t(
                  "Dedicated card sinematik layar penuh untuk menyelami Songket Lepus, Rumah Limas, Kerajaan Sriwijaya, hingga Perahu Bidar.",
                  "Cinematic full-screen dedicated cards to explore Songket Lepus, Limas House, Sriwijaya Empire, and Bidar Boat Races."
                )}
              </p>
            </div>

            {/* Feature 3: 8 Tema Budaya */}
            <div className="p-6 text-white border-b md:border-b-0 lg:border-r border-[#dda758]/20 hover:bg-[#35262a]/70 transition duration-300 group scroll-anim scroll-anim-right delay-100">
              <div className="flex items-center space-x-2.5 mb-2.5">
                <div className="text-lg text-[#fbc270] group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[22px]">museum</span>
                </div>
                <h2 className="text-[11px] font-bold tracking-wider uppercase text-[#fbc270]">
                  {t("8 Tema Kebudayaan", "8 Cultural Themes")}
                </h2>
              </div>
              <p className="text-[11px] leading-relaxed text-gray-300 font-normal">
                {t(
                  "Kurasi menyeluruh mencakup arsitektur adat, busana tenun, kuliner khas, tradisi lisan Dulmuluk, hingga Aksara Ulu kuno.",
                  "Comprehensive curation spanning traditional architecture, woven attire, signature cuisine, Dulmuluk oral traditions, to ancient Ulu script."
                )}
              </p>
            </div>

            {/* Feature 4: Arsip & Transparansi */}
            <div className="p-6 text-white hover:bg-[#35262a]/70 transition duration-300 group scroll-anim scroll-anim-right">
              <div className="flex items-center space-x-2.5 mb-2.5">
                <div className="text-lg text-[#fbc270] group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[22px]">verified</span>
                </div>
                <h2 className="text-[11px] font-bold tracking-wider uppercase text-[#fbc270]">
                  {t("Etika & Data Terbuka", "Ethics & Open Data")}
                </h2>
              </div>
              <p className="text-[11px] leading-relaxed text-gray-300 font-normal">
                {t(
                  "Komitmen keotentikan sejarah: atribusi pencipta, verifikasi sumber ilmiah, dan transparansi penuh terhadap konten AI.",
                  "Commitment to historical authenticity: creator attribution, academic source verification, and full transparency on AI content."
                )}
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================
            WHO WE ARE SECTION: Tim Pengembang SORA
            ======================================================== */}
        <section className="max-w-7xl mx-auto px-6 pt-12 pb-16 lg:pt-16 lg:pb-20 bg-transparent">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left side: Photo of Developers (Slide from Left) */}
            <div className="lg:col-span-6 overflow-hidden rounded-2xl shadow-2xl scroll-anim scroll-anim-left-lg border border-amber-400/20 group">
              <img
                alt="Muhammad Firly Marezky & M. Rifqi Aunur Rahman — Tim Pengembang SORA"
                className="w-full h-[380px] lg:h-[430px] object-cover group-hover:scale-105 transition-transform duration-700"
                src="/images/sora_team_creators.jpg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/images/sora_about_hero.jpg";
                }}
              />
            </div>

            {/* Right side: Bio & Latar Belakang Lomba PRD */}
            <div className="lg:col-span-6 flex flex-col justify-center scroll-anim scroll-anim-right delay-150">
              <div className="w-12 h-1 bg-[#dda758] mb-5 rounded-full" />
              <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold mb-2">
                {t("Inisiasi & Visi Riset", "Initiative & Research Vision")}
              </span>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-wider uppercase mb-6">
                {t("Siapa Kami di Balik SORA", "Who We Are Behind SORA")}
              </h2>
              <div className="space-y-4 text-sm text-gray-200/90 font-normal leading-relaxed text-justify">
                <p>
                  <strong>SORA (South Sumatra) Arts &amp; Culture</strong>{" "}
                  {t(
                    "lahir sebagai inisiatif karya pada kompetisi vibecoding tingkat kampus dengan tema kebangsaan: \"Empowering Culture Through AI-Driven Innovation\".",
                    "was born as an innovative project for a campus vibecoding competition under the national theme: \"Empowering Culture Through AI-Driven Innovation\"."
                  )}
                </p>
                <p>
                  {t(
                    "Platform ini dirancang dan dibangun oleh Muhammad Firly Marezky dan M. Rifqi Aunur Rahman. Bertolak dari keresahan kami terhadap media pelestarian budaya konvensional yang kerap disajikan melalui teks panjang monoton, kami bertekad menghadirkan pengalaman visual yang hidup, dinamis, dan intuitif.",
                    "This platform was designed and built by Muhammad Firly Marezky and M. Rifqi Aunur Rahman. Driven by our concern over conventional cultural preservation media often presented in monotonous long texts, we set out to create a vibrant, dynamic, and intuitive visual experience."
                  )}
                </p>
                <p>
                  {t(
                    "Dengan mengintegrasikan teknologi kecerdasan buatan Gemini API, kurasi arsip museum digital, dan desain antarmuka modern berakar pada estetika Kesultanan Palembang serta Kedatuan Sriwijaya, SORA mengajak generasi muda untuk kembali bangga merawat pusaka adiluhung Sumatera Selatan.",
                    "By integrating Gemini API artificial intelligence, digital museum archive curation, and modern UI design rooted in the aesthetics of the Palembang Sultanate and Sriwijaya Realm, SORA invites younger generations to take pride once more in South Sumatra's exalted heritage."
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            OVERLAPPING CARDS SECTION: Pilar Arsitektur & Etika PRD
            ======================================================== */}
        <section className="max-w-7xl mx-auto px-6 pt-0 pb-16 lg:pb-24 -mt-10 md:-mt-16 lg:-mt-20 relative z-20 bg-transparent">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-start relative">
              
              {/* LEFT COLUMN: Top Amber Card + Bottom Digital Tour Card */}
              <div className="lg:col-span-7 relative z-20 lg:pr-0">
                {/* Top Amber Card */}
                <div
                  className="relative z-30 text-white p-8 md:p-12 shadow-2xl rounded-2xl max-w-xl -mb-16 md:-mb-24 ml-0 mt-8 scroll-anim scroll-anim-center-pop delay-100"
                  style={{
                    background:
                      "linear-gradient(135deg, rgb(221, 167, 88) 0%, rgb(196, 139, 59) 50%, rgb(158, 109, 36) 100%)",
                    border: "1px solid rgba(255, 221, 178, 0.4)",
                    boxShadow:
                      "0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 35px rgba(221, 167, 88, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <div className="w-10 h-0.5 bg-white mb-4" />
                  <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wider leading-tight mb-4 text-white">
                    {t(
                      "INOVASI KECERDASAN BUATAN UNTUK BUDAYA LOKAL",
                      "ARTIFICIAL INTELLIGENCE INNOVATION FOR LOCAL CULTURE"
                    )}
                  </h3>
                  <p className="text-xs md:text-sm font-normal leading-relaxed mb-8 max-w-md text-white/95">
                    {t(
                      "Hanya butuh beberapa detik bagi pengunjung untuk terhubung dengan nilai luhur suatu warisan. SORA memanfaatkan AI bukan untuk menggantikan keaslian cerita, melainkan sebagai kompas yang merangkum sejarah, mengonversi teks ke audio puitis, dan memandu eksplorasi budaya secara cerdas.",
                      "It takes just seconds for visitors to connect with the noble value of a cultural heritage. SORA harnesses AI not to replace storytelling authenticity, but as a compass that synthesizes history, converts text into poetic narration, and guides cultural exploration."
                    )}
                  </p>
                  <Link
                    href="/jelajahi"
                    className="inline-block bg-white text-[#1c1013] text-xs font-bold uppercase px-6 py-3 tracking-wider hover:bg-amber-100 transition shadow-lg rounded-full"
                  >
                    {t("MULAI JELAJAHI SORA", "START EXPLORING SORA")}
                  </Link>
                </div>

                {/* Bottom Aerial / Heritage Card */}
                <div className="relative z-10 w-full max-w-md lg:max-w-lg mt-8 md:mt-12 ml-6 md:ml-12 scroll-anim scroll-anim-left-lg delay-200">
                  <div className="relative h-[480px] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                    <img
                      alt="Tur Digital Imersif — Keagungan Sriwijaya"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      src="/images/ampera_hero.jpg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end text-white">
                      <h3 className="text-xl md:text-2xl font-extrabold uppercase tracking-wide leading-tight mb-3 drop-shadow">
                        {t("DEDICATED CARDS & TUR DIGITAL SINEMATIK", "DEDICATED CARDS & CINEMATIC DIGITAL TOURS")}
                      </h3>
                      <p className="text-xs md:text-sm text-white/90 leading-relaxed mb-6 max-w-xs drop-shadow">
                        {t(
                          "Rasakan keindahan Jembatan Ampera, kemilau tenun Songket Lepus benang emas, dan arsitektur undakan Rumah Limas dalam format visual imersif.",
                          "Experience the majesty of Ampera Bridge, the shimmer of gold-threaded Songket Lepus, and the stepped architecture of Limas House in an immersive visual format."
                        )}
                      </p>
                      <Link
                        href="/tur/songket-palembang"
                        className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-white hover:text-[#fbc270] transition-colors"
                      >
                        <span className="material-symbols-outlined text-base">explore</span>
                        <span>{t("Lihat Tur Digital", "View Digital Tour")}</span>
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Overlapping Card — Etika & Transparansi PRD */}
              <div className="lg:col-span-5 relative z-30 mt-8 lg:-ml-16 lg:mt-16 scroll-anim scroll-anim-right-lg delay-150">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl min-h-[660px] md:min-h-[720px] flex flex-col justify-center text-center border border-white/10 group">
                  <img
                    alt="Etika dan Transparansi Sumber Budaya"
                    className="absolute inset-0 w-full h-full object-cover filter brightness-75 contrast-110 group-hover:scale-105 transition-transform duration-700"
                    src="/images/tari_gending.jpg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/85" />
                  <div className="relative z-20 px-8 py-16 md:px-12 text-white flex flex-col items-center">
                    <h3 className="text-2xl md:text-3xl font-extrabold uppercase tracking-widest leading-snug mb-5 drop-shadow-md">
                      {t("ETIKA AI & VERIFIKASI SUMBER", "AI ETHICS & SOURCE VERIFICATION")}
                    </h3>
                    <p className="text-xs md:text-sm text-white/90 leading-relaxed max-w-sm mx-auto mb-8 font-light drop-shadow text-justify">
                      {t(
                        "Sesuai pedoman etika dalam PRD SORA: Rangkuman kecerdasan buatan dapat mengalami ketidakakuratan lokal. Karena itu, setiap hasil pencarian selalu kami lengkapi dengan rujukan pustaka (seperti Wikimedia Commons, Kemdikbud Warisan Budaya, dan Balai Pelestarian Kebudayaan) serta penandaan transparan terhadap ilustrasi visual.",
                        "In accordance with ethical guidelines in the SORA PRD: AI summaries may experience local inaccuracies. Therefore, every search result is coupled with bibliographic references (such as Wikimedia Commons, Kemdikbud Cultural Heritage, and Balai Pelestarian Kebudayaan) along with transparent labeling."
                      )}
                    </p>
                    <Link
                      href="/tema/rumah-adat"
                      className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-white hover:text-[#fbc270] transition-colors border-b border-transparent hover:border-[#fbc270] pb-0.5"
                    >
                      <span className="material-symbols-outlined text-base">auto_stories</span>
                      <span>{t("Telusuri Tema Budaya", "Explore Cultural Themes")}</span>
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

      </div>
  );
}

