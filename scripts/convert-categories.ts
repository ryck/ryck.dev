import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

async function convertMetadata() {
  const legacyDir = path.join(process.cwd(), 'data/posts/legacy')
  const files = await fs.readdir(legacyDir)
  
  for (const file of files) {
    if (!file.endsWith('.mdx')) continue
    
    const filePath = path.join(legacyDir, file)
    const content = await fs.readFile(filePath, 'utf8')
    const { data, content: markdown } = matter(content)
    
    console.log(`Processing ${file}:`)
    
    // Convert categories to array if needed
    if (data.categories) {
      if (typeof data.categories === 'string') {
        data.categories = data.categories.split(',').map(c => c.trim())
      }
      else if (typeof data.categories === 'object' && !Array.isArray(data.categories)) {
        data.categories = Object.values(data.categories)
      }
    }
    
    // Add lang property
    data.lang = 'es'
    
    console.log('Updated frontmatter:', data)
    
    // Reconstruct the frontmatter
    const newContent = matter.stringify(markdown, data)
    await fs.writeFile(filePath, newContent)
  }
}

convertMetadata().catch(console.error) 