import type { MetadataRoute } from 'next'
import { SITE_NAME } from '@/lib/site'

// Lets Android/Chrome offer "Add to home screen". On a mobile-first market
// that is the closest thing to an app install without a store listing.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Ton emploi au Cameroun`,
    short_name: SITE_NAME,
    description:
      "Swipe les offres d'emploi de ton domaine et postule en un geste.",
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#34A853',
    lang: 'fr-CM',
    categories: ['business', 'productivity'],
    icons: [
      { src: '/icon', sizes: '64x64', type: 'image/png' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  }
}
