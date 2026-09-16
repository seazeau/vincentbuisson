export interface Plan {
  id: string;
  name: string;
  badge?: string;
  popular?: boolean;
  price: string;
  period: string;
  savings?: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
}

export interface Testimonial {
  name: string;
  age?: number;
  profession?: string;
  date?: string;
  goal: string;
  achievement: string;
  quote: string;
  distance: string;
}

export interface Article {
  id: string;
  title: string;
  desc: string;
  tag: string;
  date: string;
  readTime: string;
  image: string;
  href: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: "Tarifs & Formules" | "Méthode & Science" | "10k, Semi & Marathon" | "Nolio & Montres GPS" | "Organisation & Santé";
}

export const SITE_CONFIG = {
  name: "Vincent Buisson",
  brandTitle: "Vincent Buisson | Coach Course à Pied & Performance sur Route",
  domain: "https://vincentbuisson.fr",
  email: "contact@runpassion.fr",
  whatsapp: "https://wa.me/33614838634?text=Bonjour%20Vincent,%20je%20souhaite%20des%20informations%20sur%20ton%20coaching%20running",
  calendly: "https://calendly.com",
  nolioUrl: "https://www.nolio.io",
  top4runningUrl: "https://top4running.fr/?a_box=sc3esau3",
  socials: {
    strava: "https://www.strava.com",
    instagram: "https://www.instagram.com",
    linkedin: "https://www.linkedin.com",
  },
  stats: [
    { value: "+100", label: "Athlètes accompagnés", detail: "Sur 10 km, semi et marathon" },
    { value: "< 35'", label: "Record perso 10 km", detail: "Chrono vérifié sur bitume" },
    { value: "< 3h00", label: "Record perso Marathon", detail: "Gestion d'allure expérimentée" },
    { value: "SCIENCE", label: "Physiologie & Pédagogie", detail: "Méthode éprouvée" },
  ],
  credentials: [
    "Formation Universitaire en Sciences du Sport & Physiologie de l'effort",
    "Expert de la préparation physique et performance course sur route",
    "Coach certifié Nolio (planification et métriques avancées)",
    "Praticien de terrain : sub-35' sur 10 km, sub-3h sur marathon",
    "+100 coureurs et coureuses menés vers leurs records personnels",
  ],
};

export const PLANS: Plan[] = [
  {
    id: "sans-engagement",
    name: "Formule Liberté",
    badge: "Sans Engagement",
    popular: false,
    price: "90 €",
    period: "/ mois",
    savings: "Résiliation libre en 1 clic",
    description: "Accompagnement 100% sur-mesure sur Nolio, résiliable chaque mois en totale liberté.",
    features: [
      "Planification sur-mesure semaine par semaine sur Nolio",
      "Synchronisation automatique montre GPS (Garmin, Coros, Suunto...)",
      "Échanges directs et vocaux 6j/7 sur WhatsApp",
      "Ajustements illimités selon vos imprévus et votre forme",
    ],
    cta: "Choisir la Formule Liberté (90 €/mois)",
    href: "/contact/?offre=sans-engagement",
  },
  {
    id: "engagement-6-mois",
    name: "Formule Performance",
    badge: "Le Plus Choisi • Recommandé",
    popular: true,
    price: "70 €",
    period: "/ mois (engagement 6 mois)",
    savings: "Économisez 120 € sur votre saison",
    description: "Le macrocycle complet de 24 semaines pour bâtir un foncier solide et battre votre record.",
    features: [
      "Tout le suivi direct de la Formule Liberté",
      "Macrocycle complet de 24 semaines (fondation, allure & affûtage)",
      "Stratégie de course kilométrique et nutrition pour le jour J",
      "Tarif préférentiel : 70 €/mois au lieu de 90 € (-120 €)",
    ],
    cta: "Choisir la Formule 6 Mois (70 €/mois)",
    href: "/contact/?offre=engagement-6-mois",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Antoine B.",
    date: "13 septembre 2026",
    profession: "Objectif Marathon",
    goal: "Préparation marathon & progression concrète",
    achievement: "Allures en hausse & confiance totale",
    quote:
      "Deux mois après avoir commencé, les progrès se voient très concrètement : des allures qui évoluent, du volume qui passe de mieux en mieux et la sensation de ne jamais faire n'importe quoi. Chaque séance a un sens, la charge est adaptée avec logique et il y a un vrai suivi derrière les chiffres. Je cours plus vite, avec beaucoup plus de maîtrise et de confiance vers mon objectif marathon.",
    distance: "Marathon",
  },
  {
    name: "Patrizia Z.",
    date: "13 septembre 2026",
    profession: "Athlète accompagnée",
    goal: "Reprise après blessure & objectifs maintenus",
    achievement: "Sensations & jambes retrouvées",
    quote:
      "Vincent est un coach très attentif et à l'écoute. Ses entraînements sont bien réfléchis et toujours différents, en donnant envie de se mettre à l'épreuve. J'ai commencé avec lui avec une blessure en cours, je voulais garder mes objectifs. Avec la patience et ses conseils j'ai pu retrouver rapidement mes sensations, mes jambes et repartir plus forte (et ce n'est pas fini !). Merci pour m'accompagner dans ce beau parcours !",
    distance: "Reprise & Progression",
  },
  {
    name: "Léo M.",
    date: "13 janvier 2026",
    profession: "Objectif Semi-Marathon",
    goal: "Passer sous la barre des 1h35 au semi",
    achievement: "1h41 ➔ 1h30 sur semi",
    quote:
      "Vincent est très professionnel et disponible. Les séances sont très bien structurées et adaptées à notre niveau et à nos objectifs. Je recommande à 100% !",
    distance: "Semi-Marathon",
  },
];

export const BLOG_ARTICLES: Article[] = [
  {
    id: "endurance-fondamentale",
    title: "L'Endurance Fondamentale : Pourquoi courir lentement fait courir plus vite",
    desc: "Fréquence cardiaque, Zone 2 et calcul d'allure : comment la filière aérobie crée les adaptations biologiques indispensables pour performer.",
    tag: "PHYSIOLOGIE • ZONE 2",
    date: "14 MARS 2026",
    readTime: "7 MIN",
    image: "/images/runner-1.webp",
    href: "/blog/endurance-fondamentale-zone-2-running/",
  },
  {
    id: "marathon-sub-3h",
    title: "Préparation Marathon Sub-3h : Les séances clés et l'allure AS42",
    desc: "Comment calibrer ses sorties longues avec blocs d'allure 4'15/km et construire une stratégie glucidique anti-mur.",
    tag: "MARATHON • ALLURE AS42",
    date: "06 MARS 2026",
    readTime: "9 MIN",
    image: "/images/runner-3.webp",
    href: "/blog/preparation-marathon-sub-3h-allure-as42/",
  },
  {
    id: "10km-sub-40",
    title: "Comment courir le 10 km en moins de 40 minutes : Méthode & Séances",
    desc: "Prérequis de VMA, séances de seuil anaérobie (SV2) et stratégie de pacing pour franchir la barre mythique des 3'59/km.",
    tag: "10 KM • CHRONO",
    date: "10 MARS 2026",
    readTime: "8 MIN",
    image: "/images/hero-speed-sharp.webp",
    href: "/blog/courir-10km-moins-40-minutes/",
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    category: "Tarifs & Formules",
    question: "Quels sont les tarifs du coaching course à pied avec Vincent Buisson ?",
    answer:
      "Vincent Buisson propose deux formules claires et transparentes : 1) La Formule Liberté à 90 € / mois (sans engagement), avec résiliation libre à tout moment par simple message, idéale pour tester le coaching ou préparer un cycle court. 2) La Formule Performance à 70 € / mois (engagement 6 mois), recommandée pour valider un macrocycle complet de 24 semaines (socle aérobie, seuils, cycle spécifique et affûtage), permettant d'économiser 120 € sur le semestre (20 €/mois d'économie). Les deux formules incluent la programmation sur-mesure sur Nolio, les ajustements illimités, les retours 6j/7 sur WhatsApp et l'accès complet à l'application sans frais d'inscription.",
  },
  {
    category: "Tarifs & Formules",
    question: "Quelle formule choisir : 90 € sans engagement ou 70 € avec engagement 6 mois ?",
    answer:
      "Le choix dépend de votre calendrier et de votre objectif : Choisissez la Formule Liberté (90 €/mois, sans engagement) si votre course cible a lieu dans 6 à 10 semaines ou si vous souhaitez expérimenter le suivi individualisé sans contrainte de durée. Choisissez la Formule Performance (70 €/mois, engagement 6 mois) si vous préparez un objectif majeur (10 km, semi-marathon ou marathon). En physiologie de l'effort, 6 mois (24 semaines) représentent la durée idéale pour développer votre cylindrée aérobie, assimiler vos allures de seuil sans risque de blessure et réussir un affûtage optimal le jour J, tout en bénéficiant de 120 € de remise.",
  },
  {
    category: "Tarifs & Formules",
    question: "Comment s'inscrire et quel est le protocole de démarrage du coaching ?",
    answer:
      "Le démarrage se fait en 4 étapes rapides : 1) Vous remplissez le formulaire de diagnostic sur le site (historique, chronos, disponibilités, formule 90€ ou 70€). 2) Vincent étudie personnellement votre profil et vous répond sous 24h par email ou WhatsApp. 3) Vous convenez d'un appel visio ou téléphonique de 15 minutes pour cadrer vos objectifs et synchroniser votre compte Nolio. 4) Votre première semaine d'entraînement individualisée apparaît sur votre montre GPS sous 48h.",
  },
  {
    category: "Méthode & Science",
    question: "Quelle est la valeur ajoutée d'un coach humain expert face à une IA ou un plan générique ?",
    answer:
      "Les plans PDF génériques et les algorithmes appliquent des calculs mathématiques théoriques qui ignorent votre fatigue nerveuse, votre variabilité de fréquence cardiaque réelle, vos contraintes familiales et vos signaux précurseurs de blessure. Coach diplômé en sciences du sport et coureur sub-35' au 10 km et sub-3h au marathon, Vincent Buisson conjugue la rigueur de la physiologie de l'effort, une pédagogie claire et plus de 10 ans d'expérience sur le bitume. Votre plan vit avec vous et s'adapte en temps réel après chaque sortie.",
  },
  {
    category: "Méthode & Science",
    question: "Comment sont évaluées et calculées mes zones d'entraînement (VMA, EF, SV1, SV2) ?",
    answer:
      "Nous n'utilisons pas de formules arbitraires théoriques (comme 220 - âge). Dès le démarrage, nous analysons vos compétitions récentes, vos courbes de fréquence cardiaque et vos allures GPS, ou nous réalisons un test de terrain adapté (demi-Cooper, VAMEVAL ou test 5 km). À partir de ces repères, nous déterminons précisément vos allures d'Endurance Fondamentale (EF), de Seuil Aérobie (SV1 / tempo), de Seuil Anaérobie (SV2) et de VMA pour que chaque kilomètre couru stimule la bonne filière énergétique.",
  },
  {
    category: "Nolio & Montres GPS",
    question: "Comment fonctionne l'application Nolio et la synchronisation avec ma montre GPS ?",
    answer:
      "Nolio s'intègre nativement et automatiquement avec Garmin, Coros, Polar, Suunto, Apple Watch et Wahoo. Vos séances programmées sont envoyées directement sur votre montre qui vous guide par bips et vibrations pendant l'effort (allures cibles, fractions, temps de récupération). Dès votre séance terminée, vos données (allures réelles, FC, puissance Stryd, cadence, dénivelé) et votre ressenti subjectif (RPE de 1 à 10) remontent instantanément sur le tableau de bord de Vincent pour analyse.",
  },
  {
    category: "Nolio & Montres GPS",
    question: "Puis-je utiliser le coaching sans montre GPS connectée ou avec une montre basique ?",
    answer:
      "Une montre GPS (ou au minimum un smartphone équipé d'une application comme Strava connectée à Nolio) est fortement recommandée afin que Vincent puisse analyser vos allures réelles, votre régularité et vos temps de passage. Cependant, le coaching repose également sur vos sensations subjectives (échelle RPE) et vos retours vocaux/écrits sur WhatsApp, ce qui permet de progresser même avec un équipement simple.",
  },
  {
    category: "10k, Semi & Marathon",
    question: "Comment prépare-t-on un 10 km pour casser la barre des 40', 45' ou 50' ?",
    answer:
      "Le 10 km exige un travail à haute intensité aérobie (88% à 92% de la VMA). L'accompagnement s'articule autour de 3 piliers : 1) Le développement de la VO2max par du fractionné court et moyen (30/30, 400m, 800m, 1000m) ; 2) Le soutien au seuil anaérobie (SV2) pour habituer vos muscles à recycler l'acide lactique à vive allure ; 3) L'assimilation de l'Allure Spécifique 10 km (AS10) et la stratégie de gestion d'effort pour ne pas exploser après un départ trop rapide.",
  },
  {
    category: "10k, Semi & Marathon",
    question: "Comment structurer un plan d'entraînement Semi-Marathon (viser sub-1h30, 1h45 ou 2h) ?",
    answer:
      "Sur les 21,097 km du semi-marathon, la clé réside dans le développement du seuil aérobie (SV1) et l'économie de course. La préparation comprend des sorties longues progressives intégrant des blocs à allure cible (AS21), du renforcement postural (gainage, PPG) pour maintenir la foulée compacte sur le dernier tiers de course, ainsi qu'un protocole d'hydratation et d'apport glucidique testé à l'entraînement.",
  },
  {
    category: "10k, Semi & Marathon",
    question: "Comment réussir sa préparation Marathon et éviter le mur du 30ème kilomètre ?",
    answer:
      "Pour franchir la ligne d'un marathon (42,195 km) en sub-3h, sub-3h30 ou sub-4h sans heurter le mur : 1) Nous développons votre puissance lipidique (capacité à consommer les lipides à allure marathon pour économiser le précieux glycogène) ; 2) Les sorties longues sont calibrées avec des blocs d'allure spécifique marathon (AS42) sans générer d'épuisement chronique ; 3) Nous élaborons un plan nutritionnel strict (40 à 60 g de glucides/heure et électrolytes) ; 4) Un affûtage de 3 semaines (tapering) maximise la surcompensation pour aborder le départ frais et puissant.",
  },
  {
    category: "Organisation & Santé",
    question: "Le coaching s'adresse-t-il aussi aux débutants ou uniquement aux coureurs confirmés ?",
    answer:
      "Le coaching s'adresse à tous les coureurs motivés, quel que soit leur chrono actuel. Plus de 100 athlètes ont été accompagnés par Vincent, qu'il s'agisse de franchir la ligne d'un tout premier 10 km sans marcher ou d'un marathonien visant moins de 2h50. L'individualisation consiste précisément à calibrer le nombre de séances hebdomadaires (de 2 à 5+ sorties par semaine) et les allures pour respecter la tolérance tendineuse et musculaire de chacun.",
  },
  {
    category: "Organisation & Santé",
    question: "Que se passe-t-il en cas d'imprévu, fatigue intense, déplacement professionnel ou douleur ?",
    answer:
      "C'est la force de l'accompagnement humain 6j/7 : vous prévenez Vincent par WhatsApp ou Nolio, et votre planning est immédiatement adapté sous 24h. En cas de grosse fatigue ou de semaine professionnelle chargée, la séance clé est décalée ou remplacée par un footing de décharge. En cas de douleur naissante (tendon d'Achille, périostite, TFL), Vincent met en place des séances de cardio croisé (vélo, natation, rameur) et des exercices de renforcement excentrique pour soigner la cause sans perdre votre condition physique.",
  },
];
