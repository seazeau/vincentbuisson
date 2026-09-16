import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowUpRight, BookOpen, GraduationCap, Check } from "lucide-react";
import NolioShowcase from "@/components/NolioShowcase";
import Tilt3DCard from "@/components/Tilt3DCard";
import FAQSection from "@/components/FAQSection";

export const metadata: Metadata = {
  title: "Méthode d'Entraînement Course à Pied & Suivi sur Nolio",
  description:
    "Découvrez notre méthode d'entraînement running : physiologie de l'effort, gestion de la charge et pilotage dynamique individualisé sur l'app Nolio.",
  alternates: {
    canonical: "https://vincentbuisson.fr/methode/",
  },
  openGraph: {
    title: "Méthode d'Entraînement Course à Pied & Suivi sur Nolio",
    description:
      "L'alliance de la science de l'entraînement et de la réalité du terrain pour progresser durablement en course à pied.",
    url: "https://vincentbuisson.fr/methode/",
  },
};

export default function MethodePage() {
  const structuredDataMethode = {
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
            "name": "Méthode & Nolio",
            "item": "https://vincentbuisson.fr/methode/"
          }
        ]
      },
      {
        "@type": "HowTo",
        "name": "Protocole d'Entraînement Scientifique en Course à Pied",
        "description": "Méthodologie en 4 étapes pour progresser durablement en course à pied grâce à la physiologie et au suivi Nolio.",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Bilan Initial & Diagnostic Physiologique",
            "text": "Analyse de l'historique du coureur, des chronos passés, du profil d'endurance et des contraintes personnelles."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Planification Personnalisée sur Nolio",
            "text": "Programmation des blocs d'entraînement synchronisés directement sur montre GPS Garmin, Coros, Suunto ou Apple Watch."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Analyse Métrique & Retour Subjectif (RPE)",
            "text": "Débriefing hebdomadaire des allures, de la fréquence cardiaque et des ressentis d'effort."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Validation par des Courses Repères",
            "text": "Tests sous dossard en conditions réelles avant l'objectif principal."
          }
        ]
      }
    ]
  };

  const steps = [
    {
      num: "01",
      title: "Bilan Initial & Diagnostic Physiologique",
      desc: "Nous analysons votre historique de coureur, vos records, votre volume passé, vos blessures, ainsi que vos contraintes professionnelles et familiales.",
    },
    {
      num: "02",
      title: "Planification Personnalisée sur Nolio",
      desc: "Construction des blocs d'entraînement (développement général, spécifique, affûtage) directement programmés sur Nolio et synchronisés sur votre montre GPS.",
    },
    {
      num: "03",
      title: "Analyse Métrique & Retour Subjectif (RPE)",
      desc: "Après chaque sortie, j'analyse vos données (allure, FC, puissance Stryd, dérive) et je lis attentivement vos ressentis. L'échange régulier est au cœur de ma démarche.",
    },
    {
      num: "04",
      title: "Validation par des Courses Repères",
      desc: "Avant l'objectif final, nous programmons des courses intermédiaires repères pour valider vos allures cibles sous dossard en conditions réelles.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0c0c0b] text-[#f2eee4]">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataMethode) }}
      />

      <Header />

      <main className="flex-grow pt-36 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="text-xs font-mono-tech uppercase tracking-wider text-[#888880] mb-8 flex items-center space-x-2">
            <Link href="/" className="hover:text-[#d4ff00]">Accueil</Link>
            <span>/</span>
            <span className="text-white font-bold">Méthode &amp; Nolio</span>
          </nav>

          {/* Hero Methode */}
          <div className="max-w-4xl mb-20">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#181816] border border-[#2e2e28] text-[#d4ff00] text-xs font-mono-tech uppercase tracking-widest">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>SCIENCE &amp; BITUME</span>
              </span>
              <span className="font-hand text-2xl text-[#d4ff00] -rotate-2">
                100% individualisé !
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white mb-6">
              L&apos;Approche Méthodique : <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#d4ff00] to-[#ff4400]">
                Quand la Science Rencontre le Goudron
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#b5b5a8] leading-relaxed max-w-3xl">
              Courir plus vite ne signifie pas courir plus à l&apos;aveugle. Mon approche repose sur les lois fondamentales de la <strong>physiologie de l&apos;effort</strong> et de la <strong>surcompensation</strong>, adaptées aux réalités de la vie active grâce à l&apos;écosystème <strong>Nolio</strong>.
            </p>
          </div>

          {/* Detailed Content: Science & Pédagogie */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
            <Tilt3DCard maxTilt={6} className="bg-[#141412] border border-[#262622] rounded-3xl p-8 sm:p-10 shadow-2xl">
              <div className="w-12 h-12 rounded-2xl bg-[#d4ff00] text-black font-black flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4">
                La Rigueur Scientifique &amp; Physiologique
              </h3>
              <p className="text-xs sm:text-sm text-[#a0a095] leading-relaxed mb-6">
                Formé aux sciences du sport et à la physiologie, je ne conçois pas l&apos;entraînement comme une suite d&apos;exercices au hasard.
              </p>
              <ul className="space-y-4 text-xs sm:text-sm text-[#d6d6cb]">
                <li className="flex items-start">
                  <div className="w-4 h-4 rounded-full bg-[#d4ff00] text-black flex items-center justify-center shrink-0 mt-0.5 mr-3 font-bold">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span><strong>Gestion de la charge de travail (ACWR) :</strong> prévention mathématique des pics de fatigue pour couper court au risque de blessure.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-4 h-4 rounded-full bg-[#d4ff00] text-black flex items-center justify-center shrink-0 mt-0.5 mr-3 font-bold">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span><strong>Respect des filières énergétiques :</strong> pas de travail au seuil trop précoce, consolidation du socle aérobie indispensable.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-4 h-4 rounded-full bg-[#d4ff00] text-black flex items-center justify-center shrink-0 mt-0.5 mr-3 font-bold">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span><strong>Périodisation ondulatoire :</strong> alternance calculée de semaines de charge et d&apos;assimilation pour forcer la surcompensation.</span>
                </li>
              </ul>
            </Tilt3DCard>

            <Tilt3DCard maxTilt={6} className="bg-[#141412] border border-[#262622] rounded-3xl p-8 sm:p-10 shadow-2xl">
              <div className="w-12 h-12 rounded-2xl bg-[#ff4400] text-white font-black flex items-center justify-center mb-6">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4">
                La Pédagogie &amp; L&apos;Écoute de l&apos;Entraîneur
              </h3>
              <p className="text-xs sm:text-sm text-[#a0a095] leading-relaxed mb-6">
                En tant que coach passionné, mon rôle ne s&apos;arrête pas à distribuer des chiffres : il réside dans l&apos;écoute, l&apos;explication et la motivation.
              </p>
              <ul className="space-y-4 text-xs sm:text-sm text-[#d6d6cb]">
                <li className="flex items-start">
                  <div className="w-4 h-4 rounded-full bg-[#ff4400] text-white flex items-center justify-center shrink-0 mt-0.5 mr-3 font-bold">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span><strong>Donner du sens à chaque séance :</strong> vous comprenez exactement pourquoi vous courez à telle allure et quel bénéfice vous en tirez.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-4 h-4 rounded-full bg-[#ff4400] text-white flex items-center justify-center shrink-0 mt-0.5 mr-3 font-bold">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span><strong>Dédramatiser les imprévus :</strong> une séance manquée à cause du travail ou des enfants est une variable intégrée intelligemment.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-4 h-4 rounded-full bg-[#ff4400] text-white flex items-center justify-center shrink-0 mt-0.5 mr-3 font-bold">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span><strong>Développer votre autonomie :</strong> vous apprenez à ressentir vos allures, à écouter votre corps et à gérer votre stratégie de course.</span>
                </li>
              </ul>
            </Tilt3DCard>
          </div>

          {/* 4 Steps Journey */}
          <div className="mb-24">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-mono-tech uppercase tracking-widest text-[#d4ff00]">
                PROCESSUS D&apos;ACCOMPAGNEMENT
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mt-2">
                Comment Nous Construisons Votre Pic de Forme
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, idx) => (
                <Tilt3DCard
                  key={idx}
                  maxTilt={8}
                  className="bg-[#141412] border border-[#262622] rounded-3xl p-6 relative hover:border-[#d4ff00]/50 transition-colors shadow-xl"
                >
                  <span className="text-4xl font-black font-mono-tech text-[#ff4400]">
                    {step.num}
                  </span>
                  <h4 className="text-base font-black text-white uppercase tracking-tight mt-3 mb-2">
                    {step.title}
                  </h4>
                  <p className="text-xs text-[#a0a095] leading-relaxed font-mono-tech">{step.desc}</p>
                </Tilt3DCard>
              ))}
            </div>
          </div>

          {/* Nolio Showcase */}
          <div id="nolio" className="mb-24">
            <NolioShowcase />
          </div>

          {/* Bottom CTA */}
          <div className="bg-[#141412] border border-[#2a2a26] rounded-3xl p-8 sm:p-14 text-center">
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white mb-3">
              Envie d&apos;expérimenter une méthode structurée ?
            </h2>
            <p className="text-sm text-[#a0a095] font-mono-tech max-w-xl mx-auto mb-8">
              Rejoignez les athlètes qui ont choisi d&apos;arrêter d&apos;improviser pour enfin atteindre leur plein potentiel sur bitume.
            </p>
            <Link
              href="/contact/"
              className="inline-flex items-center px-8 py-4 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider bg-[#d4ff00] text-black hover:bg-white transition-all shadow-xl"
            >
              Postuler au coaching individualisé
              <ArrowUpRight className="w-4 h-4 ml-2 stroke-[2.5]" />
            </Link>
          </div>
        </div>
      </main>

      {/* SEO & AI FAQ Section */}
      <FAQSection
        initialCategory="Méthode & Science"
        title="Questions Fréquentes • Méthodologie & Physiologie"
        subtitle="Rigueur scientifique, gestion des seuils lactiques, VMA et individualisation sur Nolio."
      />

      <Footer />
    </div>
  );
}
