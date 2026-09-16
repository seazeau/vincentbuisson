/**
 * Script de déploiement automatique sur Hostinger
 * Usage: npm run deploy
 */

const ftp = require("basic-ftp");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const PROJECT_ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(PROJECT_ROOT, "out");

function loadConfig() {
  const config = {
    host: process.env.HOSTINGER_FTP_HOST || "",
    user: process.env.HOSTINGER_FTP_USER || "",
    password: process.env.HOSTINGER_FTP_PASSWORD || "",
    port: parseInt(process.env.HOSTINGER_FTP_PORT || "21", 10),
    remoteDir: process.env.HOSTINGER_REMOTE_DIR || "public_html",
    secure: process.env.HOSTINGER_FTP_SECURE === "true"
  };

  const configJsonPath = path.join(PROJECT_ROOT, "hostinger.config.json");
  if (fs.existsSync(configJsonPath)) {
    try {
      const json = JSON.parse(fs.readFileSync(configJsonPath, "utf-8"));
      Object.assign(config, json);
    } catch (e) {
      console.warn("Avertissement: Impossible de lire hostinger.config.json");
    }
  }

  const envLocalPath = path.join(PROJECT_ROOT, ".env.local");
  if (fs.existsSync(envLocalPath)) {
    const envLines = fs.readFileSync(envLocalPath, "utf-8").split("\n");
    for (const line of envLines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const [key, ...vals] = trimmed.split("=");
      const val = vals.join("=").trim().replace(/^["']|["']$/g, "");
      if (key === "HOSTINGER_FTP_HOST" && !config.host) config.host = val;
      if (key === "HOSTINGER_FTP_USER" && !config.user) config.user = val;
      if (key === "HOSTINGER_FTP_PASSWORD" && !config.password) config.password = val;
      if (key === "HOSTINGER_FTP_PORT" && (!config.port || config.port === 21)) config.port = parseInt(val, 10);
      if (key === "HOSTINGER_REMOTE_DIR" && config.remoteDir === "public_html") config.remoteDir = val;
      if (key === "HOSTINGER_FTP_SECURE") config.secure = val === "true";
    }
  }

  return config;
}

async function deploy(options = {}) {
  const startTime = Date.now();
  const config = loadConfig();

  if (!config.host || !config.user || !config.password) {
    throw new Error(
      "Identifiants Hostinger manquants !\n" +
      "Veuillez renseigner vos identifiants FTP dans le fichier .env.local ou via le panneau d'administration (localhost:3002) :\n" +
      "- Hôte FTP (ex: ftp.votredomaine.fr ou accessXXXXX.webspace-hosti.net)\n" +
      "- Utilisateur FTP (ex: u123456789)\n" +
      "- Mot de passe FTP\n" +
      "- Dossier distant (défaut: public_html)\n"
    );
  }

  if (!options.skipBuild) {
    console.log("\n📦 1/2 — Compilation statique Next.js (npm run build)...");
    execSync("npm run build", { cwd: PROJECT_ROOT, stdio: "inherit" });
  }

  if (!fs.existsSync(OUT_DIR)) {
    throw new Error("Le dossier out/ n'existe pas. Le build statique a échoué.");
  }

  console.log(`\n🚀 2/2 — Connexion à Hostinger (${config.host}) via FTP...`);
  const client = new ftp.Client();
  client.ftp.verbose = options.verbose || false;

  try {
    await client.access({
      host: config.host,
      user: config.user,
      password: config.password,
      port: config.port,
      secure: config.secure,
      secureOptions: { rejectUnauthorized: false }
    });

    console.log("✅ Connexion FTP réussie !");
    console.log(`📂 Synchronisation vers '${config.remoteDir}'...`);

    await client.ensureDir(config.remoteDir);
    await client.uploadFromDir(OUT_DIR);

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`\n🎉 SUCCÈS ! Site déployé en ligne sur Hostinger en ${elapsed}s !`);
    console.log("🌐 Vérifiez sur : https://vincentbuisson.fr/\n");

    return { success: true, elapsedSeconds: elapsed };
  } finally {
    client.close();
  }
}

if (require.main === module) {
  const skipBuild = process.argv.includes("--skip-build");
  const verbose = process.argv.includes("--verbose");
  deploy({ skipBuild, verbose }).catch(err => {
    console.error("\n❌ Échec du déploiement :", err.message);
    process.exit(1);
  });
}

module.exports = { deploy, loadConfig };
