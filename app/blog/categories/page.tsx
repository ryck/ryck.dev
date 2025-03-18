import { AnimatedBackground } from '@/components/ui/animated-background'
import { getBlogPosts } from '@/lib/blog'
import Link from 'next/link'

export const metadata = {
  title: 'Categories',
  description: 'Browse blog posts by category',
}

export default async function CategoriesPage() {
  const posts = await getBlogPosts()

  const categories = Array.from(
    new Set(
      posts.flatMap(post => post.categories || [])
    )
  )

  const categoryCount = categories.reduce((acc, category) => {
    acc[category] = posts.filter(post =>
      post.categories?.includes(category)
    ).length
    return acc
  }, {} as Record<string, number>)

  const sortedCategories = categories.sort((a, b) => categoryCount[b] - categoryCount[a])

  return (
    <main>
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
        Categories
      </h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        <AnimatedBackground
          enableHover
          className="h-full w-full rounded-lg bg-zinc-100 dark:bg-zinc-900/80"
          transition={{
            type: 'spring',
            bounce: 0,
            duration: 0.2,
          }}
        >
          {sortedCategories.map(category => (
            <Link
              key={category}
              href={`/blog/categories/${encodeURIComponent(category)}`}
              className="group rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 hover:border-zinc-300 dark:hover:border-zinc-700"
              data-id={category}
            >
              <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-700 dark:group-hover:text-zinc-300">
                {category}
              </h2>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {categoryCount[category]} posts
              </p>
            </Link>
          ))}
        </AnimatedBackground>
      </div>
    </main>
  )
}