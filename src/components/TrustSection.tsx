"use client";

import React from "react";
import Image from "next/image";

interface Partner {
  name: string;
  category: string;
  logo: string;
  aspect: string;
  desc: string;
}

const PARTNERS: Partner[] = [
  {
    name: "Le Footing",
    category: "Média & Communauté Running",
    logo: "/images/logos/le-footing.png",
    aspect: "aspect-[1024/380]",
    desc: "Média de référence et communauté de passionnés de course à pied.",
  },
  {
    name: "My Running Club",
    category: "Club & Encadrement Athlétisme",
    logo: "/images/logos/my-running-club.png",
    aspect: "aspect-[1024/457]",
    desc: "Club d'entraînement sur route et encadrement running sur Paris.",
  },
  {
    name: "FF Sport d'Entreprise",
    category: "Fédération Française (@work)",
    logo: "/images/logos/ff-sport-entreprise.png",
    aspect: "aspect-[1024/363]",
    desc: "Développement de la pratique sportive et de la santé en entreprise.",
  },
  {
    name: "Nutripure",
    category: "Nutrition Sportive & Santé",
    logo: "/images/logos/nutripure.png",
    aspect: "aspect-square",
    desc: "Compléments alimentaires et nutrition sportive de haute pureté.",
  },
];

export default function TrustSection() {
  return (
    <section className="py-16 sm:py-24 bg-[#0a0a09] border-y border-white/10 relative overflow-hidden select-none">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-[#d4ff00]/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181816] border border-white/10 text-xs font-mono-tech uppercase tracking-widest text-[#d4ff00] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#d4ff00] animate-pulse" />
              <span>PARTENAIRES &amp; STRUCTURES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              Ils nous font confiance. <br />
              <span className="font-hand text-3xl sm:text-5xl text-[#d4ff00] font-normal lowercase">
                clubs, entreprises &amp; marques running
              </span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 font-mono-tech max-w-md leading-relaxed">
            De l&apos;encadrement en club à l&apos;intervention en entreprise, en passant par la nutrition de pointe, une collaboration fondée sur l&apos;exigence et la performance.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {PARTNERS.map((partner, idx) => (
            <div
              key={idx}
              className="bg-[#141412] border border-white/10 hover:border-[#d4ff00]/50 rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#d4ff00]/5 group"
            >
              {/* White badge frame for maximum logo clarity */}
              <div className="w-full h-24 sm:h-28 bg-white rounded-xl sm:rounded-2xl p-4 flex items-center justify-center shadow-md group-hover:shadow-lg transition-transform duration-300 group-hover:scale-[1.03] overflow-hidden">
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} - Partenaire VB Coaching Running`}
                    width={260}
                    height={110}
                    className="object-contain max-h-16 sm:max-h-20 max-w-[90%] w-auto h-auto transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Text Info */}
              <div className="pt-4 text-center sm:text-left flex-grow flex flex-col justify-end">
                <div className="text-xs sm:text-sm font-black uppercase tracking-tight text-white group-hover:text-[#d4ff00] transition-colors truncate">
                  {partner.name}
                </div>
                <div className="text-[10px] sm:text-[11px] font-mono-tech text-[#d4ff00] font-bold uppercase tracking-wider mt-0.5 truncate">
                  {partner.category}
                </div>
                <p className="text-[11px] text-neutral-400 font-mono-tech mt-2 leading-relaxed hidden sm:line-clamp-2">
                  {partner.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
