// Single source of truth for absolute URLs. Metadata, sitemap, robots and the
// JSON-LD blocks all need the canonical origin, and it must not drift between
// them — Google treats a mismatch as a different site.

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kamjob.com'
).replace(/\/$/, '')

export const SITE_NAME = 'KamJob'

export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.kamjob.com'

// The landing site is standalone: every CTA routes to the actual candidate app.
export const SIGNUP_URL = `${APP_URL}/signup`
export const LOGIN_URL = `${APP_URL}/login`

// Employer portal — set NEXT_PUBLIC_EMPLOYER_URL once that app is deployed;
// meanwhile the card points to the FAQ entry explaining employer access.
export const EMPLOYER_URL = process.env.NEXT_PUBLIC_EMPLOYER_URL || '/#faq'

/**
 * The only address exposed to the browser. The contact form delivers to two
 * mailboxes, but the second one is a private inbox and stays server-side in
 * `app/api/contact/route.ts` — this is what the mailto: fallback uses when the
 * form itself cannot send.
 */
export const CONTACT_EMAIL = 'support@kamjob.com'

/** The contact form lives on its own page: a support form inside the landing
 *  page's closing sequence competed with the sign-up CTA. */
export const CONTACT_ROUTE = '/contact'

/** Legal pages. French slugs: French is the default locale of the site. */
export const LEGAL_ROUTES = {
  terms: '/conditions-generales',
  privacy: '/confidentialite',
} as const

// Section anchors are absolute (`/#faq`, not `#faq`) so the same list works in
// the footer, which is rendered on the legal and contact pages too. On the
// home page the browser still treats them as same-document fragment navigation.
//
// `header` marks the subset shown in the desktop header bar; the mobile menu
// and the footer list every entry.
export const NAV_LINKS = [
  { href: '/#features', key: 'features', header: true },
  { href: '/#coach', key: 'coach', header: true },
  { href: '/#pricing', key: 'pricing', header: true },
  { href: '/#faq', key: 'faq', header: true },
  { href: CONTACT_ROUTE, key: 'contact', header: false },
] as const
