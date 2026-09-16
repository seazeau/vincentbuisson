"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { BLOG_ARTICLES } from "@/data/siteContent";

export default function Hero() {
  const [cardsExpanded, setCardsExpanded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Normalize to -1 -> +1
      targetX = (e.clientX / innerWidth) * 2 - 1;
      targetY = (e.clientY / innerHeight) * 2 - 1;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const loop = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      setMouseOffset({ x: currentX, y: currentY });
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  const blogCards = BLOG_ARTICLES.slice(0, 3);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100dvh] w-full flex flex-col justify-between overflow-x-hidden pt-16 sm:pt-20 pb-4 sm:pb-6 select-none perspective-[1200px]"
    >
      {/* 1. Ultra-HD 4K Clouds Background with 3D Mouse Parallax & Vintage Grain */}
      <div
        className="absolute inset-0 z-0 transition-transform duration-100 ease-out scale-105 pointer-events-none"
        style={{
          transform: `translate3d(${mouseOffset.x * -20}px, ${mouseOffset.y * -14}px, 0)`,
        }}
      >
        <Image
          src="/images/hero-clouds.webp"
          alt="Nuages cinématiques vintage - VB Coaching Running"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center contrast-[1.05] brightness-[0.98]"
        />
        {/* Authentic 35mm Vintage Analog Film Grain */}
        <div className="absolute inset-0 bg-vintage-grain opacity-25 mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-[#0c0c0b] pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0c0c0b] via-[#0c0c0b]/85 to-transparent pointer-events-none" />
      </div>

      {/* 2. Centerpiece Bold Typography with 3D Spatial Tilt (Scaled down to pull everything up) */}
      <div
        className="relative z-10 my-auto flex flex-col items-center justify-center text-center px-4 w-full max-w-7xl mx-auto transition-transform duration-100 ease-out"
        style={{
          transform: `perspective(1000px) rotateX(${mouseOffset.y * -5}deg) rotateY(${mouseOffset.x * 5}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Handwritten Cursive "Vincent Buisson" */}
        <p
          className="font-hand text-2xl sm:text-4xl md:text-5xl text-white font-bold -rotate-3 mb-[-6px] sm:mb-[-14px] md:mb-[-18px] tracking-wide relative z-20 drop-shadow-[0_4px_18px_rgba(0,0,0,0.85)] transition-transform duration-100"
          style={{ transform: `translateZ(40px)` }}
        >
          Vincent Buisson
        </p>

        {/* 3-Line Title in High-Voltage Volt Yellow (Scaled down) */}
        <h1
          className="font-black text-[10vw] sm:text-[9vw] md:text-[7.5vw] lg:text-[100px] xl:text-[115px] leading-[0.86] tracking-[-0.04em] uppercase text-[#d4ff00] drop-shadow-[0_10px_35px_rgba(0,0,0,0.45)] select-none"
          style={{ transformStyle: "preserve-3d" }}
        >
          <span
            className="block hover:scale-[1.01] transition-transform duration-200"
            style={{ transform: `translateZ(30px)` }}
          >
            VB
          </span>
          <span
            className="block hover:scale-[1.01] transition-transform duration-200"
            style={{ transform: `translateZ(20px)` }}
          >
            COACHING
          </span>
          <span
            className="block hover:scale-[1.01] transition-transform duration-200"
            style={{ transform: `translateZ(10px)` }}
          >
            RUNNING
          </span>
          <span className="sr-only">
            {" "}— Coach Course à Pied &amp; Spécialiste Performance sur Route (10 km, Semi-Marathon, Marathon)
          </span>
        </h1>

        {/* Main Benefit Headline (< 3 seconds) */}
        <p
          className="text-xs sm:text-lg md:text-xl font-black uppercase tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] max-w-sm sm:max-w-xl mx-auto mt-2 sm:mt-3 leading-tight"
          style={{ transform: `translateZ(25px)` }}
        >
          Battez votre record sur 10 km, Semi ou Marathon <br className="hidden sm:inline" />
          <span className="text-neutral-200">avec un suivi sur-mesure &amp; durable.</span>
        </p>

        {/* 1-Line Supportive Subtitle */}
        <p
          className="text-[10px] sm:text-xs text-neutral-300 max-w-lg mx-auto mt-1 sm:mt-1.5 font-mono-tech leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
          style={{ transform: `translateZ(20px)` }}
        >
          Un accompagnement 100% individualisé sur Nolio, ajusté chaque semaine selon vos sensations et vos contraintes de vie.
        </p>

        {/* Social Proof directly above CTA button (High Conversion Rule) */}
        <div
          className="mt-2.5 sm:mt-3 flex items-center justify-center gap-2 text-[10px] sm:text-[11px] font-mono-tech uppercase tracking-wider text-white bg-black/60 px-3.5 py-1.5 rounded-full border border-white/15 backdrop-blur-md shadow-lg"
          style={{ transform: `translateZ(30px)` }}
        >
          <span className="text-amber-400 font-bold">★★★★★</span>
          <span className="font-bold text-white">5/5</span>
          <span className="text-neutral-500">•</span>
          <span className="text-neutral-300">+100 athlètes</span>
          <span className="text-neutral-500 hidden sm:inline">•</span>
          <span className="text-white font-bold hidden sm:inline">Léo M. : 1h41 ➔ 1h30 au semi</span>
        </div>

        {/* Action Buttons: 1 Main CTA + 1 Row of Section Buttons */}
        <div
          className="mt-2.5 sm:mt-3 flex flex-col items-center gap-2.5 w-full max-w-md mx-auto pointer-events-auto"
          style={{ transform: `translateZ(30px)` }}
        >
          {/* Main CTA: 1st person */}
          <a
            href="#tarifs"
            className="bg-white hover:bg-neutral-200 text-black px-8 py-3.5 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2 group"
          >
            <span>Je découvre les formules</span>
            <ArrowRight className="w-4 h-4 stroke-[2] group-hover:translate-x-0.5 transition-transform" />
          </a>

          {/* Micro-reassurance tags right under the CTA */}
          <span className="text-[10px] sm:text-[11px] font-mono-tech text-neutral-400 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] text-center">
            ✓ Sans engagement · ✓ Suivi direct par Vincent · ✓ Réponse sous 24h
          </span>

          {/* Section Navigation Buttons: Qui sommes-nous ? • Notre méthode • Témoignages */}
          <div className="flex items-center justify-center gap-2 flex-wrap pt-1">
            <a
              href="#qui-sommes-nous"
              className="bg-white/5 hover:bg-white text-neutral-300 hover:text-black px-4 py-2 rounded-full border border-white/15 hover:border-white text-[11px] sm:text-xs font-mono-tech uppercase font-bold tracking-wider backdrop-blur-md shadow-md hover:scale-105 transition-all"
            >
              Qui est le coach ?
            </a>
            <a
              href="#benefices"
              className="bg-white/5 hover:bg-white text-neutral-300 hover:text-black px-4 py-2 rounded-full border border-white/15 hover:border-white text-[11px] sm:text-xs font-mono-tech uppercase font-bold tracking-wider backdrop-blur-md shadow-md hover:scale-105 transition-all"
            >
              Ce que vous y gagnez
            </a>
            <a
              href="#temoignages"
              className="bg-white/5 hover:bg-white text-neutral-300 hover:text-black px-4 py-2 rounded-full border border-white/15 hover:border-white text-[11px] sm:text-xs font-mono-tech uppercase font-bold tracking-wider backdrop-blur-md shadow-md hover:scale-105 transition-all"
            >
              Témoignages
            </a>
          </div>
        </div>
      </div>

      {/* 3. Bottom Row: Blog Highlight */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-8 flex flex-col sm:flex-row items-end justify-end pointer-events-none">
        
        {/* Mobile & Tablet (< lg): Clean Single Article Teaser Card (no 3D overlap, fits viewport cleanly) */}
        <div className="lg:hidden w-full pointer-events-auto mt-3">
          <Link
            href={blogCards[0].href}
            className="w-full max-w-md mx-auto bg-[#fbfaf6] text-black rounded-2xl p-2.5 shadow-2xl border border-black/10 flex items-center gap-3 active:scale-[0.98] transition-all"
          >
            <div className="relative w-16 h-12 rounded-xl overflow-hidden shrink-0 bg-neutral-200">
              <Image
                src={blogCards[0].image}
                alt={blogCards[0].title}
                fill
                className="object-cover object-[center_35%]"
              />
            </div>
            <div className="min-w-0 flex-1">
              <span className="inline-block text-[8px] font-mono-tech font-bold uppercase tracking-wider bg-black text-white px-2 py-0.5 rounded">
                DERNIER ARTICLE • BLOG
              </span>
              <h4 className="text-xs font-black uppercase text-black truncate mt-0.5 leading-tight">
                {blogCards[0].title}
              </h4>
              <p className="text-[10px] font-mono-tech text-neutral-600 mt-0.5">
                {blogCards[0].date} • {blogCards[0].readTime}
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-black shrink-0 mr-1" />
          </Link>
        </div>

        {/* Large Desktop (>= lg): Interactive 3D Stacked Card Deck fanning horizontally */}
        <div
          className="hidden lg:flex relative pointer-events-auto flex-col items-end group"
          onMouseEnter={() => setCardsExpanded(true)}
          onMouseLeave={() => setCardsExpanded(false)}
          onClick={() => setCardsExpanded(!cardsExpanded)}
        >
          {/* Deck Container with 3D Perspective */}
          <div className="relative w-[380px] h-28 cursor-pointer perspective-[1000px]">
            {blogCards.map((card, idx) => {
              const total = blogCards.length;
              // Horizontal fan spread instead of shooting upwards
              const translateX = cardsExpanded ? (idx === 0 ? 0 : idx === 1 ? -32 : 32) : 0;
              const translateY = cardsExpanded ? (idx === 0 ? 0 : idx === 1 ? 4 : 8) : -idx * 5;
              const rotateZ = cardsExpanded ? (idx === 0 ? 0 : idx === 1 ? -4 : 4) : (idx === 0 ? 0 : idx === 1 ? -2 : 2);
              const translateZ = cardsExpanded ? (total - idx) * 20 : (total - idx) * 4;
              const scale = cardsExpanded ? 1 : 1 - idx * 0.03;
              const zIndex = (total - idx) + 10;

              return (
                <Link
                  key={card.id}
                  href={card.href}
                  className="absolute bottom-0 left-0 right-0 bg-[#fbfaf6] text-black rounded-2xl p-3 shadow-[0_15px_35px_rgba(0,0,0,0.25)] border border-black/10 transition-all duration-500 ease-out flex items-center gap-3.5 hover:shadow-[0_20px_45px_rgba(0,0,0,0.35)] hover:border-black/30 cursor-pointer"
                  style={{
                    transform: `translate3d(${translateX}px, ${translateY}px, ${translateZ}px) rotateZ(${rotateZ}deg) scale(${scale})`,
                    zIndex: zIndex,
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Article Thumbnail */}
                  <div className="relative w-24 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-neutral-200 shadow-inner">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover object-[center_35%] group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span
                        className={`inline-block text-[9px] font-mono-tech font-bold uppercase tracking-widest ${
                          idx === 0
                            ? "text-white bg-black px-2 py-0.5 rounded font-bold tracking-wider shadow-sm"
                            : "text-neutral-500 font-bold"
                        }`}
                      >
                        {idx === 0 ? "DERNIER ARTICLE • BLOG" : card.tag}
                      </span>
                    </div>
                    <h4 className="text-xs font-black uppercase text-black truncate mt-0.5 leading-tight group-hover:text-neutral-600 transition-colors">
                      {card.title}
                    </h4>
                    <p className="text-[10px] font-medium text-neutral-600 truncate mt-1 font-mono-tech">
                      {card.date} • {card.readTime} de lecture
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Underneath Deck: Blog Action Button */}
          <Link
            href="/#insights"
            className="mt-2 bg-white hover:bg-neutral-200 text-black px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xl hover:scale-105 transition-all"
          >
            <span>LIRE LES ARTICLES DU BLOG</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
          </Link>
        </div>

      </div>
    </section>
  );
}
