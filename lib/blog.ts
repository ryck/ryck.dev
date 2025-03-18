import { promises as fs } from "fs"
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

// import { type Category } from "./categories";

export interface Metadata {
  title: string
  publishedAt: string
  published: boolean
  summary: string
  lang: 'en' | 'es'
  categories: string[]
}

export interface Post extends Metadata {
  slug: string
  content: string
  readingTime: number
}

export const postsPerPage = 3 as const;

// export async function getPosts(): Promise<Post[]> {
//     // Retreive slugs from post routes
//     const slugs = (
//         await fs.readdir(path.join(process.cwd(), "app", "data", "blog"))
//     ).filter((file) => path.extname(file) === ".mdx");


//     console.log({ slugs })
//     // Retreive metadata from MDX files
//     const posts =  slugs.map((file) => {
//         // let { data: metadata, content } = readMDXFile(path.join(dir, file));

//         let slug = path.basename(file, path.extname(file));
//         const raw = fs.readFileSync(path.join(dir, file), "utf-8");
//         const { data, content } = matter(raw);

//         return {
//           metadata: {
//             ...data,
//           },
//           slug,
//           date: new Date(data.publishedAt).toISOString(),
//           readingTime: Math.ceil(readingTime(content).minutes),
//           content,
//         };
//       });

//     // Sort posts from newest to oldest
//     posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));

//     console.log(posts)
//     return posts;
// }

export async function getBlogPosts(): Promise<Post[]> {
  const dir = (path.join(process.cwd(), "data", "posts"))
  const files = await fs.readdir(dir)
  const mdxFiles = files.filter((file) => path.extname(file) === ".mdx");

  const posts = await Promise.all(mdxFiles.map(async (file) => {
    let slug = path.basename(file, path.extname(file));
    const raw = await fs.readFile(path.join(dir, file), "utf-8");
    const { data, content } = matter(raw);

    return {
      ...data,
      slug,
      content,
      readingTime: Math.ceil(readingTime(content).minutes),
    } as Post;
  }));

  return posts
}

export async function getBlogPost(slug: string): Promise<Post | null> {
  const dir = path.join(process.cwd(), "data", "posts");
  const files = await fs.readdir(dir);
  const mdxFile = files.find((file) => path.extname(file) === ".mdx" && path.basename(file, path.extname(file)) === slug);

  if (!mdxFile) return null;

  const raw = await fs.readFile(path.join(dir, mdxFile), "utf-8");
  const { data, content } = matter(raw);

  return {
    ...data,
    slug,
    content,
  } as Post;
}