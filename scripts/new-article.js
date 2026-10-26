/**
 * Script de création rapide d'article de blog optimisé SEO
 * Usage :
 *   npm run new-article -- --slug "mon-slug" --title "Titre" --category "Marathon" --publish "2026-11-10"
 * ou simplement :
 *   npm run new-article
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const ARTICLES_PATH = path.join(process.cwd(), 'src', 'data', 'articles.json');

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

function prompt(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans.trim());
    })
  );
}

async function main() {
  const args = process.argv.slice(2);
  const getArg = (name) => {
    const idx = args.indexOf(`--${name}`);
    return idx !== -1 && args[idx + 1] ? args[idx + 1] : null;
  };

  let title = getArg('title');
  let category = getArg('category');
  let publishDate = getArg('publish') || getArg('date');
  let slug = getArg('slug');

  if (!title) {
    console.log('\n📝 Créateur d\'article SEO pour VincentBuisson.fr\n');
    title = await prompt('Titre de l\'article (ex: Marathon en 4h00 : Plan et Allures) : ');
  }

  if (!title) {
    console.error('❌ Le titre est requis.');
    process.exit(1);
  }

  if (!slug) {
    slug = slugify(title);
  }

  if (!category) {
    const catChoice = await prompt('Catégorie (1: 10 km, 2: Semi-Marathon, 3: Marathon, 4: Physiologie & Allures) [défaut 3] : ');
    const map = { '1': '10 km', '2': 'Semi-Marathon', '3': 'Marathon', '4': 'Physiologie & Allures' };
    category = map[catChoice] || 'Marathon';
  }

  if (!publishDate) {
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 7);
    const dateStr = defaultDate.toISOString().split('T')[0];
    const inputDate = await prompt(`Date de publication prévue (AAAA-MM-JJ) [défaut: ${dateStr}] : `);
    publishDate = inputDate || dateStr;
  }

  const dateObj = new Date(publishDate);
  const formattedDate = dateObj.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).toUpperCase();

  const serviceMap = {
    '10 km': { url: '/coaching-10km/', label: 'Découvrir le Coaching 10 km sur-mesure' },
    'Semi-Marathon': { url: '/coaching-semi-marathon/', label: 'Découvrir le Coaching Semi-Marathon sur-mesure' },
    'Marathon': { url: '/coaching-marathon/', label: 'Découvrir le Coaching Marathon sur-mesure' },
    'Physiologie & Allures': { url: '/calculateur-allures/', label: 'Calculer vos allures sur le calculateur' },
  };

  const articleTemplate = {
    slug,
    title,
    seoTitle: `${title} | Guide & Plan par Vincent Buisson`,
    seoDescription: `Guide complet : ${title}. Découvrez les séances spécifiques, le tableau des temps de passage et les conseils d'un coach STAPS sur Nolio.`,
    category,
    readTime: '9 MIN',
    date: formattedDate,
    publishedAt: publishDate,
    image: category === '10 km' ? '/images/hero-race-sharp.webp' : category === 'Semi-Marathon' ? '/images/runner-1.webp' : '/images/hero-race-sharp.webp',
    summary: `Guide complet et méthode d'entraînement pour réussir votre objectif : ${title}. Analyse physiologique, volume kilométrique et séances clés.`,
    keyTakeaways: [
      `Objectif et prérequis physiologiques pour ${title}.`,
      'Structure hebdomadaire recommandée avec 80 % de volume en Zone 2.',
      'Séance spécifique de référence à intégrer dans le bloc terminal.',
      'Stratégie de pacing kilométrique et ravitaillement pour éviter l\'épuisement du glycogène.'
    ],
    sections: [
      {
        id: '1-objectifs-et-prerequis',
        heading: `1. Quels sont les prérequis pour réussir : ${title} ?`,
        body: [
          `Pour atteindre cet objectif, il est primordial de respecter une progressivité rigoureuse et de calibrer vos allures à partir de votre profil physiologique réel.`,
          `Une préparation efficace s'appuie sur une base solide en endurance fondamentale avant d'entamer les cycles de séances spécifiques.`
        ],
        callout: {
          title: 'L\'œil du coach Vincent Buisson',
          text: 'La régularité prime sur l\'intensité : mieux vaut 3 séances bien réparties qu\'une seule sortie épuisante le week-end.'
        }
      },
      {
        id: '2-temps-de-passage-et-pacing',
        heading: '2. Tableau des temps de passage et gestion de l\'allure',
        body: [
          'La régularité est le premier facteur de succès sur route. Évitez absolument de partir trop vite sur les premiers kilomètres.',
          'Conservez une fréquence cardiaque stable et relâchez le haut du corps dès le début de l\'épreuve.'
        ]
      },
      {
        id: '3-seances-cles-nolio',
        heading: '3. Les séances clés spécifiques à programmer',
        body: [
          'Intégrez des blocs à allure cible au cœur de vos sorties pour habituer vos fibres musculaires et votre métabolisme à cette cadence précise.'
        ]
      }
    ],
    workoutExample: {
      title: `Séance Spécifique ${title}`,
      warmup: '20 minutes en endurance fondamentale progressive (Zone 2).',
      mainSet: 'Fractions d\'allure spécifique avec temps de récupération active en trottinant lentement.',
      cooldown: '10 minutes de footing très lent pour faciliter le retour veineux.',
      coachTips: 'Maintenez une cadence dynamique entre 175 et 180 pas par minute.'
    },
    faqs: [
      {
        question: `Combien de semaines de préparation pour ${title} ?`,
        answer: 'Un cycle de 8 à 12 semaines est généralement idéal pour développer l\'adaptation aérobie et musculaire sans risque de blessure.'
      },
      {
        question: 'Comment calibrer mes allures d\'entraînement ?',
        answer: 'Utilisez vos chronos récents sur 10 km ou votre VMA pour déterminer vos zones cibles sur notre calculateur d\'allures.'
      }
    ],
    relatedSlugs: [
      'endurance-fondamentale-zone-2-running',
      'seuil-lactique-course-a-pied-sv1-sv2'
    ],
    relatedServiceUrl: serviceMap[category]?.url || '/coaching-marathon/',
    relatedServiceLabel: serviceMap[category]?.label || 'Découvrir le Coaching'
  };

  const raw = fs.readFileSync(ARTICLES_PATH, 'utf8');
  const articles = JSON.parse(raw);

  const existingIdx = articles.findIndex((a) => a.slug === slug);
  if (existingIdx !== -1) {
    console.log(`⚠️ L'article avec le slug "${slug}" existe déjà. Remplacement en cours...`);
    articles[existingIdx] = articleTemplate;
  } else {
    articles.push(articleTemplate);
  }

  fs.writeFileSync(ARTICLES_PATH, JSON.stringify(articles, null, 2), 'utf8');
  console.log(`\n✅ Article ajouté avec succès dans articles.json !`);
  console.log(`📌 Slug : ${slug}`);
  console.log(`📅 Date de publication programmée : ${publishDate} (${formattedDate})`);
  console.log(`💡 L'article sera automatiquement publié et déployé sur Hostinger le jour J à 08h00 via GitHub Actions.`);
}

main().catch((err) => {
  console.error('❌ Erreur :', err);
  process.exit(1);
});
