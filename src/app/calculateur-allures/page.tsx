import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Calculator, ArrowUpRight, Gauge, Zap } from "lucide-react";
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

          {/* Guide interne complémentaire */}
          <div className="bg-[#181816] border border-[#d4ff00]/30 rounded-3xl p-6 sm:p-8 mb-16 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <span className="text-[11px] font-mono-tech uppercase text-[#d4ff00] font-bold">GUIDE PHYSIOLOGIE RECOMMANDÉ</span>
              <h3 className="text-xl sm:text-2xl font-black uppercase text-white mt-1">
                L&apos;Endurance Fondamentale (Zone 2) : Pourquoi courir lentement fait courir plus vite
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-mono-tech mt-1">
                Découvrez comment calibrer votre fréquence cardiaque et éviter la zone grise pour optimiser vos allures de course.
              </p>
            </div>
            <Link
              href="/blog/endurance-fondamentale-zone-2-running/"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-[#d4ff00] text-black px-5 py-3 rounded-full text-xs font-black uppercase tracking-wider hover:bg-white transition-colors shadow-lg"
            >
              <span>Lire le guide EF</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
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
