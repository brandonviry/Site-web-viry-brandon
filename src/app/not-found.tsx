import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-100">
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h2 className="text-5xl font-bold mb-8 text-blue-400">404</h2>
        <h3 className="text-3xl font-semibold mb-4 text-white">Page Non Trouvée</h3>
        <p className="text-xl mb-8 text-gray-300">
          Désolé, la page que vous recherchez n&#39;existe pas ou a été déplacée.
        </p>
        <div className="border-t border-gray-700 pt-8">
          <p className="text-lg mb-4 text-gray-400">
            Que souhaitez-vous faire ?
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/" 
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
            >
              Retour à l&#39;accueil
            </Link>
            <Link 
              href="/contact" 
              className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-lg font-medium"
            >
              Contactez-nous
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
