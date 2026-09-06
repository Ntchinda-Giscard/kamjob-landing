'use client'

import { Shield } from 'lucide-react'
import { KamJobLogo } from '@/components/logo'
import { useLanguage } from '@/lib/i18n'
import {
  EMPLOYER_URL,
  LEGAL_ROUTES,
  LOGIN_URL,
  NAV_LINKS,
  SIGNUP_URL,
} from '@/lib/site'

/**
 * Shared footer — rendered on the landing page and on the legal pages, so the
 * terms and the privacy policy stay one click away from anywhere on the site.
 *
 * Set on the ink slab: it closes the page the way the stats bar opened it, and
 * gives the paper body a hard bottom edge instead of fading out into another
 * tinted card. Column headers are mono, links get the growing rule.
 */
export function SiteFooter({
  /** The landing page floats a sticky CTA bar on mobile; this clears it. */
  stickyCtaSpacer = false,
}: {
  stickyCtaSpacer?: boolean
}) {
  const { t } = useLanguage()

  const columnHead = (label: string) => (
    <p className="eyebrow mb-5" style={{ color: 'var(--slab-muted)' }}>
      {label}
    </p>
  )

  const link = (href: string, label: string) => (
    <li key={`${href}-${label}`}>
      <a
        href={href}
        className="link-rule text-sm transition-colors"
        style={{ color: 'var(--slab-fg)' }}
      >
        {label}
      </a>
    </li>
  )

  return (
    <footer className="slab relative">
      <span aria-hidden className="tricolor absolute inset-x-0 top-0 h-1" />
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <KamJobLogo size="default" tagline={t.footer.tagline} onDark />
            <p
              className="mt-6 flex max-w-xs items-start gap-2.5 text-sm leading-relaxed"
              style={{ color: 'var(--slab-muted)' }}
            >
              <Shield className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden />
              {t.footer.disclaimer}
            </p>
          </div>

          <nav aria-label={t.footer.product}>
            {columnHead(t.footer.product)}
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => link(l.href, t.nav[l.key]))}
            </ul>
          </nav>

          <nav aria-label={t.footer.company}>
            {columnHead(t.footer.company)}
            <ul className="space-y-3">
              {link(SIGNUP_URL, t.nav.signup)}
              {link(LOGIN_URL, t.nav.login)}
              {link(EMPLOYER_URL, t.footer.employerLink)}
            </ul>
          </nav>

          <nav aria-label={t.footer.legal}>
            {columnHead(t.footer.legal)}
            <ul className="space-y-3">
              {link(LEGAL_ROUTES.terms, t.footer.terms)}
              {link(LEGAL_ROUTES.privacy, t.footer.privacy)}
            </ul>
          </nav>
        </div>

        <div
          className="mt-16 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row"
          style={{ borderColor: 'var(--slab-border)' }}
        >
          <p
            className="mono text-[11px] uppercase tracking-wider"
            style={{ color: 'var(--slab-muted)' }}
          >
            {t.footer.copyright}
          </p>
          <span aria-hidden className="tricolor h-1 w-16 rounded-full" />
        </div>
      </div>

      {stickyCtaSpacer && <div className="h-20 md:hidden" aria-hidden />}
    </footer>
  )
}
