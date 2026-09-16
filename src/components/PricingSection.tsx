"use client";

import React from "react";
import Link from "next/link";
import { Check, ArrowUpRight, ShieldCheck, Zap, Sparkles, Clock, HeartHandshake } from "lucide-react";
import { PLANS } from "@/data/siteContent";
import { motion } from "framer-motion";
import Tilt3DCard from "./Tilt3DCard";

export default function PricingSection() {
  return (
    <section id="tarifs" className="py-16 sm:py-24 bg-[#0c0c0b] relative overflow-hidden border-b border-white/5">
      <span id="formules" className="sr-only" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title & Slogan */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-widest text-neutral-300 bg-white/5 px-4 py-1.5 rounded-full border border-white/10 mb-4 backdrop-blur-sm">
            <Zap className="w-3.5 h-3.5 text-neutral-300" />
            <span>LES FORMULES DE COACHING</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-tight">
            Investissez dans <br />
            <span className="text-neutral-400">
              Votre Prochain Record
            </span>
          </h2>

          <p className="font-hand text-2xl sm:text-3xl text-white mt-3 -rotate-1 drop-shadow-md">
            Deux formules limpides. 100% sur-mesure sur Nolio, 0 plan préfabriqué.
          </p>
        </div>

        {/* Pricing Cards Grid (White Animated Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          {PLANS.map((plan, idx) => {
            const isPopular = plan.popular;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: idx * 0.15, ease: "easeOut" }}
                className="h-full"
              >
                <Tilt3DCard
                  maxTilt={6}
                  className={`h-full rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 relative group cursor-pointer ${
                    isPopular
                      ? "bg-white text-black border-2 border-black shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_60px_rgba(255,255,255,0.2)] hover:-translate-y-2"
                      : "bg-[#fbfaf6] hover:bg-white text-black border border-black/10 shadow-[0_15px_35px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_50px_rgba(255,255,255,0.12)] hover:-translate-y-2"
                  }`}
                >
                {/* Plan Badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-8 z-10">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[10px] font-mono-tech font-bold uppercase tracking-wider shadow-lg ${
                        isPopular
                          ? "bg-black text-white border border-white/20"
                          : "bg-black text-white border border-white/15"
                      }`}
                    >
                      {isPopular ? (
                        <>
                          <Sparkles className="w-3 h-3 text-amber-400" />
                          <span>{plan.badge}</span>
                        </>
                      ) : (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>{plan.badge}</span>
                        </>
                      )}
                    </span>
                  </div>
                )}

                <div>
                  {/* Plan Name */}
                  <h3 className="text-2xl sm:text-3xl font-black text-black uppercase tracking-tight mb-2">
                    {plan.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-600 mb-6 leading-relaxed font-mono-tech">
                    {plan.description}
                  </p>

                  {/* Savings Pill */}
                  {plan.savings && (
                    <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono-tech font-bold bg-black/5 text-black border border-black/10">
                      <Sparkles className="w-3.5 h-3.5 shrink-0 text-black" />
                      <span>{plan.savings}</span>
                    </div>
                  )}

                  {/* Price Display */}
                  <div className="flex items-baseline space-x-3 mb-8 pb-6 border-b border-black/10">
                    <span className="text-5xl sm:text-6xl font-black text-black font-mono-tech tracking-tight">
                      {plan.price}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-sm font-mono-tech text-black uppercase font-bold">
                        {plan.period}
                      </span>
                      <span className="text-[11px] font-mono-tech text-neutral-500">
                        Prélèvement mensuel sans frais cachés
                      </span>
                    </div>
                  </div>

                  {/* 4 Concise Features */}
                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center text-xs sm:text-sm text-neutral-800 font-medium">
                        <div className="w-4 h-4 rounded-full bg-black text-white flex items-center justify-center shrink-0 mr-3">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social Proof Quote & Action Button */}
                <div className="pt-6 border-t border-black/10 space-y-4">
                  <div className="bg-black/5 border border-black/5 rounded-2xl p-3.5 text-xs text-neutral-700 italic">
                    <p>
                      {isPopular
                        ? "« Chaque séance a un sens, mes allures décollent enfin. » — Antoine B."
                        : "« J'ai retrouvé mes sensations et mes jambes très vite ! » — Patrizia Z."}
                    </p>
                  </div>

                  <Link
                    href={plan.href}
                    className={`w-full flex items-center justify-between px-6 py-4 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-lg hover:scale-[1.01] ${
                      isPopular
                        ? "bg-black hover:bg-neutral-800 text-white"
                        : "bg-white hover:bg-black hover:text-white text-black border border-black/20"
                    }`}
                  >
                    <span>{plan.cta}</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[2]" />
                  </Link>

                  <p className="text-[10px] font-mono-tech text-center text-neutral-500">
                    {isPopular
                      ? "✓ Économie de 120 € · ✓ Suivi direct par Vincent · ✓ Démarrage sous 48h"
                      : "✓ 0 engagement · ✓ Résiliation en 1 clic · ✓ Réponse sous 24h"}
                  </p>
                </div>
              </Tilt3DCard>
            </motion.div>
          );
        })}
      </div>

        {/* 4 Pillars of Reassurance */}
        <div className="mt-14 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#fbfaf6] border border-black/10 rounded-2xl p-4 flex items-center space-x-3.5 shadow-sm">
            <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 stroke-[2]" />
            </div>
            <div>
              <p className="text-xs font-mono-tech uppercase text-black font-bold">Paiement Mensuel</p>
              <p className="text-[11px] text-neutral-500 font-mono-tech">Aucun montant bloqué</p>
            </div>
          </div>

          <div className="bg-[#fbfaf6] border border-black/10 rounded-2xl p-4 flex items-center space-x-3.5 shadow-sm">
            <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 stroke-[2]" />
            </div>
            <div>
              <p className="text-xs font-mono-tech uppercase text-black font-bold">Démarrage Express</p>
              <p className="text-[11px] text-neutral-500 font-mono-tech">Activation sous 48h sur Nolio</p>
            </div>
          </div>

          <div className="bg-[#fbfaf6] border border-black/10 rounded-2xl p-4 flex items-center space-x-3.5 shadow-sm">
            <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 stroke-[2]" />
            </div>
            <div>
              <p className="text-xs font-mono-tech uppercase text-black font-bold">0 Frais Cachés</p>
              <p className="text-[11px] text-neutral-500 font-mono-tech">Zéro frais d&apos;inscription</p>
            </div>
          </div>

          <div className="bg-[#fbfaf6] border border-black/10 rounded-2xl p-4 flex items-center space-x-3.5 shadow-sm">
            <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center shrink-0">
              <HeartHandshake className="w-4 h-4 stroke-[2]" />
            </div>
            <div>
              <p className="text-xs font-mono-tech uppercase text-black font-bold">100% Coach Direct</p>
              <p className="text-[11px] text-neutral-500 font-mono-tech">Vincent Buisson en personne</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
