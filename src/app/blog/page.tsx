import Link from 'next/link'
import { getAllPosts } from '../../lib/mdx'
import InternalLinks, { blogLinks } from '@/components/InternalLinks'
import { Metadata } from 'next';
import metatags from '@/data/metatags.json';

export const dynamic = 'force-dynamic'

export const metadata: Metadata = metatags.blog;

// Fonction pour calculer le temps de lecture estimé
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Fonction pour formater la date
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Fonction pour générer un gradient basé sur le titre
function getGradientFromTitle(title: string): string {
  const gradients = [
    'bg-gradient-to-br from-blue-600 to-blue-800',
    'bg-gradient-to-br from-purple-600 to-purple-800',
    'bg-gradient-to-br from-green-600 to-green-800',
    'bg-gradient-to-br from-orange-600 to-orange-800',
    'bg-gradient-to-br from-pink-600 to-pink-800',
    'bg-gradient-to-br from-indigo-600 to-indigo-800',
    'bg-gradient-to-br from-teal-600 to-teal-800',
    'bg-gradient-to-br from-red-600 to-red-800',
    'bg-gradient-to-br from-cyan-600 to-cyan-800',
    'bg-gradient-to-br from-violet-600 to-violet-800',
  ];

  // Générer un index basé sur le titre pour cohérence
  const hash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return gradients[hash % gradients.length];
}

export default async function Blog() {
  const posts = await getAllPosts()

  return (
    <div className="bg-gray-900 min-h-screen text-gray-100 font-sans">
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 text-blue-400">Blog Développement Web</h1>
          <p className="text-xl text-gray-300">Tutoriels, guides et articles sur React, Next.js, TypeScript et le développement web moderne. Découvrez mes conseils pratiques et bonnes pratiques de programmation.</p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {posts.map((post) => {
            const gradient = getGradientFromTitle(post.title);

            return (
              <Link
                href={`/blog/${post.slug}`}
                key={post.slug}
                className="m-4 bg-neutral-900 rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl"
              >
                <div className="relative">
                  <div className={`w-full h-48 ${gradient} flex items-center justify-center`}>
                    <svg className="w-20 h-20 text-white opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="absolute top-2 right-2 bg-blue-600 px-2 py-1 rounded text-xs font-semibold text-white shadow-lg flex items-center gap-1">
                    <span>📝</span>
                    <span>Article</span>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 px-2 py-1 text-xs text-white rounded group">
                    <span className="inline-block transition-transform duration-300 ease-in-out group-hover:translate-x-1">Lire l&#39;article</span>
                  </div>
                </div>
                <div className="px-4 py-3">
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-lg font-semibold text-white">{post.title}</h2>
                  </div>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded">
                          +{post.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                  <p className="text-gray-400 text-sm line-clamp-2 mb-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                    <span>{formatDate(post.date)}</span>
                    <span>{post.author}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </section>

        {/* Ressources externes de qualité */}
        <section className="px-6 pb-8">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Ressources Officielles pour Approfondir
            </h2>
            <p className="text-gray-300 mb-6">
              Pour aller plus loin dans votre apprentissage du développement web, consultez ces documentations officielles de référence :
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <a
                href="https://react.dev"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="flex items-start gap-3 p-4 bg-gray-900 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors group"
              >
                <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <div>
                  <h3 className="text-white font-semibold group-hover:text-blue-400 transition-colors">Documentation React</h3>
                  <p className="text-sm text-gray-400">Guide officiel complet pour maîtriser React</p>
                </div>
              </a>
              <a
                href="https://nextjs.org/docs"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="flex items-start gap-3 p-4 bg-gray-900 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors group"
              >
                <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <div>
                  <h3 className="text-white font-semibold group-hover:text-blue-400 transition-colors">Documentation Next.js</h3>
                  <p className="text-sm text-gray-400">Référence officielle du framework Next.js</p>
                </div>
              </a>
              <a
                href="https://www.typescriptlang.org/docs"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="flex items-start gap-3 p-4 bg-gray-900 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors group"
              >
                <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <div>
                  <h3 className="text-white font-semibold group-hover:text-blue-400 transition-colors">Documentation TypeScript</h3>
                  <p className="text-sm text-gray-400">Manuel officiel TypeScript avec exemples</p>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Liens internes SEO */}
        <InternalLinks links={blogLinks} title="Découvrez aussi" className="px-6 pb-12" />
      </main>
    </div>
  )
}