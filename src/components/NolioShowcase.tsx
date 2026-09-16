"use client";

import React, { useState } from "react";
import { Watch, Activity, RefreshCw, MessageSquare, ArrowUpRight } from "lucide-react";
import Tilt3DCard from "./Tilt3DCard";

export default function NolioShowcase() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "1. Synchronisation Montre GPS",
      icon: Watch,
      desc: "Chaque séance programmée sur Nolio est transmise directement à votre montre (Garmin, Coros, Suunto, Polar). Appuyez sur Start : la montre vous guide sur les allures cibles et les bips de fractionné.",
      badge: "AUTOMATIQUE",
    },
    {
      title: "2. Analyse Métriques & RPE",
      icon: Activity,
      desc: "À votre retour, la séance est synchronisée. J'analyse vos courbes cardiaques, allures, puissance et votre ressenti subjectif (effort perçu de 1 à 10 et débriefing écrit).",
      badge: "DATA & PHYSIO",
    },
    {
      title: "3. Ajustement Hebdomadaire",
      icon: RefreshCw,
      desc: "Un coup de fatigue ? Une réunion tardive ? Le plan s'adapte immédiatement : déplacement de la séance clé ou allègement du volume pour préserver votre récupération.",
      badge: "100% HUMAIN",
    },
  ];

  return (
    <section className="py-24 bg-[#0a0a09] relative overflow-hidden border-b border-[#222220]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-mono-tech uppercase tracking-widest text-[#d4ff00] bg-[#d4ff00]/10 px-3.5 py-1.5 rounded-full border border-[#d4ff00]/30">
            CONNECTÉ &amp; INTERACTIF
          </span>
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mt-4">
            L&apos;Écosystème Nolio
          </h2>
          <p className="font-hand text-2xl sm:text-3xl text-[#d4ff00] mt-2 -rotate-1">
            Votre entraînement au poignet, analysé en temps réel par votre coach.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Interactive Steps */}
          <div className="lg:col-span-6 space-y-4">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isSelected = activeStep === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`cursor-pointer rounded-2xl p-6 border transition-all duration-300 ${
                    isSelected
                      ? "bg-[#181815] border-[#d4ff00] shadow-xl shadow-[#d4ff00]/5"
                      : "bg-[#121210] border-[#22221e] hover:border-[#383832]"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 font-black ${
                        isSelected
                          ? "bg-[#d4ff00] text-black shadow-lg"
                          : "bg-[#22221e] text-[#888880]"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-base font-black text-white uppercase tracking-tight">
                          {step.title}
                        </h4>
                        <span
                          className={`text-[9px] font-mono-tech font-bold uppercase px-2 py-0.5 rounded ${
                            isSelected
                              ? "bg-[#d4ff00]/20 text-[#d4ff00] border border-[#d4ff00]/40"
                              : "bg-[#22221e] text-[#888880]"
                          }`}
                        >
                          {step.badge}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#a0a095] mt-2 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: 3D Tilt Nolio Mockup */}
          <div className="lg:col-span-6">
            <Tilt3DCard maxTilt={8} className="bg-[#141412] border border-[#2a2a26] rounded-3xl p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#242420] pb-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-[#d4ff00] text-black font-black text-sm flex items-center justify-center">
                    VB
                  </div>
                  <div>
                    <p className="text-sm font-black text-white uppercase tracking-tight">Vincent Buisson</p>
                    <p className="text-[10px] font-mono-tech text-[#d4ff00] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d4ff00] inline-block animate-pulse" />
                      COACH ACTIF • NOLIO CERTIFIED
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono-tech bg-[#22221e] text-[#a0a095] px-3 py-1 rounded border border-[#33332d]">
                  SEMAINE 8 / 12
                </span>
              </div>

              {/* Workout Block */}
              <div className="space-y-4">
                <div className="bg-[#1a1a17] border border-[#2e2e28] rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono-tech uppercase tracking-wider text-[#ff4400] font-bold">
                      SÉANCE DU JOUR VALIDÉE
                    </span>
                    <span className="text-xs font-mono-tech text-[#888880]">15.2 KM • 1H15</span>
                  </div>
                  <h5 className="text-base font-black text-white uppercase tracking-tight mb-2">
                    Allure Spécifique Marathon (3 x 4000m @ 4&apos;12/km)
                  </h5>

                  {/* Metrics grid */}
                  <div className="grid grid-cols-3 gap-2 bg-[#121210] p-3 rounded-xl border border-[#242420] text-center">
                    <div>
                      <span className="text-[9px] font-mono-tech text-[#888880] block uppercase">Allure</span>
                      <strong className="text-xs sm:text-sm font-mono-tech text-white">4:11 /km</strong>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono-tech text-[#888880] block uppercase">Cardio</span>
                      <strong className="text-xs sm:text-sm font-mono-tech text-[#ff4400]">161 bpm</strong>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono-tech text-[#888880] block uppercase">RPE</span>
                      <strong className="text-xs sm:text-sm font-mono-tech text-[#d4ff00]">7 / 10</strong>
                    </div>
                  </div>
                </div>

                {/* Coach Feedback Note */}
                <div className="bg-[#1a1a17] border-l-2 border-[#d4ff00] rounded-r-2xl p-4 flex items-start gap-3">
                  <MessageSquare className="w-4 h-4 text-[#d4ff00] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#d6d6cb] leading-relaxed">
                    <strong className="text-white">Débrief de Vincent :</strong> &laquo; Dérive cardiaque inférieure à 3 bpm entre le bloc 1 et le bloc 3. C&apos;est la preuve que l&apos;allure est assimilée. Demain footing 45&apos; en endurance fondamentale pour drainer. &raquo;
                  </p>
                </div>
              </div>

              {/* Compatible watches */}
              <div className="mt-6 pt-4 border-t border-[#242420] flex items-center justify-between text-[11px] font-mono-tech text-[#888880]">
                <span>MONTRES COMPATIBLES :</span>
                <div className="flex gap-1.5 text-[10px] text-white">
                  <span className="bg-[#22221e] px-2 py-0.5 rounded">GARMIN</span>
                  <span className="bg-[#22221e] px-2 py-0.5 rounded">COROS</span>
                  <span className="bg-[#22221e] px-2 py-0.5 rounded">SUUNTO</span>
                  <span className="bg-[#22221e] px-2 py-0.5 rounded">POLAR</span>
                  <span className="bg-[#22221e] px-2 py-0.5 rounded">APPLE</span>
                </div>
              </div>
            </Tilt3DCard>
          </div>

        </div>

      </div>
    </section>
  );
}
