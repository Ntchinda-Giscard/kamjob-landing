'use client'

import { useLanguage } from '@/lib/i18n'
import type { Lang } from '@/lib/translations'

/**
 * FR/EN toggle. Shared by the landing header and the legal pages' header.
 * Squared off and set in the mono face so it reads as a system control rather
 * than a third pill competing with the two CTAs beside it.
 */
export function LangSwitcher({ onDark = false }: { onDark?: boolean }) {
  const { lang, setLang, t } = useLanguage()

  const btn = (l: Lang, label: string) => (
    <button
      onClick={() => setLang(l)}
      className="mono btn-press rounded-[4px] px-2 py-1 text-[11px] font-bold tracking-widest"
      style={
        lang === l
          ? {
              backgroundColor: onDark ? 'var(--slab-fg)' : 'var(--foreground)',
              color: onDark ? 'var(--slab)' : 'var(--paper)',
            }
          : { color: onDark ? 'var(--slab-muted)' : 'var(--muted-foreground)' }
      }
      aria-pressed={lang === l}
    >
      {label}
    </button>
  )

  return (
    <div
      className="flex items-center gap-0.5 rounded-md border p-0.5"
      style={{ borderColor: onDark ? 'var(--slab-border)' : 'var(--border)' }}
      role="group"
      aria-label={t.nav.langLabel}
    >
      {btn('fr', 'FR')}
      {btn('en', 'EN')}
    </div>
  )
}
