import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n";
import { translations } from "@/lib/translations";
import { APP_URL, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const TITLE = "KamJob — Ton emploi au Cameroun, en un swipe";
const DESCRIPTION =
  "Swipe les offres d'emploi de ton domaine et postule en un geste : ton CV et ta lettre partent directement chez le recruteur. Gratuit pour postuler. | Find your job in Cameroon with one swipe.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s · ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "emploi Cameroun",
    "offres d'emploi Douala",
    "offres d'emploi Yaoundé",
    "recrutement Cameroun",
    "job Cameroon",
    "stage Cameroun",
    "CV",
    "KamJob",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
    languages: {
      "fr-CM": "/",
      en: "/",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "fr_CM",
    alternateLocale: ["en_US"],
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "business",
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Paints the browser chrome to match the page in both schemes.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#202124" },
  ],
  colorScheme: "light dark",
};

/**
 * Structured data. The FAQ block is what earns the expandable answers under
 * the search result; the Organization/WebSite blocks feed the knowledge panel
 * and sitelinks. Built from the French dictionary, which is the default locale.
 */
function structuredData() {
  const t = translations.fr;

  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/icon`,
      description: DESCRIPTION,
      areaServed: { "@type": "Country", name: "Cameroon" },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: ["fr-CM", "en"],
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: SITE_NAME,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, iOS, Android",
      url: APP_URL,
      description: t.hero.subtitle,
      offers: [
        // Applying is free; the paid passes are the optional add-ons.
        {
          "@type": "Offer",
          name: t.pricing.freeNote,
          price: "0",
          priceCurrency: "XAF",
        },
        ...t.pricing.plans.map((p) => ({
          "@type": "Offer",
          name: p.name,
          price: p.price.replace(/\s/g, ""),
          priceCurrency: "XAF",
          description: p.features.join(" · "),
        })),
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: t.faq.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ];
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // `lang` starts at fr and is updated client-side by the language switcher.
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <LanguageProvider>{children}</LanguageProvider>
        <script
          type="application/ld+json"
          // Serialised server-side from our own dictionary — no user input.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData()).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
