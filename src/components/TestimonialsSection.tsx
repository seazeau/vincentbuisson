"use client";

import React, { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight, Trophy } from "lucide-react";

interface MiniTestimonialCard {
  name: string;
  profession: string;
  distance: string;
  achievement: string;
  quote: string;
  date: string;
  avatarInitial: string;
}

const ATHLETE_TESTIMONIALS: MiniTestimonialCard[] = [
  {
    name: "Léo M.",
    profession: "Semi-Marathon",
    distance: "SEMI",
    achievement: "1h41 ➔ 1h30",
    quote:
      "Séances très bien structurées et adaptées à mes objectifs. Suivi direct au top, je recommande à 100% !",
    date: "13 janv. 2026",
    avatarInitial: "L",
  },
  {
    name: "Antoine B.",
    profession: "Objectif Marathon",
    distance: "MARATHON",
    achievement: "Allures en hausse",
    quote:
      "En deux mois, les allures décollent et le volume passe tout seul. Chaque séance a du sens avec Vincent.",
    date: "13 sept. 2026",
    avatarInitial: "A",
  },
  {
    name: "Patrizia Z.",
    profession: "Athlète accompagnée",
    distance: "REPRISE",
    achievement: "Jambes retrouvées",
    quote:
      "Coach très à l'écoute. Grâce à ses conseils et sa patience, j'ai retrouvé mes sensations et mes jambes très vite.",
    date: "13 sept. 2026",
    avatarInitial: "P",
  },
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef(0);

  // Auto-rotate every 5.5s when not hovered
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % ATHLETE_TESTIMONIALS.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isHovered]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + ATHLETE_TESTIMONIALS.length) % ATHLETE_TESTIMONIALS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % ATHLETE_TESTIMONIALS.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 45) handleNext();
    else if (diff < -45) handlePrev();
  };

  return (
    <section
      id="temoignages"
      className="py-14 sm:py-20 bg-[#0c0c0b] text-white relative overflow-hidden select-none border-b border-white/5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[300px] bg-white/[0.02] blur-3xl rounded-full pointer-events-none" />

      {/* Header Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center mb-8 sm:mb-10 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono-tech uppercase tracking-widest text-neutral-300 mb-3 backdrop-blur-sm">
          <Trophy className="w-3 h-3 text-neutral-300" />
          <span>TÉMOIGNAGES ATHLÈTES • SCÈNE 3D</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight mb-2">
          ILS ONT FAIT <span className="text-neutral-400">TREMBLER LE CHRONO</span>
        </h2>

        <p className="text-xs sm:text-sm font-mono-tech text-neutral-400 max-w-lg mx-auto leading-relaxed">
          Explorez les retours d&apos;expérience de Léo, Antoine et Patrizia
        </p>

        {/* Proof Badges */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#141412] border border-white/10 text-[11px] font-mono-tech text-neutral-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <strong className="text-white">+100</strong> accompagnés
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#141412] border border-white/10 text-[11px] font-mono-tech text-neutral-300">
            <span className="text-amber-400 font-bold">★★★★★</span>
            <strong className="text-white">5/5</strong>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#141412] border border-white/10 text-[11px] font-mono-tech text-neutral-300">
            <strong className="text-white">Léo M.</strong> : 1h41 ➔ 1h30
          </span>
        </div>
      </div>

      {/* 3D Arc Stage Viewport */}
      <div className="w-full h-[290px] sm:h-[320px] flex items-center justify-center [perspective:1200px] relative z-10 px-4">
        <div className="relative w-[280px] sm:w-[320px] h-[210px] sm:h-[225px] [transform-style:preserve-3d] flex items-center justify-center">
          {ATHLETE_TESTIMONIALS.map((t, idx) => {
            const diff = (idx - activeIndex + ATHLETE_TESTIMONIALS.length) % ATHLETE_TESTIMONIALS.length;
            const isCenter = diff === 0;
            const isRight = diff === 1;
            const isLeft = diff === 2;

            let transformClass = "translate3d(0, 0, 40px) rotateY(0deg) scale(1)";
            let opacity = 1;
            let zIndex = 30;

            if (isRight) {
              transformClass = "translate3d(min(270px, 32vw), 0, -50px) rotateY(-22deg) scale(0.9)";
              opacity = 0.6;
              zIndex = 10;
            } else if (isLeft) {
              transformClass = "translate3d(max(-270px, -32vw), 0, -50px) rotateY(22deg) scale(0.9)";
              opacity = 0.6;
              zIndex = 10;
            }

            return (
              <div
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`absolute inset-0 bg-white text-black rounded-2xl p-4 sm:p-5 shadow-[0_20px_40px_rgba(0,0,0,0.6)] flex flex-col justify-between [transform-style:preserve-3d] border border-black/10 transition-all duration-500 ease-out select-none ${
                  isCenter ? "cursor-default" : "cursor-pointer hover:opacity-80"
                }`}
                style={{
                  transform: transformClass,
                  opacity: opacity,
                  zIndex: zIndex,
                }}
              >
                {/* Top Row: Stars + Date + Tag */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <div className="flex space-x-0.5 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-[9px] font-mono-tech text-neutral-400">
                        • {t.date}
                      </span>
                    </div>

                    <span className="text-[9px] font-mono-tech font-bold uppercase tracking-wider bg-black text-white px-2 py-0.5 rounded-full">
                      {t.distance}
                    </span>
                  </div>

                  {/* Concise Quote */}
                  <p className="text-[11px] sm:text-xs text-neutral-800 leading-snug font-normal line-clamp-3">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                {/* Bottom Row: Athlete Initials (No photo) + Name + Achievement */}
                <div className="pt-2.5 border-t border-black/10 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center font-mono-tech font-black text-xs shrink-0 shadow-sm">
                      {t.avatarInitial}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-black uppercase text-black leading-none truncate">
                        {t.name}
                      </h4>
                      <p className="text-[9px] text-neutral-500 font-mono-tech leading-tight truncate mt-0.5">
                        {t.profession}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] sm:text-[11px] font-black text-black font-mono-tech block">
                      {t.achievement}
                    </span>
                    <span className="text-[8px] uppercase tracking-wider text-neutral-400 font-mono-tech block">
                      Progression
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls: Arrows + Dots */}
      <div className="max-w-5xl mx-auto px-4 mt-5 flex flex-col items-center gap-3 relative z-10">
        <div className="flex items-center justify-center gap-5">
          <button
            onClick={handlePrev}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white text-white hover:text-black border border-white/15 flex items-center justify-center transition-all duration-200 shadow-lg hover:scale-110 cursor-pointer backdrop-blur-md"
            aria-label="Avis précédent"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2]" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {ATHLETE_TESTIMONIALS.map((t, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "w-6 bg-white" : "w-2 bg-white/25 hover:bg-white/50"
                }`}
                aria-label={`Voir l'avis de ${t.name}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white text-white hover:text-black border border-white/15 flex items-center justify-center transition-all duration-200 shadow-lg hover:scale-110 cursor-pointer backdrop-blur-md"
            aria-label="Avis suivant"
          >
            <ChevronRight className="w-4 h-4 stroke-[2]" />
          </button>
        </div>

        <span className="text-[10px] font-mono-tech uppercase tracking-widest text-neutral-500">
          Cliquez sur une carte ou naviguez avec les flèches
        </span>
      </div>
    </section>
  );
}
