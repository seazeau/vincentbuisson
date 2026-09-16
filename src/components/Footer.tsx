import React from "react";
import Link from "next/link";
import { ArrowUpRight, MessageCircle, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#0c0c0b] text-white pt-24 pb-12 overflow-hidden border-t border-white/10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Massive Stacked Brand Title (matching Boxer Shorts frame 18s) */}
          <div className="lg:col-span-7 space-y-6">
            <p className="font-hand text-3xl sm:text-4xl text-white font-normal -rotate-2 mb-[-10px] lowercase">
              vincent buisson
            </p>
            <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight leading-[0.85] text-white">
              VB <br />
              COACHING <br />
              RUNNING<span className="text-2xl sm:text-4xl text-neutral-500">™</span>
            </h2>

            <p className="text-xs sm:text-sm text-neutral-400 font-mono-tech max-w-md pt-4 leading-relaxed">
              Coaching course à pied d&apos;élite à distance. Rigueur scientifique, expérience éprouvée sur le bitume (&lt;35&apos; / &lt;3h) et suivi quotidien sur Nolio.
            </p>

            <p className="text-[11px] text-neutral-500 font-mono-tech pt-4">
              © {new Date().getFullYear()} VB Coaching Running • Vincent Buisson. Tous droits réservés.
            </p>
          </div>

          {/* Right: Floating White / Off-White Rounded Card (matching Boxer Shorts frame 18s) */}
          <div className="lg:col-span-5 bg-[#f4f2eb] text-black rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden border border-black/10">
            {/* Artistic decorative squiggly line */}
            <svg
              className="absolute -right-4 top-4 w-40 h-40 text-neutral-400/20 pointer-events-none"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
            >
              <path d="M 10 50 Q 30 10 50 50 T 90 50" />
            </svg>

            <div className="relative z-10 space-y-8">
              {/* Sections Link Grid */}
              <div>
                <p className="text-[11px] font-mono-tech font-bold uppercase tracking-widest text-neutral-500 mb-4">
                  SECTIONS CLÉS
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm font-bold uppercase text-black">
                  <Link href="/#tarifs" className="hover:text-neutral-500 transition-colors py-1 font-black">
                    Tarifs &amp; Formules
                  </Link>
                  <Link href="/coaching-10km/" className="hover:text-neutral-500 transition-colors py-1">
                    Prépa 10 km
                  </Link>
                  <Link href="/coaching-semi-marathon/" className="hover:text-neutral-500 transition-colors py-1">
                    Prépa Semi-Marathon
                  </Link>
                  <Link href="/coaching-marathon/" className="hover:text-neutral-500 transition-colors py-1">
                    Prépa Marathon
                  </Link>
                  <Link href="/methode/" className="hover:text-neutral-500 transition-colors py-1">
                    Notre Méthode
                  </Link>
                  <Link href="/calculateur-allures/" className="hover:text-neutral-500 transition-colors py-1">
                    Calculateur 3D
                  </Link>
                  <Link href="/blog/" className="hover:text-neutral-500 transition-colors py-1 font-bold text-[#181816]">
                    Blog &amp; Guides
                  </Link>
                  <Link href="/a-propos/" className="hover:text-neutral-500 transition-colors py-1">
                    À Propos
                  </Link>
                  <Link href="/contact/" className="hover:text-neutral-500 transition-colors py-1">
                    Contact &amp; Devis
                  </Link>
                </div>
              </div>

              {/* Social / Contact */}
              <div className="pt-6 border-t border-black/10">
                <p className="text-[11px] font-mono-tech font-bold uppercase tracking-widest text-neutral-500 mb-3">
                  CONTACT &amp; PARTENAIRES
                </p>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/contact/"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
                  >
                    <span>Postuler au coaching</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                  <a
                    href="https://top4running.fr/?a_box=sc3esau3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3.5 py-2 rounded-full bg-black/5 text-black border border-black/15 text-xs font-bold uppercase hover:bg-black hover:text-white transition-colors"
                  >
                    <span>Top4Running (Matos)</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                  <a
                    href="https://nolio.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3.5 py-2 rounded-full bg-white text-black border border-black/15 text-xs font-bold uppercase hover:bg-neutral-100 transition-colors"
                  >
                    <span>Nolio</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}

