import Link from 'next/link';

interface LinkItem {
  href: string;
  title: string;
  description: string;
  icon: string;
}

interface InternalLinksProps {
  title?: string;
  links: LinkItem[];
  className?: string;
}

export default function InternalLinks({ title = "Découvrez aussi", links, className = "" }: InternalLinksProps) {
  return (
    <section className={`py-8 ${className}`}>
      <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="group p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-300 border border-gray-700 hover:border-blue-500"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">{link.icon}</span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors mb-1">
                  {link.title}
                </h3>
                <p className="text-sm text-gray-400">{link.description}</p>
              </div>
              <svg
                className="w-5 h-5 text-gray-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

// Liens prédéfinis pour réutilisation
export const portfolioLinks: LinkItem[] = [
  {
    href: '/blog',
    title: 'Blog Tech',
    description: 'Tutoriels et articles sur React, Next.js et TypeScript',
    icon: '📝'
  },
  {
    href: '/publications',
    title: 'Publications',
    description: 'Mes posts sur LinkedIn, Instagram et Medium',
    icon: '📱'
  },
  {
    href: '/contact',
    title: 'Contact',
    description: 'Discutons de votre projet web',
    icon: '📧'
  }
];

export const blogLinks: LinkItem[] = [
  {
    href: '/portfolio',
    title: 'Portfolio',
    description: 'Découvrez mes projets web React et Next.js',
    icon: '💼'
  },
  {
    href: '/publications',
    title: 'Publications',
    description: 'Suivez mes contenus sur les réseaux sociaux',
    icon: '📱'
  },
  {
    href: '/contact',
    title: 'Contactez-moi',
    description: 'Besoin d\'un développeur ? Parlons-en',
    icon: '📧'
  }
];

export const homeLinks: LinkItem[] = [
  {
    href: '/portfolio',
    title: 'Portfolio',
    description: 'Explorez mes projets de développement web',
    icon: '💼'
  },
  {
    href: '/blog',
    title: 'Blog',
    description: 'Lisez mes tutoriels et guides techniques',
    icon: '📝'
  },
  {
    href: '/publications',
    title: 'Publications',
    description: 'Retrouvez mes contenus sur les réseaux',
    icon: '📱'
  }
];
