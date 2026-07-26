import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "KamJob — Ton emploi au Cameroun, en un swipe",
  description:
    "Swipe les offres d'emploi de ton domaine et postule en un geste : ton CV et ta lettre partent directement chez le recruteur. Gratuit pour postuler. | Find your job in Cameroon with one swipe.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} font-sans antialiased`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
