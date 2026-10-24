"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Zap, BookOpen } from "lucide-react";
import Tilt3DCard from "./Tilt3DCard";

export default function DistancesSection() {
  const distances = [
    {
      num: "01",
      name: "Prépa 10 km sur Route",
      slug: "/coaching-10km/",
      badge: "VMA & Allure AS10",
      badgeColor: "bg-[#d4ff00] text-black font-black",
      accentBorder: "border-[#d4ff00]/30 hover:border-[#d4ff00]",
      description:
        "Programme d'entraînement 10 km personnalisé sur Nolio (Paris & en ligne). Développez votre VMA et votre soutien lactique pour casser vos barres chronométriques sans exploser au 7e kilomètre.",
      highlights: [
        "Fractionné court/long et allure spécifique 10 km (AS10)",
        "Plans calibrés : Sub-50', Sub-45', Sub-40' et Sub-35'",
        "Préparation 10 km de Paris, Adidas 10K & courses labellisées FFA",
      ],
      guides: [
        { label: "Guide 10 km en moins de 40 min", href: "/blog/courir-10km-moins-40-minutes/" },
        { label: "Guide 10 km en moins de 45 min", href: "/blog/courir-10km-moins-45-minutes-allure-plan/" },
        { label: "Guide 10 km en moins de 50 min", href: "/blog/courir-10km-moins-50-minutes-plan/" },
      ],
      chronoRef: "Sub-35' vérifié sur bitume",
      cta: "Voir le coaching 10 km",
    },
    {
      num: "02",
      name: "Prépa Semi-Marathon (21,1 km)",
      slug: "/coaching-semi-marathon/",
      badge: "Seuil SV2 & Tempo",
      badgeColor: "bg-[#ff4400] text-white font-black",
      accentBorder: "border-[#ff4400]/30 hover:border-[#ff4400]",
      description:
        "Plan de préparation semi-marathon sur-mesure sur Nolio. Repoussez votre seuil anaérobie (SV2) et maîtrisez votre pacing kilométrique pour tenir votre allure cible jusqu'au 21e km.",
      highlights: [
        "Blocs au seuil lactique (SV1/SV2) et sorties longues progressives",
        "Plans calibrés : Finisher, Sub-2h, Sub-1h45, Sub-1h30",
        "Spécial Semi de Paris, Boulogne-Billancourt & grands semis",
      ],
      guides: [
        { label: "Allure cible & Pacing Semi-Marathon", href: "/blog/allure-cible-semi-marathon-pacing/" },
        { label: "Semi-Marathon en moins d'1h30", href: "/blog/semi-marathon-moins-1h30-allure-seances-plan/" },
        { label: "Semi-Marathon en 1h45 : Plan & Allures", href: "/blog/semi-marathon-en-1h45-allure-plan/" },
      ],
      chronoRef: "Calibration chirurgicale SV1/SV2",
      cta: "Voir le coaching Semi-Marathon",
    },
    {
      num: "03",
      name: "Prépa Marathon (42,195 km)",
      slug: "/coaching-marathon/",
      badge: "Anti-Mur & Allure AS42",
      badgeColor: "bg-sky-400 text-black font-black",
      accentBorder: "border-sky-400/30 hover:border-[#d4ff00]",
      description:
        "Coaching marathon en ligne et à Paris par un coach sub-3h. Sorties longues spécifiques, stratégie nutritionnelle glucidique et affûtage sur 3 semaines pour éviter le mur du 30e km.",
      highlights: [
        "Sorties longues structurées à allure spécifique marathon (AS42)",
        "Plans calibrés : Premier marathon, Sub-4h, Sub-3h30, Sub-3h00",
        "Préparation Marathon de Paris, Valence, Berlin, Amsterdam",
      ],
      guides: [
        { label: "Marathon en 3h30 : Allure 4'58 & Plan", href: "/blog/marathon-en-3h30-allure-plan-entrainement/" },
        { label: "Prépa Marathon Sub-3h (Allure 4'15/km)", href: "/blog/preparation-marathon-sub-3h-allure-as42/" },
        { label: "Préparation Marathon de Paris : Guide", href: "/blog/preparation-marathon-de-paris-2026-parcours-allures-plan/" },
      ],
      chronoRef: "Coach Sub-3h sur Marathon",
      cta: "Voir le coaching Marathon",
    },
  ];

  return (
    <section id="distances" className="py-16 sm:py-24 bg-[#0e0e0c] relative overflow-hidden border-b border-white/5">
      <span id="plans" className="sr-only" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-tech uppercase tracking-widest text-[#d4ff00] mb-2">
              <span className="w-2 h-2 bg-[#d4ff00] rounded-full inline-block" />
              <span>PLANS D&apos;ENTRAÎNEMENT PERSONNALISÉS SUR ROUTE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Prépa 10 km, Semi &amp; Marathon <br />
              <span className="font-hand text-4xl sm:text-6xl text-[#d4ff00] font-normal lowercase">
                calibrées au millimètre sur Nolio.
              </span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#a0a095] max-w-md font-mono-tech leading-relaxed">
            Chaque distance sollicite des filières physiologiques distinctes (VMA, seuils SV1/SV2, endurance lipidique). Choisissez votre distance cible pour découvrir notre protocole.
          </p>
        </div>

        {/* 3 Distance Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {distances.map((dist, idx) => (
            <Tilt3DCard
              key={idx}
              className={`bg-[#161614] border ${dist.accentBorder} rounded-3xl p-7 sm:p-8 flex flex-col justify-between shadow-2xl transition-all group`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-black font-mono-tech text-[#44443e] group-hover:text-white transition-colors">
                    {dist.num}
                  </span>
                  <span
                    className={`text-[10px] uppercase tracking-wider px-3 py-1 rounded-full ${dist.badgeColor}`}
                  >
                    {dist.badge}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-3">
                  <Link href={dist.slug} className="hover:text-[#d4ff00] transition-colors">
                    {dist.name}
                  </Link>
                </h3>
                <p className="text-xs sm:text-sm text-[#a0a095] leading-relaxed mb-6">
                  {dist.description}
                </p>

                <div className="space-y-2.5 mb-6 pt-4 border-t border-[#262622]">
                  {dist.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-start text-xs text-[#cfcfc4]">
                      <Zap className="w-3.5 h-3.5 text-[#d4ff00] mr-2 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Contextual SEO Guide Links */}
                <div className="mb-6 pt-4 border-t border-[#262622]">
                  <p className="text-[10px] font-mono-tech uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3 h-3 text-[#d4ff00]" />
                    <span>Guides &amp; Allures de référence :</span>
                  </p>
                  <ul className="space-y-1.5">
                    {dist.guides.map((g, gIdx) => (
                      <li key={gIdx}>
                        <Link
                          href={g.href}
                          className="text-xs font-mono-tech text-neutral-300 hover:text-[#d4ff00] transition-colors flex items-center justify-between py-0.5"
                        >
                          <span>→ {g.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-[#262622]">
                <div className="flex items-center justify-between text-[11px] font-mono-tech text-[#888880] mb-4">
                  <span>EXPERTISE TERRAIN :</span>
                  <strong className="text-white">{dist.chronoRef}</strong>
                </div>

                <Link
                  href={dist.slug}
                  className="w-full flex items-center justify-between px-5 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider bg-white text-black hover:bg-[#d4ff00] transition-all shadow-md"
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
