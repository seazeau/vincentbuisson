const http = require("http");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const ftp = require("basic-ftp");
const { deploy, loadConfig } = require("./deploy-hostinger");

const PORT = 3002;
const PROJECT_ROOT = path.resolve(__dirname, "..");
const ARTICLES_PATH = path.join(PROJECT_ROOT, "src", "data", "articles.json");
const SITEMAP_PATH = path.join(PROJECT_ROOT, "public", "sitemap.xml");

function loadArticles() {
  try {
    const raw = fs.readFileSync(ARTICLES_PATH, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading articles.json:", err);
    return [];
  }
}

function saveArticles(articles) {
  fs.writeFileSync(ARTICLES_PATH, JSON.stringify(articles, null, 2), "utf-8");
  updateSitemap(articles);
}

function updateSitemap(articles) {
  try {
    const staticUrls = [
      { loc: "https://vincentbuisson.fr/", priority: "1.0", freq: "weekly" },
      { loc: "https://vincentbuisson.fr/coaching-10km/", priority: "0.9", freq: "monthly" },
      { loc: "https://vincentbuisson.fr/coaching-semi-marathon/", priority: "0.9", freq: "monthly" },
      { loc: "https://vincentbuisson.fr/coaching-marathon/", priority: "0.9", freq: "monthly" },
      { loc: "https://vincentbuisson.fr/methode/", priority: "0.8", freq: "monthly" },
      { loc: "https://vincentbuisson.fr/a-propos/", priority: "0.8", freq: "monthly" },
      { loc: "https://vincentbuisson.fr/calculateur-allures/", priority: "0.85", freq: "monthly" },
      { loc: "https://vincentbuisson.fr/contact/", priority: "0.8", freq: "monthly" },
      { loc: "https://vincentbuisson.fr/blog/", priority: "0.9", freq: "weekly" }
    ];

    const today = new Date().toISOString().split("T")[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    for (const u of staticUrls) {
      xml += `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${u.freq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>\n`;
    }

    for (const art of articles) {
      xml += `  <url>\n    <loc>https://vincentbuisson.fr/blog/${art.slug}/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.85</priority>\n  </url>\n`;
    }

    xml += `</urlset>\n`;
    fs.writeFileSync(SITEMAP_PATH, xml, "utf-8");
    console.log("Sitemap updated with", articles.length, "articles.");
  } catch (err) {
    console.error("Error updating sitemap:", err);
  }
}

function getAvailableImages() {
  const imagesDir = path.join(PROJECT_ROOT, "public", "images");
  const curated = [
    { label: "Peloton de Paris (Tunnel)", url: "/images/runner-1.webp" },
    { label: "Coureur Rapide Bitume", url: "/images/hero-speed-sharp.webp" },
    { label: "Coureurs Silhouette Lever de Soleil", url: "/images/runner-3.webp" },
    { label: "Arrivée Marathon", url: "/images/marathon-finish.webp" },
    { label: "Peloton Course sur Route", url: "/images/hero-race-sharp.webp" },
    { label: "Coureur Pleine Foulée", url: "/images/hero-stride-sharp.webp" },
    { label: "Sprint Vincent Buisson", url: "/images/vincent-sprint-sharp.webp" },
    { label: "Vincent en Course", url: "/images/vincent-running.webp" }
  ];

  try {
    if (!fs.existsSync(imagesDir)) return curated;
    const files = fs.readdirSync(imagesDir);
    const validExts = [".webp", ".jpg", ".jpeg", ".png", ".avif", ".gif"];
    const allImages = [...curated];
    const knownUrls = new Set(curated.map(i => i.url));

    const fileStats = files
      .filter(f => validExts.includes(path.extname(f).toLowerCase()))
      .map(f => {
        try {
          return { name: f, time: fs.statSync(path.join(imagesDir, f)).mtime.getTime() };
        } catch {
          return { name: f, time: 0 };
        }
      })
      .sort((a, b) => b.time - a.time);

    for (const item of fileStats) {
      const f = item.name;
      const ext = path.extname(f).toLowerCase();
      const url = `/images/${f}`;
      if (!knownUrls.has(url)) {
        const nameWithoutExt = path.basename(f, ext).replace(/^upload-/, "").replace(/[-_]/g, " ");
        allImages.unshift({
          label: (f.startsWith("upload-") ? "📸 " : "") + (nameWithoutExt.charAt(0).toUpperCase() + nameWithoutExt.slice(1)),
          url,
          isUploaded: f.startsWith("upload-")
        });
        knownUrls.add(url);
      }
    }
    return allImages;
  } catch (err) {
    return curated;
  }
}

const HTML_DASHBOARD = `<!DOCTYPE html>
<html lang="fr" class="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>VB Coaching Running — Administration Blog</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Chivo+Mono:wght@400;600;700&family=Inter:wght@400;600;800;900&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', sans-serif; background-color: #0c0c0b; color: #f2eee4; }
    .font-mono-tech { font-family: 'Chivo Mono', monospace; }
  </style>
</head>
<body class="min-h-screen bg-[#0c0c0b] text-[#f2eee4] pb-24">

  <!-- Top Bar -->
  <header class="border-b border-white/10 bg-[#141412]/80 backdrop-blur-md sticky top-0 z-40 px-6 py-4">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="bg-white text-black px-3 py-1.5 rounded-xl font-black text-xs uppercase tracking-tight">
          VB COACHING RUNNING™
        </div>
        <span class="text-xs font-mono-tech text-[#d4ff00] font-bold bg-[#d4ff00]/10 border border-[#d4ff00]/20 px-2.5 py-1 rounded-full">
          ADMINISTRATION ÉDITORIALE
        </span>
      <div class="flex items-center gap-2 sm:gap-3">
        <button onclick="openConfigModal()" class="bg-white/10 hover:bg-white/20 text-white px-3.5 py-2 rounded-xl text-xs font-mono-tech font-bold uppercase transition-all flex items-center gap-2 border border-white/10" title="Configurer les accès FTP Hostinger">
          <span id="configDot" class="w-2 h-2 rounded-full bg-yellow-500 inline-block animate-pulse"></span>
          <span>⚙️ Config Hostinger</span>
        </button>
        <button onclick="runBuildExport()" id="buildBtn" class="bg-white/10 hover:bg-white/20 text-white px-3.5 py-2 rounded-xl text-xs font-mono-tech font-bold uppercase transition-all flex items-center gap-2 border border-white/10">
          <span>📦 Build out/</span>
        </button>
        <button onclick="openDeployModal()" id="topDeployBtn" class="bg-[#d4ff00] hover:bg-white text-black px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-lg shadow-[#d4ff00]/20">
          <span>🚀 Mettre en ligne</span>
        </button>
        <a href="http://localhost:3001/blog/" target="_blank" class="bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-xl text-xs font-mono-tech font-bold uppercase transition-all flex items-center gap-1 border border-white/10">
          <span>Aperçu ↗</span>
        </a>
      </div>
    </div>
  </header>

  <!-- Main Container -->
  <main class="max-w-7xl mx-auto px-4 sm:px-6 pt-8 space-y-10">
    
    <!-- Header banner -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#181816] border border-white/10 rounded-3xl p-6 sm:p-8">
      <div>
        <h1 class="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
          Gestion des Articles de Blog
        </h1>
        <p class="text-xs sm:text-sm text-neutral-400 font-mono-tech mt-1">
          Rédigez, modifiez et publiez vos articles facilement sans toucher à une seule ligne de code.
        </p>
      </div>
      <button onclick="openNewArticleModal()" class="bg-[#d4ff00] hover:bg-white text-black px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all shadow-xl flex items-center gap-2">
        <span class="text-base">+</span>
        <span>Rédiger un nouvel article</span>
      </button>
    </div>

    <!-- Feedback Toast Notification -->
    <div id="toast" class="hidden fixed bottom-6 right-6 z-50 bg-[#d4ff00] text-black px-6 py-4 rounded-2xl font-bold text-sm shadow-2xl transition-all"></div>

    <!-- Published Articles Table / Cards -->
    <div>
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-black uppercase text-white tracking-tight">
          Articles publiés (<span id="articlesCount">0</span>)
        </h2>
        <span class="text-xs font-mono-tech text-neutral-400">Synchronisé avec articles.json & sitemap.xml</span>
      </div>

      <div id="articlesList" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Injected via JS -->
      </div>
    </div>

    <!-- Form Section (Always visible or toggled) -->
    <div id="editorSection" class="bg-[#181816] border border-[#d4ff00]/40 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
      <div class="flex items-center justify-between border-b border-white/10 pb-4">
        <div class="flex items-center gap-3">
          <span class="w-3 h-3 rounded-full bg-[#d4ff00] animate-pulse"></span>
          <h2 id="editorTitle" class="text-xl sm:text-2xl font-black uppercase text-white">
            Rédiger un nouvel article
          </h2>
        </div>
        <button onclick="resetEditorForm()" class="text-xs font-mono-tech text-neutral-400 hover:text-white uppercase">
          Réinitialiser le formulaire
        </button>
      </div>

      <form id="articleForm" onsubmit="handleSaveArticle(event)" class="space-y-8">
        <input type="hidden" id="articleIndex" value="-1" />

        <!-- 1. Informations Générales -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div class="md:col-span-8 space-y-2">
            <label class="block text-xs font-mono-tech uppercase font-bold text-neutral-300">
              Titre Principal de l'Article *
            </label>
            <input
              type="text"
              id="title"
              required
              oninput="handleTitleInput(this.value)"
              placeholder="Ex: Comment réussir son semi-marathon en moins d'1h30"
              class="w-full bg-[#0c0c0b] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#d4ff00] outline-none font-bold"
            />
          </div>

          <div class="md:col-span-4 space-y-2">
            <label class="block text-xs font-mono-tech uppercase font-bold text-neutral-300">
              Slug d'URL (automatique) *
            </label>
            <input
              type="text"
              id="slug"
              required
              placeholder="comment-reussir-semi-marathon-1h30"
              class="w-full bg-[#0c0c0b] border border-white/10 rounded-xl px-4 py-3 text-[#d4ff00] text-xs font-mono-tech outline-none"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div class="space-y-2">
            <label class="block text-xs font-mono-tech uppercase font-bold text-neutral-300">
              Catégorie *
            </label>
            <select
              id="category"
              class="w-full bg-[#0c0c0b] border border-white/10 rounded-xl px-4 py-3 text-white text-xs font-mono-tech outline-none focus:border-[#d4ff00]"
            >
              <option value="10 km">10 km</option>
              <option value="Semi-Marathon">Semi-Marathon</option>
              <option value="Marathon">Marathon</option>
              <option value="Physiologie & Allures">Physiologie & Allures</option>
            </select>
          </div>

          <div class="space-y-2">
            <label class="block text-xs font-mono-tech uppercase font-bold text-neutral-300">
              Temps de lecture estimé *
            </label>
            <input
              type="text"
              id="readTime"
              required
              placeholder="Ex: 7 MIN"
              class="w-full bg-[#0c0c0b] border border-white/10 rounded-xl px-4 py-3 text-white text-xs font-mono-tech outline-none"
            />
          </div>

          <div class="space-y-2">
            <label class="block text-xs font-mono-tech uppercase font-bold text-neutral-300">
              Date d'affichage *
            </label>
            <input
              type="text"
              id="date"
              required
              placeholder="Ex: 15 MARS 2026"
              class="w-full bg-[#0c0c0b] border border-white/10 rounded-xl px-4 py-3 text-white text-xs font-mono-tech outline-none"
            />
          </div>
        </div>

        <!-- Image Selector & Photo Upload -->
        <div class="space-y-4 bg-[#121210] p-6 rounded-2xl border border-white/5">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <label class="block text-xs font-mono-tech uppercase font-bold text-[#d4ff00]">
                Photo Principale de l'Article *
              </label>
              <p class="text-[11px] font-mono-tech text-neutral-400">
                Sélectionnez une photo dans la bibliothèque ou uploadez un nouveau visuel depuis votre ordinateur.
              </p>
            </div>
            <div>
              <input type="file" id="imageFileInput" accept="image/png,image/jpeg,image/webp,image/avif" class="hidden" onchange="handleImageFileUpload(event)" />
              <button type="button" onclick="document.getElementById('imageFileInput').click()" class="bg-[#d4ff00] hover:bg-white text-black px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2">
                <span>📤 Uploader une photo</span>
              </button>
            </div>
          </div>

          <!-- Drag & Drop Zone -->
          <div
            id="dropZone"
            ondragover="handleDragOver(event)"
            ondragleave="handleDragLeave(event)"
            ondrop="handleDrop(event)"
            onclick="document.getElementById('imageFileInput').click()"
            class="border-2 border-dashed border-white/15 hover:border-[#d4ff00] rounded-2xl p-6 text-center cursor-pointer transition-all bg-[#0c0c0b]/60 hover:bg-[#0c0c0b] flex flex-col items-center justify-center gap-2 group"
          >
            <div id="dropZoneContent" class="flex flex-col items-center gap-1.5">
              <div class="w-10 h-10 rounded-full bg-white/5 group-hover:bg-[#d4ff00]/20 flex items-center justify-center text-lg transition-colors">
                📸
              </div>
              <p class="text-xs font-bold text-white">
                Glissez-déposez une image ici, ou <span class="text-[#d4ff00] underline">parcourez vos fichiers</span>
              </p>
              <p class="text-[10px] font-mono-tech text-neutral-400">
                Formats acceptés : JPG, PNG, WebP (enregistré automatiquement dans public/images/)
              </p>
            </div>
            <div id="uploadSpinner" class="hidden flex items-center gap-2 text-xs font-mono-tech text-[#d4ff00]">
              <span class="animate-spin text-base">⚙️</span> Upload en cours...
            </div>
          </div>

          <!-- Active Preview & Gallery -->
          <div class="grid grid-cols-1 md:grid-cols-12 gap-5 items-start pt-2">
            <!-- Active Preview -->
            <div class="md:col-span-4 bg-[#0c0c0b] border border-white/10 rounded-2xl p-4 space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-[10px] font-mono-tech text-neutral-400 uppercase font-bold">Photo sélectionnée :</span>
                <span class="text-[9px] font-mono-tech bg-[#d4ff00]/10 text-[#d4ff00] border border-[#d4ff00]/30 px-2 py-0.5 rounded-full font-bold">ACTIVE</span>
              </div>
              <div class="h-36 w-full rounded-xl overflow-hidden border border-white/10 relative bg-neutral-900 shadow-inner">
                <img id="selectedImagePreview" src="/images/hero-speed-sharp.webp" alt="Aperçu sélection" class="w-full h-full object-cover" />
              </div>
              <div>
                <label class="block text-[10px] font-mono-tech text-neutral-500 uppercase mb-1">Chemin / URL :</label>
                <input
                  type="text"
                  id="selectedImage"
                  class="w-full bg-[#141412] border border-white/10 rounded-xl px-3 py-2 text-[11px] font-mono-tech text-[#d4ff00] outline-none focus:border-[#d4ff00]"
                  value="/images/hero-speed-sharp.webp"
                  oninput="updateSelectedPreview(this.value)"
                />
              </div>
            </div>

            <!-- Gallery Grid -->
            <div class="md:col-span-8 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-[10px] font-mono-tech text-neutral-400 uppercase font-bold">Bibliothèque disponible (<span id="imagesCount">0</span>) :</span>
                <span class="text-[10px] font-mono-tech text-neutral-500">Cliquez pour choisir</span>
              </div>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-h-56 overflow-y-auto pr-1" id="imageSelector">
                <!-- Injected via JS -->
              </div>
            </div>
          </div>
        </div>

        <!-- Résumé / Chapeau -->
        <div class="space-y-2">
          <label class="block text-xs font-mono-tech uppercase font-bold text-neutral-300">
            Résumé / Chapeau introductif *
          </label>
          <textarea
            id="summary"
            rows="3"
            required
            placeholder="Courte introduction accrocheuse qui pose le problème et donne envie de lire..."
            class="w-full bg-[#0c0c0b] border border-white/10 rounded-xl p-4 text-white text-xs leading-relaxed outline-none focus:border-[#d4ff00]"
          ></textarea>
        </div>

        <!-- Points clés à retenir -->
        <div class="space-y-3 bg-[#121210] p-6 rounded-2xl border border-white/5">
          <div class="flex items-center justify-between">
            <label class="block text-xs font-mono-tech uppercase font-bold text-[#d4ff00]">
              Points clés à retenir (Checklist visuelle)
            </label>
            <button type="button" onclick="addKeyTakeawayField()" class="text-xs font-mono-tech text-white hover:text-[#d4ff00] uppercase font-bold">
              + Ajouter un point
            </button>
          </div>
          <div id="takeawaysContainer" class="space-y-2">
            <!-- Injected via JS -->
          </div>
        </div>

        <!-- Sections de contenu -->
        <div class="space-y-4 bg-[#121210] p-6 rounded-2xl border border-white/5">
          <div class="flex items-center justify-between">
            <div>
              <label class="block text-xs font-mono-tech uppercase font-bold text-[#d4ff00]">
                Corps de l'Article (Sections &amp; Paragraphes)
              </label>
              <p class="text-[11px] font-mono-tech text-neutral-400">Ajoutez des sections avec sous-titres H2 et encadrés coach.</p>
            </div>
            <button type="button" onclick="addSectionField()" class="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg text-xs font-mono-tech uppercase font-bold">
              + Ajouter une section H2
            </button>
          </div>
          <div id="sectionsContainer" class="space-y-6">
            <!-- Injected via JS -->
          </div>
        </div>

        <!-- Fiche Séance Type du Coach (Optionnel) -->
        <div class="space-y-4 bg-[#121210] p-6 rounded-2xl border border-white/5">
          <label class="block text-xs font-mono-tech uppercase font-bold text-[#d4ff00]">
            ⚡ Fiche Séance Type du Coach (Optionnel mais recommandé)
          </label>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              id="workoutTitle"
              placeholder="Titre : Séance étalon à J-10"
              class="w-full bg-[#0c0c0b] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
            />
            <input
              type="text"
              id="workoutWarmup"
              placeholder="Échauffement : 20 min en endurance fondamentale"
              class="w-full bg-[#0c0c0b] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
            />
            <input
              type="text"
              id="workoutMain"
              placeholder="Corps de séance : 3 x 2000m à allure cible (récup 2')"
              class="w-full bg-[#0c0c0b] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
            />
            <input
              type="text"
              id="workoutCooldown"
              placeholder="Retour au calme : 10 min trot souple"
              class="w-full bg-[#0c0c0b] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
            />
          </div>
          <input
            type="text"
            id="workoutTips"
            placeholder="Conseil du coach : Surveillez la dérive cardiaque sur le 3ème bloc..."
            class="w-full bg-[#0c0c0b] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
          />
        </div>

        <!-- Outil ou Offre Liée -->
        <div class="space-y-2">
          <label class="block text-xs font-mono-tech uppercase font-bold text-neutral-300">
            Bannière Outil ou Coaching Recommandé en fin d'article *
          </label>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select id="relatedPreset" onchange="applyRelatedPreset(this.value)" class="bg-[#0c0c0b] border border-white/10 rounded-xl px-4 py-3 text-xs text-white font-mono-tech outline-none">
              <option value="calc">Calculateur d'allures & VMA</option>
              <option value="10k">Coaching 10 km Personnalisé</option>
              <option value="semi">Coaching Semi-Marathon</option>
              <option value="marathon">Coaching Marathon Sub-3h</option>
              <option value="methode">Méthode d'entraînement sur Nolio</option>
              <option value="contact">Bilan running offert</option>
            </select>
            <input type="text" id="relatedLabel" placeholder="Texte du bouton : Calculer vos allures" class="bg-[#0c0c0b] border border-white/10 rounded-xl px-4 py-3 text-xs text-white font-mono-tech outline-none" />
            <input type="hidden" id="relatedUrl" value="/calculateur-allures/" />
          </div>
        </div>

        <!-- Optimisation SEO Google -->
        <div class="space-y-4 bg-black/40 p-6 rounded-2xl border border-white/10">
          <div class="flex items-center gap-2">
            <span class="text-xs font-mono-tech uppercase font-bold text-[#d4ff00]">🔍 Assistant SEO Google (Temps Réel)</span>
          </div>

          <div class="space-y-1">
            <div class="flex items-center justify-between">
              <label class="text-xs font-mono-tech uppercase font-bold text-neutral-300">
                Titre SEO Google (&lt; 60 caractères) *
              </label>
              <span id="seoTitleCount" class="text-xs font-mono-tech text-neutral-400">0 / 60</span>
            </div>
            <input
              type="text"
              id="seoTitle"
              required
              oninput="updateSeoCounts()"
              placeholder="Ex: Plan 10 km Sub-40 : Allure 3'59/km & Séances Clés"
              class="w-full bg-[#0c0c0b] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white font-mono-tech outline-none"
            />
          </div>

          <div class="space-y-1">
            <div class="flex items-center justify-between">
              <label class="text-xs font-mono-tech uppercase font-bold text-neutral-300">
                Meta Description Google (130 - 158 caractères) *
              </label>
              <span id="seoDescCount" class="text-xs font-mono-tech text-neutral-400">0 / 160</span>
            </div>
            <textarea
              id="seoDescription"
              rows="2"
              required
              oninput="updateSeoCounts()"
              placeholder="Ex: Découvrez le plan complet pour courir le 10 km en moins de 40 minutes : VMA requise, séances au seuil et stratégie de négative split..."
              class="w-full bg-[#0c0c0b] border border-white/10 rounded-xl p-3 text-xs text-white font-mono-tech outline-none leading-relaxed"
            ></textarea>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="flex items-center justify-end gap-4 pt-4 border-t border-white/10">
          <button
            type="button"
            onclick="resetEditorForm()"
            class="px-6 py-3 rounded-xl text-xs font-mono-tech text-neutral-400 hover:text-white uppercase font-bold"
          >
            Annuler
          </button>
          <button
            type="submit"
            id="saveBtn"
            class="bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-xl font-mono-tech font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer border border-white/10"
          >
            <span>💾 Enregistrer l'article</span>
          </button>
          <button
            type="button"
            onclick="handleSaveAndDeploy(event)"
            id="saveAndDeployBtn"
            class="bg-[#d4ff00] hover:bg-white text-black px-8 py-4 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-2xl flex items-center gap-2 cursor-pointer shadow-[#d4ff00]/15"
          >
            <span>🚀 Enregistrer &amp; Déployer sur Hostinger</span>
          </button>
        </div>
      </form>
    </div>

    <!-- Hostinger FTP Config Modal -->
    <div id="configModal" class="hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div class="bg-[#181816] border border-[#d4ff00]/40 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
        <div class="flex items-center justify-between border-b border-white/10 pb-4">
          <div class="flex items-center gap-3">
            <span class="text-xl">⚙️</span>
            <div>
              <h3 class="text-lg font-black uppercase text-white">Configuration Accès Hostinger</h3>
              <p class="text-xs text-neutral-400 font-mono-tech">Identifiants FTP nécessaires pour la synchronisation automatique</p>
            </div>
          </div>
          <button onclick="closeConfigModal()" class="text-neutral-400 hover:text-white font-bold text-lg">✕</button>
        </div>

        <div id="configStatusAlert" class="hidden p-3 rounded-xl text-xs font-mono-tech"></div>

        <form id="ftpConfigForm" onsubmit="saveFtpConfig(event)" class="space-y-4">
          <div>
            <label class="block text-xs font-mono-tech font-bold uppercase text-neutral-300 mb-1">
              Hôte FTP Hostinger (Host)
            </label>
            <input
              type="text"
              id="ftpHost"
              placeholder="ex: ftp.vincentbuisson.fr ou access12345.webspace-hosti.net"
              required
              class="w-full bg-[#111110] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#d4ff00] focus:outline-none font-mono-tech"
            />
            <span class="text-[10px] text-neutral-500 font-mono-tech">Disponible dans Hostinger hPanel &gt; Fichiers &gt; Comptes FTP</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-mono-tech font-bold uppercase text-neutral-300 mb-1">
                Utilisateur FTP
              </label>
              <input
                type="text"
                id="ftpUser"
                placeholder="ex: u123456789"
                required
                class="w-full bg-[#111110] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#d4ff00] focus:outline-none font-mono-tech"
              />
            </div>
            <div>
              <label class="block text-xs font-mono-tech font-bold uppercase text-neutral-300 mb-1">
                Mot de passe FTP
              </label>
              <input
                type="password"
                id="ftpPassword"
                placeholder="••••••••••••"
                class="w-full bg-[#111110] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#d4ff00] focus:outline-none font-mono-tech"
              />
              <span id="pwdNotice" class="text-[10px] text-neutral-500 font-mono-tech">Laisser vide si déjà configuré</span>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-mono-tech font-bold uppercase text-neutral-300 mb-1">
                Dossier distant (Target)
              </label>
              <input
                type="text"
                id="ftpRemoteDir"
                value="public_html"
                required
                class="w-full bg-[#111110] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#d4ff00] focus:outline-none font-mono-tech"
              />
            </div>
            <div>
              <label class="block text-xs font-mono-tech font-bold uppercase text-neutral-300 mb-1">
                Port FTP
              </label>
              <input
                type="number"
                id="ftpPort"
                value="21"
                required
                class="w-full bg-[#111110] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#d4ff00] focus:outline-none font-mono-tech"
              />
            </div>
          </div>

          <div class="flex items-center gap-2 pt-2">
            <input type="checkbox" id="ftpSecure" class="rounded border-white/20 bg-neutral-900 text-[#d4ff00]" />
            <label for="ftpSecure" class="text-xs text-neutral-300 font-mono-tech">Activer FTPS / TLS sécurisé</label>
          </div>

          <div class="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
            <button
              type="button"
              onclick="testFtpConnection()"
              id="testConnBtn"
              class="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl text-xs font-mono-tech font-bold uppercase transition-all flex items-center gap-2 border border-white/10"
            >
              <span>🔍 Tester la connexion</span>
            </button>
            <div class="flex items-center gap-2">
              <button
                type="button"
                onclick="closeConfigModal()"
                class="px-4 py-2.5 rounded-xl text-xs font-mono-tech text-neutral-400 hover:text-white"
              >
                Annuler
              </button>
              <button
                type="submit"
                id="saveConfigBtn"
                class="bg-[#d4ff00] hover:bg-white text-black px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-lg"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- Hostinger Fast Deploy Modal -->
    <div id="deployModal" class="hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div class="bg-[#181816] border border-[#d4ff00]/40 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
        <div class="flex items-center justify-between border-b border-white/10 pb-4">
          <div class="flex items-center gap-3">
            <span class="text-xl">🚀</span>
            <div>
              <h3 class="text-lg font-black uppercase text-white">Mise en Ligne sur Hostinger</h3>
              <p class="text-xs text-neutral-400 font-mono-tech">Génération statique &amp; synchronisation FTP</p>
            </div>
          </div>
          <button onclick="closeDeployModal()" class="text-neutral-400 hover:text-white font-bold text-lg">✕</button>
        </div>

        <div class="space-y-4">
          <div class="bg-[#121210] border border-white/10 rounded-2xl p-4 space-y-2">
            <div class="flex items-center justify-between text-xs font-mono-tech">
              <span class="text-neutral-400">Domaine de destination :</span>
              <span class="text-white font-bold">https://vincentbuisson.fr</span>
            </div>
            <div class="flex items-center justify-between text-xs font-mono-tech">
              <span class="text-neutral-400">Dossier cible Hostinger :</span>
              <span id="deployTargetDir" class="text-[#d4ff00] font-bold">public_html</span>
            </div>
            <div class="flex items-center justify-between text-xs font-mono-tech">
              <span class="text-neutral-400">Serveur FTP :</span>
              <span id="deployFtpHost" class="text-white">Chargement...</span>
            </div>
          </div>

          <!-- Live Console Output -->
          <div id="deployConsole" class="hidden bg-black/90 border border-white/15 rounded-2xl p-4 font-mono-tech text-xs space-y-2 max-h-48 overflow-y-auto text-[#d4ff00]">
            <!-- Messages logged here -->
          </div>

          <div id="deployResultAlert" class="hidden p-4 rounded-2xl text-xs font-mono-tech"></div>
        </div>

        <div class="pt-4 border-t border-white/10 flex items-center justify-between">
          <button
            type="button"
            onclick="openConfigModal()"
            class="text-xs font-mono-tech text-neutral-400 hover:text-[#d4ff00] underline"
          >
            Modifier la configuration FTP ↗
          </button>
          <div class="flex items-center gap-2">
            <button
              type="button"
              onclick="closeDeployModal()"
              class="px-4 py-2.5 rounded-xl text-xs font-mono-tech text-neutral-400 hover:text-white"
            >
              Fermer
            </button>
            <button
              type="button"
              onclick="startDeployProcess()"
              id="startDeployBtn"
              class="bg-[#d4ff00] hover:bg-white text-black px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-xl shadow-[#d4ff00]/20 flex items-center gap-2"
            >
              <span>🚀 Déployer maintenant</span>
            </button>
          </div>
        </div>
      </div>
    </div>

  </main>

  <script>
    let articles = [];
    let availableImages = [];

    async function fetchArticles() {
      try {
        const res = await fetch("/api/articles");
        articles = await res.json();
        renderArticlesList();
      } catch (err) {
        console.error("Erreur chargement articles:", err);
      }
    }

    async function fetchImages() {
      try {
        const res = await fetch("/api/images");
        availableImages = await res.json();
        const countEl = document.getElementById("imagesCount");
        if (countEl) countEl.textContent = availableImages.length;
        const currentSelected = document.getElementById("selectedImage").value || (availableImages[0] ? availableImages[0].url : "");
        updateSelectedPreview(currentSelected);
        renderImageSelector(currentSelected);
      } catch (err) {
        console.error("Erreur chargement images:", err);
      }
    }

    function renderArticlesList() {
      const container = document.getElementById("articlesList");
      document.getElementById("articlesCount").textContent = articles.length;
      container.innerHTML = "";

      articles.forEach((art, idx) => {
        const card = document.createElement("div");
        card.className = "bg-[#141412] border border-white/5 hover:border-white/20 rounded-2xl p-5 flex flex-col justify-between space-y-4";
        card.innerHTML = \`
          <div>
            <div class="relative w-full h-36 rounded-xl overflow-hidden mb-3 bg-neutral-900 border border-white/5">
              <img src="\${art.image}" alt="\${art.title}" class="w-full h-full object-cover" />
              <span class="absolute top-2 right-2 text-[10px] font-mono-tech font-bold bg-black/80 px-2 py-0.5 rounded text-white">\${art.readTime}</span>
              <span class="absolute bottom-2 left-2 text-[10px] font-mono-tech font-bold bg-[#d4ff00] text-black px-2 py-0.5 rounded">\${art.category}</span>
            </div>
            <div class="text-[11px] font-mono-tech text-neutral-400 mb-1">\${art.date}</div>
            <h3 class="text-sm font-bold text-white line-clamp-2 leading-snug mb-2">\${art.title}</h3>
            <p class="text-xs text-neutral-400 line-clamp-2 leading-relaxed font-mono-tech">\${art.summary}</p>
          </div>
          <div class="flex items-center justify-between pt-3 border-t border-white/5">
            <a href="http://localhost:3001/blog/\${art.slug}/" target="_blank" class="text-xs font-mono-tech text-[#d4ff00] hover:underline font-bold">
              Voir ↗
            </a>
            <div class="flex items-center gap-2">
              <button onclick="editArticle(\${idx})" class="text-xs font-mono-tech bg-white/10 hover:bg-white/20 px-3 py-1 rounded text-white font-bold">
                Modifier
              </button>
              <button onclick="deleteArticle(\${idx})" class="text-xs font-mono-tech bg-red-500/20 hover:bg-red-500/30 text-red-400 px-2.5 py-1 rounded font-bold">
                ✕
              </button>
            </div>
          </div>
        \`;
        container.appendChild(card);
      });
    }

    function updateSelectedPreview(url) {
      const img = document.getElementById("selectedImagePreview");
      if (img && url) {
        img.src = url;
      }
    }

    function renderImageSelector(selectedUrl) {
      const container = document.getElementById("imageSelector");
      if (!container) return;
      container.innerHTML = "";

      availableImages.forEach(img => {
        const isSelected = img.url === selectedUrl;
        const div = document.createElement("div");
        div.className = \`relative rounded-xl overflow-hidden border-2 cursor-pointer transition-all h-20 \${isSelected ? 'border-[#d4ff00] scale-105 shadow-lg ring-2 ring-[#d4ff00]/40' : 'border-white/10 opacity-70 hover:opacity-100 hover:border-white/30'}\`;
        div.onclick = () => {
          document.getElementById("selectedImage").value = img.url;
          updateSelectedPreview(img.url);
          renderImageSelector(img.url);
        };
        div.innerHTML = \`
          <img src="\${img.url}" alt="\${img.label}" class="w-full h-full object-cover" />
          <span class="absolute bottom-1 left-1 right-1 text-[9px] font-mono-tech bg-black/85 px-1.5 py-0.5 rounded truncate text-white block">\${img.label}</span>
          \${img.isUploaded ? '<span class="absolute top-1 right-1 text-[8px] font-mono-tech bg-[#d4ff00] text-black font-bold px-1 py-0.2 rounded">NOUVEAU</span>' : ''}
        \`;
        container.appendChild(div);
      });
    }

    function handleDragOver(e) {
      e.preventDefault();
      e.stopPropagation();
      const zone = document.getElementById("dropZone");
      if (zone) zone.classList.add("border-[#d4ff00]", "bg-[#d4ff00]/10");
    }

    function handleDragLeave(e) {
      e.preventDefault();
      e.stopPropagation();
      const zone = document.getElementById("dropZone");
      if (zone) zone.classList.remove("border-[#d4ff00]", "bg-[#d4ff00]/10");
    }

    function handleDrop(e) {
      e.preventDefault();
      e.stopPropagation();
      const zone = document.getElementById("dropZone");
      if (zone) zone.classList.remove("border-[#d4ff00]", "bg-[#d4ff00]/10");
      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        uploadImageFile(files[0]);
      }
    }

    function handleImageFileUpload(e) {
      const files = e.target.files;
      if (files && files.length > 0) {
        uploadImageFile(files[0]);
      }
    }

    async function uploadImageFile(file) {
      if (!file.type.startsWith("image/")) {
        alert("Veuillez sélectionner un fichier image valide (JPG, PNG, WebP).");
        return;
      }

      const spinner = document.getElementById("uploadSpinner");
      const content = document.getElementById("dropZoneContent");
      if (spinner) spinner.classList.remove("hidden");
      if (content) content.classList.add("hidden");

      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const res = await fetch("/api/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ filename: file.name, dataUrl: event.target.result })
          });
          const data = await res.json();
          if (data.success) {
            availableImages.unshift({
              label: "📸 " + data.label,
              url: data.url,
              isUploaded: true
            });
            const countEl = document.getElementById("imagesCount");
            if (countEl) countEl.textContent = availableImages.length;
            document.getElementById("selectedImage").value = data.url;
            updateSelectedPreview(data.url);
            renderImageSelector(data.url);
            showToast("Photo '" + data.filename + "' uploadée avec succès !");
          } else {
            alert("Erreur lors de l'upload : " + data.error);
          }
        } catch (err) {
          alert("Erreur réseau lors de l'upload : " + err.message);
        } finally {
          if (spinner) spinner.classList.add("hidden");
          if (content) content.classList.remove("hidden");
        }
      };
      reader.readAsDataURL(file);
    }

    function handleTitleInput(title) {
      const slugInput = document.getElementById("slug");
      const seoTitleInput = document.getElementById("seoTitle");
      if (!slugInput.dataset.manual) {
        slugInput.value = title
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\\u0300-\\u036f]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");
      }
      if (!seoTitleInput.dataset.manual) {
        seoTitleInput.value = title.slice(0, 60);
      }
      updateSeoCounts();
    }

    function updateSeoCounts() {
      const title = document.getElementById("seoTitle").value;
      const desc = document.getElementById("seoDescription").value;
      
      const titleCount = document.getElementById("seoTitleCount");
      titleCount.textContent = \`\${title.length} / 60\`;
      titleCount.className = title.length > 60 ? "text-xs font-mono-tech text-red-400 font-bold" : "text-xs font-mono-tech text-green-400 font-bold";

      const descCount = document.getElementById("seoDescCount");
      descCount.textContent = \`\${desc.length} / 160\`;
      if (desc.length >= 130 && desc.length <= 158) {
        descCount.className = "text-xs font-mono-tech text-green-400 font-bold";
      } else {
        descCount.className = "text-xs font-mono-tech text-yellow-400 font-bold";
      }
    }

    function addKeyTakeawayField(value = "") {
      const container = document.getElementById("takeawaysContainer");
      const div = document.createElement("div");
      div.className = "flex items-center gap-2";
      div.innerHTML = \`
        <span class="text-[#d4ff00]">✓</span>
        <input type="text" value="\${value.replace(/"/g, '&quot;')}" class="takeaway-item flex-grow bg-[#0c0c0b] border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none" placeholder="Point clé..." />
        <button type="button" onclick="this.parentElement.remove()" class="text-neutral-500 hover:text-red-400 text-xs px-2">✕</button>
      \`;
      container.appendChild(div);
    }

    function addSectionField(data = { heading: "", body: [""], callout: null }) {
      const container = document.getElementById("sectionsContainer");
      const div = document.createElement("div");
      div.className = "section-item bg-[#161614] border border-white/10 rounded-2xl p-5 space-y-3";
      div.innerHTML = \`
        <div class="flex items-center justify-between">
          <input type="text" class="section-heading w-3/4 bg-[#0c0c0b] border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-bold outline-none" placeholder="Titre de la section (ex: 1. Les prérequis...)" value="\${(data.heading || '').replace(/"/g, '&quot;')}" />
          <button type="button" onclick="this.closest('.section-item').remove()" class="text-neutral-500 hover:text-red-400 text-xs font-mono-tech">Supprimer section</button>
        </div>
        <textarea rows="4" class="section-body w-full bg-[#0c0c0b] border border-white/10 rounded-xl p-3 text-xs text-neutral-300 outline-none leading-relaxed" placeholder="Paragraphes de contenu (séparez les paragraphes par un saut de ligne)...">\${(data.body || []).join('\\n\\n')}</textarea>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <input type="text" class="callout-title bg-[#0c0c0b] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-[#d4ff00] font-mono-tech outline-none" placeholder="Titre encadré (ex: Le repère du coach)" value="\${(data.callout?.title || '').replace(/"/g, '&quot;')}" />
          <input type="text" class="callout-text bg-[#0c0c0b] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-neutral-300 outline-none" placeholder="Texte de l'encadré coach..." value="\${(data.callout?.text || '').replace(/"/g, '&quot;')}" />
        </div>
      \`;
      container.appendChild(div);
    }

    function applyRelatedPreset(preset) {
      const label = document.getElementById("relatedLabel");
      const url = document.getElementById("relatedUrl");
      switch(preset) {
        case "calc":
          label.value = "Calculer vos allures d'EF et de VMA";
          url.value = "/calculateur-allures/";
          break;
        case "10k":
          label.value = "Découvrir le programme 10 km";
          url.value = "/coaching-10km/";
          break;
        case "semi":
          label.value = "Découvrir la préparation semi-marathon";
          url.value = "/coaching-semi-marathon/";
          break;
        case "marathon":
          label.value = "Découvrir la préparation marathon";
          url.value = "/coaching-marathon/";
          break;
        case "methode":
          label.value = "Comprendre notre méthode Nolio";
          url.value = "/methode/";
          break;
        case "contact":
          label.value = "Demander un bilan running offert";
          url.value = "/contact/";
          break;
      }
    }

    function editArticle(idx) {
      const art = articles[idx];
      document.getElementById("articleIndex").value = idx;
      document.getElementById("editorTitle").textContent = "Modifier l'article : " + art.title;
      document.getElementById("title").value = art.title;
      document.getElementById("slug").value = art.slug;
      document.getElementById("category").value = art.category;
      document.getElementById("readTime").value = art.readTime;
      document.getElementById("date").value = art.date;
      document.getElementById("summary").value = art.summary;
      document.getElementById("seoTitle").value = art.seoTitle;
      document.getElementById("seoDescription").value = art.seoDescription;
      document.getElementById("selectedImage").value = art.image;
      updateSelectedPreview(art.image);
      renderImageSelector(art.image);

      // Takeaways
      const tkContainer = document.getElementById("takeawaysContainer");
      tkContainer.innerHTML = "";
      (art.keyTakeaways || []).forEach(t => addKeyTakeawayField(t));

      // Sections
      const secContainer = document.getElementById("sectionsContainer");
      secContainer.innerHTML = "";
      (art.sections || []).forEach(s => addSectionField(s));

      // Workout
      if (art.workoutExample) {
        document.getElementById("workoutTitle").value = art.workoutExample.title || "";
        document.getElementById("workoutWarmup").value = art.workoutExample.warmup || "";
        document.getElementById("workoutMain").value = art.workoutExample.mainSet || "";
        document.getElementById("workoutCooldown").value = art.workoutExample.cooldown || "";
        document.getElementById("workoutTips").value = art.workoutExample.coachTips || "";
      } else {
        document.getElementById("workoutTitle").value = "";
        document.getElementById("workoutWarmup").value = "";
        document.getElementById("workoutMain").value = "";
        document.getElementById("workoutCooldown").value = "";
        document.getElementById("workoutTips").value = "";
      }

      // Related
      document.getElementById("relatedLabel").value = art.relatedServiceLabel || "";
      document.getElementById("relatedUrl").value = art.relatedServiceUrl || "/calculateur-allures/";

      updateSeoCounts();
      document.getElementById("editorSection").scrollIntoView({ behavior: "smooth" });
    }

    function resetEditorForm() {
      document.getElementById("articleForm").reset();
      document.getElementById("articleIndex").value = "-1";
      document.getElementById("editorTitle").textContent = "Rédiger un nouvel article";
      document.getElementById("takeawaysContainer").innerHTML = "";
      document.getElementById("sectionsContainer").innerHTML = "";
      addKeyTakeawayField();
      addKeyTakeawayField();
      addSectionField();
      applyRelatedPreset("calc");
      const todayFr = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date()).toUpperCase();
      document.getElementById("date").value = todayFr;
      const defaultImg = (availableImages[0] && availableImages[0].url) || "/images/hero-speed-sharp.webp";
      document.getElementById("selectedImage").value = defaultImg;
      updateSelectedPreview(defaultImg);
      renderImageSelector(defaultImg);
      updateSeoCounts();
    }

    function openNewArticleModal() {
      resetEditorForm();
      document.getElementById("editorSection").scrollIntoView({ behavior: "smooth" });
    }

    async function handleSaveArticle(e) {
      e.preventDefault();
      const saveBtn = document.getElementById("saveBtn");
      saveBtn.disabled = true;
      saveBtn.textContent = "⏳ Enregistrement...";

      const idx = parseInt(document.getElementById("articleIndex").value, 10);

      // Gather takeaways
      const takeaways = Array.from(document.querySelectorAll(".takeaway-item"))
        .map(i => i.value.trim())
        .filter(Boolean);

      // Gather sections
      const sections = Array.from(document.querySelectorAll(".section-item")).map(el => {
        const heading = el.querySelector(".section-heading").value.trim();
        const bodyText = el.querySelector(".section-body").value.trim();
        const body = bodyText.split(/\\n\\n+/).map(p => p.trim()).filter(Boolean);
        const callTitle = el.querySelector(".callout-title").value.trim();
        const callText = el.querySelector(".callout-text").value.trim();
        const section = {
          id: heading.toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g, "").replace(/[^a-z0-9]+/g, "-"),
          heading,
          body
        };
        if (callTitle && callText) {
          section.callout = { title: callTitle, text: callText };
        }
        return section;
      }).filter(s => s.heading);

      // Workout
      const wTitle = document.getElementById("workoutTitle").value.trim();
      let workoutExample = undefined;
      if (wTitle) {
        workoutExample = {
          title: wTitle,
          warmup: document.getElementById("workoutWarmup").value.trim(),
          mainSet: document.getElementById("workoutMain").value.trim(),
          cooldown: document.getElementById("workoutCooldown").value.trim(),
          coachTips: document.getElementById("workoutTips").value.trim()
        };
      }

      const newArticle = {
        slug: document.getElementById("slug").value.trim(),
        title: document.getElementById("title").value.trim(),
        seoTitle: document.getElementById("seoTitle").value.trim(),
        seoDescription: document.getElementById("seoDescription").value.trim(),
        category: document.getElementById("category").value,
        readTime: document.getElementById("readTime").value.trim() || "6 MIN",
        date: document.getElementById("date").value.trim(),
        publishedAt: new Date().toISOString().split("T")[0],
        image: document.getElementById("selectedImage").value,
        summary: document.getElementById("summary").value.trim(),
        keyTakeaways: takeaways,
        sections: sections,
        workoutExample: workoutExample,
        faqs: [],
        relatedSlugs: ["endurance-fondamentale-zone-2-running", "courir-10km-moins-40-minutes"],
        relatedServiceUrl: document.getElementById("relatedUrl").value,
        relatedServiceLabel: document.getElementById("relatedLabel").value
      };

      try {
        const res = await fetch("/api/articles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ article: newArticle, index: idx })
        });
        const result = await res.json();
        if (result.success) {
          showToast("Article enregistré avec succès ! ✨");
          fetchArticles();
          resetEditorForm();
        } else {
          alert("Erreur: " + result.error);
        }
      } catch (err) {
        alert("Erreur réseau: " + err.message);
      } finally {
        saveBtn.disabled = false;
        saveBtn.textContent = "💾 Enregistrer & Publier l'article";
      }
    }

    async function deleteArticle(idx) {
      if (!confirm("Voulez-vous vraiment supprimer cet article ?")) return;
      try {
        const res = await fetch("/api/articles?index=" + idx, { method: "DELETE" });
        const result = await res.json();
        if (result.success) {
          showToast("Article supprimé.");
          fetchArticles();
        }
      } catch (err) {
        alert("Erreur: " + err.message);
      }
    }

    async function runBuildExport() {
      const btn = document.getElementById("buildBtn");
      btn.textContent = "⏳ Génération de l'export...";
      btn.disabled = true;
      try {
        const res = await fetch("/api/build", { method: "POST" });
        const result = await res.json();
        if (result.success) {
          showToast("Export statique généré dans /out/ ! Prêt pour Hostinger 🚀");
        } else {
          alert("Erreur build: " + result.error);
        }
      } catch (err) {
        alert("Erreur: " + err.message);
      } finally {
        btn.textContent = "⚙️ Générer l'export Hostinger";
        btn.disabled = false;
      }
    }

    let deployConfig = { host: "", user: "", remoteDir: "public_html", port: 21, secure: false, isConfigured: false };

    async function fetchDeployConfig() {
      try {
        const res = await fetch("/api/deploy-config");
        deployConfig = await res.json();
        const dot = document.getElementById("configDot");
        if (dot) {
          if (deployConfig.isConfigured) {
            dot.className = "w-2 h-2 rounded-full bg-emerald-400 inline-block";
          } else {
            dot.className = "w-2 h-2 rounded-full bg-yellow-400 inline-block animate-pulse";
          }
        }
        const deployHostEl = document.getElementById("deployFtpHost");
        if (deployHostEl) {
          deployHostEl.textContent = deployConfig.host || "Non configuré";
        }
        const deployDirEl = document.getElementById("deployTargetDir");
        if (deployDirEl) {
          deployDirEl.textContent = deployConfig.remoteDir || "public_html";
        }
      } catch (err) {
        console.error("Erreur config:", err);
      }
    }

    function openConfigModal() {
      document.getElementById("ftpHost").value = deployConfig.host || "";
      document.getElementById("ftpUser").value = deployConfig.user || "";
      document.getElementById("ftpPassword").value = "";
      document.getElementById("ftpRemoteDir").value = deployConfig.remoteDir || "public_html";
      document.getElementById("ftpPort").value = deployConfig.port || 21;
      document.getElementById("ftpSecure").checked = Boolean(deployConfig.secure);
      const alertBox = document.getElementById("configStatusAlert");
      alertBox.classList.add("hidden");
      document.getElementById("configModal").classList.remove("hidden");
    }

    function closeConfigModal() {
      document.getElementById("configModal").classList.add("hidden");
    }

    async function saveFtpConfig(e) {
      e.preventDefault();
      const saveBtn = document.getElementById("saveConfigBtn");
      saveBtn.disabled = true;
      saveBtn.textContent = "⏳ Enregistrement...";

      const payload = {
        host: document.getElementById("ftpHost").value.trim(),
        user: document.getElementById("ftpUser").value.trim(),
        password: document.getElementById("ftpPassword").value,
        remoteDir: document.getElementById("ftpRemoteDir").value.trim(),
        port: parseInt(document.getElementById("ftpPort").value, 10),
        secure: document.getElementById("ftpSecure").checked
      };

      try {
        const res = await fetch("/api/deploy-config", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          showToast("Configuration Hostinger sauvegardée !");
          await fetchDeployConfig();
          closeConfigModal();
        } else {
          alert("Erreur: " + data.error);
        }
      } catch (err) {
        alert("Erreur: " + err.message);
      } finally {
        saveBtn.disabled = false;
        saveBtn.textContent = "Enregistrer";
      }
    }

    async function testFtpConnection() {
      const btn = document.getElementById("testConnBtn");
      const alertBox = document.getElementById("configStatusAlert");
      btn.disabled = true;
      btn.textContent = "⏳ Test en cours...";
      alertBox.className = "p-3 rounded-xl text-xs font-mono-tech bg-white/10 text-white flex items-center gap-2";
      alertBox.textContent = "Connexion au serveur FTP Hostinger...";
      alertBox.classList.remove("hidden");

      const payload = {
        host: document.getElementById("ftpHost").value.trim(),
        user: document.getElementById("ftpUser").value.trim(),
        password: document.getElementById("ftpPassword").value,
        remoteDir: document.getElementById("ftpRemoteDir").value.trim(),
        port: parseInt(document.getElementById("ftpPort").value, 10),
        secure: document.getElementById("ftpSecure").checked
      };

      try {
        const res = await fetch("/api/deploy-test", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          alertBox.className = "p-3 rounded-xl text-xs font-mono-tech bg-emerald-950/80 border border-emerald-500/50 text-emerald-300";
          alertBox.textContent = "✅ Succès ! Connexion Hostinger validée (" + data.fileCount + " fichiers/dossiers détectés).";
        } else {
          alertBox.className = "p-3 rounded-xl text-xs font-mono-tech bg-red-950/80 border border-red-500/50 text-red-300";
          alertBox.textContent = "❌ Échec de la connexion : " + data.error;
        }
      } catch (err) {
        alertBox.className = "p-3 rounded-xl text-xs font-mono-tech bg-red-950/80 border border-red-500/50 text-red-300";
        alertBox.textContent = "❌ Erreur réseau : " + err.message;
      } finally {
        btn.disabled = false;
        btn.textContent = "🔍 Tester la connexion";
      }
    }

    function openDeployModal() {
      if (!deployConfig.isConfigured) {
        openConfigModal();
        const alertBox = document.getElementById("configStatusAlert");
        alertBox.className = "p-3 rounded-xl text-xs font-mono-tech bg-yellow-950/80 border border-yellow-500/50 text-yellow-300";
        alertBox.textContent = "⚠️ Veuillez renseigner vos identifiants FTP Hostinger avant de lancer le déploiement.";
        alertBox.classList.remove("hidden");
        return;
      }
      document.getElementById("deployResultAlert").classList.add("hidden");
      document.getElementById("deployConsole").classList.add("hidden");
      document.getElementById("deployConsole").innerHTML = "";
      document.getElementById("startDeployBtn").disabled = false;
      document.getElementById("startDeployBtn").innerHTML = "<span>🚀 Déployer maintenant</span>";
      document.getElementById("deployModal").classList.remove("hidden");
    }

    function closeDeployModal() {
      document.getElementById("deployModal").classList.add("hidden");
    }

    async function startDeployProcess() {
      const btn = document.getElementById("startDeployBtn");
      const consoleEl = document.getElementById("deployConsole");
      const resultAlert = document.getElementById("deployResultAlert");

      btn.disabled = true;
      btn.innerHTML = "<span>⏳ Déploiement en cours...</span>";
      resultAlert.classList.add("hidden");
      consoleEl.classList.remove("hidden");
      consoleEl.innerHTML = "<div>[" + new Date().toLocaleTimeString() + "] 📦 Étape 1/2 : Compilation statique Next.js (npm run build)...</div>";

      try {
        const res = await fetch("/api/deploy", { method: "POST" });
        const data = await res.json();

        if (data.success) {
          consoleEl.innerHTML += "<div>[" + new Date().toLocaleTimeString() + "] 🚀 Étape 2/2 : Connexion FTP Hostinger et téléversement...</div>" +
            "<div class=\"text-emerald-400 font-bold\">[" + new Date().toLocaleTimeString() + "] ✅ Déploiement terminé avec succès en " + data.elapsedSeconds + "s !</div>";
          resultAlert.className = "p-4 rounded-2xl text-xs font-mono-tech bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3";
          resultAlert.innerHTML = "<div><div class=\"font-bold text-sm\">🎉 Félicitations ! Votre site est en ligne.</div>" +
            "<div class=\"text-neutral-300\">Synchronisation Hostinger réussie en " + data.elapsedSeconds + " secondes.</div></div>" +
            "<a href=\"https://vincentbuisson.fr/\" target=\"_blank\" class=\"bg-emerald-400 hover:bg-white text-black font-black px-4 py-2 rounded-xl uppercase text-xs\">Visiter le site ↗</a>";
          resultAlert.classList.remove("hidden");
          showToast("Site mis en ligne sur Hostinger en " + data.elapsedSeconds + "s ! 🚀");
        } else {
          consoleEl.innerHTML += "<div class=\"text-red-400 font-bold\">[" + new Date().toLocaleTimeString() + "] ❌ Erreur : " + data.error + "</div>";
          resultAlert.className = "p-4 rounded-2xl text-xs font-mono-tech bg-red-950/80 border border-red-500/50 text-red-200";
          resultAlert.textContent = "Échec du déploiement : " + data.error;
          resultAlert.classList.remove("hidden");
        }
      } catch (err) {
        consoleEl.innerHTML += "<div class=\"text-red-400 font-bold\">[" + new Date().toLocaleTimeString() + "] ❌ Erreur réseau : " + err.message + "</div>";
        resultAlert.className = "p-4 rounded-2xl text-xs font-mono-tech bg-red-950/80 border border-red-500/50 text-red-200";
        resultAlert.textContent = "Erreur de communication avec le serveur local : " + err.message;
        resultAlert.classList.remove("hidden");
      } finally {
        btn.disabled = false;
        btn.innerHTML = "<span>🚀 Relancer le déploiement</span>";
      }
    }

    async function handleSaveAndDeploy(e) {
      await handleSaveArticle(e);
      openDeployModal();
    }

    function showToast(msg) {
      const toast = document.getElementById("toast");
      toast.textContent = msg;
      toast.classList.remove("hidden");
      setTimeout(() => toast.classList.add("hidden"), 4000);
    }

    // Init
    fetchDeployConfig();
    fetchImages().then(() => {
      resetEditorForm();
      fetchArticles();
    });
  </script>
</body>
</html>`;

const server = http.createServer((req, res) => {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://localhost:${PORT}`);

  // Serve Dashboard HTML
  if (url.pathname === "/" || url.pathname === "/admin") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(HTML_DASHBOARD);
    return;
  }

  // GET /api/images
  if (url.pathname === "/api/images" && req.method === "GET") {
    const images = getAvailableImages();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(images));
    return;
  }

  // POST /api/upload
  if (url.pathname === "/api/upload" && req.method === "POST") {
    const chunks = [];
    req.on("data", chunk => chunks.push(chunk));
    req.on("end", () => {
      try {
        const bodyStr = Buffer.concat(chunks).toString("utf-8");
        const { filename, dataUrl } = JSON.parse(bodyStr);

        if (!filename || !dataUrl) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: false, error: "Nom de fichier ou données manquantes" }));
          return;
        }

        const ext = (path.extname(filename) || ".jpg").toLowerCase();
        const baseName = path.basename(filename, ext)
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]/g, "-")
          .replace(/-+/g, "-")
          .replace(/^-|-$/g, "");

        const safeFilename = `upload-${baseName || "photo"}-${Date.now()}${ext}`;
        const targetPath = path.join(PROJECT_ROOT, "public", "images", safeFilename);

        const base64Data = dataUrl.split(",")[1] || dataUrl;
        fs.writeFileSync(targetPath, Buffer.from(base64Data, "base64"));

        console.log(`Image uploadée avec succès: ${safeFilename}`);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
          success: true,
          url: `/images/${safeFilename}`,
          filename: safeFilename,
          label: (baseName || "photo").replace(/-/g, " ")
        }));
      } catch (err) {
        console.error("Upload error:", err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // GET /api/articles
  if (url.pathname === "/api/articles" && req.method === "GET") {
    const articles = loadArticles();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(articles));
    return;
  }

  // POST /api/articles (Create or Update)
  if (url.pathname === "/api/articles" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => (body += chunk));
    req.on("end", () => {
      try {
        const { article, index } = JSON.parse(body);
        const articles = loadArticles();

        if (index >= 0 && index < articles.length) {
          articles[index] = article;
        } else {
          // Prepend new article so it appears first
          articles.unshift(article);
        }

        saveArticles(articles);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true, count: articles.length }));
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // DELETE /api/articles?index=...
  if (url.pathname === "/api/articles" && req.method === "DELETE") {
    const index = parseInt(url.searchParams.get("index"), 10);
    const articles = loadArticles();
    if (index >= 0 && index < articles.length) {
      articles.splice(index, 1);
      saveArticles(articles);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: true, count: articles.length }));
    } else {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: false, error: "Invalid index" }));
    }
    return;
  }

  // POST /api/build (Trigger Next.js static build)
  if (url.pathname === "/api/build" && req.method === "POST") {
    console.log("Triggering Next.js build...");
    exec("npm run build", { cwd: PROJECT_ROOT }, (error, stdout, stderr) => {
      if (error) {
        console.error("Build error:", stderr);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: stderr || error.message }));
      } else {
        console.log("Build successful!");
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true, output: stdout }));
      }
    });
    return;
  }

  // GET /api/deploy-config
  if (url.pathname === "/api/deploy-config" && req.method === "GET") {
    const config = loadConfig();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      host: config.host || "",
      user: config.user || "",
      remoteDir: config.remoteDir || "public_html",
      port: config.port || 21,
      secure: config.secure || false,
      hasPassword: Boolean(config.password),
      isConfigured: Boolean(config.host && config.user && config.password)
    }));
    return;
  }

  // POST /api/deploy-config
  if (url.pathname === "/api/deploy-config" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => (body += chunk));
    req.on("end", () => {
      try {
        const { host, user, password, port, remoteDir, secure } = JSON.parse(body);
        const envLocalPath = path.join(PROJECT_ROOT, ".env.local");
        let envContent = fs.existsSync(envLocalPath) ? fs.readFileSync(envLocalPath, "utf-8") : "";

        const updates = {
          HOSTINGER_FTP_HOST: host || "",
          HOSTINGER_FTP_USER: user || "",
          HOSTINGER_REMOTE_DIR: remoteDir || "public_html",
          HOSTINGER_FTP_PORT: String(port || 21),
          HOSTINGER_FTP_SECURE: String(Boolean(secure))
        };
        if (password) {
          updates.HOSTINGER_FTP_PASSWORD = password;
        }

        for (const [k, v] of Object.entries(updates)) {
          const regex = new RegExp(`^${k}=.*$`, "m");
          if (regex.test(envContent)) {
            envContent = envContent.replace(regex, `${k}=${v}`);
          } else {
            envContent += `\n${k}=${v}`;
          }
        }
        fs.writeFileSync(envLocalPath, envContent.trim() + "\n", "utf-8");
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true }));
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // POST /api/deploy-test
  if (url.pathname === "/api/deploy-test" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => (body += chunk));
    req.on("end", async () => {
      try {
        const payload = body ? JSON.parse(body) : {};
        const config = loadConfig();
        const host = payload.host || config.host;
        const user = payload.user || config.user;
        const password = payload.password || config.password;
        const port = parseInt(payload.port || config.port || 21, 10);
        const secure = payload.secure !== undefined ? payload.secure : config.secure;

        if (!host || !user || !password) {
          throw new Error("Hôte, utilisateur ou mot de passe manquant.");
        }

        const client = new ftp.Client(10000);
        await client.access({
          host,
          user,
          password,
          port,
          secure,
          secureOptions: { rejectUnauthorized: false }
        });
        const list = await client.list();
        client.close();

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true, message: "Connexion réussie !", fileCount: list.length }));
      } catch (err) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // POST /api/deploy
  if (url.pathname === "/api/deploy" && req.method === "POST") {
    console.log("Triggering full deployment to Hostinger...");
    deploy({ skipBuild: false, verbose: false })
      .then(result => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result));
      })
      .catch(err => {
        console.error("Deploy error:", err.message);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: err.message }));
      });
    return;
  }

  // POST /api/git-push (Commit and push to GitHub)
  if (url.pathname === "/api/git-push" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => (body += chunk));
    req.on("end", () => {
      try {
        const payload = body ? JSON.parse(body) : {};
        const commitMsg = payload.message || "feat(blog): mise à jour des articles et du site";
        const cmd = `git add . && git commit -m "${commitMsg.replace(/"/g, '\\"')}" && git push`;
        console.log("Executing git push:", cmd);
        exec(cmd, { cwd: PROJECT_ROOT }, (error, stdout, stderr) => {
          if (error) {
            console.error("Git error:", stderr || error.message);
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: stderr || error.message }));
          } else {
            console.log("Git push successful!");
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: true, output: stdout }));
          }
        });
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // Serve Static images from public/
  if (url.pathname.startsWith("/images/")) {
    const filePath = path.join(PROJECT_ROOT, "public", url.pathname);
    if (fs.existsSync(filePath)) {
      const ext = path.extname(filePath).toLowerCase();
      const mimeTypes = {
        ".webp": "image/webp",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".svg": "image/svg+xml",
        ".avif": "image/avif",
        ".gif": "image/gif"
      };
      res.writeHead(200, { "Content-Type": mimeTypes[ext] || "application/octet-stream" });
      fs.createReadStream(filePath).pipe(res);
      return;
    }
  }

  // 404
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not Found");
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 VB COACHING BLOG ADMIN PRÊT SUR : http://localhost:${PORT}`);
  console.log(`======================================================\n`);
});
