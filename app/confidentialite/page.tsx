import type { Metadata } from 'next'
import { LegalDocument } from '@/components/legal-document'
import { LEGAL_ROUTES } from '@/lib/site'

// Metadata is static and server-rendered, so it uses French — the default
// locale of the site — while the page body follows the reader's language.
export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description:
    "Comment KamJob traite vos données : quelles données, pour quelles finalités, à qui elles sont transmises, combien de temps elles sont conservées et comment exercer vos droits. Nous ne vendons jamais vos données. | KamJob Privacy Policy.",
  alternates: { canonical: LEGAL_ROUTES.privacy },
  openGraph: {
    type: 'article',
    url: LEGAL_ROUTES.privacy,
    title: 'Politique de confidentialité · KamJob',
  },
}

export default function PrivacyPage() {
  return <LegalDocument doc="privacy" />
}
