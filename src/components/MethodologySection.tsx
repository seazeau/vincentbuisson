"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Video, Calendar, Target, Dumbbell, MessageCircle } from "lucide-react";

export default function MethodologySection() {
  const steps = [
    {
      num: "01",
      icon: Calendar,
      title: "Planification dynamique Nolio",
      desc: "Votre programme d'entraînement est mis à jour chaque semaine sur l'application Nolio en fonction de votre forme, de votre montre GPS et de vos retours d'effort après chaque séance.",
      badge: "DATA & FORME RÉELLE",
      tilt: "lg:-rotate-4",
    },
    {
      num: "02",
      icon: Target,
      title: "Allures et zones sur-mesure",
      desc: "Nous calculons scientifiquement vos allures de travail (Endurance Fondamentale, SV1, SV2 seuil anaérobie, VMA) afin que chaque séance ait un impact direct sur vos records.",
      badge: "PHYSIOLOGIE DE L'EFFORT",
      tilt: "lg:-rotate-1",
    },
    {
      num: "03",
      icon: Dumbbell,
      title: "Renforcement spécifique (PPG)",
      desc: "Intégration d'une programmation d'exercices ciblés de Préparation Physique Générale pour rendre votre foulée plus économe, stable et prévenir activement les blessures.",
      badge: "ÉCONOMIE DE COURSE",
      tilt: "lg:rotate-2",
    },
    {
      num: "04",
      icon: MessageCircle,
      title: "Votre coach en poche 7J/7",
      desc: "Disponibilité quotidienne via WhatsApp et Nolio pour ajuster votre plan de course en temps réel. Un doute ? Une douleur ? Un imprévu pro ? On réajuste immédiatement.",
      badge: "RÉACTIVITÉ DIRECTE",
      tilt: "lg:rotate-5",
    },
  ];

  return (
    <section className="relative py-28 overflow-hidden select-none bg-[#0e0e0c]">
      {/* 1. Dramatic Dark Drapery Texture Background (Boxer Shorts frame 14s) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/drape-bg.webp"
          alt="Texture drapée théâtrale"
          fill
          className="object-cover object-center opacity-35 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e0e0c] via-black/70 to-[#0e0e0c]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Title: SUPERPOWERS */}
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-white drop-shadow-2xl">
            SUPERPOWERS
          </h2>
          <p className="text-xs sm:text-sm font-mono-tech uppercase tracking-widest text-[#d4ff00] mt-3 max-w-xl mx-auto">
            La méthode rigoureuse et humaine pour transformer votre potentiel en records officiels
          </p>
        </div>

        {/* Step 0: Bilan & Évaluation Initiale Callout Card */}
        <div className="mb-12 max-w-4xl mx-auto bg-gradient-to-r from-white/[0.08] to-white/[0.03] backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/15 hover:border-[#d4ff00]/50 transition-all shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-[#d4ff00] text-black flex items-center justify-center shrink-0 shadow-lg">
              <Video className="w-7 h-7 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono-tech uppercase font-bold text-[#d4ff00] tracking-widest bg-black/40 px-2 py-0.5 rounded">
                  ÉTAPE 00 &bull; POINT DE DÉPART
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                Bilan et évaluation initiale en visio
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 mt-2 leading-relaxed max-w-xl">
                Avant de courir le premier kilomètre, nous analysons votre passé sportif, vos contraintes professionnelles/familiales et vos objectifs lors d&apos;un appel visio complet de démarrage.
              </p>
            </div>
          </div>

          <Link
            href="/contact/"
            className="shrink-0 bg-white hover:bg-[#d4ff00] text-black font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-full shadow-xl transition-all hover:scale-105"
          >
            Réserver mon bilan
          </Link>
        </div>

        {/* 4 Tilted Floating Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className={`relative bg-white text-black rounded-3xl p-6 sm:p-7 shadow-2xl transition-all duration-300 hover:scale-105 hover:z-20 border border-black/10 ${step.tilt} min-h-[380px] flex flex-col justify-between group`}
              >
                {/* Top: Number Badge & Icon */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="inline-block font-mono-tech text-xs font-black bg-black text-white px-2.5 py-1 rounded-md">
                      {step.num}
                    </span>
                    <span className="text-[9px] font-mono-tech uppercase font-bold text-neutral-600 tracking-wider">
                      {step.badge}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-black leading-tight mb-4">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Bottom: Micro link */}
                <div className="pt-6 border-t border-black/10 flex items-center justify-between">
                  <span className="text-[10px] font-mono-tech uppercase font-bold text-neutral-600 flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5 text-black" />
                    Inclus au suivi
                  </span>
                  <Link
                    href="/contact/"
                    className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:bg-[#d4ff00] hover:text-black transition-colors"
                    aria-label={`En savoir plus sur ${step.title}`}
                  >
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
