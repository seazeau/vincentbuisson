"use client";

import React, { useState, useMemo } from "react";
import { ChevronDown, HelpCircle, Search, MessageCircle, ArrowUpRight, Sparkles, Tag } from "lucide-react";
import { FAQ_ITEMS, SITE_CONFIG } from "@/data/siteContent";
import Link from "next/link";

interface FAQSectionProps {
  initialCategory?: string;
  title?: string;
  subtitle?: string;
}

export default function FAQSection({
  initialCategory = "Toutes",
  title = "Tout Savoir sur le Coaching Running",
  subtitle = "Des réponses claires et transparentes sur nos formules, notre méthode d'entraînement et l'application Nolio.",
}: FAQSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]); // First item open by default

  const categories = useMemo(() => {
    const cats = ["Toutes"];
    FAQ_ITEMS.forEach((item) => {
      if (!cats.includes(item.category)) {
        cats.push(item.category);
      }
    });
    return cats;
  }, []);

  const filteredItems = useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      const matchesCat = selectedCategory === "Toutes" || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const toggle = (originalIdx: number) => {
    setOpenIndexes((prev) =>
      prev.includes(originalIdx) ? prev.filter((i) => i !== originalIdx) : [...prev, originalIdx]
    );
  };

  // Schema.org FAQ JSON-LD for Search Engines & AI LLMs
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section
      id="faq"
      className="py-16 sm:py-32 bg-[#0a0a09] relative overflow-hidden border-b border-[#222220]"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      {/* Inject FAQ Structured Data for Google & AI Overviews */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-xs font-mono-tech uppercase tracking-widest mb-4 backdrop-blur-sm">
            <HelpCircle className="w-3.5 h-3.5 text-neutral-300" />
            <span>BASE DE CONNAISSANCES &amp; FAQ EXPERT</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight leading-tight">
            {title}
          </h2>

          <p className="font-hand text-2xl sm:text-3xl text-white mt-3 -rotate-1 font-normal lowercase">
            {subtitle}
          </p>
        </div>

        {/* Live Search & Filter Bar */}
        <div className="mb-10 space-y-4">
          <div className="relative max-w-xl mx-auto">
            <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher une question (ex: 90€, 70€, VMA, Garmin, marathon, blessure...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#141412] border border-white/10 focus:border-white/40 rounded-2xl pl-11 pr-4 py-3.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white px-2 py-1 rounded font-mono-tech"
              >
                Effacer
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono-tech uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-white text-black font-bold shadow-md"
                    : "bg-[#141412] text-neutral-400 border border-[#262622] hover:text-white hover:border-neutral-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List with Semantic Microdata */}
        <div className="space-y-3.5">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 bg-[#141412] border border-[#262622] rounded-3xl p-8">
              <p className="text-neutral-400 text-sm font-mono-tech mb-3">
                Aucune question ne correspond à votre recherche « {searchQuery} ».
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("Toutes");
                }}
                className="text-xs font-mono-tech uppercase text-white underline"
              >
                Réinitialiser la recherche
              </button>
            </div>
          ) : (
            filteredItems.map((item, filteredIdx) => {
              const originalIdx = FAQ_ITEMS.indexOf(item);
              const isOpen = openIndexes.includes(originalIdx);

              return (
                <div
                  key={originalIdx}
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                  className="bg-[#141412] border border-[#262622] rounded-2xl overflow-hidden transition-all duration-200 hover:border-[#3a3a34]"
                >
                  <button
                    onClick={() => toggle(originalIdx)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none cursor-pointer group"
                    aria-expanded={isOpen}
                  >
                    <div className="pr-4 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono-tech uppercase font-bold text-neutral-400 tracking-wider">
                          {item.category}
                        </span>
                      </div>
                      <h3
                        itemProp="name"
                        className="text-sm sm:text-base font-black text-white uppercase tracking-tight group-hover:text-neutral-300 transition-colors"
                      >
                        {item.question}
                      </h3>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-200 ${
                        isOpen
                          ? "bg-white text-black border-white rotate-180"
                          : "bg-white/5 text-neutral-400 border-white/10 group-hover:text-white"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </button>

                  {/* 
                    SEO & AI Friendly: The answer text is always present in the DOM for search bots & LLMs,
                    while smoothly collapsing for the human reader.
                  */}
                  <div
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                    className={`transition-all duration-300 ease-in-out px-6 ${
                      isOpen ? "max-h-[600px] pb-6 pt-2 opacity-100 border-t border-[#22221e]" : "max-h-0 pb-0 pt-0 opacity-0 overflow-hidden"
                    }`}
                  >
                    <p itemProp="text" className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-mono-tech">
                      {item.answer}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Bottom CTA for Unanswered Questions */}
        <div className="mt-14 bg-gradient-to-r from-[#181816] via-[#161614] to-[#181816] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center space-x-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center shrink-0">
              <MessageCircle className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-black uppercase text-white tracking-tight">
                Vous avez une question spécifique sur votre préparation ?
              </h4>
              <p className="text-xs text-neutral-400 font-mono-tech mt-0.5">
                Posez-la directement à Vincent Buisson sur WhatsApp ou démarrez votre diagnostic.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={SITE_CONFIG.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full bg-white/5 border border-white/15 text-neutral-300 hover:bg-white/10 hover:text-white transition-colors text-xs font-mono-tech uppercase tracking-wider"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Direct</span>
            </a>
            <Link
              href="/contact/"
              className="inline-flex items-center gap-1.5 px-6 py-3.5 rounded-full bg-white text-black hover:bg-neutral-200 transition-all text-xs font-bold uppercase tracking-wider shadow-lg hover:scale-105"
            >
              <span>Postuler au coaching</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2]" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
