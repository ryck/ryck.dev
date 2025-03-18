import { Post } from "@/lib/blog";
import Link from "next/link";

export function BlogExcerpt({ post }: { post: Post }) {
    return (
        <article className="-mx-3 rounded-xl px-3 py-3" key={post.slug} data-id={post.slug}>
            <div className="flex items-start">
                <div className="flex w-12 flex-shrink-0 flex-col text-center leading-none">
                    <span className="dark:text-zinc-800 text-xs mb-2 bg-zinc-200">{new Date(post.publishedAt).toLocaleString('default', { year: 'numeric' })}</span>
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
                <div className="flex flex-grow flex-col space-y-1 pl-6">
                    <h4 className="font-normal text-xl dark:text-zinc-100">
                        <Link key={post.slug}
                            href={`/blog/${post.slug}`}
                        >
                            {post.title}
                        </Link>
                    </h4>
                    <p className="text-zinc-500 dark:text-zinc-400">
                        {post.summary}
                    </p>
                    <p className="flex space-x-2">
                        {post.categories && (
                            post.categories.map((category: string) => (
                                <Link
                                    key={category}
                                    href={`/blog/categories/${encodeURIComponent(category.toLowerCase())}`}
                                    className="hover:text-zinc-900 dark:hover:text-zinc-300"
                                >
                                    <span className="bg-neutral-600 text-neutral-50 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-800 dark:text-gray-300">{category.toLowerCase()}</span>
                                </Link>
                            ))
                        )}
                        {post.lang && (
                            <span>
                                {post.lang === 'es' ? '🇪🇸' : post.lang === 'en' ? '🇬🇧' : post.lang}
                            </span>
                        )}
                    </p>
                </div>
            </div>
        </article>
    )
}