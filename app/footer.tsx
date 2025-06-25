'use client'
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const THEMES_OPTIONS = [
  {
    label: 'Light',
    id: 'light',
    icon: <SunIcon className="h-4 w-4" />,
  },
  {
    label: 'Dark',
    id: 'dark',
    icon: <MoonIcon className="h-4 w-4" />,
  },
  {
    label: 'System',
    id: 'system',
    icon: <MonitorIcon className="h-4 w-4" />,
  },
]

function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex gap-1">
      {THEMES_OPTIONS.map((themeOption) => {
        const isActive =
          theme === themeOption.id ||
          (theme === undefined && themeOption.id === 'system')
        return (
          <div key={themeOption.id} className="group relative inline-flex">
            <button
              className="inline-flex h-7 w-7 cursor-pointer items-center justify-center text-zinc-500 transition-colors duration-100 hover:text-zinc-900 focus-visible:outline-2 dark:text-zinc-400 dark:hover:text-zinc-100"
              type="button"
              aria-label={`Switch to ${themeOption.label} theme`}
              data-id={themeOption.id}
              data-checked={isActive}
              aria-pressed={isActive}
              onClick={() => setTheme(themeOption.id)}
            >
              {/** clone the icon and apply color if active */}
              {isActive ? (
                <span className="text-yellow-600 dark:text-yellow-600">
                  {themeOption.icon}
                </span>
              ) : (
                themeOption.icon
              )}
            </button>
            <span className="pointer-events-none absolute top-full left-1/2 z-10 mt-2 -translate-x-1/2 rounded bg-zinc-900 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              {themeOption.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-zinc-100 px-0 py-4 dark:border-zinc-800">
      <div className="flex items-center justify-between">
        <div className="text-xs text-zinc-400">
          <span>
            {new Date().toLocaleString('default', { year: 'numeric' })} Ricardo
            Gonzalez. Made with ❤️ in London, 🇬🇧
          </span>
        </div>
        <div className="text-xs text-zinc-400">
          <ThemeSwitch />
        </div>
      </div>
    </footer>
  )
}
