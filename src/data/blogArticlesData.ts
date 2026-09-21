import rawArticles from "./articles.json";

export interface ContentSection {
  id: string;
  heading: string;
  body: string[];
  callout?: {
    title: string;
    text: string;
  };
}

export interface WorkoutExample {
  title: string;
  warmup: string;
  mainSet: string;
  cooldown: string;
  coachTips: string;
}

export interface ArticleFAQ {
  question: string;
  answer: string;
}

export interface BlogArticle {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  category: "10 km" | "Semi-Marathon" | "Marathon" | "Physiologie & Allures";
  readTime: string;
  date: string;
  publishedAt: string;
  image: string;
  imagePosition?: string;
  summary: string;
  keyTakeaways: string[];
  sections: ContentSection[];
  workoutExample?: WorkoutExample;
  faqs: ArticleFAQ[];
  relatedSlugs: string[];
  relatedServiceUrl: string;
  relatedServiceLabel: string;
}

export const BLOG_ARTICLES_DATA: BlogArticle[] = rawArticles as BlogArticle[];
