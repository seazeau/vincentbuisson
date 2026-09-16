"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BLOG_ARTICLES } from "@/data/siteContent";

export default function InsightsSection() {
  const articles = BLOG_ARTICLES;

  return (
    <section id="insights" className="py-28 bg-[#121210] text-white relative overflow-hidden select-none border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#d4ff00]" />
              <span className="text-xs font-mono-tech uppercase tracking-widest text-[#d4ff00]">
                • INSIGHTS &amp; ANALYSES
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-tight">
              LA SCIENCE <br /> DU BITUME
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-md">
              Nous décortiquons la physiologie de l&apos;effort, la biomécanique et la réalité du bitume sans jargon inutile.
            </p>
          </div>

          <Link
            href="/blog/"
            className="self-start sm:self-auto inline-flex items-center gap-2 bg-[#f4f2eb] hover:bg-[#d4ff00] text-black px-5 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-colors shadow-lg"
          >
            <span>TOUS LES ARTICLES</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3 Article Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art, idx) => (
            <Link
              key={idx}
              href={art.href}
              className="group flex flex-col justify-between bg-[#181816] rounded-3xl p-5 border border-white/5 hover:border-[#d4ff00]/40 transition-all duration-300 hover:scale-[1.02] shadow-xl cursor-pointer"
            >
              <div>
                {/* Image */}
                <div className="relative w-full h-56 rounded-2xl overflow-hidden bg-neutral-800 mb-5">
                  <Image
                    src={art.image}
                    alt={art.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 right-3 text-[10px] font-mono-tech font-bold uppercase tracking-wider bg-black/80 backdrop-blur-md text-white px-2.5 py-1 rounded-full">
                    {art.readTime}
                  </span>
                </div>

                {/* Date & Tag */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono-tech uppercase font-bold text-[#d4ff00] tracking-wider">
                    {art.date}
                  </span>
                  <span className="text-[10px] font-mono-tech uppercase text-neutral-400 font-bold">
                    {art.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-black uppercase tracking-tight text-white group-hover:text-[#d4ff00] transition-colors leading-snug mb-3">
                  {art.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3">
                  {art.desc}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-white/5 flex items-center justify-between text-xs font-mono-tech text-neutral-400 group-hover:text-white transition-colors">
                <span className="uppercase font-bold">Lire l&apos;analyse</span>
                <ArrowRight className="w-4 h-4 text-[#d4ff00] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
