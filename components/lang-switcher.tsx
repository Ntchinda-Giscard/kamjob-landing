'use client'

import { useLanguage } from '@/lib/i18n'
import type { Lang } from '@/lib/translations'

/** FR/EN toggle. Shared by the landing header and the legal pages' header. */
export function LangSwitcher() {
  const { lang, setLang, t } = useLanguage()

  const btn = (l: Lang, label: string) => (
    <button
      onClick={() => setLang(l)}
      className="px-2.5 py-1 text-xs font-bold rounded-full btn-press"
      style={
        lang === l
          ? { backgroundColor: 'var(--brand-solid)', color: 'white' }
          : { color: 'var(--muted-foreground)' }
      }
      aria-pressed={lang === l}
    >
      {label}
    </button>
  )

  return (
    <div
      className="flex items-center gap-0.5 rounded-full border border-border p-0.5"
      role="group"
      aria-label={t.nav.langLabel}
    >
      {btn('fr', 'FR')}
      {btn('en', 'EN')}
    </div>
  )
}
