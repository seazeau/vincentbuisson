"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BLOG_ARTICLES } from "@/data/siteContent";

export default function Hero() {
  const latestArticle = BLOG_ARTICLES[0];

  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col justify-between overflow-hidden pt-16 sm:pt-20 pb-4 sm:pb-6 select-none">
      {/* 1. Vincent Buisson Running Background with Cinematic Lighting (Static, 0 GPU lag) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/hero-vincent.webp"
          alt="Vincent Buisson en course à pied - Coach Running"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_28%] contrast-[1.05] brightness-[0.82]"
        />
        <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-[#0c0c0b] pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#0c0c0b] via-[#0c0c0b]/90 to-transparent pointer-events-none" />
      </div>

      {/* 2. Centerpiece Bold Typography (Static, Sharp, 0 Lag) */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center px-4 w-full max-w-7xl mx-auto">
        {/* Handwritten Cursive "Vincent Buisson" */}
        <p className="font-hand text-2xl sm:text-4xl md:text-5xl text-white font-bold -rotate-3 mb-[-6px] sm:mb-[-14px] md:mb-[-18px] tracking-wide relative z-20 drop-shadow-[0_4px_18px_rgba(0,0,0,0.85)]">
          Vincent Buisson
        </p>

        {/* 3-Line Title in High-Voltage Volt Yellow */}
        <h1 className="font-black text-[10vw] sm:text-[9vw] md:text-[7.5vw] lg:text-[100px] xl:text-[115px] leading-[0.86] tracking-[-0.04em] uppercase text-[#d4ff00] drop-shadow-[0_10px_35px_rgba(0,0,0,0.45)] select-none">
          <span className="block">VB</span>
          <span className="block">COACHING</span>
          <span className="block">RUNNING</span>
          <span className="sr-only">
            {" "}— Coach Course à Pied &amp; Spécialiste Performance sur Route (10 km, Semi-Marathon, Marathon)
          </span>
        </h1>

        {/* Main Benefit Headline (< 3 seconds) */}
        <p className="text-xs sm:text-lg md:text-xl font-black uppercase tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] max-w-sm sm:max-w-xl mx-auto mt-2 sm:mt-3 leading-tight">
          Battez votre record sur 10 km, Semi ou Marathon <br className="hidden sm:inline" />
          <span className="text-neutral-200">avec un suivi sur-mesure &amp; durable.</span>
        </p>

        {/* 1-Line Supportive Subtitle */}
        <p className="text-[10px] sm:text-xs text-neutral-300 max-w-lg mx-auto mt-1 sm:mt-1.5 font-mono-tech leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          Un accompagnement 100% individualisé sur Nolio, ajusté chaque semaine selon vos sensations et vos contraintes de vie.
        </p>

        {/* Social Proof directly above CTA button */}
        <div className="mt-2.5 sm:mt-3 flex items-center justify-center gap-2 text-[10px] sm:text-[11px] font-mono-tech uppercase tracking-wider text-white bg-black/60 px-3.5 py-1.5 rounded-full border border-white/15 backdrop-blur-md shadow-lg">
          <span className="text-amber-400 font-bold">★★★★★</span>
          <span className="font-bold text-white">5/5</span>
          <span className="text-neutral-500">•</span>
          <span className="text-neutral-300">+100 athlètes</span>
          <span className="text-neutral-500 hidden sm:inline">•</span>
          <span className="text-white font-bold hidden sm:inline">Léo M. : 1h41 ➔ 1h30 au semi</span>
        </div>

        {/* Action Buttons: 1 Main CTA + 1 Row of Section Buttons */}
        <div className="mt-2.5 sm:mt-3 flex flex-col items-center gap-2.5 w-full max-w-md mx-auto pointer-events-auto">
          {/* Main CTA */}
          <a
            href="#tarifs"
            className="bg-white hover:bg-neutral-200 text-black px-8 py-3.5 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider shadow-2xl transition-all flex items-center justify-center gap-2 group hover:scale-105"
          >
            <span>Je découvre les formules</span>
            <ArrowRight className="w-4 h-4 stroke-[2] group-hover:translate-x-0.5 transition-transform" />
          </a>

          {/* Micro-reassurance tags right under the CTA */}
          <span className="text-[10px] sm:text-[11px] font-mono-tech text-neutral-400 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] text-center">
            ✓ Sans engagement · ✓ Suivi direct par Vincent · ✓ Réponse sous 24h
          </span>

          {/* Section Navigation Buttons */}
          <div className="flex items-center justify-center gap-2 flex-wrap pt-1">
            <a
              href="#qui-sommes-nous"
              className="bg-white/5 hover:bg-white text-neutral-300 hover:text-black px-4 py-2 rounded-full border border-white/15 hover:border-white text-[11px] sm:text-xs font-mono-tech uppercase font-bold tracking-wider backdrop-blur-md shadow-md transition-all"
            >
              Qui est le coach ?
            </a>
            <a
              href="#benefices"
              className="bg-white/5 hover:bg-white text-neutral-300 hover:text-black px-4 py-2 rounded-full border border-white/15 hover:border-white text-[11px] sm:text-xs font-mono-tech uppercase font-bold tracking-wider backdrop-blur-md shadow-md transition-all"
            >
              Ce que vous y gagnez
            </a>
            <a
              href="#temoignages"
              className="bg-white/5 hover:bg-white text-neutral-300 hover:text-black px-4 py-2 rounded-full border border-white/15 hover:border-white text-[11px] sm:text-xs font-mono-tech uppercase font-bold tracking-wider backdrop-blur-md shadow-md transition-all"
            >
              Témoignages
            </a>
          </div>
        </div>
      </div>

      {/* 3. Bottom Row: Blog Highlight */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-8 flex flex-col sm:flex-row items-end justify-end pointer-events-none">
        <div className="w-full sm:w-auto pointer-events-auto mt-3 flex flex-col sm:flex-row items-center gap-2.5">
          <Link
            href={latestArticle.href}
            className="w-full sm:w-[360px] bg-[#fbfaf6] hover:bg-white text-black rounded-2xl p-2.5 shadow-2xl border border-black/10 flex items-center gap-3 active:scale-[0.98] transition-all"
          >
            <div className="relative w-16 h-12 rounded-xl overflow-hidden shrink-0 bg-neutral-200">
              <Image
                src={latestArticle.image}
                alt={latestArticle.title}
                fill
                className="object-cover object-[center_35%]"
              />
            </div>
            <div className="min-w-0 flex-1">
              <span className="inline-block text-[8px] font-mono-tech font-bold uppercase tracking-wider bg-black text-white px-2 py-0.5 rounded">
                DERNIER ARTICLE • BLOG
              </span>
              <h4 className="text-xs font-black uppercase text-black truncate mt-0.5 leading-tight">
                {latestArticle.title}
              </h4>
              <p className="text-[10px] font-mono-tech text-neutral-600 mt-0.5">
                {latestArticle.date} • {latestArticle.readTime}
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-black shrink-0 mr-1" />
          </Link>

          <Link
            href="/blog/"
            className="bg-white/90 hover:bg-white text-black px-4 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md active:scale-95 transition-all whitespace-nowrap"
          >
            <span>TOUS LES ARTICLES</span>
            <ArrowRight className="w-3 h-3 stroke-[2]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
