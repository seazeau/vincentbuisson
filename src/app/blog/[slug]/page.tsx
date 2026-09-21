import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FreeAuditBanner from "@/components/FreeAuditBanner";
import { BLOG_ARTICLES_DATA, type BlogArticle } from "@/data/blogArticlesData";
import {
  Clock,
  Calendar,
  ChevronRight,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Dumbbell,
  HelpCircle,
  Award,
  Calculator,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_ARTICLES_DATA.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = BLOG_ARTICLES_DATA.find((a) => a.slug === slug);

  if (!article) {
    return {
      title: "Article non trouvé",
      description: "L'article demandé n'existe pas ou a été déplacé.",
    };
  }

  return {
    title: article.seoTitle,
    description: article.seoDescription,
    alternates: {
      canonical: `https://vincentbuisson.fr/blog/${article.slug}/`,
    },
    openGraph: {
      title: article.seoTitle,
      description: article.seoDescription,
      url: `https://vincentbuisson.fr/blog/${article.slug}/`,
      type: "article",
      publishedTime: article.publishedAt,
      authors: ["https://vincentbuisson.fr/a-propos/"],
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.seoTitle,
      description: article.seoDescription,
      images: [article.image],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const article = BLOG_ARTICLES_DATA.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = BLOG_ARTICLES_DATA.filter((a) =>
    article.relatedSlugs.includes(a.slug)
  ).slice(0, 3);

  // Schema.org Structured Data
  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `https://vincentbuisson.fr/blog/${article.slug}/#article`,
        "isPartOf": {
          "@type": "Blog",
          "@id": "https://vincentbuisson.fr/blog/#blog",
          "name": "Le Blog Coaching de Vincent Buisson",
        },
        "headline": article.title,
        "description": article.seoDescription,
        "datePublished": article.publishedAt,
        "dateModified": article.publishedAt,
        "mainEntityOfPage": `https://vincentbuisson.fr/blog/${article.slug}/`,
        "author": {
          "@type": "Person",
          "name": "Vincent Buisson",
          "url": "https://vincentbuisson.fr/a-propos/",
          "jobTitle": "Coach Course à Pied & Spécialiste Performance sur Route",
        },
        "publisher": {
          "@type": "Person",
          "name": "Vincent Buisson",
          "url": "https://vincentbuisson.fr",
        },
        "image": `https://vincentbuisson.fr${article.image}`,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://vincentbuisson.fr/blog/${article.slug}/#breadcrumb`,
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
            "name": "Blog",
            "item": "https://vincentbuisson.fr/blog/",
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": article.title,
            "item": `https://vincentbuisson.fr/blog/${article.slug}/`,
          },
        ],
      },
      ...(article.faqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": `https://vincentbuisson.fr/blog/${article.slug}/#faq`,
              "mainEntity": article.faqs.map((faq) => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Header />

      <main className="min-h-screen bg-[#0a0a08] text-white pt-28 pb-20">
        <article className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Breadcrumbs */}
          <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-xs font-mono-tech text-neutral-400 mb-8 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-white transition-colors">
              Accueil
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600 flex-shrink-0" />
            <Link href="/blog/" className="hover:text-white transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600 flex-shrink-0" />
            <span className="text-[#d4ff00] font-bold truncate max-w-[200px] sm:max-w-none">
              {article.category}
            </span>
          </nav>

          {/* Article Header */}
          <header className="space-y-6 mb-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-[#d4ff00]/10 border border-[#d4ff00]/30 text-[#d4ff00] text-xs font-mono-tech uppercase font-bold tracking-widest">
                {article.category}
              </span>
              <span className="text-xs font-mono-tech text-neutral-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime} DE LECTURE
              </span>
              <span className="text-xs font-mono-tech text-neutral-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {article.date}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-[1.1]">
              {article.title}
            </h1>

            {/* Author bar */}
            <div className="flex items-center gap-3 py-3 border-y border-white/10">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#d4ff00]/40">
                <Image
                  src="/images/vincent-running.webp"
                  alt="Vincent Buisson - Coach Running"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-wider text-white">
                  Vincent Buisson
                </div>
                <div className="text-[11px] font-mono-tech text-neutral-400">
                  Coach Spécialiste Route • Sub-35&apos; 10 km &amp; Sub-3h Marathon
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative w-full h-80 sm:h-[480px] md:h-[540px] rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl">
              <Image
                src={article.image}
                alt={article.title}
                fill
                priority
                className="object-cover"
                style={{ objectPosition: article.imagePosition || "center center" }}
              />
            </div>
          </header>

          {/* Key takeaways callout */}
          <div className="bg-[#181816] rounded-3xl p-6 sm:p-8 border border-[#d4ff00]/30 mb-10 shadow-xl">
            <div className="flex items-center gap-2 mb-4 text-[#d4ff00]">
              <Sparkles className="w-5 h-5" />
              <h2 className="text-sm font-mono-tech uppercase font-bold tracking-wider text-white">
                Les points clés à retenir
              </h2>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-neutral-300">
              {article.keyTakeaways.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#d4ff00] flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Table of contents */}
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 mb-10">
            <div className="text-xs font-mono-tech uppercase text-neutral-400 font-bold mb-3 tracking-wider">
              Sommaire de l&apos;article
            </div>
            <ul className="space-y-2 text-xs font-mono-tech">
              {article.sections.map((sec, idx) => (
                <li key={idx}>
                  <a
                    href={`#${sec.id}`}
                    className="text-neutral-300 hover:text-[#d4ff00] transition-colors flex items-center gap-2"
                  >
                    <span className="text-neutral-500">{idx + 1}.</span>
                    <span>{sec.heading.replace(/^[0-9.]+\s*/, "")}</span>
                  </a>
                </li>
              ))}
              {article.workoutExample && (
                <li>
                  <a
                    href="#seance-type"
                    className="text-neutral-300 hover:text-[#d4ff00] transition-colors flex items-center gap-2"
                  >
                    <span className="text-[#d4ff00]">⚡</span>
                    <span>Séance type recommandée</span>
                  </a>
                </li>
              )}
              {article.faqs.length > 0 && (
                <li>
                  <a
                    href="#foire-aux-questions"
                    className="text-neutral-300 hover:text-[#d4ff00] transition-colors flex items-center gap-2"
                  >
                    <span className="text-[#d4ff00]">?</span>
                    <span>Foire aux questions</span>
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Article Chapeau */}
          <div className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed mb-12 border-l-2 border-[#d4ff00] pl-4 italic">
            {article.summary}
          </div>

          {/* Content sections */}
          <div className="space-y-12 text-sm sm:text-base text-neutral-300 leading-relaxed">
            {article.sections.map((sec) => (
              <section key={sec.id} id={sec.id} className="scroll-mt-32 space-y-4">
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white pt-2 border-b border-white/5 pb-2">
                  {sec.heading}
                </h2>
                {sec.body.map((paragraph, pIdx) => (
                  <p key={pIdx} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
                {sec.callout && (
                  <div className="bg-white/5 border-l-4 border-[#d4ff00] p-4 sm:p-5 rounded-r-2xl my-6">
                    <div className="text-xs font-mono-tech uppercase text-[#d4ff00] font-bold mb-1">
                      {sec.callout.title}
                    </div>
                    <div className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-mono-tech">
                      {sec.callout.text}
                    </div>
                  </div>
                )}
              </section>
            ))}

            {/* Workout Box */}
            {article.workoutExample && (
              <section id="seance-type" className="scroll-mt-32 pt-4">
                <div className="bg-[#181816] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
                  <div className="flex items-center gap-2 text-[#d4ff00] mb-4">
                    <Dumbbell className="w-5 h-5" />
                    <h2 className="text-base sm:text-lg font-black uppercase tracking-wider text-white">
                      {article.workoutExample.title}
                    </h2>
                  </div>

                  <div className="space-y-3 font-mono-tech text-xs sm:text-sm">
                    <div className="bg-black/40 p-3.5 rounded-xl border border-white/5">
                      <span className="text-[#d4ff00] font-bold block mb-1">ÉCHAUFFEMENT :</span>
                      <span className="text-neutral-300">{article.workoutExample.warmup}</span>
                    </div>
                    <div className="bg-black/40 p-3.5 rounded-xl border border-white/5">
                      <span className="text-[#d4ff00] font-bold block mb-1">CORPS DE SÉANCE :</span>
                      <span className="text-neutral-300">{article.workoutExample.mainSet}</span>
                    </div>
                    <div className="bg-black/40 p-3.5 rounded-xl border border-white/5">
                      <span className="text-[#d4ff00] font-bold block mb-1">RÉCUPÉRATION :</span>
                      <span className="text-neutral-300">{article.workoutExample.cooldown}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 text-xs font-mono-tech text-neutral-400">
                    <span className="text-white font-bold">Conseil du coach :</span> {article.workoutExample.coachTips}
                  </div>
                </div>
              </section>
            )}

            {/* Contextual Internal Link Banner */}
            <div className="bg-gradient-to-r from-[#d4ff00]/15 via-white/5 to-transparent border border-[#d4ff00]/30 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 my-10">
              <div className="space-y-2 text-center sm:text-left">
                <div className="text-[11px] font-mono-tech uppercase font-bold text-[#d4ff00]">
                  OUTIL RECOMMANDÉ POUR CETTE SÉANCE
                </div>
                <div className="text-lg sm:text-xl font-black uppercase text-white">
                  {article.relatedServiceLabel}
                </div>
              </div>
              <Link
                href={article.relatedServiceUrl}
                className="flex-shrink-0 inline-flex items-center gap-2 bg-[#d4ff00] text-black px-5 py-3 rounded-full text-xs font-black uppercase tracking-wider hover:bg-white transition-colors shadow-lg"
              >
                <span>Accéder directement</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* FAQ Section */}
            {article.faqs.length > 0 && (
              <section id="foire-aux-questions" className="scroll-mt-32 pt-4">
                <div className="flex items-center gap-2 mb-6">
                  <HelpCircle className="w-5 h-5 text-[#d4ff00]" />
                  <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                    Questions Fréquentes
                  </h2>
                </div>
                <div className="space-y-4">
                  {article.faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="bg-[#181816] rounded-2xl p-5 border border-white/5 space-y-2"
                    >
                      <h3 className="text-sm sm:text-base font-bold text-white">
                        {faq.question}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Author Box */}
          <div className="mt-16 bg-[#181816] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-[#d4ff00]">
              <Image
                src="/images/vincent-running.webp"
                alt="Vincent Buisson - Coach Course à Pied"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-2 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="text-base sm:text-lg font-black uppercase text-white">
                  Vincent Buisson
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#d4ff00]/10 border border-[#d4ff00]/30 text-[#d4ff00] text-[10px] font-mono-tech font-bold uppercase">
                  Coach Spécialiste Route
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-mono-tech">
                Coureur sur route sub-35&apos; sur 10 km et sub-3h sur marathon. J&apos;accompagne plus de 100 athlètes à Paris et partout en France via des plans d&apos;entraînement scientifiques individualisés sur l&apos;application Nolio.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <Link
                  href="/a-propos/"
                  className="text-xs font-mono-tech text-[#d4ff00] hover:underline font-bold"
                >
                  En savoir plus sur Vincent →
                </Link>
                <span className="text-neutral-600">•</span>
                <Link
                  href="/contact/"
                  className="text-xs font-mono-tech text-neutral-300 hover:text-white font-bold"
                >
                  Demander un bilan running offert →
                </Link>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-16 pt-12 border-t border-white/10">
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mb-6">
                Articles Recommandés
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/blog/${rel.slug}/`}
                    className="group bg-[#181816] rounded-2xl p-4 border border-white/5 hover:border-[#d4ff00]/40 transition-all block"
                  >
                    <div className="relative w-full h-32 rounded-xl overflow-hidden bg-neutral-900 mb-3">
                      <Image
                        src={rel.image}
                        alt={rel.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        style={{ objectPosition: rel.imagePosition || "center center" }}
                      />
                    </div>
                    <div className="text-[10px] font-mono-tech text-[#d4ff00] uppercase font-bold mb-1">
                      {rel.category}
                    </div>
                    <h3 className="text-xs font-bold text-white group-hover:text-[#d4ff00] transition-colors line-clamp-2 leading-snug">
                      {rel.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Free Audit Banner at bottom */}
        <div className="mt-20">
          <FreeAuditBanner />
        </div>
      </main>

      <Footer />
    </>
  );
}
