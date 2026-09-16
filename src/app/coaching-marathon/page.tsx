import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowUpRight, Flame } from "lucide-react";
import PaceCalculator from "@/components/PaceCalculator";
import Tilt3DCard from "@/components/Tilt3DCard";
import FAQSection from "@/components/FAQSection";

export const metadata: Metadata = {
  title: "Prépa Marathon : Plan d'Entraînement Personnalisé Nolio",
  description:
    "Plan de prépa marathon sur-mesure sur Nolio avec un coach sub-3h. Allure spécifique AS42, sorties longues ciblées et ravitaillement anti-mur.",
  alternates: {
    canonical: "https://vincentbuisson.fr/coaching-marathon/",
  },
  openGraph: {
    title: "Prépa Marathon : Plan d'Entraînement Personnalisé Nolio",
    description:
      "Plan de prépa marathon sur-mesure sur Nolio : maîtrisez votre allure spécifique AS42, éliminez le risque de mur et battez votre record.",
    url: "https://vincentbuisson.fr/coaching-marathon/",
  },
};

export default function CoachingMarathonPage() {
  const structuredDataMarathon = {
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
            "name": "Prépa Marathon",
            "item": "https://vincentbuisson.fr/coaching-marathon/"
          }
        ]
      },
      {
        "@type": "Service",
        "name": "Prépa Marathon & Plan d'Entraînement Personnalisé (Sub-3h, Sub-3h30, Finisher)",
        "serviceType": "Coaching Course à Pied Marathon",
        "provider": {
          "@type": "Person",
          "name": "Vincent Buisson",
          "url": "https://vincentbuisson.fr/"
        },
        "areaServed": "FR",
        "description": "Préparation marathon sur-mesure sur Nolio : calibration de l'allure spécifique AS42, sorties longues qualitatives, stratégie de ravitaillement et affûtage scientifique.",
        "offers": {
          "@type": "Offer",
          "price": "70.00",
          "priceCurrency": "EUR",
          "url": "https://vincentbuisson.fr/coaching-marathon/"
        }
      }
    ]
  };

  const marathonKeys = [
    {
      num: "01",
      title: "L'Allure Spécifique Marathon (AS42)",
      desc: "Trouver l'allure exacte que votre organisme peut tenir pendant 42 km sans épuisement prématuré. Nous testons et validons cette allure par des blocs progressifs et des courses repères (semi-marathon test).",
    },
    {
      num: "02",
      title: "La Sortie Longue Qualitative",
      desc: "Fini les footings lents et monotones de 3h qui vous cassent les fibres sans bénéfice. Mes sorties longues intègrent du travail d'allure cible, de l'économie de course et le test grandeur nature des ravitaillements.",
    },
    {
      num: "03",
      title: "Nutrition & Élimination du 'Mur'",
      desc: "Le mur du 30ème km n'est pas une fatalité : c'est un déficit de gestion des glucides. Nous calculons votre protocole d'ingestion horaire (gels, électrolytes) pour préserver votre stock de glycogène.",
    },
    {
      num: "04",
      title: "L'Affûtage Scientifique (Tapering)",
      desc: "Les 3 dernières semaines font ou défont un marathon. Mon approche scientifique calibre la baisse de volume sans perte d'intensité pour arriver le jour J avec une surcompensation maximale.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0c0c0b] text-[#f2eee4]">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataMarathon) }}
      />

      <Header />

      <main className="flex-grow pt-36 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="text-xs font-mono-tech uppercase tracking-wider text-[#888880] mb-8 flex items-center space-x-2">
            <Link href="/" className="hover:text-[#d4ff00]">Accueil</Link>
            <span>/</span>
            <span className="text-white font-bold">Prépa Marathon</span>
          </nav>

          {/* Hero Marathon */}
          <div className="max-w-4xl mb-20">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#181816] border border-[#2e2e28] text-[#d4ff00] text-xs font-mono-tech uppercase tracking-widest">
                <Flame className="w-3.5 h-3.5 text-[#ff4400]" />
                <span>DISTANCE MYTHIQUE • 42,195 KM</span>
              </span>
              <span className="font-hand text-2xl text-[#d4ff00] -rotate-2">
                Sub-3h approuvé !
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white mb-6">
              Prépa Marathon : <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#d4ff00] to-[#ff4400]">
                La Maîtrise Totale du 1er au 42ème km
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#b5b5a8] leading-relaxed max-w-3xl">
              Le marathon ne pardonne aucune approximation. Que votre objectif soit de <strong>terminer votre premier marathon</strong>, de passer la barre des <strong>3h30</strong> ou de briser la barrière mythique des <strong>3 heures</strong>, bénéficiez de l&apos;expérience d&apos;un coach coureur sous les 3h et spécialiste de la performance sur route.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact/?distance=Marathon"
                className="inline-flex items-center px-8 py-4 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider bg-[#d4ff00] text-black hover:bg-white transition-all shadow-xl shadow-[#d4ff00]/15"
              >
                Postuler pour ma prépa marathon
                <ArrowUpRight className="w-4 h-4 ml-2 stroke-[2.5]" />
              </Link>
              <a
                href="#calculateur"
                className="inline-flex items-center px-7 py-4 rounded-2xl text-xs sm:text-sm font-mono-tech uppercase tracking-wider bg-[#181816] text-white border border-[#2e2e28] hover:border-[#d4ff00] transition-all"
              >
                Estimer mon temps marathon
              </a>
            </div>
          </div>

          {/* 4 Pillars Grid with 3D Tilt */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            {marathonKeys.map((item, idx) => (
              <Tilt3DCard
                key={idx}
                maxTilt={6}
                className="bg-[#141412] border border-[#262622] rounded-3xl p-8 hover:border-[#d4ff00]/50 transition-colors shadow-2xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-black font-mono-tech text-[#ff4400]">
                    {item.num}
                  </span>
                  <span className="text-[10px] font-mono-tech uppercase text-[#888880]">PHASE CLÉ</span>
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
                RÉCIT DE COURSE MARATHON • ATHLÈTE COACHÉ
              </span>
              <p className="text-lg sm:text-2xl text-white italic font-medium my-6 leading-relaxed">
                &laquo; Deux mois plus tard, les progrès sont là : des allures qui évoluent, des séances que je n&apos;aurais pas imaginé tenir auparavant, du volume qui passe de mieux en mieux… et la sensation de ne jamais faire n&apos;importe quoi. Chaque séance a un sens et la charge est adaptée au fur et à mesure. Je cours plus vite, mais surtout mieux, avec davantage de maîtrise et de confiance. &raquo;
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#d4ff00] text-black font-black flex items-center justify-center text-sm">
                  A
                </div>
                <div>
                  <p className="text-sm font-black text-white uppercase">Antoine — Préparation Marathon</p>
                  <p className="text-xs text-[#888880] font-mono-tech">13 septembre 2026 • Accompagnement sur-mesure sur Nolio</p>
                </div>
              </div>
            </div>
          </Tilt3DCard>

          {/* Guides Blog Marathon Recommandés */}
          <div className="bg-[#181816] border border-[#d4ff00]/30 rounded-3xl p-6 sm:p-8 mb-24 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <span className="text-[11px] font-mono-tech uppercase text-[#d4ff00] font-bold">DOSSIER TECHNIQUE MARATHON</span>
              <h3 className="text-xl sm:text-2xl font-black uppercase text-white mt-1">
                Préparation Marathon Sub-3h &amp; Gestion de l&apos;Affûtage
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-mono-tech mt-1">
                Retrouvez nos protocoles complets : allure spécifique AS42 (4&apos;15/km), nutrition anti-mur et gestion des 3 dernières semaines.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
              <Link
                href="/blog/preparation-marathon-sub-3h-allure-as42/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#d4ff00] text-black px-5 py-3 rounded-full text-xs font-black uppercase tracking-wider hover:bg-white transition-colors shadow-lg"
              >
                <span>Guide Sub-3h</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/blog/affutage-marathon-tapering-3-semaines/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-colors border border-white/10"
              >
                <span>Affûtage 21j</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Pace Calculator Module */}
          <div id="calculateur" className="mb-24 scroll-mt-28">
            <PaceCalculator />
          </div>

          {/* Bottom CTA */}
          <div className="bg-[#141412] border border-[#2a2a26] rounded-3xl p-8 sm:p-14 text-center">
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white mb-3">
              Votre prochain marathon commence aujourd&apos;hui
            </h2>
            <p className="text-sm text-[#a0a095] font-mono-tech max-w-xl mx-auto mb-8">
              Une prépa marathon réussie nécessite entre 12 et 16 semaines de montée en charge progressive. Prenez contact pour sécuriser votre créneau.
            </p>
            <Link
              href="/contact/?distance=Marathon"
              className="inline-flex items-center px-8 py-4 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider bg-[#d4ff00] text-black hover:bg-white transition-all shadow-xl"
            >
              Échanger avec Vincent Buisson
              <ArrowUpRight className="w-4 h-4 ml-2 stroke-[2.5]" />
            </Link>
          </div>
        </div>
      </main>

      {/* SEO & AI FAQ Section */}
      <FAQSection
        initialCategory="10k, Semi & Marathon"
        title="Questions Fréquentes • Prépa Marathon & Mur"
        subtitle="Sorties longues, puissance lipidique, allures marathon et stratégie ravitaillement le jour J."
      />

      <Footer />
    </div>
  );
}
