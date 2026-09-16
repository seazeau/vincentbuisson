"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Sliders,
  TrendingUp,
  Heart,
} from "lucide-react";
import Tilt3DCard from "./Tilt3DCard";

export default function About3DSection() {

  const highlights = [
    {
      num: "01",
      icon: Sliders,
      title: "Individualisation",
      desc: "Chaque séance est ajustée à vos disponibilités réelles, votre profil et votre fatigue.",
    },
    {
      num: "02",
      icon: TrendingUp,
      title: "Progressivité",
      desc: "Une montée en charge maîtrisée pour franchir des paliers durables en respectant votre corps.",
    },
    {
      num: "03",
      icon: Heart,
      title: "Plaisir",
      desc: "Le moteur de la régularité : garder l'envie et la motivation intactes à chaque foulée.",
    },
  ];

  return (
    <section
      id="qui-sommes-nous"
      className="relative bg-[#0c0c0b] text-white py-14 sm:py-24 px-4 sm:px-8 overflow-hidden border-t border-white/5 select-none"
    >
      <span id="a-propos" className="sr-only" />
      {/* Background Ambience Subtle Glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* 2-Column Showcase: Left = Coach Photo 3D Tilt Card, Right = Clean Bold Manifesto */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: 3D Tilt Coach Card with Vincent's Photo */}
          <div className="lg:col-span-5">
            <div className="lg:-rotate-2 transition-transform duration-500 hover:rotate-0">
              <Tilt3DCard
                maxTilt={10}
                glare={true}
                className="rounded-3xl bg-[#141412] border border-white/15 overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.85)] group relative"
              >
                {/* Photo Container */}
                <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-neutral-900">
                  <Image
                    src="/images/vincent-buisson.webp"
                    alt="Vincent Buisson - Coach Course à pied & Spécialiste Route"
                    fill
                    priority
                    className="object-cover object-top grayscale group-hover:grayscale-0 contrast-110 transition-all duration-700 group-hover:scale-105"
                  />
                  
                  {/* Subtle Top & Bottom Vignette Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0c] via-transparent to-black/40" />

                  {/* Top Live Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 border border-white/20 backdrop-blur-md text-[11px] font-mono-tech uppercase tracking-wider text-white">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      COACH COURSE SUR ROUTE
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white text-black font-mono-tech font-bold text-[10px] uppercase tracking-wider shadow-lg">
                      ROUTE &amp; CHRONO
                    </span>
                  </div>

                  {/* Bottom Overlay over Photo */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#0c0c0b]/85 border border-white/15 backdrop-blur-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-hand text-3xl sm:text-4xl text-white font-normal lowercase tracking-wide -rotate-1">
                          Vincent Buisson
                        </p>
                        <p className="text-[11px] font-mono-tech text-neutral-400 uppercase tracking-wider mt-0.5">
                          Fondateur VB Coaching Running
                        </p>
                      </div>
                      <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] font-mono-tech uppercase tracking-wider text-neutral-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Coach Certifié
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Footer Note */}
                <div className="p-4 bg-[#141412] border-t border-white/10 flex items-center justify-between text-[11px] font-mono-tech text-neutral-400">
                  <span className="flex items-center gap-1.5 text-neutral-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    Accompagnement 100% direct par Vincent
                  </span>
                  <span className="text-neutral-500">Nolio Pro</span>
                </div>
              </Tilt3DCard>
            </div>
          </div>

          {/* RIGHT: Clear Editorial Presentation */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            {/* Header / Eyebrow */}
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono-tech uppercase tracking-widest text-neutral-300 mb-4 backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-neutral-300" />
                <span>QUI SOMMES-NOUS</span>
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.95] text-white">
                DU PREMIER KILOMÈTRE <br />
                <span className="text-neutral-400">À VOTRE RECORD.</span>
              </h2>
            </div>

            {/* Editorial Paragraphs - Authentic, Direct, Human */}
            <div className="space-y-4 text-sm sm:text-base text-neutral-300 leading-relaxed">
              <p>
                Confier sa préparation à un entraîneur est avant tout une <strong className="text-white">relation de confiance et d&apos;écoute</strong>. Ici, pas de plan générique en PDF ni d&apos;algorithme robotisé : chaque semaine d&apos;entraînement est ajustée sur-mesure à vos disponibilités professionnelles, vos sensations et votre état de forme réel.
              </p>
              <p>
                Spécialiste de la course sur route (<strong className="text-white">sub-35&apos; au 10 km</strong>, <strong className="text-white">sub-3h au marathon</strong>) et formé à la physiologie de l&apos;effort, je mets plus de 10 ans de pratique et plus de 100 accompagnements réussis à votre service pour vous guider sereinement vers vos objectifs chronométriques, en préservant votre santé et votre plaisir de courir.
              </p>
            </div>

            {/* 3 Pillars: Individualisation, Progressivité, Plaisir */}
            <div className="pt-2">
              <p className="text-xs font-mono-tech uppercase tracking-widest text-neutral-400 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                MES 3 PILIERS D&apos;ENTRAÎNEMENT
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {highlights.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5 hover:border-white/30 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-white shrink-0" />
                          <h4 className="text-xs font-bold uppercase tracking-wide text-white">
                            {item.title}
                          </h4>
                        </div>
                        <span className="text-[10px] font-mono-tech text-neutral-500">
                          {item.num}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-3">
              <Link
                href="/contact/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-neutral-200 text-black font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full shadow-xl transition-all hover:scale-105"
              >
                <span>Échanger avec Vincent</span>
                <ArrowRight className="w-4 h-4 stroke-[2]" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
