"use client";

import React from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

interface Partner {
  name: string;
  category: string;
  logo: string;
  desc: string;
  url?: string;
  promoBadge?: string;
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
    category: "Plateforme de Coaching",
    logo: "/images/logos/my-running-club.png",
    desc: "Plateforme de coaching running & accompagnement",
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
    desc: "10% offerts avec le code RUNPASSION sur votre commande",
    url: "https://www.nutripure.fr/fr/?s=RUNPASSION",
    promoBadge: "-10% CODE : RUNPASSION",
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
        {PARTNERS.map((partner, idx) => {
          const CardInner = (
            <>
              {/* White badge frame for maximum logo clarity */}
              <div className="w-full h-14 sm:h-16 bg-white rounded-xl p-2 sm:p-2.5 flex items-center justify-center shadow-sm group-hover:shadow transition-transform duration-300 overflow-hidden relative">
                <Image
                  src={partner.logo}
                  alt={`${partner.name} - Partenaire VB Coaching Running`}
                  width={200}
                  height={70}
                  className="object-contain max-h-8 sm:max-h-10 max-w-[85%] w-auto h-auto transition-transform duration-300 group-hover:scale-105"
                />
                {partner.url && (
                  <div className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/5 text-neutral-600 group-hover:text-black group-hover:bg-[#d4ff00] transition-colors">
                    <ExternalLink className="w-2.5 h-2.5 stroke-[2.5]" />
                  </div>
                )}
              </div>

              {/* Text Info */}
              <div className="pt-3 text-center flex-grow flex flex-col justify-between">
                <div>
                  <div className="text-xs sm:text-sm font-black uppercase tracking-tight text-white group-hover:text-[#d4ff00] transition-colors truncate flex items-center justify-center gap-1">
                    <span>{partner.name}</span>
                    {partner.url && <ExternalLink className="w-3 h-3 text-[#d4ff00] shrink-0" />}
                  </div>
                  <div className="text-[10px] font-mono-tech text-[#d4ff00] font-semibold uppercase tracking-wider mt-0.5 truncate">
                    {partner.category}
                  </div>
                </div>

                {partner.promoBadge ? (
                  <div className="mt-1.5">
                    <span className="inline-block px-2 py-0.5 rounded bg-[#d4ff00]/15 text-[#d4ff00] border border-[#d4ff00]/30 font-mono-tech text-[10px] font-black uppercase tracking-wide animate-pulse">
                      {partner.promoBadge}
                    </span>
                    <p className="text-[10px] text-neutral-300 font-mono-tech mt-1 leading-snug">
                      {partner.desc}
                    </p>
                  </div>
                ) : (
                  <p className="text-[11px] text-neutral-400 font-mono-tech mt-1.5 leading-snug">
                    {partner.desc}
                  </p>
                )}
              </div>
            </>
          );

          const cardClasses =
            "bg-[#141412] border border-white/10 hover:border-[#d4ff00]/50 rounded-2xl p-3 sm:p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#d4ff00]/10 group";

          return partner.url ? (
            <a
              key={idx}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${cardClasses} cursor-pointer hover:border-[#d4ff00]`}
              title={`${partner.name} - 10% offerts avec le code RUNPASSION (Ouvrir le site)`}
            >
              {CardInner}
            </a>
          ) : (
            <div key={idx} className={cardClasses}>
              {CardInner}
            </div>
          );
        })}
      </div>
    </div>
  );
}
