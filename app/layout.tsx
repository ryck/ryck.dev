import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from 'next-themes'
import { Inter } from 'next/font/google'

import { Breadcrumbs } from '@/components/breadcrumbs'
import { PerformanceMonitor } from '@/components/performance-monitor'
import { Providers } from '@/components/providers'
import { ServiceWorkerRegistration } from '@/components/service-worker-registration'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { Footer } from './footer'
import './globals.css'
import { Header } from './header'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

const url = process.env.WEBSITE_URL ?? 'https://ryck.dev'

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    template: '%s | Ricardo Gonzalez',
    absolute: 'Ricardo Gonzalez',
  },
  description: `Software Engineer / Manager living in London, UK. I have a passion for building high-quality web applications and exploring new technologies.`,
  openGraph: {
    title: 'Ricardo Gonzalez',
    url: `${url}`,
    siteName: "Ricardo Gonzalez's website",
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: `${url}/og?title=${encodeURIComponent('Ricardo Gonzalez')}&description=${encodeURIComponent('Software Engineer / Manager')}&publishedTime=${encodeURIComponent('https://ryck.dev')}`,
        width: 1200,
        height: 630,
        alt: "Ricardo Gonzalez's website",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  twitter: {
    title: 'Ricardo Gonzalez',
    card: 'summary_large_image',
    creator: '@ryck',
  },
  icons: {
    shortcut: `${url}/favicons/favicon.ico`,
    icon: `${url}/favicons/favicon.ico`,
  },
  alternates: {
    types: {
      'application/rss+xml': `${url}/rss`,
    },
  },
}

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap', // Improves font loading performance
  preload: true,
  fallback: ['system-ui', 'arial'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} bg-neutral-50 tracking-tight antialiased dark:bg-neutral-800`}
      >
        <ThemeProvider
          enableSystem={true}
          attribute="class"
          storageKey="theme"
          defaultTheme="system"
        >
          <Providers>
            <PerformanceMonitor />
            <ServiceWorkerRegistration />
            <div className="flex min-h-screen w-screen flex-col font-(family-name:--font-inter)">
              <div className="relative mx-auto w-full max-w-5xl flex-1 px-4 pt-10">
                <Header />
                <Breadcrumbs />
                {children}
                <Analytics />
                <SpeedInsights />
                <Footer />
              </div>
            </div>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
