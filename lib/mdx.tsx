import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'
import React, { ComponentPropsWithoutRef } from 'react'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkA11yEmoji from '@fec/remark-a11y-emoji'
import remarkToc from 'remark-toc'
import { Code } from 'bright'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

type HeadingProps = ComponentPropsWithoutRef<'h1'>
type ParagraphProps = ComponentPropsWithoutRef<'p'>
type ListProps = ComponentPropsWithoutRef<'ul'>
type ListItemProps = ComponentPropsWithoutRef<'li'>

function Table({ data }: { data: { headers: string[]; rows: string[][] } }) {
  const headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ))
  const rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ))

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

function CustomLink(props: { href: string; children: React.ReactNode }) {
  const href = props.href

  if (href.startsWith('/')) {
    return <Link href={href}>{props.children}</Link>
  }

  if (href.startsWith('#')) {
    return <a {...props} />
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

/* eslint-disable jsx-a11y/alt-text */
function RoundedImage(props: {
  alt: string
  className?: string
  src: string
  width?: number
  height?: number
}) {
  return <Image className="rounded-lg" {...props} />
}
/* eslint-enable jsx-a11y/alt-text */

// set any prop globally
Code.lineNumbers = true
Code.theme = {
  dark: 'github-dark',
  light: 'github-light',
  // lightSelector: '[data-theme="light"]',
  lightSelector: 'html.light',
}
const components = {
  h1: (props: HeadingProps) => (
    <h1 className="fade-in mb-0 pt-12 font-medium" {...props} />
  ),
  h2: (props: HeadingProps) => (
    <h2 className="mt-8 mb-3 font-medium" {...props} />
  ),
  h3: (props: HeadingProps) => (
    <h3 className="mt-8 mb-3 font-medium" {...props} />
  ),
  h4: (props: HeadingProps) => <h4 className="font-medium" {...props} />,
  p: (props: ParagraphProps) => <p className="leading-snug" {...props} />,
  ol: (props: ListProps) => (
    <ol className="list-decimal space-y-2 pl-5" {...props} />
  ),
  ul: (props: ListProps) => (
    <ul className="list-disc space-y-1 pl-5" {...props} />
  ),
  li: (props: ListItemProps) => <li className="pl-1" {...props} />,
  em: (props: ComponentPropsWithoutRef<'em'>) => (
    <em className="font-medium" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-medium" {...props} />
  ),

  Image: RoundedImage,
  a: CustomLink,
  pre: Code,
  Table,
}

export function CustomMDX(
  props: Omit<MDXRemoteProps, 'components'> & {
    components?: MDXRemoteProps['components']
    source: string
  },
) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
      options={{
        mdxOptions: {
          remarkPlugins: [
            // Adds support for GitHub Flavored Markdown
            remarkGfm,
            // Makes emojis more accessible
            remarkA11yEmoji,
            // generates a table of contents based on headings
            remarkToc,
          ],
          // These work together to add IDs and linkify headings
          rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
        },
      }}
    />
  )
}

/**
 * Converts Markdown content to HTML.
 * @param markdown - The Markdown string.
 * @returns The converted HTML string.
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse) // Parse Markdown
    .use(remarkGfm) // Support GitHub-Flavored Markdown
    .use(remarkRehype) // Convert Markdown to HTML AST
    .use(rehypeStringify) // Convert HTML AST to string
    .process(markdown)

  return result.toString() // Return HTML string
}
