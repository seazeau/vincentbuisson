import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowUpRight, Compass } from "lucide-react";
import PaceCalculator from "@/components/PaceCalculator";
import Tilt3DCard from "@/components/Tilt3DCard";
import FAQSection from "@/components/FAQSection";

export const metadata: Metadata = {
  title: "Prépa Semi-Marathon : Plan d'Entraînement & Allure Cible",
  description:
    "Plan de prépa semi-marathon sur-mesure sur Nolio. Travail au seuil, gestion du pacing et analyse de séances avec un coach pour battre votre record.",
  alternates: {
    canonical: "https://vincentbuisson.fr/coaching-semi-marathon/",
  },
  openGraph: {
    title: "Prépa Semi-Marathon : Plan d'Entraînement & Allure Cible",
    description:
      "Plan de prépa semi-marathon sur-mesure sur Nolio : travail au seuil lactique, gestion de l'allure cible AS21 et suivi continu pour battre votre record.",
    url: "https://vincentbuisson.fr/coaching-semi-marathon/",
  },
};

export default function CoachingSemiMarathonPage() {
  const structuredDataSemi = {
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
            "name": "Prépa Semi-Marathon",
            "item": "https://vincentbuisson.fr/coaching-semi-marathon/"
          }
        ]
      },
      {
        "@type": "Service",
        "name": "Prépa Semi-Marathon & Plan d'Entraînement Personnalisé",
        "serviceType": "Coaching Course à Pied Semi-Marathon",
        "provider": {
          "@type": "Person",
          "name": "Vincent Buisson",
          "url": "https://vincentbuisson.fr/"
        },
        "areaServed": "FR",
        "description": "Préparation individualisée semi-marathon sur Nolio : travail au seuil lactique, gestion de l'allure cible AS21 et suivi continu.",
        "offers": {
          "@type": "Offer",
          "price": "70.00",
          "priceCurrency": "EUR",
          "url": "https://vincentbuisson.fr/coaching-semi-marathon/"
        }
      }
    ]
  };

  const semiKeys = [
    {
      num: "01",
      title: "Le Travail au Seuil Anaérobie (SV2)",
      desc: "Le semi-marathon se court à une intensité proche du seuil critique (83-87% de VMA). Nous apprenons à votre organisme à recycler l'acide lactique à haute vitesse sans basculer dans l'acidose.",
    },
    {
      num: "02",
      title: "La Maîtrise du Pacing Négatif",
      desc: "Partir 5 secondes au kilomètre trop vite sur les 5 premiers km équivaut à perdre 1 à 2 minutes après le 15ème km. Nous ancrons votre allure cible dans votre mémoire musculaire.",
    },
    {
      num: "03",
      title: "Les Séances de Tempo Bitume",
      desc: "Des blocs continus de 3x3000m ou 2x5000m à allure spécifique avec temps de récupération courts pour simuler la fatigue musculaire de fin d'épreuve.",
    },
    {
      num: "04",
      title: "Individualisation selon Profil Vitesse / Endurance",
      desc: "Coureur plutôt 'diesel' ou profil 'vitesse' ? Le contenu de vos séances est adapté à vos points forts pour optimiser votre rentabilité énergétique.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0c0c0b] text-[#f2eee4]">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataSemi) }}
      />

      <Header />

      <main className="flex-grow pt-36 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="text-xs font-mono-tech uppercase tracking-wider text-[#888880] mb-8 flex items-center space-x-2">
            <Link href="/" className="hover:text-[#d4ff00]">Accueil</Link>
            <span>/</span>
            <span className="text-white font-bold">Prépa Semi-Marathon</span>
          </nav>

          {/* Hero Semi */}
          <div className="max-w-4xl mb-20">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#181816] border border-[#2e2e28] text-[#ff4400] text-xs font-mono-tech uppercase tracking-widest">
                <Compass className="w-3.5 h-3.5" />
                <span>TEMPO &amp; RÉSISTANCE • 21,0975 KM</span>
              </span>
              <span className="font-hand text-2xl text-[#d4ff00] -rotate-2">
                L&apos;art de la régularité
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white mb-6">
              Prépa Semi-Marathon : <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#ff4400] to-[#d4ff00]">
                L&apos;Équilibre Vitesse &amp; Endurance
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#b5b5a8] leading-relaxed max-w-3xl">
              Le semi-marathon est une distance exaltante qui récompense la rigueur. Que vous visiez <strong>moins de 2h</strong>, <strong>sub-1h45</strong>, <strong>sub-1h30</strong> ou <strong>sub-1h20</strong>, construisons un plan d&apos;entraînement scientifique qui maximise votre résistance.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact/?distance=Semi-Marathon"
                className="inline-flex items-center px-8 py-4 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider bg-[#ff4400] text-white hover:bg-white hover:text-black transition-all shadow-xl shadow-[#ff4400]/20"
              >
                Planifier mon semi-marathon
                <ArrowUpRight className="w-4 h-4 ml-2 stroke-[2.5]" />
              </Link>
              <a
                href="#calculateur"
                className="inline-flex items-center px-7 py-4 rounded-2xl text-xs sm:text-sm font-mono-tech uppercase tracking-wider bg-[#181816] text-white border border-[#2e2e28] hover:border-[#ff4400] transition-all"
              >
                Calculer mon allure semi
              </a>
            </div>
          </div>

          {/* 4 Pillars Grid with 3D Tilt */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            {semiKeys.map((item, idx) => (
              <Tilt3DCard
                key={idx}
                maxTilt={6}
                className="bg-[#141412] border border-[#262622] rounded-3xl p-8 hover:border-[#ff4400]/50 transition-colors shadow-2xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-black font-mono-tech text-[#d4ff00]">
                    {item.num}
                  </span>
                  <span className="text-[10px] font-mono-tech uppercase text-[#888880]">FOCUS CLÉ</span>
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
                RÉCIT DE COURSE SEMI-MARATHON • ATHLÈTE COACHÉ
              </span>
              <p className="text-lg sm:text-2xl text-white italic font-medium my-6 leading-relaxed">
                &laquo; Vincent est très professionnel et disponible. Les séances sont très bien structurées et adaptées à notre niveau et à nos objectifs. Je suis passé de 1h41 à 1h30 sur semi, je recommande à 100% ! &raquo;
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#d4ff00] text-black font-black flex items-center justify-center text-sm">
                  L
                </div>
                <div>
                  <p className="text-sm font-black text-white uppercase">Léo M. — 1h41 ➔ 1h30 sur semi</p>
                  <p className="text-xs text-[#888880] font-mono-tech">13 janvier 2026 • Progression de 11 minutes sur semi</p>
                </div>
              </div>
            </div>
          </Tilt3DCard>

          {/* Guide Blog Recommandé */}
          <div className="bg-[#181816] border border-[#d4ff00]/30 rounded-3xl p-6 sm:p-8 mb-24 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <span className="text-[11px] font-mono-tech uppercase text-[#d4ff00] font-bold">GUIDE STRATÉGIQUE 21,1 KM</span>
              <h3 className="text-xl sm:text-2xl font-black uppercase text-white mt-1">
                Comment Définir et Tenir son Allure Cible le Jour J
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-mono-tech mt-1">
                Pacing au kilomètre, fractionné au seuil et ravitaillements pour éviter l&apos;explosion au 16ème km.
              </p>
            </div>
            <Link
              href="/blog/allure-cible-semi-marathon-pacing/"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-[#d4ff00] text-black px-5 py-3 rounded-full text-xs font-black uppercase tracking-wider hover:bg-white transition-colors shadow-lg"
            >
              <span>Lire le guide Semi</span>
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
              Un cycle de 10 à 12 semaines pour exploser votre RP sur semi
            </h2>
            <p className="text-sm text-[#a0a095] font-mono-tech max-w-xl mx-auto mb-8">
              Bénéficiez d&apos;un diagnostic précis et d&apos;ajustements continus sur Nolio selon votre progression réelle.
            </p>
            <Link
              href="/contact/?distance=Semi-Marathon"
              className="inline-flex items-center px-8 py-4 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider bg-[#d4ff00] text-black hover:bg-white transition-all shadow-xl"
            >
              Démarrer ma prépa semi avec Vincent
              <ArrowUpRight className="w-4 h-4 ml-2 stroke-[2.5]" />
            </Link>
          </div>
        </div>
      </main>

      {/* SEO & AI FAQ Section */}
      <FAQSection
        initialCategory="10k, Semi & Marathon"
        title="Questions Fréquentes • Prépa Semi-Marathon"
        subtitle="Tout savoir sur le seuil aérobie (SV1), les allures cibles et la gestion de course sur 21,1 km."
      />

      <Footer />
    </div>
  );
}
