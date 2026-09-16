"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles, MessageCircle } from "lucide-react";
import Tilt3DCard from "./Tilt3DCard";

export default function FreeAuditBanner() {
  return (
    <section id="bilan-offert" className="py-12 sm:py-16 bg-[#0c0c0b] relative overflow-hidden border-b border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Tilt3DCard
          maxTilt={3}
          className="bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 hover:border-white/20 rounded-3xl p-6 sm:p-10 backdrop-blur-md relative overflow-hidden transition-all shadow-2xl"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-[10px] font-mono-tech uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-neutral-300" />
                <span>BILAN INITIAL &amp; ANALYSE DE PROFIL RUNNING — 100% OFFERT</span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-snug">
                Vous ne savez pas ce qui freine <br className="hidden sm:inline" />
                <span className="text-neutral-400">
                  Votre Progression Chrono ?
                </span>
              </h3>

              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-mono-tech">
                Vincent Buisson analyse vos séances récentes, votre volume kilométrique et vos contraintes de vie. Vous recevez un diagnostic personnalisé, vos allures cibles estimées et votre premier axe d&apos;amélioration.
              </p>

              {/* Guarantees row */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 text-[11px] font-mono-tech text-neutral-400">
                <span className="flex items-center text-neutral-300">
                  <span className="text-white mr-1.5 font-bold">✓</span> 100% Gratuit
                </span>
                <span className="flex items-center text-neutral-300">
                  <span className="text-white mr-1.5 font-bold">✓</span> Sans aucun engagement
                </span>
                <span className="flex items-center text-neutral-300">
                  <span className="text-white mr-1.5 font-bold">✓</span> Réponse sous 24h par Vincent
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto shrink-0">
              <Link
                href="/contact/?offre=bilan-offert"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-white hover:bg-neutral-200 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:scale-105 group text-center"
              >
                <span>Demander mon bilan offert</span>
                <ArrowUpRight className="w-4 h-4 ml-2 stroke-[2] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>

              <a
                href="https://wa.me/33614838634?text=Bonjour%20Vincent%2C%20je%20souhaite%20b%C3%A9n%C3%A9ficier%20du%20bilan%20running%20offert%20pour%20analyser%20mon%20profil%20d%27entra%C3%AEnement."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/15 text-xs font-mono-tech uppercase tracking-wider transition-colors text-center"
              >
                <MessageCircle className="w-3.5 h-3.5 mr-2" />
                <span>Poser une question sur WhatsApp</span>
              </a>
            </div>
          </div>
        </Tilt3DCard>
      </div>
    </section>
  );
}
