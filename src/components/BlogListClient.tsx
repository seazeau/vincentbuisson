"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Calendar, Sparkles, BookOpen } from "lucide-react";
import type { BlogArticle } from "@/data/blogArticlesData";

interface BlogListClientProps {
  articles: BlogArticle[];
}

const CATEGORIES = ["Tous", "10 km", "Semi-Marathon", "Marathon", "Physiologie & Allures"] as const;

export default function BlogListClient({ articles }: BlogListClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");

  const filteredArticles =
    selectedCategory === "Tous"
      ? articles
      : articles.filter((art) => art.category === selectedCategory);

  const heroArticle = filteredArticles[0] || articles[0];
  const gridArticles =
    selectedCategory === "Tous" ? filteredArticles.slice(1) : filteredArticles;

  return (
    <div className="space-y-12">
      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono-tech uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-[#d4ff00] text-black font-bold shadow-lg scale-105"
                  : "bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/10"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Featured Hero Article (when "Tous" is selected) */}
      {selectedCategory === "Tous" && heroArticle && (
        <div className="bg-[#181816] rounded-3xl border border-white/10 hover:border-[#d4ff00]/40 transition-all p-6 sm:p-10 shadow-2xl group">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4ff00]/10 border border-[#d4ff00]/30 text-[#d4ff00] text-[10px] font-mono-tech uppercase font-bold tracking-widest">
                  <Sparkles className="w-3 h-3" />
                  À LA UNE • {heroArticle.category}
                </span>
                <span className="text-xs font-mono-tech text-neutral-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {heroArticle.readTime}
                </span>
                <span className="text-xs font-mono-tech text-neutral-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {heroArticle.date}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white group-hover:text-[#d4ff00] transition-colors leading-tight">
                <Link href={`/blog/${heroArticle.slug}/`}>
                  {heroArticle.title}
                </Link>
              </h2>

              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed line-clamp-3">
                {heroArticle.summary}
              </p>

              <div className="pt-2">
                <Link
                  href={`/blog/${heroArticle.slug}/`}
                  className="inline-flex items-center gap-2 bg-[#d4ff00] text-black px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider hover:bg-white transition-colors shadow-lg"
                >
                  <span>Lire l&apos;article complet</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <Link href={`/blog/${heroArticle.slug}/`} className="block relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden bg-neutral-900 border border-white/10">
                <Image
                  src={heroArticle.image}
                  alt={heroArticle.title}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  style={{ objectPosition: heroArticle.imagePosition || "center center" }}
                />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {gridArticles.map((article) => (
          <article
            key={article.slug}
            className="group flex flex-col justify-between bg-[#181816] rounded-3xl p-5 sm:p-6 border border-white/5 hover:border-[#d4ff00]/40 transition-all duration-300 hover:scale-[1.02] shadow-xl"
          >
            <div>
              {/* Image with overlay badge */}
              <Link href={`/blog/${article.slug}/`} className="block relative w-full h-52 rounded-2xl overflow-hidden bg-neutral-800 mb-5 border border-white/5">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  style={{ objectPosition: article.imagePosition || "center center" }}
                />
                <span className="absolute top-3 right-3 text-[10px] font-mono-tech font-bold uppercase tracking-wider bg-black/80 backdrop-blur-md text-white px-2.5 py-1 rounded-full">
                  {article.readTime}
                </span>
                <span className="absolute bottom-3 left-3 text-[10px] font-mono-tech font-bold uppercase tracking-wider bg-[#d4ff00] text-black px-2.5 py-1 rounded-full shadow-md">
                  {article.category}
                </span>
              </Link>

              {/* Date */}
              <div className="flex items-center gap-2 mb-2 text-[11px] font-mono-tech text-neutral-400">
                <Calendar className="w-3 h-3 text-[#d4ff00]" />
                <span>{article.date}</span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-black uppercase tracking-tight text-white group-hover:text-[#d4ff00] transition-colors leading-snug mb-3">
                <Link href={`/blog/${article.slug}/`}>
                  {article.title}
                </Link>
              </h3>

              {/* Summary */}
              <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3 mb-4">
                {article.summary}
              </p>
            </div>

            {/* Read link */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] font-mono-tech uppercase text-neutral-400 font-bold flex items-center gap-1">
                <BookOpen className="w-3 h-3 text-neutral-500" />
                Guide Expert
              </span>
              <Link
                href={`/blog/${article.slug}/`}
                className="inline-flex items-center gap-1 text-xs font-mono-tech font-bold text-[#d4ff00] group-hover:translate-x-1 transition-transform"
              >
                <span>LIRE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
