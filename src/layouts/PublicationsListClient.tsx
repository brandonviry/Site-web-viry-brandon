'use client'
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Publication {
  url: string;
  title: string;
  type: string[];
}

interface Metadata {
  titre: string | null;
  description: string | null;
  image: string | null;
}

interface PublicationsListClientProps {
  initialPublications: Publication[];
}

export default function PublicationsListClient({ initialPublications }: PublicationsListClientProps) {
  const [metadataList, setMetadataList] = useState<(Metadata | null)[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);

  const getPlatformInfo = (url: string): { name: string; color: string; icon: string } => {
    try {
      const domain = new URL(url).hostname.toLowerCase();

      if (domain.includes('linkedin.com')) {
        return { name: 'LinkedIn', color: 'bg-blue-600', icon: '💼' };
      } else if (domain.includes('instagram.com')) {
        return { name: 'Instagram', color: 'bg-gradient-to-r from-purple-600 to-pink-600', icon: '📷' };
      } else if (domain.includes('twitter.com') || domain.includes('x.com')) {
        return { name: 'Twitter', color: 'bg-sky-500', icon: '🐦' };
      } else if (domain.includes('facebook.com')) {
        return { name: 'Facebook', color: 'bg-blue-700', icon: '👥' };
      } else if (domain.includes('youtube.com') || domain.includes('youtu.be')) {
        return { name: 'YouTube', color: 'bg-red-600', icon: '▶️' };
      } else if (domain.includes('medium.com')) {
        return { name: 'Medium', color: 'bg-gray-700', icon: '📝' };
      } else if (domain.includes('dev.to')) {
        return { name: 'Dev.to', color: 'bg-gray-900', icon: '👩‍💻' };
      } else if (domain.includes('github.com')) {
        return { name: 'GitHub', color: 'bg-gray-800', icon: '🐙' };
      } else {
        return { name: 'Article', color: 'bg-blue-600', icon: '📄' };
      }
    } catch {
      return { name: 'Article', color: 'bg-blue-600', icon: '📄' };
    }
  };

  const fetchMetadata = useCallback(async (url: string) => {
    try {
      if (!url || url === '/') {
        console.error('URL invalide:', url);
        return null;
      }
      const response = await fetch(`/api/metadata?url=${encodeURIComponent(url)}`);
      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
      return await response.json() as Metadata;
    } catch (error) {
      console.error('Erreur lors de la récupération des métadonnées:', error);
      return null;
    }
  }, []);

  const loadNextBatch = useCallback(async () => {
    if (loadedCount >= initialPublications.length) return;

    setIsLoading(true);
    const newMetadata = await Promise.all(
      initialPublications.slice(loadedCount, loadedCount + 6).map(pub => pub && pub.url ? fetchMetadata(pub.url) : null)
    );
    setMetadataList(prev => [...prev, ...newMetadata]);
    setLoadedCount(prev => prev + newMetadata.length);
    setIsLoading(false);
  }, [initialPublications, loadedCount, fetchMetadata]);

  useEffect(() => {
    if (loadedCount === 0) {
      loadNextBatch();
    }
  }, [loadedCount, loadNextBatch]);

  const cleanText = (text: string): string => {
    if (!text) return text;

    let cleaned = text;

    // 1. Supprimer les métadonnées de toutes les plateformes
    // Instagram: "2 likes, 1 comments - username on Date: "
    cleaned = cleaned.replace(/^\d+\s+(?:like|comment)s?,\s+\d+\s+(?:like|comment)s?\s+-\s+[\w.]+\s+on\s+[^:]+:\s*"?/i, '');

    // Twitter/X: "username · @handle · Date"
    cleaned = cleaned.replace(/^[\w\s]+·\s*@\w+\s*·\s*[^"]+\s*"?/i, '');

    // LinkedIn: "Posted by Name on Date"
    cleaned = cleaned.replace(/^Posted\s+by\s+[\w\s]+on\s+[^:]+:\s*"?/i, '');

    // 2. Supprimer les guillemets en début et fin
    cleaned = cleaned.replace(/^["']|["']$/g, '');

    // 3. Nettoyer les séparateurs multiples
    // Remplacer "---", "***", "___" par double saut de ligne
    cleaned = cleaned.replace(/\s*[-*_]{3,}\s*/g, '\n\n');

    // 4. Nettoyer les sauts de ligne excessifs (plus de 2 consécutifs)
    cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

    // 5. Supprimer les espaces multiples (mais garder les sauts de ligne)
    cleaned = cleaned.replace(/[^\S\n]+/g, ' ');

    // 6. Nettoyer le début et la fin
    cleaned = cleaned.trim();

    return cleaned;
  };

  const truncateText = (text: string, maxLength: number): string => {
    if (!text || text.length <= maxLength) return text;

    // Trouver le dernier espace avant la limite pour ne pas couper un mot
    const truncated = text.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');

    if (lastSpace > maxLength * 0.8) {
      // Si on trouve un espace dans les 20% finaux, couper là
      return truncated.substring(0, lastSpace).trim() + '...';
    }

    // Sinon couper à la limite et ajouter ...
    return truncated.trim() + '...';
  };

  const formatText = (text: string, platformName: string) => {
    if (!text) return text;

    // Nettoyer le texte pour toutes les plateformes
    const processedText = cleanText(text);

    // Pour les plateformes sociales : convertir hashtags et mentions en éléments React
    if (platformName === 'Instagram' || platformName === 'Twitter' || platformName === 'LinkedIn' || platformName === 'Facebook') {
      // Split par mots, hashtags et mentions tout en gardant les sauts de ligne
      const parts = processedText.split(/(\n|#[\w]+|@[\w]+|\s+)/g);

      return parts.map((part, i) => {
        // Sauts de ligne
        if (part === '\n') {
          return <br key={i} />;
        }
        // Hashtags
        if (part.startsWith('#')) {
          return <span key={i} className="text-blue-400 font-semibold">{part}</span>;
        }
        // Mentions
        if (part.startsWith('@')) {
          return <span key={i} className="text-blue-300 font-semibold">{part}</span>;
        }
        return part;
      });
    }

    return processedText;
  };

  const extractTitleAndContent = (metadata: Metadata | null, platformName: string) => {
    if (!metadata) return { title: 'Titre non disponible', content: 'Description non disponible' };

    const fullText = cleanText(metadata.description || metadata.titre || '');

    // Pour les plateformes sociales, extraire le contenu principal (sans les hashtags du début)
    if (platformName === 'LinkedIn' || platformName === 'Twitter' || platformName === 'Facebook') {
      // Séparer le texte en lignes
      const lines = fullText.split('\n').filter(line => line.trim());

      // Trouver la première ligne qui n'est pas uniquement des hashtags
      const firstRealContent = lines.find(line => {
        const withoutHashtags = line.replace(/#\w+/g, '').trim();
        return withoutHashtags.length > 10; // Au moins 10 caractères de contenu réel
      });

      if (firstRealContent) {
        // Utiliser la première vraie ligne comme titre
        const title = firstRealContent.replace(/#\w+/g, '').trim();
        return {
          title: title || metadata.titre || 'Post',
          content: fullText
        };
      }
    }

    // Pour Instagram ou si pas de contenu trouvé
    return {
      title: metadata.titre || 'Post',
      content: fullText || metadata.description || ''
    };
  };

  const renderPublication = (metadata: Metadata | null, index: number) => {
    const publication = initialPublications[index];
    if (!publication || !publication.url) {
      return null;
    }

    const platform = getPlatformInfo(publication.url);
    const { content } = extractTitleAndContent(metadata, platform.name);

    // Utiliser les données de Notion directement
    const notionTitle = publication.title || 'Publication';
    const notionTypes = publication.type || [];
    const description = cleanText(content || metadata?.description || '');

    return (
      <Link
        key={`${publication.url}-${index}`}
        href={publication.url}
        target="_blank"
        rel="noopener noreferrer"
        className="m-4 bg-neutral-900 rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl"
      >
        <div className="relative">
          {metadata?.image ? (
            <Image
              src={metadata.image}
              alt={notionTitle}
              width={1080}
              height={720}
              className="object-cover w-full h-48"
            />
          ) : (
            <div className="w-full h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <svg className="w-16 h-16 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
          )}
          <div className={`absolute top-2 right-2 ${platform.color} px-2 py-1 rounded text-xs font-semibold text-white shadow-lg flex items-center gap-1`}>
            <span>{platform.icon}</span>
            <span>{platform.name}</span>
          </div>
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 px-2 py-1 text-xs text-white rounded group">
            <span className="inline-block transition-transform duration-300 ease-in-out group-hover:translate-x-1">Voir le post</span>
          </div>
        </div>
        <div className="px-4 py-3">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-lg font-semibold text-white">{notionTitle}</h2>
            {notionTypes.length > 0 && (
              <span className="text-xs px-2 py-1 bg-blue-600 text-white rounded">
                {notionTypes[0]}
              </span>
            )}
          </div>
          <p className="text-gray-400 text-sm line-clamp-2">
            {formatText(truncateText(description, 120), platform.name)}
          </p>
        </div>
      </Link>
    );
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {metadataList.map((metadata, index) => renderPublication(metadata, index)).filter(Boolean)}

      {isLoading && (
        <div className="col-span-full flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
        </div>
      )}

      {loadedCount < initialPublications.length && !isLoading && (
        <div className="col-span-full flex justify-center mt-6">
          <button
            onClick={loadNextBatch}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-500 transition-colors shadow-md hover:shadow-lg"
          >
            Charger plus
          </button>
        </div>
      )}
    </section>
  );
}
