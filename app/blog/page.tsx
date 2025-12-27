import { BookOpen, Calendar, Clock, Search, TrendingUp } from 'lucide-react'

import { BlogExcerpt } from '@/components/BlogExcerpt'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { TextShimmer } from '@/components/ui/text-shimmer'
import { type Post, getBlogPosts } from '@/lib/blog'

// Add revalidate option (24 hours in seconds)
export const revalidate = 86400

// Add generateStaticParams function
export async function generateStaticParams() {
  return [{}]
}

type PostsByYear = {
  [year: string]: Post[]
}

function groupPostsByYear(posts: Post[]): PostsByYear {
  return posts.reduce((acc, post) => {
    const year = new Date(post.publishedAt).getFullYear().toString()
    if (!acc[year]) {
      acc[year] = []
    }
    acc[year].push(post)
    return acc
  }, {} as PostsByYear)
}

// @ts-expect-error Next.js does not type searchParams for app directory route handlers
export default async function Blog({ searchParams }) {
  // Await searchParams if it's a promise (Next.js dynamic route)
  const resolvedParams =
    typeof searchParams?.then === 'function' ? await searchParams : searchParams
  const allPosts = await getBlogPosts()
  const searchValue = resolvedParams?.search
  const search =
    typeof searchValue === 'string'
      ? searchValue.trim()
      : Array.isArray(searchValue) && searchValue.length > 0
        ? searchValue[0].trim()
        : ''
  const filteredPosts = search
    ? allPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.summary?.toLowerCase().includes(search.toLowerCase()) ||
          post.content?.toLowerCase().includes(search.toLowerCase()),
      )
    : allPosts
  const sortedPosts = filteredPosts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )
  const postsByYear = groupPostsByYear(sortedPosts)
  const years = Object.keys(postsByYear).sort((a, b) => b.localeCompare(a))

  // Calculate stats (always based on all posts, not filtered)
  const allPostsByYear = groupPostsByYear(allPosts)
  const allYears = Object.keys(allPostsByYear).sort((a, b) =>
    b.localeCompare(a),
  )
  const totalPosts = allPosts.length
  const filteredPostsCount = filteredPosts.length
  const yearsOfBlogging = allYears.length
  const averagePostsPerYear =
    yearsOfBlogging > 0 ? Math.round(totalPosts / yearsOfBlogging) : 0
  const oldestYear =
    allYears.length > 0
      ? Math.min(...allYears.map(Number))
      : new Date().getFullYear()
  const newestYear =
    allYears.length > 0
      ? Math.max(...allYears.map(Number))
      : new Date().getFullYear()

  return (
    <main className="space-y-12 py-6">
      <TextShimmer
        duration={4}
        spread={4}
        as={'h1'}
        className="mb-4 text-3xl font-bold [--base-color:var(--color-yellow-600)] [--base-gradient-color:var(--color-yellow-400)] dark:[--base-color:var(--color-yellow-600)] dark:[--base-gradient-color:var(--color-yellow-400)]"
      >
        Blog
      </TextShimmer>
      <p className="mb-8 text-zinc-600 dark:text-zinc-400">
        I been blogging, mostly in Spanish, about pretty much everything since
        2004. This is an archive of my digital presence, feel free to explore!
      </p>

      {/* Stats Section */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="relative corner-squircle rounded-xl border bg-white/80 dark:bg-zinc-900/80 shadow p-6 flex flex-col gap-4 items-center overflow-hidden">
          <BookOpen className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 opacity-10 dark:opacity-5 text-zinc-400 dark:text-zinc-600 pointer-events-none select-none" />
          <h2 className="text-xl font-semibold mb-2 capitalize text-yellow-600 z-10">
            {search ? 'Found' : 'Total'} Posts
          </h2>
          <p className="text-4xl font-bold text-zinc-500 dark:text-zinc-200 z-10">
            {search ? filteredPostsCount : totalPosts}
          </p>
        </div>
        <div className="relative corner-squircle rounded-xl border bg-white/80 dark:bg-zinc-900/80 shadow p-6 flex flex-col gap-4 items-center overflow-hidden">
          <Calendar className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 opacity-10 dark:opacity-5 text-zinc-400 dark:text-zinc-600 pointer-events-none select-none" />
          <h2 className="text-xl font-semibold mb-2 capitalize text-yellow-600 z-10">
            Years Blogging
          </h2>
          <p className="text-4xl font-bold text-zinc-500 dark:text-zinc-200 z-10">
            {yearsOfBlogging}
          </p>
        </div>
        <div className="relative corner-squircle rounded-xl border bg-white/80 dark:bg-zinc-900/80 shadow p-6 flex flex-col gap-4 items-center overflow-hidden">
          <TrendingUp className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 opacity-10 dark:opacity-5 text-zinc-400 dark:text-zinc-600 pointer-events-none select-none" />
          <h2 className="text-xl font-semibold mb-2 capitalize text-yellow-600 z-10">
            Avg Posts/Year
          </h2>
          <p className="text-4xl font-bold text-zinc-500 dark:text-zinc-200 z-10">
            {averagePostsPerYear}
          </p>
        </div>
        <div className="relative corner-squircle rounded-xl border bg-white/80 dark:bg-zinc-900/80 shadow p-6 flex flex-col gap-4 items-center overflow-hidden">
          <Clock className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 opacity-10 dark:opacity-5 text-zinc-400 dark:text-zinc-600 pointer-events-none select-none" />
          <h2 className="text-xl font-semibold mb-2 capitalize text-yellow-600 z-10">
            Active Period
          </h2>
          <p className="text-4xl font-bold text-zinc-500 dark:text-zinc-200 z-10">
            {oldestYear}-{newestYear}
          </p>
        </div>
      </div>
      <form method="get" className="mb-8">
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400 dark:text-zinc-500">
            <Search className="h-5 w-5" aria-hidden="true" />
          </span>
          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Search posts..."
            className="w-full rounded border border-zinc-300 bg-white px-4 py-2 pl-10 text-zinc-800 shadow-sm focus:border-yellow-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
            aria-label="Search posts"
          />
        </div>
      </form>
      {years.length === 0 && (
        <p className="text-center text-zinc-500 dark:text-zinc-400">
          No posts found.
        </p>
      )}
      {years.map((year) => (
        <section key={year}>
          <div className="flex flex-col space-y-0">
            <AnimatedBackground
              enableHover
              className="h-full w-full corner-squircle rounded-lg bg-zinc-100 dark:bg-zinc-900/80"
              transition={{
                type: 'spring',
                bounce: 0,
                duration: 0.2,
              }}
            >
              {postsByYear[year].map((post) => (
                <BlogExcerpt post={post} key={post.slug} />
              ))}
            </AnimatedBackground>
          </div>
        </section>
      ))}
    </main>
  )
}
