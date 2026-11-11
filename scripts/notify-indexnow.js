const fs = require("fs");
const path = require("path");
const https = require("https");

const INDEXNOW_KEY = "d4ec70a640b3134742ee8a37f7b569b9";
const HOST = "vincentbuisson.fr";
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;
const SITEMAP_PATH = path.resolve(__dirname, "..", "public", "sitemap.xml");

async function notifyIndexNow() {
  try {
    if (!fs.existsSync(SITEMAP_PATH)) {
      console.log("[IndexNow] Aucun sitemap.xml trouvé.");
      return;
    }

    const xml = fs.readFileSync(SITEMAP_PATH, "utf-8");
    const locMatches = [...xml.matchAll(/<loc>(https:\/\/[^<]+)<\/loc>/g)];
    const urlList = locMatches.map((m) => m[1]);

    if (urlList.length === 0) {
      console.log("[IndexNow] Aucune URL à soumettre.");
      return;
    }

    console.log(`[IndexNow] Soumission de ${urlList.length} URLs vers Bing IndexNow...`);

    const payload = JSON.stringify({
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList: urlList,
    });

    const options = {
      hostname: "api.indexnow.org",
      port: 443,
      path: "/indexnow",
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Length": Buffer.byteLength(payload),
      },
    };

    const req = https.request(options, (res) => {
      let responseBody = "";
      res.on("data", (chunk) => {
        responseBody += chunk;
      });
      res.on("end", () => {
        // HTTP 200 = OK, HTTP 202 = Accepted
        if (res.statusCode === 200 || res.statusCode === 202) {
          console.log(`[IndexNow] ✅ Succès (Code ${res.statusCode}) : ${urlList.length} URLs envoyées à Bing/IndexNow.`);
        } else {
          console.log(`[IndexNow] Statut API : ${res.statusCode} ${res.statusMessage}`, responseBody);
        }
      });
    });

    req.on("error", (error) => {
      console.warn("[IndexNow] Note : Requête IndexNow non complétée (pas de connexion ou timeout) :", error.message);
    });

    req.write(payload);
    req.end();
  } catch (err) {
    console.error("[IndexNow] Erreur lors de l'envoi IndexNow :", err);
  }
}

if (require.main === module) {
  notifyIndexNow();
}

module.exports = { notifyIndexNow };
