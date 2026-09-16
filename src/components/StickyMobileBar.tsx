"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function StickyMobileBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past 300px (past top hero fold)
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTarifs = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("tarifs");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#tarifs";
    }
  };

  return (
    <div
      className={`fixed bottom-4 left-3 right-3 z-40 md:hidden transition-all duration-300 pointer-events-auto ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8 pointer-events-none"
      }`}
    >
      <div className="bg-[#121210]/95 backdrop-blur-xl border border-white/15 p-2 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.7)] flex items-center justify-between gap-2">
        {/* Button 1: Quick Jump to Pricing / Formules */}
        <a
          href="#tarifs"
          onClick={scrollToTarifs}
          className="flex-1 bg-white/10 hover:bg-white/15 active:scale-95 text-white py-2.5 px-3 rounded-xl text-center text-[11px] font-mono-tech uppercase font-bold tracking-wider flex items-center justify-center gap-1.5 border border-white/10 transition-all"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Voir les formules</span>
        </a>

        {/* Button 2: Postuler au coaching */}
        <Link
          href="/contact/"
          className="flex-1 bg-white hover:bg-neutral-200 active:scale-95 text-black py-2.5 px-3 rounded-xl text-center text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg transition-all"
        >
          <span>Postuler</span>
          <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
        </Link>
      </div>
    </div>
  );
}
