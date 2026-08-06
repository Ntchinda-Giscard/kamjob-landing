// Single source of truth for absolute URLs. Metadata, sitemap, robots and the
// JSON-LD blocks all need the canonical origin, and it must not drift between
// them — Google treats a mismatch as a different site.

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kamjob.com'
).replace(/\/$/, '')

export const SITE_NAME = 'KamJob'

export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.kamjob.com'
