import type { Metadata } from "next";
import { ContactPage } from "@/components/contact-page";
import { CONTACT_ROUTE } from "@/lib/site";

// Static, server-rendered metadata in French (the site's default locale);
// the page body follows the reader's language.
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Une suggestion, un bug, une question sur votre compte KamJob ? Écrivez à l'équipe, réponse sous 48 heures ouvrées. | Contact the KamJob team.",
  alternates: { canonical: CONTACT_ROUTE },
  openGraph: {
    type: "website",
    url: CONTACT_ROUTE,
    title: "Contact · KamJob",
  },
};

export default function Contact() {
  return <ContactPage />;
}
