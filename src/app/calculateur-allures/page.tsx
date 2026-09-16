import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Calculator, ArrowUpRight, Gauge, Zap, HelpCircle, ChevronDown, Trophy, Timer } from "lucide-react";
import PaceCalculator from "@/components/PaceCalculator";
import Tilt3DCard from "@/components/Tilt3DCard";

export const metadata: Metadata = {
  title: "Calculateur d'Allures Course à Pied : 5k, 10k, Semi, Marathon",
  description:
    "Calculez gratuitement vos allures de course : EF, seuil, 10 km, semi et marathon selon votre VMA ou chrono récent. Table d'allures et temps prédictifs.",
  alternates: {
    canonical: "https://vincentbuisson.fr/calculateur-allures/",
  },
  openGraph: {
    title: "Calculateur d'Allures Course à Pied : 5k, 10k, Semi, Marathon",
    description:
      "Outil interactif de calcul d'allures et de temps prédictifs sur 10 km, semi et marathon.",
    url: "https://vincentbuisson.fr/calculateur-allures/",
  },
};

export default function CalculateurPage() {
  const structuredDataCalc = {
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
            "name": "Calculateur d'allures",
            "item": "https://vincentbuisson.fr/calculateur-allures/"
          }
        ]
      },
      {
        "@type": "WebApplication",
        "name": "Calculateur d'Allures & Équivalences Course à Pied (Pete Riegel)",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "All",
        "url": "https://vincentbuisson.fr/calculateur-allures/",
        "description": "Calculateur gratuit d'allures de course à pied et d'équivalences de temps sur 5 km, 10 km, semi-marathon et marathon fondé sur la formule de Pete Riegel.",
        "offers": {
          "@type": "Offer",
          "price": "0.00",
          "priceCurrency": "EUR"
        },
        "author": {
          "@type": "Person",
          "name": "Vincent Buisson",
          "url": "https://vincentbuisson.fr/"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Comment calculer son allure marathon à partir de sa VMA ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "En règle générale, un marathon se court entre 73 % et 80 % de sa VMA selon son indice d'endurance. Pour un coureur avec une VMA de 16 km/h, l'allure marathon se situe entre 11,8 km/h (5'05/km, soit ~3h34) et 12,5 km/h (4'48/km, soit ~3h22). Un plan individualisé sur Nolio permet d'ajuster précisément ce pourcentage sans risquer le mur."
            }
          },
          {
            "@type": "Question",
            "name": "Quelle allure pour courir un marathon en moins de 3h30 ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Pour franchir un marathon en 3h30, l'allure cible exacte est de 4'58 par kilomètre (12,06 km/h). Vos temps de passage clés sont : 24'50 au 5 km, 49'40 au 10 km, 1h44'55 au semi-marathon et 2h29'00 au 30ème kilomètre."
            }
          },
          {
            "@type": "Question",
            "name": "Quelle VMA faut-il pour courir le 10 km en moins de 40 minutes ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Pour courir le 10 km en moins de 40 minutes (allure requise : 3'59/km ou 15,06 km/h), une VMA comprise entre 16,5 km/h et 17,5 km/h est généralement nécessaire, avec un soutien solide au seuil anaérobie (SV2)."
            }
          },
          {
            "@type": "Question",
            "name": "Quelle est la différence entre Endurance Fondamentale (EF) et Allure Marathon (AS42) ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "L'Endurance Fondamentale (Zone 2) se court entre 65 % et 75 % FCM en aisance respiratoire totale pour développer la machinerie mitochondriale et brûler les graisses. L'Allure Spécifique Marathon (AS42) est plus rapide (75 % à 85 % FCM) et prépare l'organisme à économiser le glycogène à l'allure cible."
            }
          }
        ]
      }
    ]
  };

  const paceTable = [
    { vma: "12 km/h", ef: "7'20 /km", dixk: "5'35 /km (56'00)", semi: "5'55 /km (2h05)", mara: "6'25 /km (4h30)" },
    { vma: "13 km/h", ef: "6'50 /km", dixk: "5'10 /km (51'40)", semi: "5'30 /km (1h56)", mara: "5'55 /km (4h10)" },
    { vma: "14 km/h", ef: "6'25 /km", dixk: "4'50 /km (48'20)", semi: "5'05 /km (1h47)", mara: "5'30 /km (3h52)" },
    { vma: "15 km/h", ef: "6'00 /km", dixk: "4'30 /km (45'00)", semi: "4'45 /km (1h40)", mara: "5'07 /km (3h36)" },
    { vma: "16 km/h", ef: "5'35 /km", dixk: "4'13 /km (42'10)", semi: "4'28 /km (1h34)", mara: "4'48 /km (3h22)" },
    { vma: "17 km/h", ef: "5'15 /km", dixk: "3'58 /km (39'40)", semi: "4'12 /km (1h28)", mara: "4'30 /km (3h10)" },
    { vma: "18 km/h", ef: "4'55 /km", dixk: "3'44 /km (37'20)", semi: "3'58 /km (1h23)", mara: "4'15 /km (2h59)" },
    { vma: "19 km/h", ef: "4'40 /km", dixk: "3'32 /km (35'20)", semi: "3'45 /km (1h19)", mara: "4'02 /km (2h50)" },
  ];

  const marathonPacingTable = [
    { target: "Sub-2h45", pace: "3'55 /km", speed: "15,34 km/h", k5: "19'33", k10: "39'06", semi: "1h22'30", k30: "1h57'18" },
    { target: "Sub-3h00", pace: "4'15 /km", speed: "14,12 km/h", k5: "21'15", k10: "42'30", semi: "1h29'45", k30: "2h07'30" },
    { target: "Sub-3h15", pace: "4'37 /km", speed: "12,98 km/h", k5: "23'05", k10: "46'10", semi: "1h37'25", k30: "2h18'30" },
    { target: "Sub-3h30", pace: "4'58 /km", speed: "12,06 km/h", k5: "24'50", k10: "49'40", semi: "1h44'55", k30: "2h29'00" },
    { target: "Sub-3h45", pace: "5'20 /km", speed: "11,25 km/h", k5: "26'40", k10: "53'20", semi: "1h52'30", k30: "2h40'00" },
    { target: "Sub-4h00", pace: "5'41 /km", speed: "10,55 km/h", k5: "28'25", k10: "56'50", semi: "1h59'55", k30: "2h50'30" },
    { target: "Sub-4h15", pace: "6'02 /km", speed: "9,93 km/h", k5: "30'10", k10: "1h00'20", semi: "2h07'20", k30: "3h01'00" },
    { target: "Sub-4h30", pace: "6'24 /km", speed: "9,38 km/h", k5: "32'00", k10: "1h04'00", semi: "2h15'00", k30: "3h12'00" },
  ];

  const semiDixkTable = [
    { label: "10 km Sub-35'", pace: "3'30 /km", speed: "17,14 km/h", semiEquiv: "1h17'15", maraEquiv: "2h44'00" },
    { label: "10 km Sub-40'", pace: "4'00 /km", speed: "15,00 km/h", semiEquiv: "1h28'15", maraEquiv: "3h07'30" },
    { label: "10 km Sub-45'", pace: "4'30 /km", speed: "13,33 km/h", semiEquiv: "1h39'20", maraEquiv: "3h31'00" },
    { label: "10 km Sub-50'", pace: "5'00 /km", speed: "12,00 km/h", semiEquiv: "1h50'20", maraEquiv: "3h54'30" },
    { label: "10 km Sub-55'", pace: "5'30 /km", speed: "10,91 km/h", semiEquiv: "2h01'25", maraEquiv: "4h18'00" },
    { label: "Semi Sub-1h25", pace: "4'01 /km", speed: "14,89 km/h", semiEquiv: "1h24'40", maraEquiv: "3h00'00" },
    { label: "Semi Sub-1h30", pace: "4'15 /km", speed: "14,07 km/h", semiEquiv: "1h29'45", maraEquiv: "3h10'00" },
    { label: "Semi Sub-1h45", pace: "4'58 /km", speed: "12,06 km/h", semiEquiv: "1h44'50", maraEquiv: "3h42'00" },
    { label: "Semi Sub-2h00", pace: "5'41 /km", speed: "10,55 km/h", semiEquiv: "1h59'50", maraEquiv: "4h15'00" },
  ];

  const faqsCalculateur = [
    {
      q: "Comment calculer mon allure marathon à partir de ma VMA ?",
      a: "En règle générale, un marathon se court entre 73 % et 80 % de sa VMA selon son indice d'endurance. Pour un coureur ayant une VMA de 16 km/h, l'allure marathon se situe entre 11,8 km/h (5'05/km, soit ~3h34) et 12,5 km/h (4'48/km, soit ~3h22). Un test de terrain et un plan individualisé sur Nolio permettent d'affiner précisément ce pourcentage sans risquer le mur."
    },
    {
      q: "Quelle allure dois-je tenir pour courir un marathon en moins de 3h30 ?",
      a: "Pour franchir la ligne d'un marathon en moins de 3h30, l'allure cible exacte est de 4'58 par kilomètre (soit 12,06 km/h). Vos temps de passage repères sont : 24'50 au 5 km, 49'40 au 10 km, 1h44'55 au semi-marathon (21,1 km) et 2h29'00 au 30ème kilomètre."
    },
    {
      q: "Quelle VMA faut-il pour passer sous la barre des 40 minutes au 10 km ?",
      a: "Pour courir 10 km en moins de 40 minutes (allure requise : 3'59/km ou 15,06 km/h), une VMA comprise entre 16,5 km/h et 17,5 km/h est généralement nécessaire, avec la capacité de soutenir 88 % à 90 % de sa VMA pendant 40 minutes grâce à un solide soutien au seuil anaérobie (SV2)."
    },
    {
      q: "Quelle est la différence entre l'Endurance Fondamentale (EF) et l'Allure Marathon (AS42) ?",
      a: "L'Endurance Fondamentale (Zone 2) se court entre 65 % et 75 % de sa Fréquence Cardiaque Maximale (FCM) ou 60 % à 70 % de la VMA en aisance respiratoire absolue pour développer la machinerie mitochondriale et brûler les graisses. L'Allure Spécifique Marathon (AS42) est plus exigeante (75 % à 85 % FCM) et entraîne l'organisme à économiser le glycogène musculaire à l'allure exacte du jour J."
    },
    {
      q: "Pourquoi la formule mathématique de Pete Riegel ne suffit-elle pas ?",
      a: "La formule de Pete Riegel [T2 = T1 * (D2/D1)^1.06] applique un coefficient moyen statistique. Elle ne prend en compte ni votre dérive cardiaque avec la chaleur, ni le profil d'une course (comme les faux-plats et tunnels du Marathon de Paris), ni votre tolérance aux ravitaillements. Rien ne remplace un débriefing régulier avec un coach."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0c0c0b] text-[#f2eee4]">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataCalc) }}
      />

      <Header />

      <main className="flex-grow pt-36 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="text-xs font-mono-tech uppercase tracking-wider text-[#888880] mb-8 flex items-center space-x-2">
            <Link href="/" className="hover:text-[#d4ff00]">Accueil</Link>
            <span>/</span>
            <span className="text-white font-bold">Calculateur d&apos;allures</span>
          </nav>

          {/* Intro */}
          <div className="max-w-3xl mb-14">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#181816] border border-[#2e2e28] text-[#d4ff00] text-xs font-mono-tech uppercase tracking-widest">
                <Calculator className="w-3.5 h-3.5" />
                <span>OUTIL SCIENTIFIQUE GRATUIT</span>
              </span>
              <span className="font-hand text-2xl text-[#d4ff00] -rotate-2">
                Étalonnez vos allures
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-4">
              Calculateur d&apos;Allures &amp; Prévisions de Course
            </h1>
            <p className="text-sm sm:text-base text-[#b5b5a8] leading-relaxed">
              Déterminez vos allures de travail physiologiques (Endurance Fondamentale, Allure 10 km, Allure Semi et Allure Marathon) et anticipez vos temps cibles à partir de votre VMA.
            </p>
          </div>

          {/* Interactive Tool */}
          <div className="mb-24">
            <PaceCalculator />
          </div>

          {/* Pace Reference Table */}
          <div className="mb-24">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                Tableau de Correspondance Rapide
              </h2>
              <p className="text-xs font-mono-tech text-[#888880] uppercase mt-2">
                Allures indicatives et temps cibles moyens selon le niveau de VMA
              </p>
            </div>

            <div className="bg-[#141412] border border-[#262622] rounded-3xl overflow-x-auto shadow-2xl">
              <table className="w-full text-left text-xs sm:text-sm font-mono-tech">
                <thead className="bg-[#1a1a17] text-[#888880] uppercase text-[11px] font-bold border-b border-[#262622]">
                  <tr>
                    <th className="py-4 px-4 sm:px-6">VMA</th>
                    <th className="py-4 px-4 sm:px-6">Endurance Fond.</th>
                    <th className="py-4 px-4 sm:px-6">10 km</th>
                    <th className="py-4 px-4 sm:px-6">Semi-Marathon</th>
                    <th className="py-4 px-4 sm:px-6">Marathon</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#22221e] text-[#cfcfc4]">
                  {paceTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#1a1a17] transition-colors">
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-[#d4ff00]">{row.vma}</td>
                      <td className="py-3.5 px-4 sm:px-6">{row.ef}</td>
                      <td className="py-3.5 px-4 sm:px-6 text-white">{row.dixk}</td>
                      <td className="py-3.5 px-4 sm:px-6 text-[#ff4400]">{row.semi}</td>
                      <td className="py-3.5 px-4 sm:px-6 text-[#d4ff00]">{row.mara}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Marathon Pacing & Target Times Table (Position Zéro Google) */}
          <div className="mb-24">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4ff00]/10 border border-[#d4ff00]/30 text-[#d4ff00] text-[11px] font-mono-tech uppercase font-bold tracking-widest mb-3">
                <Trophy className="w-3.5 h-3.5" />
                <span>RÉFÉRENTIEL OFFICIEL ALLURES CIBLES</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                Tableau de Pacing Marathon (Sub-2h45 à Sub-4h30)
              </h2>
              <p className="text-xs font-mono-tech text-[#888880] uppercase mt-2">
                Allures au kilomètre, vitesses et temps de passage intermédiaires aux 5 km, 10 km, Semi et 30 km
              </p>
            </div>

            <div className="bg-[#141412] border border-[#262622] rounded-3xl overflow-x-auto shadow-2xl mb-12">
              <table className="w-full text-left text-xs sm:text-sm font-mono-tech">
                <thead className="bg-[#1a1a17] text-[#888880] uppercase text-[11px] font-bold border-b border-[#262622]">
                  <tr>
                    <th className="py-4 px-4 sm:px-6 text-white">Chrono Cible</th>
                    <th className="py-4 px-4 sm:px-6 text-[#d4ff00]">Allure min/km</th>
                    <th className="py-4 px-4 sm:px-6">Vitesse</th>
                    <th className="py-4 px-4 sm:px-6">Passage 5 km</th>
                    <th className="py-4 px-4 sm:px-6">Passage 10 km</th>
                    <th className="py-4 px-4 sm:px-6 text-[#ff4400]">Semi (21,1k)</th>
                    <th className="py-4 px-4 sm:px-6 text-neutral-300">Passage 30 km</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#22221e] text-[#cfcfc4]">
                  {marathonPacingTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#1a1a17] transition-colors">
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-white flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d4ff00]"></span>
                        {row.target}
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-[#d4ff00]">{row.pace}</td>
                      <td className="py-3.5 px-4 sm:px-6 text-neutral-300">{row.speed}</td>
                      <td className="py-3.5 px-4 sm:px-6 text-neutral-400">{row.k5}</td>
                      <td className="py-3.5 px-4 sm:px-6 text-neutral-300">{row.k10}</td>
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-[#ff4400]">{row.semi}</td>
                      <td className="py-3.5 px-4 sm:px-6 font-mono-tech text-white">{row.k30}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Semi & 10 km Pacing Table */}
            <div className="text-center max-w-3xl mx-auto mb-10 pt-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-neutral-300 text-[11px] font-mono-tech uppercase font-bold tracking-widest mb-3">
                <Timer className="w-3.5 h-3.5 text-[#ff4400]" />
                <span>ÉQUIVALENCES 10 KM &amp; SEMI-MARATHON</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                Tableau des Allures 10 km &amp; Semi-Marathon
              </h3>
            </div>

            <div className="bg-[#141412] border border-[#262622] rounded-3xl overflow-x-auto shadow-2xl">
              <table className="w-full text-left text-xs sm:text-sm font-mono-tech">
                <thead className="bg-[#1a1a17] text-[#888880] uppercase text-[11px] font-bold border-b border-[#262622]">
                  <tr>
                    <th className="py-4 px-4 sm:px-6 text-white">Objectif Course</th>
                    <th className="py-4 px-4 sm:px-6 text-[#d4ff00]">Allure Requise</th>
                    <th className="py-4 px-4 sm:px-6">Vitesse (km/h)</th>
                    <th className="py-4 px-4 sm:px-6 text-[#ff4400]">Équivalence Semi</th>
                    <th className="py-4 px-4 sm:px-6 text-[#d4ff00]">Équivalence Marathon</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#22221e] text-[#cfcfc4]">
                  {semiDixkTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#1a1a17] transition-colors">
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-white">{row.label}</td>
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-[#d4ff00]">{row.pace}</td>
                      <td className="py-3.5 px-4 sm:px-6 text-neutral-300">{row.speed}</td>
                      <td className="py-3.5 px-4 sm:px-6 text-[#ff4400]">{row.semiEquiv}</td>
                      <td className="py-3.5 px-4 sm:px-6 text-[#d4ff00]">{row.maraEquiv}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Educational Explanations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            <Tilt3DCard maxTilt={6} className="bg-[#141412] border border-[#262622] rounded-3xl p-8 shadow-xl">
              <h3 className="text-xl font-black text-white uppercase mb-3 flex items-center gap-2">
                <Gauge className="w-5 h-5 text-[#d4ff00]" />
                Qu&apos;est-ce que la VMA ?
              </h3>
              <p className="text-xs sm:text-sm text-[#a0a095] leading-relaxed">
                La Vitesse Maximale Aérobie (VMA) est la vitesse de course à laquelle votre consommation d&apos;oxygène atteint son maximum. Elle peut être maintenue entre 4 et 7 minutes et sert de base pour étalonner toutes vos allures d&apos;entraînement.
              </p>
            </Tilt3DCard>

            <Tilt3DCard maxTilt={6} className="bg-[#141412] border border-[#262622] rounded-3xl p-8 shadow-xl">
              <h3 className="text-xl font-black text-white uppercase mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#ff4400]" />
                Pourquoi la théorie ne suffit pas ?
              </h3>
              <p className="text-xs sm:text-sm text-[#a0a095] leading-relaxed">
                Deux coureurs ayant la même VMA de 16 km/h ne réaliseront pas le même chrono sur marathon. L&apos;un a un fort indice d&apos;endurance (capable de tenir 79% de sa VMA), tandis que l&apos;autre décrochera à 73%. C&apos;est tout l&apos;intérêt d&apos;un coaching individualisé sur le bitume.
              </p>
            </Tilt3DCard>
          </div>

          {/* Guides internes complémentaires */}
          <div className="space-y-6 mb-24">
            {/* Guide Marathon de Paris */}
            <div className="bg-[#181816] border border-[#d4ff00]/40 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl hover:border-[#d4ff00] transition-colors">
              <div>
                <span className="text-[11px] font-mono-tech uppercase text-[#d4ff00] font-bold">GUIDE OFFICIEL PARIS 2026</span>
                <h3 className="text-xl sm:text-2xl font-black uppercase text-white mt-1">
                  Préparation Marathon de Paris 2026 : Parcours, Allures et Plan Nolio
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 font-mono-tech mt-1">
                  Analyse chirurgicale des 270m D+, gestion des 8 tunnels des quais de Seine et stratégie anti-mur.
                </p>
              </div>
              <Link
                href="/blog/preparation-marathon-de-paris-2026-parcours-allures-plan/"
                className="flex-shrink-0 inline-flex items-center gap-2 bg-[#d4ff00] text-black px-5 py-3 rounded-full text-xs font-black uppercase tracking-wider hover:bg-white transition-colors shadow-lg"
              >
                <span>Lire le guide Paris</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Guide EF */}
            <div className="bg-[#181816] border border-white/15 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
              <div>
                <span className="text-[11px] font-mono-tech uppercase text-neutral-400 font-bold">GUIDE PHYSIOLOGIE</span>
                <h3 className="text-xl sm:text-2xl font-black uppercase text-white mt-1">
                  L&apos;Endurance Fondamentale (Zone 2) : Pourquoi courir lentement fait courir plus vite
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 font-mono-tech mt-1">
                  Découvrez comment calibrer votre fréquence cardiaque et éviter la zone grise pour optimiser vos allures.
                </p>
              </div>
              <Link
                href="/blog/endurance-fondamentale-zone-2-running/"
                className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-black px-5 py-3 rounded-full text-xs font-black uppercase tracking-wider hover:bg-neutral-200 transition-colors shadow-lg"
              >
                <span>Lire le guide EF</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* FAQ Accordion Section (Position Zéro Google FAQPage) */}
          <div className="mb-24">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4ff00]/10 border border-[#d4ff00]/30 text-[#d4ff00] text-[11px] font-mono-tech uppercase font-bold tracking-widest mb-3">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>QUESTIONS FRÉQUENTES • EXPERTISE BITUME</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                Tout Comprendre sur les Allures &amp; Chronos
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqsCalculateur.map((faq, idx) => (
                <details
                  key={idx}
                  className="group bg-[#141412] border border-[#262622] rounded-2xl p-5 sm:p-6 transition-all duration-200 open:border-[#d4ff00]/50 open:bg-[#181816]"
                >
                  <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-white text-sm sm:text-base pr-2">
                    <span className="group-hover:text-[#d4ff00] transition-colors">{faq.q}</span>
                    <ChevronDown className="w-4 h-4 text-neutral-400 group-open:rotate-180 group-open:text-[#d4ff00] transition-transform duration-200 flex-shrink-0 ml-4" />
                  </summary>
                  <p className="mt-4 text-xs sm:text-sm text-neutral-300 leading-relaxed font-mono-tech border-t border-white/5 pt-4">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="bg-[#141412] border border-[#2a2a26] rounded-3xl p-8 sm:p-14 text-center">
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white mb-3">
              Besoin d&apos;ajuster vos allures réelles ?
            </h2>
            <p className="text-sm text-[#a0a095] font-mono-tech max-w-xl mx-auto mb-8">
              Ne restez pas sur de simples estimations mathématiques. Faisons un diagnostic précis de votre potentiel.
            </p>
            <Link
              href="/contact/"
              className="inline-flex items-center px-8 py-4 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider bg-[#d4ff00] text-black hover:bg-white transition-all shadow-xl"
            >
              Échanger avec le coach
              <ArrowUpRight className="w-4 h-4 ml-2 stroke-[2.5]" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
