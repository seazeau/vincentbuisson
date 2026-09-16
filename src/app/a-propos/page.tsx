import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, GraduationCap } from "lucide-react";
import { SITE_CONFIG } from "@/data/siteContent";
import Tilt3DCard from "@/components/Tilt3DCard";

export const metadata: Metadata = {
  title: "Coach Course à Pied & Spécialiste Performance sur Route",
  description:
    "Découvrez le parcours de Vincent Buisson : coach de course à pied, coureur sub-35' au 10 km et sub-3h au marathon. Plus de 100 coureurs accompagnés.",
  alternates: {
    canonical: "https://vincentbuisson.fr/a-propos/",
  },
  openGraph: {
    title: "Coach Course à Pied & Spécialiste Performance sur Route",
    description:
      "Profil, expertise scientifique, chronos bitume et philosophie d'entraînement de Vincent Buisson.",
    url: "https://vincentbuisson.fr/a-propos/",
  },
};

export default function AProposPage() {
  const structuredDataAbout = {
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
            "name": "À Propos",
            "item": "https://vincentbuisson.fr/a-propos/"
          }
        ]
      },
      {
        "@type": "ProfilePage",
        "mainEntity": {
          "@type": "Person",
          "name": "Vincent Buisson",
          "jobTitle": "Coach Course à Pied & Spécialiste Performance sur Route",
          "url": "https://vincentbuisson.fr/a-propos/",
          "image": "https://vincentbuisson.fr/images/vincent-buisson.jpg",
          "email": "contact@runpassion.fr",
          "knowsAbout": [
            "Physiologie de l'effort",
            "Entraînement marathon",
            "Entraînement semi-marathon",
            "Entraînement 10 km",
            "Plateforme Nolio"
          ],
          "alumniOf": "Sciences du Sport"
        }
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0c0c0b] text-[#f2eee4]">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataAbout) }}
      />

      <Header />

      <main className="flex-grow pt-36 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="text-xs font-mono-tech uppercase tracking-wider text-[#888880] mb-8 flex items-center space-x-2">
            <Link href="/" className="hover:text-[#d4ff00]">Accueil</Link>
            <span>/</span>
            <span className="text-white font-bold">À Propos &amp; Coach</span>
          </nav>

          {/* Bio intro */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#181816] border border-[#2e2e28] text-[#d4ff00] text-xs font-mono-tech uppercase tracking-widest">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>COACH &amp; EXPERT</span>
                </span>
                <span className="font-hand text-2xl text-[#d4ff00] -rotate-2">
                  Praticien du bitume
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-tight">
                Vincent Buisson : <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#d4ff00] to-[#ff4400]">
                  La Science du Sport &amp; le Coureur de Bitume
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#b5b5a8] leading-relaxed">
                Passionné d&apos;athlétisme et de physiologie depuis toujours, j&apos;ai fait de l&apos;entraînement mon métier et ma vocation. Fort d&apos;une solide formation en <strong>sciences du sport</strong> et de ma pratique de <strong>coach spécialisé</strong>, j&apos;accompagne les coureurs de tous niveaux avec une exigence simple : <strong>associer la rigueur scientifique à la réalité du terrain</strong>.
              </p>
              <p className="text-sm sm:text-base text-[#888880] leading-relaxed">
                Sur le bitume, je sais exactement ce que mes athlètes traversent : les doutes d&apos;une sortie longue sous la pluie, l&apos;exigence d&apos;un fractionné au seuil ou l&apos;attente fébrile sur la ligne de départ. Avec des records personnels établis à <strong>moins de 35 minutes sur 10 km</strong> et <strong>moins de 3 heures sur marathon</strong>, je ne vous demanderai jamais une séance que je n&apos;ai pas moi-même éprouvée.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/contact/"
                  className="inline-flex items-center px-8 py-4 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider bg-[#d4ff00] text-black hover:bg-white transition-all shadow-xl shadow-[#d4ff00]/15"
                >
                  Postuler au coaching
                  <ArrowUpRight className="w-4 h-4 ml-2 stroke-[2.5]" />
                </Link>
                <a
                  href={SITE_CONFIG.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-7 py-4 rounded-2xl text-xs sm:text-sm font-mono-tech uppercase tracking-wider bg-[#181816] text-white border border-[#2e2e28] hover:border-[#d4ff00] transition-all"
                >
                  WhatsApp Direct
                </a>
              </div>
            </div>

            {/* Profile Highlight Tilt Card */}
            <div className="lg:col-span-5">
              <Tilt3DCard maxTilt={8} className="bg-[#141412] border border-[#2a2a26] rounded-3xl overflow-hidden shadow-2xl relative">
                {/* Photo */}
                <div className="relative w-full aspect-[4/4.5] overflow-hidden bg-neutral-900">
                  <Image
                    src="/images/vincent-buisson.webp"
                    alt="Vincent Buisson - Coach Course à pied & Spécialiste Route"
                    fill
                    priority
                    className="object-cover object-top contrast-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141412] via-transparent to-black/30" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-black/70 border border-white/20 backdrop-blur-md text-[11px] font-mono-tech uppercase tracking-wider text-[#d4ff00]">
                      ● EXPERT PERFORMANCE ROUTE
                    </span>
                  </div>
                </div>

                <div className="p-7 sm:p-8 pt-4">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">Vincent Buisson</h3>
                  <p className="text-xs font-mono-tech uppercase tracking-wider text-[#d4ff00] mt-1 mb-6">
                    Coach Course à Pied &amp; Spécialiste Route
                  </p>

                <div className="space-y-4 pt-4 border-t border-[#262622] text-xs sm:text-sm font-mono-tech text-[#b5b5a8]">
                  <div className="flex items-center justify-between pb-3 border-b border-[#22221e]">
                    <span>Athlètes accompagnés</span>
                    <strong className="text-white">+100 coureurs</strong>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#22221e]">
                    <span>Chrono 10 km (Bitume)</span>
                    <strong className="text-[#d4ff00]">&lt; 35 min</strong>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#22221e]">
                    <span>Chrono Marathon</span>
                    <strong className="text-[#ff4400]">&lt; 3h00</strong>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#22221e]">
                    <span>Expertise</span>
                    <strong className="text-white">Sciences du Sport &amp; Physiologie</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Outil de suivi</span>
                    <strong className="text-[#d4ff00]">Plateforme Nolio</strong>
                  </div>
                </div>
                </div>
              </Tilt3DCard>
            </div>
          </div>

          {/* 3 Commitments */}
          <div className="mb-24">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-mono-tech uppercase tracking-widest text-[#d4ff00]">
                PHILOSOPHIE D&apos;ENTRAÎNEMENT
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mt-2">
                Mes 3 Piliers d&apos;Entraînement
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Tilt3DCard maxTilt={6} className="bg-[#141412] border border-[#262622] rounded-3xl p-8 shadow-2xl">
                <div className="w-10 h-10 rounded-xl bg-[#d4ff00] text-black flex items-center justify-center mb-4 font-black">
                  01
                </div>
                <h3 className="text-xl font-black text-white uppercase mb-2">Individualisation</h3>
                <p className="text-xs sm:text-sm text-[#a0a095] leading-relaxed">
                  Chaque coureur est unique. Vos disponibilités, votre métier, votre niveau de fatigue et vos sensations dictent la programmation, jamais l&apos;inverse.
                </p>
              </Tilt3DCard>

              <Tilt3DCard maxTilt={6} className="bg-[#141412] border border-[#262622] rounded-3xl p-8 shadow-2xl">
                <div className="w-10 h-10 rounded-xl bg-[#ff4400] text-white flex items-center justify-center mb-4 font-black">
                  02
                </div>
                <h3 className="text-xl font-black text-white uppercase mb-2">Progressivité</h3>
                <p className="text-xs sm:text-sm text-[#a0a095] leading-relaxed">
                  Une montée en charge méthodique et mesurée pour stimuler l&apos;organisme, franchir des caps chronométriques durables et préserver votre intégrité physique.
                </p>
              </Tilt3DCard>

              <Tilt3DCard maxTilt={6} className="bg-[#141412] border border-[#262622] rounded-3xl p-8 shadow-2xl">
                <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center mb-4 font-black">
                  03
                </div>
                <h3 className="text-xl font-black text-white uppercase mb-2">Plaisir</h3>
                <p className="text-xs sm:text-sm text-[#a0a095] leading-relaxed">
                  Le véritable moteur de la régularité et de la performance. Prendre du plaisir à chaque sortie pour aborder le jour de course libéré, motivé et conquérant.
                </p>
              </Tilt3DCard>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="bg-[#141412] border border-[#2a2a26] rounded-3xl p-8 sm:p-14 text-center">
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white mb-3">
              Envie de démarrer votre aventure sportive ?
            </h2>
            <p className="text-sm text-[#a0a095] font-mono-tech max-w-xl mx-auto mb-8">
              Remplissez le diagnostic initial et étudions ensemble les prochaines étapes de votre progression.
            </p>
            <Link
              href="/contact/"
              className="inline-flex items-center px-8 py-4 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider bg-[#d4ff00] text-black hover:bg-white transition-all shadow-xl"
            >
              Postuler au coaching
              <ArrowUpRight className="w-4 h-4 ml-2 stroke-[2.5]" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
