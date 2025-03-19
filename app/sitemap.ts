import { getBlogPosts } from "@/lib/blog";

export const baseUrl = "https://ryck.xyz";

export default async function sitemap() {
  const posts = await getBlogPosts();

  const blogs = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.publishedAt,
  }));

  const routes = ["", "/blog", "/blog/categories", "/projects", "/resume"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  const uniqueCategories = [...new Set(posts.flatMap(post => post.categories || []))];
  const categories = uniqueCategories.map((category) => ({
    url: `${baseUrl}/categories/${category}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs, ...categories];
}
