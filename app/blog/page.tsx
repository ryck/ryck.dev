import { AnimatedBackground } from '@/components/ui/animated-background'
import { getBlogPosts, type Post } from '@/lib/blog'
import { BlogExcerpt } from '@/components/BlogExcerpt'

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
  const allPosts = await getBlogPosts();
  const sortedPosts = allPosts.sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const postsByYear = groupPostsByYear(sortedPosts)
  const years = Object.keys(postsByYear).sort((a, b) => b.localeCompare(a))

  return (
    <main className="space-y-10">
      {years.map(year => (
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
