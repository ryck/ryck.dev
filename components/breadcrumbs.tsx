'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function generateBreadcrumbs() {
  const pathname = usePathname()
  if (!pathname) return []
  if (pathname == '/') return []

  const segments = pathname
    .split('/')
    .filter(Boolean)
    .map((segment) => decodeURIComponent(segment))

  const crumbs = segments.map((text, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/')
    return { text: text.charAt(0).toUpperCase() + text.slice(1), href }
  })

  crumbs.pop()

  return [{ text: 'Home', href: '/' }, ...crumbs]
}

export function Breadcrumbs() {
  const crumbs = generateBreadcrumbs()

  return (
    <nav className="flex text-sm text-zinc-500 pb-4">
      {crumbs.map((crumb, index) => (
        <span key={crumb.href}>
          {index > 0 && <span className="mx-2">/</span>}
          <Link href={crumb.href} className="hover:text-zinc-800 dark:hover:text-zinc-200">
            {crumb.text}
          </Link>
        </span>
      ))}
    </nav>
  )
} 