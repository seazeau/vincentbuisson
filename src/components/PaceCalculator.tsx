"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calculator, ArrowUpRight, Gauge, Clock, Sparkles, Check } from "lucide-react";
import Tilt3DCard from "./Tilt3DCard";

type RaceDistanceKey = "5k" | "10k" | "semi" | "marathon";

interface DistanceConfig {
  key: RaceDistanceKey;
  label: string;
  shortLabel: string;
  distanceKm: number;
  defaultHours: number;
  defaultMinutes: number;
  defaultSeconds: number;
  presets: { label: string; h: number; m: number; s: number }[];
}

const DISTANCES: DistanceConfig[] = [
  {
    key: "5k",
    label: "5 km",
    shortLabel: "5k",
    distanceKm: 5.0,
    defaultHours: 0,
    defaultMinutes: 22,
    defaultSeconds: 30,
    presets: [
      { label: "25'", h: 0, m: 25, s: 0 },
      { label: "22'30", h: 0, m: 22, s: 30 },
      { label: "20'", h: 0, m: 20, s: 0 },
      { label: "17'30", h: 0, m: 17, s: 30 },
    ],
  },
  {
    key: "10k",
    label: "10 km",
    shortLabel: "10k",
    distanceKm: 10.0,
    defaultHours: 0,
    defaultMinutes: 45,
    defaultSeconds: 0,
    presets: [
      { label: "50'", h: 0, m: 50, s: 0 },
      { label: "45'", h: 0, m: 45, s: 0 },
      { label: "40'", h: 0, m: 40, s: 0 },
      { label: "35'", h: 0, m: 35, s: 0 },
    ],
  },
  {
    key: "semi",
    label: "Semi-Marathon",
    shortLabel: "Semi",
    distanceKm: 21.0975,
    defaultHours: 1,
    defaultMinutes: 40,
    defaultSeconds: 0,
    presets: [
      { label: "1h50", h: 1, m: 50, s: 0 },
      { label: "1h40", h: 1, m: 40, s: 0 },
      { label: "1h30", h: 1, m: 30, s: 0 },
      { label: "1h20", h: 1, m: 20, s: 0 },
    ],
  },
  {
    key: "marathon",
    label: "Marathon",
    shortLabel: "Marathon",
    distanceKm: 42.195,
    defaultHours: 3,
    defaultMinutes: 30,
    defaultSeconds: 0,
    presets: [
      { label: "4h00", h: 4, m: 0, s: 0 },
      { label: "3h45", h: 3, m: 45, s: 0 },
      { label: "3h30", h: 3, m: 30, s: 0 },
      { label: "3h00", h: 3, m: 0, s: 0 },
    ],
  },
];

// Pete Riegel formula: T2 = T1 * (D2 / D1)^1.06
const calculateRiegelTimeMinutes = (
  sourceTimeMinutes: number,
  sourceDistKm: number,
  targetDistKm: number
): number => {
  if (sourceTimeMinutes <= 0 || sourceDistKm <= 0 || targetDistKm <= 0) return 0;
  if (sourceDistKm === targetDistKm) return sourceTimeMinutes;
  return sourceTimeMinutes * Math.pow(targetDistKm / sourceDistKm, 1.06);
};

export default function PaceCalculator() {
  const [activeTab, setActiveTab] = useState<"chrono" | "vma">("chrono");
  const [selectedDistanceKey, setSelectedDistanceKey] = useState<RaceDistanceKey>("10k");

  // Inputs for Chrono mode
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(45);
  const [seconds, setSeconds] = useState<number>(0);

  // Input for VMA mode
  const [vma, setVma] = useState<number>(15.0);

  const selectedDistance = DISTANCES.find((d) => d.key === selectedDistanceKey) || DISTANCES[1];

  // When switching distance, auto-convert the current time to the new distance so numbers stay coherent
  const handleDistanceChange = (newKey: RaceDistanceKey) => {
    if (newKey === selectedDistanceKey) return;
    const newDist = DISTANCES.find((d) => d.key === newKey);
    if (!newDist) return;

    const currentTotalMinutes = hours * 60 + minutes + seconds / 60;
    if (currentTotalMinutes > 0) {
      const convertedMinutes = calculateRiegelTimeMinutes(
        currentTotalMinutes,
        selectedDistance.distanceKm,
        newDist.distanceKm
      );
      const totalSecs = Math.round(convertedMinutes * 60);
      const newH = Math.floor(totalSecs / 3600);
      const newM = Math.floor((totalSecs % 3600) / 60);
      const newS = totalSecs % 60;
      setHours(newH);
      setMinutes(newM);
      setSeconds(newS);
    } else {
      setHours(newDist.defaultHours);
      setMinutes(newDist.defaultMinutes);
      setSeconds(newDist.defaultSeconds);
    }
    setSelectedDistanceKey(newKey);
  };

  const applyPreset = (h: number, m: number, s: number) => {
    setHours(h);
    setMinutes(m);
    setSeconds(s);
  };

  // Format helpers
  const formatTime = (totalMinutes: number) => {
    if (isNaN(totalMinutes) || totalMinutes <= 0 || !isFinite(totalMinutes)) return "--:--";
    const totalSecs = Math.round(totalMinutes * 60);
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;

    if (hrs > 0) {
      return `${hrs}h ${mins < 10 ? "0" : ""}${mins}'${secs < 10 ? "0" : ""}${secs}"`;
    }
    return `${mins}'${secs < 10 ? "0" : ""}${secs}"`;
  };

  const formatPace = (minPerKm: number) => {
    if (isNaN(minPerKm) || minPerKm <= 0 || !isFinite(minPerKm)) return "--:-- /km";
    const totalSecs = Math.round(minPerKm * 60);
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins}'${secs < 10 ? "0" : ""}${secs}" /km`;
  };

  // Calculations for all 4 distances
  const totalInputMinutes = hours * 60 + minutes + seconds / 60;

  let effectiveVma = vma;
  let predictions: {
    key: RaceDistanceKey;
    label: string;
    distanceKm: number;
    timeMinutes: number;
    speedKmH: number;
    paceMinPerKm: number;
    vmaPercentage: number;
    isCurrentInput: boolean;
  }[] = [];

  if (activeTab === "chrono") {
    // 1. Calculate race times with Riegel
    const currentDistKm = selectedDistance.distanceKm;
    const time10kMin = calculateRiegelTimeMinutes(totalInputMinutes, currentDistKm, 10.0);
    const speed10k = (10.0 / (time10kMin / 60));
    effectiveVma = Math.round((speed10k / 0.89) * 10) / 10;

    predictions = DISTANCES.map((d) => {
      const timeMin = calculateRiegelTimeMinutes(totalInputMinutes, currentDistKm, d.distanceKm);
      const speed = (d.distanceKm / (timeMin / 60));
      const pace = timeMin / d.distanceKm;
      const vmaPct = Math.round((speed / effectiveVma) * 100);

      return {
        key: d.key,
        label: d.label,
        distanceKm: d.distanceKm,
        timeMinutes: timeMin,
        speedKmH: Math.round(speed * 10) / 10,
        paceMinPerKm: pace,
        vmaPercentage: vmaPct,
        isCurrentInput: d.key === selectedDistanceKey,
      };
    });
  } else {
    // VMA mode
    effectiveVma = vma;
    const pctMap: Record<RaceDistanceKey, number> = {
      "5k": 0.94,
      "10k": 0.89,
      "semi": 0.84,
      "marathon": 0.78,
    };

    predictions = DISTANCES.map((d) => {
      const pct = pctMap[d.key];
      const speed = vma * pct;
      const timeMin = (d.distanceKm / speed) * 60;
      const pace = timeMin / d.distanceKm;

      return {
        key: d.key,
        label: d.label,
        distanceKm: d.distanceKm,
        timeMinutes: timeMin,
        speedKmH: Math.round(speed * 10) / 10,
        paceMinPerKm: pace,
        vmaPercentage: Math.round(pct * 100),
        isCurrentInput: false,
      };
    });
  }

  // Training Paces (Endurance Fondamentale & Seuil)
  const efSpeedLow = Math.round(effectiveVma * 0.65 * 10) / 10;
  const efSpeedHigh = Math.round(effectiveVma * 0.70 * 10) / 10;
  const efPaceFast = 60 / efSpeedHigh;
  const efPaceSlow = 60 / efSpeedLow;

  const thresholdSpeed = Math.round(effectiveVma * 0.85 * 10) / 10;
  const thresholdPace = 60 / thresholdSpeed;

  return (
    <Tilt3DCard maxTilt={4} className="bg-[#141412] border border-[#2a2a26] rounded-3xl p-4 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
      {/* Background subtle glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-[#242420] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-widest text-neutral-300 bg-white/5 px-3.5 py-1.5 rounded-full border border-white/10 mb-3 backdrop-blur-sm">
            <Calculator className="w-3.5 h-3.5 text-neutral-300" />
            <span>ÉQUIVALENCES CHRONOMÉTRIQUES &amp; PHYSIOLOGIE</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Calculateur d&apos;Équivalences &amp; Allures
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 font-mono-tech">
            Renseignez votre chrono sur 5 km, 10 km, Semi ou Marathon pour obtenir toutes vos équivalences et allures d&apos;entraînement.
          </p>
        </div>

        {/* Tab Switcher: Chrono vs VMA */}
        <div className="flex bg-[#0c0c0b] p-1 rounded-full border border-white/10 self-start sm:self-center shrink-0">
          <button
            onClick={() => setActiveTab("chrono")}
            className={`px-4 py-2 rounded-full text-xs font-mono-tech uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "chrono"
                ? "bg-white text-black font-bold shadow-md"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Par Chrono de Course
          </button>
          <button
            onClick={() => setActiveTab("vma")}
            className={`px-4 py-2 rounded-full text-xs font-mono-tech uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "vma"
                ? "bg-white text-black font-bold shadow-md"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Par VMA
          </button>
        </div>
      </div>

      {/* Controls Section */}
      <div className="mb-10">
        {activeTab === "chrono" ? (
          <div className="bg-[#181816] border border-[#2c2c28] rounded-2xl p-6">
            
            {/* Step 1: Distance Selector */}
            <div className="mb-6">
              <label className="block text-xs font-mono-tech uppercase tracking-wider text-neutral-300 mb-3 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-white" />
                1. Choisissez votre distance de référence :
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {DISTANCES.map((d) => (
                  <button
                    key={d.key}
                    type="button"
                    onClick={() => handleDistanceChange(d.key)}
                    className={`px-4 py-3 rounded-xl font-mono-tech text-xs uppercase tracking-wider font-bold transition-all border cursor-pointer flex items-center justify-center gap-2 ${
                      selectedDistanceKey === d.key
                        ? "bg-white text-black border-white shadow-lg"
                        : "bg-[#10100e] text-neutral-400 border-white/10 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {selectedDistanceKey === d.key && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    )}
                    <span>{d.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Time Inputs + Presets */}
            <div className="pt-4 border-t border-white/10">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                
                {/* Time Inputs */}
                <div>
                  <label className="block text-xs font-mono-tech uppercase tracking-wider text-neutral-300 mb-2">
                    2. Votre temps sur <strong className="text-white">{selectedDistance.label}</strong> :
                  </label>

                  <div className="flex items-center gap-2 sm:gap-3">
                    {/* Hours (useful for Semi & Marathon, available for all) */}
                    <div className="w-20 sm:w-24">
                      <label className="block text-[10px] font-mono-tech uppercase text-neutral-400 mb-1">
                        Heures
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        value={hours}
                        onChange={(e) => setHours(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full bg-[#10100e] border border-white/15 rounded-xl px-3 py-2.5 text-white font-mono-tech font-bold text-center text-lg sm:text-xl focus:border-white focus:outline-none"
                      />
                    </div>

                    <span className="text-white font-mono-tech font-bold text-xl pt-5">:</span>

                    {/* Minutes */}
                    <div className="w-20 sm:w-24">
                      <label className="block text-[10px] font-mono-tech uppercase text-neutral-400 mb-1">
                        Minutes
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="59"
                        value={minutes}
                        onChange={(e) => setMinutes(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
                        className="w-full bg-[#10100e] border border-white/15 rounded-xl px-3 py-2.5 text-white font-mono-tech font-bold text-center text-lg sm:text-xl focus:border-white focus:outline-none"
                      />
                    </div>

                    <span className="text-white font-mono-tech font-bold text-xl pt-5">:</span>

                    {/* Seconds */}
                    <div className="w-20 sm:w-24">
                      <label className="block text-[10px] font-mono-tech uppercase text-neutral-400 mb-1">
                        Secondes
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="59"
                        value={seconds}
                        onChange={(e) => setSeconds(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
                        className="w-full bg-[#10100e] border border-white/15 rounded-xl px-3 py-2.5 text-white font-mono-tech font-bold text-center text-lg sm:text-xl focus:border-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Quick Presets */}
                <div>
                  <span className="block text-[10px] font-mono-tech uppercase tracking-wider text-neutral-400 mb-2">
                    Repères fréquents sur {selectedDistance.label} :
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedDistance.presets.map((preset, pIdx) => (
                      <button
                        key={pIdx}
                        type="button"
                        onClick={() => applyPreset(preset.h, preset.m, preset.s)}
                        className="px-3 py-1.5 rounded-lg bg-[#10100e] hover:bg-white hover:text-black text-neutral-300 border border-white/10 hover:border-white text-xs font-mono-tech font-bold transition-all cursor-pointer"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        ) : (
          <div className="bg-[#181816] border border-[#2c2c28] rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <label className="text-sm font-mono-tech uppercase tracking-wider text-white flex items-center gap-2">
                <Gauge className="w-4 h-4 text-white" />
                Votre VMA estimée :
              </label>
              <span className="text-3xl font-black font-mono-tech text-white">
                {vma.toFixed(1)} <span className="text-xs text-neutral-400">KM/H</span>
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="22"
              step="0.1"
              value={vma}
              onChange={(e) => setVma(parseFloat(e.target.value))}
              className="w-full accent-white cursor-pointer h-2 bg-[#22221e] rounded-lg"
            />
            <div className="flex justify-between text-[10px] font-mono-tech text-neutral-500 mt-3">
              <span>10 KM/H (DÉBUTANT)</span>
              <span>14 KM/H (INTERMÉDIAIRE)</span>
              <span>17 KM/H (AVANCÉ)</span>
              <span>22 KM/H (ÉLITE)</span>
            </div>
          </div>
        )}
      </div>

      {/* 4 Race Equivalences Grid: 5k, 10k, Semi, Marathon */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-mono-tech uppercase tracking-wider text-neutral-300 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            Équivalences chronométriques (Formule Pete Riegel) :
          </p>
          <span className="text-[10px] font-mono-tech text-neutral-400">
            VMA estimée : <strong className="text-white">{effectiveVma.toFixed(1)} km/h</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {predictions.map((pred) => (
            <div
              key={pred.key}
              className={`rounded-2xl p-5 border transition-all relative ${
                pred.isCurrentInput
                  ? "bg-white text-black border-white shadow-xl scale-[1.02]"
                  : "bg-[#10100e] text-white border-white/10 hover:border-white/30"
              }`}
            >
              {/* Card Top: Distance + Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-black uppercase tracking-wider ${pred.isCurrentInput ? "text-black" : "text-white"}`}>
                  {pred.label}
                </span>
                <span
                  className={`text-[9px] font-mono-tech px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                    pred.isCurrentInput
                      ? "bg-black text-white"
                      : "bg-white/10 text-neutral-300"
                  }`}
                >
                  {pred.isCurrentInput ? "VOTRE CHRONO" : "ÉQUIVALENCE"}
                </span>
              </div>

              {/* Main Predicted Chrono */}
              <p
                className={`text-2xl sm:text-3xl font-black font-mono-tech tracking-tight mb-2 ${
                  pred.isCurrentInput ? "text-black" : "text-white"
                }`}
              >
                {formatTime(pred.timeMinutes)}
              </p>

              {/* Pace & Speed */}
              <div
                className={`text-xs font-mono-tech flex items-center justify-between pt-2 border-t ${
                  pred.isCurrentInput ? "border-black/10 text-neutral-800" : "border-white/10 text-neutral-400"
                }`}
              >
                <span>Allure : <strong className={pred.isCurrentInput ? "text-black" : "text-white"}>{formatPace(pred.paceMinPerKm)}</strong></span>
                <span>{pred.speedKmH} km/h</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Training Paces Row (EF & Seuil) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <div className="p-4 rounded-2xl bg-[#10100e] border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono-tech uppercase tracking-wider text-neutral-400 block">
              Endurance Fondamentale (EF • 65-70% VMA)
            </span>
            <p className="text-xl font-black text-white font-mono-tech mt-0.5">
              {formatPace(efPaceFast)} <span className="text-xs font-normal text-neutral-500">à</span> {formatPace(efPaceSlow)}
            </p>
            <span className="text-[10px] font-mono-tech text-neutral-500">
              {efSpeedLow} - {efSpeedHigh} km/h • Footings &amp; assimilation
            </span>
          </div>
          <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono-tech text-neutral-300 uppercase">
            Assimilation
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#10100e] border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono-tech uppercase tracking-wider text-neutral-400 block">
              Allure Seuil / Tempo (~85% VMA)
            </span>
            <p className="text-xl font-black text-white font-mono-tech mt-0.5">
              {formatPace(thresholdPace)}
            </p>
            <span className="text-[10px] font-mono-tech text-neutral-500">
              {thresholdSpeed} km/h • Résistance aérobie &amp; recyclage lactique
            </span>
          </div>
          <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono-tech text-neutral-300 uppercase">
            Seuil
          </span>
        </div>
      </div>

      {/* Coach Note & Conversion */}
      <div className="bg-[#181815] border border-white/10 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-5 sm:gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-hand text-2xl text-white font-normal lowercase tracking-wide -rotate-2">
              L&apos;œil du coach
            </span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-xl leading-relaxed">
            Les formules mathématiques (Riegel) donnent une projection théorique. Mais selon votre indice d&apos;endurance, votre dérive cardiaque et votre historique, votre potentiel réel sur semi ou marathon peut être supérieur.
          </p>
        </div>

        <Link
          href={`/contact/?distance=${selectedDistance.label}&vma=${effectiveVma}`}
          className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-5 sm:px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-black hover:bg-neutral-200 transition-all shadow-xl active:scale-95 text-center"
        >
          <span>Valider mes allures avec Vincent</span>
          <ArrowUpRight className="w-4 h-4 shrink-0 stroke-[2.5]" />
        </Link>
      </div>
    </Tilt3DCard>
  );
}

