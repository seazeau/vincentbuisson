"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, Activity } from "lucide-react";
import VBLogo from "@/components/VBLogo";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };

    if (mobileMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Accueil", href: "/" },
    { label: "Les Formules", href: "/#tarifs" },
    { label: "Prépa 10 km", href: "/coaching-10km/" },
    { label: "Prépa Semi-Marathon", href: "/coaching-semi-marathon/" },
    { label: "Prépa Marathon", href: "/coaching-marathon/" },
    { label: "Méthode & Nolio", href: "/methode/" },
    { label: "Calculateur d'Allures", href: "/calculateur-allures/" },
    { label: "Blog & Guides", href: "/blog/" },
    { label: "À Propos", href: "/a-propos/" },
    { label: "Contact", href: "/contact/" },
  ];

  return (
    <>
      {/* Floating Header */}
      <header className="fixed top-4 sm:top-5 left-0 right-0 z-50 px-4 sm:px-8 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          
          {/* Left Island: White Brand Badge */}
          <Link
            href="/"
            className="pointer-events-auto bg-white text-black pl-2 sm:pl-2.5 pr-3.5 sm:pr-4 py-1.5 sm:py-2 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group hover:scale-[1.02]"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#0c0c0b] flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <VBLogo size={18} variant="dark" />
            </div>
            <span className="font-black text-xs sm:text-sm tracking-tight uppercase whitespace-nowrap">
              <span className="sm:hidden">VB COACHING</span>
              <span className="hidden sm:inline">VB COACHING RUNNING</span>
            </span>
            <span className="text-[10px] font-black text-[#555]">™</span>
          </Link>

          {/* Right Group: Menu (mobile & desktop) + Postuler (tablet & desktop) */}
          <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
            {/* Center Island: Floating Dark Pill with Menu & Status */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="bg-[#1a1a18]/90 hover:bg-black text-white px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-full shadow-xl backdrop-blur-md transition-all flex items-center gap-2 sm:gap-3 border border-white/10 hover:border-white/20 group hover:scale-[1.02]"
              aria-label="Ouvrir le menu"
            >
              <span className="font-black text-xs tracking-wider uppercase text-white">
                MENU
              </span>
              <span className="hidden md:inline text-[#666] text-xs">|</span>
              <span className="hidden md:inline text-xs text-[#d0d0c8] font-normal tracking-wide">
                places coaching disponibles T2/T3
              </span>
              <Menu className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-white group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Right Island: Full Pill Button with Circular Arrow (Desktop/Tablet only) */}
            <Link
              href="/contact/"
              className="hidden sm:flex bg-white text-black pl-4 sm:pl-5 pr-1.5 py-1.5 rounded-full shadow-lg hover:shadow-xl transition-all items-center gap-2 sm:gap-3 group hover:scale-[1.02] hover:bg-neutral-200"
            >
              <span className="font-black text-[11px] sm:text-xs tracking-wider uppercase whitespace-nowrap">
                POSTULER AU COACHING
              </span>
              <span className="w-7 h-7 rounded-full bg-[#1a1a18] group-hover:bg-black text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>

        </div>
      </header>

      {/* Fullscreen Immersive Drawer / Modal Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#121210]/95 backdrop-blur-xl flex flex-col justify-between p-6 sm:p-12 animate-in fade-in duration-200 overflow-y-auto">
          <div className="flex items-center justify-between border-b border-white/10 pb-6 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white text-black font-black flex items-center justify-center text-sm">
                VB
              </div>
              <span className="font-black text-white text-sm sm:text-base uppercase tracking-tight">
                VINCENT BUISSON COACHING ™
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Fermer le menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="max-w-4xl mx-auto w-full py-8">
            <p className="text-[11px] font-mono-tech uppercase tracking-widest text-neutral-400 mb-4">
              Navigation
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {navLinks.map((link, idx) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="group flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono-tech text-xs text-neutral-500">0{idx + 1}</span>
                    <span className="text-2xl sm:text-3xl font-black uppercase text-white group-hover:text-neutral-300 transition-colors">
                      {link.label}
                    </span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom Bar in Menu */}
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Expertise Scientifique • Sub-35&apos; 10 km • Sub-3h Marathon</span>
            </div>
            <p className="font-mono-tech text-[11px]">Plateforme Nolio officielle</p>
          </div>
        </div>
      )}
    </>
  );
}

