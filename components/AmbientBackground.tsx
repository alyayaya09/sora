"use client";

import React, { useEffect } from "react";

export default function AmbientBackground() {
  useEffect(() => {
    const bg = document.getElementById("dynamicBgWrapper");
    if (!bg) return;
    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0,
      ticking = false;
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
      if (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) {
        requestAnimationFrame(tick);
      } else {
        ticking = false;
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

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
        .animate-orb-1{animation:floatOrb1 7.5s ease-in-out infinite}
        .animate-orb-2{animation:floatOrb2 8.5s ease-in-out infinite}
        .animate-orb-3{animation:floatOrb3 6.8s ease-in-out infinite}
        .animate-orb-4{animation:floatOrb4 9s ease-in-out infinite}
        .animate-orb-5{animation:floatOrb5 8s ease-in-out infinite}
        .animate-ember-1{animation:floatEmber1 9s ease-in-out infinite}
        .animate-ember-2{animation:floatEmber2 8s ease-in-out infinite 2s}
      `}</style>

      <div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden scale-110"
        id="dynamicBgWrapper"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-[#140e13] via-[#0d0d0f] to-[#1c1410] opacity-90" />
        <div className="absolute -top-[10%] -left-[10%] w-[68vw] h-[68vw] max-w-[980px] max-h-[980px] rounded-full bg-gradient-to-br from-[#9f1239]/60 via-[#6b1d2f]/50 to-transparent blur-[105px] animate-orb-1 will-change-transform" />
        <div className="absolute top-[12%] -right-[10%] w-[64vw] h-[64vw] max-w-[920px] max-h-[920px] rounded-full bg-gradient-to-bl from-[#f59e0b]/55 via-[#d4af37]/45 to-transparent blur-[115px] animate-orb-2 will-change-transform" />
        <div className="absolute top-[38%] -left-[8%] w-[58vw] h-[58vw] max-w-[850px] max-h-[850px] rounded-full bg-gradient-to-r from-[#6b1d2f]/55 via-[#881337]/45 to-transparent blur-[100px] animate-orb-3 will-change-transform" />
        <div className="absolute -bottom-[12%] right-[5%] w-[62vw] h-[62vw] max-w-[900px] max-h-[900px] rounded-full bg-gradient-to-tl from-[#af8d11]/55 via-[#d4af37]/45 to-transparent blur-[110px] animate-orb-4 will-change-transform" />
        <div className="absolute top-[52%] left-[28%] w-[48vw] h-[48vw] max-w-[720px] max-h-[720px] rounded-full bg-gradient-to-tr from-[#d4af37]/35 via-[#9f1239]/40 to-transparent blur-[100px] animate-orb-5 will-change-transform" />
        <div className="absolute top-[25%] left-[20%] w-2.5 h-2.5 rounded-full bg-[#fde047] blur-[1px] shadow-[0_0_12px_#fde047] animate-ember-1" />
        <div className="absolute top-[60%] right-[25%] w-3 h-3 rounded-full bg-[#f59e0b] blur-[1px] shadow-[0_0_15px_#f59e0b] animate-ember-2" />
        <div
          className="absolute top-[75%] left-[40%] w-2 h-2 rounded-full bg-[#ffb2bc] blur-[1px] shadow-[0_0_10px_#ffb2bc] animate-ember-1"
          style={{ animationDelay: "4s" }}
        />
        <div
          className="absolute top-[40%] right-[38%] w-2.5 h-2.5 rounded-full bg-[#e9c176] blur-[1px] shadow-[0_0_12px_#e9c176] animate-ember-2"
          style={{ animationDelay: "5s" }}
        />
      </div>
    </>
  );
}
