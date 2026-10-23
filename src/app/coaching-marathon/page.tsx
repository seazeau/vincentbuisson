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

          {/* Tableau SEO des Allures Cibles Marathon (42,195 km) */}
          <div className="bg-[#141412] border border-[#2a2a26] rounded-3xl p-6 sm:p-10 mb-20 overflow-hidden shadow-2xl">
            <div className="mb-6">
              <span className="text-xs font-mono-tech uppercase tracking-widest text-[#d4ff00]">
                REPÈRES CHRONOMÉTRIQUES &amp; PASSAGES 42,195 KM
              </span>
              <h2 className="text-2xl sm:text-4xl font-black uppercase text-white mt-1">
                Tableau des Allures Marathon (Sub-4h, 3h45, 3h30, 3h15, Sub-3h)
              </h2>
              <p className="text-xs sm:text-sm text-[#a0a095] font-mono-tech mt-2 max-w-3xl">
                Repères d&apos;allure spécifique marathon (AS42), temps de passage au semi-marathon et sorties longues types sur Nolio :
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono-tech text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-white/15 text-[#d4ff00] uppercase text-[11px]">
                    <th className="py-3.5 px-4">Objectif Marathon</th>
                    <th className="py-3.5 px-4">Allure Cible (AS42)</th>
                    <th className="py-3.5 px-4">Vitesse</th>
                    <th className="py-3.5 px-4">Passage au Semi</th>
                    <th className="py-3.5 px-4">Sortie Longue Spécifique</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-neutral-300">
                  <tr className="hover:bg-white/[0.02]">
                    <td className="py-3.5 px-4 font-black text-white">Sub-4h00</td>
                    <td className="py-3.5 px-4 text-[#d4ff00] font-bold">5&apos;41&quot; /km</td>
                    <td className="py-3.5 px-4">10,55 km/h</td>
                    <td className="py-3.5 px-4">1h59&apos;50&quot;</td>
                    <td className="py-3.5 px-4">2h15 dont 2 × 25&apos; à 5&apos;40/km</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="py-3.5 px-4 font-black text-white">Sub-3h45</td>
                    <td className="py-3.5 px-4 text-[#d4ff00] font-bold">5&apos;19&quot; /km</td>
                    <td className="py-3.5 px-4">11,25 km/h</td>
                    <td className="py-3.5 px-4">1h52&apos;20&quot;</td>
                    <td className="py-3.5 px-4">2h20 dont 3 × 4000m à 5&apos;19/km</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="py-3.5 px-4 font-black text-white">Sub-3h30</td>
                    <td className="py-3.5 px-4 text-[#d4ff00] font-bold">4&apos;58&quot; /km</td>
                    <td className="py-3.5 px-4">12,06 km/h</td>
                    <td className="py-3.5 px-4">1h44&apos;55&quot;</td>
                    <td className="py-3.5 px-4">28 km dont 3 × 5000m à 4&apos;58/km</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="py-3.5 px-4 font-black text-white">Sub-3h15</td>
                    <td className="py-3.5 px-4 text-[#d4ff00] font-bold">4&apos;37&quot; /km</td>
                    <td className="py-3.5 px-4">12,98 km/h</td>
                    <td className="py-3.5 px-4">1h37&apos;25&quot;</td>
                    <td className="py-3.5 px-4">30 km dont 2 × 7000m à 4&apos;37/km</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="py-3.5 px-4 font-black text-white">Sub-3h00</td>
                    <td className="py-3.5 px-4 text-[#d4ff00] font-bold">4&apos;15&quot; /km</td>
                    <td className="py-3.5 px-4">14,07 km/h</td>
                    <td className="py-3.5 px-4">1h29&apos;50&quot;</td>
                    <td className="py-3.5 px-4">32 km dont 3 × 6000m à 4&apos;15/km</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 3 Guides Techniques Marathon Recommandés */}
          <div className="mb-24">
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-white mb-6">
              Nos Dossiers Complets pour Réussir votre Marathon
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                href="/blog/marathon-en-3h30-allure-plan-entrainement/"
                className="bg-[#181816] border border-[#d4ff00]/30 hover:border-[#d4ff00] rounded-3xl p-6 flex flex-col justify-between transition-all group"
              >
                <div>
                  <span className="text-[10px] font-mono-tech uppercase text-[#d4ff00] font-bold">ALLURE 4&apos;58/KM</span>
                  <h3 className="text-lg font-black uppercase text-white mt-1 group-hover:text-[#d4ff00] transition-colors">
                    Marathon en 3h30 : Allure, Plan d&apos;Entraînement &amp; Sorties Longues
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono-tech mt-2">
                    Passer sous la barre des 5&apos;00/km sur 42,195 km : volume hebdo, séances AS42 et nutrition anti-mur.
                  </p>
                </div>
                <span className="text-xs font-mono-tech font-bold text-white mt-4 inline-flex items-center gap-1">
                  Lire le guide Marathon 3h30 <ArrowUpRight className="w-3.5 h-3.5 text-[#d4ff00]" />
                </span>
              </Link>

              <Link
                href="/blog/preparation-marathon-sub-3h-allure-as42/"
                className="bg-[#181816] border border-white/10 hover:border-[#d4ff00] rounded-3xl p-6 flex flex-col justify-between transition-all group"
              >
                <div>
                  <span className="text-[10px] font-mono-tech uppercase text-[#d4ff00] font-bold">ALLURE 4&apos;15/KM</span>
                  <h3 className="text-lg font-black uppercase text-white mt-1 group-hover:text-[#d4ff00] transition-colors">
                    Prépa Marathon Sub-3h : Allure AS42, Séances Clés &amp; Pacing
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono-tech mt-2">
                    Les prérequis physiologiques (sub-1h25 au semi), sorties longues spécifiques et glucides/heure.
                  </p>
                </div>
                <span className="text-xs font-mono-tech font-bold text-white mt-4 inline-flex items-center gap-1">
                  Lire le guide Sub-3h <ArrowUpRight className="w-3.5 h-3.5 text-[#d4ff00]" />
                </span>
              </Link>

              <Link
                href="/blog/preparation-marathon-de-paris-2026-parcours-allures-plan/"
                className="bg-[#181816] border border-white/10 hover:border-[#d4ff00] rounded-3xl p-6 flex flex-col justify-between transition-all group"
              >
                <div>
                  <span className="text-[10px] font-mono-tech uppercase text-[#d4ff00] font-bold">PARCOURS &amp; STRATÉGIE</span>
                  <h3 className="text-lg font-black uppercase text-white mt-1 group-hover:text-[#d4ff00] transition-colors">
                    Préparation Marathon de Paris : Analyse du Parcours &amp; Plan
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono-tech mt-2">
                    Gérer le faux-plat de Bastille, les tunnels des quais et la relance du Bois de Boulogne.
                  </p>
                </div>
                <span className="text-xs font-mono-tech font-bold text-white mt-4 inline-flex items-center gap-1">
                  Lire le guide Marathon de Paris <ArrowUpRight className="w-3.5 h-3.5 text-[#d4ff00]" />
                </span>
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
