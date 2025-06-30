import type { MetadataRoute } from 'next'

const url = process.env.WEBSITE_URL ?? 'https://ryck.dev'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: `${url}/sitemap.xml`,
  }
}
