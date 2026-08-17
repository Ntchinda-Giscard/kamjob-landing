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

/** Legal pages. French slugs: French is the default locale of the site. */
export const LEGAL_ROUTES = {
  terms: '/conditions-generales',
  privacy: '/confidentialite',
} as const

// Section anchors are absolute (`/#how`, not `#how`) so the same list works in
// the footer, which is rendered on the legal pages too. On the home page the
// browser still treats them as same-document fragment navigation.
export const NAV_LINKS = [
  { href: '/#how', key: 'howItWorks' },
  { href: '/#features', key: 'features' },
  { href: '/#pricing', key: 'pricing' },
  { href: '/#faq', key: 'faq' },
] as const
