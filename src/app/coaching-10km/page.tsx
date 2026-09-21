import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowUpRight, Zap } from "lucide-react";
import PaceCalculator from "@/components/PaceCalculator";
import Tilt3DCard from "@/components/Tilt3DCard";
import FAQSection from "@/components/FAQSection";

export const metadata: Metadata = {
  title: "Coaching 10 km Personnalisé : Viser Sub-40', 45' ou 50' sur Nolio",
  description:
    "Plan d'entraînement 10 km sur-mesure avec un coach sub-35'. Développement VMA, allures spécifiques AS10, séances de seuil et bilan offert sous 24h.",
  alternates: {
    canonical: "https://vincentbuisson.fr/coaching-10km/",
  },
  openGraph: {
    title: "Coaching 10 km Personnalisé : Viser Sub-40', 45' ou 50' sur Nolio",
    description:
      "Plan de prépa 10 km sur-mesure sur Nolio : VMA, allure spécifique AS10 et optimisation de foulée avec un coach expérimenté sub-35'.",
    url: "https://vincentbuisson.fr/coaching-10km/",
  },
};

export default function Coaching10kmPage() {
  const structuredData10k = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Accueil",
            "item": "https://vincentbuisson.fr/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Prépa 10 km",
            "item": "https://vincentbuisson.fr/coaching-10km/"
          }
        ]
      },
      {
        "@type": "Service",
        "name": "Prépa 10 km & Plan d'Entraînement Personnalisé",
        "serviceType": "Coaching Course à Pied 10 km",
        "provider": {
          "@type": "Person",
          "name": "Vincent Buisson",
          "url": "https://vincentbuisson.fr/"
        },
        "areaServed": "FR",
        "description": "Préparation 10 km sur-mesure sur Nolio : développement VMA, allure spécifique AS10 et suivi hebdomadaire.",
        "offers": {
          "@type": "Offer",
          "price": "70.00",
          "priceCurrency": "EUR",
          "url": "https://vincentbuisson.fr/coaching-10km/"
        }
      }
    ]
  };

  const tenKKeys = [
    {
      num: "01",
      title: "Développement de la VMA",
      desc: "Pour courir vite plus longtemps, il faut augmenter votre cylindrée moteur. Séances de fractionné court et moyen (30/30, 200m, 400m, 800m) calibrées au pourcentage exact de votre VMA.",
    },
    {
      num: "02",
      title: "Le Travail du Train d'Allure (AS10)",
      desc: "Courir à 90% de VMA pendant 10 km exige une économie de course irréprochable. Nous structurons des blocs spécifiques (ex: 5 x 1000m ou 3 x 2000m) avec temps de récupération pincés.",
    },
    {
      num: "03",
      title: "Renforcement & Efficience de Foulée",
      desc: "Une foulée qui s'affaisse au 7ème kilomètre fait perdre de précieuses secondes. Nous intégrons des éducatifs de course et du renforcement musculaire utile (gainage dynamique, pied).",
    },
    {
      num: "04",
      title: "Gestion Tactique du Départ & Mental",
      desc: "L'erreur classique sur 10 km : l'emballement sur le 1er kilomètre. Apprenez à gérer les 3 premiers kilomètres pour accélérer dans les 3 derniers et doubler sur la ligne.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0c0c0b] text-[#f2eee4]">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData10k) }}
      />

      <Header />

      <main className="flex-grow pt-36 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="text-xs font-mono-tech uppercase tracking-wider text-[#888880] mb-8 flex items-center space-x-2">
            <Link href="/" className="hover:text-[#d4ff00]">Accueil</Link>
            <span>/</span>
            <span className="text-white font-bold">Prépa 10 km</span>
          </nav>

          {/* Hero 10 km */}
          <div className="max-w-4xl mb-20">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#181816] border border-[#2e2e28] text-[#d4ff00] text-xs font-mono-tech uppercase tracking-widest">
                <Zap className="w-3.5 h-3.5" />
                <span>VITESSE, VMA &amp; SOUTIEN • 10 KM</span>
              </span>
              <span className="font-hand text-2xl text-[#d4ff00] -rotate-2">
                Sub-35&apos; certifié terrain !
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white mb-6">
              Prépa 10 km sur Route : <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#d4ff00] to-[#ff4400]">
                VMA, Allure AS10 &amp; Puissance Aérobie
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#b5b5a8] leading-relaxed max-w-3xl">
              Le 10 km est le juge de paix de la vitesse en course à pied. Que vous visiez votre premier 10 km en <strong>moins de 50&apos;</strong>, la barre symbolique des <strong>40 minutes</strong> ou un chrono <strong>sous les 35 minutes</strong>, bénéficiez de l&apos;expertise directe d&apos;un coach coureur sous les 35&apos; sur bitume.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact/?distance=10+km"
                className="inline-flex items-center px-8 py-4 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider bg-[#d4ff00] text-black hover:bg-white transition-all shadow-xl shadow-[#d4ff00]/20"
              >
                Postuler pour ma prépa 10 km
                <ArrowUpRight className="w-4 h-4 ml-2 stroke-[2.5]" />
              </Link>
              <a
                href="#calculateur"
                className="inline-flex items-center px-7 py-4 rounded-2xl text-xs sm:text-sm font-mono-tech uppercase tracking-wider bg-[#181816] text-white border border-[#2e2e28] hover:border-[#d4ff00] transition-all"
              >
                Calculer mon allure 10 km
              </a>
            </div>
          </div>

          {/* 4 Pillars Grid with 3D Tilt */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            {tenKKeys.map((item, idx) => (
              <Tilt3DCard
                key={idx}
                maxTilt={6}
                className="bg-[#141412] border border-[#262622] rounded-3xl p-8 hover:border-[#d4ff00]/50 transition-colors shadow-2xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-black font-mono-tech text-[#ff4400]">
                    {item.num}
                  </span>
                  <span className="text-[10px] font-mono-tech uppercase text-[#888880]">INTENSITÉ</span>
                </div>
                <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-[#a0a095] leading-relaxed">{item.desc}</p>
              </Tilt3DCard>
            ))}
          </div>

          {/* Testimonial spotlight */}
          <Tilt3DCard maxTilt={4} className="bg-[#141412] border border-[#2a2a26] rounded-3xl p-8 sm:p-12 mb-24 relative overflow-hidden shadow-2xl">
            <div className="max-w-3xl">
              <span className="text-xs font-mono-tech uppercase tracking-widest text-[#d4ff00]">
                RÉCIT D&apos;ATHLÈTE • REPRISE &amp; PROGRESSION 10 KM
              </span>
              <p className="text-lg sm:text-2xl text-white italic font-medium my-6 leading-relaxed">
                &laquo; Vincent est un coach très attentif et à l&apos;écoute. Ses entraînements sont bien réfléchis et toujours différents, en donnant envie de se mettre à l&apos;épreuve. J&apos;ai commencé avec lui avec une blessure en cours, je voulais garder mes objectifs. Avec la patience et ses conseils j&apos;ai pu retrouver rapidement mes sensations, mes jambes et repartir plus forte ! &raquo;
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#d4ff00] text-black font-black flex items-center justify-center text-sm">
                  P
                </div>
                <div>
                  <p className="text-sm font-black text-white uppercase">Patrizia Z. — Reprise &amp; Progression</p>
                  <p className="text-xs text-[#888880] font-mono-tech">13 septembre 2026 • Sensations &amp; jambes retrouvées</p>
                </div>
              </div>
            </div>
          </Tilt3DCard>

          {/* Guide Blog Recommandé */}
          <div className="bg-[#181816] border border-[#d4ff00]/30 rounded-3xl p-6 sm:p-8 mb-24 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <span className="text-[11px] font-mono-tech uppercase text-[#d4ff00] font-bold">GUIDE TECHNIQUE 10 KM</span>
              <h3 className="text-xl sm:text-2xl font-black uppercase text-white mt-1">
                Comment courir le 10 km en moins de 40 minutes : Méthode &amp; Séances
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-mono-tech mt-1">
                Prérequis de VMA, blocs au seuil SV2 et stratégie de négative split décryptés par Vincent.
              </p>
            </div>
            <Link
              href="/blog/courir-10km-moins-40-minutes/"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-[#d4ff00] text-black px-5 py-3 rounded-full text-xs font-black uppercase tracking-wider hover:bg-white transition-colors shadow-lg"
            >
              <span>Lire le guide 10 km</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Pace Calculator Module */}
          <div id="calculateur" className="mb-24 scroll-mt-28">
            <PaceCalculator />
          </div>

          {/* Bottom CTA */}
          <div className="bg-[#141412] border border-[#2a2a26] rounded-3xl p-8 sm:p-14 text-center">
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white mb-3">
              Prêt à courir plus vite que jamais sur 10 km ?
            </h2>
            <p className="text-sm text-[#a0a095] font-mono-tech max-w-xl mx-auto mb-8">
              Cycle d&apos;entraînement de 8 à 12 semaines adapté à vos disponibilités et à vos repères actuels.
            </p>
            <Link
              href="/contact/?distance=10+km"
              className="inline-flex items-center px-8 py-4 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider bg-[#d4ff00] text-black hover:bg-white transition-all shadow-xl"
            >
              Échanger sur mon objectif 10 km
              <ArrowUpRight className="w-4 h-4 ml-2 stroke-[2.5]" />
            </Link>
          </div>
        </div>
      </main>

      {/* SEO & AI FAQ Section */}
      <FAQSection
        initialCategory="10k, Semi & Marathon"
        title="Questions Fréquentes • Prépa 10 km & Coaching"
        subtitle="Tout ce que vous devez savoir pour progresser, calibrer vos allures et réussir votre objectif 10 km."
      />

      <Footer />
    </div>
  );
}
