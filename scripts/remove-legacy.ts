import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

async function removeLegacyCategory() {
  const postsDir = path.join(process.cwd(), 'data', 'posts')
  const files = await fs.readdir(postsDir)
  const mdxFiles = files.filter(file => file.endsWith('.mdx'))

  for (const file of mdxFiles) {
    const filePath = path.join(postsDir, file)
    const content = await fs.readFile(filePath, 'utf8')
    const { data, content: mdxContent } = matter(content)

    // Remove only the legacy category if it exists
    if (data.categories) {
      if (Array.isArray(data.categories)) {
        data.categories = data.categories.filter(cat => cat !== 'legacy')
        // Remove the categories field if it's empty after filtering
        if (data.categories.length === 0) {
          delete data.categories
        }
      }
    }

    // Convert frontmatter back to YAML
    const newContent = matter.stringify(mdxContent, data)

    // Write the file back
    await fs.writeFile(filePath, newContent)
    console.log(`✓ Processed ${file}`)
  }

  console.log('\nDone! Legacy category has been removed.')
}

removeLegacyCategory().catch(console.error) 