"use client";

import React, { useEffect } from "react";

export default function AmbientBackground() {
  useEffect(() => {
    const bgWrapper = document.getElementById("dynamicBgWrapper");
    if (!bgWrapper) return;

    let targetX = 0,
      targetY = 0;
    let currentX = 0,
      currentY = 0;
    let ticking = false;

    const onMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      targetX = ((e.clientX - centerX) / centerX) * 35;
      targetY = ((e.clientY - centerY) / centerY) * 28;

      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    function updateParallax() {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      if (bgWrapper) {
        bgWrapper.style.transform = `scale(1.1) translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
      }

      if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
        requestAnimationFrame(updateParallax);
      } else {
        ticking = false;
      }
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      {/* Solid base layer #0d0d0f matching JELAJAHI.MD body bg */}
      <div className="fixed inset-0 bg-[#0d0d0f] -z-20 pointer-events-none" />

      {/* DYNAMIC ORGANIC ANIMATED BACKGROUND (HIGHLY VISIBLE, VIBRANT SORA HERITAGE PALETTE) */}
      <div
        className="fixed inset-0 pointer-events-none -z-10 overflow-hidden transition-transform duration-700 ease-out will-change-transform scale-110"
        id="dynamicBgWrapper"
      >
        {/* Ambient Base Fluid Aurora Canvas Glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#140e13] via-[#0d0d0f] to-[#1c1410] animate-ambient-mesh opacity-90" />
        {/* Orb 1: Deep Crimson Heritage Radiance (#881337 / #6b1d2f) Top-Left to Center-Right */}
        <div className="absolute -top-[10%] -left-[10%] w-[68vw] h-[68vw] max-w-[980px] max-h-[980px] rounded-full bg-gradient-to-br from-[#9f1239]/60 via-[#6b1d2f]/50 to-transparent blur-[105px] animate-orb-1 will-change-transform" />
        {/* Orb 2: Warm Amber & Luminous Gold (#f59e0b / #d4af37) Top-Right to Center-Left */}
        <div className="absolute top-[12%] -right-[10%] w-[64vw] h-[64vw] max-w-[920px] max-h-[920px] rounded-full bg-gradient-to-bl from-[#f59e0b]/55 via-[#d4af37]/45 to-transparent blur-[115px] animate-orb-2 will-change-transform" />
        {/* Orb 3: Royal Crimson & Ruby Glow Center-Left to Bottom-Center */}
        <div className="absolute top-[38%] -left-[8%] w-[58vw] h-[58vw] max-w-[850px] max-h-[850px] rounded-full bg-gradient-to-r from-[#6b1d2f]/55 via-[#881337]/45 to-transparent blur-[100px] animate-orb-3 will-change-transform" />
        {/* Orb 4: Rich Sunlit Honey Amber (#af8d11 / #b45309) Bottom-Right to Center-Up */}
        <div className="absolute -bottom-[12%] right-[5%] w-[62vw] h-[62vw] max-w-[900px] max-h-[900px] rounded-full bg-gradient-to-tl from-[#af8d11]/55 via-[#d4af37]/45 to-transparent blur-[110px] animate-orb-4 will-change-transform" />
        {/* Orb 5: Center Dynamic Accent Sunset Glow across main cards */}
        <div className="absolute top-[52%] left-[28%] w-[48vw] h-[48vw] max-w-[720px] max-h-[720px] rounded-full bg-gradient-to-tr from-[#d4af37]/35 via-[#9f1239]/40 to-transparent blur-[100px] animate-orb-5 will-change-transform" />
        {/* Floating Shimmering Amber Embers */}
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
