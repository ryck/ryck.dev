import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from './header'
import { Footer } from './footer'
import { ThemeProvider } from 'next-themes'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Breadcrumbs } from '@/components/breadcrumbs'

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
  description: `I am software engineer living in London, UK. I have a passion for building high-quality web applications and exploring new technologies.`,
  openGraph: {
    title: 'Ricardo Gonzalez',
    url: `${url}`,
    siteName: "Ricardo Gonzalez's website",
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${url}/og?title=${encodeURIComponent('ryck.dev')}`,
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
          <div className="flex min-h-screen w-screen flex-col font-[family-name:var(--font-inter)]">
            <div className="relative mx-auto w-full max-w-screen-lg flex-1 px-4 pt-20">
              <Header />
              <Breadcrumbs />
              {children}
              <Analytics />
              <SpeedInsights />
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
