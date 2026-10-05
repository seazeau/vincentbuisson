const fs = require("fs");
const path = require("path");

const PROJECT_ROOT = path.resolve(__dirname, "..");
const ARTICLES_PATH = path.join(PROJECT_ROOT, "src", "data", "articles.json");
const SITEMAP_PATH = path.join(PROJECT_ROOT, "public", "sitemap.xml");

function generateSitemap() {
  try {
    const raw = fs.readFileSync(ARTICLES_PATH, "utf-8");
    const articles = JSON.parse(raw);
    const today = new Date().toISOString().split("T")[0];

    // Ne retenir que les articles dont la date de publication est passée ou égale à aujourd'hui
    const publishedArticles = articles.filter(a => !a.publishedAt || a.publishedAt <= today);

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

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    for (const u of staticUrls) {
      xml += `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${u.freq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>\n`;
    }

    for (const art of publishedArticles) {
      xml += `  <url>\n    <loc>https://vincentbuisson.fr/blog/${art.slug}/</loc>\n    <lastmod>${art.publishedAt || today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.85</priority>\n  </url>\n`;
    }

    xml += `</urlset>\n`;
    fs.writeFileSync(SITEMAP_PATH, xml, "utf-8");
    console.log(`[sitemap] Sitemap mis à jour avec succès : ${publishedArticles.length} articles publiés (sur ${articles.length} au total).`);
  } catch (err) {
    console.error("[sitemap] Erreur lors de la génération du sitemap:", err);
  }
}

if (require.main === module) {
  generateSitemap();
}

module.exports = { generateSitemap };
