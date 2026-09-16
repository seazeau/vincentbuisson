import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import Tilt3DCard from "@/components/Tilt3DCard";

export const metadata: Metadata = {
  title: "Bilan Running Offert & Diagnostic Coaching Personnalisé",
  description:
    "Remplissez votre diagnostic initial pour intégrer le coaching personnalisé sur 10 km, semi ou marathon. Réponse sous 24h par Vincent Buisson.",
  alternates: {
    canonical: "https://vincentbuisson.fr/contact/",
  },
  openGraph: {
    title: "Bilan Running Offert & Diagnostic Coaching Personnalisé",
    description:
      "Diagnostic de niveau et prise de contact pour démarrer votre préparation individualisée sur Nolio.",
    url: "https://vincentbuisson.fr/contact/",
  },
};

export default function ContactPage() {
  const structuredDataContact = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Accueil",
            "item": "https://vincentbuisson.fr/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Contact",
            "item": "https://vincentbuisson.fr/contact/"
          }
        ]
      },
      {
        "@type": "ContactPage",
        "url": "https://vincentbuisson.fr/contact/",
        "name": "Candidature & Contact Coaching Running | Vincent Buisson",
        "description": "Formulaire de diagnostic initial et contact direct pour intégrer le suivi personnalisé en course à pied.",
        "mainEntity": {
          "@type": "Person",
          "name": "Vincent Buisson",
          "email": "contact@runpassion.fr",
          "telephone": "+33614838634"
        }
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0c0c0b] text-[#f2eee4]">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataContact) }}
      />

      <Header />

      <main className="flex-grow pt-36 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="text-xs font-mono-tech uppercase tracking-wider text-[#888880] mb-8 flex items-center space-x-2">
            <Link href="/" className="hover:text-[#d4ff00]">Accueil</Link>
            <span>/</span>
            <span className="text-white font-bold">Candidature &amp; Contact</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Context & Reassurance */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-mono-tech uppercase tracking-widest text-[#d4ff00] bg-[#181816] px-3.5 py-1.5 rounded-full border border-[#2e2e28]">
                    PLACES LIMITÉES
                  </span>
                  <span className="font-hand text-2xl text-[#d4ff00] -rotate-2">
                    Suivi direct par Vincent
                  </span>
                </div>
                <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mt-4 mb-4 leading-tight">
                  Démarrons Votre Préparation
                </h1>
                <p className="text-sm sm:text-base text-[#b5b5a8] leading-relaxed">
                  Pour garantir un niveau d&apos;attention maximal, une analyse métrique quotidienne sur Nolio et des retours vocaux ou écrits sous 24h, <strong>j&apos;accompagne un nombre restreint d&apos;athlètes en simultané</strong>.
                </p>
              </div>

              {/* Onboarding steps */}
              <Tilt3DCard maxTilt={6} className="bg-[#141412] border border-[#262622] rounded-3xl p-8 space-y-5 shadow-2xl">
                <h3 className="text-sm font-mono-tech uppercase tracking-wider text-white font-black">
                  LE PROTOCOLE DE DÉMARRAGE :
                </h3>
                <div className="space-y-4 text-xs sm:text-sm font-mono-tech text-[#b5b5a8]">
                  <div className="flex items-start">
                    <span className="w-6 h-6 rounded-xl bg-[#d4ff00] text-black font-black flex items-center justify-center mr-3 shrink-0 text-xs">
                      1
                    </span>
                    <span>Vous remplissez le diagnostic initial ci-contre.</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-6 h-6 rounded-xl bg-[#ff4400] text-white font-black flex items-center justify-center mr-3 shrink-0 text-xs">
                      2
                    </span>
                    <span>J&apos;étudie vos données et je vous recontacte sous 24h par email ou WhatsApp.</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-6 h-6 rounded-xl bg-white/20 text-white font-black flex items-center justify-center mr-3 shrink-0 text-xs border border-white/20">
                      3
                    </span>
                    <span>Nous convenons d&apos;un appel de cadrage de 15 min et lions votre compte Nolio.</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-6 h-6 rounded-xl bg-white text-black font-black flex items-center justify-center mr-3 shrink-0 text-xs">
                      4
                    </span>
                    <span>Votre première semaine d&apos;entraînement apparaît sur votre montre GPS.</span>
                  </div>
                </div>
              </Tilt3DCard>

              <div className="p-6 rounded-3xl bg-[#141412] border border-[#262622] space-y-2">
                <p className="text-xs font-mono-tech uppercase text-[#d4ff00] font-bold">GARANTIE COACH :</p>
                <p className="text-xs text-[#888880] leading-relaxed font-mono-tech">
                  Aucun sous-traitant, aucun robot : vos séances sont programmées et analysées personnellement par Vincent Buisson, coach spécialiste de la performance sur route.
                </p>
              </div>
            </div>

            {/* Right Column: The Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
