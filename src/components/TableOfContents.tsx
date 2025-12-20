'use client';

export interface ToCItem {
  id: string;
  title: string;
  level: number; // 2 pour H2, 3 pour H3, etc.
}

interface TableOfContentsProps {
  items: ToCItem[];
  title?: string;
}

export default function TableOfContents({ items, title = "Table des matières" }: TableOfContentsProps) {
  if (!items || items.length === 0) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Mettre à jour l'URL sans recharger la page
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <nav className="bg-gray-800 p-6 rounded-lg mb-8 border border-gray-700 sticky top-4">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
        </svg>
        {title}
      </h2>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={`${item.id}-${index}`}
            style={{
              marginLeft: `${(item.level - 2) * 1.2}rem`,
              fontSize: item.level === 2 ? '0.95rem' : '0.9rem'
            }}
            className="transition-all duration-200"
          >
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-start gap-2 py-1 group"
            >
              <span className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                {item.level === 2 ? '▸' : '‣'}
              </span>
              <span className="leading-tight">{item.title}</span>
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-6 pt-4 border-t border-gray-700">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          Retour en haut
        </a>
      </div>
    </nav>
  );
}

// Utilitaire pour générer automatiquement la table des matières depuis le contenu MDX
export function generateToCFromContent(content: string): ToCItem[] {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const items: ToCItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length; // Nombre de #
    const title = match[2].trim();
    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    items.push({ id, title, level });
  }

  return items;
}
