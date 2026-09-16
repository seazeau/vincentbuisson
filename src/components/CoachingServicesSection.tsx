"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Video,
  Calendar,
  Target,
  Dumbbell,
  MessageCircle,
  Trophy,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Tilt3DCard from "./Tilt3DCard";

export default function CoachingServicesSection() {
  const pillars = [
    {
      num: "01",
      icon: Video,
      tag: "DÉMARRAGE & CADRAGE",
      title: "Visio de diagnostic & objectifs",
      desc: "Avant de courir le premier kilomètre, nous faisons un appel visio approfondi pour analyser votre passé sportif, vos contraintes pro/perso et définir vos vrais objectifs chronométriques.",
      badge: "APPEL VISIO COMPLET",
      tilt: "lg:-rotate-3",
      float: "animate-float-1",
    },
    {
      num: "02",
      icon: Calendar,
      tag: "SYNCHRO GPS EN DIRECT",
      title: "Planification hebdo sur Nolio",
      desc: "Votre programme d'entraînement est conçu et mis à jour chaque semaine sur l'application Nolio. Chaque séance est automatiquement synchronisée avec votre montre GPS (Garmin, Coros, Suunto, Apple Watch).",
      badge: "MISE À JOUR 7J/7",
      tilt: "lg:rotate-2",
      float: "animate-float-2",
    },
    {
      num: "03",
      icon: Target,
      tag: "PHYSIOLOGIE DE L'EFFORT",
      title: "Allures personnalisées & définies",
      desc: "Nous calculons scientifiquement vos zones de travail précises (Endurance Fondamentale, SV1, SV2 seuil anaérobie, VMA). Fini de courir au hasard : chaque fractionné et sortie longue a un but direct.",
      badge: "ZONES EF, SV1, SV2, VMA",
      tilt: "lg:-rotate-2",
      float: "animate-float-3",
    },
    {
      num: "04",
      icon: Dumbbell,
      tag: "PRÉVENTION & FOULÉE",
      title: "Renforcement spécifique & PPG",
      desc: "Intégration d'exercices ciblés de Préparation Physique Générale et de gainage pour rendre votre foulée plus économe, résistante à la fatigue en fin de course et prévenir activement les blessures.",
      badge: "ÉCONOMIE DE COURSE",
      tilt: "lg:rotate-3",
      float: "animate-float-4",
    },
    {
      num: "05",
      icon: MessageCircle,
      tag: "DISPONIBILITÉ 7J/7",
      title: "Votre coach en poche sur WhatsApp",
      desc: "Disponibilité continue sur WhatsApp et points visio à la demande. Un doute sur une séance ? Une alerte musculaire ? Un imprévu pro ou météo ? Vous m'écrivez et on réajuste le plan immédiatement.",
      badge: "RÉACTIVITÉ DIRECTE",
      tilt: "lg:-rotate-1",
      float: "animate-float-5",
    },
    {
      num: "06",
      icon: Trophy,
      tag: "PERFORMANCE FINALE",
      title: "Stratégie de course & nutrition Jour J",
      desc: "Rien n'est laissé au hasard le jour de l'épreuve : protocole d'affûtage (tapering), stratégie de pacing métronome, plan d'hydratation et de ravitaillement glucidique pour briser définitivement le mur.",
      badge: "PACING & ANTI-MUR",
      tilt: "lg:rotate-2",
      float: "animate-float-6",
    },
  ];

  return (
    <section id="notre-accompagnement" className="relative py-16 sm:py-32 bg-[#0a0a09] text-white overflow-hidden select-none perspective-[1200px]">
      <span id="services" className="sr-only" />
      {/* 1. Dramatic Dark Drapery Texture Background (matching Boxer Shorts frame 14s) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/drape-bg.webp"
          alt="Texture drapée théâtrale"
          fill
          className="object-cover object-center opacity-40 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0b] via-black/75 to-[#0a0a09]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-mono-tech uppercase tracking-widest text-[#d4ff00] mb-4 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#d4ff00]" />
            <span>CE QUE COMPREND L'ACCOMPAGNEMENT</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[0.95] text-white drop-shadow-2xl">
            L'ACCOMPAGNEMENT <br />
            <span className="text-[#d4ff00]">SUR-MESURE</span>
          </h2>

          <p className="font-hand text-2xl sm:text-4xl text-[#d4ff00] font-bold -rotate-1 mt-3">
            Pas de plans préfabriqués. 6 piliers d'élite pour pulvériser votre record.
          </p>
        </div>

        {/* 6 Tilted 3D Cards Grid with Real Mouse Tilt & Levitation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className={`transition-all duration-300 ${item.tilt} ${item.float} hover:rotate-0 hover:z-30 hover:animate-none`}>
                <Tilt3DCard
                  maxTilt={14}
                  glare={true}
                  className="h-full bg-[#fbfaf6] text-black rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.4)] border border-black/10 flex flex-col justify-between group hover:border-[#d4ff00] hover:shadow-[0_35px_80px_rgba(212,255,0,0.25)] transition-all duration-300 min-h-[auto] sm:min-h-[380px] [transform-style:preserve-3d]"
                >
                  {/* Top Row: Number & Category Badge with 3D Pop-Out */}
                  <div className="[transform-style:preserve-3d]">
                    <div
                      className="flex items-center justify-between mb-6 transition-transform duration-300 group-hover:[transform:translateZ(25px)]"
                    >
                      <span className="inline-block font-mono-tech text-xs font-black bg-black text-white px-3 py-1 rounded-lg group-hover:bg-[#d4ff00] group-hover:text-black transition-colors shadow-md">
                        {item.num}
                      </span>
                      <span className="text-[10px] font-mono-tech uppercase font-bold text-neutral-600 tracking-wider">
                        {item.tag}
                      </span>
                    </div>

                    {/* Title with 3D Pop-Out */}
                    <h3
                      className="text-2xl sm:text-[26px] font-black uppercase tracking-tight text-black leading-tight mb-4 group-hover:text-[#111] transition-transform duration-300 group-hover:[transform:translateZ(35px)]"
                    >
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal transition-transform duration-300 group-hover:[transform:translateZ(18px)]"
                    >
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom Row: Highlight badge + Circular Action Button */}
                  <div
                    className="pt-6 border-t border-black/10 flex items-center justify-between mt-6 transition-transform duration-300 group-hover:[transform:translateZ(28px)]"
                  >
                    <span className="text-[10px] font-mono-tech uppercase font-bold text-neutral-600 flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5 text-black" />
                      {item.badge}
                    </span>

                    <Link
                      href="/contact/"
                      className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-[#d4ff00] group-hover:text-black transition-all duration-300 group-hover:scale-125 shadow-lg group-hover:[transform:translateZ(40px)]"
                      aria-label={`En savoir plus sur ${item.title}`}
                    >
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </Link>
                  </div>
                </Tilt3DCard>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner: Call to Action */}
        <div className="mt-12 sm:mt-20 bg-gradient-to-r from-white/[0.1] to-white/[0.03] backdrop-blur-md border border-white/15 rounded-3xl p-6 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 text-center sm:text-left shadow-2xl">
          <div className="space-y-2">
            <p className="font-hand text-3xl sm:text-4xl text-[#d4ff00] font-bold -rotate-1">
              Prêt à courir avec un vrai coach à vos côtés ?
            </p>
            <h4 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
              Réservez votre visio de démarrage offerte
            </h4>
            <p className="text-xs sm:text-sm text-neutral-400 font-mono-tech max-w-xl">
              Nous faisons le point sur votre niveau, vos allures et la préparation la plus adaptée à vos ambitions.
            </p>
          </div>

          <Link
            href="/contact/"
            className="shrink-0 bg-[#d4ff00] hover:bg-white text-black font-black text-xs sm:text-sm uppercase tracking-wider px-9 py-4 rounded-full shadow-2xl transition-all hover:scale-105 flex items-center gap-2"
          >
            <span>Postuler au coaching</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </Link>
        </div>

      </div>
    </section>
  );
}
