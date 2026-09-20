"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { MessageCircle, Send, CheckCircle, ShieldCheck, Clock, UserCheck, ArrowUpRight, Copy, Check, Loader2 } from "lucide-react";
import { SITE_CONFIG } from "@/data/siteContent";
import Tilt3DCard from "./Tilt3DCard";

function SearchParamsWatcher({
  onParams,
}: {
  onParams: (offre: string | null, distance: string | null, vma: string | null) => void;
}) {
  const searchParams = useSearchParams();
  useEffect(() => {
    onParams(searchParams.get("offre"), searchParams.get("distance"), searchParams.get("vma"));
  }, [searchParams, onParams]);
  return null;
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    distance: "Marathon",
    currentRecord: "",
    targetGoal: "",
    weeklyRuns: "3-4",
    plan: "Formule Performance - 70 € / mois (Engagement 6 mois • Recommandé)",
    message: "",
  });

  const handleParams = useCallback((offre: string | null, distance: string | null, vma: string | null) => {
    if (offre === "sans-engagement") {
      setFormData((prev) => ({
        ...prev,
        plan: "Formule Liberté - 90 € / mois (Sans engagement)",
      }));
    } else if (offre === "engagement-6-mois") {
      setFormData((prev) => ({
        ...prev,
        plan: "Formule Performance - 70 € / mois (Engagement 6 mois • Recommandé)",
      }));
    } else if (offre === "bilan-offert") {
      setFormData((prev) => ({
        ...prev,
        plan: "Bilan Initial & Analyse de profil (Offert sous 24h)",
      }));
    }

    if (distance) {
      const lower = distance.toLowerCase();
      if (lower.includes("10")) {
        setFormData((prev) => ({ ...prev, distance: "10 km" }));
      } else if (lower.includes("semi")) {
        setFormData((prev) => ({ ...prev, distance: "Semi-Marathon" }));
      } else if (lower.includes("marathon")) {
        setFormData((prev) => ({ ...prev, distance: "Marathon" }));
      }
    }

    if (vma) {
      setFormData((prev) => ({
        ...prev,
        currentRecord: prev.currentRecord || `VMA estimée : ${vma} km/h (calculateur)`,
      }));
    }
  }, []);

  const [submitted, setSubmitted] = useState(false);
  const [submissionType, setSubmissionType] = useState<"whatsapp" | "email">("whatsapp");
  const [submitMode, setSubmitMode] = useState<"whatsapp" | "email">("whatsapp");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generateSummary = () => {
    return (
      `Bonjour Vincent, voici ma candidature au coaching :\n\n` +
      `• Nom : ${formData.name || "Non précisé"}\n` +
      `• Distance cible : ${formData.distance}\n` +
      `• Formule choisie : ${formData.plan}\n` +
      `• Chrono / Niveau actuel : ${formData.currentRecord || "Non précisé"}\n` +
      `• Objectif visé : ${formData.targetGoal || "Non précisé"}\n` +
      `• Séances par semaine : ${formData.weeklyRuns}\n` +
      (formData.phone ? `• Téléphone : ${formData.phone}\n` : "") +
      (formData.email ? `• Email : ${formData.email}\n` : "") +
      (formData.message ? `• Remarques : ${formData.message}` : "")
    );
  };

  const handleSendWhatsApp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSubmissionType("whatsapp");
    setSubmitted(true);
    const text = encodeURIComponent(generateSummary());
    window.open(`https://wa.me/33614838634?text=${text}`, "_blank");
  };

  const handleSendEmail = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || "Non renseigné",
      distance: formData.distance,
      plan: formData.plan,
      currentRecord: formData.currentRecord || "Non renseigné",
      targetGoal: formData.targetGoal || "Non renseigné",
      weeklyRuns: formData.weeklyRuns,
      message: formData.message || "Aucune remarque",
      _subject: `Candidature Coaching : ${formData.name || "Nouveau Coureur"} (${formData.distance})`,
      _replyto: formData.email,
      _template: "table",
    };

    let sentSuccessfully = false;

    // 1. Tenter l'envoi direct via le script PHP Hostinger
    try {
      const phpRes = await fetch("/send-candidature.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (phpRes.ok) {
        const phpData = await phpRes.json();
        if (phpData.success) {
          sentSuccessfully = true;
        }
      }
    } catch {
      // Échec ou environnement statique, bascule vers FormSubmit
    }

    // 2. Si le script PHP n'a pas répondu ou a échoué, relais FormSubmit vers contact@runpassion.fr
    if (!sentSuccessfully) {
      try {
        const fsRes = await fetch("https://formsubmit.co/ajax/contact@runpassion.fr", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            ...payload,
            "Nom": formData.name,
            "Email": formData.email,
            "Téléphone": formData.phone || "Non renseigné",
            "Distance Cible": formData.distance,
            "Formule": formData.plan,
            "Niveau / VMA": formData.currentRecord || "Non renseigné",
            "Objectif": formData.targetGoal || "Non renseigné",
            "Séances / Semaine": formData.weeklyRuns,
            "Remarques": formData.message || "Aucune",
          }),
        });

        const fsData = await fsRes.json();
        if (fsData.success === "true" || fsData.success === true || fsData.message?.includes("Activate")) {
          sentSuccessfully = true;
        }
      } catch {
        // En cas d'erreur réseau
      }
    }

    setIsSubmitting(false);

    if (sentSuccessfully) {
      setSubmissionType("email");
      setSubmitted(true);
    } else {
      setSubmitError(
        "L'envoi automatique a rencontré une anomalie réseau. Vous pouvez transmettre directement votre candidature via WhatsApp ou ouvrir votre messagerie."
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitMode === "whatsapp") {
      handleSendWhatsApp(e);
    } else {
      handleSendEmail(e);
    }
  };

  const copyToClipboard = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(generateSummary());
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <Tilt3DCard maxTilt={4} className="bg-[#141412] border border-[#2a2a26] rounded-3xl p-6 sm:p-10 shadow-2xl relative">
      {/* Invisible search param watcher in Suspense */}
      <Suspense fallback={null}>
        <SearchParamsWatcher onParams={handleParams} />
      </Suspense>

      {submitted ? (
        <div className="text-center py-12 space-y-4">
          <div className="w-16 h-16 bg-[#d4ff00] text-black rounded-2xl flex items-center justify-center mx-auto shadow-xl">
            <CheckCircle className="w-8 h-8 stroke-[2.5]" />
          </div>
          <h3 className="text-3xl font-black text-white uppercase tracking-tight">Candidature Transmise !</h3>
          <p className="text-[#a0a095] text-sm max-w-md mx-auto leading-relaxed">
            {submissionType === "whatsapp"
              ? "Votre conversation WhatsApp s'est ouverte avec Vincent. Vous recevrez une réponse personnalisée sous 24h."
              : "Votre candidature a été transmise directement à Vincent Buisson (contact@runpassion.fr). Vous recevrez une réponse personnalisée sous 24h."}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`https://wa.me/33614838634?text=${encodeURIComponent(generateSummary())}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3.5 rounded-2xl bg-[#d4ff00] text-black font-black text-xs uppercase tracking-wider hover:bg-white transition-colors shadow-lg"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Ouvrir WhatsApp
            </a>

            <button
              onClick={copyToClipboard}
              className="inline-flex items-center px-6 py-3.5 rounded-2xl bg-[#1e1e1c] text-white border border-[#33332d] hover:border-white font-mono-tech text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2 text-[#d4ff00]" />
                  Texte Copié !
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2 text-[#888880]" />
                  Copier le récapitulatif
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div>
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#d4ff00] bg-[#1c1c18] px-3 py-1 rounded-full border border-[#2e2e28]">
                DIAGNOSTIC EN 2 MINUTES
              </span>
              <span className="font-hand text-xl text-[#d4ff00] -rotate-2">
                Gratuit &amp; Sans engagement
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight mt-2">
              Parlons de Votre Prochain Défi
            </h2>
            <p className="text-[#a0a095] text-xs sm:text-sm mt-2 leading-relaxed font-mono-tech">
              Remplissez ce formulaire. Je vous recontacte sous 24h pour évaluer votre profil et concevoir votre stratégie de course.
            </p>
          </div>

          {/* Direct WhatsApp Callout */}
          <div className="mb-8 p-4 rounded-2xl bg-[#1a1a17] border border-[#2e2e28] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-[#d4ff00] text-black font-black">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-black text-white uppercase">Vous préférez discuter directement ?</p>
                <p className="text-[11px] text-[#888880] font-mono-tech">Réponse directe du coach sous quelques heures.</p>
              </div>
            </div>
            <a
              href={SITE_CONFIG.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-[#242420] border border-[#383832] text-[#d4ff00] hover:bg-[#d4ff00] hover:text-black text-xs font-mono-tech uppercase tracking-wider transition-colors"
            >
              Lancer WhatsApp
            </a>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono-tech uppercase tracking-wider text-[#a0a095] mb-2">
                  Nom &amp; Prénom *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Thomas Martin"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#0c0c0b] border border-[#2c2c28] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4ff00] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-tech uppercase tracking-wider text-[#a0a095] mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="Ex: thomas@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#0c0c0b] border border-[#2c2c28] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4ff00] transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono-tech uppercase tracking-wider text-[#a0a095] mb-2">
                  Téléphone (WhatsApp)
                </label>
                <input
                  type="tel"
                  placeholder="Ex: 06 12 34 56 78"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#0c0c0b] border border-[#2c2c28] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4ff00] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-tech uppercase tracking-wider text-[#a0a095] mb-2">
                  Distance Cible *
                </label>
                <select
                  value={formData.distance}
                  onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
                  className="w-full bg-[#0c0c0b] border border-[#2c2c28] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4ff00] transition-colors"
                >
                  <option value="10 km">10 km sur Route</option>
                  <option value="Semi-Marathon">Semi-Marathon (21,1 km)</option>
                  <option value="Marathon">Marathon (42,195 km)</option>
                  <option value="Remise en forme / Autre">Reprise / Remise en forme</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono-tech uppercase tracking-wider text-[#a0a095] mb-2">
                  Record Actuel ou VMA
                </label>
                <input
                  type="text"
                  placeholder="Ex: 43' au 10 km ou VMA 15 km/h"
                  value={formData.currentRecord}
                  onChange={(e) => setFormData({ ...formData, currentRecord: e.target.value })}
                  className="w-full bg-[#0c0c0b] border border-[#2c2c28] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4ff00] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-tech uppercase tracking-wider text-[#a0a095] mb-2">
                  Chrono Visé &amp; Date
                </label>
                <input
                  type="text"
                  placeholder="Ex: Sub-40' (Paris, Avril)"
                  value={formData.targetGoal}
                  onChange={(e) => setFormData({ ...formData, targetGoal: e.target.value })}
                  className="w-full bg-[#0c0c0b] border border-[#2c2c28] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4ff00] transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono-tech uppercase tracking-wider text-[#a0a095] mb-2">
                  Séances par semaine
                </label>
                <select
                  value={formData.weeklyRuns}
                  onChange={(e) => setFormData({ ...formData, weeklyRuns: e.target.value })}
                  className="w-full bg-[#0c0c0b] border border-[#2c2c28] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4ff00] transition-colors"
                >
                  <option value="2-3">2 à 3 séances</option>
                  <option value="3-4">3 à 4 séances (idéal)</option>
                  <option value="4-5">4 à 5 séances (avancé)</option>
                  <option value="6+">6 séances et plus (élite)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono-tech uppercase tracking-wider text-[#a0a095] mb-2">
                  Formule Souhaitée
                </label>
                <select
                  value={formData.plan}
                  onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                  className="w-full bg-[#0c0c0b] border border-[#2c2c28] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4ff00] transition-colors"
                >
                  <option value="Formule Performance - 70 € / mois (Engagement 6 mois • Recommandé)">
                    Formule Performance — 70 € / mois (Engagement 6 mois • Économie 120€)
                  </option>
                  <option value="Formule Liberté - 90 € / mois (Sans engagement)">
                    Formule Liberté — 90 € / mois (Sans engagement)
                  </option>
                  <option value="Bilan Initial & Analyse de profil (Offert sous 24h)">
                    Bilan Initial &amp; Analyse de profil (100% Offert • Sans engagement)
                  </option>
                  <option value="À définir ensemble avec le coach">
                    Je souhaite un conseil de Vincent pour choisir
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono-tech uppercase tracking-wider text-[#a0a095] mb-2">
                Contraintes de vie, historique de blessure ou remarques
              </label>
              <textarea
                rows={3}
                placeholder="Parlez-moi de votre quotidien (horaires de travail, enfants, historique sportif...)"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-[#0c0c0b] border border-[#2c2c28] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4ff00] transition-colors resize-none"
              />
            </div>

            {submitError && (
              <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-xs font-mono-tech text-red-300 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span>{submitError}</span>
                <a
                  href={`mailto:${SITE_CONFIG.email}?subject=Candidature Coaching - ${encodeURIComponent(formData.name || "Nouveau Coureur")}&body=${encodeURIComponent(generateSummary())}`}
                  className="underline hover:text-white flex-shrink-0"
                >
                  Ouvrir ma messagerie
                </a>
              </div>
            )}

            <div className="space-y-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                onClick={() => setSubmitMode("whatsapp")}
                className="w-full flex items-center justify-center px-8 py-4 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider bg-[#d4ff00] text-black hover:bg-white transition-all shadow-xl shadow-[#d4ff00]/20 cursor-pointer group disabled:opacity-50"
              >
                <MessageCircle className="w-4 h-4 mr-2 fill-current" />
                Envoyer ma candidature via WhatsApp
                <ArrowUpRight className="w-4 h-4 ml-1 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                onClick={() => setSubmitMode("email")}
                className="w-full flex items-center justify-center px-6 py-3.5 rounded-xl text-xs font-mono-tech uppercase tracking-wider bg-[#1a1a18] text-[#a0a095] hover:text-white hover:bg-[#252522] border border-[#2e2e28] transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting && submitMode === "email" ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin text-[#d4ff00]" />
                    Envoi direct à contact@runpassion.fr...
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 mr-2" />
                    Transmettre directement à contact@runpassion.fr
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Trust guarantees below form */}
      <div className="mt-8 pt-6 border-t border-[#262622] grid grid-cols-1 sm:grid-cols-3 gap-4 text-[10px] font-mono-tech text-[#888880] text-center uppercase">
        <div className="flex items-center justify-center space-x-2">
          <Clock className="w-4 h-4 text-[#d4ff00]" />
          <span>Réponse sous 24h</span>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <UserCheck className="w-4 h-4 text-white" />
          <span>Échange direct coach</span>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-[#ff4400]" />
          <span>100% Confidentiel</span>
        </div>
      </div>
    </Tilt3DCard>
  );
}
