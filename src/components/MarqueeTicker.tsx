import React from "react";

export default function MarqueeTicker() {
  const words = [
    "10 KM SUB-35'",
    "SEMI-MARATHON SUB-1H30",
    "MARATHON SUB-3H00",
    "SCIENCE DU SPORT",
    "EXPERTISE ROUTE",
    "+100 ATHLÈTES ACCOMPAGNÉS",
    "SYNCHRONISÉ NOLIO",
    "PRAGMATISME DU BITUME",
    "ALLURES CIBLES RÉELLES",
    "AFFÛTAGE SUR-MESURE",
  ];

  return (
    <div className="py-6 bg-[#0c0c0b] overflow-hidden border-t border-b border-[#222220] relative">
      {/* Top Track */}
      <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-xs sm:text-sm font-black uppercase tracking-widest text-[#f2eee4]">
        {[...words, ...words, ...words].map((w, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <span className="hover:text-[#d4ff00] transition-colors">{w}</span>
            <span className="w-2 h-2 rounded-full bg-[#d4ff00]" />
          </div>
        ))}
      </div>

      {/* Reverse Accent Track */}
      <div className="animate-marquee-reverse whitespace-nowrap flex items-center gap-8 text-[11px] sm:text-xs font-mono-tech uppercase tracking-wider text-[#ff4400] mt-3">
        {[...words, ...words, ...words].reverse().map((w, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <span>{w}</span>
            <span className="text-[#888880]">/</span>
          </div>
        ))}
      </div>
    </div>
  );
}
