import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'

export async function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, '')
  const fullPath = path.join(process.cwd(), 'src/content/posts', `${realSlug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Extraire les métadonnées et le contenu du fichier MDX
  const { data, content } = matter(fileContents)

  // Sérialiser le contenu MDX avec remark-gfm pour les fonctionnalités GFM
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
  })

  return { slug: realSlug, frontMatter: data, content: mdxSource }
}

export interface PostMetadata {
  slug: string
  title: string
  date: string
  author: string
  excerpt: string
  tags: string[]
}

export function getAllPosts(): PostMetadata[] {
  const postsDirectory = path.join(process.cwd(), 'src/content/posts')
  const filenames = fs.readdirSync(postsDirectory)

  return filenames.map(filename => {
    const slug = filename.replace(/\.mdx$/, '')
    const fullPath = path.join(postsDirectory, filename)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)

    return {
      slug,
      title: data.title || 'Untitled',
      date: data.date || '',
      author: data.author || '',
      excerpt: data.excerpt || '',
      tags: data.tags || []
    }
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
