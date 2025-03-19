import { getBlogPosts } from '@/lib/blog'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { WEBSITE_URL } from '@/lib/constants'
import { BlogExcerpt } from '@/components/BlogExcerpt'

interface PageProps {
  params: Promise<{
    category: string
  }>
}

// Add revalidate option (24 hours in seconds)
export const revalidate = 86400

// Add generateStaticParams function
export async function generateStaticParams() {
  const posts = await getBlogPosts()
  const categories = Array.from(
    new Set(posts.flatMap((post) => post.categories || [])),
  )

  return categories.map((category) => ({
    category: category,
  }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category } = await params
  const decodedCategory = decodeURIComponent(category)

  return {
    title: `${decodedCategory} Posts`,
    description: `Blog posts categorized under ${decodedCategory}`,
    openGraph: {
      title: `${decodedCategory} Posts`,
      description: `Blog posts categorized under ${decodedCategory}`,
      url: `${WEBSITE_URL}/blog/categories/${category}`,
    },
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params
  const decodedCategory = decodeURIComponent(category)

  const posts = await getBlogPosts()
  const filteredPosts = posts.filter((post) =>
    post.categories?.some(
      (cat) => cat.toLowerCase() === decodedCategory.toLowerCase(),
    ),
  )

  if (filteredPosts.length === 0) {
    notFound()
  }

  return (
    <main>
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
        {decodedCategory}
      </h1>
      <div className="flex flex-col gap-8">
        {filteredPosts.map((post) => (
          <BlogExcerpt post={post} key={post.slug} />
        ))}
      </div>
    </main>
  )
}
