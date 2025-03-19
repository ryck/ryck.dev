import { getBlogPosts } from "@/lib/blog";

export const baseUrl = "https://ryck.xyz";

export default async function sitemap() {
  const blogs = (await getBlogPosts()).map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.publishedAt,
  }));

  const routes = ["", "/blog"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
