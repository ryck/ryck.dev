import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
}

function capitalize(str: string): string {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

async function capitalizeCategories() {
  const postsDir = path.join(process.cwd(), 'data', 'posts')
  const files = await fs.readdir(postsDir)
  const mdxFiles = files.filter(file => file.endsWith('.mdx'))

  for (const file of mdxFiles) {
    const filePath = path.join(postsDir, file)
    const content = await fs.readFile(filePath, 'utf8')
    const { data, content: mdxContent } = matter(content)

    // Capitalize categories if they exist
    if (data.categories) {
      if (Array.isArray(data.categories)) {
        data.categories = data.categories.map(category => {
          const capitalized = capitalize(category)
          const slug = slugify(category)
          return `[${capitalized}](/categories/${slug})`
        })
      }
    }

    // Convert frontmatter back to YAML
    const newContent = matter.stringify(mdxContent, data)

    // Write the file back
    await fs.writeFile(filePath, newContent)
    console.log(`✓ Processed ${file}`)
  }

  console.log('\nDone! All categories have been capitalized and linked.')
}

capitalizeCategories().catch(console.error) 