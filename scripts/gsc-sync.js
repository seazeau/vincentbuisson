/**
 * Script de synchronisation directe Google Search Console -> Projet local
 * Zéro dépendance externe (utilise crypto + fetch natifs de Node.js).
 * Synchronise vincentbuisson.fr + tout l'écosystème (runpassion.fr, runvaucluse.fr)
 * et soumet automatiquement leurs sitemaps respectifs.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const KEY_FILE = path.join(process.cwd(), 'gsc-key.json');

function base64url(input) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

async function getAccessToken(serviceAccount) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const payload = {
    iss: serviceAccount.client_email,
    scope: 'https://www.googleapis.com/auth/webmasters',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };

  const unsignedToken = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(payload))}`;
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(unsignedToken);
  const signature = sign
    .sign(serviceAccount.private_key, 'base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  const jwt = `${unsignedToken}.${signature}`;

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Erreur d'authentification Google OAuth2: ${errText}`);
  }

  const data = await res.json();
  return data.access_token;
}

async function queryGSC(accessToken, siteUrl, dimensions, rowLimit = 250) {
  const endDate = new Date().toISOString().split('T')[0];
  const startDateObj = new Date();
  startDateObj.setDate(startDateObj.getDate() - 90);
  const startDate = startDateObj.toISOString().split('T')[0];

  const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`;
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      startDate,
      endDate,
      dimensions,
      rowLimit,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Erreur API GSC (${siteUrl}): ${res.status} ${errText}`);
  }

  return res.json();
}

async function submitSitemap(accessToken, siteUrl) {
  const domain = siteUrl.replace('sc-domain:', '').replace(/^https?:\/\//, '').replace(/\/$/, '');
  const sitemapUrl = `https://${domain}/sitemap.xml`;
  const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/sitemaps/${encodeURIComponent(sitemapUrl)}`;
  const res = await fetch(endpoint, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (res.ok) {
    console.log(`🚀 Sitemap soumis : ${sitemapUrl} (${siteUrl})`);
  }
}

async function main() {
  if (!fs.existsSync(KEY_FILE)) {
    console.error('❌ Fichier gsc-key.json introuvable à la racine du projet.');
    process.exit(1);
  }

  const serviceAccount = JSON.parse(fs.readFileSync(KEY_FILE, 'utf8'));
  console.log(`🔑 Authentification avec ${serviceAccount.client_email}...`);
  const token = await getAccessToken(serviceAccount);

  const sitesRes = await fetch('https://www.googleapis.com/webmasters/v3/sites', {
    headers: { Authorization: `Bearer ${token}` },
  });
  const sitesData = await sitesRes.json();
  const siteEntries = sitesData.siteEntry || [];
  console.log(
    `🌐 Propriétés accessibles (${siteEntries.length}) :`,
    siteEntries.map((s) => `${s.siteUrl} (${s.permissionLevel})`).join(', ') || 'Aucune'
  );

  const allSitesReport = {};

  for (const entry of siteEntries) {
    const siteUrl = entry.siteUrl;
    const queriesData = await queryGSC(token, siteUrl, ['query'], 250);
    const pagesData = await queryGSC(token, siteUrl, ['page'], 250);
    const queryPageData = await queryGSC(token, siteUrl, ['query', 'page'], 500);

    const queries = queriesData.rows || [];
    const pages = pagesData.rows || [];
    const totalClicks = pages.reduce((acc, r) => acc + (r.clicks || 0), 0);
    const totalImpressions = pages.reduce((acc, r) => acc + (r.impressions || 0), 0);

    allSitesReport[siteUrl] = {
      totalClicks,
      totalImpressions,
      queriesCount: queries.length,
      pagesCount: pages.length,
      topQueries: queries.slice(0, 25),
      topPages: pages.slice(0, 25),
      queryPages: queryPageData.rows || [],
    };

    console.log(
      `📊 ${siteUrl} : ${totalClicks} clics | ${totalImpressions} impressions | ${queries.length} requêtes | ${pages.length} pages`
    );

    await submitSitemap(token, siteUrl);
  }

  const outPath = path.join(process.cwd(), 'gsc-report.json');
  fs.writeFileSync(
    outPath,
    JSON.stringify({ syncedAt: new Date().toISOString(), sites: allSitesReport }, null, 2),
    'utf8'
  );
  console.log(`✅ Rapport complet multi-sites sauvegardé dans gsc-report.json`);
}

main().catch((err) => {
  console.error('❌ Erreur :', err.message);
  process.exit(1);
});
