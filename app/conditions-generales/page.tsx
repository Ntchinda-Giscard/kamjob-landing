import type { Metadata } from 'next'
import { LegalDocument } from '@/components/legal-document'
import { LEGAL_ROUTES } from '@/lib/site'

// Metadata is static and server-rendered, so it uses French — the default
// locale of the site — while the page body follows the reader's language.
export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation et de Vente",
  description:
    "Les conditions qui régissent l'utilisation de KamJob : service de mise en relation, gratuité de la candidature, Pass Premium payés par Mobile Money, absence de remboursement, responsabilité et droit camerounais applicable. | KamJob Terms and Conditions.",
  alternates: { canonical: LEGAL_ROUTES.terms },
  openGraph: {
    type: 'article',
    url: LEGAL_ROUTES.terms,
    title: "Conditions Générales d'Utilisation et de Vente · KamJob",
  },
}

export default function TermsPage() {
  return <LegalDocument doc="terms" />
}
