"use client";

import React from "react";
import Image from "next/image";

interface Partner {
  name: string;
  category: string;
  logo: string;
  desc: string;
}

const PARTNERS: Partner[] = [
  {
    name: "Le Footing",
    category: "Running en Entreprise",
    logo: "/images/logos/le-footing.png",
    desc: "La solution running pensée pour les entreprises",
  },
  {
    name: "My Running Club",
    category: "Club & Encadrement Athlétisme",
    logo: "/images/logos/my-running-club.png",
    desc: "Club d'entraînement sur route & encadrement running Paris",
  },
  {
    name: "FF Sport d'Entreprise",
    category: "Fédération Française (@work)",
    logo: "/images/logos/ff-sport-entreprise.png",
    desc: "Pratique sportive et santé du collaborateur en entreprise",
  },
  {
    name: "Nutripure",
    category: "Nutrition Sportive & Santé",
    logo: "/images/logos/nutripure.png",
    desc: "Compléments alimentaires & nutrition sportive de haute pureté",
  },
];

interface TrustSectionProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

export default function TrustSection({
  className = "",
  title = "Partenaires & Structures",
  subtitle = "ILS NOUS FONT CONFIANCE",
}: TrustSectionProps) {
  return (
    <div className={`w-full select-none ${className}`}>
      {/* Header compact & élégant */}
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181816] border border-white/10 text-[10px] sm:text-xs font-mono-tech uppercase tracking-widest text-[#d4ff00] mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d4ff00] animate-pulse" />
          <span>{subtitle}</span>
        </div>
        <h3 className="text-lg sm:text-2xl font-black uppercase text-white tracking-tight">
          {title}
        </h3>
      </div>

      {/* 4 Petites Cartes Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
        {PARTNERS.map((partner, idx) => (
          <div
            key={idx}
            className="bg-[#141412] border border-white/10 hover:border-[#d4ff00]/40 rounded-2xl p-3 sm:p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#d4ff00]/5 group"
          >
            {/* White badge frame for maximum logo clarity */}
            <div className="w-full h-14 sm:h-16 bg-white rounded-xl p-2 sm:p-2.5 flex items-center justify-center shadow-sm group-hover:shadow transition-transform duration-300 overflow-hidden">
              <Image
                src={partner.logo}
                alt={`${partner.name} - Partenaire VB Coaching Running`}
                width={200}
                height={70}
                className="object-contain max-h-8 sm:max-h-10 max-w-[85%] w-auto h-auto transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Text Info */}
            <div className="pt-3 text-center flex-grow flex flex-col justify-between">
              <div>
                <div className="text-xs sm:text-sm font-black uppercase tracking-tight text-white group-hover:text-[#d4ff00] transition-colors truncate">
                  {partner.name}
                </div>
                <div className="text-[10px] font-mono-tech text-[#d4ff00] font-semibold uppercase tracking-wider mt-0.5 truncate">
                  {partner.category}
                </div>
              </div>
              <p className="text-[11px] text-neutral-400 font-mono-tech mt-1.5 leading-snug">
                {partner.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
