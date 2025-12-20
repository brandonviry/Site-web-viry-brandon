import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://site-web-viry-brandon.vercel.app'

  // URLs statiques
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/publications`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  // Récupérer les articles du blog de manière sécurisée
  try {
    const postsDirectory = path.join(process.cwd(), 'src/content/posts')

    if (fs.existsSync(postsDirectory)) {
      const filenames = fs.readdirSync(postsDirectory)

      const blogUrls: MetadataRoute.Sitemap = filenames
        .filter(filename => filename.endsWith('.mdx'))
        .map(filename => {
          try {
            const slug = filename.replace(/\.mdx$/, '')
            const fullPath = path.join(postsDirectory, filename)
            const fileContents = fs.readFileSync(fullPath, 'utf8')
            const { data } = matter(fileContents)

            return {
              url: `${baseUrl}/blog/${slug}`,
              lastModified: data.date ? new Date(data.date) : new Date(),
              changeFrequency: 'monthly' as const,
              priority: 0.7,
            }
          } catch (error) {
            console.error(`Erreur lors du traitement de ${filename}:`, error)
            return null
          }
        })
        .filter((item): item is NonNullable<typeof item> => item !== null)

      return [...routes, ...blogUrls]
    }
  } catch (error) {
    console.error('Erreur lors de la génération du sitemap:', error)
  }

  return routes
}
