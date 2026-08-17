import type { MetadataRoute } from 'next'
import { LEGAL_ROUTES, SITE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    // Legal pages change rarely but must be indexable: a discoverable terms
    // page is part of identifying an e-commerce service.
    ...Object.values(LEGAL_ROUTES).map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    })),
  ]
}
