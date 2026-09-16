import type { Metadata } from "next";
import { Geist, Geist_Mono, Caveat, Chivo_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const chivoMono = Chivo_Mono({
  variable: "--font-chivo-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vincentbuisson.fr"),
  title: {
    default: "Coach Course à Pied Paris & En Ligne | Suivi Nolio",
    template: "%s",
  },
  description:
    "Coaching course à pied à Paris & à distance sur Nolio. Plans 100% individualisés sur 10 km, semi et marathon par Vincent Buisson. Bilan running offert.",
  keywords: [
    "prépa marathon",
    "prepa marathon",
    "plan marathon",
    "plan entrainement marathon",
    "préparation marathon",
    "prépa semi marathon",
    "prepa semi marathon",
    "prépa 10km",
    "prepa 10km",
    "coach course a pied paris",
    "coach running paris",
    "coach course a pied",
    "coaching running a distance",
    "coach marathon en ligne",
    "preparation marathon de paris",
    "plan semi marathon paris",
    "plan 10 km personnalise",
    "plan semi-marathon personnalisé",
    "plan marathon personnalisé",
    "nolio course a pied",
    "vincent buisson",
    "coach running performance route",
  ],
  authors: [{ name: "Vincent Buisson", url: "https://vincentbuisson.fr" }],
  creator: "Vincent Buisson",
  publisher: "Vincent Buisson",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Vincent Buisson | Coach Course à Pied & Performance sur Route",
    description:
      "La science de l'entraînement alliée à la réalité du bitume. Préparation personnalisée 10 km, semi et marathon sur Nolio. Plus de 100 athlètes accompagnés.",
    url: "https://vincentbuisson.fr",
    siteName: "Vincent Buisson Coaching",
    images: [
      {
        url: "/images/vincent-buisson.jpg",
        width: 1200,
        height: 630,
        alt: "Vincent Buisson - Coach Course à Pied & Performance sur Route",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vincent Buisson | Coach Course à Pied & Performance sur Route",
    description:
      "La science de l'entraînement alliée à la réalité du bitume. Préparation personnalisée 10 km, semi et marathon sur Nolio.",
    images: ["/images/vincent-buisson.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} ${chivoMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0c0c0b] text-[#f2eee4] selection:bg-[#d4ff00] selection:text-black">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
