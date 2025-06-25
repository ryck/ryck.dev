import { AnimatedBackground } from '@/components/ui/animated-background'
import { getBlogPosts, type Post } from '@/lib/blog'
import { BlogExcerpt } from '@/components/BlogExcerpt'
import { TextShimmer } from '@/components/ui/text-shimmer'

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

export default async function Blog() {
  const allPosts = await getBlogPosts()
  const sortedPosts = allPosts.sort(
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
