import { notFound } from "next/navigation";
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { CustomMDX } from "@/lib/mdx";
import { getBlogPosts, type Post } from '@/lib/blog'
import { headers } from 'next/headers'
import Link from 'next/link'
import { Metadata } from "next"
import { WEBSITE_URL } from "@/lib/constants";


interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params

  const allPosts = await getBlogPosts();
  let post = allPosts.find((post) => post.slug === slug);

  if (!post) {
    notFound()
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    categories,
    readingTime,
  } = post;

  let ogImage = `${WEBSITE_URL}/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&publishedTime=${encodeURIComponent(publishedTime)}&categories=${encodeURIComponent(categories?.join(','))}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${WEBSITE_URL}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}



export default async function Post({ params }: PageProps) {
  const { slug } = await params

  const headersList = await headers()
  const acceptLanguage = headersList.get('accept-language') || 'en-US'
  const locale = acceptLanguage.split(',')[0]

  const allPosts = await getBlogPosts();
  const posts = allPosts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  const currentIndex = posts.findIndex((post) => post.slug === slug);

  if (currentIndex === -1) {
    notFound();
  }

  const post = posts[currentIndex];
  const prevPost = posts[currentIndex + 1] || null;
  const nextPost = posts[currentIndex - 1] || null;


  return (
    <>
      <div className="pointer-events-none fixed left-0 top-0 z-10 h-12 w-full bg-gray-100 to-transparent backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)] dark:bg-zinc-950" />
      <ScrollProgress
        className="fixed top-0 z-20 h-0.5 bg-gray-300 dark:bg-zinc-600"
        springOptions={{
          bounce: 0,
        }}
      />
      <main>
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">{post.title}</h1>
        <div className="flex items-center space-x-2 text-sm font-normal dark:text-zinc-100">
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString(locale, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </time>
          <span>·</span>
          <span>{post.readingTime} min read</span>
        </div>
        {post.categories && (
          <p className="text-xs text-zinc-700 dark:text-zinc-600 flex space-x-2 mt-2">
            {post.categories.map((category: string) => (
              <Link
                key={category}
                href={`/blog/categories/${encodeURIComponent(category)}`}
                className="hover:text-zinc-900 dark:hover:text-zinc-300"
              >
                <span className="bg-neutral-600 text-neutral-50 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-800 dark:text-gray-300">{category.toLowerCase()}</span>
              </Link>
            ))}
          </p>
        )}

        <article className="prose lg:prose-xl prose-gray mt-10 pb-10 prose-h4:prose-base dark:prose-invert prose-h1:text-xl prose-h1:font-medium prose-h2:mt-12 prose-h2:scroll-m-20 prose-h2:text-lg prose-h2:font-medium prose-h3:text-base prose-h3:font-medium prose-h4:font-medium prose-h5:text-base prose-h5:font-medium prose-h6:text-base prose-h6:font-medium prose-strong:font-medium max-w-none">
          <CustomMDX source={post.content} />
        </article>

        <nav className="flex justify-between">
          {prevPost ? (
            <Link href={`/blog/${prevPost.slug}`} className="flex flex-col">
              <span className="text-sm text-zinc-500">Previous</span>
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{prevPost.title}</span>
            </Link>
          ) : <div />}

          {nextPost ? (
            <Link href={`/blog/${nextPost.slug}`} className="flex flex-col text-right">
              <span className="text-sm text-zinc-500">Next</span>
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{nextPost.title}</span>
            </Link>
          ) : <div />}
        </nav>
      </main>
    </>
  )
}
