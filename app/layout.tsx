import type { Metadata, Viewport } from 'next'
import { Inter, Roboto } from 'next/font/google'
import './globals.css'
import { Header } from './header'
import { Footer } from './footer'
import { ThemeProvider } from 'next-themes'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { WEBSITE_URL } from '@/lib/constants'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

export const metadata: Metadata = {
  metadataBase: new URL(WEBSITE_URL),
  title: {
    template: '%s | Ricardo Gonzalez',
    absolute: 'Ricardo Gonzalez',
  },
  description:
    `I'm a developer, geek, tinker, and father-of-two. I work at at 10x Banking as a Software Development Manager (SDM). You've found my personal slice of the internet.`,
  openGraph: {
    title: "Ricardo Gonzalez",
    url: `${WEBSITE_URL}`,
    siteName: "Ricardo Gonzalez's website",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${WEBSITE_URL}/og?title=${encodeURIComponent(
          "Ricardo Gonzalez's site"
        )}`,
        width: 1200,
        height: 630,
        alt: "Ricardo Gonzalez's site",
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
    title: "Ricardo Gonzalez",
    card: "summary_large_image",
    creator: "@ryck",
  },
  icons: {
    shortcut: `${WEBSITE_URL}/favicons/favicon.ico`,
    icon: `${WEBSITE_URL}/favicons/favicon.ico`,
  },
  alternates: {
    types: {
      "application/rss+xml": `${WEBSITE_URL}/rss`,
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
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
