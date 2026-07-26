'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { translations, type Dictionary, type Lang } from './translations'

const LangContext = createContext<{
  lang: Lang
  setLang: (l: Lang) => void
  t: Dictionary
}>({ lang: 'fr', setLang: () => {}, t: translations.fr })

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // French by default (Cameroon), remembered across visits.
  const [lang, setLangState] = useState<Lang>('fr')

  useEffect(() => {
    const saved = localStorage.getItem('kamjob-lang')
    if (saved === 'fr' || saved === 'en') setLangState(saved)
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('kamjob-lang', l)
    document.documentElement.lang = l
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLanguage = () => useContext(LangContext)
