"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Trophy, Flame } from "lucide-react";

interface AthleteProject {
  tag1: string;
  tag2: string;
  name: string;
  event: string;
  story: string;
  metric: string;
  metricLabel: string;
  image: string;
}

export default function Cylinder3DCarousel() {
  const projects: AthleteProject[] = [
    {
      tag1: "MARATHON",
      tag2: "SUB-2H50",
      name: "Thomas M.",
      event: "Marathon de Valence",
      story: "Passé de 3h02 à 2h49'15. Calibrage ultra-précis des blocs allures spécifiques et stratégie de ravitaillement.",
      metric: "2h49'15",
      metricLabel: "RECORD PERSONNEL (-13 MIN)",
      image: "/images/runner-1.webp",
    },
    {
      tag1: "SEMI-MARATHON",
      tag2: "SUB-1H30",
      name: "Léo M.",
      event: "Semi-Marathon",
      story: "Progression spectaculaire de 1h41 à 1h30. Structuration des allures tempo et individualisation complète de la charge sur Nolio.",
      metric: "1h30'12",
      metricLabel: "PROGRESSION : 1H41 ➔ 1H30",
      image: "/images/runner-2.webp",
    },
    {
      tag1: "SEMI-MARATHON",
      tag2: "SEUIL LACTIQUE",
      name: "Sarah L.",
      event: "Semi de Paris",
      story: "Gestion chirurgicale du seuil anaérobie. Aucune défaillance musculaire dans les 5 derniers kilomètres.",
      metric: "1h23'40",
      metricLabel: "CHRONO PULVÉRISÉ (-8 MIN)",
      image: "/images/runner-3.webp",
    },
    {
      tag1: "10 KM ROUTE",
      tag2: "SUB-35'",
      name: "Julien D.",
      event: "10 km de Provence",
      story: "Développement VO2max et économie de foulée. Première barrière sous les 35 minutes franchie avec aisance.",
      metric: "34'48",
      metricLabel: "BARRE SUB-35' VALIDÉE",
      image: "/images/vincent-sprint-sharp.webp",
    },
    {
      tag1: "MARATHON",
      tag2: "PREMIER MARATHON",
      name: "Camille R.",
      event: "Marathon de Paris",
      story: "Premier marathon sans aucun mur au 30ème kilomètre. Charge calibrée en tenant compte de ses 50h de travail hebdomadaire.",
      metric: "3h34'20",
      metricLabel: "PREMIER MARATHON SANS LE MUR",
      image: "/images/marathon-finish.webp",
    },
  ];

  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const angleStep = 360 / projects.length;
  const radius = 440; // 3D cylinder radius

  const rotationRef = useRef(0);
  const velocityRef = useRef(0.08); // Initial gentle idle spin
  const isDraggingRef = useRef(false);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    let animId: number;

    const loop = () => {
      if (!isDraggingRef.current) {
        // Idle gentle float rotation when not dragging
        if (!isHovered) {
          velocityRef.current = velocityRef.current * 0.95 + 0.05 * 0.05;
        } else {
          velocityRef.current *= 0.92;
        }
        rotationRef.current += velocityRef.current;
        setRotation(rotationRef.current);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isHovered]);

  const rotateBy = (direction: number) => {
    velocityRef.current = direction * 2.5;
    rotationRef.current += direction * angleStep;
    setRotation(rotationRef.current);
  };

  const handleStart = (clientX: number) => {
    isDraggingRef.current = true;
    lastXRef.current = clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
  };

  const handleMove = (clientX: number) => {
    if (!isDraggingRef.current) return;
    const now = performance.now();
    const dt = Math.max(1, now - lastTimeRef.current);
    const dx = clientX - lastXRef.current;

    rotationRef.current += dx * 0.35;
    velocityRef.current = (dx / dt) * 8; // momentum velocity

    lastXRef.current = clientX;
    lastTimeRef.current = now;
    setRotation(rotationRef.current);
  };

  const handleEnd = () => {
    isDraggingRef.current = false;
  };

  return (
    <section
      id="records"
      className="py-16 sm:py-24 bg-[#0c0c0b] text-white relative overflow-hidden select-none border-b border-white/5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        handleEnd();
      }}
    >
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-white/[0.02] blur-3xl rounded-full pointer-events-none" />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center mb-10 sm:mb-14 relative z-10">
        <div className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-widest text-neutral-300 bg-white/5 px-4 py-1.5 rounded-full border border-white/10 mb-4 backdrop-blur-sm">
          <Trophy className="w-3.5 h-3.5 text-neutral-300" />
          <span>PALMARÈS 3D DES COUREURS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight">
          DERNIERS RECORDS <br />
          <span className="text-neutral-400">PULVÉRISÉS EN COURSE</span>
        </h2>
        <p className="text-xs sm:text-sm font-mono-tech uppercase tracking-widest text-neutral-400 mt-3 max-w-xl mx-auto">
          Faites glisser le cylindre 3D pour explorer les chronos de nos athlètes
        </p>
      </div>

      {/* 3D Arc Cylinder Viewport */}
      <div
        className="w-full h-[460px] sm:h-[500px] flex items-center justify-center [perspective:1200px] cursor-grab active:cursor-grabbing relative z-10"
        onMouseDown={(e) => handleStart(e.clientX)}
        onMouseMove={(e) => handleMove(e.clientX)}
        onMouseUp={handleEnd}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        onTouchEnd={handleEnd}
      >
        <div
          className="relative w-[340px] sm:w-[380px] h-[350px] [transform-style:preserve-3d] transition-transform duration-75 ease-out"
          style={{
            transform: `rotateY(${rotation}deg)`,
          }}
        >
          {projects.map((proj, idx) => {
            const itemAngle = idx * angleStep;
            // Calculate angle relative to front (0 deg) to apply depth-of-field
            const currentAngle = ((itemAngle + rotation) % 360 + 360) % 360;
            const isFacingFront = currentAngle < 65 || currentAngle > 295;
            const opacity = isFacingFront ? 1 : 0.55;
            const scale = isFacingFront ? 1 : 0.94;

            return (
              <div
                key={idx}
                className="absolute inset-0 bg-[#fbfaf6] text-black rounded-3xl p-6 shadow-[0_25px_50px_rgba(0,0,0,0.5)] flex flex-col justify-between [backface-visibility:hidden] [transform-style:preserve-3d] border border-black/10 transition-[opacity,transform] duration-300"
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px) scale(${scale})`,
                  opacity: opacity,
                }}
              >
                {/* Top Tags */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono-tech font-bold uppercase tracking-wider bg-black text-white px-2.5 py-0.5 rounded-md">
                        {proj.tag1}
                      </span>
                      <span className="text-[10px] font-mono-tech font-bold uppercase tracking-wider bg-[#d4ff00] text-black px-2.5 py-0.5 rounded-md">
                        {proj.tag2}
                      </span>
                    </div>
                    <Flame className="w-4 h-4 text-[#ff4400]" />
                  </div>

                  <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-black leading-tight">
                    {proj.name} — {proj.event}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed mt-2 line-clamp-3 font-normal">
                    {proj.story}
                  </p>
                </div>

                {/* Card Bottom: Photo + Highlighted Metric */}
                <div className="pt-4 border-t border-black/10 flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-neutral-300 flex-shrink-0 shadow-md">
                    <Image
                      src={proj.image}
                      alt={proj.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono-tech font-bold uppercase tracking-wider text-neutral-500 block">
                      {proj.metricLabel}
                    </span>
                    <span className="text-2xl font-black text-black font-mono-tech tracking-tight">
                      {proj.metric}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3D Arc Cylinder Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-10 flex items-center justify-center gap-6 relative z-10">
        <button
          onClick={() => rotateBy(1)}
          className="w-12 h-12 rounded-full bg-white/5 hover:bg-white text-white hover:text-black border border-white/15 flex items-center justify-center transition-all duration-200 shadow-xl hover:scale-110 cursor-pointer backdrop-blur-md"
          aria-label="Projet précédent"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2]" />
        </button>

        <span className="text-xs font-mono-tech uppercase tracking-widest text-neutral-400">
          Glisser pour faire tourner en 3D
        </span>

        <button
          onClick={() => rotateBy(-1)}
          className="w-12 h-12 rounded-full bg-white/5 hover:bg-white text-white hover:text-black border border-white/15 flex items-center justify-center transition-all duration-200 shadow-xl hover:scale-110 cursor-pointer backdrop-blur-md"
          aria-label="Projet suivant"
        >
          <ChevronRight className="w-5 h-5 stroke-[2]" />
        </button>
      </div>
    </section>
  );
}
