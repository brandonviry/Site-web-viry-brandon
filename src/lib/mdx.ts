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

export function getAllPosts() {
  const postsDirectory = path.join(process.cwd(), 'src/content/posts')
  const filenames = fs.readdirSync(postsDirectory)
  
  return filenames.map(filename => filename.replace(/\.mdx$/, ''))
}
