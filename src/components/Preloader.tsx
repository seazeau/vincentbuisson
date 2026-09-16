"use client";

import React, { useState, useEffect } from "react";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALISATION PROTOCOLE PERFORMANCE");
  const [isDone, setIsDone] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // If visitor already experienced the preloader in this session, skip immediately for ultra-fast browsing
    if (typeof window !== "undefined" && window.sessionStorage) {
      if (window.sessionStorage.getItem("vb_preloader_seen")) {
        setShouldRender(false);
        return;
      }
    }

    // Disable body scroll while preloader is active
    document.body.style.overflow = "hidden";

    let current = 0;
    const interval = setInterval(() => {
      // Snappy progressive pacing (~1.4s total)
      const increment = current < 25 ? 2 : current < 60 ? 2 : current < 85 ? 2 : 1;
      current += increment;

      if (current >= 100) {
        current = 100;
        setProgress(100);
        setStatusText("SYSTÈME PRÊT • ENTRÉE SUR LA PISTE");
        clearInterval(interval);

        if (typeof window !== "undefined" && window.sessionStorage) {
          window.sessionStorage.setItem("vb_preloader_seen", "true");
        }

        // Brief pause at 100%, then slide curtain up
        setTimeout(() => {
          setIsDone(true);
          document.body.style.overflow = "";

          // Unmount after transition finishes
          setTimeout(() => {
            setShouldRender(false);
          }, 750);
        }, 280);
      } else {
        setProgress(current);
        if (current <= 25) {
          setStatusText("INITIALISATION PROTOCOLE PERFORMANCE");
        } else if (current <= 55) {
          setStatusText("VB COACHING");
        } else if (current <= 80) {
          setStatusText("DIAGNOSTIC DE DÉPART");
        } else {
          setStatusText("CHARGEMENT DES ALLURES");
        }
      }
    }, 22);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a09] text-white px-6 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] select-none ${
        isDone ? "-translate-y-full pointer-events-none" : "translate-y-0"
      }`}
      aria-label="Chargement du site"
      role="status"
    >
      {/* Subtle vintage noise */}
      <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none" />

      {/* Minimal Centerpiece */}
      <div className="relative z-10 w-full max-w-lg flex flex-col items-center text-center">
        
        {/* VB Coaching right above */}
        <p className="font-hand text-3xl sm:text-5xl text-white font-normal -rotate-2 mb-2 tracking-wide lowercase">
          vb coaching
        </p>

        {/* Percentage Counter */}
        <div className="flex items-baseline justify-center font-mono-tech mb-3">
          <span className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tight text-white">
            {progress.toString().padStart(2, "0")}
          </span>
          <span className="text-2xl sm:text-3xl text-neutral-400 font-bold ml-1.5">%</span>
        </div>

        {/* Progressive Volume Line (Weekly training elevation curve tracing from 0 to 100) */}
        <div className="w-full relative h-20 sm:h-24 my-2">
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 400 80"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="volGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
              </linearGradient>
              <clipPath id="volClip">
                <rect x="0" y="0" width={`${Math.max(10, progress * 4.1)}`} height="85" />
              </clipPath>
            </defs>

            {/* Faint target path showing the 8-week progressive buildup */}
            <path
              d="M 10,70 C 40,66 60,56 90,56 C 120,56 140,44 170,44 C 200,44 215,58 235,58 C 265,58 280,32 305,32 C 330,32 345,48 360,48 C 375,48 385,14 395,14"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Gradient fill underneath the active curve */}
            <path
              d="M 10,70 C 40,66 60,56 90,56 C 120,56 140,44 170,44 C 200,44 215,58 235,58 C 265,58 280,32 305,32 C 330,32 345,48 360,48 C 375,48 385,14 395,14 L 395,80 L 10,80 Z"
              fill="url(#volGlow)"
              clipPath="url(#volClip)"
            />

            {/* The Active Glowing Volume Line */}
            <path
              d="M 10,70 C 40,66 60,56 90,56 C 120,56 140,44 170,44 C 200,44 215,58 235,58 C 265,58 280,32 305,32 C 330,32 345,48 360,48 C 375,48 385,14 395,14"
              fill="none"
              stroke="#ffffff"
              strokeWidth="3.5"
              strokeLinecap="round"
              pathLength="100"
              strokeDasharray="100"
              strokeDashoffset={100 - progress}
              style={{ filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))" }}
            />
          </svg>
        </div>

        {/* Milestone Text changing with percentage as before */}
        <p className="mt-4 font-mono-tech text-xs sm:text-sm md:text-base font-bold tracking-widest uppercase text-neutral-300">
          <span className="text-neutral-400 mr-2">//</span>
          {statusText}
        </p>

      </div>
    </div>
  );
}
