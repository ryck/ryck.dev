import { Search } from 'lucide-react'

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

export default async function Blog({ searchParams }: any) {
  const allPosts = await getBlogPosts()
  // Await searchParams if it's a promise (Next.js dynamic route)
  const resolvedParams =
    typeof searchParams?.then === 'function' ? await searchParams : searchParams
  const search = resolvedParams?.search?.trim() || ''
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
              className="h-full w-full rounded-lg bg-zinc-100 dark:bg-zinc-900/80"
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
