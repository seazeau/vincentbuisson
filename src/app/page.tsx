import type { Metadata } from "next";
import Header from "@/components/Header";
import Preloader from "@/components/Preloader";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import About3DSection from "@/components/About3DSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PaceCalculator from "@/components/PaceCalculator";
import PricingSection from "@/components/PricingSection";
import BenefitsTableSection from "@/components/BenefitsTableSection";
import FreeAuditBanner from "@/components/FreeAuditBanner";
import FAQSection from "@/components/FAQSection";
import TrustSection from "@/components/TrustSection";
import StickyMobileBar from "@/components/StickyMobileBar";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Coach Course à Pied Paris & En Ligne | Suivi Nolio",
  description:
    "Coaching course à pied à Paris & à distance sur Nolio. Plans personnalisés 10 km, semi et marathon par un coach sub-35' et sub-3h. Bilan running offert.",
  alternates: {
    canonical: "https://vincentbuisson.fr/",
  },
  openGraph: {
    title: "Coach Course à Pied Paris & En Ligne | Suivi Nolio",
    description:
      "La science de l'entraînement alliée à la réalité du bitume. Préparation personnalisée 10 km, semi et marathon sur Nolio.",
    url: "https://vincentbuisson.fr/",
    siteName: "Vincent Buisson Coaching",
    locale: "fr_FR",
    type: "website",
  },
};

export default function HomePage() {
  const homeStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://vincentbuisson.fr/#website",
        "url": "https://vincentbuisson.fr/",
        "name": "Vincent Buisson Coaching Running",
        "description": "Coaching course à pied d'élite & personnalisé à distance sur 10 km, semi-marathon et marathon.",
        "publisher": { "@id": "https://vincentbuisson.fr/#coach" }
      },
      {
        "@type": "SportsActivityLocation",
        "@id": "https://vincentbuisson.fr/#business",
        "name": "VB Coaching Running - Vincent Buisson",
        "url": "https://vincentbuisson.fr/",
        "image": "https://vincentbuisson.fr/images/vincent-buisson.jpg",
        "telephone": "+33614838634",
        "email": "contact@runpassion.fr",
        "priceRange": "70€ - 90€",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Paris",
          "addressRegion": "Île-de-France",
          "addressCountry": "FR"
        },
        "areaServed": ["Paris", "Île-de-France", "France"],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5.0",
          "bestRating": "5",
          "ratingCount": "3",
          "reviewCount": "3"
        },
        "review": [
          {
            "@type": "Review",
            "author": { "@type": "Person", "name": "Léo M." },
            "datePublished": "2026-01-13",
            "reviewBody": "Vincent est très professionnel et disponible. Les séances sont très bien structurées et adaptées à notre niveau et à nos objectifs. Je recommande à 100% !",
            "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
          },
          {
            "@type": "Review",
            "author": { "@type": "Person", "name": "Antoine B." },
            "datePublished": "2026-09-13",
            "reviewBody": "Deux mois après avoir commencé, les progrès se voient très concrètement. Chaque séance a un sens, la charge est adaptée avec logique et il y a un vrai suivi derrière les chiffres. Je cours plus vite vers mon objectif marathon.",
            "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
          },
          {
            "@type": "Review",
            "author": { "@type": "Person", "name": "Patrizia Z." },
            "datePublished": "2026-09-13",
            "reviewBody": "Vincent est un coach très attentif et à l'écoute. Ses entraînements sont bien réfléchis et toujours différents, en donnant envie de se mettre à l'épreuve. J'ai pu retrouver rapidement mes sensations et mes jambes.",
            "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
          }
        ]
      },
      {
        "@type": "Person",
        "@id": "https://vincentbuisson.fr/#coach",
        "name": "Vincent Buisson",
        "jobTitle": "Coach Course à Pied & Spécialiste Performance sur Route",
        "url": "https://vincentbuisson.fr/",
        "image": "https://vincentbuisson.fr/images/vincent-buisson.jpg",
        "email": "contact@runpassion.fr",
        "knowsAbout": [
          "Course à pied sur route",
          "Entraînement marathon",
          "Entraînement semi-marathon",
          "Entraînement 10 km",
          "Physiologie de l'effort",
          "Planification Nolio"
        ],
        "alumniOf": "Sciences du Sport",
        "hasCredential": [
          "Expert Performance Course sur Route",
          "Coach certifié Nolio"
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0c0c0b] text-[#f2eee4]">
      {/* Entrance Animated Preloader */}
      <Preloader />

      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeStructuredData) }}
      />

      <Header />

      <main className="flex-grow">
        {/* 1. Hero: Clouds Background, Giant Volt Letters, Slogan & Vertical List */}
        <Hero />

        {/* 2. Philosophie & Légitimité du Coach (Vincent Buisson, Photo 3D, Science & Bitume) */}
        <About3DSection />

        {/* 3. Bénéfices Concrets vs Caractéristiques (Tableau de transformation sans blabla) */}
        <BenefitsTableSection />

        {/* 3b. Partenaires & Structures de Confiance (Directement sous les 3 piliers) */}
        <section className="py-12 sm:py-16 bg-[#0c0c0b] border-b border-white/5 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <TrustSection />
          </div>
        </section>

        {/* 4. Témoignages des Athlètes en Cylindre 3D Spatial (Antoine, Léo, Patrizia, Thomas, Sarah, Camille) */}
        <TestimonialsSection />

        {/* 5. LES FORMULES DE COACHING (Tarifs 90€ et 70€/mois avec avis client au-dessus du CTA) */}
        <PricingSection />

        {/* 6. Calculateur d'Allures Interactif 3D */}
        <section id="calculateur" className="py-14 sm:py-20 bg-[#0c0c0b] border-b border-[#222220] scroll-mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <PaceCalculator />
            </div>
          </div>
        </section>

        {/* 7. Lead Magnet : Bilan Initial & Étude de Profil Offert sous 24h (Placé juste après le calculateur) */}
        <FreeAuditBanner />

        {/* 8. FAQ Haute Autorité (Optimisée SEO & IA - 12 réponses sans jargon) */}
        <FAQSection />

        {/* 12. Bannière Finale de Conversion (Minimaliste & Élégante) */}
        <section id="postuler" className="py-20 sm:py-28 bg-[#0c0c0b] text-white relative overflow-hidden border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <span className="inline-flex items-center text-xs font-mono-tech uppercase tracking-widest bg-white/5 border border-white/10 text-neutral-300 px-4 py-1.5 rounded-full backdrop-blur-sm">
              PASSEZ DU &laquo; UN JOUR &raquo; AU &laquo; JOUR UN &raquo;
            </span>
            <h3 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight mt-6 mb-4 text-white">
              Prêt à faire trembler le chrono ?
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-neutral-400 max-w-2xl mx-auto mb-8 font-mono-tech leading-relaxed">
              Chaque coureur possède un potentiel inexploité. Bâtissons votre stratégie de course sur-mesure avec la rigueur scientifique et le suivi Nolio.
            </p>
            <div className="flex flex-col items-center gap-3">
              <Link
                href="/contact/"
                className="inline-flex items-center px-9 py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-white text-black hover:bg-neutral-200 shadow-2xl transition-all hover:scale-105"
              >
                <span>Postuler au coaching</span>
                <ArrowUpRight className="w-4 h-4 ml-2 stroke-[2]" />
              </Link>
              <span className="text-[11px] font-mono-tech text-neutral-500">
                ✓ Sans engagement · ✓ Suivi direct par Vincent · ✓ Réponse sous 24h
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* Mini Dock Flottant Mobile (Accès immédiat Tarifs dès 70€ & Postuler à portée de pouce) */}
      <StickyMobileBar />

      {/* Footer */}
      <Footer />
    </div>
  );
}


