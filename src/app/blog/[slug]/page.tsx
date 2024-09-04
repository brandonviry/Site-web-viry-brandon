

import dynamic from 'next/dynamic'
import { getPostBySlug, getAllPosts } from '@/lib/mdx'
import './article.css'

type BlogPostProps = {
  params: {
    slug: string
  }
}

const MDXContent = dynamic(() => import('@/components/MDXContent'), {
  loading: () => <p>Chargement du contenu...</p>,
  ssr: false
})

export default async function Post({ params }: BlogPostProps) {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    return <div>Article non trouvé</div>
  }

  return (
    <section>
      <article className='min-h-screen max-w-4xl mx-auto px-6 py-10' id='article'>
        <h1 className="text-3xl font-bold mb-6">{post.frontMatter.title}</h1>
        <MDXContent source={post.content} />
      </article>
    </section>
  )
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: BlogPostProps) {
  const post = await getPostBySlug(params.slug)
  
  if (!post) return {}

  const { frontMatter } = post

  return {
    title: frontMatter.title,
    description: frontMatter.excerpt,
    openGraph: {
      title: frontMatter.title,
      description: frontMatter.excerpt,
      images: frontMatter.coverImage ? [frontMatter.coverImage] : [],
      url: `https://votre-domaine.com/blog/${params.slug}`,
      type: 'article',
      publishedTime: frontMatter.date,
      authors: [frontMatter.author],
      tags: frontMatter.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: frontMatter.title,
      description: frontMatter.excerpt,
      images: frontMatter.coverImage ? [frontMatter.coverImage] : [],
    },
    keywords: frontMatter.tags.join(', '),
  }
}