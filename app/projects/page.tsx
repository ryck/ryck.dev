import { Metadata } from 'next'
import Image from 'next/image'

import { TextShimmer } from '@/components/ui/text-shimmer'

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
            <Image
              src="https://github.com/ryck/scrobblex/blob/main/static/images/apple-touch-icon-152x152.png?raw=true"
              alt="Scribblex"
              width={160}
              height={112}
              className="hidden h-28 w-40 flex-shrink-0 rounded-md object-contain sm:block"
              unoptimized
            />
            <div className="flex-1">
              <h2 className="mb-2 text-xl font-semibold">Scrobblex</h2>
              <p className="mb-2 text-zinc-600 dark:text-zinc-400">
                Self-hosted app that enables{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-500 hover:underline"
                  href="https://plex.tv"
                >
                  Plex
                </a>{' '}
                scrobbling (and rating) integration with{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-500 hover:underline"
                  href="https://trakt.tv"
                >
                  Trakt
                </a>{' '}
                via webhooks
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
            <Image
              src="https://vitejs.dev/logo.svg"
              alt="React Vite Modern Tooling Template"
              width={160}
              height={112}
              className="hidden h-28 w-40 flex-shrink-0 rounded-md object-contain sm:block"
              unoptimized
            />
            <div className="flex-1">
              <h2 className="mb-2 text-xl font-semibold">
                React Vite Modern Tooling Template
              </h2>
              <p className="mb-2 text-zinc-600 dark:text-zinc-400">
                A modern{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-500 hover:underline"
                  href="https://react.dev"
                >
                  React
                </a>{' '}
                +{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-500 hover:underline"
                  href="https://vitejs.dev"
                >
                  Vite
                </a>{' '}
                template with{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-500 hover:underline"
                  href="https://www.typescriptlang.org"
                >
                  TypeScript
                </a>
                ,{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-500 hover:underline"
                  href="https://vitest.dev"
                >
                  Vitest
                </a>
                ,{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-500 hover:underline"
                  href="https://testing-library.com/docs/react-testing-library/intro"
                >
                  React Testing Library
                </a>{' '}
                and more...
              </p>
              <a
                href="https://github.com/ryck/react-vite-modern-tooling-template"
                className="text-yellow-500 underline dark:text-yellow-600"
              >
                GitHub
              </a>
            </div>
          </div>

          {/* Example project card */}
          <div className="flex items-start gap-6 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm lg:col-span-2 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex-1">
              <h2 className="mb-2 text-xl font-semibold">MagicMirror²</h2>
              <p className="mb-2 text-zinc-600 dark:text-zinc-400">
                In the last few years, I have been working on various{' '}
                <a
                  href="https://github.com/ryck/MagicMirror"
                  className="text-yellow-500 underline dark:text-yellow-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  MagicMirror²
                </a>{' '}
                modules to enhance its functionality:
              </p>
              <ul className="list-none space-y-2 pl-0 text-zinc-600 dark:text-zinc-400">
                <dl className="grid grid-cols-1 gap-y-4 text-zinc-600 md:grid-cols-2 md:gap-x-8 dark:text-zinc-400">
                  <div className="flex flex-col gap-1">
                    <dt className="font-semibold text-zinc-800 dark:text-zinc-200">
                      <a
                        href="https://github.com/ryck/MMM-AQI"
                        className="text-yellow-500 underline dark:text-yellow-600"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        MMM-AQI
                      </a>
                    </dt>
                    <dd className="ml-0">
                      MagicMirror² module to get the Air Quality Index (AQI)
                    </dd>
                  </div>
                  <div className="flex flex-col gap-1">
                    <dt className="font-semibold text-zinc-800 dark:text-zinc-200">
                      <a
                        href="https://github.com/ryck/MMM-DHT-Sensor"
                        className="text-yellow-500 underline dark:text-yellow-600"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        MMM-DHT-Sensor
                      </a>
                    </dt>
                    <dd className="ml-0">
                      MagicMirror² module to get data from DHT11, DHT22 and
                      AM2302 sensors
                    </dd>
                  </div>
                  <div className="flex flex-col gap-1">
                    <dt className="font-semibold text-zinc-800 dark:text-zinc-200">
                      <a
                        href="https://github.com/ryck/MMM-HumanAPI"
                        className="text-yellow-500 underline dark:text-yellow-600"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        MMM-HumanAPI
                      </a>
                    </dt>
                    <dd className="ml-0">
                      MagicMirror² module to get data from HumanAPI
                    </dd>
                  </div>
                  <div className="flex flex-col gap-1">
                    <dt className="font-semibold text-zinc-800 dark:text-zinc-200">
                      <a
                        href="https://github.com/ryck/MMM-Humanize-Duration"
                        className="text-yellow-500 underline dark:text-yellow-600"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        MMM-Humanize-Duration
                      </a>
                    </dt>
                    <dd className="ml-0">
                      MagicMirror² module to convert an interval into human
                      readable units
                    </dd>
                  </div>
                  <div className="flex flex-col gap-1">
                    <dt className="font-semibold text-zinc-800 dark:text-zinc-200">
                      <a
                        href="https://github.com/ryck/MMM-TFL-Arrivals"
                        className="text-yellow-500 underline dark:text-yellow-600"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        MMM-TFL-Arrivals
                      </a>
                    </dt>
                    <dd className="ml-0">
                      MagicMirror² module for Transport for London arrivals
                      (TFL)
                    </dd>
                  </div>
                  <div className="flex flex-col gap-1">
                    <dt className="font-semibold text-zinc-800 dark:text-zinc-200">
                      <a
                        href="https://github.com/ryck/MMM-UK-Realtime-Trains"
                        className="text-yellow-500 underline dark:text-yellow-600"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        MMM-UK-Realtime-Trains
                      </a>
                    </dt>
                    <dd className="ml-0">
                      MagicMirror² module for UK Realtime Trains
                    </dd>
                  </div>
                  <div className="flex flex-col gap-1">
                    <dt className="font-semibold text-zinc-800 dark:text-zinc-200">
                      <a
                        href="https://github.com/ryck/MMM-Year-Progress"
                        className="text-yellow-500 underline dark:text-yellow-600"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        MMM-Year-Progress
                      </a>
                    </dt>
                    <dd className="ml-0">
                      MagicMirror² module to track the progress of the current
                      year / month
                    </dd>
                  </div>
                  <div className="flex flex-col gap-1">
                    <dt className="font-semibold text-zinc-800 dark:text-zinc-200">
                      <a
                        href="https://github.com/ryck/MMM-AdGuard-Home"
                        className="text-yellow-500 underline dark:text-yellow-600"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        MMM-AdGuard-Home
                      </a>
                    </dt>
                    <dd className="ml-0">
                      MagicMirror² module to get AdGuard Home stats
                    </dd>
                  </div>
                </dl>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
