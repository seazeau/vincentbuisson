import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import About3DSection from "@/components/About3DSection";
import DistancesSection from "@/components/DistancesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PaceCalculator from "@/components/PaceCalculator";
import PricingSection from "@/components/PricingSection";
import BenefitsTableSection from "@/components/BenefitsTableSection";
import FreeAuditBanner from "@/components/FreeAuditBanner";
import InsightsSection from "@/components/InsightsSection";
import FAQSection from "@/components/FAQSection";
import TrustSection from "@/components/TrustSection";
import StickyMobileBar from "@/components/StickyMobileBar";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Coach Course à Pied Paris & En Ligne | Plan 10 km, Semi & Marathon Nolio",
  description:
    "Coach course à pied à Paris & en ligne sur Nolio (dès 70€/mois). Plans d'entraînement 100% personnalisés sur 10 km, semi-marathon et marathon par Vincent Buisson (Sub-35' / Sub-3h). Bilan running offert sous 24h.",
  alternates: {
    canonical: "https://vincentbuisson.fr/",
  },
  openGraph: {
    title: "Coach Course à Pied Paris & En Ligne | Plan 10 km, Semi & Marathon Nolio",
    description:
      "La science de l'entraînement alliée à la réalité du bitume. Préparation personnalisée 10 km, semi et marathon sur Nolio (+100 athlètes accompagnés).",
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
        "description": "Coaching course à pied d'élite & personnalisé à Paris et à distance sur 10 km, semi-marathon et marathon via Nolio.",
        "publisher": { "@id": "https://vincentbuisson.fr/#coach" }
      },
      {
        "@type": "SportsActivityLocation",
        "@id": "https://vincentbuisson.fr/#business",
        "name": "VB Coaching Running - Vincent Buisson (Coach Course à Pied Paris & En Ligne)",
        "url": "https://vincentbuisson.fr/",
        "image": "https://vincentbuisson.fr/images/vincent-buisson.jpg",
        "telephone": "+33602658414",
        "email": "contact@runpassion.fr",
        "priceRange": "70€ - 90€",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Paris",
          "addressRegion": "Île-de-France",
          "addressCountry": "FR"
        },
        "areaServed": ["Paris", "Île-de-France", "France", "Belgique", "Suisse"],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Formules de Coaching Course à Pied Nolio",
          "itemListElement": [
            {
              "@type": "Offer",
              "name": "Formule Performance (Engagement 6 mois)",
              "price": "70.00",
              "priceCurrency": "EUR",
              "url": "https://vincentbuisson.fr/#tarifs",
              "description": "Coaching course à pied 100% personnalisé sur Nolio (10 km, Semi-Marathon, Marathon) avec suivi WhatsApp 6j/7."
            },
            {
              "@type": "Offer",
              "name": "Formule Liberté (Sans engagement)",
              "price": "90.00",
              "priceCurrency": "EUR",
              "url": "https://vincentbuisson.fr/#tarifs",
              "description": "Coaching running mensuel sans engagement sur Nolio avec synchronisation montre GPS et suivi individuel."
            }
          ]
        },
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
            "reviewBody": "Vincent est très professionnel et disponible. Les séances sont très bien structurées et adaptées à notre niveau et à nos objectifs. Passage de 1h41 à 1h30 au semi-marathon. Je recommande à 100% !",
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
        "url": "https://vincentbuisson.fr/a-propos/",
        "image": "https://vincentbuisson.fr/images/vincent-buisson.jpg",
        "email": "contact@runpassion.fr",
        "knowsAbout": [
          "Course à pied sur route",
          "Entraînement marathon",
          "Entraînement semi-marathon",
          "Entraînement 10 km",
          "Physiologie de l'effort",
          "Seuils ventilatoires SV1 et SV2",
          "Planification Nolio"
        ],
        "alumniOf": "Sciences du Sport",
        "hasCredential": [
          "Expert Performance Course sur Route (Sub-35' 10 km / Sub-3h Marathon)",
          "Coach certifié Nolio"
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0c0c0b] text-[#f2eee4]">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeStructuredData) }}
      />

      <Header />

      <main className="flex-grow">
        {/* 1. Hero */}
        <Hero />

        {/* 2. Philosophie & Légitimité du Coach (Vincent Buisson, Science & Bitume) */}
        <About3DSection />

        {/* 3. Bénéfices Concrets vs Caractéristiques */}
        <BenefitsTableSection />

        {/* 3b. Partenaires & Structures de Confiance */}
        <section className="py-12 sm:py-16 bg-[#0c0c0b] border-b border-white/5 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <TrustSection />
          </div>
        </section>

        {/* 4. Spécialités par Distance (10 km, Semi-Marathon, Marathon + Liens profonds SEO) */}
        <DistancesSection />

        {/* 5. Témoignages des Athlètes */}
        <TestimonialsSection />

        {/* 6. LES FORMULES DE COACHING (Tarifs 90€ et 70€/mois) */}
        <PricingSection />

        {/* 7. Calculateur d'Allures Interactif */}
        <section id="calculateur" className="py-14 sm:py-20 bg-[#0c0c0b] border-b border-[#222220] scroll-mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <PaceCalculator />
            </div>
          </div>
        </section>

        {/* 8. Lead Magnet : Bilan Initial & Étude de Profil Offert sous 24h */}
        <FreeAuditBanner />

        {/* 9. Dossiers & Guides SEO (Maillage interne direct vers les articles clés) */}
        <InsightsSection />

        {/* 10. FAQ Haute Autorité (Optimisée SEO & IA - 12 réponses sans jargon) */}
        <FAQSection />

        {/* 11. Bannière Finale de Conversion */}
        <section id="postuler" className="py-20 sm:py-28 bg-[#0c0c0b] text-white relative overflow-hidden border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <span className="inline-flex items-center text-xs font-mono-tech uppercase tracking-widest bg-white/5 border border-white/10 text-neutral-300 px-4 py-1.5 rounded-full backdrop-blur-sm">
              PASSEZ DU &laquo; UN JOUR &raquo; AU &laquo; JOUR UN &raquo;
            </span>
            <h3 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight mt-6 mb-4 text-white">
              Prêt à faire trembler le chrono ?
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-neutral-400 max-w-2xl mx-auto mb-8 font-mono-tech leading-relaxed">
              Chaque coureur possède un potentiel inexploité. Bâtissons votre stratégie de course sur-mesure sur 10 km, semi ou marathon avec la rigueur scientifique et le suivi Nolio.
            </p>
            <div className="flex flex-col items-center gap-3">
              <Link
                href="/contact/"
                className="inline-flex items-center px-9 py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#d4ff00] text-black hover:bg-white shadow-2xl transition-all hover:scale-105"
              >
                <span>Demander mon bilan running offert</span>
                <ArrowUpRight className="w-4 h-4 ml-2 stroke-[2]" />
              </Link>
              <span className="text-[11px] font-mono-tech text-neutral-500">
                ✓ Diagnostic offert sous 24h · ✓ Sans engagement · ✓ Suivi direct par Vincent
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* Mini Dock Flottant Mobile */}
      <StickyMobileBar />

      {/* Footer */}
      <Footer />
    </div>
  );
}
