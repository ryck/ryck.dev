import { TextShimmer } from '@/components/ui/text-shimmer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects - Rick González',
  description:
    'A selection of personal and professional projects by Rick González',
}

export default function ProjectsPage() {
  return (
    <main className="space-y-12 py-6">
      <section>
        <TextShimmer
          duration={4}
          spread={4}
          as={'h1'}
          className="mb-4 text-3xl font-bold [--base-color:var(--color-yellow-600)] [--base-gradient-color:var(--color-yellow-400)] dark:[--base-color:var(--color-yellow-600)] dark:[--base-gradient-color:var(--color-yellow-400)]"
        >
          Projects
        </TextShimmer>

        <p className="mb-8 text-zinc-600 dark:text-zinc-400">
          Here you can find a selection of my personal and professional
          projects. I enjoy working on web applications, open source, and
          creative experiments. More coming soon!
        </p>
        {/* Add your project cards or list here */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Example project card */}
          <div className="flex items-start gap-6 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <img
              src="https://github.com/ryck/scrobblex/blob/main/static/images/apple-touch-icon-152x152.png?raw=true"
              alt="Scribblex"
              className="h-28 w-40 flex-shrink-0 rounded-md object-contain"
            />
            <div className="flex-1">
              <h2 className="mb-2 text-xl font-semibold">Scrobblex</h2>
              <p className="mb-2 text-zinc-600 dark:text-zinc-400">
                Self-hosted app that enables Plex scrobbling (and rating)
                integration with Trakt via webhooks
              </p>
              <a
                href="https://github.com/ryck/scrobblex"
                className="text-yellow-500 underline dark:text-yellow-600"
              >
                GitHub
              </a>
            </div>
          </div>
          {/* Example project card */}
          <div className="flex items-start gap-6 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <img
              src="https://yaak.app/static/logo.svg"
              alt="Yaak UUID Plugin"
              className="h-28 w-40 flex-shrink-0 rounded-md object-contain"
            />
            <div className="flex-1">
              <h2 className="mb-2 text-xl font-semibold">Yaak UUID Plugin</h2>
              <p className="mb-2 text-zinc-600 dark:text-zinc-400">
                A <a href="http://yaak.app">Yaak</a> template tag plugin to
                generate <a href="https://github.com/uuidjs/uuid">UUIDs</a>
                using the UUID package.
              </p>
              <a
                href="https://github.com/ryck/yaak-plugin-uuid"
                className="text-yellow-500 underline dark:text-yellow-600"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
