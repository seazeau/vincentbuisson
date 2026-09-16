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

  if (config.host) {
    config.host = config.host.replace(/^ftps?:\/\//i, "").replace(/\/.*$/, "").trim();
  }
  if (config.user) {
    config.user = config.user.trim();
  }
  if (config.password) {
    config.password = config.password.trim();
  }

  return config;
}

async function deploy(options = {}) {
  const startTime = Date.now();
  const config = loadConfig();

  if (!config.host || !config.user || !config.password) {
    throw new Error(
      "Identifiants Hostinger manquants !\n" +
      "Veuillez renseigner vos identifiants FTP dans le fichier .env.local ou via les Secrets GitHub :\n" +
      "- HOSTINGER_FTP_HOST (ex: ftp.vincentbuisson.fr ou accessXXXXX.webspace-hosti.net)\n" +
      "- HOSTINGER_FTP_USER (ex: u123456789)\n" +
      "- HOSTINGER_FTP_PASSWORD\n" +
      "- HOSTINGER_REMOTE_DIR (défaut: public_html)\n"
    );
  }

  if (!options.skipBuild) {
    console.log("\n📦 1/2 — Compilation statique Next.js (npm run build)...");
    execSync("npm run build", { cwd: PROJECT_ROOT, stdio: "inherit" });
  }

  if (!fs.existsSync(OUT_DIR)) {
    throw new Error("Le dossier out/ n'existe pas. Le build statique a échoué.");
  }

  console.log(`\n🚀 2/2 — Connexion à Hostinger (${config.host}:${config.port}) via FTP...`);
  const client = new ftp.Client(30000);
  client.ftp.verbose = options.verbose || false;

  try {
    try {
      await client.access({
        host: config.host,
        user: config.user,
        password: config.password,
        port: config.port,
        secure: config.secure,
        secureOptions: { rejectUnauthorized: false }
      });
    } catch (tlsErr) {
      if (config.secure) {
        console.warn("⚠️ TLS explicite échoué, tentative en FTP standard...");
        await client.access({
          host: config.host,
          user: config.user,
          password: config.password,
          port: config.port,
          secure: false
        });
      } else {
        throw tlsErr;
      }
    }

    console.log("✅ Connexion FTP réussie !");

    // Auto-détection intelligente du dossier de destination sur Hostinger
    let targetDir = config.remoteDir;
    try {
      const rootList = await client.list();
      console.log("📁 Fichiers/Dossiers racine détectés :", rootList.map(item => item.name).join(", "));
      const hasDomains = rootList.some(item => item.name.toLowerCase() === "domains");
      if (hasDomains) {
        console.log("📂 Dossier 'domains/' détecté sur Hostinger.");
        await client.cd("domains");
        const domainList = await client.list();
        console.log("🌐 Domaines trouvés :", domainList.map(d => d.name).join(", "));
        const match = domainList.find(d => d.name.toLowerCase().includes("vincentbuisson")) || domainList[0];
        if (match) {
          targetDir = `domains/${match.name}/public_html`;
          console.log(`🎯 Cible Hostinger détectée automatiquement : '${targetDir}'`);
        }
        await client.cd("/");
      }
    } catch (detectErr) {
      console.warn("Auto-détection non bloquante :", detectErr.message);
    }

    console.log(`📂 Synchronisation vers '${targetDir}'...`);
    await client.ensureDir(targetDir);

    // Supprimer default.php d'Hostinger si présent pour ne pas masquer index.html
    try {
      await client.remove(`${targetDir}/default.php`);
      console.log("🗑️ Fichier default.php de Hostinger supprimé.");
    } catch (e) {}

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
