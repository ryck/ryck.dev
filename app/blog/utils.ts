import { promises as fs } from 'fs';
import type { PathLike } from 'fs';
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

async function getMDXData(dir: PathLike) {
    const mdxFiles = (await fs.readdir(dir))
        .filter((file) => path.extname(file) === ".mdx");

    const posts = await Promise.all(mdxFiles.map(async (file) => {
        const slug = path.basename(file, path.extname(file));
        const raw = await fs.readFile(path.join(dir as string, file), "utf-8");
        const { data, content } = matter(raw);

        return {
            metadata: {
                ...data,
            },
            slug,
            date: new Date(data.publishedAt).toISOString(),
            readingTime: Math.ceil(readingTime(content).minutes),
            content,
        };
    }));

    return posts;
}

export function getBlogPosts() {
    return getMDXData(path.join(process.cwd(), "app", "blog", "posts"));
}

export function formatDate(date: string, includeRelative = false) {
    const currentDate = new Date();
    if (!date.includes("T")) {
        date = `${date}T00:00:00`;
    }
    const targetDate = new Date(date);

    const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
    const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
    const daysAgo = currentDate.getDate() - targetDate.getDate();

    let formattedDate = "";

    if (yearsAgo > 0) {
        formattedDate = `${yearsAgo}y ago`;
    } else if (monthsAgo > 0) {
        formattedDate = `${monthsAgo}mo ago`;
    } else if (daysAgo > 0) {
        formattedDate = `${daysAgo}d ago`;
    } else {
        formattedDate = "Today";
    }

    const fullDate = targetDate.toLocaleString("en-GB", {
        month: "short",
        day: "2-digit",
        year: "2-digit",
    });

    if (!includeRelative) {
        return fullDate;
    }

    return `${fullDate} (${formattedDate})`;
}