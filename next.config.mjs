const isProd = process.env.NODE_ENV === 'production'

/**
 * Content Security Policy.
 *
 * The site loads nothing from a third-party origin: fonts are self-hosted by
 * next/font, there are no analytics, embeds or external images, and the only
 * network call is the contact form posting to /api/contact. Every fetch
 * directive is therefore locked to 'self'.
 *
 * Two relaxations are deliberate:
 *  - script-src 'unsafe-inline' — the App Router streams its RSC payload as
 *    inline <script> tags. Dropping this needs a per-request nonce issued from
 *    proxy.ts, which forces every page to render dynamically and gives up
 *    static generation: a bad trade for a landing page served to slow mobile
 *    connections. Nothing on the site reflects user input, so the residual
 *    XSS surface this leaves open is small.
 *  - style-src 'unsafe-inline' — next/image and our own CSS-variable style
 *    props (--reveal-delay, --tilt, --line-delay …) render as inline style
 *    attributes.
 *
 * Development adds 'unsafe-eval' (the dev bundler evals source maps) and
 * skips upgrade-insecure-requests (the dev server is plain http).
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isProd ? '' : " 'unsafe-eval'"}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:", // data: is the grain SVG in globals.css
  "font-src 'self'",
  "connect-src 'self'", // /api/contact; the dev HMR websocket is same-origin too
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isProd ? ['upgrade-insecure-requests'] : []),
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  // Two years, covering app.kamjob.com and any future subdomain. `preload` is
  // left off on purpose: it submits the domain to the browsers' built-in HSTS
  // list and is effectively irreversible — add it once every subdomain is
  // confirmed HTTPS-only.
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
  // Legacy twin of frame-ancestors for browsers that predate CSP level 2.
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
}

export default nextConfig
