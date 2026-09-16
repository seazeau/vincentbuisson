"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Zap, Target, Flame, Compass } from "lucide-react";
import Tilt3DCard from "./Tilt3DCard";

export default function DistancesSection() {
  const distances = [
    {
      num: "01",
      name: "Prépa 10 km sur Route",
      slug: "/coaching-10km/",
      badge: "VMA & Maintien Lactique",
      badgeColor: "bg-[#d4ff00] text-black",
      accentBorder: "border-[#d4ff00]/30 hover:border-[#d4ff00]",
      description:
        "La distance reine de l'intensité pure. L'objectif est de concilier puissance aérobie (VMA) et capacité à soutenir 90% de son potentiel sans asphyxie précoce.",
      highlights: [
        "Fractionné court et moyen calibré au pourcentage exact",
        "Séances de train d'allure spécifique (AS10) avec récupérations pincées",
        "Objectifs : Finir, Sub-50', Sub-45', Sub-40' ou Sub-35'",
      ],
      chronoRef: "Sub-35' testé sur bitume",
      cta: "Découvrir la prépa 10 km",
    },
    {
      num: "02",
      name: "Prépa Semi-Marathon",
      slug: "/coaching-semi-marathon/",
      badge: "Seuil Anaérobie & Tempo",
      badgeColor: "bg-[#ff4400] text-white",
      accentBorder: "border-[#ff4400]/30 hover:border-[#ff4400]",
      description:
        "L'équilibre parfait entre vitesse et endurance. La clé réside dans le travail du second seuil ventilatoire (SV2) et la régularité absolue du pacing.",
      highlights: [
        "Séances de tempo progressif et résistance lactique",
        "Mémoire musculaire de l'allure pour éviter les départs suicidaires",
        "Objectifs : Finir, Sub-1h45, Sub-1h30 ou Sub-1h20",
      ],
      chronoRef: "Gestion chirurgicale du SV2",
      cta: "Découvrir la prépa Semi-Marathon",
    },
    {
      num: "03",
      name: "Prépa Marathon (42,195 km)",
      slug: "/coaching-marathon/",
      badge: "Gestion du Mur & AS42",
      badgeColor: "bg-sky-400 text-black font-black",
      accentBorder: "border-sky-400/30 hover:border-sky-400",
      description:
        "L'épreuve de vérité où l'improvisation se paie cash. Sorties longues qualitatives, ravitaillement glucidique et affûtage millimétré pour repousser le mur.",
      highlights: [
        "Sorties longues avec blocs d'allure spécifique (AS42)",
        "Protocole d'apport en glucides testé à l'entraînement",
        "Objectifs : Finir, Sub-4h, Sub-3h30 ou Sub-3h00",
      ],
      chronoRef: "Sub-3h vérifié par le coach",
      cta: "Découvrir la prépa Marathon",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#0e0e0c] relative overflow-hidden border-b border-[#222220]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-tech uppercase tracking-widest text-[#d4ff00] mb-2">
              <span className="w-2 h-2 bg-[#d4ff00] rounded-full inline-block" />
              <span>SPÉCIALISATION SUR ROUTE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              3 Distances Cibles. <br />
              <span className="font-hand text-4xl sm:text-6xl text-[#d4ff00] font-normal lowercase">
                des plans au millimètre.
              </span>
            </h2>
          </div>
          <p className="text-sm text-[#a0a095] max-w-md font-mono-tech leading-relaxed">
            Chaque distance sollicite des filières physiologiques distinctes. On ne prépare pas un marathon comme un 10 km allongé.
          </p>
        </div>

        {/* 3D Tilt Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {distances.map((dist, idx) => (
            <Tilt3DCard
              key={idx}
              maxTilt={10}
              className={`bg-[#161614] border ${dist.accentBorder} rounded-3xl p-8 flex flex-col justify-between shadow-2xl transition-all group`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-black font-mono-tech text-[#44443e] group-hover:text-white transition-colors">
                    {dist.num}
                  </span>
                  <span
                    className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${dist.badgeColor}`}
                  >
                    {dist.badge}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-3">
                  {dist.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#a0a095] leading-relaxed mb-6">
                  {dist.description}
                </p>

                <div className="space-y-2.5 mb-8 pt-4 border-t border-[#262622]">
                  {dist.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-start text-xs text-[#cfcfc4]">
                      <Zap className="w-3.5 h-3.5 text-[#d4ff00] mr-2 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#262622]">
                <div className="flex items-center justify-between text-[11px] font-mono-tech text-[#888880] mb-4">
                  <span>EXPÉRIENCE :</span>
                  <strong className="text-white">{dist.chronoRef}</strong>
                </div>

                <Link
                  href={dist.slug}
                  className="w-full flex items-center justify-between px-5 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider bg-[#22221e] text-white border border-[#33332d] group-hover:bg-[#d4ff00] group-hover:text-black group-hover:border-[#d4ff00] transition-all shadow-md"
                >
                  <span>{dist.cta}</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </Link>
              </div>
            </Tilt3DCard>
          ))}
        </div>

      </div>
    </section>
  );
}
