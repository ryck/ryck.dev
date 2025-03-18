import { Feed } from "feed";
import { getBlogPosts } from "@/lib/blog";
import { WEBSITE_URL } from "@/lib/constants";
import { CustomMDX, markdownToHtml } from "@/lib/mdx";
import { serialize } from "next-mdx-remote/serialize";
import { renderToStaticMarkup } from "react-dom/server";


const feed = new Feed({
  title: "My Blog RSS Feed",
  description: "This is my personal feed!",
  id: `${WEBSITE_URL}/blog`,
  link: `${WEBSITE_URL}/blog/rss.xml`,
  language: "en",
  copyright: `${new Date().toLocaleString('default', { year: 'numeric' })} Ricardo Gonzalez`,
  image: `${WEBSITE_URL}/logo.png`,
  favicon: `${WEBSITE_URL}/favicon.png`,
  updated: new Date(),
  author: {
    name: 'Ricardo Gonzalez',
    email: 'rickgc@gmail.com',
    link: WEBSITE_URL,
  }

})

export async function GET() {
  const posts = await getBlogPosts();

  posts.sort(
    (a, b) =>
      +new Date(b.publishedAt) -
      +new Date(a.publishedAt),
  );
  posts.forEach(async (post) => {

    const markup = await markdownToHtml(post.content);

    feed.addItem({
      title: `${post.title ?? ""}`,
      link: `${WEBSITE_URL}/blog/${post.slug}`,
      description: `${post.summary ?? ""}`,
      date: new Date(post.publishedAt),
      content: markup
    });
  });

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/rss+xml",
    },
  });
}