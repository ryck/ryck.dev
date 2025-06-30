import Link from 'next/link'
import { AnimatedBackground } from '@/components/ui/animated-background'

import { getBlogPosts } from '@/lib/blog'
import { BlogExcerpt } from '@/components/BlogExcerpt'
import { TextScramble } from '@/components/ui/text-scramble'
import SpotifyNowPlaying from '@/components/SpotifyNowPlaying'

// Add revalidate option (1 hour in seconds)
export const revalidate = 3600

// Add generateStaticParams function
export async function generateStaticParams() {
  return [{}]
}

export default async function Home() {
  const allPosts = await getBlogPosts()
  const posts = allPosts
    .filter((post) => post.lang === 'en') // Filter English posts only
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .slice(0, 3) // Get the latest 3 posts

  return (
    <main className="space-y-12 py-6">
      <section>
        <div className="flex-1">
          <h1 className="mb-3 text-3xl font-bold text-black dark:text-white">
            Hola, I&apos;m Rick!
            <span className="animate-wiggle ml-2 inline-block">👋🏻</span>
          </h1>
          <p className="mb-2 text-zinc-600 dark:text-zinc-400">
            I am software engineer living in London, UK. I have a passion for
            building high-quality web applications and exploring new
            technologies.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            Welcome to my personal website! Here, you can find my latest blog
            posts, projects, and more about me. I hope you enjoy your visit!
          </p>
        </div>

        <aside className="mt-6 mb-6 flex items-center gap-2">
          <span className="relative inline-flex h-3 w-3 animate-pulse rounded-full bg-green-500 ring-1 ring-green-300"></span>
          <TextScramble
            className="font-mono text-xs text-green-700 uppercase dark:text-green-400"
            as={'span'}
            duration={2}
          >
            Available to hire
          </TextScramble>
        </aside>
      </section>

      <section>
        <h3 className="mb-3 text-lg font-bold text-yellow-600">
          Latest articles
        </h3>
        <div className="flex flex-col space-y-0">
          <AnimatedBackground
            enableHover
            className="h-full w-full rounded-lg bg-zinc-100 dark:bg-zinc-900/80"
            transition={{
              type: 'spring',
              bounce: 0,
              duration: 0.2,
            }}
          >
            {posts.map((post) => (
              <BlogExcerpt post={post} key={post.slug} />
            ))}
          </AnimatedBackground>
          <Link
            href="/blog"
            className="mt-4 flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          >
            View all posts
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
            >
              <path
                d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </Link>
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-lg font-bold text-yellow-600">
          Latest projects
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h4 className="mb-1 text-base font-semibold text-zinc-900 dark:text-zinc-100">
              <a
                href="https://github.com/ryck/scrobblex"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                ScrobbleX
              </a>
            </h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
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
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h4 className="mb-1 text-base font-semibold text-zinc-900 dark:text-zinc-100">
              <a
                href="https://github.com/ryck/yaak-uuid"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Yaak UUID Plugin
              </a>
            </h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              A{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-500 hover:underline"
                href="http://yaak.app"
              >
                Yaak
              </a>{' '}
              template tag plugin to generate UUIDs using the{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-500 hover:underline"
                href="https://github.com/uuidjs/uuid"
              >
                UUID package
              </a>
              .
            </p>
          </div>
        </div>
        <Link
          href="/projects"
          className="mt-4 flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
        >
          View all projects
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
          >
            <path
              d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </Link>
      </section>

      <section>
        <SpotifyNowPlaying />
      </section>
    </main>
  )
}
