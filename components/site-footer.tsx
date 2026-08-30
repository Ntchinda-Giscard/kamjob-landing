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
 */
export function SiteFooter({
  /** The landing page floats a sticky CTA bar on mobile; this clears it. */
  stickyCtaSpacer = false,
}: {
  stickyCtaSpacer?: boolean
}) {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="max-w-6xl mx-auto px-5 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <KamJobLogo size="default" tagline={t.footer.tagline} />
            <p className="mt-5 max-w-xs text-sm text-muted-foreground flex items-start gap-2">
              <Shield className="w-4 h-4 shrink-0 mt-0.5" aria-hidden />
              {t.footer.disclaimer}
            </p>
          </div>

          <nav aria-label={t.footer.product}>
            <p className="text-sm font-semibold text-foreground mb-3">
              {t.footer.product}
            </p>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="hover:text-foreground transition-colors"
                  >
                    {t.nav[l.key]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t.footer.company}>
            <p className="text-sm font-semibold text-foreground mb-3">
              {t.footer.company}
            </p>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <a
                  href={SIGNUP_URL}
                  className="hover:text-foreground transition-colors"
                >
                  {t.nav.signup}
                </a>
              </li>
              <li>
                <a
                  href={LOGIN_URL}
                  className="hover:text-foreground transition-colors"
                >
                  {t.nav.login}
                </a>
              </li>
              <li>
                <a
                  href={EMPLOYER_URL}
                  className="hover:text-foreground transition-colors"
                >
                  {t.footer.employerLink}
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label={t.footer.legal}>
            <p className="text-sm font-semibold text-foreground mb-3">
              {t.footer.legal}
            </p>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <a
                  href={LEGAL_ROUTES.terms}
                  className="hover:text-foreground transition-colors"
                >
                  {t.footer.terms}
                </a>
              </li>
              <li>
                <a
                  href={LEGAL_ROUTES.privacy}
                  className="hover:text-foreground transition-colors"
                >
                  {t.footer.privacy}
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-12 pt-8 border-t border-border">
          {t.footer.copyright}
        </p>
      </div>

      {stickyCtaSpacer && <div className="md:hidden h-20" aria-hidden />}
    </footer>
  )
}
