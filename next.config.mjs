import createMDX from '@next/mdx';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode from "rehype-pretty-code";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  cleanDistDir: true,
  poweredByHeader: false,
  env: {
    NEXT_TELEMETRY_DISABLED: '1',
  },
  // transpilePackages: ['next-mdx-remote'],
};

/** @type {import('rehype-pretty-code').Options} */
const rehypePrettyCodeOptions = {
  defaultLang: 'javascript',
  keepBackground: false,
  theme: "one-dark-pro",

  // optional customizations
  defaultColor: 'dark',
  // cssVariablePrefix: '--shiki-'
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkFrontmatter, [remarkMdxFrontmatter, { name: 'metadata' }], remarkGfm],
    rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions], rehypeSlug],

  },
});

export default (nextConfig);
