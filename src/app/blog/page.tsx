import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogListClient from "@/components/BlogListClient";
import FreeAuditBanner from "@/components/FreeAuditBanner";
import { BLOG_ARTICLES_DATA } from "@/data/blogArticlesData";
import { Sparkles, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Conseils Course à Pied & Guides d'Entraînement Running",
  description:
    "Guides running par Vincent Buisson : endurance fondamentale, prépa 10 km sub-40, marathon sub-3h, seuil lactique et pacing semi-marathon sur Nolio.",
  alternates: {
    canonical: "https://vincentbuisson.fr/blog/",
  },
  openGraph: {
    title: "Conseils Course à Pied & Guides d'Entraînement Running",
    description:
      "La science de l'entraînement expliquée simplement : séances types, physiologie de l'effort et conseils d'un coach coureur sub-35' et sub-3h.",
    url: "https://vincentbuisson.fr/blog/",
    type: "website",
  },
};

export default function BlogHubPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://vincentbuisson.fr/blog/#collection",
        "url": "https://vincentbuisson.fr/blog/",
        "name": "Conseils Course à Pied & Guides d'Entraînement Running",
        "description":
          "Guides et articles de fond sur la physiologie de l'effort, l'endurance fondamentale, la préparation 10 km, semi et marathon.",
        "publisher": {
          "@type": "Person",
          "name": "Vincent Buisson",
          "url": "https://vincentbuisson.fr",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://vincentbuisson.fr/blog/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Accueil",
            "item": "https://vincentbuisson.fr/",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog & Conseils",
            "item": "https://vincentbuisson.fr/blog/",
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <Header />
      <main className="min-h-screen bg-[#0a0a08] text-white pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {/* Header section */}
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d4ff00]/10 border border-[#d4ff00]/20 text-[#d4ff00] text-xs font-mono-tech uppercase font-bold tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>GUIDES TECHNIQUES &amp; PHYSIOLOGIE DU RUNNING</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-[1.05] mb-4">
              CONSEILS COURSE À PIED <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4ff00] via-white to-neutral-400">
                &amp; SCIENCE DU BITUME
              </span>
            </h1>
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
              Décryptage sans filtre de la physiologie de l&apos;effort, de la gestion d&apos;allure et des séances clés sur 10 km, semi et marathon. Tout ce qu&apos;il faut savoir pour courir plus vite, sans blessure.
            </p>
          </div>

          {/* Articles list client component */}
          <BlogListClient articles={BLOG_ARTICLES_DATA} />
        </div>

        {/* Free Audit CTA Banner */}
        <div className="mt-20">
          <FreeAuditBanner />
        </div>
      </main>
      <Footer />
    </>
  );
}
