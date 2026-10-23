/**
 * Script de synchronisation directe Google Search Console -> Projet local
 * Zéro dépendance externe (utilise crypto + fetch natifs de Node.js).
 *
 * Configuration :
 * 1. Créez un compte de service Google Cloud et téléchargez la clé JSON à la racine sous le nom `gsc-key.json`.
 * 2. Ajoutez l'email du compte de service (`client_email` dans gsc-key.json) comme utilisateur "Lecteur" dans votre propriété Google Search Console.
 * 3. Lancez : npm run gsc
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const KEY_FILE = path.join(process.cwd(), 'gsc-key.json');
const SITE_URL = process.env.GSC_SITE_URL || 'sc-domain:vincentbuisson.fr';
const FALLBACK_SITE_URL = 'https://vincentbuisson.fr/';

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
    scope: 'https://www.googleapis.com/auth/webmasters.readonly',
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

async function queryGSC(accessToken, siteUrl, dimensions, rowLimit = 100) {
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

async function main() {
  if (!fs.existsSync(KEY_FILE)) {
    console.log('\n⚠️  Fichier `gsc-key.json` introuvable à la racine du projet.');
    console.log('Pour connecter Google Search Console en 2 minutes :');
    console.log('1. Allez sur https://console.cloud.google.com/apis/library/searchconsole.googleapis.com et activez "Google Search Console API".');
    console.log('2. Dans "Identifiants" (Credentials) -> "Créer des identifiants" -> "Compte de service" (Service Account).');
    console.log('3. Créez une clé JSON pour ce compte de service et enregistrez-la sous le nom `gsc-key.json` à la racine du projet.');
    console.log('4. Copiez l\'adresse `client_email` du fichier JSON et ajoutez-la dans Google Search Console (Paramètres -> Utilisateurs et autorisations -> Ajouter un utilisateur -> Lecteur).');
    console.log('5. Relancez `npm run gsc` !\n');
    process.exit(1);
  }

  const serviceAccount = JSON.parse(fs.readFileSync(KEY_FILE, 'utf8'));
  console.log(`🔑 Authentification avec ${serviceAccount.client_email}...`);
  const token = await getAccessToken(serviceAccount);

  let activeSiteUrl = SITE_URL;
  let queriesData;

  try {
    queriesData = await queryGSC(token, activeSiteUrl, ['query'], 250);
  } catch {
    console.log(`ℹ️  Propriété domaine (${SITE_URL}) non trouvée, essai avec ${FALLBACK_SITE_URL}...`);
    activeSiteUrl = FALLBACK_SITE_URL;
    queriesData = await queryGSC(token, activeSiteUrl, ['query'], 250);
  }

  const pagesData = await queryGSC(token, activeSiteUrl, ['page'], 250);
  const queryPageData = await queryGSC(token, activeSiteUrl, ['query', 'page'], 500);

  const report = {
    syncedAt: new Date().toISOString(),
    siteUrl: activeSiteUrl,
    queries: queriesData.rows || [],
    pages: pagesData.rows || [],
    queryPages: queryPageData.rows || [],
  };

  const outPath = path.join(process.cwd(), 'gsc-report.json');
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2), 'utf8');

  console.log(`✅ Synchronisation Google Search Console réussie (${activeSiteUrl}) !`);
  console.log(`📊 ${report.queries.length} requêtes et ${report.pages.length} pages sauvegardées dans gsc-report.json`);
}

main().catch((err) => {
  console.error('❌ Erreur :', err.message);
  process.exit(1);
});
