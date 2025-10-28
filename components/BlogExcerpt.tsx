import Link from 'next/link'

import { Post } from '@/lib/blog'

export function BlogExcerpt({ post }: { post: Post }) {
  return (
    <article
      className="-mx-3 rounded-xl px-3 py-3"
      key={post.slug}
      data-id={post.slug}
    >
      <div className="flex items-start">
        <div className="flex w-12 shrink-0 flex-col text-center leading-none">
          <span className="mb-2 bg-zinc-200 text-xs dark:text-zinc-800">
            {new Date(post.publishedAt).toLocaleString('default', {
              year: 'numeric',
            })}
          </span>
          <span className="mb-2 border-b-2 border-zinc-700 pb-2 dark:text-zinc-100">
            {new Date(post.publishedAt).toLocaleString('default', {
              month: 'short',
            })}
          </span>
          <span className="title-font text-lg leading-none font-medium dark:text-zinc-400">
            {new Date(post.publishedAt).toLocaleString('default', {
              day: '2-digit',
            })}
          </span>
        </div>
        <div className="flex grow flex-col space-y-1 pl-6">
          <h4 className="text-xl font-normal dark:text-zinc-100">
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </h4>
          <p className="text-zinc-500 dark:text-zinc-400">{post.summary}</p>
          <p className="flex flex-wrap gap-2">
            {post.categories &&
              post.categories.map((category: string) => (
                <Link
                  key={category}
                  href={`/blog/categories/${encodeURIComponent(category.toLowerCase())}`}
                >
                  <span className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 ring-1 ring-inset ring-zinc-600/20 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-400/20 dark:hover:bg-zinc-700">
                    {category.toLowerCase()}
                  </span>
                </Link>
              ))}
            {post.lang && (
              <span className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 ring-1 ring-inset ring-zinc-600/20 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-400/20 dark:hover:bg-zinc-700">
                {post.lang === 'es'
                  ? '🇪🇸'
                  : post.lang === 'en'
                    ? '🇬🇧'
                    : post.lang}
              </span>
            )}
          </p>
        </div>
      </div>
    </article>
  )
}
