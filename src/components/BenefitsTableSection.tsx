"use client";

import React from "react";
import Link from "next/link";
import { Watch, MessageSquare, Zap, ArrowRight, Sparkles, Check } from "lucide-react";
import { motion } from "framer-motion";
import Tilt3DCard from "./Tilt3DCard";

const BENEFIT_CARDS = [
  {
    num: "01",
    icon: Watch,
    tag: "AUTOMATIQUE",
    title: "Synchro Montre GPS",
    desc: "Vos séances et allures s'injectent directement dans votre Garmin, Coros, Suunto ou Apple Watch. Vous suivez simplement le bon tempo.",
    highlight: "Zéro calcul mental en courant",
  },
  {
    num: "02",
    icon: MessageSquare,
    tag: "DISPONIBILITÉ",
    title: "Coach Direct WhatsApp",
    desc: "Un imprévu professionnel ou une fatigue ? Vous m'écrivez directement et votre semaine s'adapte en temps réel à votre quotidien.",
    highlight: "Votre plan vit au rythme de votre vie",
  },
  {
    num: "03",
    icon: Zap,
    tag: "PHYSIOLOGIE",
    title: "Allures & Progression Durable",
    desc: "Calibration précise de vos zones d'endurance et de seuils. Vous progressez régulièrement et avec sérénité, en préservant votre corps.",
    highlight: "Chaque kilomètre a un objectif précis",
  },
];

export default function BenefitsTableSection() {
  return (
    <section id="benefices" className="py-16 sm:py-24 bg-[#0c0c0b] relative overflow-hidden border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-widest text-neutral-300 bg-white/5 px-4 py-1.5 rounded-full border border-white/10 mb-4 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-neutral-300" />
            <span>LA DIFFÉRENCE CONCRÈTE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight">
            Ce que change vraiment <br />
            <span className="text-neutral-400">Notre Accompagnement</span>
          </h2>

          <p className="text-xs sm:text-sm text-neutral-400 mt-4 max-w-xl mx-auto font-mono-tech leading-relaxed">
            Fini les plans PDF génériques. Trois piliers essentiels pour vous amener vers votre record sans friction.
          </p>
        </div>

        {/* 3 Animated White Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {BENEFIT_CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.12, ease: "easeOut" }}
                className="h-full"
              >
                <Tilt3DCard
                  maxTilt={8}
                  className="h-full bg-[#fbfaf6] hover:bg-white text-black rounded-3xl p-8 sm:p-9 border border-black/10 shadow-[0_15px_35px_rgba(0,0,0,0.25)] hover:shadow-[0_25px_50px_rgba(255,255,255,0.12)] hover:-translate-y-2.5 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    {/* Top Row: Icon & Number */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center border border-black/10 group-hover:scale-110 transition-transform duration-300 shadow-md">
                        <Icon className="w-5 h-5 stroke-[2]" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono-tech uppercase tracking-widest text-neutral-600 bg-black/5 border border-black/10 px-2.5 py-0.5 rounded-full font-bold">
                          {card.tag}
                        </span>
                        <span className="font-mono-tech text-xs text-neutral-400 font-bold">
                          {card.num}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-black text-black uppercase tracking-tight mb-3">
                      {card.title}
                    </h3>

                    {/* Benefit Description */}
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-mono-tech">
                      {card.desc}
                    </p>
                  </div>

                  {/* Footer Highlight */}
                  <div className="mt-8 pt-5 border-t border-black/10 flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span className="text-xs font-bold text-neutral-900 font-sans">
                      {card.highlight}
                    </span>
                  </div>
                </Tilt3DCard>
              </motion.div>
            );
          })}
        </div>

        {/* Section Action CTA */}
        <div className="mt-14 sm:mt-16 text-center max-w-md mx-auto space-y-2.5">
          <a
            href="#tarifs"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white hover:bg-neutral-200 text-black font-bold text-xs sm:text-sm uppercase tracking-wider transition-all hover:scale-105 shadow-xl group"
          >
            <span>Je découvre les formules</span>
            <ArrowRight className="w-4 h-4 ml-2 stroke-[2] group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="text-[11px] font-mono-tech text-neutral-500">
            ✓ Accompagnement direct par Vincent · ✓ Zéro engagement · ✓ Réponse sous 24h
          </p>
        </div>

      </div>
    </section>
  );
}
