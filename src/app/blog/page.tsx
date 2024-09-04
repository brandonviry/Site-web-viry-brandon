import Link from 'next/link'
import { getAllPosts } from '../../lib/mdx'
import { Metadata } from 'next';
import metatags from '@/data/metatags.json';

// Fonction pour générer une couleur aléatoire
function getRandomColor() {
  const colors = [
    'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 
    'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500',
    'bg-orange-500', 'bg-cyan-500', 'bg-lime-500', 'bg-emerald-500',
    'bg-sky-500', 'bg-violet-500', 'bg-fuchsia-500', 'bg-rose-500',
    'bg-amber-500', 'bg-slate-500', 'bg-zinc-500', 'bg-neutral-500',
    'bg-stone-500', 'bg-red-600', 'bg-blue-600', 'bg-green-600',
    'bg-yellow-600', 'bg-purple-600', 'bg-pink-600', 'bg-indigo-600',
    'bg-teal-600', 'bg-orange-600'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

export const metadata: Metadata = metatags.blog;

export default async function Blog() {
  const posts = await getAllPosts()

  return (
    <div className="bg-gray-900 min-h-screen text-gray-100 font-sans">
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 text-blue-400">Blog</h1>
          <p className="text-xl text-gray-300">Découvrez mes derniers articles</p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((slug: string) => {
            const randomColor = getRandomColor();
            return (
              <Link href={`/blog/${slug}`} key={slug} className="group">
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-blue-400/30 hover:scale-105">
                  <div className={`h-48 ${randomColor}`}></div>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-2 text-gray-100 group-hover:text-blue-400 transition-colors duration-300">
                      {slug.replace(/-/g, ' ')}
                    </h2>
                    <p className="text-gray-400 text-sm">
                      Cliquez pour lire l'article complet
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  )
}