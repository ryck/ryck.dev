import { Feed } from 'feed'
import { getBlogPosts } from '@/lib/blog'

export async function GET() {
    const posts = await getBlogPosts()
    const sortedPosts = posts.sort(
        (a, b) =>
            new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )

    const feed = new Feed({
        title: "Ryck's Blog",
        description: "Ryck's personal blog about web development, technology, and other interests.",
        id: "https://ryck.dev/",
        link: "https://ryck.dev/",
        language: "en",
        favicon: "https://ryck.dev/favicon.ico",
        copyright: `All rights reserved ${new Date().getFullYear()}`,
        author: {
            name: "Ryck",
            email: "hello@ryck.dev",
            link: "https://ryck.dev"
        }
    })

    sortedPosts.forEach((post) => {
        feed.addItem({
            title: post.title,
            id: `https://ryck.dev/blog/${post.slug}`,
            link: `https://ryck.dev/blog/${post.slug}`,
            description: post.summary,
            date: new Date(post.publishedAt),
        })
    })

    return new Response(feed.rss2(), {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    })
}
